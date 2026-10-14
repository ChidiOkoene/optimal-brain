#!/usr/bin/env node
// Build Agensi-ready zips (one top-level folder, SKILL.md at its root). No dependencies.
// Usage: node scripts/package-agensi.mjs [--dry-run] [--all] [--out dist/agensi]
//   --dry-run  build and check in a temp dir; write no zips (used by npm run validate / CI)
//   --all      also build one zip per plugin skill (dist/agensi/skills/<name>.zip)
// Rules follow docs/AGENSI.md (Agensi security scan + creator checklist).
import { readFileSync, writeFileSync, mkdirSync, readdirSync, lstatSync, existsSync, rmSync, mkdtempSync } from "node:fs";
import { join, dirname, relative, extname, basename, resolve, sep } from "node:path";
import { tmpdir } from "node:os";
import { deflateRawSync } from "node:zlib";

const root = process.cwd();
// Windows checkouts may have CRLF (core.autocrlf). Normalize every text read to LF so parsers
// match and zips always contain LF.
const lf = (s) => s.replace(/\r\n?/g, "\n");
const readText = (p) => lf(readFileSync(p, "utf8"));
const args = process.argv.slice(2);
const dry = args.includes("--dry-run");
const all = args.includes("--all");
const outDir = resolve(root, args.includes("--out") ? args[args.indexOf("--out") + 1] : "dist/agensi");
const config = JSON.parse(readText(join(root, "packaging/agensi/agensi.config.json")));

const TEXT_EXT = new Set([".md", ".py", ".sh", ".mjs", ".js", ".ts", ".json", ".yaml", ".yml", ".txt", ".diff", ".canvas", ".csv"]);
const SKIP = new Set([".DS_Store", "Thumbs.db", "node_modules", "__pycache__", ".git"]);
const FORBIDDEN_NAME = [/^link-skills\.sh$/, /^\.env/, /\.(pem|key|p12|pfx)$/i];
// Patterns the Agensi scan looks for (see docs/AGENSI.md). Each hit fails the build.
const CONTENT_RULES = [
  ["env-var harvesting", /os\.environ|\bprintenv\b|\benv\s*\|\s*\w|process\.env\b(?!\.(NODE_ENV|PAYMENT_API_KEY)\b)/],
  ["remote script execution", /(curl|wget)[^\n|]*\|\s*(sudo\s+)?(ba|z)?sh\b/],
  ["recursive delete outside project", /rm\s+-rf?\s+(\/|~|\$HOME)/],
  ["global config write", /~\/\.(claude|cursor|config)\/settings|\/etc\//],
  ["package install", /\b(npm|pnpm|yarn)\s+(i|install|add)\s+-g\b|\bpip install\b|\bsudo\b/],
  ["hardcoded secret", /\b(sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{30,}|xox[bp]-[A-Za-z0-9-]{20,})/],
  ["obfuscated blob", /[A-Za-z0-9+/]{160,}={0,2}/],
];

const errors = [];
const fail = (m) => errors.push(m);
const warnings = [];
const warn = (m) => warnings.push(m);

function copyTree(src, dest, rel = "") {
  for (const name of readdirSync(src)) {
    if (SKIP.has(name)) continue;
    const s = join(src, name), d = join(dest, name), r = join(rel, name);
    const st = lstatSync(s);
    if (st.isSymbolicLink()) { fail(`symlink not allowed: ${r}`); continue; }
    if (st.isDirectory()) { mkdirSync(d, { recursive: true }); copyTree(s, d, r); continue; }
    if (FORBIDDEN_NAME.some((re) => re.test(name))) { fail(`forbidden file: ${r}`); continue; }
    if (!TEXT_EXT.has(extname(name))) { fail(`non-text file (binary?) not allowed: ${r}`); continue; }
    mkdirSync(dirname(d), { recursive: true });
    writeFileSync(d, readText(s));
  }
}

function filesUnder(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    lstatSync(p).isDirectory() ? out.push(...filesUnder(p)) : out.push(p);
  }
  return out.sort();
}

// Rewrite repo paths (skills/<bucket>/<name>/...) to paths inside the zip.
function rewrite(text, here, inZip) {
  // Relative links across buckets (../../productivity/<skill>/...) point at the flattened copy.
  text = text.replace(/(?:\.\.\/)+(?:engineering|productivity|misc|personal)\/([a-z0-9-]+)\//g, (m, name) => {
    if (!inZip.has(name)) return m;
    const r = relative(here, inZip.get(name)).split(sep).join("/");
    return r === "" ? "./" : r + "/";
  });
  return text.replace(/skills\/(engineering|productivity|misc|personal)\/([a-z0-9-]+)\/?/g, (m, _b, name) => {
    if (!inZip.has(name)) return m;
    const target = inZip.get(name);
    let r = relative(here, target).split(sep).join("/");
    return r === "" ? "./" : r + "/";
  });
}

// Links that leave a single skill's folder (e.g. to setup-knowledge-vault templates) are made
// self-contained: the target is copied into <zip>/_shared/<repo path> and the link rewritten.
function vendorShared(top, srcDir) {
  for (const f of filesUnder(top)) {
    if (!f.endsWith(".md")) continue;
    const srcFile = join(srcDir, relative(top, f));
    let text = readText(f), changed = false;
    text = text.replace(/\]\((\.\.\/[^)\s#]+)((?:#[^)]*)?)\)/g, (m, t, hash) => {
      const repoTarget = resolve(dirname(srcFile), decodeURIComponent(t));
      if (!existsSync(repoTarget) || !repoTarget.startsWith(root + sep)) return m;
      const rel = relative(root, repoTarget);
      if (/^skills\/(misc|personal)\//.test(rel.split(sep).join("/"))) return m;
      const dest = join(top, "_shared", rel);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, TEXT_EXT.has(extname(repoTarget)) ? readText(repoTarget) : readFileSync(repoTarget));
      changed = true;
      return `](${relative(dirname(f), dest).split(sep).join("/")}${hash})`;
    });
    if (changed) writeFileSync(f, text);
  }
}

function check(top, name, strict = true, inZip = new Map(), allow = {}) {
  const entries = readdirSync(top);
  if (!entries.includes("SKILL.md")) return fail(`${name}: no SKILL.md at the top-level folder root`);
  const skill = readText(join(top, "SKILL.md"));
  const fm = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(skill);
  if (!fm) return fail(`${name}: SKILL.md has no frontmatter`);
  const n = /^name:\s*["']?([^"'\n]+)/m.exec(fm[1])?.[1].trim();
  if (n !== name) fail(`${name}: frontmatter name "${n}" != folder`);
  if (!/^description:\s*\S/m.test(fm[1])) fail(`${name}: no description`);
  if (fm[2].trim().length < 200) (strict ? fail : warn)(`${name}: SKILL.md body is very short (wrapper around another skill?)`);
  for (const f of filesUnder(top)) {
    const rel = relative(dirname(top), f).split(sep).join("/");
    const text = readText(f);
    for (const [label, re] of CONTENT_RULES) {
      const m = re.exec(text);
      if (m && !(allow[rel.split("/").slice(1).join("/")] || []).includes(label)) fail(`${rel}: ${label}: "${m[0].slice(0, 60)}"`);
      else if (m) warn(`${rel}: ${label} allowed by config (opt-in skill): "${m[0].slice(0, 60)}"`);
    }
    // References to misc/personal skills are only allowed when that skill ships in this zip.
    for (const [m, n] of text.matchAll(/skills\/(?:misc|personal)\/([a-z0-9-]+)/g))
      if (!inZip.has(n)) fail(`${rel}: excluded skill reference: "${m}"`);
    if (f.endsWith(".md")) {
      const body = text.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
      for (const [, t] of body.matchAll(/\]\(([^)\s#]+)(?:#[^)]*)?\)/g)) {
        if (/^(https?:|mailto:)/.test(t) || t.includes("{{")) continue;
        const target = resolve(dirname(f), decodeURIComponent(t));
        if (!target.startsWith(top + sep) && target !== top) fail(`${rel}: link escapes the zip: ${t}`);
        else if (!existsSync(target)) fail(`${rel}: broken link inside zip: ${t}`);
      }
    }
  }
}

// --- minimal zip writer (deflate, fixed timestamps for reproducible builds) ---
const CRC = new Uint32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc32 = (buf) => { let c = 0xffffffff; for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
function zip(baseDir, top, outFile) {
  const locals = [], centrals = []; let offset = 0;
  const DOS_TIME = 0, DOS_DATE = (2026 - 1980) << 9 | 1 << 5 | 1;
  for (const f of filesUnder(join(baseDir, top))) {
    const name = Buffer.from(relative(baseDir, f).split(sep).join("/"));
    const data = readFileSync(f), comp = deflateRawSync(data), crc = crc32(data);
    const mode = f.endsWith(".sh") || f.endsWith(".py") ? 0o100755 : 0o100644;
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0x0800, 6); lh.writeUInt16LE(8, 8);
    lh.writeUInt16LE(DOS_TIME, 10); lh.writeUInt16LE(DOS_DATE, 12); lh.writeUInt32LE(crc, 14);
    lh.writeUInt32LE(comp.length, 18); lh.writeUInt32LE(data.length, 22); lh.writeUInt16LE(name.length, 26); lh.writeUInt16LE(0, 28);
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(0x0314, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(0x0800, 8); ch.writeUInt16LE(8, 10);
    ch.writeUInt16LE(DOS_TIME, 12); ch.writeUInt16LE(DOS_DATE, 14); ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(comp.length, 20);
    ch.writeUInt32LE(data.length, 24); ch.writeUInt16LE(name.length, 28); ch.writeUInt32LE((mode << 16) >>> 0, 38); ch.writeUInt32LE(offset, 42);
    locals.push(lh, name, comp); centrals.push(ch, name);
    offset += lh.length + name.length + comp.length;
  }
  const cd = Buffer.concat(centrals), end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(centrals.length / 2, 8); end.writeUInt16LE(centrals.length / 2, 10);
  end.writeUInt32LE(cd.length, 12); end.writeUInt32LE(offset, 16);
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, Buffer.concat([...locals, cd, end]));
}

function build(target, stage) {
  const top = join(stage, target.name);
  mkdirSync(top, { recursive: true });
  const inZip = new Map();
  if (target.skills) {
    copyTree(join(root, target.root), top);
    for (const s of target.skills) {
      const n = basename(s); inZip.set(n, join(top, n));
      mkdirSync(join(top, n)); copyTree(join(root, s), join(top, n));
    }
  } else {
    copyTree(join(root, target.skill), top); inZip.set(basename(target.skill), top);
    vendorShared(top, join(root, target.skill));
  }
  for (const f of filesUnder(top)) if (f.endsWith(".md")) writeFileSync(f, rewrite(readText(f), dirname(f), inZip));
  check(top, target.name, !target.sub, inZip, target.allow || {});
  return top;
}

const stage = mkdtempSync(join(tmpdir(), "agensi-"));
const targets = [...config.packs];
if (all) {
  const plugin = JSON.parse(readText(join(root, ".claude-plugin/plugin.json"))).skills;
  for (const s of plugin) if (!targets.some((t) => t.skill === s.replace(/^\.\//, ""))) targets.push({ name: basename(s), skill: s.replace(/^\.\//, ""), sub: "skills" });
}
const built = [];
for (const t of targets) {
  const dir = join(stage, t.sub || "");
  mkdirSync(dir, { recursive: true });
  build(t, dir);
  built.push({ t, dir, files: filesUnder(join(dir, t.name)).map((f) => relative(dir, f).split(sep).join("/")) });
}
if (errors.length) {
  console.error(`package:agensi: ${errors.length} problem(s)\n- ` + errors.join("\n- "));
  rmSync(stage, { recursive: true, force: true });
  process.exit(1);
}
if (!dry) rmSync(outDir, { recursive: true, force: true });
for (const { t, dir, files } of built) {
  const out = join(outDir, t.sub || "", `${t.name}.zip`);
  if (!dry) zip(dir, t.name, out);
  console.log(`${dry ? "[dry-run] " : ""}${relative(root, out)} (${files.length} files)`);
  if (!all || !t.sub) for (const f of files) console.log(`  ${f}`);
}
rmSync(stage, { recursive: true, force: true });
for (const w of warnings) console.log(`warning: ${w}`);
console.log(`package:agensi: ok (${built.length} zip${built.length === 1 ? "" : "s"}${dry ? ", dry run" : ""})`);
