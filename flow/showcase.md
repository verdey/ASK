# Flow — Showcase

> Top exemplar flows in the wild. Each entry: path, archetype, what to learn, what *not* to copy. Highlights are curated, not exhaustive.

---

## 1. `Income/_flow-blueprint/` — the canonical living blueprint

**Path:** `/Users/verdey/code/experimental/Income/_flow-blueprint/`
**Archetype:** Living blueprint (the meta-flow among flows).

**Why it's highlighted.** This is the structural reference every other flow clones from and re-syncs against. It is itself a flow — has its own `init.md`, `processes/`, `docs/`, and `CHANGELOG.md`. It demonstrates all four graduation tiers through example, one stage per tier, each carrying its own `_graduation.md` showing what the next-tier version looks like.

**What to learn.**
- The blueprint mechanic itself: a template that you *consult repeatedly* instead of copying once and discarding.
- How `_graduation.md` siblings work — the stage's future tense, written now, acted on later.
- The `«LOB_NAME»` / `«YYYY-MM-DD»` token pattern in `CLAUDE.md` for clean substitution at scaffold time.

**What *not* to copy.** The blueprint's stage names are illustrative, not prescriptive. Each active flow picks its own stage names that fit its actual cadence — copy the *shape*, not the *names*. Per `flow.md` §1.2: "Each Flow chooses its own ordered-prefix scheme. The acid test — not the scheme — is the doctrine."

---

## 2. `Income/wholesaling/` — multi-subflow LOB

**Path:** `/Users/verdey/code/experimental/Income/wholesaling/`
**Archetype:** LOB with multiple parallel subflows under one `processes/` root.

**Why it's highlighted.** Wholesaling is the existence proof that **subflows are first-class** — `processes/intake-funnel/0100-capture/...` and `processes/amber-top-of-mind/0100-collect-signals/...` run side-by-side under one LOB because they share no graduation dependencies. The acid test holds recursively: at the LOB root, at the subflow root, at every level.

**What to learn.**
- How to name parallel branches without forcing a number scheme that lies about ordering (`intake-funnel/`, `amber-top-of-mind/` — semantic names at the subflow level; numbered prefixes inside each).
- The 4-digit prefix scheme (`0100-`, `0200-`, `0300-`) that leaves room for spot-edit insertion without mass renumbering (per `flow.md` §1.2 rule 2).
- The legacy pattern in practice: each step has a `step.md` (the executable prompt/logic) — wholesaling has not yet migrated to the skinny pattern.

**What *not* to copy.** The legacy `step.md`-per-folder shape is the *honored starting point*, not the destination. Per `flow.md` §1.7, the canonical kingdom-wide pattern is the **skinny stage artifact** — one primary `.md` file per stage with YAML frontmatter and an inline `## Refine` section. New flows should be born skinny; existing flows migrate when next /knock-touched.

---

## 3. `Income/Income-Land-Deal-Search/` — sequential pipeline with explicit graduation gates

**Path:** `/Users/verdey/code/experimental/Income/Income-Land-Deal-Search/`
**Archetype:** Workflow LOB; strictly sequential pipeline.

**Why it's highlighted.** Land-Deal-Search is the cleanest example of *graduation gates as enforcement mechanism*. Each step (`0100-define-target-data` → `0200-define-all-sources` → `0300-validate-recipes` → `0400-perform-harvest` → `0500-notify-dan` → `0600-compile-dashboard`) has an explicit `_graduation.md` that names the pass/fail criteria for advancing. You cannot skip ahead — the graduation marker IS the gate.

**What to learn.**
- How to write a `_graduation.md` that is testable, not aspirational. ("This step is done when X observable thing exists at Y path with Z property.")
- How `<LOB>/sources/<source-slug>/` registries layer onto a flow without deforming it — sources live alongside `processes/`, not inside.
- The `docs/deals/` artifact directory pattern — the LOB's primary output (deals) lives in a stable, walk-testable location.

**What *not* to copy.** The strict-sequential shape is right for *this* LOB because each step's output is the next step's required input. It would be wrong for an LOB whose subflows are independent (cf. wholesaling). Pick sequential or parallel based on actual data dependencies, not aesthetics.

---

## 4. `Income/Income-Flow-Navigator/` — self-refreshing artifact LOB

**Path:** `/Users/verdey/code/experimental/Income/Income-Flow-Navigator/`
**Archetype:** Workflow LOB whose deliverable is a single self-refreshing HTML artifact.

**Why it's highlighted.** Flow-Navigator's `processes/` (00-init through 06-notify) generates **one stable artifact** at `Income/flow-navigator.html` that holographs the entire portfolio. The artifact embeds its own runbook in an HTML comment block — any Claude surface can open the file, read the comment, and re-run the pipeline. It is also strictly **read-only over the rest of the portfolio** — never writes to other LOBs. That constraint is what makes parallel scans safe.

**What to learn.**
- The **embedded-runbook pattern** — a generated artifact that carries its own refresh contract inside itself. No external script, no central renderer.
- The **read-only-beyond-the-page** discipline — when a flow's job is to *project* substrate (per `hud-artifacts.md`), it must never *mutate* substrate. The constraint is the feature.
- How to design a flow whose output is *one file*, not a directory tree. Stable URL → stable AirDrop → stable text-message-survivable.

**What *not* to copy.** The single-artifact shape works because the deliverable is genuinely *one thing* (a portfolio holograph). Don't force it on flows whose deliverables are inherently multi-file (deal lists, lead pipelines, HUD card sets).

---

## Curation rules

- **Cap at 5 entries.** When a 6th flow earns showcase status, the weakest current entry rotates out (and gets a one-line note in `lessons.md` about why it was demoted).
- **Each entry must teach something distinct.** If two flows are exemplars of the same lesson, keep the one that demonstrates it most cleanly.
- **Updates via `/flow curate`.** When Dan captures a lesson that proposes a showcase edit, the diff is surfaced for greenlight before mutation.
