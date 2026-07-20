# RESOURCES.md Format

`RESOURCES.md` is the curated set of trusted sources for this topic. Knowledge for explainers should be drawn from here, not from parametric guesses. Wisdom comes from the communities listed here.

## Structure

```md
# {Topic} Resources

## Knowledge

- [Book: _The Science and Practice of Strength Training_ — Zatsiorsky & Kraemer](https://example.com)
  Foundational text on programming and adaptation. Use for: anything to do with periodisation, recovery, intensity zones.
- [Article: "How Much Should I Train?" — Greg Nuckols (Stronger By Science)](https://example.com)
  Evidence-based review of volume landmarks. Use for: weekly set targets per muscle group.

## Wisdom (Communities)

- [r/weightroom](https://reddit.com/r/weightroom)
  High-signal subreddit, moderated against bro-science. Use for: programme critique, plateau troubleshooting.
- Local: Tuesday strength class at {gym name}
  Use for: real-time coaching feedback on lifts.
```

## Rules

- **High-trust only.** Prefer primary sources, recognised experts, peer-reviewed work, and communities with strong moderation. If a resource is marketing dressed as education, leave it out.
- **Annotate every entry.** A bare link is useless in three months. Add one line: what it covers and when to reach for it.
- **Group by Knowledge / Wisdom.** Mirrors the philosophy in [SKILL.md](./SKILL.md). It is fine for a resource to appear in only one group.
- **Surface gaps explicitly.** If no good resource exists for an area the mission needs, write a `## Gaps` section listing what is missing. This drives future search.
- **Prune ruthlessly.** A resource that turned out to be wrong, shallow, or off-mission should be removed, not buried. Better five sharp sources than thirty mediocre ones.
- **Record community preferences.** If the user has opted out of joining communities, note it here so future sessions don't keep proposing them.

## Local / Vault Sources

When a knowledge vault is configured (`.agent/context/knowledge-vault.md`, fallback: `docs/agents/knowledge-vault.md`), you may reference local files and PDFs that live in the vault.

- Use vault-relative or absolute paths that the agent can resolve from the configured vault root.
- Prefer companion notes: for `Paper.pdf` create or link `Paper Note.md` and cite the companion.
- Examples:

```md
## Knowledge

- Local: [[RAG Survey Note]] (companion to `papers/RAG-Survey.pdf` in vault)
  Key survey of retrieval methods. Use for: terminology and baseline comparisons.
- Local: `transcripts/karpathy-llm-2025.md`
  Transcript of talk on long context. Use for: context window tradeoffs and memory techniques.
```

- Always annotate: one line on scope + when to reach for it.
- External material ingested via research tools should be saved into the vault first, then referenced here (or synthesized via `research-from-vault` and linked).
