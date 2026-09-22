# Repository Overview
- This repo is a journey-suite CI fixture pairing a minimal Gradle/Java service with a minimal React/JS front end so that a CI gate must pass two independent test suites — it is not a product codebase.
- The Java and JS toolchains are fully independent: neither imports from nor invokes the other. Never collapse them into a single command or make one conditional on the other.

# Commands
- Run the Java suite with `gradle test` (JDK 17 toolchain, JUnit 4, source under `src/`). No `gradlew` wrapper is committed, so this depends on a system-installed Gradle matching `settings.gradle.kts`/`build.gradle.kts`.
- Run the JS suite with `node --test web/test/*.test.js` (or `npm test`). It uses Node's built-in test runner with zero npm dependencies at runtime.
- Both suites must actually run and pass for a green CI gate.

# Test Conventions
- Java tests: one test class per production class (e.g. `MoneyTest` for `Money`), JUnit 4 (`org.junit.Test`, `org.junit.Assert.assertEquals`), method names are camelCase behavior descriptions (e.g. `sumsAmounts`, `clampsNegativeTotals`).
- JS tests: `node:test` + `node:assert/strict`, import production code with the `.js` extension via relative path (e.g. `../src/pricing.js`), each `test(...)` description is a plain-English behavior sentence.
- When adding a test case, pair a normal-path case with an edge/invalid case in the same file, matching the existing style (e.g. `MoneyTest.emptyIsZero` alongside `sumsAmounts`).

# Gotchas & Invariants
- `web/src/pricing.js` must keep importing nothing — this guarantees the JS suite can only fail from code defects, never install/environment issues. Don't add dependencies to it.
- `src/test/java/demo/MoneyTest.java` must stay green on `main`.
- `web/src/CartSummary.jsx` is the only runtime consumer of `pricing.js` but is not exercised by any test — changes to it won't be caught by the test suite.
- The Java build resolves the real third-party `com.diffplug.spotless` plugin via `mavenCentral()` (not a stub) — building requires registry access.
- Pricing-defect behavior and the shape of either suite are load-bearing for an external journey test. If a change looks like it touches that (e.g. how/where a cart discount is applied), check `README.md` and `tests/journeys/scripts/provision-polyglot-fixtures.ts` before treating it as a normal bug fix.