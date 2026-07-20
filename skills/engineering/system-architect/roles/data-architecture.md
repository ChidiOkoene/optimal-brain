# Role: Data architecture

## Scope

Entities of record, stores, consistency, ownership, and migration implications.

## Inputs to read

- Context + domain role outputs
- Existing schemas / migrations if present
- ADRs about storage

## Delegate

- Prior art in vault: **`research-from-vault`**
- Hard decisions: draft notes for **`options-and-adrs`** (parent/options role writes ADRs)

## Output schema (~400 words max)

1. **Entities of record** — what must be durable
2. **Stores** — proposed or current (OLTP, search, cache, blob)
3. **Consistency** — strong/eventual; transactions; outbox if needed
4. **Ownership** — which context owns which data
5. **Migration** — cutover risks (especially for migration engagement)
6. **Open questions**
