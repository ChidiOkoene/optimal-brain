---
name: write-from-vault
description: "Turn vault research notes into a sourced article, one stage at a time (mine fragments, shape a pyramid, write beat by beat), with every claim traced to a note, saved back into the vault, and exported to publish-ready Markdown. Use when the user wants a blog post, article, memo, or newsletter from their research, or says write this up from my notes. Reads and writes only this repo and the vault path you configured."
disable-model-invocation: true
argument-hint: "A topic or question, a session hub, or an existing Drafts/ folder to resume"
---

# Write from Vault

Inspired by Matt Pocock's draft `writing-fragments`, `writing-shape`, and `writing-beats` skills in [mattpocock/skills](https://github.com/mattpocock/skills).

**Your notes are the quarry. The article is the building. Every claim keeps its receipt.**

Writing from a vault is not summarising it. Notes are atomic and written for you; an article is one argument written for a reader. This skill moves between the two in three stages, and the **claim ledger** carries the evidence across so nothing in the final piece is unsourced, superseded, or stronger than its source.

## Before you start

Read `.agent/context/knowledge-vault.md` first (fallback: `docs/agents/knowledge-vault.md`). If missing, run `/setup-knowledge-vault` before continuing. If missing and `.agent/context/knowledge-vault.example.md` exists, ask the user to copy it and fill in their own path; never use the placeholder. Also read vault `Indexes/Context Index.md` when present.

Settle three things with the user, one question at a time, each with your recommended answer:

1. **Question**: the one question the article answers for the reader (not a topic: "Why do coding agents forget, and what fixes it?", not "agent memory").
2. **Reader**: who, and what they already know (the **grounded** concepts at the start).
3. **Form and length**: blog post, internal memo, README section, talk outline; rough word count.

Create the draft workspace (see [DRAFT-WORKSPACE.md](DRAFT-WORKSPACE.md)):

```
{Vault}/Drafts/<Article Title>/
  Brief.md        question, reader, form, grounded concepts, status
  Fragments.md    stage 1 output
  Claim Ledger.md every claim → evidence (the spine of the whole skill)
  Outline.md      stage 2 output
  <Article Title>.md   stage 3 output
  export/         stage 5 output (publishable copy + report)
```

Resuming? Read `Brief.md` `status` and continue from the next stage. Re-read files from disk before every write; the user may have edited them.

## Stage 1: Fragments (mine the vault)

Goal: a pile of raw material, each piece with a pointer back to where it came from. Detail: [FRAGMENTS.md](FRAGMENTS.md).

1. Search the vault for the question: Context Index, Research Index, session hubs, `Findings/`, synthesis notes, source companions. Follow `[[wikilinks]]` one or two hops.
2. **Apply validity rules** to every note before using it:
   - `superseded_by` set → don't use; follow the link to the replacement.
   - `confidence: exploratory` → may appear only as a flagged hypothesis ("early evidence suggests…").
   - `valid_until` in the past → treat as stale; ask the user before using.
   - Two notes conflict → record both and the conflict; prefer the newer unless `superseded_by` says otherwise.
3. Write each fragment to `Fragments.md`: one idea, its source `[[Note]]`, and type (`claim`, `evidence`, `example`, `quote`, `counterpoint`, `question`).
4. Interview the user for what the vault lacks: their opinion, a story, the "so what". These are fragments too, sourced `[[Brief]]` as `author's view`. One question at a time.
5. Name the **gaps**: claims the article will need that no note supports. Each gap becomes a decision: research it (`research-from-vault`, which captures findings back into the vault), soften it to opinion, or cut it.

Exit when the user agrees the pile is enough. Set `status: fragments-done`.

## Stage 2: Shape (find the argument)

Goal: an outline where the top is one claim and everything below supports it. Detail: [SHAPE.md](SHAPE.md).

1. Draft the **governing thought**: one sentence a reader could disagree with, answering the Question. Offer 2-3 candidates from the fragments; the user picks or edits.
2. Write the opening as **Situation → Complication → Question → Answer**. If the reader wouldn't accept the Situation or care about the Complication, the question is wrong; go back.
3. Group supporting fragments into 2-5 **key points**, each a full-sentence claim (not a topic label), non-overlapping, together enough to carry the governing thought.
4. Fill the **Claim Ledger** ([CLAIM-LEDGER.md](CLAIM-LEDGER.md)) for the governing thought and every key point: claim, evidence notes, strength, and any caveat the evidence forces.
5. Run the **why/how test**: read top-down asking "why?" or "how?" at each level. A broken chain means missing evidence or a point that doesn't belong.

Write `Outline.md`. Set `status: shaped`.

## Stage 3: Beats (write it)

Goal: the article, written one beat at a time in the reader's order. Detail: [BEATS.md](BEATS.md).

1. Keep a running **grounded list** in `Brief.md`: concepts the reader has. A beat may only lean on grounded concepts; when it introduces one, add it.
2. For the next position in the outline, offer 2-3 candidate beats (what it says, what it grounds, which ledger rows it uses). The user picks.
3. Write **only that beat** to the article file. Rework fragments into one voice; quote only when the wording is the point.
4. Every factual sentence carries an inline citation to its ledger row's source: `[[Finding Note]]` in vault drafts, or a footnote/link in the export. Match hedging to strength: `strong` states plainly, `moderate` hedges, `weak`/`exploratory` is framed as hypothesis or cut.
5. Re-read the file from disk, then offer the next beats. Loop until the outline is covered and the ending answers the Question.

Set `status: drafted`.

## Stage 4: Verify (the citation gate)

Run this before calling the draft done, and again after any big edit:

- [ ] Every factual claim in the article maps to a ledger row; every ledger row has at least one evidence note that exists in the vault.
- [ ] No cited note has `superseded_by` set or an expired `valid_until`.
- [ ] No claim is stated more strongly than its strength allows; `exploratory` evidence is visibly hedged.
- [ ] Every counterpoint fragment marked `must-address` is addressed in the text.
- [ ] The governing thought appears in the first ~150 words.

Fix and re-run until all pass. On failure in a loop (`/until-done`), treat this checklist as the verifier.

## Close the loop in the vault

- Link the draft from the session hub(s) it drew on and add it to vault `Indexes/Context Index.md` under drafts (or the index the vault config names).
- New knowledge created while writing (a gap you researched, a new synthesis) goes into `Findings/` per `research-from-vault`'s capture format, not only into the article.
Set `status: verified` when the gate passes.

## Stage 5: Export (when the user wants to publish)

Detail: [EXPORT.md](EXPORT.md). Ask the destination, pick the style (`footnotes` for GitHub/dev.to/blogs, `links` for Substack/Medium/email, `pandoc` for PDF/academic), then run:

```bash
python3 scripts/export.py "<vault root>" "Drafts/<Article Title>" --style <style>
```

It writes `Drafts/<Article Title>/export/<slug>.md` (wikilinks → citations, embeds resolved, vault metadata stripped) and `EXPORT-REPORT.md` (unresolved links, superseded/exploratory/expired sources, ledger rows to re-check, notes without public URLs). Clear every flag with the user; superseded or missing evidence sends you back to Stage 4. Set `status: exported`. Publishing is the user's call; never post anywhere.

## Shortcuts

- **Fragments only**: "mine my vault for X" and stop after Stage 1 (useful before a talk or meeting).
- **Existing pile**: user passes a markdown file of raw notes → skip vault search, still fill the ledger.
- **Rewrite**: existing article → rebuild the ledger from it, run Stage 4, report unsupported claims.

Worked example: [examples/](examples/). Research behind the design: [REFERENCES.md](REFERENCES.md).
