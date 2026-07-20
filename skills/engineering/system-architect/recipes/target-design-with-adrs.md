# Recipe: Target design with ADRs

**Use when:** ready to propose a coherent target and record hard decisions.

**Requires:** `/setup-optimal-brain`; prefer prior discovery or as-is session hub.

```
/system-architect target_design for {{GOAL}}. Use context → domain → application sequentially; parallelize data/integration/NFR/security only if load-bearing. End with options-and-adrs drafts. Write session hub and propose ADRs under docs/adr/ (confirm before writing). Stop when recommendation + ADR drafts + delivery handoff note exist.
```

## Tips

- Cap at ≤6 roles unless user asks for full coverage.
- Vault research: use research-from-vault + RESEARCH-CAPTURE-FORMAT, not chat-only citations.
