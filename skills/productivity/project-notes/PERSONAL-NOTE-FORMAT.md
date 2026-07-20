# Personal Note Format

Lightweight vault notes for **your** voice during or after research — reflections, questions, todos, half-formed ideas. Not agent-owned findings (those live in `Findings/` and `Research Sessions/` per RESEARCH-CAPTURE-FORMAT).

## Location

`{VAULT_PATH}/{ProjectFolder}/Personal Notes/`

- **Project folder** from `.agent/context/project-context.md` (vault project folder / project name).
- **Vault root** from `.agent/context/knowledge-vault.md` (fallback: `docs/agents/knowledge-vault.md`).

## Filename

`YYYY-MM-DD Short Title.md` — Title Case in the title portion.

Examples:
- `2026-07-16 Session Reflection.md`
- `2026-07-16 RAG Chunking Questions.md`

For quick capture on the same day, append to today's note if the user prefers one running journal entry.

## Frontmatter (optional but recommended)

```yaml
---
type: personal-note
project: "{{PROJECT_NAME}}"
date: YYYY-MM-DD
session: "[[Research Session Title]]"   # optional — link to active research session
tags: [personal, research]
---
```

## Body sections

Use what fits; keep it scannable:

```markdown
# Short Title

## Thoughts

Free-form reflections, reactions, intuitions.

## Questions

Open questions to revisit.

## Follow-ups

Todos, things to research next, people to ask.

## See also

- [[Research Session Title]] — if during/after a session
- [[Synthesis Note Title]] — if debriefing research
- [[Related Finding]] — optional cross-link to agent findings
```

## Wikilinks

- Always end with `## See also` when linking to vault notes.
- Use Title Case `[[wikilinks]]` consistent with vault conventions.
- Personal notes may link **to** Research Sessions and Findings; they do not replace them.

## Personal Notes Index (optional)

Maintain `{ProjectFolder}/Personal Notes/Personal Notes Index.md` as a flat list of `[[wikilinks]]` to personal notes, newest first.

## Distinction from research capture

| Personal note | Agent finding / session |
|---------------|-------------------------|
| Your subjective voice | Agent synthesis / evidence |
| `{ProjectFolder}/Personal Notes/` | `Research Sessions/`, `Findings/` |
| Optional structure | Mandatory RESEARCH-CAPTURE-FORMAT |
