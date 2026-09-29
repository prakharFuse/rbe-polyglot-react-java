---
name: architecture
description: Real module shape of the repo — two independent modules, no runtime link between them
type: knowledge
scope: global
updated: 2026-09-29 (IONE-959)
captured_sha: e26c70a2b48b36976a77ff799accebc4d1ab0e80
sources:
  - src/main/java/demo/Money.java
  - src/test/java/demo/MoneyTest.java
  - web/src/pricing.js
  - web/src/CartSummary.jsx
  - web/test/pricing.test.js
  - package.json
  - build.gradle.kts
sources_sha256:
  build.gradle.kts: 0f2a531ab2e8f15bdeddb35da942ae49abc40d581314cdce4a7c7a331d114268
  package.json: dfe52e7d066dcf11affc72f3b3e1e875795635aa53a70e755f420180d11c7f57
  src/main/java/demo/Money.java: 175e6585541ba1ce4d07e3f81b18590b373a7f12186e6a843ca0660a6f9b3bce
  src/test/java/demo/MoneyTest.java: 43cff5836dc13a3b2affde80a7022eddfbab969eab76517933457c4e2670901b
  web/src/CartSummary.jsx: be7506d7244ab667d201b6aa63a8b829bade1620ea09c182ea42f7ed0434ae03
  web/src/pricing.js: 3395c08125763827c0fe8bc0c6babe4d61ae9b5e633ca7740a4bb95952ffab52
  web/test/pricing.test.js: b93e64116f19e43135beb6ff40ba71f5e7e87855756866d27855cf1ff1352032
---

```mermaid
flowchart TB
    subgraph Java["Java module (gradle test)"]
        Money["Money.java\nsum / floorAtZero"]
        MoneyTest["MoneyTest.java"]
        MoneyTest -->|asserts| Money
    end

    subgraph JS["JS module (node --test)"]
        Pricing["pricing.js\ncartTotal / applyDiscount"]
        PricingTest["pricing.test.js"]
        CartSummary["CartSummary.jsx"]
        PricingTest -->|asserts| Pricing
        CartSummary -->|imports| Pricing
    end
```

There is deliberately no edge between the two subgraphs. No file in the repo
opens a socket, calls `fetch`, or defines a server/`main` entrypoint (verified
by search — no matches for `fetch`/`http`/server bootstrap outside
`package-lock.json`). `Money.java` and `pricing.js` are two standalone
implementations of similar cent-arithmetic concepts; they are not the same
service split across languages, and a change to one has no runtime effect on
the other. `CartSummary.jsx` renders `pricing.js`'s output but is not itself
exercised by any test — the pure functions are what's under test.
