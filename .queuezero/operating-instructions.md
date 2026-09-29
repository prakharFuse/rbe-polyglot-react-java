# Testing

- A change counts as validated only when both suites have been run. One command does not cover both:
  - Java: `gradle test`
  - JS: `node --test web/test/*.test.js` (also available as `npm test`)
- The Java suite must stay green on main.
- Java tests use JUnit 4.13.2 on a JDK 17 toolchain. Do not downgrade JUnit, because `MoneyTest` uses `assertThrows`, which needs JUnit >= 4.13.
- Put Java tests under `src/test/java/demo/`, mirroring `src/main/java/demo/`.
- JS tests use only Node's built-in `node:test` and `node:assert/strict`. Do not add a test framework (Jest, Mocha, Vitest, etc.). The JS suite must stay zero-dependency so it cannot fail for install or environment reasons.
- Put JS tests under `web/test/` and import the module under test directly (e.g. `../src/pricing.js`).

# Architecture and gotchas

- The Java module (`Money.java`) and the JS module (`web/src/pricing.js`) are two separate implementations of similar cent arithmetic. They have no runtime link: no server, no `fetch`, no shared entrypoint. A change on one side has no effect on the other, so fix a bug on the side where it occurs.
- `web/src/pricing.js` imports nothing, by design. Keep new pricing helpers in that file free of dependencies.
- `web/src/CartSummary.jsx` is not covered by any test. Put logic you want tested in the pure functions in `pricing.js`.
- README.md says `applyDiscount` has an intentional defect (discount taken off each line, no floor at zero). That is out of date. The code now subtracts the discount once from `cartTotal(lines)` and floors the result at zero. Trust the code over that README claim.
