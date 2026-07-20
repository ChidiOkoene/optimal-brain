# Agent context

This folder holds **agent configuration** for this repo — vault integration, loops, issue tracker mapping, project overlay, decision maps, decision traces, and architecture sessions.

Skills read these files; they are not application source code.

- **Primary location:** `.agent/context/` (this folder)
- **Legacy fallback:** `docs/agents/` (older installs)

Human-facing domain docs (`CONTEXT.md`, ADRs) stay at their conventional repo paths; see `domain.md` here for locations.

Do not gitignore this folder by default — commit it so the team shares the same agent setup.
