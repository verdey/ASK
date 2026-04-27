# Audit Rubric — build vs. adopt vs. modify vs. create

When `/skillz audit <task>` is invoked, walk the rubric below and produce **one verdict** with reasoning + a concrete next action.

## The four verdicts

1. **🟢 ADOPT** — an existing skill (or composition of skills) already fits. The user invokes it as-is.
2. **🟡 MODIFY** — an existing skill almost fits; a small, targeted edit makes it perfect.
3. **🔵 CREATE** — the work is encoded behavior, methodology, or repeatable pattern; birth a new skill via `anthropic-skills:skill-creator`.
4. **🔴 BUILD** — genuinely domain-specific code; route to `/oracle` for scoping → `/knock` for execution.

## Walk the rubric

### Step 1 — Read the roster
Open `~/.claude/skills/skillz/roster.md` and `_src/council-map.md`. Note any skill whose description contains keywords from the task.

### Step 2 — Pattern-match against routing intuition
Use the routing table in `council-map.md`. If one or more skills resonate, draft a candidate ADOPT verdict.

### Step 3 — Apply the build-vs-skill heuristic
From the existing Oracle doctrine ("📚 Teacher sensing" — `/Users/verdey/.claude/skills/oracle/SKILL.md`):

| Signal | Direction |
|--------|-----------|
| Pattern repeats across 3+ projects in the kingdom | CREATE skill |
| Work is decision-framework, methodology, or orchestration template | CREATE skill |
| User describes work as "a way I want to approach X going forward" | CREATE skill |
| Proposed app is mostly prompts, rules, or routing logic | CREATE skill |
| Improvement to existing methodology already lives in `~/.claude/skills/` | MODIFY skill |
| Solves one specific business problem with domain logic | BUILD code |
| Existing skill matches as-is or via composition | ADOPT |

### Step 4 — Compose, don't proliferate
Before recommending CREATE, check: can two existing skills compose? Examples:
- "Watch PRs every hour" → `/loop 1h /babysit-prs` — ADOPT, no new skill needed.
- "Scope a refactor and ship it" → `/oracle` then `/knock` — ADOPT, two-skill flow.

### Step 5 — Render the verdict

```
🎯 Verdict: <ADOPT | MODIFY | CREATE | BUILD>

Reasoning: <2-3 sentences naming the signals that decided it>

Next action:
  ADOPT  — invoke: /<skill> [args]   (or composition)
  MODIFY — edit:   ~/.claude/skills/<skill>/SKILL.md   (one-line change description)
  CREATE — invoke: anthropic-skills:skill-creator   (one-line charter for the new skill)
  BUILD  — route:  /oracle "<task scope>" → /knock <brief>

If unsure between two verdicts, surface both and let the user choose.
```

## Anti-patterns to flag

- **Duplicating an existing skill** because the user didn't remember it exists. ADOPT first; only CREATE if the audit confirms genuine novelty.
- **Building app code for what is really a prompt/rule pattern.** If the proposal is mostly prompts → CREATE skill, not BUILD.
- **Modifying core triad skills** (`/ask`, `/seek`, `/knock`, `/oracle`, `/pause`) for narrow use cases — extend via tuning overlays or birth a new skill instead.
