---
name: optimal-brain-vault-pack
description: Router for the optimal-brain vault pack, which gives your coding agent a long-term memory in an Obsidian vault. Picks the right vault skill (setup, research, seed from repo, write an article, personal notes, context canvas) and the order to run them. Use when the user wants to set up a knowledge vault, asks which vault skill to use, says "use my notes/vault", or wants research, repo knowledge, or writing to persist across sessions. Reads and writes only this repo and the vault path the user configured.
---

# optimal-brain vault pack

This pack turns an Obsidian vault into durable memory for your coding agent. Research becomes linked, sourced notes the agent reads back in later sessions. Each skill lives in its own folder here, and this file routes between them.

## First run

1. **Set up the vault:** follow [setup-knowledge-vault/SKILL.md](./setup-knowledge-vault/SKILL.md). Ask the user for the absolute vault path; never scan the disk for one. It writes `.agent/context/knowledge-vault.md` in the repo.
2. Every other skill here needs that file. If it's missing, stop and send the user back to step 1.

## Which skill

| The user wants to… | Use |
|--------------------|-----|
| Configure or change the vault path and conventions | [setup-knowledge-vault](./setup-knowledge-vault/SKILL.md) |
| Research or answer a question from their notes and PDFs, and capture findings | [research-from-vault](./research-from-vault/SKILL.md) |
| Make the vault know an existing repo or monorepo (and re-sync it later) | [seed-vault-from-repo](./seed-vault-from-repo/SKILL.md) |
| Turn research into a sourced article or post, then export it | [write-from-vault](./write-from-vault/SKILL.md) |
| Jot personal notes the agent won't overwrite | [project-notes](./project-notes/SKILL.md) |
| See how notes connect, as an Obsidian canvas | [vault-context-canvas](./vault-context-canvas/SKILL.md) |

Typical order: setup, then seed (if there's a repo), then research, then write. Read the chosen skill's `SKILL.md` and follow it.

## Ground rules for every skill in this pack

- Read and write only the current repo and the vault path in `.agent/context/knowledge-vault.md`.
- Never read `.env` files, credentials, keys, or tokens. Never install packages. Make no network calls (web research only happens through separate tools the user installed themselves).
- Draft first and write after the user confirms.
- Cite sources in notes. Mark inferred claims and respect `superseded_by` and `confidence`.

## Outside this pack

Some skills mention optimal-brain skills that aren't in this pack (e.g. `/teach`, `/two-axis-review`, `/setup-agent-loops`, `/until-done`). They're optional. If they aren't installed, skip that step. They're at https://github.com/ChidiOkoene/optimal-brain.

MIT. Based on [mattpocock/skills](https://github.com/mattpocock/skills) by Matt Pocock (MIT).
