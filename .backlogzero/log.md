2026-09-19 · first-run · created .backlogzero

- Indexed the repo: a two-toolchain fixture (Gradle/JUnit4 Java side, `node --test` JS/React side) with no existing CLAUDE.md/AGENTS.md/.cursor rules — only README.md, which is dense and already covers the fixture's "why". Wrote pointer-first pages instead of restating it.
- knowledge/overview.md — tree map and the two independent test commands, pointing to README.md for rationale.
- knowledge/architecture.md — mermaid flowchart of the Java/JS split and the one registry touchpoint (mavenCentral via the spotless plugin).
- knowledge/gotchas.md — verified numeric behavior of the `applyDiscount` per-line-vs-per-order defect, plus a derived gap (no floor-at-zero on the JS side, unlike `Money.floorAtZero` in Java).
- conventions/testing.md — JUnit 4 (not 5) pinning, `node:test` with zero deps, file-naming/test-naming patterns observed.
- conventions/code-style.md — spotless scope (removeUnusedImports only), ASCII-only Java comment convention, JSDoc-prose comment style in JS.
- No knowledge/data-model.md — no database, schema, or ORM models found in the repo.
1129c6a6-79fd-4a6c-9509-1373fe3a9259: regenerated knowledge/gotchas.md — the per-line-discount and no-floor-at-zero defects in web/src/pricing.js are fixed; replaced with a note on the fix and matching Java behavior
1129c6a6-79fd-4a6c-9509-1373fe3a9259: corrected knowledge/overview.md's 'Known defect' section — pricing.js's applyDiscount defect is fixed, no longer matches the old description
1129c6a6-79fd-4a6c-9509-1373fe3a9259: flagged README.md's load-bearing property #2 (defect lives in pricing.js) as diverged from code — the defect has been fixed
2026-09-19 · 1129c6a6-79fd-4a6c-9509-1373fe3a9259 · corrected knowledge/overview.md — README.md#L21 is stale (web/src/pricing.js's applyDiscount now computes Math.max(0, cartTotal(lines) - discountCents), correctly discounting once per order and flooring at zero — the described defect no longer exists in the code.)
