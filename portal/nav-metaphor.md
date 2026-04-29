---
name: nav-metaphor
description: N/S/E/W/Z navigation doctrine for the kingdom portal — Layered Bands (locked Wave 5)
status: locked
wave: 5
locked_by: aurora.taurus
locked_at: 2026-04-28
---

# Nav Metaphor — Layered Bands

**Metaphor:** The portal is a vertical stack of four priority bands. Each band is a discrete layer of kingdom signal, ordered by urgency:

1. **Today's Moves** — triage output, highest signal
2. **Insight Fragments** — harvested chart data
3. **Realms** — active project spaces
4. **Flows** — process search and run surface

Compass axes map naturally to this topology:
- **Vertical (N/S)** = scroll between layers
- **Lateral (E/W)** = navigate within a layer (card to card)
- **Depth (Z)** = drill into a specific item, or ascend back out

---

## Binding contract for `bindings.js`

`compassInit` is called once per page with the `<main>` element as root. The `axisHandlers` map to portal behavior:

```
N → scroll to previous band; announce "Moved up to {band name}"
S → scroll to next band; announce "Moved down to {band name}"
E → focus next item in current band (next card, next flow row)
W → focus previous item in current band
Z-in → activate focused item (realm: drill to scoped flows; flow: open omega URL)
Z-out → exit drill-down state; scroll to kingdom root band
```

Bands are identified by their `data-band` attribute: `moves`, `insights`, `realms`, `flows`.

---

## Override rules at boundaries

- **N at first band (`moves`):** no-op + spring-back visual cue (brief opacity flash on top edge hint)
- **S at last band (`flows`):** no-op + spring-back visual cue
- **E/W within a band:** no-op at edges, no wrap-around
- **Z-in on a non-drillable item:** no-op
- **Z-out at root (no active drill):** no-op

---

## iOS-specific notes

- Pull-to-refresh (N swipe when `scrollY === 0`): compass disarms, OS handles it
- Edge-swipe from left edge: treated as Z-out (browser-native; compass does not `preventDefault`)
- Long-press (250ms) on a card triggers Z-in (drill) on iOS where Enter key is unavailable

---

*Placeholder authored by `aurora.leo` · Wave 1 · 2026-04-28*
*Metaphor locked by `aurora.taurus` · Wave 5 · 2026-04-28*
*See also: [compass/doctrine.md](../compass/doctrine.md)*
