---
name: grill-with-docs
description: "A relentless interview to sharpen a plan or design that also writes docs (ADRs and glossary in CONTEXT.md) as decisions land. Use when the user wants their plan stress-tested and the outcome documented, says grill me with docs, or is pinning down domain terms before building."
disable-model-invocation: true
---

Run a `/grilling` session, using the `/domain-modeling` skill.

When a knowledge vault is configured (see `.agent/context/knowledge-vault.md`, fallback: `docs/agents/knowledge-vault.md`), domain-modeling and the grilling session may consult vault sources via `research-from-vault` (or directly) to ground concepts and terminology with your personal notes and captured research.
