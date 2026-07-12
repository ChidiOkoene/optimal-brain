# Recipe: Maintain context graph

**Use when:** you want to refresh global validity (Context Index), reconcile project overlay links, mark superseded notes, or audit decision traces after research or engineering runs.

**Requires:** `/setup-knowledge-vault` completed (`docs/agents/knowledge-vault.md` and ideally `docs/agents/project-context.md`).

## Goal-based (full refresh)

```
/until-done Maintain the context graph: refresh vault Context Index with current active and superseded knowledge, ensure recent decision traces are linked, update docs/agents/project-context.md if new vault synthesis is project-relevant, and mark any superseded notes per docs/agents/knowledge-vault.md validity rules. Stop when Context Index is current and project-context reflects active global notes, or a stop rule fires.
```

## Goal-based (after a research run)

```
/until-done After completing research on "{{TOPIC}}", emit a decision trace in vault Decision Traces/, update Context Index with new synthesis and learning records, and update project-context if this knowledge applies to the current project. Stop when decision trace + Context Index update exist.
```

## Fixed interval (background maintenance)

```
/loop 1d Scan vault Context Index and project-context for stale entries. Mark superseded notes, link orphan synthesis to indexes, prune broken-style wikilinks. One clean pass per run.
```

## When to emit decision traces

Emit a decision trace (vault `Decision Traces/` for research; repo `docs/agents/decision-traces/` for engineering when configured) when:

- A `/until-done` or `research-from-vault` run produced synthesis + learning records
- An agent loop completed a multi-step research goal
- A significant engineering loop run changed architecture or made a non-obvious fix (optional)

Use template: `skills/productivity/setup-knowledge-vault/templates/decision-trace-template.md`

## Tips

- Do not delete user notes; only update indexes, frontmatter, and cross-links.
- Prefer moving entries to "Superseded" in Context Index over deleting.
- After big ingest sessions, run this alongside `maintain-vault-indexes-and-links.md`.
