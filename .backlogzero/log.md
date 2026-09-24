2026-09-22 · first-run · created .backlogzero
511efba6-c8fa-45af-97f1-718848e07820: corrected knowledge/overview.md — 'Known issue' section was stale; web/src/pricing.js's applyDiscount defect (per-line vs per-order discount) is now fixed in code (PST-1)
511efba6-c8fa-45af-97f1-718848e07820: flagged divergence — README.md claims the intentional fixture defect lives in web/src/pricing.js, but that defect has been fixed in code
2026-09-22 · 511efba6-c8fa-45af-97f1-718848e07820 · corrected knowledge/overview.md — README.md#L21-L25 is stale (web/src/pricing.js's applyDiscount now computes the discount once against the order total and floors at zero (per PST-1 commits) — the documented defect no longer exists in the code.)
1e196562-3ce9-4247-8d8a-9a5b171393a8: regenerated knowledge/architecture.md — module-shape facts re-verified against Money.java/pricing.js/CartSummary.jsx, no change
1e196562-3ce9-4247-8d8a-9a5b171393a8: regenerated conventions/testing.md — test commands and toolchain facts re-verified against build.gradle.kts/package.json, README.md change was a non-substantive comment-line append
