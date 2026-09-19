---
name: gotchas
description: Verified sharp edges in this repo — the pricing defect and asymmetry between the Java and JS helpers
type: knowledge
scope: global
updated: 2026-09-19 (IONE-959)
captured_sha: 31ae07b64f13a194041d0958b9548d6d2ff76894
sources:
  - web/src/pricing.js
  - web/test/pricing.test.js
  - src/main/java/demo/Money.java
sources_sha256:
  src/main/java/demo/Money.java: 577563fbf0454e49225c00d9161cd34e39557173c3093286c7c6980bf815ec48
  web/src/pricing.js: eb0dfe8b94a0ba36bc49d2bebcb8de7ada2416b0a2fc9bacb804f5e249f1b139
  web/test/pricing.test.js: 3b34b69345ba8e5c20cc8cff04338b6ce208c4b910eb7bb2cf9fa120a2124cba
---

## `applyDiscount` subtracts per line, not per order

`web/src/pricing.js`'s docstring already names this defect; this entry
records the verified numeric behavior so a fix can be checked precisely.

Given a 3-line cart where each line is `{ priceCents: 200, quantity: 1 }`
and `discountCents = 100`:

- **Current (buggy) result:** `applyDiscount` subtracts 100 from *each* line's
  contribution, i.e. `(200-100) + (200-100) + (200-100) = 300`.
- **Correct result:** the discount should come off the order total once:
  `cartTotal(lines) - discountCents = 600 - 100 = 500`.

The existing test (`web/test/pricing.test.js`) only covers a single-line
cart, where per-line and per-order subtraction are numerically identical —
that test passes today and will keep passing after a correct fix. A test
that catches the defect needs ≥2 lines.

## No floor-at-zero on the JS side

`src/main/java/demo/Money.java` has `floorAtZero(int amount)` clamping
negative totals to 0, and `MoneyTest.java` asserts that behavior. There is
**no equivalent in `web/src/pricing.js`** — `applyDiscount` can return a
negative number today (e.g. a single-line cart with `discountCents` larger
than the line total). This is a real gap, not just a side effect of the
per-line bug: even a per-order-correct implementation still needs an
explicit floor to match the Java side's behavior/intent.

## The two suites are never run by one command

`gradle test` and `node --test web/test/*.test.js` are fully independent;
there is no root script that chains them (`package.json`'s only script is
the node one). If you change one side, remember to run the other suite's
command manually — nothing will do it for you.
