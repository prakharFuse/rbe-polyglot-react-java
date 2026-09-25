---
name: testing
description: How to run and write tests in this repo — two separate toolchains, both required
type: convention
scope: global
updated: 2026-09-25 (IONE-959)
captured_sha: 72f6a07ec6f9ee9927e076dbb31961ff83c223be
sources:
  - package.json
  - build.gradle.kts
  - src/test/java/demo/MoneyTest.java
  - web/test/pricing.test.js
  - README.md
sources_sha256:
  README.md: c7fad1bf964a5e3200ff214382ee4140ab0f21703c06ff5194b0e62b2cb97501
  build.gradle.kts: 0f2a531ab2e8f15bdeddb35da942ae49abc40d581314cdce4a7c7a331d114268
  package.json: dfe52e7d066dcf11affc72f3b3e1e875795635aa53a70e755f420180d11c7f57
  src/test/java/demo/MoneyTest.java: e0d0ae78b9e21d50e682b6086009b44ce9c67da58e64072f84b429e0ca6cd7f2
  web/test/pricing.test.js: d5638f131a4ce16b697a0ead7ec9dc5cce485e38233f19c57184f63211ea8ba6
---

Two independent suites exist and a change is only validated when **both**
have been run — see ../../README.md for why a single-command gate is
insufficient here.

## Java suite

- Command: `gradle test`.
- Framework: JUnit 4 (`org.junit.Test`, `org.junit.Assert.assertEquals`) —
  see `build.gradle.kts` (`testImplementation("junit:junit:4.13.2")`).
- Toolchain: JDK 17 (`java.toolchain.languageVersion`).
- Test files live under `src/test/java/demo/`, mirroring `src/main/java/demo/`.
- `build.gradle.kts` also applies the third-party `com.diffplug.spotless`
  plugin (`removeUnusedImports()` for Java) — resolved via `mavenCentral()`
  in `repositories {}`.

## JS suite

- Command: `node --test web/test/*.test.js` (also wired as `npm test` in
  `package.json`).
- Framework: none — uses Node's built-in `node:test` and
  `node:assert/strict` only. Do not add a test framework dependency (Jest,
  Mocha, Vitest, etc.); the fixture's guarantee is that the JS suite cannot
  fail for install/environment reasons, which depends on it staying
  zero-dependency.
- Test files live under `web/test/`, importing the module under test
  directly (e.g. `../src/pricing.js`).
- `web/src/pricing.js` itself imports nothing, by design — keep new pricing
  helpers dependency-free if they belong in that file.
- Both suites carry matching rounding-parity test cases for `roundToCents`
  (half-up ties, negative ties, binary-noise cases like `1.005`) — see
  `MoneyTest.java` and `pricing.test.js`; keep new cases mirrored on both
  sides if you touch the rounding rule.
