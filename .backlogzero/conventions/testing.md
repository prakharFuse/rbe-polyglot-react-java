---
name: testing
description: How the Java and JS test suites are structured and named
type: convention
scope: global
updated: 2026-09-22 (IONE-959)
captured_sha: 31ae07b64f13a194041d0958b9548d6d2ff76894
sources:
  - src/test/java/demo/MoneyTest.java
  - web/test/pricing.test.js
  - build.gradle.kts
  - package.json
sources_sha256:
  build.gradle.kts: 0f2a531ab2e8f15bdeddb35da942ae49abc40d581314cdce4a7c7a331d114268
  package.json: dfe52e7d066dcf11affc72f3b3e1e875795635aa53a70e755f420180d11c7f57
  src/test/java/demo/MoneyTest.java: d6a534d376ebb41b8374ceb2450f514573e0543fc0762e0d4a2ac19956a3fbbe
  web/test/pricing.test.js: 3b34b69345ba8e5c20cc8cff04338b6ce208c4b910eb7bb2cf9fa120a2124cba
---

Two separate, same-purpose-in-parallel suites — mirror the existing style
rather than introducing a third pattern:

- **Java** (`src/test/java/...`, run via `gradle test`): JUnit 4
  (`org.junit.Test`, `org.junit.Assert.assertEquals`), one test class per
  production class (`MoneyTest` ↔ `Money`), method names are behavior
  descriptions in camelCase (`sumsAmounts`, `clampsNegativeTotals`).
- **JavaScript** (`web/test/*.test.js`, run via `node --test web/test/*.test.js`
  / `npm test`): Node's built-in `node:test` + `node:assert/strict`, imported
  with the `.js` extension via relative paths (`../src/pricing.js`); each
  `test(...)` description is a plain-English behavior sentence.

When adding a test case, include both a normal-path and an edge/invalid case
in the same style as the existing files — e.g. `MoneyTest.emptyIsZero`
alongside `sumsAmounts`, or `pricing.test.js`'s empty-cart case alongside the
multiplication case. For `applyDiscount` specifically, a single-line-cart
assertion is not sufficient coverage (see `../knowledge/gotchas.md`) — add a
multi-line case with an exact expected total, not a loose comparison.
