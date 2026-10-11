# optimal-brain

## 2.0.0

### Major Changes

- First release under the optimal-brain name (fork of [mattpocock/skills](https://github.com/mattpocock/skills)). Entries below 2.0.0 are inherited from mattpocock/skills.
- **Vault memory layer**: `setup-knowledge-vault` (with ingestion and context-graph recipes), `research-from-vault` + `RESEARCH-CAPTURE-FORMAT.md`, `project-notes`, `vault-context-canvas`, `decision-mapping`; `teach` bridges learning records into the vault.
- **Loops layer**: `setup-agent-loops` (with recipes), `agent-loop` + `STOP-RULES.md`, `/until-done`; `implement` uses agent-loop discipline.
- **Architect layer**: `system-architect` with 10 competence role briefs, engagement types, and recipes.
- **Routing**: `ask-matt` → `/ask-brain`, `setup-matt-pocock-skills` → `setup-optimal-brain`.
- **Review**: new `review` skill. Standards and Spec axes run in parallel subagents, plus correctness/security/tests/design checks; conventional-comments findings with `blocker`/`major`/`minor`/`nit` severities; fixed PASS/FAIL report; gate mode for `/implement`, `agent-loop`, and `/until-done`; optional decision traces to the vault. `implement` now runs `/review` as its final gate.
- **Writing**: new `write-from-vault` skill. Fragments → shape (pyramid/SCQA) → beats, with a claim ledger that traces every claim to a vault note, respects `confidence`/`superseded_by`/`valid_until`, and ends with a citation gate. Drafts live in vault `Drafts/`. Stage 5 export (`scripts/export.py`, standard-library Python) turns a verified draft into publish-ready Markdown in `Drafts/<Title>/export/` with `footnotes` (GitHub/dev.to/blogs), `links` (Substack/Medium/email), or `pandoc` (`[@key]` + CSL references) citations; resolves embeds, strips vault-only syntax, and writes an `EXPORT-REPORT.md` flagging unresolved links, superseded/exploratory/expired sources, and notes without public URLs.
- **Custom workflows**: `setup-agent-loops` gains a design-a-custom-workflow path (recipe, spec template, worked example): job statement, step map, verifiers, push-right checkpoints, guardrails, eval cases.
- Each new skill ships a `REFERENCES.md` with its research sources and a small worked example. Ideas credited to Matt Pocock's unreleased drafts (`review`, `writing-*`, `loop-me`).
- `resolving-merge-conflicts` is now listed in `plugin.json` and the READMEs; fixed broken relative links in `domain-modeling`, `setup-agent-loops`, and `setup-optimal-brain`.
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
