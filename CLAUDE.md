Skills are organized into bucket folders under `skills/`:

- `engineering/` — daily code work
- `productivity/` — daily non-code workflow tools
- `misc/` — kept around but rarely used
- `personal/` — tied to my own setup, not promoted
- `in-progress/` — drafts not yet ready to ship
- `deprecated/` — no longer used

Every skill in `engineering/`, `productivity/`, or `misc/` must have a reference in the top-level `README.md` and an entry in `.claude-plugin/plugin.json`. Skills in `personal/`, `in-progress/`, and `deprecated/` must not appear in either.

Each skill entry in the top-level `README.md` must link the skill name to its `SKILL.md`.

Each bucket folder has a `README.md` that lists every skill in the bucket with a one-line description, with the skill name linked to its `SKILL.md`. Bucket `README.md`s and the top-level `README.md` group entries into **User-invoked** and **Model-invoked**.

Every `SKILL.md` is either user-invoked (`disable-model-invocation: true`, reachable only by the human) or model-invoked (model- or user-reachable). For the full definitions, description conventions, and why a user-invoked skill can invoke model-invoked skills but never another user-invoked one, see [docs/invocation.md](./docs/invocation.md).

## Agent loops

Verification commands, stop rules, and scope for autonomous iteration. See `.agent/context/loops.md` in consumer repos (this package repo keeps examples in `docs/agents/loops.md`).

## Knowledge & Research

Personal knowledge vault configuration, learning record placement, PDF/source handling, and research-from-vault flows. See `.agent/context/knowledge-vault.md` in consumer repos (examples in `docs/agents/knowledge-vault.md`). External research ingestion uses davidondrej research-and-web skills feeding the vault.

Path resolution for all skills: read `.agent/context/<file>` first, fall back to `docs/agents/<file>`. See `skills/productivity/setup-knowledge-vault/AGENT-CONTEXT-PATH.md`.
