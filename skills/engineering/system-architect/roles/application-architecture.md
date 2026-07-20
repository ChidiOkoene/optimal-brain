# Role: Application architecture

## Scope

Modules, seams, interfaces, layering, and AI-navigability of the software structure. Use deep-module vocabulary from `codebase-design`.

## Inputs to read

- Context + domain role outputs
- Codebase structure (Explore if available)
- Existing ADRs

## Delegate

- Vocabulary / deepening principles: **`codebase-design`**
- As-is friction + HTML report: parent runs **`/improve-codebase-architecture`** (temp HTML; cite path in session hub — do not duplicate HTML-REPORT scaffold)

## Output schema (~400 words max)

1. **Current shape** — major modules / seams (or N/A if greenfield)
2. **Target shape** — proposed modules and seams (if target/migration)
3. **Depth opportunities** — shallow areas or proposed deep modules (use terms: module, interface, seam, adapter, depth, locality)
4. **API / entry points** — public surfaces callers must learn
5. **Testability** — how verification sits at seams
6. **Open questions**
