---
name: code-style
description: Comment and doc conventions observed in the small existing codebase.
type: convention
scope: global
updated: '2026-09-19'
captured_sha: 31ae07b64f13a194041d0958b9548d6d2ff76894
sources:
  - src/main/java/demo/Money.java
  - web/src/pricing.js
sources_sha256:
  src/main/java/demo/Money.java: 577563fbf0454e49225c00d9161cd34e39557173c3093286c7c6980bf815ec48
  web/src/pricing.js: eb0dfe8b94a0ba36bc49d2bebcb8de7ada2416b0a2fc9bacb804f5e249f1b139
---

- **ASCII-only comments, on purpose.** `Money.java`'s class doc says so
  explicitly ("Cent arithmetic for the order service. ASCII only,
  deliberately."). Follow this in both stacks — no smart quotes, em dashes,
  or non-ASCII symbols in comments or docstrings.
- **Explain the *why*, not the *what*.** Existing comments (e.g. the header
  in `web/src/pricing.js`, the defect note above `applyDiscount`) describe
  intent, constraints, and known defects rather than restating the code.
  Match that density and purpose when adding comments — don't add
  line-by-line narration.
