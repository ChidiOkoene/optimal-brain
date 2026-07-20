# Recipe: Architecture to PRD

**Use when:** architecture session hub is complete enough to schedule build work.

**Requires:** existing `.agent/context/architecture-sessions/<slug>.md` with synthesis.

```
Read the architecture session hub at .agent/context/architecture-sessions/{{SLUG}}.md. Confirm ADRs and CONTEXT.md updates are recorded or proposed. Then run /to-prd to turn the agreed target architecture into a PRD suitable for /to-issues. Do not re-open all architect roles unless the hub marks blockers.
```

## Tips

- If open questions remain, resume `/decision-mapping` or another `/system-architect` engagement first.
- One PRD → `/to-issues` → fresh `/implement` per issue.
