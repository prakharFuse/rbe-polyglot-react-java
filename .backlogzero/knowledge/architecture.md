---
name: architecture
description: Real module shape of the repo — two independent modules, no runtime link between them
type: knowledge
scope: global
updated: 2026-09-25 (IONE-959)
captured_sha: 72f6a07ec6f9ee9927e076dbb31961ff83c223be
sources:
  - src/main/java/demo/Money.java
  - web/src/pricing.js
  - web/src/CartSummary.jsx
  - README.md
sources_sha256:
  README.md: c7fad1bf964a5e3200ff214382ee4140ab0f21703c06ff5194b0e62b2cb97501
  src/main/java/demo/Money.java: ff3b629d5fa0dcfcc864580a3905570dcfd249038cf1a7409fb1db8f2ba1735b
  web/src/CartSummary.jsx: 2336e972f57fdb7dddc76592d45902b4594bb5cac96b0af6d8885e0f45a4113b
  web/src/pricing.js: 029795589661dce63a195fb34944cb2ec51a49ffb8b66220a23d0a63a36d66d8
---

```mermaid
flowchart TB
    subgraph Java["Java module (gradle test)"]
        Money["Money.java\nof / roundToCents / sum / floorAtZero"]
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
the other.

Both sides now implement the same half-up cents-rounding rule
(`Money#roundToCents` on the Java side, `roundToCents` in `pricing.js` on the
JS side — ties round away from zero, e.g. `-0.005` -> `-0.01`) as a
deliberate cross-language parity contract documented in README.md's
"Rounding" section. This is still not a runtime link — there is no shared
code or import between the two — the implementations are just meant to stay
in lockstep by convention. On the Java side, `Money` must be built via
`Money.of(String)` or `Money.of(double)` (which goes through
`BigDecimal.valueOf`), never `new BigDecimal(double)`, or parity with the JS
side breaks. `CartSummary.jsx` renders `pricing.js`'s output (including the
new `roundToCents` call) but is not itself exercised by any test — the pure
functions are what's under test.
