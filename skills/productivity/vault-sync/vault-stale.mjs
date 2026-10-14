#!/usr/bin/env node
// Read-only: list vault notes whose source_paths changed since source_commit.
// Usage: node vault-stale.mjs --vault <folder> [--repo .]   (no dependencies)
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { spawnSync } from "node:child_process";

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const vault = arg("--vault"), repo = arg("--repo", ".");
if (!vault) { console.error("usage: vault-stale.mjs --vault <folder> [--repo .]"); process.exit(64); }
const git = (...a) => spawnSync("git", ["-C", repo, ...a], { encoding: "utf8" });

function walk(d, out = []) {
  for (const n of readdirSync(d)) {
    if (n.startsWith(".")) continue;
    const p = join(d, n);
    statSync(p).isDirectory() ? walk(p, out) : n.endsWith(".md") && out.push(p);
  }
  return out;
}
function fm(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!m) return null;
  const body = m[1].replace(/\r/g, "");
  const commit = /^source_commit:\s*["']?([0-9a-f]{7,40})/m.exec(body)?.[1];
  let paths = [];
  const inline = /^source_paths:\s*\[(.*)\]\s*$/m.exec(body);
  if (inline) paths = inline[1].split(",");
  else {
    const block = /^source_paths:\s*\n((?:\s+-\s*.+\n?)+)/m.exec(body + "\n");
    if (block) paths = block[1].split("\n").map((l) => l.replace(/^\s*-\s*/, ""));
  }
  paths = paths.map((p) => p.trim().replace(/\s+#.*$/, "").replace(/^["']|["']$/g, "")).filter(Boolean);
  const status = /^status:\s*(\S+)/m.exec(body)?.[1];
  return commit && paths.length ? { commit, paths, status } : null;
}

const head = git("rev-parse", "HEAD").stdout.trim();
const result = { head, stale: [], fresh: 0, skipped: 0 };
for (const f of walk(vault)) {
  const meta = fm(readFileSync(f, "utf8"));
  if (!meta) { result.skipped++; continue; }
  const note = relative(vault, f);
  if (git("cat-file", "-e", `${meta.commit}^{commit}`).status !== 0) {
    result.stale.push({ note, reason: "unknown commit", source_commit: meta.commit, changed: [] });
    continue;
  }
  const diff = git("diff", "--name-status", meta.commit, "HEAD", "--", ...meta.paths).stdout.trim();
  if (!diff) { result.fresh++; continue; }
  const changed = diff.split("\n").map((l) => l.split("\t").slice(1).join(" -> ") + ` (${l[0]})`);
  const deleted = diff.split("\n").some((l) => /^[DR]/.test(l));
  result.stale.push({ note, reason: deleted ? "source deleted or renamed" : "sources changed", source_commit: meta.commit, changed });
}
console.log(JSON.stringify(result, null, 2));
process.exit(result.stale.length ? 2 : 0);
