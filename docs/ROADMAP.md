# Roadmap

This is a direction, not a promise. Items get done roughly in order. Want one? Comment on or open an issue (labels: `help wanted`, `good first issue`, `agent-compat`, `new-skill`).

## 1. Show it working

- **Demo GIF:** one research → note → read-back → article loop, recorded in a real agent.
- **Sample vault:** a small public Obsidian vault (beyond the `write-from-vault` example fixture) you can clone to try the Lite path in five minutes without your own notes.

## 2. Live-tested agent matrix

The [compatibility table](../README.md#agent-compatibility) is honest but thin. Cursor is used day to day, Claude Code is supported but not separately tested, and everything else is untested. The goal is a matrix of what was actually run, per agent:
- install method
- discovery
- user-invoked commands
- model-invoked triggering
- setup skills
- loops
- review
- export

Each cell should cite an **Agent compatibility report** issue.

## 3. Harder review evals with false-positive scoring

A first multi-model eval ran `two-axis-review` on its own example (planted SQL injection, wrong status filter, scope creep), 5 samples per model:
- **Detection:** all four models tested (Claude Sonnet 5.5, GPT-5.6 Terra, Grok 4.7, DeepSeek V4.1 Flash) found **3/3 planted issues** at an acceptable severity and returned FAIL in every sample.
- **Precision:** they differed. Extra major/blocker findings averaged 0.0–1.2 per review, and the strict pass rate ranged from 20% to 100%.
- **Caveats:**
  - It was one small, easy example. The grader needed two fixes after a manual read of the raw reviews.
  - Several "false positives" are judgment calls, such as "the diff doesn't wire up the CLI".

Treat this as a smoke test, not a benchmark. Next:
- More and harder tasks: subtle authz bugs, race conditions, spec ambiguity, clean diffs that *should* PASS.
- Explicit false-positive scoring, with a reviewed allowlist of acceptable extra findings.
- pass^k reporting.
- Moving the harness (currently outside this repo) into `evals/`, with a CI job that runs offline grader self-tests only (no API keys in CI).

## 4. Optional split pack: obsidian-research-brain

Offer the vault memory layer (`setup-knowledge-vault`, `research-from-vault`, `project-notes`, `vault-context-canvas`, `write-from-vault`) as a smaller pack for people who don't want the engineering skills. Same source, different manifest.

## 5. Test the gstack combination

[WITH-GSTACK.md](./WITH-GSTACK.md) is based on reading both repos, and parts are marked untested. Install both packs in Claude Code and Cursor, run the recommended flows, and update the doc with what actually happened.
