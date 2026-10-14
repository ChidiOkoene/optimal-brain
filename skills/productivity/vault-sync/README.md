# vault-sync

Keeps the Obsidian vault in step with your work. At the end of a session (or whenever you ask) it diffs git since the last sync, updates or flags notes whose sources changed, saves decisions, review findings and grill answers that weren't written down, and appends a session note.

Pairs with the `## Vault write-back` block that `setup-optimal-brain` adds to `AGENTS.md`/`CLAUDE.md`: the block makes the agent write as it goes, and `vault-sync` catches what it missed.

## How to invoke

Type `/vault-sync`, or say "sync the vault". `two-axis-review`, `agent-loop`, `until-done` and `handoff` suggest it when they finish.

## What it reads and writes

- **Reads:** `.agent/context/knowledge-vault.md`, `project-context.md`, `vault-sync.md`; `git log`/`git diff`; vault notes' `source_paths` and `source_commit` frontmatter.
- **Writes:** updated or stale-flagged notes, new Decision Traces/Findings, a dated session note, index links, and `.agent/context/vault-sync.md` (last synced commit).
- `vault-stale.mjs` is an optional, dependency-free, read-only helper: `node vault-stale.mjs --vault <folder> --repo .` prints stale notes as JSON.
- Reads and writes only this repo and the vault path you configured. It never scans the disk for a vault, never deletes notes, and never reads `.env` files, credentials, or secrets.

## Agents tested

- **OpenCode** with a Haiku-class model via OpenRouter: see the PR test notes.
- **Claude Code:** supported via the plugin manifest, **not yet tested**.

No API keys, no network calls, nothing installed. Part of [optimal-brain](https://github.com/ChidiOkoene/optimal-brain) (MIT).
