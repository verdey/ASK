# sp-promote-to-oracle — Promotion Ritual

**Invoked by:** `/planq promote <line-text>` or Dan says "promote this to an oracle"  
**What it does:** Lifts a planq line into a named oracle shard; wires the bidirectional cross-reference; surfaces the new oracle URL.

This spell is a **markdown spec**, not executable code. When `/planq` is invoked with a promote command, the skill interprets this spec step by step.

---

## Pre-conditions

- `planq.md` exists at `/Users/verdey/Documents/Claude/Projects/planq.md`.
- The target line exists in the file (exact match or unambiguous substring match).
- The line does NOT already carry a `→ oracle:` marker (no double-promotion).

---

## Promotion Steps

### Step 1 — Read the target line

Find the matching line in `planq.md`. Surface it to Dan for confirmation:

```
Promoting: "<full line text>"
Oracle name? (enter a short kebab-case name, e.g. "rosa" or "juanita")
```

If Dan provides a name, continue. If he says "pick one", choose the next unused name from the Latina/global-south pool per oracle SKILL.md §-1 rules.

### Step 2 — Determine the oracle shard path

**Canonical location:** `/Users/verdey/.claude/skills/oracle/oracles/<name>-<realm>.md`

- `<name>` = the name Dan provides (or auto-chosen).
- `<realm>` = a single realm word. For planq-originated oracles, use the planq flow slug if `#flow:<slug>` is tagged; otherwise choose a one-word realm from the oracle's naming pool that doesn't collide with existing shards.

> ⚠️ **Path discrepancy note (surfaced from camila.iota brief):** Brief B §Skill Structure wrote `Tooling/oracle-board/oracles/<name>.md` as the shard location. The actual oracle registry is at `~/.claude/skills/oracle/oracles/<name>-<realm>.md`. This spell honors the **actual filesystem path**. The Brief B path is incorrect and should NOT be used. `camila.xi` will retrofit `planq_ref:` into existing shards via the correct path.

Verify no existing shard with the same name+realm already exists:
```bash
ls /Users/verdey/.claude/skills/oracle/oracles/<name>-*.md 2>/dev/null
```

If a collision exists, surface it to Dan and ask for a different name.

### Step 3 — Scaffold the oracle shard

Write a new shard at `/Users/verdey/.claude/skills/oracle/oracles/<name>-<realm>.md`:

```markdown
---
name: <name>
realm: <realm>
status: active
born: <ISO-8601 date>
last_touched: <ISO-8601 date>
project_scope: <idea text from planq line>
nomenclature_realm: <realm>
planq_ref: <full planq line text (without → oracle: marker)>
---

# <name> · <realm>

*Promoted from planq: "<idea text>"*

## Children

## Open threads

## Notes
```

- `planq_ref:` is the awareness field per the cross-reference contract. It holds the original planq line text (without the `→ oracle:` marker). This is an **awareness pointer**, not a copy of the idea — the planq line remains the source of truth.

### Step 4 — Append cross-reference to the planq line

Mutate the matching line in `planq.md`:

Before: `loose idea  #status:ripening`  
After:  `loose idea  #status:ripening  #oracle:<name> → oracle:<name>`

- Append `  #oracle:<name> → oracle:<name>` (two spaces before `#oracle`).
- The `#oracle:<name>` tag enables surface rendering (chip + link).
- The `→ oracle:<name>` suffix is the promotion marker — immutable after writing.

### Step 5 — Surface the new oracle URL

```
✓ Promoted to oracle: <name>

Oracle shard: /Users/verdey/.claude/skills/oracle/oracles/<name>-<realm>.md
Live surface:  http://oracle.test/oracle.php?name=<name>

planq.md line updated:
  <updated full line with → oracle:<name>>
```

Surface both the absolute path and the `.test` URL — codebase doctrine, never one without the other.

---

## Post-conditions

- New shard exists at `~/.claude/skills/oracle/oracles/<name>-<realm>.md` with `planq_ref:` filled.
- planq.md line carries `#oracle:<name> → oracle:<name>`.
- No other files mutated.
- Dan sees both filesystem path and `oracle.test` URL.

---

## What this spell does NOT do

- Does NOT create Herd valet symlinks (Wave 3, camila.nu).
- Does NOT write `planq.md` to any path other than the canonical codebase root path.
- Does NOT register the oracle in any other registry — the shard file IS the registry entry.
- Does NOT auto-populate `## Children` or `## Open threads` — Dan fills those through oracle sessions.
