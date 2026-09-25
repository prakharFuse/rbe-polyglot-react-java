---
name: overview
description: What this repo is and how it's laid out — read first for orientation
type: knowledge
scope: global
updated: 2026-09-25 (IONE-959)
captured_sha: efbe6193184f3bdbe01c1c72f0dfa26fbe356d96
sources:
  - src/main/java/demo/Money.java
  - web/src/pricing.js
  - web/src/CartSummary.jsx
sources_sha256:
  src/main/java/demo/Money.java: 36ac98847d90dfa4cdfb6f0141750ce58bbf8bafe4c53f58f6e439a7b3ebd0d5
  web/src/CartSummary.jsx: 2336e972f57fdb7dddc76592d45902b4594bb5cac96b0af6d8885e0f45a4113b
  web/src/pricing.js: 6f1b9ecae3ec551c7fd7e75cd941a89cf63b09c0ac534ba67662db8282efb169
diverges_from:
  - source: README.md#L21-L25
    claim: README.md states the fixture's intentional defect is on the JavaScript side, in web/src/pricing.js's applyDiscount (per-item instead of per-order discount), and that this is load-bearing for the j131/IONE-1773 journey test.
    reality: web/src/pricing.js's applyDiscount now computes the discount once against the order total and floors at zero (per PST-1 commits) — the documented defect no longer exists in the code.
    authority: code
    detected: '2026-09-22'
    run: 511efba6-c8fa-45af-97f1-718848e07820
---

This repo is a deliberately polyglot fixture: a Gradle/Java module and a
React/JS module living side by side, each with its own independent test
suite. See ../../README.md for the full rationale (it's a journey-test
fixture, `j131`/`IONE-1773`) — that doc is accurate and should be treated as
the source of truth for *why* the repo is shaped this way. This page covers
layout and pointers only.

## Layout

- `src/main/java/demo/Money.java` — cent-arithmetic helpers (`sum`, `floorAtZero`, `roundToCents`), plain Java, no dependencies.
- `src/test/java/demo/MoneyTest.java` — JUnit 4 tests for `Money`.
- `web/src/pricing.js` — pure pricing helpers (`cartTotal`, `applyDiscount`, `roundToCents`), zero imports.
- `web/src/CartSummary.jsx` — the only React component; renders `pricing.js` output (`roundToCents` for the subtotal, `applyDiscount` for the payable amount), not itself under test.
- `web/test/pricing.test.js` — `node:test` suite for `pricing.js`.

There is no server and no wiring between the Java and JS sides at runtime —
see [[architecture]] for the verified shape.

## Known issue (fixed as of PST-1)

`web/src/pricing.js`'s `applyDiscount` previously had an intentional,
documented defect (discount subtracted per line instead of once from the
order total, no floor at zero). As of the PST-1 change, `applyDiscount` now
computes `cartTotal(lines) - discountCents` once and floors at zero — the
defect is gone from the code. README.md still describes this defect as a
load-bearing, intentional property of the fixture ("The defect is on the
JAVASCRIPT side"); that claim no longer matches the code (see divergence).

## Running the suites

Commands and conventions for the two test suites are in [[testing]].
