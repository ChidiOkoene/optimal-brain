# Issue #42: Search vault notes by title

Users can search their notes by title from the CLI.

## Requirements
1. `notes search <query>` returns notes whose title contains `<query>`, case-insensitive.
2. Search must exclude notes with `status: superseded`.
3. Results are sorted by `updated` date, newest first.
4. An empty query prints usage and exits with code 1.

## Out of scope
- Full-text body search.
