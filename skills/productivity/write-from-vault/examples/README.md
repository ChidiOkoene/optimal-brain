# Example: "Why Coding Agents Forget"

A tiny vault and the draft this skill should produce from it.

- `sample-vault/Findings/`: four findings. One is **superseded**, one is **exploratory**, so the run has to apply the validity rules.
- `sample-vault/Sources/`: one source companion the findings cite.
- `sample-vault/Drafts/Why Agents Forget/`: the expected Brief, Claim Ledger, and article after Stage 4.
- `sample-vault/Drafts/Why Agents Forget/export/`: the expected Stage 5 output (`--style footnotes`): `why-agents-forget.md` and `EXPORT-REPORT.md`. The report must flag the exploratory long-context source (ledger row C3) and the three notes with no public URL.

What a correct run does:
- Never cites `Agents Remember Via Chat History` (superseded); cites its replacement instead.
- Hedges the long-context claim, because its only evidence is `exploratory`.
- Every factual sentence in the article links a note that exists in this folder.

Smoke test: copy `sample-vault/` somewhere, delete `Drafts/`, point `knowledge-vault.md` at it, run `/write-from-vault Why do coding agents forget?`, and diff against the expected draft. Wording will differ; the ledger, citations, and hedging should not.

Export check (deterministic, no agent needed):

```bash
python3 ../scripts/export.py sample-vault "Drafts/Why Agents Forget" --style footnotes
git diff --exit-code sample-vault/Drafts/
```

Exit code 2 (flags present) is expected; the `git diff` must show no changes. Expected `links` and `pandoc` outputs live in [expected-export/](expected-export/). `npm run validate` runs all three styles as a golden test in CI.
