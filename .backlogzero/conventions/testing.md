---
name: testing-conventions
description: How the two test suites are structured and what a new test must include
type: convention
scope: global
updated: 2026-09-19 (IONE-959)
captured_sha: 31ae07b64f13a194041d0958b9548d6d2ff76894
sources:
  - src/test/java/demo/MoneyTest.java
  - web/test/pricing.test.js
  - package.json
  - build.gradle.kts
sources_sha256:
  build.gradle.kts: 0f2a531ab2e8f15bdeddb35da942ae49abc40d581314cdce4a7c7a331d114268
  package.json: dfe52e7d066dcf11affc72f3b3e1e875795635aa53a70e755f420180d11c7f57
  src/test/java/demo/MoneyTest.java: d6a534d376ebb41b8374ceb2450f514573e0543fc0762e0d4a2ac19956a3fbbe
  web/test/pricing.test.js: 3b34b69345ba8e5c20cc8cff04338b6ce208c4b910eb7bb2cf9fa120a2124cba
---

## Java (`src/test/java/demo/`)

- JUnit 4 (`junit:junit:4.13.2`, see `build.gradle.kts:16`), `org.junit.Test` +
  `org.junit.Assert.assertEquals`.
- One test class per production class, same package (`demo`), suffixed `Test`
  (`Money.java` → `MoneyTest.java`).
- Run with `gradle test`.

## JavaScript (`web/test/`)

- Node's built-in `node:test` + `node:assert/strict` — no test framework dependency (see
  `package.json`, which lists only `react`/`react-dom`, not a test runner).
- Test files live in `web/test/`, named `<module>.test.js`, importing the module under test
  with a relative `../src/...` path (`web/test/pricing.test.js:3`).
- Each `test(...)` block covers exactly one behavior/scenario — this repo does not batch
  multiple assertions of unrelated scenarios into one `test()` block.
- Run with `npm test`, which is `node --test web/test/*.test.js` (`package.json:8`).

## When adding a case for `applyDiscount` specifically

The existing single-line test cannot distinguish "discount applied once per order" from
"discount applied once per line" — see [[gotchas]]. Any new test must use a **multi-line**
cart (≥2 lines with different `priceCents`/`quantity`) to be a meaningful regression check,
plus a case where `discountCents` exceeds the subtotal to check the zero-floor behavior.
