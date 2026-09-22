# Repository Overview

- This repo is a deliberately polyglot fixture: an independent Gradle/Java module and an independent React/JS module living side by side, each with its own test suite.
- There is no runtime link between the two modules — no server, no shared bootstrap, no `fetch`/`http` calls anywhere in the repo outside `package-lock.json`.
- `Money.java` (Java side) and `pricing.js` (JS side) are two standalone implementations of similar cent-arithmetic concepts. A change to one has no effect on the other — treat them as separate deliverables even if a task description talks about "the pricing logic" generically.
- README.md is the source of truth for why the repo is shaped this way, but see Gotchas below for one specific claim it gets wrong.

# Testing

- Two independent test suites exist; a change is only validated once **both** have been run.
- Java suite: run `gradle test`. Uses JUnit 4 (`org.junit.Test`, `org.junit.Assert.assertEquals`) on a JDK 17 toolchain. Test files live under `src/test/java/demo/`, mirroring `src/main/java/demo/`.
- JS suite: run `node --test web/test/*.test.js` (also wired as `npm test`). Uses only Node's built-in `node:test` and `node:assert/strict` — do not add Jest, Mocha, Vitest, or any other test framework dependency; the suite's zero-dependency property is intentional and load-bearing.
- `web/src/pricing.js` itself has zero imports by design — keep any new pricing helpers added to that file dependency-free.
- `build.gradle.kts` applies the Spotless plugin with `removeUnusedImports()` for Java.

# Gotchas

- README.md claims the JS-side discount defect (subtracting the discount per line instead of once per order) is still present and intentional. As of the PST-1 fix, `applyDiscount` in `web/src/pricing.js` already computes `cartTotal(lines) - discountCents` once and floors at zero. Trust the code over that specific README claim.
