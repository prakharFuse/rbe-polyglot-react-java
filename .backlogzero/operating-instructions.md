# Repository Overview

- This repo holds two independent codebases that share the repo but never call each other at runtime: Java under `src/main/java` / `src/test/java`, and JS/React under `web/`. Don't assume `CartSummary.jsx` talks to a Java backend, or that building/serving one stack involves the other.
- This is a test fixture repo, not a product codebase. Treat its current behavior and structure as intentional invariants to preserve rather than things to "clean up" the way you would in a normal repo.

# Build & Test

- Java: run tests with `gradle test`. There is no `gradlew` wrapper checked in, so a system Gradle must already be on `PATH` — there's no wrapper fallback.
- JS: run tests with `node --test web/test/*.test.js` (also aliased as `npm test`). The suite uses only Node's built-in `node:test` + `node:assert/strict` — do not add a test framework dependency (jest, mocha, vitest); the zero-external-deps property is deliberate.
- Keep the Java suite (`MoneyTest.java`) green. It is unrelated to the JS pricing logic but a red Java suite breaks the fixture's purpose.
- Java tests follow JUnit 4 style: one `@Test` method per behavior.
- JS tests follow one `test(...)` block per case — add new cart shapes as new blocks rather than folding them into an existing test.

# Gotchas

- `web/src/pricing.js` is written to import nothing, so the JS suite can never fail for install/dependency reasons — don't add imports to it.
- Don't replace the `com.diffplug.spotless` plugin resolution in `build.gradle.kts` with a core plugin, or otherwise change how it's resolved via `mavenCentral()` — that resolution path exists specifically to exercise third-party plugin registry resolution.
- `applyDiscount` in `web/src/pricing.js` currently subtracts the discount once per cart (not once per line) and floors the payable total at zero with `Math.max(0, ...)`, matching `Money.floorAtZero` in `Money.java`. This is covered by regression tests (single-line, multi-line, floor-at-zero cases) — don't reintroduce a per-line, unfloored discount calculation when editing this function.
- If you are ever asked to restore the fixture's originally-documented invariant that "the defect is on the JavaScript side," that means deliberately reintroducing the per-line/no-floor bug in `pricing.js` — it does not mean fixing anything.

# Code Style

- Comments are ASCII-only in both stacks: no smart quotes, em dashes, or other non-ASCII characters.
- Write comments that explain *why* (intent, constraints, known defects), not *what* the code does — avoid line-by-line narration.