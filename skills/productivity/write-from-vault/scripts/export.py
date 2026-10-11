#!/usr/bin/env python3
"""Export a write-from-vault draft to publishable Markdown.

Usage:
  python3 export.py <vault_root> "<Drafts/Title folder>" [--style footnotes|links|pandoc]

Writes <draft>/export/<slug>.md, <draft>/export/EXPORT-REPORT.md, copies embedded
attachments into <draft>/export/assets/. Exit code 0 = clean, 2 = flags to review,
1 = usage/input error. Standard library only (Python 3.8+).
"""
import datetime, re, shutil, sys
from pathlib import Path

STYLES = ("footnotes", "links", "pandoc")
FM = re.compile(r"\A---\n(.*?)\n---\n?", re.S)
EMBED = re.compile(r"!\[\[([^\]|#^]+)(#[^\]|]*)?(\|[^\]]*)?\]\]")
WIKI = re.compile(r"\[\[([^\]|#^]+)(#[^\]|]*)?(\|[^\]]*)?\]\]")
IMG_EXT = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"}


def frontmatter(text):
    """Tiny YAML subset: top-level `key: value` lines. Enough for vault metadata."""
    m = FM.match(text)
    meta = {}
    if m:
        for line in m.group(1).splitlines():
            if ":" in line and not line.startswith((" ", "-")):
                k, v = line.split(":", 1)
                meta[k.strip()] = v.strip().strip('"').strip("'")
    return meta, (text[m.end():] if m else text)


def index_vault(root):
    notes, files = {}, {}
    for p in root.rglob("*"):
        if p.is_file() and "/export/" not in p.as_posix():
            files.setdefault(p.name.lower(), p)
            if p.suffix == ".md":
                notes.setdefault(p.stem.lower(), p)
    return notes, files


def status(path):
    meta, _ = frontmatter(path.read_text(encoding="utf-8"))
    problems = []
    if meta.get("superseded_by", "null") not in ("", "null", "None"):
        problems.append(f"superseded by {meta['superseded_by']}")
    if meta.get("confidence") == "exploratory":
        problems.append("exploratory")
    vu = meta.get("valid_until", "null")
    if vu not in ("", "null") and vu < datetime.date.today().isoformat():
        problems.append(f"expired {vu}")
    return meta, problems


def section(body, heading):
    """Return the text under `heading` (Obsidian #Heading embed) until the next heading of same/higher level."""
    lines, out, level = body.splitlines(), [], None
    for ln in lines:
        m = re.match(r"(#+)\s+(.*)", ln)
        if m and level is None and m.group(2).strip().lower() == heading.lower():
            level = len(m.group(1)); continue
        if m and level is not None and len(m.group(1)) <= level:
            break
        if level is not None:
            out.append(ln)
    return "\n".join(out).strip()


def clean(text):
    """Strip vault-only syntax outside fenced code blocks."""
    parts = re.split(r"(^```.*?^```[^\n]*$)", text, flags=re.S | re.M)
    out = "".join(p if p.startswith("```") else _clean(p) for p in parts)
    return re.sub(r"\n{3,}", "\n\n", out).strip() + "\n"


def _clean(body):
    body = re.sub(r"%%.*?%%", "", body, flags=re.S)                    # Obsidian comments
    body = re.sub(r"[ \t]+\^[A-Za-z0-9-]+$", "", body, flags=re.M)     # block ids on a line
    body = re.sub(r"^\^[A-Za-z0-9-]+\n", "", body, flags=re.M)        # block ids on own line
    body = re.sub(r"==(.+?)==", r"**\1**", body)                       # highlights
    body = re.sub(r"^> \[!(\w+)\][+-]?\s*(.*)$",                       # callouts -> blockquote
                  lambda m: "> **" + (m.group(2) or m.group(1).title()) + "**", body, flags=re.M)
    body = re.sub(r"(?<![\w/&])#[A-Za-z][\w/-]*", "", body)              # inline #tags
    body = re.sub(r"(?<=\S) {2,}(?=\S)", " ", body)                     # gaps left by removals
    body = re.sub(r" +([.,;:!?])", r"\1", body)
    return body


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def main(argv):
    if len(argv) < 3:
        print(__doc__); return 1
    root, draft = Path(argv[1]), Path(argv[1]) / argv[2]
    style = argv[argv.index("--style") + 1] if "--style" in argv else "footnotes"
    if style not in STYLES or not draft.is_dir():
        print(f"bad style or missing draft folder: {draft}"); return 1
    title = draft.name
    art = draft / f"{title}.md"
    if not art.exists():
        print(f"missing article file: {art}"); return 1
    notes, files = index_vault(root)
    out_dir = draft / "export"; (out_dir / "assets").mkdir(parents=True, exist_ok=True)
    flags, refs, order = [], {}, []

    _, body = frontmatter(art.read_text(encoding="utf-8"))

    def embed(m):
        name, head = m.group(1).strip(), (m.group(2) or "")[1:]
        alt = (m.group(3) or "|")[1:] or Path(name).stem
        f = files.get(name.lower()) or files.get(Path(name).name.lower())
        if f and f.suffix.lower() in IMG_EXT:
            shutil.copy2(f, out_dir / "assets" / f.name)
            return f"![{alt}](assets/{f.name.replace(' ', '%20')})"
        n = notes.get(name.lower())
        if n:
            _, nb = frontmatter(n.read_text(encoding="utf-8"))
            text = section(nb, head) if head else nb.strip()
            if text:
                return "\n".join("> " + l if l else ">" for l in text.splitlines())
        flags.append(f"unresolved embed: ![[{m.group(1)}{m.group(2) or ''}]]")
        return f"<!-- UNRESOLVED EMBED: {name} -->"
    body = EMBED.sub(embed, body)

    def link(m):
        name, alias = m.group(1).strip(), (m.group(3) or "|")[1:]
        n = notes.get(name.lower())
        if not n:
            flags.append(f"unresolved link: [[{name}]]")
            return alias or name
        meta, problems = status(n)
        for p in problems:
            flags.append(f"cited note [[{n.stem}]] is {p}")
        key = n.stem
        if key not in refs:
            refs[key] = meta.get("url") or meta.get("source_url") or ""
            order.append(key)
            if not refs[key]:
                flags.append(f"no public url for [[{key}]]: listed as a private note")
        i = order.index(key) + 1
        if alias:  # visible text the author chose; keep it, cite after
            prefix = alias + " "
        else:
            prefix = ""
        if style == "footnotes":
            return f"{prefix}[^{i}]".strip()
        if style == "pandoc":
            return f"{prefix}[@{slugify(key)}]".strip()
        return f"{prefix}[{i}]({refs[key]})" if refs[key] else f"{prefix}[{i}]"

    # A citation written as "(…[[Note]], [[Other]])" becomes one cluster.
    def cluster(m):
        inner = WIKI.sub(link, m.group(1))
        if style == "pandoc":
            keys = re.findall(r"@[\w-]+", inner)
            return " [" + "; ".join(keys) + "]"
        return "".join(re.findall(r"\[\^\d+\]|\[\d+\](?:\([^)]*\))?", inner)) or " (" + inner + ")"
    body = re.sub(r"\s*\(((?:\[\[[^\]]+\]\](?:,\s*)?)+)\)", cluster, body)
    body = WIKI.sub(link, body)
    body = clean(body)

    # Claim-ledger audit
    ledger = draft / "Claim Ledger.md"
    if ledger.exists():
        for row in ledger.read_text(encoding="utf-8").splitlines():
            cells = [c.strip() for c in row.strip().strip("|").split("|")]
            if len(cells) < 4 or not re.match(r"C\d+", cells[0]):
                continue
            for name in WIKI.findall(cells[2]):
                n = notes.get(name[0].strip().lower())
                if not n:
                    flags.append(f"{cells[0]}: evidence [[{name[0]}]] not found in vault")
                    continue
                for p in status(n)[1]:
                    flags.append(f"{cells[0]} ({cells[3]}): evidence [[{n.stem}]] is {p}; check hedging")
    else:
        flags.append("no Claim Ledger.md: claims not audited")

    # Reference list
    if style == "footnotes":
        tail = "\n".join(f"[^{i}]: {k}" + (f", <{refs[k]}>" if refs[k] else " (author's research notes)")
                         for i, k in enumerate(order, 1))
    elif style == "pandoc":
        tail = "## References\n\n::: {#refs}\n:::"
        yaml = "\n".join(f"  - id: {slugify(k)}\n    type: webpage\n    title: \"{k}\"" +
                         (f"\n    URL: {refs[k]}" if refs[k] else "\n    note: author's research notes")
                         for k in order)
        body = f"---\ntitle: \"{title}\"\nreferences:\n{yaml}\n---\n\n" + body
    else:
        tail = "## Sources\n\n" + "\n".join(f"{i}. {k}" + (f": <{refs[k]}>" if refs[k] else " (author's research notes)")
                                            for i, k in enumerate(order, 1))
    slug = slugify(title)
    (out_dir / f"{slug}.md").write_text(body.rstrip() + "\n\n" + tail + "\n", encoding="utf-8")
    if not any((out_dir / "assets").iterdir()):
        (out_dir / "assets").rmdir()

    flags = sorted(set(flags))
    report = [f"# Export report: {title}", "", f"- Style: `{style}`", f"- Output: `export/{slug}.md`",
              f"- Sources cited: {len(order)}", f"- Flags: {len(flags)}", ""]
    report += ["## Flags", ""] + [f"- [ ] {f}" for f in flags] if flags else ["No flags. Ready to publish."]
    (out_dir / "EXPORT-REPORT.md").write_text("\n".join(report) + "\n", encoding="utf-8")
    print("\n".join(report))
    return 2 if flags else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
