# Repository Nature

- This is a deliberately-constructed fixture repository, not a product — read README.md for the full rationale before making structural changes or "fixing" things that look odd.
- The Java side (`src/`) and the JS/React side (`web/`) are fully independent toolchains that never call each other. Treat them as two separate projects sharing one repo, not a wired-together full-stack app.

# Build & Test Commands

- Java: `gradle test` (JUnit 4).
- JS: `node --test web/test/*.test.js` (equivalent to `npm test`).
- No single command runs both suites. If you change one side, manually run the other side's command too — nothing chains them for you.

# Java Conventions

- JDK 17 toolchain, Gradle Kotlin DSL.
- Tests use JUnit 4 (`junit:junit:4.13.2`, `org.junit.Test`, `assertEquals`) — do not use JUnit 5 idioms like `@Test` from `org.junit.jupiter` or `assertThat`.
- The `com.diffplug.spotless` plugin is configured only for `removeUnusedImports()` — it will not reformat whitespace or line length, so don't rely on it for general formatting.
- Keep Java source in this package ASCII-only.
- Document public methods with a single-line Javadoc summary in prose (e.g. describing behavior in cents), not `@param`/`@return` blocks.
- Name test classes `<ClassUnderTest>Test` and keep them in the same package as the class they test.

# JavaScript / JSX Conventions

- Test runner is Node's built-in `node:test` + `node:assert/strict` only — do not introduce Jest, Vitest, or Mocha.
- Pure-logic modules like `pricing.js` must stay dependency-free (no imports, not even React). This is intentional so the JS test suite can never fail for install/dependency reasons — don't add imports to these files without a specific reason.
- Comment functions with JSDoc-style `/** ... */` prose blocks, not `@param`/`@returns` tags.
- When a function encodes a known defect or deliberate design constraint, say so explicitly in the source comment rather than leaving it implicit.
- Always terminate statements with semicolons.
- Place test files under `web/test/`, mirroring the module under test in `web/src/` (e.g. `pricing.test.js` ↔ `pricing.js`), and import it via a relative `../src/...` path.
- Write tests with `node:test`'s flat `test('description', () => { ... })` form, not `describe`/`it` nesting.
- Name tests as full descriptive sentences (e.g. `'cartTotal multiplies price by quantity'`), not `should`/`test that` phrasing.

# Known Gotchas

- `web/src/pricing.js`'s `applyDiscount` subtracts the discount once per cart line instead of once per order — this is a documented, pre-existing defect (see the function's own docstring and README.md), not something introduced by other changes. The existing single-line test can't detect it; a test with ≥2 lines is needed to catch it.
- There is no JS equivalent of Java's `Money.floorAtZero` — `applyDiscount` can return a negative total. This gap exists independently of the per-line/per-order bug above.
- `CartSummary.jsx` imports `pricing.js` but is not rendered or tested anywhere in the repo; this is intentional (it exists to make `web/` a real React app) rather than an oversight to fix.
