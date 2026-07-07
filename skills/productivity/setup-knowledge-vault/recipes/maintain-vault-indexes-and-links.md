# Recipe: Maintain vault indexes and links

**Use when:** you want periodic hygiene — ensure Index notes are current, orphans are linked or noted, superseded learning records are marked, and wikilinks are healthy.

**Requires:** `/setup-knowledge-vault` completed.

## Fixed interval (background maintenance)

```
/loop 1d Scan the vault for notes without backlinks to any Index. Update or create appropriate Index notes (e.g. "Learning Records Index.md", topic Indexes). For any learning record marked superseded, ensure the superseding record links back. Prune or archive clearly obsolete companions. Stop after one clean pass or when a stop rule fires.
```

## Goal-based

```
/until-done Perform vault maintenance: refresh all Index notes with current wikilinks to research and learning records, repair broken-style links, and ensure every learning record is referenced from at least one Index or synthesis note.
```

## Tips

- Run this after big ingest sessions or when you feel the graph is getting messy.
- Do not delete user notes; only update indexes and add "See also" links.
- If using Obsidian, you can open the graph view after a pass to spot remaining orphans.
