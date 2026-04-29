---
name: sketch
description: 🎨🖼️ Sketch — When you're about to ask Dan a UI/UX clarifying question whose answer is visual, aesthetic, or layout-shape (not architecture, schema, scope, or destructive action) AND the realm's stack/ethos is already established, suppress the question and dispatch 2–5 ranked variants in parallel as ephemeral preview prototypes, then surface a multiple-choice gallery rolled into Dan's flow surface. Trigger this skill whenever the next move would be a clarifier like "do you want X or Y?", "should the filter bar be inline or a drawer?", "what color for the paused-state pill?", "modal or page for the diff view?", "tighter spacing or roomier cards?" — basically any moment where seeing 3 options beats describing 3 options. Also trigger when Dan says "sketch", "show me options", "prototype these in parallel", "give me a gallery", or "stop asking, just try them." Do NOT trigger for scope/budget/deadline/destructive questions, schema or API contract decisions, dependency choices, or when fewer than ~3 defensible candidates can be ranked from current context.
---

# 🎨🖼️ Sketch — Show, don't ask

*When the answer is visual, the question is the wrong move.*

Sister vessel to [`/parallel`](../parallel/SKILL.md) (dispatch) and [`/flow`](../flow/SKILL.md) (surface). Council-adjacent, not a triad member. Born from a [Skillz audit](../skillz/SKILL.md) on 2026-04-27.

---

## Charter

When Claude is about to ask Dan a clarifying question whose answer is **visual, aesthetic, or structural-with-2-to-5-defensible-defaults** — and Dan's ethos and stack for the current realm are already established (Pico.classless, static HTML, kingdom conventions, no build step, etc.) — **suppress the question.** Generate 2–5 ranked variants in parallel via [`/parallel`](../parallel/SKILL.md), package each with a 1-line rationale + ephemeral preview link, surface them as a multiple-choice gallery rolled into Dan's active flow surface. Selection prunes the others.

The reason this matters: Dan can pick visually in one click. Describing options costs both of us a paragraph each and produces a worse answer because the words don't render.

---

## Sensing rule (auto-trigger)

All three must hold before suppressing the question:

1. **Next move is a clarifier to Dan.** You're about to ask "do you want X or Y?", "should this be A or B?", or any variant.
2. **The answer space is visual / layout / interaction-shape.** Not architecture, not data model, not external contract, not scope.
3. **Stack and ethos for the realm are established.** You can rank 2–5 defensible candidates without further input. Read the realm's `CLAUDE.md` if uncertain — the kingdom's conventions are usually right there.

If all three hold: don't ask. Sketch.

## Anti-triggers (still ask, don't sketch)

- **Scope, budget, deadline, or destructive-action questions.** "Should I delete the old realms folder?" → ask, never sketch.
- **Choices with compounding downstream consequences.** Schema changes, API contracts, dependency swaps. Five variants of a database migration is not a gallery, it's chaos.
- **Genuinely low confidence in ranking.** If you can't surface ~3 defensible candidates from current context, ask — sketching slop wastes both of you.
- **Dan explicitly asked for a recommendation, not options.** "Just pick one" means pick one, not paint five.

When in doubt about whether a question is sketchable, route to [`/oracle`](../oracle/SKILL.md) for a quick scoping read instead.

---

## Invocation modes

### User-triggered

```
/sketch <brief>
```

Dan invokes explicitly. Dispatch immediately. Example:
- `/sketch status pill styles for the portal cards`
- `/sketch filter bar — inline vs drawer vs collapsible`
- `/sketch diff page layout`

### Auto-triggered

The skill's `description:` is tuned to fire when you're about to ask a visual clarifier with established stack. Reinforced by the feedback memory at `~/.claude/projects/-Users-verdey-Documents-Claude-Projects/memory/feedback_sketch_over_asking.md`. When both signals align, sketch instead of asking — no need to wait for `/sketch` to be typed.

---

## Dispatch contract

Hand off to `/parallel`:

```bash
/parallel run sketch-gallery <brief>
```

> **Note:** The `sketch-gallery` script does not yet exist in `~/code/experimental/parallelism/scripts/`. That's downstream work — route via [`/oracle`](../oracle/SKILL.md) for scoping, then [`/knock`](../knock/SKILL.md) for build. Until it exists, fall back to dispatching variants by hand: scaffold N ephemeral worktrees or static preview files in `/tmp/sketch-<timestamp>/variant-{1..N}/`, generate each, link them.

The dispatcher's job:
1. Decompose the brief into 2–5 distinct variants (different enough to be a real choice — avoid near-duplicates).
2. Rank them by ethos+stack fit (1 = top pick).
3. Generate each variant in its own ephemeral artifact (worktree, static HTML, or whatever the realm's surface needs).
4. Return a manifest:

```json
{
  "brief": "filter bar — inline vs drawer vs collapsible",
  "variants": [
    {
      "rank": 1,
      "name": "inline-pico",
      "rationale": "Inline above the table — fewest chrome elements, leans into Pico's form-row pattern, no JS.",
      "preview": "file:///tmp/sketch-<ts>/variant-1/index.html"
    },
    {
      "rank": 2,
      "name": "right-drawer",
      "rationale": "Slide-out drawer on the right — keeps the table full-width, minor JS for toggle.",
      "preview": "file:///tmp/sketch-<ts>/variant-2/index.html"
    },
    { "...": "..." }
  ],
  "ephemeral_root": "/tmp/sketch-<ts>/"
}
```

---

## Surface contract (the gallery)

The gallery is rendered as a flow card so Dan picks from the same surface he already lives in. [`/flow`](../flow/SKILL.md) owns the card-rendering contract; future work registers a `gallery` card type there.

Until that lands, the fallback is fine: surface the variants inline as a markdown list with preview links + the rationale, ranked top-to-bottom. Dan replies with the variant name (`"go with inline-pico"` or just `"1"`).

**On selection:**
1. The chosen variant is promoted (copied to its destination in the realm).
2. The other variants are swept from `/tmp/sketch-<ts>/`.
3. The selection is logged so future audits can learn from picks.

---

## Why this skill exists

Dan flagged on 2026-04-27 that the clarifying-question reflex slows creative briefs. When he hands sub-pieces like *"the filter bar, the diff page, the cron trigger,"* the fastest path is **parallel prototypes he can pick from visually**, not a back-and-forth essay. His ethos is established (kingdom conventions are tight and documented), so ranking 5 defensible variants is feasible from context alone — no clarifier needed.

[Skillz](../skillz/SKILL.md) audited the request and verdict was **CREATE — composition-flavored**: the dispatch already exists (`/parallel`), the surface already exists (`/flow`), the scoping already exists (`/oracle`). The novel piece is the **sensing layer** that suppresses the unnecessary question. That's this skill.

---

## Rules

- **Sketch, don't deliberate.** If the sensing rule fires, dispatch. Don't pause to second-guess — that's the same trap as asking the question.
- **Variants must differ meaningfully.** Three near-identical riffs is not a gallery, it's a waste. If you can't surface 3+ genuinely distinct options, fall back to asking.
- **Always rank.** Top pick is rank 1. Rationale is one line, not a paragraph.
- **Ephemeral by default.** Generated artifacts live in `/tmp/sketch-<ts>/` and get swept on selection. Don't pollute the realm.
- **Stay out of architecture decisions.** This vessel is for the visual layer. Schema/API/dependency questions route to [`/oracle`](../oracle/SKILL.md) for scoping, never here.
- **Don't sketch destructive actions.** "Five ways to delete the old database" is not a gallery. Ask, always.

---

## Files

| File | Role |
|------|------|
| `SKILL.md` | This file. |

(Lean by design. The dispatch logic lives in `/parallel`, the surface logic lives in `/flow`. This skill is the trigger + the contract.)
