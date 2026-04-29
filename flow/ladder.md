# 🌊 The Realization Ladder

*Three tiers of "graduating prose-doc into living code." `/flow realize` recommends a tier per gap; the user picks where to start.*

The ladder is **non-coercive** — Tier 0 is sometimes exactly the right answer. The point is to make the realization path *visible*, not to push every prose-doc up the ladder.

---

## Tier 0 — Name what you have

**What it offers.** A clean read of the current state. The shape is identified, the exemplar is linked, the gap is named. **No new artifacts. No code generated.** The user reads the report and decides whether to climb.

**When it's the right answer.**
- The doc is recent, accurate, and load-bearing — touching it would create churn without payoff
- The user is in flow on something else; this is a "later" item
- The shape is mature enough that further realization would over-engineer
- The realm is small (single-purpose) and prose still serves it well

**Output format.**

> **Found Shape N at `<path>`.** This is the most mature exemplar of this shape in the realm. No realization recommended right now — re-run `/flow realize` after the next significant doc edit.

---

## Tier 1 — Provide the template scaffold

**What it offers.** A blank skeleton at the realization target — empty ADR file, empty session-brief frontmatter, empty HUD card, empty doctrine-checklist YAML. **Five-minute population checklist** the user fills in by hand.

**When it's the right answer.**
- The shape is real but the artifact is over-grown — Tier 1 lets you prune by transcribing
- The user wants to internalize the new structure (manual transcription = learning)
- Auto-generation would lose nuance (the prose carries judgment calls a script can't replicate)

**What `realize` recommends, since it's read-only.**

> **Tier 1 brief.** Hand off to `/knock` with this scaffold spec:
>
> ```
> /knock create-tier1-scaffold <realm> <shape>
> ```
>
> The Catalyst will create the empty `docs/decisions/0001-template.md` (or HUD card, or whatever) and a 5-item checklist of what to populate from the source prose. The Catalyst writes the scaffold; the user fills it in.

---

## Tier 2 — Auto-harvest content from existing prose

**What it offers.** A `/knock` brief that walks the existing prose-doc, extracts structured content, and emits populated artifacts. Assumptions become ADR stubs. RESUME.md becomes a HUD render. Git log becomes a session capsule. **The doc is realized into living code with minimal manual intervention.**

**When it's the right answer.**
- The prose is structured enough to parse (numbered IDs, consistent headings, table-shaped data)
- The volume justifies automation (10+ assumptions, 50+ session entries)
- The user trusts the harvester to make conservative defaults

**What `realize` recommends, since it's read-only.**

> **Tier 2 brief.** Hand off to `/knock` with this harvest spec:
>
> ```
> /knock harvest-shape-N <source-doc> <target-dir>
> ```
>
> The brief should specify: which fields to extract, which to leave behind, what frontmatter schema to use, what to do on parse-failure (warn vs. skip vs. halt). The Catalyst executes the harvest and emits a diff for user review before writing.

**Tier 2 risks the user should weigh before authorizing.**
- **Loss of judgment.** Prose carries soft signals (hedge words, tentative language) that structured fields strip away. Confirm the loss is acceptable.
- **False precision.** A populated ADR can feel "decided" in a way prose doesn't. The Catalyst should preserve uncertainty markers in the harvested frontmatter.
- **Migration drift.** Once harvested, is the source prose deleted or kept as historical reference? Decide before harvest.

---

## How `realize` chooses a tier

`/flow realize` doesn't pick *for* the user — it presents the ladder and recommends a default. The defaults:

| Shape | Default tier | Why |
|-------|--------------|-----|
| 1. Mission HOP | **Tier 1** | Decomposition is delicate; manual transcription preserves nuance |
| 2. State Capsule | **Tier 2** | Highly structured + git is the source of truth; auto-gen is the win |
| 3. Decision Ledger | **Tier 2** | ID-tagged + tabular = parseable; high volume justifies harvest |
| 4. Morning Queue | **Tier 1** | Renders are mechanical, but the *what to render* is judgment-heavy |
| 5. Living Doctrine | **Tier 0** | Often already mature; climb only when cloning to a new realm |

The user can always override. `/flow realize` reports the default, then asks: *"Climb the ladder, or stay here?"*

---

## Constitutional rule for `realize`

`/flow realize` **only recommends**. It never executes any tier. Tier 1 and Tier 2 both produce `/knock` briefs that the Catalyst executes in a fresh tab. This preserves the read-only nature of the modality and the council's hand-off discipline.
