---
type: finding
session: "[[2026-07-13 Agent Memory]]"
confidence: high
---
# Context Windows Reset Per Session

A coding agent starts each session with an empty context. Anything it learned last time is gone unless it was written to a file it reads at startup.

Evidence: harness docs for Claude Code and Cursor both load project rules from files at session start; nothing else persists.

## See also
- [[Notes Vault As Agent Memory]]
