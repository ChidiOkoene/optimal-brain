# Contributing to optimal-brain

Thanks for helping. This repo is a pack of agent skills: plain `SKILL.md` folders in the Agent Skills format. Most contributions are Markdown. Please read [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) first.

## How the repo is organised

Skills live in bucket folders under `skills/`. The rules come from [CLAUDE.md](./CLAUDE.md):

| Bucket | What goes there | Top-level `README.md` | `.claude-plugin/plugin.json` |
|--------|-----------------|-----------------------|------------------------------|
| `engineering/` | Daily code work | Yes | Yes |
| `productivity/` | Daily non-code workflows (vault, research, writing) | Yes | Yes |
| `misc/` | Opt-in repo tooling, rarely used | Yes | **No** |
| `personal/` | Tied to the maintainer's setup | **No** | **No** |

Each bucket has a `README.md` that lists every skill in it with a one-line description, the name linked to its `SKILL.md`, and entries grouped into **User-invoked** and **Model-invoked**. See [docs/invocation.md](./docs/invocation.md) for what that split means.

Consumer-repo config paths (`.agent/context/` first, then `docs/agents/`) are described in [AGENT-CONTEXT-PATH.md](./skills/productivity/setup-knowledge-vault/AGENT-CONTEXT-PATH.md).

## Adding or changing a skill

1. **Folder:** `skills/<bucket>/<skill-name>/`, with a kebab-case name. Run `rg -n "name: <skill-name>"` and check [docs/WITH-GSTACK.md](./docs/WITH-GSTACK.md), because names share `~/.claude/skills` with other packs. `review` was renamed to `two-axis-review` for exactly this reason.
2. **`SKILL.md` frontmatter:**
   - `name` must equal the folder name.
   - `description` must be at most 1024 characters. Say what the skill does *and* when to use it, including trigger phrases.
   - Set `disable-model-invocation: true` only for user-invoked skills, following [docs/invocation.md](./docs/invocation.md).
3. **Keep `SKILL.md` short.** Use it as an overview and move detail into sibling files (`FORMAT.md`, `CHECKS.md`, `recipes/`), linked relatively. To depend on another skill, name it in prose (e.g. "run `/two-axis-review`") rather than linking deep into its folder.
4. **Register it.** For `engineering/` or `productivity/`, add a linked entry to the top-level `README.md`, the bucket `README.md`, and `.claude-plugin/plugin.json`. For `misc/`, add it to both READMEs but not the plugin. For `personal/`, register it nowhere.
5. **Examples and references.** New or substantially changed skills should ship:
   - `examples/` with a small worked input and the expected output. If the skill has a script, add it to the golden tests in `scripts/validate.mjs`.
   - `REFERENCES.md` listing the research or prior art it draws on, with links.
6. **Removing or renaming a skill.**
   - Update every reference (`rg -n <old-name>`).
   - Add the old name to `REMOVED` in `scripts/validate.mjs` so stale mentions fail CI.
   - Note it in the changelog as breaking.
7. **Validate:**
   ```bash
   npm ci
   npm run validate
   ```
   This checks:
   - `plugin.json` paths
   - frontmatter
   - bucket registration rules
   - relative links
   - references to unknown slash commands or removed skills
   - the `write-from-vault` export golden tests

   CI runs the same check (`checks` / `validate`) on every push and PR.
8. **Changeset:** for user-visible changes, run `npx changeset` and describe the change in one or two sentences. Changesets generates `CHANGELOG.md` on release, so don't hand-edit released sections.

## Honesty rules

- **Agent support:** don't claim support for an agent you haven't tried. The [compatibility table](./README.md#agent-compatibility) says what has been used, what is supported but not separately tested, and what is untested. If you test one, file an **Agent compatibility report** issue.
- **Benchmarks:** don't overstate them. Report what was run, on what, and how many samples.
- **Sources:** cite them. Skills that make claims (research, writing, review) follow the same "no claim without a source" rule they enforce.

## Credit and license

optimal-brain is a fork of [mattpocock/skills](https://github.com/mattpocock/skills) (MIT). Keep "Inspired by" / credit lines when you adapt someone's work, and add their links to `REFERENCES.md`. By contributing, you agree your contribution is licensed under the [MIT License](./LICENSE).

## Pull requests

- Keep each PR to one skill or one concern. For a new skill, open a **New skill proposal** issue first.
- Fill in the PR template checklist. `npm run validate` must pass.
- Say which agent(s) you ran the skill in, if any.
- Maintainers review against Standards (this file and `CLAUDE.md`) and Spec (the linked issue), the same two axes as `/two-axis-review`.
- Labels for finding work: `good first issue`, `help wanted`, `new-skill`, `agent-compat`.

## Security

Report vulnerabilities privately to chidiokoene@gmail.com, not in public issues.
