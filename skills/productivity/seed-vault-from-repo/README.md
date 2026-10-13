# seed-vault-from-repo

Seeds your vault from an existing repo: per-unit Findings, Decision Traces (from ADRs), Plans with status, a Unit Index, and, for monorepos, a Shared layer of cross-unit contracts. Every note cites source paths and the commit. `resync` updates only stale notes. See [examples/data-ml-monorepo.md](./examples/data-ml-monorepo.md).

## How to invoke

Type `/seed-vault-from-repo` (or `/seed-vault-from-repo resync`). It drafts the unit list and layout first and writes one unit at a time after you approve.

## What it reads and writes

- **Reads:** repo READMEs, docs, ADRs, plans, CI/pipeline configs, code structure, and `git` metadata. Never `.env*`, keys, credentials, or data samples.
- **Writes:** notes under your project folder in the vault, plus `<Index Folder>/Context Index.md` (index folder from `knowledge-vault.md`). Never edits `## Manual` sections.
- Reads and writes only this repo and the vault path you configured (in `.agent/context/knowledge-vault.md`). It never scans the disk for a vault, and never reads `.env` files, credentials, or secrets.

## Agents tested

- **Cursor:** used during development.
- **OpenCode 1.19.0** with `anthropic/claude-sonnet-5.5` via OpenRouter (tested 2026-10-13, headless): seeded a 2-unit monorepo fixture: 12 notes, all with `source_commit`, including a Shared contract, flow, CI, and glossary. It never opened `.env`.
- **Claude Code:** supported via the plugin manifest, **not yet tested**.
- Other Agent Skills agents: untested. Reports are welcome at https://github.com/ChidiOkoene/optimal-brain/issues.

No API keys, no network calls, nothing installed. Part of [optimal-brain](https://github.com/ChidiOkoene/optimal-brain) (MIT), forked from [mattpocock/skills](https://github.com/mattpocock/skills).
