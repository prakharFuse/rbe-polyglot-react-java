2026-09-22 · first-run · created .backlogzero
511efba6-c8fa-45af-97f1-718848e07820: corrected knowledge/overview.md — 'Known issue' section was stale; web/src/pricing.js's applyDiscount defect (per-line vs per-order discount) is now fixed in code (PST-1)
511efba6-c8fa-45af-97f1-718848e07820: flagged divergence — README.md claims the intentional fixture defect lives in web/src/pricing.js, but that defect has been fixed in code
2026-09-22 · 511efba6-c8fa-45af-97f1-718848e07820 · corrected knowledge/overview.md — README.md#L21-L25 is stale (web/src/pricing.js's applyDiscount now computes the discount once against the order total and floors at zero (per PST-1 commits) — the documented defect no longer exists in the code.)
95ddb9e5-b911-436e-ae6f-e9afe51b3c87: regenerate knowledge/architecture.md — added roundToCents to both module diagrams and cross-language parity note
95ddb9e5-b911-436e-ae6f-e9afe51b3c87: regenerate conventions/testing.md (withheld, still true) — added cross-language roundToCents parity test section
95ddb9e5-b911-436e-ae6f-e9afe51b3c87: correct knowledge/overview.md Layout bullets — Money.java and pricing.js now also export roundToCents; CartSummary.jsx now calls it for the subtotal
