---
name: until-done
description: Run a goal-based agent loop until verification passes or a stop rule fires — Cursor's equivalent of handing off the stop condition.
disable-model-invocation: true
argument-hint: "A clear goal with optional verifier override"
---

# Until Done

Hand off the **stop condition** to the agent. You define what done looks like; the agent loops until verification passes or a stop rule fires.

## Parse the goal

The user's argument is the goal. If empty, ask: "What should be true when this loop stops?"

Examples:

- "Fix the failing test in `user_service_test.ts`"
- "Implement issue #42 per the PRD"
- "Reduce bundle size below 500kb"
- "Research agent memory from vault until synthesis note, learning record, Context Index update, and decision trace exist"

## Confirm verifier

Read `docs/agents/loops.md` if it exists. Confirm which verifier commands apply, or accept an override the user stated in the prompt.

If `docs/agents/loops.md` is missing, propose conservative defaults and suggest `/setup-agent-loops`.

## Run the loop

Execute the agent-loop discipline (Plan → Act → Observe → Verify → Stop) until:

- All applicable verifiers pass, **or**
- A stop rule fires (see agent-loop's STOP-RULES)

When building features, reach for `/tdd` at pre-agreed seams. When stuck on a failure, reach for `/diagnosing-bugs`.

Knowledge gaps: if the goal requires understanding or synthesis from personal sources, reach for `research-from-vault`. "Research X using my vault until synthesis + learning record is written" is a valid goal. External research may be used first to populate the vault, followed by vault synthesis.

## Present the brief

When the loop ends, present:

1. **Outcome** — success / capped / blocked
2. **Changes** — files touched, commits if any
3. **Verifier** — last command and result
4. **Next step** — one concrete action for the human, if any

Keep the brief decision-ready — not a raw log dump.
