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

## 🗺 Workflow

```
  ┌──────────┐    ┌─────────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
  │  ASSESS  │ ─> │  SCAFFOLD   │ ─> │ POPULATE │ ─> │ SURFACE  │ ─> │  EXECUTE │
  │  intent  │    │  cp blueprint│   │  fill in │    │ URL+path │    │  & flip  │
  └──────────┘    └─────────────┘    └──────────┘    └──────────┘    └────┬─────┘
                                                                          │
                                          ┌───────────────────────────────┤
                                          v                               v
                                    ┌──────────┐                    ┌──────────┐
                                    │  ITERATE │                    │  REFLECT │
                                    │ v##++    │                    │ (📝 1-line
                                    │ + chnglog│                    │  process │
                                    │ + chips  │                    │  note)   │
                                    └──────────┘                    └──────────┘
```

### 1. ASSESS — Capture intent & slug

Read what Dan asked for. Two things to extract:

- **Slug** — kebab-case, ≤4 words, derived from the *work topic* (not the session slug). Examples: `refactor-auth-middleware`, `ship-homepage-redesign`, `flow-runner-error-paths`. If `$ARGUMENTS` opens with a clean kebab-case token, use it; else derive one from the intent.
- **Intent** — the actual problem to solve, in one sentence. This becomes the plan title and the Context section seed.

If the slug already exists at `Plans/<slug>/`, **do not overwrite**. Either:
- Open the existing plan and bump its version (treat as iteration), OR
- Suggest a new slug to Dan with a one-line "📝 slug collision: existing plan is `<slug>` (status: <X>); use `<new-slug>`?"

### 2. SCAFFOLD — Copy the blueprint

The canonical template lives at `Plans/_plan-blueprint/index.html`. **Always copy, never generate from scratch** — the blueprint carries the styles, the mermaid wiring, the section comments, and the format contract.

Run the spell:

```bash
bash ~/.claude/skills/plan/spells/sp-scaffold-plan <slug> "<title>"
```

This:
1. `cp -R Plans/_plan-blueprint/ Plans/<slug>/`
2. Substitutes title placeholders with Dan's title (versioned `v01`)
3. Stamps today's date in `Created:` and `Updated:` meta
4. Echoes back the path + URL

**No registry mutation.** The registry at <http://alpha.test/Plans/> fetches `/api.php?action=plans` on every load — a live filesystem walk of `Plans/<slug>/index.html`. Creating the directory IS the registry act. Drift between disk and registry is impossible by construction. (See [§The mutual contract](#the-mutual-contract-skill--api) below.)

If the spell is unavailable, do steps 1–3 by hand with Read/Edit/Write.

### 3. POPULATE — Fill in the substantive sections

Edit the new `Plans/<slug>/index.html`. Fill:

| Section | Content |
|---------|---------|
| **Context** | Why this plan exists. 3–5 sentences. The problem, the trigger, the intended outcome. Cite files/URLs that prompted it. |
| **Critical Files** | Every file the plan reads/writes/creates. Use absolute `file://` hrefs. Role column: READ / WRITE / CREATE / DELETE / REFERENCE. |
| **Gaps & Unknowns** | Real, current unknowns. Use chips honestly: OPEN (Dan must answer), ASSUMED (proceeding with named assumption), NEEDS-X (blocked until X). Do NOT pad with fake gaps to look thorough. If there are no real gaps, write one resolved chip noting "no significant gaps; proceeding additively." |
| **Approach** | The strategy — HOW we're solving it. Key decisions and why. Park rejected alternatives in `<details>` with a date and a "to-pivot" note (per the alternative-trail-comments doctrine). |
| **Run Order** | Numbered steps with status chips. Initial state: all `pending`. Strike steps via `<del>` only when complete; **never delete** them — the audit trail is load-bearing. |
| **Verification** | How we know the plan delivered. Prefer browser-verifiable / observable side effects. |

**Diagrams:** if a flowchart or sequence diagram beats prose, use mermaid inline:

```html
<pre class="mermaid">
flowchart LR
  A[start] --> B[middle] --> C[end]
</pre>
```

The blueprint loads mermaid in `<head>` — no extra wiring needed. (Dan's macOS Claude Code chat does NOT render mermaid, so reserve mermaid for the HTML plan; use ASCII boxes in chat replies.)

### 4. SURFACE — Show Dan both URL and path

After scaffolding + initial populate, surface to Dan in this exact shape:

```
📋 Plan drafted: <title> (v01, draft)
   🌐 http://alpha.test/Plans/<slug>/
   📁 /Users/verdey/Documents/Claude/Projects/Plans/<slug>/index.html
```

**Both URL and path, every time.** Per codebase doctrine and the loud feedback memory — never one without the other, never relative paths.

### 5. EXECUTE & FLIP — The plan is the working surface

As work proceeds against the plan:

- **Flip step status chips** as steps move from `pending` → `running` → `done`/`skipped`. This happens IN the HTML, not in chat.
- **Resolve gap chips** by editing the chip class from `open` to `resolved` and noting the answer inline. Never delete the gap block — keep the audit trail.
- **Bump the version** (`v01` → `v02`) on every meaningful edit:
  - In the `<h1>`'s `<span class="version">`
  - In the footer line
  - Add a row to the Changelog table (newest first), one clause describing what changed
- **Update the status pill** when state shifts: `draft` → `active` (work started) → `done` (verified) or `blocked` (gap is NEEDS-X). Per the loud-status-hygiene doctrine, never let stale chips linger.

### 6. ITERATE / REFLECT

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

| Field | Source in each plan's `<head>` |
|-------|--------------------------------|
| `title` | `<title>Plan: <name> — v##</title>` (em-dash + version optional) |
| `version` | Same `<title>` suffix; falls back to `<span class="version">v##</span>` |
| `status` | First `<span class="pill draft\|active\|done\|blocked">` |
| `lastTouched` | mtime of `index.html` (POSIX) |
| `isTemplate` | slug starts with `_` (only `_plan-blueprint` today) |

**Why this matters for the skill:** when populating or editing a plan, keep these landmarks intact. The blueprint already places them correctly — bumping `v##` in the H1's `<span class="version">` AND in the `<title>` keeps the registry honest. Flipping the status pill class (`draft → active → done`) is what makes the registry sort correctly. **The HTML structure IS the API.** No parallel state to maintain, no JSON to update.

---

## 🔮 Spell Dispatch

| Spell | When | What |
|-------|------|------|
| `sp-scaffold-plan <slug> "<title>"` | Step 2 of every new plan | Copies blueprint → `Plans/<slug>/`, substitutes title, stamps date, echoes URL+path. **Does not** touch the registry — the live `?action=plans` endpoint discovers the new dir on next load. |

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
- **Keep parser landmarks intact** — the `?action=plans` endpoint reads `<title>Plan: ... — v##</title>`, `<span class="version">`, and `<span class="pill <status>">` from each plan's `<head>`. Bump version + flip status in BOTH the title-suffix and the dedicated spans, in one edit pass. (See [§The mutual contract](#the-mutual-contract-skill--api).)
- **Status pill must stay accurate** — `draft → active → done/blocked`. No stale "active" pills on landed plans (per loud-status-hygiene). The registry sort order depends on this pill being correct.
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
