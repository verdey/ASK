# Flow doctrine — read the codebase

The doctrine of flows is **not held here**. It lives in the substrate it describes. This file is a thin pointer-index for the `/flow doctrine` modality and a holder for the skill-side taxonomy the codebase doesn't carry.

```
   The codebase IS the doctrine            This file is the chat-emit shim
   ┌────────────────────────────┐         ┌──────────────────────────────┐
   │ _flow-blueprint/           │  ───▶   │ ~/.claude/skills/flow/       │
   │   processes/  (the work)   │         │     pointer + skill-side     │
   │   CHANGELOG.md  (events)   │         │     taxonomy only)           │
   │ Income/docs/flow.md        │         └──────────────────────────────┘
   │ Income/CLAUDE.md §14       │
   └────────────────────────────┘
```

## Where to read

- **The motion in full prose** → `/Users/verdey/Documents/Claude/Projects/Finance/Income/docs/flow.md` (axioms, graduation ladder, cold-boot sequence, living-blueprint mechanic, skinny pattern).
- **Where flow sits in the decet** → `/Users/verdey/Documents/Claude/Projects/Finance/Income/CLAUDE.md` §14.
- **The three axioms** (Acid Test, Filesystem-Truth, Runtime declaration) → `Income/docs/flow.md` §1.2.

New flow doctrine is never authored here. It lands in `/Users/verdey/.claude/skills/flow/lessons.md`, gets promoted via `/flow promote` directly into the codebase paths above, and this index updates its pointers.

---

## Skill-side taxonomy (not yet codebase doctrine)

These three sections are skill curation that the codebase hasn't formalized. They guide `/flow audit` and friends. Promote to the codebase only when they earn it.

### Flow archetypes

A flow's archetype answers *what shape of work does it do?* — orthogonal to composition. Four are recognized:

- **Stitch flow.** Read-only over substrate; deliverable is one stable artifact at a known path that aggregates outputs from elsewhere. Contract: stable artifact path, dated snapshots beside it, self-refresh comment block at top of artifact, read-only over substrate, defang-don't-break for foreign content, declarative knobs separate from mechanical execution, live HTTP surface (Herd valet domain).
- **Living-blueprint flow.** Itself a flow AND the canonical reference other flows clone from. Maintains `CHANGELOG.md`. Source blueprint is `_flow-blueprint/`; derivative blueprints are scoped to a domain (e.g., `_short-sale-deal-blueprint/`).

### Audit corollaries

Skill-internal rules `/flow audit` enforces beyond the codebase's three axioms:

- **Documented intent over shape inference.** Before flagging a step as orphan/drift/misplaced, read its `step.md` / `README.md` / `_graduation.md` and any ADR in `docs/decisions/`. Documented intent beats archetype assumption. Precedent: 2026-04-27 audit of `_flow-navigator` would have deleted the Phase 3 co-creation harvest step as "orphan tail" without this rule.
- **Runtime declaration vs. executor support.** When a step declares `Runtime: SCRIPT` or `composite`, audit verifies (1) `## Invocation` fenced bash block present (for SCRIPT) and (2) the runner version supports the declared runtime — check `Tooling/flow-runner-llm/CLAUDE.md` §Runtimes. If the runner lacks the executor, surface as `⚠️ runtime-not-implemented`. Dry-run green ≠ live-click green.

### The step-content shape question (open)

The folder convention is settled (Acid Test). The *shape inside each folder* is intentionally pluralistic — three valid shapes coexist (skinny artifact / legacy `README.md` + `_graduation.md` pair / prose-skinny `step.md`). The data picks the canonical shape, not the doctrine: every step run emits a JSONL line to `<flow-root>/_audit/runs.jsonl` with `shape`, `surface`, `duration_s`, `manual_fixups`. After ~50 runs, Streamline reasons about which shapes correlate with high friction. Until then, audit flags only **absence of any shape** as a violation. Full self-logging spec lives at `Income/docs/flow.md` §1.7.

---

## Companion files (skill-side substrate)

- `/Users/verdey/.claude/skills/flow/lessons.md` — append-only running log of captured insights (the upstream feeder of all promotions to the codebase).
- `/Users/verdey/.claude/skills/flow/tools-register.md` — bash/script recipes that offload long-form file munging from LLMs.
- `/Users/verdey/.claude/skills/flow/showcase.md` — pointer-index of exemplar flows.
- `/Users/verdey/.claude/skills/flow/shapes.md`, `exemplars.md`, `ladder.md` — `/flow realize` modality internals.

## How this file evolves

Mutation-only-via-skill. `/flow curate` captures observations to `lessons.md`. `/flow promote` applies promotions — to the codebase when the substrate is universal flow doctrine, to this file's taxonomy section when it's skill-curated. Pointer drift between this file and the codebase is itself an audit signal.
