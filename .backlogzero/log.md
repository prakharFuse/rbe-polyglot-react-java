2026-09-22 · first-run · created .backlogzero
511efba6-c8fa-45af-97f1-718848e07820: corrected knowledge/overview.md — 'Known issue' section was stale; web/src/pricing.js's applyDiscount defect (per-line vs per-order discount) is now fixed in code (PST-1)
511efba6-c8fa-45af-97f1-718848e07820: flagged divergence — README.md claims the intentional fixture defect lives in web/src/pricing.js, but that defect has been fixed in code
2026-09-22 · 511efba6-c8fa-45af-97f1-718848e07820 · corrected knowledge/overview.md — README.md#L21-L25 is stale (web/src/pricing.js's applyDiscount now computes the discount once against the order total and floors at zero (per PST-1 commits) — the documented defect no longer exists in the code.)
7af7c513-1d70-4177-92e6-2e5d470d02bc: regenerate knowledge/architecture.md — Money.java/pricing.js diagram and parity note updated for new roundToCents (half-up cents rounding) added to both sides
7af7c513-1d70-4177-92e6-2e5d470d02bc: regenerate conventions/testing.md — reconfirmed unchanged commands/frameworks, noted new mirrored rounding-parity test cases in both suites
7af7c513-1d70-4177-92e6-2e5d470d02bc: correct knowledge/overview.md — Layout function lists for Money.java and pricing.js were missing the new roundToCents helper
