# Stop Rules

Reference for when the agent-loop must **stop iterating** and present a brief to the user.

## Stop when verification passes

The primary success stop. All "after each change" verifiers from `docs/agents/loops.md` pass, and any "before stopping" gate has been run if the task touched multiple files.

## Stop when iteration cap is hit

Default: 5 fix attempts on one task. Count starts when the loop begins on a single goal.

Present: what was tried, last verifier output, what remains broken.

## Stop when no progress is detected

Default: same failure 3 times with no meaningful diff change between attempts.

"Meaningful" means the diff between attempts changes code in the area related to the failure — not comment-only or formatting-only churn.

Present: the repeated failure, hypothesis for why fixes aren't landing, ask human for direction.

## Stop when forbidden action is required

The next step would require an action listed under "Forbidden without human approval" in `docs/agents/loops.md` (push, deploy, delete data, CI config change, `.env` edit).

Present: what was accomplished, what needs human approval to continue.

## Stop when scope is exceeded

The fix requires editing paths outside the editable scope in `docs/agents/loops.md`.

Present: why the scope boundary blocks progress, suggest expanding scope or human intervention.

## Stop when human checkpoint reached

Loop work is PR-ready: tests pass, changes are committed locally, ready for human review and merge.

Do **not** push or merge autonomously unless the user explicitly overrides in the current prompt.

## Stop when diagnosis is stuck

After invoking diagnosing-bugs discipline, Phase 1 (tight repro loop) cannot be built.

Present: what was tried, ask for environment access or captured artifacts.

## Brief format

Every stop presents:

1. **Outcome** — success / capped / blocked / needs approval
2. **Changes** — files touched, commits if any
3. **Verifier** — last command run and its result
4. **Next step** — one concrete action for the human, if any
