# Agent context path (consumer repos)

Per-repo agent configuration lives under **`.agent/context/`** — not scattered at repo root or under `docs/agents/`.

## Resolution rule (all skills)

For any agent config file `<name>` (e.g. `knowledge-vault.md`, `loops.md`):

1. Read **`.agent/context/<name>`** first.
2. If missing, fall back to **`docs/agents/<name>`** (legacy installs only).

Same for directories: `.agent/context/decision-traces/` before `docs/agents/decision-traces/`.

## Standard layout

```text
.agent/
  context/
    README.md              # this folder — agent config only
    knowledge-vault.md     # vault path + conventions (points to external Obsidian)
    project-context.md     # which vault notes apply to this project
    loops.md               # verification, stop rules, scope
    issue-tracker.md
    triage-labels.md
    domain.md              # where CONTEXT.md and ADRs live (human docs stay there)
    decision-traces/       # optional engineering loop audits
    decision-maps/         # decision-mapping ideation artifacts
    architecture-sessions/ # system-architect engagement hubs
```

**Not here:** `CONTEXT.md`, `docs/adr/` (human-facing domain docs), Obsidian vault (external path in `knowledge-vault.md`), installed skills (`.agents/skills/`).

## Migration

If legacy `docs/agents/` exists, copy files to `.agent/context/` or leave in place — fallback still works. Re-run setup skills to scaffold `.agent/context/` fresh.

## Git

Recommend **tracking** `.agent/context/` (team-shared agent config). Do not gitignore by default.
