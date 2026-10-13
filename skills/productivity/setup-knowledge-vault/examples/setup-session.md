# Example: setting up the vault (illustrative)

> **Illustrative only.** The paths and answers are placeholders showing the shape of a session, not a real setup.

## 1. Explore

The agent checks this repo for `.agent/context/knowledge-vault.md` and `CLAUDE.md`/`AGENTS.md` vault sections. It finds none, and it does **not** scan the disk for Obsidian folders.

## 2. Ask (one section at a time)

> **Section A: Vault location.** What's the absolute path to your Obsidian vault? (e.g. `/Users/you/Obsidian/My Vault`)

User: `<ABSOLUTE/PATH/TO/VAULT>`. Flat layout with index notes.

> **Section B: Learning records**, **C: PDFs and sources**, **D: Context graph**, **E: Project overlay** … (each shown with a default and confirmed or edited)

## 3. Draft, then "write it"

The agent shows the draft `knowledge-vault.md` and `project-context.md`. The user says "write it".

## 4. Written

```text
.agent/context/
  README.md
  knowledge-vault.md        # vault path + conventions (gitignored, personal)
  project-context.md        # which vault notes apply to this repo (gitignored)
<ABSOLUTE/PATH/TO/VAULT>/
  Research Sessions/
  Findings/
  Indexes/Research Index.md
  Indexes/Context Index.md
```

## 5. Commit guidance

The agent appends the `# optimal-brain (personal)` block to `.gitignore` and tells the user what to commit. If the user works with a team, it offers `knowledge-vault.example.md`.

The skill reads and writes only this repo and the vault path the user gave.
