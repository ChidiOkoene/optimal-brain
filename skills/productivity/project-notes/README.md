# project-notes

Captures your own notes during or after research into `{Project}/Personal Notes/` in the vault, kept separate from agent-written notes.

## How to invoke

Type `/project-notes` and say what you want to jot down.

## What it reads and writes

- **Reads:** `.agent/context/knowledge-vault.md`, `project-context.md`.
- **Writes:** one note per capture in the vault's `Personal Notes/` folder.
- Reads and writes only this repo and the vault path you configured (in `.agent/context/knowledge-vault.md`). It never scans the disk for a vault, and never reads `.env` files, credentials, or secrets.

## Agents tested

- **Cursor:** used during development.
- **OpenCode 1.19.0** with `anthropic/claude-sonnet-5.5` via OpenRouter (tested 2026-10-13, headless): discovered and listed only; not exercised.
- **Claude Code:** supported via the plugin manifest, **not yet tested**.
- Other Agent Skills agents: untested. Reports are welcome at https://github.com/ChidiOkoene/optimal-brain/issues.

No API keys, no network calls, nothing installed. Part of [optimal-brain](https://github.com/ChidiOkoene/optimal-brain) (MIT), forked from [mattpocock/skills](https://github.com/mattpocock/skills).
