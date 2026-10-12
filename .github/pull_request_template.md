## What and why

<!-- One or two sentences. Link the issue: Closes #… -->

## Checklist

- [ ] `npm ci && npm run validate` passes locally
- [ ] `SKILL.md` frontmatter: `name` equals folder, `description` ≤ 1024 chars, says when to use it
- [ ] Registered per [CLAUDE.md](../CLAUDE.md): top-level `README.md` + bucket `README.md` + `.claude-plugin/plugin.json` (engineering/productivity); README only (misc); nowhere (personal)
- [ ] `examples/` updated or added (and golden test if there's a script)
- [ ] `REFERENCES.md` / credit lines for adapted ideas
- [ ] Renamed/removed a skill? Every reference updated and the old name added to `REMOVED` in `scripts/validate.mjs`
- [ ] Changeset added (`npx changeset`) for user-visible changes
- [ ] No overclaims: agents listed below are ones I actually ran this in

## Tested in

<!-- e.g. Cursor 2.x, Claude Code; or "not run in an agent, docs only" -->
