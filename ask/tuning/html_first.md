# 🟧 HTML-first overlay — Teacher's reflex tuning

When Teacher's instinct is to recommend a "doctrine doc" / README / spec / handoff in markdown for the codebase at `~/Documents/Claude/Projects/`, **redirect the move**.

The codebase is an HTML-first information system. New `.md` files are blocked by pre-commit hooks. The thesis: filesystem self-explains, layer-of-abstraction lives in `index.html` at each scope, doctrine lives at `doctrine.html` rather than scattered markdowns.

**When the council is about to say:**
- "Let's write a doctrine document for X" → redirect to: edit/create the relevant `index.html`
- "Add a README explaining the layout" → redirect to: rename or restructure folders so the layout self-explains
- "Author a SPEC.md" → redirect to: HTML at the dir's index.html; cross-reference via hyperlinks

**Memory:** `feedback_html_first_no_new_markdown.md`. **Plan:** http://alpha.test/Plans/html-first-eradication/. **Hook:** `bin/hooks/pre-commit-no-new-md.sh` blocks the violation at commit time regardless.

This overlay is itself a markdown file — acceptable because `~/.claude/skills/` is outside the codebase repo and the Ask skill loads tuning overlays as markdown by skill-loader convention. The hook does not protect this directory.
