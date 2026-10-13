#!/usr/bin/env node
// Repo checks with no dependencies. Run: npm run validate
import { readFileSync, existsSync, readdirSync, statSync, mkdtempSync, cpSync, rmSync } from "node:fs";
import { join, dirname, basename, normalize, relative } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const errors = [];
const fail = (msg) => errors.push(msg);
const read = (p) => readFileSync(join(root, p), "utf8");

function walk(dir, out = []) {
  for (const name of readdirSync(join(root, dir))) {
    if (["node_modules", ".git", ".cursor"].includes(name)) continue;
    const p = join(dir, name);
    statSync(join(root, p)).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}
const files = walk(".");

// 1. plugin.json paths
const plugin = JSON.parse(read(".claude-plugin/plugin.json")).skills;
for (const s of plugin) if (!existsSync(join(root, s, "SKILL.md"))) fail(`plugin.json: ${s} has no SKILL.md`);
const inPlugin = new Set(plugin.map((s) => normalize(s)));

// 2. frontmatter + 3. bucket rules
const readme = read("README.md");
for (const f of files.filter((f) => /^skills\/[^/]+\/[^/]+\/SKILL\.md$/.test(f))) {
  const [, bucket, skill] = f.split("/");
  const fm = /^---\n([\s\S]*?)\n---/.exec(read(f));
  if (!fm) { fail(`${f}: missing frontmatter`); continue; }
  const name = /^name:\s*(.+)$/m.exec(fm[1])?.[1].trim().replace(/^["']|["']$/g, "");
  const desc = /^description:\s*(.+)$/m.exec(fm[1])?.[1].trim().replace(/^["']|["']$/g, "");
  if (name !== skill) fail(`${f}: name "${name}" != folder "${skill}"`);
  if (!desc) fail(`${f}: missing description`);
  else if (desc.length > 1024) fail(`${f}: description ${desc.length} > 1024 chars`);
  const listedTop = readme.includes(`${f}`);
  const listedPlugin = inPlugin.has(normalize(`skills/${bucket}/${skill}`));
  const bucketReadme = existsSync(join(root, `skills/${bucket}/README.md`)) ? read(`skills/${bucket}/README.md`) : "";
  if (["engineering", "productivity"].includes(bucket)) {
    if (!listedTop) fail(`${f}: not linked from README.md`);
    if (!listedPlugin) fail(`${f}: not in plugin.json`);
    if (!bucketReadme.includes(`${skill}/SKILL.md`)) fail(`${f}: not in skills/${bucket}/README.md`);
  } else if (bucket === "misc") {
    if (!listedTop) fail(`${f}: misc skill not linked from README.md`);
    if (listedPlugin) fail(`${f}: misc skill must not be in plugin.json`);
  } else if (bucket === "personal") {
    if (listedTop || listedPlugin) fail(`${f}: personal skill must not appear in README.md or plugin.json`);
  }
}

// 4. relative links in Markdown (code blocks and spans skipped).
// packaging/agensi/ pack roots link to zip-internal paths; package-agensi.mjs checks those.
for (const f of files.filter((f) => f.endsWith(".md") && !f.startsWith("packaging/agensi/"))) {
  const text = read(f).replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
  for (const [, target] of text.matchAll(/\]\(([^)\s#]+)(?:#[^)]*)?\)/g)) {
    if (/^(https?:|mailto:)/.test(target) || target.includes("{{")) continue;
    const resolved = join(root, dirname(f), decodeURIComponent(target));
    if (!existsSync(resolved)) fail(`${f}: broken link ${target}`);
  }
}

// 4b. skill references: every /command and removed-skill name must exist
const skillNames = new Set(files.filter((f) => /^skills\/[^/]+\/[^/]+\/SKILL\.md$/.test(f)).map((f) => f.split("/")[2]));
// Commands that are real but not ours: agent built-ins and other packs we document.
const EXTERNAL = new Set([
  "loop", "compact", "clear", "goal", "babysit", "init", "help", "model", "plugin", "skills", // agent built-ins
  "skill", "tmp", "settings", "orders", // placeholders and example paths in prose
  // garrytan/gstack (see docs/WITH-GSTACK.md)
  "review", "qa", "qa-only", "browse", "cso", "design-review", "ship", "land-and-deploy", "canary", "investigate",
  "context-save", "context-restore", "learn", "office-hours", "plan-eng-review", "plan-ceo-review", "plan-design-review",
  "autoplan", "spec", "document-generate", "document-release", "setup-gbrain", "sync-gbrain", "gstack-review", "gstack-office-hours",
]);
// Skills that no longer exist here; naming them is only OK in history/credit lines.
const REMOVED = ["qa", "design-an-interface", "request-refactor-plan", "ubiquitous-language", "loop-me", "writing-beats",
  "writing-fragments", "writing-shape", "migrate-to-shoehorn", "scaffold-exercises", "ask-matt", "setup-matt-pocock-skills"];
const HISTORY_FILES = /(^|\/)(CHANGELOG\.md|REFERENCES\.md)$|^\.changeset\/|^whatNew\.md$|^docs\/OPTIMAL-BRAIN\.md$/; // fork-history docs
const HISTORY_LINE = /Inspired by|mattpocock|Matt Pocock|Evolved from|gstack|davidondrej|→ `\/ask-brain`|ask-matt.*ask-brain/;
for (const f of files.filter((f) => f.endsWith(".md") && !HISTORY_FILES.test(f))) {
  read(f).split("\n").forEach((line, i) => {
    if (HISTORY_LINE.test(line)) return;
    for (const m of line.matchAll(/(?<![\w.~/:}-])\/([a-z][a-z0-9]*(?:-[a-z0-9]+)*)(?![\w/.-]*\/)(?=[\s`*"'),.:;|\]]|$)/g)) {
      const name = m[1];
      if (!skillNames.has(name) && !EXTERNAL.has(name)) fail(`${f}:${i + 1}: unknown command /${name}`);
      if (name === "review") fail(`${f}:${i + 1}: bare /review (ours is /two-axis-review; gstack's /review only on gstack lines)`);
    }
    for (const name of REMOVED) {
      if (new RegExp("`/?" + name + "`|\\*\\*" + name + "\\*\\*|skills/[a-z]+/" + name + "\\b").test(line))
        fail(`${f}:${i + 1}: references removed skill ${name}`);
    }
  });
}

// 4c. Agensi readiness (docs/AGENSI.md)
// Every plugin skill description needs a trigger clause ("Use when ...").
for (const dir of plugin) {
  const fm = /^---\n([\s\S]*?)\n---/.exec(read(join(dir, "SKILL.md")))?.[1] ?? "";
  const desc = /^description:\s*(.+)$/m.exec(fm)?.[1] ?? "";
  if (!/\bUse when\b/i.test(desc)) fail(`${dir}/SKILL.md: description has no "Use when ..." trigger clause`);
}
// Every skill listed on Agensi needs a README.md (what, how to invoke, reads/writes, agents tested).
const agensi = JSON.parse(read("packaging/agensi/agensi.config.json"));
for (const pack of agensi.packs) {
  const dirs = pack.skills ? [pack.root, ...pack.skills] : [pack.skill];
  for (const d of dirs) if (!existsSync(join(root, d, "README.md"))) fail(`${d}: listed on Agensi but has no README.md`);
}
// Build every zip in dry-run mode: structure, symlinks, forbidden paths, scan patterns.
{
  const r = spawnSync(process.execPath, ["scripts/package-agensi.mjs", "--dry-run", "--all"], { cwd: root, encoding: "utf8" });
  if (r.status !== 0) fail(`package:agensi dry run failed:\n${(r.stderr || r.stdout).trim()}`);
}

// 5. golden test: write-from-vault export
const ex = "skills/productivity/write-from-vault/examples";
const draft = "Drafts/Why Agents Forget";
const fixtures = {
  footnotes: [`${ex}/sample-vault/${draft}/export/why-agents-forget.md`, `${ex}/sample-vault/${draft}/export/EXPORT-REPORT.md`],
  links: [`${ex}/expected-export/why-agents-forget.links.md`, `${ex}/expected-export/EXPORT-REPORT.links.md`],
  pandoc: [`${ex}/expected-export/why-agents-forget.pandoc.md`, `${ex}/expected-export/EXPORT-REPORT.pandoc.md`],
};
const tmp = mkdtempSync(join(tmpdir(), "ob-export-"));
try {
  cpSync(join(root, ex, "sample-vault"), join(tmp, "vault"), { recursive: true });
  for (const [style, [expMd, expReport]] of Object.entries(fixtures)) {
    if (!existsSync(join(root, expMd))) { fail(`golden: missing fixture ${expMd}`); continue; }
    const r = spawnSync("python3", [join(root, "skills/productivity/write-from-vault/scripts/export.py"), join(tmp, "vault"), draft, "--style", style], { encoding: "utf8" });
    if (r.error) { fail(`golden: cannot run python3 (${r.error.message})`); break; }
    if (r.status !== 2) fail(`golden ${style}: exit ${r.status}, expected 2 (flags present)\n${r.stdout}${r.stderr}`);
    const outDir = join(tmp, "vault", draft, "export");
    for (const [got, exp] of [[join(outDir, "why-agents-forget.md"), expMd], [join(outDir, "EXPORT-REPORT.md"), expReport]]) {
      if (readFileSync(got, "utf8") !== read(exp)) fail(`golden ${style}: ${basename(got)} differs from ${exp}`);
    }
  }
} finally { rmSync(tmp, { recursive: true, force: true }); }

if (errors.length) {
  console.error(`validate: ${errors.length} problem(s)\n- ` + errors.join("\n- "));
  process.exit(1);
}
console.log(`validate: ok (${plugin.length} plugin skills, ${files.filter((f) => f.endsWith(".md")).length} markdown files, 3 export styles)`);
