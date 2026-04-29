# Genius-Mode Response Protocol

**Location:** `Council/ASK/_shared/genius-mode-protocol.md`
**Canonical path:** `/Users/verdey/Documents/Claude/Projects/Council/ASK/_shared/genius-mode-protocol.md`
**Symlink alias:** `~/.claude/skills/_shared/genius-mode-protocol.md`

---

## What this is

A shared posture for every council voice at **non-informational crossroads requiring Dan's attention** — moments where the right answer isn't "here is the information" but "here is a decision with stakes." The genius-mode shape is how the kingdom speaks at those moments.

Without this protocol, each skill invents its own decision-time format, override patterns drift, and Dan can't drop a one-liner like `3-c: simpler` and have it parse consistently. With it, every council voice surfaces decisions the same way — structured, ranked, and override-ready.

---

## Trigger: what is a "non-informational crossroads"

Surface the genius-mode shape when **all three** are true:

1. **The agent has a recommendation** — not "I could do X or Y," but "I recommend X."
2. **The stakes are real** — wrong choice costs more than 1 session of rework, has external effects, or forecloses a path.
3. **Dan's judgment is load-bearing** — the agent's best guess is insufficient; the decision needs Dan's context, risk appetite, or values.

**Do NOT trigger for:**
- Informational questions Dan asked for ("what does this file do?")
- Additive no-regret moves that Dan would obviously accept
- Decisions already resolved in the brief or a prior AAR
- Under `/arriba`: compress to the one-line summary form (see "Progressive disclosure" below)

---

## The shape: 7-part genius-mode block

```
### [DECISION] <title>

**Issue:** <one sentence — what decision must be made and why it matters now>

**Considered:**
- <option A> — <one-line tradeoff>
- <option B> — <one-line tradeoff>
- (more if genuinely distinct)

**Recommended:** <option letter/name> — <one clause why this one wins>

**Why harmonic:** <one sentence connecting the recommendation to kingdom ethos, active principles, or stated constraints — name the principle>

**Alternatives (ranked):**
1. <option A> `[I⬆ E⬆]` — <tradeoff sentence>
2. <option B> `[I◐ E⬆]` — <tradeoff sentence>
(see `impact-easiness-rubric.md` for the `[I E]` grammar)

**Override:** `<n>-<letter>` to swap · `<n>-skip` to drop · `✓` or empty to accept
```

---

## Progressive disclosure — P6 in motion

**Full render** (default): the complete 7-part block above, surfaced at the decision moment.

**One-line summary** (under `/arriba` or post-acceptance): compress to:
```
⚡ Rec: [<recommended option>] — `<n>-<letter>` to swap · ✓ to accept
```

The full structure compresses to one line only after the decision is offered. Never pre-compress — the structure IS the argument.

---

## Override syntax reference

Full spec in [`override-grammar.md`](/Users/verdey/Documents/Claude/Projects/Council/ASK/_shared/override-grammar.md). Short form:

| Dan types | Meaning |
|-----------|---------|
| `✓` or empty reply | Accept recommended |
| `2-b` | Swap to option B in recommendation block 2 |
| `2-skip` | Drop recommendation 2 entirely |
| `2-b: simpler` | Swap to B, annotate "simpler" |
| `1-b; 3-skip` | Swap rec 1 to B AND drop rec 3 |

---

## Worked example 1 — Carmen's D decision (scope of validation canary)

**Context:** `carmen.prusik` wave was open — the question was whether to build a second real-LOB canary alongside the `_meta-flow/` self-canary, or accept the self-canary as steady state.

```
### [DECISION] Runner canary scope

**Issue:** Should the quality loop be validated against a real LOB now, or is
`_meta-flow/` sufficient as the sole canary for this arc?

**Considered:**
- D1: build second canary (real LOB) now — stronger signal, higher blast radius
- D2: accept self-canary as steady state — lower risk, defers real-LOB validation
- D3: batch real-LOB + self-canary as parallel track — highest signal, most scope

**Recommended:** D2 — self-canary is sufficient until catalina's LOBs are canonical.

**Why harmonic:** P4 (curation beats accumulation) — adding a real-LOB canary now
couples carmen's arc to catalina's ongoing remediation. The smallest-change
path is to seal carmen clean and reopen when catalina ships.

**Alternatives (ranked):**
1. D2 — self-canary steady state `[I◐ E⬆]` — scoped cleanly, no cross-substrate coupling
2. D1 — real-LOB now `[I⬆ E◐]` — better signal, but blocks on catalina readiness
3. D3 — parallel track `[I⬆⬆ E◐]` — maximum signal, maximum scope

**Override:** `1-d1` to build real-LOB canary now · `1-skip` to defer all · ✓ to accept D2
```

Dan replied: `D2` → accepted. `carmen.prusik` retired without scope.

---

## Worked example 2 — Esperanza's posture choice

**Context:** `esperanza` oracle opened with two competing postures for the kingdom-fitness arc. A (trigger surface dashboard) vs A' (substrate triggers) + B (absorption pilot).

```
### [DECISION] Kingdom-fitness posture

**Issue:** Should the arc lead with a visible trigger dashboard (Posture A) or
substrate sensing hooks that tap Dan on the shoulder (Posture A')? And should
the absorption pilot (Posture B) run before or after the sensing layer?

**Considered:**
- A: dashboard-first — visible, but requires Dan to pull; build complexity up front
- A': substrate hooks first — ambient, tap-not-pull, lower build complexity
- B: absorption pilot first — proves the motion before building infrastructure

**Recommended:** A' + B in sequence — sensing hooks land first, then pilot confirms
the absorption motion with a real tome before any dashboard work.

**Why harmonic:** P6 (context structure is the craft) — substrate hooks are the
lowest-context-cost intervention. P5 (living skills compound) — the pilot IS the
first iteration of the refinement loop. Sequence honors wu-wei: smallest change first.

**Alternatives (ranked):**
1. A' + B (hooks then pilot) `[I⬆⬆ E⬆]` — compound value, low blast radius
2. A (dashboard first) `[I⬆ E◐]` — visible but pull-model; defers sensing layer
3. B only (skip hooks) `[I⬆ E⬆]` — pilot value without ambient sensing

**Override:** `1-a` for dashboard-first · `1-b-only` to skip hooks · ✓ to accept A'+B
```

Dan accepted → esperanza.andromeda (hooks) + esperanza.aquila (pilot) shipped in sequence. ✓

---

## Why this shape — the four principles baked in

**P3 — Memory persistence compounds** (`_shared/genius-mode-protocol.md`):
Each genius-mode block is a structured decision artifact. The `bin/echo-log` helper appends every override to `Tooling/echo/_data/overrides.jsonl` — a persistent record of how Dan's choices diverge from council recommendations over time. That record is the training signal for an increasingly accurate council. The protocol output is not ephemeral; it is the input contract for the kingdom's feedback loop (Wave 4: `aurora.scorpius`).

**P4 — Curation beats accumulation** (`impact-easiness-rubric.md`):
The trigger description above is intentionally narrow — "all three must be true." A protocol triggered on every decision becomes noise; 20% of triggers that actually load Dan's judgment produce 80% of the value. The "Do NOT trigger for" list is as important as the shape itself. Every council skill that adopts this protocol should preserve that boundary — curate when to surface it, not just how.

**P5 — Living skills compound** (`override-grammar.md` + `bin/echo-log`):
The override grammar is the refinement-loop input contract. When Dan writes `3-c: simpler`, that annotation tells the council *why* the recommendation missed. Over time, the `overrides.jsonl` log reveals systematic biases — skills that over-recommend multi-session scope, voices that under-weight easiness. The protocol is not a static shape; it is the mechanism by which the council gets smarter session over session.

**P6 — Context structure is the craft** (progressive disclosure, this file):
The full 7-part block is rendered when surfaced, not summarized. Under `/arriba`, it compresses to one line. This is progressive disclosure in both directions: full fidelity when the decision needs it, minimal footprint when velocity is the mode. The structure is the argument — compressing it prematurely destroys the argument.

---

## Integration contract for skills adopting this protocol

In a skill's `## Shared basics` block, add one line:

```markdown
At non-informational crossroads, surface the [genius-mode shape]
(/Users/verdey/Documents/Claude/Projects/Council/ASK/_shared/genius-mode-protocol.md).
```

**Do not copy-paste the protocol into SKILL.md.** Link to it. One truth, one home.

Wave 6 (`aurora.vega`) runs the adoption check across council skills and selectively adds this line. This wave (Wave 0) establishes the protocol only. No SKILL.md is modified here.

---

## Relationship to other `_shared/` files

| File | Role |
|------|------|
| `genius-mode-protocol.md` (this file) | The decision shape and trigger contract |
| `impact-easiness-rubric.md` | How to rank alternatives with `[I E]` grammar |
| `override-grammar.md` | Parser contract for Dan's reply syntax; consumed by `bin/echo-log` |
| `bin/echo-log` | Shell helper that persists override choices to `overrides.jsonl` |

---

*Authored by `aurora.gemini` · Wave 0 · 2026-04-28 · Sonnet 4.6*
*Sealed by 🗝️ Keeper as part of the Council Genius-Mode Response Protocol arc.*

---

## Lessons learned — adoption experience (Wave 6 / aurora.vega · 2026-04-28)

### Override syntax `1-c: simpler` feels natural; `1-skip` less so

**Observation:** After Arc-3 first adoption, the swap+annotate form (`1-c: simpler`) feels ergonomic — the annotation is the most valuable part for echo-classify. The bare `1-skip` form is underused; Dan tends to drop context entirely rather than tagging the skip explicitly.

**Implication:** A future `delete` or `cancel` semantic may be worth adding (e.g., `1-x` as shorthand for skip-with-no-regret). For now, `1-skip` is correct and the annotation is optional — but the protocol should explicitly note that annotating a skip ("1-skip: wrong direction entirely") is more useful than a bare skip.

**Status:** captured-2026-04-28 · aurora.vega · watch for recurrence in echo classify output

### The protocol shape surfaces well at natural branching points, not everywhere

**Observation:** The "Resume vs. birth" moment in oracle's SELF-NAME step is a natural fit for the `[DECISION]` block — it's genuinely non-obvious in the edge cases (scope match + old timestamp + orthogonal arc). But applying the full 7-part block to every fork in every skill would drown the flow in ceremony.

**Implication:** The trigger criteria (recommendation + real stakes + Dan's judgment load-bearing) are the right filter. Don't expand the protocol to informational branches or additive no-regret moves. One well-placed block per session is better than five perfunctory ones.

**Status:** captured-2026-04-28 · aurora.vega
