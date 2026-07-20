# Engagement Types

Pick one engagement. Run only the listed roles unless the user expands scope.

## discovery

**When:** Greenfield idea, unclear problem, early product/system framing.

**Default roles (≤5):**

1. `context-and-constraints`
2. `domain-architecture`
3. `research-evidence` (if external/prior-art gaps)
4. `options-and-adrs`
5. `nfr-architecture` (light — top risks only)

**Skip unless asked:** application (no codebase), infrastructure, full security deep-dive.

**Typical next:** `/decision-mapping` if fog remains; else `/grill-with-docs` → `/to-prd`.

## as_is_review

**When:** Existing codebase; understand friction, seams, and risks before changing direction.

**Default roles (≤6):**

1. `context-and-constraints`
2. `application-architecture` — invoke `/improve-codebase-architecture` for HTML deepening report
3. `data-architecture`
4. `integration-architecture`
5. `nfr-architecture`
6. `security-architecture` (threat surface skim)

**Skip unless asked:** full target options (use `target_design` next).

**Typical next:** `target_design` engagement or `/decision-mapping` on open questions.

## target_design

**When:** Propose a coherent target architecture and record hard decisions.

**Default roles (≤6):**

1. `context-and-constraints`
2. `domain-architecture`
3. `application-architecture`
4. `data-architecture` **or** `integration-architecture` (pick the heavier axis; run both only if both are load-bearing)
5. `nfr-architecture`
6. `options-and-adrs`

**Add if relevant:** `security-architecture`, `infrastructure-architecture`, `research-evidence`.

**Typical next:** write ADRs → `/to-prd` / `/to-issues`.

## migration

**When:** Move from known as-is toward a target; sequencing and risk matter.

**Default roles (≤6):**

1. `context-and-constraints`
2. `application-architecture` (as-is seams)
3. `data-architecture` (migration/consistency)
4. `infrastructure-architecture`
5. `nfr-architecture`
6. `options-and-adrs` (phased plan + ADRs)

**Add if relevant:** `integration-architecture`, `security-architecture`, `research-evidence`.

**Typical next:** phased ADRs → `/to-prd` with migration slices → `/to-issues`.

## Role selection rules

- **Never** spawn all 10 by default.
- Prefer **≤6** roles per engagement.
- Dependent chain runs **sequentially:** context → domain → application.
- Independent views may run **in parallel** when the Task/Agent tool exists: security, data, integration, nfr, research.
- User may override: "full coverage" or "only security + data".
