---
name: gotchas
description: The known pricing defect and build quirks — read before touching pricing.js, MoneyTest.java, or the Gradle setup.
type: knowledge
scope: global
updated: 2026-09-19 (IONE-959)
captured_sha: ebd3b5af40046a9e7d6c1002144e1e2ff84da821
sources:
  - web/src/pricing.js
  - web/test/pricing.test.js
  - README.md
  - build.gradle.kts
sources_sha256:
  README.md: 5529d73392307476641ea38674f8161667129a2d1ad23f1a154b2d164407c55d
  build.gradle.kts: 0f2a531ab2e8f15bdeddb35da942ae49abc40d581314cdce4a7c7a331d114268
  web/src/pricing.js: 2b25f56eb3f79035f14db56d362490b82c7685aaac3194045412fd3a83b5ea2a
  web/test/pricing.test.js: 9c0d8b7b3a050fb0e30f9cd52fccd5c74bba7affa6e55f7569b2fb4d75fbde5e
---

**The `applyDiscount` defect described in earlier fixture snapshots is fixed** (`web/src/pricing.js:21-23`): the discount is now subtracted once from the cart subtotal (not once per line), and `Math.max(0, ...)` floors the payable total at zero. This matches `Money.floorAtZero` in `src/main/java/demo/Money.java`, per the function's doc comment.

`web/test/pricing.test.js` now has explicit multi-line-cart and floor-at-zero cases (in addition to the original single-line case), so this behavior is under real regression coverage — don't reintroduce the per-line bug when touching `applyDiscount`.

**This contradicts the fixture's stated design in `README.md`** (property 2: "The defect is on the JAVASCRIPT side"). If asked to restore the journey-suite invariant rather than "fix" the bug, that means re-introducing the per-line/no-floor defect in `pricing.js`, not leaving it fixed.

**Java suite must stay green.** `src/test/java/demo/MoneyTest.java` is unrelated to pricing and is meant to keep passing — see `../../README.md` for why a red Java suite breaks the fixture's purpose.

**No `gradlew` wrapper is checked in.** `gradle test` requires Gradle on the system `PATH`; there's no bundled wrapper to fall back to.

**Plugin resolution is load-bearing.** `build.gradle.kts` resolves `com.diffplug.spotless` as a third-party plugin via `plugins { }` + `mavenCentral()` specifically to exercise registry resolution (see the inline comment in `build.gradle.kts:1-13`) — don't replace it with a core plugin or move the repository declaration without understanding that's the point.
