2026-09-19 · first-run · created .backlogzero

- Indexed the repo: a two-toolchain fixture (Gradle/JUnit4 Java side, `node --test` JS/React side) with no existing CLAUDE.md/AGENTS.md/.cursor rules — only README.md, which is dense and already covers the fixture's "why". Wrote pointer-first pages instead of restating it.
- knowledge/overview.md — tree map and the two independent test commands, pointing to README.md for rationale.
- knowledge/architecture.md — mermaid flowchart of the Java/JS split and the one registry touchpoint (mavenCentral via the spotless plugin).
- knowledge/gotchas.md — verified numeric behavior of the `applyDiscount` per-line-vs-per-order defect, plus a derived gap (no floor-at-zero on the JS side, unlike `Money.floorAtZero` in Java).
- conventions/testing.md — JUnit 4 (not 5) pinning, `node:test` with zero deps, file-naming/test-naming patterns observed.
- conventions/code-style.md — spotless scope (removeUnusedImports only), ASCII-only Java comment convention, JSDoc-prose comment style in JS.
- No knowledge/data-model.md — no database, schema, or ORM models found in the repo.
