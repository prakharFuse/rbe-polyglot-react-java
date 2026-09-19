# Repository Overview

- This repo intentionally pairs two independent toolchains — Java/Gradle and JavaScript/Node — with no runtime integration between them. They never call each other over HTTP, share a process, or share a database. `web/src/CartSummary.jsx` imports `web/src/pricing.js` for source parity only; nothing bridges the Java and JS sides.
- There is no backend server and no database in this repo. Build output (`build/`, `.gradle/`, `node_modules/`) is gitignored and never committed.
- `README.md` documents the purpose of this fixture and its load-bearing properties — read it before changing test behavior or the intentional Java/JS asymmetry described below.
- The re-provisioning script referenced in `README.md` (`tests/journeys/scripts/provision-polyglot-fixtures.ts`) lives outside this repo's tree; don't expect to find or edit it here.

# Running Tests

- Java: `gradle test` (JUnit 4.13.2, JDK 17 toolchain).
- JavaScript: `npm test`, which runs `node --test web/test/*.test.js`. No test-framework dependency is installed for this — `package.json` lists only `react`/`react-dom`.
- Always run both `gradle test` and `npm test` when validating a change. A single-command gate can report green without ever exercising the JS-side defect described below.

# Known Intentional Defect — do not "fix" without being asked

- `applyDiscount` in `web/src/pricing.js` subtracts `discountCents` once per line instead of once per order, and applies no zero floor. This is intentional fixture design, not an oversight — leave it as-is unless explicitly asked to fix it.
- The existing test only covers a single-line cart, where "per line" and "per order" are indistinguishable, so the suite passes despite the defect.
- If asked to fix it: compute the order subtotal once (reuse `cartTotal`), subtract the discount once, and floor at zero, mirroring `Money.floorAtZero` in `src/main/java/demo/Money.java`. Add a regression test using a multi-line cart (at least 2 lines with different `priceCents`/`quantity`) plus a case where `discountCents` exceeds the subtotal, since the current test can't catch either.
- The Java suite is expected to stay green on `main`. Do not introduce Java-side defects or otherwise "balance" the fixture by breaking `Money.java` — the JS-broken/Java-clean asymmetry is deliberate.

# Test Conventions

## Java (`src/test/java/demo/`)
- Use JUnit 4 (`org.junit.Test`, `org.junit.Assert.assertEquals`).
- One test class per production class, same package, suffixed `Test` (e.g. `Money.java` -> `MoneyTest.java`).

## JavaScript (`web/test/`)
- Use Node's built-in `node:test` + `node:assert/strict` — do not add a test-framework dependency.
- Test files live in `web/test/`, named `<module>.test.js`, importing the module under test via a relative `../src/...` path.
- Each `test(...)` block covers exactly one behavior/scenario — don't batch multiple unrelated assertions into one `test()` block.
