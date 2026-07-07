# Agent Loops

How loop-engineering skills (`agent-loop`, `/until-done`, `/implement`) should run verification and stop during autonomous iteration in this repo.

## Verification

This is a skills-only repo with no test suite. Use structural checks instead of tests.

| When | Command | Pass signal |
| ---- | ------- | ----------- |
| After each skill change | `bash scripts/list-skills.sh` | All expected `SKILL.md` paths listed; no errors |
| After each skill change | Frontmatter check | Each edited `SKILL.md` has valid `name` and `description` in YAML frontmatter |
| Before stopping | README + plugin sync | New skills in `engineering/`, `productivity/`, or `misc/` appear in top-level `README.md` and `.claude-plugin/plugin.json` per `CLAUDE.md` |

## Stop rules

| Rule | Value |
| ---- | ----- |
| Iteration cap | 5 fix attempts on one task |
| No-progress threshold | Same failure 3 times with no meaningful diff change |
| Forbidden without human approval | `git push`, publish/release, change `.github/workflows/**`, edit `.changeset/config.json` without intent |
| Human checkpoint | Loop stops at commit-ready; human reviews and merges |

When a stop rule fires, present a brief: what changed, last verifier output, why it stopped.

## Scope

### Editable during loops

- `skills/**`
- `docs/**`
- `README.md`
- `.claude-plugin/plugin.json`
- `.changeset/*.md` (when adding changesets for skill changes)

### Never edit without approval

- `.github/workflows/**`
- `.changeset/config.json`
- `LICENSE`

## Optimization loops

Not used in this repo.

## Starter recipes

See `skills/engineering/setup-agent-loops/recipes/` for copy-paste loop prompts (build-test-fix, implement-issue, scheduled triage, PR babysitting).
