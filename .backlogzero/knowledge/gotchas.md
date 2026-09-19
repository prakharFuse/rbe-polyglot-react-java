---
name: gotchas
description: Known intentional defect and fixture-integrity traps — read before "fixing" pricing.js or the test suites
type: knowledge
scope: global
updated: 2026-09-19 (IONE-959)
captured_sha: 42f3b7184e853cf5fc7a781571c57974af6361ec
sources:
  - web/src/pricing.js
  - web/test/pricing.test.js
  - README.md
sources_sha256:
  README.md: 5529d73392307476641ea38674f8161667129a2d1ad23f1a154b2d164407c55d
  web/src/pricing.js: 5419d8ae3272d89b1daef1278ad143a4a351966dbbefd0a8002bc123756a060e
  web/test/pricing.test.js: 0b58a6692c3d50cef94f28a69fdba77872b96bc5dca04834a7988a8948abb9a2
diverges_from:
  - source: README.md:21-25
    claim: The intentional defect is on the JAVASCRIPT side (web/src/pricing.js) — load-bearing fixture property 2.
    reality: web/src/pricing.js's applyDiscount no longer has the per-line bug; it computes the discount once per order with a zero floor.
    authority: code
    detected: '2026-09-19'
    run: b67abab7-c9f7-442d-b7f1-f6ece7633f48
---

## `applyDiscount` was fixed — the intentional defect this page tracked is now gone

`web/src/pricing.js` previously subtracted `discountCents` once **per line** instead of once
**per order**, with no floor at zero. This run rewrote it to reuse `cartTotal`, subtract the
discount once, and clamp at zero:

```js
export function applyDiscount(lines, discountCents) {
  return Math.max(0, cartTotal(lines) - discountCents);
}
```

`web/test/pricing.test.js` now also covers a **multi-line** cart and a case where the discount
exceeds the subtotal, so the suite can no longer stay green against the old per-line behavior.

This contradicts README.md's load-bearing property 2 ("the defect is on the JAVASCRIPT side").
If this repo gets re-provisioned to restore the intentional defect (see
`tests/journeys/scripts/provision-polyglot-fixtures.ts`), this fix will be reverted — check the
current state of `pricing.js` before relying on this note.

## The Java suite must stay green — don't "fix" it

`src/test/java/demo/MoneyTest.java:8-11` states explicitly that the Java suite is expected
to stay green on `main`. Do not introduce Java-side defects or "balance" the fixture by
breaking `Money.java` — the asymmetry (JS broken, Java clean) is the point (README.md
property 3). Note the JS side is presently NOT broken (see above) — verify current state
before assuming the asymmetry holds.

## Both test commands must actually run to prove anything

Per `README.md`, a single-command gate (e.g., running only `gradle test`) will report green
without ever exercising the JS suite. If validating a fix here, run **both**:
`gradle test` and `npm test` (`node --test web/test/*.test.js`).
