# Role: Options and ADRs

## Scope

Compare alternatives, recommend a path, and draft ADR-ready decisions. Parent writes files after user confirms.

## Inputs to read

- All prior role outputs in the session hub
- Existing `docs/adr/`
- ADR rules: use format from **domain-modeling** ADR-FORMAT (short context + decision + why)

## Delegate

- Parent confirms and writes ADRs to `docs/adr/`
- Fog remaining → parent bootstraps **`/decision-mapping`**

## Output schema (~400 words max)

1. **Options** — 2–4 alternatives with one-line tradeoff each
2. **Recommendation** — opinionated pick + why
3. **ADR drafts** — title + 1–3 sentence body each (only for hard-to-reverse, surprising, real tradeoffs)
4. **Deferred** — decisions that should wait
5. **Delivery handoff** — ready for `/to-prd`? what still blocks?
6. **Open questions**
