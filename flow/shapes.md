# 🌊 The 5 Shapes — `realize` Taxonomy

*Session-resumption documentation patterns observed across the codebase. Each shape names a recurring genre of prose that wants to graduate into living code.*

When `/flow realize <path>` walks a realm, it scans for `HANDOFF.md`, `_PAUSE_*.md`, `_BACKLOG.md`, `RESUME*.md`, `SESSION*.md`, oversized `CLAUDE.md`, and `_CONVENTIONS.md`. Each match is classified into one of these five shapes.

---

## Shape 1 — Mission HOP (Handoff-of-Process)

**Signature.** A single long HANDOFF.md (200+ lines) that tries to do too much at once: project mission, methodology, stakeholders, time-sensitive blockers, canonical facts with citations, rubric axes, **assumption ledger** with ranked alternatives, conventions ("yellow tape"), ID schema, working-style norms, file map, memory pointers, and next moves.

**Heuristic markers.**
- File length > 200 lines
- Headings include both "Mission" / "Methodology" AND "Assumptions" / "Backlog" / "Conventions"
- Inline ID schemas (e.g., `A-001`, `B-001`, "tape.backlog")
- Tagged citations to source artifacts

**Realization target.**
Decompose the monolith:
- **Mission + working norms** → top of `CLAUDE.md` (the LOB / realm contract)
- **Assumption ledger** → `docs/decisions/A-NNN.md` files, one per assumption, with ranked alternatives in frontmatter
- **Convention "yellow tape"** → structured `_CONVENTIONS.md` or data file (CSS, ID schema as YAML)
- **File map / memory pointers** → `docs/cold-boot-brief.md` (read-order index)
- **Next moves** → handed to `/knock` queue, not narrated in prose

**Living-code targets.** ADR-style decision registry; assumption-tracking template with ranked-alternatives frontmatter; structured convention doc.

---

## Shape 2 — State Capsule

**Signature.** Session-summary narrative. "What happened" bullets with artifacts touched. Entity / relationship / decision snapshot. Cold-boot landing-pad reading order. 2–3 ranked next-move options. Usually 50–100 lines.

**Heuristic markers.**
- "Last session" / "What happened" / "Cold boot" headings
- Bullet lists referencing recently-modified files
- "Next moves" section with 2–3 options ranked

**Realization target.**
Most of this can be **auto-generated**, not hand-written:
- **What happened** → harvested from `git log --since=<last-session>`
- **Files touched** → harvested from `git diff --stat`
- **Open ADRs / TODOs** → grep'd from `docs/decisions/` + comment markers in code
- **Reading order** → static template, not per-session

**Living-code targets.** Session-brief YAML frontmatter template; git-hook that harvests session shape on commit; the existing `/pause` skill seals these into `docs/sessions/_session-NNNN-summary.md` automatically.

---

## Shape 3 — Decision / Assumption Ledger

**Signature.** Issue IDs (B-001, A-001), claim statement, conflict / status, resolution trigger, impact assessment, references back to the working doc where the tape appears. Often co-resident with Shape 1, but can stand alone in `_BACKLOG.md`.

**Heuristic markers.**
- Tabular structure with ID column
- "Status:" / "Resolution:" / "Impact:" rows
- Cross-refs to "tape.backlog" tags or §-numbered sections in sibling docs

**Realization target.**
ADRs are **the** classic prose-to-code pattern:
- One decision per file (`docs/decisions/NNNN-short-title.md`)
- YAML frontmatter: `id`, `status`, `created`, `superseded_by`, `tags`
- Body: claim, alternatives, rationale, impact
- **Never edited in place** — superseded decisions get a new file
- A simple `validate.sh` greps for orphan tape tags + cross-refs

**Living-code targets.** ADR YAML schema; grep-validation script; frontmatter convention linking each assumption back to the session/note where it was logged.

---

## Shape 4 — Morning Queue

**Signature.** TL;DR (≤50 words). Priority slot with status (deal-pending, blocker tags). Architecture diagram in text. Roster + ownership table. First-rights routing rules. Profile-based briefing model. **`/knock` queue with role tags** (already execution-ready). Decisions queue. Morning ritual instructions.

**Heuristic markers.**
- "TL;DR" / "Priority slot" / "Roster" / "Queue" headings
- Tables with columns like `Owner | Status | Tag`
- Embedded `/knock` invocation strings
- References to time-of-day (5am, "wake on phone")

**Realization target.**
This wants to become a **rendered artifact**, not a hand-maintained doc:
- HUD card (Pico.classless, single page) auto-rendered from a YAML state file
- Email digest formatter that renders the morning brief at 05:00
- SMS/push notification with the priority slot
- Decisions-queue parser (Q1=A shorthand) wired to a Gmail MCP reply handler

**Living-code targets.** HUD template (Pico card-skeleton); email formatter; `/schedule` 05:00 fire; `/pause` that seals this exact structure in reverse.

---

## Shape 5 — Living Doctrine

**Signature.** A 1500+ line CLAUDE.md or contract doc carrying the **genus** definition of a mature project: mission, LOB registry with status, values filter, research-as-default ethos, collaboration norms, working-model surface choreography, per-LOB conventions (folder structure, cold-boot read order), intake pattern loop, seeds-and-contract-docs funnel, co-creation lexicon, and N-part product DNA / doctrines.

**Heuristic markers.**
- File length > 1000 lines
- Top-level headings include both "Mission" AND a numbered "Doctrines" or "DNA" section
- Embedded sibling-doc tables ("Known LOBs", "Roster", "Surfaces")
- Self-reference: instructs new realms to clone its structure

**Realization target.**
The doctrine doc itself is **already** the realization in many ways — but the *cloning* pattern wants to become code:
- `scaffold-realm.sh` that seeds a new realm with the right skeleton
- Doctrine-checklist as YAML schema (per-doctrine: applies-to-stage, dependencies)
- Lint rules for contract-doc hygiene
- README.md at realm root that says "read CLAUDE.md first"

**Living-code targets.** Project-genesis template; `scaffold-realm.sh`; doctrine-checklist YAML.

> **Note.** `/flow new` already partially solves Shape 5 for LOBs. The unsolved part is realm-scale (non-LOB) doctrines.

---

## How `realize` uses this taxonomy

When walking a realm, `realize` produces a table:

| File | Shape | Maturity |
|------|-------|----------|
| `HANDOFF.md` | 1. Mission HOP | prose-only — could decompose |
| `_BACKLOG.md` | 3. Ledger | prose-only — ADR migration ready |
| `CLAUDE.md` | 5. Doctrine | mature — already a living contract |

Then for each row that's prose-only, `realize` points to the exemplar realm in [`exemplars.md`](exemplars.md) and the realization tier in [`ladder.md`](ladder.md), and emits a `/knock` brief.
