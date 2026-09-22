---
name: gotchas
description: The deliberate defect and fixture invariants — read before touching pricing.js or the test commands
type: knowledge
scope: global
updated: 2026-09-22 (IONE-959)
captured_sha: ee84718c60caed2d9110dfc8d07fc5e8ba6a538a
sources:
  - web/src/pricing.js
  - web/test/pricing.test.js
  - README.md
sources_sha256:
  README.md: 5529d73392307476641ea38674f8161667129a2d1ad23f1a154b2d164407c55d
  web/src/pricing.js: 9cc9e5a294321652a153df715c39c2c24942e353750ba6536e0a90495e0afa16
  web/test/pricing.test.js: 0c92de30ff788825b87b4319bffd85ae338f2e850360d59241268799f0464709
diverges_from:
  - source: README.md#property-2
    claim: The deliberate discount defect lives on the JavaScript side (web/src/pricing.js), so a one-slot gate that only runs Gradle would miss it — this is a load-bearing fixture invariant.
    reality: applyDiscount in web/src/pricing.js was fixed this run to apply the discount once at the order level and floor at zero, removing the defect the fixture relied on.
    authority: code
    detected: '2026-09-22'
    run: 17e18785-c4ab-418d-8bfc-69e635c4c08d
---

**Former known defect, now fixed:** `applyDiscount` in `web/src/pricing.js` used to subtract `discountCents` from *every* line instead of once from the order total, with no floor. As of PST-1, it now does `Math.max(0, cartTotal(lines) - discountCents)` — the discount is applied once at the order level and the result is floored at zero. `web/test/pricing.test.js` now has a multi-line-cart case and a floor-at-zero case in addition to the original single-line case, so the fix is covered.

**This contradicts README.md's documented fixture design** ("the defect is on the JAVASCRIPT side" is called a load-bearing invariant for the j131 journey test). If this repo is still meant to serve as a deliberately-broken fixture, re-introducing the defect (or moving it) is a decision for whoever owns the journey-suite provisioning script (`tests/journeys/scripts/provision-polyglot-fixtures.ts`), not something to silently "fix" again.

**Fixture invariants (see `README.md` for the full explanation) — don't change these incidentally while working elsewhere in the repo:**
- Both suites must actually run in the sandbox; don't collapse them into one command or make one conditional on the other.
- `web/src/pricing.js` must keep importing nothing, so the JS suite can never fail for install/environment reasons.
- `src/test/java/demo/MoneyTest.java` must stay green on `main`.
