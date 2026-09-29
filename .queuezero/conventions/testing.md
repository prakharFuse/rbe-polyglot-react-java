---
name: testing
description: How to run and write tests in this repo — two separate toolchains, both required
type: convention
scope: global
updated: 2026-09-29 (IONE-959)
captured_sha: e26c70a2b48b36976a77ff799accebc4d1ab0e80
sources:
  - package.json
  - build.gradle.kts
  - src/test/java/demo/MoneyTest.java
  - web/test/pricing.test.js
  - README.md
sources_sha256:
  README.md: 5529d73392307476641ea38674f8161667129a2d1ad23f1a154b2d164407c55d
  build.gradle.kts: 0f2a531ab2e8f15bdeddb35da942ae49abc40d581314cdce4a7c7a331d114268
  package.json: dfe52e7d066dcf11affc72f3b3e1e875795635aa53a70e755f420180d11c7f57
  src/test/java/demo/MoneyTest.java: 43cff5836dc13a3b2affde80a7022eddfbab969eab76517933457c4e2670901b
  web/test/pricing.test.js: b93e64116f19e43135beb6ff40ba71f5e7e87855756866d27855cf1ff1352032
---

Two independent suites exist and a change is only validated when **both**
have been run — see ../../README.md for why a single-command gate is
insufficient here.

## Java suite

- Command: `gradle test`.
- Framework: JUnit 4.13.2 (`org.junit.Test`, `org.junit.Assert.assertEquals`,
  `assertThrows`) — see `build.gradle.kts`
  (`testImplementation("junit:junit:4.13.2")`). `assertThrows` is used in
  `MoneyTest` and needs JUnit >= 4.13; don't downgrade the dependency.
- Toolchain: JDK 17 (`java.toolchain.languageVersion`).
- Test files live under `src/test/java/demo/`, mirroring `src/main/java/demo/`.
- The Java suite must stay green on main (README property 3).
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
