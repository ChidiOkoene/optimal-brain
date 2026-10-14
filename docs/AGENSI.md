# Listing on Agensi

optimal-brain is listed **free** on [Agensi](https://www.agensi.io), with attribution to [mattpocock/skills](https://github.com/mattpocock/skills) and a link back to this repo. This page maps Agensi's published creator guides to what this repo does, and explains how to build the upload zips.

The guides it's checked against:

- Security scan: https://www.agensi.io/learn/how-agensi-security-scan-works
- Creator checklist: https://www.agensi.io/learn/skill-md-creator-checklist
- Descriptions: https://www.agensi.io/learn/write-skill-md-description-that-triggers
- Listing process: https://www.agensi.io/learn/how-to-sell-skills-on-agensi

## What gets listed

| Zip | Contents | Why |
|-----|----------|-----|
| `optimal-brain-full.zip` (upload first) | Root `SKILL.md` router + all 36 skills under `skills/` as subfolders (engineering, productivity, personal, misc). Routes new users to `setup-optimal-brain`. `setup-pre-commit` and `git-guardrails-claude-code` are marked opt-in. | The full optimal-brain experience in one install. Pack-root `README.md` documents every skill (`"readme": "root"` in the config). |
| `optimal-brain-vault-pack.zip` | Root `SKILL.md` router + `setup-knowledge-vault`, `research-from-vault`, `seed-vault-from-repo`, `write-from-vault`, `project-notes`, `vault-context-canvas`, `vault-sync` as subfolders | These skills depend on each other (all read `.agent/context/knowledge-vault.md`), so they ship together. |
| `two-axis-review.zip` | `two-axis-review` alone | Self-contained, with a worked example. |

The guides don't say whether one listing may contain several skill folders under a root `SKILL.md`. **Confirm that with Agensi before uploading the pack.** If it isn't allowed, upload the per-skill zips from `--all` instead; the vault skills will then need `setup-knowledge-vault` installed too.

Configuration lives in [`packaging/agensi/agensi.config.json`](../packaging/agensi/agensi.config.json). The pack's root `SKILL.md` and `README.md` are in `packaging/agensi/optimal-brain-vault-pack/`.

## Build

```bash
npm ci
npm run package:agensi            # dist/agensi/*.zip (dist/ is gitignored)
npm run package:agensi -- --all   # also dist/agensi/skills/<name>.zip for every plugin skill
node scripts/package-agensi.mjs --dry-run --all   # what CI runs inside npm run validate
```

The packager has no dependencies and writes reproducible zips (fixed timestamps). It:

- **Folder layout:** builds exactly one top-level folder per zip, with `SKILL.md` at its root.
- **Exclusions:** skips `misc/`, `personal/`, `scripts/link-skills.sh`, `node_modules`, `.DS_Store`, `Thumbs.db`, and `__pycache__`.
- **Hard failures:** symlinks, `.env*` files, key files, and non-text (binary) files fail the build.
- **Repo paths:** rewrites them (`skills/<bucket>/<name>/…`) to paths inside the zip.
- **Single-skill zips:** copies any file a skill links to outside its folder into `_shared/` and rewrites the link, so nothing points outside the zip.
- **Checks:**
  - every Markdown link resolves inside the zip
  - frontmatter has `name` (equal to the folder) and `description`, and there's a real body
  - content scan for env-var harvesting, remote-script execution (`curl … | sh`), `rm -rf /` or `~`, global config writes, package installs or `sudo`, hardcoded secrets, long base64 blobs, and references to excluded skills

`npm run validate` (and CI) also fails if a plugin skill's description has no "Use when …" clause, or if a listed skill folder has no `README.md`.

## Compliance checklist

| Guide item | Status | Where |
|------------|--------|-------|
| **Scan 1: prompt injection** (no hidden or overriding instructions) | ✅ No hidden instructions. Loops have explicit stop rules and "forbidden without approval" lists. | `agent-loop/STOP-RULES.md` |
| **Scan 2: data exfiltration** (no reads outside scope, no secret env vars) | ✅ The vault skills read and write only the repo and the vault path the user types. `setup-knowledge-vault` asks instead of probing the disk. `seed-vault-from-repo` never opens `.env*` or credentials. | skill READMEs, descriptions |
| **Scan 3: dangerous commands** | ✅ for the vault pack and two-axis-review. ⚠️ The full pack includes two opt-in `misc/` skills: `setup-pre-commit` (installs Husky, lint-staged, Prettier as repo dev dependencies) and `git-guardrails-claude-code` (writes a Claude Code hook; `~/.claude/settings.json` only if the user picks "all projects", project scope is the default). The packager allows that one `~/.claude/settings` match via the pack's `allow` list and prints a warning; Agensi's own scanner may still flag it. | `agensi.config.json` `allow`, router "Opt-in tools" |
| **Scan 4: hardcoded secrets** | ✅ None. The TDD mocking example uses a placeholder `PAYMENT_API_KEY`, marked illustrative. | scan rule "hardcoded secret" |
| **Scan 5: obfuscated code** | ✅ Readable Markdown and one commented Python script. | scan rule "obfuscated blob" |
| **Scan 6: suspicious network access** | ✅ No network calls. External web research is an optional third-party pack the user installs themselves, documented as such. | `export.py` header, research-from-vault |
| **Scan 7: zip structure** | ✅ One top-level folder, `SKILL.md` at its root, no symlinks or binaries. | `scripts/package-agensi.mjs` |
| **Scan 8: SKILL.md validity** | ✅ YAML frontmatter with `name` and `description`, and a non-empty body. | packager + `validate.mjs` |
| **Checklist: slug-style name** | ✅ | |
| **Checklist: trigger-based description** ("Use when", 3–5 phrases) | ✅ All 31 plugin skills, enforced in CI. | `validate.mjs` |
| **Checklist: extra frontmatter fields valid** | ✅ `disable-model-invocation` and `argument-hint` are valid YAML (optional, agent-specific). | |
| **Checklist: specific instructions and output format** | ✅ for listed skills | |
| **Checklist: tested in at least two agents** | ✅ Cursor; OpenCode 1.19.0 with `anthropic/claude-sonnet-5.5` via OpenRouter (tested 2026-10-13, headless, 6 scenarios, see below). Claude Code itself is still untested. | see below |
| **Checklist: self-contained** | ✅ for the three zips (cross-bucket links such as `../../productivity/setup-knowledge-vault/…` are rewritten to the flattened copy). ⚠️ Some `--all` per-skill zips are thin wrappers (e.g. `grill-me` calls `/grilling`) or expect setup skills. Don't list those alone. | |
| **Checklist: at least one supporting file or example** | ✅ for listed skills (`examples/` in research-from-vault, setup-knowledge-vault, seed-vault-from-repo, write-from-vault, two-axis-review). ⚠️ project-notes and vault-context-canvas have format references but no examples. | |
| **Checklist: README.md in skill folder** | ✅ for every listed skill and the pack root, enforced in CI. | |
| **Checklist: no OS junk files** | ✅ Excluded by the packager. | |

## Full pack smoke test: OpenCode (2026-10-14)

OpenCode 1.19.0, headless, `anthropic/claude-sonnet-5.5` via OpenRouter. `optimal-brain-full.zip` unzipped into a scratch Node repo's `.opencode/skills/`. 2 runs, about $0.12.

| Scenario | Result |
|----------|--------|
| Skill discovery: lists all 35 skills plus the router (and OpenCode's built-in skill) | Pass |
| "I just installed optimal-brain, what first?" routes to `setup-optimal-brain`, mentions optional setups and that the two misc skills are opt-in | Pass |
| "Set up optimal-brain for this repo": loads `setup-optimal-brain`, explores, reads its templates (including the rewritten link into `setup-knowledge-vault/templates/`), proposes `.agent/context/` files and stops for confirmation with nothing written | Pass |

Not exercised in this smoke test: the engineering flows (`to-prd`, `implement`, …), loops, and the opt-in skills.

## Second-agent test: OpenCode (2026-10-13)

Run with OpenCode 1.19.0, headless (`opencode run`), using `anthropic/claude-sonnet-5.5` via OpenRouter. Both zips were unzipped into a fixture repo's `.opencode/skills/`, and OpenCode also found the pack's nested skill folders. Total model cost was about $0.46.

| Scenario | Result |
|----------|--------|
| Skills discovered and listed (router, 6 vault skills, two-axis-review) | Pass |
| "research … using my vault" loads `research-from-vault`. With no vault configured, it asks for the path and doesn't scan the disk. | Pass |
| `/setup-knowledge-vault` with the path given writes only `.agent/context/`, the `.gitignore` block, and the given vault | Pass |
| `/seed-vault-from-repo` on a 2-unit monorepo: 12 notes with `source_commit`, Shared contract, flow, CI, and glossary; `.env` never opened | Pass |
| `/two-axis-review` on the bundled example: 3/3 planted issues, FAIL verdict, 0 false positives | Pass |
| `write-from-vault` `export.py` on the bundled example: matches the golden output (exit 2, flags as expected) | Pass |

Nothing was written outside the test directory.

**Not covered:**
- interactive confirmation gates (the drafts were pre-approved in the prompt)
- TUI slash commands
- `project-notes` and `vault-context-canvas`
- the staged writing flow of `write-from-vault`

**Follow-ups found (all resolved in PR #22):**
- ✅ Note titles are now filename-safe: `Plan - X`, `Decision Trace - X`, `Research Session - X`. The rule (no `:` `/` `\` `?` `*` `<` `>` `|` `"`) is in the vault template, seed-vault-from-repo, and RESEARCH-CAPTURE-FORMAT. `validate.mjs` fails on colon note titles or unsafe wikilinks.
- ✅ seed-vault-from-repo (including resync) and research-from-vault read the index folder and layout from the new **Vault Layout** section of `knowledge-vault.md`, and ask if it isn't stated. There's no hardcoded `Indexes/`.
- ✅ Setup skills (setup-knowledge-vault, setup-optimal-brain, setup-agent-loops, AGENT-CONTEXT-PATH) append the personal block only if it's missing, and never rewrite `.gitignore`.

## Re-test on v2.2.0: OpenCode (2026-10-13)

Same setup (OpenCode 1.19.0, `anthropic/claude-sonnet-5.5` via OpenRouter, headless), on `main` @ v2.2.0 with rebuilt zips. Total cost was about $0.85 for 9 runs.

| Scenario | Result |
|----------|--------|
| Discovery; research trigger (no vault: it asks for the path and the index location) | Pass |
| Setup with a flat layout, and setup with an `Indexes/` substructure. Vault Layout recorded in each case. | Pass |
| Seed on both vaults: Context Index at the vault root (flat) and in `Indexes/` (substructure); `source_commit` on every note | Pass |
| Interactive setup without pre-approval: stopped after Section A, wrote nothing | Pass |
| `export.py` matches the golden output | Pass |
| two-axis-review: 3/3 issues, right severities, FAIL verdict, 0 false positives | Pass on findings. Line numbers came from the `.diff` file, not the source file. See the follow-up below. |

**Fixes verified:**
- No `:` in any note filename or wikilink; titles use ` - `.
- The index location follows Vault Layout.
- `.gitignore` is append-only: the original commented file is a byte-exact prefix of the new one, with the block added exactly once.

**Safety:**
- Nothing was written outside the test directory.
- The `.env` canary was never read.

### Follow-up: two-axis-review line numbers (6 runs, strict grader)

Same setup. The skill reviewed the bundled `examples/change.diff`, read as a raw `.diff` file. A strict pass needs all of:
- the 3 issues
- correct severities
- verdict FAIL
- `file:line` on the post-change source (SQLi `:9`, superseded filter `:12`)
- 0 false positives

| Run | Skill text | Strict result | Notes | Cost |
|-----|-----------|---------------|-------|------|
| 1 | Location rule in `FINDINGS-FORMAT.md` only | FAIL | Cited diff-file lines (`:13-15`, `:17`) | $0.088 |
| 2 | same | PASS | | $0.059 |
| 3 | same | PASS | | $0.047 |
| 4 | Rule also in `SKILL.md` steps 1 and 5 (hunk `+start`, count down) | PASS | | $0.065 |
| 5 | same | FAIL | Not diff positions: it miscounted by 2 (SQLi `:7`, superseded `:11`). All findings and severities were correct. | $0.041 |
| 6 | same | PASS | | $0.054 |

**Result:**
- **Strict pass rate:** 4/6 overall, 2/3 after the `SKILL.md` change. No post-change run cited diff-file positions.
- **Unaffected:** findings, severities, and verdict were correct in all 6 runs, with false positives in only one run (run 1).
- **What's left:** counting line numbers out of a raw `.diff` stays error-prone. On a real branch, the skill reads `git diff` and can open the file at the reviewed commit, which avoids counting.

## Before publishing (still to do, by Chidi)

1. **Optional Claude Code check:** the two-agent requirement is met by Cursor plus OpenCode (above). To claim Claude Code too, unzip both zips into `~/.claude/skills/` and check that:
   - the skills appear
   - "research X using my vault" triggers `research-from-vault`
   - `/setup-knowledge-vault` asks for the path
   - `/two-axis-review` reproduces `examples/expected-review.md` closely

   Then update the "Agents tested" lines. **Until then, every listing must say Claude Code is untested.**
2. **Ask Agensi** whether a multi-skill pack with a root router is accepted as one listing.
3. Have someone who didn't build the skills try them (checklist: "Ask someone else to test it").

### Follow-up 2: verify-before-cite step (5 runs, strict grader)

Change: step 5 of `SKILL.md` now says to verify every `file:line` in the post-change file before citing it. If you only have a diff, apply it to a temp copy first. If you can't verify a line, cite the hunk and mark it `line unverified`. The example now includes the post-change files in `examples/after/`. Setup: OpenCode 1.19.0, `anthropic/claude-sonnet-5.5`, rebuilt zip. The prompt is unchanged and does not mention `after/`.

| Run | Strict grade | Locations | Cause of failure | Cost |
|---|---|---|---|---|
| 7 | FAIL | all correct (`:9`, `:12`, `:16-17`) | bullet layout instead of the FINDINGS-FORMAT label line, so the grader parsed 0 findings | $0.075 |
| 8 | FAIL | all correct; diff applied to a temp copy | 1 false positive (a `major` on the sort at `:13`) | $0.048 |
| 9 | FAIL | all correct | bullet layout, same as run 7 | $0.034 |
| 10 | PASS | all correct | – | $0.053 |
| 11 | PASS | all correct | – | $0.043 |

Result: 2/5 strict passes, $0.253. Every one of the 5 runs cited correct post-change lines. There were no diff-position citations and no miscounts, so the line-number problem is fixed. No run needed `line unverified`, and no run opened `expected-review.md`. The remaining failures have other causes: report-layout drift (2 runs) and one over-flagged spec finding.

### Follow-up 3: exact finding template and self-check (5 runs, strict grader)

Change: `SKILL.md` now includes the exact finding template and the full report skeleton, with the rule "every finding must use this exact layout; no bullet or prose findings". It also adds step 6, a self-check before output: layout, verified location, evidence-backed severity (downgrade or drop findings that rest on assumptions), and a verdict that matches the severities. Setup: OpenCode 1.19.0, `anthropic/claude-sonnet-5.5`, rebuilt zip, same prompt.

| Run | Strict grade | SQL injection | Superseded filter | Scope creep | False positives | Bullet findings | Cost |
|---|---|---|---|---|---|---|---|
| 12 | PASS | blocker | blocker | minor | 0 | 0 | $0.099 |
| 13 | PASS | blocker | blocker | major | 0 | 0 | $0.033 |
| 14 | PASS | blocker | major | minor | 0 | 0 | $0.062 |
| 15 | PASS | blocker | major | major | 0 | 0 | $0.040 |
| 16 | PASS | blocker | major | minor | 0 | 0 | $0.034 |

Result: 5/5 strict passes (up from 2/5), $0.268. Every run used the template, had a `FAIL` verdict and 0 false positives, and none opened `expected-review.md`. Remaining variance: scope creep is graded `minor` in 3 of 5 runs. The grader accepts any severity there.
