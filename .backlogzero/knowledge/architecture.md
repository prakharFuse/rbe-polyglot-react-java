---
name: architecture
description: Real shape of the two toolchains and how their files relate
type: knowledge
scope: global
updated: 2026-09-22 (IONE-959)
captured_sha: 31ae07b64f13a194041d0958b9548d6d2ff76894
sources:
  - package.json
  - build.gradle.kts
  - settings.gradle.kts
  - src/main/java/demo/Money.java
  - src/test/java/demo/MoneyTest.java
  - web/src/pricing.js
  - web/src/CartSummary.jsx
  - web/test/pricing.test.js
sources_sha256:
  build.gradle.kts: 0f2a531ab2e8f15bdeddb35da942ae49abc40d581314cdce4a7c7a331d114268
  package.json: dfe52e7d066dcf11affc72f3b3e1e875795635aa53a70e755f420180d11c7f57
  settings.gradle.kts: 139de9a83814a76fb0b2285ea784d612a051ab66fd54333c2d64947da6a55084
  src/main/java/demo/Money.java: 577563fbf0454e49225c00d9161cd34e39557173c3093286c7c6980bf815ec48
  src/test/java/demo/MoneyTest.java: d6a534d376ebb41b8374ceb2450f514573e0543fc0762e0d4a2ac19956a3fbbe
  web/src/CartSummary.jsx: be7506d7244ab667d201b6aa63a8b829bade1620ea09c182ea42f7ed0434ae03
  web/src/pricing.js: eb0dfe8b94a0ba36bc49d2bebcb8de7ada2416b0a2fc9bacb804f5e249f1b139
  web/test/pricing.test.js: 3b34b69345ba8e5c20cc8cff04338b6ce208c4b910eb7bb2cf9fa120a2124cba
---

The two toolchains are independent — neither imports from nor invokes the
other. They are joined only conceptually (both compute cart/cent money math).

```mermaid
flowchart TB
    subgraph Java["Java suite — gradle test"]
        MoneyTest["MoneyTest.java"] --> Money["Money.java\nsum(), floorAtZero()"]
        Gradle["build.gradle.kts"] -->|resolves| Spotless["com.diffplug.spotless\nvia mavenCentral()"]
    end

    subgraph JS["JS suite — node --test"]
        PricingTest["pricing.test.js"] --> Pricing["pricing.js\ncartTotal(), applyDiscount()"]
        CartSummary["CartSummary.jsx"] -->|imports| Pricing
        CartSummary -.->|not exercised by any test| PricingTest
    end

    PackageJson["package.json\nscripts.test"] -.->|runs| PricingTest
```

Notes:
- `CartSummary.jsx` is the only consumer of `pricing.js` at runtime, but no
  test renders it — the fixture only exercises the pure helper functions.
- `pricing.js` deliberately has zero imports (see `gotchas.md`), so the JS
  subgraph above has no edge into `node_modules`/React at test time even
  though `package.json` lists `react`/`react-dom` as dependencies.
