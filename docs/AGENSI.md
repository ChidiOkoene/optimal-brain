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
| **Checklist: tested in at least two agents** | ❌ **Pending.** Only Cursor has been used. | see below |
| **Checklist: self-contained** | ✅ for the two zips. ⚠️ Some `--all` per-skill zips are thin wrappers (e.g. `grill-me` calls `/grilling`) or expect setup skills. Don't list those alone. | |
| **Checklist: at least one supporting file or example** | ✅ for listed skills (`examples/` in research-from-vault, setup-knowledge-vault, seed-vault-from-repo, write-from-vault, two-axis-review). ⚠️ project-notes and vault-context-canvas have format references but no examples. | |
| **Checklist: README.md in skill folder** | ✅ for every listed skill and the pack root, enforced in CI. | |
| **Checklist: no OS junk files** | ✅ Excluded by the packager. | |

## Before publishing (still to do, by Chidi)

1. **Two-agent test (required by the checklist):** unzip both zips into Claude Code's skills folder (`~/.claude/skills/`) and check that:
   - the skills appear
   - "research X using my vault" triggers `research-from-vault`
   - `/setup-knowledge-vault` asks for the path
   - `/two-axis-review` reproduces `examples/expected-review.md` closely

   Then update the "Agents tested" lines in the READMEs and the README compatibility table. **Until then, every listing must say Claude Code is untested.**
2. **Ask Agensi** whether a multi-skill pack with a root router is accepted as one listing.
3. Have someone who didn't build the skills try them (checklist: "Ask someone else to test it").
