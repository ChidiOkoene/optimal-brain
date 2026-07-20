# Subagent Orchestration

How `/system-architect` runs role briefs. **Portable core first; parallel subagents are acceleration.**

## Resolution paths

Always read agent config with:

1. `.agent/context/<file>` first
2. Fallback: `docs/agents/<file>`

## Mode A — Sequential (always available)

Use when the Task/Agent tool is unavailable, the IDE is not Cursor, or roles are dependent.

1. Run roles in engagement order (see ENGAGEMENT-TYPES.md).
2. For each role: load `roles/<name>.md`, gather inputs, produce the output schema, append to the session hub.
3. Invoke existing skills by prose (`Run the domain-modeling skill`, `research-from-vault`, etc.).
4. Split across sessions with `/handoff` if the window fills.

**No Cursor `/loop` required.** Optional: recurring hygiene via Cursor `/loop` + a recipe — never a hard dependency.

## Mode B — Parallel subagents (when available)

When the environment has a Task or Agent tool (e.g. Cursor):

1. Run **dependent** roles sequentially in the parent: `context-and-constraints` → `domain-architecture` → (then) `application-architecture`.
2. Spawn **independent** roles in parallel in one message (e.g. `security-architecture`, `data-architecture`, `integration-architecture`, `nfr-architecture`, `research-evidence`).
3. Each subagent prompt must include:
   - Path or full text of the role brief
   - Engagement goal and constraints from context role output
   - Output schema from the role file
   - Cap: **under ~400 words**
   - Instruction: do not invent vault/tracker paths; read `.agent/context/` first
4. Parent aggregates outputs into the session hub under matching headings.
5. Do not merge/rerank conflicting findings across security vs data — report both, then synthesize in Cross-cutting synthesis.

Pattern inspiration: in-progress `review` skill (parallel Standards/Spec) and `codebase-design` DESIGN-IT-TWICE.

## What subagents must not do

- Call other **user-invoked** skills (invocation rules: user-invoked cannot be reached by model alone). Parent invokes `/grill-with-docs`, `/decision-mapping`, `/improve-codebase-architecture`, `/to-prd`.
- Subagents **may** use **model-invoked** skills (`domain-modeling`, `codebase-design`, `research-from-vault`, `grilling`) when the brief says so.
- Do not write ADRs or PRDs from a narrow role — draft under options-and-adrs / parent synthesis only.
- Do not leave findings only in chat when vault research is in scope — follow RESEARCH-CAPTURE-FORMAT via `research-from-vault`.

## Fallback rule

If parallel spawn fails or is unsupported: fall back to Mode A without asking. Note in the session timeline: "sequential fallback".
