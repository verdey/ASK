---
name: mariela
realm: coffee-drinks
status: retired
born: '2026-04-28T00:55-04:00'
last_touched: '2026-04-28T03:50-04:00'
project_scope: '/Users/verdey/Documents/Claude/Projects/Live/flows_deals (visibility-surface upgrade arc, audit-driven, 4 tiers — COMPLETE)'
nomenclature_realm: 'coffee-drinks (americano, cappuccino, cortado, doppio, espresso, flat-white, frappe, latte, lungo, macchiato, mocha, ristretto)'
---

## Children

- `mariela.americano` — Wave 0 / ⚡ Catalyst / Sonnet 4.6 — Tier 2: self-logging + Filesystem-Truth fix ✓ shipped
  - `mariela.cappuccino` — Wave 1 / ⚡ Catalyst / Sonnet 4.6 — Tier 1: filter bar + staleness rollup + snapshot diff ✓ shipped
  - `mariela.cortado` — Wave 2 / ⚡ Catalyst / Sonnet 4.6 — Tier 3: yq swap + pup swap + tools-register HTML extraction entry ✓ shipped (sections=9/9 broken=62/62 exact)
  - `mariela.doppio` — Wave 3 / ⚡ Catalyst / Sonnet 4.6 — Tier 4: excluded.html companion (76+5=81 surfaced) + meta-kind override in discover.sh ✓ shipped (inline-dispatched by Dan after model swap to Opus 4.7; 11/11 SC pass; 5 reason labels exercised)

## Open threads

- **Seven candidate lessons** pending `/flow curate-batch` (4 audit + 2 from Waves 1–2 + 1 from Wave 3 — *labeled exclusions surface their own omissions*).
  - **CLAUDE.md stack drift:** stack table still reads `html.parser`; should read `pup` + Python 3 + mention `excluded.html` companion artifact.
  - **No git repo at realm** — kingdom-level git init is the unblocking move if Dan wants 4-wave commit history.
  - **SC8 (live meta-kind override)** deferred as optional — grep parses cleanly (SC7 ✓); end-to-end live test needs a placed source HTML.

## Notes

Arc complete 2026-04-28T03:50. All four tiers shipped end-to-end. Wave 3 dispatched inline by Dan in `gsd` mode after Opus 4.7 model swap (departed from standard Oracle-ends-at-table flow on explicit user override). Pipeline now: discover (with labeled excludes + meta-kind peek) → curate (yq) → stitch (pup, with diff + excluded companions) → log + audit JSONL. Visibility surface end-to-end legible: shows what it has + what it's missing + what changed since last run. Family retired with no open code threads, only doc/maintenance carries.
