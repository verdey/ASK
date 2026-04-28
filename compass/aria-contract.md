# ARIA Contract — Accessibility Invariants for Directional Surfaces

**Location:** `Council/ASK/compass/aria-contract.md`
**Mutates only via:** `/compass` skill (curate path)

---

## Purpose

Any surface that adopts compass bindings must satisfy the invariants below. ARIA is non-negotiable: Dan uses the portal on iPhone, and VoiceOver + Switch Control are system-level accessibility features that iOS cannot turn off for specific apps.

---

## Invariant 1 — Directional landmarks

**Requirement:** The container element that hosts compass navigation must carry an ARIA landmark role and a descriptive label.

```html
<nav aria-label="Kingdom compass navigation" role="navigation">
  <!-- compass-navigable content here -->
</nav>
```

For non-nav containers, use `role="region"` with `aria-label`.

**Why:** Screen readers present a landmarks list as a quick-jump menu. Without a labeled landmark, VoiceOver users cannot locate the navigable region.

---

## Invariant 2 — Live region for navigation announcements

**Requirement:** A single `aria-live="polite"` region must exist on the page. Compass dispatches a brief announcement on each navigation event.

```html
<div aria-live="polite" aria-atomic="true" class="sr-only" id="compass-announcement">
  <!-- updated by compassInit on each navigate event -->
</div>
```

**Announcement format:**

| Direction | Announcement |
|-----------|-------------|
| N | "Moved up to [destination name]" |
| S | "Moved down to [destination name]" |
| E | "Moved to [destination name]" |
| W | "Moved back to [destination name]" |
| Z-in | "Entered [destination name]" |
| Z-out | "Returned to [destination name]" |

The `compassInit` callback receives the destination name from the `options.getDestinationLabel(direction)` function (implementor provides this).

**Why:** Without announcements, a VoiceOver user who triggers a swipe gesture has no idea the view changed. The polite live region queues the announcement without interrupting ongoing speech.

---

## Invariant 3 — Focus management

**Requirement:** After each navigation event, focus must move to a logical target in the new view.

- **Z-in:** move focus to the first heading (`h1`, `h2`) or the container's first interactive element.
- **Z-out:** return focus to the element that triggered the Z-in (or the container if the trigger is gone).
- **N/S/E/W:** move focus to the "current" card/item in the new position.

**Focus visibility:** The focused element must have a visible focus ring. Do not suppress `:focus-visible` outlines on compass-navigable elements.

**Why:** After a swipe, if focus doesn't move, a keyboard or switch-control user is still "inside" the old view even though the visual content has changed.

---

## Invariant 4 — Focus trap rules per axis

**Requirement:** Compass navigation must not trap focus in a way that prevents the user from reaching system controls.

- **Z-in (drill):** focus is contained within the drilled-into view. Tab navigation should cycle within that view. A visible "Back" button or Escape key must exit the focus trap.
- **Z-out:** releases the focus trap; focus returns to the parent context.
- **N/S/E/W:** these are linear navigation axes — no focus trapping. Tab key must still move through all interactive elements in DOM order, regardless of compass position.

**Implementation pattern for Z focus trap:**

```javascript
// On Z-in:
trapFocus(destinationElement);  // aria-modal + inert on siblings

// On Z-out or Escape:
releaseFocusTrap();             // remove aria-modal + inert
returnFocusToTrigger();
```

Use `inert` attribute (widely supported 2023+) on sibling panels when trapping, not `aria-hidden` on the main content.

**Why:** `aria-hidden` on main content while a modal-like panel is open causes the screen reader to announce "end of page" when the user tries to navigate. `inert` prevents interaction without hiding from the accessibility tree.

---

## Invariant 5 — Keyboard operability

**Requirement:** Every compass action reachable by swipe must also be reachable by keyboard.

| Compass axis | Required keyboard binding |
|-------------|--------------------------|
| N | `ArrowUp` (when compass container is focused) |
| S | `ArrowDown` |
| E | `ArrowRight` |
| W | `ArrowLeft` |
| Z-in | `Enter` on focused card |
| Z-out | `Escape` |

Arrow keys must not scroll the page when compass has focus. Use `event.preventDefault()` on arrow keys within the compass container.

**Why:** WCAG 2.1 SC 2.1.1 (Keyboard) requires all functionality to be operable via keyboard.

---

## Invariant 6 — Screen reader-only helper class

**Requirement:** A `.sr-only` CSS class must be present in the surface's stylesheet:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

Used for the live region (Invariant 2) and any visually hidden labels.

---

## Adoption checklist

Before a surface ships with compass bindings, verify:

- [ ] Compass container has a landmark role + aria-label
- [ ] `#compass-announcement` live region exists on page
- [ ] Focus moves after each navigation event
- [ ] Z-in/Z-out respect focus trap + release contract
- [ ] Arrow keys trigger compass without scrolling the page
- [ ] `.sr-only` class present in stylesheet
- [ ] Manual VoiceOver test: navigate all five axes by swipe, confirm announcements fire

---

*Authored by `aurora.leo` · Wave 1 · 2026-04-28 · Sonnet 4.6*
