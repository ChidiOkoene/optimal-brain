# Agent Loops

How loop-engineering skills (`agent-loop`, `/until-done`, `/implement`) should run verification and stop during autonomous iteration.

## Verification

Run these after every code change during a loop.

| When | Command | Pass signal |
| ---- | ------- | ----------- |
| After each change | `npm test -- <file>` | Exit code 0 |
| After each change | `npm run typecheck` | Exit code 0 |
| Before stopping | `npm test` | Exit code 0 |

Edit commands to match this repo's stack. The agent must be able to tell pass from fail from exit code and output alone.

## Stop rules

| Rule | Value |
| ---- | ----- |
| Iteration cap | 5 fix attempts on one task |
| No-progress threshold | Same failure 3 times with no meaningful diff change |
| Forbidden without human approval | `git push`, deploy, delete production data, change CI config, edit `.env` |
| Human checkpoint | Loop stops at PR-ready; human merges and deploys |

When a stop rule fires, the agent presents a **brief**: what changed, last verifier output, why it stopped.

## Scope

### Editable during loops

- `src/**`
- `tests/**` (or equivalent test directories)

### Never edit without approval

- `.github/workflows/**`
- `.env`, `.env.*`
- `node_modules/`, `.git/`, generated build output

## Optimization loops (optional)

Most repos leave this section empty. For Karpathy-style experiment loops, fill in:

| Field | Value |
| ----- | ----- |
| Goal metric | _(e.g. p95 latency from `npm run bench`)_ |
| Editable file(s) | _(e.g. `src/api/cache.ts` only)_ |
| Time/iteration budget | _(e.g. 10 iterations or 30 minutes)_ |

## Starter recipes

Copy-paste prompts live in the `setup-agent-loops` skill folder under `recipes/`. Common patterns:

- **Build-test-fix** — `/loop 5m` + iterate until verifier green
- **Implement issue** — fresh session + `/implement` + `/until-done`
- **Scheduled triage** — `/loop 1h /triage` (requires `/setup-optimal-brain`)
- **PR until mergeable** — Cursor `babysit` skill + loop stop rules

Significant engineering loop runs may emit decision traces under `docs/agents/decision-traces/` when that folder exists (see `/setup-knowledge-vault` context graph setup).
