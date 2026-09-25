---
name: overview
description: What this repo is and how it's laid out — read first for orientation
type: knowledge
scope: global
updated: 2026-09-25 (IONE-959)
captured_sha: 72f6a07ec6f9ee9927e076dbb31961ff83c223be
sources:
  - src/main/java/demo/Money.java
  - web/src/pricing.js
sources_sha256:
  src/main/java/demo/Money.java: ff3b629d5fa0dcfcc864580a3905570dcfd249038cf1a7409fb1db8f2ba1735b
  web/src/pricing.js: 029795589661dce63a195fb34944cb2ec51a49ffb8b66220a23d0a63a36d66d8
diverges_from:
  - source: README.md#L21-L25
    claim: README.md states the fixture's intentional defect is on the JavaScript side, in web/src/pricing.js's applyDiscount (per-item instead of per-order discount), and that this is load-bearing for the j131/IONE-1773 journey test.
    reality: web/src/pricing.js's applyDiscount now computes the discount once against the order total and floors at zero (per PST-1 commits) — the documented defect no longer exists in the code.
    authority: code
    detected: '2026-09-22'
    run: 511efba6-c8fa-45af-97f1-718848e07820
---

Layout list is stale after the shared rounding-rule change:

- `src/main/java/demo/Money.java` — cent-arithmetic helpers (`of`, `roundToCents`, `sum`, `floorAtZero`), plain Java, no dependencies.
- `web/src/pricing.js` — pure pricing helpers (`cartTotal`, `applyDiscount`, `roundToCents`), zero imports.

Both files now also implement a matching half-up cents-rounding rule (see [[architecture]] for the parity details); the rest of the Layout section and the Known issue / diverges_from note are unaffected by this run.
