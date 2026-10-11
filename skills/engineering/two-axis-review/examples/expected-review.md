## Verdict: FAIL
Base: main · 2 files, +24/-0 · Spec: Issue #42

## Standards
_No documented standards found besides CONTEXT.md (not provided in this example). Nothing to report._

## Spec
Requirements: 3/4 met (1, 3, 4 met; 2 incorrect)

issue (major, spec): superseded notes are still returned — `src/search.ts:12`

Spec: "Search must exclude notes with `status: superseded`."
The filter excludes `archived`, not `superseded`.
Change to `n.status !== "superseded"` (keep `archived` only if another spec asks for it) and add a test.

issue (minor, spec): scope creep, `searchBodies` was not asked for — `src/search.ts:16`

Spec, Out of scope: "Full-text body search."
Remove it from this change, or open a follow-up issue.

## Checks (correctness · security · tests · design)

issue (blocker, security): query string interpolated into SQL — `src/search.ts:9`

`` `...LIKE '%${q.toLowerCase()}%'` `` makes `q` injectable.
Use parameters, as `searchBodies` already does: `db.query("SELECT * FROM notes WHERE LOWER(title) LIKE ?", [`%${q.toLowerCase()}%`])`.

issue (major, tests): tests don't cover requirements 2-4 and would pass on wrong code — `test/search.test.ts:4`

`expect(r.length).toBeGreaterThan(0)` passes even if superseded notes or wrong order come back.
Add tests: superseded excluded, newest-first order, empty query exits 1. Assert exact titles.

suggestion (minor, design): `process.exit` inside a library function — `src/search.ts:6`

Exiting here makes `searchNotes` hard to test and reuse. Throw a usage error and let the CLI entry point exit with code 1.

## Praise

praise: `searchBodies` already uses a parameterised query; the same pattern fixes the blocker above.

## Summary
Standards: 0 · Spec: 2 (worst: superseded notes returned) · Checks: 3 (worst: SQL injection)
Next: parameterise the title query, filter `superseded`, add the three missing tests.
