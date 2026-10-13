# Example: one research session (illustrative)

> **Illustrative only.** The vault, notes, and topic are made up to show the shape of a run. They aren't from a real vault, and the facts in them are placeholders.

## Prompt

> Research how other teams handle agent memory decay, using my vault first.

## What the agent does

1. Reads `.agent/context/knowledge-vault.md` to get the vault path the user configured (e.g. `<VAULT>/`).
2. Searches the vault first: `Indexes/Context Index.md`, then notes whose titles match "memory", "decay", or "forgetting". It finds two prior notes: `[[Agent Memory Survey]]` (confidence: medium) and `[[Old Memory Approach]]` (`superseded_by: [[Agent Memory Survey]]`, so it is not used as current truth).
3. Opens a session hub: `Research Sessions/Agent Memory Decay.md`.
4. Captures each substantive finding as its own note in `Findings/`, e.g. `Findings/Recency Weighting Beats Hard Expiry.md`, with frontmatter `type: finding`, `session: "[[Agent Memory Decay]]"`, `confidence: exploratory`, `sources: ["[[Agent Memory Survey]]"]`.
5. Writes a synthesis note that links every finding, then updates `Indexes/Context Index.md` (active) and `Indexes/Research Index.md`.

## Resulting vault changes

```text
<VAULT>/
  Research Sessions/Agent Memory Decay.md      # hub: goal, timeline, findings log, synthesis
  Findings/Recency Weighting Beats Hard Expiry.md
  Findings/Supersession Needs Explicit Links.md
  Agent Memory Decay Synthesis.md              # links findings, states confidence and open questions
  Indexes/Context Index.md                     # synthesis added under Active knowledge
  Indexes/Research Index.md                    # session added
```

The agent reads and writes nothing outside this repo and `<VAULT>/`.
