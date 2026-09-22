---
name: overview
description: What this repo is and why it's shaped as two independent test suites
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

This repo is a **journey-suite fixture** (see `../../README.md` for the full
rationale, "j131, IONE-1773") — not a product codebase. It pairs a minimal
Gradle/Java service with a minimal React/JS front end specifically so that a
CI gate must run *two* independent test suites to be considered green:

- Java: `gradle test` — JDK 17 toolchain, JUnit 4, source under `src/`.
- JavaScript: `node --test web/test/*.test.js` — Node's built-in test runner,
  zero npm dependencies at runtime, source under `web/`.

Both suites are real (not stubs): the Java side pulls a third-party Gradle
plugin (`com.diffplug.spotless`) through `mavenCentral()`, and the JS side
imports nothing so it can only fail because of the code, never because of an
install/environment problem. README.md spells out why each of these choices
is load-bearing — don't relax them without re-reading it.

**Modules:**
- `src/main/java/demo/Money.java` — cent-arithmetic helpers (`sum`, `floorAtZero`), tested by `src/test/java/demo/MoneyTest.java`.
- `web/src/pricing.js` — cart pricing helpers (`cartTotal`, `applyDiscount`), tested by `web/test/pricing.test.js`.
- `web/src/CartSummary.jsx` — React component consuming the pricing helpers; not itself exercised by any test (see `gotchas.md`).

No `gradlew` wrapper is committed — running the Java suite depends on a
system-installed Gradle matching `settings.gradle.kts`/`build.gradle.kts`.
