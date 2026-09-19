---
name: architecture
description: Real component shape — two unconnected stacks sharing a repo, not a client/server pair.
type: knowledge
scope: global
updated: '2026-09-19'
captured_sha: 31ae07b64f13a194041d0958b9548d6d2ff76894
sources:
  - build.gradle.kts
  - settings.gradle.kts
  - package.json
  - web/src/CartSummary.jsx
  - web/src/pricing.js
  - src/main/java/demo/Money.java
sources_sha256:
  build.gradle.kts: 0f2a531ab2e8f15bdeddb35da942ae49abc40d581314cdce4a7c7a331d114268
  package.json: dfe52e7d066dcf11affc72f3b3e1e875795635aa53a70e755f420180d11c7f57
  settings.gradle.kts: 139de9a83814a76fb0b2285ea784d612a051ab66fd54333c2d64947da6a55084
  src/main/java/demo/Money.java: 577563fbf0454e49225c00d9161cd34e39557173c3093286c7c6980bf815ec48
  web/src/CartSummary.jsx: be7506d7244ab667d201b6aa63a8b829bade1620ea09c182ea42f7ed0434ae03
  web/src/pricing.js: eb0dfe8b94a0ba36bc49d2bebcb8de7ada2416b0a2fc9bacb804f5e249f1b139
---

```mermaid
flowchart TB
  subgraph Java["Java stack (gradle test)"]
    Money["demo.Money\nsrc/main/java/demo/Money.java"]
    MoneyTest["demo.MoneyTest\nsrc/test/java/demo/MoneyTest.java"]
    MoneyTest -->|asserts| Money
  end

  subgraph JS["JS/React stack (node --test)"]
    Pricing["pricing.js\nweb/src/pricing.js"]
    CartSummary["CartSummary.jsx\nweb/src/CartSummary.jsx"]
    PricingTest["pricing.test.js\nweb/test/pricing.test.js"]
    CartSummary -->|imports\ncartTotal, applyDiscount| Pricing
    PricingTest -->|asserts| Pricing
  end
```

The two subgraphs above are the entire picture: there is no edge between
them. Nothing in `web/` makes an HTTP call into the Java code, and nothing in
`build.gradle.kts` builds or serves `web/`. They are co-located only — a
newcomer used to full-stack repos should not assume `CartSummary.jsx` talks
to a Java backend.

`pricing.js` deliberately imports nothing (see the file header comment), so
the JS suite can never fail for install/dependency reasons — that property is
part of why the fixture works (see `../../README.md`).
