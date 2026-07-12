---
name: setup-knowledge-vault
description: Configure a personal knowledge vault for research and learning (vault location, learning records, PDFs/sources, context graph, project overlay, integration). Run once before using vault-backed teach, research-from-vault, or loops that consult personal knowledge.
disable-model-invocation: true
---

# Setup Knowledge Vault

Scaffold the per-user (or per-workspace) configuration that vault-aware skills assume:

- **Vault location** — where your Obsidian (or similar) vault lives so agents can read/write notes, PDFs, and sources.
- **Learning record conventions** — how teach outputs and research synthesis are stored as durable, wikilinked notes in the vault.
- **Source handling** — PDFs, local files, transcripts, articles: companion notes, extraction, and how to reference them from RESOURCES and research.
- **Integration** — how `/teach`, `research-from-vault`, agent loops, and engineering skills consume the vault, plus how external research (e.g. from davidondrej/skills) feeds it.

This is a prompt-driven skill, not a deterministic script. Explore, present sections one at a time, confirm with the user, then write.

## Process

### 1. Explore

Look for existing signals; don't assume:

- `skills/personal/obsidian-vault/SKILL.md` (if present) — may contain a hardcoded path.
- Any `docs/agents/knowledge-vault.md` or similar agent config.
- `CLAUDE.md` / `AGENTS.md` at roots — look for existing "Knowledge", "Vault", "Research", or "Second brain" sections.
- Common Obsidian locations on this machine (ask user or probe typical paths if tools allow).
- Teach workspaces in the current tree (look for `MISSION.md`, `learning-records/`, `RESOURCES.md`).

### 2. Present findings and ask

Summarise what you found. Walk the user through decisions **one section at a time** — present, get answer, move on.

Assume the user does not know the terms. Start each with a short explainer and show choices/defaults.

**Section A — Vault location & access.**

> Explainer: The vault is your durable, queryable second brain (PDFs, notes, transcripts, articles). Skills will read and write notes here using the filesystem. We need the absolute root path and basic access notes.

Propose:
- A path discovered from `obsidian-vault` or common locations.
- Or ask the user to provide the root (e.g. `/Users/you/Obsidian/My Vault` or `D:\Obsidian\AI Research`).

Confirm whether:
- Flat at root (use Index notes for grouping, like the personal obsidian-vault pattern).
- Or light substructure is acceptable.

Record the path and a one-line access note.

**Section B — Research & learning record conventions.**

> Explainer: Learning records and synthesis notes from `/teach` and research must live in the vault with consistent naming and wikilinking so they are findable and connected.

Decide:
- Naming style in vault: Title Case (recommended), optional `0001-` prefix for sequenced records, or both.
- Where learning records go (root, a `Learning Records/` folder, or co-located with source material).
- Wikilink rules: always Title Case targets; notes link related items at bottom; Index notes are lists of `[[wikilinks]]`.
- Index note naming (e.g. `Learning Records Index.md`, topic Indexes like `RAG Index.md`).

**Section C — Source handling (PDFs, local files, links).**

> Explainer: Raw sources (PDFs you drop in, web articles saved as .md, transcripts) need companion notes so agents can cite, extract, and synthesize without mutating originals.

Confirm rules:
- Companion naming: `Paper.pdf` → `Paper Note.md` (or `Paper.md`).
- How to embed/link originals in companions: `[[Paper.pdf]]` or `![[Paper.pdf]]`.
- Extraction pattern: document a shell command the user can run (e.g. `pdftotext ...`) or note that manual/highlight + paste is fine.
- How teach `RESOURCES.md` entries can point to vault-local items (with annotation).

**Section D — Integration (teach, research, loops, engineering).**

> Explainer: Once configured, multiple skills will prefer the vault as the source of truth for personal knowledge and will emit durable records here.

Confirm / explain:
- `/teach` will bridge its local learning records into vault form (wikilinked Title Case notes) when this config exists.
- `research-from-vault` will be the reusable discipline for synthesis from vault sources (PDFs + notes).
- Agent loops (`agent-loop`, `/until-done`) may reach `research-from-vault` for knowledge gaps and accept goals like "research X until synthesis is in the vault".
- `domain-modeling`, `grill-with-docs`, and decision-mapping Research tickets will consult vault sources first when available.
- External research (davidondrej research-and-web skills) lands material in the vault; then synthesize.

Also note any maintenance loops the user wants (e.g. daily inbox processing).

**Section E — Context graph (global + project overlay).**

> Explainer: The vault holds your global knowledge graph (wikilinks). A minimal **context graph** adds governance: what's still valid, why you believe it, and what agents did. Global context lives in the vault; project-specific overlay lives in this repo.

Confirm:
- **Project name/slug** for `docs/agents/project-context.md` (e.g. repo name or research project title).
- **Vault context files** — offer to seed (with user confirmation):
  - `Indexes/Context Index.md` (or `Context Index.md` at vault root if flat layout)
  - `Decision Traces/` folder (empty, for research/agent run audits)
- **Engineering decision traces** — optional `docs/agents/decision-traces/` in this repo for significant engineering loop runs.
- **Provenance frontmatter** — optional YAML on synthesis/learning records (see [templates/note-provenance-format.md](./templates/note-provenance-format.md)).

Explain the split:
- **Global (vault):** Context Index, decision traces for research, validity/supersession on notes.
- **Project (repo):** `project-context.md`, `CONTEXT.md`, ADRs, `loops.md` — what applies to *this* codebase.

Agent read order: `knowledge-vault.md` → `loops.md` → `project-context.md` → vault Context Index → wikilinks.

### 3. Confirm and edit

Show the user a draft of:
- The `## Knowledge & Research` (or subsection) block to add to `CLAUDE.md` / `AGENTS.md`.
- The filled contents of `docs/agents/knowledge-vault.md`.
- The filled contents of `docs/agents/project-context.md` (from [templates/project-context-template.md](./templates/project-context-template.md)).

Let them edit before writing.

### 4. Write

**Pick the file to edit for the high-level pointer:**

- If `CLAUDE.md` exists, edit it.
- Else if `AGENTS.md` exists, edit it.
- If neither, ask which to create — do not pick unilaterally.

Never create `AGENTS.md` when `CLAUDE.md` already exists (or vice versa).

If a `## Knowledge & Research` block already exists, update in place. If `## Agent loops` or `## Agent skills` exists, you may nest as `### Knowledge & Research` or keep as peer `##` depending on user's preference.

The block (example):

```markdown
## Knowledge & Research

Personal knowledge vault configuration, learning record placement, PDF/source handling, and research-from-vault flows. See `docs/agents/knowledge-vault.md`. External research ingestion uses tools like davidondrej research-and-web skills feeding the vault.
```

Write `docs/agents/knowledge-vault.md` using [knowledge-vault-template.md](./knowledge-vault-template.md) as the starting point, substituting the answers from the sections.

Write `docs/agents/project-context.md` using [templates/project-context-template.md](./templates/project-context-template.md), substituting project name and vault path.

If the user agreed to seed vault context files, write under the confirmed vault path:
- `Indexes/Context Index.md` (or `Context Index.md` at root) from [templates/context-index-template.md](./templates/context-index-template.md)
- Create `Decision Traces/` directory (empty is fine)

If the user agreed to engineering decision traces, create `docs/agents/decision-traces/` (empty `.gitkeep` or README stub is fine).

Point the user at the starter recipes in this skill folder:

- [recipes/ingest-sources-to-learning-records.md](./recipes/ingest-sources-to-learning-records.md)
- [recipes/research-topic-in-vault.md](./recipes/research-topic-in-vault.md)
- [recipes/maintain-vault-indexes-and-links.md](./recipes/maintain-vault-indexes-and-links.md)
- [recipes/ingest-external-research-to-vault.md](./recipes/ingest-external-research-to-vault.md)
- [recipes/maintain-context-graph.md](./recipes/maintain-context-graph.md)

### 5. Done

Tell the user the setup is complete. Mention:

- `/teach` will now bridge learning records into the vault (when configured).
- Use `research-from-vault` (reached by prose or loops) for synthesis from PDFs/notes.
- For fresh external info: install davidondrej/skills (focus on research-and-web), fetch, save results to vault, then synthesize.
- **Context graph:** global validity in vault Context Index; project filter in `docs/agents/project-context.md`.
- Maintenance: use Cursor `/loop` + recipes (indexes, context graph, nightly inbox processing).
- They can edit `docs/agents/knowledge-vault.md` and `docs/agents/project-context.md` directly; re-run this skill only to restart configuration.

Recommend running `/setup-agent-loops` (if not done) for engineering execution loops, and that the two compose well.

If the personal `obsidian-vault` skill exists, note that it remains the low-level implementation; this config + productivity skills provide the research/engineering layer on top.
