---
name: gotchas
description: The deliberate defect and fixture invariants — read before touching pricing.js or the test commands
type: knowledge
scope: global
updated: 2026-09-22 (IONE-959)
captured_sha: 31ae07b64f13a194041d0958b9548d6d2ff76894
sources:
  - web/src/pricing.js
  - web/test/pricing.test.js
  - README.md
sources_sha256:
  README.md: 5529d73392307476641ea38674f8161667129a2d1ad23f1a154b2d164407c55d
  web/src/pricing.js: eb0dfe8b94a0ba36bc49d2bebcb8de7ada2416b0a2fc9bacb804f5e249f1b139
  web/test/pricing.test.js: 3b34b69345ba8e5c20cc8cff04338b6ce208c4b910eb7bb2cf9fa120a2124cba
---

**Known defect, left in place on purpose:** `applyDiscount` in
`web/src/pricing.js:25-30` subtracts `discountCents` from *every* line instead
of once from the order total, and clamps nothing — a large discount can drive
the total negative. Contrast with `Money.floorAtZero` on the Java side
(`src/main/java/demo/Money.java:18-20`), which does floor at zero; the JS
helper has no equivalent guard. `web/test/pricing.test.js` only covers a
single-line cart, where "per line" and "per order" happen to be the same
number, so the suite stays green despite the bug — a multi-line cart is
needed to observe it.

**Fixture invariants (see `README.md` for the full explanation) — don't
change these incidentally while working elsewhere in the repo:**
- Both suites must actually run in the sandbox; don't collapse them into one
  command or make one conditional on the other.
- `web/src/pricing.js` must keep importing nothing, so the JS suite can never
  fail for install/environment reasons.
- `src/test/java/demo/MoneyTest.java` must stay green on `main`.

If a task asks you to fix the discount bug, the fix belongs in
`web/src/pricing.js`'s `applyDiscount`, and a **multi-line-cart** test case is
required to prove it — the existing single-line test cannot catch a
regression here.
