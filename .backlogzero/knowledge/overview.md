---
name: overview
description: What this repo is and how it's laid out — read first for orientation
type: knowledge
scope: global
updated: 2026-09-22 (IONE-959)
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

This repo is a deliberately polyglot fixture: a Gradle/Java module and a
React/JS module living side by side, each with its own independent test
suite. See ../../README.md for the full rationale (it's a journey-test
fixture, `j131`/`IONE-1773`) — that doc is accurate and should be treated as
the source of truth for *why* the repo is shaped this way. This page covers
layout and pointers only.

## Layout

- `src/main/java/demo/Money.java` — cent-arithmetic helpers (`sum`, `floorAtZero`), plain Java, no dependencies.
- `src/test/java/demo/MoneyTest.java` — JUnit 4 tests for `Money`.
- `web/src/pricing.js` — pure pricing helpers (`cartTotal`, `applyDiscount`), zero imports.
- `web/src/CartSummary.jsx` — the only React component; renders `pricing.js` output, not itself under test.
- `web/test/pricing.test.js` — `node:test` suite for `pricing.js`.

There is no server and no wiring between the Java and JS sides at runtime —
see [[architecture]] for the verified shape.

## Known issue

`web/src/pricing.js`'s `applyDiscount` has an intentional, documented defect
(discount subtracted per line instead of once from the order total, no floor
at zero). It's explained in detail in the file's own header comment and in
../../README.md — read those before touching the function; don't duplicate
the explanation elsewhere.

## Running the suites

Commands and conventions for the two test suites are in [[testing]].
