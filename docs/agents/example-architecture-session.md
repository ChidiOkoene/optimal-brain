---
type: architecture-session
engagement: target_design
slug: example-hybrid-rag
started: 2026-07-16
status: complete
decision_map: ""
---

# Architecture Session: Hybrid RAG Chatbot (Example)

**Package repo example** — in consumer projects, live files live under `.agent/context/architecture-sessions/`.

## Goal

Propose a target architecture for a vault-backed academic PDF chatbot with hybrid retrieval.

## Engagement

- Type: `target_design`
- Roles run: context-and-constraints, domain-architecture, application-architecture, data-architecture, nfr-architecture, options-and-adrs

## Timeline

- 10:00 — Opened session
- 10:15 — Role: context-and-constraints — complete
- 10:40 — Role: domain-architecture — complete
- 11:10 — Role: application-architecture — complete
- 11:35 — Role: data-architecture — complete
- 11:50 — Role: nfr-architecture — complete
- 12:10 — Role: options-and-adrs — complete

## Role outputs

### Context and constraints

Problem: researchers need grounded answers over personal PDF corpora. Success: sub-3s p95 answers with citations. Constraints: solo maintainer, Postgres preferred, no multi-tenant v1.

### Domain architecture

Contexts: Corpus, Ingestion, Retrieval, Conversation. Core domain: Retrieval grounding. Glossary: Chunk, Passage, Citation.

### Application architecture

Deep modules at Ingestion pipeline and Retriever seam; Conversation stays thin adapter over Retriever. Prefer deep Retriever interface (query → ranked passages + citations).

### Data architecture

Entities: Document, Chunk, Embedding, ConversationTurn. Store: Postgres + pgvector. Consistency: sync ingest; eventual re-embed OK.

### NFR architecture

Target p95 < 3s for <100k chunks. Observability: retrieve latency + citation hit rate.

### Options and ADRs

Recommend pgvector MVP; defer graph layer. ADR draft: "Use pgvector for v1 retrieval store".

## Cross-cutting synthesis

- Risks: two-column PDF chunking quality
- Open questions: auth for shared corpora (deferred)
- Recommended ADRs: pgvector v1; semantic chunking default
- CONTEXT.md updates: Chunk, Passage, Citation

## Links

- ADRs: `docs/adr/` (draft)
- Vault: example research session optional

## Next step

`/to-prd` for hybrid RAG MVP vertical slices.
