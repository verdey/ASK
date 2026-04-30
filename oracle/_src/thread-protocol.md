# Thread Protocol — Controller-mode orchestration

> Canonical reference for the **gated-thread** orchestration model used by `/oracle` and consumed by spells (`/knock`, `/ask`, others). The controller doc is the single source of truth; this protocol defines its semantics.

## Vocabulary

### Phase

A discrete unit of work within a thread's lifecycle. Phase names are per-thread; defaults are below but each thread declares its own phase set in its ledger.

| Default phase set | Use when |
|---|---|
| `research → brief → exec → seal` | Code-shipping thread (most common) |
| `research → write → ship` | Docs-only thread |
| `audit → propose → ship` | Methodology / tuning thread |
| `scaffold → exec → seal` | Substrate-creation thread |

A thread is always in exactly one phase. Phase advancement is Oracle's gate-flip.

### Gate

A field on each thread row in the controller's Thread Board. Five values:

| Gate | Meaning | Who writes |
|---|---|---|
| `🔓 ready` | Oracle has cleared this phase to start. Dan can paste the spell into the thread tab. | Oracle |
| `▶ running:<phase>` | Spell tab is currently executing this phase. | Spell (on entry) |
| `✓ done` | Phase complete; thread idle awaiting Oracle's next-phase advance. | Spell (on completion) |
| `🔒 waiting-on-<thread\|phase\|signal>` | Blocked on dependency. Tab should not be opened yet. | Oracle |
| `✗ blocked` | Phase failed; needs Oracle attention. | Spell (on error) or Oracle |

**Oracle is the only writer of `🔓 ready` and `🔒 waiting-on-*`.** Spells flip into `▶ running:*` on entry and into `✓ done` or `✗ blocked` on exit. Advancing a thread to the next phase is always Oracle's gate-flip.

### Merge gates and self-budding waves

Two compact gate forms fit inside the existing Gate column to express parallel waves and cross-oracle handoffs without changing the schema:

| Gate form | Meaning |
|---|---|
| `🔒 waiting-on:children=[a,b,c]` | This thread (typically a parent / merge thread) is blocked until every listed sibling thread under the same oracle shows `✓ shipped` (or `✓ done` for non-final phases). When all children clear, the kingdom surface flags this thread as **merge-ready** and Oracle flips it to `🔓 ready`. |
| `🔒 waiting-on:oracle=<other-oracle>.<thread-id>` | Cross-oracle gate — this thread is blocked until the named thread on another oracle's controller reaches `✓ shipped`. Oracle is still the sole writer; the surface signals readiness. |

These forms make explicit what was previously informal (e.g. `glass.focal` sealing `camila.alpha` after its children ship). The bracketed list of children may grow mid-flight as new sibling threads bud — self-budding waves are the same shape, just with the parent's children list extending alongside the Thread Board rows.

Oracle never auto-flips a merge gate. The surface (`oracle.test`, `api.php?action=kingdom-status`) emits a `merge_ready` signal when conditions are satisfied; Oracle reads it, reviews the children's AARs, then flips deliberately.

## Brief lifecycle

Every per-thread brief — `<project-root>/docs/sessions/_briefs/<thread-id>.md`, linked from the Thread Board's Brief column — follows the canonical shape in [`session-brief-template.md`](session-brief-template.md). Three contracts the brief upholds:

1. **Link back to the parent oracle / controller** in the obligation block at the top. The brief never floats unmoored.
2. **Defer in operations to the oracle's gates.** When Phase 3 hits a `🔒` boundary (merge-gate, cross-oracle), the brief halts and surfaces the block; it does not route around the controller.
3. **End with AAR + controller-history update.** Phase 4 fills the AAR section and appends the matching History line to the controller's `## 📜 Thread ledgers` for this thread.

The brief walks four phases by default — **stub → elaborated tech spec → implemented & checked → AAR + controller update**. Override modes (`/arriba`, GSD, explicit "wu wei" instruction) collapse Phases 1–3 into a single continuous execution; the obligation block and Phase 4 AAR remain mandatory in every mode.

### Thread

A named lane that walks through its phase set. Identifier: `<oracle>.<realm-member>` (e.g. `renata.farfalle`). One thread = one long-lived tab in Dan's Claude Code app.

## Spell-entry contract

A spell that supports controller-mode accepts a paste-string of this shape:

```
/<spell> <thread-id> is your agent name. Controller: /abs/path/_controller-<oracle>.md
```

On entry, the spell MUST:

1. **Read** the controller file at the absolute path.
2. **Locate** its row in the Thread Board by `<thread-id>`.
3. **Verify** Gate field is `🔓 ready`. If not, refuse to proceed and surface the actual gate state to Dan; do not mutate.
4. **Read** the thread's `Phase`, `Brief` (linked file path), and `Phases:` list from its ledger.
5. **Flip** Gate to `▶ running:<current-phase>` and append a History line: `<ISO-8601> · <phase> · ▶ started · agent <thread-id>`.
6. **Execute** per the spell's own playbook, using the linked brief if present.
7. **On completion**:
   - Append History line: `<ISO-8601> · <phase> · ✓ done · <one-line summary>`.
   - Flip Gate to `✓ done`.
   - Write any AAR fields into the linked brief (unchanged from legacy).
8. **On failure**:
   - Append History line: `<ISO-8601> · <phase> · ✗ blocked · <reason>`.
   - Flip Gate to `✗ blocked`.
   - Stop. Do not retry; do not advance.
9. **Stop.** Tab idles awaiting Oracle's next gate-flip.

Backwards compatibility: legacy `Brief: <abs-path>` paste-string remains supported for one-shot, non-orchestrated invocations.

## Oracle's gate-flip loop

Oracle's session is long-lived in controller-mode. After writing the controller and presenting first-moves, Oracle idles. When Dan returns and signals a thread completion (or asks Oracle to advance), Oracle:

1. Reads the controller fresh.
2. For each thread with Gate `✓ done`: reviews the History line + linked brief AAR.
3. Decides: advance to next phase (`Phase: <next>`, Gate: `🔓 ready`), branch into a new thread (rare), or seal as `✓ shipped`.
4. Writes the controller (mutates Phase + Gate + appends ledger note).
5. Returns to Dan: the next paste-string for that thread's same tab.
6. Touches `oracles.md` `Last touched:` field.

Oracle never auto-advances. Every gate-flip is a deliberate human-in-the-loop touch — preserves Dan's review surface.

## Controller schema (canonical)

See `controller-template.md` for the renderable form. Required sections:

- H1 title with oracle name + realm
- `**Last touched:**`, `**Status:**`, `**Arc:**` metadata
- `## 🚦 Thread Board` table (Thread · Phase · Gate · Spell · Brief · Notes)
- `## 📜 Thread ledgers` — one H3 per thread with `Phases:` / `Current:` / `History:` / `Next spell to paste:`
- `## 🗝 Decisions` — 7-part decision blocks, deck links
- `## 📂 Open seals` — pause briefs Oracle is carrying

## Termination

A controller arc ends when every thread is `✓ shipped` or sealed via `/pause`. At that point Oracle:
- Flips controller `Status:` to `paused` or `retired`.
- Flips its own `oracles.md` block status.
- Optionally archives by renaming the controller `_controller-<oracle>.md` → `_controller-<oracle>-arc<N>-sealed.md` if a fresh arc is starting.

## Surface

The kingdom-rendered view lives at `http://oracles.test`. It is read-only over the controller markdown. The filesystem is the substrate; the surface is the lens.
