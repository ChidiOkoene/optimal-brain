---
name: setup-agent-loops
description: Configure this repo for agent loops (verification commands, stop rules, scope, starter recipes), or design a custom recurring workflow spec. Run once before /until-done or autonomous iteration.
disable-model-invocation: true
---

# Setup Agent Loops

Scaffold the per-repo configuration that loop-engineering skills assume:

- **Verification** — commands the agent runs after every change to know pass/fail
- **Stop rules** — when to quit iterating (caps, no-progress, forbidden actions)
- **Scope** — which paths the agent may edit during a loop

This is a prompt-driven skill, not a deterministic script. Explore, present what you found, confirm with the user, then write.

**Two paths.** Ask which one the user wants if it isn't obvious:

- **Configure this repo** (default): the process below.
- **Design a custom workflow**: the user wants to delegate a recurring job (a chore, a review, a weekly routine) and needs a buildable spec. Follow [recipes/design-custom-workflow.md](./recipes/design-custom-workflow.md) and write the spec with [workflow-spec-template.md](./workflow-spec-template.md). If the workflow edits this repo and Sections A-C below haven't been done, do them first. Research behind it: [REFERENCES.md](./REFERENCES.md).

## Process

### 1. Explore

Look at the current repo to understand its starting state. Read whatever exists; don't assume:

- `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `Makefile` — what verification commands exist?
- `AGENTS.md` and `CLAUDE.md` at the repo root — is there already an `## Agent loops` section?
- `.agent/context/loops.md` — does this skill's prior output already exist?
- `.agent/context/` — other agent config from `/setup-optimal-brain`
- `docs/agents/` — legacy fallback only
- Test runner config (`vitest.config.*`, `jest.config.*`, `pytest.ini`, etc.)

### 2. Present findings and ask

Summarise what's present and what's missing. Walk the user through the three decisions **one at a time** — present a section, get the user's answer, then move to the next.

Assume the user does not know what these terms mean. Each section starts with a short explainer, then shows choices and the default.

**Section A — Verification.**

> Explainer: Agent loops need an objective pass/fail signal — usually tests, typecheck, or lint. Without a verifier, the agent cannot tell when to stop. These commands run after every code change during a loop.

Propose commands detected from the repo. Typical defaults:

- **After each change** (fast feedback): single-file test, typecheck, or lint
- **Before stopping** (full gate): full test suite
- **Review gate** (optional): `/two-axis-review` in gate mode — a `FAIL` verdict counts as a failing verifier

Ask the user to confirm or override each command. If the repo has no tests, propose typecheck or build as the verifier and note the gap.

**Section B — Stop rules.**

> Explainer: Stop rules prevent unbounded iteration — wasted tokens, repeated failures, or risky actions. The agent checks these every loop cycle.

Confirm or override:

- **Iteration cap** — max fix attempts on one task (default: 5)
- **No-progress threshold** — same failure N times with no meaningful diff change (default: 3)
- **Forbidden without approval** — git push, deploy, delete data, change CI config, edit `.env` (default: all of these)
- **Human checkpoints** — loop stops at PR-ready; human merges/deploys (default: yes)

**Section C — Scope.**

> Explainer: Scope boundaries keep loops safe. The agent should know which paths it may edit and whether optimization loops (Karpathy-style) apply.

Confirm:

- **Editable paths** — default: source and test dirs; exclude `node_modules`, `.git`, generated output
- **Optimization loops** — optional scalar metric + single editable file for experiment loops (default: off; most repos don't need this)

### 3. Confirm and edit

Show the user a draft of:

- The `## Agent loops` block to add to whichever of `CLAUDE.md` / `AGENTS.md` is being edited
- The contents of `.agent/context/loops.md`

Let them edit before writing.

### 4. Write

**Pick the file to edit:**

- If `CLAUDE.md` exists, edit it.
- Else if `AGENTS.md` exists, edit it.
- If neither exists, ask the user which one to create — don't pick for them.

Never create `AGENTS.md` when `CLAUDE.md` already exists (or vice versa).

If an `## Agent loops` block already exists, update in-place. If `## Agent skills` also exists, add `### Agent loops` as a subsection under it rather than duplicating the heading.

The block:

```markdown
## Agent loops

[one-line summary of verifier + iteration cap]. See `.agent/context/loops.md`.
```

Or, if nested under `## Agent skills`:

```markdown
### Agent loops

[one-line summary]. See `.agent/context/loops.md`.
```

Ensure `.agent/context/` exists (create with README from [context-readme-template.md](../../productivity/setup-knowledge-vault/templates/context-readme-template.md) if missing).

Write `.agent/context/loops.md` using [loops-template.md](./loops-template.md) as the starting point.

Point the user at starter recipes in this skill folder:

- [recipes/build-test-fix.md](./recipes/build-test-fix.md)
- [recipes/implement-issue.md](./recipes/implement-issue.md)
- [recipes/scheduled-triage.md](./recipes/scheduled-triage.md)
- [recipes/pr-until-mergeable.md](./recipes/pr-until-mergeable.md)
- [recipes/design-custom-workflow.md](./recipes/design-custom-workflow.md) — spec your own recurring workflow

### 5. Done

Tell the user setup is complete. Mention:

- `/until-done` for goal-based loops (Cursor's equivalent of `/goal`)
- Cursor's built-in `/loop` for time-based recurrence — combine with recipes above
- `/implement` reads `.agent/context/loops.md` automatically (fallback: `docs/agents/loops.md`)
- They can edit `.agent/context/loops.md` directly; re-run this skill only to restart from scratch

If `/setup-optimal-brain` has not been run yet, recommend it for issue tracker and domain doc setup.

### 6. Commit guidance

Follow the **Git** section of `AGENT-CONTEXT-PATH.md` in `/setup-knowledge-vault`. In short:

1. **Ignore the personal files.** Append this block to the repo's `.gitignore`, creating the file if needed. If `# optimal-brain (personal)` is already there, add only the missing lines and don't duplicate the block:
   ```gitignore
   # optimal-brain (personal)
   .agent/context/knowledge-vault.md
   .agent/context/project-context.md
   .scratch/
   ```
   If any of them is already tracked, tell the user to run `git rm --cached <file>`.
2. **Tell the user what to commit:** the rest of `.agent/context/`, the `## Agent skills` block in `AGENTS.md`/`CLAUDE.md`, `CONTEXT.md`, and `docs/adr/`. Shared config gives every teammate and agent the same tracker, labels, and verification. The ignored files hold machine-specific vault paths. Don't commit for them.
3. **Teams:** offer to write a committed `.agent/context/knowledge-vault.example.md` (placeholder paths) so teammates can copy it to their own gitignored `knowledge-vault.md`.
