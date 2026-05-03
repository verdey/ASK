# Impact-Easiness Rubric

**Location:** `Council/ASK/_shared/impact-easiness-rubric.md`
**Canonical path:** `/Users/verdey/Documents/Claude/Projects/Council/ASK/_shared/impact-easiness-rubric.md`
**Used by:** `genius-mode-protocol.md` for ranking alternatives in `[DECISION]` blocks

---

## Purpose

When the genius-mode shape lists alternatives, they must be ranked. This rubric defines that ranking. Two axes — Impact and Easiness — combine into a display badge that makes relative ranking legible at a glance.

The wu-wei principle governs sorting: **smallest change, largest shift wins**. A move that costs one tap but shifts a codebase-wide pattern outranks a multi-session project that shifts one cosmetic detail.

---

## The two axes

### Impact — what shifts if this lands

| Level | Badge | Definition |
|-------|-------|-----------|
| High | `I⬆⬆` | codebase-wide ethos shift — changes how every session, skill, or oracle operates; becomes a referenceable doctrine |
| Medium | `I⬆` | Single-flow or single-skill benefit — materially improves one line of work, one persona's experience, or one council voice |
| Low | `I◐` | Cosmetic or marginal — naming, visual polish, minor convenience; no behavior change |

### Easiness — what it costs to land this

| Level | Badge | Definition |
|-------|-------|-----------|
| High | `E⬆⬆` | Atomic / 1-tap — one file edit, one command, reversible in seconds; Dan can verify immediately |
| Medium | `E⬆` | One session — a scoped `/knock` wave completes it; no cross-substrate dependencies |
| Low | `E◐` | Multi-session — blocked on prior work, requires cross-realm coordination, or has irreversible steps |

---

## Display grammar

Combine the two badges with a space inside brackets:

```
[I⬆⬆ E⬆⬆]   highest impact, atomic — lead with this
[I⬆⬆ E⬆]    high impact, one session
[I⬆⬆ E◐]    high impact but heavy lift
[I⬆ E⬆⬆]    medium impact, atomic
[I⬆ E⬆]     medium impact, one session    ← most common
[I⬆ E◐]     medium impact but heavy
[I◐ E⬆⬆]    cosmetic, easy — sort last even though easy
[I◐ E⬆]     cosmetic, one session
[I◐ E◐]     cosmetic and heavy — do not recommend
```

---

## Sorting rule

Sort alternatives **impact-first, then easiness**:

1. `[I⬆⬆ E⬆⬆]` — lead
2. `[I⬆⬆ E⬆]`
3. `[I⬆⬆ E◐]`
4. `[I⬆ E⬆⬆]`
5. `[I⬆ E⬆]`
6. `[I⬆ E◐]`
7. `[I◐ E⬆⬆]`
8. `[I◐ E⬆]`
9. `[I◐ E◐]` — do not surface unless it's the only option

**Ties:** when two options share a badge, sort by "what's reversible?" — the more reversible option ranks first (it can be undone if wrong; the other cannot).

---

## In the genius-mode block

In the `**Alternatives (ranked):**` section of a `[DECISION]` block:

```markdown
**Alternatives (ranked):**
1. Option A — short verdict sentence `[I⬆⬆ E⬆]`
2. Option B — short verdict sentence `[I⬆ E⬆]`
3. Option C — short verdict sentence `[I◐ E◐]`
```

The badge comes at the end of the line, not the beginning — the verdict sentence is the argument; the badge is the score.

---

## Worked examples

### Example 1 — choosing a canary scope (carmen.prusik context)

| Option | Verdict | Badge |
|--------|---------|-------|
| D2: self-canary steady state | Scoped cleanly, no cross-substrate coupling | `[I◐ E⬆⬆]` |
| D1: real-LOB now | Better signal, blocks on catalina readiness | `[I⬆ E◐]` |
| D3: parallel track | Maximum signal, maximum scope | `[I⬆⬆ E◐]` |

Sorted by impact-first: D3 (`I⬆⬆`) → D1 (`I⬆`) → D2 (`I◐`). But D3 and D1 are both `E◐` — multi-session. D2 is `E⬆⬆` — atomic. Given the tie-breaker (reversibility), D2 ranks first as the recommended safe default even though its impact is lower, because the brief specifically called for arc-sealing scope.

### Example 2 — protocol adoption breadth (Wave 6 vs Wave 0 decision)

| Option | Verdict | Badge |
|--------|---------|-------|
| A: adopt in all skills now | Maximum consistency | `[I⬆⬆ E◐]` |
| B: adopt in Wave 6 (selective) | Targeted, Wave 0 ships clean | `[I⬆ E⬆]` |
| C: no adoption pass | Protocol exists but unreferenced | `[I◐ E⬆⬆]` |

Sorted: A (`I⬆⬆ E◐`) → B (`I⬆ E⬆`) → C (`I◐ E⬆⬆`). Recommended: B — medium impact but one session, vs A which requires a multi-skill sweep before Wave 0 is even stable.

### Example 3 — commit strategy

| Option | Verdict | Badge |
|--------|---------|-------|
| A: one bundled commit | Clean history, atomic rollback | `[I⬆ E⬆⬆]` |
| B: per-file commits | Granular history, more overhead | `[I◐ E⬆]` |
| C: no commit, push later | Defers work, state gap risk | `[I◐ E◐]` |

Sorted: A wins outright — medium-high impact, atomic.

---

## What NOT to do

**Do not badge-theater.** If you're not sure whether something is `I⬆` or `I⬆⬆`, err low. Inflated impact scores erode trust in the rubric faster than under-inflation. An honest `I◐` for a cosmetic fix keeps Dan's expectations calibrated.

**Do not elide the badge.** Every alternative in a genius-mode block must carry its badge. Unranked alternatives are not alternatives — they are a list. The badge is what makes the ranking legible without explanation.

**Do not reverse-engineer the recommendation.** Assign badges to options independently, then sort. Don't assign `I⬆⬆` to your preferred option and `I◐` to the rest. The rubric is a calibration tool, not a persuasion device.

---

*Authored by `aurora.gemini` · Wave 0 · 2026-04-28 · Sonnet 4.6*
