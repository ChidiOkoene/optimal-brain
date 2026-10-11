---
name: implement
description: "Implement a piece of work based on a PRD or set of issues."
disable-model-invocation: true
---

Implement the work described by the user in the PRD or issues.

Read `.agent/context/loops.md` first (fallback: `docs/agents/loops.md`) — use its verification commands and stop rules (iteration cap, forbidden actions, scope boundaries). Iterate using the agent-loop discipline until verifiers pass or a stop rule fires. If both paths are missing, run typechecking regularly, single test files regularly, and the full test suite once at the end.

Use /tdd where possible, at pre-agreed seams.

Once verifiers pass, run `/two-axis-review` in gate mode against the branch's starting point, with the PRD/issue as the spec. A `FAIL` verdict counts as a failing verifier: fix the blocker/major findings and re-review (each re-review is a loop iteration). List remaining minor/nit findings in your final brief.

Commit your work to the current branch.
