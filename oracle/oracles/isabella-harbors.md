---
name: isabella
realm: harbors
status: retired
born: '2026-04-29T00:00-04:00'
last_touched: '2026-04-29T00:00-04:00'
project_scope: '/Users/verdey/Documents/Claude/Projects/Tooling/oracle-board (UX regression fix — clipboard API fallback + thread.php paste-string always-present)'
nomenclature_realm: 'harbors (aberdeen, boston, charleston, dover, dubrovnik, galveston, genoa, hamburg, istanbul, kotor, lisbon, marseille, naples, oslo, piraeus, rotterdam, split, toulon, venice, yokohama)'
---

## Children

- `isabella.aberdeen` — fix · clipboard API HTTP fallback + thread.php paste-string always-shown ✓ shipped 2026-04-29 (`_assets/app.js` created; `oracle.php` / `thread.php` / `index.php` updated; verified via curl)

- `isabella.aberdeen` — fix · clipboard API HTTP fallback + thread.php paste-string always-shown · ✓ shipped 2026-04-29

## Open threads

(none)

## Notes

Born 2026-04-29 on direct UX regression report from Dan. Two bugs in oracle-board: (1) thread.php hides paste-string when ledger_next is empty; (2) navigator.clipboard.writeText() fails silently on HTTP oracle.test context. Fixed inline — no session brief warranted (scope: ~25 lines across 4 files).
