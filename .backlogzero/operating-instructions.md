# Architecture

- This repo contains two independent toolchains that never call each other: Java (Gradle) under `src/`, and JS/React (Node) under `web/`. There is no HTTP/IPC/shared build linking them — verify each side independently.
- `web/src/pricing.js` imports nothing, not even React. Keep it dependency-free so the JS test suite can never fail for install/dependency reasons — don't add imports to it without a strong reason.
- `CartSummary.jsx` imports `pricing.js` but nothing renders or tests `CartSummary.jsx` itself; it exists only to make `web/` a genuine React app, not to be exercised by tests.
- `mavenCentral()` (via `pluginManagement`) is the only point in the repo that resolves a package from a registry — it backs the `com.diffplug.spotless` Gradle plugin.

# Build & Test

- Run the Java suite with `gradle test` (JUnit 4 — `junit:junit:4.13.2`, `org.junit.Test`/`assertEquals`). Do not assume JUnit 5 idioms (`@Test` from `org.junit.jupiter`, `assertThat`).
- Run the JS suite with `node --test web/test/*.test.js` (or `npm test`) — Node's built-in `node:test` + `node:assert/strict`. Do not reach for Jest, Vitest, or Mocha.
- No command runs both suites together — `package.json`'s only script is the Node one. If you change one side, manually run the other suite's command too.

# Code Style

Java:
- Formatting is handled by spotless (`com.diffplug.spotless`), configured only to `removeUnusedImports()` — it will not reformat whitespace or line length, so don't rely on it for that.
- Keep source in the `demo` package ASCII-only (`Money.java`'s class comment states this is deliberate).
- Document public methods with a single-line Javadoc summarizing behavior in cents (e.g. `/** Sum of every amount, in cents. */`), not `@param`/`@return` blocks.

JavaScript/JSX:
- Use JSDoc-style `/** ... */` block comments above exported functions, written in prose — not `@param`/`@returns` tags.
- Terminate statements with semicolons (no semicolon-free style).
- When a function encodes a known defect or a deliberate design constraint, say so explicitly in the source comment rather than leaving it implicit.

Test conventions:
- Java test classes end in `Test` (e.g. `MoneyTest`), mirroring the class under test, in the same package.
- JS test files live under `web/test/`, mirror the module under test in `web/src/`, and import it via a relative `../src/...` path.
- Write JS tests with `node:test`'s flat `test('description', () => { ... })` form, not `describe`/`it` nesting.
- Name tests as full sentences describing behavior (e.g. `'cartTotal multiplies price by quantity'`), not `should`/`test that` phrasing.

# Gotchas

- `web/src/pricing.js`'s `applyDiscount` previously subtracted the discount per line and had no floor at zero; it is now fixed to subtract the discount once from the order total and clamp at zero (`Math.max(0, cartTotal(lines) - discountCents)`), matching `Money.java`'s `floorAtZero` intent.
- `README.md` still describes the old per-line/no-floor behavior as if it were a load-bearing fixture property. Trust the code and tests over the README's description of this behavior.