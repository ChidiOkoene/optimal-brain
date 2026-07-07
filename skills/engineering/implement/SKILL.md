---
name: implement
description: "Implement a piece of work based on a PRD or set of issues."
disable-model-invocation: true
---

Implement the work described by the user in the PRD or issues.

Read `docs/agents/loops.md` if it exists — use its verification commands and stop rules (iteration cap, forbidden actions, scope boundaries). Iterate using the agent-loop discipline until verifiers pass or a stop rule fires. If `docs/agents/loops.md` is missing, run typechecking regularly, single test files regularly, and the full test suite once at the end.

Use /tdd where possible, at pre-agreed seams.

Once done, use /review to review the work.

Commit your work to the current branch.
