# Architecture

- This repo has two independent modules — a Java module (`Money.java`) and a JS module (`pricing.js`) — with no runtime link between them: no shared imports, no network calls, no shared entrypoint.
- Despite being separate, both sides implement the same half-up cents-rounding rule (ties round away from zero, e.g. `-0.005` -> `-0.01`) as a deliberate cross-language parity contract, documented in README.md's "Rounding" section. Keep them in lockstep by convention whenever you touch rounding logic on either side.

# Java conventions

- Always construct `Money` via `Money.of(String)` or `Money.of(double)` (which routes through `BigDecimal.valueOf`). Never use `new BigDecimal(double)` directly — it breaks numeric parity with the JS side.

# JS conventions

- `web/src/pricing.js` imports nothing by design. Keep any new pricing helpers added to that file dependency-free.
- Do not add a test framework dependency (Jest, Mocha, Vitest, etc.) to the JS suite — it intentionally uses only Node's built-in `node:test` and `node:assert/strict` so it can never fail for install/environment reasons.

# Testing

- Two independent suites exist; a change is only considered validated when both have been run.
- Java suite: run `gradle test` (JUnit 4, JDK 17 toolchain).
- JS suite: run `node --test web/test/*.test.js` (also available as `npm test`).
- If you change the rounding rule, mirror the new/updated test cases (half-up ties, negative ties, binary-noise cases like `1.005`) in both `MoneyTest.java` and `pricing.test.js` — don't update one without the other.
