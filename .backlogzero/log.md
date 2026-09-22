2026-09-22 · first-run · created .backlogzero

- Indexed the repo as a two-suite journey fixture (Java/Gradle + JS/node --test); no CLAUDE.md/AGENTS.md/.cursor rules existed to cite, so pages were derived from README.md and the source directly.
- Wrote `knowledge/overview.md`, `knowledge/architecture.md` (with a Mermaid flowchart of the two toolchains), `knowledge/gotchas.md` (the deliberate `applyDiscount` defect and fixture invariants), and `conventions/testing.md`.
- No database/schema in the repo, so `knowledge/data-model.md` was skipped per instructions.
17e18785-c4ab-418d-8bfc-69e635c4c08d: corrected knowledge/gotchas.md - applyDiscount defect was fixed (per-order discount, floored at zero) in web/src/pricing.js; flagged divergence from README.md's fixture-invariant claim
2026-09-22 · 17e18785-c4ab-418d-8bfc-69e635c4c08d · corrected knowledge/gotchas.md — README.md#property-2 is stale (applyDiscount in web/src/pricing.js was fixed this run to apply the discount once at the order level and floor at zero, removing the defect the fixture relied on.)
