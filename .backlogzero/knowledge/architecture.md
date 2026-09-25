---
name: architecture
description: Real module shape of the repo — two independent modules, no runtime link between them
type: knowledge
scope: global
updated: 2026-09-25 (IONE-959)
captured_sha: efbe6193184f3bdbe01c1c72f0dfa26fbe356d96
sources:
  - src/main/java/demo/Money.java
  - web/src/pricing.js
  - web/src/CartSummary.jsx
  - README.md
sources_sha256:
  README.md: e993c5467c8401f089979067254ec63e6d17f928aecb552410759abe5cc25816
  src/main/java/demo/Money.java: 36ac98847d90dfa4cdfb6f0141750ce58bbf8bafe4c53f58f6e439a7b3ebd0d5
  web/src/CartSummary.jsx: 2336e972f57fdb7dddc76592d45902b4594bb5cac96b0af6d8885e0f45a4113b
  web/src/pricing.js: 6f1b9ecae3ec551c7fd7e75cd941a89cf63b09c0ac534ba67662db8282efb169
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
the other. Both now also expose a `roundToCents` (half-up, ties away from
zero) — see README.md's "Rounding" section, which names these two
implementations as the pair that must agree on the same inputs. `CartSummary.jsx`
renders `pricing.js`'s output (`roundToCents(cartTotal(...))` for the
subtotal, `applyDiscount(...)` for the payable amount) but is not itself
exercised by any test — the pure functions are what's under test.
