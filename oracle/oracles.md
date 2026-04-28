# 🔮 Oracle Registry

The kingdom-wide ledger of named Oracles and their child threads. Mutated only by `/oracle`. Format documented in `SKILL.md` § Registry format.

Statuses: 🟢 active · ⏸ paused · 🪦 retired. Auto-prune at 33h idle; warning banner from 21h.

---

## 🔮 mariela · coffee-drinks · paused
- **Born:** 2026-04-28T00:55-04:00
- **Last touched:** 2026-04-28T03:50-04:00
- **Project scope:** /Users/verdey/Documents/Claude/Projects/Live/flows_deals (visibility-surface upgrade arc, audit-driven, 4 tiers — COMPLETE)
- **Nomenclature realm:** coffee-drinks (americano, cappuccino, cortado, doppio, espresso, flat-white, frappe, latte, lungo, macchiato, mocha, ristretto)
- **Children:**
  - `mariela.americano` — Wave 0 / ⚡ Catalyst / Sonnet 4.6 — Tier 2: self-logging + Filesystem-Truth fix ✓ shipped
  - `mariela.cappuccino` — Wave 1 / ⚡ Catalyst / Sonnet 4.6 — Tier 1: filter bar + staleness rollup + snapshot diff ✓ shipped
  - `mariela.cortado` — Wave 2 / ⚡ Catalyst / Sonnet 4.6 — Tier 3: yq swap + pup swap + tools-register HTML extraction entry ✓ shipped (sections=9/9 broken=62/62 exact)
  - `mariela.doppio` — Wave 3 / ⚡ Catalyst / Sonnet 4.6 — Tier 4: excluded.html companion (76+5=81 surfaced) + meta-kind override in discover.sh ✓ shipped (inline-dispatched by Dan after model swap to Opus 4.7; 11/11 SC pass; 5 reason labels exercised)
- **Open threads:**
  - **Seven candidate lessons** pending `/flow curate-batch` (4 audit + 2 from Waves 1–2 + 1 from Wave 3 — *labeled exclusions surface their own omissions*).
  - **CLAUDE.md stack drift:** stack table still reads `html.parser`; should read `pup` + Python 3 + mention `excluded.html` companion artifact.
  - **No git repo at realm** — kingdom-level git init is the unblocking move if Dan wants 4-wave commit history.
  - **SC8 (live meta-kind override)** deferred as optional — grep parses cleanly (SC7 ✓); end-to-end live test needs a placed source HTML.
- **Notes:** Arc complete 2026-04-28T03:50. All four tiers shipped end-to-end. Wave 3 dispatched inline by Dan in `gsd` mode after Opus 4.7 model swap (departed from standard Oracle-ends-at-table flow on explicit user override). Pipeline now: discover (with labeled excludes + meta-kind peek) → curate (yq) → stitch (pup, with diff + excluded companions) → log + audit JSONL. Visibility surface end-to-end legible: shows what it has + what it's missing + what changed since last run. Family retired with no open code threads, only doc/maintenance carries.

## 🔮 rosa · mad-men · paused
- **Born:** 2026-04-27T20:35-04:00
- **Last touched:** 2026-04-28T01:15-04:00
- **Project scope:** /Users/verdey/Documents/Claude/Projects (kingdom→Documents/Claude migration arc — complete)
- **Nomenclature realm:** mad-men (betty, don, harry, joan, ken, lane, megan, peggy, pete, roger, sally, ted, trudy)
- **Children:**
  - `rosa.betty` — Wave 0 / 🎵 Harmonizer / Sonnet 4.6 — attuned new home metaphor + 6-family taxonomy ✓ shipped
  - `rosa.don` — Wave 2a / ⚡ Catalyst / Sonnet 4.6 — physical project moves, git history preservation, Herd + docs-inc + ASK symlink relink ✓ shipped (50+ projects, 10 Herd, 6 docs-inc, 11 relocate commits)
  - `rosa.harry` — Wave 2b / 🜃 Alchemist / Haiku 4.5 — bulk path sweeps ⊘ never spawned (scope absorbed by joan)
  - `rosa.joan` — Wave 2c / 🗝️ Keeper / Sonnet 4.6 — memory hash rename + verification + AAR seal + absorbed Alchemist ✓ shipped (31 hashes renamed, 7 FLAG kept, 9 MEMORY.md swept)
  - `rosa.ken` — Wave 3a / 👁️ Visionary / Sonnet 4.6 — entropy scan + KINGDOM.md lore-marker ✓ shipped (KINGDOM.md ~70 lines + entropy scan; manifest update deferred to Catalyst follow-up)
  - `rosa.lane` — Wave 3b / 📚 Teacher / Sonnet 4.6 — authored /miguel skill via skill-creator ✓ shipped (commit 2464ecc on Council/ASK)
  - `rosa.megan` — Wave 3c / ⚡ Catalyst / Sonnet 4.6 — manifest update + nuke .env.shared + portal refresh + flows.deals PRODUCT.md seed ✓ shipped (8 cards live; .env.shared deleted with 6-secret fingerprint preserved in AAR; PRODUCT.md created fresh — no collision with mariela)
- **Open threads:** **⚠️ Secret continuity check** — `.env.shared` held SUPABASE_URL/ANON_KEY, CLOUDFLARE_ACCOUNT_ID/API_TOKEN, RAILWAY_TOKEN, APP_ENV. Confirm these exist in 1Password (or another current source) before relying on any related deploy.
- **Notes:** Arc complete 2026-04-28T01:15. Kingdom-merge sealed end-to-end: 7 children (1 absorbed, 6 shipped). New skill /miguel alive as future migration curator. Family cards on portal show 💤 dormant because no HANDOFF.md/_BACKLOG.md at family roots yet — expected, will populate as families fill in.

## 🔮 lucia · pasta-shapes · paused
- **Born:** 2026-04-27T20:30-04:00
- **Last touched:** 2026-04-28T03:15-04:00
- **Project scope:** /Users/verdey/Documents/Claude/Projects/Finance/Income (post-Rosa-reorg path; cross-substrate: + Finance/wealth_architecture + Labs/parallelism)
- **Nomenclature realm:** pasta-shapes (capellini, conchiglie, ditalini, farfalle, fettuccine, fusilli, gnocchi, lasagna, linguine, macaroni, orecchiette, orzo, penne, ravioli, rigatoni, spaghetti, tortellini, ziti)
- **Children:**
  - `lucia.capellini` — Session #1 / 📚 Teacher / Opus 4.7 1M → Sonnet 4.6 (closer) — Doctrine Consolidation /ask (Sacred Handling) ✓ shipped — S1 sealed via commit `10b79c8` in Income; flow.md §1.7 skinny canon, _CONVENTIONS pointer, scripture hybrid (pointer banner + snapshot), _doctrine/README.md authored, ADRs 0007 (10k) + 0008 (13k) landed, AAR filled, three forward-references resolve; CLAUDE.md §14.5 cross-substrate harmonic note added
  - `lucia.ditalini` — pause-execution / 📚 Teacher / Sonnet 4.6 — watchful-pause documentation pulse (registry status, ADR 0008 changelog row, _doctrine/README drift notice, S1-closer obsolete annotation) ✓ shipped 2026-04-28T03:15
- **Open threads:** Finance/Income/docs/sessions/_pause-2026-04-26-1822.md, _pause-2026-04-26-1823.md, _pause-2026-04-26-1830.md, _pause-2026-04-24-2244.md (all carried, untouched; resume separately if/when arc resurrects)
- **Notes:** **Watchful pause** per [`/Users/verdey/.claude/plans/plan-to-resurrect-this-quirky-haven.md`](../../plans/plan-to-resurrect-this-quirky-haven.md). S1 (doctrine consolidation) shipped clean. Sessions S2–S5 (universal flow-pulse + flow-refine-watcher LLM-pass infrastructure) deferred — not retired — pending Mariela's `_audit/runs.jsonl` pattern proving out across more LOBs. Trip-wires: (A) Mariela stays LOB-specific after 2+ rollouts → resurrect S2–S5; (B) Mariela generalizes to cover audit + upward-summary → retire S2–S5; (C) inconclusive after 3+ LOBs → fresh /seek hybrid design. Default cadence: /oracle revisits when a new LOB lands `_audit/runs.jsonl` OR after 30 days of no trip-wire activity. **Topology drift acknowledged in registry only:** ADR 0008 still names `~/Documents/Claude/Projects/_doctrine/` (portfolio-level) but actual filesystem path post-Rosa is `Finance/Income/_doctrine/` (project-local) — drift documented in ADR 0008 changelog + _doctrine/README.md drift blockquote, not yet reconciled (per migration cadence: only on next /knock-touch).


## 🔮 selena · fractals · paused
- **Born:** 2026-04-28T08:55-04:00
- **Last touched:** 2026-04-28T10:10-04:00 (arc sealed)
- **Project scope:** /Users/verdey/Documents/Claude/Projects/Council/ASK (council substrate; the Sunset pass + 0107 propagation arc)
- **Nomenclature realm:** fractals (barnsley, cantor, dragon, julia, koch, mandelbrot, menger, peano, sierpinski)
- **Children:**
  - `selena.barnsley` — Wave 0 / 🗝️ Keeper (via ⚡ Catalyst) / Sonnet 4.6 — sealed Sunset pass ✓ shipped (commit `3f80df1` → origin/main; 18 files: 16 modified + 2 new _src; roster refreshed `2026-04-28`; symlink inodes verified; 2 deviations: `_archive/sessions/` was already gitignored so unstageable, .md-whitelist needed entries for new _src paths added during seal)
  - `selena.cantor` — 0107 Wave 0 / 📚 Teacher (via /ask sub-agent) / Sonnet 4.6 — authored `ask/_src/reflection_rubric.md` ✓ shipped (159 lines, all 7 attributes covered, voice plain operational; 1 deviation: ✦ used for attribute 3 instead of brief-suggested ✨ to avoid Healer-glyph collision — Teacher judgment honored). Sealed in dragon's commit.
  - `selena.dragon` — 0107 Wave 1 / ⚡ Catalyst (via /knock sub-agent) / Sonnet 4.6 — wired rubric into /knock + cross-refs in /ask + /seek ✓ shipped (commit `01f0314` → origin/main; 5 files: rubric + 3 SKILL.md + .md-whitelist; insertion sizes 14/4/3 lines; no pre-commit issues; carries clean; reflection check feels natural in Catalyst's Entry Gate).
  - `selena.julia` — 0107 Wave 2 / 👁️ Visionary (via /ask sub-agent) / Sonnet 4.6 — post-integration entropy scan ✓ shipped. Verdict: **Tune** (substrate harmonically sound, two precision findings + 1 below-threshold). Findings: (1) ask/seek cues asymmetric in weight but unmarked — fix: add `(advisory heads-up)` and `(attunement gate)` parentheticals; (2) rubric routes all misalignment to /seek (monoculture risk) — fix: add line routing per failing-attribute domain to Architect/Warrior/Healer.
  - `selena.koch` — 0107 Wave 3 (tune) / ⚡ Catalyst (via /knock sub-agent + main-thread seal) / Sonnet 4.6 — applied Julia's two precision tunes ✓ shipped: 3 lines added across `ask/SKILL.md`, `seek/SKILL.md`, `ask/_src/reflection_rubric.md` (rubric 160 lines, ≤200 confirmed). Sub-agent edited disk; main thread sealed (commit + push) under explicit Dan close-out directive.
- **Open threads:**
  - **Future-phase 0107 propagation** (next /oracle session, selena scope): translate Doctrine 0107 into operational appdev assertions — author `kingdom_council_reflection_rubric.md`, wire reflection-check into /knock pre-execution gate, possibly draft Doctrine 0108 ("appdev recommendations carry council DNA").
  - **Pre-existing untracked dirs/files at council root** (post-barnsley seal): `arriba/`, `sketch/`, `flow/exemplars.md`, `flow/ladder.md`, `flow/shapes.md` — still untracked.
  - **Pre-existing modified files NOT part of Sunset pass** (surfaced by barnsley AAR): `README.md`, `flow/doctrine.md`, `flow/lessons.md`, `flow/showcase.md`, `flow/tools-register.md`, `skillz/_src/council-map.md` — deserve their own scoped commit by their own oracle.
- **Notes:** Birthed after `/seek` Sunset pass landed Doctrine 0107 in scripture and ran a harmonic tuning pass over the council. Plan: `~/.claude/plans/review-all-my-claude-humming-sunset.md`. Wave 0 sealed clean — selena stays active, awaiting Dan's go-signal for next wave (0107 propagation OR housekeeping of the unstaged/untracked carries).

## 🔮 carmen · knots · active
- **Born:** 2026-04-28T13:35-04:00
- **Last touched:** 2026-04-28T14:30-04:00
- **Project scope:** /Users/verdey/Documents/Claude/Projects/Tooling/flow-runner-llm (operational quality loop arc — first walk + graduation toward Tier 1)
- **Nomenclature realm:** knots (alpine-butterfly, bowline, clove-hitch, double-fisherman, figure-eight, granny, half-hitch, larks-head, monkey-fist, overhand, prusik, reef, sheet-bend, square, taut-line, trucker-hitch, water-knot)
- **Children:**
  - `carmen.alpine-butterfly` — Wave 0 / ⚡ Catalyst / Sonnet 4.6 — first walk ✓ shipped (4🔴 1🟡 scorecard, 5 gaps ranked, 3 proposals: 1 applied additive `duration_s`, 2 routed to `_suggestions/`; 7 JSONL lines; dry-run still passes; 1 manual fixup — brief line numbers ~60 off from real)
  - `carmen.bowline` — Wave 0p / 👁️ Visionary / Haiku 4.5 — entropy scan ✓ shipped (closing signal: "dispatch follow-up wave: yes"; aligned with alpine-butterfly's SDK-drift finding)
  - `carmen.clove-hitch` — Wave 1a / ⚡ Catalyst / Sonnet 4.6 — bundled-apply: model-aliases YAML loader + retry-on-stream-failure + SDK drift fix in CLAUDE.md + bin/run-flow error message — pending dispatch
  - `carmen.double-fisherman` — Wave 1b / 📚 Teacher / Haiku 4.5 — correct `/flow lessons.md` SDK error in curated lesson + add brief-staleness meta-lesson — pending dispatch
  - `carmen.figure-eight` — Wave 1c / 📚 Teacher / Haiku 4.5 — substrate corrections to `_meta-flow/processes/*/step.md` (line-number + path drift Wave 0 AAR named); MUST run after 1a — pending dispatch
- **Open threads:**
  - **3 `#decision-pending` / `#assumption-flagged` items** in `_meta-flow/docs/cold-boot-brief.md` — auto-trigger? runs.jsonl semantic diff register entry? canary regression definition? Park for Wave 2 scoping.
  - **Git topology** — no repo at `Tooling/flow-runner-llm/`; carmen will scope `git init` decision after Wave 1 lands.
  - **Income-Land-Deal-Search canary** — bootstrap-only; not meta-flow-shape yet. Self-canary continues as default until that LOB matures.
- **Notes:** Wave 0 ⏱ 25min total walk. Surfaced the **big SDK drift** that escaped scaffold-time review: runner uses `openai` SDK → OpenRouter (not `anthropic` SDK direct). My own curated lesson in `~/.claude/skills/flow/lessons.md` about `cache_control: ephemeral` prompt-caching is therefore wrong — Wave 1b corrects.

## 🔮 paloma · birds · active
- **Born:** 2026-04-28T14:07-04:00
- **Last touched:** 2026-04-28T14:07-04:00
- **Project scope:** /Users/verdey/Documents/Claude/Projects (kingdom-level refresh — state-of-the-board read)
- **Nomenclature realm:** birds (albatross, bluebird, crane, dove, egret, falcon, grebe, heron, ibis, jay, kestrel, lark, martin, nightingale, oriole, petrel, quail, robin)
- **Children:** (none yet)
- **Open threads:** —
- **Notes:** Birthed for `/oracle refresh` after surface-backlogs → flows_deals wiring completed inline. Purpose: surface active oracle threads + answer "are we done?"

## 🔮 yolanda · dances · active
- **Born:** 2026-04-28T14:15-04:00
- **Last touched:** 2026-04-28T14:25-04:00
- **Project scope:** /Users/verdey/Documents/Claude/Projects/Live/surface-backlogs (operationalization arc + cross-Kingdom seal census)
- **Nomenclature realm:** dances (bachata, cumbia, danzon, flamenco, mambo, salsa, samba, tango)
- **Children:**
  - `yolanda.bachata` — Wave 1 / ⚡ Catalyst / Sonnet 4.6 — fix parse.py item-inflation noise — in-progress inline 2026-04-28T14:25 (departed from standard Oracle-ends-at-table flow on Dan's "lead aggressively, inline what you can" + arriba + auto-mode triple-signal)
- **Open threads:**
  - **Wave 2** (fresh Oracle on patillo redeaux scope, Opus 4.7) — calendar-critical, ~17d to Erath CAD tax-protest floor (May 15, 2026)
  - **Pointer:** wealth_architecture deserves its own oracle when Dan is ready (parallel pfin.andy tab + thesis 0220 content-misalignment)
  - **Pointer:** Live/flows_deals' own _BACKLOG.md (7 items) will surface in backlogs.test — Dan can triage there
- **Notes:** Born after /seek pass over the freshly-built surface-backlogs flow. yolanda's lane is the surface itself; the realms it surfaces have their own oracles. PREFLIGHT surfaced patillo redeaux Erath CAD tax-protest deadline as the most-aged thread in the Kingdom — routed to fresh Oracle Wave 2, not absorbed. Sister-active to paloma (kingdom-level state-of-the-board oracle).

## 🪦 Retired

## ~~🔮 valentina · tacos · retired~~
- **Born:** 2026-04-27T00:00-04:00
- **Last touched:** 2026-04-27T00:00-04:00
- **Project scope:** /Users/verdey/.claude/skills/oracle
- **Nomenclature realm:** tacos (al-pastor, barbacoa, birria, carnitas, chorizo, dorado, elote, frijoles, guisado, hongos, jamaica, lengua)
- **Children:** (none yet)
- **Open threads:** —
- **Notes:** First birth. Reviewing the named-oracle + nomenclature-realm integration just shipped to SKILL.md.
