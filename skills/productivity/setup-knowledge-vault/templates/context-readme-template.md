# Agent context

This folder holds **agent configuration** for this repo — vault integration, loops, issue tracker mapping, project overlay, decision maps, decision traces, and architecture sessions.

Skills read these files; they are not application source code.

- **Primary location:** `.agent/context/` (this folder)
- **Legacy fallback:** `docs/agents/` (older installs)

Human-facing domain docs (`CONTEXT.md`, ADRs) stay at their conventional repo paths; see `domain.md` here for locations.

Commit this folder so the team shares the same agent setup, **except** `knowledge-vault.md` and `project-context.md`. Those hold personal vault paths and go under `# optimal-brain (personal)` in `.gitignore`. Teammates copy `knowledge-vault.example.md`, if there is one.
