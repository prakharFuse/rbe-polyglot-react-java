# Repo Purpose

- This is a journey-suite fixture repo (see README.md, "j131, IONE-1773"), not a product codebase. It deliberately pairs a minimal Gradle/Java service with a minimal React/JS front end so that CI must run two independent, real (non-stub) test suites to be green.
- The two toolchains are fully independent — neither imports from nor invokes the other.

# Build & Test Commands

- Java suite: `gradle test` — JDK 17 toolchain, JUnit 4, source under `src/`. No `gradlew` wrapper is committed, so this depends on a system-installed Gradle matching `settings.gradle.kts`/`build.gradle.kts`.
- JavaScript suite: `node --test web/test/*.test.js` (equivalently `npm test`) — Node's built-in test runner, zero npm dependencies required at runtime, source under `web/`.
- Always run both suites; never collapse them into a single command or make one conditional on the other — that breaks the fixture's purpose of requiring two independent green suites.
- The Java build resolves the `com.diffplug.spotless` Gradle plugin via `mavenCentral()` — this is a real third-party dependency, not a stub.

# Fixture Invariants (do not change incidentally)

- `web/src/pricing.js` must keep importing nothing, so the JS suite can never fail for install/environment reasons.
- `src/test/java/demo/MoneyTest.java` must stay green on `main`.

# Known Defect — Left In Place

- `applyDiscount` in `web/src/pricing.js` (around lines 25-30) subtracts `discountCents` from *every* line instead of once from the order total, and clamps nothing, so a large discount can drive the total negative. This is a deliberate, known bug in the fixture, not an oversight.
- Contrast with the Java side: `Money.floorAtZero` (`src/main/java/demo/Money.java` around lines 18-20) does floor at zero; `applyDiscount` has no equivalent guard.
- `web/test/pricing.test.js` only covers a single-line cart, where "per line" and "per order" are numerically identical, so the existing suite stays green despite the bug.
- If asked to fix the discount bug, make the fix in `applyDiscount` and add a multi-line-cart test with an exact expected total — a single-line test cannot prove the fix, since it can't distinguish per-line from per-order discounting.

# Testing Conventions

- Java (`src/test/java/...`): JUnit 4 (`org.junit.Test`, `org.junit.Assert.assertEquals`), one test class per production class (e.g. `MoneyTest` for `Money`), method names are behavior descriptions in camelCase (e.g. `sumsAmounts`, `clampsNegativeTotals`).
- JavaScript (`web/test/*.test.js`): Node's built-in `node:test` + `node:assert/strict`, import production modules with the `.js` extension via relative paths (e.g. `../src/pricing.js`), and write each `test(...)` description as a plain-English behavior sentence.
- When adding a test case, include both a normal-path case and an edge/invalid case in the same style as existing files (e.g. `MoneyTest.emptyIsZero` alongside `sumsAmounts`, or an empty-cart case alongside the multiplication case in `pricing.test.js`).
- Match the existing pattern for whichever suite you're extending rather than introducing a third testing style.