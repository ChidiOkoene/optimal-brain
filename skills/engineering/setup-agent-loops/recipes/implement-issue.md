# Recipe: Implement one issue

**Use when:** you have agent-ready issues from `/to-issues` or `/triage` and want one implemented with verification.

**Requires:** `/setup-matt-pocock-skills` and `/setup-agent-loops` completed in this repo.

## Flow

1. **Fresh Agent chat** — one issue per session (context hygiene).
2. Pass the PRD and single issue number.
3. Invoke:

```
/implement

Issue: #42
PRD: [link or paste]

Iterate until verifiers in docs/agents/loops.md pass. Respect stop rules.
```

Or use the goal-based entry point:

```
/until-done Implement issue #42 per the PRD. Use TDD at pre-agreed seams. Stop when verifiers in docs/agents/loops.md pass.
```

## Tips

- Issues from `/to-issues` are already agent-ready — don't `/triage` them.
- Use `/handoff` if the session approaches the smart zone before finishing.
