---
name: testing-conventions
description: How the two test suites are structured and what a new test must include
type: convention
scope: global
updated: 2026-09-19 (IONE-959)
captured_sha: 42f3b7184e853cf5fc7a781571c57974af6361ec
sources:
  - web/test/pricing.test.js
sources_sha256:
  web/test/pricing.test.js: 0b58a6692c3d50cef94f28a69fdba77872b96bc5dca04834a7988a8948abb9a2
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

## `applyDiscount` test coverage

`web/test/pricing.test.js` now covers a multi-line cart (checking the discount applies once
per order, not once per line) and a case where `discountCents` exceeds the subtotal (checking
the zero floor) — see [[gotchas]] for why the single-line case alone can't distinguish
per-order from per-line behavior.
