# Repository Shape

- This repo has two independent toolchains — Java/Gradle and JavaScript/Node — with no runtime integration between them (no shared process, HTTP calls, or database). The only link is that `CartSummary.jsx` imports `pricing.js`.
- See `README.md` for the stated purpose and load-bearing properties of this fixture; don't duplicate that reasoning here, but do verify current code state before trusting it (see Gotchas below).

# Building & Testing

- Java: run `gradle test` (JUnit 4.13.2, JDK 17 toolchain, per `build.gradle.kts`).
- JavaScript: run `npm test`, which executes `node --test web/test/*.test.js`. This uses Node's built-in test runner — no test framework needs to be installed, even though `react`/`react-dom` are listed as dependencies.
- Always run **both** `gradle test` and `npm test` when validating a change. Running only one suite will report green without exercising the other language's code at all.

# Code Conventions

**Java (`src/test/java/demo/`)**
- One test class per production class, same package, suffixed `Test` (e.g. `Money.java` → `MoneyTest.java`).
- Use `org.junit.Test` and `org.junit.Assert.assertEquals` (JUnit 4 style, not JUnit 5).

**JavaScript (`web/test/`)**
- Use Node's built-in `node:test` and `node:assert/strict` — do not add an external test framework dependency.
- Name test files `<module>.test.js`, import the module under test with a relative `../src/...` path.
- Each `test(...)` block must cover exactly one behavior/scenario — don't batch multiple unrelated assertions into one `test()` block.

# Gotchas

- The Java suite (`MoneyTest`) is expected to always stay green on `main`. Don't introduce Java-side defects or "balance" the fixture by breaking `Money.java`.
- `pricing.js`'s `applyDiscount` previously had a bug (it subtracted the discount once per line instead of once per order, with no floor at zero). It has since been fixed to subtract once per order and clamp at zero. Before assuming any JS-vs-Java asymmetry described elsewhere still holds, check the current state of `pricing.js`.
- `build.gradle.kts` resolves the `spotless` plugin via `pluginManagement`/`mavenCentral()` rather than a core Gradle plugin, deliberately, to exercise real dependency resolution — don't "simplify" this by switching it to a bundled plugin.
