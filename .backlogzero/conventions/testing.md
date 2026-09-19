---
name: testing
description: How each suite is run and what to preserve when touching test files.
type: convention
scope: global
updated: 2026-09-19 (IONE-959)
captured_sha: ebd3b5af40046a9e7d6c1002144e1e2ff84da821
sources:
  - conventions/testing.md
  - web/test/pricing.test.js
  - web/src/pricing.js
sources_sha256:
  conventions/testing.md: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
  web/src/pricing.js: 2b25f56eb3f79035f14db56d362490b82c7685aaac3194045412fd3a83b5ea2a
  web/test/pricing.test.js: 9c0d8b7b3a050fb0e30f9cd52fccd5c74bba7affa6e55f7569b2fb4d75fbde5e
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

`web/test/pricing.test.js` covers `applyDiscount` with single-line,
multi-line, floored-at-zero, and empty-cart cases as separate `test(...)`
blocks — follow that pattern (one case per block) rather than folding new
cart shapes into an existing test. See `gotchas.md` for why the per-order vs
per-line discount math matters here.
