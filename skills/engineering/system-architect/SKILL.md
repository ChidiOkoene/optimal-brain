---
name: system-architect
description: Orchestrate solution and system architecture across competence roles — discovery, as-is review, target design, or migration — into a session hub, ADRs, and delivery handoff.
disable-model-invocation: true
argument-hint: "Engagement type or architecture question (e.g. target design for chat retrieval)"
---

# System Architect

Coordinate **solution and system architecture** across professional competence areas. This is the full-system design orchestrator — not a code-deepening scan (use `/improve-codebase-architecture` for that).

**v1 ships only this skill.** Competence areas are **role briefs** under `roles/`, not separate slash-commands. Reuse existing skills via prose invocation.

Requires `/setup-optimal-brain` for domain/ADR layout. Vault-aware roles work best after `/setup-knowledge-vault`.

## Prerequisites

Read when present (`.agent/context/` first, fallback `docs/agents/`):

- `domain.md` — where `CONTEXT.md` and ADRs live
- `project-context.md`, `knowledge-vault.md` — if vault configured
- `loops.md` — for infrastructure role

Create `.agent/context/architecture-sessions/` if missing.

## Process

### 1. Classify engagement

Map the user argument (or ask once) to an engagement type in [ENGAGEMENT-TYPES.md](./ENGAGEMENT-TYPES.md):

- `discovery` — greenfield / problem framing
- `as_is_review` — understand current system friction
- `target_design` — propose target architecture + ADRs
- `migration` — move from as-is toward target

**Never run all 10 roles by default.** Use the role subset for the engagement type (≤6 unless the user asks for full coverage).

### 2. Fog check

If many open questions need multi-session investigation (fog of war), bootstrap **`/decision-mapping`** first. Link the map from the architecture session hub. Do not duplicate the decision-map format here.

### 3. Open session hub

Write `.agent/context/architecture-sessions/<YYYY-MM-DD-slug>.md` per [ARCHITECT-SESSION-FORMAT.md](./ARCHITECT-SESSION-FORMAT.md).

### 4. Execute roles

For each selected role, follow the brief in `roles/<name>.md`. Orchestrate per [SUBAGENT-ORCHESTRATION.md](./SUBAGENT-ORCHESTRATION.md):

- **Parallel** (when Task/Agent tool available): independent roles (e.g. security + data + integration)
- **Sequential** (always available / other IDEs): dependent chain (context → domain → application)
- Cap each role output ~400 words when using subagents; paste into the session hub under that role heading

Delegate deep work to existing skills named in each role brief (`domain-modeling`, `/grill-with-docs`, `codebase-design`, `/improve-codebase-architecture`, `research-from-vault`, etc.).

**As-is review:** reuse `/improve-codebase-architecture` (HTML report in OS temp dir — cite its HTML-REPORT.md; do not duplicate the scaffold).

### 5. Synthesize

Merge role outputs into the session hub:

- Cross-cutting risks and open questions
- Recommended next ADRs (use ADR format from `domain-modeling`)
- Updates to propose for `CONTEXT.md` / `.agent/context/project-context.md` when vault configured

### 6. Visualize (optional)

After vault research, suggest **`/vault-context-canvas`** to refresh the Obsidian context graph.

### 7. Delivery handoff

When build-ready, hand off to **`/to-prd`** or **`/to-issues`**. Do not implement features in this skill.

## Recipes

Copy-paste prompts in [recipes/](./recipes/).

## Distinction

| Skill | Job |
| ----- | --- |
| `/system-architect` | Multi-view system/solution design orchestration |
| `/improve-codebase-architecture` | Deepen shallow modules in an existing codebase |
| `/decision-mapping` | Multi-session investigation tickets for fog of war |
| `/grill-with-docs` | Interview + domain model sharpening |

## When setup is missing

Suggest `/setup-optimal-brain` (and `/setup-knowledge-vault` if research roles need a vault). Do not invent tracker or vault paths.
