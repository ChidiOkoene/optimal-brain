# Role: Context and constraints

## Scope

Problem statement, stakeholders, success metrics, hard constraints, and non-goals. Frame the engagement before other views.

## Inputs to read

- User prompt / engagement goal
- `CONTEXT.md` if present (vocabulary only — do not run full domain-modeling yet)
- `.agent/context/project-context.md` (fallback: `docs/agents/project-context.md`) when present

## Delegate for gaps

If stakeholders or success criteria are fuzzy, parent may run `/grilling` (model-invoked) before continuing.

## Output schema (~400 words max)

1. **Problem** — one paragraph
2. **Stakeholders** — who cares / who decides
3. **Success metrics** — measurable or clearly qualitative
4. **Constraints** — time, budget, tech, compliance, team
5. **Non-goals** — explicitly out of scope
6. **Open questions** — blockers for later roles
