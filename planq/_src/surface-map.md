# Surface Map — planq.test + oracles.test

This document is the cross-surface contract for `/planq`. It specifies what each surface renders and how they stay in sync. Implementation is Wave 2 (`camila.lambda`); this spec drives that build.

## Filesystem Truth Doctrine

`planq.md` is the single source of truth. Surfaces read it on every request. No DB. No cache. No localStorage for state that matters. Drag-reorder writes through immediately.

---

## `planq.test` — Main Surface

**Herd valet:** `~/Library/Application Support/Herd/config/valet/Sites/planq` → `Tooling/planq-board/`  
**Filesystem root:** `/Users/verdey/Documents/Claude/Projects/Tooling/planq-board/`  
**Entry:** `index.php`  
**Status:** Wave 2 (camila.lambda). Valet symlink: Wave 3 (camila.nu).

### Main view — draggable planq list

- Reads `planq.md` line-by-line via PHP.
- Renders each idea as a draggable list item.
- Tag chips rendered inline: `#flow:<slug>` as a linked chip (links to `http://alpha.test/<slug>/`), `#status:<word>` as a status pill, `#oracle:<name>` as a link to `http://oracles.test/oracle.php?name=<name>`.
- Promoted lines (`→ oracle:<name>`) show an "oracle" badge linking to the oracle surface.
- **Promote button** per line — opens a name-entry modal; triggers `/planq promote` logic (server-side).
- **Drag-reorder:** client captures new order on `drop` event → POST to self (`?action=reorder`) → PHP rewrites `planq.md` (preserves blank-line groupings, comment block, heading) → returns updated list. No localStorage. No intermediate state.

### Right sidebar — Named Oracles

- Reads `/Users/verdey/.claude/skills/oracle/oracles/` directory via PHP `glob()`.
- Lists active oracle shards (`status: active` in frontmatter) as a read-only list.
- Each item links to `http://oracles.test/oracle.php?name=<name>`.
- Header: "Named Oracles" with link "all → oracles.test".

---

## `oracles.test` — Plan Queue section

**Existing surface:** `http://oracles.test` → `Tooling/oracle-board/`  
**Change:** Add Plan Queue section at top of `oracle-board/index.php`.

### Plan Queue section spec

- Reads top-N (default: 5) lines from `planq.md`.
- Renders as a collapsed/expandable panel at the top of the page, above the oracle roster.
- Each line rendered as a plain list item with tag chips (same rendering as planq.test main view).
- Footer link: "View all → planq.test" (links to `http://planq.test`).
- Collapse state: expanded by default; user can toggle. State stored in `sessionStorage` (ephemeral — not cross-session; acceptable).

---

## `oracle.test` alias

**Status:** Wave 3 (camila.nu) — new Herd valet symlink.  
`~/Library/Application Support/Herd/config/valet/Sites/oracle` → `Tooling/oracle-board/`  
Existing `oracles.test` unchanged. `oracle.test` is a convenience alias only.

---

## Cross-surface awareness matrix

| Surface | Reads | Writes | Links to |
|---------|-------|--------|----------|
| `planq.test` | `planq.md` | `planq.md` (drag-reorder, promote) | `oracles.test` (oracle links), `alpha.test/<slug>/` (flow links) |
| `oracles.test` | `planq.md` (top-N), oracle shards | — (read-only planq section) | `planq.test` ("view all") |
| `/planq` skill | `planq.md` | `planq.md` | `oracles.test` (after promotion) |

---

## Write strategy — drag-reorder (Q2 resolution)

**Chosen: Option A — server-side write on drop.**

- Client sends POST with the new ordered list of idea texts.
- PHP reads the current `planq.md`, maps texts to full lines (preserving tags), writes the new order, preserves blank-line groupings within contiguous blocks.
- Returns HTTP 200 + refreshed list HTML fragment.
- No client-side state. No save button. Drop = committed.

*Alternative B (localStorage flush) was parked: filesystem-truth doctrine rules it out. Silent intermediate state is a debugging trap.*

---

## Implementation notes for camila.lambda

- PHP, no framework, Herd-native (same pattern as `oracle-board/index.php`).
- `planq.md` path: `/Users/verdey/Documents/Claude/Projects/planq.md` — hardcoded constant at top of file.
- Oracle shard directory: `/Users/verdey/.claude/skills/oracle/oracles/` — hardcoded constant.
- No authentication. Localhost-only via Herd (same trust model as `oracle-board`).
- Pico.classless for visual consistency (same as kingdom portal pattern).
