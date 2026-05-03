# `<thread-id>` — `<one-line title>`

<!--
  SESSION BRIEF TEMPLATE — wu-wei v2 (2026-04-30).
  Oracle copies this to <project-root>/docs/sessions/_briefs/<thread-id>.md
  when populating the Brief column of the Thread Board.

  Shape: thin, parseable, checklist-first. The top sections form a
  machine-ingestible contract a subagent can act on cold without reading
  the prose context. Plan path is registered ONLY in the controller's
  ## 📋 Plans table, never duplicated here.

  Override modes (/arriba, GSD, "wu wei"): obligation block + Spec ticks +
  AAR + Validator dispatch remain mandatory.
-->

> ⚠️ **Controller obligation — link back + defer to oracle gates**
> **Parent oracle:** `<oracle.realm>` · **Controller:** `<ABS-PATH-TO-_controller-<oracle>.md>`
> **On entry:** read the controller, locate this thread's row, verify Gate is `🔓 ready`, draft a plan at `~/.claude/plans/<thread-id>.md`, validate plan against this brief's `## Spec` + `## Touch` + `## Tools` (surface conflicts as `✗ blocked`), append a row to the controller's `## 📋 Plans` table, then flip Gate to `▶ running:<phase>` and append History line: `<ISO-8601> · <phase> · ▶ started · agent <thread-id>`.
> **After each phase:** update controller History; if subsequent phases depend on a sibling/parent gate, halt and await Oracle's flip.
> **On completion:** dispatch the Validator subagent (see thread-protocol.md §Validator) as your final move BEFORE announcing `✓ done`. Once Validator has written its glyphs and Validator AAR, flip Gate to `✓ done` and append History line.

**Recommended Model:** `<Haiku 4.5 | Sonnet 4.6 | Opus 4.7>` — `<one-line rationale>`

---

## Spec

<!--
  Verifiable deliverables. Each bullet is a checkbox.
  Executor ticks `- [x]` as items land.
  Validator appends inline glyph: `- [x] ✓ <item>` (verified) or `- [x] ⚠ <item>` (claimed but unverified — see Validator AAR).
  One list, two writers. No mirror status sheet.
-->

- [ ] `<verifiable change 1>`
- [ ] `<verifiable change 2>`
- [ ] `<verifiable change 3>`

## Touch

<!--
  Permissioned scopes. Absolute paths.
  `!` prefix = explicitly forbidden / out of scope.
  Validator greps the diff against !Forbid lines; any hit → ⚠ on the spec items they affect.
-->

- **Read:** `<abs path>`, `<abs path>`
- **Write:** `<abs path>`, `<abs path>`
- **!Forbid:** `<abs path or operation>`

## Tools

<!--
  Allowed shell commands and /skill invocations. One per bullet.
  Anything not listed here is out of scope; the executor surfaces a `✗ blocked` if it needs more.
-->

- `<command or /skill>`
- `<command or /skill>`

## Context (optional)

<!--
  One paragraph of problem + direction. Reading is encouraged but not required —
  the Spec + Touch + Tools above form the executable contract. Skip this section
  for trivial / mechanical threads.
-->

`<problem statement + direction>`

---

## Execution Notes

<!-- Executor fills during run: decisions, deviations, blockers. -->

## AAR

<!-- Executor fills at completion. -->

- **Outcome:** `<one-line result>`
- **Files touched:** `<list>`
- **Surface-pulse:** `<URL hit + diff confirmed at <ISO>; gate render verified>`
- **Deviations:** `<any from scope / brief>`

## Validator AAR

<!--
  Validator subagent fills this. Read-only across codebase; verifies each Spec
  item via `git diff` + targeted disk reads — never trusts the executor's AAR prose.
  Writes inline ✓/⚠ on Spec checkboxes above. Updates controller `## 📋 Plans` Validator column.
-->

- **Verified:** `<count of ✓ items>` / `<total>`
- **Flagged:** `<count of ⚠ items, with one-line reason each>`
- **!Forbid breaches:** `<none | list of forbidden paths touched>`
- **Glyph written to controller:** `✓ | ⚠ | —`

<!--
  When this brief feeds a downstream wave, name the next thread-id and
  brief path here so Oracle can flip the next gate without spelunking.
-->
