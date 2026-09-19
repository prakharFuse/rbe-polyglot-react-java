# Repository Overview

- Two independent codebases share this repo and never call each other at runtime: Java (`src/main/java/demo`, tested by `src/test/java/demo`) and JS/React (`web/src`, tested by `web/test`). Nothing in `web/` makes HTTP calls into the Java code, and `build.gradle.kts` does not build or serve `web/`.
- This is a test-fixture repository, not a product codebase. Three properties must never be broken while editing: both test suites must remain runnable, the known pricing defect must remain confined to the JS side, and the Java suite must always stay green.

# Build & Test Commands

- Java: run `gradle test` (JUnit 4). There is no `gradlew` wrapper checked in, so Gradle must be on the system `PATH` — there is no `./gradlew test` fallback.
- JS/React: run `node --test web/test/*.test.js`, also aliased as `npm test` in `package.json`.
- Run the two toolchains separately; there is no combined test runner.

# Known Defect — Do Not Mask It

- `applyDiscount` (`web/src/pricing.js`) subtracts the discount once per cart line instead of once per order, and never floors the result at zero, so multi-line or oversized discounts can drive the total negative. This is intentional fixture content, not an accidental bug to silently "clean up" without being asked.
- `web/test/pricing.test.js` only exercises a single-line cart, where per-line and per-order math are identical, so it passes despite the defect — that pass is expected. If asked to fix pricing, fix the production code in `pricing.js` and add new multi-line `test(...)` cases; never edit the existing single-line test to hide the defect.
- `MoneyTest.java` is unrelated to the pricing defect and must be kept passing at all times.

# Gradle Configuration Notes

- `build.gradle.kts` intentionally resolves `com.diffplug.spotless` as a third-party plugin via `plugins { }` plus `mavenCentral()` to exercise registry resolution. Do not replace it with a core plugin or relocate the repository declaration.

# Code Style

- Keep comments ASCII-only in both stacks — no smart quotes, em dashes, or other non-ASCII symbols.
- Write comments that explain *why* (intent, constraints, known defects), not *what* the code does; do not add line-by-line narration.

# Testing Conventions

- Java: JUnit 4 (`org.junit.Test`, `org.junit.Assert.assertEquals`), one `@Test` method per behavior, named for the behavior it checks (e.g. `sumsAmounts`, `emptyIsZero`, `clampsNegativeTotals`).
- JavaScript: use only node's built-in `node:test` and `node:assert/strict`. Never add a test framework dependency (jest, mocha, vitest) — zero external test dependencies is deliberate.
- When adding pricing coverage for multi-line carts, add separate `test(...)` blocks rather than extending the existing single-line test case.