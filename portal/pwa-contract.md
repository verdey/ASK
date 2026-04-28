# PWA Contract

**Location:** `Council/ASK/portal/pwa-contract.md`
**Audited by:** `bin/check-pwa.sh`
**Mutates only via:** `/portal` skill (curate path)

---

## Purpose

The kingdom portal is an **iOS home-screen app**. Dan launches it from the iPhone home screen via the Apple Web Clip mechanism. Any drift from this contract breaks that entry point. The contract below is the authoritative list of invariants `bin/check-pwa.sh` enforces.

---

## Invariant 1 — Web App Manifest

**File:** `manifest.webmanifest` at kingdom root.

**Requirements:**
- File exists and is valid JSON.
- Contains `name`, `short_name`, `start_url`, `display: "standalone"`, `background_color`, `theme_color`.
- Contains at minimum: `icons` array with 192×192 and 512×512 entries (purpose: `"any"`), plus a 512×512 maskable entry (purpose: `"maskable"`).
- `start_url` resolves to `index.html` (or `/`).

**Why:** iOS Safari reads the manifest for the splash screen and icon selection. Missing entries produce a blank splash or a generic bookmark icon.

---

## Invariant 2 — Service Worker

**File:** `sw.js` at kingdom root.

**Requirements:**
- File exists and is valid JavaScript (no parse errors).
- `index.html` registers the service worker:
  ```javascript
  navigator.serviceWorker.register('/sw.js')
  ```
- The service worker has an `install` handler that caches the offline fallback (`offline.html`).
- `offline.html` exists at kingdom root.

**Why:** Without a registered service worker, the app cannot launch offline. iOS will show a blank screen if the network is unavailable and no service worker intercepts.

---

## Invariant 3 — Icons

**Required files** (all in `icons/` at kingdom root):

| File | Dimensions | Purpose |
|------|-----------|---------|
| `icon-192.png` | 192×192 | Standard PWA icon |
| `icon-512.png` | 512×512 | Standard PWA large icon |
| `apple-touch-icon-180.png` | 180×180 | iOS home screen icon (Apple Web Clip) |
| `icon-maskable-512.png` | 512×512 | Maskable icon for adaptive icon systems |

**Why:** iOS uses `apple-touch-icon` for the home screen thumbnail. If missing, iOS generates a screenshot-based thumbnail (often blurry). The 192/512 sizes serve Android and desktop PWA installs. The maskable icon ensures the icon doesn't get letterboxed on Android adaptive-icon systems.

---

## Invariant 4 — Apple Meta Tags

**Required in `index.html` `<head>`:**

```html
<link rel="manifest" href="/manifest.webmanifest">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon-180.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Kingdom">
<meta name="theme-color" content="#<hex>">
```

**Why:** `apple-mobile-web-app-capable` is what enables standalone mode on iOS (full-screen, no browser chrome). `status-bar-style` controls whether the status bar overlaps the content or sits above it. `apple-mobile-web-app-title` sets the label under the home screen icon.

---

## Invariant 5 — Touch Targets

**Requirement:** All interactive elements (buttons, links, ▶ Run buttons, card links) must have a minimum tap target of **44×44 CSS px**.

**Why:** Apple HIG minimum. Below 44px, finger taps miss on iPhone. The portal is a primary touch surface — every card's "↪ resume" and every flow ▶ Run button must be large enough to hit reliably.

**Audit method:** Visual review + CSS inspection. `bin/check-pwa.sh` does not automate this check; it is a manual audit signal.

---

## Invariant 6 — Offline Fallback

**Requirement:** When the service worker intercepts a fetch that fails (network unavailable), it must serve `offline.html`. The offline page must:
- Be self-contained (no external dependencies).
- Display a human-readable message.
- Link back to the portal root for retry.

**Why:** The portal is the daily entry point. If the network is unavailable (airplane mode, poor signal), the user should see a clean fallback, not a browser error page.

---

## What `bin/check-pwa.sh` audits automatically

The script (at `~/.claude/skills/portal/bin/check-pwa.sh`) checks:

- `manifest.webmanifest` exists + valid JSON
- `sw.js` exists + no parse errors
- Icons: `icon-192.png` (192×192), `icon-512.png` (512×512), `apple-touch-icon-180.png` (180×180), `icon-maskable-512.png` (512×512)
- `index.html` contains: `rel="manifest"`, `apple-touch-icon`, `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, `apple-mobile-web-app-title`, `theme-color`, `serviceWorker`, `register('/sw.js')`
- `offline.html` exists

Touch target check (Invariant 5) is manual — not in the script.

---

## Deviation policy

Any portal change that would break a passing check must be flagged before landing. If `bin/check-pwa.sh` exits 1 post-change, the change is blocked until the contract is restored. The PWA contract is not aspirational — it is the floor.

---

*Authored by `aurora.leo` · Wave 1 · 2026-04-28 · Sonnet 4.6*
