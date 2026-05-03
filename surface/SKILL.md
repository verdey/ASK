---
name: surface
description: "🌊📌 Surface — Wu Wei substrate cartographer. When a focal topic surfaces (decision, opportunity, issue, fragment, finding, observation) and the next move is *where does this belong?*, route it to the right rollup in the codebase's living HTML/PHP mesh, drop the fragment so the parent rollup absorbs it, then render Dan a hyperlinked menu of next-move vessels (primary action + N/S/E/W/Z adjacencies + copy-paste `/plan` invocations). Trigger whenever Dan says 'surface this', '/surface', 'where does this go', 'crystallize this', 'what should I do with this', 'pin this', or whenever a finding/decision/opportunity needs to land somewhere persistent. Also fires for the cliffhanger reflex — single off-thread non-visual decision → decisions.test (atomic-cliffhanger substrate; sister to /oracle's gated-thread substrate). Do NOT trigger for: visual clarifiers (→ /sketch), whole-session transitions (→ /pause), multi-decision strategic scope (→ /oracle), or destructive/irreversible decisions (→ bundled-confirm)."
argument-hint: "[optional: focal topic, e.g. 'postgres vs dynamodb' or 'flow X is stalled' or 'rename roster slug']"
---

# 🌊📌 Surface — Wu Wei substrate cartographer

> *Water finds its level. The fragment finds its rollup. The rollup finds Dan.*
> 🜄 flow • 🜂 act • 🜁 see • 🜃 ground

Sister vessel to [`/sketch`](../sketch/SKILL.md) (visual-doubt reflex) and [`/pause`](../pause/SKILL.md) (whole-session seal). Council-adjacent, not a triad member.

---

## Charter

The codebase is a living HTML/PHP rollup mesh — every `.test` surface, every `index.html`, every templated artifact-root is *already* designed to absorb a particular shape of focal topic. `/surface` is the reflex that asks **"where does this already belong?"** before Dan invents a new place — then drops the fragment in the right rollup so the existing parent surfaces it for him.

One invocation does these things:

1. 🜁 **Sense** the focal topic shape (decision · opportunity · issue · finding · plan · flow · skill · run · realm)
2. 🜃 **Consult** the substrate map — which rollup already absorbs this shape?
3. 🜄 **Drop** the fragment at the right path so the parent rollup picks it up automatically
4. 🜂 **Render** a Wu Wei menu: primary action (hyperlinked) + N/S/E/W/Z adjacencies + copy-paste `/plan` vessel(s) where helpful

The skill itself is the cartographer. It maintains a living mental map of *what is where* and *which rollup surfaces what kind of focal topic best*. **The map is computed on the fly from `CLAUDE.md` + `?action=plane` every invocation** — no cached registry, no manifest write-back, no drift. Live truth. 1–2s of latency is the price of correctness.

---

## The substrate map

**Read `CLAUDE.md` at codebase root for the canonical Herd valet registry table.** That table is the source of truth for `.test` rollups; this section is the routing intelligence on top.

### Rollups by focal-topic shape

| Focal topic shape | Primary rollup | Drop fragment at | Why this rollup |
|---|---|---|---|
| 🌀 **Single off-thread non-visual decision (atomic cliffhanger)** | [decisions.test](http://decisions.test) | `Decisions/<YYYY-MM-DD>-<slug>/{brief.md,state.json}` | Cliffhanger crystallizer; resolve form built-in. Sister substrate to Oracle (multi-thread arcs). |
| 🗂️ **Plan / scope / multi-step orchestration** | [planq.test](http://planq.test) (queue) → [Plans/](file:///Users/verdey/Documents/Claude/Projects/Plans/) (full plan) | `planq.md` line OR `Plans/<slug>/index.html` (clone `_plan-blueprint`) | Plans are HTML, versioned (`-v##`), live working surfaces |
| 🌊 **Flow / LOB / prompt-folder craft** | [alpha.test](http://alpha.test)/`Flows/<roster>/<flow>/` + [flow-atlas.test](http://flow-atlas.test) | `Flows/Roster/@<person>/_flow-<slug>/` (clone `_flow-blueprint`) | Atlas auto-discovers; blueprint is canonical |
| 🔁 **Run / execution status** | [flow-queue.test](http://flow-queue.test) | Existing flow's run dir; tail via UI | Run monitor with rerun affordance |
| 🔮 **Multi-decision strategic scope / shard** | [oracle.test](http://oracle.test) | New oracle controller + shard via `/oracle` | Gated thread substrate, not /surface's lane |
| 🛠️ **Skill / Council asset** | [code.test](http://code.test) | `Council/ASK/<skill>/SKILL.md` | Council dashboard, skillz roster |
| 🏛️ **Realm / project / portal card** | [alpha.test](http://alpha.test) | New subdir + `REALM_SEEDS` row in `api.php` | Live filesystem walk; auto-card |
| 📜 **Edict / doctrine / cross-cutting rule** | [alpha.test](http://alpha.test) (signals) | Project `CLAUDE.md` or named edict file | `?action=edicts` parses |
| 🔍 **Drift audit / shard observatory** | [oracle-lens.test](http://oracle-lens.test) | (read-only audit; emits next moves) | Use to *find* drift, not to crystallize |
| 🗺️ **Topology / git anomaly view** | [topo.test](http://topo.test) | (visual git topology; complements `/miguel`'s move-mapping) | Visualization layer, not the move planner |
| 📦 **Deal / customer-facing flow surface** | [flows.test](http://flows.test) | Existing pipeline (`Live/flows_deals/`) | Daily-refreshed via `bin/refresh-all-surfaces.sh` |
| 📋 **Backlog / customer follow-up surface** | [backlogs.test](http://backlogs.test) | Existing pipeline (`Live/surface-backlogs/`) | Daily-refreshed via launchd |
| 📰 **Echo / changelog / signal** | [echo.test](http://echo.test) | Existing echo pipeline | Tail-only surface |
| 📅 **Daily prioritization** | [code.test](http://code.test) (triage panel) | (read-only computed) | Use `/triage` skill, not /surface |

### Templated artifact-roots (clone-not-create)

| Template | Purpose | Cloning rule |
|---|---|---|
| `Plans/_plan-blueprint/index.html` | New plan HTML | `cp -R Plans/_plan-blueprint/ Plans/<slug>/` then edit |
| `Flows/_flow-blueprint/` | New flow folder | `cp -R Flows/_flow-blueprint/ Flows/Roster/@<person>/_flow-<slug>/` |
| `Decisions/_template/{brief.md,state.json}` | New decision shard | Auto by `/surface` cliffhanger mode |

### Live API endpoints (use these, don't reinvent)

```
?action=realms          ?action=plane           ?action=signals
?action=related         ?action=triage          ?action=insights
?action=roster          ?action=edicts          ?action=decisions
?action=search-plane    ?action=archived-oracles
?action=decision&slug=<slug>     ?action=realm&slug=<slug>
```

When unsure where a focal topic lives, `?action=search-plane&q=<term>` is the broadest search. **All endpoints compute live** — `api.php → collect_realms()` reads filesystem fresh per request with a 15s cache. No manifest-refresh script, no write-back doctrine.

---

## Workflow

### Step 1 — 🜁 Sense the focal topic

Compress what's at hand to one sentence and tag its shape from the table above. If the shape is ambiguous, ask Dan one question — but only one. If it's a **cliffhanger decision** (off-thread, non-visual, single-question), proceed to the cliffhanger sub-workflow below.

If the topic is:
- 🎨 **Visual** (layout, color, shape) → refuse, route to [`/sketch`](../sketch/SKILL.md)
- 🌒 **Whole-session transition** → refuse, route to [`/pause`](../pause/SKILL.md)
- 🔮 **Multi-decision strategic** → refuse, route to [`/oracle`](../oracle/SKILL.md)
- 💥 **Destructive / irreversible** → refuse, route through bundled-confirmation
- ✋ **Answerable inline in 2 turns** → just answer, no reflex

### Step 2 — 🜃 Consult the substrate

Match the focal topic shape to a rollup row in the substrate map. Verify the rollup still exists by reading `CLAUDE.md` valet table or curling `?action=plane` — substrate evolves; never assert a `.test` URL exists without checking it's still in the table.

If **no existing rollup absorbs this shape**, surface that gap explicitly in the menu — don't silently invent a new home. Dan may want to extend an existing rollup vs. spin a new one.

### Step 3 — 🜄 Drop the fragment

Write the fragment at the canonical drop path for the rollup. Cloning rule: **prefer existing templates over hand-crafted fragments** (`_plan-blueprint`, `_flow-blueprint`, `_template`). Templates encode the parent's parsing contract.

For each rollup, the drop is mechanical:
- **decisions.test** → see Cliffhanger sub-workflow below (atomic-cliffhanger substrate)
- **planq.test** → append a line to `planq.md` matching the existing line format
- **Plans/** → `cp -R Plans/_plan-blueprint/ Plans/<slug>/` then fill `index.html` (status block + version + changelog per HTML plan standard)
- **Flows/** → `cp -R Flows/_flow-blueprint/ Flows/Roster/@<person>/_flow-<slug>/`
- **REALM_SEEDS** → `mkdir <realm>/`, edit `api.php` REALM_SEEDS const

**No manifest refresh anywhere.** `api.php` walks filesystem live on every request. The fragment lands → next page load reads it. That's the contract.

### Step 4 — 🜂 Render the Wu Wei menu

Output to Dan in this exact shape:

```
🌊 <one-line elemental framing of where the topic flowed>

📍 Primary surface
  → http://<rollup>.test/<path>     (clickable, parent rollup absorbs)
  → /Users/verdey/Documents/Claude/Projects/<absolute path>

🧭 N/S/E/W/Z adjacencies
  N (parent / context)   → <upstream rollup or doctrine>
  S (children / detail)  → <downstream artifact or shard>
  E (sibling current)    → <horizontal peer rollup>
  W (sibling prior)      → <related historical artifact>
  Z (orthogonal lens)    → <cross-cutting view: triage / lens / atlas>

🜂 Next-move vessels (copy-paste)
  /plan <focal-topic>
  /<other relevant skill> <args>

📜 Errata
  <one-liner if any: gap noticed, drift surfaced, doctrine to read>
```

Keep it ultra-brief. Drop sections that don't apply. The menu is the interface — Dan should be able to click → land → act in three keystrokes. **Always include both the clickable `*.test` URL and the absolute filesystem path** (per Flow surface links feedback doctrine).

---

## Cliffhanger sub-workflow (Mode A — intentional, not transitional)

> 🌊 **Two patterns, two shapes.** Per the substrate-prune audit on 2026-05-03 ([Plan: surface-substrate-prune](http://alpha.test/Plans/surface-substrate-prune/), C1=D resolved): the lightweight `Decisions/` + decisions.test pattern absorbs *atomic cliffhangers with radio-form resolution*; Oracle's gated-thread substrate absorbs *multi-thread arcs with phased gates*. They are not redundant — they own genuinely different topologies. `/surface` routes by topic shape; `/oracle` is the right vessel for multi-decision strategic scope. Both substrates stay; the audit's "retire one" instinct conflated feature-richness with shape-redundancy.

When the focal topic is **a single off-thread non-visual decision**, run the cliffhanger crystallizer:

1. **Parse cliffhanger** — single decision, specific, off-thread, non-visual.
2. **Fill brief.md** — clone `Decisions/_template/brief.md` to `Decisions/<YYYY-MM-DD>-<slug>/brief.md`. Sections:
   - `## Abstract` (2–4 sentences)
   - `## The Cliffhanger` (interrogative form)
   - `## Auto-selected default` (recommendation + 1-line rationale)
   - `## Alternative space` — 2–4 options, each `### Option X: <name>` (H3 — parsed by `decision.php` for radio buttons), with description, when-it-shines, when-it-bites
   - `## Links` (back-pointer)
   - `## Resolution` (leave empty)
3. **Write state.json** — clone template, set `slug`, `title`, ISO `created`, `status:"open"`, `resolution:null`, links. Auto-suffix `-2`, `-3` if duplicate slug today. `mkdir -p` first.
4. **Self-peek** `curl -sk "https://alpha.test/api.php?action=decision&slug=<slug>"` — assert JSON with `state` + `brief`, `state.status == "open"`. If `brief: ""` → abort, file not on disk. **No manifest step** — `?action=realms` recomputes `openDecisions` live next page load.
5. **Render Wu Wei menu** with [decisions.test/decision.php?slug=...](http://decisions.test) as primary surface, plus N/S/E/W/Z adjacencies (e.g. N → originating thread, E → adjacent open decisions, Z → [oracle-lens.test](http://oracle-lens.test) for shard-drift audit).

> Herd nginx 301-redirects HTTP→HTTPS. Use `https://` with `-sk` for the self-peek (`-s` quiet, `-k` ignore self-signed). The user-facing URL stays `http://decisions.test/...` per codebase convention.

---

## Voice — Wu Wei Taoist Master

- **Spare and elemental.** 🜄🜂🜁🜃 over adjectives. One-line framings, not paragraphs.
- **Name the surface, then step aside.** Dan clicks the link; Claude doesn't narrate the rollup.
- **Suppress the question, render the menu.** If you'd ask "where should this go?", you've already failed — read the substrate map first. Only ask when truly ambiguous, and ask exactly one question.
- **No hedging.** Pick a primary surface. The N/S/E/W/Z menu is the place for alternatives, not the primary.
- **Hyperlinks always.** Every `.test` URL is markdown-linked, every file path is absolute (per [Flow surface links](file:///Users/verdey/.claude/projects/-Users-verdey-Documents-Claude-Projects/memory/feedback_flow_surface_links.md) memory).
- **`/plan` is the default copy-paste vessel.** When the next move is multi-step, render a `/plan <slug-hint>` block. When it's atomic, render the bare action.
- **No spiritual-register inflation.** Elemental glyphs and one-liner Taoist metaphor are the flavor budget — don't propagate "sacred / sanctum / soul" outside scripture.md.

### Example output — focal topic: *"the roster slug for Chance is inconsistent across atlas vs blueprint"*

```
🌊 Drift between atlas and blueprint — flows toward audit-and-resync.

📍 Primary surface
  → http://oracle-lens.test  (audit-shards intent)
  → /Users/verdey/Documents/Claude/Projects/Tooling/oracle-lens/

🧭 Adjacencies
  N → Flows/_flow-blueprint/  (canonical exemplar)
  S → Flows/Roster/@chance/_flow-lob-land-sales/  (the drift site)
  E → http://flow-atlas.test  (downstream rollup of the same thing)
  Z → http://code.test (skill: /flow audit)

🜂 Next-move vessel
  /plan chance-roster-resync

📜 No new shard needed — existing audit surface absorbs this.
```

### Example output — focal topic: *"postgres vs dynamodb for the new ledger"* (cliffhanger)

```
🌊 Off-thread, single, non-visual — crystallized to decisions.test.

📍 Primary surface
  → http://decisions.test/decision.php?slug=2026-05-03-ledger-store
  → /Users/verdey/Documents/Claude/Projects/Decisions/2026-05-03-ledger-store/brief.md

🧭 Adjacencies
  N → originating thread (Plans/ledger-mvp/index.html)
  E → 2 adjacent open decisions on http://decisions.test
  Z → http://oracle-lens.test (audit cross-shard storage doctrine)

🜂 Next-move vessel
  Resolve async at decisions.test — radio + rationale form ready.

📜 Self-peek confirmed (api.php live walk; openDecisions reflects on next page load).
```

---

## Anti-triggers

- **Visual clarifier** → [`/sketch`](../sketch/SKILL.md)
- **Whole-session seal** → [`/pause`](../pause/SKILL.md)
- **Multi-decision strategic scope** → [`/oracle`](../oracle/SKILL.md)
- **Destructive / irreversible** → refuse; route through bundled-confirm
- **Answerable inline in 2 turns** → just answer
- **Already-existing artifact** — `/surface` does not edit existing `Decisions/<slug>/`, existing `Plans/<slug>/`, etc. Use the relevant skill (`/plan`, `/flow`, etc.) to mutate.

---

## Failure modes

| Condition | Behavior |
|---|---|
| No focal topic | Refuse; ask Dan to name what's at hand |
| Visual / whole-session / strategic / destructive | Refuse + route per anti-triggers |
| No rollup absorbs this shape | Surface the gap in the menu's 📜 errata; do not silently invent |
| Cliffhanger mode: self-peek fails | Record failure in confirmation; do not silently skip |
| Cliffhanger mode: `brief: ""` after write | Abort; "brief write failed — file not present"; no URL |
| Duplicate cliffhanger slug today | Auto-suffix `-2`, `-3`, etc. |
| Substrate map drifted (`.test` URL no longer in CLAUDE.md table) | Abort the route; flag drift as 📜 errata; suggest `/skillz` audit |

---

## State machine (cliffhanger mode only)

```
open ──(Dan resolves via decisions.test form)──→ resolved
open ──(mtime > 30d, computed dynamically)─────→ stale  [no file mutation]
stale ──(Dan resolves via decisions.test form)─→ resolved
resolved ──→ terminal
```

Stale is inferred from mtime at query time — never written to disk.

---

## Bounded actions

- Does **not** resolve decisions, edit existing plans/flows, or move realms — those belong to their own skills (`/plan`, `/flow`, `/miguel`).
- Does **not** invent rollups — only routes to existing ones; surfaces gaps as errata.
- Does **not** expand scope mid-invocation — one focal topic, one menu. Second topic = second `/surface`.
- Does **not** touch any manifest file — `api.php` is the live walker; write-cache is forbidden doctrine.
- Does **not** narrate; renders the menu and steps aside.

---

## Self-curation

Every `/surface` invocation is also an audit moment. Before rendering, *briefly verify* the substrate map by reading `CLAUDE.md` valet table — if you notice a `.test` row added or removed since the last invocation, the map you operate from is stale and must be re-read. The skill is the cartographer; the map evolves with the codebase.

When the substrate map in this SKILL.md drifts from `CLAUDE.md` (new rollup, retired surface), the menu's 📜 errata line should flag it so Dan can update either source. Drift is data, not failure.

---

## See also

- [`/sketch`](../sketch/SKILL.md) — visual-doubt sister vessel.
- [`/pause`](../pause/SKILL.md) — whole-session seal.
- [`/oracle`](../oracle/SKILL.md) — multi-decision strategic scope (gated-thread substrate); sister vessel to `/surface`'s cliffhanger Mode A.
- [`/plan`](../plan/SKILL.md) — primary copy-paste next-move vessel for `/surface` menus.
- [`/flow`](../flow/SKILL.md) — flow craft (when focal topic is LOB / prompt-folder).
- [`/triage`](../triage/SKILL.md) — daily prioritization rollup; orthogonal Z-lens.
- [`/skillz`](../skillz/SKILL.md) — council librarian; consult when surface-map drift is suspected.
- [`/compass`](../compass/SKILL.md) — N/S/E/W/Z gesture doctrine that informs the menu's adjacency layout.
- [`/arriba`](../arriba/SKILL.md) — GSD posture; auto-fires `/surface` for non-visual off-thread clarifiers.
- `Tooling/decision-queue/SURFACE-SKILL-SPEC.md` — frozen contract the cliffhanger sub-workflow was authored from.
- Codebase root `CLAUDE.md` — canonical Herd valet registry table; the source of truth for the substrate map.
