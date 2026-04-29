# Migrations — Index

Each entry is a sealed record of a completed migration. New migrations: author the entry after the AAR is sealed (🗝️ Keeper seals; 🗺️ Miguel records).

## Audits & pre-migration maps

| Entry | Date | Scope | Notes |
|-------|------|-------|-------|
| [nested-repo-audit](_nested-repo-audit-2026-04-28.md) | 2026-04-28 | `Finance/Income/Flows/LOBs/` nested git topology | Mapping only — 8-item /knock execution table; ILDS + wholesaling as orphaned gitlinks |

## Completed migrations

| Entry | Date | Source | Destination | Notes |
|-------|------|--------|-------------|-------|
| [kingdom-merge](_kingdom-merge-2026-04-27.md) | 2026-04-27 | `~/code/` | `~/Documents/Claude/Projects/` | 50+ projects, 6 families, 31 hashes |

---

## Migration entry format

Use this template for each new entry. File name: `_<slug>-<YYYY-MM-DD>.md`.

```markdown
# <Name> Migration — <YYYY-MM-DD>

> **Sealed:** <date> · **Oracle:** <name> · **Realm:** <realm> · **Wave:** <wave>

## Coordinates
- Source:
- Destination:
- Date:
- Scale: (projects, families, hashes)
- Session brief: (path to knock brief)

## Decomposition
- Tabs used: (Catalyst / Alchemist / Keeper or subset)
- Rationale:

## Source → Destination Map
(table)

## Verification surface
(table: surface / count / status)

## Gotchas encountered
(numbered list — each one feeds back into SKILL.md hazard table if new)

## What worked
(bullet list)

## What to do differently next time
(bullet list)

## Open items left for human
(table: item / status)

## Git state
(branch, commit hashes, repo state)
```
