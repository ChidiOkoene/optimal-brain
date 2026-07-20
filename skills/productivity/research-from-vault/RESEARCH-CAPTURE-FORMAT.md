# Research Capture Format

Mandatory vault capture discipline for `research-from-vault`, `/until-done` research goals, and decision-mapping **Research** tickets.

**Rule:** Never leave substantive findings only in chat. Every meaningful insight lands in the vault as a wikilinked, connected note.

## Vault layout

Configured in `.agent/context/knowledge-vault.md` (fallback: `docs/agents/knowledge-vault.md`). Default folders:

```text
Vault/
  Research Sessions/
    2026-07-13 Topic Name.md     # session hub — timeline + links
  Findings/
    Short Finding Title.md       # one note per substantive finding
  Indexes/
    Research Index.md            # list of [[Research Sessions]]
    Context Index.md             # existing context graph index
  Decision Traces/               # optional audit for significant runs
```

Adjust folder names if the user's vault config differs — follow `knowledge-vault.md`.

## Per research run

### 1. Start — open or create session hub

Path: `Research Sessions/YYYY-MM-DD Topic Name.md`

Frontmatter (YAML):

```yaml
---
type: research-session
topic: "Topic Name"
project: "[[project-context]]"   # link to repo overlay conceptually
ingested_via: research-from-vault | until-done | decision-mapping
started: YYYY-MM-DD
status: in-progress | complete
---
```

Body sections:

```markdown
# Research Session: Topic Name

## Goal

{{What this run is trying to answer}}

## Timeline

- HH:MM — Started session
- HH:MM — [[Finding Title]] — one-line summary

## Findings log

_(Append small findings here when too small for their own note)_

## Synthesis

_(Link at end of run)_

## See also

- [[Research Index]]
```

Link the session from `Indexes/Research Index.md` when created.

### 2. During — capture every substantive finding

For each **substantive** finding (a claim, tradeoff, data point, or conclusion worth reusing):

1. Create `Findings/Short Finding Title.md` (Title Case)
2. Include:
   - Frontmatter: `type: finding`, `session: "[[Research Session Title]]"`, optional `confidence`
   - The finding in plain language
   - Evidence: quotes, page refs, or `[[Source Note]]` wikilinks
   - `## See also` — session hub + related notes
3. Add a timeline entry on the session hub linking `[[Short Finding Title]]`

**Too small for its own note?** Append under `## Findings log` on the session hub with a timestamp — do not skip capture.

### 3. End — synthesis + learning record + indexes

1. **Synthesis note** — main answer to the research goal (may live at vault root or a topic folder; link from session hub under `## Synthesis`)
2. **Learning record** — durable takeaway if a non-obvious lesson emerged (see `teach/LEARNING-RECORD-FORMAT.md`)
3. **Update Context Index** — add active synthesis/learning records; mark superseded entries if applicable
4. **Update Research Index** — ensure session hub is listed
5. **Decision trace** — for significant multi-step runs (template: `setup-knowledge-vault/templates/decision-trace-template.md`)
6. **Project overlay** — if project-relevant, suggest updating `.agent/context/project-context.md` (fallback: `docs/agents/project-context.md`)

Set session hub `status: complete` in frontmatter.

## Wikilink rules

- Session hub ↔ finding notes ↔ sources ↔ synthesis ↔ indexes
- Use Title Case targets consistent with filenames
- Every finding note links back to its session hub

## Done signal (for loops)

A research run is complete when:

- Session hub exists with timeline (and findings log if used)
- Each substantive finding has a vault note **or** a findings-log entry
- Synthesis note exists (unless the run explicitly stopped early with documented gaps)
- Learning record exists when a durable lesson emerged
- Context Index and Research Index updated
- Brief returned to caller listing created/updated note paths

## Example timeline entry

```markdown
- 14:32 — [[Vector DB Latency vs Recall]] — pgvector sufficient for <100k chunks at sub-200ms p95
```

## Anti-patterns

- Dumping a long synthesis in chat without vault notes
- One mega-note instead of separable findings (hard to link and supersede)
- Skipping Research Index updates (sessions become orphaned)
- Treating exploratory findings as implementation truth without review

## Personal notes (user-owned)

Agent capture (this format) is separate from **your** reflections. During or after research, run **`/project-notes`** to save personal notes under `{ProjectFolder}/Personal Notes/`. Optionally link from the session hub under `## Personal reflections` when the user adds them — never substitute personal notes for Findings.
