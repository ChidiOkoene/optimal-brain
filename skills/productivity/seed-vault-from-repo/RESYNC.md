# Re-sync mode

Run `/seed-vault-from-repo resync` after merges. Goal: bring seeded notes up to date with HEAD without touching what the user wrote.

## Steps

1. **Collect seeded notes:** every vault note with `seeded_by: seed-vault-from-repo` under `<Project>/`.
2. **Classify each note** against HEAD:
   - **Fresh:** `git diff --quiet <source_commit> HEAD -- <source_paths...>` reports no change. Leave it alone.
   - **Stale:** some source path changed. Read `git diff --stat` and the changed files, then redraft only the generated sections.
   - **Source gone:** a path no longer exists. Check `git log --follow --diff-filter=R` for a rename. If it was renamed, update `source_paths`. If it was deleted, flag the note; don't delete it.
   - **Unknown commit:** `source_commit` isn't in history (rebased or squashed). Treat it as stale and say so.
3. **Find new material:** new units, components, ADRs, or plans since the oldest `source_commit` (`git diff --name-status <oldest>..HEAD`). Propose new notes.
4. **Show a re-sync plan** before writing. Include notes to update (with one line on what changed), notes flagged for removal, new notes, and counts by unit. Write only after the user says so.
5. **Write:**
   - Replace generated content above `## Manual` only. Keep `## Manual` and everything below it byte-for-byte.
   - If the user edited above `## Manual` (the generated body differs from what the old seed would have produced, or the note has `manual: true` in frontmatter), **don't overwrite**. Write the proposed update to a `## Proposed Update (<date>)` section and flag it.
   - Bump `source_commit` and `seeded_at` on updated notes only.
   - Never delete notes. For deleted sources, add `status: source-deleted` and a callout at the top, and list them in the Unit Index under `## Needs Review`.
   - Update ADR supersession (`superseded_by`) and `<Index Folder>/Context Index.md` (index folder from `knowledge-vault.md`) (move superseded notes).
6. **Report:** fresh, updated, flagged, and new counts; conflicts left as proposals; and the new `source_commit`.

## Frontmatter flags

| Field | Meaning |
|-------|---------|
| `manual: true` | Whole note is user-owned. Re-sync only proposes. |
| `status: source-deleted` | Source removed at a later commit. Needs a human decision. |
| `resync_skip: true` | Never touch, never flag. |
