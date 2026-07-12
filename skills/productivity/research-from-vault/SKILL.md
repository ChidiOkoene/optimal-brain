---
name: research-from-vault
description: Research and synthesize using the personal knowledge vault as the primary source. Use when the user says "research X using my vault", "consult the knowledge vault", "look up in my PDFs and notes", "synthesize from vault sources", or when a knowledge gap appears during loops or engineering work.
---

# Research from Vault

**Read the vault first. Synthesize durable, wikilinked knowledge.**

This is the reusable discipline behind vault-backed research and synthesis. It is reached by prose from users or from other skills (`agent-loop`, `/until-done`, `/teach`, `domain-modeling`, `grill-with-docs`, decision-mapping Research tickets).

## Prerequisites

Read `docs/agents/knowledge-vault.md` if present. It contains:
- The configured vault root path
- Learning record and note naming conventions (Title Case, wikilinks, optional numbering)
- PDF / source companion rules
- Indexing expectations

If the file is missing, fall back to patterns from `skills/personal/obsidian-vault/SKILL.md` (ask the user to confirm the path) or run `/setup-knowledge-vault` for the user.

Also read when present:
- `docs/agents/project-context.md` — which global vault notes apply to this project
- Vault `Indexes/Context Index.md` or `Context Index.md` at vault root — active vs superseded knowledge, recent decision traces

Apply **context validity rules** from `knowledge-vault.md`: prefer non-superseded high-confidence notes; treat exploratory notes as design input only.

## The Discipline

1. **Clarify the research goal**
   - Turn the request into a crisp question or synthesis objective.
   - Decide the output shape: a single synthesis note, a set of notes, a learning record, or an update to an Index.
   - Note whether the goal is "use only vault" or "use external then vault".

2. **Locate sources in the vault**
   - Use the vault path + Grep/Glob/Read.
   - Prefer high-trust items already annotated in companions or prior notes.
   - For PDFs: read the companion note first; extract more via shell only if needed (e.g. `pdftotext`).
   - For links/transcripts: treat saved .md or companion notes as first-class.

3. **Extract and ground**
   - Pull direct quotes or data with citations (note filename + section or page).
   - Keep extracts minimal and relevant — do not dump entire documents.
   - Record conflicts or gaps explicitly.

4. **Synthesize**
   - Produce one or more new or updated vault notes in Title Case.
   - Use `[[wikilinks]]` to sources and related concepts.
   - Structure for readability: short paragraphs, bullets for tradeoffs, a Sources / See also section at bottom.
   - If a non-obvious insight or durable lesson emerges, also emit a learning-record-style entry (see teach LEARNING-RECORD-FORMAT for shape; store in vault per knowledge-vault.md).
   - Consider optional provenance frontmatter on new notes (see `setup-knowledge-vault/templates/note-provenance-format.md`).

5. **Close the loop**
   - Update or create relevant Index note(s) so the new material is discoverable.
   - Update vault `Context Index.md` when present (active knowledge, superseded entries).
   - For significant runs: emit a decision trace in vault `Decision Traces/` (template: `setup-knowledge-vault/templates/decision-trace-template.md`).
   - If new knowledge is project-relevant, suggest updating `docs/agents/project-context.md`.
   - If the work was part of a larger goal (e.g. inside `agent-loop`), return a brief: what was synthesized, which notes were created/updated, and any open gaps.

## When external information is required

The vault is the source of truth for *personal* and *already-captured* knowledge. When the question needs fresh or broader data:

- First use installed external research capabilities (e.g. davidondrej/skills research-and-web category: browser, web search, YouTube, etc.).
- Save or summarize the fetched material as vault sources (PDFs or annotated .md companions).
- Then resume synthesis with this skill (or hand off to `/teach` for multi-session treatment).

Explicit handoff example inside a loop:
"Use davidondrej research tools to fetch recent material on X, write sources into the vault at {{path}}, then call research-from-vault to synthesize."

## Completion

The task is complete when:
- The requested synthesis exists as one or more properly wikilinked vault notes, **and**
- Any durable insights have been captured as vault learning-record-style entries, **and**
- Context Index (and decision trace for significant runs) updated when configured, **or**
- An explicit brief explains why synthesis could not be completed (gaps in vault, need for external, etc.).

Stop rules from the calling context (agent-loop / until-done) still apply.

## Tips for callers

- Give a clear done signal: "produce synthesis note + learning record in vault + update Context Index".
- Scope the research ("focus on sources added in the last 3 months" or "only use the 'RAG' and 'Agents' Index notes").
- After external ingestion, always come back here or to `/teach` — do not leave new knowledge only in chat history.
