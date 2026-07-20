# Architecture Session Format

Session hubs live at:

```text
.agent/context/architecture-sessions/<YYYY-MM-DD-slug>.md
```

Create the directory lazily. Track in git (team-shared agent config).

## Frontmatter

```yaml
---
type: architecture-session
engagement: discovery | as_is_review | target_design | migration
slug: short-kebab-slug
started: YYYY-MM-DD
status: in-progress | complete
decision_map: ""   # optional path to .agent/context/decision-maps/<slug>.md
---
```

## Body template

```markdown
# Architecture Session: {{Title}}

## Goal

{{One paragraph: what this engagement must answer}}

## Engagement

- Type: {{engagement}}
- Roles run: {{list}}

## Timeline

- HH:MM — Opened session
- HH:MM — Role: context-and-constraints — complete
- HH:MM — Linked decision map (if any)

## Role outputs

### Context and constraints

{{Paste or summarize role output}}

### Domain architecture

…

_(one heading per role that ran)_

## Cross-cutting synthesis

- Risks:
- Open questions:
- Recommended ADRs:
- CONTEXT.md / project-context updates:

## Links

- Decision map: `.agent/context/decision-maps/…` (if used)
- ADRs: `docs/adr/…`
- Vault research session: `[[…]]` (if used)
- HTML as-is report: {{temp path}} (if used)
- Context canvas: `{ProjectFolder}/Context Graph.canvas` (if refreshed)

## Next step

{{One concrete action: /to-prd, another engagement, /decision-mapping resume, etc.}}
```

## Rules

- Keep the hub compact — role bodies ~400 words each when from subagents.
- Link assets; do not paste full HTML reports or entire vault notes.
- Mark `status: complete` when synthesis and next step are recorded.
