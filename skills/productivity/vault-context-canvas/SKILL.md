---
name: vault-context-canvas
description: Create or refresh an Obsidian JSON Canvas context graph in the vault from Context Index and project-context notes. Not the Cursor IDE React canvas.
disable-model-invocation: true
argument-hint: "Optional: create | refresh (default refresh if canvas exists)"
---

# Vault Context Canvas

Build or refresh a spatial **context graph** as an **Obsidian JSON Canvas** (`.canvas` file) in the vault. This is the open [JSON Canvas](https://jsoncanvas.org/spec/1.0/) format — **not** the Cursor IDE React `.canvas.tsx` canvas skill.

Requires `/setup-knowledge-vault`.

## Prerequisites

Read:

1. `.agent/context/knowledge-vault.md` (fallback: `docs/agents/knowledge-vault.md`) — vault root
2. `.agent/context/project-context.md` (fallback: `docs/agents/project-context.md`) — project folder + wikilinks
3. Vault `Indexes/Context Index.md` (or `Context Index.md` at vault root)

## Output

Default path:

```text
{VAULT_PATH}/{ProjectFolder}/Context Graph.canvas
```

Create `{ProjectFolder}/` if missing.

## Sources for nodes

1. **Active knowledge** — notes listed under "Active knowledge" in Context Index (file nodes)
2. **Project overlay** — wikilinks from `project-context.md` under "Relevant global knowledge" and related sections
3. **Superseded** (optional) — notes under "Superseded knowledge" in Context Index, muted group or separate column
4. **Legend** — text node with project name and last-updated date

## Edges

- Parse `[[wikilinks]]` in included notes; add edges when both endpoints are on the canvas
- Add edges from project-context notes to synthesis notes they list
- Use edge `label` sparingly (`grounds`, `supersedes`, `related`)

## Layout

Follow [JSON-CANVAS-FORMAT.md](./JSON-CANVAS-FORMAT.md) — grid inside group nodes.

## Modes

### Create

No existing canvas at output path. Build from scratch.

### Refresh (default)

Canvas exists — merge by stable node `id` derived from file path; update node set from current Context Index + project-context; re-layout; preserve unknown nodes if possible (Obsidian may add custom fields — do not strip them).

User argument `create` forces full rebuild (confirm if canvas has manual edits).

## Process

1. Resolve vault path and project folder
2. Read Context Index and project-context; extract note titles/paths
3. Resolve each wikilink to vault-relative file path (search vault if needed)
4. Build or merge `nodes` and `edges` per JSON-CANVAS-FORMAT
5. Write `{ProjectFolder}/Context Graph.canvas` as pretty-printed JSON
6. Brief user: path, node count, open in Obsidian to view graph

## Integration

- Run after significant research or via `maintain-context-graph` recipe
- Complements `/project-notes` — personal notes may appear on canvas if linked from project-context
- Does not replace Context Index — canvas is a visual view; index remains source of truth for validity

## When vault is not configured

Suggest `/setup-knowledge-vault`. Do not guess paths.
