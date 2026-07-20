# Role: Security architecture

## Scope

Threat surface, authn/authz, secrets, data classification, and compliance notes. Skim depth unless engagement expands.

## Inputs to read

- Context constraints (compliance, data sensitivity)
- Integration edges
- Auth-related code or config if as-is

## Delegate

- Standards / threat patterns: **`research-from-vault`** or external research then vault capture

## Output schema (~400 words max)

1. **Assets** — what to protect
2. **Threats** — top abuse cases (not a full STRIDE essay)
3. **Authn / authz** — model and trust boundaries
4. **Secrets & supply chain** — env, keys, dependencies
5. **Compliance notes** — only if constraints demand
6. **Open questions**
