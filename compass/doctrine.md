---
name: compass-doctrine
description: N/S/E/W/Z navigation metaphor — Wave-3 placeholder
status: placeholder
wave: 3
---

# Compass Doctrine — N/S/E/W/Z Navigation Metaphor

**TBD post-Wave-3**

This file is a placeholder. Wave 3 (`/sketch`) will produce the canonical spatial metaphor that maps the kingdom's navigation axes. The sketch session presents prototype gallery options — compass rose, card stack, infinite canvas, layered sheets — and Dan selects the one that feels right.

---

## What this file will contain (post-Wave-3)

- **The canonical metaphor name** — the spatial model Dan chose (e.g., "compass rose", "layered sheets")
- **Axis semantics:**
  - **N/S** (vertical) — what moving "north" or "south" means in this model
  - **E/W** (lateral) — what moving "east" or "west" means
  - **Z** (depth) — what drilling "in" or surfacing "out" means
- **Boundary behaviors** — what happens at the edge of each axis (spring-back, no-op, loop)
- **Visual affordances** — how each axis is signaled to the user (directional arrows, swipe indicators, breadcrumb trail)
- **The adoption rule** — which surfaces in the kingdom should implement which axes

---

## Dependency chain

```
Wave 3: /sketch presents metaphor gallery → Dan selects
    ↓
This file: portal/nav-metaphor.md and compass/doctrine.md both fill
    ↓
Wave 5: compass/bindings.js implements the selected metaphor
    ↓
Wave 5: portal index.html + api.php wire bindings.js into the surface
```

---

*Placeholder authored by `aurora.leo` · Wave 1 · 2026-04-28 · Sonnet 4.6*
*See also: [portal/nav-metaphor.md](../portal/nav-metaphor.md) (parallel placeholder)*
