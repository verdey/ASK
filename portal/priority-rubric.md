---
name: priority-rubric
description: How the portal renders /triage output — Today's Moves display contract
status: stub
---

# Priority Rubric — Portal Today's Moves Display

**Source of truth for priority computation:** [`/triage`](../triage/SKILL.md) — specifically `triage/rubric.md`.

This file defines how the **portal renders** `/triage`'s output. Portal does not compute priority — it reads `triage/_state/today.json` and renders according to the contract below.

---

## Data contract (input from /triage)

Portal reads `~/.claude/skills/triage/_state/today.json`:

```json
{
  "computed_at": "ISO-8601 timestamp or null",
  "moves": [
    {
      "rank": 1,
      "title": "one-line move description",
      "signal": "stalled-flow | overdue-backlog | blueprint-drift | roster | active-flow",
      "realm": "relative path to realm or flow",
      "open_thread": "relative path to source file",
      "impact_easiness": "[I⬆⬆ E⬆]"
    }
  ]
}
```

---

## Display contract (portal rendering)

**When `computed_at` is null:** render a "Today's Moves not yet computed" notice with a call to action: "Run `/triage today` to populate."

**When `computed_at` is stale (> 24h):** render the moves with a stale-data badge and the age: "⚠️ Computed 2 days ago — run `/triage today` to refresh."

**When fresh:** render the top moves as Pico-card-style entries:

```
#1  [signal pill]  move title                     [I⬆ E⬆]
    ↪ realm/path
```

**Signal pills** (CSS classes to apply):

| Signal | Pill label | Pill color |
|--------|-----------|------------|
| `stalled-flow` | 🔴 Stalled | red |
| `overdue-backlog` | 🟠 Overdue | orange |
| `blueprint-drift` | 🟡 Drift | yellow |
| `roster` | 🔵 Roster | blue |
| `active-flow` | 🟢 Active | green |

**Maximum moves rendered:** 5. If `/triage` returns more, portal truncates at 5 with a "↓ N more" expand control.

---

## Ranking system

The Impact-Easiness rubric lives at [`_shared/impact-easiness-rubric.md`](../_shared/impact-easiness-rubric.md). `/triage` applies it when computing moves. Portal renders the badge as-is — never re-ranks.

---

*Authored by `aurora.leo` · Wave 1 · 2026-04-28 · Sonnet 4.6*
*Rendering contract wires into portal HTML in Wave 5 (`aurora.taurus`)*
