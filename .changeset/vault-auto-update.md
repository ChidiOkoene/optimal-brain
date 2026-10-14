---
"chidi-optimal-brain": minor
---

Keep the vault updated while you work. `setup-optimal-brain` and `setup-knowledge-vault` now write an idempotent, marker-delimited `## Vault write-back` block into `AGENTS.md` (and `CLAUDE.md` if present). New `vault-sync` skill diffs git since the last-synced commit, updates or flags stale notes via `source_commit`/`source_paths`, captures missed decisions, and appends a session note; ships a dependency-free `vault-stale.mjs` helper. `two-axis-review`, `agent-loop`, `until-done` and `handoff` point to it when they finish.
