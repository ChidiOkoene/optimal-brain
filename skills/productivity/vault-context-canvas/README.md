# vault-context-canvas

Builds or refreshes an Obsidian JSON Canvas (`.canvas`) showing how your active vault notes, decisions, and project context connect.

## How to invoke

Type `/vault-context-canvas`.

## What it reads and writes

- **Reads:** vault `Indexes/Context Index.md`, `project-context.md`.
- **Writes:** `{Project}/Context Graph.canvas` in the vault.
- Reads and writes only this repo and the vault path you configured (in `.agent/context/knowledge-vault.md`). It never scans the disk for a vault, and never reads `.env` files, credentials, or secrets.

## Agents tested

- **Cursor:** used during development.
- **OpenCode 1.19.0** with `anthropic/claude-sonnet-5.5` via OpenRouter (tested 2026-10-13, headless): discovered and listed only; not exercised.
- **Claude Code:** supported via the plugin manifest, **not yet tested**.
- Other Agent Skills agents: untested. Reports are welcome at https://github.com/ChidiOkoene/optimal-brain/issues.

No API keys, no network calls, nothing installed. Part of [optimal-brain](https://github.com/ChidiOkoene/optimal-brain) (MIT), forked from [mattpocock/skills](https://github.com/mattpocock/skills).
