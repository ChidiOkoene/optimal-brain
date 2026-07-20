# Role: Research evidence

## Scope

Ground tradeoffs in vault sources and (if needed) external material captured into the vault. Prefer vault-first.

## Inputs to read

- `.agent/context/knowledge-vault.md` (fallback: `docs/agents/knowledge-vault.md`)
- Context Index / project-context when present
- Engagement open questions from other roles

## Delegate

- **`research-from-vault`** with RESEARCH-CAPTURE-FORMAT (session hub + findings — never chat-only)
- External fetch only for gaps, then synthesize into vault

## Output schema (~400 words max)

1. **Questions researched**
2. **Evidence** — citations via `[[wikilinks]]` or paths
3. **Implications for design** — what should change in other views
4. **Gaps** — still unknown
5. **Vault artifacts created** — session / finding / synthesis titles
6. **Open questions**
