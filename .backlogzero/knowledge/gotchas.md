---
name: gotchas
description: Verified sharp edges in this repo — the pricing defect and asymmetry between the Java and JS helpers
type: knowledge
scope: global
updated: 2026-09-19 (IONE-959)
captured_sha: e3f968740da87aac0e33890efd25bf0b3a7b47f2
sources:
  - web/src/pricing.js
  - web/test/pricing.test.js
  - src/main/java/demo/Money.java
sources_sha256:
  src/main/java/demo/Money.java: 577563fbf0454e49225c00d9161cd34e39557173c3093286c7c6980bf815ec48
  web/src/pricing.js: 0777579d2d09b4c7fb6475b2b6b2177f0d2135dd60f41474dadc3ed4e10be0cd
  web/test/pricing.test.js: 30d5a5fabe1428a6fa52b759ff9708210718c8a837e5e94b3209fec18e7ae63c
---

## The two suites are never run by one command

`gradle test` and `node --test web/test/*.test.js` are fully independent;
there is no root script that chains them (`package.json`'s only script is
the node one). If you change one side, remember to run the other suite's
command manually — nothing will do it for you.

## `applyDiscount` now matches the Java side's floor-at-zero behavior

`web/src/pricing.js`'s `applyDiscount` previously subtracted the discount
per line instead of once per order, and had no floor at zero (unlike
`src/main/java/demo/Money.java`'s `floorAtZero`). Both are fixed: it now
computes `Math.max(0, cartTotal(lines) - discountCents)`, subtracting once
from the order total and clamping at zero, matching the Java side's intent.
`web/test/pricing.test.js` now covers a multi-line cart (catches the old
per-line bug) and a floor-at-zero case.
