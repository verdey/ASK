# Portal Doctrine

**Location:** `Council/ASK/portal/doctrine.md`
**Canonical path:** `/Users/verdey/Documents/Claude/Projects/Council/ASK/portal/doctrine.md`
**Mutates only via:** `/portal` skill (curate path)

---

## What the portal is

The kingdom portal (`index.html` at `/Users/verdey/Documents/Claude/Projects/`) is the **daily entry point** into the kingdom. It is not an app — it is a veil layer: a thin static surface that makes the kingdom's state visible at a glance and navigable by touch or click.

It runs at `http://alpha.test` (Herd, always-on) and `http://localhost:8787` (`./serve.sh`).

The portal has **one job:** show Dan where things are and what needs attention, with minimal friction between perception and action.

---

## Three-layer architecture

```
┌─────────────────────────────────────────────────────┐
│  🏛️  Layer 1 — Kingdom (this portal)                │
│      index.html · manifest.json · api.php            │
│      What realms exist, their status, today's moves  │
│  ┌───────────────────────────────────────────────┐   │
│  │  🗺️  Layer 2 — Realm                         │   │
│  │      Each subdirectory: its own index.html    │   │
│  │      CLAUDE.md · HANDOFF.md · _BACKLOG.md     │   │
│  │  ┌───────────────────────────────────────┐   │   │
│  │  │  ⚡  Layer 3 — Flow                  │   │   │
│  │  │      processes/ · _audit/ · runs.log  │   │   │
│  │  │      The live motion inside a realm   │   │   │
│  │  └───────────────────────────────────────┘   │   │
│  └───────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

The portal renders Layer 1. It links into Layer 2 (realm cards). Layers 2 and 3 render their own surfaces — the portal does not absorb them.

**Progressive disclosure (P6):** Today's Moves surface first, above the realm cards. Realm detail (blurb, status, nextMove, openThread) surfaces on hover or tap. Deep flow state lives inside the realm's own surface. The portal does not drill into flows — it points.

---

## Realm card schema

Each entry in `manifest.json` carries:

**Static fields** (set by hand, never auto-overwritten):

| Field | Type | Description |
|-------|------|-------------|
| `slug` | string | URL-safe, kebab-case identifier |
| `title` | string | Display name |
| `blurb` | string | One-line description |
| `href` | string | Relative path to realm entry point (URL-encode spaces as `%20`) |

**Dynamic fields** (written by `bin/refresh-manifest.sh`):

| Field | Values | Source |
|-------|--------|--------|
| `status` | `active` / `paused` / `dormant` | `_PAUSE_*.md` presence → paused; mtime < 14d → active; ≥ 30d → dormant |
| `lastTouched` | ISO date (`YYYY-MM-DD`) | mtime of HANDOFF.md > _BACKLOG.md > newest _PAUSE_*.md |
| `nextMove` | One-line string | First list item under "Next" heading; falls back to Status: line, PINNED heading, or first H2 |
| `openThread` | Relative path | Source file used above |

**Rendered as:** status pill (🟢/⏸/💤), relative time, nextMove as second line, "↪ resume" link. Cards sorted newest-first by `lastTouched`.

---

## Portal invariants

These must hold at all times. The `audit` modality checks them:

1. **`manifest.json` is valid JSON.** `bin/refresh-manifest.sh` will not run on invalid JSON.
2. **Every `href` in `manifest.json` resolves to an existing file or directory.** Dead hrefs produce 404 cards.
3. **`index.html` links to `manifest.json` via fetch.** No hardcoded realm list in HTML.
4. **`api.php` has a `triage` action registered** (for Today's Moves integration — Wave 5).
5. **PWA contract is satisfied** (see `pwa-contract.md`). The portal is an iOS home-screen app; any drift here breaks the mobile entry point.
6. **`bin/refresh-manifest.sh` produces idempotent output.** Running it twice with no filesystem changes produces identical `manifest.json`.

---

## Flow surface integration

The portal at `alpha.test` surfaces a **flow surface** above realm cards: search-as-you-type, saved-search chips, ▶ Run buttons, queue status. This is wired via `api.php` (see kingdom `CLAUDE.md` §"Flow surface"). The portal skill owns doctrine for the portal card layer; flow surface doctrine lives in `/flow`.

---

## Today's Moves layer

Above the realm cards, the portal renders the top 3–5 prioritized moves from `/triage`'s `_state/today.json`. This layer is:

- **Rendered on page load** from the stale JSON (fast, no network dependency)
- **Refreshed on demand** via a "↻ refresh" tap (triggers `/triage today` indirectly via `api.php?action=triage`)
- **Linked to the source realm** — each move card links to its `openThread`

The priority rubric for Today's Moves is owned by `/triage`. Portal renders, not computes.

---

## Adding a realm (the canonical flow)

1. Create the subdirectory with its own `index.html` (or README link).
2. Append an entry to `manifest.json` with at minimum the four static fields.
3. Run `bin/refresh-manifest.sh` — fills in dynamic fields.
4. Reload `alpha.test` — new card appears.

Use `/portal new-card <slug>` for guided authoring.

---

*Authored by `aurora.leo` · Wave 1 · 2026-04-28 · Sonnet 4.6*
