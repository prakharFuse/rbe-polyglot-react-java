---
name: testing
description: How to run and write tests in this repo — two separate toolchains, both required
type: convention
scope: global
updated: 2026-09-25 (IONE-959)
captured_sha: efbe6193184f3bdbe01c1c72f0dfa26fbe356d96
sources:
  - src/test/java/demo/MoneyTest.java
  - web/test/pricing.test.js
  - README.md
sources_sha256:
  README.md: e993c5467c8401f089979067254ec63e6d17f928aecb552410759abe5cc25816
  src/test/java/demo/MoneyTest.java: 07f02b4581081afbec2cabcdcb444ce60864bdb1361fcf3c6f7c3bc005e32115
  web/test/pricing.test.js: b546f1aab747ed49905216e2b12b60ce8f0da2d254b7a2957b76f892a2fac018
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

## Cross-language parity cases

`MoneyTest.java` and `pricing.test.js` both carry a `roundToCents` case for
the same edge cases (half-cent tie up, just-below-tie down, negative tie away
from zero) — per README.md's "Rounding" section, the Java and JS
implementations are required to agree on these inputs, so a rounding-rule
change belongs in both suites, not just one.
