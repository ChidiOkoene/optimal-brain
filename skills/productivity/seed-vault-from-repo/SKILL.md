---
name: seed-vault-from-repo
description: Populate an existing optimal-brain Obsidian vault from the current state of a repo (code layout, READMEs, docs, ADRs, plans, CI/pipeline configs). Discovers units (monorepo workspaces or sub-projects), confirms the unit list and vault layout, then writes per-unit Findings, Decision Traces, Plans and a Unit Index one unit at a time, plus a Shared layer for cross-unit contracts. Every note cites source paths and the commit; re-sync mode updates only stale notes. Use when the user wants the vault to know an existing codebase or monorepo, after /setup-knowledge-vault, or says seed/re-sync the vault from this repo. Reads and writes only this repo and the vault path you configured.
disable-model-invocation: true
argument-hint: "[resync] [unit paths...]"
---

# Seed Vault from Repo

Turn what a repo already knows (code layout, READMEs, docs, ADRs, plans, CI) into linked, sourced vault notes, so research, `/write-from-vault`, and future sessions can use them. The notes **summarize**; they don't mirror the code.

Prompt-driven, not a script. Draft first, write only when the user says so, and do one unit per pass.

## 0. Preconditions

- Read `.agent/context/knowledge-vault.md` (fallback `docs/agents/knowledge-vault.md`). If it's missing, stop and tell the user to run `/setup-knowledge-vault` first. If only `knowledge-vault.example.md` exists, ask them to copy it and fill in their own path. Never guess a vault path.
- Get `git rev-parse HEAD` and `git status --porcelain`. With a dirty tree, ask: seed from HEAD (uncommitted changes ignored) or wait. Every note records `source_commit`.
- Read the vault's layout and conventions from the **Vault Layout** section of `knowledge-vault.md`: index folder (`Indexes/` or vault root), flat or substructure, folder names, Title Case, wikilinks, and the project folder from `project-context.md`. Follow them over the defaults here. If the layout isn't stated, ask the user once and offer to record the answer in `knowledge-vault.md`. Never assume `Indexes/`.
- Note titles must be filename-safe: no `:` `/` `\` `?` `*` `<` `>` `|` `"`. Use ` - ` as the separator (e.g. `Plan - Warehouse Migration`, `Decision Trace - Use DuckDB`).
- Argument `resync` jumps to [RESYNC.md](./RESYNC.md).

## 1. Discover units, then confirm

Find units in this order, and stop at the first source that gives a clear answer:

1. **User-supplied list** of paths.
2. **Workspace manifests**: `pnpm-workspace.yaml`, `package.json` `workspaces`, `turbo.json`, `nx.json`, `Cargo.toml` `[workspace]`, `go.work`, `pyproject.toml` (uv/poetry workspaces), `lerna.json`, Bazel/Pants roots, git submodules.
3. **Folders with their own README, docs, or plans** (`README*`, `docs/`, `adr/`, `plans/`, `.cursor/plans/`, `.agent/context/`) one or two levels down.
4. Otherwise the whole repo is **one unit**, and you skip the Shared pass.

For each unit, list what you'd read: README and docs, ADRs, plans, pipeline/CI/job definitions, entry points, and schemas/contracts (SQL DDL, dbt models, OpenAPI/proto/GraphQL, feature definitions, event schemas). Present a **draft**:

- the unit list (name, path, one-line purpose, sources found)
- the vault layout (from [TEMPLATES.md](./TEMPLATES.md#vault-layout))
- the planned note count per unit
- the order of passes
- anything you'll skip, and why

Ask the user to edit it. Write nothing until they say "write it" (or equivalent).

## 2. Per-unit pass (one unit at a time)

For the current unit only, draft and then write under `<Project>/<Unit Name>/`:

- `Findings/`: one note per component, pipeline, job, service, or model. Cover what it is, its inputs and outputs, where it runs, and its owner if stated.
- `Decision Traces/`: one per existing ADR or clearly recorded decision (`type: decision-trace`, linking the ADR path). Don't invent decisions from code alone. If a choice is only implied, record it as an open question.
- `Plans/`: one per plan doc or roadmap item, with `status` (`proposed | in-progress | done | abandoned | unknown`) and evidence for that status.
- `<Unit Name> Index.md`: purpose, components, decisions, plans, open questions, and links out to Shared notes.

Use the frontmatter and section shapes in [TEMPLATES.md](./TEMPLATES.md). Show the user the note list plus 2–3 sample notes, write after approval, then **stop for review** before the next unit.

## 3. Shared pass (multi-unit repos only)

After all units are done, write `<Project>/Shared/`:

- **Contract notes**: one per thing crossing a unit boundary (table, dataset, feature, API, event, schema, artifact), with its producer, consumers, schema location, and owners.
- **End-to-End Flow**: how data and requests move across units.
- **Shared Infra and CI**: pipelines, environments, and deploy paths used by several units.
- **Glossary**: terms with per-unit meanings. Defer to `CONTEXT.md` if it exists.

Cross-link both sides. Each contract links the producer and consumer Findings, and those Findings link back under `## Contracts`. Then update `<Index Folder>/Context Index.md` (index folder from `knowledge-vault.md`) (create it from `/setup-knowledge-vault`'s template if it's missing) with every Unit Index and Shared note.

## 4. Guardrails (always)

- **Summarize, don't mirror.** No code blocks copied from the repo, only short identifiers (file, function, table, and job names) in backticks.
- **Never open or copy secrets**: `.env*`, key/cert files, credentials, tokens, `secrets.*`, CI secret values, or kube secrets. Don't copy data samples (CSV/Parquet rows, fixtures with real-looking records, notebook outputs). Note that such a file exists and its path, nothing more.
- **Cite.** Frontmatter gets `source_paths`, `source_commit`, and `seeded_at`. Body claims point at paths.
- **Mark inference.** Anything not stated in the repo gets `(inferred)` and `confidence: medium` or `exploratory`, and each note's `## Open Questions` lists what a human should confirm.
- **No fake content.** If a section has no evidence, write "Not found in repo" instead of filling it.
- **Everything below `## Manual` is user-owned.** Never edit or delete it (see [RESYNC.md](./RESYNC.md)).

## 5. Re-sync

`/seed-vault-from-repo resync` diffs each note's `source_commit..HEAD` over its `source_paths`. It updates only stale notes, flags deleted or renamed sources, and never silently deletes user-edited notes. See [RESYNC.md](./RESYNC.md).

## 6. Done

Report what was written (counts per unit, plus Shared), the open questions, the inferred claims to check, and the commit seeded from. Suggest next steps:
- `research-from-vault` to connect the repo notes with existing research
- `/vault-context-canvas` for a visual graph
- `/loop 7d /seed-vault-from-repo resync` (Cursor) or a manual re-sync after big merges

A worked, clearly illustrative example is in [examples/data-ml-monorepo.md](./examples/data-ml-monorepo.md). Sources are in [REFERENCES.md](./REFERENCES.md).
