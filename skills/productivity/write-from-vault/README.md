# write-from-vault

Turns vault research into a sourced article in stages (fragments, pyramid outline, beats), with a claim ledger tracing every claim to a note, then exports publish-ready Markdown (footnotes, links, or Pandoc citations). See [examples/](./examples/).

## How to invoke

Type `/write-from-vault <topic>`. It stops for your review between stages. Export runs `python3 scripts/export.py` (standard library only).

## What it reads and writes

- **Reads:** vault notes and embedded attachments.
- **Writes:** `Drafts/<Title>/` in the vault (draft, ledger, `export/`). The export script writes only inside `Drafts/<Title>/export/`, makes no network calls, and deletes nothing.
- Reads and writes only this repo and the vault path you configured (in `.agent/context/knowledge-vault.md`). It never scans the disk for a vault, and never reads `.env` files, credentials, or secrets. Publishing is up to you; it never posts anywhere.

## Agents tested

- **Cursor:** used during development.
- **OpenCode 1.19.0** with `anthropic/claude-sonnet-5.5` via OpenRouter (tested 2026-10-13, headless): `export.py` on the bundled example matched the golden output. The staged writing flow (fragments, outline, beats) was not tested.
- **Claude Code:** supported via the plugin manifest, **not yet tested**.
- Other Agent Skills agents: untested. Reports are welcome at https://github.com/ChidiOkoene/optimal-brain/issues.

No API keys, no network calls, nothing installed. Part of [optimal-brain](https://github.com/ChidiOkoene/optimal-brain) (MIT), forked from [mattpocock/skills](https://github.com/mattpocock/skills).
