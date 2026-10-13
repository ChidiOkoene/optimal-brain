---
"chidi-optimal-brain": patch
---

Fix `npm run package:agensi` and `npm run validate` on Windows checkouts with CRLF line endings ("SKILL.md has no frontmatter"). Both scripts now normalize CRLF to LF on every read, and the zips always contain LF. A new `.gitattributes` keeps checkouts LF. `npm run test:crlf` runs validate and packaging on a CRLF copy of the repo in CI.
