# Triage Signal Sources Registry

**Location:** `Council/ASK/triage/sources.md`
**Mutates only via:** `/triage` skill (curate path)

---

## Purpose

Authoritative registry of every path triage reads when computing moves. Each source has: path, signal type, freshness rule, what it contributes, and null behavior.

---

## Sources table

| # | Source path | Signal type | Freshness rule | Contributes | Null behavior |
|---|-------------|-------------|---------------|-------------|---------------|
| 1 | `api.php?action=queue` | Stalled flows | Any entry with `state: stalled` or `state: running` + duration > 2× median | Move: "Unstick [flow]" | Skip Tier 1 |
| 2 | `*/realm/_BACKLOG.md` | Overdue backlogs | `due: YYYY-MM-DD` lines at or past today; OR file mtime > 14d | Move: "Close [item] in [realm]" | Skip Tier 2 |
| 3 | `Finance/Income/Flows/LOBs/*/init.md` | Blueprint drift | `Last synced` in `## Blueprint reference` > 30d ago | Move: "Re-sync [flow]" | Skip Tier 3 |
| 4 | `Live/*/init.md` | Blueprint drift | Same freshness rule as #3 | Move: "Re-sync [realm]" | Skip Tier 3 (if no Income flows fire either) |
| 5 | `~/.claude/projects/-Users-verdey-Documents-Claude-Projects/memory/_current-profile.md` | Roster focus | Any active focus bullet present | Move: "[focus item]" | Skip Tier 4 |
| 6 | `Finance/Income/Flows/LOBs/*/` + `Live/*/` | Active flow | mtime of `index.html` or `runs.jsonl` < 48h | Move: "Continue [flow]" | Skip Tier 5 |

---

## Source detail

### Source 1 — Flow queue (`api.php?action=queue`)

**Path:** `http://alpha.test/api.php?action=queue` (localhost only)

**What to look for:**
- Entries where `state === 'stalled'` — these are priority (Tier 1)
- Entries where `state === 'running'` and age > 2h — secondary signal

**Parse method:** JSON response; array of `{run_id, slug, state, started_at, log_path}`.

**Null check:** HTTP 200 + empty array → no stalled flows → skip Tier 1.

**Failure behavior:** If `api.php` is unreachable (Herd down), log "flow-queue source unavailable" and skip Tier 1 without failing the full triage run.

---

### Source 2 — Realm backlogs (`_BACKLOG.md`)

**Path pattern:** `~/Documents/Claude/Projects/**/_BACKLOG.md`

**Walk method:** `find ~/Documents/Claude/Projects -name "_BACKLOG.md" -not -path "*/node_modules/*" -not -path "*/.git/*"`

**What to look for:**
- Lines matching `due: YYYY-MM-DD` where the date ≤ today → overdue item
- Files with mtime > 14 days → neglected backlog (even without explicit due dates)

**Extract format:** For due-date lines, extract the preceding bullet as the item text. For mtime-only, use the first H2 heading as the item.

**Null check:** No `_BACKLOG.md` files found, or none overdue → skip Tier 2.

---

### Source 3 — Income flow blueprints

**Path pattern:** `~/Documents/Claude/Projects/Finance/Income/Flows/LOBs/*/init.md`

**What to look for:** `## Blueprint reference` block containing `Last synced: YYYY-MM-DD`. If that date is > 30 days ago, or the block is missing entirely, signal fires.

**Extract format:** Flow name (from `init.md` H1 or parent directory name) + days since last sync.

**Null check:** All flows synced within 30 days → skip this part of Tier 3.

---

### Source 4 — Live realm blueprints

**Path pattern:** `~/Documents/Claude/Projects/Live/*/init.md`

**Same logic as Source 3.** Separate entry because Live realms are a different tree with different velocity expectations — they may drift faster than Income LOBs.

---

### Source 5 — Memory profile (`_current-profile.md`)

**Path:** `/Users/verdey/.claude/projects/-Users-verdey-Documents-Claude-Projects/memory/_current-profile.md`

**What to look for:** Any bullet point under an "Active focus" or "Current priorities" heading. Also any `#decision-pending` items.

**Extract format:** Each bullet becomes a separate move candidate. Sort by order in the file (first = most front-of-mind).

**Null check:** File exists but no active-focus section → skip Tier 4. File missing → skip Tier 4 with a note.

---

### Source 6 — Active flow mtime

**Path pattern:** `~/Documents/Claude/Projects/Finance/Income/Flows/LOBs/*/index.html` and `*/runs.jsonl`; `~/Documents/Claude/Projects/Live/*/index.html`

**What to look for:** Any file with mtime < 48 hours → flow is warm.

**Extract format:** Flow name + last-touched time + next step (from `processes/` OS-ascending-sort: first un-graduated step).

**Null check:** No flows touched in 48h → skip Tier 5.

---

## Adding a source

To add a new signal source, append a row to the table above and add a detail section. The `rubric.md` tier weights should be updated to account for the new signal's weight. File a `/triage curate` entry noting the addition.

---

## Source walk order

Triage walks sources in the order listed (1 → 6). This order is not importance order (that's the rubric weight) — it is the order that minimizes filesystem I/O:

1. Network (queue) first — fails fast if unavailable
2. Glob walk (backlogs) — single `find` pass
3. Blueprint checks — targeted `grep` on found `init.md` files
4. Memory read — single file
5. Mtime checks — quick `stat` pass on known paths

---

*Authored by `aurora.leo` · Wave 1 · 2026-04-28 · Sonnet 4.6*
