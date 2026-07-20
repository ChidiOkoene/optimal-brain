# Recipe: As-is architecture review

**Use when:** existing codebase; need friction, seams, and risks before redirecting.

**Requires:** `/setup-optimal-brain`; codebase present.

```
/system-architect as_is_review for this repo. Run context, application (including /improve-codebase-architecture HTML report), data, integration, NFR, and a security skim. Write .agent/context/architecture-sessions/YYYY-MM-DD-as-is.md. Link the temp HTML report path. Stop when cross-cutting synthesis lists top risks and a recommended next engagement (target_design or decision-mapping).
```

## Tips

- Do not propose full target architecture in this engagement unless the user asks — hand off to `target_design`.
- HTML report stays in OS temp dir (improve-codebase-architecture convention).
