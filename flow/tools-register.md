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

---

## Format conversion

### `pandoc` — universal document converter

- **Trigger:** "convert this markdown to HTML/PDF/docx," "extract text from this docx."
- **Example:** `pandoc init.md -o init.html --standalone --metadata title="LOB Init"`
- **Use instead of an LLM when…** the conversion is structural; the LLM should only run for content judgments (e.g., simplifying wording).

### `markdown-it` (CLI) or hand-rolled inline renderer — for the `index.html` embedded-md viewer

- **Trigger:** building a `processes/<step>/index.html` per `flow.md` §1.1.1.
- **Example:** `_flow-blueprint/processes/0200-render-index-html/instructions.md` carries the canonical hand-rolled ~50-line renderer.
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
