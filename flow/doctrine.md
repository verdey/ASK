# Flow — Doctrine

> *Filesystem telepathy. Every LOB self-narrates from a loud `init.md` into a serialized process tree, and graduates by degrees from Claude-driven markdown → script → app. Living documentation as reference. Acid test: whatever `ls` shows in ascending order IS the order of the Flow.*
> — Dan Greeney, 2026-04-26

---

## What a "flow" is

A **flow** is the motion of a Line of Business (LOB). It has four parts:

1. **A loud entry point** — `init.md` at the LOB root. Lowercase, wu wei, alphabetically first. Names the mission, the cold-boot read order, the current stage, the graduation tier, and a `Blueprint reference` footer that pins the last sync against the living blueprint.

2. **A serialized process tree** — `processes/` with subdirs in OS-ascending-sort order. Each subdir is a stage. The order the filesystem shows IS the order of the work. This is **The Acid Test**: no separate index, no manifest, no scheme — `ls` is the source of truth.

3. **A graduation ladder** — every stage carries a tier (0 through 3) and the upgrade path is named in advance. Tier 0 is markdown Claude runs by hand; Tier 1 is a CLI script; Tier 2 is a PWA/HUD/function for roster self-serve; Tier 3 is an integrated app. A stage advances only when **volume bark + audience bark + stakes bark** fire simultaneously. Until then, the file version is enough.

4. **A living blueprint** — `_flow-blueprint/` at portfolio root. Itself a flow. Active flows clone from it, reference it on cold-boot, and re-sync against it as it improves through AARs. Not a template (copy-and-discard) — a blueprint (consult repeatedly).

---

## The two axioms

**The Acid Test.** *Whatever `ls` shows in ascending order IS the order of the Flow.* No exceptions. If the filesystem and the doctrine disagree, the filesystem wins — or the doctrine gets amended to match.

**Filesystem-Truth.** *Every name or reference in a flow's tree must agree with what is actually present at that path.* Drift between claim and content is the highest-priority fix. Either build the missing thing or amend the claim. Never both, never neither. Papering over drift IS the violation.

---

## What a flow is NOT

- **Not a template.** A template is copy-and-discard. A flow's blueprint is a living reference that flows look back at.
- **Not a kanban board.** Stages are not "to do / doing / done." They are *the work itself*, in order.
- **Not a database schema.** Files are the API. Markdown is the schema. Filesystem is the database. (per `thin-engine.md`)
- **Not a CI/CD pipeline.** A flow may eventually graduate to one. Most never need to.
- **Not a checklist.** A checklist is steps for a person; a flow is the LOB's motion, with its own state, artifacts, and graduation pressure.

---

## The skinny stage shape (canonical, per `flow.md` §1.7)

One primary `.md` file per stage directory. Self-locating via YAML frontmatter. Self-reflective via an inline `## Refine` section. No per-folder `README.md`. No `_graduation.md` sibling. The artifact IS the stage.

```yaml
---
flow: 0NNN-<slug>
role: primary
upstream: 0NNN-<prev>
downstream: 0NNN-<next>
peers: [0NNN-<peer>, ...]
parent: processes/
status: scaffold
---
```

Body opens with a one-sentence mentor-question framing, names *what lives here*, lists *open threads* (with `#hashtags` from `Income/docs/hashtags.md`), seeds a `## Refine` section as `(none yet)`, and closes with a one- or two-line `## Graduation hint`.

**The legacy pair** (`README.md` + `_graduation.md`) is retained for stages that have already graduated past Tier 0 — the per-folder README earns its weight documenting the script/PWA/app the stage now embodies. Tier-0 stages migrate to skinny opportunistically when next /knock-touched. Both shapes coexist; the skinny pattern is the destination.

---

## The cold-boot sequence (any flow, any reader)

```
1. ls <LOB>/                           → init.md is loudest
2. read init.md                        → mission + read order + current stage + tier
3. read CLAUDE.md                      → norms (cascades from portfolio)
4. read docs/cold-boot-brief.md        → state capsule
5. ls processes/                       → see the tree, locate current stage
6. read processes/<active>/<artifact>  → stage doctrine (in/out/owner/loopbacks)
7. ls docs/sessions/                   → next concrete work brief (if any)
```

**Walk-test target:** within 5 listings + 2 file reads, comprehension is complete. **Cold-boot timing target:** < 90 seconds from first `ls` to "I know what to do next."

---

## How a flow graduates

A stage stays at its current tier unless **all three** conditions bark simultaneously:

1. **Volume bark** — manual repetition has become humanly intractable.
2. **Audience bark** — the artifact has graduated past Tier 1 (roster or public uses it daily).
3. **Stakes bark** — compliance, legal, or data-integrity demands it.

Until all three apply: ship the file version and revisit when the bark gets louder. This is `thin-engine.md` doctrine applied to flow stages.

---

## The living blueprint mechanic

`_flow-blueprint/` is itself a flow. It eats its own dogfood. It maintains a `CHANGELOG.md`. Every active flow's `init.md` carries a `## Blueprint reference` footer with a `Last synced` date and a pointer to the CHANGELOG entry current at sync.

On cold-boot, when an active flow's `Last synced` date lags behind a meaningful blueprint CHANGELOG entry, the cold-booting Claude surfaces the divergence in a single line: *"Blueprint added X on YYYY-MM-DD; should this flow inherit?"* Dan greenlights or defers.

The feedback loop:

```
Active flow ships work
        ↓
AAR reveals friction or new generalizable pattern
        ↓
CHANGELOG entry added to _flow-blueprint/ (if pattern generalizes)
        ↓
Other flows see the divergence on next cold-boot
        ↓
Dan greenlights re-sync per flow, per change
        ↓
Flows that adopt the pattern update their Blueprint reference footer
```

---

## Flow's place in the decet

Per `Income/CLAUDE.md` §14, flow is the **ninth doctrine** of the kingdom-wide decet:

1. Stewardship (`harmonic-stewardship.md`) — the role
2. Shape (`delivery-ethos.md`) — what the output looks like
3. Cadence (`working-cadence.md`) — the rhythm
4. Spatial discipline (`filesystem-legibility.md`) — how rooms are organized
5. Operating stance (`thin-engine.md`) — how thin the engine stays
6. Surface choreography (`mind-and-hands.md`) — which app for which mode
7. Projection lens (`hud-artifacts.md`) — substrate → phone-glanceable
8. Pipeline pattern (`workflow-lob.md`) — process-LOBs as serialized pipelines
9. **Motion (`flow.md`) — every LOB's entry point + serialized tree + graduation ladder + living blueprint**
10. Projection-for-people (`projection-for-people.md`) — same substrate, persona-filtered views

Flow is what makes the other nine *traversable*. Without flow, the decet is a constellation of doctrines floating beside each LOB. With flow, every LOB has a path through them: entry point → ordered work → tier → reference.

---

## Why "flow" not "pipeline" or "process"

- **Pipeline** implies one direction, no feedback. Flows have AAR loops back into the blueprint.
- **Process** implies the work is the point. Flows are the *motion of an LOB* — the LOB is the work; the flow is how the LOB moves.
- **Workflow** is the genus; **flow** is what the family of process-shaped and content-shaped LOBs share. Workflow LOBs (`workflow-lob.md`) are a special case where the flow IS the entire deliverable.

---

## How this doctrine evolves

This file is **mutation-only-via-skill** (`/flow curate`). When Dan captures a lesson that supersedes content here, `/flow curate` proposes the edit as a diff and asks for greenlight. The audit trail of every refinement lives in `lessons.md`.

The source-of-truth references — `_flow-blueprint/`, `Income/CLAUDE.md` §14, `Income/docs/flow.md` — are external and authoritative. When they diverge from this file, this file is wrong. Re-sync via Curate.

---

## Companion canon

- [`Income/docs/flow.md`](file:///Users/verdey/code/experimental/Income/docs/flow.md) — the full motion doctrine
- [`Income/CLAUDE.md`](file:///Users/verdey/code/experimental/Income/CLAUDE.md) §14 — the decet
- [`Income/_flow-blueprint/`](file:///Users/verdey/code/experimental/Income/_flow-blueprint/) — the living reference flow
- `showcase.md` — exemplar flows in the wild
- `lessons.md` — curated refinements over time
- `tools-register.md` — bash/scripts that offload long-form file munging from LLMs
