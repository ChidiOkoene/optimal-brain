# Stage 1: Fragments

A **fragment** is one usable piece of raw material with a receipt. Atomic like an evergreen note: one idea per bullet, so it can be moved, merged, or cut without dragging others along.

## Format

```markdown
- F07 [claim] Agents lose project knowledge between sessions unless it is written to disk. — [[Context Windows Reset Per Session]] (high)
- F08 [evidence] Repeated re-explaining was the top complaint in 9 of 12 interviews. — [[Interview Notes Agent Users]] (medium)
- F09 [counterpoint, must-address] Long-context models may make external memory unnecessary. — [[Long Context vs Retrieval]] (exploratory)
- F10 [author's view] I stopped re-explaining my repo once the vault existed. — [[Brief]]
- F11 [gap] Need a number for how long a typical session is. — no source yet
```

Fields: ID, type, one-sentence content in your own words, source wikilink, source confidence in brackets.

Types: `claim`, `evidence` (data, observation, quote supporting a claim), `example`, `quote` (exact wording matters), `counterpoint` (add `must-address` if a reasonable reader would raise it), `question`, `author's view`, `gap`.

## Mining order

1. `Indexes/Context Index.md`: active notes on the topic.
2. Synthesis notes and session hubs: they already summarise; mine their `Sources` to reach findings.
3. `Findings/`: the atomic claims. Prefer these as sources; they carry confidence and session links.
4. Source companions: for quotes and page refs.
5. Learning records and personal notes: author's view and stories (personal notes are the user's own words; quote them only with permission).

Cite the most specific note: a finding over a synthesis, a source companion over a finding, when quoting.

## Interviewing for what the vault lacks

The vault holds evidence; the article also needs a point of view. Ask one at a time, with a recommended answer:

- "What do you believe about this that your notes don't say outright?"
- "What happened to you that made this matter?"
- "Who would disagree, and what would they say?"
- "If the reader remembers one sentence, what is it?"

Record answers as `author's view` fragments immediately.

## Gaps

Every `gap` gets a decision in `Brief.md` `## Decisions`: research (run `research-from-vault`, then add the new finding as a fragment), soften (becomes author's view, hedged), or cut.
