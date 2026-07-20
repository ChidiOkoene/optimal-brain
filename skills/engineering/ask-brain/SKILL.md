---
name: ask-brain
description: Ask which skill or flow fits your situation. A router over the user-invoked skills in this repo.
disable-model-invocation: true
---

# Ask Brain

You don't remember every skill, so ask.

**Lineage:** Evolved from Matt Pocock's `ask-matt` in [mattpocock/skills](https://github.com/mattpocock/skills). Engineering flows unchanged; this fork adds Knowledge, Research & Learning routing.

A **flow** is a path through the skills. Most paths run along one **main flow**, and two **on-ramps** merge onto it. Everything else is standalone.

## The main flow: idea → ship

The route most work travels. You have an idea and want it built.

1. **`/grill-with-docs`** — sharpen the idea by interview. Start here when you **have a codebase**: it's stateful, retaining what it learns in `CONTEXT.md` and ADRs. (No codebase? Use `/grill-me` — see Standalone.)
2. **Branch — can you settle every question in conversation?** If a question needs a runnable answer (state, business logic, a UI you have to see), detour through a prototype, bridged by **`/handoff`** in both directions (see Crossing sessions):
   - **`/handoff`** out, then open a fresh session against that file,
   - **`/prototype`** to answer the question with throwaway code,
   - **`/handoff`** back what you learned, and reference it from the original idea thread.
3. **Branch — is this a multi-session build?**
   - **Yes** → **`/to-prd`** (turn the thread into a PRD) → **`/to-issues`** (split the PRD into independently-grabbable issues). Because the issues are independent, **clear context between each one**: start a fresh session per issue and kick off **`/implement`** by passing it the PRD and the single issue to work on.
   - **No** → **`/implement`** right here, in the same context window.

### Context hygiene

Keep steps 1–3 in **one unbroken context window** — don't compact or clear until after `/to-issues` — so the grilling, PRD, and issues all build on the same thinking. Each `/implement` then starts fresh, working from the issue.

The limit on this is the **[smart zone](https://www.aihero.dev/ai-coding-dictionary/smart-zone)**: the window (~120k tokens on state-of-the-art models) within which the model still reasons sharply. If a session approaches it before `/to-issues`, don't push on degraded — `/handoff` and continue in a fresh thread.

## On-ramps

A starting situation that generates work, then merges onto the main flow.

- **Bugs and requests piling up** → **`/triage`**. It moves issues through triage roles and produces agent-ready issues, which **`/implement`** later picks up.

  Triage is only for issues **you didn't create** — bug reports, incoming feature requests, anything that arrives raw. Issues that `/to-issues` produced are already agent-ready, so **don't triage them**.

## Codebase health

Not feature work — upkeep.

- **`/improve-codebase-architecture`** — run whenever you have a spare moment to keep the codebase good for agents to operate in. It surfaces deepening opportunities; picking one _generates an idea_ you can take into the main flow at `/grill-with-docs`.

## Crossing sessions

- **`/handoff`** — when a thread is full or you need to branch off (e.g. into a `/prototype` session), this compacts the conversation into a markdown file. You don't continue in place — you **open a new session and reference that file** to carry the context across. It's the bridge between context windows, in either direction. Use it when you want a **fresh session** but need the **current conversation preserved**.
- **`/compact`** (built-in) — stay in the **same conversation**, letting the earlier turns be summarized. Use it at **intentional breaks between phases**, when you don't mind losing the verbatim history. Don't compact mid-phase — the agent can lose its way. `/handoff` forks; `/compact` continues.

## Standalone

Off the main flow entirely.

- **`/grill-me`** — the same relentless interview as `/grill-with-docs`, but for when you have **no codebase**. Stateless: it saves nothing locally, builds no `CONTEXT.md`. Reach for it to sharpen any plan or design that doesn't live in a repo.
- **`/teach`** — learn a concept over multiple sessions, using the current directory as a stateful workspace. When a vault is configured, learning records and resources bridge to the vault for long-term use and cross-linking.
- **`/writing-great-skills`** — reference for writing and editing skills well.

## Agent loops

When you want the agent to **iterate autonomously** until an objective says done — without prompting every step.

- **`/setup-agent-loops`** — run once per repo to configure verification commands, stop rules, and scope. Do this after `/setup-optimal-brain` (or standalone if you only need loops).
- **`/until-done`** — goal-based loop: you hand off the stop condition ("fix this test", "implement issue #42"). Cursor's equivalent of `/goal`.
- **Cursor `/loop`** — time-based recurrence (`/loop 5m …`, `/loop 1h /triage`). Combine with recipes in the `setup-agent-loops` skill folder.
- **`/implement`** — uses agent-loop stop rules when `.agent/context/loops.md` exists (fallback: `docs/agents/loops.md`); iterate until verifiers pass within the iteration cap.

**When to use which:**

| Situation | Reach for |
| --------- | --------- |
| One-shot fix with clear done signal | `/until-done` |
| Implementing an issue from `/to-issues` | Fresh session + `/implement` (or `/until-done` with issue ref) |
| Recurring maintenance while you work | `/loop 30m …` |
| Incoming issues piling up | `/loop 1h /triage` |
| PR failing CI | Cursor `babysit` skill |

**Design a custom recurring workflow** (life/process, not code) — see `loop-me` in in-progress; different purpose from agent loops.

## Solution & system architecture

When system design is non-trivial — multiple views (domain, data, security, NFR), as-is vs target, or migration sequencing — use the orchestrator rather than only grilling or only code deepening.

- **`/system-architect`** — user-invoked orchestrator. Engagements: `discovery`, `as_is_review`, `target_design`, `migration`. Selects ≤6 competence **role briefs** (not separate slash skills), writes `.agent/context/architecture-sessions/`, proposes ADRs, hands off to `/to-prd`. Parallel subagents when available; sequential fallback elsewhere.
- **`/improve-codebase-architecture`** — deepen shallow modules in an existing codebase (HTML report). Use alone for code health; use inside `as_is_review` when system-architect runs.
- **`/decision-mapping`** — fog of war / multi-session investigation tickets. System-architect bootstraps this when open questions need their own map.

**When to use which:**

| Situation | Reach for |
| --------- | --------- |
| Greenfield problem framing | `/system-architect` discovery |
| Understand current system risks/seams | `/system-architect` as_is_review |
| Propose target + ADRs | `/system-architect` target_design |
| Phased cutover from as-is to target | `/system-architect` migration |
| Only deepen one shallow module | `/improve-codebase-architecture` |
| Many investigation tickets over sessions | `/decision-mapping` |
| Architecture hub ready to build | `/to-prd` (see system-architect recipe `architecture-to-prd`) |

## Knowledge, Research & Learning

When you want to build or consult durable personal knowledge, learn over sessions, or synthesize from PDFs/notes/transcripts (your vault) and external sources. The **context graph** adds governance: global validity in vault Context Index, project filter in `.agent/context/project-context.md` (fallback: `docs/agents/project-context.md`).

- **`/teach`** — multi-session learning using the current directory as workspace. When a vault is configured (`.agent/context/knowledge-vault.md`, fallback: `docs/agents/knowledge-vault.md`), learning records are bridged to vault form (Title Case wikilinked notes) and RESOURCES can reference vault-local PDFs and notes.
- **`/setup-knowledge-vault`** — run once per vault (or major workspace). Configures location, learning record conventions, PDF companion rules, and how teach/research/loops consume the vault. Also wires external research (davidondrej research-and-web) into the vault.
- **`research-from-vault`** (model-invoked) — reusable discipline for research and synthesis from the vault. Rich triggers: "research X using my vault", "consult the knowledge vault", "synthesize from PDFs and notes". Reads the config and emits wikilinked notes + learning records.
- External research ingestion: install `davidondrej/skills` (focus `research-and-web`), use its browser/YT/web skills to pull fresh material, land sources in the vault, then synthesize via `research-from-vault` or `/teach`.
- Maintenance loops: Cursor `/loop` + recipes in `setup-knowledge-vault/recipes/` (ingest sources, research a topic, maintain indexes, maintain context graph, ingest-external-then-synthesize).

**When to use which:**

| Situation | Reach for |
| --------- | --------- |
| Want to deeply learn a topic over time | `/teach` (vault bridge happens automatically when configured) |
| First time setting up personal knowledge | `/setup-knowledge-vault` |
| Need synthesis from existing PDFs/notes in vault | `research-from-vault` (or `/until-done Research X from vault`) |
| Need fresh external info + durable capture | Use davidondrej research skills → save to vault → `research-from-vault` or `/teach` |
| Recurring processing of new vault material | `/loop 1d ...` with a recipe from setup-knowledge-vault |
| Knowledge gap during engineering/loop | Agent reaches `research-from-vault` (or you say "use the vault") |
| Need governed context / what's still valid? | Read vault Context Index + `.agent/context/project-context.md` (fallback: `docs/agents/project-context.md`); recipe `maintain-context-graph.md` |
| Loose idea needing multi-session investigation | `/decision-mapping` — sequenced tickets under `.agent/context/decision-maps/` |
| Personal reflection during/after research | `/project-notes` — notes in vault `{ProjectFolder}/Personal Notes/` |
| Visual context graph in Obsidian | `/vault-context-canvas` — JSON Canvas at `{ProjectFolder}/Context Graph.canvas` |

See also the brain architecture in `docs/agents/brain.md` (package repo examples; consumer repos use `.agent/context/` for per-repo config).

## Precondition

**`/setup-optimal-brain`** — run before your first engineering flow to configure the issue tracker, triage labels, and doc layout the other skills assume. Custom issue trackers also work.

**`/setup-agent-loops`** — run before `/until-done` or unattended iteration. Optional but recommended for any repo where the agent should loop until tests pass.

**`/setup-knowledge-vault`** — run before relying on vault-backed learning, research, or loops that consult personal knowledge sources.
