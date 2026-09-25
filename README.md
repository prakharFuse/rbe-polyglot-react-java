# rbe-polyglot-react-java

**Journey-suite fixture — j131, IONE-1773 (one check list, not two slots).**

This repository is POLYGLOT ON PURPOSE. It has two test suites:

| suite | command | toolchain |
| --- | --- | --- |
| Java | `gradle test` | JDK 17 + JUnit |
| JavaScript | `node --test web/test/*.test.js` | node, zero deps |

Three properties are load-bearing. Changing any of them silently stops the
journey testing anything:

1. **Both suites must really run in the microVM.** The Java side follows
   `rbe-gradle-resolve`: a third-party plugin through `plugins { }` and a
   declared `mavenCentral()`, so the registry loopback is exercised. The JS
   side uses `node --test` and imports nothing, so it cannot fail for install
   reasons — a suite that can fail for environment reasons cannot distinguish
   "the gate never ran it" from "it ran and the environment was wrong".
2. **The defect is on the JAVASCRIPT side** (`web/src/pricing.js`). Gradle is
   the "obvious" single command for this repo, so a one-slot gate runs gradle,
   sees green, and reports verified while the broken suite never executed.
   Move the defect to the Java side and the journey passes against the OLD
   code — it stops proving anything.
3. **The Java suite must stay GREEN on main.** j131 asserts that every
   configured check RUNS; a red main cannot tell a working gate from a broken
   build.

## Rounding

Both paths round half-up to two decimals: `demo.Money#roundToCents` on the
Java side, `roundToCents` in `pricing.js` on the JS side. Ties round away
from zero (e.g. `-0.005` rounds to `-0.01`, not `0.00`). On the Java side,
amounts must be constructed from a decimal string (`Money.of(String)`) or via
`BigDecimal.valueOf` (`Money.of(double)`) — never `new BigDecimal(double)`,
which captures the raw binary value of the double and breaks parity with the
JS implementation.

Re-provision: `tests/journeys/scripts/provision-polyglot-fixtures.ts`.
