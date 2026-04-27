# Council Map — vessels → skills

The council is a 3×3 mandala. Each triad has a **demiurge** (lead) plus two **advisors**. Skills embody one or more vessels.

| Triad | Lead (demiurge) | Solar advisor | Lunar advisor | Embodied by |
|-------|-----------------|----------------|----------------|-------------|
| 🧠 Mind / Ask | 📚 Teacher | 📐 Architect | 👁️ Visionary | `/ask` |
| 💜 Heart / Seek | 🎵 Harmonizer | ⚔️ Warrior | ✨ Healer | `/seek` |
| 🔥 Hand / Knock | ⚡ Catalyst | 🜃 Alchemist | 🗝️ Keeper | `/knock`, `/pause` (Keeper-solo) |

**Above the triads:** 🔮 **Oracle** — PM/orchestrator. Plans, scopes, hands off; never codes.

**Sovereign supports** (not vessels, but council-adjacent):

| Skill | Role |
|-------|------|
| `/flow` | LOB knowledge curator — read-only over LOBs, mutates own knowledge base. Sister-of-the-curator to `/skillz`. |
| `/parallel` | Script bank dispatcher — runs LLM scripts in parallel. |
| `/skillz` | Council librarian — this skill. Knows the whole council, audits build-vs-adopt, prunes drift. |

**Plugin/utility skills** (not vessels):

| Skill | Role |
|-------|------|
| `/loop`, `/schedule`, `anthropic-skills:schedule` | Time/recurrence — recurring tasks, scheduled remote agents. |
| `/simplify`, `/init`, `/review`, `/security-review` | Code-quality utilities — review and refine. |
| `/claude-api` | Anthropic SDK best practices. |
| `/update-config`, `/keybindings-help`, `/fewer-permission-prompts` | Harness configuration. |
| `commit-commands:*` | Git commits, push, PR, branch cleanup. |
| `anthropic-skills:skill-creator` | Authors / edits / evaluates skills. **The forge** — `/skillz` recommends this when a new skill is the right answer. |
| `anthropic-skills:consolidate-memory` | Reflective pass over memory files. |
| `anthropic-skills:pdf|docx|xlsx|pptx` | Document I/O. |
| `frontend-design:frontend-design` | Distinctive frontend code. |
| `supabase:*` | Supabase products + Postgres best practices. |

## Routing intuition (used by `/skillz audit`)

- **Plan / scope / "what's the shape of this?"** → 🔮 `/oracle`
- **Understand / design / docs / mapping territory** → 🧠 `/ask`
- **Align / tune / security audit / tech debt** → 💜 `/seek`
- **Build / ship / refactor / commit** → 🔥 `/knock`
- **Seal / handoff / cold-boot brief** → 🗝️ `/pause`
- **Recurring / scheduled** → `/loop` or `/schedule`
- **Code review / cleanup** → `/simplify`, `/review`, `/security-review`
- **Documents (pdf/docx/xlsx/pptx)** → `anthropic-skills:*`
- **Anthropic SDK code** → `/claude-api`
- **Postgres / Supabase** → `supabase:*`
- **Frontend UI** → `frontend-design:*`
- **Git commit + push + PR** → `commit-commands:*`
- **Birth a new skill** → `anthropic-skills:skill-creator`
