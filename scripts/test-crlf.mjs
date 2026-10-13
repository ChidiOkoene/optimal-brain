#!/usr/bin/env node
// Regression test for Windows checkouts (core.autocrlf=true). It copies the repo to a temp dir
// and converts every text file to CRLF. Then it runs validate and package:agensi there and checks
// that the built zips contain LF only. Run by CI via `npm run test:crlf`.
import { readFileSync, writeFileSync, readdirSync, lstatSync, mkdtempSync, rmSync, cpSync } from "node:fs";
import { join, extname, basename } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { inflateRawSync } from "node:zlib";

const root = process.cwd();
const TEXT_EXT = new Set([".md", ".py", ".sh", ".mjs", ".js", ".ts", ".json", ".yaml", ".yml", ".txt", ".diff", ".canvas", ".csv"]);
const SKIP = new Set(["node_modules", ".git", "dist"]);
const tmp = mkdtempSync(join(tmpdir(), "ob-crlf-"));
const errors = [];
let converted = 0;
function toCrlf(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name), st = lstatSync(p);
    if (st.isDirectory()) toCrlf(p);
    else if (st.isFile() && TEXT_EXT.has(extname(name))) {
      writeFileSync(p, readFileSync(p, "utf8").replace(/\r?\n/g, "\r\n")); converted++;
    }
  }
}
function zipEntries(file) {
  const buf = readFileSync(file), out = [];
  for (let o = 0; buf.readUInt32LE(o) === 0x04034b50;) {
    const csize = buf.readUInt32LE(o + 18), nlen = buf.readUInt16LE(o + 26), xlen = buf.readUInt16LE(o + 28);
    const name = buf.subarray(o + 30, o + 30 + nlen).toString();
    const start = o + 30 + nlen + xlen;
    out.push([name, inflateRawSync(buf.subarray(start, start + csize))]);
    o = start + csize;
  }
  return out;
}
try {
  cpSync(root, tmp, { recursive: true, filter: (s) => !SKIP.has(basename(s)) });
  toCrlf(tmp);
  for (const [label, args] of [["validate", ["scripts/validate.mjs"]], ["package:agensi", ["scripts/package-agensi.mjs", "--all"]]]) {
    const r = spawnSync(process.execPath, args, { cwd: tmp, encoding: "utf8" });
    if (r.status !== 0) errors.push(`${label} failed on a CRLF checkout:\n${(r.stderr || r.stdout).trim()}`);
  }
  const zips = [];
  const walk = (d) => { try { for (const n of readdirSync(d)) { const p = join(d, n); lstatSync(p).isDirectory() ? walk(p) : n.endsWith(".zip") && zips.push(p); } } catch {} };
  walk(join(tmp, "dist/agensi"));
  if (!zips.length && !errors.length) errors.push("no zips built");
  for (const z of zips) for (const [name, data] of zipEntries(z)) if (data.includes(13)) errors.push(`${basename(z)}: ${name} contains CR`);
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log(`test:crlf: ok (${converted} files converted to CRLF, ${zips.length} zips are LF-only)`);
} finally { rmSync(tmp, { recursive: true, force: true }); }
