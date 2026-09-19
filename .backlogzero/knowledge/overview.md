---
name: overview
description: What this repo is and why it deliberately mixes Java and JavaScript toolchains
type: knowledge
scope: global
updated: 2026-09-19 (IONE-959)
captured_sha: 31ae07b64f13a194041d0958b9548d6d2ff76894
sources:
  - README.md
  - package.json
  - build.gradle.kts
sources_sha256:
  README.md: 5529d73392307476641ea38674f8161667129a2d1ad23f1a154b2d164407c55d
  build.gradle.kts: 0f2a531ab2e8f15bdeddb35da942ae49abc40d581314cdce4a7c7a331d114268
  package.json: dfe52e7d066dcf11affc72f3b3e1e875795635aa53a70e755f420180d11c7f57
---

Purpose, toolchain choices, and the three load-bearing properties of this fixture are
documented in `README.md` — read that first, do not duplicate it here.

## What's actually in the tree

Despite the "polyglot" framing, the repo is intentionally tiny:

- `src/main/java/demo/Money.java` + `src/test/java/demo/MoneyTest.java` — the Java/Gradle
  side (cent-arithmetic helpers, JUnit 4).
- `web/src/pricing.js`, `web/src/CartSummary.jsx` + `web/test/pricing.test.js` — the
  JavaScript side (pure pricing helpers, one React component, Node's built-in test runner).
- No backend server, no database, no build output committed (`build/`, `.gradle/`,
  `node_modules/` are gitignored per `.gitignore`).

There is no `tests/journeys/scripts/provision-polyglot-fixtures.ts` in this checkout —
`README.md` references it as the re-provisioning script, but it lives outside this repo's
tree (this repo is the fixture output, not the fixture generator).

## Running the suites

- Java: `gradle test` (JUnit 4.13.2, JDK 17 toolchain, declared in `build.gradle.kts`).
- JavaScript: `npm test`, which runs `node --test web/test/*.test.js` (see `package.json`)
  — zero installed dependencies required for the test run itself, even though `react` and
  `react-dom` are listed under `dependencies` for `CartSummary.jsx`.
