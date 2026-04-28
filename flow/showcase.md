# Flow — Showcase

> Top exemplar flows in the wild. Each entry: path, archetype, what to learn, what *not* to copy. Highlights are curated, not exhaustive.

---

## 1. `Income/_flow-blueprint/` — the canonical living blueprint

**Path:** `/Users/verdey/Documents/Claude/Projects/Finance/Income/_flow-blueprint/`
**Archetype:** Living blueprint (the meta-flow among flows).

**Why it's highlighted.** This is the structural reference every other flow clones from and re-syncs against. It is itself a flow — has its own `init.md`, `processes/`, `docs/`, and `CHANGELOG.md`. It demonstrates all four graduation tiers through example, one stage per tier, each carrying its own `_graduation.md` showing what the next-tier version looks like.

**What to learn.**
- The blueprint mechanic itself: a template that you *consult repeatedly* instead of copying once and discarding.
- How `_graduation.md` siblings work — the stage's future tense, written now, acted on later.
- The `«LOB_NAME»` / `«YYYY-MM-DD»` token pattern in `CLAUDE.md` for clean substitution at scaffold time.

**What *not* to copy.** The blueprint's stage names are illustrative, not prescriptive. Each active flow picks its own stage names that fit its actual cadence — copy the *shape*, not the *names*. Per `flow.md` §1.2: "Each Flow chooses its own ordered-prefix scheme. The acid test — not the scheme — is the doctrine."

---

## 2. `Income/wholesaling/` — multi-subflow LOB

**Path:** `/Users/verdey/Documents/Claude/Projects/Finance/Income/wholesaling/`
**Archetype:** LOB with multiple parallel subflows under one `processes/` root.

**Why it's highlighted.** Wholesaling is the existence proof that **subflows are first-class** — `processes/intake-funnel/0100-capture/...` and `processes/amber-top-of-mind/0100-collect-signals/...` run side-by-side under one LOB because they share no graduation dependencies. The acid test holds recursively: at the LOB root, at the subflow root, at every level.

**What to learn.**
- How to name parallel branches without forcing a number scheme that lies about ordering (`intake-funnel/`, `amber-top-of-mind/` — semantic names at the subflow level; numbered prefixes inside each).
- The 4-digit prefix scheme (`0100-`, `0200-`, `0300-`) that leaves room for spot-edit insertion without mass renumbering (per `flow.md` §1.2 rule 2).
- The legacy pattern in practice: each step has a `step.md` (the executable prompt/logic) — wholesaling has not yet migrated to the skinny pattern.

**What *not* to copy.** The legacy `step.md`-per-folder shape is the *honored starting point*, not the destination. Per `flow.md` §1.7, the canonical kingdom-wide pattern is the **skinny stage artifact** — one primary `.md` file per stage with YAML frontmatter and an inline `## Refine` section. New flows should be born skinny; existing flows migrate when next /knock-touched.

---

## 3. `Income/Income-Land-Deal-Search/` — sequential pipeline with explicit graduation gates

**Path:** `/Users/verdey/Documents/Claude/Projects/Finance/Income/Income-Land-Deal-Search/`
**Archetype:** Workflow LOB; strictly sequential pipeline.

**Why it's highlighted.** Land-Deal-Search is the cleanest example of *graduation gates as enforcement mechanism*. Each step (`0100-define-target-data` → `0200-define-all-sources` → `0300-validate-recipes` → `0400-perform-harvest` → `0500-notify-dan` → `0600-compile-dashboard`) has an explicit `_graduation.md` that names the pass/fail criteria for advancing. You cannot skip ahead — the graduation marker IS the gate.

**What to learn.**
- How to write a `_graduation.md` that is testable, not aspirational. ("This step is done when X observable thing exists at Y path with Z property.")
- How `<LOB>/sources/<source-slug>/` registries layer onto a flow without deforming it — sources live alongside `processes/`, not inside.
- The `docs/deals/` artifact directory pattern — the LOB's primary output (deals) lives in a stable, walk-testable location.

**What *not* to copy.** The strict-sequential shape is right for *this* LOB because each step's output is the next step's required input. It would be wrong for an LOB whose subflows are independent (cf. wholesaling). Pick sequential or parallel based on actual data dependencies, not aesthetics.

---

## 4. `Live/flows_deals/` — Stitch archetype (visibility surface over other flows)

**Path:** `/Users/verdey/Documents/Claude/Projects/Live/flows_deals/`
**Archetype:** **Stitch flow** — read-only over the rest of the portfolio; output is one stable HTML accordion that aggregates HTML artifacts produced by every other flow.

**Why it's highlighted.** First proof that the Workflow LOB pattern (stable artifact + dated snapshots + self-refresh comment block + read-only-over-substrate) generalizes to a *kingdom realm* outside `Finance/Income/`. Same DNA as `Income-Flow-Navigator/` but the substrate is *other flows' outputs* rather than *the portfolio tree*. Demonstrates two patterns the doctrine now names: **declarative-knobs-vs-mechanical-execution** (the curate step splits `registry.yaml` from `curate.sh`) and **defang-don't-break** (broken `src`/`href` in foreign HTMLs become `data-broken-*` + `⚠` chip + count, never abort).

**What to learn.**
- The **Stitch archetype contract** (per `doctrine.md` *Stitch flow*): stable artifact path, dated snapshots beside it, self-refresh comment block at top, read-only over substrate, defang-don't-break for foreign content.
- **`registry.yaml` as the knob surface separate from the script** — when a step has both judgment (which kinds, retention, ordering) and transformation (mechanical execution), split them into `<step>/<rules>.yaml` + `<step>/<exec>.sh`. Future Streamline can leave the YAML alone.
- **Live HTTP surface (Herd valet domain)** as the test loop — `curl https://flows.test/` after each run beats `open file://…` by an order of magnitude. Worth a Herd-domain symlink for any realm that produces HTML.

**What *not* to copy.** The hand-rolled YAML parser in the initial `curate.sh` was a footgun (cost: one debug cycle). New flows that read declarative config should reach for `yq` (per `tools-register.md` *YAML* section) instead — even ~30 lines of YAML parsing is more rope than it's worth.

---

## 5. `Income/Income-Flow-Navigator/` — self-refreshing artifact LOB

**Path:** `/Users/verdey/Documents/Claude/Projects/Finance/Income/Income-Flow-Navigator/`
**Archetype:** Workflow LOB whose deliverable is a single self-refreshing HTML artifact.

**Why it's highlighted.** Flow-Navigator's `processes/` (00-init through 06-notify) generates **one stable artifact** at `Income/flow-navigator.html` that holographs the entire portfolio. The artifact embeds its own runbook in an HTML comment block — any Claude surface can open the file, read the comment, and re-run the pipeline. It is also strictly **read-only over the rest of the portfolio** — never writes to other LOBs. That constraint is what makes parallel scans safe.

**What to learn.**
- The **embedded-runbook pattern** — a generated artifact that carries its own refresh contract inside itself. No external script, no central renderer.
- The **read-only-beyond-the-page** discipline — when a flow's job is to *project* substrate (per `hud-artifacts.md`), it must never *mutate* substrate. The constraint is the feature.
- How to design a flow whose output is *one file*, not a directory tree. Stable URL → stable AirDrop → stable text-message-survivable.

**What *not* to copy.** The single-artifact shape works because the deliverable is genuinely *one thing* (a portfolio holograph). Don't force it on flows whose deliverables are inherently multi-file (deal lists, lead pipelines, HUD card sets).

**Richness donor.** The artifact `Finance/Income/flow-navigator.html` far exceeds the minimum 0600-render omega spec and is the canonical pattern to draw from when enriching a flow's render. Features available to borrow: Next 3 Moves hero (above-the-fold priority surface), Brief from Claude voice block (editorial authored at render time), 7-day cadence heartbeat (activity timeline from `_audit/runs.jsonl`), Bark conditions panel (active conditions as a visual checklist), Holographic LOB grid (N/S/E/W/Z spatial navigation), Decisions Queue (surfacing `docs/decisions/` items inline). Read the flow's audience before borrowing — not every enrichment fits every flow. (Canonized: `catalina.amethyst` Wave 1, 2026-04-28.)

---

## 6. (Candidacy) `Library/tome-of-geometry/flows/prototype-patterns/` — catalog flow (NEW archetype)

**Path:** `/Users/verdey/Documents/Claude/Projects/Library/tome-of-geometry/flows/prototype-patterns/`  
**Archetype:** **Catalog flow** — independent entries with selection-based access, no sequential dependencies.  
**Source:** K-EA2 absorption wave; recipe note at `/Users/verdey/Documents/Claude/Projects/docs/sessions/_recipe-tome-geometry-absorption.md`

**Why it's highlighted.** This is the first absorption: a 753-line prose document (`tome/16-prototype-patterns.md`) converted into 25 self-contained flow entries. Demonstrates the catalog-flow archetype and the absorption modality before either has been formally added to doctrine. The recipe is now part of `/flow` lessons; if the candidacy passes review, both the archetype and the modality promote to doctrine.md.

**What to learn.**
- **Catalog vs pipeline.** Blueprints default to sequential-pipeline (stage 0100 → 0200 with graduation gates). Catalogs are independent; any entry is entry. The acid test applies within each entry, not across entries.
- **2-digit numbering for catalogs.** For small fixed-count collections (25 patterns), 2-digit (`01-`, `02-`) is more natural than 4-digit. Preserves source ordering; keeps `ls` output scannable. Formalize as a naming convention for catalog flows.
- **Faithful prose→flow conversion without sanitizing structure.** Each blueprint concept + techniques + cold-start spec became a step.md. The elegance thesis moved inline (not as a separate field), keeping step.md skimmable while preserving fidelity to source.
- **Self-contained catalog steps.** No cross-references between entries. Reader of step 10 (Voronoi) doesn't need to read step 9. This is a shape decision, not an accident.
- **init.md as selection-flow, not pipeline-flow.** The flow's job is to surface one entry, not to walk steps in order. init.md documents this explicitly and avoids the "main flow missing" audit false-positive.

**What *not* to copy.** Don't force the pipeline shape on inherently independent entries. Test first: are units sequential/dependent? If no, catalog shape. The blueprint's default is pipeline; catalog is a deliberate variant.

**Review gates (candidacy hold):**
- [ ] Does showcase rotation allow 6th entry? (Current roster at 5; see curation rules)
- [ ] Doctrine amendment for "absorption modality" complete?
- [ ] Archetype split (pipeline + catalog) added to doctrine.md?
- [ ] /flow audit runs cleanly post-amendment (no orphan-step false-positives)?

---

## Curation rules

- **Cap at 5 entries.** When a 6th flow earns showcase status, the weakest current entry rotates out (and gets a one-line note in `lessons.md` about why it was demoted). Current roster is at the cap; further additions trigger demotion.
- **Each entry must teach something distinct.** If two flows are exemplars of the same lesson, keep the one that demonstrates it most cleanly.
- **Candidacy entries.** New archetypes or pattern categories start as candidacy entries (marked as such) until doctrine amendments land. Promotion from candidacy to confirmed entry requires doctrine changes to be live.
- **Updates via `/flow curate`.** When Dan captures a lesson that proposes a showcase edit, the diff is surfaced for greenlight before mutation.
