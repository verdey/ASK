# Controller — `<ORACLE>` · `<REALM>`

<!--
  CONTROLLER TEMPLATE — Oracle copies this on first arc for an oracle.
  Fill <ORACLE>, <REALM>, dates, and the Thread Board / Ledger entries.
  Underscore-prefixed when written to disk (_controller-<oracle>.md) so
  it joins the gitignore-by-prefix convention used by session briefs.

  Source of truth = this file. Rendered surface = http://oracles.test.
  Oracle is the only writer; spells append History lines and flip their
  own Gate states per thread-protocol.md.
-->

**Last touched:** `<ISO-8601>` (`<ORACLE>`)
**Status:** active
**Arc:** A-1 (`<one-line arc title>`)

---

## 🚦 Thread Board

| Thread | Phase | Gate | Spell | Brief | Notes |
|---|---|---|---|---|---|
| `<oracle>.<realm-member>` | research | 🔓 ready | /ask | _briefs/`<thread>`.md | one-line intent |

<!--
  Gate vocabulary (from thread-protocol.md):
    🔓 ready                  — Oracle cleared this phase to start
    ▶ running:<phase>         — spell tab currently executing
    ✓ done                    — phase complete, awaiting Oracle's next-phase advance
    🔒 waiting-on-<x>         — blocked on dependency
    ✗ blocked                 — failed; Oracle attention needed

  Oracle is sole writer of 🔓 / 🔒. Spells write ▶ / ✓ / ✗.
-->

## 📜 Thread ledgers

### `<oracle>.<realm-member>`
- **Phases:** research → brief → exec → seal
- **Current:** research (🔓 ready)
- **Recommended model:** Sonnet 4.6
- **History:**
  - `<ISO-8601>` · birth · 🔓 ready by `<oracle>`
- **Next spell to paste:**
  ```
  /ask <oracle>.<realm-member> is your agent name. Controller: <ABS-PATH>
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
