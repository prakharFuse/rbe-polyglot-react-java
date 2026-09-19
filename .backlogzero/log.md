2026-09-19 · first-run · created .backlogzero
b67abab7-c9f7-442d-b7f1-f6ece7633f48: corrected knowledge/gotchas.md — the JS applyDiscount defect it documented was fixed this run (per-order discount + zero floor), flagged divergence vs README.md property 2
b67abab7-c9f7-442d-b7f1-f6ece7633f48: corrected conventions/testing.md — the multi-line + zero-floor applyDiscount test cases it called for now exist in web/test/pricing.test.js
2026-09-19 · b67abab7-c9f7-442d-b7f1-f6ece7633f48 · corrected knowledge/gotchas.md — README.md:21-25 is stale (web/src/pricing.js's applyDiscount no longer has the per-line bug; it computes the discount once per order with a zero floor.)
