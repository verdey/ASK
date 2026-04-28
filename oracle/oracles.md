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


## 🔮 selena · fractals · active
- **Born:** 2026-04-28T08:55-04:00
- **Last touched:** 2026-04-28T08:55-04:00
- **Project scope:** /Users/verdey/Documents/Claude/Projects/Council/ASK (council substrate; the Sunset pass + 0107 propagation arc)
- **Nomenclature realm:** fractals (barnsley, cantor, dragon, julia, koch, mandelbrot, menger, peano, sierpinski)
- **Children:**
  - `selena.barnsley` — Wave 0 / 🗝️ Keeper (via ⚡ Catalyst) / Sonnet 4.6 — seal the Sunset pass: refresh roster, stage selectively, commit Doctrine 0107 + harmonic tuning changes, push if remote tracks, verify symlink integrity. Brief at `Council/ASK/docs/sessions/_council-tuning-seal-2026-04-28.md`.
- **Open threads:**
  - **Future-phase 0107 propagation** (next /oracle session): translate Doctrine 0107 into operational appdev assertions — author `kingdom_council_reflection_rubric.md`, wire reflection-check into /knock pre-execution gate, possibly draft Doctrine 0108 ("appdev recommendations carry council DNA").
  - **Pre-existing untracked work** in `Council/ASK`: `arriba/`, `sketch/`, `flow/exemplars.md`, `flow/ladder.md`, `flow/shapes.md` — left untouched by Wave 0 by design; deserve their own scoped commits via their own oracles.
- **Notes:** Birthed after `/seek` Sunset pass landed Doctrine 0107 in scripture and ran a harmonic tuning pass over the council. Plan: `~/.claude/plans/review-all-my-claude-humming-sunset.md`.

## 🔮 carmen · knots · active
- **Born:** 2026-04-28T13:35-04:00
- **Last touched:** 2026-04-28T13:35-04:00
- **Project scope:** /Users/verdey/Documents/Claude/Projects/Tooling/flow-runner-llm (operational quality loop arc — first walk + graduation toward Tier 1)
- **Nomenclature realm:** knots (alpine-butterfly, bowline, clove-hitch, double-fisherman, figure-eight, granny, half-hitch, larks-head, monkey-fist, overhand, prusik, reef, sheet-bend, square, taut-line, trucker-hitch, water-knot)
- **Children:**
  - `carmen.alpine-butterfly` — Wave 0 / ⚡ Catalyst / Sonnet 4.6 — first walk of `_meta-flow/` loop (0100→0700, scorecard genesis, AAR) — pending dispatch
  - `carmen.bowline` — Wave 0p / 👁️ Visionary / Haiku 4.5 — entropy scan over `_meta-flow/` (init.md claims vs processes/ substrate; Filesystem-Truth pre-loop) — pending dispatch
- **Open threads:**
  - **Known `_core/` drift** (`_core/model-aliases.yaml` not actually read; runner uses Python dict at `bin/run-flow:28-40`) — flagged for Wave 1, NOT Wave 0 (structural; needs carmen scoping after AAR).
  - **Git topology** — no repo at `Tooling/flow-runner-llm/`; carmen will scope `git init` decision in a later wave once first walk surfaces what's worth versioning.
  - **Canary readiness** — `Income/Income-Land-Deal-Search/` may not yet conform to `_flow-blueprint` shape; first walk uses self-canary (`_meta-flow/` walks itself) until LOB canary is verified.
- **Notes:** Born from `/oracle take it from here` after a turn that scaffolded `_meta-flow/`, curated 5 lessons + 2 tools-register entries to `/flow`, and verified the runner's own dry-run passes against the new meta-flow. Single-wave first walk by design — multiple parallel waves would force handoff artifacts that don't exist yet.

## 🪦 Retired

## ~~🔮 valentina · tacos · retired~~
- **Born:** 2026-04-27T00:00-04:00
- **Last touched:** 2026-04-27T00:00-04:00
- **Project scope:** /Users/verdey/.claude/skills/oracle
- **Nomenclature realm:** tacos (al-pastor, barbacoa, birria, carnitas, chorizo, dorado, elote, frijoles, guisado, hongos, jamaica, lengua)
- **Children:** (none yet)
- **Open threads:** —
- **Notes:** First birth. Reviewing the named-oracle + nomenclature-realm integration just shipped to SKILL.md.
