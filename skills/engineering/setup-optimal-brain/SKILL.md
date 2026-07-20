---
name: setup-optimal-brain
description: Configure this repo for the engineering skills — set up its issue tracker, triage label vocabulary, and domain doc layout. Run once before first use of the other engineering skills.
disable-model-invocation: true
---

# Setup Optimal Brain

Scaffold the per-repo configuration that the engineering skills assume:

- **Issue tracker** — where issues live (GitHub by default; local markdown is also supported out of the box)
- **Triage labels** — the strings used for the five canonical triage roles
- **Domain docs** — where `CONTEXT.md` and ADRs live, and the consumer rules for reading them

**Lineage:** Evolved from `setup-matt-pocock-skills` in [mattpocock/skills](https://github.com/mattpocock/skills). Same engineering scaffold; renamed for the Optimal Brain fork.

This is a prompt-driven skill, not a deterministic script. Explore, present what you found, confirm with the user, then write.

## Process

### 1. Explore

Look at the current repo to understand its starting state. Read whatever exists; don't assume:

- `git remote -v` and `.git/config` — is this a GitHub repo? Which one?
- `AGENTS.md` and `CLAUDE.md` at the repo root — does either exist? Is there already an `## Agent skills` section in either?
- `CONTEXT.md` and `CONTEXT-MAP.md` at the repo root
- `docs/adr/` and any `src/*/docs/adr/` directories
- `.agent/context/` — preferred location for this skill's output
- `docs/agents/` — legacy agent config (fallback if `.agent/context/` missing)
- `.scratch/` — sign that a local-markdown issue tracker convention is already in use

Agent config path rule: write to **`.agent/context/`**. See [AGENT-CONTEXT-PATH.md](../productivity/setup-knowledge-vault/AGENT-CONTEXT-PATH.md). If legacy `docs/agents/` exists, offer to migrate or leave (fallback still works).

### 2. Present findings and ask

Summarise what's present and what's missing. Then walk the user through the three decisions **one at a time** — present a section, get the user's answer, then move to the next. Don't dump all three at once.

Assume the user does not know what these terms mean. Each section starts with a short explainer (what it is, why these skills need it, what changes if they pick differently). Then show the choices and the default.

**Section A — Issue tracker.**

> Explainer: The "issue tracker" is where issues live for this repo. Skills like `to-issues`, `triage`, `to-prd`, and `qa` read from and write to it — they need to know whether to call `gh issue create`, write a markdown file under `.scratch/`, or follow some other workflow you describe. Pick the place you actually track work for this repo.

Default posture: these skills were designed for GitHub. If a `git remote` points at GitHub, propose that. If a `git remote` points at GitLab (`gitlab.com` or a self-hosted host), propose GitLab. Otherwise (or if the user prefers), offer:

- **GitHub** — issues live in the repo's GitHub Issues (uses the `gh` CLI)
- **GitLab** — issues live in the repo's GitLab Issues (uses the [`glab`](https://gitlab.com/gitlab-org/cli) CLI)
- **Local markdown** — issues live as files under `.scratch/<feature>/` in this repo (good for solo projects or repos without a remote)
- **Other** (Jira, Linear, etc.) — ask the user to describe the workflow in one paragraph; the skill will record it as freeform prose

If — and only if — the user picked **GitHub** or **GitLab**, ask one follow-up:

> Explainer: Open-source repos often receive feature requests as pull requests, not just issues — a PR is an issue with attached code. If you turn this on, `/triage` pulls *external* PRs into the same queue and runs them through the same labels and states as issues (collaborators' in-flight PRs are left alone). Leave it off if PRs aren't a request surface for you.

- **PRs as a request surface** — yes / no (default: no). Record the answer in `.agent/context/issue-tracker.md`. For local-markdown and other trackers, skip this question — there are no PRs.

**Section B — Triage label vocabulary.**

> Explainer: When the `triage` skill processes an incoming issue, it moves it through a state machine — needs evaluation, waiting on reporter, ready for an AFK agent to pick up, ready for a human, or won't fix. To do that, it needs to apply labels (or the equivalent in your issue tracker) that match strings *you've actually configured*. If your repo already uses different label names (e.g. `bug:triage` instead of `needs-triage`), map them here so the skill applies the right ones instead of creating duplicates.

The five canonical roles:

- `needs-triage` — maintainer needs to evaluate
- `needs-info` — waiting on reporter
- `ready-for-agent` — fully specified, AFK-ready (an agent can pick it up with no human context)
- `ready-for-human` — needs human implementation
- `wontfix` — will not be actioned

Default: each role's string equals its name. Ask the user if they want to override any. If their issue tracker has no existing labels, the defaults are fine.

**Section C — Domain docs.**

> Explainer: Some skills (`improve-codebase-architecture`, `diagnosing-bugs`, `tdd`) read a `CONTEXT.md` file to learn the project's domain language, and `docs/adr/` for past architectural decisions. They need to know whether the repo has one global context or multiple (e.g. a monorepo with separate frontend/backend contexts) so they look in the right place.

Confirm the layout:

- **Single-context** — one `CONTEXT.md` + `docs/adr/` at the repo root. Most repos are this.
- **Multi-context** — `CONTEXT-MAP.md` at the root pointing to per-context `CONTEXT.md` files (typically a monorepo).

**Optional — Architecture sessions.** Offer to create `.agent/context/architecture-sessions/` (empty) for `/system-architect` session hubs. Default: yes if the user wants system/solution architecture flows.

### 3. Confirm and edit

Show the user a draft of:

- The `## Agent skills` block to add to whichever of `CLAUDE.md` / `AGENTS.md` is being edited (see step 4 for selection rules)
- The contents of `.agent/context/issue-tracker.md`, `.agent/context/triage-labels.md`, `.agent/context/domain.md`

Let them edit before writing.

### 4. Write

**Pick the file to edit:**

- If `CLAUDE.md` exists, edit it.
- Else if `AGENTS.md` exists, edit it.
- If neither exists, ask the user which one to create — don't pick for them.

Never create `AGENTS.md` when `CLAUDE.md` already exists (or vice versa) — always edit the one that's already there.

If an `## Agent skills` block already exists in the chosen file, update its contents in-place rather than appending a duplicate. Don't overwrite user edits to the surrounding sections.

The block:

```markdown
## Agent skills

### Issue tracker

[one-line summary of where issues are tracked, plus whether external PRs are a triage surface]. See `.agent/context/issue-tracker.md`.

### Triage labels

[one-line summary of the label vocabulary]. See `.agent/context/triage-labels.md`.

### Domain docs

[one-line summary of layout — "single-context" or "multi-context"]. See `.agent/context/domain.md`.
```

Create `.agent/context/` if it does not exist. Write `.agent/context/README.md` from [context-readme-template.md](../productivity/setup-knowledge-vault/templates/context-readme-template.md).

Then write the three config files using the seed templates in this skill folder as a starting point:

- [issue-tracker-github.md](./issue-tracker-github.md) — GitHub issue tracker
- [issue-tracker-gitlab.md](./issue-tracker-gitlab.md) — GitLab issue tracker
- [issue-tracker-local.md](./issue-tracker-local.md) — local-markdown issue tracker
- [triage-labels.md](./triage-labels.md) — label mapping
- [domain.md](./domain.md) — domain doc consumer rules + layout

For "other" issue trackers, write `.agent/context/issue-tracker.md` from scratch using the user's description.

If the user agreed to architecture sessions, create `.agent/context/architecture-sessions/` (empty is fine).

### 5. Done

Tell the user the setup is complete and which engineering skills will now read from `.agent/context/`. Mention they can edit `.agent/context/*.md` directly later — re-running this skill is only necessary if they want to switch issue trackers or restart from scratch.

Recommend **`/setup-agent-loops`** as an optional follow-up — it configures verification commands, stop rules, and scope for autonomous iteration (`/until-done`, `/implement`, Cursor `/loop`).

Mention **`/system-architect`** for solution/system architecture engagements (session hubs under `.agent/context/architecture-sessions/` when created).
