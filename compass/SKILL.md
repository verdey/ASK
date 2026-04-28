---
name: compass
description: "🧭 Compass — Holographic navigation primitive. Owns N/S/E/W/Z gesture doctrine, iOS touch bindings, and ARIA accessibility contract for directional navigation surfaces. Read-only over app surfaces; mutates only its own knowledge base."
argument-hint: "[doctrine | bind | gestures | aria | adopt <surface>]"
---

# 🧭 compass — Holographic Navigation Primitive

*Five axes. One metaphor. Every surface navigable by touch, keyboard, or assistive tech.*

> **Sits beside:** the Wave-3 `/sketch` outcome (canonical N/S/E/W/Z metaphor) and `portal/nav-metaphor.md`. This skill owns the gesture implementation doctrine — the "how" of directional navigation. The "what" (which metaphor) is locked by Wave 3.

---

## What this skill is

`/compass` is a **knowledge-curated skill** that owns the directional navigation primitive for the kingdom. It covers:

1. The **doctrine** — the canonical N/S/E/W/Z spatial metaphor and its axis logic (`doctrine.md`)
2. The **gesture matrix** — iOS Safari + macOS Chrome touch and keyboard event mappings (`gestures.md`)
3. The **ARIA contract** — accessibility invariants for directional navigation surfaces (`aria-contract.md`)
4. A **bindings placeholder** — `bindings.js` authoring deferred to Wave 5 (`bindings.js`)

Read-only over application surfaces. The only files this skill mutates are its own knowledge files.

---

## Modalities

Parse `$ARGUMENTS`. The first word is the modality. If `$ARGUMENTS` is empty, render the **Interactive menu** (below).

| Modality | Invoke | What it does |
|----------|--------|--------------|
| Doctrine | `/compass doctrine` | Reads `doctrine.md` — the N/S/E/W/Z metaphor and axis logic. |
| Bind | `/compass bind` | Reads `bindings.js` — current state of the directional binding implementation. |
| Gestures | `/compass gestures` | Reads `gestures.md` — iOS/macOS touch and keyboard event matrix. |
| ARIA | `/compass aria` | Reads `aria-contract.md` — accessibility invariants for directional surfaces. |
| Adopt | `/compass adopt <surface>` | Reviews a named surface for compass adoption readiness; returns a punch list. |

### Bare invocation: Interactive menu

When `$ARGUMENTS` is empty, render this menu and wait for selection:

```
🧭 /compass — pick a modality:

   1. Doctrine  — N/S/E/W/Z metaphor + axis logic
   2. Bind      — current bindings.js state
   3. Gestures  — iOS/macOS touch + keyboard event matrix
   4. ARIA      — accessibility contract for directional surfaces
   5. Adopt     — review a surface for compass adoption readiness

Reply with a number, a name, or a sentence ("what gestures does iOS support?").
```

Then dispatch on the user's reply.

---

## Modality contracts

### 1. Doctrine

Read `~/.claude/skills/compass/doctrine.md` and emit it. If the file contains "TBD post-Wave-3", surface that note and suggest running `/sketch` to lock the canonical metaphor before Wave 5 authoring begins.

### 2. Bind

Read `~/.claude/skills/compass/bindings.js` and emit it. If the file is a placeholder (contains "Wave 5 fills this in"), surface that context and note that authoring is deferred until after Wave 3 metaphor lock.

### 3. Gestures

Read `~/.claude/skills/compass/gestures.md` and emit it. This is the authoritative gesture reference — do not paraphrase; emit verbatim. If the user asks about a specific gesture or event, scan the matrix first.

### 4. ARIA

Read `~/.claude/skills/compass/aria-contract.md` and emit it. For follow-up questions about accessibility invariants, answer from the contract first; if the answer isn't there, offer to capture the gap via curate.

### 5. Adopt

Given a surface name (e.g., "portal", "flows.test", "Income LOB navigator"):

1. Ask which axes are relevant for this surface (not all surfaces need all five).
2. Check whether the surface already has touch handlers (scan for `touchstart`/`touchmove`/`touchend` or `addEventListener('keydown')`).
3. Return a punch list: what's present, what's missing, what `gestures.md` says about each gap.
4. Route to `/knock` for implementation: "This is ⚡ Catalyst territory — `/knock <brief>`."

---

## Operational rules

- **Wave-3-locked doctrine.** Do not infer the canonical N/S/E/W/Z metaphor from context until `doctrine.md` is filled post-Wave-3. All adopt recommendations should defer final axis labeling until then.
- **ARIA is non-negotiable.** Any surface that adopts compass bindings must satisfy `aria-contract.md`. Never recommend compass adoption without flagging the ARIA contract.
- **Read-only over surfaces.** This skill never writes to application code. Adopt modality reports only — `/knock` executes.
- **Gestures matrix is iOS-first.** Thresholds and behaviors are tested on iOS Safari. macOS Chrome equivalents are listed but iOS is the primary target.

---

## Shared basics

Hyperlink whenever possible. Bias for clarity. Much love, much peace. ✨

When at a non-informational crossroads, render per [`_shared/genius-mode-protocol.md`](../_shared/genius-mode-protocol.md).

---

## Companion files

- [`doctrine.md`](doctrine.md) — N/S/E/W/Z metaphor + axis logic (Wave-3 placeholder)
- [`gestures.md`](gestures.md) — iOS/macOS touch and keyboard event matrix
- [`aria-contract.md`](aria-contract.md) — accessibility invariants
- [`bindings.js`](bindings.js) — directional binding implementation (Wave-5 placeholder)
