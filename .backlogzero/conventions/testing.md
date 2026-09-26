---
name: testing
description: How to run and write tests in this repo — two separate toolchains, both required
type: convention
scope: global
updated: 2026-09-26 (IONE-959)
captured_sha: 9f8c0c907a349231488e4d98cf28126c14cfff37
sources:
  - src/test/java/demo/MoneyTest.java
  - web/test/pricing.test.js
  - src/main/java/demo/Money.java
  - web/src/pricing.js
  - package.json
  - build.gradle.kts
  - README.md
sources_sha256:
  README.md: e33f2cfcaa1cef1d554d20bd984192274c04f7b04c48554df62e15f54a1a0288
  build.gradle.kts: 0f2a531ab2e8f15bdeddb35da942ae49abc40d581314cdce4a7c7a331d114268
  package.json: dfe52e7d066dcf11affc72f3b3e1e875795635aa53a70e755f420180d11c7f57
  src/main/java/demo/Money.java: 490002cbe263439039012b2680de1c7d46a8a01917bf0e3c09683d3fbd45ac6c
  src/test/java/demo/MoneyTest.java: 0851cc404a4d0679bd50a67904666a0e9e30575647c549c25b81cb0704e740fb
  web/src/pricing.js: f63966141dbd58781c7c2e40ad1f883ebc9ddd132dac980773e43b937416fae8
  web/test/pricing.test.js: a153c5e01b24c4b519083f59c8d63490a8d353b4998d1c9a43e6dbb2e19f6063
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

## Cross-language parity fixtures

`Money.roundToCents()` (Java) and `roundToCents()` (`web/src/pricing.js`) are
both expected to implement the same HALF_UP round-to-two-decimals rule.
`MoneyTest.java` and `pricing.test.js` each assert the identical set of edge
cases (`1.005 -> 1.01`, `2.344 -> 2.34`, `-1.005 -> -1.01`); if you change the
rounding rule on one side, update both test files with matching cases or the
suites will silently drift apart.
