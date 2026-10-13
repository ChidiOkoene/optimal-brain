---
"chidi-optimal-brain": patch
---

two-axis-review: findings cite line numbers in the post-change file (from the hunk header), not positions in the diff output. docs/AGENSI.md records the OpenCode re-test on v2.2.0. `SKILL.md` steps 1 and 5 now spell out how to derive post-change line numbers from the hunk header. Every location is now verified against the post-change file, or cited as a hunk marked `line unverified`; the example ships the post-change files in `examples/after/`.
