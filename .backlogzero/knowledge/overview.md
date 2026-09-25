---
name: overview
description: What this repo is and how it's laid out — read first for orientation
type: knowledge
scope: global
updated: 2026-09-25 (IONE-959)
captured_sha: 4f06e533e96f3f54cb79c1d224eb2ca3643e4d98
sources:
  - src/main/java/demo/Money.java
  - web/src/pricing.js
  - web/test/pricing.test.js
  - README.md
sources_sha256:
  README.md: f178e7c7c2be47d428b2f810cd5ec92f5acd9194e47eecd448af2c9298f4606a
  src/main/java/demo/Money.java: 9ea4cf0890d38a880cd6fec4db97db3da97d319276ba439709af09b3b7bb7210
  web/src/pricing.js: 8130829711c44a34709f954c198342433b8345513dd07e10f57699f5d585efdd
  web/test/pricing.test.js: 9986d6f5be1d0d8ccc1bf638417c76c1c0bd299aa2c9ee9bdf1ba8cf22b79987
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
- `web/src/CartSummary.jsx` — the only React component; renders `pricing.js` output, not itself under test.
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
