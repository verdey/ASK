# Portal Lessons

**Location:** `Council/ASK/portal/lessons.md`
**Mutates only via:** `/portal` skill (curate path)

Curated insights about the kingdom portal surface captured over time. Each entry is dated and flagged.

---

## 2026-04-28 — Today's Moves cards collapse to one-line summaries when overrides land (Arc-3 closeout)

**Rule:** Under `/arriba` posture, every `[DECISION]` block in a Today's Moves card compresses to the one-line `⚡ Rec:` form — not the full 7-part shape. The full structure is reserved for focused, non-arriba sessions where Dan is actively steering.

**Why:** Arc-3 Wave 5 shipped the band wiring; first real-session experience confirmed that the full block in a fast session creates friction rather than clarity. The one-liner is actionable; the full block is deliberative.

**How to apply:** Portal-generated `[DECISION]` cards detect `/arriba` state (via session posture) and render compressed. Skill-generated cards inside `/arriba` sessions are the skill's responsibility — the protocol's progressive-disclosure section covers this.

**Status:** captured-2026-04-28 · aurora.vega Arc-3 closeout

---

## 2026-04-28 — omega-fragment.json opt-in is the Insight Fragments band's quality gate (Arc-3 closeout)

**Rule:** Flows that emit `omega-fragment.json` alongside their `index.html` get a rendered Insight Fragment card with a chart. Flows without one get a default text-card. The portal renders both but surfaces the opt-in cards first. This is intentional: the fragment is the signal that a flow is mature enough to be worth a glance.

**Why:** The harvester's first real run (Wave 4) found 20 flows; only 3 had opted in. Default text-cards make the absence visible without blocking the band from rendering at all.

**How to apply:** When scaffolding a new flow, the first graduation milestone from Tier 0 → Tier 1 is authoring `omega-fragment.json`. Portal audit should flag flows with non-empty `index.html` but missing fragment as "promote to opt-in" moves.

**Status:** captured-2026-04-28 · aurora.vega Arc-3 closeout
