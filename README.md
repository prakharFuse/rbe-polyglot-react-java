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
2. **The JAVASCRIPT suite must run too.** The PST-1 defect in
   `web/src/pricing.js` is fixed: `applyDiscount` takes the discount off the
   order total once and floors the result at zero. Gradle is still the
   "obvious" single command for this repo, so a one-slot gate would run
   gradle, see green, and report verified while `web/test/` never executed —
   both suites must run for a change here to count as validated.
3. **The Java suite must stay GREEN on main.** j131 asserts that every
   configured check RUNS; a red main cannot tell a working gate from a broken
   build.

Re-provision: `tests/journeys/scripts/provision-polyglot-fixtures.ts`.
