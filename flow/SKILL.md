---
name: flow
description: "🌊 Flow — Lines of Business and the prompt-folder craft. Curates the evergreen doctrine of flows, audits maturity against the blueprint, streamlines existing flows (including LLM→script offload via a tools register), and scaffolds new ones from _flow-blueprint. Read-only over LOBs; mutates only its own knowledge base."
argument-hint: "[doctrine | showcase | audit <path> | streamline <path> | realize <path> | new <name> | curate <observation> | curate-batch | promote <lesson-id> | nav | tools]"
---

# 🌊 flow — Flow

*The doctrine of flows: how a Line of Business organizes its prompts, assets, and motion into a serialized, walk-testable tree that graduates by degrees.*

*Skillz curates the council; Flow curates the LOBs. Sister librarians.*

> **Sits beside:** `_flow-blueprint/` (the canonical structural template Dan keeps in `Income/`) and the decet of doctrines in `Income/CLAUDE.md` §14. This skill is the conversational surface for that doctrine — Dan can ask "what's a flow again?" or "is this a flow?" without context-switching to the repo.

---

## What this skill is

`/flow` is a **knowledge-curated skill** in the spirit of `/oracle` and `/ask`. It owns:

1. The **evergreen definition** of a "flow" (`doctrine.md`)
2. A **showcase** of 3–5 exemplar flows and what each one teaches (`showcase.md`)
3. A growing log of **curated lessons** Dan captures over time (`lessons.md`)
4. A **tools register** of bash/scripts that offload long-form file munging from LLMs (`tools-register.md`)

**Three-layer LOB matrix** — how doctrine, tuning, and runtime stack:

```
┌─────────────────────────────────────────────────────────────────┐
│  🌊  Layer 1 — Evergreen Doctrine                               │
│      doctrine.md · showcase.md · lessons.md · tools-register   │
│      The canonical "what is a flow?" — mutates only via /flow   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  📂  Layer 2 — Per-LOB Tuning                            │  │
│  │      Income/Flows/LOBs/<lob>/   Live/<realm>/            │  │
│  │      CLAUDE.md · init.md · processes/ · _audit/          │  │
│  │      Each LOB shapes doctrine to its own motion          │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │  ⚡  Layer 3 — Dispatched Flow                      │ │  │
│  │  │      /flow audit · streamline · realize · nav        │ │  │
│  │  │      Runtime invocation of a specific LOB step       │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

Read-only over LOBs (`Income/` and elsewhere). The only files this skill ever mutates are its own four knowledge files plus, when explicitly directed, scaffolded LOB structures created via the **Scaffold** modality.

---

## Modalities

Parse `$ARGUMENTS`. The first word is the modality. If `$ARGUMENTS` is empty, render the **Interactive menu** (below).

| Modality | Invoke | What it does |
|----------|--------|--------------|
| Doctrine | `/flow doctrine` | Reads `doctrine.md` and emits it. The evergreen "what is a flow?" |
| Showcase | `/flow showcase` | Reads `showcase.md`. Top 3–5 exemplars with what to learn from each. |
| Audit | `/flow audit [path]` | Walks the target dir against the blueprint, returns a maturity tier and the gaps to close. |
| Streamline | `/flow streamline [path]` | Two passes: structural simplification + LLM→script offload recommendations from the tools register. |
| Realize | `/flow realize [path]` | Walks any realm (not just LOBs), classifies session-resumption docs into 5 archetypal shapes, names what could graduate prose into living code. Read-only; routes to `/knock` for action. |
| Scaffold | `/flow new <name>` | Clones `_flow-blueprint/` into a new LOB. Confirms destination before writing. |
| Curate | `/flow curate <observation>` | Appends a dated entry to `lessons.md`. Proposes (never auto-applies) edits to `doctrine.md`/`showcase.md` if the observation supersedes prior content. |
| Curate-batch | `/flow curate-batch` | Accepts a markdown list (or reads recent assistant chat). Files each item as its own entry in `lessons.md` with a shared `session-id` and per-item Status flag. |
| Promote | `/flow promote <lesson-id>` | Reads a `lessons.md` entry tagged `proposes-doctrine-edit` or `proposes-showcase-edit`, surfaces the diff, applies on greenlight, and stamps the lesson `promoted-YYYY-MM-DD`. |
| Navigate | `/flow nav` or `/flow next` | From inside a `processes/NNNN-step/` dir, surfaces the current step's primary file and names the next step. |
| Tools | `/flow tools` | Reads `tools-register.md`. The curated catalogue of bash/scripts that replace LLM passes for file munging. |

### Bare invocation: Interactive menu

When `$ARGUMENTS` is empty, render this menu and wait for selection:

```
🌊 /flow — pick a modality:

   1. Doctrine      — what is a flow? (the evergreen definition)
   2. Showcase      — top exemplar flows + what to learn from each
   3. Audit         — assess this dir (or a path) against the blueprint
   4. Streamline    — recommend simplifications + LLM→script offload
   5. Realize       — find prose-doc that wants to graduate into living code
   6. Scaffold      — clone _flow-blueprint into a new LOB / realm
   7. Curate        — capture an evergreen lesson about flows
   8. Curate-batch  — file a batch of candidate lessons under one session-id
   9. Promote       — apply a lesson's proposed edit to doctrine/showcase
  10. Navigate      — what step am I on? what's next?
  11. Tools         — the offload-from-LLM tools register

Reply with a number, a name, or a sentence ("audit ~/Documents/Claude/Projects/Live/flows_deals").
```

Then dispatch on the user's reply.

---

## Modality contracts

### 1. Doctrine

Read `~/.claude/skills/flow/doctrine.md` and emit it verbatim. Do not paraphrase. If the user asks a follow-up about flows, answer from `doctrine.md` first; if the answer isn't there, say so and offer to capture the gap via Curate.

### 2. Showcase

Read `~/.claude/skills/flow/showcase.md` and emit it. Each exemplar carries: path, archetype, what to learn, what *not* to copy. If the user asks "what's the best example of X?", scan the showcase for a match before pointing at the broader portfolio.

### 3. Audit

Default target: `pwd`. Otherwise the path Dan supplies. Read these signals:

- Presence and shape of `init.md` at root (per `Income/docs/flow.md` §1.1)
- Presence of `processes/` with OS-ascending-sort step dirs (the **Acid Test**)
- **Archetype detection** — Workflow / Stitch / Living-blueprint (per `doctrine.md` *Flow archetypes*). For Stitch flows, additionally check: stable artifact path, dated snapshots dir, self-refresh comment block in artifact, registry.yaml split from exec script, defang behavior in stitch step.
- Per-step content shape — **all three are valid** (skinny YAML / legacy README+`_graduation.md` / prose-skinny `step.md`). Audit only flags steps with *none* of the three. Do not push convergence on shape until the self-logging data calls one out.
- **Per-step self-logging present?** — does each step folder contribute to `<flow-root>/_audit/runs.jsonl`? If not, that's the highest-leverage gap regardless of tier (per `doctrine.md` *Step self-logging*).
- **Live HTTP surface present?** — for flows that produce HTML, check for a Herd valet symlink at `~/Library/Application Support/Herd/config/valet/Sites/<slug>` resolving into the realm. If the flow produces HTML and there's no live surface, recommend creating one.
- `CLAUDE.md` (LOB contract) and `docs/cold-boot-brief.md`
- `docs/{decisions,sop,backlog,sessions}/` scaffolding
- A `## Blueprint reference` footer in `init.md` with `Last synced` date

Report the maturity tier and the *specific* gaps to close to advance one tier:

| Tier | What's true at this tier |
|------|--------------------------|
| **Early Stage** | LOB exists; no `processes/` yet, or no `init.md`. |
| **Emerging** | `init.md` + `processes/` with at least one numbered step; partial scaffolding. |
| **Workflow** | Full scaffolding; serialized steps with graduation markers; cold-boot < 90s walk-test passes. |
| **Canonical** | All of Workflow + `Blueprint reference` footer + AAR loop demonstrably feeding back into either the LOB or the blueprint. |

End with a one-line "next move" — the single highest-leverage gap to close.

### 4. Streamline

Two passes on a target flow.

**Pass A — Structural.** Walk `processes/` and report:
- Steps that could merge (same input/output, no external dependency between them)
- Hidden parallelism (consecutive steps that don't share state — candidates to run side-by-side)
- Missing `_graduation.md` markers or missing `## Refine` sections (skinny pattern)
- Drift between `init.md` claims and what's actually in `processes/` (the **Filesystem-Truth** axiom from `flow.md` §1.2)

**Pass B — LLM→script offload.** Scan each step's prompt/instructions for long-form file munging:
- CSV cleaning, dedup, column selection, schema enforcement
- JSON reshape, filtering, aggregation
- Regex extraction across many files
- File-walking, renaming, hashing, deduping
- Format conversion (md ↔ html ↔ pdf ↔ csv ↔ json)
- Bulk find-and-replace across a tree

For each offload candidate, draw a recommendation from `tools-register.md` (e.g., "this is a `jq` job, not a Claude job"). Output as a prioritized list with concrete command sketches, not prose.

**Capture step.** When Dan accepts an offload Streamline didn't already know about, append it to `tools-register.md` with the trigger, the tool, the example, and the source flow.

### 4.5. Realize

Default target: `pwd`. Otherwise the path Dan supplies. Operates on **any realm** in the Kingdom — not just LOBs with `_flow-blueprint` shape. Sibling of Audit/Streamline but doc-pattern-focused rather than flow-blueprint-focused.

**Constitutional rule.** Read-only. Names shape, surfaces exemplar, recommends realization path. Hands off to `/knock` for execution. Realize writes nothing — same constraint as Doctrine/Showcase/Audit.

**What it does (4 steps):**

1. **Scan** the realm for these patterns:
   - `HANDOFF.md`, `_PAUSE_*.md`, `_BACKLOG.md`, `RESUME*.md`, `SESSION*.md`
   - `CLAUDE.md`, `_CONVENTIONS.md`
   - Any `.md` over 1,000 lines (oversized-doc heuristic)

2. **Classify** each file into one of 5 archetypal shapes (full taxonomy at [`shapes.md`](shapes.md); exemplars at [`exemplars.md`](exemplars.md)):

   | Shape | Signature | Realization target |
   |---|---|---|
   | **1. Mission HOP** | Long HANDOFF.md with mission + methodology + assumption ledger + conventions | Decompose into `CLAUDE.md` + `docs/decisions/` ADRs + assumption template |
   | **2. State Capsule** | Session summary + what-happened bullets + cold-boot reading order | Auto-generated from git log; `/pause` skill seals into `docs/sessions/_session-NNNN.md` |
   | **3. Decision/Assumption Ledger** | B-001/A-001 IDs, claim → resolution → impact, "yellow tape" tags | Migrate to `docs/decisions/*.md` ADRs + grep-validation script |
   | **4. Morning Queue** | TL;DR + priority slot + roster + `/knock` queue + intake decisions | HUD artifact (Pico card) + email digest + `/schedule` 05:00 fire |
   | **5. Living Doctrine** | 1500+ line CLAUDE.md with mission + LOB registry + working-model + N doctrines | Project-genesis template + `scaffold-realm.sh` (`/flow new` already partially solves this for LOBs) |

3. **Report** in this structure:
   - **What I see** — table of files found, shape assigned to each
   - **Where you're mature** — shapes that already have living-code expression (point to existing scaffolding)
   - **Where prose dominates** — shapes that are still narrative-only and could realize
   - **The exemplar to learn from** — for each gap, link to the realm where this shape is most realized (per [`exemplars.md`](exemplars.md))
   - **Realization ladder** — Tier 0 → Tier 1 → Tier 2 (see [`ladder.md`](ladder.md))

4. **Hand off** — every recommendation ends with a routing line: *"This is ⚡ Catalyst territory — `/knock <brief>`"*. Realize never writes; `/knock` does.

**Negative case.** If the realm has no session-resumption docs and no oversized .md files, report "this realm is code-mature; no prose-doc realization opportunities detected."

### 5. Scaffold

`/flow new <name>` clones `/Users/verdey/Documents/Claude/Projects/Finance/Income/_flow-blueprint/` into a destination Dan confirms. Default destination depends on intent:

- **Income LOB** (a process-shaped business unit) → `/Users/verdey/Documents/Claude/Projects/Finance/Income/Flows/LOBs/<name>/`
- **Kingdom realm** (a Live/Council/etc surface) → `/Users/verdey/Documents/Claude/Projects/Live/<name>/` (or wherever Dan specifies)

Substitutes `«LOB_NAME»` and `«YYYY-MM-DD»` tokens in the blueprint files.

**Plan-mode-first for non-trivial scaffolds.** If the new flow is anything beyond a single-purpose CRUD LOB (i.e., it has a non-obvious archetype, novel deliverable shape, or substrate that needs surveying), enter plan mode first: write a plan file, ExitPlanMode, then scaffold. Trivial Workflow LOBs that match an existing showcase exemplar can scaffold directly.

**Always confirm the destination path before writing.** Use `AskUserQuestion` to surface the proposed path and any conflicts (e.g., dir already exists).

After scaffold:
- Bump `Last updated` in the new LOB's `CLAUDE.md` to today
- Insert today's date into `init.md`'s `## Blueprint reference` block as `Last synced`
- Create `_audit/` dir with an empty `runs.jsonl` so the self-logging contract (per `doctrine.md` *Step self-logging*) is wired from day one
- Remind Dan to add the LOB to `Income/CLAUDE.md` §2 (the Known LOBs table) and `docs/roster.yaml` `lob_permissions` (Income LOBs only); for kingdom realms, append to `Projects/manifest.json` and run `bin/refresh-manifest.sh`
- For HTML-producing flows, suggest creating a Herd valet symlink so the live HTTP surface signal (per Audit) is satisfied immediately

### 6. Curate

`/flow curate <observation>` appends to `~/.claude/skills/flow/lessons.md`:

```markdown
## YYYY-MM-DD — <one-line summary>

<observation verbatim, then optional Dan-language translation if the observation needed compression>

**Source flow:** <if applicable>
**Status:** captured | proposes-doctrine-edit | proposes-showcase-edit
```

If the observation supersedes prior content in `doctrine.md` or `showcase.md`:
1. Set `Status: proposes-doctrine-edit` (or `proposes-showcase-edit`)
2. Surface the proposed edit as a unified diff
3. Ask Dan to greenlight before mutating

Mutation-only-via-skill: Dan should not be hand-editing `doctrine.md` or `showcase.md` outside `/flow curate`. If he does, the next invocation of `/flow doctrine` or `/flow showcase` should still render correctly — but the audit trail lives in `lessons.md`.

### 6a. Curate-batch

`/flow curate-batch` is the post-build companion to `curate`. After a session that yields multiple candidate lessons (e.g. 4–8 observations from one flow build), `curate` one-by-one is friction. Batch mode:

1. **Source.** Either (a) Dan pastes a markdown list of observations, or (b) Claude scans the recent assistant turn for `Curate-style` candidate lessons and proposes the list back for confirmation.
2. **Group.** All entries in the batch share a `session-id` of the form `YYYY-MM-DD-<short-slug>` (e.g. `2026-04-27-flows-deals-build`).
3. **File.** Each item becomes its own `## YYYY-MM-DD — <summary> (session-id: …)` entry in `lessons.md`, with its own Status flag (`captured`, `proposes-doctrine-edit`, `proposes-showcase-edit`, or `proposes-tools-register-edit`).
4. **Defer mutation.** Even if multiple entries propose edits, Curate-batch only *files* — it does not propose diffs. Promotion is the next step.

Output is a one-line confirmation per entry: `filed: <lesson-id> (status: <flag>)`.

### 6b. Promote

`/flow promote <lesson-id>` is the explicit hand-off from candidate-in-`lessons.md` to applied-edit-in-`doctrine.md`/`showcase.md`/`tools-register.md`.

1. **Lookup.** Find the entry in `lessons.md`. If its Status is `captured` or `promoted-*`, abort with a message (nothing to promote, or already promoted).
2. **Diff.** Surface the proposed edit as a unified diff against the target file.
3. **Greenlight gate.** Wait for Dan's explicit approval. No silent application.
4. **Apply.** Edit the target file. Stamp the lesson with `Status: promoted-YYYY-MM-DD` and a backreference to the diff (or commit hash, if in git).
5. **Cascade.** If the promotion changes a section that other knowledge files reference (e.g. doctrine adds an archetype that showcase should mention), surface the cascade as a follow-up suggestion — don't auto-apply.

Promotion is the only path from candidate-lesson to canonical-doctrine. No direct edits to `doctrine.md`/`showcase.md` outside this flow.

### 7. Navigate

If `pwd` matches `*/processes/NNNN-*/` (regex), emit:
- Current step's primary file (skinny artifact or `README.md`)
- The next step's directory name (next OS-ascending-sort sibling)
- The previous step's directory name

If `pwd` is `*/processes/`, list the steps in OS-ascending-sort with one-line summaries (read from each step's frontmatter or first H1).

If `pwd` is anywhere else, suggest running Audit instead.

### 8. Tools

Read `~/.claude/skills/flow/tools-register.md` and emit it. When Dan asks "what should I use to <do file thing X>?", scan the register for the trigger and recommend.

---

## Operational rules

- **Read-only over LOBs.** Never write to `Income/<LOB>/` outside the Scaffold modality, and even Scaffold confirms first.
- **Mutation-only-via-skill for knowledge files.** `doctrine.md`, `showcase.md`, `lessons.md`, `tools-register.md` only mutate via Curate (or via Streamline appending a new offload to the tools register, with confirmation).
- **No prose where a list will do.** Streamline output is a prioritized list of concrete moves, not paragraphs.
- **Source-of-truth references, not copies.** When in doubt, point at `Income/_flow-blueprint/`, `Income/CLAUDE.md` §14, or `Income/docs/flow.md`. Don't reproduce them here.
- **The Acid Test is canonical.** "Whatever `ls` shows in ascending order IS the order of the Flow." (`Income/docs/flow.md` §1.2)
- **Filesystem-Truth is canonical.** Drift between a doctrine reference and what's actually at the path is the highest-priority fix. Either build the missing thing or amend the reference — never both, never neither.

## Companion files

- [`doctrine.md`](doctrine.md) — the evergreen definition of a flow
- [`showcase.md`](showcase.md) — top exemplar flows
- [`lessons.md`](lessons.md) — curated insights captured over time
- [`tools-register.md`](tools-register.md) — bash/scripts that offload work from LLMs
- [`shapes.md`](shapes.md) — the 5-shape taxonomy for `realize` (session-resumption doc patterns)
- [`exemplars.md`](exemplars.md) — for each shape, the realm that's most mature
- [`ladder.md`](ladder.md) — the Tier 0 / 1 / 2 realization ladder

## Source-of-truth references (external)

- `/Users/verdey/Documents/Claude/Projects/Finance/Income/_flow-blueprint/` — the canonical living blueprint
- `/Users/verdey/Documents/Claude/Projects/Finance/Income/CLAUDE.md` — portfolio contract, §14 Living Product DNA
- `/Users/verdey/Documents/Claude/Projects/Finance/Income/docs/flow.md` — the motion doctrine in full

## Known flow homes (search these by default)

Flows live in two places. When Audit/Streamline/Realize is invoked without a path argument, walk both:

| Tree | Contains | When to find flows here |
|------|----------|-------------------------|
| `~/Documents/Claude/Projects/Finance/Income/Flows/LOBs/<lob>/` | Income LOBs (Workflow archetype, sometimes with subflows) | Business-unit pipelines: deal search, wholesaling, flipping, boat covers |
| `~/Documents/Claude/Projects/Finance/Income/Flows/_flow-navigator/` and `_shared/` | Stitch + cross-cutting flows over the Income portfolio | Portfolio-level visibility / notification surfaces |
| `~/Documents/Claude/Projects/Live/<realm>/` | Kingdom realms — public-facing or shared surfaces | Realms that produce HTML for Herd valet domains (e.g. `flows_deals/` → `flows.test`) |

Shorthand `Income/` in this skill always means `~/Documents/Claude/Projects/Finance/Income/`. Shorthand `Live/` means `~/Documents/Claude/Projects/Live/`. The shorthand is for prose; tool calls always use the absolute path.
