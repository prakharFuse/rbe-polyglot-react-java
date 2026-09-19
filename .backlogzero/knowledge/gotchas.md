---
name: gotchas
description: The known pricing defect and build quirks — read before touching pricing.js, MoneyTest.java, or the Gradle setup.
type: knowledge
scope: global
updated: '2026-09-19'
captured_sha: 31ae07b64f13a194041d0958b9548d6d2ff76894
sources:
  - web/src/pricing.js
  - web/test/pricing.test.js
  - README.md
  - build.gradle.kts
sources_sha256:
  README.md: 5529d73392307476641ea38674f8161667129a2d1ad23f1a154b2d164407c55d
  build.gradle.kts: 0f2a531ab2e8f15bdeddb35da942ae49abc40d581314cdce4a7c7a331d114268
  web/src/pricing.js: eb0dfe8b94a0ba36bc49d2bebcb8de7ada2416b0a2fc9bacb804f5e249f1b139
  web/test/pricing.test.js: 3b34b69345ba8e5c20cc8cff04338b6ce208c4b910eb7bb2cf9fa120a2124cba
---

**The known defect** lives in `applyDiscount` (`web/src/pricing.js:25-30`):
the discount is subtracted once per cart *line* instead of once per *order*,
and the result has no floor at zero. A 100-cent discount on a 3-line cart
removes 300 cents, and a discount larger than the subtotal can drive the
total negative. This is intentional fixture content — full mechanics are
documented in the comment directly above the function.

`web/test/pricing.test.js:16-21` only exercises a single-line cart, where
"per line" and "per order" are mathematically identical, so it passes despite
the defect. That test passing is expected and by design — don't treat it as
proof the defect doesn't exist, and don't edit it to mask the defect if asked
to fix pricing; add/fix multi-line coverage and fix the production code in
`pricing.js` instead.

**Java suite must stay green.** `src/test/java/demo/MoneyTest.java` is
unrelated to the pricing defect and is meant to keep passing — see
`../../README.md` for why a red Java suite breaks the fixture's purpose.

**No `gradlew` wrapper is checked in.** `gradle test` requires Gradle on the
system `PATH`; there's no bundled wrapper to fall back to.

**Plugin resolution is load-bearing.** `build.gradle.kts` resolves
`com.diffplug.spotless` as a third-party plugin via `plugins { }` +
`mavenCentral()` specifically to exercise registry resolution (see the inline
comment in `build.gradle.kts:1-13`) — don't replace it with a core plugin or
move the repository declaration without understanding that's the point.
