# Recipe: PR until mergeable

**Use when:** you have an open PR with failing CI, unresolved comments, or merge conflicts.

**Requires:** `/setup-agent-loops` completed (stop rules especially).

## Cursor babysit skill

In a fresh Agent chat on the PR branch:

```
babysit
```

Or explicitly:

```
Keep this PR merge-ready: resolve conflicts, address valid review comments, fix CI failures in this PR's scope. Respect stop rules in docs/agents/loops.md. Do not change CI workflows to make failures pass.
```

## Time-based watch

While the PR is open:

```
/loop 30m Check PR CI and unresolved comments. Fix scoped issues per docs/agents/loops.md stop rules. Stop when mergeable and green or a stop rule fires.
```

## Tips

- Loop stops at PR-ready — **you** merge.
- For merge-blocking CI unrelated to your PR, merge latest base branch first before looping fixes.
