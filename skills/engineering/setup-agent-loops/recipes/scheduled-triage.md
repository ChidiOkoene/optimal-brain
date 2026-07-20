# Recipe: Scheduled triage

**Use when:** incoming issues or external PRs pile up and you want periodic triage without manual prompting.

**Requires:** `/setup-optimal-brain` completed (issue tracker + triage labels configured).

## Fixed interval

```
/loop 1h /triage
```

Process issues that need triage per `.agent/context/triage-labels.md` (fallback: `docs/agents/triage-labels.md`). Stop when the triage queue is empty or a stop rule fires.

## Dynamic interval

```
/loop /triage
```

Agent self-paces — useful when issue volume is unpredictable.

## Tips

- Triage is only for issues **you didn't create** — not slices from `/to-issues`.
- Watch the first run to confirm label strings match your issue tracker.
