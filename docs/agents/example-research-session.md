---
type: research-session
topic: "Hybrid RAG for Academic PDFs"
ingested_via: research-from-vault
started: 2026-07-13
status: complete
confidence: exploratory
---

# Research Session: Hybrid RAG for Academic PDFs

**Package repo example** — in consumer projects, link conceptually to `.agent/context/project-context.md`.

## Goal

Compare chunking and retrieval strategies for academic PDFs in a personal vault-backed chatbot.

## Timeline

- 09:15 — Started session; read [[Smith 2024 RAG Survey Note]] and [[Local Chunking Experiments]]
- 09:40 — [[Semantic Chunking Beats Fixed Windows for Papers]] — sentence-aware splits improve recall on equations
- 10:05 — [[pgvector Sufficient Under 100k Chunks]] — latency acceptable for MVP scope
- 10:30 — Synthesis: [[Hybrid RAG for Academic PDFs Synthesis]]

## Findings log

- 09:22 — Fixed 512-token windows lose section context in two-column PDFs (see [[Smith 2024 RAG Survey Note]] p.12 companion)

## Synthesis

[[Hybrid RAG for Academic PDFs Synthesis]] — recommends semantic chunking + pgvector for MVP; graph layer deferred.

## See also

- [[Research Index]]
- [[Context Index]]
- Example finding: [[Semantic Chunking Beats Fixed Windows for Papers]]
