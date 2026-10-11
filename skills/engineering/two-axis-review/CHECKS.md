# Cross-cutting checks

Use as prompts, not a form to fill. Report only what you actually found, with evidence.

## Correctness
- Does each changed function do what its name and callers expect? Read the whole function, not only the hunk.
- Edge cases: empty, null/undefined, zero, one, many, very large, unicode, time zones, duplicate input.
- Error paths: are errors caught, surfaced, or silently swallowed? Is cleanup (files, locks, connections) done on failure?
- Concurrency: shared state, races, missing `await`, retries that are not idempotent.
- Changed contracts: renamed fields, changed return shapes, removed exports. Who else calls this? (`grep` the callers.)

## Security (OWASP-style, scaled to the change)
- **Input**: anything from users, files, network, env, or an LLM is untrusted. Is it validated before use in SQL, shell, paths, HTML, regex, or deserialisation?
- **Authn/authz**: does a new endpoint/handler check who is calling and whether they may?
- **Secrets**: no keys, tokens, or credentials in code, logs, fixtures, or error messages.
- **Paths**: no traversal (`../`) when joining user input to file paths.
- **Dependencies**: new packages are real, maintained, and pinned; no typo-squats.
- **Agent-specific**: prompts or tool outputs never get executed as commands without a check; untrusted text is not given tool permissions.

## Tests
- Is there a test for each new behaviour and each fixed bug? Tests belong in the same change.
- Would the test fail if the code were broken? Mentally revert the fix: does a test go red?
- Does it test behaviour through the public interface, not implementation details?
- Are assertions specific (exact values), not just "no throw" or snapshot sprawl?
- No new flakiness: real clocks, network, random seeds, ordering assumptions.

## Design and complexity
- Does the change belong here, or in an existing module/library?
- Is anything more general than today's need (speculative options, unused parameters, abstract base classes with one child)?
- Can each new function be understood quickly? If you had to re-read it, say so; that is a finding.
- Did docs, README, CHANGELOG, or config examples change when behaviour did?
