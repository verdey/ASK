# Triage Priority Rubric

**Location:** `Council/ASK/triage/rubric.md`
**Mutates only via:** `/triage` skill (curate path, or via `review-yesterday` lesson promotion)

---

## Purpose

Defines how `/triage today` converts kingdom signals into a ranked move list. Each signal source has a weight tier. Signals within a tier are ordered by their Impact-Easiness badge (see `_shared/impact-easiness-rubric.md`).

---

## Signal weight tiers (highest to lowest)

### Tier 1 — Stalled flows `[I⬆⬆ E⬆]` (weight: 100)

**Definition:** A flow run has been in `running` state for > 2× its median run time, or is in `stalled` state in the flow-queue.

**Source:** `api.php?action=queue` → entries with `state: stalled`

**Signal extract:** flow name + stall duration + `run_id`

**Move format:** "Unstick [flow name] — stalled [N hours]"

**Null behavior:** if no stalled flows, skip tier entirely.

**Why this is Tier 1:** A stalled flow is actively blocking — it may be holding a lock, consuming memory, or blocking downstream steps. It cannot self-resolve. This is the kingdom's most concrete blocker.

---

### Tier 2 — Overdue backlogs `[I⬆ E⬆]` (weight: 80)

**Definition:** A realm's `_BACKLOG.md` has a line item with a due date (format: `due: YYYY-MM-DD`) that is today or in the past, or the `_BACKLOG.md` itself has an mtime > 14 days without any modification (suggesting the backlog has been ignored).

**Source:** Walk all realm directories for `_BACKLOG.md` files. Parse due-date lines. Check mtime for the 14-day rule.

**Signal extract:** realm name + backlog item + days overdue

**Move format:** "Close [backlog item] in [realm] — [N days] overdue"

**Null behavior:** if no overdue backlogs, skip tier.

**Why Tier 2:** Overdue items represent explicit commitments. They don't self-escalate; someone wrote them down and they've been waiting. Impact is bounded to one realm, but easiness is high — the work is already defined.

---

### Tier 3 — Blueprint drift `[I⬆ E⬆]` (weight: 60)

**Definition:** A flow's `init.md` has a `## Blueprint reference` block with `Last synced` date > 30 days ago, OR `/flow audit` of the flow returns tier < Canonical.

**Source:** Walk `Finance/Income/Flows/LOBs/*/init.md` and `Live/*/init.md` for `Last synced` dates. Compare against `_flow-blueprint/` CHANGELOG mtime.

**Signal extract:** flow name + days since last sync + tier gap

**Move format:** "Re-sync [flow name] with blueprint — [N days] since last sync"

**Null behavior:** if all flows are within 30 days, skip tier.

**Why Tier 3:** Blueprint drift is a slow-moving risk — it doesn't block today, but each session that runs against a drifted blueprint reinforces the drift. 30 days is the threshold before compounding cost exceeds the sync cost.

---

### Tier 4 — Roster top-of-mind `[I⬆ E⬆]` (weight: 40)

**Definition:** Dan has a `_current-profile.md` entry in memory with a named active focus or active decision. This is what Dan has actively said is on his mind.

**Source:** `~/.claude/projects/-Users-verdey-Documents-Claude-Projects/memory/_current-profile.md`

**Signal extract:** active focus bullet points

**Move format:** "[active focus item from profile]"

**Null behavior:** if profile has no active focus, skip tier.

**Why Tier 4:** Roster signals are explicit — Dan wrote them down as active. They outrank ambient signals but sit below structural blockers (stalls, overdue commitments). These are the moves Dan would choose independently; triage just surfaces them.

---

### Tier 5 — Active flows `[I⬆ E⬆]` (weight: 20)

**Definition:** A flow has an `index.html` or `runs.jsonl` with mtime < 48 hours, suggesting active use.

**Source:** Walk `Finance/Income/Flows/LOBs/*/` and `Live/*/` for recent mtime signals.

**Signal extract:** flow name + last touched + what step is next (from `processes/` ascending order)

**Move format:** "Continue [flow name] — next step: [step name]"

**Null behavior:** if no flows touched in 48 hours, skip tier.

**Why Tier 5:** Active flows have momentum. Continuing them has high easiness (context is warm) but lower impact than stalls or overdue items — the work isn't blocked, just paused.

---

## Ranking algorithm

```
1. Collect all signals across Tiers 1–5
2. For each signal, assign:
   - base_weight = tier weight (100 / 80 / 60 / 40 / 20)
   - urgency_modifier = +20 if due today or already past due
                        +10 if stall > 4 hours
                        +5  if last touched < 6 hours ago
3. total_score = base_weight + urgency_modifier
4. Sort descending by total_score
5. Tiebreak: higher Impact-Easiness badge ranks first
6. Truncate at 10 moves; top 5 surfaced prominently
```

---

## Impact-Easiness badge assignment

Apply `_shared/impact-easiness-rubric.md` to each move:

| Signal type | Default badge | Rationale |
|-------------|--------------|-----------|
| Stalled flow | `[I⬆⬆ E⬆]` | High impact (blocking), one session to unstick |
| Overdue backlog (days) | `[I⬆ E⬆]` | Medium impact (one realm), one session |
| Overdue backlog (mtime) | `[I⬆ E⬆⬆]` | Medium impact, atomic (just review + prune) |
| Blueprint drift | `[I⬆ E⬆]` | Medium impact, one session |
| Roster focus | `[I⬆ E⬆]` | Medium impact, one session |
| Active flow continuation | `[I⬆ E⬆]` | Medium impact, one session |

Badges may be adjusted upward if urgency_modifier fires.

---

## Rubric calibration via review-yesterday

After a week of `/triage today` + `/triage review-yesterday` cycles, patterns should emerge in `lessons.md`:
- Which tier's signals actually get actioned?
- Which signals are consistently deprioritized despite high score?

Use those lessons to adjust tier weights. The rubric is not fixed — it is the living output of the calibration loop.

---

*Authored by `aurora.leo` · Wave 1 · 2026-04-28 · Sonnet 4.6*
