---
name: architecture
description: Real module shape of the repo — two independent modules, no runtime link between them
type: knowledge
scope: global
updated: 2026-09-24 (IONE-959)
captured_sha: 1eeaec8a7515fe5ce91125ed87810aa749b372fc
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
  src/main/java/demo/Money.java: 577563fbf0454e49225c00d9161cd34e39557173c3093286c7c6980bf815ec48
  src/test/java/demo/MoneyTest.java: d6a534d376ebb41b8374ceb2450f514573e0543fc0762e0d4a2ac19956a3fbbe
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
