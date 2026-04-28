---
name: portal
description: "🏛️ Portal — Kingdom daily surface curator. Owns iOS PWA contract, portal card doctrine, and nav-metaphor for alpha.test. Invoke for: PWA audit, Today's Moves, realm card schema, navigation doctrine. Read-only over portal HTML/JS; mutates only its own knowledge base."
argument-hint: "[doctrine | audit | prioritize | nav | pwa-check | new-card <slug>]"
---

# 🏛️ portal — Kingdom Daily Surface Curator

*The portal is where the veil between Dan and the kingdom is thinnest. This skill owns its doctrine.*

> **Sits beside:** `alpha.test` (the kingdom portal at `/Users/verdey/Documents/Claude/Projects/index.html`) and `manifest.json`. This skill is the conversational surface for portal doctrine — Dan can ask "is the PWA contract intact?" or "what card should I add next?" without context-switching to the repo.

---

## What this skill is

`/portal` is a **knowledge-curated skill** in the spirit of `/flow` and `/skillz`. It owns:

1. The **portal doctrine** — three-layer kingdom architecture, card schema, invariants (`doctrine.md`)
2. The **PWA contract** — iOS-first invariants the portal must maintain (`pwa-contract.md`)
3. The **nav metaphor** — N/S/E/W/Z navigation doctrine, post-Wave-3 `/sketch` outcome (`nav-metaphor.md`)
4. The **priority rubric** — how portal renders `/triage` output (`priority-rubric.md`)
5. An **audit rubric** — drift checks for the `audit` modality (`_src/audit-rubric.md`)
6. A curated **lessons** log captured over time (`lessons.md`)

Read-only over the portal surface (`index.html`, `manifest.json`, `sw.js`, icons). The only files this skill mutates are its own knowledge files.

---

## Modalities

Parse `$ARGUMENTS`. The first word is the modality. If `$ARGUMENTS` is empty, render the **Interactive menu** (below).

| Modality | Invoke | What it does |
|----------|--------|--------------|
| Doctrine | `/portal doctrine` | Reads `doctrine.md` — three-layer architecture, invariants, card schema. |
| Audit | `/portal audit` | Checks `index.html` + `manifest.json` against `_src/audit-rubric.md`. Returns punch list. |
| Prioritize | `/portal prioritize` | Reads `/triage`'s `_state/today.json` and renders a Today's Moves summary. |
| Nav | `/portal nav` | Reads `nav-metaphor.md` — the N/S/E/W/Z navigation binding doctrine. |
| PWA-check | `/portal pwa-check` | Runs `bin/check-pwa.sh` and surfaces the result. |
| New card | `/portal new-card <slug>` | Guides Dan through adding a new realm card to `manifest.json`. |

### Bare invocation: Interactive menu

When `$ARGUMENTS` is empty, render this menu and wait for selection:

```
🏛️ /portal — pick a modality:

   1. Doctrine     — three-layer portal architecture + invariants
   2. Audit        — check portal surface against audit rubric
   3. Prioritize   — render Today's Moves from /triage output
   4. Nav          — N/S/E/W/Z navigation metaphor doctrine
   5. PWA-check    — run check-pwa.sh + surface results
   6. New card     — add a realm card to manifest.json

Reply with a number, a name, or a sentence ("audit the portal").
```

Then dispatch on the user's reply.

---

## Modality contracts

### 1. Doctrine

Read `~/.claude/skills/portal/doctrine.md` and emit it. Do not paraphrase. If the user asks a follow-up about portal architecture, answer from `doctrine.md` first; if the answer isn't there, offer to capture the gap via `curate` (append to `lessons.md`).

### 2. Audit

Read `~/.claude/skills/portal/_src/audit-rubric.md`. For each check, verify actual file state (read `index.html`, `manifest.json`, `api.php` as needed). Return a two-column result:

| Check | Status |
|-------|--------|
| `<check name>` | ✓ pass / ✗ fail — `<what's wrong>` |

End with a one-line "next move" — the single highest-leverage gap to close.

### 3. Prioritize

Read `~/.claude/skills/triage/_state/today.json`. If `computed_at` is null or stale (> 24 hours), flag that `/triage today` should be run first. Otherwise render the moves as a ranked list: position / move / signal source / impact-easiness badge.

### 4. Nav

Read `~/.claude/skills/portal/nav-metaphor.md` and emit it. If the file contains "TBD post-Wave-3", surface that note and suggest running `/sketch` to pick the canonical N/S/E/W/Z metaphor before Wave 5 (`bindings.js` authoring).

### 5. PWA-check

Run:

```bash
bash ~/.claude/skills/portal/bin/check-pwa.sh
```

Surface stdout verbatim + exit code. If exit 1, present the failed checks as a punch list with suggested fixes drawn from `pwa-contract.md`.

### 6. New card

Guided three-step flow:

1. Ask Dan for `slug`, `title`, `blurb`, and `href` (use `AskUserQuestion`).
2. Show the proposed JSON entry and confirm before writing.
3. On greenlight: append entry to `manifest.json`, run `bin/refresh-manifest.sh`, confirm the card appears in portal.

---

## Operational rules

- **Read-only over the portal surface.** Never write to `index.html`, `sw.js`, or icon files. The only write path for portal HTML is a `/knock` session explicitly scoped to it.
- **PWA contract is the floor.** Any suggestion that would violate `pwa-contract.md` invariants must be flagged before acting.
- **Nav-metaphor is Wave-3-locked.** Do not infer the N/S/E/W/Z mapping from context — wait for the canonical `/sketch` outcome.
- **Triage is the source of truth for moves.** `/portal prioritize` renders `/triage` output, never computes its own ranking.
- **No prose where a list will do.** Audit output is a table + one-line next move, not paragraphs.

---

## Shared basics

Hyperlink whenever possible — connect to files, skills, and references rather than restating. Bias for clarity. Much love, much peace. ✨

When at a non-informational crossroads, render per [`_shared/genius-mode-protocol.md`](../_shared/genius-mode-protocol.md).

---

## Companion files

- [`doctrine.md`](doctrine.md) — three-layer portal architecture + card schema invariants
- [`pwa-contract.md`](pwa-contract.md) — iOS PWA invariants the portal must maintain
- [`nav-metaphor.md`](nav-metaphor.md) — N/S/E/W/Z navigation doctrine (Wave-3 placeholder)
- [`priority-rubric.md`](priority-rubric.md) — how portal renders `/triage` output
- [`_src/audit-rubric.md`](_src/audit-rubric.md) — drift checks for `audit` modality
- [`lessons.md`](lessons.md) — curated insights over time
- [`bin/check-pwa.sh`](bin/check-pwa.sh) — PWA scaffolding auditor (authored Wave 2)

## Source-of-truth references (external)

- `/Users/verdey/Documents/Claude/Projects/index.html` — the portal
- `/Users/verdey/Documents/Claude/Projects/manifest.json` — realm registry
- `/Users/verdey/Documents/Claude/Projects/api.php` — flow surface grep server
- `http://alpha.test` — live Herd URL
