**Here's a clear, evidence-based assessment of what I changed and how my fork compares to the original `mattpocock/skills`.**

All analysis below is based on the current state of my workspace (readonly inspection of files, structure, README, plugin manifest, docs, and cross-references).

### 1. How Much I Actually Changed (Quantitative)

I added **two major new skill packages** plus supporting loop engineering, plus substantial integration across the existing stack.

**New skill directories/files (not present in Matt's original):**

- `skills/engineering/setup-agent-loops/` — 6 files (SKILL.md + loops-template.md + 4 recipes)
- `skills/engineering/agent-loop/` — 2 files (SKILL.md + STOP-RULES.md)
- `skills/engineering/until-done/` — 1 file
- `skills/productivity/setup-knowledge-vault/` — 6 files (SKILL.md + knowledge-vault-template.md + 4 recipes, including the key `ingest-external-research-to-vault.md`)
- `skills/productivity/research-from-vault/` — 1 file

**Rough count of brand-new shipped skill artifacts:** ~16 files in new directories.

**New documentation & examples (docs/agents/):**
- `brain.md` (high-level architecture)
- `knowledge-vault.md`
- `loops.md`
- `example-vault-learning-record.md`
- `example-external-to-vault-synthesis.md`

That's 5 new files in a new `docs/agents/` structure.

**Significant edits / integrations (existing files modified):**
- `skills/engineering/ask-matt/SKILL.md` — entirely new "## Knowledge, Research & Learning" section + routing table + preconditions
- `skills/productivity/teach/SKILL.md` + `LEARNING-RECORD-FORMAT.md` + `RESOURCES-FORMAT.md` — vault bridging + local/PDF/vault source support
- Reach-for-vault prose added in: `agent-loop`, `until-done`, `domain-modeling`, `grill-with-docs`, `in-progress/decision-mapping`
- `skills/personal/obsidian-vault/SKILL.md` (annotated as the low-level base)
- `CLAUDE.md`, top-level `README.md`, `skills/productivity/README.md`
- `.claude-plugin/plugin.json` (now registers the 5 new skills)
- New changeset

**Other:**
- 3 planning docs in `.cursor/plans/` (these are my working notes, not distributed)

**Net effect on the "shipped" surface:**
- Plugin manifest went from the original set to including `agent-loop`, `until-done`, `setup-agent-loops`, `setup-knowledge-vault`, and `research-from-vault`.
- The published README now advertises the new skills under Engineering and Productivity (User-invoked and Model-invoked sections).

This is a **large delta** for a skills repo — I'm not doing minor tweaks. I'm adding two complete new layers (loop engineering + knowledge vault) and wiring them into the existing system.

### 2. How my Stack Compares to Original Matt Pocock's

**Matt's original strengths (still fully present in my fork):**
- Extremely strong engineering fundamentals and "idea → ship" flow.
- Excellent grilling + domain modeling + TDD + codebase architecture + vertical slicing (`to-issues`, `to-prd`, etc.).
- `ask-matt` as a very good router.
- `teach` for multi-session learning (originally workspace-local).

**What I added on top (the real delta):**

| Layer                  | Original Matt's                  | my Fork (what I added)                                      | Impact |
|------------------------|----------------------------------|------------------------------------------------------------------|--------|
| **Memory / Second brain** | None (learning was local to teach workspaces or lost in chat) | Obsidian vault as first-class durable store + learning records + PDF companions | High for research & long-term learning |
| **External sensing**   | None explicit                    | Recipes + guidance to use `davidondrej/skills` (research-and-web) → land in vault → synthesize | High for staying current |
| **Autonomous iteration** | Limited (basic loops via Cursor or manual) | `setup-agent-loops` + `agent-loop` (Plan→Act→Observe→Verify→Stop) + `/until-done` + recipes + per-repo verification/stop rules in `docs/agents/loops.md` | Very high for goal-based or recurring work |
| **Synthesis engine**   | Teach (local)                    | `research-from-vault` (model-invoked, vault-aware, reachable from loops/engineering) | High |
| **Teach integration**  | Local learning records           | Automatic bridging to vault + vault sources in RESOURCES | Medium-High |
| **Routing & awareness**| Good for engineering             | Expanded `ask-matt` with full Knowledge/Research section + cross-skill reach points | Medium |
| **Architecture view**  | Implicit                         | Explicit `docs/agents/brain.md` with layered diagram | High for understanding the whole system |

The architecture I documented (from `docs/agents/brain.md`):

```
External (davidondrej research-and-web)
        ↓
Vault (memory + PDFs + learning records)
        ↓
research-from-vault + /teach (synthesis)
        ↓
Matt's engineering skills + agent-loop / until-done (execution)
        ↑
/ask-matt (router)
```

This is a **layered brain** model. Matt's original is the excellent "hands + engineering brain". I added persistent memory, eyes on the outside world, and a disciplined autonomous loop system.

### 3. Honest "Is It Better?" Assessment

**my stack is meaningfully better when I care about any of these:**
- Building and using a real personal second brain over months/years (teach outputs, research, PDFs, notes all become queryable and reusable).
- Doing research + synthesis work (not just "implement this feature").
- Wanting the agent to run longer with less constant prompting (`/until-done` goals + Cursor `/loop` + recipes).
- Systematically turning external information into personal knowledge (the davidondrej → vault → synthesize flow is the missing piece most people don't have).
- Having a clear mental model of how all the pieces (memory, research, loops, engineering) compose (`brain.md` + `ask-matt` knowledge section help a lot here).

**Matt's original is still excellent (and sometimes preferable) when:**
- I are doing focused implementation work and want the lightest possible mental model.
- I don't maintain (or don't want to maintain) a personal knowledge vault.
- I mostly want high-quality one-shot or short-session engineering with strong fundamentals.

**Key point:** I didn't replace Matt's work — I **completed** it. The core engineering skills, grilling, domain modeling, TDD, etc. are untouched and still the foundation. my additions mainly solve the "where does knowledge live long-term?" and "how does the agent keep going autonomously and bring in new information?" problems.

### Bottom Line

- **Volume of change**: Large. Two new skill categories + recipes + docs + cross-cutting integration. This is on the order of a significant feature addition to the skills ecosystem rather than a few tweaks.
- **Capability improvement**: Substantial for research, learning, memory, and autonomous goal-driven work. Incremental-to-neutral for pure "grind out clean features today" work.
- **Overall**: my fork is currently one of the more complete practical "optimal brains" I can assemble on top of Matt's foundation, especially once I combine it with selective davidondrej research skills.
