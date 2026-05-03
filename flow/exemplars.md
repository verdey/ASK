# 🌊 Exemplars — Realm Pointers per Shape

*For each of the 5 shapes (see [`shapes.md`](shapes.md)), the realm/file in the codebase that's most mature. When `/flow realize` reports a gap, it points here for the learning model.*

> **Filesystem-Truth axiom.** These pointers must resolve. If a path drifts, fix the pointer or fix the path — never both, never neither.

---

## Shape 1 — Mission HOP

**Exemplar:** `/Users/verdey/Documents/Claude/Projects/Finance/patillo redeaux/HANDOFF.md`

**What to learn.** The most ambitious instance of trying to do everything in one document. Mission, methodology, stakeholders, time-sensitive blockers, canonical property facts with line-level citations, 9-axis rubric, assumption ledger with ranked alternatives, "yellow tape" conventions, ID schema, file map, memory pointers, next moves — all in 278 lines.

**What to copy.** The assumption-ledger ethos (A-NNN with ranked alternatives) and the citation discipline (every claim points back to a source line).

**What *not* to copy.** The monolithic shape itself. The realization is to *decompose* this into `CLAUDE.md` + `docs/decisions/` + `_CONVENTIONS.md` rather than reproduce another 278-line tome elsewhere.

---

## Shape 2 — State Capsule

**Exemplar:** `/Users/verdey/Documents/Claude/Projects/Finance/wealth_architecture/HANDOFF.md`

**What to learn.** Tight 70-line session brief: what happened, state snapshot, cold-boot reading order, ranked next-move options. Readable cold in under 90 seconds.

**What to copy.** The "cold-boot reading order" device — three files in priority order with one-line "why this first."

**What *not* to copy.** The hand-maintenance. Most of this content is already in git history; the realization is to **auto-generate** the capsule from `git log --since=<last-session>` rather than rewrite it each time. The existing `/pause` skill is the natural mechanism.

---

## Shape 3 — Decision/Assumption Ledger

**Exemplar:** `/Users/verdey/Documents/Claude/Projects/Finance/patillo redeaux/_BACKLOG.md` + the §5 Assumptions section of its sibling HANDOFF.md.

**What to learn.** The ID + claim + status + resolution-trigger + impact + cross-ref shape. The "tape.backlog" tagging convention that links assumptions back to where they appear in working docs.

**What to copy.** The cross-reference discipline. An assumption isn't useful if you can't find where it's load-bearing.

**What *not* to copy.** The single-file accumulation pattern. The realization is one-file-per-decision under `docs/decisions/NNNN-short-title.md`, with a `validate.sh` that grep-checks for orphan tape tags.

---

## Shape 4 — Morning Queue

**Exemplar:** `/Users/verdey/Documents/Claude/Projects/Finance/Income/RESUME.md`

**What to learn.** The 156-line morning entry-point: TL;DR, priority slot with status, architecture diagram, roster + god-mode ownership table, first-rights routing rules, profile-based briefing model (Dan/Amber/Chance rows), `/knock` queue with Keeper/Catalyst tags, intake decisions queue, freshest substrate pointers, morning ritual.

**What to copy.** The `/knock` queue structure (role-prefix + brief path + dependencies) — already execution-ready. The Q1=A decisions-queue shorthand.

**What *not* to copy.** The hand-maintenance. The realization is a **rendered HUD** + email digest. The morning ritual itself ("run /pause, sleep, wake on phone, reply Q1-Q7, fire /knock rows") is the natural automation surface.

---

## Shape 5 — Living Doctrine

**Exemplar:** `/Users/verdey/Documents/Claude/Projects/Finance/Income/CLAUDE.md`

**What to learn.** 1500+ lines carrying the genus definition of a mature project: mission, LOB registry with status, values filter, research-as-default ethos, collaboration norms, working-model surface choreography, per-LOB conventions, intake pattern loop, seeds-and-contract-docs funnel, co-creation lexicon, ten-part Living Product DNA.

**What to copy.** The N-part doctrine structure (each doctrine is named, scoped, and applies-to-stage marked).

**What *not* to copy.** Thinking the same doctrines apply to every realm. The realization is a **doctrine-checklist** YAML where each doctrine is per-applicability-marked, plus a `scaffold-realm.sh` that selects which doctrines to clone based on the new realm's stage.

---

## When `/flow realize` reports an exemplar

The output line should be:

> **Shape 1 detected in `<file>`.** Mature exemplar: `<exemplar path>`. Read it cold; you're aiming to *decompose into the same parts*, not reproduce the monolith. Realization brief: `/knock <brief-name>`.

Always cite the exemplar by absolute path. Always remind that the exemplar is the *target shape*, not the *target length*.
