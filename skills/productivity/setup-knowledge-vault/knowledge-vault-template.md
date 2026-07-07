# Knowledge Vault

Personal knowledge vault configuration for research, learning records, and synthesis. Used by `/teach`, `research-from-vault`, agent loops, and engineering skills when a vault is configured.

## Vault Location

`{{VAULT_PATH}}`

Access via the filesystem tools (Grep, Glob, Read, Write on paths under this root). Prefer Title Case filenames and `[[wikilinks]]`.

## Learning Records in the Vault

Learning records from teaching sessions are bridged here for long-term retention and cross-linking.

- Naming: Title Case for synthesis notes. Bridge teach's numbered `0001-slug.md` to a readable `Title Case Note.md` (or keep `0001-Title.md` if desired for sequence).
- Location: alongside source material or in a dedicated area (e.g. root or `Learning Records/`). Use Index notes to aggregate.
- Format: wikilinked notes. Include backlinks to source (PDF companion or original link), cross-reference to MISSION or related concepts, and a short "Implications" or "Key insight".
- Index: Maintain `Learning Records Index.md` (or per-topic Indexes) as lists of `[[wikilinks]]`.

See `skills/productivity/teach/LEARNING-RECORD-FORMAT.md` for source format and bridging guidance.

## PDF / Source Handling

For local files and PDFs:

- Create a companion note for each source: e.g. for `Paper.pdf` create `Paper Note.md` (or `Paper.md`).
- In the companion: extract key passages (via shell `pdftotext` or equivalent, or manual), add your synthesis, and link/embed the original:
  - `[[Paper.pdf]]` (Obsidian will render PDF)
  - or `![[Paper.pdf]]` for embed where supported.
- For web/transcripts/articles dropped as `.md` or `.txt`: treat as first-class sources; create or update a note that annotates and links them.
- Update `RESOURCES.md` (in teach workspaces) or vault notes to point to vault-local entries with one-line annotation.

Example extraction (user environment may vary):
```bash
pdftotext "/path/to/Paper.pdf" - | head -200
```

## Research Notes and Synthesis

- Create synthesis notes as units of learning (concise, citable).
- Always end synthesis notes with a "Sources" or "See also" section of `[[wikilinks]]`.
- When research-from-vault or loops produce new understanding, emit a learning-record-style entry in the vault.

## Indexing and Linking Rules

- Use Obsidian `[[wikilinks]]` (Title Case target).
- Notes link to related/dependency notes at the bottom.
- Index notes are flat lists of links (no subfolders required).
- Backlinks are discovered by searching for `[[Note Title]]`.

Search patterns (use Grep/Glob or shell):
```bash
# By name
find "{{VAULT_PATH}}" -name "*Index*.md" -o -name "*Learning*.md"

# Content search for links
grep -rl "\[\[Some Concept\]\]" "{{VAULT_PATH}}"
```

## Integration with Skills

- **`/teach`**: After local learning records, when this config exists, offer to emit vault-ready bridged versions (Title Case + wikilinks). RESOURCES can reference vault paths/PDF companions.
- **`research-from-vault`** (model-invoked): Primary consumer. Reads this file for path + rules. Synthesizes from PDFs, notes, and ingested material into wikilinked notes + learning records in vault.
- **Agent loops** (`agent-loop`, `/until-done`): When knowledge gaps appear, reach for `research-from-vault`. Goals like "research X using vault until synthesis + learning record exists" are valid.
- **Engineering skills** (`domain-modeling`, `grill-with-docs`, decision-mapping Research tickets): Prefer vault sources first for grounding terms and decisions when configured.
- **External ingestion**: Use davidondrej/skills `research-and-web` (browser, YouTube, web) to fetch fresh material. Land results as source files or notes in the vault, then synthesize with `research-from-vault` or `/teach`.

## Starter Recipes

Copy-paste prompts are in the `setup-knowledge-vault` skill folder under `recipes/`:

- `ingest-sources-to-learning-records.md`
- `research-topic-in-vault.md`
- `maintain-vault-indexes-and-links.md`
- `ingest-external-research-to-vault.md`

Use with Cursor `/loop` (time-based) or `/until-done` (goal-based).

## Notes

Edit this file directly to change vault location or conventions. Re-run `/setup-knowledge-vault` only if you want to restart configuration.
