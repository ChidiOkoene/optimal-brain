---
type: decision-trace
created: YYYY-MM-DD
ingested_via: research-from-vault | agent-loop | until-done | teach
confidence: medium
---

# Decision Trace: {{Short Title}}

**Goal:** {{What the run was trying to accomplish}}
**Started:** YYYY-MM-DD
**Outcome:** completed | stopped-by-rule | needs-human
**Stop reason:** {{Why the run ended}}

## Actions taken

1. Read [[Source Note A]] and [[Source Note B]]
2. Produced [[Synthesis Note Title]]
3. Bridged [[Learning Record Title]]
4. Updated [[Context Index]] / [[Learning Records Index]]

## Evidence used

- [[Source companion or PDF note]]
- `.agent/context/knowledge-vault.md` (fallback: `docs/agents/knowledge-vault.md`)
- `.agent/context/project-context.md` (fallback: `docs/agents/project-context.md`) (if present)

## Outputs

- Synthesis: [[Note Title]]
- Learning record: [[Note Title]] (if applicable)

## Human checkpoint

- {{What the human should review before acting on this trace}}

## See also

- [[Context Index]]
- Repo: `.agent/context/decision-traces/` (fallback: `docs/agents/decision-traces/`) (for engineering-side traces, if used)
