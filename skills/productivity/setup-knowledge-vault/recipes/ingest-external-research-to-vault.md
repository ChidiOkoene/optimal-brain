# Recipe: Ingest external research then synthesize into the vault

**Use when:** you need fresh information from the web, browsers, or YouTube and want it turned into durable vault notes + learning records instead of one-off chat context.

**Requires:** 
- `/setup-knowledge-vault` completed.
- davidondrej/skills (or equivalent) installed with research-and-web skills available (browser, search, YouTube, etc.).

## Flow

1. Use the installed external research skills (from davidondrej or similar) to gather material on the topic.
2. Save or summarize results as source files or notes directly inside the configured vault (PDFs, .md transcripts, article notes).
3. Run synthesis to produce wikilinked research notes and learning records.

## Goal-based (full pipeline)

```
/until-done Research "latest best practices for agent memory systems 2026" using external research tools. Use davidondrej research-and-web skills (or equivalent) to fetch recent papers, posts, and videos. Save raw or summarized sources into the vault with companion notes. Then synthesize: produce a main synthesis note with wikilinks to sources and a vault learning record capturing the key takeaway and implications. Stop when the synthesis note and learning record exist in the vault following docs/agents/knowledge-vault.md conventions.
```

## Staged (gather, then synthesize)

Gather phase (in a session with external skills):
```
Use installed research-and-web skills to find and summarize the top 5 recent sources on agent memory systems. Write them as notes or PDF companions under the vault path from docs/agents/knowledge-vault.md. Include one-line annotations.
```

Synthesize phase:
```
research-from-vault "Synthesize the newly ingested sources on agent memory systems into a single wikilinked vault note plus a learning record. Ground in the PDFs/notes now present in the vault."
```

Or with until-done:
```
/until-done Synthesize recently added external sources on agent memory from the vault into a synthesis note + learning record. Stop when both are written with proper wikilinks and indexes updated.
```

## Time-based (recurring horizon scanning)

```
/loop 1d Use external research skills to check for new high-signal material on {{your topics}}. Land sources in the vault. Produce or update synthesis notes and learning records for anything non-trivial. Stop after processing new arrivals or on stop rule.
```

## Tips

- Be explicit in the goal: "save sources to vault then synthesize" — prevents the agent from keeping everything only in chat.
- Prefer saving structured notes/PDFs over raw dumps; add minimal annotation at ingest time.
- After external gather, always hand off to `research-from-vault` or a `/teach` bridge for durable capture.
- If the external skill names differ after install, the agent will discover them via `/ask-brain` or listing; the recipe intent is what matters.
