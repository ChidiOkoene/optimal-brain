# References

- **Diátaxis**, Daniele Procida, https://diataxis.fr/: separates explanation from reference. Findings explain; the repo stays the reference.
- **Architecture Decision Records**, Michael Nygard, "Documenting Architecture Decisions" (2011), https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions and https://adr.github.io/: one decision per record, with status and supersession. Mapped to vault Decision Traces.
- **C4 model**, Simon Brown, https://c4model.com/: containers and components as the unit of description, which shaped the units → Findings split.
- **Data contracts**, e.g. the Open Data Contract Standard (Bitol), https://bitol-io.github.io/open-data-contract-standard/: producer, consumer, schema, and owner for anything crossing a team boundary. Shaped the Shared contract notes.
- **Monorepo workspace manifests**: pnpm (https://pnpm.io/workspaces), Nx, Turborepo, Cargo workspaces (https://doc.rust-lang.org/cargo/reference/workspaces.html), Go workspaces (https://go.dev/ref/mod#workspaces). Used for unit discovery.
- **Evergreen notes**, Andy Matuschak, https://notes.andymatuschak.org/Evergreen_notes: atomic, densely linked notes. Applied as one note per component, cross-linked.
- **OWASP Secrets Management Cheat Sheet**, https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html: why the skill never reads `.env` or credential files.
- **git diff / log --follow**, https://git-scm.com/docs/git-diff and https://git-scm.com/docs/git-log: staleness and rename detection in re-sync.
- Internal: `setup-knowledge-vault` templates (note provenance, decision trace, Context Index) and `research-from-vault` RESEARCH-CAPTURE-FORMAT, whose conventions this skill reuses.
