---
name: testing
description: How to run and write tests in this repo — two separate toolchains, both required
type: convention
scope: global
updated: 2026-09-22 (IONE-959)
captured_sha: 31ae07b64f13a194041d0958b9548d6d2ff76894
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
  src/test/java/demo/MoneyTest.java: d6a534d376ebb41b8374ceb2450f514573e0543fc0762e0d4a2ac19956a3fbbe
  web/test/pricing.test.js: 3b34b69345ba8e5c20cc8cff04338b6ce208c4b910eb7bb2cf9fa120a2124cba
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
