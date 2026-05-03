---
name: celia
realm: canyons
nomenclature_realm: US Southwest canyon names
status: retired
born: 2026-04-30
arc_sealed: 2026-04-30T15:50:00-04:00
retired: 2026-04-30T15:50:00-04:00
last_touched: 2026-04-30T15:50:00-04:00 (☠ ARC RETIRED by glass — all 4 children ✓ shipped under /arriba; topo.test live; CLAUDE.md valet table updated; manifest.json carries entry. Re-birth fresh oracle if topo.test grows new ops.)
project_scope: /Users/verdey/Documents/Claude/Projects/Tooling/git-topo
---

## Project

Build `topo.test` — codebase git topology surface. Visual map of all 28 git repos + ~20 unversioned active dirs across the 6 namespaces (Council, Finance, Labs, Live, Tooling, Root/Shared). Per-directory action menus (Move to, Archive & remove, Refresh) wired to PHP backend + shell scripts. Scaffolded stubs for future ops (Init repo, Add remote, Push, etc.) visible as backlog-badged disabled menu items.

The thesis: Dan's `*.test` interface plane gets an AI-assisted surface for keeping the codebase fractally healthy — structure, scope, recency, and operational efficiency — seeded from today's survey, growing with the codebase.

## Children

- celia.antelope — Wave 0 — scaffold dir + _BACKLOG.md + Herd symlink — ✓ shipped
- celia.bryce — Wave 1a — backend: _lib/git-scan.php + _lib/path-guard.php + api.php + bin/move-realm.sh + bin/archive-realm.sh — ✓ shipped
- celia.copper — Wave 1b — frontend: index.php with chosen design (1B nesting + 2B menu + 3B alerts) — ✓ shipped
- celia.denali — Wave 2 (merge) — wire-up: CLAUDE.md valet table + manifest.json + smoke test — ✓ shipped (under /arriba, executed by Oracle directly)

## Open threads

(none — first invocation)

## Notes

- Plan source: `/Users/verdey/.claude/plans/git-topo-review-purring-eclipse.md`
- Sketch picks locked: **1B** (spine + tab connector), **2B** (card menu with sections), **3B** (rich alert cards with inline commands)
- Sketch artifacts: `/tmp/sketch-topo/` (1a/1b/1c, 2a/2b, 3a/3b)
- Survey baked into plan: 28 repos · 15 with remote · 13 local-only · 3 anomalies (steaz.io unpushed, HoloNav nested, harvester-runtime 145M unversioned)
- Herd slug: `topo` → `http://topo.test/`
- Tech stack mirrors oracle-board / planq-board / flow-queue patterns: PHP localhost-only trust boundary, `_lib/` for shared modules, `_assets/` symlink to codebase root, `bin/` for shell scripts
