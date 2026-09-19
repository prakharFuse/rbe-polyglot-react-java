---
name: gotchas
description: Known intentional defect and fixture-integrity traps — read before "fixing" pricing.js or the test suites
type: knowledge
scope: global
updated: 2026-09-19 (IONE-959)
captured_sha: 31ae07b64f13a194041d0958b9548d6d2ff76894
sources:
  - web/src/pricing.js
  - web/test/pricing.test.js
  - src/test/java/demo/MoneyTest.java
  - README.md
sources_sha256:
  README.md: 5529d73392307476641ea38674f8161667129a2d1ad23f1a154b2d164407c55d
  src/test/java/demo/MoneyTest.java: d6a534d376ebb41b8374ceb2450f514573e0543fc0762e0d4a2ac19956a3fbbe
  web/src/pricing.js: eb0dfe8b94a0ba36bc49d2bebcb8de7ada2416b0a2fc9bacb804f5e249f1b139
  web/test/pricing.test.js: 3b34b69345ba8e5c20cc8cff04338b6ce208c4b910eb7bb2cf9fa120a2124cba
---

## `applyDiscount` is broken on purpose (verified in code)

`web/src/pricing.js:25-30` subtracts `discountCents` once **per line** instead of once
**per order**, and applies no floor at zero:

```js
export function applyDiscount(lines, discountCents) {
  return lines.reduce(
    (sum, line) => sum + (line.priceCents * line.quantity - discountCents),
    0,
  );
}
```

Confirmed by hand: for a 3-line cart, a 100-cent discount removes 300 cents total, not 100.
The existing test in `web/test/pricing.test.js:16-21` only covers a **single-line** cart,
where "per line" and "per order" are indistinguishable — so the suite is green despite the
defect. This is intentional fixture design (see `README.md` property 2), not an oversight.

If asked to fix `applyDiscount`: the correct behavior is to compute the order subtotal once
(reuse `cartTotal`), subtract the discount once, and floor at zero — mirroring
`Money.floorAtZero` in `src/main/java/demo/Money.java:18-20`, which already does the
equivalent clamp on the Java side. A regression test needs a **multi-line** cart case and a
case where the discount exceeds the subtotal (to check the floor), since the current
single-line test cannot catch either.

## The Java suite must stay green — don't "fix" it

`src/test/java/demo/MoneyTest.java:8-11` states explicitly that the Java suite is expected
to stay green on `main`. Do not introduce Java-side defects or "balance" the fixture by
breaking `Money.java` — the asymmetry (JS broken, Java clean) is the point (README.md
property 3).

## Both test commands must actually run to prove anything

Per `README.md`, a single-command gate (e.g., running only `gradle test`) will report green
without ever exercising the JS defect. If validating a fix here, run **both**:
`gradle test` and `npm test` (`node --test web/test/*.test.js`).
