---
name: plan
description: 📋 Plan — Replaces Claude Code's default markdown plan-mode output with Dan's HTML plan format at Plans/<slug>/index.html. Use this skill whenever the user says "plan", "/plan", "make a plan", "draft a plan", "let's plan this", "I want to plan X", "scope this", "outline the work", or otherwise asks for a planning artifact — even if they don't explicitly type /plan. Also use when ExitPlanMode hands off and the work needs a real living plan, not just the thin session stub. The plan is the working surface — status flips, gap chips, and version bumps happen IN the file as work progresses, not in chat.
argument-hint: "<slug-or-intent>  ·  e.g. /plan refactor-auth-middleware  or  /plan to ship the homepage redesign"
---

# 📋 plan — HTML Plan Standard

*Replaces the markdown plan-mode default. The plan is the substrate of execution, not a deliverable.*

> **Sits beside:** [🗂️ planq](../planq/SKILL.md) (lightweight idea queue, single lines), [🔮 oracle](../oracle/SKILL.md) (multi-session orchestration with controllers and gates), [⚡ knock](../knock/SKILL.md) (executes against an active plan).
> **Replaces:** Claude Code's default `~/.claude/plans/<session-slug>.md` markdown plan output. The .md stub still exists (plan-mode requires it) but becomes a thin pointer to the real HTML plan.

---

## What `/plan` is for — and is not for

`/plan` exists to **deliver Dan's work** through the HTML plan pipeline. It is not a planning aesthetic and it is not paperwork. The HTML format earns its complexity by being a living orchestration surface: status flips, gap chips, and version bumps happen IN the file as the work progresses, so the plan IS the running record of execution.

**Three concerns, ranked:**

1. **PRIMARY — Deliver the work Dan asked for.** The plan exists to ship the thing. If the format gets in the way, route around it; the work wins.
2. **MEANS — Leverage the HTML pipeline.** Use the blueprint, the gap chips, the run order, the changelog, the registry. These give Dan a browsable, versioned, gated surface that markdown cannot.
3. **SECONDARY — Surface process improvement.** When the format itself creates friction (missing chip type, awkward section, blueprint doesn't say what to do for X), surface it as a one-line "📝 Process note:" in chat OR a `<details>` block in the plan. **Never block delivery** to discuss process.

**When NOT to use `/plan`:**

| Situation | Use instead |
|-----------|-------------|
| One-line idea to remember later | [`/planq`](../planq/SKILL.md) |
| Multi-session arc with handoffs and gates | [`/oracle`](../oracle/SKILL.md) |
| Visual/UX clarification before code | [`/sketch`](../sketch/SKILL.md) |
| Already have a plan; just execute next step | [`/knock`](../knock/SKILL.md) |
| Single-decision cliffhanger waiting on input | [`/surface`](../surface/SKILL.md) |

---

## 🗺 Workflow — two-phase by construction

The middle of the workflow is **two named phases**. Phase A maps the conceptual solution; Phase B surfaces the clarifiers as Decision-Choices blocks. They run back-to-back in one turn — Dan sees the populated plan once at SURFACE.

```
  ┌──────────┐    ┌──────────┐    ┌─────────────────────┐    ┌─────────────────────┐    ┌──────────┐    ┌──────────┐
  │  ASSESS  │ ─> │ SCAFFOLD │ ─> │  MAP (Phase A)      │ ─> │  CLARIFY (Phase B)  │ ─> │ SURFACE  │ ─> │  EXECUTE │
  │  intent  │    │ cp + accent│  │  §Conceptual Map    │    │  .choice-block      │    │ URL+path │    │  & flip  │
  │  + slug  │    │ + glyph   │   │  + decision points  │    │  matrices + DEFAULTs│    │          │    │          │
  │  + glyph │    │           │   │  + smart defaults   │    │  (parallel /sketch  │    │          │    │          │
  │  hint    │    │           │   │                     │    │   for experiential) │    │          │    │          │
  └──────────┘    └──────────┘    └─────────────────────┘    └─────────────────────┘    └──────────┘    └────┬─────┘
                                                                                                              │
                                                                  ┌───────────────────────────────────────────┤
                                                                  v                                           v
                                                          ┌──────────┐                                ┌──────────┐
                                                          │  ITERATE │                                │  REFLECT │
                                                          │ v##++    │                                │ (📝 1-line
                                                          │ + chnglog│                                │  process │
                                                          │ + chips  │                                │  note)   │
                                                          └──────────┘                                └──────────┘
```

**Why two phases.** A single dense pour reads like the model populated all sections in parallel — Dan can't feel that conceptual mapping happened *first*. Splitting the middle into MAP → CLARIFY makes that two-step thinking legible: §Conceptual Map carries the shape; Decision-Choices blocks carry the small intelligent picks. (Captured in `feedback_plan_two_phase.md`.)

### 1. ASSESS — Capture intent & slug

Read what Dan asked for. Two things to extract:

- **Slug** — kebab-case, ≤4 words, derived from the *work topic* (not the session slug). Examples: `refactor-auth-middleware`, `ship-homepage-redesign`, `flow-runner-error-paths`. If `$ARGUMENTS` opens with a clean kebab-case token, use it; else derive one from the intent.
- **Intent** — the actual problem to solve, in one sentence. This becomes the plan title and the Context section seed.

If the slug already exists at `Plans/<slug>/`, **do not overwrite**. Either:
- Open the existing plan and bump its version (treat as iteration), OR
- Suggest a new slug to Dan with a one-line "📝 slug collision: existing plan is `<slug>` (status: <X>); use `<new-slug>`?"

### 2. SCAFFOLD — Copy the blueprint (with accent + glyph)

The canonical template lives at `Plans/_plan-blueprint/index.html`. **Always copy, never generate from scratch** — the blueprint carries the styles, the mermaid wiring, the section comments, and the format contract.

Run the spell:

```bash
bash ~/.claude/skills/plan/spells/sp-scaffold-plan <slug> "<title>" [<glyph>]
```

This:
1. `cp -R Plans/_plan-blueprint/ Plans/<slug>/`
2. Substitutes title placeholders with Dan's title (versioned `v01`)
3. Stamps today's date in `Created:` / `Updated:` / `<meta name="blueprint-absorbed">`
4. **Computes a deterministic slug-hash hex accent** (md5 → HSL → tasteful hex) and stamps it into `:root { --plan-accent: #...; }` so the new plan's H1 underline, H2 markers, and lineage badges are topic-distinct
5. Stamps the **topic emoji glyph** (defaults to 📋) into `<span class="hero-glyph">` beside H1
6. Echoes back the path + URL + accent + glyph

**Pick the glyph at ASSESS time.** The skill chooses one emoji that captures the work topic — 🛡 for auth, 🗺 for navigation, 📊 for analytics, 🧬 for templates, etc. Pass it as the optional 3rd positional arg. Default 📋 is fine when the topic doesn't have an obvious glyph.

**No registry mutation.** The registry at <http://alpha.test/Plans/> fetches `/api.php?action=plans` on every load — a live filesystem walk of `Plans/<slug>/index.html`. Creating the directory IS the registry act. Drift between disk and registry is impossible by construction. (See [§The mutual contract](#the-mutual-contract-skill--api) below.)

If the spell is unavailable, do steps 1–3 by hand with Read/Edit/Write.

### 3. MAP — Phase A: populate §Conceptual Map FIRST

Edit `Plans/<slug>/index.html` and fill `<section id="conceptual-map">` **before any other section**. This is the felt difference between a single-pour plan and a two-phase plan.

§Conceptual Map carries:

1. **A diagram (preferred when domain is visual)** — replace the placeholder mermaid scaffold with a real flowchart / sequence / state diagram capturing the solution shape. When the domain is non-visual (policy clarifications, prose-shaped decisions), use well-structured prose instead. Skill does not refuse a plan without a diagram — *prefer*, don't mandate.
2. **A "Decision points" enumeration** — list the clarifiers Phase B will surface as `.choice-block`s. Each item links to its eventual `id="choice-<slug>"` anchor.
3. **Pre-computed smart defaults** — the model decides what the DEFAULT pick is for each decision point *before* it surfaces them. Don't punt the picking to Dan unless the answer is genuinely beyond the model's reach.

Then fill the rest:

| Section | Content |
|---------|---------|
| **Context** | Why this plan exists. 3–5 sentences. The problem, the trigger, the intended outcome. Cite files/URLs that prompted it. |
| **Critical Files** | Every file the plan reads/writes/creates. Use absolute `file://` hrefs. Role column: READ / WRITE / CREATE / DELETE / REFERENCE. |
| **Gaps & Unknowns** | Real, current unknowns. Each clarifier from §Conceptual Map renders here as a `.choice-block` (Phase B — see step 4). Plus honest chips: OPEN (Dan must answer), ASSUMED (proceeding with named assumption), NEEDS-X (blocked until X). Do NOT pad with fake gaps. If there are no real gaps, write one resolved chip noting "no significant gaps; proceeding additively." |
| **Approach** | The strategy — HOW we're solving it. Key decisions and why. Park rejected alternatives in `<details>` with a date and a "to-pivot" note (per the alternative-trail-comments doctrine). |
| **Bloat Impact &amp; Edicts** | Project the codebase footprint: net files added/removed/net, net LoC added/removed/net, and a tier (`reductive` / `neutral` / `additive-minor` / `additive-major`). Then audit against the five minimalist edicts. Wire the projections into the three `<meta name="bloat-*">` tags in `<head>`. |
| **Run Order** | Numbered steps with status chips. Initial state: all `pending`. Strike steps via `<del>` only when complete; **never delete** them — the audit trail is load-bearing. |
| **Verification** | How we know the plan delivered. Prefer browser-verifiable / observable side effects. |

**Diagrams** in mermaid: the blueprint loads mermaid in `<head>` — `<pre class="mermaid">flowchart LR A-->B</pre>` renders inline. Reserve mermaid for the HTML plan; chat doesn't render it.

### 4. CLARIFY — Phase B: render Decision-Choices blocks

For each decision point listed in §Conceptual Map, render a `.choice-block` (comparison-table form) — typically inside §Gaps & Unknowns, but inline anywhere a strategic pick deserves the matrix shape.

The blueprint carries a fully-worked example (see `<div class="choice-block" id="choice-example">`). Copy that block per decision and fill in:

- **`<span class="cb-id">CN</span>`** — choice ID (C1, C2, …) for deeplinks
- **`<p class="cb-question">`** — what the decision is, in one paragraph
- **Comparison axes** — propose 2–4 dimensions (`Cost`, `Complexity`, `Reversibility`, etc.) tailored to the decision; not every block uses the same axes
- **2–4 option rows** — each with a `<td class="cb-option">`, score-dot cells (`<span class="cb-dots">●●<span class="off">●</span></span>` for ●●○), and a one-clause `<td class="cb-summary">`
- **One row marked `class="cb-default"`** — the pre-computed smart default. CSS adds the DEFAULT chip via `::after`.
- **`data-default-picked="true"` on the wrapping `<div>`** when the default is the current pick. Flip this off once Dan flips the choice.
- **`<p class="cb-rationale">`** — one paragraph: "Why default is X" + "flip to Y when Z."

#### When to dispatch /sketch instead of (or in addition to) a text choice-block

**The trigger is qualitative, not numeric** — fire `/sketch` (in parallel via subagent) only when the meaningful answer is a gallery of single-file inline prototypes for experiential preference. If the decision is text-comparable (architecture, scope, schema, budget, timing), a Decision-Choices block alone is the right move.

When you do dispatch `/sketch`:

- Subagent produces variants under `Plans/<slug>/sketches/<gN-slug>/` (one HTML file per variant + an `index.html` overview with thumbnail iframes).
- Link the variants from the `.choice-block`'s option rows.
- DEFAULT chip still applies to the proposed pick.

This pattern is the /sketch endgame Dan named: results float up into the dispatching plan rather than living as ephemeral previews.

### 5. SURFACE — Show Dan both URL and path

After scaffolding + initial populate, surface to Dan in this exact shape:

```
📋 Plan drafted: <title> (v01, draft)
   🌐 http://alpha.test/Plans/<slug>/
   📁 /Users/verdey/Documents/Claude/Projects/Plans/<slug>/index.html
```

**Both URL and path, every time.** Per codebase doctrine and the loud feedback memory — never one without the other, never relative paths.

### 6. EXECUTE & FLIP — The plan is the working surface

As work proceeds against the plan:

- **Flip step status chips** as steps move from `pending` → `running` → `done`/`skipped`. This happens IN the HTML, not in chat.
- **Resolve gap chips** by editing the chip class from `open` to `resolved` and noting the answer inline. Never delete the gap block — keep the audit trail.
- **Bump the version** (`v01` → `v02`) on every meaningful edit:
  - In the `<h1>`'s `<span class="version">`
  - In the footer line
  - Add a row to the Changelog table (newest first), one clause describing what changed
- **Update the status pill** when state shifts: `draft` → `active` (work started) → `done` (verified) or `blocked` (gap is NEEDS-X). Per the loud-status-hygiene doctrine, never let stale chips linger.

### 7. ITERATE / REFLECT

When done with a chunk of work:

- Update step statuses + bump version + add changelog row in **one edit pass**.
- Re-surface to Dan with the new state: `📋 Plan v03: 5/7 steps done · 1 gap resolved · status: active`
- If you noticed friction with the format itself (missing affordance, awkward section, blueprint silent on something), surface it as **one short line** in chat:

  ```
  📝 Process note: blueprint has no chip for "needs-external-dependency" gaps.
     Want me to add one to _plan-blueprint, or proceed with NEEDS-X for now?
  ```

  Process notes are non-blocking. Default to "proceed with the work; surface the observation; let Dan decide if/when to evolve the blueprint."

---

## Interaction with Claude Code's plan mode

Claude Code's built-in plan mode auto-creates `~/.claude/plans/<session-slug>.md` and gates execution behind ExitPlanMode. We don't fight it — we layer on top:

```
  ┌─────────────────────────┐         ┌─────────────────────────────────┐
  │ ~/.claude/plans/        │  thin   │ Plans/<slug>/index.html         │
  │ <session-slug>.md       │  ──>    │ (the real plan — versioned,     │
  │ (plan-mode stub —       │ pointer │  versionable, browsable, gated, │
  │  one-line title + URL)  │         │  status-flippable)              │
  └─────────────────────────┘         └─────────────────────────────────┘
```

When invoked from inside plan mode, write the .md stub as just:

```markdown
# Plan: <title>

Real plan: http://alpha.test/Plans/<slug>/
Path: /Users/verdey/Documents/Claude/Projects/Plans/<slug>/index.html
```

When invoked outside plan mode, skip the .md stub entirely.

---

## The mutual contract (skill ↔ api)

The `/plan` skill and `api.php` are mutually aware. They split the work cleanly so neither has to know the other's internals — only the shared substrate (the filesystem) and the shared contract (this section).

```
   ┌──────────────────────────┐                    ┌──────────────────────────┐
   │   /plan skill            │                    │   api.php                │
   │   (Council/ASK/plan/)    │                    │   ?action=plans          │
   │──────────────────────────│                    │──────────────────────────│
   │ WRITES disk:             │                    │ READS disk:              │
   │   Plans/<slug>/index.html│                    │   Plans/<slug>/index.html│
   │   (cp from blueprint,    │   shared           │   (glob + parse <head>:  │
   │    populate sections,    │   substrate        │    title, version,       │
   │    flip statuses,        │ ◄────────────────► │    status pill, mtime)   │
   │    bump version)         │   = filesystem     │                          │
   │                          │                    │ EMITS JSON:              │
   │ DOES NOT touch the       │                    │   { plans: [{slug,title, │
   │ registry. Creating the   │                    │     version, status,     │
   │ dir IS the registry act. │                    │     lastTouched,         │
   │                          │                    │     isTemplate}, ...] }  │
   └──────────────────────────┘                    └──────────────────────────┘
                │                                                ▲
                │                                                │ fetch
                v                                                │
   ┌──────────────────────────────────────────────────────────────────────┐
   │   Plans/index.html  (the registry surface — http://alpha.test/Plans/) │
   │   No static array. Calls /api.php?action=plans on every load,         │
   │   renders cards with status pill, version badge, touched date.        │
   │   Templates (slug starts with `_`) get dashed border, sorted last.    │
   └──────────────────────────────────────────────────────────────────────┘
```

**Where the parser looks** (so plan authors keep these stable):

| Field | Source in each plan's HTML |
|-------|----------------------------|
| `title` | `<title>Plan: <name> — v##</title>` (em-dash + version optional) |
| `version` | Same `<title>` suffix; falls back to `<span class="version">v##</span>` |
| `status` | First `<span class="pill draft\|active\|done\|blocked">` |
| `lastTouched` | mtime of `index.html` (POSIX) |
| `isTemplate` | slug starts with `_` (only `_plan-blueprint` today) |
| `blueprintAbsorbed` | `<meta name="blueprint-absorbed" content="YYYY-MM-DD">` — empty if not stamped |
| `lineage.parentPlan` | `<meta name="parent-plan" content="<slug>">` |
| `lineage.parentController` | `<meta name="parent-controller" content="<rel-or-abs-path>">` |
| `lineage.planqLine` | `<meta name="planq-line" content="<one-line>">` |
| `gateCounts` | counts of `<div class="agent-step ready\|running\|blocked\|done">` blocks |
| `bloat.filesNet` | `<meta name="bloat-files-net" content="<signed int>">` — projected net file delta across codebase |
| `bloat.locNet` | `<meta name="bloat-loc-net" content="<signed int>">` — projected net LoC delta |
| `bloat.tier` | `<meta name="bloat-tier" content="reductive\|neutral\|additive-minor\|additive-major">` |
| `conceptualMap` | presence of `<section id="conceptual-map">` (Phase A landmark) |
| `choiceBlockCount` | count of `<div class="choice-block" ...>` (Phase B clarifiers) |
| `defaultsPickedCount` | count of those carrying `data-default-picked="true"` |
| `visualSignature` | first `--plan-accent: #xxxxxx` in inline `<style>` (slug-hash hex) |

**Why this matters for the skill:** when populating or editing a plan, keep these landmarks intact. The blueprint already places them correctly — bumping `v##` in the H1's `<span class="version">` AND in the `<title>` keeps the registry honest. Flipping the status pill class (`draft → active → done`) is what makes the registry sort correctly. **The HTML structure IS the API.** No parallel state to maintain, no JSON to update.

---

## Cascade conventions (blueprint v02+)

The blueprint at `Plans/_plan-blueprint/` carries five additional conventions every new plan inherits via `cp -R`. The skill must preserve these landmarks when editing.

### Cascade `<meta>` tags (in `<head>`)

```html
<meta name="blueprint-absorbed" content="YYYY-MM-DD">  <!-- /plan stamps this on scaffold -->
<meta name="parent-plan"        content="">             <!-- slug of a parent plan, if any -->
<meta name="parent-controller"  content="">             <!-- rel/abs path to oracle controller -->
<meta name="planq-line"         content="">             <!-- planq.md line this graduated from -->
```

`blueprint-absorbed` is **non-optional** — `/plan` should always stamp it with today's date on scaffold. The drift banner on each plan compares this date to the live blueprint's mtime; an outdated stamp triggers a "review the blueprint" banner. The other three are populated only when applicable; empty content hides the lineage badge silently.

### Gate anchors on agent-step blocks

When a plan has an Agent Execution Protocol section, each `.agent-step` carries `id="G##"`:

```html
<div class="agent-step ready" id="G1">
  <div class="gate-line">
    <span>🔓</span>
    <a class="gate-id" href="#G1">G1</a>
    <span>ready · no upstream deps</span>
  </div>
  ...
</div>
```

This makes gates deeplinkable from chat (`#G3`), sibling plans, and decisions cards. The blueprint's CSS gives `:target` a yellow highlight so the linked gate visually reveals on arrival.

### Cross-surface chip routing on gap blocks

Gap chips of type `OPEN`, `NEEDS-DECISION`, `NEEDS-VISUAL`, `NEEDS-RESEARCH` render a `.gap-routes` footer with click-to-copy buttons routing to the right sibling surface:

| Chip type | Routes to | Copies |
|-----------|-----------|--------|
| `OPEN` / `NEEDS-DECISION` | [decisions.test](http://decisions.test/) via `/surface` | `/surface this as a decision: <gap title>` |
| `NEEDS-VISUAL` | `/sketch` | `/sketch <gap title> — <variant hints>` |
| `NEEDS-RESEARCH` | `/planq` | `/planq research: <gap title>` |

The blueprint contains worked examples for each; copy the relevant block per gap. Don't invent new chip types — surface as a one-line process note instead and let Dan decide if the blueprint should grow.

### Click-to-copy & footer-actions

Every plan inherits the blueprint's `<script>` that wires up `.copy-btn` elements. Authors don't write JS; they just add buttons:

```html
<button class="copy-btn" data-copy-text="...">label</button>
<button class="copy-btn" data-copy-anchor="G3">copy gate link</button>
<button class="copy-btn" data-copy-url>copy URL</button>
<button class="copy-btn" data-copy-path>copy path</button>
```

The footer-actions strip at the bottom (Bump version · Mark next step done · Add gap · Seal plan · Surface to Dan) is template-built and self-explanatory; leave it intact.

### Listing surface awareness

The Plans listing at [http://alpha.test/Plans/](http://alpha.test/Plans/) renders gate counts, lineage badges, and drift indicators per card. **`/plan`'s only obligation** is to keep the substrate honest — the metadata you write IS what the listing shows. Don't try to update the listing; it's a live read.

---

## 🔮 Spell Dispatch

| Spell | When | What |
|-------|------|------|
| `sp-scaffold-plan <slug> "<title>" [<glyph>]` | Step 2 of every new plan | Copies blueprint → `Plans/<slug>/`, substitutes title, stamps date, computes & stamps slug-hash hex into `--plan-accent`, stamps the topic emoji glyph (default 📋), echoes URL+path+accent+glyph. **Does not** touch the registry — the live `?action=plans` endpoint discovers the new dir on next load. |

---

## 🎨 Voice & Style

- **Terse in chat, rich in the file.** Chat replies are 1–3 lines + the URL+path block. The plan HTML carries the substance.
- **No mermaid in chat replies** — Dan's macOS Claude Code app doesn't render it. Use ASCII boxes (the workflow diagram above is the house style).
- **Status flips in the file are the work.** Don't narrate "I'm now flipping step 3 to done" — just flip it and surface the new state.
- **Plain operational language.** No "sacred", "movement", "soul" outside of canon (per `feedback_plain_doc_language`). The plan is a tool.
- **Process reflections are footnotes, not interruptions.** One line, one chance, then back to the work.

---

## 📋 Rules

- **Slug discipline** — kebab-case, ≤4 words, derived from work topic. Never reuse session slugs.
- **No overwrite** — if `Plans/<slug>/` exists, treat as iteration (bump version) or propose a new slug. Never silently overwrite.
- **Version bump on every meaningful edit** — H1 + footer + changelog row, in one pass.
- **Surface URL + absolute path together, always** — codebase doctrine; never one without the other; never relative paths.
- **Do NOT update `Plans/index.html`** — it's a live fetch from `/api.php?action=plans` (filesystem walk). Mutating it would create the very drift this design eliminates. Creating `Plans/<slug>/` IS the registry act.
- **Keep parser landmarks intact** — the `?action=plans` endpoint reads `<title>Plan: ... — v##</title>`, `<span class="version">`, `<span class="pill <status>">`, the cascade `<meta>` tags, and counts of `.agent-step.<state>` from each plan. Bump version + flip status in BOTH the title-suffix and the dedicated spans, in one edit pass. (See [§The mutual contract](#the-mutual-contract-skill--api) and [§Cascade conventions](#cascade-conventions-blueprint-v02).)
- **Status pill must stay accurate** — `draft → active → done/blocked`. No stale "active" pills on landed plans (per loud-status-hygiene). The registry sort order depends on this pill being correct.
- **Stamp `blueprint-absorbed` on scaffold** — fill the `<meta name="blueprint-absorbed" content="YYYY-MM-DD">` with today's date when copying the blueprint. Bump it again only when re-syncing a long-lived plan with a freshly-evolved blueprint. The drift banner on each plan reads this; never leave it empty.
- **Gate anchors are mandatory when gates exist** — every `.agent-step` block carries `id="G##"`. Deeplinks from chat ("blocked at #G3") depend on this. Don't write a gate without an id.
- **Gaps route to the right surface** — when a gap is `OPEN` or `NEEDS-DECISION`, include the `.gap-routes` footer with the `/surface` button; for `NEEDS-VISUAL` include the `/sketch` button; for `NEEDS-RESEARCH` include the `/planq` button. The blueprint has worked examples to copy.
- **Don't invent chip types** — if an existing chip doesn't fit, surface as a one-line process note rather than minting a new one in a single plan.
- **Populate the Bloat Impact section on scaffold** — fill the scorecard (files / LoC, added / removed / net) with honest projections, set the `bloat-tier` meta + tier badge, and audit each of the five edicts (codebase minimalism, KISS, centralized assets, HTML&gt;markdown, no extraneous docs). Default each edict to `followed` with a one-clause note; flip to `partial` / `violated` / `na` only when truthful. The `<meta name="bloat-*">` tags are what the listing surface badges — don't leave them empty if numbers are projectable.
- **§Conceptual Map is mandatory and goes FIRST.** Every plan opens with `<section id="conceptual-map">` populated *before* any other substantive section is filled. Diagram-first when domain is visual; well-structured prose otherwise. Always end the section with a "Decision points" enumeration listing the clarifiers Phase B will surface. Plans without §Conceptual Map fail the two-phase doctrine and feel single-pour to Dan.
- **Decision-Choices block is the clarifier primitive.** Any clarifier with 2–4 ranked alternatives renders as a `.choice-block` (comparison-table form per blueprint v04+) — option × dimensions matrix with score-dot glyphs (●●●), one row marked `class="cb-default"`, with `data-default-picked="true"` on the wrapping `<div>` when the default is the current pick. Skill proposes the comparison axes per decision. Pre-compute the smart default; don't punt to Dan unless genuinely beyond reach.
- **/sketch fires on experiential answers, not on candidate count.** Trigger is qualitative: dispatch `/sketch` (parallel subagent) only when the meaningful answer is a gallery of single-file inline prototypes for experiential preference. If the decision is text-comparable (architecture, scope, schema), the Decision-Choices block alone is the right move. Sketch outputs land under `Plans/<slug>/sketches/<gN-slug>/` and link back from the choice-block option rows.
- **Stamp accent + glyph at scaffold.** `sp-scaffold-plan` writes a deterministic slug-hash hex into `:root { --plan-accent }` and the topic emoji into `<span class="hero-glyph">`. Pick a glyph that captures the work topic (🛡 auth, 🗺 navigation, 📊 analytics, 🧬 templates) at ASSESS time. Default 📋 is fine when the topic doesn't have an obvious match. Don't override the accent by hand — let the deterministic value stand so two plans never look alike by accident.
- **Lineage metas are populated when applicable** — if a plan was spawned from a parent plan, an oracle controller, or a planq line, fill the matching `<meta name="parent-*">` tag. Empty content hides the badge silently; don't delete the tag.
- **Gaps are honest** — OPEN means Dan owes an answer; ASSUMED means we proceed with a named assumption; NEEDS-X blocks execution; RESOLVED is preserved as audit trail.
- **Run Order steps are never deleted** — strike with `<del>` or flip status; the trail is the value.
- **Mermaid lives in the HTML, ASCII lives in chat.** Don't send mermaid blocks to Dan's chat.
- **Process notes are 1 line, non-blocking.** If the observation is bigger than 1 line, the work probably comes first; capture it later.

---

## Format reference

- Canonical blueprint → [`/Users/verdey/Documents/Claude/Projects/Plans/_plan-blueprint/index.html`](file:///Users/verdey/Documents/Claude/Projects/Plans/_plan-blueprint/index.html) · <http://alpha.test/Plans/_plan-blueprint/>
- Registry surface → [`/Users/verdey/Documents/Claude/Projects/Plans/index.html`](file:///Users/verdey/Documents/Claude/Projects/Plans/index.html) · <http://alpha.test/Plans/>
- HTML plan standard memory → `feedback_html_plan_standard.md`
- Plan-versioning convention memory → `feedback_plan_versioning_convention.md`
