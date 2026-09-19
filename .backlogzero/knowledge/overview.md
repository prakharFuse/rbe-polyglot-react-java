---
name: overview
description: What this repo is and how its two toolchains fit together — read first
type: knowledge
scope: global
updated: 2026-09-19 (IONE-959)
captured_sha: e3f968740da87aac0e33890efd25bf0b3a7b47f2
sources:
  - web/src/pricing.js
  - web/test/pricing.test.js
sources_sha256:
  web/src/pricing.js: 0777579d2d09b4c7fb6475b2b6b2177f0d2135dd60f41474dadc3ed4e10be0cd
  web/test/pricing.test.js: 30d5a5fabe1428a6fa52b759ff9708210718c8a837e5e94b3209fec18e7ae63c
diverges_from:
  - source: README.md#L21
    claim: 'The defect is on the JAVASCRIPT side (web/src/pricing.js): applyDiscount subtracts the discount per line instead of once per order, with no floor at zero.'
    reality: web/src/pricing.js's applyDiscount now computes Math.max(0, cartTotal(lines) - discountCents), correctly discounting once per order and flooring at zero — the described defect no longer exists in the code.
    authority: code
    detected: '2026-09-19'
    run: 1129c6a6-79fd-4a6c-9509-1373fe3a9259
---

## Known defect — fixed

`web/src/pricing.js`'s `applyDiscount` previously had a real, intentional
bug (per-line instead of per-order discount subtraction, and no floor at
zero). It has since been fixed: it now subtracts the discount once from the
order total and clamps at zero, matching `src/main/java/demo/Money.java`'s
`floorAtZero` intent. See ../knowledge/gotchas.md for details. Note:
README.md still describes this defect as a load-bearing fixture property —
see its `diverges_from` note.
