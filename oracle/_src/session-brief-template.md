# `<thread-id>` — `<wave>` · `<one-line title>`

<!--
  SESSION BRIEF TEMPLATE — sibling of controller-template.md.
  Oracle copies this to <project-root>/docs/sessions/_briefs/<thread-id>.md
  when populating the Brief column of the Thread Board.

  The brief is a thread's per-life document. It links back to its parent
  oracle's controller in the obligation block, defers in operations to
  the oracle's gates, and walks the four-phase lifecycle below.

  Override modes (/arriba, GSD, explicit "wu wei" instruction) collapse
  Phases 1–3 into one continuous run. Phase 4 (AAR + controller update)
  is non-negotiable in every mode.
-->

> ⚠️ **Controller obligation — link back + defer to oracle gates**
> **Parent oracle:** `<oracle.realm>` · **Controller:** `<ABS-PATH-TO-_controller-<oracle>.md>`
> **Before any work:** read the controller, locate this thread's row, verify Gate is `🔓 ready`, flip Gate to `▶ running:<phase>`, append History line: `<ISO-8601> · <phase> · ▶ started · agent <thread-id>`.
> **After each phase:** update controller History; if subsequent phases depend on a sibling/parent gate, halt and await Oracle's flip.
> **On completion:** flip Gate to `✓ done` (or `✓ shipped` if final phase), append History line, write the AAR section below.

**Recommended Model:** `<Haiku 4.5 | Sonnet 4.6 | Opus 4.7>` — `<one-line rationale>`
**Soul thread:** `<one sentence — what flow / realm / oracle family this brief belongs to and what larger arc it advances>`

---

## Lifecycle (default modus operandi)

Default mode (no `/arriba`, no GSD): work proceeds through these four phases, each gated by the controller. The brief grows as it walks: Oracle writes Phase 1 as a stub; the implementer fills Phase 2; Phase 3 happens in code with this file open as the contract; Phase 4 closes the loop.

- **Phase 1 — Stub.** Oracle writes Intent + Scope + Acceptance + open questions only. Controller Gate `🔓 ready:phase-1`. No code yet. Hand off to implementer.
- **Phase 2 — Elaborated tech spec.** Implementer reads the stub, fills the Tasks section with specifics (file paths, edge cases, exact ordering), confirms Acceptance is testable. Flip controller `🔓 ready:phase-1 → ▶ running:phase-1 → ✓ done` then await Oracle's `🔓 ready:phase-2`.
- **Phase 3 — Implemented & checked.** Code lands per the spec. Verification steps run. If a sibling/parent gate is `🔒` (merge-gate, cross-oracle dependency), halt at the boundary and surface the block. Phase ends when all Acceptance items are demonstrably met.
- **Phase 4 — AAR + controller update.** Fill the AAR below (What shipped / Deviations / Blockers / Next). Append the matching History line to the controller's `## 📜 Thread ledgers` for this thread. If the AAR's `Next:` points downstream, surface the next paste-string for Oracle's review.

**Override modes** (`/arriba`, GSD, "wu wei", explicit user override): collapse Phases 1–3 into a single continuous execution. The obligation block above and the Phase 4 AAR + controller update remain mandatory in every mode.

---

## Intent

`<one paragraph — what this thread accomplishes and why it matters>`

## Scope

**In:**
- `<bullet>`

**Out (do NOT touch):**
- `<bullet>`

## Acceptance

`<bulleted — what "done" looks like, demonstrably testable>`

- [ ] `<criterion>`

## Tasks (filled at Phase 2)

`<numbered list with absolute file paths — implementer fills>`

1. `<task>`

## Resolution (optional — sketch / design / research threads only)

`<doctrine extracted, variants chosen, references for downstream consumers>`

## AAR (filled at Phase 4)

**What shipped:**
**Deviations:**
**Blockers:**
**Next:**

<!--
  When this brief feeds a downstream wave, name the next thread-id and
  brief path here so Oracle can flip the next gate without spelunking.
-->
