# Workflow: Weekly Vault Review

> Status: ready · Owner: Chidi · Last reviewed: 2026-10-12

## Job
When a week of research has piled up in my vault, I want the loose ends tied off, so I can start Monday knowing what I learned and what's still open.

## Trigger
Schedule: weekly, Friday 17:00 (`/loop 7d` started then in the vault's workspace, or a scheduler).

## Inputs
- `Research Sessions/` hubs with `status: in-progress` or `started` in the last 7 days
- `Findings/` notes created in the last 7 days
- `Indexes/Context Index.md`

## Steps
| # | Step | Input → Output | Owner | Verifier |
| - | ---- | -------------- | ----- | -------- |
| 1 | List this week's sessions and findings | folders → list | script (`find -mtime -7`) | list non-empty, else stop: "quiet week" |
| 2 | Find orphans: findings not linked from any hub or index | list → orphan list | script (grep wikilinks) | — |
| 3 | Detect conflicts and supersession candidates among new findings | findings → candidate pairs | agent (`research-from-vault` validity rules) | each pair cites both notes |
| 4 | Draft fixes: links for orphans, `superseded_by` proposals, hub `status` updates | candidates → patch list | agent | no edits outside `Findings/`, `Research Sessions/`, `Indexes/` |
| 5 | Checkpoint (below) | patch list → approved list | human | — |
| 6 | Apply approved patches; write `Weekly Reviews/YYYY-MM-DD.md` | approved → notes | agent | every approved patch applied; review note links all touched notes |

## Checkpoints
- After step 4: brief = counts (sessions, findings, orphans, conflicts), each proposed supersession as one line with both links, a single "approve all / pick / skip" question. Default if no answer by Monday 09:00: apply link-only fixes, hold supersessions.

## Outputs
- `Weekly Reviews/YYYY-MM-DD.md` linking sessions, findings, and decisions
- Updated `Context Index.md`

## Guardrails
- Iteration cap: 1 run, no retries beyond one rerun of step 6
- Forbidden without approval: setting `superseded_by`, deleting any note, editing personal notes
- Scope: writes only to `Findings/`, `Research Sessions/`, `Indexes/`, `Weekly Reviews/`

## Failure handling
- Vault path missing → stop, brief "run /setup-knowledge-vault"
- Patch fails to apply (note changed since step 4) → skip it, list in review note

## Eval cases
1. Week with 2 sessions, 5 findings, 1 orphan → orphan linked from its hub; review note lists 5 findings.
2. New finding contradicts an old high-confidence one → supersession proposed in brief, not applied until approved.
3. Quiet week (nothing new) → no review note; one-line "quiet week" message.

## Open questions
_None._
