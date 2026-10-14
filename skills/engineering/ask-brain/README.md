# ask-brain

Router for the optimal-brain pack. Describe your task (or ask "what next?") and it picks the single best skill or an ordered chain of skills, explains why, and lists what to skip.

- **Invoke:** `/ask-brain <your task>`, or just describe a task without naming a skill; the agent can route on its own (model invocation is enabled).
- **Reads:** its own routing table and, if present, `.agent/context/` to see which setup steps are already done.
- **Writes:** nothing. It only recommends.
- **Covers:** all 36 skills in the pack, grouped by intent, plus common chains (feature, PhD research, existing repo, debugging, loops). `npm run validate` checks the table lists every skill folder and nothing else.
- **Tested with:** OpenCode, Claude Code, Cursor.

Adapted from ask-matt (mattpocock/skills, MIT).
