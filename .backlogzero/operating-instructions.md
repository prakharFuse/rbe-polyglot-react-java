# Architecture

- This repo has two fully independent modules: a Gradle/Java module (`src/main/java/demo`, `src/test/java/demo`) and a React/JS module (`web/`). There is no runtime link between them — no shared server, no HTTP calls between the two sides.
- `Money.java` (Java) and `web/src/pricing.js` (JS) are parallel, independently-implemented versions of similar cent-arithmetic logic. They are not the same service split across languages — do not try to wire them together or have one call the other.

# Testing

- A change is only considered validated when **both** suites below have been run — never treat a Java-only or JS-only test pass as sufficient.
- Java: run `gradle test`. Uses JUnit 4 (`org.junit.Test`, `org.junit.Assert.assertEquals`) on JDK 17. Test files live under `src/test/java/demo/`, mirroring `src/main/java/demo/`.
- `build.gradle.kts` applies the `com.diffplug.spotless` plugin with `removeUnusedImports()` for Java.
- JS: run `node --test web/test/*.test.js` (equivalent to `npm test`). Test files live under `web/test/` and import the module under test directly (e.g. `../src/pricing.js`).
- The JS suite intentionally uses only Node's built-in `node:test` and `node:assert/strict` — do not add a test framework dependency (Jest, Mocha, Vitest, etc.). This keeps the suite from failing for install/environment reasons.
- `web/src/pricing.js` imports nothing by design — keep any new pricing helpers added to that file dependency-free too.

# Cross-language rounding parity

- `Money.roundToCents()` (Java) and `roundToCts()` — i.e. `roundToCents()` in `web/src/pricing.js` — must implement the identical HALF_UP round-to-two-decimals rule and agree bit-for-bit on the same input.
- `MoneyTest.java` and `pricing.test.js` assert the same fixture set (`1.005 -> 1.01`, `2.344 -> 2.34`, `-1.005 -> -1.01`). If you change the rounding rule on one side, update both test files with matching cases, or the two suites will silently drift apart.
- `roundToCents` on both sides takes a dollar-scale amount, not a cent-scale one. Callers must convert cents to dollars (divide by 100) before calling it — this was previously a bug (raw cent totals were rounded directly) and was fixed in PT-2283.
