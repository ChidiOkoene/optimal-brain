# Templates

Folder names and the index location come from the Vault Layout section of `.agent/context/knowledge-vault.md`; the tree below shows defaults only. Note titles must be filename-safe: no `:` `/` `\` `?` `*` `<` `>` `|` `"`. Use ` - ` as the separator (e.g. `Plan - Warehouse Migration`, `Decision Trace - Use DuckDB`).

Adapt names to the vault's existing conventions (see `.agent/context/knowledge-vault.md`). `<Project>` is the project folder from `project-context.md`, or the repo name if there isn't one.

## Vault layout

```text
<Project>/
  <Unit Name>/
    <Unit Name> Index.md
    Findings/          # one note per component / pipeline / job / service / model
    Decision Traces/   # one per ADR or recorded decision
    Plans/             # one per plan, with status
  Shared/              # multi-unit repos only
    End-to-End Flow.md
    Shared Infra and CI.md
    Glossary.md
    <Contract Name>.md # one per table / API / feature / schema crossing units
<Index Folder>/         # from knowledge-vault.md: Indexes/ or vault root (flat)
  Context Index.md     # every Unit Index + Shared note listed under Active knowledge
```

For a single-unit repo, drop the `<Unit Name>/` level and put the folders directly under `<Project>/`.

## Common frontmatter (every seeded note)

```yaml
---
type: finding | decision-trace | plan | unit-index | contract | flow | glossary
unit: "[[<Unit Name> Index]]"        # omit on Shared notes
source_paths:                         # repo-relative, files or folders actually read
  - services/ingest/README.md
  - services/ingest/pipelines/
source_commit: <full sha>             # HEAD at seed time
seeded_at: YYYY-MM-DD
seeded_by: seed-vault-from-repo
confidence: high | medium | exploratory   # high = stated in repo; medium/exploratory = inferred
status: <plans only: proposed | in-progress | done | abandoned | unknown>
superseded_by: null
---
```

`high` only when the repo states it outright (README, ADR, config). Anything read off code structure is `medium`. Anything guessed is `exploratory`.

## Finding (component / pipeline / job)

```markdown
# <Component Name>

**What it is:** one or two sentences.
**Runs:** where and when (scheduler, CI job, service). Cite the config path.
**Inputs → Outputs:** names only (tables, topics, endpoints, files), each linked to a Shared contract when one exists.
**Owner:** as stated (CODEOWNERS, README), or "Not found in repo".

## How It Works
Three to six bullets. Identifiers in backticks, no copied code.

## Contracts
- Produces [[<Contract Name>]]
- Consumes [[<Contract Name>]]

## Open Questions
- (inferred) ...

## Manual
<!-- Yours. seed-vault-from-repo never edits below this heading. -->
```

## Decision Trace (from ADR or recorded decision)

```markdown
# Decision Trace - <Decision Title>

**Source:** `docs/adr/0003-....md` (status in ADR: accepted | superseded | ...)
**Decision:** one sentence.
**Context:** why, from the ADR.
**Consequences:** what it constrains, linked to [[Findings]] it affects.
**Superseded by:** [[...]] if the ADR says so (also set `superseded_by`).

## Manual
```

## Plan

```markdown
# Plan - <Plan Title>

**Source:** `plans/....md`
**Status:** <status>. Evidence: e.g. "checkboxes 4/7 done", "merged in PR #123 (per git log)", or "unknown".
**Goal:** one sentence.
**Touches:** [[Findings]] / [[Contracts]].

## Open Questions

## Manual
```

## Unit Index

```markdown
# <Unit Name> Index

**Path:** `<unit path>` · **Seeded from:** `<short sha>` on YYYY-MM-DD
**Purpose:** one or two sentences from the unit README.

## Components
- [[...]]

## Decisions
- [[Decision Trace - ...]]

## Plans
| Plan | Status |
|------|--------|
| [[Plan - ...]] | in-progress |

## Shared Contracts
- [[<Contract Name>]] (produces / consumes)

## Not Seeded
Paths skipped, and why (secrets, data samples, generated code, vendored deps).

## Open Questions

## Manual
```

## Contract (Shared)

```markdown
# <Contract Name>

**Kind:** table | dataset | feature | API | event | schema | artifact
**Schema lives at:** `path` (link only, no schema copied beyond column/field names if needed)
**Producer:** [[<Producer Finding>]] in [[<Unit> Index]]
**Consumers:** [[<Consumer Finding>]] in [[<Unit> Index]], ...
**Owners:** as stated, or "Not found in repo"
**Guarantees:** freshness, SLAs, versioning as stated; else "Not found in repo"

## Open Questions

## Manual
```

## End-to-End Flow, Shared Infra and CI, Glossary

- **End-to-End Flow:** numbered steps across units, each linking a Finding or Contract. Use a Mermaid diagram only if the vault already uses Mermaid.
- **Shared Infra and CI:** workflows and pipelines that touch several units (cite `.github/workflows/*.yml`, `Jenkinsfile`, Airflow/Dagster/Argo definitions), environments, and deploy targets. Names only, never secret values.
- **Glossary:** `Term`, then its meaning, then the units that use it. Note conflicting meanings explicitly. Link `CONTEXT.md` if it exists.
