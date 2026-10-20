# Skill Lifecycle — Disable / Scope / Retire

Last reviewed: 2026-09-18. The per-engine mechanisms in the Disable table are vendor facts; each row
names the `docs/official-sources.json` id it was verified against — re-check there before acting.

Three operations that all make a skill stop appearing, with three different mechanisms.
Picking the wrong one either drifts from the registry or destroys something meant to be kept.
Decide by asking **why** it should stop.

| Why | Operation | Mechanism | Reversal |
|---|---|---|---|
| "I don't use it right now" | **Disable** | Keep the registry entry and its links; turn it off per engine | Undo that one entry/move |
| "It cannot work on that engine" | **Scope** | `kuma skill install … --engines a,b` or `--exclude-engines a,b` — an engine left out gets no link | Reinstall without the flag |
| "It should not exist" | **Retire** | `SKILL.md` → *Retiring Or Renaming Artifacts* checklist | Git history |

## Disable — per-engine, never the registry

| Engine | Mechanism |
|---|---|
| Claude Code (`anthropic-claude-settings`, verified 2026-09-17) | `skillOverrides` has four states — `"on"`, `"name-only"` (collapses to name to save listing budget), `"user-invocable-only"` (hidden from Claude, still in the `/` menu), and `"off"` (hidden from both); the `/skills` menu cycles the states with Space and saves to `.claude/settings.local.json` (a hand-written override in `~/.claude/settings.json` also works). Plugin skills are **not** affected by `skillOverrides` — manage those through `/plugin`. To find candidates, run `/skill-doctor` (v2.1.252+), which shows each skill's context cost and how often it gets used. (source: https://code.claude.com/docs/en/skills) |
| Grok (`xai-grok-skills-plugins`) | move `~/.grok/skills/<id>` → `~/.grok/skills-disabled/<id>` |
| Codex (`openai-codex-skills`, verified 2026-09-17) | `[[skills.config]]` in `~/.codex/config.toml` with `path = "/path/to/skill/SKILL.md"` and `enabled = false` (restart Codex to apply) |
| Hermes (`nous-hermes-plugins`) | no documented per-skill toggle — scope via `engines`, or retire |

- **Disable is not uninstall or `--exclude-engines`.** Taking an engine out of the entry
  asserts in the registry that the skill has **no valid runtime** there — a false statement
  about the skill, and it drops the record of why it is off. Enablement is a user preference
  and belongs in the engine's own settings; the registry stays a pure record of *what exists
  and where it can run*.
- **Hand-deleting a symlink is not a disable.** `kuma skill scope` recreates it, and the
  Extensions panel shows the link as missing until then. Disabling leaves the registry in
  charge of the link and costs nothing to reverse.

## Scope — a claim about the skill, not about you

Use `--engines` / `--exclude-engines` only when the skill genuinely cannot function elsewhere: it reads an
engine-native path, requires that engine's feature, or ships an engine-specific flavor.
Installing it elsewhere would register a skill that can never fire. Record the reason where
the skill's provenance lives (its README, or the commit that scoped it).

## Verify

`kuma skill list` prints where each entry's links stand, engine by engine (`--project <id>` for a
project's folders). Check it before shipping any of the three operations, and after a retire
confirm nothing recreates the artifact.
