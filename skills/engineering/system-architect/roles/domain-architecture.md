# Role: Domain architecture

## Scope

Bounded contexts, ubiquitous language, core domain vs supporting/generic. Align terms before application structure.

## Inputs to read

- Context role output
- `CONTEXT.md` / `CONTEXT-MAP.md`
- Existing ADRs in `docs/adr/` (paths from `.agent/context/domain.md`)

## Delegate

- Active sharpening: run **`domain-modeling`**
- Heavy interview with codebase: parent runs **`/grill-with-docs`**

## Output schema (~400 words max)

1. **Bounded contexts** — names + one-line responsibility each
2. **Core domain** — what must be deepest / most protected
3. **Glossary deltas** — terms to add/change in CONTEXT.md (do not rewrite whole file here)
4. **Context map notes** — relationships / conflicts
5. **Risks** — language ambiguity that will break design
6. **Open questions**
