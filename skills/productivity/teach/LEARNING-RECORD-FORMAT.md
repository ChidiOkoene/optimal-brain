# Learning Record Format

Learning records live in `./learning-records/` and use sequential numbering: `0001-slug.md`, `0002-slug.md`, etc. Create the directory lazily — only when the first record is written.

They are the teaching equivalent of ADRs: they capture non-obvious lessons, key insights, and stated prior knowledge that will steer future sessions. They are used to calculate the zone of proximal development.

## Template

```md
# {Short title of what was learned or established}

{1-3 sentences: what was learned (or what prior knowledge was established), and why it matters for future sessions.}
```

That is the whole format. A learning record can be a single paragraph. The value is recording _that_ this is now known and _why_ it changes what to teach next — not in filling out sections.

## Optional sections

Only include these when they add genuine value. Most records won't need them.

- **Status** frontmatter (`active | superseded by LR-NNNN`) — useful when an earlier understanding turns out to be wrong and is replaced.
- **Evidence** — how the user demonstrated the understanding (a question answered, an exercise completed, prior experience cited). Useful when the claim might be revisited.
- **Implications** — what this unlocks or rules out for future sessions. Worth recording when non-obvious.

## Numbering

Scan `./learning-records/` for the highest existing number and increment by one.

## When to write a learning record

Write one when any of these is true:

1. **The user demonstrated genuine understanding of something non-trivial** — not just exposure, but evidence they can use the concept correctly. This sets a new floor for what to teach next.
2. **The user disclosed prior knowledge** — "I already know X." Record it so future sessions don't re-teach it. Also record the _depth_ claimed.
3. **A misconception was corrected** — the user previously believed something wrong and now sees why. These are high-value: they predict future stumbling blocks for related topics.
4. **The mission shifted in response to learning** — the user discovered they cared about something different than they thought. Cross-link to [[MISSION.md]] and update it.

### What does _not_ qualify

- Material that was merely covered. Coverage is not learning. Wait for evidence.
- Anything already captured tersely in [[GLOSSARY.md]] as a term definition. Don't duplicate.
- Session-by-session activity logs. Learning records are not a journal — they are decision-grade insights.

## Supersession

When a later record contradicts an earlier one (the user's understanding deepened or corrected), mark the old record `Status: superseded by LR-NNNN` rather than deleting it. The history of how understanding evolved is itself useful signal.

## Vault Learning Records

When `docs/agents/knowledge-vault.md` exists (see `/setup-knowledge-vault`), bridge local learning records into the vault for durable, cross-linked storage.

- Create a Title Case note in the vault (e.g. `Vector Search Tradeoffs.md` or keep a `0001-` prefix if sequencing matters for you).
- Include:
  - The core insight (1-3 sentences).
  - Wikilinks at the bottom to related vault notes, source companions (PDFs or articles), and any Index.
  - Optional cross-link back to the teach workspace `MISSION.md` or local record.
- Companion sources: if the learning came from a vault PDF, link the companion note (e.g. `[[RAG Paper Note]]`).
- Update or create the relevant Index note (e.g. `Learning Records Index.md` or topic Index) so the new record is discoverable.
- Update vault `Context Index.md` when present; add optional provenance frontmatter (see `setup-knowledge-vault/templates/note-provenance-format.md`):
  - `confidence`, `sources`, `supersedes` / `superseded_by` when replacing prior understanding
  - Align with local `Status: superseded by LR-NNNN` when both exist

The vault version is the long-term home. The local `./learning-records/` remains useful for the active teach workspace. When in doubt, emit both and link them.
