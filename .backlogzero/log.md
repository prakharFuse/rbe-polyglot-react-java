2026-09-19 · first-run · created .backlogzero
873141e7: gotchas.md corrected — applyDiscount defect is fixed in pricing.js, flagged contradiction with README's fixture design
873141e7: testing.md corrected — pricing.test.js now has real multi-line/floor-at-zero coverage, dropped stale 'can't catch defect' framing
873141e7: flagged divergence — README.md property 2 (defect must be on JS side) contradicts fixed applyDiscount in pricing.js
2026-09-19 · 873141e7-c86e-4ff4-ae24-68b423465ae8 · corrected knowledge/overview.md — README.md#L21-L25 is stale (web/src/pricing.js's applyDiscount no longer has the defect: it now subtracts the discount once per order and floors the total at zero, and web/test/pricing.test.js added passing multi-line/floor-at-zero cases confirming the fix.)
