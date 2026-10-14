# optimal-brain vault pack

Long-term memory for coding agents, kept in an Obsidian vault. It has six skills plus a router (`SKILL.md`):

| Skill | What it does |
|-------|--------------|
| `setup-knowledge-vault` | Configure the vault path (you type it) and its conventions |
| `research-from-vault` | Research from your notes and PDFs, capturing findings as linked notes |
| `seed-vault-from-repo` | Summarize an existing repo or monorepo into the vault, with a re-sync mode |
| `write-from-vault` | Turn notes into a sourced article, with a claim ledger and Markdown export |
| `project-notes` | Personal notes in the vault, separate from agent-written notes |
| `vault-context-canvas` | An Obsidian JSON Canvas of how notes connect |
| `vault-sync` | Session-end sync: stale notes flagged or updated, missed decisions captured |

## Install and use

Unzip into your agent's skills folder (e.g. `~/.claude/skills/` or your agent's equivalent) and run `/setup-knowledge-vault` first. Then ask things like "research X using my vault" or run `/seed-vault-from-repo`.

## What it reads and writes

Only the current repo (`.agent/context/`, plus a `.gitignore` block) and the vault path you give it. It never scans the disk, reads `.env` files or credentials, installs packages, or calls the network. `write-from-vault/scripts/export.py` is standard-library Python and writes only inside `Drafts/<Title>/export/` in your vault.

## Agents tested

- **Cursor:** used during development.
- **OpenCode 1.19.0** with `anthropic/claude-sonnet-5.5` via OpenRouter (tested 2026-10-13, headless): all skills discovered. Setup, research trigger, seed, and export passed; project-notes and vault-context-canvas weren't exercised. Details: [docs/AGENSI.md](https://github.com/ChidiOkoene/optimal-brain/blob/main/docs/AGENSI.md).
- **Claude Code:** supported, **not yet tested**.
- Others: untested. Please report at https://github.com/ChidiOkoene/optimal-brain/issues.

Source and the full skill set: https://github.com/ChidiOkoene/optimal-brain. MIT, based on [mattpocock/skills](https://github.com/mattpocock/skills) by Matt Pocock.
