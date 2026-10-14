---
"chidi-optimal-brain": minor
---

`ask-brain` is now a true router over all 36 skills: a routing table grouped by intent, common chains (feature, PhD research, existing repo, debugging, loops), and a fixed answer shape (route, why, skip, first command) with at most one clarifying question. Model invocation is enabled so the agent can route when you describe a task without naming a skill. External links removed from the skill; attribution kept as one plain line in its README. `npm run validate` now checks the routing table lists every skill folder and no nonexistent ones.
