---
name: compass-doctrine
description: N/S/E/W/Z navigation metaphor — Layered Bands (locked Wave 5)
status: locked
wave: 5
locked_by: aurora.taurus
locked_at: 2026-04-28
---

# Compass Doctrine — Layered Bands Metaphor

**Metaphor name:** Layered Bands

The kingdom portal is a vertical stack of four priority bands: Today's Moves → Insight Fragments → Realms → Flows. The compass treats this stack as a set of discrete layers on a vertical axis. Lateral movement (E/W) navigates items within a band. Depth (Z) drills into an item or ascends back out.

---

## Axis semantics

| Axis | Direction | Meaning |
|------|-----------|---------|
| **N** | Up | Scroll to / focus previous band |
| **S** | Down | Scroll to / focus next band |
| **E** | Right | Focus next item within current band |
| **W** | Left | Focus previous item within current band |
| **Z-in** | Drill | Enter selected item: realm → scoped flow list; flow → omega artifact |
| **Z-out** | Ascend | Exit drilled view; return to parent band / kingdom root |

---

## Boundary behaviors

| Condition | Behavior |
|-----------|----------|
| N at first band | No-op — brief spring-back visual cue |
| S at last band | No-op — brief spring-back visual cue |
| E at last item in band | No-op |
| W at first item in band | No-op |
| Z-in with no drillable target | No-op |
| Z-out at kingdom root (no drill active) | No-op |
| iOS pull-to-refresh (N swipe at scrollY=0) | Compass disarms — OS handles it |
| iOS edge-swipe from left | Treated as Z-out (browser-native, cannot override) |

---

## Visual affordances

- **Edge hints** — small absolute-positioned labels at viewport edges showing current axis destinations (e.g. `↑ moves`, `↓ flows`, `→ next`). Opacity 10% at rest, 60% on hover/focus.
- **Breadcrumb** — shown above the Flows band when in drill-down state: `↑ kingdom / {realm name}`.
- **Band focus indicator** — a subtle left-edge pip that marks the currently compass-focused band.

---

## Adoption rule

All bands in the kingdom portal implement N/S + E/W + Z. Non-portal surfaces (flow omegas, realm dashboards) are encouraged but not required to adopt these bindings independently.

---

*Placeholder authored by `aurora.leo` · Wave 1 · 2026-04-28*
*Metaphor locked by `aurora.taurus` · Wave 5 · 2026-04-28*
*See also: [portal/nav-metaphor.md](../portal/nav-metaphor.md)*
