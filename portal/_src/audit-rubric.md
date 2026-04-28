# Portal Audit Rubric

**Location:** `Council/ASK/portal/_src/audit-rubric.md`
**Used by:** `/portal audit` modality
**Mutates only via:** `/portal` skill (curate path)

---

## Purpose

Defines the drift checks the `audit` modality runs against the live portal surface. Each check has a signal (what to look for), a file target, and a pass/fail criterion.

---

## Drift checks

### A. Manifest link present

| Attribute | Value |
|-----------|-------|
| File | `index.html` |
| Signal | `rel="manifest"` present in `<head>` |
| Pass | String found |
| Fail | String absent — breaks PWA install on Android/desktop |

### B. Service worker registered

| Attribute | Value |
|-----------|-------|
| File | `index.html` |
| Signal | `serviceWorker` + `register('/sw.js')` both present |
| Pass | Both found |
| Fail | Either absent — portal cannot launch offline |

### C. Apple meta tags complete

| Attribute | Value |
|-----------|-------|
| File | `index.html` |
| Signal | All five Apple tags present: `apple-touch-icon`, `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, `apple-mobile-web-app-title`, `theme-color` |
| Pass | All five found |
| Fail | Any absent — iOS home-screen launch may degrade |

### D. manifest.json is valid JSON

| Attribute | Value |
|-----------|-------|
| File | `manifest.json` |
| Signal | `python3 -c "import json; json.load(open('manifest.json'))"` exits 0 |
| Pass | Valid JSON |
| Fail | Parse error — `bin/refresh-manifest.sh` will not run; portal cards silently disappear |

### E. api.php has triage action

| Attribute | Value |
|-----------|-------|
| File | `api.php` |
| Signal | `action=triage` or `'triage'` present in routing block |
| Pass | String found |
| Fail | Absent — Today's Moves layer (Wave 5) will 404 |

### F. api.php has queue action

| Attribute | Value |
|-----------|-------|
| File | `api.php` |
| Signal | `action=queue` or `'queue'` present |
| Pass | Found |
| Fail | Absent — flow-queue.test panel breaks |

### G. api.php has trigger action

| Attribute | Value |
|-----------|-------|
| File | `api.php` |
| Signal | `action=trigger` or `'trigger'` present |
| Pass | Found |
| Fail | Absent — ▶ Run buttons in portal are inert |

### H. offline.html exists

| Attribute | Value |
|-----------|-------|
| File | `offline.html` at kingdom root |
| Signal | File exists |
| Pass | File found |
| Fail | Absent — service worker offline intercept has nothing to serve |

### I. bin/refresh-manifest.sh is executable

| Attribute | Value |
|-----------|-------|
| File | `bin/refresh-manifest.sh` |
| Signal | `[ -x bin/refresh-manifest.sh ]` |
| Pass | Executable |
| Fail | Not executable — `chmod +x bin/refresh-manifest.sh` needed |

### J. All manifest.json hrefs resolve

| Attribute | Value |
|-----------|-------|
| File | `manifest.json` |
| Signal | Each `href` value resolves to an existing path under the kingdom root |
| Pass | All resolve |
| Fail | Any 404 — dead card in portal. Remove the entry or restore the realm. |

---

## Severity tiers

| Tier | Checks | Effect of failure |
|------|--------|-------------------|
| **Critical** | B, D | Portal non-functional on mobile / cards invisible |
| **High** | A, C, H | iOS PWA degraded (no standalone, bad icon, no offline) |
| **Medium** | E, F, G | Flow surface features broken (Today's Moves, queue, run) |
| **Low** | I, J | Admin friction (refresh script fails, dead cards) |

Audit output leads with Critical/High failures. Low-severity passes are collapsed.

---

*Authored by `aurora.leo` · Wave 1 · 2026-04-28 · Sonnet 4.6*
