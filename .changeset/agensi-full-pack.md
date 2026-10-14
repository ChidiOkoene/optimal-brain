---
"chidi-optimal-brain": minor
---

Add `optimal-brain-full`, a third Agensi pack with all 35 skills and a router that starts at `setup-optimal-brain` (misc skills marked opt-in). The packager now rewrites cross-bucket relative links in packs, allows misc/personal skills when they ship in the zip, and supports a per-pack `allow` list. `obsidian-vault` reads the vault path from `.agent/context/knowledge-vault.md` instead of a hardcoded path; `git-guardrails-claude-code` defaults to project scope.
