# References: review

Sources that shaped this skill, and the idea taken from each.

1. **Google Engineering Practices, "What to look for in a code review"**, https://google.github.io/eng-practices/review/reviewer/looking-for.html
   Design, functionality, complexity, tests, naming, comments, style, docs, context, and "good things" ordering. Source of: whole-function context reads, over-engineering vigilance, "Nit:" for non-mandatory style, praise section, and "will the tests actually fail when the code is broken?".
2. **Google Engineering Practices, "The Standard of Code Review"**, https://google.github.io/eng-practices/review/reviewer/standard.html
   Approve once the change improves overall code health, even if imperfect. Source of PASS WITH NOTES and of not blocking on personal preference.
3. **SmartBear / Cisco code review case study** (2,500 reviews, 3.2M LOC), https://static1.smartbear.co/support/media/resources/cc/book/code-review-cisco-case-study.pdf and https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/
   Defect detection falls sharply above ~200 LOC and 400 LOC is the practical ceiling; inspection rates under ~300-500 LOC/hour; author annotations reduce defects. Source of the size check and splitting large diffs into passes.
4. **Conventional Comments**, https://conventionalcomments.org/
   `<label> [decorations]: <subject>` plus discussion; labels praise/nitpick/suggestion/issue/todo/question/thought; blocking/non-blocking decorations; machine-parseable. Source of FINDINGS-FORMAT.md.
5. **Bacchelli & Bird, "Expectations, Outcomes, and Challenges of Modern Code Review"**, ICSE 2013, https://www.microsoft.com/en-us/research/publication/expectations-outcomes-and-challenges-of-modern-code-review/
   Finding defects is the stated goal, but much review value is understanding and knowledge transfer, and the main difficulty is understanding the change. Source of "requirement checklist first" in the Spec axis and the evidence-required rule.
6. **OWASP Code Review Guide**, https://owasp.org/www-project-code-review-guide/
   Input validation, authn/authz, secrets, and data handling as review targets. Source of the Security section of CHECKS.md.
7. **Anthropic, "Building effective agents"**, https://www.anthropic.com/engineering/building-effective-agents
   Parallelization (sectioning) works better when each consideration gets its own LLM call; evaluator-optimizer loops need clear evaluation criteria. Source of parallel axes in separate subagents and of gate mode with a fixed verdict.
8. **Agent Skills specification**, https://agentskills.io/specification, and **Anthropic skill authoring best practices**, https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices
   Third-person descriptions with trigger terms, SKILL.md under 500 lines, one-level-deep references, copyable checklists, feedback loops. Source of this folder's layout.
9. **Matt Pocock, `review` draft** in mattpocock/skills (`skills/in-progress/review`, MIT). Original two-axis idea (Standards vs Spec, no cross-axis reranking).
