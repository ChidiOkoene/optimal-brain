# Claim Ledger

The ledger is what makes this skill trustworthy: every claim in the article has a row, every row has evidence that exists in the vault, and the wording in the article never outruns the evidence.

## Format (`Claim Ledger.md`)

```markdown
| ID | Claim | Evidence | Strength | Caveat / warrant |
| -- | ----- | -------- | -------- | ---------------- |
| C1 | Coding agents forget because nothing writes their learning to disk. | [[Context Windows Reset Per Session]], F07 | strong | — |
| C2 | Re-explaining the repo is the biggest daily cost. | [[Interview Notes Agent Users]] | moderate | 12 interviews, self-selected; say "in my interviews" |
| C4 | Long context alone won't remove the need for memory. | [[Long Context vs Retrieval]] | weak | exploratory note; frame as expectation, not fact |
```

## Strength

Derived from the evidence notes, not from how sure you feel:

| Strength | When | How the article may say it |
| -------- | ---- | -------------------------- |
| `strong` | ≥1 `confidence: high` note, or ≥2 independent `medium` notes, none superseded | State plainly |
| `moderate` | One `medium` note, or high-confidence note with a narrow scope | Hedge or scope it ("in X", "for Y") |
| `weak` | Only `exploratory` notes, or a single anecdote | Hypothesis, question, or cut |
| `opinion` | `author's view` only | First person ("I think", "in my experience") |

Notes with no `confidence` field count as `medium` if they cite a source, `weak` if they don't.

## Caveat / warrant

Write down why the evidence supports the claim when it isn't obvious (the warrant), and anything that limits it: sample size, date, scope, a conflicting note. If the caveat would change a reader's mind, it goes in the article.

## Maintenance

- Add a row whenever a beat introduces a new factual claim. No row, no claim.
- When a cited note later gets `superseded_by`, the row is stale: re-check the claim against the replacement and update the draft. A `/loop` over drafts with `status: verified` can catch this.
- At verify time, copy every evidence note into the draft frontmatter `sources:` so backlinks work in Obsidian.
