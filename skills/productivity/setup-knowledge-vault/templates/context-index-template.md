# Context Index

Global glue for the vault context graph. Agents read this to know what knowledge is currently valid, what was superseded, and where recent decision traces live.

Location in vault: `Indexes/Context Index.md` (or vault root if flat layout preferred).

## Active knowledge (still valid)

Notes currently authoritative for research and grounding:

- [[Example Synthesis Note]] — high confidence, created {{DATE}}
- [[Example Learning Record]] — medium confidence

## Superseded knowledge

Do not treat as current unless explicitly reviewing history:

- [[Old Approach Note]] — superseded by [[Example Synthesis Note]]

## Recent decision traces

Audit trail of significant agent/research runs:

- [[Decision Trace: Example Research Run]]

## Vault indexes (quick links)

- [[Learning Records Index]]
- _(add topic indexes as needed, e.g. [[RAG Index]])_

## Validity reminders

- Prefer `confidence: high` notes with no `superseded_by`
- Exploratory notes require human review before engineering decisions
- For project-specific relevance, see repo `docs/agents/project-context.md`

## Maintenance

Refresh after significant research runs, supersession events, or via recipe `maintain-context-graph.md`.
