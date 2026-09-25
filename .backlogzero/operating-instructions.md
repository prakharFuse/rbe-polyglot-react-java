# Repository Overview

- This is a deliberately polyglot fixture repo: an independent Gradle/Java module and an independent React/JS module, with no runtime link between them (no server, no shared code, no network calls anywhere in the repo).
- README.md is the source of truth for *why* the repo is shaped this way (it's a journey-test fixture, `j131`/`IONE-1773`) — read it before assuming a cross-module change makes sense.
- `Money.java` (Java) and `pricing.js` (JS) are two independently-written, mirrored implementations of cent-arithmetic logic, including a `roundToCents` half-up rounding helper. They are not shared code — keep them in sync by convention, not by extracting a shared library.
- README.md still describes the JS-side `applyDiscount` defect (discount subtracted per line instead of once, no floor at zero) as an intentional, load-bearing property of the fixture. That claim is stale: the defect was fixed as of PST-1, and `applyDiscount` now computes the discount once and floors at zero. Don't reintroduce the old behavior based on the README wording.

# Testing

- Two independent test suites exist; a change is only validated once **both** have been run.
- Java: run `gradle test`. Uses JUnit 4 (`org.junit.Test`, `org.junit.Assert.assertEquals`/`assertThrows`) on JDK 17. Tests live under `src/test/java/demo/`, mirroring `src/main/java/demo/`.
- JS: run `node --test web/test/*.test.js` (also available as `npm test`). Uses only Node's built-in `node:test` and `node:assert/strict` — do not add a test framework dependency (Jest, Mocha, Vitest, etc.); staying zero-dependency is load-bearing for the fixture's guarantee that the JS suite can't fail for install/environment reasons.
- `web/src/pricing.js` imports nothing by design — keep any new pricing helpers in that file dependency-free.
- When adding an edge case to a shared-rule function's test (e.g. `roundToCents`) in one suite, add the matching case to the other suite too.

# Code Style

- `build.gradle.kts` applies the Spotless plugin with `removeUnusedImports()` for Java — keep Java imports clean rather than relying on IDE cleanup alone.
