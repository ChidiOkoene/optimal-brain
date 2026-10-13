# Example: reviewing a small search change

- [spec.md](spec.md): the issue the change was meant to implement.
- [change.diff](change.diff): the diff under review.
- [after/](after/): the post-change files (`src/search.ts`, `test/search.test.ts`), i.e. `change.diff` applied. Use them to verify `file:line` locations.
- [expected-review.md](expected-review.md): the report this skill should produce.

Use it as a smoke test: run `/two-axis-review` with the spec and diff (no repo needed, paste both) and compare the verdict and findings with the expected report. A good run finds the SQL injection, the missing superseded filter, and the missing test, and does not invent problems the diff doesn't have.
