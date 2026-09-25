# Repository Overview

- This repo is a deliberately polyglot fixture: an independent Gradle/Java module and an independent React/JS module, each with its own test suite and no runtime link between them (no shared server, no HTTP calls between the two). Treat `Money.java` and `pricing.js` as two separate implementations of similar cent-arithmetic concepts, not one service split across languages.
- README.md is the source of truth for *why* the repo is shaped this way — read it before making structural changes.

# Testing

- A change is only validated once **both** suites have been run — there is no single command that covers both.
- Java: run `gradle test` (JUnit 4, JDK 17 toolchain).
- JS: run `node --test web/test/*.test.js` (equivalently `npm test`). The JS suite intentionally uses only Node's built-in `node:test`/`node:assert` — do not add Jest, Mocha, Vitest, or any other test framework dependency; the fixture's guarantee is that the JS suite can't fail for install/environment reasons, which depends on it staying zero-dependency.
- Keep `web/src/pricing.js` itself free of imports — any new pricing helpers added there must stay dependency-free.
- `MoneyTest.java` and `pricing.test.js` carry matching `roundToCents` parity cases (half-cent tie up, just-below-tie down, negative tie away from zero). Any change to the rounding rule must be made — and re-verified — in both suites, not just one.

# Gotchas

- The Java build applies the `com.diffplug.spotless` plugin, which removes unused imports from Java files — keep Java imports clean or the build step will alter/flag them.
- README.md's text still describes `applyDiscount` as having an intentional defect (discount subtracted per line instead of once from the order total). That defect was fixed in code (PST-1): `applyDiscount` now computes `cartTotal(lines) - discountCents` once and floors at zero. Trust the current code over that specific README claim; don't reintroduce the old per-line behavior because README describes it as load-bearing.
