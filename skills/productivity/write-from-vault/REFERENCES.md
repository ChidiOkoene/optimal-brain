# References: write-from-vault

Sources that shaped this skill, and the idea taken from each.

1. **Sönke Ahrens, *How to Take Smart Notes*** (2017; 2nd ed. 2022), ISBN 978-1542866507.
   Writing is the product of a note practice, not a separate phase: you write from a pile of permanent notes, never from a blank page, and gaps in the pile show you what to research. Source of Stage 1 (mine first, write later) and of gaps feeding `research-from-vault`.
2. **Andy Matuschak, "Evergreen notes"** and linked notes "should be atomic", "should be concept-oriented", "should be densely linked", "write notes for yourself by default": https://notes.andymatuschak.org/Evergreen_notes, https://notes.andymatuschak.org/Evergreen_notes_should_be_atomic, https://notes.andymatuschak.org/Evergreen_notes_should_be_densely_linked, https://notes.andymatuschak.org/Evergreen_notes_should_be_concept-oriented
   Notes are written for yourself; an article is written for a reader, so the move between them is a real transformation, not a copy. Source of atomic fragments and of citing the most specific note.
3. **Zettelkasten introduction**, https://zettelkasten.de/introduction/ (Luhmann's slip-box method).
   One idea per note, links as the structure. Source of the fragment format and the link-back rules.
4. **Barbara Minto, *The Pyramid Principle*** (Pearson, 3rd ed.), summarised at https://thebastrategytoolkit.com/frameworks/pyramid-principle/
   Lead with one governing thought; SCQA opening; grouped, non-overlapping supporting claims; vertical "why/how" logic. Source of Stage 2 and the why/how test.
5. **Toulmin model of argument** (claim, grounds, warrant, qualifier, rebuttal), https://en.wikipedia.org/wiki/Toulmin_model_of_argument
   Source of the Claim Ledger's columns: the claim, evidence (grounds), caveat/warrant, strength as the qualifier, and `must-address` counterpoints as rebuttals.
6. **Anthropic skill authoring best practices**, https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices
   Its research-synthesis checklist ("for each major claim, verify it appears in the source material… check that every claim references the correct source") and validation-loop pattern. Source of Stage 4 as a re-runnable gate.
7. **Anthropic, "Building effective agents"**, https://www.anthropic.com/engineering/building-effective-agents
   Prompt chaining with gates between steps ("write an outline, check it meets criteria, then write the document"). Source of the staged pipeline with an explicit gate at each status change.
8. **Matt Pocock, `writing-fragments`, `writing-shape`, `writing-beats` drafts** in mattpocock/skills (MIT). Source of the explore/exploit split and of grounding concepts beat by beat.
9. **CommonMark spec**, https://spec.commonmark.org/, and **GitHub Flavored Markdown spec**, https://github.github.com/gfm/
   Inline links, link reference definitions, and images are standard; footnotes are not in either spec (an extension supported by GitHub, dev.to/Forem, Pandoc, Obsidian, most static site generators). Source of the `links` style as the most portable fallback.
10. **Obsidian Help, "Internal links"** and **"Embed files"**, https://help.obsidian.md/links, https://help.obsidian.md/embeds
   Wikilinks `[[Note]]`, aliases `[[Note|text]]`, heading `#` and block `#^id` links, `![[...]]` embeds; block references "won't work outside of Obsidian". Source of the conversion table in EXPORT.md.
11. **Pandoc User's Guide: footnotes and citations**, https://pandoc.org/MANUAL.html#footnotes and https://pandoc.org/MANUAL.html#citations
   `[^id]` reference footnotes; `[@key]` / `[@a; @b]` citations resolved with `--citeproc` from a `references:` YAML field (CSL); `::: {#refs}` places the bibliography. Source of the `footnotes` and `pandoc` styles.
12. **Forem (dev.to) footnote handling**, https://github.com/forem/forem/pull/23018
   dev.to renders `[^1]` footnotes. Source of the `footnotes` default for dev.to.
13. **Substack Markdown compatibility test**, https://markdownpreflight.com/evidence/substack/ (third-party test, 2026-08-24)
   Substack doesn't parse pasted Markdown; rich-text paste keeps headings, lists, and links, but footnotes must be recreated with the native control. Source of the "links style + rich paste" advice. Re-check if Substack's editor changes.
