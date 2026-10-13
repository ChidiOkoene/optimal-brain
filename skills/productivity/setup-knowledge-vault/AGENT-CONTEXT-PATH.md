# Agent context path (consumer repos)

Per-repo agent configuration lives under **`.agent/context/`** — not scattered at repo root or under `docs/agents/`.

## Resolution rule (all skills)

For any agent config file `<name>` (e.g. `knowledge-vault.md`, `loops.md`):

1. Read **`.agent/context/<name>`** first.
2. If missing, fall back to **`docs/agents/<name>`** (legacy installs only).
3. If both are missing for `knowledge-vault.md` or `project-context.md`: if a committed `.agent/context/<name minus .md>.example.md` exists, tell the user to copy it to `<name>` and fill in their own path (or run `/setup-knowledge-vault`). Never use the example's placeholder path as a real vault. Otherwise point to `/setup-knowledge-vault` and stop the vault-dependent part; don't guess paths.

Same for directories: `.agent/context/decision-traces/` before `docs/agents/decision-traces/`.

## Standard layout

```text
.agent/
  context/
    README.md              # this folder — agent config only
    knowledge-vault.md     # vault path + conventions (personal, gitignored)
    knowledge-vault.example.md  # optional, committed template for teammates
    project-context.md     # which vault notes apply to this project (personal, gitignored)
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

## Git (what to commit, what to ignore)

Two files in `.agent/context/` hold **one person's machine**: `knowledge-vault.md` has an absolute path to *your* Obsidian vault, and `project-context.md` lists *your* vault notes. Committed, they break every teammate's setup and leak your folder layout. `.scratch/` holds local drafts and issue files. Everything else in `.agent/context/` is shared team config and should be committed.

Every setup skill ends with this step.

**(a) Ignore the personal files.** Append this block to the consumer repo's `.gitignore`. **Append only; never rewrite the file.** Read it first. If the line `# optimal-brain (personal)` is already there, append just the missing entries and don't create a second block. Otherwise append the block at the end with `>>`, creating the file only if it doesn't exist. Never truncate, reorder, or regenerate `.gitignore` (no `>` redirect, no full-file write).

```gitignore
# optimal-brain (personal)
.agent/context/knowledge-vault.md
.agent/context/project-context.md
.scratch/
```

If one of these files is already tracked, `.gitignore` won't hide it. Tell the user to run `git rm --cached <file>` themselves. Don't run it for them.

**(b) Commit the shared config.** Tell the user what to commit and why:

| Commit | Why |
|--------|-----|
| The rest of `.agent/context/` (`README.md`, `loops.md`, `issue-tracker.md`, `triage-labels.md`, `domain.md`, `decision-traces/`, `decision-maps/`, `architecture-sessions/`) | Same tracker, labels, verification commands, and stop rules for every person and agent on the repo. |
| The `## Agent skills` block in `AGENTS.md` / `CLAUDE.md` | That's how agents find `.agent/context/` at all. |
| `CONTEXT.md` | The shared domain glossary. |
| `docs/adr/` | Decisions the whole team relies on. |

Suggest a commit message like `chore: add optimal-brain agent config`. Don't commit or push for them.

**(c) Teams: offer an example file.** If other people work in the repo, offer to write `.agent/context/knowledge-vault.example.md` from `templates/knowledge-vault-example-template.md` in `/setup-knowledge-vault`. It has placeholder paths and gets committed. Each teammate copies it to `knowledge-vault.md` (gitignored) and fills in their own vault path, or runs `/setup-knowledge-vault`.
