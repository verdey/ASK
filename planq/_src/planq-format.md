# planq.md — Canonical Format Spec

## File Location

```
/Users/verdey/Documents/Claude/Projects/planq.md
```

This is the single source of truth. No copies, no mirrors, no DB.

## Structure

```markdown
# Plan Queue

<!--
  This file is the source of truth for /planq.
  - One line = one idea. Line order = priority.
  - Optional inline tags: #flow:<slug>, #status:<word>, #oracle:<name>
  - Surface: http://planq.test (after camila.lambda lands)
  - Skill: ~/.claude/skills/planq/
-->

loose idea as a plain sentence
another idea, slightly lower priority  #flow:chance
ripen this one soon  #status:ripening
promoted idea  #oracle:juanita → oracle:juanita
```

## Rules

- **One line = one idea.** No multi-line entries. No YAML per item. No frontmatter per item.
- **Line order = priority.** Top of file = highest priority. Drag-reorder (planq.test surface) rewrites this order in place.
- **Blank lines** allowed for visual grouping; ignored by parser. Do not strip them on rewrite.
- **`# Plan Queue` heading** must be the first non-blank, non-comment line.
- **HTML comment block** (the `<!--...-->` banner) follows the heading. Preserved on all rewrites.

## Tag Grammar

Tags are inline, space-separated, appended after the idea text:

| Tag | Syntax | Added by | Purpose |
|-----|--------|----------|---------|
| Flow reference | `#flow:<slug>` | Dan (manual) | Links idea to an existing flow realm |
| Status | `#status:<word>` | Dan or `/planq tag` command | Lifecycle signal (`ripening`, `blocked`, `parked`) |
| Oracle name | `#oracle:<name>` | Promotion spell | Cross-ref: idea has a named oracle shard |

Tag values are lowercase, no spaces, no special chars except hyphens.

## Promotion Marker

When `sp-promote-to-oracle` runs, it appends to the line:

```
loose idea  #oracle:juanita → oracle:juanita
```

The `→ oracle:<name>` suffix is the promotion marker. It is:
- Added by the spell, never by hand.
- Immutable once written — it is a cross-reference, not a status.
- The `#oracle:<name>` tag and the `→ oracle:<name>` marker are written together.

## Parser Semantics

When `/planq` reads `planq.md`:

1. Skip lines that are blank or match `/^\s*(<!--.*?-->\s*|#\s)/` (heading + comment).
2. Each remaining non-blank line is one idea.
3. Parse tags by splitting on whitespace and matching `/^#(\w+):(\S+)$/` tokens.
4. The idea text is everything before the first `#`-tag token (trimmed).
5. The `→ oracle:<name>` suffix (if present) is parsed separately after tag extraction.

## Allowed Mutations

| Operation | Who | How |
|-----------|-----|-----|
| Append a line | Dan (direct edit) or `/planq add` | Add to bottom of idea list |
| Prepend a line | `/planq prepend` | Insert after comment block |
| Reorder | Dan (direct edit) or planq.test drag-reorder | Full file rewrite preserving blanks |
| Edit in place | Dan (direct edit) or `/planq tag` | Mutate the matching line |
| Delete | `/planq delete` (with confirm) or Dan | Remove the matching line |
| Add `→ oracle:` marker | Promotion spell only | Append to matching line |

**planq.test drag-reorder** (Wave 2, camila.lambda): client captures new order on drop → POST → PHP rewrites `planq.md` preserving blank-line groupings, comment block, and heading. No localStorage. No intermediate state.
