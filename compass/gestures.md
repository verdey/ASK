# Gestures — iOS/macOS Touch and Keyboard Event Matrix

**Location:** `Council/ASK/compass/gestures.md`
**Mutates only via:** `/compass` skill (curate path)

---

## Purpose

Authoritative reference for the touch events and keyboard shortcuts that compass bindings should handle. iOS Safari is the primary target (Dan's iPhone entry point). macOS Chrome equivalents are listed as secondary.

---

## iOS Safari touch event model

### Core events

| Event | Fires when | Key properties |
|-------|-----------|----------------|
| `touchstart` | Finger contacts screen | `touches[0].clientX/Y`, `touches[0].identifier` |
| `touchmove` | Finger moves while in contact | `touches[0].clientX/Y` (delta from touchstart) |
| `touchend` | Finger lifts | `changedTouches[0].clientX/Y` |
| `touchcancel` | System interrupts (call, notification) | Treat as touchend; reset state |

### Swipe detection algorithm

```
1. Record (startX, startY) on touchstart
2. On touchend, compute:
   dx = endX - startX
   dy = endY - startY
3. Determine dominant axis:
   if abs(dx) > abs(dy): horizontal swipe
   else: vertical swipe
4. Apply threshold + velocity guard:
   distance threshold: 40px minimum
   time threshold: gesture must complete in < 500ms
5. Dispatch direction:
   horizontal: dx > 0 → EAST, dx < 0 → WEST
   vertical:   dy > 0 → SOUTH (down), dy < 0 → NORTH (up)
```

**Why 40px / 500ms:** Apple's own gesture recognizers use ~10pt minimum but compass navigation is an intentional gesture, not incidental scroll. 40px reduces false positives from micro-scrolls. 500ms filters out slow "exploratory" drags that the user may not intend as navigation.

### Z-axis (depth) on iOS

iOS Safari does not have a native "pinch to drill down" gesture with semantic meaning — pinch-zoom is intercepted by the OS for page zoom. Compass Z-axis on iOS uses:

- **Tap + hold** (250ms long-press) → Z-in (drill deeper)
- **Back button / back swipe** (iOS edge-swipe from left) → Z-out (surface up)
- **Dedicated button** in the UI (preferred) — always visible, 44px tap target, labeled "↩ Back" or uses breadcrumb

**Note:** Prevent default on touchmove when handling horizontal swipes to avoid conflicting with the iOS overscroll bounce. Restore default on touchcancel.

---

## iOS Safari edge cases

| Case | Behavior | Mitigation |
|------|----------|------------|
| Pull-to-refresh (vertical swipe at top of page) | iOS intercepts; `touchcancel` fires | Detect scroll position; only arm compass swipe if `scrollY === 0` and dy < 0 |
| Edge-swipe back (left edge → right) | iOS intercepts for browser back | Cannot prevent; treat as Z-out |
| Momentum scrolling active | `touchstart` fires during deceleration | Debounce: ignore `touchstart` within 100ms of prior `touchend` |
| Multi-touch (2+ fingers) | Pinch-zoom or pan | Only handle `touches.length === 1`; ignore multi-touch |

---

## macOS Chrome equivalents

| Axis | Gesture / Key | Notes |
|------|--------------|-------|
| N/S (vertical) | `ArrowUp` / `ArrowDown` | Only when no text input is focused |
| E/W (lateral) | `ArrowLeft` / `ArrowRight` | Only when no text input is focused |
| Z-in (drill) | `Enter` on selected card | Focus management required |
| Z-out (surface) | `Escape` or `Backspace` (when not in input) | Guard against form-field interference |
| Swipe N/S/E/W | Trackpad two-finger swipe | Handled via `wheel` event: `deltaX` for E/W, `deltaY` for N/S. Threshold: 80px accumulated delta before dispatch. |

### Keyboard focus contract

When compass navigation fires via keyboard:
1. Move focus to the new "current" element.
2. Scroll the element into view (`element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })`).
3. Announce the transition via `aria-live` region (see `aria-contract.md`).

### `wheel` event debounce

Trackpad `wheel` events fire continuously during a swipe gesture. Do not dispatch a compass direction on every event. Accumulate delta until threshold is crossed, dispatch once, then enter a 300ms cooldown before re-arming.

---

## Velocity calculation (optional enhancement)

For surfaces that want momentum-style navigation (Wave 5 candidate):

```
velocity = distance / duration   (px/ms)
if velocity > 0.5 px/ms: fast swipe → skip to end of axis
if velocity 0.2–0.5 px/ms: normal swipe → move one step
if velocity < 0.2 px/ms: slow drag → animate proportionally, spring back on release
```

This is not required for Wave 5 MVP. Record here for future `/compass curate`.

---

## What bindings.js must implement

The implementation contract for `bindings.js` (Wave 5):

1. `compassInit(element, options)` — attaches all event listeners to `element`.
2. `options.axes` — array of enabled axes: `['N', 'S', 'E', 'W', 'Z']` (default all).
3. `options.onNavigate(direction)` — callback fired with direction string: `'N'|'S'|'E'|'W'|'Z-in'|'Z-out'`.
4. `compassDestroy(element)` — removes all event listeners.
5. No global state — each `compassInit` call is independent.

---

*Authored by `aurora.leo` · Wave 1 · 2026-04-28 · Sonnet 4.6*
