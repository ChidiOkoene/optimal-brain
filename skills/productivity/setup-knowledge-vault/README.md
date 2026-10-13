# setup-knowledge-vault

Configures your Obsidian vault for optimal-brain: the vault path (you type it, nothing is probed), learning-record and PDF conventions, the context graph, and a per-project overlay. Other vault skills read this config. See [examples/setup-session.md](./examples/setup-session.md).

## How to invoke

Type `/setup-knowledge-vault` once per repo. It asks one section at a time and writes only after you say "write it".

## What it reads and writes

- **Reads:** this repo's `.agent/context/`, `CLAUDE.md`/`AGENTS.md`.
- **Writes:** `.agent/context/knowledge-vault.md`, `project-context.md`, `README.md`; a `# optimal-brain (personal)` block in `.gitignore`; optional index notes and folders in your vault.
- Reads and writes only this repo and the vault path you configured (in `.agent/context/knowledge-vault.md`). It never scans the disk for a vault, and never reads `.env` files, credentials, or secrets.

## Agents tested

- **Cursor:** used during development.
- **OpenCode 1.19.0** with `anthropic/claude-sonnet-5.5` via OpenRouter (tested 2026-10-13, headless): wrote `.agent/context/` and the `.gitignore` block, and set up only the vault path given. It probed no other locations.
- **Claude Code:** supported via the plugin manifest, **not yet tested**.
- Other Agent Skills agents: untested. Reports are welcome at https://github.com/ChidiOkoene/optimal-brain/issues.

No API keys, no network calls, nothing installed. Part of [optimal-brain](https://github.com/ChidiOkoene/optimal-brain) (MIT), forked from [mattpocock/skills](https://github.com/mattpocock/skills).
