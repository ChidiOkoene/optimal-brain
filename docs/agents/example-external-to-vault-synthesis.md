# Example: External → Vault → Synthesis (dogfood)

Simulated flow:

1. Used (hypothetical) davidondrej research-and-web skill to fetch recent material on "agent second brains".
2. Saved `agent-second-brains-2026-survey.pdf` + a transcript `.md` into the vault.
3. Created companion notes with extracts.
4. Ran:
   ```
   /until-done Research agent second brains using newly landed vault sources. Produce synthesis note + vault learning record. Stop when both exist with wikilinks and index update.
   ```
5. Output:
   - `Agent Second Brains Synthesis.md` (wikilinked to sources and Indexes)
   - `Agent Second Brains Learning Record.md` (bridged insight)
   - Updated `Learning Records Index.md`
   - Decision trace + Context Index update (see [example-decision-trace.md](./example-decision-trace.md) and [example-context-index.md](./example-context-index.md))

This pattern is captured in the recipe `ingest-external-research-to-vault.md` and the example learning record in this folder.

All durable knowledge now lives in the vault and is reachable by future loops, teach, and engineering work.
