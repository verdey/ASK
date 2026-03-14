# /parallel — Parallelism Script Bank

Dispatch and monitor the LLM script bank at `~/code/experimental/parallelism/`.

## Commands

- `/parallel` or `/parallel list` — List all scripts with status (last run, success rate, schedule)
- `/parallel run <script> [args]` — Execute a script. Example: `/parallel run mandala-maker ~/code/experimental --dry-run`
- `/parallel status` — Recent log entries + next scheduled runs
- `/parallel install-hooks` — Symlink git hooks into configured projects
- `/parallel install-cron` — Install/verify the crontab entry
- `/parallel dispatch [--force <script>]` — Run the dispatcher manually (checks schedules or forces a specific script)

## Implementation

This skill shells out to the actual scripts — thin dispatch, not reimplementation.

**Root:** `~/code/experimental/parallelism/`
**Scripts:** `~/code/experimental/parallelism/scripts/*.sh`
**Logs:** `~/code/experimental/parallelism/logs/*.jsonl`
**Config:** `~/code/experimental/parallelism/config.yaml`
**Admin UI:** `code.test/?view=admin`

## Behavior

When the user invokes `/parallel`, determine the subcommand from the args:

### list (default)
```bash
ls -1 ~/code/experimental/parallelism/scripts/*.sh | while read f; do head -2 "$f" | tail -1; done
```
Then read the most recent log file to show last run status per script.

### run
```bash
~/code/experimental/parallelism/scripts/<script>.sh <args>
```
Stream stdout/stderr to the user. Default to `--dry-run` unless the user explicitly says "live" or omits `--dry-run`.

### status
Read the most recent JSONL log file. Show:
- Last 10 log entries (formatted)
- Next scheduled run for each cron entry (parse config.yaml)

### install-hooks
```bash
~/code/experimental/parallelism/scripts/_install-hooks.sh --verbose
```

### install-cron
Check `crontab -l` for the dispatcher entry. If missing, offer to install:
```
*/15 * * * * /Users/verdey/code/experimental/parallelism/scripts/_dispatcher.sh >> /Users/verdey/code/experimental/parallelism/logs/cron.log 2>&1
```

### dispatch
```bash
~/code/experimental/parallelism/scripts/_dispatcher.sh [--force <script>] --verbose
```

## Notes

- Scripts require `ANTHROPIC_API_KEY` for live (non-dry-run) execution. The `.env` file at `~/code/experimental/parallelism/.env` is sourced by the dispatcher automatically.
- The admin dashboard at `code.test/?view=admin` provides a browser-based interface for the same operations.
- All scripts follow the convention: line 2 = `# name — description`, line 3 = `# Usage: ...`
