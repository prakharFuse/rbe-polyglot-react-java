---
name: architecture
description: Real component shape of the repo — two independent, non-networked toolchains
type: knowledge
scope: global
updated: 2026-09-19 (IONE-959)
captured_sha: 31ae07b64f13a194041d0958b9548d6d2ff76894
sources:
  - build.gradle.kts
  - settings.gradle.kts
  - package.json
  - web/src/CartSummary.jsx
  - web/src/pricing.js
sources_sha256:
  build.gradle.kts: 0f2a531ab2e8f15bdeddb35da942ae49abc40d581314cdce4a7c7a331d114268
  package.json: dfe52e7d066dcf11affc72f3b3e1e875795635aa53a70e755f420180d11c7f57
  settings.gradle.kts: 139de9a83814a76fb0b2285ea784d612a051ab66fd54333c2d64947da6a55084
  web/src/CartSummary.jsx: be7506d7244ab667d201b6aa63a8b829bade1620ea09c182ea42f7ed0434ae03
  web/src/pricing.js: eb0dfe8b94a0ba36bc49d2bebcb8de7ada2416b0a2fc9bacb804f5e249f1b139
---

There is no runtime integration between the two halves of this repo — they don't call each
other over HTTP, share a process, or share a database. The only relationship is the source
import inside the JS half.

```mermaid
flowchart LR
    subgraph Java["Java / Gradle toolchain"]
        Money["demo.Money\nsrc/main/java/demo/Money.java"]
        MoneyTest["demo.MoneyTest\nsrc/test/java/demo/MoneyTest.java"]
        Spotless["com.diffplug.spotless plugin\n(build.gradle.kts, via pluginManagement)"]
        MoneyTest -->|JUnit 4| Money
        Spotless -.formats.-> Money
    end

    subgraph JS["JavaScript / Node toolchain"]
        Pricing["pricing.js\nweb/src/pricing.js"]
        Cart["CartSummary.jsx\nweb/src/CartSummary.jsx"]
        PricingTest["pricing.test.js\nweb/test/pricing.test.js"]
        Cart -->|imports| Pricing
        PricingTest -->|node --test, imports| Pricing
    end

    MavenCentral[("mavenCentral()\nbuild.gradle.kts")]
    Java -.resolves plugin/deps from.-> MavenCentral
```

Notes:

- `Money.java` and `pricing.js` are structurally parallel (both do cent-arithmetic) but are
  never invoked from one another — there's no RPC, shared package, or codegen bridging them.
- `CartSummary.jsx` is the only file that imports `pricing.js`; it's not itself under test
  (no JSX/render test exists) — see `web/src/CartSummary.jsx:5-8` comment for why.
- `build.gradle.kts` resolves the `spotless` plugin through `pluginManagement`/`mavenCentral()`
  rather than a core Gradle plugin, specifically to exercise real dependency resolution
  (network/registry loopback) — see `README.md` for why that's load-bearing.
