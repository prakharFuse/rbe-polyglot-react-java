---
name: testing
description: How to run and write tests in this repo — two separate toolchains, both required
type: convention
scope: global
updated: 2026-09-25 (IONE-959)
captured_sha: 4f06e533e96f3f54cb79c1d224eb2ca3643e4d98
sources:
  - package.json
  - build.gradle.kts
  - src/test/java/demo/MoneyTest.java
  - web/test/pricing.test.js
  - README.md
sources_sha256:
  README.md: f178e7c7c2be47d428b2f810cd5ec92f5acd9194e47eecd448af2c9298f4606a
  build.gradle.kts: 0f2a531ab2e8f15bdeddb35da942ae49abc40d581314cdce4a7c7a331d114268
  package.json: dfe52e7d066dcf11affc72f3b3e1e875795635aa53a70e755f420180d11c7f57
  src/test/java/demo/MoneyTest.java: 984e72f9fbc3a82528dbef22710d874d0884a49cfc3a9e46f0250f494d3ccd74
  web/test/pricing.test.js: 9986d6f5be1d0d8ccc1bf638417c76c1c0bd299aa2c9ee9bdf1ba8cf22b79987
---

Two independent suites exist and a change is only validated when **both**
have been run — see ../../README.md for why a single-command gate is
insufficient here.

## Java suite

- Command: `gradle test`.
- Framework: JUnit 4 (`org.junit.Test`, `org.junit.Assert.assertEquals`,
  `org.junit.Assert.assertThrows`) — see `build.gradle.kts`
  (`testImplementation("junit:junit:4.13.2")`).
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
- Both suites now cover a `roundToCents` helper with matching edge cases
  (exact half-cent, negative half-away-from-zero, `-0` normalization on the
  JS side, null-rejection on the Java side) — when adding a case to one
  suite for a shared-rule function, add the matching case to the other.
