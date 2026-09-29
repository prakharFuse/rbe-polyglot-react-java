# CLAUDE.md

## Repo shape
- Two independent modules: a Gradle/Java module (`src/main/java/demo/`) and a React/JS module (`web/`). They have no runtime link, no server, and no network calls. A change on one side has no effect on the other.
- `Money.java` and `web/src/pricing.js` are two separate implementations of similar cent arithmetic. They are not one service split across two languages.
- `README.md` is the source of truth for why the repo is shaped this way, with one exception: it still says `applyDiscount` in `web/src/pricing.js` is intentionally defective. That is out of date. `applyDiscount` now computes `cartTotal(lines) - discountCents` once and floors the result at zero.

## Testing
- A change counts as validated only after **both** suites have run. Running one suite is not enough.
- Java: `gradle test` (JUnit 4.13, JDK 17). Put tests under `src/test/java/demo/`, mirroring `src/main/java/demo/`. The Java suite must stay green on main.
- JS: `node --test web/test/*.test.js`, which is the same as `npm test`. Put tests under `web/test/` and import the module under test directly, e.g. `../src/pricing.js`.
- `web/src/CartSummary.jsx` has no tests. Only the pure functions in `pricing.js` are tested.

## Dependencies
- The JS suite uses only `node:test` and `node:assert/strict`. Do not add a test framework (Jest, Mocha, Vitest, etc.). The suite must stay zero-dependency so it can never fail because of install or environment problems.
- `web/src/pricing.js` imports nothing, by design. New helpers added to that file must also be dependency-free.
- `build.gradle.kts` applies the Spotless plugin (`com.diffplug.spotless`), which runs `removeUnusedImports()` on Java code. The plugin is resolved from `mavenCentral()`.
