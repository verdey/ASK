# Prune Rubric — keeping the council honest

When `/skillz prune` is invoked, walk these heuristics over the roster and surface a punch list. **Never auto-edit** — the user decides what to retire, merge, or keep.

## Heuristics

### 1. Duplicates
Two skills whose `description` or `argument-hint` overlap on ≥3 keywords. Surface as:
> Possible duplication: `/<a>` and `/<b>` both describe `<keyword cluster>`. Consider merging or clarifying boundaries.

### 2. Drift
Skill description in frontmatter no longer matches what its `_src/` actually contains.
- Read SKILL.md description.
- Skim filenames in the skill's `_src/` and `tuning/` (if present).
- If primary content has shifted (new spell categories, repurposed sections), flag it:
> Drift: `/<skill>` description says `<X>` but `_src/` is now mostly `<Y>`. Update frontmatter or refactor.

### 3. Staleness
- `mtime ≥ 90 days` on the SKILL.md → tag as `💤 dormant` in roster.
- If dormant AND no recent reference in any codebase AAR (`~/code/**/docs/sessions/_*.md`) → flag for retirement review:
> Stale: `/<skill>` last touched <X>mo ago, no recent invocations. Confirm still in use or retire.

### 4. Vessel orphans
Cross-reference `_src/council-map.md`:
- Vessel with no skill embodying it → "open seat" (informational, not a problem).
- Skill not mapped to a vessel → ensure council-map.md mentions it.

### 5. Description quality
Per `anthropic-skills:skill-creator` best practices, descriptions should name **what + when**. Flag any skill whose description lacks a clear trigger ("when to use this").

### 6. Compose-instead-of-create candidates
If two skills are frequently invoked together (judgment call from session memory), note as a candidate for either:
- A documented composition recipe, or
- A new skill that automates the composition (only if it repeats a lot).

## Output shape

```
🧹 Council Health — <date>

Duplicates:    <list or "none">
Drift:         <list or "none">
Stale:         <list or "none">
Orphans:       <list or "none">
Description:   <list of skills with weak triggers, or "all clear">
Compose:       <observed compositions worth naming, or "none">

Recommended actions: <prioritized 1–3 next steps, or "no action needed">
```
