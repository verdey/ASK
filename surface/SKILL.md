---
name: surface
description: "🌊📌 Surface — Single-decision cliffhanger reflex. When a decision point requires off-thread input (research, sleep, or stakeholder feedback) and cannot be resolved this session, crystallize it into a persistent, browsable, resolvable asset at decisions.test. Do NOT trigger for: visual clarifiers (→ /sketch), whole-session transitions (→ /pause), multi-decision scope (→ /oracle), or destructive/irreversible decisions (→ bundle-confirm)."
argument-hint: "[optional: decision title hint, e.g. 'postgres vs dynamodb']"
---

# 🌊📌 Surface — Crystallize the cliffhanger

*Don't let the decision drown when the session ends.*

Sister vessel to [`/sketch`](../sketch/SKILL.md) (visual-doubt reflex) and [`/pause`](../pause/SKILL.md) (whole-session seal). Council-adjacent, not a triad member. Born from the decision-queue substrate built by `marisol.alexandria` in Wave 0.

---

## Charter

When Claude hits a decision that can't be answered this session — the answer requires research, sleep, or async stakeholder input — `/surface` crystallizes that cliffhanger into a **persistent, browsable, resolvable asset** at `decisions.test` instead of letting it evaporate when the context window closes.

One invocation of `/surface` does exactly this:

1. Extracts the cliffhanger from the current thread
2. Writes `Decisions/<YYYY-MM-DD>-<slug>/brief.md` + `state.json`
3. Runs `bin/refresh-manifest.sh` to update `manifest.json.openDecisions`
4. Self-peeks via `curl -sk https://alpha.test/api.php?action=decision&slug=<slug>` to confirm round-trip
5. Surfaces to Dan: the `decisions.test` URL **and** the absolute filesystem path

---

## Sensing rule — where /surface fits

| Reflex | When it fires |
|--------|--------------|
| `/sketch` | Visual clarifier — answer is layout, aesthetic, shape. Parallel prototypes. Immediate. |
| `/pause` | Whole-session seal — full cold-boot brief, session stops or transitions. |
| `/oracle` | Full strategic brief — scope, resourcing, multi-wave planning. |
| `/surface` | **Single-decision clarifier** — answer is off-thread, non-visual, single-question. |

**Decision tree for non-obvious clarifiers:**

```
Is the question visual (layout/color/shape)?  → /sketch
Is this a whole-session transition?            → /pause
Is this a multi-decision strategic scope?      → /oracle
Is the answer off-thread / async / sleeping?   → /surface  ✓
Is it answerable in the next 2 turns?          → ask inline, no reflex
```

**Under `/arriba`:** non-visual off-thread clarifiers automatically fire `/surface` — capturing the decision persistently rather than evaporating when the session ends. Inline clarifiers that can be resolved within the session are still asked inline.

---

## Anti-triggers (ask inline or route elsewhere)

- **Visual clarifier** ("what color for this button?") → [`/sketch`](../sketch/SKILL.md)
- **Whole-session seal** ("I'm done for the night, save the thread") → [`/pause`](../pause/SKILL.md)
- **Multi-decision strategic scope** → [`/oracle`](../oracle/SKILL.md)
- **Destructive or irreversible decision** → refuse; route through bundled-confirmation per `/arriba` doctrine
- **No genuine cliffhanger** — decision is answerable in the next 2 turns → ask inline
- **Answer is answerable from context alone** → answer it, no reflex

---

## Workflow (6 steps)

### Step 1 — Parse cliffhanger from current thread

Identify the **single decision** blocking forward progress. It must be:
- **Specific** — one question, not a cluster
- **Off-thread** — answer requires research, stakeholder input, or sleep
- **Non-visual** — if visual, route to `/sketch` instead

If no genuine cliffhanger is present: **refuse** and route to `/pause` if a whole-session save is needed.

If the decision is destructive or irreversible: **refuse** and route it through Dan's bundled-confirmation step.

### Step 2 — Fill brief.md template

Copy `Decisions/_template/brief.md` to `Decisions/<YYYY-MM-DD>-<slug>/brief.md`. Fill all sections:

- `## Abstract` — context compressed to 2–4 sentences
- `## The Cliffhanger` — the exact decision, interrogative form
- `## Auto-selected default` — Claude's recommendation + 1-line rationale
- `## Alternative space` — 2–4 options, each `### Option X: <name>` (H3), with description, when-it-shines, when-it-bites
- `## Links` — back-pointer to originating thread or pause-brief if any; related realm/flow
- `## Resolution` — **leave empty** (filled via decisions.test form on resolution)

Option headings under Alternative space must be H3 (`### Option X: <name>`) — these are parsed by `decision.php` to populate the resolve form radio buttons.

### Step 3 — Write state.json

Copy `Decisions/_template/state.json` to `Decisions/<YYYY-MM-DD>-<slug>/state.json`. Set:

```json
{
  "slug": "<YYYY-MM-DD-kebab-slug>",
  "title": "<Decision title matching brief.md H1>",
  "created": "<ISO-8601 now>",
  "status": "open",
  "resolution": null,
  "resolved_at": null,
  "links": {
    "thread_pause_brief": "<path or null>",
    "realm": "<realm slug or null>",
    "related": []
  }
}
```

Note: `resolution_rationale` (optional) is written by the resolve form when the rationale field is non-empty; the skill does not write it.

If a slug already exists for today: auto-suffix `-2`, `-3`, etc.

Use `mkdir -p` — the `Decisions/<slug>/` directory must be created before writing files.

### Step 4 — Run refresh-manifest.sh

```bash
bash ~/Documents/Claude/Projects/bin/refresh-manifest.sh
```

Assert exit 0. Assert `manifest.json.openDecisions` is now ≥ 1.

If the script errors: abort, record in AAR, do not surface a broken state to Dan.

### Step 5 — Self-peek

```bash
curl -sk "https://alpha.test/api.php?action=decision&slug=<slug>"
```

Assert response is JSON with `state` and `brief` keys. Assert `state.status == "open"`.

> Herd nginx redirects HTTP → HTTPS (301). Use `https://` with `-sk` (`-s` suppress progress, `-k` ignore self-signed cert). `curl -s` without `-L` does not follow redirects — `http://` returns HTML, not JSON.

If self-peek fails: record the failure in the confirmation to Dan; do not silently skip.

If self-peek returns `brief: ""` (brief.md missing after write): abort; report "brief write failed — file not present on disk"; do not surface the URL.

### Step 6 — Render confirmation to Dan

Surface **both**:
- Clickable URL: `https://decisions.test/decision.php?slug=<slug>`
- Absolute filesystem path: `/Users/verdey/Documents/Claude/Projects/Decisions/<slug>/brief.md`

One-line summary of the cliffhanger. Invite Dan to resolve async at `decisions.test`.

---

## Failure modes

| Condition | Behavior |
|-----------|----------|
| No genuine cliffhanger | Refuse; route to `/pause` if whole-session save needed |
| Visual clarifier | Refuse; route to `/sketch` |
| Destructive/irreversible decision | Refuse; route through bundled-confirmation |
| Duplicate slug today | Auto-suffix `-2`, `-3`, etc. |
| `bin/refresh-manifest.sh` errors | Abort; record in AAR; do not surface broken state |
| Self-peek (step 5) fails | Record failure in confirmation to Dan; do not silently skip |
| Self-peek returns `brief: ""` (brief.md missing after write) | Abort; report "brief write failed — file not present on disk"; do not surface URL |
| `state.json` exists, `brief.md` absent (orphan) | Out of scope for `/surface` (skill only writes new decisions); `decisions.test` shows "(brief.md not found)"; recoverable by re-running `/surface` for the decision |

---

## State machine

```
open ──(Dan picks via decisions.test form)──→ resolved
open ──(mtime > 30d, computed dynamically)──→ stale   [no file mutation]
stale ──(Dan picks via decisions.test form)──→ resolved
resolved ──→ terminal (no further transitions)
```

Stale is inferred from mtime at query time — never written to disk. The `state.json` on disk only ever holds `open` or `resolved`.

---

## Voice

Spare and precise. The cliffhanger is named cleanly — one question, one place, one URL. No hedging, no summary of the thread unless it informs the brief.

- **Name the decision** — the cliffhanger must be interrogative form in the brief
- **Surface both access paths** — URL and filesystem path, always both (per feedback memory)
- **One action, one artifact** — don't expand scope; if 2–3 clarifiers arise, fire `/surface` N times or use `/pause` for multi-decision whole-session preservation
- **Confirm the round-trip** — the self-peek is the proof; don't tell Dan it worked until you know it worked

---

## Bounded actions

- Does not resolve decisions — that is Dan's act at `decisions.test`
- Does not touch existing `Decisions/<slug>/` directories — writes only new ones
- Does not fire for clusters of decisions — single-decision only per invocation
- Does not expand scope mid-invocation — if a second cliffhanger surfaces while filling the brief, note it and fire a second `/surface` after the first completes
- Does not skip self-peek even under `/arriba` — round-trip confirmation is non-negotiable

---

## Files

| File | Role |
|------|------|
| `SKILL.md` | This file. |

(Lean by design. The substrate — `api.php`, `decisions.test`, `bin/refresh-manifest.sh`, `Decisions/_template/` — lives in `Tooling/decision-queue/` and was built by `marisol.alexandria`.)

---

## See also

- [`/sketch`](../sketch/SKILL.md) — visual-doubt reflex. Sister skill: same suppression-and-crystallize shape, visual lane.
- [`/pause`](../pause/SKILL.md) — whole-session seal. Use when the full thread needs cold-boot preservation, not just one decision.
- [`/oracle`](../oracle/SKILL.md) — escalation for multi-decision strategic scope.
- [`/arriba`](../arriba/SKILL.md) — GSD posture that auto-fires `/surface` for non-visual off-thread clarifiers.
- `Tooling/decision-queue/SURFACE-SKILL-SPEC.md` — frozen contract this skill was authored from.
