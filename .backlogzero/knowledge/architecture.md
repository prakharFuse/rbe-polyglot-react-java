---
name: architecture
description: Real module shape of the repo — two independent modules, no runtime link between them
type: knowledge
scope: global
updated: 2026-09-26 (IONE-959)
captured_sha: 9f8c0c907a349231488e4d98cf28126c14cfff37
sources:
  - src/main/java/demo/Money.java
  - web/src/pricing.js
  - web/src/CartSummary.jsx
  - README.md
sources_sha256:
  README.md: e33f2cfcaa1cef1d554d20bd984192274c04f7b04c48554df62e15f54a1a0288
  src/main/java/demo/Money.java: 490002cbe263439039012b2680de1c7d46a8a01917bf0e3c09683d3fbd45ac6c
  web/src/CartSummary.jsx: 4e08248030548520d77ac1db95f324dcdb2158eb828206de79a1b000cae57b03
  web/src/pricing.js: f63966141dbd58781c7c2e40ad1f883ebc9ddd132dac980773e43b937416fae8
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

`Money.java` and `pricing.js` each now also implement `roundToCents`, a
HALF_UP round-to-two-decimals rule (README.md "Rounding" section). This is
parallel implementation, not shared code — there's still no runtime link —
but both are expected to agree bit-for-bit on the same input, and both suites
assert identical fixtures (`1.005 -> 1.01`, `2.344 -> 2.34`, `-1.005 -> -1.01`)
to keep them honest. `roundToCents` on both sides takes a dollar-scale amount,
not cents: `CartSummary.jsx` must divide `cartTotal(lines)` by 100 before
calling it (a prior version rounded the raw cent total and was fixed in
PT-2283).
