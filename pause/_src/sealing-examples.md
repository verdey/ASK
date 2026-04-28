# Pause Sealing Examples — Worked Cases

---

## Example 1: Email brief body (Income portfolio context)

When `/pause` runs inside an Income/ project tree, the brief is also delivered by email. Below is a complete worked example of the email body.

**Subject:** `🌀 /pause — <project-slug> — YYYY-MM-DD HH:mm`

**To:** resolved address from roster.yaml delivery lookup (default: `daniel.greeney@gmail.com`).

**Body:**

```
🗝️ Pause sealed at <timestamp> — <project-slug>

[1-line note from /pause [note] arg, if provided]

────  IN FLIGHT  ────
[bulleted; same content as the on-disk brief's "In flight"]

────  OPEN THREADS  ────
[bulleted; loud tokens preserved verbatim — your replies fill them]

────  COMPOSTED  ────
[moves performed and #decision-pending proposals; or "Nothing — the field is clean."]

────  NEXT ACTION  ────
▶ <exact resume command>

Freshness: brief stays valid ~<window>. After that, /oracle first.

────  HOW TO REPLY  (four tiers — pick whichever fits)  ────

  Tier 1 · wu wei steazy (aspirational — full ingest lands w/ roster-switchboard)
    → Tap reply, type your fill-ins anywhere. Loud «TOKENS» get grep-replaced
      when reply-ingest is live.

  Tier 2 · structured copy-back
    → Quote-reply this email with «TOKEN»: <value> on lines, plus any of:
      approve <slug>     — green-light a #decision-pending
      snooze <duration>  — defer everything for <duration>
      resume now         — fire the next action immediately

  Tier 3 · subject-line shortcut
    → Reply with one of these as the subject and your one-line answer in body:
      Subject: /approve <slug>
      Subject: /snooze <hours>
      Subject: /resume now

  Tier 4 · dead-obvious manual  ✅ BEDROCK — NEVER FAILS
    → Open the on-disk brief in your editor:
        <project-root>/docs/sessions/_pause-YYYY-MM-DD-HHmm.md
      Edit it directly. Run the resume command at the bottom in a fresh
      Claude Code tab. This guarantees flowthrough — no auth, no parser,
      no ingest pipeline required.

      Right now (2026-04-24), Tier 4 is the actually-working path.
      Tiers 1–3 ship as the system grows. Tier 4 is the eternal guarantee.

—

🗝️ Sealed by Keeper · Income portfolio · BMIS layer 1 (briefings)
«REPLY_INGEST»  #assumption-flagged — Tiers 1–3 activate when roster-switchboard
ships (BMIS layer 2). Tier 4 always works.
```

**After send:** append a single line to the on-disk brief: `Delivered: <channel> → <handle> at <HH:MM> · message-id <id>`. If send fails, append `#blocker` with the error and continue — the on-disk brief is the durable record.

---

## Example 2: Composted block — active seal with multiple pruning moves

This shows a Composted block from a real seal with several moves in play:

```
## Composted (this seal)
- Deleted: _pause-2026-04-24-1102.md (same-day duplicate, unchanged context, no live threads)
- Archive proposal #decision-pending: _session-007-roster.md — AAR sealed; learnings live in roster.yaml
- Memory drift #decision-pending: feedback_attorney_banner.md restates CLAUDE.md §X — propose removal
- _raw/ in docs/intake: 14 files, oldest 2026-04-12; parent intake `Ali-Choucair.md` is applied → propose clear #verify-before-action
- Loud token cleared: «AMBER_MOBILE» filled in roster.yaml on 2026-04-23 — dropped from carry-forward
```

When nothing needs pruning: `## Composted (this seal)\nNothing — the field is clean.`

---

## Suggestions — future features (not in v1)

These emerged during the skill's design session. Dan to greenlight before any become real:

**1. `/resume` companion skill**
Takes the pause brief as argument, reads it, and cold-boots the right archetype automatically. Currently the user reads the brief and pastes the resume command manually. A `/resume _pause-2026-04-24-1430.md` command would do that automatically — read the brief, invoke the right council member, and pick up mid-thread.

**2. Pause registry** — `~/.claude/pause/index.md`
A running ledger of paused sessions across all projects. "What's paused across the portfolio?" becomes one command. Useful when 3 projects are mid-session across 3 different tabs and Dan needs to know what's live.

**3. `/pause diff`**
Instead of a full resume brief, emit only the delta since the last pause. For frequent short pauses in the same session. Less ceremony, same fidelity.

**4. Git auto-stash hint**
If uncommitted changes exist at pause time, Keeper flags them with a one-line stash command to run before closing the tab. Prevents "where did my changes go" on re-entry.

**5. Council-aware re-entry tone**
The Keeper reads the pause note and recommends not just the command but the specific mental posture for re-entry. "You were in Catalyst energy, mid-implementation. Re-enter in the same mode — don't switch to Teacher or you'll lose the execution thread." This would live in the "Council state" block of the resume brief.

**6. Position in the skills README**
`/pause` should appear in the council README's command table alongside `/ask`, `/seek`, `/knock`. Suggested row:
```
| `/pause` | 🗝️ Keeper | You need to stop cleanly. State preservation, handoff, cycle closure. |
```
