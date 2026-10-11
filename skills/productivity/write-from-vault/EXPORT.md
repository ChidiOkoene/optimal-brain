# Stage 5: Export

Turn a verified vault draft into Markdown a reader can use outside Obsidian: no wikilinks, no vault metadata, every citation pointing somewhere real or honestly labelled private.

## Run it

```bash
python3 scripts/export.py "<vault root>" "Drafts/<Article Title>" --style footnotes
```

Run the script; don't reimplement it. It is deterministic, standard-library only, and writes:

```
Drafts/<Article Title>/export/
  <slug>.md          publishable Markdown
  EXPORT-REPORT.md   checklist of flags to clear before publishing
  assets/            copied images (only if the draft embeds any)
```

Exit `0` = clean, `2` = flags to review, `1` = bad input. Re-run after every fix; it overwrites `export/`.

## Pick a style for the destination

| Style | Output | Use for |
| ----- | ------ | ------- |
| `footnotes` (default) | `claim[^1]` + `[^1]: Note, <url>` | GitHub, dev.to, Hugo/Jekyll/Astro blogs, anything GFM-like |
| `links` | `claim[1](url)` + numbered `## Sources` list | Substack, Medium, Ghost, email, plain CommonMark |
| `pandoc` | `claim [@note-id]` + CSL `references:` YAML + `::: {#refs}` | Pandoc/Quarto → PDF, DOCX, academic venues (`pandoc --citeproc`) |

Substack does not parse Markdown: render the `links` export to HTML (any Markdown preview) and paste the rich text. Its native footnotes can only be added by hand in the editor, which is why `links` is the default for it.

## What the script converts

| Vault syntax | Export |
| ------------ | ------ |
| YAML frontmatter on the draft | removed (pandoc style writes its own `title`/`references`) |
| `[[Note]]`, `[[Note\|alias]]`, `[[Note#Heading]]` | citation in the chosen style; alias kept as visible text |
| `([[A]], [[B]])` citation clusters | merged: `[^1][^2]` / `[@a; @b]` |
| `![[image.png\|alt]]` | `![alt](assets/image.png)`, file copied |
| `![[Note]]`, `![[Note#Heading]]` | the note (or section) inlined as a blockquote |
| `%%comment%%`, `^block-id`, inline `#tags` | removed |
| `==highlight==` | `**bold**` |
| `> [!NOTE] Title` callouts | plain blockquote with bold title |

A cited note's public link comes from its `url:` (or `source_url:`) frontmatter. Notes without one are listed as "(author's research notes)" and flagged, so you choose: add a URL, cite the original source the note itself cites, or keep it as a private note.

Known limits: wikilinks inside fenced code blocks are still converted (avoid them there); frontmatter parsing is a flat `key: value` subset, enough for vault metadata.

## What it flags (EXPORT-REPORT.md)

- Unresolved links and embeds (target not in the vault).
- Cited notes that are superseded, exploratory, or past `valid_until`.
- Claim Ledger rows whose evidence is missing, superseded, exploratory, or expired, with the row's strength, so you can re-check the hedging in the text.
- Cited notes with no public URL.
- A missing Claim Ledger (nothing was audited).

## Before publishing

Work through every checkbox in EXPORT-REPORT.md with the user. Superseded or missing evidence is a blocker: go back to Stage 4. Exploratory evidence is fine only if the sentence is visibly hedged. Read the export once as a stranger would: does every citation lead somewhere or say plainly that it's private? Publishing itself is the user's job; never post anywhere.
