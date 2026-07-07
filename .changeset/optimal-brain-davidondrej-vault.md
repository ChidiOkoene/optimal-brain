---
"mattpocock-skills": minor
---

Add Knowledge Vault layer and davidondrej integration for a complete "optimal brain":

- New user-invoked skill: `/setup-knowledge-vault` (configures vault location, learning record conventions in vault, PDF companion handling, and integration points).
- New model-invoked skill: `research-from-vault` (synthesis from vault sources; rich triggers for direct use and from loops).
- Teach bridging: local learning records and RESOURCES can now target vault (Title Case wikilinked notes, local/PDF/vault sources supported).
- Routing: expanded `/ask-matt` with "## Knowledge, Research & Learning" section covering teach, setup, research-from-vault, external ingestion via davidondrej, and maintenance loops.
- Reach points: `agent-loop`, `/until-done`, `domain-modeling`, `grill-with-docs`, and decision-mapping Research tickets now reach `research-from-vault` (prefer vault first; external only for gaps).
- Personal `obsidian-vault` noted as low-level base; productivity skills provide the research/engineering layer.
- New `docs/agents/brain.md` documenting the layered architecture (vault memory + external research + synthesis + execution loops).
- Housekeeping: bucket READMEs, top README, `.claude-plugin/plugin.json`, `CLAUDE.md`, starter recipes including external-to-vault ingestion.
- Recipes support Cursor `/loop` and `/until-done` for ingest, research, maintenance, and "fetch external then synthesize to vault".

Requires running `/setup-knowledge-vault` to enable vault flows. Combine with davidondrej/skills (research-and-web recommended) for external reach.