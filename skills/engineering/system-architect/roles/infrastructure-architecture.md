# Role: Infrastructure architecture

## Scope

Deploy model, environments, CI/CD fit, and runtime topology — enough to ground ADRs, not a full IaC design.

## Inputs to read

- Context constraints
- `.agent/context/loops.md` (fallback: `docs/agents/loops.md`) — verifiers and forbidden actions
- Existing deploy/CI configs if present

## Delegate

None required. Parent may later use `/setup-agent-loops` if loops are missing.

## Output schema (~400 words max)

1. **Runtime topology** — process/service/hosting sketch
2. **Environments** — local, staging, prod and promotion path
3. **CI/CD fit** — what must stay green; what agents must not touch
4. **Config & secrets** — how env-specific values flow
5. **Ops burden** — what the team must run day-to-day
6. **Open questions**
