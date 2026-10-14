---
name: two-axis-review
description: Review a set of code changes against two separate axes, Standards (does it follow this repo's documented rules?) and Spec (does it do what the issue/PRD asked?), plus correctness, security, and test checks. Produces severity-ranked findings in conventional-comments style and a PASS/FAIL verdict usable as an agent-loop verification gate. Use when the user wants to review a branch, PR, diff, or work-in-progress, asks "review since X", "is this ready to merge", "check my changes against the issue", or when /implement, agent-loop, or /until-done needs a review gate before stopping.
---

# Two-Axis Review

Inspired by Matt Pocock's draft `review` skill in [mattpocock/skills](https://github.com/mattpocock/skills).

**Two axes, kept apart. Every finding labelled, ranked, and evidenced. One verdict.**

A change can follow every rule and build the wrong thing, or build exactly the right thing and break the rules. Reviewing both in one pass lets one axis hide the other, so this skill runs them separately and never reranks across them.

## Inputs

- **Base**: a commit, branch, tag, or `HEAD~N`. If the user gave none, use the merge-base with the default branch and say so. In a loop, the base is the commit the loop started from.
- **Spec** (optional): issue, PRD, or path. Issue tracker workflow: read `.agent/context/issue-tracker.md` first (fallback: `docs/agents/issue-tracker.md`).
- **Mode**: `interactive` (default, human reading) or `gate` (called from `/implement`, `agent-loop`, `/until-done`; verdict drives the loop).

## Process

Copy this checklist and tick it as you go:

```
- [ ] 1 Pin the diff
- [ ] 2 Find spec + standards
- [ ] 3 Run the axes (parallel if possible)
- [ ] 4 Run the cross-cutting checks
- [ ] 5 Rank, verdict, report
- [ ] 6 (optional) Log to vault
```

### 1. Pin the diff

- `git rev-parse <base>` must resolve, and `git diff <base>...HEAD` (three-dot: against the merge-base) must be non-empty. Include uncommitted work with `git diff <base>` when the user is reviewing WIP. Fail here, not inside subagents.
- Record `git log <base>..HEAD --oneline` and `git diff --stat`.
- **Size check.** Defect detection drops sharply above ~400 changed lines (see [REFERENCES.md](REFERENCES.md)). Over that, split the review by area (one pass per directory or commit group) and say so in the report. Generated files, lockfiles, and vendored code get a skim, not a line-by-line read.

### 2. Find the spec and the standards

**Spec**, first match wins: issue refs in commit messages or branch name (`#123`, `Closes #45`) → path the user passed → PRD/spec under `docs/`, `specs/`, `.scratch/`, `.agent/context/` matching the feature → ask. If there is genuinely none, the Spec axis reports `no spec` and the verdict cannot be PASS on spec grounds alone; say so.

**Standards**: anything that documents how code here should be written: `CODING_STANDARDS.md`, `CONTRIBUTING.md`, `CLAUDE.md`/`AGENTS.md` rules, `CONTEXT.md` vocabulary, ADRs in `docs/adr/`, lint/format config (only to know what tooling already enforces, so you can skip it).

### 3. Run the two axes

If your harness has subagents, send both in **one message** so they run in parallel with clean contexts. Otherwise run them sequentially and clear your head between them: finish and write down Standards before reading the spec.

**Standards brief:**
> Diff: `<command>`. Commits: `<list>`. Standards sources: `<files>`. Report every place the diff breaks a documented rule. Cite the rule (file + quote). Mark each as `rule` (written down) or `judgement` (consistency with surrounding code, not written). Skip anything a linter/formatter enforces. Use the comment format in FINDINGS-FORMAT.md. Under 400 words.

**Spec brief:**
> Diff: `<command>`. Spec: `<contents or path>`. Build a requirement checklist from the spec first, then check the diff against it. Report (a) requirements missing or partial, (b) requirements implemented incorrectly, (c) behaviour nobody asked for (scope creep). Quote the spec line for each. Use the comment format in FINDINGS-FORMAT.md. Under 400 words.

### 4. Cross-cutting checks

Do these yourself (or as a third parallel subagent on big diffs), using [CHECKS.md](CHECKS.md): **correctness**, **security**, **tests**, **design and complexity**. These are not a third axis to merge into the others; report them under their own heading.

If verifiers are configured (`.agent/context/loops.md`, fallback `docs/agents/loops.md`), run the fast verifier once and record the result. A red verifier is an automatic `blocker`.

### 5. Rank, decide, report

Label and rank every finding using [FINDINGS-FORMAT.md](FINDINGS-FORMAT.md). Severity order: `blocker` > `major` > `minor` > `nit`. Every finding needs a location (`file:line` in the post-change file) and evidence (a quote of the rule, the spec line, or the code). No evidence, no finding: downgrade it to a `question`.

**Verify every location before citing it.** Open the post-change file and confirm the quoted code is on that line (`grep -n '<snippet>' <file>`, or read the file at that line). Use the working tree or `git show HEAD:<file>`. If you only have a `.diff`, apply it to a temp copy first (`git apply` or `patch -p1`) and look up the line there. Never cite a line's position inside the diff text. If you can't verify a line, cite the hunk (`file @@ +start,len`) and write `line unverified`. Don't guess.

**Verdict:**
- **FAIL** if any `blocker`, or any `major` on Spec or Security.
- **PASS WITH NOTES** if only `major` (Standards/Design), `minor`, or `nit`.
- **PASS** if nothing above `nit`.

**Every finding must use this exact layout. No bullet or prose findings.** Copy it as is:

```
<label> (<severity>[, <axis-tag>]): <subject> — `path/to/file.ts:42`

<evidence: quoted rule, spec line, or code>
<why it matters, one or two sentences>
<suggested fix>
```

`<label>` is `issue`, `suggestion`, `question`, `nitpick`, or `praise` (see [FINDINGS-FORMAT.md](FINDINGS-FORMAT.md)). `<severity>` is `blocker`, `major`, `minor`, or `nit`. Leave one blank line between findings.

Report skeleton (fixed, so loops can parse it):

```markdown
## Verdict: FAIL | PASS WITH NOTES | PASS
Base: <ref> (<sha>) · <N> files, +A/-D · Spec: <source or "none">

## Standards
<findings in the template above, worst first, or "None.">

## Spec
Requirements: <met>/<total>
<findings in the template above, worst first, or "None.">

## Checks (correctness · security · tests · design)
<findings in the template above, worst first, or "None.">

## Praise
<at least one sincere, specific thing done well; omit if there honestly is none>

## Summary
Standards: <n> (worst: …) · Spec: <n> (worst: …) · Checks: <n> (worst: …)
Next: <the one change that would flip the verdict, if FAIL>
```

Keep the axes separate in the summary: worst finding per axis, never a single overall winner.

### 6. Self-check, then output

Before you output the report, check every finding:
- **Layout:** it matches the template exactly (label line, then evidence). Rewrite any bullet or prose finding.
- **Location:** its `file:line` was verified in step 5, or it is marked `line unverified`.
- **Severity:** the severity is justified by concrete evidence: a quoted spec line or standard, or code that shows actual harm. A finding that rests on an assumption ("only correct if…", "might be…") has no evidence of harm. Downgrade it to `question` (`minor`), or drop it.
- **Verdict:** the verdict follows the rules in step 5 from the severities that remain.

### 7. Gate mode (inside loops)

When called from `/implement`, `agent-loop`, or `/until-done`:

- Treat `FAIL` like a failing verifier: feed the `blocker`/`major` findings into the next **Act** step as the fix list. Do not fix `minor`/`nit` inside the loop unless trivial; list them in the stop brief.
- Re-review only the delta since the last review plus the fixed findings, not the whole diff, and count each re-review as a loop iteration.
- Stop rules from `agent-loop`'s STOP-RULES still apply. The same `blocker` surviving 2 fix attempts counts as no progress: stop and brief the human.
- Never push, merge, approve, or post review comments to a remote without explicit approval. The output is a local report.

### 8. Log to the vault (optional)

If `.agent/context/knowledge-vault.md` exists (fallback `docs/agents/knowledge-vault.md`) and the review surfaced a **decision** (a tradeoff accepted, a rule clarified, a spec ambiguity resolved), write a short decision trace to vault `Decision Traces/` using the template from `/setup-knowledge-vault`, linking the branch/PR and the finding. Routine nits never go to the vault.

## What this skill is not

- Not a linter. If a tool can enforce it, recommend the tool rule instead of commenting.
- Not a rewrite. Suggest the smallest change that fixes the finding; a patch snippet beats prose.
- Not a style preference engine. Unwritten preferences are `nit (non-blocking)` at most.

See [examples/](examples/) for a worked spec, diff, and the expected report. Research behind the design: [REFERENCES.md](REFERENCES.md).

**Vault:** when this finishes, update the vault per the `## Vault write-back` block in `AGENTS.md`/`CLAUDE.md`, or run `/vault-sync`.
