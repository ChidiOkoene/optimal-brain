# Worked example: data-eng + ml-eng monorepo

> **Illustrative only.** The repo, names, and paths below are made up to show the shape of a run. They don't describe a real project, and a real run must never copy them.

## Repo (hypothetical)

```text
acme-analytics/
  pnpm-workspace.yaml        # lists data-platform, ml-platform
  data-platform/
    README.md
    docs/adr/0001-use-dbt-for-transforms.md
    dags/daily_orders.py     # Airflow DAG
    models/marts/fct_orders.sql
    plans/backfill-2024.md
  ml-platform/
    README.md
    features/order_features.yaml
    training/churn_model/    # pipeline code
    plans/realtime-scoring.md
  .github/workflows/ci.yml
  .env.example               # exists; values never read
```

## 1. Draft shown to the user

| Unit | Path | Purpose (from README) | Sources found |
|------|------|-----------------------|---------------|
| Data Platform | `data-platform/` | Ingest and model order data | README, 1 ADR, 1 DAG, dbt models, 1 plan |
| ML Platform | `ml-platform/` | Features and churn model | README, feature YAML, training pipeline, 1 plan |

The layout follows TEMPLATES.md, under `Acme Analytics/`. Planned notes:
- Data Platform: 3 Findings, 1 Decision Trace, 1 Plan, 1 Index
- ML Platform: 2 Findings, 1 Plan, 1 Index
- Shared: 1 contract, plus Flow, Infra, and Glossary

Skipped: `.env.example` (secrets policy), `data-platform/seeds/*.csv` (data samples).

The user renames "ML Platform" to "ML Engineering" and says **write it**.

## 2. Pass 1, Data Platform (then stop for review)

- `Acme Analytics/Data Platform/Findings/Daily Orders DAG.md` has `source_paths: [data-platform/dags/daily_orders.py]` and `confidence: high` for the schedule, which the DAG states. The owner line reads "Not found in repo".
- `Findings/Fct Orders Model.md` links `[[Fct Orders]]` under `## Contracts`.
- `Decision Traces/Decision Trace - Use dbt for Transforms.md` comes from ADR 0001.
- `Plans/Plan - Backfill 2024.md` has `status: in-progress`, with the evidence "3/5 checklist items ticked".
- `Data Platform Index.md`

## 3. Pass 2, ML Engineering

- `Findings/Order Features.md` reads `fct_orders` per `features/order_features.yaml`, so it links `[[Fct Orders]]`.
- `Findings/Churn Model Training.md` lists the open question "(inferred) retrain cadence unclear: no schedule found".
- `Plans/Plan - Realtime Scoring.md` has `status: proposed`.

## 4. Shared pass

- `Shared/Fct Orders.md`:
  - **Kind:** table
  - **Producer:** `[[Fct Orders Model]]`
  - **Consumers:** `[[Order Features]]`
  - **Schema:** link to `data-platform/models/marts/fct_orders.sql`
  - **Owners:** "Not found in repo"
- `Shared/End-to-End Flow.md`: orders, then the DAG, then `fct_orders`, then features, then training.
- `Shared/Shared Infra and CI.md`: `.github/workflows/ci.yml` jobs, listed by name.
- `Shared/Glossary.md`: "order" means a placed order in Data Platform but a completed order in the feature docs. This is flagged as a conflict.
- `Indexes/Context Index.md` (this example's `knowledge-vault.md` sets the index folder to `Indexes/`) gains both Unit Indexes and the four Shared notes.

## 5. Re-sync a week later (hypothetical)

`daily_orders.py` changed and `plans/realtime-scoring.md` was deleted. Re-sync then:
- updates `Daily Orders DAG.md` above `## Manual`
- marks `Plan - Realtime Scoring.md` with `status: source-deleted`, without deleting it
- leaves the user-edited `Order Features.md` alone and adds a `## Proposed Update` section to it instead
