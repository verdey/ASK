---
name: close
description: "🚪 Close — Pre-seal readiness diagnostic. Checks git, loud tokens, oracle children, open decisions, and stalled flows. If clean: one-line confirmation. If not: per-option council routing menu, one sentence per option."
argument-hint: "[optional context: what effort is being closed]"
---

# 🚪 Close — The Threshold Check

*Stand at the door. Look back. Make sure nothing was left behind.*

---

## What this does

When you invoke `/close`, it runs five diagnostic signals against the current effort and answers: **am I done, and if not, what's the smart next move?**

Two outcomes:

1. **Clean** — one line, nothing to do.
2. **Dirty** — one-line signal summary, then a per-option routing menu. Each option is a single sentence. You pick.

`/close` does not seal. It does not write briefs. It does not decide for you. It is a mirror held up at the threshold.

---

## Diagnostic signals

Run these in order. Note every dirty signal.

| # | Signal | How to check | Dirty if… |
|---|--------|-------------|-----------|
| 1 | **Uncommitted changes** | `git status --short` (from CWD; skip gracefully if not a git repo) | any output |
| 2 | **Loud tokens / open questions** | scan current conversation thread | `«TOKEN»` present, unanswered question, unfilled assumption chip |
| 3 | **Live oracle children** | read `~/.claude/skills/oracle/oracles.md` if it exists | any active oracle for this project with children not marked `✓ shipped` |
| 4 | **Open surface decisions** | check `Tooling/decision-queue/` for unresolved entries (files without a `resolved:` frontmatter field) | any unresolved decision file |
| 5 | **Stalled flows** | `curl -s 'http://alpha.test/api.php?action=queue' 2>/dev/null` | any entry with state `running` or `stalled` older than 10 minutes |

**Skip signals gracefully** — if a check errors (no git repo, no oracle file, api.php unreachable), omit that signal from both the summary and the option menu. Never surface a check error as a dirty signal.

---

## Output when CLEAN

All five signals clear:

```
✅ All clear. Nothing staged, nothing stalled, nothing open.
   Ready to seal → /pause seal
```

No further output. No file written.

---

## Output when DIRTY

Lead with a one-line signal summary, then the option menu. Show only options that are contextually relevant to the dirty signals found.

```
🔍 [signal summary — e.g. "3 uncommitted files · 1 open oracle child"]

Your smartest next moves:
```

Then one line per relevant option, in priority order:

| Option | Show when | One-liner |
|--------|-----------|-----------|
| `commit-commands:commit-push-pr` | uncommitted changes present | Ship what's staged; the work is shippable, just needs a commit and a push. |
| `/oracle` | open oracle children OR loud tokens / unresolved scope | Shape what's unresolved into a scoped brief before any code moves. |
| `/surface` | exactly one open decision in the decision queue | Crystallize the single open decision into a persistent, resolvable asset at decisions.test. |
| `/pause seal` | effort appears complete despite dirty signals | Close the chapter cleanly; write a cold-boot brief that names the first move of the next phase. |
| `/pause` | mid-effort, not chapter-complete | Suspend mid-effort with full context preserved; resume exactly here in a fresh tab. |
| `/triage` | stalled flows OR unclear what matters most | Surface today's highest-signal codebase move before committing to a direction. |

**Formatting rules:**
- Prefix each option with its skill's native emoji (🔥 knock, 🗝️ pause, 🔮 oracle, 🌊📌 surface, 📋 triage, 🔥⚡ commit).
- Align the option names in a monospace column for scannability.
- Never show more than 4 options. If more than 4 would be relevant, pick the 4 highest signal.
- No explanation beyond the one-liner. The user can invoke the skill to go deeper.

**Example dirty output:**

```
🔍 3 uncommitted files · 1 open oracle child

Your smartest next moves:

  🔥⚡ commit-commands:commit-push-pr  — Ship what's staged; the work is shippable, just needs a commit and a push.
  🔮  /oracle                          — Shape what's unresolved into a scoped brief before any code moves.
  🗝️  /pause seal                      — Close the chapter cleanly; write a cold-boot brief that names the first move of the next phase.
```

---

## Voice & persona

- **Archetype:** The Threshold Keeper — stands at the door between effort and rest, checks that nothing was left behind before the door closes.
- **Tone:** Calm, direct, zero fluff. One sentence per option. No spiritual register outside this file.
- **What this skill is not:** Not a scoper. Not a sealer. Not a brief-writer. It looks and points. The user acts.

---

## Rules

- **Never write files.** `/close` is read-only over the codebase. It produces only terminal output.
- **Never invoke other skills.** Name them; the user invokes.
- **Skip gracefully on errors.** A failed check is silence, not a dirty signal.
- **One sentence per option.** No elaboration. If the user wants more, they invoke the skill.
- **Four options max.** Prioritize by signal strength.
- **Clean output is one line.** No preamble, no explanation — just the confirmation and the ready-to-seal shortcut.
