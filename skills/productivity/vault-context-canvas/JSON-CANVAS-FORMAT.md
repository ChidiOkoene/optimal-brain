# JSON Canvas Format (Obsidian)

This skill writes **Obsidian vault canvas** files (`.canvas`) using the [JSON Canvas 1.0](https://jsoncanvas.org/spec/1.0/) open specification. This is **not** the Cursor IDE React `.canvas.tsx` format.

## File structure

UTF-8 JSON with two top-level arrays:

```json
{
  "nodes": [],
  "edges": []
}
```

## Node types used

### `file` — vault note reference

Links to a markdown note in the vault. Path is **relative to the vault root**.

```json
{
  "id": "node-synthesis-1",
  "type": "file",
  "file": "Indexes/Context Index.md",
  "x": 0,
  "y": 0,
  "width": 400,
  "height": 300
}
```

Optional `subpath`: `"#Heading"` for heading anchor.

### `text` — label or legend

```json
{
  "id": "node-legend",
  "type": "text",
  "text": "# Context Graph\nProject: gossipDB",
  "x": -400,
  "y": -200,
  "width": 320,
  "height": 120
}
```

### `group` — visual grouping

```json
{
  "id": "group-active",
  "type": "group",
  "label": "Active knowledge",
  "x": 0,
  "y": 0,
  "width": 1200,
  "height": 400,
  "color": "4"
}
```

Obsidian color palette: `"1"`–`"6"` or hex `"#RRGGBB"`.

## Edges

Connect related notes. Default arrow on target end.

```json
{
  "id": "edge-1",
  "fromNode": "node-project-ctx",
  "fromSide": "right",
  "toNode": "node-synthesis-1",
  "toSide": "left",
  "toEnd": "arrow",
  "label": "grounds"
}
```

Infer edges when both notes are on the canvas and one wikilinks the other in markdown.

## Layout rules (this skill)

Simple grid layout — no physics engine:

1. **Legend** text node top-left
2. **Groups** in rows: `Active knowledge` | `Project overlay` | `Superseded` (if any)
3. **File nodes** inside groups — 420×280px, 40px gap
4. **Edges** — wikilink-derived first; optional manual labels for project-context → synthesis links
5. Node `id` — stable slug from file path (e.g. `node-findings-chunking`) for refresh merge

## Refresh / merge

When updating an existing canvas:

- Read existing `.canvas` JSON if present
- Preserve nodes whose `file` path still exists (match by `file` path)
- Add nodes for new notes from Context Index + project-context
- Remove nodes for deleted/missing files
- Recompute positions for new layout; warn user if heavy manual layout may be overwritten

## Output path

Default: `{VAULT_PATH}/{ProjectFolder}/Context Graph.canvas`

Configured in `knowledge-vault.md` and `project-context.md`.

## Validation

Before writing:

- Valid JSON
- Every edge `fromNode` / `toNode` references an existing node `id`
- Every `file` node path resolves under vault root
- Unique node and edge `id` values
