# Workflow: {{Name}}

> Status: draft | ready | live · Owner: {{user}} · Last reviewed: {{YYYY-MM-DD}}

## Job
When {{situation}}, I want to {{motivation}}, so I can {{outcome}}.

## Trigger
{{event: what, where it's detected}} or {{schedule: cadence, e.g. `/loop 7d`}}

## Inputs
- {{source}}: {{what is read, where it lives}}

## Steps
| # | Step | Input → Output | Owner | Verifier |
| - | ---- | -------------- | ----- | -------- |
| 1 | {{action}} | {{in}} → {{out}} | script / agent / human | {{command, checklist, or /two-axis-review}} |

## Checkpoints
- After step {{n}}: brief = {{what was produced, why, the decision needed, link}}. Default if no answer: {{wait / skip / safe default}}.

## Outputs
- {{artifact}} at {{path}}

## Guardrails
- Iteration cap: {{n}} · Budget: {{time/tokens/$}}
- Forbidden without approval: {{send, post, delete, push, purchase, ...}}
- Scope: may write only to {{paths}}

## Failure handling
- {{failure}} → {{retry / stop with brief / notify}}

## Eval cases
1. Input: {{real past instance}} → Expected: {{outcome}}
2. Input: {{edge case}} → Expected: {{outcome}}
3. Input: {{should escalate or refuse}} → Expected: {{brief to human, no action}}

## Open questions
_None when status is ready._
