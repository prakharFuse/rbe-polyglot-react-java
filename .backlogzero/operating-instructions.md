# Repository Overview

- This is a polyglot fixture repo: an independent Gradle/Java module and an independent React/JS module, each with its own separate test suite.
- The two modules are not wired together at runtime — there is no server, no shared API, and no code path connecting `Money.java` to `pricing.js`. Treat them as unrelated implementations of similar cent-arithmetic concepts, not a service split across languages, and don't assume a change in one affects the other.
- `README.md` is the source of truth for why the repo is shaped this way (it's a journey-test fixture, `j131`/`IONE-1773`) — read it for the rationale rather than re-deriving it.

# Known Gotcha

- `web/src/pricing.js`'s `applyDiscount` has an intentional, documented defect (discount subtracted per line instead of once from the order total, no floor at zero). It's explained in the file's own header comment and in `README.md` — read those before touching the function, and don't duplicate the explanation elsewhere.

# Testing

- A change is only validated once **both** independent suites have been run — there is no single command that covers both.
- Java suite: run `gradle test`. Uses JUnit 4 (`org.junit.Test`, `org.junit.Assert.assertEquals`). JDK 17 toolchain. Tests live under `src/test/java/demo/`, mirroring `src/main/java/demo/`.
- JS suite: run `node --test web/test/*.test.js` (also aliased as `npm test`). Uses only Node's built-in `node:test` and `node:assert/strict` — do not add Jest, Mocha, Vitest, or any other test framework dependency; the fixture's guarantee that the JS suite can't fail for install/environment reasons depends on it staying zero-dependency.
- JS test files live under `web/test/` and import the module under test directly (e.g. `../src/pricing.js`).
- Keep `web/src/pricing.js`, and any new pricing helpers added to it, dependency-free — it currently imports nothing, by design.
- `build.gradle.kts` applies the `spotless` plugin, which removes unused Java imports automatically — don't hand-manage unused-import cleanup.
