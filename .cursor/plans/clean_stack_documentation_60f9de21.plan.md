---
name: clean stack documentation
overview: Create a new polished documentation file (docs/OPTIMAL-BRAIN.md) that accurately reflects the full stack (loop engineering + knowledge vault), includes a prominent distinction from narrow Karpathy-style loops, uses hybrid tone, and is suitable as canonical "what this fork is" documentation. Leave whatNew.md untouched. Add minimal cross-links.
todos:
  - id: create-optimal-brain-doc
    content: "Create docs/OPTIMAL-BRAIN.md with full structure: motivation, architecture diagram, additions, Matt comparison, prominent Karpathy section, research/PhD strengths, core flows, quickstart, key files."
    status: completed
  - id: hybrid-tone-karpathy
    content: Ensure hybrid tone (personal framing + descriptive) and a dedicated prominent section explaining the difference from the narrow Karpathy autoresearch loop discussed in the X post.
    status: completed
  - id: update-cross-links
    content: Add a 'See also' link from docs/agents/brain.md to the new doc. Optionally a light pointer in top README.
    status: completed
  - id: accuracy-citations
    content: Use exact current paths and names (setup-knowledge-vault, research-from-vault, ask-matt Knowledge section, recipes, brain.md, etc.). Fix language issues from the draft.
    status: completed
  - id: leave-whatnew
    content: Do not modify whatNew.md.
    status: completed
isProject: false
---

# Clean Documentation for the Extended Stack

## Goal
Replace the draft personal notes in `whatNew.md` with a polished, shareable, and accurate document that reflects all discussions: the full scope of additions (loop engineering + knowledge vault), clear comparison to original `mattpocock/skills`, prominent distinction from narrow "Karpathy-style" loops (the autoresearch pattern from the referenced X post), hybrid personal+descriptive tone, and special strengths for research / PhD / long-term knowledge work.

## Decision
- **Create a new file**: `docs/OPTIMAL-BRAIN.md` (new clean canonical doc).
- Keep `whatNew.md` untouched for now (or move to `.cursor/` later if desired). Do not edit it.
- Use **hybrid tone** (short personal framing at top, then descriptive "this stack" language).
- Give the Karpathy distinction a **prominent dedicated section**.

## New File Structure (docs/OPTIMAL-BRAIN.md)

1. **Header + Motivation** (hybrid)
   - Short personal note: why the fork was created (long-term research memory + autonomous iteration + external ingestion).
   - One-sentence positioning: "A layered optimal brain built on mattpocock/skills by adding disciplined loop engineering and a persistent personal knowledge vault."

2. **Layered Architecture**
   - Use the mermaid diagram from `docs/agents/brain.md` (or a close variant).
   - Brief explanation of each layer:
     - External (davidondrej research-and-web)
     - Memory (Obsidian vault + learning records)
     - Synthesis (`research-from-vault` + `/teach`)
     - Execution (mattpocock engineering skills + `agent-loop`/`until-done`)
     - Router (`/ask-matt`)

3. **What This Fork Adds**
   - Loop engineering layer: `setup-agent-loops/`, `agent-loop/`, `until-done/` + 8 recipes + `docs/agents/loops.md`.
   - Knowledge vault layer: `setup-knowledge-vault/` (with 4 recipes including `ingest-external-research-to-vault.md`), `research-from-vault/`, vault bridging in teach.
   - Cross-cutting integration:
     - New "## Knowledge, Research & Learning" section + routing table in `skills/engineering/ask-matt/SKILL.md`.
     - Reach-for-vault prose in `agent-loop`, `until-done`, `domain-modeling`, `grill-with-docs`, `decision-mapping`.
     - Teach updates (`SKILL.md`, `LEARNING-RECORD-FORMAT.md`, `RESOURCES-FORMAT.md`).
     - `CLAUDE.md`, bucket + top README, `.claude-plugin/plugin.json`.
   - New docs: `docs/agents/brain.md`, `knowledge-vault.md`, examples.
   - Cite exact counts and paths.

4. **Comparison to Original mattpocock/skills**
   - Cleaned version of the table (fix grammar, consistent voice).
   - Emphasize: original strengths remain untouched; this fork *completes* them with memory + research + loops.

5. **Relationship to "Karpathy Loops" (prominent section)**
   - Clearly state this is **not** the narrow Karpathy autoresearch loop from the referenced X post.
   - Describe the narrow pattern: one mutable file (`train.py`), fixed time budget (e.g. 5 min), single scalar metric, git keep/revert, `program.md` contract.
   - How this stack relates: shares the "design the loop instead of prompting every turn" philosophy, but is general-purpose + adds persistent vault memory and broad research flows.
   - When each wins:
     - Narrow Karpathy style → pure optimization with clear scalar + bounded surface.
     - This stack → general engineering, research synthesis, multi-file work, long-term personal knowledge.
   - Recommendation: Use this stack as the base; apply Karpathy-style constraints inside specific recipes/goals when doing narrow optimization.

6. **Strengths for Research, PhD, and Long-Term Knowledge Work**
   - Persistent memory across years (vault + bridged learning records).
   - Turning external sources (papers, talks, web) into durable wikilinked notes + learning records.
   - Autonomous research loops (`/until-done "Research X in vault until synthesis + record exists"` + maintenance recipes).
   - `/teach` over multiple sessions with vault as the long-term home.
   - Grounding engineering work in personal prior knowledge via `research-from-vault` reach points.

7. **Core Flows** (condensed from `docs/agents/brain.md`)
   - Learning, research-in-vault, external → vault → synthesize, engineering with memory, maintenance via `/loop`.

8. **Quickstart + Setup Order**
   - Install both collections.
   - Run order: `/setup-matt-pocock-skills` → `/setup-agent-loops` → `/setup-knowledge-vault`.
   - Optional: davidondrej (research-and-web first).
   - Reinstall commands.
   - "Prefer vault first" rule.

9. **Key Files & References**
   - `docs/agents/brain.md`, `loops.md`, `knowledge-vault.md`
   - `skills/engineering/ask-matt/SKILL.md` (Knowledge section)
   - New skill folders with recipe examples
   - Links to teach formats and personal obsidian-vault note.

10. **Bottom Line / Philosophy**
    - "Completed" Matt's engineering foundation with memory and research capabilities.
    - Designed for people who need their agent to remember, research, and iterate autonomously over long periods.

## Supporting Changes (small)

- In `docs/agents/brain.md`, add a short "See also" line near the top or in the Related section:
  ```
  See also `docs/OPTIMAL-BRAIN.md` for a fuller comparison, Karpathy distinction, and research/PhD-oriented guidance.
  ```
- (Optional, low priority) Add one cross-link sentence in the top-level `README.md` under the Productivity or a new "This Fork" note, only if it feels natural.

## Non-Goals / Out of Scope
- Do not edit `whatNew.md`.
- Do not change any skill code or recipes.
- Do not create a full "PhD workflow" guide in this doc (can be a follow-up file if requested).
- Keep the new doc focused and reasonably concise (target ~150-250 lines).

## Implementation Order (todos)
1. Create `docs/OPTIMAL-BRAIN.md` with the structure above.
2. Copy/adapt the mermaid diagram and core flows from `docs/agents/brain.md`.
3. Write the prominent Karpathy section using details from the conversation (narrow pattern vs general stack).
4. Clean the comparison table and quantitative section (use exact paths from the current repo state).
5. Add the "See also" link in `docs/agents/brain.md`.
6. Verify links and that no linter issues are introduced in markdown.
7. (Later) Consider whether to archive or delete `whatNew.md`.

This produces a single, clean, accurate, and discussion-complete piece of documentation that can be shared with others using or evaluating the fork.