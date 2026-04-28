# Override Grammar

**Location:** `Council/ASK/_shared/override-grammar.md`
**Canonical path:** `/Users/verdey/Documents/Claude/Projects/Council/ASK/_shared/override-grammar.md`
**Used by:** `genius-mode-protocol.md` (the decision shape), `bin/echo-log` (the persistence layer)

---

## What this is

The parser contract for Dan's reply syntax when responding to a genius-mode `[DECISION]` block. Every council voice that surfaces a decision must honor this grammar. The grammar is also the wire format that `bin/echo-log` reads to persist override choices to `Tooling/echo/_data/overrides.jsonl`.

One grammar, parsed consistently — so a one-liner like `3-c: simpler` works the same way whether the decision came from `/oracle`, `/ask`, or `/knock`.

---

## Token definitions

| Dan types | Token name | Meaning |
|-----------|-----------|---------|
| `✓` | accept-all | Accept all recommendations as-is |
| *(empty reply / blank line)* | accept-all | Same as `✓` |
| `<n>-<letter>` | swap | In recommendation block `n`, swap to option `<letter>` |
| `<n>-skip` | drop | Drop recommendation `n` entirely; do not execute |
| `<n>-<letter>: <annotation>` | swap+annotate | Swap to `<letter>` in block `n`, note the reason |
| `<tokens> ; <tokens>` | multi | Chain multiple override tokens with `;` separator |

**`n`:** 1-based integer — the recommendation number as it appears in the `[DECISION]` block's `**Alternatives (ranked):**` list.

**`<letter>`:** lower-case letter (a–z) matching an alternative's label in the block. The recommended option is always labeled by its position identifier from the block (e.g., the skill passes `D1`, `D2`, `D3`; the letter maps to `a`, `b`, `c` positionally, or to the explicit tag used in the block — see "Label resolution" below).

**`<annotation>`:** free text after the `:` and a single space. Consumed verbatim by `bin/echo-log`. No quoting required.

---

## Label resolution

The `[DECISION]` block's alternatives are labeled by the skill. Two conventions are valid:

**Positional (most common):** alternatives listed 1, 2, 3 in order → override letters a, b, c map positionally.

```
Alternatives:
1. Option A  →  letter = a
2. Option B  →  letter = b
3. Option C  →  letter = c
```

**Explicit label (oracle-style):** when the oracle assigns codes like `D1/D2/D3`, the override letter maps to the code's trailing digit or letter.

```
Alternatives:
1. D1: real-LOB now    →  letter = d1 (or just "1" if shorthand used)
2. D2: self-canary     →  letter = d2 (or "2")
```

Whichever convention the skill uses, it must document it in the `[DECISION]` block's `**Override:**` line. The parser (human or `bin/echo-log`) reads that line to resolve labels.

---

## Regex spec

For programmatic parsing (e.g., in `bin/echo-log` or a future echo flow):

```
# Single token
ACCEPT  = /^[✓✔]$|^$/
SWAP    = /^(\d+)-([a-z][a-z0-9]*)$/
DROP    = /^(\d+)-skip$/
ANNOTATED = /^(\d+)-([a-z][a-z0-9]*):\s+(.+)$/

# Multi token (split on ' ; ' before applying above)
MULTI_SEP = /\s*;\s*/
```

Matching priority: try `ACCEPT`, then `ANNOTATED`, then `DROP`, then `SWAP`. An unrecognized token is treated as `accept-all` with a parse-error note logged.

---

## Worked examples

**Example 1 — accept all**
Dan types: `✓`
Meaning: Accept every recommendation in the `[DECISION]` block as-is.
`echo-log` call: `echo-log --skill oracle --rec ALL --override "accept" --annotation ""`

---

**Example 2 — single swap**
Dan types: `2-b`
Meaning: In recommendation block 2, swap to option B.
`echo-log` call: `echo-log --skill oracle --rec 2 --override "b"`

---

**Example 3 — swap with annotation**
Dan types: `3-c: simpler`
Meaning: In block 3, swap to option C; reason is "simpler."
`echo-log` call: `echo-log --skill oracle --rec 3 --override "c" --annotation "simpler"`

---

**Example 4 — drop**
Dan types: `1-skip`
Meaning: Drop recommendation 1 entirely; do not execute it.
`echo-log` call: `echo-log --skill oracle --rec 1 --override "skip"`

---

**Example 5 — multi**
Dan types: `1-b; 3-skip`
Meaning: In block 1, swap to B. AND drop block 3.
`echo-log` calls (two sequential):
```bash
echo-log --skill oracle --rec 1 --override "b"
echo-log --skill oracle --rec 3 --override "skip"
```

---

## What the `bin/echo-log` call produces

Each override call appends one JSON line to `Tooling/echo/_data/overrides.jsonl`:

```json
{
  "ts": "2026-04-28T21:00:00-04:00",
  "skill": "oracle",
  "recommendation": "2",
  "override_code": "b",
  "annotation": "simpler",
  "accepted_alternatives": []
}
```

Schema fields:

| Field | Type | Notes |
|-------|------|-------|
| `ts` | ISO 8601 string | Wall clock at time of call |
| `skill` | string | `--skill` argument |
| `recommendation` | string | `--rec` argument; `"ALL"` for accept-all |
| `override_code` | string | `--override` argument: a–z letter, `"skip"`, or `"accept"` |
| `annotation` | string | `--annotation` argument; empty string if omitted |
| `accepted_alternatives` | array | Reserved for Wave 4 (echo flow) — always `[]` from this helper |

---

## Behavioral contract for skills

Every skill that surfaces a `[DECISION]` block:

1. **Must include an `**Override:**` line** at the end of the block documenting the grammar for that specific decision.
2. **Must not re-parse the grammar** — delegate to `bin/echo-log` for persistence. The skill's job is to recognize the input token and act on it; logging is the helper's job.
3. **Must honor `accept-all` (empty reply)** — if Dan does not reply with an explicit override, treat as full acceptance. Do not prompt again.
4. **Must treat `<n>-skip` as "do not execute"** — not "ask again." A skipped recommendation is retired, not deferred.

---

*Authored by `aurora.gemini` · Wave 0 · 2026-04-28 · Sonnet 4.6*
