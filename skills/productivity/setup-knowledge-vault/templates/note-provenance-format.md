# Note Provenance Format (Optional)

Optional YAML frontmatter for vault synthesis notes, learning records, source companions, and decision traces. Frontmatter is **not required** on every note — use it when validity, provenance, or supersession matters.

## Template

```yaml
---
type: synthesis | learning-record | source-companion | decision-trace
created: YYYY-MM-DD
valid_until: null
supersedes: null
superseded_by: null
sources: []
ingested_via: research-from-vault | teach | davidondrej-web | manual
confidence: high | medium | exploratory
---
```

## Field meanings

| Field | Purpose |
| ----- | ------- |
| `type` | What kind of note this is |
| `created` | When the note was first written |
| `valid_until` | Optional expiry date; `null` means no expiry |
| `supersedes` | Wikilink or title of note this replaces |
| `superseded_by` | Wikilink or title of note that replaced this one |
| `sources` | List of `[[wikilinks]]` or paths to source notes/PDFs |
| `ingested_via` | How the material entered the vault |
| `confidence` | How authoritative this note is for decisions |

## When to use

- **Synthesis notes** from `research-from-vault` — always consider `confidence` and `sources`
- **Learning records** bridged from `/teach` — use when the insight may be superseded later
- **Source companions** — use `ingested_via` and `sources` when traceability matters
- **Decision traces** — use `type: decision-trace` (see decision-trace-template.md)

## Supersession

When a later note replaces an earlier one:

1. Set `superseded_by` on the old note (or mark in Context Index)
2. Set `supersedes` on the new note
3. Update `Context Index.md` to move the old entry to Superseded

Align with teach's local `Status: superseded by LR-NNNN` pattern where both exist.

## Validity rules (for agents)

- Prefer notes with `confidence: high` and no `superseded_by`
- If two notes conflict, prefer the newer one unless `superseded_by` explicitly says otherwise
- Treat `confidence: exploratory` as design/research input only — not implementation truth without human review
