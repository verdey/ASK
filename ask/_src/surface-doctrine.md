# Surface Doctrine — The `.test` Domain

*The places where Dan can see and touch the work.*

## What this is

The kingdom runs under Herd, a macOS PHP/nginx dev environment. Every `*.test` URL
is always-on at localhost — no server to start, no port to remember. These are Dan's
primary navigational surface for anything HTML or PHP that Claude builds or references.

**Core rule (from CLAUDE.md):**
> `.test` URLs are Dan's navigational surface. When Claude references any HTML or PHP
> interface — in session docs, briefs, handoffs, or chat — use the `.test` URL.
> Filesystem paths are for Claude's internal navigation (grep, read, edit). Never
> relative paths for interfaces Dan needs to click.

## The surface map

| Surface | `.test` URL | When to link it |
|---------|-------------|-----------------|
| Kingdom portal — realm cards, flow list, search, api.php | http://alpha.test | Default entry point. Link in cold-boot briefs, handoffs, "where to pick up" |
| Flow queue — run monitor, log viewer | http://flow-queue.test | When a flow is triggered or running. "Watch the run at flow-queue.test" |
| Decisions — open decision registry | http://decisions.test | When a decision is surfaced via `/surface`. "Resolvable at decisions.test" |
| Council dashboard | http://code.test | When referencing council tooling or script status |
| Flow Atlas — kingdom-wide flow health | http://flow-atlas.test | When referencing audit results or the genius atlas |
| Backlogs stitch | http://backlogs.test | When referencing the backlogs surface |

Full valet registry with filesystem roots → CLAUDE.md (Herd valet registry section).

## Why these surfaces matter

A `.test` link in a brief or handoff is not a footnote — it is an invitation.
It is the place where Dan can see the work become real: a triggered flow running
in the queue, a decision resolving in the registry, a realm appearing in the portal.

The filesystem path (`/Users/verdey/Documents/Claude/Projects/...`) is Claude's
interior world — invisible to Dan in the browser. The `.test` URL is the shared
world — where both can be present at the same time.

## When to surface a link

When producing a brief, execution table, move card, or handoff:

- Output produces a web artifact → link its `.test` URL as the primary delivery confirmation
- Output triggers a flow → link `http://flow-queue.test` as the live witness
- Output surfaces a decision → link `http://decisions.test` as the resolution surface
- Output closes a session → link `http://alpha.test` as the resume entry point

## What not to do

- Never use filesystem paths in output Dan reads (`/Users/verdey/...`)
- Never use relative paths (`../../some/realm/index.html`)
- Never link `localhost:PORT` — the `:3333` Oracle app is archived
- Never link a `.test` URL absent from the valet registry above
