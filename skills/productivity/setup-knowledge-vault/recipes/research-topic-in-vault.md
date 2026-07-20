# Recipe: Research a topic using only the vault

**Use when:** you want to answer or synthesize on a topic using only existing vault material (PDFs, notes, prior learning records) without new web calls.

**Requires:** `/setup-knowledge-vault` completed.

## Goal-based (one session)

```
/until-done Research "vector search vs graph RAG for personal knowledge" using only sources already in the vault. Read relevant PDFs and notes. Create a Research Sessions hub, capture each substantive finding in Findings/ (or findings log), then produce a synthesis note with key tradeoffs, citations via wikilinks, and a vault learning record. Update Context Index and Research Index. Stop when session hub + finding notes + synthesis + learning record exist per RESEARCH-CAPTURE-FORMAT.md, or a stop rule fires.
```

## Using research-from-vault explicitly

```
research-from-vault "Compare vector search and graph approaches for personal second brain using only vault PDFs and notes. Capture findings per RESEARCH-CAPTURE-FORMAT. Output wikilinked synthesis + learning record + updated indexes."
```

## Tips

- Give the goal a clear "done" signal: "session hub + finding notes + synthesis + learning record + indexes updated".
- If the vault is thin on the topic, the loop will surface gaps — decide then whether to allow external ingestion.
- Cross-link the output to existing Index notes and related learning records.
