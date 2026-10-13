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
| `optimal-brain-vault-pack.zip` | Root `SKILL.md` router + `setup-knowledge-vault`, `research-from-vault`, `seed-vault-from-repo`, `write-from-vault`, `project-notes`, `vault-context-canvas` as subfolders | These skills depend on each other (all read `.agent/context/knowledge-vault.md`), so they ship together. |
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
| **Scan 3: dangerous commands** | ✅ for listed zips. `git-guardrails-claude-code` (global `~/.claude` writes) and `setup-pre-commit` (`npx` installs) are `misc/` and never packaged. | packager exclusions |
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
| **Checklist: self-contained** | ✅ for the two zips. ⚠️ Some `--all` per-skill zips are thin wrappers (e.g. `grill-me` calls `/grilling`) or expect setup skills. Don't list those alone. | |
| **Checklist: at least one supporting file or example** | ✅ for listed skills (`examples/` in research-from-vault, setup-knowledge-vault, seed-vault-from-repo, write-from-vault, two-axis-review). ⚠️ project-notes and vault-context-canvas have format references but no examples. | |
| **Checklist: README.md in skill folder** | ✅ for every listed skill and the pack root, enforced in CI. | |
| **Checklist: no OS junk files** | ✅ Excluded by the packager. | |

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
| two-axis-review: 3/3 issues, right severities, FAIL verdict, 0 false positives | Pass on findings. Line numbers came from the `.diff` file, not the source file. Fixed by the location rule now in `FINDINGS-FORMAT.md`. |

**Fixes verified:**
- No `:` in any note filename or wikilink; titles use ` - `.
- The index location follows Vault Layout.
- `.gitignore` is append-only: the original commented file is a byte-exact prefix of the new one, with the block added exactly once.

**Safety:**
- Nothing was written outside the test directory.
- The `.env` canary was never read.

## Before publishing (still to do, by Chidi)

1. **Optional Claude Code check:** the two-agent requirement is met by Cursor plus OpenCode (above). To claim Claude Code too, unzip both zips into `~/.claude/skills/` and check that:
   - the skills appear
   - "research X using my vault" triggers `research-from-vault`
   - `/setup-knowledge-vault` asks for the path
   - `/two-axis-review` reproduces `examples/expected-review.md` closely

   Then update the "Agents tested" lines. **Until then, every listing must say Claude Code is untested.**
2. **Ask Agensi** whether a multi-skill pack with a root router is accepted as one listing.
3. Have someone who didn't build the skills try them (checklist: "Ask someone else to test it").
