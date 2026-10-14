---
name: ask-brain
description: "Router for the whole optimal-brain pack: given a task, picks the single best skill or an ordered chain of skills, says why, and says what to skip. Use when the user is unsure which skill to use, asks what to do next or where to start, or describes a task without naming a skill."
---

# Ask Brain

You don't remember every skill, so ask. This skill turns a task into a route: one skill, or an ordered chain.

## How to route

1. **Read the task.** Match it to an intent in the routing table below. If it spans several intents, use a chain from Common chains.
2. **Check preconditions.** Engineering skills that touch the tracker need `setup-optimal-brain` first; vault skills need `setup-knowledge-vault` (or `setup-optimal-brain` with a vault); loops need `setup-agent-loops`. If `.agent/context/` already has the config, skip setup.
3. **Answer in this shape:**
   - **Route:** `skill` or `skill-a → skill-b → skill-c`
   - **Why:** one line per step, tied to the user's task.
   - **Skip:** skills that look relevant but aren't, and why (e.g. "skip `triage`: these issues came from `to-issues` and are already agent-ready").
   - **Start with:** the exact first command to run.
4. **Ambiguous?** Ask **one** clarifying question (usually: "Is there a codebase?" or "Is this one session or several?"), then route. Never ask more than one.
5. Recommend only skills in the table. Don't invent skills. If nothing fits, say so and suggest the closest one.

## Routing table

Every skill in the pack appears here exactly once as a row. Model-invoked skills (no slash needed) are marked *auto*; the agent applies them on its own when the situation matches.

| Intent | Skill | Use it for |
| ------ | ----- | ---------- |
| Start a project | `setup-optimal-brain` | First run in a repo: issue tracker, triage labels, doc layout, vault write-back rules. |
| Start a project | `setup-knowledge-vault` | First run for a personal/research vault: location, PDF companions, learning records. |
| Start a project | `setup-agent-loops` | Before autonomous loops: verification commands, stop rules, scope, recipes. |
| Understand a codebase | `seed-vault-from-repo` | Fill the vault from an existing repo (code, docs, ADRs, CI); `resync` after big merges. |
| Understand a codebase | `codebase-design` | *auto*. Shared vocabulary for deep modules, seams and interfaces. |
| Understand a codebase | `domain-modeling` | *auto*. Pin down domain terms (CONTEXT.md) and record architectural decisions. |
| Understand a codebase | `vault-context-canvas` | Draw an Obsidian canvas of how vault notes connect. |
| Research with papers/PDFs | `research-from-vault` | *auto*. Answer questions from vault PDFs and notes, with citations; save web sources into the vault. |
| Research with papers/PDFs | `project-notes` | Your own reflections in the project's Personal Notes folder; the agent won't overwrite them. |
| Research with papers/PDFs | `obsidian-vault` | *auto* (personal). Find, create and organise Obsidian notes with wikilinks. |
| Plan a feature | `grill-with-docs` | Interview to sharpen an idea in a repo; writes ADRs and CONTEXT.md as decisions land. |
| Plan a feature | `grill-me` | Same interview with no codebase; saves nothing. |
| Plan a feature | `grilling` | *auto*. The shared interview discipline behind the grill skills. |
| Plan a feature | `decision-mapping` | Fuzzy idea with many unknowns: sequenced investigation tickets, resolved one by one. |
| Plan a feature | `system-architect` | Non-trivial system design: discovery, as-is review, target design, migration. |
| Plan a feature | `prototype` | Throwaway code when a question needs a runnable answer (state, logic, UI). |
| Plan a feature | `to-prd` | Turn the current conversation into a PRD. |
| Plan a feature | `to-issues` | Split a PRD into independent, agent-ready issues. |
| Build | `implement` | Build a PRD or issue end to end, test-first, gated on review. |
| Build | `tdd` | *auto*. Red-green-refactor for any feature or fix. |
| Build | `until-done` | Goal-based loop: keep going until verification passes or a stop rule fires. |
| Build | `agent-loop` | *auto*. The loop discipline used by `until-done` and `implement`. |
| Debug | `diagnosing-bugs` | *auto*. Diagnosis loop for hard bugs and performance regressions. |
| Debug | `resolving-merge-conflicts` | *auto*. Resolve an in-progress merge or rebase conflict. |
| Review | `two-axis-review` | *auto*. Review changes on Standards and Spec separately; ranked findings, one verdict. |
| Review | `improve-codebase-architecture` | Spare-moment health check: HTML report of shallow modules, then grill one. |
| Review | `triage` | Raw incoming issues and external PRs: categorise, verify, write agent-ready briefs. |
| Write an article | `write-from-vault` | Turn vault notes into a sourced article, every claim traced to a note. |
| Write an article | `edit-article` | (personal) Restructure and tighten an existing draft. |
| Write an article | `writing-great-skills` | Write or edit a SKILL.md so it triggers and behaves predictably. |
| Learn a topic | `teach` | Multi-session tutor; learning records bridge into the vault. |
| Keep the vault current | `vault-sync` | End of a session: update stale notes, capture missed decisions, log the session. |
| Hand off | `handoff` | Context is getting long or you're switching sessions/agents: write a handoff file. |
| Hand off | `ask-brain` | This router. Run it again whenever you're unsure what's next. |
| Repo safety (opt-in) | `git-guardrails-claude-code` | (misc) Claude Code hooks that block destructive git commands. |
| Repo safety (opt-in) | `setup-pre-commit` | (misc) Husky + lint-staged pre-commit hooks for formatting, types and tests. |

## Common chains

| Situation | Chain |
| --------- | ----- |
| New repo, first time | `setup-optimal-brain` → `seed-vault-from-repo` → `vault-context-canvas` (optional) |
| Feature in a repo | `grill-with-docs` → `to-prd` → `to-issues` → `implement` (one fresh session per issue) → `two-axis-review` → `vault-sync` |
| Small change, one session | `grill-with-docs` (short) → `implement` → `vault-sync` |
| PhD / literature work | `setup-knowledge-vault` → `research-from-vault` → `write-from-vault` → `vault-sync` |
| Learn a field from your papers | `setup-knowledge-vault` → `teach` → `project-notes` |
| Question needs runnable code | `handoff` → `prototype` (fresh session) → `handoff` back → continue the plan |
| Fuzzy idea, many unknowns | `decision-mapping` → `grill-with-docs` → `to-prd` |
| System design | `system-architect` → `to-prd` → `to-issues` → `implement` |
| Hard bug | `diagnosing-bugs` → `tdd` (regression test) → `two-axis-review` |
| Backlog of raw issues | `triage` → `implement` |
| Let the agent iterate unattended | `setup-agent-loops` → `until-done` |
| Codebase upkeep | `improve-codebase-architecture` → `grill-with-docs` → main flow |
| Plan with no codebase | `grill-me` |

## The main flow: idea → ship

1. **`/grill-with-docs`** to sharpen the idea (no codebase: `/grill-me`). If a question needs runnable code, detour through `/prototype` with `/handoff` in both directions.
2. **Several sessions?** `/to-prd` → `/to-issues`, then one fresh session per issue running `/implement` with the PRD and that issue. **One session?** `/implement` right here.
3. **`/two-axis-review`**: `/implement` runs it as the final gate; run it yourself on any branch.
4. **`/vault-sync`** so the vault records what changed and what was decided.

Don't `/triage` issues that `/to-issues` made; they're already agent-ready.

### Context hygiene

Keep grilling, PRD and issues in **one unbroken conversation** so they build on the same thinking; don't compact or clear until after `/to-issues`. Each `/implement` then starts fresh from its issue.

Models reason less sharply as a conversation gets very long, well before the hard limit of what they can hold. If a session is getting long before you reach `/to-issues`, don't push on: run `/handoff` and continue in a fresh session. `/handoff` starts a new session with the context carried over in a file; the built-in `/compact` keeps the same session and summarises earlier turns. Use `/compact` only at clean breaks between phases.
