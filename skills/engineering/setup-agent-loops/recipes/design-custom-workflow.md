# Recipe: Design a custom workflow

Inspired by Matt Pocock's draft `loop-me` skill in [mattpocock/skills](https://github.com/mattpocock/skills).

**Use when:** you want to delegate a recurring job to an agent (or a script, or nobody) and need a spec good enough that an implementer could build it without asking a question. Works for engineering chores and for life/knowledge work: weekly vault review, inbox-to-issues, dependency updates, "turn my reading into findings".

**Requires:** nothing. `/setup-agent-loops` Sections A-C apply only if the workflow edits a repo.

## Vocabulary

Use these terms when a workflow needs them; never force them in.

- **Loop**: a recurring pattern in the user's work or life (a week, a review, a repeated chore). Loops nest: a morning inside a week inside a project.
- **Workflow**: the written spec of one loop. Lives in `workflows/<name>.md` (or `.agent/context/workflows/` in a repo). The spec is the source of truth; runs are instances of it.
- **Job**: the progress the user wants from the loop, in their words: "When ___, I want to ___, so I can ___." Not a feature list.
- **Trigger**: what starts a run: an **event** (new issue, new file in `Inbox/`) or a **schedule** (`/loop 1d`). Prefer events: no empty runs.
- **Steps**: the map from trigger to outcome. Each step has an input, an action, an output, and an owner (`script`, `agent`, `human`).
- **Verifier**: how a run knows it succeeded: a command, a checklist, or a `/two-axis-review` gate. No verifier, no autonomy.
- **Checkpoint**: where a human verifies or decides. **Push right**: put it as late as possible, do all preparable work first, ask once.
- **Brief**: what a checkpoint shows: what was produced, why, the one decision needed, a link to the asset. Readable in under a minute. Never the raw output.
- **Guardrails**: stop rules, forbidden actions, scope, budget (time/tokens/money).

## Flow

Run `/grilling` with this recipe as the lens: one question at a time, each with a recommended answer. Write the spec as answers land; don't wait until the end.

1. **Map the user's world** (first run, or when `NOTES.md` is thin). Tools, channels, folders, and their own words for them. Record in `workflows/NOTES.md`; sharpen fuzzy terms into one canonical term each.
2. **Find the loop.** Ask what they do repeatedly, what they dread, what they forget. Propose loops they haven't noticed (from NOTES.md, vault Research Index, recurring issues). Pick one.
3. **State the job.** Write the job sentence. Ask for the last real time it happened: what triggered it, what "done" looked like, what went wrong. Use the real instance, not the ideal one.
4. **Map the steps** as they happen today (as-is), then the delegated version (to-be). For each step: input → action → output → owner. Mark steps that are deterministic (script them), judgement (agent), or taste/accountability (human).
5. **Choose the least machinery.** For each agent step ask: could a script do it? Could it be skipped? Use an agent only where judgement is needed. Many good workflows need no AI at all.
6. **Define the verifier** for each automated step and for the run as a whole. If one can't be defined, that step needs a checkpoint.
7. **Place checkpoints and push them right.** Write the brief each one presents.
8. **Set guardrails.** Reuse `.agent/context/loops.md` stop rules when in a repo; otherwise set an iteration cap, forbidden actions (send, post, delete, purchase, push), and a budget.
9. **Write 2-3 eval cases**: real past inputs with the expected outcome, including one that should be refused or escalated. These are how you know the built workflow works.
10. **Done test.** Read the spec as an implementer. Any question you'd have to ask means it's not done. Grill until there are none.

Write with [workflow-spec-template.md](../workflow-spec-template.md). Worked example: [examples/weekly-vault-review.md](../examples/weekly-vault-review.md).

## After the spec

- Build it: `/to-issues` on the spec, then `/implement` per issue; or, for a prompt-only workflow, a `/loop` line plus a recipe file.
- Run it supervised for the first few runs (checkpoint on every run), then remove checkpoints the eval cases and history show are safe.
- When reality diverges from the spec, edit the spec first, then the implementation.
