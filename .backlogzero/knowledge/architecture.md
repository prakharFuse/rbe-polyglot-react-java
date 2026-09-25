---
name: architecture
description: Real module shape of the repo — two independent modules, no runtime link between them
type: knowledge
scope: global
updated: 2026-09-25 (IONE-959)
captured_sha: 4f06e533e96f3f54cb79c1d224eb2ca3643e4d98
sources:
  - src/main/java/demo/Money.java
  - src/test/java/demo/MoneyTest.java
  - web/src/pricing.js
  - web/src/CartSummary.jsx
  - web/test/pricing.test.js
  - README.md
  - package.json
  - build.gradle.kts
sources_sha256:
  README.md: f178e7c7c2be47d428b2f810cd5ec92f5acd9194e47eecd448af2c9298f4606a
  build.gradle.kts: 0f2a531ab2e8f15bdeddb35da942ae49abc40d581314cdce4a7c7a331d114268
  package.json: dfe52e7d066dcf11affc72f3b3e1e875795635aa53a70e755f420180d11c7f57
  src/main/java/demo/Money.java: 9ea4cf0890d38a880cd6fec4db97db3da97d319276ba439709af09b3b7bb7210
  src/test/java/demo/MoneyTest.java: 984e72f9fbc3a82528dbef22710d874d0884a49cfc3a9e46f0250f494d3ccd74
  web/src/CartSummary.jsx: 2336e972f57fdb7dddc76592d45902b4594bb5cac96b0af6d8885e0f45a4113b
  web/src/pricing.js: 8130829711c44a34709f954c198342433b8345513dd07e10f57699f5d585efdd
  web/test/pricing.test.js: 9986d6f5be1d0d8ccc1bf638417c76c1c0bd299aa2c9ee9bdf1ba8cf22b79987
---

```mermaid
flowchart TB
    subgraph Java["Java module (gradle test)"]
        Money["Money.java\nsum / floorAtZero / roundToCents"]
        MoneyTest["MoneyTest.java"]
        MoneyTest -->|asserts| Money
    end

    subgraph JS["JS module (node --test)"]
        Pricing["pricing.js\ncartTotal / applyDiscount / roundToCents"]
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

Both modules now also carry a `roundToCents` helper (`Money.roundToCents()`
in Java, `roundToCents(amount)` in `pricing.js`) implementing the same
half-up rounding rule, per README.md's "Rounding" section. These are two
independently-written, mirrored implementations kept in sync by convention
(each doc-comments the other) — not shared code, and still no runtime link
between the modules.
