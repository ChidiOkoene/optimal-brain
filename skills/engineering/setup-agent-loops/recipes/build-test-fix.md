# Recipe: Build-test-fix loop

**Use when:** tests or typecheck are failing on the current branch and you want the agent to fix them while you work on something else.

**Requires:** `/setup-agent-loops` completed in this repo.

## Fixed interval (watch while you work)

```
/loop 5m Run the after-each-change verifiers in docs/agents/loops.md. Fix any failures in scope of the current branch. Stop when all verifiers pass or a stop rule in docs/agents/loops.md fires.
```

## Goal-based (one session, explicit stop)

```
/until-done Fix all failing tests on this branch. Use verifiers from docs/agents/loops.md.
```

## Tips

- Narrow scope in the prompt if the branch is large: "Fix only `src/auth/**` test failures."
- Watch the first 2–3 cycles before leaving unattended — tighten scope if the agent over-reaches.
