---
name: flow
description: "🌊 Flow — Lines of Business and the prompt-folder craft. Curates the evergreen doctrine of flows, audits maturity against the blueprint, streamlines existing flows (including LLM→script offload via a tools register), and scaffolds new ones from _flow-blueprint. Read-only over LOBs; mutates only its own knowledge base."
argument-hint: "[doctrine | showcase | audit <path> | streamline <path> | new <name> | curate <observation> | nav | tools]"
---

# 🌊 flow — Flow

*The doctrine of flows: how a Line of Business organizes its prompts, assets, and motion into a serialized, walk-testable tree that graduates by degrees.*

> **Sits beside:** `_flow-blueprint/` (the canonical structural template Dan keeps in `Income/`) and the decet of doctrines in `Income/CLAUDE.md` §14. This skill is the conversational surface for that doctrine — Dan can ask "what's a flow again?" or "is this a flow?" without context-switching to the repo.

---

## What this skill is

`/flow` is a **knowledge-curated skill** in the spirit of `/oracle` and `/ask`. It owns:

1. The **evergreen definition** of a "flow" (`doctrine.md`)
2. A **showcase** of 3–5 exemplar flows and what each one teaches (`showcase.md`)
3. A growing log of **curated lessons** Dan captures over time (`lessons.md`)
4. A **tools register** of bash/scripts that offload long-form file munging from LLMs (`tools-register.md`)

Read-only over LOBs (`Income/` and elsewhere). The only files this skill ever mutates are its own four knowledge files plus, when explicitly directed, scaffolded LOB structures created via the **Scaffold** modality.

---

## Modalities

Parse `$ARGUMENTS`. The first word is the modality. If `$ARGUMENTS` is empty, render the **Interactive menu** (below).

| Modality | Invoke | What it does |
|----------|--------|--------------|
| Doctrine | `/flow doctrine` | Reads `doctrine.md` and emits it. The evergreen "what is a flow?" |
| Showcase | `/flow showcase` | Reads `showcase.md`. Top 3–5 exemplars with what to learn from each. |
| Audit | `/flow audit [path]` | Walks the target dir against the blueprint, returns a maturity tier and the gaps to close. |
| Streamline | `/flow streamline [path]` | Two passes: structural simplification + LLM→script offload recommendations from the tools register. |
| Scaffold | `/flow new <name>` | Clones `_flow-blueprint/` into a new LOB. Confirms destination before writing. |
| Curate | `/flow curate <observation>` | Appends a dated entry to `lessons.md`. Proposes (never auto-applies) edits to `doctrine.md`/`showcase.md` if the observation supersedes prior content. |
| Navigate | `/flow nav` or `/flow next` | From inside a `processes/NNNN-step/` dir, surfaces the current step's primary file and names the next step. |
| Tools | `/flow tools` | Reads `tools-register.md`. The curated catalogue of bash/scripts that replace LLM passes for file munging. |

### Bare invocation: Interactive menu

When `$ARGUMENTS` is empty, render this menu and wait for selection:

```
🌊 /flow — pick a modality:

  1. Doctrine     — what is a flow? (the evergreen definition)
  2. Showcase     — top exemplar flows + what to learn from each
  3. Audit        — assess this dir (or a path) against the blueprint
  4. Streamline   — recommend simplifications + LLM→script offload
  5. Scaffold     — clone _flow-blueprint into a new LOB
  6. Curate       — capture an evergreen lesson about flows
  7. Navigate     — what step am I on? what's next?
  8. Tools        — the offload-from-LLM tools register

Reply with a number, a name, or a sentence ("audit ~/code/experimental/Income/wholesaling").
```

Then dispatch on the user's reply.

---

## Modality contracts

### 1. Doctrine

Read `~/.claude/skills/flow/doctrine.md` and emit it verbatim. Do not paraphrase. If the user asks a follow-up about flows, answer from `doctrine.md` first; if the answer isn't there, say so and offer to capture the gap via Curate.

### 2. Showcase

Read `~/.claude/skills/flow/showcase.md` and emit it. Each exemplar carries: path, archetype, what to learn, what *not* to copy. If the user asks "what's the best example of X?", scan the showcase for a match before pointing at the broader portfolio.

### 3. Audit

Default target: `pwd`. Otherwise the path Dan supplies. Read these signals:

- Presence and shape of `init.md` at root (per `Income/docs/flow.md` §1.1)
- Presence of `processes/` with OS-ascending-sort step dirs (the **Acid Test**)
- Per-step shape: skinny artifact (YAML frontmatter + `## Refine`) **or** legacy README + `_graduation.md` pair (both valid per §1.7)
- `CLAUDE.md` (LOB contract) and `docs/cold-boot-brief.md`
- `docs/{decisions,sop,backlog,sessions}/` scaffolding
- A `## Blueprint reference` footer in `init.md` with `Last synced` date

Report the maturity tier and the *specific* gaps to close to advance one tier:

| Tier | What's true at this tier |
|------|--------------------------|
| **Early Stage** | LOB exists; no `processes/` yet, or no `init.md`. |
| **Emerging** | `init.md` + `processes/` with at least one numbered step; partial scaffolding. |
| **Workflow** | Full scaffolding; serialized steps with graduation markers; cold-boot < 90s walk-test passes. |
| **Canonical** | All of Workflow + `Blueprint reference` footer + AAR loop demonstrably feeding back into either the LOB or the blueprint. |

End with a one-line "next move" — the single highest-leverage gap to close.

### 4. Streamline

Two passes on a target flow.

**Pass A — Structural.** Walk `processes/` and report:
- Steps that could merge (same input/output, no external dependency between them)
- Hidden parallelism (consecutive steps that don't share state — candidates to run side-by-side)
- Missing `_graduation.md` markers or missing `## Refine` sections (skinny pattern)
- Drift between `init.md` claims and what's actually in `processes/` (the **Filesystem-Truth** axiom from `flow.md` §1.2)

**Pass B — LLM→script offload.** Scan each step's prompt/instructions for long-form file munging:
- CSV cleaning, dedup, column selection, schema enforcement
- JSON reshape, filtering, aggregation
- Regex extraction across many files
- File-walking, renaming, hashing, deduping
- Format conversion (md ↔ html ↔ pdf ↔ csv ↔ json)
- Bulk find-and-replace across a tree

For each offload candidate, draw a recommendation from `tools-register.md` (e.g., "this is a `jq` job, not a Claude job"). Output as a prioritized list with concrete command sketches, not prose.

**Capture step.** When Dan accepts an offload Streamline didn't already know about, append it to `tools-register.md` with the trigger, the tool, the example, and the source flow.

### 5. Scaffold

`/flow new <name>` clones `/Users/verdey/code/experimental/Income/_flow-blueprint/` into a destination Dan confirms. Default destination: `~/code/experimental/Income/<name>/`. Substitutes `«LOB_NAME»` and `«YYYY-MM-DD»` tokens in the blueprint files.

**Always confirm the destination path before writing.** Use `AskUserQuestion` to surface the proposed path and any conflicts (e.g., dir already exists).

After scaffold:
- Bump `Last updated` in the new LOB's `CLAUDE.md` to today
- Insert today's date into `init.md`'s `## Blueprint reference` block as `Last synced`
- Remind Dan to add the LOB to `Income/CLAUDE.md` §2 (the Known LOBs table) and `docs/roster.yaml` `lob_permissions`

### 6. Curate

`/flow curate <observation>` appends to `~/.claude/skills/flow/lessons.md`:

```markdown
## YYYY-MM-DD — <one-line summary>

<observation verbatim, then optional Dan-language translation if the observation needed compression>

**Source flow:** <if applicable>
**Status:** captured | proposes-doctrine-edit | proposes-showcase-edit
```

If the observation supersedes prior content in `doctrine.md` or `showcase.md`:
1. Set `Status: proposes-doctrine-edit` (or `proposes-showcase-edit`)
2. Surface the proposed edit as a unified diff
3. Ask Dan to greenlight before mutating

Mutation-only-via-skill: Dan should not be hand-editing `doctrine.md` or `showcase.md` outside `/flow curate`. If he does, the next invocation of `/flow doctrine` or `/flow showcase` should still render correctly — but the audit trail lives in `lessons.md`.

### 7. Navigate

If `pwd` matches `*/processes/NNNN-*/` (regex), emit:
- Current step's primary file (skinny artifact or `README.md`)
- The next step's directory name (next OS-ascending-sort sibling)
- The previous step's directory name

If `pwd` is `*/processes/`, list the steps in OS-ascending-sort with one-line summaries (read from each step's frontmatter or first H1).

If `pwd` is anywhere else, suggest running Audit instead.

### 8. Tools

Read `~/.claude/skills/flow/tools-register.md` and emit it. When Dan asks "what should I use to <do file thing X>?", scan the register for the trigger and recommend.

---

## Operational rules

- **Read-only over LOBs.** Never write to `Income/<LOB>/` outside the Scaffold modality, and even Scaffold confirms first.
- **Mutation-only-via-skill for knowledge files.** `doctrine.md`, `showcase.md`, `lessons.md`, `tools-register.md` only mutate via Curate (or via Streamline appending a new offload to the tools register, with confirmation).
- **No prose where a list will do.** Streamline output is a prioritized list of concrete moves, not paragraphs.
- **Source-of-truth references, not copies.** When in doubt, point at `Income/_flow-blueprint/`, `Income/CLAUDE.md` §14, or `Income/docs/flow.md`. Don't reproduce them here.
- **The Acid Test is canonical.** "Whatever `ls` shows in ascending order IS the order of the Flow." (`Income/docs/flow.md` §1.2)
- **Filesystem-Truth is canonical.** Drift between a doctrine reference and what's actually at the path is the highest-priority fix. Either build the missing thing or amend the reference — never both, never neither.

## Companion files

- [`doctrine.md`](doctrine.md) — the evergreen definition of a flow
- [`showcase.md`](showcase.md) — top exemplar flows
- [`lessons.md`](lessons.md) — curated insights captured over time
- [`tools-register.md`](tools-register.md) — bash/scripts that offload work from LLMs

## Source-of-truth references (external)

- `/Users/verdey/code/experimental/Income/_flow-blueprint/` — the canonical living blueprint
- `/Users/verdey/code/experimental/Income/CLAUDE.md` — portfolio contract, §14 Living Product DNA
- `/Users/verdey/code/experimental/Income/docs/flow.md` — the motion doctrine in full
