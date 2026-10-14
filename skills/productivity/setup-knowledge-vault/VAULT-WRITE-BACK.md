# Vault write-back block

Written by `/setup-optimal-brain` (and `/setup-knowledge-vault`) into `AGENTS.md`, and into `CLAUDE.md` too when it exists. Agents read those files every session, so the vault keeps up while you work without extra commands.

Only write it once `.agent/context/knowledge-vault.md` exists (a vault path is configured). Idempotent: if the markers are already there, replace only the text between them; never add a second copy and never touch anything outside the markers.

```markdown
<!-- optimal-brain:vault-write-back:start -->
## Vault write-back

The knowledge vault path is in `.agent/context/knowledge-vault.md`. Write only inside that path; never search the disk for another vault.

Update or create the relevant vault note, following the vault's conventions (folders, frontmatter, `[[wikilinks]]`, " - " not ":" in titles), right after:

- a decision is made (Decision Trace: what, why, alternatives rejected)
- a task or issue is finished (update the Findings or Plan note it touched; set `status`)
- a research question is answered (Finding with citations)
- a review verdict is given (findings and verdict, linked to the PRD or issue)
- grill or interview answers are settled (decisions and open questions)

Keep each write brief: a few lines, cite repo paths and the commit (`source_paths`, `source_commit`). Update an existing note rather than adding a near-duplicate. Never write secrets, keys, tokens, or `.env` contents. If unsure whether something is worth saving, add one line to today's session note. Run `/vault-sync` at the end of a session to catch anything missed.
<!-- optimal-brain:vault-write-back:end -->
```

The block is shared config: commit it with the `## Agent skills` block.
