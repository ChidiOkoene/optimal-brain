# research-from-vault

Researches with your vault as the primary source and captures what it learns as linked notes: a session hub, one note per finding, a synthesis, and index updates, with confidence and supersession respected. See [examples/research-session.md](./examples/research-session.md).

## How to invoke

Ask in plain language, e.g. "research X using my vault" or "what do my notes say about Y?". The agent picks it up from the description.

## What it reads and writes

- **Reads:** vault notes and PDF companions; `.agent/context/knowledge-vault.md` and `project-context.md`.
- **Writes:** `Research Sessions/`, `Findings/`, synthesis notes, and index notes (in the index folder set in `knowledge-vault.md`) in the vault.
- Reads and writes only this repo and the vault path you configured (in `.agent/context/knowledge-vault.md`). It never scans the disk for a vault, and never reads `.env` files, credentials, or secrets. External web research only happens if you've installed a separate, optional third-party tool.

## Agents tested

- **Cursor:** used during development.
- **OpenCode 1.19.0** with `anthropic/claude-sonnet-5.5` via OpenRouter (tested 2026-10-13, headless): loaded from the plain prompt "research … using my vault". With no vault configured, it stopped and asked for the path without scanning the disk. A full research run against a configured vault was not tested.
- **Claude Code:** supported via the plugin manifest, **not yet tested**.
- Other Agent Skills agents: untested. Reports are welcome at https://github.com/ChidiOkoene/optimal-brain/issues.

No API keys, no network calls, nothing installed. Part of [optimal-brain](https://github.com/ChidiOkoene/optimal-brain) (MIT), forked from [mattpocock/skills](https://github.com/mattpocock/skills).
