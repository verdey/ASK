# Flow — Tools Register

> Curated catalogue of bash/scripts that offload long-form file munging from LLMs. Streamline mode draws from this register; new entries are added when Dan accepts a Streamline recommendation that wasn't already here.
>
> **Operating principle:** if a step's prompt asks an LLM to do CSV cleaning, JSON reshaping, regex extraction across many files, format conversion, or bulk find-and-replace, that's a bug. Replace it with a deterministic tool. The LLM is for judgment; the tool is for transformation.

---

## How to read an entry

Each entry carries:
- **Tool** — the binary or pattern
- **Trigger** — the LLM-task signature that should reach for this tool instead
- **Example** — a one-line invocation
- **Use instead of an LLM when…** — the threshold where the LLM should hand off

---

## Flow execution

### `run-flow` — Python CLI walking any `_flow-blueprint`-shaped flow via the OpenRouter (Claude-compatible) API

- **Trigger:** "walk this flow," "execute the LOB pipeline," "smoke-test a flow's format," "run the runner against `<path>`," any context where Dan wants the LLM to step through a flow's `processes/` rather than hand-walking. Yin-yang to `/flow` itself: `/flow` reads/audits/curates; `run-flow` executes.
- **Example:** `~/Documents/Claude/Projects/Tooling/flow-runner-llm/bin/run-flow <flow-path> --dry-run` (smoke); `run-flow <flow-path> --ModelRequest mid --extraprompts 'focus on X'` (real).
- **Use instead of an LLM-in-chat when…** the same flow will be walked >3 times, OR the flow has ≥4 stages (manual prompt-by-prompt becomes friction), OR you need an audit log per run. The runner appends one JSONL line per step to `<flow-root>/_audit/runs.jsonl` — `/flow audit`'s "step self-logging present?" check is satisfied automatically.
- **Self-improvement seam:** the runner emits `_suggestions/YYYY-MM-DD-<slug>.md` for any structural gaps it finds during a walk. Honor `_core/` lockout: never edit `_core/system-prompt.md` or `_core/model-aliases.yaml` directly — the runner refuses, route through suggestions instead.
- **Install:** `~/Documents/Claude/Projects/Tooling/flow-runner-llm/bin/run-flow` (already on disk; symlink to `~/bin/` planned at runner's stage 0800-package).

### Meta-flow over the runner: `Tooling/flow-runner-llm/_meta-flow/`

- **Trigger:** "is the runner healthy?," "audit the runner's quality," "what should we improve in `flow-runner-llm`?" The seven-stage state→quality→improvement loop scaffolded 2026-04-28 walks observe → score → diagnose → propose → apply-or-route → verify → log-and-aar.
- **Example:** `run-flow ~/Documents/Claude/Projects/Tooling/flow-runner-llm/_meta-flow` (the runner walks its own meta-flow — eat-our-own-dogfood by design).
- **Use instead of an LLM-in-chat when…** a runner regression is suspected, the `_suggestions/` backlog has grown unreviewed, or the scorecard hasn't been refreshed in >2 weeks.
- **Honors `_core/` lockout:** stage 0500 routes any `_core/`-targeting fix to `_suggestions/` instead of applying.

---

## Flow SCRIPT-runtime CLIs

> These are thin Python wrappers invoked via `**Runtime:** SCRIPT` step declarations. The runner shells out to them via `subprocess.run`; they return exit 0/non-zero and write artifacts to disk. Stdlib-only or venv-isolated — no LLM tokens.

### `build-omega.py` — compose + assemble omega `index.html`

- **Path:** `Tooling/flow-omega-author/bin/build-omega.py`
- **Subcommands:** `compose` (renders mechanical HTML fragments from `walk.json` + `recipe.json`), `assemble` (combines template + Pico CSS + 5 fragments into final `index.html`).
- **Runtime:** Python 3 stdlib only (no deps). ~210 LOC.
- **Used by:** `Tooling/flow-omega-author/processes/0400-compose-mechanical/instructions.md` and `0420-assemble-omega/instructions.md`.
- **Provenance:** authored by `aurora.andromeda` (S1-heal Wave 0, 2026-04-28) per `_flow-blueprint/processes/0600-render-index-html/instructions.md` Phase C prescription.

### `harvest-capture.py` — thin SCRIPT wrapper for MHTML page capture

- **Path:** `Tooling/harvester-runtime/bin/harvest-capture.py`
- **Args:** `--url <URL> --output <path> --wait <ms>` (optional).
- **Output:** writes MHTML to `--output`; emits `{"path": "...", "sha256": "..."}` JSON to stdout. Exit 0 on success, non-zero on failure.
- **Runtime:** requires `harvester-runtime` venv (Playwright wired; see `Tooling/harvester-runtime/`). ~38 LOC.
- **Used by:** `Tooling/harvester-runtime/processes/0400-capture/instructions.md`.
- **When to reach for it:** any SCRIPT-runtime step that needs to snapshot a live URL as MHTML without LLM tokens. The LLM authors the capture strategy; this script executes it deterministically.
- **Provenance:** carmen.square (Arc-2 W4, commit `88bb3b8`, 2026-04-28).

### `harvest-recall.py` — thin SCRIPT wrapper for pattern-match recall

- **Path:** `Tooling/harvester-runtime/bin/harvest-recall.py`
- **Args:** `--patterns <glob> --fail-patterns <glob> --page-class <class> --min-confidence <0-1>`.
- **Output:** writes an `observe` event to `_audit/runs.jsonl`. Exits 0 on miss (no match, continue flow), non-zero on hit (halt or branch).
- **Runtime:** requires `harvester-runtime` venv. ~36 LOC.
- **Used by:** `Tooling/harvester-runtime/processes/0100-recall/instructions.md`.
- **When to reach for it:** recall step that needs to check a prior capture's patterns against known-good or known-bad signatures before the LLM interprets the content.
- **Provenance:** carmen.square (Arc-2 W4, commit `88bb3b8`, 2026-04-28).

---

## YAML

### `yq` (mikefarah, Go) — YAML as JSON

- **Trigger:** any LLM or hand-rolled script asked to parse YAML config.
- **Example:** `yq -o=json '.' registry.yaml | jq '.include_kinds'`
- **Use instead of an LLM when…** the YAML is **declarative config** (knobs the operator hand-edits), not authored prose. `yq` is a single Go binary; once it's on the system, every flow's config-reading step gets simpler.

### Anti-pattern: don't hand-roll a YAML parser

- **Trigger:** "I'll just write 30 lines of Python to parse this little YAML." You won't.
- **Example earned the hard way:** [`flows_deals/processes/0020-curate-registry/curate.sh`](file:///Users/verdey/Documents/Claude/Projects/Live/flows_deals/processes/0020-curate-registry/curate.sh) initial implementation lost `include_kinds` and `section_order` to a recursive-descent bug; cost one full debug cycle. The fix was a peek-ahead heuristic, but the real fix is `yq`.
- **Use this register entry as a tripwire** — if a Streamline pass spots a hand-rolled YAML parser anywhere in a flow, propose the `yq` swap.

---

## JSON

### `jq` — JSON reshape, filter, aggregate

- **Trigger:** "extract field X from this JSON," "reshape this JSON array," "filter records where Y," "aggregate by Z."
- **Example:** `jq '.deals | map(select(.status == "live")) | group_by(.county) | map({county: .[0].county, count: length})' deals.json`
- **Use instead of an LLM when…** the input is more than ~50 lines of JSON, OR the transformation is purely structural (no judgment about content).

### `gron` — flatten JSON to greppable lines

- **Trigger:** "find every place this key appears in a deeply nested JSON," "diff two JSON files semantically."
- **Example:** `gron deals.json | grep '\.status =' | gron --ungron`
- **Use instead of an LLM when…** the LLM is being asked to *hunt* through nested structure rather than *interpret* it.

---

## CSV / TSV

### `csvkit` (`csvcut`, `csvgrep`, `csvjoin`, `csvstat`, `csvsql`) — tabular swiss-army

- **Trigger:** "select these columns," "filter rows where county = X," "join these two CSVs," "compute summary stats."
- **Example:** `csvcut -c address,county,acreage deals.csv | csvgrep -c county -m "Wise" | csvstat`
- **Use instead of an LLM when…** the input is a real CSV (>100 rows) and the transformation is column/row arithmetic, not interpretation.

### `xsv` — fast CSV (Rust, much faster than csvkit on large files)

- **Trigger:** same as csvkit but the file is >50 MB and speed matters.
- **Example:** `xsv search -s county "Wise" deals.csv | xsv select address,acreage,price`
- **Use instead of an LLM when…** you would have used csvkit but the file is too large to fit comfortably in an LLM context window.

### `miller` (`mlr`) — name-indexed CSV/TSV/JSONL

- **Trigger:** "do this transformation but without remembering column positions," "convert between csv/tsv/jsonl."
- **Example:** `mlr --c2j cat deals.csv` (CSV → JSONL); `mlr --csv put '$density = $price / $acreage' deals.csv`
- **Use instead of an LLM when…** the transformation needs *named* column reference and the file format may switch.

---

## Text extraction

### `rg` (ripgrep) — regex search across many files

- **Trigger:** "find every place X appears across this directory," "list all files that contain pattern Y."
- **Example:** `rg -l '#needs-human-input' Income/` (list files with the hashtag)
- **Use instead of an LLM when…** the LLM is being asked to *search*, not *interpret*. Even regex extraction with `-o` is faster than asking an LLM to scan.

### `awk` — column-oriented text munging

- **Trigger:** "extract column N," "compute a sum from these rows," "split this log file by field."
- **Example:** `awk -F',' '$3 > 100 {print $1}' deals.csv` (print col 1 where col 3 > 100)
- **Use instead of an LLM when…** the input is line-oriented with predictable field structure.

### `sed` — line-level transform

- **Trigger:** "rename this token throughout the file," "delete every line matching X," "wrap matched lines with Y."
- **Example:** `sed -i '' 's/«LOB_NAME»/Wholesaling/g' CLAUDE.md`
- **Use instead of an LLM when…** the transform is a deterministic substitution and the LLM has no judgment to add.

---

## File-walking and bulk ops

### `find` — locate files by attributes

- **Trigger:** "find every `step.md` under processes/," "list dirs modified in the last 7 days."
- **Example:** `find processes/ -name 'step.md' -type f`
- **Use instead of an LLM when…** the criteria is purely metadata (name, mtime, size, depth).

### `xargs -P` — parallelize bulk ops

- **Trigger:** "run this command on every file in a tree," "scale up an embarrassingly-parallel transform."
- **Example:** `find . -name '*.md' -print0 | xargs -0 -P8 -I{} pandoc -o {}.html {}` (parallel md→html)
- **Use instead of an LLM when…** the per-file op is deterministic and the LLM would be repeating itself N times.

### `fd` — modern `find` (faster, friendlier syntax)

- **Trigger:** same as find but you want gitignore-respecting walk by default.
- **Example:** `fd -e md . processes/`

### `find -print0 | python3 -c '…JSONL…'` — file-tree classify pattern

- **Trigger:** "walk a directory, classify each file by path-pattern, emit one record per file."
- **Example:** see [`flows_deals/processes/0010-discover/discover.sh`](file:///Users/verdey/Documents/Claude/Projects/Live/flows_deals/processes/0010-discover/discover.sh) — `find -print0` then a 6-line Python `json.dumps` per record. Bash handles the walk + path-glob classification; Python handles the JSON-safe emission.
- **Use instead of an LLM when…** the classifier is path-pattern only (no content reading). Anything content-aware should still pass through the LLM (or a parser) downstream.

---

## HTML extraction

### `pup` — CSS-selector HTML extraction (Go binary)

- **Trigger:** "extract `<body>` from this HTML," "pull all `<a href>`s from a page," "get the inner HTML of an element by selector."
- **Example:** `pup 'body' < source.html` (body element); `pup 'a attr{href}' < page.html` (every link href, one per line)
- **Use instead of an LLM when…** the task is structural transformation on HTML, not interpretation. Single Go binary, matches the `yq`/`jq` ethos. **Earned the hard way:** [`flows_deals/processes/0030-stitch/stitch.py`](file:///Users/verdey/Documents/Claude/Projects/Live/flows_deals/processes/0030-stitch/stitch.py) initially hand-rolled a `html.parser.HTMLParser` subclass (`BodyExtractor`) for body extraction; Wave 2 of mariela's arc retired it for `pup`. Per the doctrine: *don't subclass `html.parser.HTMLParser` for structural work — that's a `pup` job, not a Claude job.* Note: `pup 'body'` emits `<body>...</body>` including the wrapper; strip it in Python with `re.sub(r'^<body[^>]*>\s*', '', ...)`.
- **Install:** `go install github.com/ericchiang/pup@latest` (not in Homebrew core; binary lands at `$(go env GOPATH)/bin/pup`).

---

## Format conversion

### `pandoc` — universal document converter

- **Trigger:** "convert this markdown to HTML/PDF/docx," "extract text from this docx."
- **Use instead of an LLM when…** the conversion is structural; the LLM should only run for content judgments (e.g., simplifying wording).

### `markdown-it` (CLI) or hand-rolled inline renderer — for the `index.html` embedded-md viewer

- **Trigger:** building a `processes/<step>/index.html` per `flow.md` §1.1.1.
- **Example:** `_flow-blueprint/processes/0600-render-index-html/instructions.md` carries the canonical hand-rolled ~50-line renderer (the omega step).
- **Use instead of an LLM when…** the viewer is structural — never call an LLM to render markdown that has a deterministic renderer available.

---

## Hashing and deduping

### `sha256sum` / `shasum -a 256` — content fingerprint

- **Trigger:** "is this file already in the harvest?," "detect content drift between two versions."
- **Example:** `find docs/intake/_raw -type f -exec shasum -a 256 {} \; | sort | uniq -d -w64`
- **Use instead of an LLM when…** the question is *did this content change* — never ask an LLM to compare two long strings byte-for-byte.

### `sort | uniq` — dedup line-oriented data

- **Trigger:** "remove duplicate addresses from this list," "find lines that appear more than once."
- **Example:** `sort addresses.txt | uniq -c | sort -rn` (count + sort by frequency)

---

## Diff

### `diff` / `delta` — file comparison

- **Trigger:** "what changed between these two versions?"
- **Example:** `delta old.md new.md` (delta = nicer rendering of `git diff`)
- **Use instead of an LLM when…** the question is *what literally changed*, not *what does the change mean*.

### `git log -p -- <path>` — content history

- **Trigger:** "when did X get added to this file?"
- **Example:** `git log -p -- Income/docs/flow.md | rg '§1.1.1'`

---

## When *to* keep the LLM in the loop

This register is for offload, not LLM-erasure. Keep the LLM when:

- The task requires **judgment about content** (is this listing actually a 50-acre parcel?)
- The task involves **synthesis across heterogeneous inputs** (interview transcript + scraped HTML + Dan's seed note)
- The task needs **voice** or **brand discretion** (rewriting a cold message in Dan's voice)
- The transformation is **one-off and ambiguous** — a script would take longer to write than the LLM would take to do it twice

The decision rule: *if the same transformation will run more than 3 times, or on more than 100 items, write the tool.* Below that, the LLM is fine.

---

## How this register grows

- **Streamline auto-proposes additions.** When `/flow streamline` recommends an offload not in this register, and Dan accepts, the recommendation is appended here (with the originating flow path noted).
- **Curate captures meta-lessons.** When Dan notices a pattern *about* offloading itself ("anything CSV-shaped that arrives in `intake/_raw/` should be csvstat'd before any LLM touches it"), `/flow curate` records it in `lessons.md` and may propose an edit to this register's introduction.
- **Pruning happens when a tool is replaced.** If `xsv` replaces `csvkit` for all real-world flows, the demoted tool stays here with a note ("retained for completeness; prefer xsv when file >50MB").
