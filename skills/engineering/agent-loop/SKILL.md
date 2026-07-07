---
name: agent-loop
description: Agentic loop discipline. Use when the user wants to loop until done, iterate until tests pass, keep fixing until green, run until verification passes, or mentions red-green-refactor in an iterative fix context.
---

# Agent Loop

**Plan → Act → Observe → Verify → Stop**

A stateful control cycle for autonomous engineering work. Read `docs/agents/loops.md` if it exists; if missing, use conservative defaults (iteration cap 5, no push/deploy/CI changes) and suggest `/setup-agent-loops`.

When exploring the codebase, read `CONTEXT.md` (if it exists) so changes use the project's domain vocabulary.

When you encounter a knowledge gap (unknown terminology, missing concepts, need to ground a decision), reach for `research-from-vault` (or run external research first then synthesize into the vault). Goals of the form "research X using the vault until a synthesis note and learning record exist" are valid and encouraged when the vault is configured.

## 1. Plan

Before the first change:

- State the **goal** and **done signal** (what verifier output means success).
- Read `docs/agents/loops.md` for verification commands, stop rules, and editable scope.
- If building features test-first, reach for the `/tdd` skill.
- Track **iteration count** from 1.

## 2. Act

One **bounded change** per iteration — a vertical slice, not a bulk rewrite.

- Stay within editable paths from `docs/agents/loops.md`.
- Prefer the smallest change that could move verification toward green.

## 3. Observe

Run the **after-each-change** verifier(s) from `docs/agents/loops.md`.

Paste or summarize the relevant output — pass/fail must be unambiguous from exit code and output.

## 4. Verify

- **Pass** → if the task touched multiple areas, run the **before-stopping** gate (full suite). If that passes, stop with success brief.
- **Fail** → proceed to step 5.

## 5. Stop or continue

Apply stop rules from [STOP-RULES.md](STOP-RULES.md):

- Iteration cap hit → stop with brief.
- Same failure N times with no meaningful diff → stop with brief.
- Next step needs forbidden action → stop with brief.
- Fix path unclear after one failed attempt → reach for `/diagnosing-bugs` before blind retries.

If continuing: increment iteration count, return to **Act** with a changed strategy — don't repeat the same fix.

## Completion criterion

The loop is done when verification passes and a success brief is presented, **or** any stop rule fires with an explicit brief to the user.
