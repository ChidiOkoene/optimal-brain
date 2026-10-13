---
"chidi-optimal-brain": minor
---

Agensi readiness: `npm run package:agensi` builds `optimal-brain-vault-pack` and `two-axis-review` zips (optionally one per skill with `--all`), with structure, symlink, and content-scan checks. Every plugin skill description now has a "Use when" trigger clause. Listed skills get READMEs stating what they read and write. `setup-knowledge-vault` asks for the vault path instead of probing the disk, and external research via davidondrej/skills is marked optional third-party. Adds examples for research-from-vault and setup-knowledge-vault, and docs/AGENSI.md. Note titles are filename-safe (` - ` instead of `:`, enforced in validate). Vault skills read the index folder from a new Vault Layout section instead of assuming `Indexes/`. Setup skills append to `.gitignore` and never rewrite it.
