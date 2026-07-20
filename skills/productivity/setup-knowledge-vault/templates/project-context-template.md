# Project Context Overlay

Per-repo filter over the global vault context graph. Answers: which global knowledge applies to **this** project, what repo decisions govern action, and what agent rules apply here.

**Project:** {{PROJECT_NAME}}
**Vault:** {{VAULT_PATH}}
**Vault project folder:** {{PROJECT_FOLDER}}

## Vault project artifacts

Per-project folder in the vault (not in the repo):

- **Personal notes:** `{ProjectFolder}/Personal Notes/` — your reflections during/after research (`/project-notes`)
- **Context canvas:** `{ProjectFolder}/Context Graph.canvas` — Obsidian JSON Canvas visual graph (`/vault-context-canvas`)

## Relevant global knowledge

Notes from the vault that matter for this project (link to Context Index for full validity):

- [[Example Synthesis Note]] — exploratory, use for design only
- [[Example Learning Record]] — high confidence

## Active repo decisions

- `CONTEXT.md` — project domain vocabulary
- ADRs in `docs/adr/` — hard engineering decisions for this repo
- _(list active ADR titles or slugs, e.g. ADR-0001: event-sourced write model)_

## Active agent rules

- `.agent/context/knowledge-vault.md` — vault path and conventions
- `.agent/context/loops.md` — verification, stop rules, editable scope
- `.agent/context/project-context.md` (this file)

Legacy fallback: if files missing under `.agent/context/`, skills read `docs/agents/` equivalents.

## Engineering decision traces (optional)

When configured, significant engineering loop runs may emit traces under:

- `.agent/context/decision-traces/`

## Do not treat as implementation truth without review

- [[Exploratory synthesis notes listed here]]

## Read order for agents

1. `.agent/context/knowledge-vault.md` (fallback: `docs/agents/knowledge-vault.md`)
2. `.agent/context/loops.md` (fallback: `docs/agents/loops.md`)
3. This file (`.agent/context/project-context.md`)
4. Vault `Indexes/Context Index.md` (or `Context Index.md` at vault root)
5. Traverse relevant `[[wikilinks]]`

## Maintenance

Update when new vault synthesis becomes project-relevant, when ADRs change, or after significant research/engineering runs. Use recipe `maintain-context-graph.md`.
