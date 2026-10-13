# Using optimal-brain with gstack

[garrytan/gstack](https://github.com/garrytan/gstack) is a large Claude Code skill pack for shipping product: planning reviews, PR review, QA in a real browser, security audit, ship/deploy, and GBrain memory. optimal-brain is the **research and knowledge layer**: an Obsidian vault the agent reads and writes, plus loops, architecture, and sourced writing. They overlap in a few places; this page says which to use where.

**Status:** checked against gstack's skill list (64 `SKILL.md` names, shallow clone on 2026-10-12). Running both packs together in one agent has **not been tested end to end**. Treat the "prefer" column as guidance, not a guarantee.

## Positioning

| | optimal-brain | gstack |
| - | ------------- | ------ |
| Core job | Turn research into durable, linked knowledge; build and write from it | Plan, review, test, and ship product code fast |
| Memory | **Vault notes**: human-readable Markdown in Obsidian (session hubs, Findings, synthesis, Context Index), with confidence and supersession rules. You read and edit them. | **GBrain**: a database-backed brain (PGLite or Supabase, MCP tools) that indexes your **code** (`/sync-gbrain`: symbol search, defs, refs) and stores agent pages; plus gstack `/learn` learnings. |
| Best at | "What do we know about X, and where did it come from?" | "Where is X defined, who calls it, and is this diff safe to land?" |

`/seed-vault-from-repo` and `/sync-gbrain` are not the same thing. The first writes human-readable vault notes that *summarize* a repo (components, decisions, plans, contracts); the second indexes code symbols. They can run side by side.

They complement each other: GBrain answers questions about the code; the vault answers questions about the world and your decisions. Keep research and sources in the vault; let GBrain index the repo.

## Name collisions

gstack's default Claude Code install puts unprefixed skills in `~/.claude/skills/gstack/` (other hosts get `gstack-*` prefixes). Comparing every skill name:

| Name | Status |
| ---- | ------ |
| `review` | **Collided.** gstack and optimal-brain both shipped `/review`. optimal-brain's is now **`two-axis-review`**. |
| everything else | No exact name clash. |

Why `two-axis-review`: it names what makes the skill different (Standards and Spec reviewed separately, never reranked), stays a valid Agent Skills name, and won't plausibly collide with a generic `review`/`code-review` from any pack. `vault-review` was rejected because the skill reviews code, not the vault.

## Overlapping skills: which to prefer

| Need | optimal-brain | gstack | Prefer |
| ---- | ------------- | ------ | ------ |
| Review a diff | `/two-axis-review` (Standards vs Spec, verdict, loop gate) | `/review` (pre-landing: SQL safety, LLM trust boundaries, side effects; may edit) | Both, in order: `/two-axis-review` inside loops for spec fidelity; gstack `/review` right before landing. Our `/implement` calls `/two-axis-review` only. |
| Debug a hard bug | `diagnosing-bugs` | `/investigate` | Either; pick one per session. `diagnosing-bugs` plugs into `agent-loop` stop rules. |
| Carry context to a new session | `/handoff` (Markdown file) | `/context-save` / `/context-restore` | `/handoff` when the vault/repo should hold it; gstack's when you use its other tooling. |
| Remember lessons | Vault learning records (`research-from-vault`, `/teach`) | `/learn`, GBrain pages | Vault for research and decisions you'll cite; `/learn` for coding patterns. |
| Plan / design | `/grill-with-docs`, `/system-architect`, `/to-prd` | `/office-hours`, `/plan-eng-review`, `/plan-ceo-review`, `/autoplan`, `/spec` | Ours when the plan must be grounded in vault research or produce ADRs; gstack's for product/scope challenge. |
| Ship | We stop at PR-ready; never push or merge | `/ship`, `/land-and-deploy`, `/canary` | gstack. |
| QA, browser, security, design | — | `/qa`, `/browse`, `/cso`, `/design-review` | gstack. |
| Research → article | `/write-from-vault` + export | `/document-generate`, `/document-release` (code docs) | Ours for sourced articles; gstack's for release/code docs. |

## Install order

1. **gstack** first (it runs `./setup` and may write a gstack section into `CLAUDE.md`):

   ```bash
   git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup
   ```

2. **optimal-brain** in your project:

   ```bash
   npx skills@latest add chidiokoene/optimal-brain
   ```

3. Run `/setup-knowledge-vault` (and `/setup-agent-loops`, `/setup-optimal-brain` as needed). Both packs edit `CLAUDE.md`: keep gstack's section and our `## Agent loops` / knowledge sections separate; don't let either overwrite the other.
4. Optional: `/setup-gbrain` and `/sync-gbrain` for code search. Nothing in optimal-brain depends on GBrain.

## Untested / watch for

- Running `/two-axis-review` and gstack `/review` back to back on the same diff (should work; they read the same diff and write nothing to each other).
- Stop rules: our loops forbid push/merge without approval; gstack's `/ship` is designed to push. Don't call `/ship` from inside an optimal-brain loop.
- Description overlap: both packs describe review and debugging skills with similar trigger phrases, so a model-invoked pick may go either way. Call the one you want by name.
- Non-Claude hosts: gstack prefixes skills `gstack-*` there, so no collision even with the old name; untested with our pack.
