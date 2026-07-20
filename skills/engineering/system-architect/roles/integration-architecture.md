# Role: Integration architecture

## Scope

External systems, sync vs async boundaries, contracts, failure modes, and coupling to third parties.

## Inputs to read

- Context role output
- Domain contexts that touch edges
- Vault notes / vendor docs if configured

## Delegate

- Vendor or standards research: **`research-from-vault`** (and RESEARCH-CAPTURE-FORMAT when writing vault notes)

## Output schema (~400 words max)

1. **External systems** — list with purpose
2. **Protocols** — sync/async, queues, webhooks, batch
3. **Contracts** — ownership of schemas / versioning
4. **Failure modes** — timeouts, retries, idempotency, poison messages
5. **Anti-corruption** — where adapters sit at seams
6. **Open questions**
