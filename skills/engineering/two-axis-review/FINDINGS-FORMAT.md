# Findings format

Every finding is one conventional comment with a severity and a location. The fixed shape makes reviews readable by people and parseable by loops.

```
<label> (<severity>[, <axis-tag>]): <subject>  — `path/to/file.ts:42`

<evidence: quoted rule / spec line / code>
<why it matters, one or two sentences>
<suggested fix: smallest change, patch snippet if useful>
```

## Labels (from Conventional Comments)

| Label | Use for | Blocking? |
| ----- | ------- | --------- |
| `issue` | A real problem. Always pair with a suggested fix. | by severity |
| `suggestion` | A concrete improvement; say what and why. | by severity |
| `question` | You suspect a problem but lack evidence. Ask, don't assert. | no |
| `todo` | Small, necessary change (missing doc line, changelog entry). | yes if `major`+ |
| `nitpick` | Preference or trivial polish. | never |
| `thought` | An idea worth a follow-up, out of scope here. | never |
| `praise` | Something specific done well. Never fake. | never |

## Severity

| Severity | Meaning | Examples |
| -------- | ------- | -------- |
| `blocker` | Must not merge. Breaks behaviour, data, security, or the build. | Failing verifier, injection, data loss, spec requirement implemented wrongly |
| `major` | Should fix before merge; merging leaves a real cost. | Missing spec requirement, untested branch of new logic, violated written rule |
| `minor` | Worth fixing, fine as a follow-up. | Unclear name, missing edge-case test, small duplication |
| `nit` | Optional polish. | Wording, ordering, unwritten style preference |

Tie-breaker: when unsure between two severities, pick the lower one and say why it might be higher. Inflated severity trains people to ignore the review.

## Axis tags (optional decoration)

`spec`, `standards`, `security`, `tests`, `correctness`, `design`, `docs`. Use one, at most two.

## Examples

```
issue (blocker, security): user input reaches SQL unescaped — `src/db/search.ts:18`

`db.query(\`SELECT * FROM notes WHERE title LIKE '%${q}%'\`)`
`q` comes straight from the request query string, so this is injectable.
Use the parameterised form: `db.query("SELECT * FROM notes WHERE title LIKE ?", [\`%${q}%\`])`.
```

```
issue (major, spec): superseded notes are still returned — `src/search.ts:31`

Spec #42: "Search must exclude notes with `status: superseded`."
The filter checks `status !== "archived"` only.
Add `&& note.status !== "superseded"` and a test for it.
```

```
nitpick (nit, standards): prefer the domain term "finding" over "result" — `src/search.ts:12`

CONTEXT.md defines **Finding**; "result" is not in the glossary.
```
