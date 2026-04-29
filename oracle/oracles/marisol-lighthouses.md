---
name: marisol
realm: lighthouses
status: retired
born: '2026-04-28T20:30-04:00'
last_touched: '2026-04-28T21:30-04:00 (arc sealed — all 3 waves ✓ shipped; /surface live in roster at 15 skills; status active→paused)'
project_scope: '/Users/verdey/Documents/Claude/Projects (kingdom-level — `/surface` skill + decision-queue substrate co-design arc)'
nomenclature_realm: 'lighthouses (alexandria, bishop, cordouan, dover, eddystone, faro, godrevy, hook, montauk, ocracoke, pharos, smalls, trinity, ushant, yaquina)'
---

## Children

- `marisol.alexandria` — Wave 0 / ⚡ Catalyst / Sonnet 4.6 — additive substrate ✓ shipped 2026-04-28 (Decisions/ + Tooling/decision-queue/ + decisions.test 200 OK + api.php cases `decisions/decision/resolve` live + manifest.openDecisions=0 + refresh-manifest.sh extended + SURFACE-SKILL-SPEC.md frozen)
  - `marisol.bishop` — Wave 0p / 👁️ Visionary / Haiku 4.5 — entropy scan ✓ shipped 2026-04-28 (verdict **TUNE**, 5 precision findings; top: http→https self-peek mismatch; findings at `_surface-W0p-bishop-findings.md` — addressed in cordouan)
  - `marisol.cordouan` — Wave 1 / ⚡ Catalyst via anthropic-skills:skill-creator / Sonnet 4.6 — `/surface` skill ✓ shipped 2026-04-28 (live in roster at 15 skills incl. /portal /compass /triage; inode parity 20457889; description present in active skills list)

## Open threads

- **Wave 2 (deferred, retargeted 2026-04-28T20:55)** — `/portal` + `/triage` shipped via aurora.leo. Decision-queue integration now routes through skill-owned surfaces, not aurora.taurus's hand-crafted `index.html`. Wave 2 will: (a) extend `/triage`'s signal-source registry to include `Decisions/*/state.json` open entries; (b) extend `/portal`'s card-doctrine to render an openDecisions chip per its schema. Strict improvement over the original "plug into taurus's 4-band layout" plan. Dispatches after Wave 1 ships.
  - **Resolution-loop reflux** (deferred v2) — currently resolved decisions persist; Dan reads them async and tells the next session by hand. A future iteration could read `Decisions/<slug>/state.json.resolution` back into a live thread via `/pause`-style memory injection. Out of scope for v1.

## Notes

Born 2026-04-28T20:30 from `/skillz audit` of Dan's "/surface" capability ask. Skillz verdict: hybrid CREATE+BUILD; cannot split — substrate and skill must co-design. Aurora is sister-active at kingdom scope on Arc-3 portal evolution; alexandria's brief is **strictly additive** (no `index.html` edits, no realm-directory edits) to avoid stomping aurora.taurus's pending 4-band restructure. Realm `lighthouses` chosen for thematic resonance with the skill's purpose (surfacing decision-points like coastal beacons). Aurora's `constellations` realm is fully consumed (17/17), reinforcing the choice to birth fresh rather than extend. **No git repo at kingdom root** — Wave 0 commits N/A. Council/ASK has its own repo — Wave 1 commits there.
