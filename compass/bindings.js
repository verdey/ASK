/**
 * compass/bindings.js — Directional navigation bindings for the kingdom portal.
 *
 * Wave 5 fills this in after Wave 3 metaphor lock.
 *
 * Implementation contract:
 *   compassInit(element, options)  — attach listeners
 *   compassDestroy(element)        — remove listeners
 *   options.axes                   — enabled axes: ['N','S','E','W','Z'] (default all)
 *   options.onNavigate(direction)  — callback: 'N'|'S'|'E'|'W'|'Z-in'|'Z-out'
 *   options.getDestinationLabel(direction) — returns string for ARIA announcement
 *
 * See: compass/gestures.md   — event matrix + thresholds
 *      compass/aria-contract.md — accessibility invariants
 *      portal/nav-metaphor.md  — canonical metaphor (post-Wave-3)
 */
