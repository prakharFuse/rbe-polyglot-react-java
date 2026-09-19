---
name: testing
description: How to run and extend the Java and JS test suites in this repo
type: convention
scope: global
updated: 2026-09-19 (IONE-959)
captured_sha: 31ae07b64f13a194041d0958b9548d6d2ff76894
sources:
  - build.gradle.kts
  - package.json
  - src/test/java/demo/MoneyTest.java
  - web/test/pricing.test.js
sources_sha256:
  build.gradle.kts: 0f2a531ab2e8f15bdeddb35da942ae49abc40d581314cdce4a7c7a331d114268
  package.json: dfe52e7d066dcf11affc72f3b3e1e875795635aa53a70e755f420180d11c7f57
  src/test/java/demo/MoneyTest.java: d6a534d376ebb41b8374ceb2450f514573e0543fc0762e0d4a2ac19956a3fbbe
  web/test/pricing.test.js: 3b34b69345ba8e5c20cc8cff04338b6ce208c4b910eb7bb2cf9fa120a2124cba
---

## Two suites, run separately (see ../knowledge/architecture.md for why)

| suite | command | framework | location |
| --- | --- | --- | --- |
| Java | `gradle test` | JUnit 4 (`junit:junit:4.13.2`, `org.junit.Test`/`assertEquals`) | `src/test/java/demo/*.java` |
| JS | `node --test web/test/*.test.js` (or `npm test`) | Node's built-in `node:test` + `node:assert/strict` | `web/test/*.test.js` |

Do not assume JUnit 5 idioms (`@Test` from `org.junit.jupiter`,
`assertThat`) — this repo pins JUnit 4. Do not reach for a JS test runner
(Jest, Vitest, Mocha) — the JS suite is plain `node:test`, with **zero**
dependencies imported by the test files or by `pricing.js` itself. Adding an
import to `pricing.js` (even React) would break the property that the JS
suite can't fail for install reasons — keep pure logic files import-free
unless you have a specific reason not to.

## Test file conventions observed in the repo

- Java test class names end in `Test` (`MoneyTest`), mirroring the class
  under test (`Money`), in the same package (`demo`).
- JS test files live under `web/test/`, mirroring the module under test in
  `web/src/` (`pricing.test.js` ↔ `pricing.js`), and import with a relative
  `../src/...` path.
- JS tests use `node:test`'s flat `test('description', () => { ... })` form,
  not `describe`/`it` nesting — there's only ever one file's worth of tests
  today, so this hasn't been exercised at scale.
- Test names are full sentences describing behavior (`'cartTotal multiplies
  price by quantity'`, `'applyDiscount takes the discount off a single-line
  cart once'`), not `should`/`test that` phrasing.
