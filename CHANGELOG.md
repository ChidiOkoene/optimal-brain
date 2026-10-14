# optimal-brain

## 2.3.0

### Minor Changes

- [#29](https://github.com/ChidiOkoene/optimal-brain/pull/29) [`206b29d`](https://github.com/ChidiOkoene/optimal-brain/commit/206b29d4dcfc1466e6bf8bc92e78a3aaca8a2ea4) Thanks [@ChidiOkoene](https://github.com/ChidiOkoene)! - Add `optimal-brain-full`, a third Agensi pack with all 35 skills and a router that starts at `setup-optimal-brain` (misc skills marked opt-in). The packager now rewrites cross-bucket relative links in packs, allows misc/personal skills when they ship in the zip, and supports a per-pack `allow` list. `obsidian-vault` reads the vault path from `.agent/context/knowledge-vault.md` instead of a hardcoded path; `git-guardrails-claude-code` defaults to project scope.

- [#31](https://github.com/ChidiOkoene/optimal-brain/pull/31) [`0a5e920`](https://github.com/ChidiOkoene/optimal-brain/commit/0a5e9202a028f6009cbedb49996a1fa1d1b34065) Thanks [@ChidiOkoene](https://github.com/ChidiOkoene)! - `ask-brain` is now a true router over all 36 skills: a routing table grouped by intent, common chains (feature, PhD research, existing repo, debugging, loops), and a fixed answer shape (route, why, skip, first command) with at most one clarifying question. Model invocation is enabled so the agent can route when you describe a task without naming a skill. External links removed from the skill; attribution kept as one plain line in its README. `npm run validate` now checks the routing table lists every skill folder and no nonexistent ones.

- [#30](https://github.com/ChidiOkoene/optimal-brain/pull/30) [`bbca756`](https://github.com/ChidiOkoene/optimal-brain/commit/bbca756ec937b33177839a7bbb43b20765006fa8) Thanks [@ChidiOkoene](https://github.com/ChidiOkoene)! - Keep the vault updated while you work. `setup-optimal-brain` and `setup-knowledge-vault` now write an idempotent, marker-delimited `## Vault write-back` block into `AGENTS.md` (and `CLAUDE.md` if present). New `vault-sync` skill diffs git since the last-synced commit, updates or flags stale notes via `source_commit`/`source_paths`, captures missed decisions, and appends a session note; ships a dependency-free `vault-stale.mjs` helper. `two-axis-review`, `agent-loop`, `until-done` and `handoff` point to it when they finish.

### Patch Changes

- [#27](https://github.com/ChidiOkoene/optimal-brain/pull/27) [`45bf240`](https://github.com/ChidiOkoene/optimal-brain/commit/45bf2400413628f480d5b1608159ca429a7439e1) Thanks [@ChidiOkoene](https://github.com/ChidiOkoene)! - Fix `npm run package:agensi` and `npm run validate` on Windows checkouts with CRLF line endings ("SKILL.md has no frontmatter"). Both scripts now normalize CRLF to LF on every read, and the zips always contain LF. A new `.gitattributes` keeps checkouts LF. `npm run test:crlf` runs validate and packaging on a CRLF copy of the repo in CI.

## 2.2.1

### Patch Changes

- [#26](https://github.com/ChidiOkoene/optimal-brain/pull/26) [`37cb8a2`](https://github.com/ChidiOkoene/optimal-brain/commit/37cb8a2714e8bc72827516236808046229039dd0) Thanks [@ChidiOkoene](https://github.com/ChidiOkoene)! - two-axis-review: SKILL.md now includes the exact finding template and the full report skeleton (no bullet or prose findings), plus a self-check step before output. The self-check covers layout, verified location, evidence-backed severity (downgrade or drop findings that rest on assumptions), and verdict consistency.

- [#24](https://github.com/ChidiOkoene/optimal-brain/pull/24) [`e002da8`](https://github.com/ChidiOkoene/optimal-brain/commit/e002da884c5a5eae56e3f120ddc8cda37c3da7f5) Thanks [@ChidiOkoene](https://github.com/ChidiOkoene)! - two-axis-review: findings cite line numbers in the post-change file (from the hunk header), not positions in the diff output. docs/AGENSI.md records the OpenCode re-test on v2.2.0. `SKILL.md` steps 1 and 5 now spell out how to derive post-change line numbers from the hunk header. Every location is now verified against the post-change file, or cited as a hunk marked `line unverified`; the example ships the post-change files in `examples/after/`.

## 2.2.0

### Minor Changes

- [#22](https://github.com/ChidiOkoene/optimal-brain/pull/22) [`bb3a4a7`](https://github.com/ChidiOkoene/optimal-brain/commit/bb3a4a7352f153983892216e992c1dc17eaceca4) Thanks [@ChidiOkoene](https://github.com/ChidiOkoene)! - Agensi readiness: `npm run package:agensi` builds `optimal-brain-vault-pack` and `two-axis-review` zips (optionally one per skill with `--all`), with structure, symlink, and content-scan checks. Every plugin skill description now has a "Use when" trigger clause. Listed skills get READMEs stating what they read and write. `setup-knowledge-vault` asks for the vault path instead of probing the disk, and external research via davidondrej/skills is marked optional third-party. Adds examples for research-from-vault and setup-knowledge-vault, and docs/AGENSI.md. Note titles are filename-safe (`-` instead of `:`, enforced in validate). Vault skills read the index folder from a new Vault Layout section instead of assuming `Indexes/`. Setup skills append to `.gitignore` and never rewrite it.

## 2.1.0

### Minor Changes

- [#20](https://github.com/ChidiOkoene/optimal-brain/pull/20) [`3b141d6`](https://github.com/ChidiOkoene/optimal-brain/commit/3b141d67a99b355ce326833bb0dae113959e0be2) Thanks [@ChidiOkoene](https://github.com/ChidiOkoene)! - Add `seed-vault-from-repo`: seed an existing vault from a repo (per-unit Findings, Decision Traces, Plans, Unit Index; Shared contracts, flow, infra, glossary for multi-unit repos), with source paths and commit in frontmatter, secret/data guardrails, and a re-sync mode that updates only stale notes and never overwrites user-owned sections.

## 2.0.1

### Patch Changes

- [#16](https://github.com/ChidiOkoene/optimal-brain/pull/16) [`5b6ddd1`](https://github.com/ChidiOkoene/optimal-brain/commit/5b6ddd1fe9bd4dcbb76d12fc6d2ecb494a7344e1) Thanks [@ChidiOkoene](https://github.com/ChidiOkoene)! - Add CONTRIBUTING.md, CODE_OF_CONDUCT.md (Contributor Covenant 2.1), issue and PR templates, CODEOWNERS, and docs/ROADMAP.md.

## 2.0.0

### Major Changes

- First release under the optimal-brain name (fork of [mattpocock/skills](https://github.com/mattpocock/skills)). Entries below 2.0.0 are inherited from mattpocock/skills.
- **Vault memory layer**: `setup-knowledge-vault` (with ingestion and context-graph recipes), `research-from-vault` + `RESEARCH-CAPTURE-FORMAT.md`, `project-notes`, `vault-context-canvas`, `decision-mapping`; `teach` bridges learning records into the vault.
- **Loops layer**: `setup-agent-loops` (with recipes), `agent-loop` + `STOP-RULES.md`, `/until-done`; `implement` uses agent-loop discipline.
- **Architect layer**: `system-architect` with 10 competence role briefs, engagement types, and recipes.
- **Routing**: `ask-matt` → `/ask-brain`, `setup-matt-pocock-skills` → `setup-optimal-brain`.
- **Review**: new `two-axis-review` skill. Named `two-axis-review` (not `review`) so it doesn't collide with gstack's `/review` in `~/.claude/skills`; see `docs/WITH-GSTACK.md`. Standards and Spec axes run in parallel subagents, plus correctness/security/tests/design checks; conventional-comments findings with `blocker`/`major`/`minor`/`nit` severities; fixed PASS/FAIL report; gate mode for `/implement`, `agent-loop`, and `/until-done`; optional decision traces to the vault. `implement` now runs `/two-axis-review` as its final gate.
- **Writing**: new `write-from-vault` skill. Fragments → shape (pyramid/SCQA) → beats, with a claim ledger that traces every claim to a vault note, respects `confidence`/`superseded_by`/`valid_until`, and ends with a citation gate. Drafts live in vault `Drafts/`. Stage 5 export (`scripts/export.py`, standard-library Python) turns a verified draft into publish-ready Markdown in `Drafts/<Title>/export/` with `footnotes` (GitHub/dev.to/blogs), `links` (Substack/Medium/email), or `pandoc` (`[@key]` + CSL references) citations; resolves embeds, strips vault-only syntax, and writes an `EXPORT-REPORT.md` flagging unresolved links, superseded/exploratory/expired sources, and notes without public URLs.
- **Custom workflows**: `setup-agent-loops` gains a design-a-custom-workflow path (recipe, spec template, worked example): job statement, step map, verifiers, push-right checkpoints, guardrails, eval cases.
- Each new skill ships a `REFERENCES.md` with its research sources and a small worked example. Ideas credited to Matt Pocock's unreleased drafts (`review`, `writing-*`, `loop-me`).
- `resolving-merge-conflicts` is now listed in `plugin.json` and the READMEs; fixed broken relative links in `domain-modeling`, `setup-agent-loops`, and `setup-optimal-brain`.
- **Playbook**: `docs/PLAYBOOK.md` reorganised into six phases (Research → Ideate/Architect → Design → Build → Review → Publish), opens with the README's Lite path, agent-agnostic setup notes, new prompts for review, review-gated loops, writing, export, and custom workflows.
- **CI**: `.github/workflows/checks.yml` runs `npm ci` and `npm run validate` (`scripts/validate.mjs`, no dependencies): plugin.json paths, SKILL.md frontmatter, CLAUDE.md bucket rules, relative links, and a golden test of the write-from-vault export in all three styles.
- **Commit guidance**: `setup-optimal-brain`, `setup-knowledge-vault`, and `setup-agent-loops` now end with a git step. It idempotently appends a `# optimal-brain (personal)` block to `.gitignore` (`.agent/context/knowledge-vault.md`, `.agent/context/project-context.md`, `.scratch/`), lists what to commit and why, and offers teams a committed `knowledge-vault.example.md` template. Vault-reading skills handle a missing `knowledge-vault.md` by pointing to the example or to setup. `validate.mjs` now fails on references to unknown `/commands` or removed skills (fixes a stale `qa` reference in `setup-optimal-brain` and `CONTEXT.md`).
- **gstack compatibility**: `docs/WITH-GSTACK.md` (positioning vs GBrain, which overlapping skill to prefer, install order).
- **External research**: guidance for ingesting `davidondrej/skills` research into the vault.
- **Cleanup**: README rewritten around the three layers; removed `skills/deprecated/`, `skills/in-progress/`, and the TypeScript-specific `migrate-to-shoehorn` and `scaffold-exercises` misc skills; `package.json` repository now points at ChidiOkoene/optimal-brain.

  **Breaking:** the removed skills are no longer available from this repo. Install them from mattpocock/skills if you need them.

## 1.0.1

### Patch Changes

- [`d20ee26`](https://github.com/mattpocock/skills/commit/d20ee2684e2a9442698ac3c1e0f2c5b68c4cf296) Thanks [@mattpocock](https://github.com/mattpocock)! - Make the **`teach`** skill reuse-first. Lessons are now built from reusable **components** in `./assets/` — stylesheets, quiz widgets, simulators, diagram helpers. Reuse is the default: the agent reads `./assets/` before authoring a lesson, builds from what's there, and extracts anything new and reusable into a component rather than inlining it.

## 1.0.0

### Major Changes

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) Thanks [@mattpocock](https://github.com/mattpocock)! - Add the **`ask-matt`** skill — a user-invoked router that points you at the right skill or flow for your situation.

  **Breaking:** `ask-matt` routes over the other user-invoked skills in this repo, so it expects them to be installed.

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) Thanks [@mattpocock](https://github.com/mattpocock)! - Add the shared design skills and rewire existing skills onto them.

  - New **`codebase-design`** skill — the deep-module vocabulary (module, interface, depth, seam, adapter) and the principles for putting a lot of behaviour behind a small interface. The language that previously lived in `improve-codebase-architecture/LANGUAGE.md` now lives here, generalized for reuse across skills.
  - New **`domain-modeling`** skill — actively build and sharpen a project's domain model, stress-testing terms against the glossary and keeping `CONTEXT.md` and ADRs current.
  - `improve-codebase-architecture` now draws its architecture vocabulary from `/codebase-design` and its domain model from `/domain-modeling`.
  - `tdd` now leans on `/codebase-design` for interface-design guidance — its inline `deep-modules.md` / `interface-design.md` notes were removed in favour of the shared skill.
  - `grill-with-docs` now builds the domain model inline via `/domain-modeling`.

  **Breaking:** these skills now depend on the new `codebase-design` / `domain-modeling` skills, so you must install them too.

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) Thanks [@mattpocock](https://github.com/mattpocock)! - Remove the **`caveman`** and **`zoom-out`** skills.

  - `caveman` was a duplicate of another skill I was testing and was never meant to be public.
  - `zoom-out` went unused in practice, so it's been removed from the repo.

  **Breaking:** both skills have been removed.

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) Thanks [@mattpocock](https://github.com/mattpocock)! - Rename the **`diagnose`** skill to **`diagnosing-bugs`**.

  **Breaking:** invoke it as `/diagnosing-bugs` — the old `/diagnose` name no longer exists.

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) Thanks [@mattpocock](https://github.com/mattpocock)! - Replace **`write-a-skill`** with **`writing-great-skills`**.

  - Removed `write-a-skill`.
  - Added `writing-great-skills` (plus its `GLOSSARY.md`) — a reference for writing and editing skills well: the vocabulary and principles that make a skill predictable, hunting no-ops down to the sentence level.
  - Exposed `grilling` as a model-invoked skill — the reusable interview loop behind `grill-me` and `grill-with-docs`.

  **Breaking:** `write-a-skill` has been removed; use `writing-great-skills` instead.

### Minor Changes

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) Thanks [@mattpocock](https://github.com/mattpocock)! - Add the **`resolving-merge-conflicts`** skill — a loop for resolving an in-progress git merge or rebase conflict. Standalone, with no dependencies on other skills.

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) Thanks [@mattpocock](https://github.com/mattpocock)! - Rename the skill taxonomy from **Commands / Skills** to **User-invoked / Model-invoked** across the docs, and add `docs/invocation.md` defining the split: user-invoked skills are reachable only when you type them and exist to orchestrate; model-invoked skills can also be reached automatically when the task fits. A user-invoked skill may invoke model-invoked skills, but never another user-invoked one.

### Patch Changes

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) Thanks [@mattpocock](https://github.com/mattpocock)! - Tighten the **`review`** skill: fail-fast ref check, single-sourced rules, and no-op cuts.
