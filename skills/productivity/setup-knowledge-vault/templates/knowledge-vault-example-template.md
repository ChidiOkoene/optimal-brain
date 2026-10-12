# Knowledge vault (example — copy me)

> This is a committed template. Copy it to `.agent/context/knowledge-vault.md` (gitignored) and fill in **your own** paths, or run `/setup-knowledge-vault`. Agents must never treat the placeholders below as a real vault.

## Location

- **Vault root:** `<ABSOLUTE/PATH/TO/YOUR/VAULT>`
- **Project folder in vault:** `<Project Name>`

## Conventions (shared — keep in sync with the team)

- Notes: Title Case filenames, `[[wikilinks]]`, index notes under `Indexes/`
- Research: `Research Sessions/` hubs, `Findings/` notes (see `research-from-vault`)
- Decision traces: `Decision Traces/`
- Drafts: `Drafts/<Article Title>/` (see `write-from-vault`)

## Setup for a new teammate

1. `cp .agent/context/knowledge-vault.example.md .agent/context/knowledge-vault.md`
2. Replace the `<...>` placeholders with your paths.
3. Confirm `.agent/context/knowledge-vault.md` is listed in `.gitignore` under `# optimal-brain (personal)`.
