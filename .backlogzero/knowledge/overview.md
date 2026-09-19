---
name: overview
description: What this repo is and how it's structured — read first for any task here.
type: knowledge
scope: global
updated: '2026-09-19'
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

This is a journey-suite test fixture (`j131`, `IONE-1773`), not a product
codebase — see `../../README.md` for the full rationale behind why the repo
is deliberately polyglot and why three specific properties (both suites run
in the microVM, the defect lives on the JS side, the Java suite stays green)
must not be broken. Don't restate that rationale; just don't violate it when
editing.

Two independent codebases share this repo — they do not call each other at
runtime (see `architecture.md`):

- **Java**: `src/main/java/demo/Money.java` (cent arithmetic), tested by
  `src/test/java/demo/MoneyTest.java`, run with `gradle test`.
- **JS/React**: `web/src/pricing.js` (pure pricing helpers) consumed by
  `web/src/CartSummary.jsx`, tested by `web/test/pricing.test.js`, run with
  `node --test web/test/*.test.js` (aliased as `npm test` in `package.json`).

Gotcha: there is no `gradlew` wrapper checked in, so `gradle test` needs a
system Gradle on `PATH` — there's no `./gradlew test` fallback to reach for.
