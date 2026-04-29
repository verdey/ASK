/**
 * compass/bindings.js — Directional navigation for the kingdom portal.
 * Metaphor: Layered Bands (locked Wave 5, aurora.taurus, 2026-04-28)
 *   N/S = scroll between bands, E/W = navigate within a band, Z = drill/ascend
 *
 * Public API:
 *   compassInit(element, options)  — attach listeners
 *   compassDestroy(element)        — detach listeners
 *
 * options:
 *   axes          ['N','S','E','W','Z']   default all five
 *   onNavigate    fn(direction)           'N'|'S'|'E'|'W'|'Z-in'|'Z-out'
 *   getDestinationLabel fn(direction)     returns string for ARIA announcement
 *   edgeHints     boolean                 show edge-hint labels (default true)
 *
 * See: gestures.md, aria-contract.md, portal/nav-metaphor.md
 */

(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.Compass = factory();
  }
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  // ── Constants (from gestures.md) ────────────────────────────────
  const SWIPE_THRESHOLD_PX   = 40;
  const SWIPE_MAX_MS         = 500;
  const CROSS_AXIS_MAX_PX    = 30;
  const WHEEL_THRESHOLD      = 80;
  const WHEEL_COOLDOWN_MS    = 300;
  const LONGPRESS_MS         = 250;
  const TOUCH_DEBOUNCE_MS    = 100;

  // Per-element state keyed by element reference
  const _state = new WeakMap();

  // ── ARIA live region ─────────────────────────────────────────────
  function ensureAnnouncer() {
    let el = document.getElementById('compass-announcement');
    if (!el) {
      el = document.createElement('div');
      el.id = 'compass-announcement';
      el.setAttribute('aria-live', 'polite');
      el.setAttribute('aria-atomic', 'true');
      el.className = 'sr-only';
      document.body.appendChild(el);
    }
    return el;
  }

  function announce(text) {
    const el = ensureAnnouncer();
    el.textContent = '';
    // Brief timeout so screen readers catch the change even if text is identical
    setTimeout(() => { el.textContent = text; }, 50);
  }

  // ── Edge hints ───────────────────────────────────────────────────
  const EDGE_LABELS = { N: '↑', S: '↓', E: '→', W: '←' };

  function createEdgeHints(element) {
    const hints = {};
    ['N', 'S', 'E', 'W'].forEach(dir => {
      const h = document.createElement('div');
      h.className = 'compass-edge-hint compass-hint-' + dir.toLowerCase();
      h.setAttribute('aria-hidden', 'true');
      h.textContent = EDGE_LABELS[dir];
      element.appendChild(h);
      hints[dir] = h;
    });
    return hints;
  }

  function updateEdgeHints(hints, getLabel) {
    if (!hints || !getLabel) return;
    ['N', 'S', 'E', 'W'].forEach(dir => {
      if (hints[dir]) {
        const label = getLabel(dir);
        hints[dir].textContent = EDGE_LABELS[dir] + (label ? ' ' + label : '');
        hints[dir].style.display = label ? '' : 'none';
      }
    });
  }

  // ── Core dispatch ────────────────────────────────────────────────
  function dispatch(s, direction) {
    if (!s.axes.includes(direction === 'Z-in' || direction === 'Z-out' ? 'Z' : direction)) return;
    if (s.onNavigate) s.onNavigate(direction);
    const label = s.getDestinationLabel ? s.getDestinationLabel(direction) : direction;
    const prefix = {
      'N': 'Moved up to', 'S': 'Moved down to',
      'E': 'Moved to', 'W': 'Moved back to',
      'Z-in': 'Entered', 'Z-out': 'Returned to',
    }[direction] || 'Navigated to';
    announce(prefix + ' ' + (label || direction));
    if (s.hints) updateEdgeHints(s.hints, s.getDestinationLabel);
  }

  // ── Touch handling (iOS Safari) ──────────────────────────────────
  function makeTouchHandlers(element, s) {
    let startX = 0, startY = 0, startT = 0;
    let lastEndT = 0;
    let longPressTimer = null;

    function onTouchStart(e) {
      // Ignore multi-touch
      if (e.touches.length !== 1) return;
      // Debounce momentum-scroll ghost touches
      if (Date.now() - lastEndT < TOUCH_DEBOUNCE_MS) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startT = Date.now();

      // Long-press → Z-in (drill)
      longPressTimer = setTimeout(() => {
        longPressTimer = null;
        dispatch(s, 'Z-in');
      }, LONGPRESS_MS);
    }

    function onTouchMove(e) {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
      if (e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      // Prevent page scroll when handling a horizontal swipe
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
        e.preventDefault();
      }
    }

    function onTouchEnd(e) {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
      lastEndT = Date.now();
      if (e.changedTouches.length !== 1) return;
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const dt = Date.now() - startT;
      if (dt > SWIPE_MAX_MS) return;
      const dx = endX - startX;
      const dy = endY - startY;
      const absDx = Math.abs(dx), absDy = Math.abs(dy);

      if (Math.max(absDx, absDy) < SWIPE_THRESHOLD_PX) return;

      if (absDx > absDy && absDy <= CROSS_AXIS_MAX_PX) {
        dispatch(s, dx > 0 ? 'E' : 'W');
      } else if (absDy > absDx && absDx <= CROSS_AXIS_MAX_PX) {
        // Guard: don't fire N if at top of page (pull-to-refresh zone)
        if (dy < 0 && window.scrollY === 0) return;
        dispatch(s, dy > 0 ? 'S' : 'N');
      }
    }

    function onTouchCancel() {
      if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
    }

    element.addEventListener('touchstart',  onTouchStart,  { passive: true });
    element.addEventListener('touchmove',   onTouchMove,   { passive: false });
    element.addEventListener('touchend',    onTouchEnd,    { passive: true });
    element.addEventListener('touchcancel', onTouchCancel, { passive: true });

    return function remove() {
      element.removeEventListener('touchstart',  onTouchStart);
      element.removeEventListener('touchmove',   onTouchMove);
      element.removeEventListener('touchend',    onTouchEnd);
      element.removeEventListener('touchcancel', onTouchCancel);
      if (longPressTimer) clearTimeout(longPressTimer);
    };
  }

  // ── Keyboard handling (macOS / desktop) ─────────────────────────
  function makeKeyHandlers(element, s) {
    function onKeyDown(e) {
      // Don't fire when focus is inside an input or textarea
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      if (e.target.isContentEditable) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          dispatch(s, 'N');
          break;
        case 'ArrowDown':
          e.preventDefault();
          dispatch(s, 'S');
          break;
        case 'ArrowRight':
          dispatch(s, 'E');
          break;
        case 'ArrowLeft':
          dispatch(s, 'W');
          break;
        case 'Enter':
          dispatch(s, 'Z-in');
          break;
        case 'Escape':
        case 'Backspace':
          if (tag !== 'input' && tag !== 'textarea') {
            dispatch(s, 'Z-out');
          }
          break;
        default:
          break;
      }
    }

    element.addEventListener('keydown', onKeyDown);
    return function remove() {
      element.removeEventListener('keydown', onKeyDown);
    };
  }

  // ── Wheel (trackpad) handling ────────────────────────────────────
  function makeWheelHandlers(element, s) {
    let accX = 0, accY = 0;
    let cooldownUntil = 0;

    function onWheel(e) {
      const now = Date.now();
      if (now < cooldownUntil) return;

      accX += e.deltaX;
      accY += e.deltaY;

      if (Math.abs(accX) >= WHEEL_THRESHOLD && Math.abs(accX) > Math.abs(accY)) {
        dispatch(s, accX > 0 ? 'E' : 'W');
        accX = 0; accY = 0;
        cooldownUntil = now + WHEEL_COOLDOWN_MS;
      } else if (Math.abs(accY) >= WHEEL_THRESHOLD && Math.abs(accY) > Math.abs(accX)) {
        dispatch(s, accY > 0 ? 'S' : 'N');
        accX = 0; accY = 0;
        cooldownUntil = now + WHEEL_COOLDOWN_MS;
      }

      // Decay accumulator slowly between events
      requestAnimationFrame(() => { accX *= 0.5; accY *= 0.5; });
    }

    element.addEventListener('wheel', onWheel, { passive: true });
    return function remove() {
      element.removeEventListener('wheel', onWheel);
    };
  }

  // ── Public API ───────────────────────────────────────────────────
  function compassInit(element, options) {
    if (!element) return;
    const opts = options || {};
    const s = {
      axes:                opts.axes || ['N', 'S', 'E', 'W', 'Z'],
      onNavigate:          opts.onNavigate          || null,
      getDestinationLabel: opts.getDestinationLabel || null,
      hints:               null,
      removers:            [],
    };

    if (opts.edgeHints !== false) {
      s.hints = createEdgeHints(element);
      if (s.getDestinationLabel) updateEdgeHints(s.hints, s.getDestinationLabel);
    }

    s.removers.push(makeTouchHandlers(element, s));
    s.removers.push(makeKeyHandlers(element, s));
    s.removers.push(makeWheelHandlers(element, s));

    // ARIA landmark
    if (!element.getAttribute('role') && element.tagName.toLowerCase() !== 'nav') {
      element.setAttribute('role', 'region');
    }
    if (!element.getAttribute('aria-label')) {
      element.setAttribute('aria-label', 'Kingdom compass navigation');
    }

    _state.set(element, s);
    ensureAnnouncer();
  }

  function compassDestroy(element) {
    if (!element) return;
    const s = _state.get(element);
    if (!s) return;
    s.removers.forEach(fn => fn());
    if (s.hints) {
      Object.values(s.hints).forEach(h => h.remove());
    }
    _state.delete(element);
  }

  return { compassInit, compassDestroy };
}));
