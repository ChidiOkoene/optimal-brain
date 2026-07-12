# Project Context Overlay

Per-repo filter over the global vault context graph. Answers: which global knowledge applies to **this** project, what repo decisions govern action, and what agent rules apply here.

**Project:** {{PROJECT_NAME}}
**Vault:** {{VAULT_PATH}}

## Relevant global knowledge

Notes from the vault that matter for this project (link to Context Index for full validity):

- [[Example Synthesis Note]] — exploratory, use for design only
- [[Example Learning Record]] — high confidence

## Active repo decisions

- `CONTEXT.md` — project domain vocabulary
- ADRs in `docs/adr/` — hard engineering decisions for this repo
- _(list active ADR titles or slugs, e.g. ADR-0001: event-sourced write model)_

## Active agent rules

- `docs/agents/knowledge-vault.md` — vault path and conventions
- `docs/agents/loops.md` — verification, stop rules, editable scope
- `docs/agents/project-context.md` (this file)

## Engineering decision traces (optional)

When configured, significant engineering loop runs may emit traces under:

- `docs/agents/decision-traces/`

## Do not treat as implementation truth without review

- [[Exploratory synthesis notes listed here]]

## Read order for agents

1. `docs/agents/knowledge-vault.md`
2. `docs/agents/loops.md`
3. This file (`docs/agents/project-context.md`)
4. Vault `Indexes/Context Index.md` (or `Context Index.md` at vault root)
5. Traverse relevant `[[wikilinks]]`

## Maintenance

Update when new vault synthesis becomes project-relevant, when ADRs change, or after significant research/engineering runs. Use recipe `maintain-context-graph.md`.
