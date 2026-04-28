---
name: nav-metaphor
description: N/S/E/W/Z navigation doctrine for the kingdom portal — Wave-3 placeholder
status: placeholder
wave: 3
---

# Nav Metaphor — N/S/E/W/Z Navigation Doctrine

**TBD post-Wave-3**

This file is a placeholder. Wave 3 (`/sketch`) will produce the canonical N/S/E/W/Z navigation metaphor for the kingdom portal. The sketch session picks a spatial model (compass rose, card stack, infinite canvas, etc.) that maps intuitively to the five navigation axes.

---

## What this file will contain (post-Wave-3)

- The canonical metaphor name and its spatial logic
- Axis mapping: N/S (vertical scroll), E/W (lateral swipe), Z (depth / drill-down)
- Visual language: how each axis is signaled to the user (arrows, swipe indicators, breadcrumbs)
- The binding contract: how `compass/bindings.js` should implement each axis
- Override rules: what happens at axis boundaries (e.g., N at top of page → no-op vs. spring-back)

---

## Dependency chain

```
Wave 3: /sketch picks metaphor
    ↓
Wave 5: /compass bindings.js implements bindings per this doctrine
    ↓
Wave 5: api.php + index.html wire the compass surface into the portal
```

Do not infer the metaphor from context. Wait for the `/sketch` outcome before authoring `bindings.js`.

---

*Placeholder authored by `aurora.leo` · Wave 1 · 2026-04-28 · Sonnet 4.6*
*Content lands in Wave 3 — see [compass/doctrine.md](../compass/doctrine.md) for parallel placeholder*
