---
name: vault-sync
description: "Bring the knowledge vault up to date with the work done since the last sync: diff git since the last-synced commit, update or flag stale notes, capture missed decisions, review findings and grill answers, append a session note, and refresh indexes. Use when a work session ends, before a handoff, after a long agent loop, or when the user says sync the vault, update the vault, or the vault is out of date. Reads and writes only this repo and the vault path you configured."
argument-hint: "Optional: what this session was about"
---

# Vault Sync

The `## Vault write-back` block (written by `/setup-optimal-brain`) asks the agent to update the vault as it works. This skill is the safety net: it catches what was missed and finds notes the code has outgrown.

## Prerequisites

Read `.agent/context/knowledge-vault.md` (fallback `docs/agents/knowledge-vault.md`) and `.agent/context/project-context.md`. Missing: say so and point to `/setup-knowledge-vault`. Never guess or search for a vault path. Never read `.env` files, credentials, or secrets.

## Process

1. **Range.** Read the last-synced commit from `.agent/context/vault-sync.md` (`last_synced_commit:`). Missing or not in history (`git cat-file -e <sha>`): use the oldest `source_commit` in the vault, else ask how far back to go. `HEAD` is the end. Note uncommitted changes from `git status --porcelain` separately; don't treat them as synced.
2. **What changed.** `git log --oneline <last>..HEAD` and `git diff --name-status <last>..HEAD`.
3. **Stale notes.** For every vault note in this project with `source_paths` and `source_commit` frontmatter, check `git diff --quiet <source_commit> HEAD -- <source_paths...>`. If [vault-stale.mjs](./vault-stale.mjs) is available, `node vault-stale.mjs --vault <project folder> --repo .` does this for you (read-only, prints JSON). For each stale note:
   - you can see what changed and the fix is factual (status, paths, a renamed function): update the note, bump `source_commit`, set `updated:` to today;
   - otherwise set `status: stale` and add a one-line `> Stale since <short sha>: <paths> changed` callout. Never delete a note, and never rewrite text the user wrote (`Personal Notes/`, or notes without agent provenance).
   - deleted or renamed sources: flag, don't guess.
4. **Missed knowledge.** From this conversation and the commits, capture anything not already in the vault: decisions (Decision Trace), review verdicts and findings, grill answers, finished tasks (update the Plan or Findings note's `status`). Check for an existing note first; update rather than duplicate.
5. **Session note.** Append (create if needed) `{Project}/Research Sessions/YYYY-MM-DD - Session.md`: range synced, notes updated, notes flagged stale, notes created, open questions. Brief.
6. **Indexes.** Add links to new notes in the project index/MOC the vault already uses. Don't invent a new index scheme.
7. **Record.** Write `last_synced_commit: <HEAD sha>` and `synced_at: <ISO date>` to `.agent/context/vault-sync.md` (shared, committable).
8. **Report.** Range, counts (updated / stale / created), and anything needing the user's call.

## Rules

- Follow the vault conventions in `knowledge-vault.md`: folders, frontmatter, `[[wikilinks]]`, filename-safe titles (" - " not ":").
- Cite repo paths and commits; no claims without a source.
- No secrets, keys, tokens, or personal data in notes.
- Write only inside the configured vault path and `.agent/context/vault-sync.md`.
