---
name: project-notes
description: Capture personal notes during or after research in the Obsidian vault under the project's Personal Notes folder.
disable-model-invocation: true
argument-hint: "Your thought, reflection, or debrief to save in the vault"
---

# Project Notes

Capture **your** voice during or after research — reflections, questions, todos, half-formed ideas. Notes land in the Obsidian vault under **`{ProjectFolder}/Personal Notes/`**, not in agent-owned `Research Sessions/` or `Findings/`.

Requires `/setup-knowledge-vault` (vault path + project overlay configured).

## Prerequisites

Read in order:

1. `.agent/context/knowledge-vault.md` (fallback: `docs/agents/knowledge-vault.md`) — vault root path and conventions
2. `.agent/context/project-context.md` (fallback: `docs/agents/project-context.md`) — project name / vault project folder

Resolve the personal notes directory:

```text
{VAULT_PATH}/{ProjectFolder}/Personal Notes/
```

`ProjectFolder` is the vault project folder from `project-context.md` (project name or slug). If missing, use the project name from that file and create the folder.

Create `Personal Notes/` if it does not exist.

## Format

Follow [PERSONAL-NOTE-FORMAT.md](./PERSONAL-NOTE-FORMAT.md).

## Invocation modes

### Quick capture

User pastes a thought or invokes with an argument. Either:

- Create `YYYY-MM-DD Short Title.md` with the content, or
- Append to today's note if the user wants a running journal (ask if unclear).

### During research

User says "note this while we research X" or similar during an active session:

- Link `session: "[[Research Session Title]]"` in frontmatter when a session hub exists
- Add `[[Research Session Title]]` under See also
- Do **not** write to `Findings/` — that is `research-from-vault`'s job

### After research (debrief)

User wants to reflect on completed research:

- Create a debrief note linking `[[Synthesis Note]]`, relevant `[[Finding]]` notes, and personal takeaways
- Optionally update `Personal Notes Index.md`

## Process

1. Parse user input — title, mode (quick / during / debrief), optional links to vault notes
2. Confirm vault path and project folder; create `Personal Notes/` if needed
3. Write or append the note using PERSONAL-NOTE-FORMAT
4. Update `Personal Notes Index.md` if it exists or user asked for indexing
5. Brief the user: file path written, wikilinks added

## Integration

- Complements `research-from-vault` — agent captures findings; you capture reflections
- After significant research, user may run `/vault-context-canvas` to visualize the context graph
- Research session hubs may optionally link back to personal notes under a "Personal reflections" line (user-driven only)

## When vault is not configured

Suggest `/setup-knowledge-vault` first. Do not guess vault paths.
