# two-axis-review

Reviews a diff on two separate axes, Standards (your repo's documented rules) and Spec (the issue or PRD), plus correctness, security, and test checks. It reports severity-ranked findings in conventional-comments style and a PASS/FAIL verdict that loops can use as a gate. See [examples/](./examples/).

## How to invoke

Type `/two-axis-review` (e.g. "review since main against issue #42"), or ask "is this ready to merge?".

## What it reads and writes

- **Reads:** `git diff` of the change, the spec/issue you point at, and repo standards docs (`CONTEXT.md`, `docs/adr/`, `CLAUDE.md`/`AGENTS.md`).
- **Writes:** nothing by default; the review is returned in chat. If a vault is configured, it optionally writes one decision-trace note there.
- Never pushes, comments on PRs, or edits code.

## Agents tested

- **Cursor:** used during development.
- **OpenCode 1.19.0** with `anthropic/claude-sonnet-5.5` via OpenRouter (tested 2026-10-13, headless): on the bundled example it found all 3 planted issues with a FAIL verdict and 0 false positives (by the eval grader).
- **Claude Code:** supported via the plugin manifest, **not yet tested**.
- Other Agent Skills agents: untested. Reports are welcome at https://github.com/ChidiOkoene/optimal-brain/issues.

No API keys, no network calls, nothing installed. Part of [optimal-brain](https://github.com/ChidiOkoene/optimal-brain) (MIT), forked from [mattpocock/skills](https://github.com/mattpocock/skills).
