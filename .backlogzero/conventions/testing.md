---
name: testing
description: How each suite is run and what to preserve when touching test files.
type: convention
scope: global
updated: '2026-09-19'
captured_sha: 31ae07b64f13a194041d0958b9548d6d2ff76894
sources:
  - README.md
  - package.json
  - build.gradle.kts
  - src/test/java/demo/MoneyTest.java
  - web/test/pricing.test.js
sources_sha256:
  README.md: 5529d73392307476641ea38674f8161667129a2d1ad23f1a154b2d164407c55d
  build.gradle.kts: 0f2a531ab2e8f15bdeddb35da942ae49abc40d581314cdce4a7c7a331d114268
  package.json: dfe52e7d066dcf11affc72f3b3e1e875795635aa53a70e755f420180d11c7f57
  src/test/java/demo/MoneyTest.java: d6a534d376ebb41b8374ceb2450f514573e0543fc0762e0d4a2ac19956a3fbbe
  web/test/pricing.test.js: 3b34b69345ba8e5c20cc8cff04338b6ce208c4b910eb7bb2cf9fa120a2124cba
---

Two independent test toolchains, run separately — see `../../README.md` for
the commands table. There is no combined test runner and no CI config in the
repo to infer conventions from beyond what's below.

- **Java**: JUnit 4 (`org.junit.Test`, `org.junit.Assert.assertEquals`), one
  `@Test` method per behaviour, run via `gradle test`
  (`src/test/java/demo/MoneyTest.java` is the only example — follow its
  pattern of one assertion-focused method per case, e.g. `sumsAmounts`,
  `emptyIsZero`, `clampsNegativeTotals`).
- **JavaScript**: node's built-in `node:test` + `node:assert/strict`, zero
  external deps by design, run via `node --test web/test/*.test.js` (also
  wired as `npm test` in `package.json`). Don't add a test framework
  dependency (jest, mocha, vitest) — the zero-deps property is deliberate
  (see `gotchas.md` and the header comment in `web/src/pricing.js`).

When adding pricing test coverage, add multi-line-cart cases as separate
`test(...)` blocks rather than extending the existing single-line case —
see `gotchas.md` for why the existing single-line test can't catch the
known `applyDiscount` defect.
