---
name: architecture
description: How the Java and JS/React sides are structured and wired (or not)
type: knowledge
scope: global
updated: 2026-09-19 (IONE-959)
captured_sha: 31ae07b64f13a194041d0958b9548d6d2ff76894
sources:
  - build.gradle.kts
  - settings.gradle.kts
  - package.json
  - src/main/java/demo/Money.java
  - web/src/pricing.js
  - web/src/CartSummary.jsx
  - web/test/pricing.test.js
  - src/test/java/demo/MoneyTest.java
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

```mermaid
flowchart TB
  subgraph java["Java side (Gradle)"]
    Money["Money.java\nsum(), floorAtZero()"]
    MoneyTest["MoneyTest.java (JUnit 4)"]
    MoneyTest -->|tests| Money
  end

  subgraph js["JS/React side (node --test)"]
    Pricing["pricing.js\ncartTotal(), applyDiscount()"]
    Cart["CartSummary.jsx"]
    PricingTest["pricing.test.js"]
    Cart -->|imports| Pricing
    PricingTest -->|imports & tests| Pricing
  end

  Gradle["gradle test"] --> MoneyTest
  NodeTest["node --test web/test/*.test.js"] --> PricingTest

  MavenCentral[("mavenCentral()\nvia pluginManagement")] -.->|resolves com.diffplug.spotless| Gradle
```

## Notes on the wiring

- **The two sides do not call each other.** There is no HTTP/IPC/shared build
  between `src/` (Java) and `web/` (JS). They are two separate toolchains
  living in one repo, verified independently.
- **`CartSummary.jsx` is a dead end for testing purposes**: it imports
  `pricing.js`, but nothing imports or renders `CartSummary.jsx` itself, and
  no test touches it. It exists to make `web/` a genuine React app rather
  than to be exercised.
- **`pricing.js` imports nothing** (not even React) — this is intentional per
  its own file comment, so `node --test` can never fail for install/dependency
  reasons.
- **Gradle plugin resolution is the interesting edge**: `com.diffplug.spotless`
  is a third-party plugin declared in `plugins {}` in build.gradle.kts, backed
  by `mavenCentral()` in the `repositories {}` block — this is the one point
  in the repo that talks to a package registry.
