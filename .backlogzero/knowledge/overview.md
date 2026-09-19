---
name: overview
description: What this repo is and how its two toolchains fit together — read first
type: knowledge
scope: global
updated: 2026-09-19 (IONE-959)
captured_sha: 31ae07b64f13a194041d0958b9548d6d2ff76894
sources:
  - README.md
  - package.json
  - build.gradle.kts
  - settings.gradle.kts
sources_sha256:
  README.md: 5529d73392307476641ea38674f8161667129a2d1ad23f1a154b2d164407c55d
  build.gradle.kts: 0f2a531ab2e8f15bdeddb35da942ae49abc40d581314cdce4a7c7a331d114268
  package.json: dfe52e7d066dcf11affc72f3b3e1e875795635aa53a70e755f420180d11c7f57
  settings.gradle.kts: 139de9a83814a76fb0b2285ea784d612a051ab66fd54333c2d64947da6a55084
---

This repo is a deliberately-constructed **fixture**, not a product. See
../../README.md for the full rationale (it documents three load-bearing
properties of the fixture — do not restate them here, read the source).

## What's actually in the tree

- `src/main/java/demo/Money.java` + `src/test/java/demo/MoneyTest.java` — the
  Java side. Cent-arithmetic helpers (`sum`, `floorAtZero`), JUnit 4 tests.
  Built with Gradle (Kotlin DSL), JDK 17 toolchain.
- `web/src/pricing.js` + `web/src/CartSummary.jsx` + `web/test/pricing.test.js`
  — the JS/React side. `pricing.js` exports `cartTotal` and `applyDiscount`;
  `CartSummary.jsx` is a presentational React component that calls both but is
  not itself exercised by any test (README calls this out explicitly).
- No `node_modules/`, no lockfile, no `build/` — all three are gitignored and
  not checked in. `react`/`react-dom` are declared in package.json but the JS
  test suite imports nothing external (see ../conventions/testing.md).

## Two independent suites, two independent commands

- `gradle test` — Java/JUnit.
- `node --test web/test/*.test.js` — the `test` script in package.json.

There is no single top-level command that runs both. See
../knowledge/architecture.md for how the two sides relate structurally, and
../conventions/testing.md for how to run and extend each suite.

## Known defect

`web/src/pricing.js`'s `applyDiscount` has a real, intentional bug (documented
in the function's own docstring and in README.md): the discount is subtracted
once per line instead of once per order. See ../knowledge/gotchas.md for the
verified behavior and what a correct fix looks like.
