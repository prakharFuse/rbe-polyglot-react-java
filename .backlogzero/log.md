2026-09-22 · first-run · created .backlogzero
511efba6-c8fa-45af-97f1-718848e07820: corrected knowledge/overview.md — 'Known issue' section was stale; web/src/pricing.js's applyDiscount defect (per-line vs per-order discount) is now fixed in code (PST-1)
511efba6-c8fa-45af-97f1-718848e07820: flagged divergence — README.md claims the intentional fixture defect lives in web/src/pricing.js, but that defect has been fixed in code
2026-09-22 · 511efba6-c8fa-45af-97f1-718848e07820 · corrected knowledge/overview.md — README.md#L21-L25 is stale (web/src/pricing.js's applyDiscount now computes the discount once against the order total and floors at zero (per PST-1 commits) — the documented defect no longer exists in the code.)
7fd0ed2f-a5db-414e-89a1-fc785f4de735: regenerate knowledge/architecture.md — mermaid now lists roundToCents on both Money.java and pricing.js, notes the two are mirrored-not-shared implementations of the same half-up rule
7fd0ed2f-a5db-414e-89a1-fc785f4de735: regenerate conventions/testing.md — still accurate; added note that roundToCents edge cases must be kept in sync across both suites
7fd0ed2f-a5db-414e-89a1-fc785f4de735: correct knowledge/overview.md — Layout bullets for Money.java and pricing.js were missing the new roundToCents export
