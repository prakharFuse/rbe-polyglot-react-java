2026-09-22 · first-run · created .backlogzero
511efba6-c8fa-45af-97f1-718848e07820: corrected knowledge/overview.md — 'Known issue' section was stale; web/src/pricing.js's applyDiscount defect (per-line vs per-order discount) is now fixed in code (PST-1)
511efba6-c8fa-45af-97f1-718848e07820: flagged divergence — README.md claims the intentional fixture defect lives in web/src/pricing.js, but that defect has been fixed in code
2026-09-22 · 511efba6-c8fa-45af-97f1-718848e07820 · corrected knowledge/overview.md — README.md#L21-L25 is stale (web/src/pricing.js's applyDiscount now computes the discount once against the order total and floors at zero (per PST-1 commits) — the documented defect no longer exists in the code.)
6ee76bd6-6d37-41e0-8646-bd0936614496 regenerates knowledge/architecture.md — module shape unchanged by the Money.sum overflow fix; still accurate
6ee76bd6-6d37-41e0-8646-bd0936614496 regenerates conventions/testing.md — still accurate; notes MoneyTest now relies on JUnit 4.13+ assertThrows
