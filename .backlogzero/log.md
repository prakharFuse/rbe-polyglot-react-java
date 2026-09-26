2026-09-22 · first-run · created .backlogzero
511efba6-c8fa-45af-97f1-718848e07820: corrected knowledge/overview.md — 'Known issue' section was stale; web/src/pricing.js's applyDiscount defect (per-line vs per-order discount) is now fixed in code (PST-1)
511efba6-c8fa-45af-97f1-718848e07820: flagged divergence — README.md claims the intentional fixture defect lives in web/src/pricing.js, but that defect has been fixed in code
2026-09-22 · 511efba6-c8fa-45af-97f1-718848e07820 · corrected knowledge/overview.md — README.md#L21-L25 is stale (web/src/pricing.js's applyDiscount now computes the discount once against the order total and floors at zero (per PST-1 commits) — the documented defect no longer exists in the code.)
92cadcba-0d50-4204-be32-30aa98fbbc02: regenerate knowledge/architecture.md — add roundToCents to both module diagrams/prose, note cents-vs-dollars gotcha fixed in PT-2283
92cadcba-0d50-4204-be32-30aa98fbbc02: regenerate conventions/testing.md — document cross-language rounding parity fixtures in MoneyTest.java/pricing.test.js
92cadcba-0d50-4204-be32-30aa98fbbc02: correct knowledge/overview.md — Layout bullets were missing the new roundToCents export on both Money.java and pricing.js
