# optimal-brain: full pack

All 35 optimal-brain skills in one install, with a router (`SKILL.md`) that starts you at `setup-optimal-brain`.

| Category | Skills |
|----------|--------|
| Setup and routing | `setup-optimal-brain` (start here), `ask-brain`, `setup-agent-loops`, `setup-knowledge-vault` |
| Planning and design | `grilling`, `grill-me`, `grill-with-docs`, `decision-mapping`, `domain-modeling`, `codebase-design`, `system-architect`, `prototype`, `to-prd`, `to-issues`, `triage` |
| Building, debugging, review | `implement`, `tdd`, `diagnosing-bugs`, `improve-codebase-architecture`, `resolving-merge-conflicts`, `two-axis-review` |
| Agent loops | `agent-loop`, `until-done` |
| Knowledge vault and writing | `research-from-vault`, `seed-vault-from-repo`, `write-from-vault`, `project-notes`, `vault-context-canvas`, `obsidian-vault`, `edit-article` |
| Learning and handoffs | `teach`, `handoff`, `writing-great-skills` |
| Opt-in tools | `setup-pre-commit`, `git-guardrails-claude-code` |

## Install and use

Unzip into your agent's skills folder (e.g. `~/.claude/skills/`, `.opencode/skills/`, or your agent's equivalent). Run `/setup-optimal-brain` first, then ask for what you want ("grill me on this plan", "turn this into a PRD", "diagnose this bug") or run `/ask-brain` for a recommendation.

## What it reads and writes

- The current repo, mainly `.agent/context/` and the docs the skills create (PRDs, ADRs, `CONTEXT.md`).
- Your issue tracker (GitHub by default) for `to-prd`, `to-issues` and `triage`, only after you confirm.
- The vault path you type, for the vault skills. They never scan the disk.
- No skill reads `.env` files or credentials. `write-from-vault/scripts/export.py` is standard-library Python and writes only inside your vault's `Drafts/<Title>/export/`.

**Opt-in tools** run only when you ask: `setup-pre-commit` installs Husky, lint-staged and Prettier as dev dependencies; `git-guardrails-claude-code` writes a hook into `.claude/` (or `~/.claude/` if you choose all projects) and is Claude Code only.

## Agents tested

- **Cursor:** used during development.
- **OpenCode 1.19.0** with `anthropic/claude-sonnet-5.5` via OpenRouter (headless smoke test, 2026-10-14): skill discovery and the setup-optimal-brain route. Details: [docs/AGENSI.md](https://github.com/ChidiOkoene/optimal-brain/blob/main/docs/AGENSI.md).
- **Claude Code:** supported, **not yet tested**.
- Others: untested. Please report at https://github.com/ChidiOkoene/optimal-brain/issues.

Source: https://github.com/ChidiOkoene/optimal-brain. MIT, based on [mattpocock/skills](https://github.com/mattpocock/skills) by Matt Pocock.
