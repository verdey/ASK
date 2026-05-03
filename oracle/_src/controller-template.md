# Controller — `<ORACLE>` · `<REALM>`

<!--
  CONTROLLER TEMPLATE — Oracle copies this on first arc for an oracle.
  Fill <ORACLE>, <REALM>, dates, and the Thread Board / Ledger entries.
  Underscore-prefixed when written to disk (_controller-<oracle>.md) so
  it joins the gitignore-by-prefix convention used by session briefs.

  Source of truth = this file. Rendered surface = http://oracle.test.
  Oracle is the only writer; spells append History lines and flip their
  own Gate states per thread-protocol.md.
-->

**Last touched:** `<ISO-8601>` (`<ORACLE>`)
**Status:** active
**Arc:** A-1 (`<one-line arc title>`)
**Plan:** `</Users/verdey/.claude/plans/<plan-slug>.md>` <!-- SSOT for this arc's architecture; surfaced loudly on oracle.test -->

<!--
  PLAN FIELD (added 2026-04-30, plan-aware schema bump).
  - Required for orchestration-driven arcs. Optional for ad-hoc one-shot work.
  - Absolute path to the canonical plan doc. Use `—` if no plan exists yet.
  - The oracle.test surface renders this as a clickable link above the Thread Board.
  - When the arc shifts plans, update this field — it is the lineage signal.
-->

---

## 🚦 Thread Board

| Thread | Phase | Gate | Spell | Brief | Notes |
|---|---|---|---|---|---|
| `<oracle>.<realm-a>` | research | 🔓 ready | /ask | _briefs/`<oracle>.<realm-a>`.md | parallel sibling — wave 1 |
| `<oracle>.<realm-b>` | research | 🔓 ready | /ask | _briefs/`<oracle>.<realm-b>`.md | parallel sibling — wave 1 |
| `<oracle>.<realm-c>` | merge | 🔒 waiting-on:children=[`<realm-a>`,`<realm-b>`] | /knock | _briefs/`<oracle>.<realm-c>`.md | merge thread — flips to 🔓 when siblings ship |

<!--
  Gate vocabulary (canonical: see _src/thread-protocol.md §Gate).
  Single-thread forms: 🔓 ready · ▶ running:<phase> · ✓ done · 🔒 waiting-on-<x> · ✗ blocked
  Merge-gate forms:    🔒 waiting-on:children=[a,b,c]  ·  🔒 waiting-on:oracle=<other>.<thread>
  Oracle is sole writer of 🔓 / 🔒. Spells write ▶ / ✓ / ✗.

  Briefs: each Brief column entry follows _src/session-brief-template.md
  (controller-obligation block + Spec/Touch/Tools checklist + Validator AAR).
-->

## 📋 Plans

<!--
  Plan-register table (added 2026-04-30, wu-wei v2 schema bump).
  - SSOT for which plan each thread is executing. Never duplicate plan paths in briefs.
  - Spell appends a row on entry, after drafting plan and validating it against Spec/Touch/Tools.
  - Validator subagent (see thread-protocol.md §Validator) writes the Validator column glyph
    on its post-execution audit pass: ✓ (clean) / ⚠ (deviations — see Validator AAR) / —
    (skipped, with reason in Validator AAR).
  - oracle.test renders this table inline; api.php signals collector counts ⚠ rows for nav-orb amplitude.
  - On thread seal (✓ shipped / ✗ cancelled), the Validator column MUST be sealed (✓ or — with reason),
    never left as `pending` or stale.
-->

| Thread | Plan path | Drafted | Validator | Last touched |
|---|---|---|---|---|
| `<oracle>.<realm-a>` | `~/.claude/plans/<thread-id>.md` | `<ISO-8601>` | — | `<ISO-8601>` |

## 📜 Thread ledgers

### `<oracle>.<realm-a>`
- **Phases:** research → brief → exec → seal
- **Current:** research (🔓 ready)
- **Recommended model:** Sonnet 4.6
- **History:**
  - `<ISO-8601>` · birth · 🔓 ready by `<oracle>`
- **Next spell to paste:**
  ```
  /ask <oracle>.<realm-a> is your agent name. Controller: <ABS-PATH>
  ```

<!-- Repeat one H3 ledger per thread. -->

## 🗝 Decisions

<!--
  Embed 7-part [DECISION] blocks here for any non-obvious choice.
  Cross-link to /surface decision cards (decisions.test) when off-thread input is needed.
-->

## 📂 Open seals

<!--
  Pause briefs (docs/sessions/_pause-*.md) Oracle is carrying forward.
  Each line: path · one-line intent · why it's still open.
-->

## 🌀 Arc history

<!--
  When Arc-1 closes and Arc-2 opens, fold Arc-1 into a collapsed block here.
  The Thread Board above always shows the active arc.
-->

## 🪞 Surface-pulse cadence

> **🪞 Surface-pulse cadence.** After every gate-flip batch — and before claiming any wave "shipped" to the user — fetch the relevant `*.test` rendered surface (`https://oracle.test/oracle.php?name=<self>` AND `https://alpha.test/api.php?action=codebase-status`) and diff against the controller's just-written state. Patch any mismatch (stale gates, missing rows, parser drift) before surfacing. The forced check exists because written state and rendered state can silently diverge — and "I claimed shipped" without a render-check is unverified theater.

- After every gate-flip, curl `https://oracle.test/oracle.php?name=<self>` — confirm gate emoji renders
- After every wave seal, curl `https://alpha.test/api.php?action=codebase-status` — confirm thread state in JSON matches
- Before declaring "shipped" to user, scan rendered output for stale rows / missing items

<!--
  Surface-pulse is not optional. The controller is the substrate; the surface
  is the witness. Drift between them is the failure mode that makes
  oracle-board lie. Pulse closes the loop.
-->
