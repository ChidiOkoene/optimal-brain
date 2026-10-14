---
name: optimal-brain-full
description: Router for the full optimal-brain pack (35 agent skills for engineering, planning, review, agent loops, and an Obsidian knowledge vault). Starts new users at setup-optimal-brain, then picks the right skill and order for the task. Use when the user first installs optimal-brain, asks which skill to use, wants to plan, build, review or debug with an agent, run an agent loop until done, or keep research and repo knowledge in a vault across sessions.
---

# optimal-brain (full pack)

All 35 optimal-brain skills in one install. Each skill lives in its own folder next to this file; this file is the entry point and routes between them. Read the chosen skill's `SKILL.md` and follow it.

## First run

1. **Set up the repo:** follow [setup-optimal-brain/SKILL.md](./setup-optimal-brain/SKILL.md). It explores the repo, confirms with the user, and writes the issue tracker, triage labels, and domain-doc layout to `.agent/context/`. The engineering skills (`to-prd`, `to-issues`, `triage`, `implement`) expect it.
2. **Optional setups**, only when the user wants them:
   - Knowledge vault: [setup-knowledge-vault](./setup-knowledge-vault/SKILL.md). Ask for the absolute vault path; never scan the disk for one.
   - Agent loops: [setup-agent-loops](./setup-agent-loops/SKILL.md) (verification commands and stop rules).
3. Not sure what to use? Run [ask-brain](./ask-brain/SKILL.md), which recommends a skill or flow for the user's goal.

## Skills by category

### Setup and routing
| Skill | Use for |
|-------|---------|
| [setup-optimal-brain](./setup-optimal-brain/SKILL.md) | **Start here.** Issue tracker, triage labels, domain docs in `.agent/context/` |
| [ask-brain](./ask-brain/SKILL.md) | Recommend the right skill or flow |
| [setup-agent-loops](./setup-agent-loops/SKILL.md) | Verification commands, stop rules, loop recipes |
| [setup-knowledge-vault](./setup-knowledge-vault/SKILL.md) | Configure the Obsidian vault path and conventions |

### Planning and design
| Skill | Use for |
|-------|---------|
| [grilling](./grilling/SKILL.md) | Stress-test a plan by interview |
| [grill-me](./grill-me/SKILL.md) | Question-by-question interview (uses grilling) |
| [grill-with-docs](./grill-with-docs/SKILL.md) | Interview that writes ADRs and a glossary as decisions land |
| [decision-mapping](./decision-mapping/SKILL.md) | Turn a loose idea into sequenced investigation tickets |
| [domain-modeling](./domain-modeling/SKILL.md) | Pin down domain terms and the model |
| [codebase-design](./codebase-design/SKILL.md) | Vocabulary for deep modules |
| [system-architect](./system-architect/SKILL.md) | Solution and system architecture sessions |
| [prototype](./prototype/SKILL.md) | Throwaway prototypes to answer design questions |
| [to-prd](./to-prd/SKILL.md) | Turn the conversation into a PRD on the tracker |
| [to-issues](./to-issues/SKILL.md) | Split a PRD into vertical-slice issues |
| [triage](./triage/SKILL.md) | Move issues and PRs through triage roles |

### Building, debugging and review
| Skill | Use for |
|-------|---------|
| [implement](./implement/SKILL.md) | Build a PRD or issue set end to end, test-first |
| [tdd](./tdd/SKILL.md) | Test-driven development |
| [diagnosing-bugs](./diagnosing-bugs/SKILL.md) | Hard bugs and performance regressions |
| [improve-codebase-architecture](./improve-codebase-architecture/SKILL.md) | Find deepening opportunities in a codebase |
| [resolving-merge-conflicts](./resolving-merge-conflicts/SKILL.md) | Resolve an in-progress merge or rebase |
| [two-axis-review](./two-axis-review/SKILL.md) | Review changes against Standards and Spec separately |

### Agent loops
| Skill | Use for |
|-------|---------|
| [agent-loop](./agent-loop/SKILL.md) | Loop discipline: iterate until tests pass, with stop rules |
| [until-done](./until-done/SKILL.md) | Goal-based loop until verification passes or a stop rule fires |

### Knowledge vault and writing
| Skill | Use for |
|-------|---------|
| [research-from-vault](./research-from-vault/SKILL.md) | Research from your notes and PDFs, capture findings |
| [seed-vault-from-repo](./seed-vault-from-repo/SKILL.md) | Summarize a repo or monorepo into the vault, re-sync later |
| [write-from-vault](./write-from-vault/SKILL.md) | Turn notes into a sourced article |
| [project-notes](./project-notes/SKILL.md) | Personal notes the agent won't overwrite |
| [vault-context-canvas](./vault-context-canvas/SKILL.md) | Obsidian JSON Canvas of how notes connect |
| [obsidian-vault](./obsidian-vault/SKILL.md) | Search and manage vault notes with wikilinks |
| [edit-article](./edit-article/SKILL.md) | Restructure and tighten an article |

### Learning and handoffs
| Skill | Use for |
|-------|---------|
| [teach](./teach/SKILL.md) | Multi-session tutor with learning records |
| [handoff](./handoff/SKILL.md) | Compact a conversation for another agent |
| [writing-great-skills](./writing-great-skills/SKILL.md) | Write or edit skills well |

### Opt-in tools (only when the user explicitly asks)
| Skill | Use for | Why opt-in |
|-------|---------|------------|
| [setup-pre-commit](./setup-pre-commit/SKILL.md) | Husky + lint-staged + Prettier pre-commit hooks | Installs dev dependencies in the repo; confirm first |
| [git-guardrails-claude-code](./git-guardrails-claude-code/SKILL.md) | Claude Code hooks that block destructive git commands | Claude Code only; writes `.claude/` hook config. Global `~/.claude/` only if the user picks "all projects" |

Never run an opt-in skill on your own initiative.

## Typical flows

- **New feature:** grilling or grill-with-docs, then to-prd, to-issues, implement, two-axis-review.
- **Bug:** diagnosing-bugs, then tdd for the fix.
- **Vault:** setup-knowledge-vault, seed-vault-from-repo (if there's a repo), research-from-vault, write-from-vault.

## Ground rules

- Read and write only the current repo, plus the vault path in `.agent/context/knowledge-vault.md` for vault skills.
- Never read `.env` files, credentials, keys, or tokens. Don't install packages, except through an opt-in skill the user asked for.
- Explore, present, confirm with the user, then write. Publishing to an issue tracker (`to-prd`, `to-issues`, `triage`) happens only after the user confirms.

Source: https://github.com/ChidiOkoene/optimal-brain. MIT. Based on [mattpocock/skills](https://github.com/mattpocock/skills) by Matt Pocock (MIT).
