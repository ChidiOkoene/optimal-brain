# References: setup-agent-loops (custom workflow design)

Sources behind [recipes/design-custom-workflow.md](recipes/design-custom-workflow.md).

1. **Christensen, Hall, Dillon & Duncan, "Know Your Customers' 'Jobs to Be Done'"**, Harvard Business Review, Sept 2016, https://hbr.org/2016/09/know-your-customers-jobs-to-be-done; and Christensen et al., "Finding the Right Job for Your Product", MIT Sloan Management Review, 2007, https://sloanreview.mit.edu/article/finding-the-right-job-for-your-product/
   People "hire" a solution to make progress in a specific circumstance; study real past instances, not stated preferences. Source of the Job sentence and "use the last real time it happened".
2. **SIPOC and process mapping**, https://en.wikipedia.org/wiki/SIPOC
   Map suppliers/inputs → process → outputs/customers, as-is before to-be. Source of the step table (input → action → output → owner).
3. **Poka-yoke (mistake-proofing)**, https://en.wikipedia.org/wiki/Poka-yoke
   Design the process so errors are hard to make. Source of "script deterministic steps" and scope/forbidden-action guardrails.
4. **Anthropic, "Building effective agents"**, https://www.anthropic.com/engineering/building-effective-agents
   Use the simplest solution; workflows (fixed code paths) before agents; agents need ground truth from the environment at each step, checkpoints, and stopping conditions. Source of "least machinery", verifiers per step, and checkpoint placement.
5. **Anthropic, "Writing effective tools for agents"**, https://www.anthropic.com/engineering/writing-tools-for-agents
   Evaluate with realistic tasks drawn from real use. Source of eval cases from real past instances.
6. **Hamel Husain, "Your AI Product Needs Evals"**, https://hamel.dev/blog/posts/evals/
   Small, specific, real-data test cases first; iterate on failures. Source of the 2-3 eval cases including an escalation case.
7. **Anthropic skill authoring best practices**, https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices
   "Build evaluations first" and degrees of freedom matched to fragility. Source of owner assignment (script/agent/human).
8. **Matt Pocock, `loop-me` draft** in mattpocock/skills (MIT). Source of the loop lens, triggers, push-right checkpoints, and briefs.
