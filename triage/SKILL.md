---
name: triage
description: "📋 Triage — Daily prioritization curator. Computes today's top moves from kingdom signals: stalled flows, overdue backlogs, blueprint drift, active roster. Owns the priority rubric and signal-source registry. Read-only over kingdom substrate; mutates only its own knowledge base."
argument-hint: "[today | rubric | sources | snapshot | review-yesterday]"
---

# 📋 triage — Daily Prioritization Curator

*The kingdom has signals. Triage reads them all and tells you what matters today.*

> **Sits beside:** `portal/priority-rubric.md` (how the portal renders this output) and `_shared/impact-easiness-rubric.md` (the ranking system applied to selected moves). Triage computes; portal renders.

---

## What this skill is

`/triage` is a **knowledge-curated skill** that owns the kingdom's daily prioritization logic. It holds:

1. The **priority rubric** — weighted signal sources and how they combine into ranked moves (`rubric.md`)
2. The **signal sources registry** — every path triage reads, its freshness rule, and null behavior (`sources.md`)
3. A **state file** — today's computed moves, written each run, read by portal (`_state/today.json`)
4. A curated **lessons** log — patterns from `review-yesterday` modality (`lessons.md`)

Read-only over all kingdom substrate. The only files this skill mutates are its own knowledge files and `_state/today.json`.

---

## Modalities

Parse `$ARGUMENTS`. The first word is the modality. If `$ARGUMENTS` is empty, render the **Interactive menu** (below).

| Modality | Invoke | What it does |
|----------|--------|--------------|
| Today | `/triage today` | Reads all signal sources, applies rubric, writes `_state/today.json`, renders top moves. |
| Rubric | `/triage rubric` | Reads `rubric.md` — the priority computation logic. |
| Sources | `/triage sources` | Reads `sources.md` — signal source registry with freshness rules. |
| Snapshot | `/triage snapshot` | Reads current `_state/today.json` without recomputing. |
| Review yesterday | `/triage review-yesterday` | Compares yesterday's snapshot (if available) to what actually got done; proposes a lesson for `lessons.md`. |

### Bare invocation: Interactive menu

When `$ARGUMENTS` is empty, render this menu and wait for selection:

```
📋 /triage — pick a modality:

   1. Today           — compute today's top moves from kingdom signals
   2. Rubric          — how priority is computed (the weight logic)
   3. Sources         — signal source registry + freshness rules
   4. Snapshot        — read today.json without recomputing
   5. Review yesterday — compare yesterday's plan to what shipped

Reply with a number, a name, or a sentence ("what's most important today?").
```

Then dispatch on the user's reply.

---

## Modality contracts

### 1. Today

Walk all signal sources in `sources.md` order. For each, check freshness and extract the signal. Apply the rubric weights from `rubric.md`. Produce a ranked list of moves (maximum 10, top 5 surfaced prominently).

Write result to `~/.claude/skills/triage/_state/today.json`:

```json
{
  "computed_at": "<ISO-8601>",
  "moves": [
    {
      "rank": 1,
      "title": "<one-line move>",
      "signal": "<signal-type>",
      "realm": "<relative path>",
      "open_thread": "<relative path to source file>",
      "impact_easiness": "<badge>"
    }
  ]
}
```

When move cards reference any web surface, read [`../ask/_src/surface-doctrine.md`](../ask/_src/surface-doctrine.md) — the `.test` surface map — to link the right URL as the live entry point (e.g. `http://alpha.test` for kingdom entry, `http://flow-queue.test` when a flow run is active).

Render moves in this format:

```
📋 Today's Top Moves — <date>

#1  🔴 Stalled   <move title>                        [I⬆⬆ E⬆]
    ↪ realm/path/to/open_thread

#2  🟠 Overdue   <move title>                        [I⬆ E⬆]
    ...
```

### 2. Rubric

Read `~/.claude/skills/triage/rubric.md` and emit it. If the user asks "why is X ranked higher than Y?", answer from the rubric's weight table first.

### 3. Sources

Read `~/.claude/skills/triage/sources.md` and emit it. If the user asks "where does triage look for backlog signals?", answer from the sources table.

### 4. Snapshot

Read `~/.claude/skills/triage/_state/today.json` and render it in the same format as `today` modality output, but with a header noting it is a cached snapshot and the `computed_at` time.

### 5. Review yesterday

1. Read `_state/today.json` (yesterday's snapshot, if `computed_at` < today).
2. Ask Dan which moves from that list actually got done (use `AskUserQuestion` with the ranked list).
3. Compute accuracy: what was predicted vs. what shipped.
4. Propose a lesson for `lessons.md` based on any systematic misses (e.g., "stalled flows consistently don't get touched — lower their weight?").
5. On Dan's greenlight, append to `lessons.md`.

---

## Operational rules

- **Read-only over all kingdom substrate.** Never write to realm directories, LOBs, or flow state. The only write path is `_state/today.json` and `lessons.md`.
- **Freshness-first.** Never use a signal source if it hasn't been touched in > 30 days — flag as dormant in the output.
- **Triage computes, portal renders.** Do not add display logic here; the portal contract lives in `portal/priority-rubric.md`.
- **Impact-easiness is the ranking tiebreaker.** When two signals have equal weight, rank the higher `[I E]` badge first. Rubric in `_shared/impact-easiness-rubric.md`.
- **Maximum 10 moves.** Beyond 10, the list is noise. If > 10 signals fire, apply cutoff at weight threshold.

---

## Shared basics

Hyperlink whenever possible. Bias for clarity. Much love, much peace. ✨

When at a non-informational crossroads, render per [`_shared/genius-mode-protocol.md`](../_shared/genius-mode-protocol.md).

---

## Companion files

- [`rubric.md`](rubric.md) — priority computation: signal sources, weights, ranking logic
- [`sources.md`](sources.md) — signal source registry with paths + freshness rules
- [`lessons.md`](lessons.md) — patterns from `review-yesterday` modality
- [`_state/today.json`](_state/today.json) — computed moves, written each `/triage today` run
