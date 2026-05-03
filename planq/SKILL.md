---
name: planq
description: 🗂️ Planq — Lightweight plan queue manager. Manages the global planq.md at codebase root, promotes lines into oracle shards, and owns the planq.test surface contract.
argument-hint: "[add <idea> | reorder | promote <line-text> | list] or describe your queue intent"
---

# 🗂️ planq — Plan Queue

*A seedbed for ideas before they ripen into oracles.*

> **Sits beside:** [🔮 Oracle](../oracle/SKILL.md) — planq is the upstream layer. Ideas ripen here; oracle shards grow from them via the promotion spell. planq is anonymous (no named oracle identity); it is a registry, not an orchestrator.

## Three Roles

1. **Queue Manager** — maintain `planq.md` at codebase root: append lines, reorder by priority, tag, delete resolved ideas.
2. **Promotion Gateway** — invoke `sp-promote-to-oracle` when Dan says "promote line X to oracle": scaffold the shard, wire the cross-reference, surface the new oracle URL.
3. **Surface Owner** — direct Dan to `http://planq.test` (after camila.lambda lands) and the Named Oracles sidebar; coordinate with `oracle.test` Plan Queue section.

## Trigger Conditions

Invoke `/planq` when Dan:
- Says "queue this idea", "add to planq", "put this in the plan queue"
- Says "promote line X to oracle" or "this idea is ready for an oracle"
- Wants to see, reorder, or clean the plan queue
- Asks "what's in the planq?" or "show me the queue"
- Opens `/planq` directly with no arguments → show current `planq.md` state

## 🗺 Workflow

### 1. ASSESS — Read current state

```bash
cat /Users/verdey/Documents/Claude/Projects/planq.md
```

Count lines, note any `#status:ripening` tags and any promoted lines (`→ oracle:<name>`). Surface as a compact status: "N ideas · M promoted · K ripening."

### 2. ACT — Mutate per command

| Command | Action |
|---------|--------|
| `add <idea>` | Append a new line to `planq.md` (bottom = lowest priority; Dan reorders manually or via drag on surface) |
| `prepend <idea>` | Insert at top of queue (highest priority) |
| `reorder` | Dan provides new order; rewrite file preserving blank-line groupings |
| `tag <line-text> #<tag>` | Append tag inline to the matching line |
| `promote <line-text>` | Invoke `sp-promote-to-oracle` ritual (see spells/) |
| `delete <line-text>` | Remove line from `planq.md`; confirm before write |
| `list` | Print current `planq.md` content, numbered, with tags rendered |

All mutations write directly to `/Users/verdey/Documents/Claude/Projects/planq.md`. No DB. No localStorage. Filesystem is truth.

### 3. SURFACE — Direct Dan to the right view

- **After any mutation:** surface the changed `planq.md` state inline (compact — just the lines, not the full file header).
- **After promotion:** surface `http://oracle.test/oracle.php?name=<name>` AND the new shard path.
- **Full surface:** `http://planq.test` (after camila.lambda) · absolute path `/Users/verdey/Documents/Claude/Projects/planq.md`.

## 🔮 Spell Dispatch

| Spell | When | What |
|-------|------|------|
| `sp-promote-to-oracle` | Dan says "promote" or an idea has `#status:ripening` | Scaffolds oracle shard, wires cross-ref, surfaces URL |

## 🎨 Voice & Style

planq is **lightweight and ephemeral** — a seedbed, not a vault. It does not carry oracle's gravity or ceremonial weight. Sparse emoji. Numbered lists. No ritual announcements. Just: here's what's in the queue, here's what changed.

- **Terse.** One-line confirmations. Inline diffs when files change.
- **Non-blocking.** Does not gate on multi-turn clarification for simple mutations.
- **Honest about the queue's ephemerality.** Ideas here are seeds; they ripen or they dissolve.

## 📋 Rules

- Filesystem is truth — `planq.md` is the single source of truth. No shadow state.
- Do NOT create oracle shards without the full promotion ritual (sp-promote-to-oracle).
- Do NOT touch `planq.md` at any path other than `/Users/verdey/Documents/Claude/Projects/planq.md`.
- Do NOT add CLI `/planq add` logic yet — Q1 from Brief B is unresolved. Direct file edit is sufficient until friction is observed.
- Oracle shard location is `~/.claude/skills/oracle/oracles/<name>-<realm>.md` — NOT `Tooling/oracle-board/oracles/<name>.md` (see sp-promote-to-oracle for rationale).
- Surface both `planq.test` URL and absolute path whenever directing Dan to the surface — never one without the other (codebase doctrine).

## Format reference

Full `planq.md` format spec → [`_src/planq-format.md`](_src/planq-format.md)

Surface contract (planq.test + oracle.test) → [`_src/surface-map.md`](_src/surface-map.md)
