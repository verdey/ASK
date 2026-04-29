# Flow — Lessons

> Curated insights about flows, captured over time via `/flow curate <observation>`. Append-only; older entries at the bottom.

---

## 2026-04-28 — Flow surface files always carry both Herd `*.test` URL and absolute filesystem path (session-id: 2026-04-28-flow-runner-llm-recon)

When any council vessel (Oracle, Catalyst, Teacher) re-delivers a flow surface file (`index.html`, dashboard, HUD card, regenerated artifact) for Dan to look at, the message must surface **two paths**:

1. **Herd `*.test` URL** — clickable. Kingdom portal `alpha.test` → `~/Documents/Claude/Projects/`, so any kingdom file is reachable as `http://alpha.test/<path-from-kingdom>/`. Per-realm valets may exist (`flows.test`, `backlogs.test`, `runner.test`, etc.) — check `~/Library/Application Support/Herd/config/valet/Sites/` first.
2. **Absolute filesystem path** — `/Users/verdey/Documents/Claude/Projects/...`. Never relative. The kingdom is large; relative paths force navigation, absolute paths are copy-paste targets.

**For non-surface files** (markdown briefs, source code, configs): absolute path only — markdown doesn't render usefully in browser; surface URL is reserved for HTML/CSS/JS artifacts that have visual presence.

**Why:** Dan stated 2026-04-28 in the carmen arc, after a re-delivery friction moment: *"i dont know where those files are bruh, you|skills|memories need to know that you should talk to me on any flow related surface files (index.html's) that you should talk to me with them as herd links on the whatever.test domain and you need to give me the copy-paste-friendly absolute filepath (not relative filepaths) — this is a big codebase."*

**How to apply:**

- **Brief authors (Oracle)**: every "Required reading" / "Deliverable" / "Visual QA" section that names a flow surface includes both surfaces. Brief drafts without both are stale before they ship.
- **Wave executors (Catalyst)**: every AAR's "What landed" line for a regenerated `index.html` carries both. Verify the Herd valet exists before asserting the URL; if no valet, recommend creating one in the same response.
- **Audit / Streamline modes**: when a flow's surface lacks a Herd valet symlink, that's a Tier-1 graduation gap — propose `~/Library/Application Support/Herd/config/valet/Sites/<slug>` linking into the realm.
- **Composes with**: the omega-canon five-section contract (`flow.md` §1.1.1) — every flow's `index.html` is meant to be Herd-linked anyway. This rule canonizes the *delivery surface format* that complements the doctrine.

**Status:** captured-2026-04-28 — memory layer encoded at `~/.claude/projects/-Users-verdey-Documents-Claude-Projects/memory/feedback_flow_surface_links.md`; council layer (this lesson + Oracle SKILL.md "Rules" line) updated same session.

---

## 2026-04-27 — `/flow audit` should detect documented variants before flagging "orphan" steps (session-id: 2026-04-27-flows-audit)

When auditing a flow, "step exists but doesn't fit my mental model of the archetype" is **not** the same as orphan. Before flagging a step as orphan or recommending deletion, audit must:

1. Read the step's `step.md` for its declared purpose.
2. Check `docs/decisions/` for an ADR that introduced or justifies the step.
3. Cross-reference parent flow's archetype declaration in its own `init.md` / `CLAUDE.md` — flows can declare themselves as archetype-with-variant.

**Source flow:** `Income/Flows/_flow-navigator/` — audit flagged steps `05-harvest-inbox` and `06-notify` as orphan tail imported from workflow archetype. They are intentional: 05 is the Phase 3 co-creation write-back surface (see `docs/decisions/0002-co-creation-write-back.md`); 06 honors the Workflow LOB convention's notify slot and reserves design space for future push channels. Both are documented in step.md.

**Why:** Audit recommendations are load-bearing — Dan greenlights "auto-accept genius defaults" expecting the audit to be right. A wrong recommendation that gets executed destroys real work (the Phase 3 harvest run had 7 stanzas, 5 applied).

**How to apply:** When `/flow audit` is about to recommend subtract/merge for a step, the recommendation must include the evidence it's actually orphan: (a) step.md absent or contradicts the goal, (b) no ADR justifies it, (c) artifact dirs are empty or single-line stubs. If any of those checks fail, downgrade from "subtract" to "verify intent in step.md" and let Dan call it.

**Status:** promoted-2026-04-27 → `doctrine.md` "Audit corollary — documented intent over shape inference" (added under the two axioms section).

---

## 2026-04-27 — Flows can validly choose "main-pipeline-as-flowchart + processes/-as-SubFlow-sidecar" (session-id: 2026-04-27-flows-audit)

A workflow LOB does **not** have to materialize its main pipeline as numbered step folders. A blessed variant: declare the canonical operational flow as a Mermaid flowchart in `init.md` + SOPs that codify each stage, while reserving `processes/` for **out-of-band SubFlows** that read from / write to the LOB but don't gate it.

**Source flow:** `Income/Flows/LOBs/wholesaling/` — main pipeline (lead-capture → qualify → walk → offer → close) lives in init.md flowchart + SOPs (`docs/sop/qualified-lead.md`). `processes/` holds `intake-funnel/` and `amber-top-of-mind/` SubFlows that emit fragments for roster digest pages (per documented convention `processes/<roster-user>-<purpose>/`).

**Why:** The acid-test rule ("`ls processes/` IS the order of the Flow") presumes one shape. But for LOBs where the main pipeline is **operational doctrine** (humans-and-SOPs) rather than **automated chain** (Claude-walks-the-tree), folder-shaping the main pipeline adds ceremony without leverage. The SubFlow pattern (`processes/<roster-user>-<purpose>/`) is the Flow-mechanism that *does* benefit from folder-shape.

**How to apply:** Audit should recognize this variant when it sees: (a) init.md flowchart for the canonical flow, (b) `processes/` containing only SubFlow-shaped directories (not 0NNN-numbered), (c) `docs/sop/` codifying each main-pipeline stage. When detected, classify as "Workflow LOB / SubFlow-sidecar variant," not as "main pipeline missing."

**Status:** promoted-2026-04-27 → `doctrine.md` "Workflow flow" archetype now carries two variants: (a) main-pipeline-as-flowchart + SubFlow-sidecar (this lesson), and (b) workflow with co-creation write-back tail (drawn from the navigator audit course-correction in the lesson above). Audit modality update to detect these variants is a separate SKILL.md edit, captured here for follow-up.

---

## 2026-04-28 — omega-fragment.json is the Tier 1 graduation signal for a flow (Arc-3 closeout)

**Rule:** A Tier 2+ flow should emit `omega-fragment.json` alongside its `index.html`. The fragment is the machine-readable summary of what the omega says: a headline, a chart type + data, 0–3 decision hooks, and a theme. Its presence is the signal that a flow is mature enough for the portal to render its state at a glance without re-parsing the full omega HTML.

**Why:** Arc-3 Wave 4 (`aurora.scorpius`) shipped the `insight-harvester` contract. First run found 20 flows; 3 had opted in. The 17 default text-cards are legible but inert — they carry no chart, no decision hook, no theme. The fragment is what makes the Insight Fragments band actionable rather than merely navigational.

**How to apply:** When auditing a Tier 2+ flow, check for `omega-fragment.json`. If absent, add a "promote to opt-in" move to the audit output — it's a one-file authoring task, not a refactor. The `Tooling/insight-harvester/docs/contract.md` is the authoritative schema.

**Status:** captured-2026-04-28 · aurora.vega Arc-3 closeout

---

## 2026-04-28 — `flow-runner-llm` is yin-yang to `/flow` (curate vs execute) (session-id: 2026-04-28-flow-runner-llm-recon)

The `flow-runner-llm` Python CLI at `~/Documents/Claude/Projects/Tooling/flow-runner-llm/bin/run-flow` walks any `_flow-blueprint`-shaped flow step-by-step via the Claude API. It is the **machine interface** to the flow system — `/flow` reads, audits, and curates flows; `run-flow` executes them. Both share the same DNA (the `_core/system-prompt.md` carries `/flow` skill semantics).

**Why this matters for `/flow`:**
- `/flow audit <path>` and `run-flow <path>` operate on the same substrate. When auditing reveals a malformed flow, the runner's `validate_flow_format()` (lines 154–197) will halt noisily on the same conditions — they're aligned.
- The runner emits `_audit/runs.jsonl` per the doctrine self-logging contract (`doctrine.md` lines 54–76). `/flow audit`'s "step self-logging present?" check is satisfied automatically when a flow has been executed by the runner.

**How to apply:** When `/flow` recommends "walk this flow" as a verification step, the canonical command is `~/Documents/Claude/Projects/Tooling/flow-runner-llm/bin/run-flow <path> --dry-run` (smoke) then without `--dry-run` (real). The new entry in `tools-register.md` under "Flow execution" canonizes this.

**Source:** Reconnaissance dispatched 2026-04-28 to inventory the runner before scaffolding `Tooling/flow-runner-llm/_meta-flow/` (the runner's own state→quality→improvement loop).

**Status:** captured

---

## 2026-04-28 — `_core/` lockout is doctrinal, not incidental (session-id: 2026-04-28-flow-runner-llm-recon)

The runner has a hard rule that nothing in its self-improvement scan ever modifies `_core/system-prompt.md` or `_core/model-aliases.yaml`. Suggestions targeting `_core/` are written to `_suggestions/YYYY-MM-DD-<slug>.md` instead, where Dan reviews and either greenlights (manually edits `_core/`) or declines.

This is the same shape as `/flow` skill's mutation-only-via-skill rule for `doctrine.md`/`showcase.md`/`tools-register.md`. The pattern: **separate the LLM-suggesting surface from the human-greenlit application**, so the system can self-improve without self-corrupting.

**How to apply:** When designing meta-flows that operate on substrate that includes any "locked" knowledge file (system prompts, doctrine docs, canonical schemas), the loop's apply-stage must enforce the lockout — write to a suggestions sink instead of editing directly. The new `_meta-flow/processes/0500-apply-or-route/step.md` codifies this for the runner-quality-loop.

**Status:** captured

---

## 2026-04-28 — Brief line numbers go stale within hours; grep, don't cite (session-id: 2026-04-28-flow-runner-llm-recon)

When `/oracle` writes a session brief that cites `bin/run-flow:154-197` or any other line range, those line numbers are accurate at brief-write time but degrade as soon as anyone touches the file. Wave 0 (`carmen.alpine-butterfly`) found brief line numbers ~60 off from reality after a few hours of co-evolution.

**How to apply:**
1. **`/oracle` brief authors** — describe what to grep for, not where it is. *"grep for `def validate_flow_format(`"* survives any refactor; *"line 154"* doesn't.
2. **`/knock` agents executing briefs** — when a brief cites line numbers, treat them as approximate. Always grep for the function/symbol name first to find the actual site, THEN edit. Wave 0 named this as a `manual_fixup` signal in its JSONL.
3. **`/flow audit` and `/flow streamline`** — when a session note or `step.md` cites line numbers in its body, that's a streamlining target. Replace with grep targets.

**Source flow:** Wave 0 `_meta-flow/` first walk; brief at [`_wave-0-first-walk.md`](/Users/verdey/Documents/Claude/Projects/Tooling/flow-runner-llm/_meta-flow/docs/sessions/_wave-0-first-walk.md) cited line numbers from a brief written hours earlier; alpine-butterfly found ~60-line drift across multiple sites.

**Status:** captured

---

## 2026-04-28 — `init.md` as stable cache anchor across multi-step flows (session-id: 2026-04-28-flow-runner-llm-recon)

The runner builds every step's LLM call with `init.md` as a stable prefix and the current step's content as the variable suffix. This is *the* reason `/flow` doctrine insists on every flow having a loud `init.md` — it's not just walk-test legibility, it's also the cache anchor that makes multi-step LLM walks economical.

The exact cache mechanism is provider-specific:
- Anthropic SDK supports explicit `cache_control: ephemeral` markers
- OpenAI / OpenRouter rely on implicit content-prefix caching where supported
- Other providers may have no caching at all

The runner currently uses `openai` SDK → OpenRouter (not the Anthropic SDK; corrected from prior version of this lesson). It does NOT use `cache_control` markers because that's an Anthropic-specific primitive. It still benefits from prefix caching where the provider supports it, because `init.md` is structurally stable across steps in a single run.

**How to apply:** `/flow streamline` should preserve `init.md` as a stable prefix across all step prompts. Drift in `init.md` per-run is a streamlining target — extract volatile parts into per-step `step.md`, restore `init.md` to stable doctrine. The provider-specific cache mechanism is downstream; the upstream invariant is "init.md doesn't change between steps in a run."

**Status:** corrected-2026-04-28 — Wave 1b carmen.double-fisherman replaced erroneous "Anthropic SDK + cache_control: ephemeral" claim with provider-agnostic stable-context reasoning. Source: Wave 0 alpine-butterfly stage 0100 SDK-drift finding.

---

## 2026-04-28 — The runner's post-run scan is structural, not semantic — known seam for the meta-flow (session-id: 2026-04-28-flow-runner-llm-recon)

`scan_for_improvements()` (`bin/run-flow` lines 306–344) does basic string searches for: missing "Produces" sections, missing `_graduation.md`, missing `_audit/`. Capped at 2 suggestions per run unless ≥4 issues found. It cannot judge whether a stage's prompt actually delivered on its declared purpose, whether the LLM's response addressed inputs/outputs/loopback correctly, or whether the model performance per flow drifts over time.

This is the seam the new `_meta-flow/` attaches to: stage 0200 (judge-quality) explicitly scores axes the runner's own scan can't reach (validation rigor for *content*, telemetry depth, error recovery, semantic-not-just-structural self-improvement utility, hygiene).

**How to apply:** When `/flow streamline` reviews a flow's verification stage and sees only structural checks, surface this as a Tier-1 graduation opportunity. The pattern is: structural scan stays in the runner (cheap, runs every time); semantic scan lives in a meta-flow (expensive, runs periodically). Don't mash them together.

**Status:** captured

---

## 2026-04-28 — Absorption recipe: prose-doc→flow conversion as doctrine-first modality (session-id: K-EA2-wave-2-aquila / K-EA3-wave-3-aries)

**Absorption is the motion of converting an oversized static prose document into a catalog flow.** Source: aquila's absorption of `tome-of-geometry/16-prototype-patterns.md` (753 lines) → `flows/prototype-patterns/` (25 independent catalog entries). The recipe is now doctrine: a new recognized modality alongside audit/streamline/scaffold/realize.

**What works in the recipe:**
- The step.md shape landed naturally — source-document structure (concept, techniques, cold-start spec, inspired-by) mapped cleanly to step.md sections without heavy rewriting
- 2-digit zero-padded numbering (`01-`, `02-`, …, `25-`) preserves source ordering while keeping `ls` output scannable for small catalogs
- Self-contained steps without cross-references — each catalog entry is standalone; you read step 10 (Voronoi) without needing step 9
- Prose→prompt conversion kept the elegance thesis inline (not as a separate field), maintaining skimmability while staying faithful

**What was awkward (frictions to document as shape-decisions):**
- The blueprint's sequential pipeline model (stage 0100 → 0200 → graduation gates) assumes linear dependencies. Catalogs have none — any entry is entry. Deviation: no `_graduation.md` files; `init.md` documents the selection-flow variant explicitly
- Numbering convention: 4-digit prefixes (`0100-`, `0200-`) are overkill for fixed-count catalogs; 2-digit is more natural. Named for doctrine to evaluate formalizing
- Elegance thesis absorbed into concept paragraph, not as its own field; trade-off is that future grep-based filtering can't target it directly (minor, not blocker)

**Doctrine implication:** two recognized flow shapes now exist — pipeline (sequential stages with graduation gates) and catalog (N independent entries, selection-based entry, no gates). The blueprint template needs a catalog init.md variant and explicit numbering guidance. New modality: absorption is the act of converting a static prose document (oversized, >500 lines, with internal structure) into one of these flows.

**Absorption trigger conditions:** Source document exhibits (a) consistent repeated structure across sections, (b) content map-ability to flow sections, (c) independent unit-of-work that doesn't require reading the whole document first.

**Absorption as a recognized `/flow` modality (doctrine amendment to follow):** The absorption motion is:
1. Identify the repeated unit in source prose (e.g., H3 per blueprint in tome-of-geometry)
2. Decide: pipeline or catalog? (ask: are units sequential/dependent?)
3. Map source fields → step.md sections faithfully (don't sand off structure for aesthetics)
4. Re-voice cold-start specs into imperative "Build This" (don't just paste)
5. Write init.md with selection-flow or pipeline-flow variant as appropriate
6. Leave a pointer stub at source location; archive the original
7. Write the recipe — learnings → future waves

**How to apply:** When `/flow realize` sees a Shape 2 (Oversized Prose) document that's dense but internally consistent (readable prerequisites, no ordering required), test for absorb-ability before recommending decomposition into `docs/`. If structural mapping works, absorb into a catalog flow. Absorb surfaces documentation as executable processes, not decision artifacts.

**Status:** captured-2026-04-28 → promoting to doctrine.md as new modality + showcase candidacy entry + tools-register note on absorption detection

---

## 2026-04-28 — Filesystem-Truth violation: `_core/model-aliases.yaml` exists but isn't read (session-id: 2026-04-28-flow-runner-llm-recon)

The runner has `_core/model-aliases.yaml` on disk, but `bin/run-flow` lines 28–40 hardcode the same aliases as a Python dict — the YAML file is never opened. This is a textbook Filesystem-Truth axiom violation per `Income/docs/flow.md` §1.2: a file present in the tree that doesn't agree with the code that would consume it.

The fix is small (load the YAML on startup, fall back to dict only if file is missing), but it must land via `_suggestions/` because the YAML lives under `_core/` (locked). The new meta-flow's stage 0500 routing matrix handles this exact case.

**Why this matters as a `/flow` lesson:** when scaffolding new flows from `_flow-blueprint`, leave NO config-file stubs that aren't actually read. Every scaffolded YAML/JSON config either ships with a real loader, or it doesn't ship at all. This is a `proposes-tools-register-edit` candidate — the tools register should add a "configs are read on first invocation, not just present" check pattern.

**Status:** proposes-tools-register-edit *(deferred — promote after the next `_meta-flow/` iteration confirms the fix shape)*

---

## 2026-04-27 — `/flow audit` workflow that hit (the processification template) (session-id: 2026-04-27-flows-audit)

The audit invocation that produced this batch worked unusually well. The shape:

1. **Plan-mode-first.** Single Explore agent with a structured per-flow brief (goal / steps / coherence / tier / lag → score + biggest-gap-to-close). Output written as a plan file in `~/.claude/plans/`.
2. **Risk-class flagging.** Recommendations bucketed by risk: additive (autonomous-execute) / destructive (confirm) / structural (confirm) / doctrine-divergent (confirm).
3. **Bundled confirmation.** All confirmation-required calls surfaced in **one** message with named options (A1/A2/A3, B1/B2/B3, C1/C2). No death-by-a-thousand-questions.
4. **Course-correction headroom.** When Dan auto-accepted genius defaults, the assistant re-checked each recommendation against substrate (step.md, ADRs, init.md) and downgraded wrong calls before executing.

**Source flow:** the audit thread itself (2026-04-27, six flows in `Income/Flows/`). Two of the audit's own recommendations (delete navigator 05/06; restructure wholesaling) were re-evaluated and reversed at execution time after reading the actual substrate.

**Why:** Dan named this thread out as a positive `/flow` example worth processifying. Capturing the shape so future `/flow audit` invocations can follow the same arc by default rather than rediscover it.

**How to apply:** Make this the canonical flow for `/flow audit [path]`:
- Phase 1: Explore agent with structured brief.
- Phase 2: Plan file with per-flow tables + ranked moves with risk-class flags.
- Phase 3: Auto-execute additive moves while bundling destructive/structural/divergent into one confirmation set.
- Phase 4: On greenlight, re-verify each non-additive recommendation against substrate before executing — downgrade wrong calls visibly with reasoning.
- Phase 5: Curate the audit's own course-corrections as lessons (this entry is an example).

**Status:** captured-2026-04-27 — agreed-with but **not promoted to doctrine**. This is a process-arc lesson about HOW `/flow audit` should run, which lives in `SKILL.md` (the audit modality contract), not `doctrine.md` (what a flow IS). Promote modality cannot edit `SKILL.md`; this needs a separate edit cycle. Held here as the canonical source for that future SKILL.md update.

---

## 2026-04-28 — Python build script is the canonical Pico-inlining method for Claude Code Hands sessions (session-id: 2026-04-28-catalina-arc)

**Source:** `catalina.beryl` (Wave 2 dogfood regen, 2026-04-28) → `_flow-blueprint/processes/0600-render-index-html/_eval.md`.

**Verbatim observation:** "Python build script approach (read Pico + init.md + template → substitute → write) avoids 71KB CSS in a single tool-call; worth retaining as the canonical regen method for Claude Code Hands sessions."

When Phase C of the 0600-render step runs in a Claude Code Hands session (VS Code multi-file build context), reading the full Pico CSS inline and emitting it as a single LLM-authored tool-call competes with context limits and slows execution. The Python build script — a small `build.py` (or equivalent inline invocation) — reads `pico.classless.min.css` + `init.md` + `template.html` from disk, injects the LLM-authored `FLOW_REPORT_SECTIONS` and `EMBEDDED_MD`, substitutes all six `{{PLACEHOLDERS}}`, and writes `index.html` in one Python call. This avoids the 71KB CSS appearing in the LLM's output stream and produces the same result.

**How to apply:** When executing 0600-render from a Claude Code Hands session, prefer the Python build script over pure LLM substitution. The LLM authors the variable sections (Phase B output + EMBEDDED_MD); Python handles the file I/O and string substitution. See `_flow-blueprint/processes/0600-render-index-html/instructions.md` Phase C for the recommended script note.

**Status:** proposes-instructions-edit → promoted-2026-04-28 to `instructions.md` Phase C.

---

## 2026-04-28 — Pico CSS copyright comment + SVG data-URI are known false positives in grep verification (session-id: 2026-04-28-catalina-arc)

**Source:** `catalina.beryl` (Wave 2 dogfood regen, 2026-04-28) → `_flow-blueprint/processes/0600-render-index-html/_eval.md`.

**Verbatim observation:** "Grep returned 2 hits: Pico CSS copyright comment (`https://picocss.com`) and SVG data-URI inside Pico — both inert CSS-chrome, not real external fetches. Network-fetch grep passes; note in instructions that Pico's CSS comment will always produce these false positives but is safe to ignore."

When Phase C3 runs the network-fetch grep against an `index.html` that inlines Pico v2.1.1 classless CSS, the grep will always return at least two hits:
1. The Pico copyright comment: `/* picocss.com */` — contains `picocss.com` (matches `https?://` if it appears in a comment containing the URL)
2. An SVG data-URI embedded in Pico's CSS — may contain `http` as part of the URI string

Both are inert — CSS string literals and comments, not real network fetches or external `<link>` tags. The verification passes when all remaining hits are also inert CSS-chrome. Real failures are `<link href="https://...">`, `<script src="https://...">`, or `@import url(...)` outside of CSS string literals.

**How to apply:** In C3 verification, after running the grep, confirm whether all hits are within the inline CSS block (between Pico's `<style>` delimiters). If yes, the check passes. Document as "Pico false positives: expected, safe to ignore" in `_eval.md`. Flag only genuine external resource references — `<link>`, `<script src>`, or stylesheet `@import` hits — as failures.

**Status:** proposes-instructions-edit → promoted-2026-04-28 to `instructions.md` Phase C3 verification checklist.

---

## 2026-04-28 — `Finance/Income/flow-navigator.html` is the canonical richness donor for omega render waves (session-id: 2026-04-28-catalina-arc)

**Source:** `catalina.amethyst` (Wave 1 audit, 2026-04-28) → `Finance/Income/docs/intake/2026-04-28-flow-audit.md`.

**Verbatim observation:** "`Finance/Income/flow-navigator.html` far exceeds spec: Next 3 Moves hero, Brief from Claude voice block, 7-day cadence heartbeat, Bark conditions panel (2 active), Holographic LOB grid (N/S/E/W/Z spatial navigation), Decisions Queue."

`flow-navigator.html` is not just a functional artifact — it is the richest realized example of what the 0600-render omega step can produce when all five living-report sections are developed beyond the minimum spec. Future scaffold/regen waves should treat it as a **donor pattern**: open it alongside the 0600 instructions and ask "which of these enrichments would serve this flow's audience?"

**Key features available to borrow:**
- **Next 3 Moves hero** — above-the-fold priority surface with explicit next actions
- **Brief from Claude voice block** — inline editorial section authored at render time
- **7-day cadence heartbeat** — activity timeline rendered from `_audit/runs.jsonl`
- **Bark conditions panel** — active conditions from `init.md` rendered as a visual checklist
- **Holographic LOB grid** — N/S/E/W/Z spatial navigation across portfolio axes
- **Decisions Queue** — surfacing `docs/decisions/` backlog items inline

Not every enrichment fits every flow. Read the flow's audience and purpose before borrowing.

**Status:** proposes-showcase-edit → promoted-2026-04-28 to `showcase.md` entry 5 (`Income-Flow-Navigator/`) as richness donor note.

---

## 2026-04-28 — `realize` must respect existing realm taxonomy before recommending `docs/` tree (session-id: 2026-04-28-patillo-realize)

When `/flow realize` runs on a realm that already has rich internal taxonomy (numeric-prefix folders like `00_EXEC_README.md`, `01_intake/`, `02_rubric/`, `03_scenarios/`; structured ledgers like `02_rubric/ASSUMPTIONS.md` carrying ranked-alternatives A-NNN entries; canonical conventions doc), the default `Shape 1 → Tier 1` recommendation in `shapes.md` (decompose into `docs/decisions/A-NNN.md` + `docs/scenarios/`) is **wrong** for this realm. Imposing a parallel `docs/` tree would duplicate existing scaffolding and violate Filesystem-Truth.

**Source flow / realm:** `Finance/patillo redeaux/`. Approved plan recommended creating `docs/decisions/0001-county-jurisdiction.md`, `0002-mixed-entity-title.md`, and `docs/scenarios/00NN-<name>.md` × 12. Substrate already had `02_rubric/ASSUMPTIONS.md` (9 A-NNN entries with full ranked-alternatives), `03_scenarios/S01–S12/` (with sealed-brief pattern), and `_CONVENTIONS.md` (yellow tape + ID schema). The actual realization needed was: (a) extract durable contract from monolithic 278-line `HANDOFF.md` into a new `CLAUDE.md`, (b) slim `HANDOFF.md` to ephemeral status pointing at the existing structured docs as source-of-truth. No `docs/` tree created.

**Why:** The Acid Test cuts both ways. "Whatever `ls` shows in ascending order IS the order of the Flow" means the existing OS-ascending-sort taxonomy IS the truth — overlaying a parallel naming scheme creates two competing truths. The realization opportunity for these realms is **not** "decompose into the canonical `docs/` shape" but "extract durable contract layer (`CLAUDE.md`) and slim the ephemeral pointer (`HANDOFF.md`) so the *existing* structured layer is the authoritative one." The structured layer was already there — it just wasn't being routed to.

**How to apply:** Before `/flow realize` recommends Tier 1 decomposition for Shape 1 (Mission HOP), it must first scan for existing internal taxonomy:

1. Numeric-prefix top-level folders (`00_`, `01_`, `02_`...) → realm has its own ordered taxonomy; do NOT impose `docs/`.
2. ID-tagged structured ledgers (`A-NNN`, `B-NNN`, etc.) inside named subfolders → existing decisions/assumptions surface; do NOT create `docs/decisions/`.
3. Canonical convention doc (`_CONVENTIONS.md` with structured rules) → conventions already factored; do NOT duplicate.
4. Scenario / case folders with sealed-brief pattern → existing case scaffolding; do NOT create `docs/scenarios/`.

When any of these are detected, the realization target shifts from "build `docs/` scaffold" to "build a thin durable contract (`CLAUDE.md`) that *routes to* the existing structured layer + slim the monolithic ephemeral doc to a pointer." Filesystem-truth wins over template-shape conformance.

**Status:** proposes-doctrine-edit — `shapes.md` Shape 1 realization-target table should add a precondition: "If realm has existing internal taxonomy (numeric-prefix folders + ID-tagged ledgers + structured conventions), substitute `docs/`-tree decomposition with `CLAUDE.md`-routes-to-existing-layer pattern." Hold for `/flow promote` after one more confirming case.

---

## 2026-04-28 — A-NNN assumption ledger: conservative defaults as a loud flow surface

The A-NNN ledger pattern (born in `Finance/patillo redeaux/02_rubric/ASSUMPTIONS.md`) is now a first-class flow artifact. Every flow that makes assumptions under uncertainty should maintain `_assumptions.md` at the flow root with A-NNN entries: gap, chosen assumption, 2-5 ranked alternatives, resolution trigger, and STATUS (ACTIVE/RESOLVED).

ACTIVE entries surface loudly on `index.html` as the first section — yellow warning card, before the process map. This is intentional: conservative defaults should be impossible to miss.

**Source flow:** Finance/patillo redeaux
**Pattern:** `_assumptions.md` at flow root → Phase C in 0600-render-index-html → Section 5 (loud, first) on index.html
**Status:** proposes-doctrine-edit
**Session:** 2026-04-28-flow-infrastructure-conservative-defaults

---

## 2026-04-28 — Kingdom-level trigger surface (alpha.test) as a flow's runtime door

The kingdom portal at `https://alpha.test/` gained a live flow surface: search-as-you-type, saved-search chips, ▶ Run buttons that POST to `api.php?action=trigger&path=<flow>` and spawn `flow-runner-llm/bin/run-flow` detached. Discovery is a live `find` (no registry, no cache) — a directory IS a flow if it has `processes/`. An `index.html` (omega) is preferred but not required — no-omega flows surface a yellow chip (interlinkage doctrine signal).

Companion surfaces interlink mutually: `flow-queue.test` (batch queue manager, ⚠️ Stalled / 🚀 Running / ❌ Failed / ✅ Completed buckets, auto-refresh while runs active) and `flow-atlas.test` (heavy audit, footer cross-links to portal + queue). The trigger surface honors trust: localhost-only `REMOTE_ADDR` check, path-must-exist-in-fresh-discovery allowlist (no path arguments accepted that weren't just discovered).

The `no omega` chip is wired to `?action=generate-omega` which spawns `Tooling/flow-omega-author` — a meta-flow whose 6-step pipeline (resolve-target → walk-target → load-blueprint-recipe → author-omega → verify-artifact → render-index-html) reads any target flow's substrate and authors its omega artifact via the runner. The chip is a one-click invocation of the doctrinal recipe.

A ✏️ inline button next to ▶ Run accepts an `--extraprompts` string via browser `prompt()` and threads it through to the runner — same path, same allowlist, same toast/queue plumbing, just with per-run prompt-injection context.

**Source flows:** kingdom root (`api.php`, `index.html`); `Tooling/flow-queue/`; `Tooling/flow-omega-author/`
**Pattern:** PHP grep-server (one file, action-routed) + log-filename-as-queue-record (no separate queue.jsonl) + discovery-as-allowlist (no allowlist file) + Pico.classless throughout
**Status:** shipped
**Session:** 2026-04-28-aurora-trigger-surface (oracle: aurora · constellations)

---

## 2026-04-28 — Dry-run validates *shape*, not *runtime*

When a flow has a runtime declaration in its `instructions.md` (e.g. `**Runtime:** SCRIPT` per S1-heal Lesson L2), `flow-runner-llm --dry-run` reporting `✓ Flow format valid` does **not** imply the runner can actually execute the flow. Dry-run only validates step folder shape, README markers, and step numbering. It does not check that the runner has an executor for declared runtimes.

**Concrete failure mode:** `flow-omega-author` shipped W1 with three steps tagged `Runtime: SCRIPT` (compose-mechanical, assemble-omega) and `Runtime: composite` (render-index-html). Dry-run passed. First real click on a `no omega` chip (Income-LPP-boat-covers, run `20260428-213034`) walked all 8 steps, exited 0, reported `✅ RUN COMPLETE` — but **no omega was written** because the runner has no SCRIPT-runtime executor: it hands every step's `instructions.md` to Claude as a prompt, and at SCRIPT-tagged steps the LLM merely *narrates* the script invocation ("Ready to run the compose command?") without actually shelling out. Run cost: ~$0.05; observable artifact: zero.

**The trap:** any flow that declares non-LLM runtime is structurally satisfied while functionally broken until the runner gains a runtime-aware executor. The brief's pre-filled AAR and post-W1 dry-run both reported success while the meta-flow could not actually produce omegas via the portal.

**How to apply:**
- `/flow audit` should treat `**Runtime:** SCRIPT` (or `composite`) as a precondition that the runner-llm must back. Until backed, surface a yellow `runtime-not-implemented` warning even when dry-run passes.
- Add a manual `--execute-script` smoke test path to flow-runner-llm OR (preferred) extend the runner to detect `Runtime: SCRIPT` and shell out to the `## Invocation` block in the step's `instructions.md`.
- Until the runner gains the executor, treat SCRIPT-tagged flows as **portal-non-functional** even if dry-run is green. Manual chain works (verified 2026-04-28T16:41 — `bin/build-omega.py compose && assemble` produced a valid 82KB omega for Income-LPP-boat-covers when run by hand).

**Source flow:** `Tooling/flow-omega-author/` post-W1 (S1-heal arc)
**Sister lessons:** L1 (LLM step output ceiling ~10KB), L2 (runtime declaration mandatory) — this lesson is the L2 corollary on the executor side.
**Status:** operational; `/flow audit` checks runtime-vs-impl drift via the new audit corollary in `doctrine.md` (carmen.sheet-bend, 2026-04-28); runner dispatches SCRIPT and composite steps via runtime-aware dispatcher (carmen.overhand, commit `80f1862`); validated end-to-end by carmen.square (commit `88bb3b8`) — LandWatch MHTML produced, SCRIPT-runtime step shelled out successfully.
**Session:** 2026-04-28-aurora-arriba-boat-covers-manual-chain

---

## 2026-04-28 — Sub-Flow doctrine drift caught: `README.md` at SubFlow root + missing `_audit/` (session-id: 2026-04-28-amber-3-deal-intake)

Audit of `Finance/Income/Flows/LOBs/wholesaling/processes/intake-funnel/` surfaced a class of drift that the blueprint's clone checklist didn't prevent: the SubFlow used `README.md` as its loud entry point instead of `init.md`, had no `_audit/runs.jsonl`, and no `## Blueprint reference` footer. `flow.md` §1.7 already declares Sub-Flows nest naturally with the same scaffold — the gap was that the blueprint README's clone checklist didn't make this explicit, AND `cp -R _flow-blueprint/ <new>/` carries the blueprint's own audit log into clones unless explicitly truncated.

**Fix applied:**

1. `_flow-blueprint/README.md` — clone checklist now applies to "every Flow at every depth" (top-level OR Sub-Flow), `_audit/runs.jsonl` truncation made step #1 of post-clone, `init.md`-not-`README.md` rule made explicit, Sub-Flow render-step exception documented (Sub-Flows may use `0NN-summary` instead of `0NN-render-index-html` when the parent LOB already renders the LOB-level `index.html` consuming SubFlow outputs).
2. `_flow-blueprint/CHANGELOG.md` — entry logged.
3. Wholesaling intake-funnel migrated: `README.md` → `init.md` (content conformed to template + Blueprint reference footer added); `_audit/runs.jsonl` seeded by the run that named the gap.

**Why:** doctrine drift in shared-substrate flows compounds — every new SubFlow cloning the wholesaling pattern would inherit the drift. Catching it at the blueprint level and propagating once is cheaper than catching it per-clone forever.

**How to apply:** when running `/flow audit` on any Flow under `<lob>/processes/<sub>/`, treat `README.md`-at-root and missing `_audit/` as the same priority as their top-level-LOB counterparts. The Sub-Flow exception is *only* about the render-vs-summary highest-numbered step; everything else is identical.

**Source flow:** `Finance/Income/Flows/LOBs/wholesaling/processes/intake-funnel/` (drift discovered); `_flow-blueprint/` (doctrine fix landed).
**Sister lessons:** None directly — this is the first SubFlow-class doctrine clarification.
**Status:** proposes-doctrine-edit (already applied to blueprint README + CHANGELOG; SKILL.md Audit-modality checklist could be promoted to mention the SubFlow exception explicitly — defer to next /flow promote pass).
**Session:** 2026-04-28-amber-3-deal-intake

---

## 2026-04-28 — Parent/child flows formalized as declarative composition (session-id: 2026-04-28-parent-child-flows)

The "subflows nest" pattern lived in prose for months (`flow.md` §1.7, README's Sub-Flow exception, doctrine.md line 28 stub mention) without a declarative metadata layer. Surfaced when planning the wholesaling short-sale-deal blueprint: three deals (Acacia, Rowlett, Biscayne) shared a clear short-sale shape but `_deal-stage-template/` was a one-time copy, no inheritance link, so improvements to the template never flowed downstream.

**Decision rationale:**

1. **Composition is orthogonal to archetype.** Workflow / Stitch / Catalog / Living-blueprint answer *what shape of work?* Subflow / parent-blueprint / instance answer *what's the relationship to other flows?* These are independent dimensions. Composition belongs in its own doctrine section, not as a fifth archetype.
2. **Frontmatter beats separate manifest file.** YAML at the top of `init.md` is diff-friendly, lives next to the prose it describes, and matches the existing `init.md`-as-loud-entry-point doctrine. A separate `flow-graph.yaml` would create two sources of truth.
3. **Multi-level inheritance via `blueprint_lineage` denormalized chain.** The naive recursive walk (read `parent_flows[0]/init.md`, recurse) works but doubles cold-boot cost for every level. `blueprint_lineage` is the pre-walked chain root-first; cold-boot reads it once and scans every ancestor's CHANGELOG. The link IS reference-not-lock: re-sync-by-divergence still applies.
4. **Subflow rule is testable, not aesthetic.** A step folder is a subflow iff it contains its own `init.md` + `processes/`. Anything else is a leaf step. This makes `/flow audit` mechanical at every level.

**How to apply:**

- New flows scaffold with frontmatter populated (the blueprint's `init.md` template carries the empty schema).
- When ≥ 2 instance flows share a recognizable shape, introduce an intermediate Living-blueprint flow scoped to the LOB. Don't put deal-shape blueprints at the kingdom root unless they generalize across LOBs.
- Cold-boot walks `blueprint_lineage` root-first; surfaces deltas one-line-per-ancestor. Apply manually on greenlight. The render step (`0600-render-index-html`) was extended to do this.

**Source flow:** `_flow-blueprint/` (doctrine landed); `Finance/Income/Flows/LOBs/wholesaling/_short-sale-deal-blueprint/` + 3 deals (first exercise of multi-level inheritance).
**Sister lessons:** Sub-Flow doctrine drift caught (2026-04-28-amber-3-deal-intake) — that lesson named the gap; this one names the structural fix.
**Status:** promoted-2026-04-28 (changes applied to `doctrine.md`, `showcase.md`, `_flow-blueprint/init.md`, `_flow-blueprint/README.md`, `_flow-blueprint/CHANGELOG.md`, `_flow-blueprint/processes/0600-render-index-html/instructions.md`).
**Session:** 2026-04-28-parent-child-flows
