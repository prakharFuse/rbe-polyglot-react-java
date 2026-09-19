---
name: code-style
description: Comment and formatting conventions used in the Java and JS sources
type: convention
scope: global
updated: 2026-09-19 (IONE-959)
captured_sha: 31ae07b64f13a194041d0958b9548d6d2ff76894
sources:
  - build.gradle.kts
  - src/main/java/demo/Money.java
  - web/src/pricing.js
  - web/src/CartSummary.jsx
sources_sha256:
  build.gradle.kts: 0f2a531ab2e8f15bdeddb35da942ae49abc40d581314cdce4a7c7a331d114268
  src/main/java/demo/Money.java: 577563fbf0454e49225c00d9161cd34e39557173c3093286c7c6980bf815ec48
  web/src/CartSummary.jsx: be7506d7244ab667d201b6aa63a8b829bade1620ea09c182ea42f7ed0434ae03
  web/src/pricing.js: eb0dfe8b94a0ba36bc49d2bebcb8de7ada2416b0a2fc9bacb804f5e249f1b139
---

## Java

- Formatted with `spotless` (`com.diffplug.spotless` plugin), configured to
  `removeUnusedImports()` only — no opinionated formatter (e.g. `googleJavaFormat`)
  is wired up, so don't assume spotless will reformat whitespace/line length.
- `Money.java`'s class comment states "ASCII only, deliberately" — keep new
  Java source in this package ASCII-only unless you have a reason to deviate.
- Every public method has a one-line Javadoc summarizing behavior in cents
  (`/** Sum of every amount, in cents. */`), not parameter-by-parameter
  `@param`/`@return` blocks.

## JavaScript / JSX

- Functions use JSDoc-style `/** ... */` block comments above the
  `export function`, in prose, not `@param`/`@returns` tags.
- Where a function encodes a known defect or a deliberate design constraint
  (see ../knowledge/gotchas.md), the comment says so explicitly in the source
  rather than leaving it implicit — follow this pattern for any comment that
  documents non-obvious or intentionally-imperfect behavior.
- No semicolon-free style — both `.js` and `.jsx` files here consistently
  terminate statements with semicolons.
