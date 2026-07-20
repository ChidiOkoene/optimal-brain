# Recipe: Ingest sources into vault learning records

**Use when:** you have dropped PDFs, articles, transcripts, or notes into the vault and want them turned into synthesized, wikilinked learning records.

**Requires:** `/setup-knowledge-vault` completed (so `.agent/context/knowledge-vault.md` exists; fallback: `docs/agents/knowledge-vault.md`).

## Goal-based (recommended)

```
 /until-done Ingest new sources in the vault. For each PDF or article, create or update a companion/synthesis note with key extracts and insights. Emit a vault learning record (Title Case wikilinked note) for each non-trivial insight. Update relevant Index notes. Stop when all new material has a companion note and at least one learning record per major source, or a stop rule fires.
```

## Time-based (watch while you work)

```
/loop 15m Scan for unprocessed sources (PDFs, .md, transcripts) added since last run. Create companion notes and extract key points. Produce learning-record-style entries in the vault for durable insights. Respect vault conventions in `.agent/context/knowledge-vault.md` (fallback: `docs/agents/knowledge-vault.md`).
```

## Tips

- Start narrow: "Only process files under `Papers/Recent/` this pass."
- After the first cycle, review one companion + one record with the user to calibrate depth and linking style.
- Use `research-from-vault` prose inside the loop if deeper synthesis across sources is needed.
