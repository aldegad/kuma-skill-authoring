# Changelog

All notable changes to the `skill-hook-authoring` package. This repo has no
package manifest, so the **git tag plus this file are the version record**
(the official Claude SKILL.md frontmatter documents only `name` and
`description`, so the version is intentionally not stamped there).

## Unreleased — 2026-10-20 — the package is kuma-skill-authoring

- The skill id and the repository are `kuma-skill-authoring` (was `skill-hook-authoring`; the old
  GitHub URL redirects). Owner decision 2026-10-20: the name now says it is Kuma's authoring
  contract. The Codex agent card, the weekly source-check prompt (skill call, origin check,
  canonical checkout `~/Documents/workspace/personal/kuma-skill-authoring`), the scheduler note
  and the source checker's user agent follow. The rules are unchanged.

## Unreleased — 2026-10-20 — skill repos sit in the workspace, no umbrella folder

- The owner's skill repos left the `agent-extensions` umbrella folder and each is its own folder in the
  workspace (`~/Documents/workspace/personal/<name>`); the umbrella is gone, and its hand-kept
  `skills.json` is archived. Recommended Layout, Core Rules (`docs/authoring-rules.md`), the lifecycle
  table and the weekly source-check prompt say so; provenance is each repo's own git.
- `docs/agent-extensions-routing.md` is now `docs/skill-repo-routing.md`: the same rules (boundary,
  routing tree, upstream follow, fork patch pattern, install through the registry), with the folder and
  manifest references replaced by "the skill's own repo". The READMEs' doc list follows.

## Unreleased — 2026-10-15 — skills register through the Kuma skill registry

- Registration goes through `kuma skill install|uninstall|scope` and its record
  `~/.kuma/skills/registry.json` (kuma-studio `docs/architecture/skill-registry.md`), not the
  `agent-extensions/skills.json` manifest. The old rule pointed every Kuma user at a folder that exists
  on one machine only, so other machines' agents dropped skills straight into the engine roots.
  Owner decision 2026-10-15 ("유저들이 스킬을 설치하면 ~/.kuma 에 설치하게").
- `skills.json` stays in the owner's folder as the provenance record (owned and upstream remotes,
  patches, sub-agent links); `kuma skill import --from agent-extensions` moved its registrations once.
- Disable / Scope / Verify in `docs/skill-lifecycle.md` now name the registry's verbs
  (`--engines` / `--exclude-engines`, `kuma skill list`).

## Unreleased — 2026-10-15 — the executable's language is chosen by speed

- New rule and section "Choosing The Language Of A Skill's Or Hook's Executable"
  (`docs/authoring-rules.md`, one line in `SKILL.md` Core Rules): Rust first; Node or Python
  second, picked by the ecosystem the job needs; shell last and only as a thin launcher. Each
  language carries what it is for, what it is not for, and start-up times measured on the
  owner's Mac. Owner decision 2026-10-15 ("rust 를 1순위 node나 python을 2순위로 … 속도순으로").
- The hook examples (`docs/hook-contract.md`) register a hook executable (`bin/<hook>`)
  instead of a `.sh` script; the exec-bit rule and the validation checklist now cover a
  compiled binary as well as a script with a shebang.

## Unreleased — 2026-09-18 — the wiki becomes a lookup

- "Keep history out of doc bodies" now points at the kuma-studio commit gate that enforces it
  (`npm run lint:instruction-doc-history`); the rule text is unchanged.

The compatibility wiki is retired. Vendor facts are no longer stored in this repository; they are
looked up on the vendor's page when a question is asked and cited with URL and date
(`docs/lookup.md`). What stays is ours: the authoring methodology, the umbrella conventions, the
lifecycle table, and the cross-engine hook traps — each vendor-adjacent line now carries the
`docs/official-sources.json` id it was verified against.

### Why

- The canonical checkout that every runtime's symlink points at had diverged from `origin/main`
  since 2026-07-26: 31 daily-refresh merges on GitHub, 6 local commits (including the 08-20 body
  diet), and the refresh's final "fast-forward the canonical checkout" step failing every night. The
  agents read a wiki nine weeks old while the refresh rewrote another copy — a mirror is wrong
  exactly when it is trusted.
- The day it was needed (2026-09-18: "can an interrupted turn continue with no new prompt on
  Claude Code, Codex, Grok?") the wiki held the resume *syntax*; the answer still came from the
  official pages. A link costs one fetch; a mirror costs a daily rewrite.

### Removed

- `docs/compatibility-matrix.md`, `docs/cli-invocation.md`, `docs/completion-stack.md`,
  `docs/plugin-packaging.md`, `docs/models/*` — vendor-fact mirrors. Their `kind` axes survive as
  the manifest's search index (`docs/lookup.md` §1).
- `prompts/daily-official-doc-update.md` — the daily rewrite prompt.
- `SKILL.md` sections that restated vendor pages (Runtime Coverage, CLI Spawn, Model Lineup, the
  Project Instruction Files loading table, the hook payload restatement).

### Added

- `docs/lookup.md` — pick sources by `agent` × `kind`, fetch (compressed / `.md` twin), judge
  documented / not documented / unverified, cite, leave nothing behind here; manifest maintenance.
- `prompts/weekly-source-check.md` — reachability check only; a moved URL is fixed in the manifest
  and PR'd through the existing auto-merge guard; no prose is touched.
- `docs/authoring-rules.md` → *Packaging*: the shared adapter rule and the five-step packaging
  decision gate, moved from the deleted `plugin-packaging.md`.

### Changed

- `SKILL.md`: 24.0KB body → a methodology with one routing rule ("vendor facts: look them up"); the
  frontmatter `description` drops "refreshed daily / compatibility wiki" and gains the lookup trigger.
- `docs/hook-contract.md`: `continue: false` is a universal Claude hook field that stops the
  session, not a Stop-only schema (`anthropic-claude-hooks`, verified 2026-09-18 by the last daily
  refresh); header names the two source ids the file is verified against.
- `docs/skill-lifecycle.md`: the Disable table takes the refresh's 2026-09-17 values (Claude
  `skillOverrides` four states, Codex `[[skills.config]] enabled = false`) with a source id per row.
- `docs/cloud-automation.md`, `README.md` (+ regenerated translations), `agents/openai.yaml`:
  describe the lookup model and the weekly check.
- `docs/official-sources.json` notes: "Mirror: docs/…" pointers retired; the manifest itself is
  `origin/main`'s (68 sources, 2026-09-18) — the merge kept every URL fix the refresh made.
## Unreleased — 2026-09-18

Daily refresh (all 68 sources fetched with `curl --compressed`, `.md` twins where served; none unverified this run — the Codex developer-commands HTML already carried the full option tables, so no `kuma agent-browser` render was needed). **No vendor drift in tracked scope:** every `.md` twin compared against the previous run matched except one untracked `--system-prompt-snapshot` paragraph on the Claude CLI reference. The edits below correct mirror claims that today's pages contradict, plus the time-sensitive stamp advances.

### Changed

- **Claude `continue: false` is a universal hook field, not a Stop-only schema.** `SKILL.md` said it was "the schema for the `Stop` hook"; the hooks page lists `continue` among fields "Every event accepts", where `false` means "Claude stops processing entirely after the hook runs. Takes precedence over any event-specific decision fields". Block a single PreToolUse call with `permissionDecision: "deny"`. Source: <https://code.claude.com/docs/en/hooks>.
- **Claude `PreCompact` is blockable.** `docs/completion-stack.md` grouped it with the non-blocking events; the page reads "Exit with code 2 to block compaction … You can also block by returning JSON with `"decision": "block"`." Source: <https://code.claude.com/docs/en/hooks>.
- **Claude `Setup` hooks cannot inject `additionalContext`.** "Claude Code discards a Setup hook's JSON output fields, such as `systemMessage`, `continue`, and `hookSpecificOutput.additionalContext`" — dropped from the manifest claim. Source: <https://code.claude.com/docs/en/hooks>.
- **Interactive `claude --continue` skips `-p`/Agent SDK/`/loop` sessions; `claude -p --continue` includes them.** Stated in `docs/cli-invocation.md` and `docs/compatibility-matrix.md`. Sources: <https://code.claude.com/docs/en/cli-reference>, <https://code.claude.com/docs/en/sessions>.
- **Claude Haiku 4.5 retirement: "Not sooner than October 15, 2026".** Added to `docs/models/claude.md`. Source: <https://docs.anthropic.com/en/docs/about-claude/models/overview>.
- **`codex mcp` manages MCP server entries; it is not an MCP server.** `docs/completion-stack.md` said "MCP client + server"; the page says `codex mcp` manages servers "(list, add, remove, authenticate)" and "The `codex mcp-server` command and standalone `codex-mcp-server` binary have been removed. Use the Codex app server instead." Source: <https://learn.chatgpt.com/docs/developer-commands?surface=cli>.
- **Hermes `transform_api_error_classification` is a Transform hook.** `docs/plugin-packaging.md` left it under Observer ("everything else"); the hooks catalog files it under Transform. The plugins page's "27 … VALID_HOOKS" figure is kept as the vendor-stated count, with the manifest noting that its own tables list 31 and the hooks catalog 39. Sources: <https://hermes-agent.nousresearch.com/docs/user-guide/features/hooks>, <https://hermes-agent.nousresearch.com/docs/user-guide/features/plugins>.
- **Billing status remains paused.** The June 15 banner is unchanged ("Claude Agent SDK, `claude -p`, and third-party app usage still draw from your subscription's usage limits"), and a set `ANTHROPIC_API_KEY` still switches Claude Code to API usage charges. Stamps in `docs/cli-invocation.md` and `docs/cloud-automation.md` advanced to 2026-09-18.
- **Re-verified with no drift:** Claude (33 hook events, `skillOverrides`, memory, sessions, headless, `/goal`, lineup), Codex (8 model ids and the `gpt-5.5` 2026-10-14 retirement, 12 hook events, six skill roots, `AGENTS.md` walk, resume/fork forms, `exec --json`), Grok (7 Text / 5 Imagine ids, Voice, `reasoning_effort`, `-r [<ID>]`, Apache-2.0 repo), Cursor (usage pools, nine default-visible rows, 19 built-in skills, 21 hook events, CLI resume), Gemini/Antigravity (models page still *Last updated 2026-09-15 UTC*, headless flags, `agy models` sample, resume, plugin schema), Hermes (context-file chain and 32,000-char subdirectory cap, four hook systems, plugin roots, CLI resume), gajae-code (`v0.15.3`, MIT), and GitHub auto-merge/notifications. `Last reviewed` / `verified` stamps advanced to 2026-09-18; manifest notes updated to match.

## Unreleased — 2026-09-17

Daily refresh (all 68 sources fetched with `curl --compressed`, `.md` twins where served; none unverified this run — the Gemini models page answered directly this time, and the Codex developer-commands `ConfigTable` options the `.md` twin omits were rendered with `kuma agent-browser`). **Vendor drift this run:** Codex announced the `gpt-5.5` retirement, and Hermes raised its subdirectory context-file cap, categorised its hooks, and added `agent_loop_stopped`. The other edits correct mirror claims that pages already contradicted, plus the time-sensitive stamp advances.

### Changed

- **`gpt-5.5` retires from Codex on 2026-10-14.** The Codex models page adds a "GPT-5.5 retirement" section: "On October 14, 2026, GPT-5.5 will retire from ChatGPT, ChatGPT Work, and Codex on all plans … This retirement does not apply to the OpenAI API." Codex with ChatGPT sign-in should switch to `gpt-5.6-sol`. Recorded in `docs/models/codex.md` (row + Retired / superseded), `SKILL.md`, and the Codex scheduled-tasks note in `docs/cloud-automation.md`; the id stays under Other models until the date. The page also documents opt-in experimental context management (`features.context_management.experimental_mode`). Source: <https://learn.chatgpt.com/docs/models>.
- **Codex scheduled tasks can be event-triggered.** Gmail, Slack, or GitHub events can trigger a task in ChatGPT web and mobile only (not the desktop app, Codex CLI, or IDE extension), and one task cannot combine event triggers with a time-based schedule. `docs/cloud-automation.md`. Source: <https://learn.chatgpt.com/docs/automations?surface=app>.
- **Hermes subdirectory context files are capped at 32,000 chars.** Progressively discovered files are now "capped at 32,000 characters per file (a fixed preview cap; context_file_max_chars and the model's context window do not change it)", replacing the recorded 8,000. `docs/compatibility-matrix.md`. Source: <https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files>.
- **Hermes hooks are categorised, and `agent_loop_stopped` is new.** The 27 `VALID_HOOKS` events are grouped into Directive/control, Transform, and Observer categories, replacing the "one flat table" claim; `agent_loop_stopped` (gateway/TUI interruption of a running turn, not the plain CLI) joins the session observers. `docs/plugin-packaging.md`, `docs/compatibility-matrix.md`. Sources: <https://hermes-agent.nousresearch.com/docs/user-guide/features/hooks>, <https://hermes-agent.nousresearch.com/docs/user-guide/features/plugins>.
- **Hermes has a typed skill invocation.** "Every installed skill in ~/.hermes/skills/ is automatically registered as a slash command" — `SKILL.md` said Hermes documents no typed token, and the matrix's Explicit column said "not documented". Both corrected. Source: <https://hermes-agent.nousresearch.com/docs/user-guide/cli/>.
- **Cursor skills are not imported from GitHub directly.** The page says "Skills aren't imported on their own" and routes GitHub skills through a plugin with `.cursor-plugin/marketplace.json`; the matrix's "GitHub repo integration for remote skills" wording was replaced. Source: <https://cursor.com/docs/skills>.
- **Grok skill frontmatter:** the matrix now lists `when-to-use`, `argument-hint`, `metadata`, and `allowed-tools` ("Does not grant or restrict tools"), and the accepted-but-ignored `model`/`effort`/`license`/`compatibility`. Source: <https://docs.x.ai/build/features/skills-plugins-marketplaces>.
- **Cursor Grok 4.6:** 256k context window and "Fast is the default speed tier on Pro and higher plans" added to `docs/models/cursor.md`. Source: <https://cursor.com/docs/models/grok-4-6>.
- **Claude `/goal` retry and pause.** `docs/completion-stack.md` now states the v2.1.269+ interactive behaviour: a transient failure auto-retries ("Goal still active") and pauses after three retries; a failure a retry would repeat pauses the goal ("Goal paused"); `CLAUDE_CODE_GOAL_CHECKIN_MINUTES=0` turns off check-ins **and** automatic retries. Source: <https://code.claude.com/docs/en/goal>.
- **Claude `SubagentHandback` vs SubagentStop.** On v2.1.271+ a subagent that reports through `SubagentHandback` leaves only its closing text in `last_assistant_message`; gate on the report via a hook matched on `SubagentHandback` (`tool_input.message`). `docs/completion-stack.md`. Source: <https://code.claude.com/docs/en/hooks>.
- **Claude settings `strictPluginOnlyCustomization` and `workflowKeywordTriggerEnabled` are current keys**, not stale ones as the matrix claimed. Source: <https://code.claude.com/docs/en/settings-reference>.
- **Claude `/skill-doctor`** (v2.1.252+) added to the Claude Code disable row of `docs/skill-lifecycle.md` as the way to find skills worth turning off. Source: <https://code.claude.com/docs/en/skills>.
- **Billing status remains paused.** The June 15 banner is unchanged ("Claude Agent SDK, `claude -p`, and third-party app usage still draw from your subscription's usage limits"), and a set `ANTHROPIC_API_KEY` still switches Claude Code to API usage charges. Stamps in `docs/cli-invocation.md` and `docs/cloud-automation.md` advanced to 2026-09-17.
- **Re-verified with no drift:** the Gemini models page (still *Last updated 2026-09-15 UTC*) and every Antigravity CLI page, Grok lineup/reasoning/CLI/headless/hooks/project rules, Cursor models/hooks/CLI, Claude hooks (33 events)/sessions/CLI/headless/memory/plugins/lineup, the other Codex pages (including the rendered `ConfigTable`: `fork` is uuid-only, `resume --include-non-interactive`, `exec --json, --experimental-json`), gajae-code (`v0.15.3`, MIT), and GitHub auto-merge/notifications. `Last reviewed` / `verified` stamps advanced to 2026-09-17; manifest claims and notes updated to match.

## Unreleased — 2026-09-16

Daily refresh (all 68 sources fetched; none unverified this run — the Gemini models page again hit Google's cookieless `auto_signin` redirect loop and was recovered with the documented `curl --compressed -c <jar> -b <jar> …?hl=en` retry, so no `kuma agent-browser` render was needed this time). **One real vendor drift:** the Gemini models page advanced to *Last updated 2026-09-15 UTC* and shipped two new Stable Live API models. Everything else in tracked scope — every lineup, hook event set, plugin surface, project-instruction chain, resume invocation, headless flag table, and the billing status — matched its recorded claim; the remaining edits are two mirror corrections against pages that did not themselves change, plus the time-sensitive stamp advances.

### Changed

- **Gemini 3.8 ships two Stable Live API models.** The Gemini 3 Stable section added `gemini-3.8-live` — "Default Live API model for most low-latency voice agent experiences without reasoning delays", and "the default option" for real-time dialogue in the Audio models section — and `gemini-3.8-live-extended-thinking`, "High-reasoning Live API model for voice interactions, recommended when higher background reasoning is required". Both are recorded as current shipping ids. Source: <https://ai.google.dev/gemini-api/docs/models>.
- **`gemini-3.1-flash-live-preview` is now legacy.** Its description changed to "Legacy audio-to-audio preview model. We recommend updating to Gemini 3.8 Live." Recorded as legacy/superseded rather than retired — the page documents no retirement, and absence is not retirement. `docs/models/gemini-antigravity.md`, `SKILL.md`. Source: <https://ai.google.dev/gemini-api/docs/models>.
- **Claude Fable 5.1's documented `effort` default was missing from the mirror.** The models overview's Default effort row reads `high` for Fable 5.1 as well as Opus 5 and Sonnet 5 (Haiku 4.5 "Not supported"), and the Mythos 5.1 comparison table repeats it, but `docs/models/claude.md` carried the default only on the Opus 5 and Sonnet 5 rows. Added to the Fable 5.1 row, scoped as before to the Claude API per the page's own footnote. Source: <https://docs.anthropic.com/en/docs/about-claude/models/overview>.
- **`gpt-5.5` sits under "Other models", not among the Recommended five.** The Codex models page places it behind the "View other models" toggle alongside `gpt-5.4` and `gpt-5.4-mini`; `docs/models/codex.md` listed it without the "Other model" label it already gave the two 5.4 ids. Corrected, and the file now states the split explicitly: Recommended = `gpt-6-astra`, `gpt-5.6-sol`, `gpt-5.6-terra`, `gpt-5.6-luna`, `gpt-5.3-codex-spark`; Other = `gpt-5.5`, `gpt-5.4`, `gpt-5.4-mini`. Source: <https://learn.chatgpt.com/docs/models>.
- **Billing status remains paused.** The June 15 banner is verbatim-unchanged ("Claude Agent SDK, `claude -p`, and third-party app usage still draw from your subscription's usage limits", the announced monthly credit still unavailable), and a set `ANTHROPIC_API_KEY` still switches Claude Code to API usage charges. Stamps in `docs/cli-invocation.md` and `docs/cloud-automation.md` advanced to 2026-09-16.
- **Re-verified with no drift:** Claude (33 hook events including `Setup`; `skillOverrides`' four states; `CLAUDE.md`/`CLAUDE.local.md`/`.claude/rules/` loading and the ancestor-eager + subdirectory-lazy split; sessions, the `~/.claude/projects/<project>/<session-id>.jsonl` store and the 200-char truncation rule; the full `-p` flag table including `--bg`'s `-p` incompatibility, `--bare`'s auth consequence, `--cloud`'s two forms, and the seven `--permission-mode` values; `/goal` evaluation, three-retry-then-pause and the 30-min doubling check-in backoff), Codex (8 model ids in their Recommended/Other split, with the `gpt-5.4`/`gpt-5.4-mini` → `gpt-5.6-terra`/`gpt-5.6-luna` replacement mapping; 12 hook events with `UserPromptSubmit`/`Stop`/`Interrupt` ignoring matchers and the eight-concurrent-background cap; six skill roots; the root→cwd `AGENTS.md` walk at 32 KiB with no sub-cwd lookahead; `resume`/`archive`/`unarchive`/`delete` accepting a UUID or a session name while `fork` is UUID-only; the portable Agent Plugins root `plugin.json`; RRULE scheduled tasks), Grok (7 Text / 5 Imagine ids, Voice = `grok-voice-think-fast-2.0` only, the `reasoning_effort` tiers and their `high` default, the eight-id May 15 retirement table, project-rule discovery, the full CLI flag and subcommand tables, `-r [<ID>]` vs the headless page's `<ID>`), Cursor (both usage pools, the nine default-visible rows, 19 built-in skills, the CLI parameter table and resume forms), Gemini/Antigravity (the `agy models` sample, headless flag table, resume picker and workspace-keyed session cache, plugin `plugin.json` schema), Hermes (the five-file first-match context chain, four hook systems including `on_room_member_activity`, five plugin roots, CLI resume and `state.db`), gajae-code (README still at the `v0.15.3` pin, MIT), and GitHub auto-merge. `Last reviewed` / `verified` stamps advanced to 2026-09-16; manifest notes updated to match.

## Unreleased — 2026-09-15

Daily refresh (all 68 sources fetched; none unverified this run — the Gemini models page was rendered via `kuma agent-browser` after a cookieless `curl` hit Google's OAuth `auto_signin` redirect loop, and the Codex developer-commands `ConfigTable` options were rendered the same way because the `.md` twin omits them). **No vendor drift this run** beyond one new xAI migration-guide link: every tracked lineup, hook event set, plugin surface, project-instruction chain, resume invocation, and headless flag table matched its recorded claim. The edits below are mirror corrections against pages that did not themselves change, plus the time-sensitive stamp advances.

### Changed

- **`--bg` is not a `claude -p` flag.** `docs/cli-invocation.md` listed it among the Claude headless scripting flags, but two official pages say otherwise: the headless page states "Claude Code rejects `--bg`", and the CLI reference's `--bg` row reads "Can't be combined with `-p`/`--print`". Removed from the headless row, and the incompatibility is now stated explicitly along with the `--cloud` split (a task description is rejected; a *session ID* plus `-p` queues a message into that cloud session and exits). Sources: <https://code.claude.com/docs/en/headless>, <https://code.claude.com/docs/en/cli-reference>.
- **Bare mode's auth consequence surfaced into the billing-owning doc.** `--bare` "never reads OAuth credentials or the system keychain", so a bare run needs `ANTHROPIC_API_KEY` (or an `apiKeyHelper`) and therefore bills as API usage rather than subscription — recorded in the same Claude headless row, which sits next to the billing caveat. Source: <https://code.claude.com/docs/en/headless>.
- **Claude Opus 5 / Sonnet 5 `effort` default is a Claude API statement, not a Claude Code one.** `docs/models/claude.md` still scoped both rows to "the Claude API and Claude Code"; the models page footnote reads "The effort parameter's default on the Claude API", and the Claude Code CLI reference documents `--effort`'s named options but states no default. Corrected to Claude API only, and the "no documented default" fact added to the effort bullet — the same correction applied to the Opus 4.8 row on 2026-09-14. Sources: <https://docs.anthropic.com/en/docs/about-claude/models/overview>, <https://code.claude.com/docs/en/cli-reference>.
- **Grok Imagine's November 2 retirement now has a dedicated migration guide.** The may-15-retirement page links `/developers/migration/imagine-image-quality-nov-2` for `grok-imagine-image-quality` → `grok-imagine-image-2.0`; `docs/models/grok.md` records the link. The id is still listed as current on the models page. Source: <https://docs.x.ai/developers/migration/may-15-retirement>.
- **Hermes context-file manifest claims were missing `AGENTS.override.md`**, even though it sits in the documented first-match chain. Added, together with the full chain (`.hermes.md` → `AGENTS.override.md` → `AGENTS.md` → `CLAUDE.md` → `.cursorrules`, with `SOUL.md` always loaded independently as identity slot #1) and the rule that an `AGENTS.override.md` beside an `AGENTS.md` is loaded *instead of* the committed file. `docs/compatibility-matrix.md` already carried the correct chain. Source: <https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files>.
- **Billing status remains paused.** The June 15 banner is verbatim-unchanged ("Claude Agent SDK, `claude -p`, and third-party app usage still draw from your subscription's usage limits", the announced monthly credit still unavailable), and a set `ANTHROPIC_API_KEY` still switches Claude Code to API usage charges. Stamps in `docs/cli-invocation.md` and `docs/cloud-automation.md` advanced to 2026-09-15.
- **Re-verified with no drift:** Claude (33 hook events; `skillOverrides`' four states; memory/`CLAUDE.md` loading; sessions/`--resume` cross-project lookup; `/goal` evaluation, retry/pause and check-in backoff), Codex (8 listed model ids with Astra's per-surface flags; 12 hook events with `UserPromptSubmit`/`Stop`/`Interrupt` ignoring matchers and the 8-concurrent-background cap; six skill roots; `resume` accepting `uuid | session name` while `fork` is `uuid`-only; the portable Agent Plugins root `plugin.json` and marketplace paths, quoted verbatim off the relocated builder page), Grok (7 Text / 5 Imagine ids, Voice = `grok-voice-think-fast-2.0` only, `reasoning_effort` tiers, project-rules discovery, `-r [<ID>]`), Cursor (both usage pools, the nine default-visible rows, 19 built-in skills, CLI parameters and resume), Gemini/Antigravity (page still last-updated 2026-09-04; headless flag table and the `agy models` sample; resume picker and session cache; plugin `plugin.json` schema), Hermes (five plugin roots, four hook systems, CLI resume, `state.db`), gajae-code (README at the `v0.15.3` pin, `/skill:<name>`, SDK lease bounds), and GitHub auto-merge. `Last reviewed` / `verified` stamps advanced to 2026-09-15; manifest notes updated to match.

## Unreleased — 2026-09-14

Daily refresh (all 68 sources fetched; none unverified this run — Antigravity and Gemini pages rendered via `kuma agent-browser` and cross-checked against `.md` twins). Three small vendor drifts (Grok voice lineup, Grok `-r` resume, a Cursor Grok 4.5 Fast row); the remaining edits fix mirror statements that did not match unchanged pages.

### Changed

- **Grok Voice 1.0 is no longer on the models page.** The Voice Pricing section of `docs.x.ai/developers/models.md` names only `grok-voice-think-fast-2.0` (Speech to Speech); `grok-voice-think-fast-1.0` and the "Deprecated" label are gone from the twin, the HTML, and `llms-full.txt`, and no page documents a retirement, so it is recorded as absent / not documented rather than retired. `docs/models/grok.md`, `SKILL.md`. Source: <https://docs.x.ai/developers/models>.
- **Grok `-r` takes an optional id.** The CLI reference now reads "`-r, --resume [<ID>]` | Resume a session by ID, or the most recent if omitted"; the headless-scripting page still shows `<ID>`. `docs/compatibility-matrix.md`, `docs/cli-invocation.md`. Source: <https://docs.x.ai/build/cli/reference>.
- **Cursor Models pool: Grok 4.5 has a Fast row** (`Grok 4.5 (Fast)`, $4 / $1 cache read / $18). `docs/models/cursor.md`. Source: <https://cursor.com/docs/models-and-pricing>.
- **Codex mirrors corrected against unchanged pages:** `--skip-git-repo-check` now quotes the CLI reference ("Allow running outside a Git repository (useful for one-off directories)"); `Interrupt` joins `UserPromptSubmit` / `Stop` as matcher-ignoring events in `SKILL.md`; the shared hook-payload note no longer implies Codex sends `prompt_id` or an `auto` permission mode; the models page names no default effort tier; `/status` is not documented to show a session id. `SKILL.md`, `docs/cli-invocation.md`, `docs/compatibility-matrix.md`, `docs/models/codex.md`. Sources: <https://learn.chatgpt.com/docs/hooks>, <https://learn.chatgpt.com/docs/models>, <https://learn.chatgpt.com/docs/developer-commands?surface=cli>, <https://learn.chatgpt.com/docs/non-interactive-mode>.
- **Claude:** Opus 4.8's `effort` default is stated for the Claude API only ("The effort parameter's default on the Claude API"), not "all surfaces". `docs/models/claude.md`. Source: <https://platform.claude.com/docs/en/models/opus-4-8/overview>.
- **Hermes `plugin.yaml` fields** now follow the page: the example carries `name`, `version`, `description`, `provides_tools`, `provides_hooks`; `author` / `requires_env` / `capabilities` are the listed optional additions, `kind` / `optional_env` appear in category examples, and the v2 reference says "Every field is optional". `docs/plugin-packaging.md`. Source: <https://hermes-agent.nousresearch.com/docs/developer-guide/plugins>.
- **gajae-code (community/non-vendor):** the README documents neither clipboard image paste nor "session evidence" under `.gjc/` — the image row now reads "image input" and `.gjc/` is described as the project customization scope with SDK endpoint records under `.gjc/state/sdk`. `docs/cli-invocation.md`, `docs/compatibility-matrix.md`, `SKILL.md`. Source: <https://github.com/Yeachan-Heo/gajae-code>.
- **Gemini:** `gemini-3-flash-preview` now carries its page description instead of "current Flash-generation preview", Nano Banana Pro is grouped with the other Stable Nano Banana rows, and the page-date narrative is trimmed. `docs/models/gemini-antigravity.md`. Source: <https://ai.google.dev/gemini-api/docs/models?hl=en>.
- **Billing status remains paused.** The June 15 banner is verbatim-unchanged ("Claude Agent SDK, claude -p, and third-party app usage still draw from your subscription's usage limits"), and a set `ANTHROPIC_API_KEY` still switches Claude Code to API usage charges. Stamps in `docs/cli-invocation.md` and `docs/cloud-automation.md` advanced to 2026-09-14.
- **Re-verified with no drift:** project-instruction files, session resume, and headless flags for every runtime; the Claude `/goal` and Codex goals completion stack; Claude, Codex, and Gemini lineups; Hermes hooks/context files/CLI; GitHub auto-merge. `Last reviewed` / `verified` stamps advanced to 2026-09-14. Manifest claims and notes updated to match.

## Unreleased — 2026-09-13

Daily refresh (all 68 sources fetched; none unverified this run — Antigravity pages rendered via `kuma agent-browser` and cross-checked against their `.md` twins). Vendor drift was small: a new Hermes plugin hook, the Claude Mythos id confirmed on its own page, and a corrected Opus 4.1 replacement. Most edits fix mirror statements that had drifted from pages which themselves did not change.

### Changed

- **Claude Mythos id is `claude-mythos-5-1`.** Its dedicated page reads "Model ID: `claude-mythos-5-1`" (invite only, released 2026-09-01, shares Fable 5.1's specifications and pricing), and the Mythos 5 page names 5.1 as current. The "verify the id there" caveat is retired. `docs/models/claude.md`, `SKILL.md`. Sources: <https://platform.claude.com/docs/en/models/mythos-5-1/overview>, <https://platform.claude.com/docs/en/models/mythos-5/overview>.
- **Opus 4.1's recommended replacement is `claude-opus-4-8`, not Opus 5.** The model-deprecations table row reads `August 5, 2026 | claude-opus-4-1-20250805 | claude-opus-4-8`. The models overview's redirect target is now recorded as `platform.claude.com/docs/en/models/overview`. `docs/models/claude.md`, `SKILL.md`. Source: <https://docs.anthropic.com/en/docs/about-claude/models/overview>.
- **Hermes plugin hook `on_room_member_activity`** (observer) fires once per runtime event while a hosted Group Chat member turn runs on the Bot Mode gateway. `docs/compatibility-matrix.md`, `docs/plugin-packaging.md`. `SKILL.md`'s Hermes row now also lists outbound webhooks and the portable Agent Plugins adapter, and the portable-package install is described as the normal `hermes plugins install` / `enable` flow (the page names no install roots). Source: <https://hermes-agent.nousresearch.com/docs/user-guide/features/hooks>.
- **Codex mirrors corrected against unchanged pages:** `codex fork` takes a UUID only (only resume/archive/unarchive/delete also accept a session name); `approval_policy = "untrusted"` is no longer supported; `codex apply` is documented (applies the latest Codex cloud chat diff, non-zero exit if `git apply` fails); the `/review` quote now uses the CLI page's own wording; the `gpt-5.4` description reads "Flagship model for professional work". `docs/cli-invocation.md`, `docs/compatibility-matrix.md`, `docs/completion-stack.md`, `docs/models/codex.md`. Sources: <https://learn.chatgpt.com/docs/developer-commands?surface=cli>, <https://learn.chatgpt.com/docs/config-file/config-advanced>, <https://learn.chatgpt.com/docs/codex/cli>, <https://learn.chatgpt.com/docs/models>.
- **Cursor row visibility corrected:** Gemini 3.1 Pro is default-visible (only the other pre-3.8 Gemini rows are hidden), and the default-visible Claude rows are Fable 5.1, Opus 5, and Sonnet 5 (Opus 4.8/4.7 are hidden). The dated narrative in `SKILL.md`'s Cursor bullet is removed. A raw-text re-check confirms `cursor-agent` appears on none of the CLI pages. `docs/models/cursor.md`, `SKILL.md`. Sources: <https://cursor.com/docs/models-and-pricing>, <https://cursor.com/docs/cli/reference/parameters>.
- **Grok:** project-rule precedence is documented, so the matrix no longer cites "Grok merge semantics" as an undocumented example; the licence corpus check now points at `docs.x.ai/llms-full.txt` (`llms.txt` became a page index), still zero hits. `docs/compatibility-matrix.md`, `docs/cli-invocation.md`. Sources: <https://docs.x.ai/build/features/project-rules>, <https://github.com/xai-org/grok-build>.
- **gajae-code (community/non-vendor):** `SKILL.md` now uses `gjc --tmux --worktree <name>`, matching the README and `docs/cli-invocation.md`.
- **Gemini out-of-scope list:** Lyria 3.5 (`lyria-3.5`) is the flagship music model (Lyria 3 Pro is previous generation), and Gemini Embedding 2 is the preview id `gemini-embedding-2-preview`. `docs/models/gemini-antigravity.md`. Source: <https://ai.google.dev/gemini-api/docs/models>.
- **Billing status remains paused.** The June 15 banner is verbatim-unchanged ("Claude Agent SDK, `claude -p`, and third-party app usage still draw from your subscription's usage limits"), and a set `ANTHROPIC_API_KEY` still switches Claude Code to API usage charges. Stamps in `docs/cli-invocation.md` and `docs/cloud-automation.md` advanced to 2026-09-13.
- **Re-verified with no drift:** project-instruction files, session resume, and headless flags for every runtime; the Claude `/goal` and Codex goals completion stack; the Grok and Gemini lineups; Antigravity CLI surfaces (site banner now Antigravity 2.0 v2.13.0). `Last reviewed` / `verified` stamps advanced to 2026-09-13. Manifest claims and notes updated to match.

## Unreleased — 2026-09-12

Daily refresh (all 68 sources fetched; none unverified this run). Real vendor drift in Codex plugin packaging, Hermes plugin packaging, Cursor's pricing and skills pages, the gajae-code README, and a scheduled Grok Imagine retirement — Codex and Hermes both now document the portable **Agent Plugins** package shape (root `plugin.json` + `skills/` + `mcp.json`). Several mirror/manifest inconsistencies left by the 2026-09-10/11 runs were also corrected, plus the usual time-sensitive stamp advances.

### Changed

- **Codex plugins now ship a portable root `plugin.json`.** The builder docs declare a root `plugin.json` with the Agent Plugins schema as "the portable entry point"; skills are always discovered in `skills/` and MCP servers in `mcp.json`, OpenAI-specific presentation, registered MCP server mappings, and hook settings move under `extensions.com.openai`, and "Existing .codex-plugin/plugin.json files remain supported as a compatibility fallback" (`@plugin-creator` still scaffolds that form). The "compatibility `apps` field" wording is gone. `SKILL.md` (Taxonomy, Runtime Coverage), `docs/plugin-packaging.md`, and `docs/compatibility-matrix.md` updated; the matrix also drops the "curated marketplace" entry (the page lists only three local marketplace files, separate from the public directory). Source: <https://developers.openai.com/plugins/build/plugins>.
- **Hermes also installs portable Agent Plugins v1.0.0 packages** as a compatibility adapter beside native `plugin.yaml` plugins — disabled after install until explicitly enabled, skills namespaced `agent-plugin-<slug>-<hash>`. The plugin name-collision rule gained its documented exception (memory providers: bundled wins), `plugin.yaml` required fields are no longer claimed (the docs show an example only), and `hermes --resume latest [--in <dir>]` is recorded. `docs/plugin-packaging.md`, `docs/compatibility-matrix.md`, `docs/cli-invocation.md`. Sources: <https://hermes-agent.nousresearch.com/docs/developer-guide/plugins>, <https://hermes-agent.nousresearch.com/docs/user-guide/features/plugins>, <https://hermes-agent.nousresearch.com/docs/user-guide/cli/>.
- **Codex hooks mirror fixed.** `SKILL.md` still said only `command` handlers run; the hooks page states "command and mcp_tool handlers are supported" (`mcp_tool` runs synchronously and not for `SessionEnd`). `docs/completion-stack.md` gained the `Interrupt` event. Source: <https://learn.chatgpt.com/docs/hooks>.
- **Codex model lineup corrected.** `SKILL.md` now names GPT-6 Astra (`gpt-6-astra`) as the flagship (it was only in `docs/models/codex.md`). The page's per-surface flags show Astra is **not** available on Codex cloud — the earlier record came from a text-only fetch that loses icon state, so `docs/models/codex.md` now points at the `.md` twin's `value: true|false` flags. "Default Power uses Sol with medium reasoning" is replaced by the page's rollout-dependent Power options, and `gpt-5.4` / `gpt-5.4-mini` are recorded as still listed after their stated 2026-08-31 ChatGPT-sign-in retirement date. Source: <https://learn.chatgpt.com/docs/models>.
- **Cursor pricing: Legacy Enterprise Auto is gone** (its 2026-09-07 window ended); all Auto modes bill at the routed model's list price, and Auto is not on the Start plan (the page never calls Auto the default). Older third-party rows are listed but "Hidden by default" (present only in the `.md` twin), per-model links exist only for default-visible rows, and the Grok 4.5 quote is re-anchored on the pricing page's own row note. `docs/models/cursor.md`, `SKILL.md`. Source: <https://cursor.com/docs/models-and-pricing>.
- **Cursor built-in skills: `/babysit` replaced by `/autopilot`**, and the Cursor Session Resume row now matches the using page (`agent resume` / `--continue` / `/resume` resume the most recent conversation; `agent ls` opens previous chats). `docs/compatibility-matrix.md`. Sources: <https://cursor.com/docs/skills>, <https://cursor.com/docs/cli/using>.
- **Grok skill frontmatter now documents invocation control** — `disable-model-invocation` (slash-command only), `user-invocable: false` (hidden from user and model), `paths` globs — retiring the "automatic invocation mechanics not detailed" cell. `docs/compatibility-matrix.md`, `SKILL.md`. Source: <https://docs.x.ai/build/features/skills-plugins-marketplaces>.
- **Grok Imagine: `grok-imagine-image-quality` retires 2026-11-02** in favor of `grok-imagine-image-2.0`. `docs/models/grok.md`. Source: <https://docs.x.ai/developers/migration/may-15-retirement>.
- **gajae-code README (community/non-vendor):** the worktree quote was rewritten ("`--worktree` names a GJC-managed sibling worktree; for an existing path, `cd` there first."), the install pin moved to `v0.15.3`, and role agents are now described only as "Bundled role agents for implementation and read-only review lanes". `docs/cli-invocation.md`, `docs/compatibility-matrix.md`, `docs/plugin-packaging.md`.
- **Smaller wording fixes:** Claude `--advisor` now reads "`fable` requires Fable access" (`docs/cli-invocation.md`); `docs/models/claude.md` still said "Fable 5: always on"; `--plugin-dir` `.zip` support no longer carries a version stamp and a folder of plugins loads on v2.1.265+ (`docs/plugin-packaging.md`); the Antigravity plugin-schema verification method and the keyring-only auth sentence were corrected; the stale `agy models` sample in `docs/models/gemini-antigravity.md` now matches the headless page and `SKILL.md`; Codex project-scoped scheduled tasks need the ChatGPT desktop app running, and the GitHub auto-merge disable sentence matches its page (`docs/cloud-automation.md`).
- **Manifest claim strings aligned with their own notes:** Claude hooks 31 → 33 events (`PreModelSwitch` / `PostModelSwitch`), `skillOverrides` four states, Codex hooks/plugins/model lineup, Claude and Gemini lineups, the Antigravity headless sample, dropped version stamps the Claude headless/sessions/settings/plugins pages no longer state, Hermes context-file cap and plugin roots, gajae worktree/role-agent wording.
- **Billing status remains paused.** Re-verified: "Claude Agent SDK, claude -p, and third-party app usage still draw from your subscription's usage limits"; the `ANTHROPIC_API_KEY` caveat is unchanged. Stamps in `docs/cli-invocation.md` and `docs/cloud-automation.md` advanced to 2026-09-12.
- **Re-verified with no drift:** project-instruction files for every runtime, session resume and headless flags (Codex, Claude, Grok, Antigravity), the Claude `/goal` and Codex goals completion stack, and the Claude / Grok / Gemini lineups. `Last reviewed` stamps advanced to 2026-09-12 on the docs touched or re-verified. The Antigravity docs-site banner now reads CLI v1.2.0 / SDK v0.1.16 / Antigravity 2.0 v2.12.2 (documented surfaces unchanged).

## Unreleased — 2026-09-11

Daily refresh (all 68 sources fetched; none unverified this run). Real drift found in several areas: two new model launches (Claude Fable 5.1, Gemini 3.8 Flash), a Cursor third-party router lineup expansion, Codex hooks/plugins documentation flips, a Hermes plugin/hook-surface expansion, a Claude Code `skillOverrides` state addition, a Claude headless `--continue` semantics change, and a new Antigravity headless auth path. Plus the usual time-sensitive stamp advances.

### Changed

- **Claude Fable 5.1 (`claude-fable-5-1`) shipped, superseding Fable 5.** `docs/models/claude.md` and `SKILL.md`: new current row `claude-fable-5-1` — "for demanding reasoning and long-horizon agentic work" ($10/$50 per MTok, 1M context, cutoff Jun 2026); Fable 5 (`claude-fable-5`) moves to the legacy table (still available). Opus 5's description reworded to "for most workloads" (was "for complex agentic coding and enterprise work"); the Mythos pricing footnote now references Mythos 5.1 (not independently re-verified against its own model page this run — flagged for next pass). Source: <https://docs.anthropic.com/en/docs/about-claude/models/overview>, verified 2026-09-11.
- **`claude --continue` (v2.1.257+) now resumes only a finished background session, not a running one.** Also newly documented: `--permission-prompts none`, `--forward-subagent-text`, a 30s stream-drain cap, and resume-by-absolute-`.jsonl`-transcript-path. `docs/cli-invocation.md` updated. Source: <https://code.claude.com/docs/en/headless>.
- **Gemini 3.8 Flash shipped, superseding 3.7 Flash as the lead Stable model.** `docs/models/gemini-antigravity.md`, `SKILL.md`, `docs/models/cursor.md`: new leading row `gemini-3.8-flash` ("engineered for long-horizon software engineering, autonomous agents, and complex enterprise workflows"); `gemini-3.7-flash` and `gemini-3.6-flash` remain Stable as prior generations. Page dateline advanced 2026-08-27 → 2026-09-04. Source: <https://ai.google.dev/gemini-api/docs/models>, verified 2026-09-11.
- **Antigravity CLI now documents a `GEMINI_API_KEY` headless/CI auth path** (`modelProvider: gemini` in `settings.json` + env var), retiring the prior "keyring only, no env-var auth" claim; `agy models` sample also shifted up a generation (gained `gemini-3.8-flash-high`/`-medium`, dropped `gemini-3.5-flash-medium`). `docs/cli-invocation.md` and `SKILL.md` updated. Sources: <https://antigravity.google/docs/cli/install>, <https://antigravity.google/docs/cli/headless>.
- **Cursor's third-party router lineup expanded significantly.** `docs/models/cursor.md`: the "Other Models" table now spans the full GPT-5 generation (not just 5.6), the full Claude line up to Fable 5.1, Gemini 2.5/3/3.1/3.5–3.8 Flash and Pro variants, and a new first-time Meta entry, Muse Spark 1.3 (`unverified this run` beyond its table appearance). Source: <https://cursor.com/docs/models-and-pricing>, verified 2026-09-11.
- **Codex hooks and plugins pages both flipped.** `docs/compatibility-matrix.md`: hooks gained a new `Interrupt` lifecycle event (ignores matchers) and a new `mcp_tool` handler type alongside `command`, plus an 8-concurrent-background-hooks cap (source: <https://learn.chatgpt.com/docs/hooks>); the plugin-component list narrowed from six to four named components (skills, MCP servers, browser extensions, hooks) and availability now reads "works across web/desktop/mobile, not available in the IDE extension" (source: <https://learn.chatgpt.com/docs/plugins> — this claim has flipped more than once, flagged in `docs/official-sources.json` notes for continued watching).
- **Hermes plugin/hook surface expanded: four roots → five, three hook systems → four.** `SKILL.md`, `docs/compatibility-matrix.md`, `docs/plugin-packaging.md`: plugin discovery gained a fifth root, Nix declarative installs (`services.hermes-agent.extraPlugins` / `extraPythonPackages`); the hook systems gained signed-HTTP outbound webhooks alongside gateway/shell/plugin hooks, plus new events (`pre_command`, `pre_transcription`, API-layer hooks, streaming hooks, kanban worker-lifecycle hooks `on_kanban_worker_spawned/exited/stale_claim`, `on_kanban_task_updated`, `on_kanban_dispatch_tick`). `SKILL.md` and `docs/compatibility-matrix.md` were stale at "four roots" and are now corrected to match `docs/plugin-packaging.md`. Sources: <https://hermes-agent.nousresearch.com/docs/user-guide/features/plugins>, <https://hermes-agent.nousresearch.com/docs/user-guide/features/hooks>.
- **Claude Code's `skillOverrides` gained a fourth state.** `docs/skill-lifecycle.md`: now `"on"`, `"name-only"`, `"user-invocable-only"` (new — hidden from Claude, still in the `/` menu), and `"off"`, cycled with Space in the `/skills` menu. Source: <https://code.claude.com/docs/en/skills>, verified 2026-09-11.
- **Antigravity `plugin.json` schema also permits an optional `$schema` field** (previously recorded as only `name`+`description`). Recorded in source notes. Source: <https://antigravity.google/docs/cli/plugins>.
- **Billing status remains paused.** Re-verified against <https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan>: the June 15 Agent SDK change is still paused verbatim, `claude -p` / Agent SDK usage still draws from subscription usage limits, and the `ANTHROPIC_API_KEY` API-billing caveat is unchanged. Status stamps in `docs/cli-invocation.md` and `docs/cloud-automation.md` advanced to 2026-09-11.
- **Remaining model lineups (Codex GPT-6 Astra family, Grok 4.6/4.5 + reasoning tiers, gajae-code README) re-verified with no further drift.** `Last reviewed` stamps in `docs/models/codex.md` and `docs/models/grok.md`, and the gajae-code re-verification dates across `docs/compatibility-matrix.md` and `docs/plugin-packaging.md`, advanced to 2026-09-11. gajae-code stays flagged community/non-vendor everywhere referenced.
- **Session resume, CLI spawn/headless, project-instruction-file, and completion-stack categories re-verified across all tracked runtimes with no further drift** — Codex (`resume`/`fork`/`archive`/`delete`, `/goal edit`), Claude Code (cross-project `--resume` by session ID, `--from-pr`, transcript path truncation), Grok (`-p/-c/-r/-s`, `~/.grok/sessions`), Hermes (`--resume`/`-r`, `--continue`/`-c`, `~/.hermes/state.db`, worktree flags), Antigravity CLI (headless `-c`/`--conversation`, session cache path, migration paths, `GEMINI.md` legacy behavior). `Last reviewed` / `verified` stamps across `docs/models/*.md`, `docs/completion-stack.md`, `docs/compatibility-matrix.md`, and `docs/plugin-packaging.md` advanced to 2026-09-11. Minor drift-history notes appended to `docs/official-sources.json` for several sources; no further repo-doc edits needed beyond what's listed above.

## Unreleased — 2026-09-10

Daily refresh (verification focused on the mandatory time-sensitive claims — billing status and model lineups — plus a spot-check of session-resume for Claude/Grok and the gajae-code README). One real drift found: a new Codex model shipped.

### Changed

- **New Codex model: GPT-6 Astra (`gpt-6-astra`).** `docs/models/codex.md` now lists it as the GPT-6-generation flagship, positioned above the GPT-5.6 family (Sol/Terra/Luna), selectable via `codex -m gpt-6-astra`, available across ChatGPT desktop/web, Codex CLI, Codex IDE extension, Codex cloud, ChatGPT Credits, and API access. The page now lists eight current shipping ids, not seven.
- **Billing status remains paused.** Re-verified against `https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan`: the June 15 Agent SDK change is still paused verbatim, `claude -p` / Agent SDK / third-party app usage still draws from subscription usage limits, and the `ANTHROPIC_API_KEY` API-billing caveat is unchanged. Status stamps in `docs/cli-invocation.md` and `docs/cloud-automation.md` advanced to 2026-09-10.
- **Other vendor model lineups re-verified with no drift.** Claude (Fable 5 / Opus 5 / Sonnet 5 / Haiku 4.5), Grok (Text/Imagine/Voice tables, `xhigh` split), Cursor (both usage pools, Auto modes), and Gemini (Stable/Preview split, shut-down list) all match their official pages; `Last reviewed` stamps in `docs/models/claude.md`, `docs/models/grok.md`, `docs/models/cursor.md`, and `docs/models/gemini-antigravity.md` advanced to 2026-09-10.
- **Session resume spot-check unchanged.** Claude Code's `--continue`/`--resume`/`--from-pr` forms and `~/.claude/projects/<project>/<session-id>.jsonl` transcript path, and Grok's `-c/--continue`, `-r/--resume <ID>`, `-s/--session-id <ID>` with `~/.grok/sessions` storage, both match `docs/compatibility-matrix.md` unchanged.
- **gajae-code README re-verified unchanged** (community/non-vendor; skills, hooks, plugins, and session resume all still documented as before). Re-verification date in `docs/cli-invocation.md` advanced to 2026-09-10.

## Unreleased — 2026-08-29

Daily refresh (verification fetched 2026-08-29; all 68 sources reachable, none unverified this run). No vendor drift: every tracked capability, lineup, and status claim re-verified unchanged. One fetch-method correction landed, plus the time-sensitive stamp advance.

### Changed

- **The Gemini model page is reachable with plain `curl` after all — the "headless render only" note was too strong.** A cookie-jar request (`curl --compressed -c <jar> -b <jar>`) absorbs the consent cookie the redirect chain sets and returns the full page, footer `Last updated 2026-08-27 UTC`, with the complete model tables including `gemini-3.7-flash`. Only a cookieless `curl` falls into the Google OAuth `auto_signin` redirect loop, which is what the earlier note generalized from. `docs/models/gemini-antigravity.md` now records both working routes (cookie-jar curl, headless render) instead of declaring static fetching impossible; `?hl=en` stays mandatory for the browser-locale trap. The lineup itself re-verified unchanged.
- **Billing status remains paused.** The June 15 Agent SDK notice is verbatim-unchanged: Agent SDK, `claude -p`, and third-party app usage still draw from subscription usage limits, the previously announced monthly credit remains unavailable, and the `ANTHROPIC_API_KEY` API-billing caveat is still present on the subscription page. Status stamps advanced to 2026-08-29.
- **Vendor model lineups re-verified with no drift.** Claude (Fable 5 / Opus 5 / Sonnet 5 / Haiku 4.5, the `high` effort defaults, the 1M context rows, and the six-model legacy list), Codex (the same seven listed ids and the 2026-08-31 GPT-5.4 / GPT-5.4-mini retirement, still two days out), Grok (Text/Imagine/Voice tables from the Markdown twin, the `xhigh` split between 4.6 and 4.5, the deprecated `grok-voice-think-fast-1.0` row), Cursor (both usage pools, all three Auto modes billing at routed list price, Legacy Enterprise Auto until 2026-09-07, and the $0.25 Cursor Token Rate with first-party models exempt), and Gemini (same Stable/Preview split, same four shut-down entries, deprecated Imagen 4) all match their official pages. Hermes still documents no lineup and remains reviewed-not-verified. Model freshness stamps advanced to 2026-08-29.
- **Hooks, project instruction files, session resume, CLI spawn, skills, and plugins re-verified unchanged.** Codex's `AGENTS.override.md` → `AGENTS.md` → `project_doc_fallback_filenames` root-to-cwd walk with the once-per-run 32 KiB cap, Claude's `CLAUDE.md` / `CLAUDE.local.md` ancestor-eager plus subdirectory-lazy loading and the `/import` one-time conversion, Grok's six-name project-rules family with `.gitignore` skipping and no size cap, Hermes's `.hermes.md` first-match chain with the git-root-to-cwd `AGENTS.md` merge, Codex's hook tool-coverage table (hosted tools such as `WebSearch` still the documented exception), Claude's `--effort` / `--advisor` / `--bare` / `setup-token` flag set and cross-project resume-by-id (`v2.1.223+`), Codex's `resume` / `fork` / `archive` id-over-name precedence, Grok's `~/.grok/sessions` store with `--no-auto-update` and `--no-alt-screen` anchored on the headless-scripting page, and the `/goal` idle check-in cap of three per goal (`v2.1.246`) all match what is already recorded. The gajae-code README re-verified unchanged, including the `.gjc/skills/` and `~/.gjc/agent/skills/` runtime load set with `.claude/skills/` and `.codex/skills/` as import sources only.
- **Antigravity docs site banner advanced to CLI v1.1.22** (was v1.1.14) with Antigravity 2.0 v2.11.0; documented CLI surfaces unchanged. Recorded in the manifest note only.

## Unreleased — 2026-08-28

Daily refresh (verification fetched 2026-08-28; all 68 sources reachable, none unverified this run). Two documented drifts landed this run — one new version-stamped behaviour cap on Claude's `/goal`, and one non-vendor claim that inverted (a discovery root turned out to be an import source) — plus the usual time-sensitive stamp advance.

### Changed

- **Claude Code caps idle `/goal` check-ins at three per goal.** A new version stamp, `v2.1.246`, appears on the `/goal` page: "Claude Code starts at most three idle check-ins per goal between your prompts. In the third idle check-in, Claude Code says that idle check-ins are paused until you send another prompt. Before v2.1.246, idle check-ins were uncapped." Turn-end check-ins carry no cap, so a `-p` run — which only ever receives turn-end check-ins — is unaffected, while an idle interactive session stops self-nudging after three tries and waits for the user. `docs/completion-stack.md` records the cap next to the existing `v2.1.234` / `v2.1.236` / `v2.1.239` stamps. The rest of the page re-verified unchanged: the 4,000-character condition cap, the three verdicts, the prompt-based-Stop-hook wrapper, the default-Haiku evaluator, the four unrecoverable failures, and the geometric check-in backoff.
- **gajae-code's Claude/Codex skill directories are import sources, not discovery roots — the earlier reading is retired.** The README now states the boundary explicitly: "GJC uses the Claude Code / Codex SKILL.md file convention, but loads runtime skills directly only from canonical GJC locations", and "Claude Code and Codex skill directories are import sources only. `gjc skills discover` reports them with the exact copy command; copy a skill into a canonical `.gjc` location before invoking it with `/skill:my-skill`." So the runtime load set is `.gjc/skills/` (project) and `~/.gjc/agent/skills/` (user) only — `.claude/skills/` and `.codex/skills/` require a copy-in first. This inverts a long-standing claim, so all mirrors were corrected: `SKILL.md` (both the surface table and the project-instruction row), `docs/compatibility-matrix.md` (three rows), and `docs/plugin-packaging.md` (two places). Also re-confirmed verbatim: "The four bundled workflow skills above can never be replaced by disk skills." Every row stays flagged community/non-vendor. Unchanged: MIT/beta, the `/skill:<name>` colon form, the tagged-prebuilt `install.sh` / `install.ps1` install with `--channel nightly`, the broker-bound `gjc sdk session` CLI with `session.resume`, `gjc mcp-serve coordinator`, `/extensions`, `gjc customize doctor`, no headless one-shot mode, and no project-instruction-file loader.
- **Billing status remains paused.** The June 15 Agent SDK notice is verbatim-unchanged: Agent SDK, `claude -p`, and third-party app usage still draw from subscription usage limits, the previously announced monthly credit remains unavailable, and the `ANTHROPIC_API_KEY` API-billing caveat is still present on the subscription page. Status stamps advanced to 2026-08-28.
- **Vendor model lineups re-verified with no drift.** Claude (Fable 5 / Opus 5 / Sonnet 5 / Haiku 4.5, the `high` effort defaults, the 1M context rows, and the six-model legacy list), Codex (the same seven listed ids, the Low→Ultra effort ladder, and the 2026-08-31 GPT-5.4 / GPT-5.4-mini retirement), Grok (Text/Imagine/Voice tables from the Markdown twin, the `xhigh` split between 4.6 and 4.5, and multi-agent effort as collaborator count), Cursor (both usage pools, all three Auto modes billing at routed list price, Legacy Enterprise Auto until 2026-09-07, and the $0.25 Cursor Token Rate with first-party models exempt), and Gemini (same Stable/Preview split and endpoint table, same four shut-down entries, deprecated Imagen 4) all match their official pages. Hermes still documents no lineup and remains reviewed-not-verified. The Gemini page footer advanced to "Last updated 2026-08-27 UTC" and `docs/models/gemini-antigravity.md` carries the new stamp; `?hl=en` on the headless render remains mandatory. Model freshness stamps advanced to 2026-08-28.
- **Hooks, project instruction files, session resume, CLI spawn, skills, and plugins re-verified unchanged.** Claude's 31 lifecycle events (`DirectoryAdded` included), Codex's `AGENTS.override.md` → `AGENTS.md` → `project_doc_fallback_filenames` root-to-cwd walk with the once-per-run 32 KiB cap, Claude's `CLAUDE.md` / `CLAUDE.local.md` / `@import` four-hop loading plus `claudeMdExcludes`, Grok's six-name project-rules family and fail-open hook contract, Hermes's `.hermes.md` first-match chain with the git-root-to-cwd `AGENTS.md` merge and 5-parent ancestor walk, Cursor's `.cursor/hooks.json` scopes and `agent` binary naming, Antigravity's plugin layout and still-absent `/memory` command, Codex's `.codex-plugin/plugin.json` stub-plus-builder-docs split, and every runtime's resume invocation, session store, and headless flags all match what is already recorded.

## Unreleased — 2026-08-27

Daily refresh (verification fetched 2026-08-27; all 68 sources reachable, none unverified this run). One large non-vendor drift (the gajae-code README was substantially rewritten and two of its long-standing `not documented` verdicts no longer hold), one new Stable Gemini model, and a verification-method correction that would have caused a false mass-retirement reading — plus the usual time-sensitive stamp advance.

### Changed

- **gajae-code's README was rewritten; hooks and plugin bundles stop being flatly `not documented`, and the install method changed.** The documentation index now links `docs/hooks.md` and `docs/gjc-plugins.md` ("Plugin bundles") alongside Skills and Standalone MCP, and `/extensions` is documented as the interactive customization surface that "configures skills, hooks, and MCPs" across project (`<project>/.gjc/`) and user-global (`~/.gjc/agent/`) scopes, with import-from-Claude-Code/Codex, enable/disable/remove, and trust diagnostics; `gjc customize doctor` reports `plugin` as one discovered customization source. The README still gives no hook event list, no hook file format, and no bundle manifest schema, so those specifics stay `not documented` — the detail pages are not tracked sources. Skill locations are stated literally again and moved: project-local `.gjc/skills/`, `.claude/skills/`, or `.codex/skills/`; user-wide `~/.gjc/agent/skills/` (new `agent/` segment), with `skills.trustProjectSkills` / `skills.trustUserSkills` / `skills.enabled` trust switches and `gjc skills discover`. Install is no longer `bun install -g gajae-code` (the scoped `@gajae-code/coding-agent` package is gone from the README): it is a tagged prebuilt binary via `scripts/install.sh` or `install.ps1`, with `--channel nightly`; Bun is only for building from source. External control renamed from `gjc daemon session` to the broker-bound `gjc sdk session` CLI, whose allowlisted lifecycle ops include `session.resume` — so session ids exist on the SDK path even though no CLI `--resume` flag is documented. The Coordinator MCP bridge is documented concretely this run (`gjc mcp-serve coordinator`, installed by `gjc setup hermes`), ending three readings of "absent". The "not a hidden plugin for Codex CLI, Claude Code, OpenCode, or Claw Code" sentence is gone; the boundary survives as a table ("GJC does not become a Claude Code extension", "GJC does not install into or replace Claw Code"). Unchanged: MIT/beta, `/skill:<name>` colon form, the four bundled skills and four role agents with custom-agent authoring still undocumented, no headless one-shot mode, and no project-instruction-file loader — `.claude/skills/` and `.codex/skills/` are skill discovery, not instruction loading. All four mirrors updated (`SKILL.md`, `docs/compatibility-matrix.md`, `docs/cli-invocation.md`, `docs/plugin-packaging.md`), and every row stays flagged community/non-vendor.
- **Gemini added a new Stable speech-to-text model.** Gemini 3.5 Transcribe ships as **New Stable** with two endpoints, `gemini-3.5-transcribe` and `gemini-3.5-transcribe-live` — low-latency STT with utterance-based language detection, speaker diarization, word-level timestamps, and custom vocabulary biasing. `docs/models/gemini-antigravity.md` records it. The page advanced to "Last updated 2026-08-26 UTC"; the rest of the lineup re-verified unchanged (`gemini-3.7-flash` still the leading New Stable Flash id, 3.6 Flash previous-generation, 3.5 Flash legacy, the same four shut-down entries and deprecated Imagen 4).
- **`?hl=en` on the Gemini model page is now mandatory, not cosmetic.** A headless render in the browser locale (`hl=ko`) returned a stale translated build whose "All Gemini 3 models" table topped out at `gemini-3.5-flash` and carried no 3.7 or 3.6 row at all — recording it would have logged a mass retirement that did not happen. The English build, rendered the same second, carries the full current table. `docs/models/gemini-antigravity.md` states the trap rather than the milder "unless you want the browser-locale translation".
- **Billing status remains paused.** The June 15 Agent SDK notice is verbatim-unchanged: Agent SDK, `claude -p`, and third-party app usage still draw from subscription usage limits, the separate monthly credit remains unavailable, and the `ANTHROPIC_API_KEY` API-billing caveat is still present on the subscription page. Status stamps advanced to 2026-08-27.
- **Vendor model lineups re-verified with no drift.** Claude (Fable 5 / Opus 5 / Sonnet 5 / Haiku 4.5 with the `high` effort defaults, 1M context rows, and the legacy list), Codex (the same seven listed ids, the Low→Ultra effort ladder, and the 2026-08-31 GPT-5.4 / GPT-5.4-mini retirement), Grok (Text/Imagine/Voice tables read from the Markdown twin, the `xhigh` split between 4.6 and 4.5, and multi-agent effort as collaborator count), and Cursor (both usage pools, the three Auto modes billing at routed list price, Legacy Enterprise Auto until 2026-09-07, and the $0.25 Cursor Token Rate with first-party models exempt) all match their official pages. Hermes still documents no lineup and remains reviewed-not-verified. Model freshness stamps advanced to 2026-08-27.
- **Hooks, project instruction files, session resume, skills, plugins, and the completion stack re-verified unchanged.** Codex's hooks Tool-coverage table (`apply_patch` / `spawn_agent` / `update_plan` matched, hosted `WebSearch` exempt), Claude's twelve hook events plus `ConfigChange` / `asyncRewake` / `updatedInput` / `updatedToolOutput`, Codex's `AGENTS.override.md` → `AGENTS.md` root-to-cwd walk, Claude's `CLAUDE.md` / `CLAUDE.local.md` / `@import` loading, Grok's six-name project-rules family, Hermes's `.hermes.md` precedence, Antigravity's "identical workspace context rules" (`GEMINI.md` + `AGENTS.md`, global `~/.gemini/GEMINI.md`), and every runtime's resume invocation and store all match what is already recorded.

## Unreleased — 2026-08-26

Daily refresh (verification fetched 2026-08-26; all 68 sources reachable, none unverified this run). Three documented drifts landed this run — one pricing-section restructure, one capability that stopped being "not documented", one quoted string the vendor reworded — plus a verification-method correction and the usual time-sensitive stamp advance.

### Changed

- **Cursor's Auto modes were restructured, and the flat per-million Auto tier is now legacy-only.** The mode names dropped their prefix — "Auto has three modes: Cost, Balance, and Intelligence" — and the per-mode pricing split is gone: "All Auto modes bill at the list price of the model each request is routed to." The per-million-regardless-of-model rate survives only under a new **Legacy Enterprise Auto** heading, "Until September 7, 2026, Enterprise Auto pricing is set per million tokens, regardless of which model is used." Newly explicit alongside it: the Cursor Token Rate exempts first-party Cursor models ("First-party Cursor models, including Grok and Composer, are exempt"), Cursor Router picks the Auto model "based on your optimization mode", and Max Mode now sits under "Legacy request-based pricing" at the model's API rate plus 20%. `docs/models/cursor.md` records the current shape; every model row, both usage pools, and the Start-plan fixed-medium-effort rule re-verified unchanged.
- **Hermes documents a file/stdin prompt path — the "not documented" cell is retired.** The CLI page shows `hermes chat --query-file prompt.txt` and `hermes chat --query-file - < prompt.txt`, with the guarantee that "nothing is shell-interpreted, so arbitrary text (quotes, `$(...)`, backticks) arrives verbatim". `docs/cli-invocation.md`'s Hermes **Prompt / stdin** cell now states it. Hermes still documents no JSON output-format flag, so that cell stays `not documented`.
- **The Codex `codex delete --force` quote was reworded by the vendor.** "Bypasses confirmation for UUIDs only" has zero hits on the developer-commands page. The option table now reads "Delete without prompting. The session argument must be a UUID; names still require interactive confirmation.", with the prose below it saying "Use `--force` only with a session UUID. Named sessions still require confirmation so Codex doesn't delete a repeated or ambiguous name without a prompt." Substance is unchanged; both mirrors (`docs/cli-invocation.md`, `docs/compatibility-matrix.md`) now carry the live wording instead of a quote the page no longer contains. Note the option table is client-rendered — the Markdown twin omits it, so it needs a headless render to read.
- **The Gemini model page's fetch recipe stopped working.** The recorded method — request `ai.google.dev/gemini-api/docs/models` **without** following redirects — now returns a bodyless `302` to `accounts.google.com`, while a following request exhausts the redirect limit in the `auto_signin` loop. The page is reachable this run only through a headless render (`kuma agent-browser render --url … --settle-ms 6000 --scroll-passes 25`; add `?hl=en` or the render comes back in the browser locale), which returns the full model tables. `docs/models/gemini-antigravity.md` records the working route. Content itself re-verified unchanged: still stamped "Last updated 2026-08-14 UTC", `gemini-3.7-flash` still the leading Stable Flash id, same four shut-down entries plus deprecated Imagen 4.
- **Billing status remains paused.** The June 15 Agent SDK notice is verbatim-unchanged: Agent SDK, `claude -p`, and third-party app usage still draw from subscription usage limits, the separate monthly credit remains unavailable, and the `ANTHROPIC_API_KEY` API-billing caveat is still present on the subscription page. Status stamps advanced to 2026-08-26.
- **Model lineups re-verified with no drift.** Claude (Fable 5 / Opus 5 / Sonnet 5 / Haiku 4.5, the six-model legacy list, the `high` effort defaults and 1M context rows), Codex (the same seven listed ids, the Low→Ultra effort ladder, and the 2026-08-31 GPT-5.4 / GPT-5.4-mini retirement), Grok (Text/Imagine/Voice tables, the `xhigh` split between 4.6 and 4.5, multi-agent effort as collaborator count, and the May 15 retirement page with all eight redirect targets), Gemini, and Cursor all match their official pages. Hermes still documents no lineup and remains reviewed-not-verified. Model freshness stamps advanced to 2026-08-26.
- **Hooks, project instruction files, session resume, skills, plugins, and the completion stack re-verified unchanged.** Codex's `AGENTS.override.md` → `AGENTS.md` → `project_doc_fallback_filenames` root-to-cwd walk with the once-per-run 32 KiB cap, Claude's `CLAUDE.md` / `.claude/rules/` / `claudeMdExcludes` loading surface, Grok's six-name project-rules family, Hermes's `.hermes.md` precedence and `SOUL.md` split, `/goal`'s three verdicts and transcript-only evaluator, Codex `/goal edit` still doc-anchored on developer-commands, and every runtime's resume invocation and store all match what is already recorded.

## Unreleased — 2026-08-25

Daily refresh (verification fetched 2026-08-25; all 68 sources reachable, none unverified this run). Two documented drifts landed this run — one model claim that moved pages and gained a deprecation, one version stamp the docs no longer support — plus a source-anchor split on the Codex packaging page and the usual time-sensitive stamp advance.

### Changed

- **Claude Mythos moved off the models overview, and Mythos Preview is now deprecated.** The models overview no longer mentions Mythos or Project Glasswing anywhere; its current table, legacy list, and prose carry only Fable 5 / Opus 5 / Sonnet 5 / Haiku 4.5 and the legacy 4.x rows. Mythos is still documented, on its own page `platform.claude.com/docs/en/models/mythos-5/overview`: `claude-mythos-5` is "offered separately, by invitation only, for defensive cybersecurity workflows as part of Project Glasswing", shares Claude Fable 5's specifications and pricing, omits Fable 5's safety classifiers, and is reached through an Anthropic, AWS, or Google Cloud account team. Newly documented: `claude-mythos-preview` is **deprecated** with `claude-mythos-5` as its stated migration target. `docs/models/claude.md` now records the split anchor and the deprecation, and neither id is a spawnable catalog entry.
- **The `/goal` "v2.1.139+" stamp is retired — the page never states an introducing version.** `v2.1.139` has zero hits on `/docs/en/goal`; the only version stamps it carries are `v2.1.234` (check-ins), `v2.1.236` (idle check-ins), and `v2.1.239` (goal restored on every resume route, and the check-in backoff change). `docs/completion-stack.md` drops the stamp from the source line and the misreading-traps entry and states which versions the docs actually attest, rather than carrying an undocumented number. The 4,000-character condition cap, the three verdicts, the prompt-based-Stop-hook wrapper, the default-Haiku evaluator, and `ANTHROPIC_DEFAULT_HAIKU_MODEL` all re-verified present.
- **Codex plugin-hook packaging detail now has a single doc owner.** The relocated packaging page (`developers.openai.com/plugins/build/plugins`) dropped `PLUGIN_ROOT`, `PLUGIN_DATA`, `CLAUDE_PLUGIN_ROOT`, `CLAUDE_PLUGIN_DATA`, `${PLUGIN_ROOT}` substitution, and the "single path / array of paths / inline hooks object" manifest shapes; all of them are stated verbatim on `learn.chatgpt.com/docs/hooks`, which is already a registered source, so the claims keep an owner instead of being retired. Still on the packaging page and re-verified: the three local marketplace files, the `~/.codex/plugins/cache/$MARKETPLACE_NAME/$PLUGIN_NAME/$VERSION/` install cache with `$VERSION=local`, the `codex plugin marketplace` verbs, and manifest fields `skills` / `mcpServers` / `apps` / `hooks`. Additive there: git-backed (`url`, `git-subdir` with `ref` or `sha`) and npm marketplace entries, `policy.installation` / `policy.authentication` per entry, per-plugin enable state in `~/.codex/config.toml`, and workspace publishing gated by `features.plugin_sharing = false`.
- **Billing status remains paused.** The June 15 Agent SDK notice is verbatim-unchanged: Agent SDK, `claude -p`, and third-party app usage still draw from subscription usage limits, the separate monthly credit remains unavailable, and the `ANTHROPIC_API_KEY` API-billing caveat is still present on the subscription page. Status stamps advanced to 2026-08-25.
- **Model lineups re-verified with no drift.** Claude (Fable 5 / Opus 5 / Sonnet 5 / Haiku 4.5, the legacy 4.x rows, and `claude-opus-4-1-20250805` still retired), Codex (the same seven listed ids and the 2026-08-31 GPT-5.4 / GPT-5.4-mini retirement), Grok (Text/Imagine/Voice tables and the May 15 retirement page), Gemini, and Cursor (both usage pools, Gemini 3.7 Flash / GLM 5.2 / Kimi K2.7 Code / K3 still listed, still no deprecation page) all match their official pages. Hermes still documents no lineup and remains reviewed-not-verified. Model freshness stamps advanced to 2026-08-25.
- **Hooks, project instruction files, session resume, skills, plugins, and the completion stack re-verified unchanged.** Codex's `AGENTS.override.md` → `AGENTS.md` → `project_doc_fallback_filenames` root-to-cwd walk with a once-per-run 32 KiB cap, Claude's CLAUDE.md load order, Cursor's `agent` binary naming (still no `cursor-agent` string), `/memory` still absent from the `agy` command set, Hermes's `-q` / `-z` single-query entry points and full `ctx.register_*` plugin surface, and every runtime's resume invocation and store all match what is already recorded.

## Unreleased — 2026-08-24

Daily refresh (verification fetched 2026-08-24; all 68 sources reachable, none unverified this run). Three documented drifts landed this run — one doc-set restructure, one retired claim that the docs never actually supported, and one description that moved pages — plus the usual time-sensitive stamp advance.

### Changed

- **The Claude Code settings docs split into three pages, and the key reference moved.** `/docs/en/settings` is now a task page (settings files and who they affect, changing a setting, precedence, cloud sessions) and no longer carries the key table. The complete per-key reference — scope, type, default, and an index of every key, grouped into 18 sections from "Model and responses" through "Global config settings" — is now `/docs/en/settings-reference`, and paste-ready developer/team/organization files are `/docs/en/settings-example`. All 66 recorded keys were re-verified present on the reference page, so this is a relocation, not a capability change; the manifest source `anthropic-claude-settings` now points at the reference page, and `docs/plugin-packaging.md` records which of the three to cite. The `/goal` page already links the new path (`settings-reference#allowmanagedhooksonly`).
- **The Antigravity SDK's "lifecycle hooks Inspect/Decide/Transform across nine points" claim is retired — the docs never say it.** With the site correctly fetched as server-rendered Markdown, `/docs/sdk/overview` is a quickstart plus a next-steps index, and the hook content lives on `/docs/sdk/lifecycle`, which documents decorator hooks (`@hooks.pre_turn`, `@hooks.on_tool_error`) returning `types.HookResult(allow=True)` and registered via `LocalAgentConfig(hooks=[...])`, schedule/event triggers (`triggers=[every(60, fn)]`), and session persistence (`save_dir`, `app_data_dir`, and a `conversation_id` of at least 32 alphanumeric-or-hyphen characters — underscores rejected). No hook-point count and no Inspect/Decide/Transform taxonomy appears anywhere; the earlier claim came from a dynamic render of a page that does not need one, and dynamic rendering is no longer the verification route for this host. Also newly recorded: `LocalAgentConfig(vertex=True, project=…, location=…)` (or `GOOGLE_GENAI_USE_VERTEXAI`) targets Gemini Enterprise Agent Platform, formerly Vertex AI, and the managed cloud REST/gRPC path is the separate Gemini API Antigravity Agent doc. Recorded in `docs/cli-invocation.md`.
- **Cursor's model descriptions moved off the pricing page onto per-model pages.** Models & Pricing now carries rates and short caveats only; each row links to `cursor.com/docs/models/<slug>`, which is where the prose lives. Composer 2.5's description is accordingly re-anchored to `/docs/models/cursor-composer-2-5` and reworded — "Composer 2.5 is Cursor's own agentic model. It builds on **Composer 2** with stronger intelligence on long agentic tasks, better effort calibration, tool selection, intent understanding, and reliability" — retiring the older "trained to be highly capable for agentic coding" quote and naming Composer 2, not Composer 1, as the stated predecessor. The fast variant is the product default; the standard tier is the cost-optimized one. Composer 1 is still absent with no retirement notice, and Cursor still documents no deprecation page.
- **Billing status remains paused.** The June 15 Agent SDK notice is verbatim-unchanged: Agent SDK, `claude -p`, and third-party app usage still draw from subscription usage limits, the separate monthly credit remains unavailable, and the `ANTHROPIC_API_KEY` API-billing caveat is still present on the subscription page. Status stamps advanced to 2026-08-24.
- **Model lineups re-verified with no drift.** Claude (Fable 5 / Opus 5 / Sonnet 5 / Haiku 4.5 plus the invitation-only Mythos pair), Codex (the same seven listed ids, `gpt-5.6` still example shorthand only, and the 2026-08-31 GPT-5.4 / GPT-5.4-mini retirement), Grok (Text/Imagine/Voice tables and the `grok-4.6` `xhigh` split), Gemini (page still stamped "Last updated 2026-08-14 UTC", same four shut-down entries), and Cursor's two usage pools all match their official pages. Hermes still documents no lineup and remains reviewed-not-verified. Model freshness stamps advanced to 2026-08-24.
- **Hooks, project instruction files, session resume, skills, plugins, and the completion stack re-verified unchanged.** Claude's 31 lifecycle events including `DirectoryAdded`, Codex's `AGENTS.override.md` → `AGENTS.md` → `project_doc_fallback_filenames` root-to-cwd walk with no subdirectory lookahead and a once-per-run 32 KiB build, Claude's CLAUDE.md load-order table, the six Codex plugin components, `/goal`'s three verdicts and four unrecoverable errors, and every runtime's resume invocation and store all match what is already recorded.

## Unreleased — 2026-08-22

Daily refresh (verification fetched 2026-08-22; all 68 sources reachable, none unverified this run). Four documented-capability drifts landed this run, plus two verification-method corrections and the usual time-sensitive stamp advance.

### Changed

- **Codex background hooks are implemented, not a parsed-and-skipped field.** The hooks page carries a dedicated "Run hooks in the background" section: `"async": true` on a command handler lets Codex continue while the hook runs, with `hooks.json` and `config.toml` examples. Background hooks keep the same input, matcher, trust review, timeout, and large-output handling as synchronous ones, and `SessionEnd` hooks always run synchronously even when `async` is set. The previous "`async` is parsed but async command hooks are unsupported, so those handlers are skipped too" reading is retired in both mirrors (`SKILL.md`, `docs/compatibility-matrix.md`). `prompt` / `agent` handler types, `updatedMCPToolOutput`, and `suppressOutput` remain parsed-but-unimplemented.
- **Claude `/goal` evaluates to three verdicts, ends on four unrecoverable errors, and backs off its check-ins.** The evaluator returns *Not yet met* / *Met* / *Impossible* — not a yes/no; *Impossible* clears the goal and records a failed entry with no manual clear. A new "Errors you have to fix clear the goal" section names exactly four causes (auth failure when Claude Code manages its own credentials, exhausted credit balance, a context overflow auto-compaction could not clear, an unavailable model); every other failure including rate limits leaves the goal active. Background-work check-ins now **double** each interval up to 4x the first (default: 1 hour after the first, then every 2 hours) — before v2.1.239 only idle check-ins backed off. A goal is restored on **every** resume route including the `claude --resume` picker (v2.1.239+), and a stall guard stops the loop and hands back control, goal still set, when Claude answers the evaluator without tool use for several turns. `ANTHROPIC_DEFAULT_HAIKU_MODEL` selects the evaluator model.
- **Antigravity headless gained `--input-format`, turning `agy` into a long-lived multi-turn process.** The flag reference now lists `--input-format text|stream-json` ("reads prompts on stdin"), and the page gained "Stream prompts from stdin", "Drive a session programmatically", "End a session", and "Unsupported messages" sections. With `stream-json` (which requires `--output-format stream-json`) the CLI consumes one `{"event":"user","message":{"content":…}}` object per line and emits exactly one `result` event per turn, so a script can hold the pipe open and skip startup cost between turns; closing stdin ends the session with exit 0. Both mirrors updated (`SKILL.md` → CLI Spawn And Headless Launch, `docs/cli-invocation.md`).
- **gajae-code's fourth bundled workflow skill is `autoresearch`, not `team`.** The README's "Workflow surface" reads "four skills, four role agents, nothing else" and lists `deep-interview` → `ralplan` → `ultragoal` plus `autoresearch` ("Runs goal-directed research missions and ends on a structured verdict"); `computer-use` ships alongside as an opt-in experimental extra. Corrected in all three mirrors (`SKILL.md`, `docs/compatibility-matrix.md`, `docs/plugin-packaging.md`). Still community/non-vendor, and hooks / plugins / project-instruction loading / session-id resume all remain `not documented`.
- **The Antigravity docs site is server-rendered — the "JS-rendered SPA" verification rule is retired.** `antigravity.google/docs/*` fetches statically with `curl --compressed`, and every page also serves a plain-Markdown twin at `<page>.md` (e.g. `/docs/cli/headless.md`). The symptom that used to read as "200 with an empty shell" is a **missing decompression step**, not a JS shell — an undecoded fetch renders the compressed body as binary garbage. The routine prompt and `docs/models/gemini-antigravity.md` now say so, and the same prompt's stale "for Antigravity the lack of a headless flag" phrasing was dropped (`agy -p` has been documented since 2026-07-28).
- **Two more fetch gotchas recorded so a rendering artifact is never read as drift.** On `docs.x.ai` the models overview's pricing tables are client-rendered — a static HTML fetch shows only the `grok-4.6` / Voice / Imagine cards and none of the per-id rows, so diff the Markdown twin at `docs.x.ai/developers/models.md` instead. And `ai.google.dev/gemini-api/docs/models` must be requested **without** following redirects: a redirect-following fetch bounces to a Google OAuth `auto_signin` URL and never returns the doc.
- **Claude sessions resume by name or generated title, not only by id.** `claude --resume <name>` accepts a session name or the auto-generated first-prompt/plan title as the handle; the auto-assigned default display name (`my-app-3f`) is a listing label only and does not resolve. Recorded in the `docs/compatibility-matrix.md` Session Resume row.
- **Billing status remains paused.** The June 15 Agent SDK notice is verbatim-unchanged: Agent SDK, `claude -p`, and third-party app usage still draw from subscription limits, the separate monthly credit remains unavailable, and the `ANTHROPIC_API_KEY` API-billing caveat is still present on the subscription page.
- **Model lineups re-verified with no drift.** Claude (Fable 5 / Opus 5 / Sonnet 5 / Haiku 4.5 plus the invitation-only Mythos pair), Codex (the seven listed ids and the 2026-08-31 GPT-5.4 retirement), Grok (Text/Imagine/Voice tables and the `xhigh` split), Cursor (both usage pools), and Gemini/Antigravity all match their official pages; the Gemini page is still stamped "Last updated 2026-08-14 UTC", and the Antigravity `agy models` sample still leads with `gemini-3.7-flash-high`. Hermes still has no official lineup and remains reviewed-not-verified; model and billing freshness stamps advanced to 2026-08-22.
- **Project instruction files, session resume, skills, and plugin packaging re-verified unchanged.** Codex's `AGENTS.override.md` → `AGENTS.md` → `project_doc_fallback_filenames` walk, Grok's six-name rule family and `.gitignore` skipping, Hermes's first-match type plus merged `AGENTS.md` ancestor chain, the Codex/Claude/Grok/Hermes/Antigravity/Cursor resume invocations and stores, Codex's six skill roots and `$<skill-name>` mention form, Cursor's skill frontmatter and hook event set, and the Codex marketplace file paths on the `developers.openai.com` builder page all match what is already recorded.

## Unreleased — 2026-08-21

Daily refresh (verification fetched 2026-08-21; all 68 sources reachable, none unverified this run). Two documented-capability drifts landed this run, plus the usual time-sensitive stamp advance.

### Changed

- **Claude Code hooks gained a `DirectoryAdded` event, bringing the count to 31.** It fires after a working directory is added mid-session with `/add-dir` or by an SDK client's `register_repo_root` control request, and its `matcher` filters on exactly those two sources (`slash_command`, `register_repo_root`). Input adds `directory` (absolute path) and `source`. Claude Code does **not** fire it for the `--add-dir` startup flag (`SessionStart` covers those directories), for adds made on the `/permissions` Workspace tab, or for a directory that is already a working directory. It carries no decision control — the add has already completed, the `continue` field is discarded, and the hook runs in the background on the 600-second default timeout, after sandbox and permission state have been refreshed so sandboxed tools already see the new directory. Output surfaces differently per source: for `slash_command` the hook's `systemMessage` reaches Claude as context on the next turn, while for `register_repo_root` it goes to the debug log only.
- **Cursor skill frontmatter gained `icon` and `color`, and skills can back a Custom Mode.** The skills page now documents that any skill with a valid frontmatter block can back a Custom Mode, which keeps the skill in context for the whole session and shows a badge in the chat input. `icon` takes a name from Cursor's icon set (`code`, `terminal`, `bug`, `git-branch`, `book-open`, `beaker`, `shield`, `rocket`) and `color` is one of `default`, `green`, `cyan`, `blue`, `purple`, `magenta`, `orange`, `yellow`, `red`, `brand`; unrecognized values fall back to the default lightning badge. The optional frontmatter set is therefore five fields, not three. The scoping section also states that the legacy `globs` field is still accepted as a fallback for older skills while new skills should use `paths`. Both mirrors updated (`docs/compatibility-matrix.md`, `docs/plugin-packaging.md`).
- **Billing status remains paused.** The June 15 Agent SDK notice is verbatim-unchanged: Agent SDK, `claude -p`, and third-party app usage still draw from subscription limits, the separate monthly credit remains unavailable, and the `ANTHROPIC_API_KEY` API-billing caveat is still present on the subscription page.
- **Model lineups re-verified with no drift.** Claude (Fable 5 / Opus 5 / Sonnet 5 / Haiku 4.5, the Mythos invitation-only pair, and a legacy accordion still listing Opus 4.8/4.7/4.6, Sonnet 4.6/4.5, and Opus 4.5), Codex (including the GPT-5.6 Luna/Sol/Terra ids), Grok (Text/Imagine/Voice tables), Cursor (both usage pools, with the Grok 4.6 launch-discount window now expired off the table), and Gemini/Antigravity all match their official pages; the Gemini page is still stamped "Last updated 2026-08-14 UTC". Hermes still has no official lineup and remains `unverified this run`; model and billing freshness stamps advanced to 2026-08-21.
- **Codex hooks, Cursor hooks, session resume, and the goal surfaces re-verified unchanged.** Codex's eleven hook events and Tool coverage table, Cursor's cloud-agent supported/unsupported hook split, the Codex/Claude/Grok/Hermes/Antigravity resume invocations and stores (including `codex fork`'s picker-by-default framing and the Antigravity 2.0 desktop-thread import), and Claude `/goal`'s 4,000-character condition cap all match what is already recorded.

## Unreleased — 2026-08-20

Daily refresh (verification fetched 2026-08-20; all 68 sources reachable, none unverified this run). One multi-part capability drift landed this run, plus two mirror corrections and the usual time-sensitive stamp advance.

### Changed

- **Hermes no longer loads a single project instruction file, and it documents a new override filename.** `AGENTS.override.md` joins the priority chain, which now reads `.hermes.md` / `HERMES.md` → `AGENTS.override.md` → `AGENTS.md` → `CLAUDE.md` → `.cursorrules`; it is a personal, per-directory override (typically gitignored) loaded instead of the committed `AGENTS.md` beside it. First-match still picks the context *type*, but when that type is `AGENTS.md` and the working directory sits inside a git repository, Hermes now loads a **merged chain** — the git-root `AGENTS.md` first, then every intermediate directory down to cwd, each with its own provenance header (`## ../../AGENTS.md`), identical copies deduplicated, deeper files later so they take precedence. Outside a git repo only cwd is read, so a stray file in `$HOME` or `/tmp` cannot leak in. The prior "single file, no merge" reading is retired, and Hermes now behaves like Codex on the ancestor axis. Caveat recorded in the manifest: the page's own "How Context Files Are Loaded" walkthrough still shows the old first-match scan, so the Supported Context Files table and Priority system section are treated as normative.
- **Hermes context-file truncation cap is dynamic, not a flat 20,000 characters.** The cap is `context_file_max_chars` from `config.yaml` when set; otherwise it scales with the model's context window between a 20,000-character floor and a 500,000-character ceiling. Over-cap files still truncate 70% head / 20% tail / 10% marker, and progressively discovered subdirectory files stay capped at 8,000 characters.
- **Codex's interactive `PROMPT` positional does not document a stdin form.** `docs/cli-invocation.md` still claimed the interactive launch accepted `PROMPT: string | - (read stdin)`, but the CLI reference types the top-level positional plain `string` ("Optional text instruction to start the session"); the stdin typing appears only on `codex exec`, `codex exec resume`, and `codex review`. The mirror was corrected to match the manifest, which had already recorded the regression.
- **Claude transcript directory names can carry a hash after all.** A working-directory path whose converted name exceeds 200 characters is truncated to 200 and gets a hash of the full path appended, so the "sanitized path, not a hash" shorthand in the compatibility matrix was qualified; it still holds for ordinary-length paths.
- **Billing status remains paused.** The June 15 Agent SDK notice is verbatim-unchanged: Agent SDK, `claude -p`, and third-party app usage still draw from subscription limits, the separate monthly credit remains unavailable, and the `ANTHROPIC_API_KEY` API-billing caveat is still present on the subscription page.
- **Model lineups re-verified with no drift.** Claude (Fable 5 / Opus 5 / Sonnet 5 / Haiku 4.5 plus the legacy accordion), Codex (the seven listed ids and the 2026-08-31 GPT-5.4 retirement), Grok (Text/Imagine/Voice tables and the `xhigh` effort split), Cursor (both usage pools, the Grok 4.6 launch discount, and the Sonnet 5 row without a promotional window), and Gemini/Antigravity all match their official pages; the Gemini page is still stamped "Last updated 2026-08-14 UTC". Hermes still has no official lineup and remains `unverified this run`; model and billing freshness stamps advanced to 2026-08-20.
- **Codex hooks, Grok hooks and rules, Claude `/goal`, and the Antigravity resume surfaces re-verified unchanged.** The Codex Tool coverage table, Grok's six-name rule family and hook trust model, Claude's `/goal` background check-ins, and the Antigravity workspace-keyed conversation cache all match what is already recorded.

- **`SKILL.md` 48.1KB → 24.0KB, applying this package's own Skill Document Topology rule to itself.**
  The body had grown into a condensed restatement of the wiki it points at: Runtime Coverage,
  CLI Spawn, Session Resume, Model Lineup, and Project Instruction Files each carried a summary
  table of what `docs/compatibility-matrix.md`, `docs/cli-invocation.md`, and `docs/models/`
  already own source-cited. By the package's own discriminator those lines existed in two
  places, so they are deleted rather than moved — what remains per section is a pointer plus
  only the consequences an *author* acts on (invocation token is per-engine sugar; Codex never
  reads below cwd; edit the canonical file, not the symlink wrapper).
- **Two genuine splits.** The hook payload/decision/registration schemas move to
  `docs/hook-contract.md` (lookup material, the one legitimate reference shape), and the
  rationale behind Core Rules + Engine × Home moves to `docs/authoring-rules.md`. The body keeps
  each rule in one line; the doc keeps the why and the measured incidents. Zero moved lines
  survive in both files.
- Frontmatter `description` is byte-identical — trigger vocabulary is unchanged.

## Unreleased — 2026-08-19

Daily refresh (verification fetched 2026-08-19; all 68 sources reachable, none unverified this run). Two documented-capability drifts landed this run, plus one new capability, one cleared `unverified` annotation, and the usual time-sensitive stamp advance.

### Changed

- **Codex hook tool coverage is wider than shell, and the "only the simple ones" caveat is retired.** The hooks page now carries an explicit **Tool coverage** table: shell commands (match as `Bash`), unified exec `exec_command` (also `Bash`), `apply_patch` (`apply_patch`/`Edit`/`Write`), MCP tools, and **other local function tools** — matched by function-tool name such as `update_plan`, with `spawn_agent` also matching `Agent` — all fire both `PreToolUse` and `PostToolUse`. Hosted tools such as `WebSearch` are the documented exception: they do not use the local function-tool hook path. `write_stdin` is transport for an existing unified-exec session and does not re-run `PreToolUse`; a later `write_stdin` poll is what delivers the original command's `PostToolUse`. The residual caveat is now "some specialized tool paths can opt out of the default hook path" plus "treat tool hooks as a useful guardrail, not a complete enforcement boundary".
- **Cursor's Claude Sonnet 5 row loses its promotional window.** The Models & Pricing table now notes only "Requires Max Mode on legacy request-based plans; Up to 1M tokens with extended context at the same per-token rates; Uses an updated tokenizer" — the "$2/M input and $10/M output through August 31, 2026" launch window is gone, matching the drop already made in the Claude lineup mirror. (The Grok 4.6 rows carry a separate 50% launch discount for one week starting August 12, 2026.)
- **Claude `/goal` documents background-work check-ins.** When a turn ends and background work has kept the goal waiting 30 minutes or more, Claude Code asks Claude at the next turn end to list running tasks, read their output, keep waiting if they are progressing, and fix or stop stuck ones, repeating after each further 30 minutes. `CLAUDE_CODE_GOAL_CHECKIN_MINUTES` sets the interval and `0` disables it; requires v2.1.234 or later.
- **Codex `/goal edit` is doc-anchored again.** The developer-commands page's `/goal` walkthrough states "Use `/goal edit` to revise the objective", so the narrower sentence's `unverified this run` annotation in `docs/completion-stack.md` is cleared; the source-verified `UpdateExisting` mechanics are unchanged.
- **Billing status remains paused.** The June 15 Agent SDK notice still says Agent SDK, `claude -p`, and third-party app usage draw from subscription limits; the separate monthly credit remains unavailable, and the `ANTHROPIC_API_KEY` API-billing caveat remains present.
- **Model lineups re-verified.** Claude, Codex, Grok, Cursor, and Gemini/Antigravity otherwise match their official model pages; the Gemini page is still stamped "Last updated 2026-08-14 UTC". Hermes still has no official lineup and remains `unverified this run`; model and billing freshness stamps advanced to 2026-08-19.
- **Antigravity pages re-verified.** The CLI reference, headless, plugins, conversations, and resume pages retain their documented surfaces and served clean markdown at their `.md` URLs this run; the site CLI banner moved to v1.1.14 (SDK stays v0.1.12).

## Unreleased — 2026-08-18

Daily refresh (verification fetched 2026-08-18; all 68 sources reachable, none unverified this run). Four documented-capability drifts landed this run, plus the usual time-sensitive stamp advance.

### Changed

- **Grok's models overview lists the full Text API table again.** `grok-4.5` (500k), `grok-4.3`, `grok-4.20-0309-reasoning`, `grok-4.20-0309-non-reasoning`, `grok-4.20-multi-agent-0309` (1M each), and `grok-build-0.1` (256k) all carry pricing rows, so the previous "those rows are absent from the overview" reading is retired. The table shows two rows per model, one for prompts below 200k tokens and one at or above.
- **The Grok Voice API is no longer id-less.** The Voice Pricing section names `grok-voice-think-fast-2.0` and marks `grok-voice-think-fast-1.0` **Deprecated**. Imagine Pricing now names five ids, adding `grok-imagine-image-2.0`.
- **Claude Code `--advisor` accepts `fable`.** The CLI reference now documents "a model alias, `fable`, `opus`, or `sonnet`, or a full model ID", with `fable` requiring Fable 5 access. The earlier "Claude Code doesn't offer Fable 5 as the advisor: `claude --advisor fable` exits with an error" claim is retired.
- **Claude Code resume-by-id is no longer cwd-scoped.** From v2.1.223 a session ID resolves from any directory: Claude Code searches the current project directory and its git worktrees first, then every other project on the machine, resolving only when exactly one other project holds a transcript for that ID. The "restore the original cwd before resuming" footgun note is replaced.
- **Antigravity `agy models` leads with Gemini 3.7 Flash slugs.** The headless-mode sample output now shows `gemini-3.7-flash-high` and `gemini-3.7-flash-medium` ahead of the 3.6/3.5/3.1 slugs and `claude-sonnet-4-6`.
- **Cursor documents plan-tier effort limits and a Teams/Enterprise token rate.** On the Start plan all three Cursor models run in non-fast mode with Grok 4.6 / 4.5 pinned to a fixed medium effort, changeable on Pro and above; Teams and Enterprise third-party requests include a Cursor Token Rate of $0.25 per million tokens.
- **Sonnet 5 pricing loses its promotional window.** The Claude models overview lists Sonnet 5 at $2/$10 per MTok with no end date stated on that page, so the "intro pricing through 2026-08-31" qualifier is dropped from the lineup mirror.
- **Billing status remains paused.** The June 15 Agent SDK notice still says Agent SDK, `claude -p`, and third-party app usage draw from subscription limits; the separate monthly credit remains unavailable, and the `ANTHROPIC_API_KEY` API-billing caveat remains present.
- **Model lineups re-verified.** Claude, Codex, Cursor, and Gemini/Antigravity otherwise match their official model pages. Hermes still has no official lineup and remains `unverified this run`; model and billing freshness stamps advanced to 2026-08-18.
- **Antigravity SPA pages re-rendered.** The CLI reference and headless pages retain their documented surfaces; the site banners remain Antigravity CLI v1.1.13 and SDK v0.1.12.

## Unreleased — 2026-08-16

Daily refresh (verification fetched 2026-08-16; all 68 sources reachable, none unverified this run). Time-sensitive stamps advanced; documented capability surfaces remain unchanged.

### Changed

- **Billing status remains paused.** The June 15 Agent SDK notice still says Agent SDK, `claude -p`, and third-party app usage draw from subscription limits; the separate monthly credit remains unavailable, and the `ANTHROPIC_API_KEY` API-billing caveat remains present.
- **Model lineups re-verified.** Claude, Codex, Grok, Cursor, and Gemini/Antigravity match their official model pages. Hermes still has no official lineup and remains `unverified this run`; model and billing freshness stamps advanced to 2026-08-16.
- **Antigravity SPA pages re-rendered.** The reference, conversations, migration, plugins, usage, install, headless, and SDK pages retain their documented surfaces; the site banners remain Antigravity CLI v1.1.13 and SDK v0.1.12.

## Unreleased — 2026-08-15

Daily refresh (verification fetched 2026-08-15; all 68 sources reachable, none unverified this run). Gemini 3.7 Flash landed across Google and Cursor documentation; time-sensitive stamps advanced.

### Changed

- **Gemini 3.7 Flash is Stable.** Google's model page, last updated 2026-08-14, now lists `gemini-3.7-flash` as the latest and most capable Flash model for complex coding, agentic workflows, and reliable multi-step execution. Gemini 3.6 Flash remains Stable as the previous generation, and Gemini 3.5 Flash remains Stable but is now labelled legacy.
- **Cursor added Gemini 3.7 Flash.** The expanded third-party model table includes Gemini 3.7 Flash alongside the existing Gemini 3.6/3.5 rows, GLM 5.2, and Kimi K2.7 Code/K3.
- **Claude Code added configuration import.** The official memory page now documents `/import` as a one-time conversion of supported coding-agent instructions and related MCP servers, commands, subagents, and skills into Claude Code; it requires v2.1.213 or later.
- **Billing status remains paused.** The June 15 Agent SDK notice still says Agent SDK, `claude -p`, and third-party app usage draw from subscription limits; the separate monthly credit remains unavailable, and the `ANTHROPIC_API_KEY` API-billing caveat remains present.
- **Model lineups re-verified.** Claude, Codex, Grok, Cursor, and Gemini/Antigravity match their official model pages. Hermes still has no official lineup and remains `unverified this run`; model and billing freshness stamps advanced to 2026-08-15.
- **Antigravity SPA pages re-rendered.** The reference, plugins, usage, resume, headless, and SDK pages retain their documented surfaces; the site banners now show Antigravity CLI v1.1.13 and SDK v0.1.12. The reference adds `editorMode` and `vimInsertFirst` settings.

## Unreleased — 2026-08-13

Daily refresh (verification fetched 2026-08-13; all 68 sources reachable, none unverified this run). Grok 4.6 landed across xAI and Cursor documentation; time-sensitive stamps advanced.

### Changed

- **Billing status remains paused.** The June 15 Agent SDK notice still says Agent SDK, `claude -p`, and third-party app usage draw from subscription limits; the separate monthly credit remains unavailable, and the `ANTHROPIC_API_KEY` API-billing caveat remains present.
- **Grok 4.6 is current.** xAI now lists `grok-4.6` as its 500k flagship for code and general use, with `xhigh` added above the existing reasoning effort levels. The older pricing-table rows disappeared from the overview without a retirement notice, so they are no longer presented as current overview entries and their status remains `not documented`.
- **Cursor added Grok 4.6.** Cursor Models now includes standard and Fast Grok 4.6 alongside Grok 4.5 and Composer 2.5; its model page documents four effort levels and identifies Cursor and SpaceXAI as the providers.
- **Source ownership tightened.** The xAI reasoning and Cursor Grok 4.6 detail pages are now first-class `model-lineup` entries in the official-source manifest, so their effort and provider claims stay re-verifiable without relying on an unregistered linked page.
- **Model lineups re-verified.** Claude, Codex, Grok, Cursor, and Gemini/Antigravity match their official model pages. Hermes still has no official lineup and remains `unverified this run`; model and billing freshness stamps advanced to 2026-08-13.
- **Antigravity SPA pages re-rendered.** The reference, conversations, migration, plugins, usage, install, headless, and SDK pages retain their documented surfaces; the site banners now show Antigravity CLI v1.1.12 and SDK v0.1.10.

## Unreleased — 2026-08-12

Daily refresh (verification fetched 2026-08-12; all 66 sources reachable, none unverified this run). Time-sensitive stamps advanced; documented capability surfaces remain unchanged.

### Changed

- **Billing status remains paused.** The June 15 Agent SDK notice still says Agent SDK, `claude -p`, and third-party app usage draw from subscription limits; the separate monthly credit remains unavailable, and the `ANTHROPIC_API_KEY` API-billing caveat remains present.
- **Model lineups re-verified.** Claude, Codex, Grok, Cursor, and Gemini/Antigravity match their official model pages. Hermes still has no official lineup and remains `unverified this run`; model and billing freshness stamps advanced to 2026-08-12.
- **Antigravity SPA pages re-rendered.** The reference, conversations, migration, plugins, usage, install, headless, and SDK pages retain their documented surfaces; the site banners now show Antigravity CLI v1.1.12 and SDK v0.1.10.

## Unreleased — 2026-08-11

Daily refresh (verification fetched 2026-08-11; all 66 sources reachable, none unverified this run). Time-sensitive stamps advanced and two post-cutoff facts reconciled.

### Changed

- **Claude Opus 4.1 retired.** The previously documented 2026-08-05 retirement date has passed; `claude-opus-4-1-20250805` no longer appears on the current models overview, and Opus 5 remains the migration target.
- **Gemini model page advanced.** The official page now reports `Last updated 2026-08-05` and lists Gemini Robotics ER 2 (`gemini-robotics-er-2-preview`); the main Gemini 3 lineup remains unchanged.
- **Billing status remains paused.** The June 15 Agent SDK notice still says Agent SDK, `claude -p`, and third-party app usage draw from subscription limits; the separate monthly credit remains unavailable, and the `ANTHROPIC_API_KEY` API-billing caveat remains present.
- **Model lineups re-verified.** Claude, Codex, Grok, Cursor, and Gemini/Antigravity match their official model pages. Hermes still has no official lineup and remains `unverified this run`; model and billing freshness stamps advanced to 2026-08-11.
- **Antigravity SPA pages re-rendered.** The reference, conversations, resume, migration, plugins, usage, install, headless, and SDK pages retain their documented surfaces; the site banners now show Antigravity CLI v1.1.11 and SDK v0.1.10.

## Unreleased — 2026-08-03

Daily refresh (verification fetched 2026-08-03; all 66 sources reachable, none unverified this run). One announced Codex retirement recorded; remaining claims re-verified.

### Changed

- **Codex: GPT-5.4 / GPT-5.4 mini retire from Codex on 2026-08-31.** When signing in with ChatGPT, replace `gpt-5.4` with `gpt-5.6-terra` and `gpt-5.4-mini` with `gpt-5.6-luna` in saved configurations, custom agents, and scheduled tasks. The OpenAI API and Codex authenticated with an API key are not affected. Mirrored in `docs/models/codex.md`, `SKILL.md`, and the `openai-codex-model-lineup` source claims.
- **Billing status remains paused.** The June 15 Agent SDK support banner still says Agent SDK, `claude -p`, and third-party app usage draw from subscription limits; the separate monthly credit remains unavailable. The `ANTHROPIC_API_KEY` API-billing caveat was re-confirmed. Stamps advanced in `docs/cli-invocation.md` and `docs/cloud-automation.md`.
- **Model lineups re-verified.** Claude, Grok, Cursor, and Gemini/Antigravity remain otherwise unchanged. Hermes still has no official lineup and remains `unverified this run`. `Last reviewed:` stamps advanced across `docs/models/*`.
- **Cursor skills page re-verified** (built-in `/automate` table and frontmatter fields still match).
- **Antigravity SPA pages re-rendered** via `kuma agent-browser` (headless, reference, resume). Sidebar now shows Antigravity CLI **v1.1.9** (was v1.1.8 on 2026-07-31); documented headless flags (`-p`, `--output-format`, `--json-schema`, `--effort`, `--print-timeout`, `--sandbox`, `-c`/`--conversation`, soft-deny, etc.) remain unchanged.
- **Claude Opus 4.1** remains deprecated, retiring 2026-08-05 (unchanged; two days out as of this run).

## Unreleased — 2026-07-31

Daily refresh (verification fetched 2026-07-31; all 66 sources reachable, none unverified this run). One model-summary omission corrected; remaining claims unchanged.

### Changed

- **Antigravity CLI model sample completed.** The dynamically rendered headless-mode page lists `gemini-3.5-flash-medium` and `gemini-3.1-pro-high` alongside the already recorded `gemini-3.6-flash-high`, `gemini-3.6-flash-medium`, and `claude-sonnet-4-6`; the two omitted CLI-surface slugs are now mirrored in `SKILL.md` and `docs/models/gemini-antigravity.md`.
- **Billing status remains paused.** The June 15 notice still says Agent SDK, `claude -p`, and third-party app usage draw from subscription limits, and the separate monthly credit remains unavailable. The API-key billing caveat was re-confirmed.
- **Model lineups re-verified.** Claude, Codex, Grok, Cursor, and Gemini/Antigravity remain otherwise unchanged. Hermes still has no official lineup and remains `unverified this run`; model and billing freshness stamps advanced.
- **Antigravity SPA pages re-rendered.** The CLI v1.1.8 reference, conversations, resume, migration, plugins, usage, install, headless, and SDK pages retain their documented surfaces.

## Unreleased — 2026-07-30

Daily refresh (verification fetched 2026-07-30; all 66 sources re-verified, none unverified this run). No structural drift; freshness stamps only.

### Changed

- **Billing status remains paused.** The official Agent SDK support page still opens with the June 15 pause notice, so `claude -p`, Agent SDK, and third-party app usage continue to draw from subscription usage limits; the separate monthly credit remains unavailable. The `ANTHROPIC_API_KEY` API-billing caveat was also re-confirmed. Stamps advanced in `docs/cli-invocation.md` and `docs/cloud-automation.md`.
- **Model lineups re-verified unchanged.** Claude, Codex, Grok, Cursor, and Gemini/Antigravity still match their official model pages. Hermes still has no official lineup and remains `unverified this run`. `Last reviewed:` stamps advanced across `docs/models/*`.
- **Antigravity SPA pages re-rendered.** The CLI reference, conversations, resume, migration, plugins, settings, install, headless, and SDK pages retain the documented surfaces mirrored by this repo.

## Unreleased — 2026-07-29

Daily refresh (verification fetched 2026-07-29; all 66 sources re-verified, none
unverified this run). No major drifts; a cluster of minor additive ones plus
freshness stamps.

### Changed

- **Gemini 3.6 Flash reached the API models page as a Stable model**
  (`gemini-3.6-flash`, now also the page's stable-id naming example, replacing
  `gemini-3.5-flash` in that role); new Stable `gemini-3.5-flash-lite`; preview
  ids now carry explicit `-preview` suffixes (`gemini-3.1-pro-preview`,
  `gemini-3-flash-preview`, Antigravity Agent `antigravity-preview-05-2026`) —
  this resolves the CLI-vs-API lineup discrepancy flagged 2026-07-21/28: only the
  `-high`/`-medium` effort slugs remain CLI-surface-only. Page last-updated
  2026-07-21. `docs/models/gemini-antigravity.md`, `SKILL.md`, manifest.
- **Codex skills gained a documented per-skill disable toggle**: `[[skills.config]]`
  in `~/.codex/config.toml` with `enabled = false` — Codex split out of the
  no-toggle cell in `docs/skill-lifecycle.md` (Hermes stays).
- **Codex hooks**: event list gained `SessionEnd`, and the page now states "Hooks
  are enabled by default" (disable via `[features] hooks = false`) — the opt-in
  framing is retired. `docs/compatibility-matrix.md`, `docs/completion-stack.md`.
- **Grok May-15 retirement page completed its redirect table**: `grok-4-0709` →
  `grok-4.3` (low effort) and `grok-3` → `grok-4.3` (none) — all eight retired ids
  now have explicit per-id redirects; redirected requests bill $1.25/$2.50 per
  MTok. `docs/models/grok.md`, manifest.
- **Cursor Automations are now officially referenced**: the skills page carries a
  ~19-row built-in-skills table including `/automate` ("Creates Cursor Automations
  triggered by schedules, Slack messages, GitHub events, and other sources") —
  the matrix automation cell's external-scheduler hedge is retired.
- **Claude Code**: `claude setup-token` is now documented on the CLI reference
  (the "unverified this run" caveat in `docs/cli-invocation.md` is cleared);
  `skillOverrides` now has three states (`"off"`, `"name-only"`), cycled via the
  `/skills` menu into `.claude/settings.local.json`, with plugin skills excluded
  (`docs/skill-lifecycle.md`); the models page adds that Mythos 5 shares Fable 5's
  pricing as well as specs.
- **Antigravity headless page** gained `--sandbox` (default false; launch override
  of `enableTerminalSandbox`). `docs/cli-invocation.md`, `SKILL.md`, manifest.
- Minor: Hermes gateway hooks gained `reaction:added`/`reaction:removed`;
  `docs/cloud-automation.md` section retitled to "Codex scheduled tasks" to match
  the vendor's dropped "Automations" name.
- Freshness stamps: billing still **paused** (banner verbatim-unchanged,
  re-verified 2026-07-29); Codex/Claude/Cursor model lineups unchanged — stamps
  advanced across `docs/cli-invocation.md`, `docs/cloud-automation.md`,
  `docs/compatibility-matrix.md`, `docs/completion-stack.md`, `docs/models/*`.

## Unreleased — 2026-07-28

Daily refresh (verification fetched 2026-07-28; first pass since 2026-07-21 — the
routine's worktree branch had been held by a stale pre-move worktree, removed this
run). Four major drifts, several minor, plus freshness stamps.

### Changed

- **Claude Opus 5 shipped** (`claude-opus-5`, $5/$25 MTok, adaptive thinking,
  knowledge cutoff May 2026): replaces Opus 4.8 in the current lineup ("start with
  Claude Opus 5 for complex agentic coding and enterprise work"); Opus 4.8 → legacy;
  Opus 4.1's retirement (2026-08-05) now targets Opus 5; Sonnet 5 intro pricing
  $2/$10 through 2026-08-31. `docs/models/claude.md`, `SKILL.md`, manifest.
- **Antigravity CLI gained an official headless mode** — new dedicated page
  `/docs/cli/headless` (registered as `antigravity-cli-headless`): `agy -p/--print/
  --prompt`, `--output-format text|json|stream-json`, `--json-schema`, `--effort`,
  `--print-timeout`, headless `-c`/`--conversation` resume, `agy models`/`agy
  agents`, `permissions.allow` `action(target)` rules, soft-deny semantics. The
  long-standing "TUI-only, SDK for unattended runs" verdict is retired across
  `SKILL.md`, `docs/cli-invocation.md`, `docs/compatibility-matrix.md`, and the
  reference/resume/SDK entry notes. Its `agy models` sample surfaces
  `gemini-3.6-flash-high/-medium` and `claude-sonnet-4-6` — CLI-surface ids not on
  the Gemini API models page.
- **Grok reasoning effort reached the API layer**: the reasoning capability page
  documents `reasoning_effort` for `grok-4.5` (`low`/`medium`/`high`, default
  `high`, cannot be disabled) and the overview now says "configurable reasoning" —
  the old CLI-flag-only distinction is retired. A dedicated retirement page
  (`/developers/migration/may-15-retirement`) lists eight ids retired 2026-05-15
  with redirects (`grok-code-fast-1` → `grok-build-0.1`, …). `--no-auto-update` is
  now documented on the headless-scripting page (flip of the 07-19 removal).
  `docs/models/grok.md`, `docs/cli-invocation.md`, manifest.
- **Cursor models page restructured** as "Models & Pricing" with two usage pools;
  Auto is now three modes (Cost/Balance/Intelligence, Cursor Router on
  Teams/Enterprise) and its old one-sentence description is gone; **Composer 1 no
  longer appears**; lineup extended (Claude Fable 5/Opus 5/Sonnet 5, Gemini
  3.1 Pro/3.5/3.6 Flash, GPT-5.4/5.5, Kimi K3); still no retirement page.
  `docs/models/cursor.md`, `SKILL.md`, manifest.
- **Codex plugin-build page stubbed**: `learn.chatgpt.com/docs/build-plugins` now
  defers to `developers.openai.com/plugins/build/plugins`, where the marketplace
  paths (legacy `.claude-plugin/marketplace.json` still documented — anchor moved,
  not a third flip), cache path, `PLUGIN_ROOT`/`PLUGIN_DATA`, and manifest fields
  (`skills`/`mcpServers`/`hooks` + compatibility `apps`) now live; the plugins
  overview dropped the apps cross-reference ("MCP servers … are the services
  behind connectors"). New `@plugin-creator`/`$plugin-creator` skill.
  `docs/plugin-packaging.md`, manifest.
- **Codex CLI reference flips**: "Use `/goal edit` to revise the objective."
  reproduces again (flip #2 — verified 07-17, gone 07-19, back 07-28); interactive
  `PROMPT` positional typing reverted to plain `string` (stdin `-` only on
  exec/review); `codex fork` positional now typed `uuid` only.
- Minor: GitHub auto-merge page rewritten (repo-enable quote reworded; both
  disable triggers now scoped to a non-write actor in one sentence); Hermes plugin
  discovery table gained a fifth source (Nix `services.hermes-agent.extraPlugins`);
  Hermes overview cron line reworded ("Scheduled automations — …"); Claude
  sessions page dropped `/rewind` (routed to Checkpointing; claim retired);
  `--safe-mode` lost its v2.1.169 tie; `--advisor fable` documented as an error;
  the `@skills-dir` no-walk-up footgun moved from the plugins page to
  plugins-reference (re-anchored); Cursor cli/using resume surface slimmed
  ("thread id" wording; `create-chat`/`--resume=-1` now parameters-page-only);
  bare `gpt-5.6` shorthand now appears in three example shapes; Gemini API models
  page bumped to 2026-07-20 with new Live/TTS/Omni/Nano-Banana/Lyria/Embedding
  entries.
- Freshness stamps advanced to 2026-07-28 on the time-sensitive claims: Agent SDK
  billing change **still paused** (banner verbatim-unchanged; dateline "June 16,
  2026"), `ANTHROPIC_API_KEY` API-billing caveat re-confirmed, G1-credits note,
  and the five model-lineup mirrors re-verified (gajae-code README re-verified:
  MCP absent for the third consecutive reading).

## Unreleased — 2026-07-26

- **New `docs/skill-lifecycle.md`: Disable / Scope / Retire.** The methodology documented
  *registration* (`skills.json`) and *retirement* (full removal) but never **enablement** —
  so "stop showing me this skill" had no documented mechanism and got improvised as
  `engines: {}`, which asserts in the manifest that the skill has no valid runtime. The new
  doc separates the three operations, states the per-engine disable mechanics (Claude
  `skillOverrides: off`, Grok `skills-disabled/`, Codex/Hermes none documented), and records
  that hand-deleting a symlink is not a disable because the installer recreates it.
  `SKILL.md` carries a four-line pointer, not the table.
- **`description` now routes on disable/enable/scope.** Added triggers (스킬 끄기/비활성,
  안 쓰는 스킬 정리, 특정 엔진에서만 / prune unused skills, scope a skill to one engine) and
  trimmed the description from 1176 to 926 chars — it had exceeded the documented 1024 cap,
  which is itself a load failure this package warns about.
- **Stripped six incident narratives from `SKILL.md` bodies** (`Trial-and-error <date>: …`
  parentheticals) per this package's own "Keep history out of doc bodies" rule. The rules
  they annotated are unchanged; the incidents live here.

  Removed narratives, for the record: 2026-07-24 fourteen hand-registered skills plus 21
  Codex `[[skills.config]]` entries had become a second registration channel and were folded
  back into `skills.json`. 2026-05-26 an unquoted `description` containing `Korean triggers:`
  broke skill loading. 2026-06-10 kuma-studio's WorkspaceTerminal `/kuma-plan` interception
  (parser, popover, server route, i18n ×4, tests) shipped validator-passed and was removed the
  same day for the engine-native skill. 2026-05-26 a guard hook shipped `644` and spammed
  `Permission denied` across every live session until chmod'd. 2026-06-09 a `timeout 5 git
  fetch` in a SessionStart/PreToolUse hook silently `command not found`-failed on macOS, so
  the hook never fired. 2026-06-10 `kuma read` / `kuma vault` / `kuma spawn-all` doc mentions
  all outlived their bins.

- Skill Document Topology: replaced the split discriminator. Judging by total line count fails every honest split — one title-and-provenance header per new file grows the total by construction (measured: 8 files, +32 header + 12 pointer, body −325). The test is now whether a moved body line exists in two places, checked by diffing moved-vs-stayed for zero lost and zero duplicated.

- **New `SKILL.md` section: Skill Document Topology.** The package already banned *history*
  in doc bodies ("Keep history out of doc bodies", Core Rules) but never said what a body
  should be *instead*, so skills grew monolithic — measured 2026-07-26 across the kuma-studio
  repo: `kuma-plan` at `SKILL.md` 70 lines + 5 sub-documents (the intended shape) against
  `kuma-spawn` 232 / `kuma-validate` 175 / `kuma-plan-run` 153 with zero sub-documents. The
  new section states the body is a routing topology (purpose, command surface, one pointer per
  concern), bans architecture/rationale and per-feature procedure alongside history, sets the
  split trigger at a *second* concern rather than a line count, and requires the body to
  shrink by what the new file gained — a split that leaves a condensed restatement behind is a
  copy with two sources of truth.
- **Sub-document folder is `docs/`, not `references/`.** A reference is lookup material;
  instruction prose telling an agent what to do is not, and the name was lying about the
  contents. Recorded in the new section, and the Core Rules 500-line bullet now points at
  `docs/*.md` (noting that Anthropic's best-practices page names the folder `reference/`), as
  does the Taxonomy line describing a skill's optional folders.


## Unreleased — 2026-07-24

Umbrella-convention edit (not a vendor-doc refresh): the doc governed skill
registration but never named where the registration data lives, which let two
readers lose the thread three times in one session.

### Added

- **Named the three-layer topology explicitly:** conventions (this skill) →
  manifest (`skills.json`) → installer (`install-local.mjs`) → generated
  symlinks. `skills.json` now appears in Recommended Layout and Core Rules as
  *the* single registration record; hand-symlinking or engine-config entries are
  called out as a second channel that drifts.
- **New Core Rule for build-producing skill repos:** point the manifest `path`
  at the skill subfolder (`<repo>/skills/<name>/`), not the repo root, so a
  build cache (`target/`, `node_modules/`, `dist/`) stays out of the runtime
  skill-scan root. Codex aborts with `skills scan reached its traversal limit`
  when a skill folder is oversized; `kordoc` is the standing precedent, `katok`
  the case that surfaced it.
- Refreshed the Recommended Layout tree examples (dropped retired
  `content-pipeline` / `npm-reorg-guard`, added `safedeps` / `sprite-gen` /
  `katok` / a `../` sibling-repo entry).

## v1.40 — 2026-07-21

Daily refresh: low-noise, freshness-stamps only. All 65 manifest sources
re-fetched (all 200, no source went `unverified this run`) across six runtimes;
re-verified the two time-sensitive claim classes and advanced their stamps. No
structural fact changed, nothing added or retired.

### Changed

- **Billing (Claude Agent SDK / `claude -p`) — still paused, stamp advanced to
  2026-07-21.** Re-fetched the support page; the "Update June 15" pause banner is
  verbatim-unchanged (Agent SDK, `claude -p`, and third-party app usage still
  draw from the subscription usage limits; the announced monthly credit remains
  unavailable). Also re-confirmed verbatim that a present `ANTHROPIC_API_KEY`
  switches Claude Code to API billing. Bumped the `as of`/`verified` dates in
  `cli-invocation.md` (billing caveat, status line, footer, Antigravity G1
  billing), `cloud-automation.md`, and the manifest billing note + claim + Pro/Max
  note.
- **Model lineups — re-verified clean, `Last reviewed:` advanced to 2026-07-21.**
  Claude (`platform.claude.com`), Codex (`learn.chatgpt.com/docs/models`), Grok
  (`docs.x.ai/developers/models`), and Cursor (`cursor.com/docs/models-and-pricing`)
  all match the recorded ids/tiers/retirement status with no drift (Fable 5 /
  Opus 4.8 / Sonnet 5 / Haiku 4.5; GPT-5.6 sol/terra/luna + 5.5/5.4/5.4-mini/
  5.3-codex-spark; Grok 4.5; Composer 2.5). Advanced those four `docs/models/*.md`
  stamps and their matching manifest `Verified live` dates per the time-sensitive
  freshness-stamp rule.

### Verified unchanged (no edit)

- Spot-checked the highest-churn mandatory-category pages across all six runtimes
  — Codex `AGENTS.md` discovery + CWD-first skill-root walk + 10 hook events, the
  `.claude-plugin/marketplace.json` legacy path, Claude memory (`CLAUDE.md`
  loading) + expanded hook taxonomy, Grok project-rules (six-name family + walk)
  + `grok` binary (not renamed), Cursor `agent` binary + `-p`/`--print` headless,
  Hermes three-system hook taxonomy + `.hermes.md → AGENTS.md → CLAUDE.md →
  .cursorrules` chain, and gajae-code (community/non-vendor — `--mode rpc` still
  gone, no headless one-shot, no MCP). All match baseline; structural stamps left
  as-is.

### Flagged for next pass (unverified this run — no edit made)

- **Gemini model page discrepancy.** A dynamic render of
  `ai.google.dev/gemini-api/docs/models` this run surfaced the 2.5 family
  (`gemini-2.5-pro`/`-flash`/`-flash-lite`) as current and showed no non-preview
  GA `gemini-3-pro`/`gemini-3.5-pro` id — conflicting with the recorded
  `docs/models/gemini-antigravity.md` lineup (`gemini-3.1-pro` Preview, Gemini 3
  Flash Preview, Antigravity Agent Preview). Single ambiguous extraction; per the
  model-lineup rule (never substitute a guess) the lineup is **left unchanged**
  and its `Last reviewed:` stamp is **not** advanced, pending a clean confirming
  re-verify next pass.
- **Antigravity docs prerendered this run.** `antigravity.google/docs/*` returned
  full crawlable content (static + Playwright-confirmed) rather than an empty JS
  shell. The defensive SPA-caution baseline is **retained** — one run of
  prerendered content is not enough to retire a safety discipline.

## v1.39 — 2026-07-20

`unverified this run`, including the Antigravity SPA pages (Playwright
real-Chrome render) and the JS-heavy Cursor docs. Four of six runtimes were
clean; the drift is concentrated in Codex, which **reversed two facts we had
recorded only yesterday**, plus a batch of Hermes mirror corrections that were
our own errors rather than vendor movement.

### Changed

- **Codex skill roots are a cwd-upward walk again (reversal of v1.38).** The
  build-skills page states: "For repositories, Codex scans `.agents/skills` in
  every directory from your current working directory up to the repository
  root." The location list is six entries — `$CWD/.agents/skills`,
  `$CWD/../.agents/skills`, `$REPO_ROOT/.agents/skills`, `$HOME/.agents/skills`,
  `/etc/codex/skills`, built-in. v1.38 recorded the opposite ("flat four-level
  hierarchy, not a cwd-upward walk"). This claim has now flipped twice, so the
  manifest note tells the next run to re-read the live sentence rather than
  trust either shape.
- **Codex documents the legacy `.claude-plugin/marketplace.json` again
  (reversal).** "The app can read marketplace files from:" now lists four
  locations including "a legacy-compatible marketplace at
  `$REPO_ROOT/.claude-plugin/marketplace.json`" and the curated marketplace
  behind the official Plugins Directory. v1.38 had it as `not documented`.
- **`${PLUGIN_ROOT}` hook-command substitution lost its `unverified this run`
  hedge** — reproduced live on the Codex plugin-build page.
- **Hermes has no control-flow-vs-lifecycle hook taxonomy.** All three Hermes
  pages now present one flat `Hook | Fires when` table, and the plugins page
  calls the whole set "lifecycle events". The "vendor's own two pages disagree"
  caveat we carried is stale — they no longer disagree, because neither
  categorizes. Replaced with the per-invocation vs. once-per-turn reading.
- **`.cursor/rules/*.mdc` removed from the Hermes priority chain (our error).**
  The docs state the chain twice, verbatim: "`.hermes.md` → `AGENTS.md` →
  `CLAUDE.md` → `.cursorrules`". `.mdc` files are recognized (CWD only) but sit
  outside the first-match chain. The compatibility matrix already had this
  right; `SKILL.md` and `docs/plugin-packaging.md` did not.
- **Grok's instruction-file family corrected to six names in
  `plugin-packaging.md` (our error).** That line still carried the old
  three-name list from the skills-plugins aside while every other mirror was
  fixed on 2026-07-17; the dedicated project-rules page is canonical.
- **gajae-code's Coordinator MCP server is undocumented again.** `grep -ci mcp`
  over the README returns 0. It has now appeared and vanished twice (absent
  2026-07-07, present 2026-07-16, absent 2026-07-20).
- **`docs/models/hermes.md` justification corrected.** It claimed the docs "name
  no model ids at all"; the configuration page does name ids, but only as
  illustrative `auxiliary:` / `reasoning_overrides:` config examples, never as a
  Hermes-owned catalog. The `unverified this run` status is unchanged — only the
  reasoning was overstated.

### Added

- **Antigravity billing (G1 credits).** The skill claims billing coverage across
  runtimes but had nothing for Antigravity. `docs/cli-invocation.md` now records
  the `useG1Credits` setting ("Uses personal AI credits for model calls once
  plan quotas are exhausted") and in-session `/credits`, and notes that with no
  headless flag there is no per-run cost capture equivalent to
  `claude --output-format json`.

### Verified unchanged

Claude Code (14 sources), Cursor (6), Grok (7), Antigravity/Gemini (11), and
GitHub (2) produced zero drift. The **2026-06-15 Agent SDK billing change is
still paused** — banner verbatim-unchanged, no newer date on the page — and the
Claude, Codex, Grok, Cursor, and Gemini model lineups all match their mirrors
exactly. Freshness stamps advanced to 2026-07-20 accordingly.

## v1.38 — 2026-07-19

Daily refresh: 65 manifest sources (1 added this run), all fetched successfully.
The opposite of yesterday's stamps-only pass — a heavy drift day across every
runtime. The headline is a **reversal we had been carrying as a hard rule**:
Codex now special-cases the `"*"` matcher exactly like Claude, so the
matcher-syntax divergence that used to silently break a ported hook is gone.
Antigravity's model lineup also came off `unverified this run` for the first
time, and Cursor's CLI binary is now documented under a different name.

### Added

- **Google Gemini model-lineup source — `ai.google.dev/gemini-api/docs/models`.**
  `docs/models/gemini-antigravity.md` had been stamped `unverified this run` with
  ids seeded from a downstream router catalog, because no official Google model
  page was registered. One exists (page last-updated 2026-07-16); registering it
  lifted the unverified status and immediately corrected the file. Same failure
  mode as the Grok gaps closed 2026-07-17 and the `cursor-model-lineup` gap
  caught 2026-07-16 — an official page sitting outside the loop.
- **Cursor row in the Session Resume table.** Cursor resume is fully documented
  (`agent --resume [chatId]`, `--continue` as an alias for `--resume=-1`,
  `agent resume|ls|create-chat`, in-session `/resume`) but the table had no
  Cursor row at all. Store path and chatId format remain `not documented`.
- **A consumer for the orphaned `github-notifications` source.** It was verified
  live every run while no prose in the repo cited it. `cloud-automation.md` now
  uses it for how a reviewer learns the gate left a PR open.

### Changed

- **Codex hook matchers — `"*"` now matches everything (reversal).** The docs
  state verbatim: "Use `"*"`, `""`, or omit `matcher` entirely to match every
  occurrence of a supported event." We had documented the opposite — that a
  literal `"*"` is an invalid regex on Codex that silently matches nothing, so a
  Claude-style hook never fires and you must write `".*"`. That advice and its
  dated 2026-06-09 trial-and-error note are retired. The still-live divergence is
  narrower: `UserPromptSubmit` and `Stop` ignore `matcher` entirely on Codex.
- **Codex hook gap list — two distinct failure modes, not one.** PreToolUse
  `permissionDecision: "ask"` (plus legacy `approve`, `continue: false`,
  `stopReason`, `suppressOutput`) and PostToolUse `updatedMCPToolOutput` mark the
  hook run failed and continue; PermissionRequest's reserved `updatedInput` /
  `updatedPermissions` / `interrupt` **fail closed**. Both were collapsed before.
- **Cursor CLI binary is documented as `agent`, not `cursor-agent`.** The string
  `cursor-agent` no longer appears on the overview or parameters pages. Recorded
  as what the docs document — the rename does not prove the old binary was
  removed. Added `--mode`, `--plan`, worktree flags, `--sandbox`, and the
  `agent acp` / `agent worker` subcommands.
- **Antigravity Gemini lineup — `unverified this run` lifted.** `gemini-3.5-flash`
  was recorded as a low-latency flash tier; it is GA and Google's most intelligent
  model (frontier tier). `gemini-3.1-pro` confirmed Preview. Added
  `gemini-3.1-flash-lite` (GA), Gemini 3 Flash (Preview), and Antigravity Agent
  (Preview). Retirements are now verifiable: Gemini 2.0 Flash, 2.0 Flash-Lite,
  3.1 Flash-Lite Preview, 3 Pro Preview shut down; Imagen 4 deprecated.
- **Grok documents a reasoning-effort flag.** We claimed Grok had no
  caller-configurable effort setting and that the reasoning split was pre-built
  variants only. The CLI reference now lists `--effort <LEVEL>`. The distinction
  that survives: it is a **CLI-layer flag** (levels not enumerated), not a
  model/API parameter — the models page still documents no `reasoning_effort`.
  Also added `--fork-session`, the UUID session-id form, and the cross-runtime
  fact that Grok accepts Claude Code flag names as aliases where they overlap.
  Removed `--no-auto-update`, which no official page documents.
- **Claude `--effort` is named, not numeric** (`low`/`medium`/`high`/`xhigh`/
  `max`/`ultracode`), and **`--from-pr` does not resume** — it opens the session
  picker filtered to PR-linked sessions. Also: hook commands have an exec form
  (`args` set, no shell) and a shell form (`args` omitted), so the flat
  "runs through `/bin/sh`" claim was wrong on Windows; payloads carry `prompt_id`;
  `.claude-plugin/plugin.json` is now optional; resume-by-id searches only the
  current project directory and its git worktrees.
- **Hermes documents a project-local plugin root.** `./.hermes/plugins/` (gated by
  `HERMES_ENABLE_PROJECT_PLUGINS=true`) joins the user, bundled, and pip-entry-point
  roots. Since plugin hooks register via `ctx.register_hook()`, project-local hooks
  now have a documented path — the matrix cell moves off `Partial`. Also added the
  kanban hook events, the `plugin.yaml` field set, six further `ctx.register_*`
  APIs, and the 20,000-char context-file truncation rule.
- **Codex corrections.** Skill roots are a flat four-level hierarchy, not a
  cwd-upward walk. The legacy `.claude-plugin/marketplace.json` path is no longer
  documented (the `CLAUDE_PLUGIN_*` env aliases remain). Sessions resolve by ID
  **or name**, IDs winning. Bare `gpt-5.6` is CLI-example shorthand, not a listed
  model id. Cloud default-model wording is "chats", not "tasks".
- **GitHub auto-merge prerequisites were understated.** Auto-merge must be enabled
  at the **repository** level, the option appears only on PRs that cannot merge
  immediately, and it is disabled if a non-write user pushes to the head branch or
  the base branch is switched. `gh pr merge --auto` is not on that page at all —
  reattributed to `gh` CLI surface rather than to the `github-auto-merge` source.
- **Billing — still paused, stamp advanced to 2026-07-19.** The pause banner is
  verbatim-unchanged (Agent SDK, `claude -p`, and third-party app usage still draw
  from subscription usage limits; the announced monthly credit remains
  unavailable), as is the `ANTHROPIC_API_KEY` caveat. Stamps bumped per the
  time-sensitive freshness rule.
- **`docs/models/kuma-studio.md` reconciled against first-party `team.json`.** The
  file recorded Opus 4.7's removal but never whether `claude-opus-4-8` landed in
  the spawnable catalog — a 17-day gap. It is present (12 entries across the effort
  tiers and `[1m]`). Replaced the dated change-narrative section, which also
  violated the no-history-in-doc-bodies rule, with a catalog-vs-lineup
  reconciliation.

### Verified unchanged (no edit)

- **Every mandatory category re-fetched.** Project-instruction files (Codex
  `AGENTS.md` precedence and 32 KiB cap, Claude `CLAUDE.md` layering, Grok's
  six-name family, Hermes first-match-wins, Cursor's no-walk-up), session resume,
  CLI spawn, billing, and model lineups all re-verified against their own
  runtime's page. Claude's lineup matches the official table exactly.
- **Antigravity has no headless flag.** Re-confirmed by grep across all eight
  dynamically-rendered pages: zero hits for `headless`, `--print`, `-p`, or
  `--output-format`. The SDK remains the documented programmatic path.
- **gajae-code stays community/non-vendor** with every `not documented` verdict
  intact (hooks, plugins, project-instruction loading, session-id resume). Added
  only what the README actually documents: four bundled role agents, and that
  `--worktree` takes a branch-like name rather than a filesystem path.
- **Hermes model lineup stays `unverified this run`** — the official docs name no
  model ids at all, so the router-seeded table cannot be vendor-verified. The stamp
  now says "reviewed, not verified" and records why, so a bare date bump can never
  read as verification.
- `check-official-sources.mjs` PASS (65 sources, all 200).

## v1.37 — 2026-07-18

Daily refresh: low-noise, freshness-stamps only. Re-verified the two
time-sensitive claim classes against their official pages and advanced their
stamps to today; no structural fact changed, nothing added or retired.

### Changed

- **Billing (Claude Agent SDK / `claude -p`) — still paused, stamp advanced to
  2026-07-18.** Re-fetched the support page; the "Update June 15" pause banner is
  verbatim-unchanged (Agent SDK, `claude -p`, and third-party app usage still
  draw from the subscription usage limits; the announced monthly credit remains
  unavailable). Bumped the `as of`/`verified` dates in `cli-invocation.md`,
  `cloud-automation.md`, and the manifest billing note + claim.
- **Model lineups — re-verified, `Last reviewed:` advanced to 2026-07-18.**
  Claude (`platform.claude.com`), Codex (`learn.chatgpt.com/docs/models`), Grok
  (`docs.x.ai/developers/models`), and Cursor (`cursor.com/docs/models-and-pricing`)
  all match the recorded ids/tiers/retirement status with no drift (Fable 5 /
  Opus 4.8 / Sonnet 5 / Haiku 4.5; GPT-5.6 sol/terra/luna; Grok 4.5; Composer 2.5).
  Advanced the four `docs/models/*.md` stamps and the matching manifest
  `Verified live` dates per the time-sensitive freshness-stamp rule.

### Verified unchanged (no edit)

- Spot-checked the highest-churn mandatory-category pages — Codex `AGENTS.md`
  discovery, Grok project-rules (six-name family + walk), Claude memory
  (`CLAUDE.md` loading mechanics) — all match baseline. Structural stamps
  (e.g. `completion-stack.md`) left as-is, since re-confirming a stable fact does
  not advance its stamp. `check-official-sources.mjs` PASS (64 sources, all 200).

Daily refresh: 63 manifest sources (2 added this run) fetched successfully; all
200. Antigravity re-rendered dynamically (code blocks hydrated correctly again).
Billing still paused. The big one: **Grok's two mandatory categories had no
source at all**, and closing that gap corrected a factual error we had been
carrying.

### Added

- **Grok project-instructions source — `docs.x.ai/build/features/project-rules`.**
  Grok was the only tracked runtime with **no `project-instructions` source**, a
  category the daily prompt marks mandatory. Its instruction-file claims had been
  riding on a one-line "Agents.md compatibility" aside on the skills/plugins page.
  A dedicated official page exists and was simply never registered.
- **Grok cli-invocation source — `docs.x.ai/build/cli/reference`.** Grok also had
  **no `cli-invocation` source**; its launch/headless claims rode on
  `headless-scripting`, which is registered under `session-resume`, so the
  mandatory CLI-spawn category had no anchor of the right kind for this runtime.
  Adds the subcommand surface: `grok sessions|export|import|worktree|mcp|dashboard|wrap`,
  `--allow`/`--deny`, `--sandbox <PROFILE>`. Same failure mode as the
  `cursor-model-lineup` gap caught 2026-07-16 — an official page outside the loop.

### Changed

- **Grok reads six instruction filenames, not three (correction).** We recorded
  `AGENTS.md`, `Agents.md`, `AGENT.md`. The official project-rules page states
  Grok also reads **`CLAUDE.md`, `Claude.md`, and `CLAUDE.local.md`** as
  first-class project rules, plus `*.md` in `.grok/rules/` (`.claude/rules/`,
  `.cursor/rules/` for compat). Fixed in `SKILL.md` and `compatibility-matrix.md`.
- **Grok's tree/merge semantics are documented — retired "unknown, verify live".**
  The matrix told readers to verify against the live engine before depending on
  ancestor behavior. It is now officially documented: global `~/.grok/` rules,
  then every directory from repo root down to cwd (cwd only outside a git repo),
  **every** matching file loads (no first-match-wins, unlike Hermes), deeper files
  take precedence on conflicts. Grok is also the one runtime that **honors
  `.gitignore` for rules** — the stated reason `CLAUDE.local.md` stays personal.
- **Codex plugin overview renamed `apps` → `connectors`.** Vocabulary change on
  the overview only: *"They can include skills, connectors, or both."* `apps`
  survives there as a cross-reference and the `plugin.json` manifest **field** is
  still literally `apps` on the build page — so `plugin-packaging.md` and the
  matrix stay correct for the field name. Still six components.
- **Codex `follow-goals` was slimmed to a use-case walkthrough; 3 claims
  re-anchored, not deleted.** The active-verification sentence and the goal-state
  list are now verbatim on the goals cookbook, which becomes their anchor. The
  cookbook also documents a **4th goal state, `budget-limited`** ("Reaching a
  budget limit is not the same as completing the objective").
- **`/goal set` never existed.** Setting is the bare `/goal <objective>`;
  `/goal edit` is anchored on developer-commands. Claim corrected.
- **"Tighten the goal mid-flight" was mis-anchored to the cookbook.** The cookbook
  only tightens a *draft before activation*; the mid-flight advice is on
  follow-goals. Fixed the attribution in `completion-stack.md`.
- **Codex automations: "schedule work from a task" is gone** (zero hits). The
  capability survives re-framed around the chat: *"You can create and update
  scheduled tasks from a ChatGPT or Codex chat."* Vocabulary moved task → chat.
- **`antigravity-cli-reference` no longer names `keybindings.json`** (zero hits).
  Its keybinding content is a *default-keybindings* reference (Key → TUI command),
  not a config-key table for the file. Claim split; `keybindings.json` stays
  anchored on `cli/using`, which already anchors `settings.json` for the same reason.
- **`completion-stack.md` cited an unregistered URL.** `learn.chatgpt.com/docs/reference/commands`
  was outside the verification loop; re-anchored onto the registered
  developer-commands source, which documents `/goal edit` today.

### Verified (stamps advanced, status unchanged)

- **Agent SDK billing still paused.** The 2026-06-15 change remains paused; the
  live banner is a verbatim match against the recorded quote. Per the
  freshness-stamp rule the date advanced 2026-07-11 → 2026-07-17 across the
  manifest claim, `cli-invocation.md`, and `cloud-automation.md`.
- **Claude model lineup unchanged** — Fable 5 / Opus 4.8 / Sonnet 5 / Haiku 4.5;
  Mythos still invitation-only; `claude-opus-4-1-20250805` retiring 2026-08-05.
  `models/claude.md` stamp advanced 2026-07-11 → 2026-07-17.
- **Zero drift** across all Grok (docs.x.ai), Hermes, gajae-code, GitHub, and
  Cursor sources, and 9 of 10 Antigravity sources.

### Notes

- **Grok Build was open-sourced (2026-07-14, Apache-2.0, `github.com/xai-org/grok-build`)
  — recorded, with a deliberately narrow scope.** xAI's docs never say so: a
  full-corpus check of their own `llms.txt` (1.29 MB) returns **zero** hits for
  "open source", "Apache", or "MIT", and every `github.com` link in the corpus
  points to `xai-sdk-python`, `xai-cookbook`, or `xai-proto`. The docs-only rule
  therefore *structurally cannot* record this fact, so `xai-grok-build-repo` was
  registered under a new `source-availability` kind and a new
  `policy.vendorSourceRule` was added to name the exception — the manifest's own
  `sourceRule` would otherwise contradict the source sitting under it.
  **Scope guard:** the repo owns only licensing/source-availability;
  `docs.x.ai` stays canonical for every behavior claim, so no claim gets two
  owners. The repo's 24 bundled user-guide docs were **deliberately not
  registered** for the same reason — `docs.x.ai` already covers that ground, and
  registering them would split the SSoT. The precedent for a vendor-source tier
  already existed (`completion-stack.md` source-verifies Codex goal internals
  against `openai/codex`); this run just made the rule explicit.

## v1.35 — 2026-07-16

Daily refresh: 61 manifest sources (2 added this run) fetched successfully; all
200. Antigravity re-rendered dynamically (code blocks hydrated correctly this
run). Billing still paused. The big one: **the entire Codex doc set moved host**.

### Changed

- **Codex docs moved to `learn.chatgpt.com`.** 14 of 16 `developers.openai.com/codex/*`
  sources now 308-redirect to `learn.chatgpt.com` (the Agent-Skills API guide and
  the goals cookbook did not move). Rewrote every affected manifest URL and every
  citation in `SKILL.md`, `cli-invocation.md`, `compatibility-matrix.md`,
  `completion-stack.md`, `models/codex.md`, and `models/README.md`, and added
  `learn.chatgpt.com` to `policy.allowedHosts` — the manifest's own policy had
  begun contradicting its URLs. Two slug renames beyond the host swap:
  `/codex/cli/reference` → `/docs/developer-commands?surface=cli`, and
  follow-goals sits at `/use-cases/`, not `/docs/use-cases/`. Content survived
  the move intact; this was citation rot, not knowledge loss.
- **Codex "Automations" is now "scheduled tasks".** The page is retitled and
  broadened to ChatGPT-wide (`?surface=app`); the Thread / Standalone /
  Project-Scoped category names are gone. Recurrence is RRULE-based.
- **Codex plugin components: 3 → 6.** The plugins overview now lists browser
  extensions, hooks, and scheduled task templates alongside skills, apps, and MCP
  servers. The build page still documents only the first four as `plugin.json`
  fields, so `plugin-packaging.md` was left as-is.
- **Antigravity documents a session store for the first time.** A new dedicated
  Resume Command Guide (`/docs/cli/commands/resume`) — registered as a new
  `session-resume` source — documents the `agy -c` short flag and a workspace-keyed
  cache at `~/.gemini/antigravity-cli/cache/last_conversations.json` mapping
  absolute workspace path → conversation id. The conversations page was slimmed to
  workspace scoping and `/fork` and now defers picker/`--conversation` detail
  there; `F2` rename is back (documented on the new page) and `Ctrl+Delete` delete
  is new.
- **Cursor cloud agents gained four hooks.** `beforeSubmitPrompt`,
  `afterAgentResponse`, `afterAgentThought`, and `stop` are now supported in cloud
  agents (previously "Not yet wired"). The unavailable list is down to
  `sessionStart`, `sessionEnd`, `beforeMCPExecution`/`afterMCPExecution`, Tab
  hooks, and `workspaceOpen`.
- **Cursor ships its own models — the "pure router" claim was wrong.** Registered a
  new `cursor-model-lineup` source (`cursor.com/docs/models-and-pricing`);
  `models/cursor.md` had no manifest entry at all, which is why its stale
  "no Cursor-owned model" claim survived outside the verification loop. Cursor
  documents Composer 2.5 ("Cursor's own model"), Composer 1, and Grok 4.5 (jointly
  trained with SpaceXAI), with `Auto` as default.
- **gajae-code dropped `--mode rpc`.** The community README documents no headless
  one-shot mode at all now; external control is the SDK loopback WebSocket, a
  Coordinator MCP server (MCP is back after its 2026-07-07 absence), or
  `gjc daemon session`.
- **Grok's older ids are shown again.** `grok-4.3`, the `grok-4.20-0309-reasoning`
  / `-non-reasoning` / `-multi-agent-0309` trio (1M), and `grok-build-0.1` (256k)
  are back in the pricing table — which is now the page's only model list. Removed
  the unsupported "configurable reasoning" claim (the detail page says only
  `Reasoning: Yes`; the reasoning/non-reasoning split is pre-built variants, not an
  effort knob) and the retirement-guide link, which no longer exists.
- **Claude session store is a sanitized path, not a hash.** The sessions page
  defines `<project>` in `~/.claude/projects/<project>/<session-id>.jsonl` as the
  working-directory path with non-alphanumeric characters replaced by `-`.
  `<cwd-hash>` was wrong and would misdirect anyone locating a transcript.
- **Billing re-verified live 2026-07-16, still paused.** Banner unchanged; advanced
  the time-sensitive stamps in `cli-invocation.md` and `cloud-automation.md`.
- Softened the Codex `gpt-5.6` "default selector" claim (the page shows the bare id
  only as a CLI example) and widened the `--effort` claim to include `ultracode`.

## v1.34 — 2026-07-11

Daily refresh: all 59 manifest source URLs fetched successfully. Billing still
paused; Claude/Codex/Grok model lineups and the three completion-stack sources
re-verified unchanged.

### Changed

- **Billing status re-verified live 2026-07-11, still paused.** The official
  support banner still says Agent SDK, `claude -p`, and third-party Agent SDK
  app usage draw from subscription usage limits, while the separate monthly
  credit remains unavailable. Advanced the time-sensitive billing stamps in
  `cli-invocation.md`, `cloud-automation.md`, and the manifest.
- **Model lineup stamps advanced for Claude, Codex, and Grok** after live
  verification against their official model pages; no lineup/content drift was
  found.
- **Completion-stack sources re-verified unchanged.** Claude `/goal` remains a
  transcript-only independent evaluator, while Codex Goals remains an active
  inspect/run/change/test loop with self-declared completion.
- **Antigravity dynamic render unavailable in this worker.** The static source
  check passed for the seven `antigravity.google` URLs, but no Chrome browser
  backend was available, so Antigravity content claims were not changed.

## v1.33 — 2026-07-10

### Added

- **`docs/completion-stack.md`** — native completion/verification stacks for
  Claude Code (`/goal` · Stop hook · `/verify`) and Codex (Goals · Stop hook ·
  `/review`), the cross-engine judgment-independence vs
  verification-activeness asymmetry, enforcement-grade tables, and a
  **Misreading traps** section preserving source-verified corrections that
  official docs alone don't state (ZCode is a separate Z.AI product with no
  independently verified `/goal`; Codex Goals is an active edit·run·test loop,
  not a soft checker; Codex `/goal edit` preserves usage via
  `ThreadGoalSetMode::UpdateExisting`; Claude's `/goal` evaluator is
  transcript-only). Migrated from operator vault research pages (verified
  2026-06-15) so this skill is the single owner of cross-engine completion
  knowledge.
- **Three goal sources registered in `docs/official-sources.json`** under a
  new `completion-stack` kind, so the daily refresh re-verifies the mirror
  doc's load-bearing claims: `anthropic-claude-goal`
  (code.claude.com/docs/en/goal — transcript-only evaluator),
  `openai-codex-follow-goals` (active inspect·run·change·test loop,
  self-declared completion), and `openai-codex-goals-cookbook` (6-element
  goal contract, evidence-based completion verbatim). Hooks pages were
  already registered (`anthropic-claude-hooks`, `openai-codex-hooks`).
  `node scripts/check-official-sources.mjs` passes (59 sources).
- **Navigation surfaces updated for the new doc** (blast-radius review):
  `docs/completion-stack.md` added to the doc lists in `SKILL.md`
  (Multi-Agent Compatibility Docs), `README.md` and all six README
  translations, and the daily prompt's WHAT-TO-CHECK category list now names
  completion/goal-gate docs (`kind: "completion-stack"`).

## v1.32 — 2026-07-10

Daily refresh: all 56 manifest source URLs fetched successfully. Billing still
paused; Claude/Grok model lineups re-verified unchanged; Codex model lineup
drifted to GPT-5.6 Sol/Terra/Luna.

### Changed

- **Codex model lineup drift recorded.** The official Codex models page now
  recommends the GPT-5.6 family/default selector (`gpt-5.6`) with explicit
  `gpt-5.6-sol`, `gpt-5.6-terra`, and `gpt-5.6-luna` ids. `gpt-5.5` is now
  previous-generation, while `gpt-5.4` and `gpt-5.4-mini` remain under Other
  models. Updated `docs/models/codex.md`, `SKILL.md`, and manifest claims.
- **Billing status re-verified live 2026-07-10, still paused.** Advanced the
  time-sensitive billing stamps in `cli-invocation.md`, `cloud-automation.md`,
  and the manifest.
- **Model lineup stamps advanced for Claude and Grok** after live verification
  against their official model pages; no content drift found.
- **Antigravity dynamic render unavailable in this worker.** The static source
  check passed for the seven `antigravity.google` URLs, but no in-app/Chrome
  browser backend was available, so Antigravity content claims were not changed.

## v1.31 — 2026-07-09

Daily refresh: all 56 manifest source URLs fetched successfully. Billing still
paused; Claude/Codex model lineups unchanged with fresh `Last reviewed` stamps;
xAI's official models overview now centers Grok 4.5. Antigravity SPA pages still
return an empty static shell here, and no browser backend was available in this
worker, so no Antigravity claim changes were made this run.

### Changed

- **Billing status re-verified live 2026-07-09, still paused.** The support-page
  banner remains unchanged: Agent SDK, `claude -p`, and third-party Agent SDK app
  usage still draw from subscription usage limits; the previously announced
  separate monthly credit remains unavailable. Advanced the time-sensitive
  billing stamps in `cli-invocation.md`, `cloud-automation.md`, and the manifest.
- **Model lineup stamps advanced for Claude and Codex** after live verification
  against their official model pages; no lineup/content drift found.
- **Grok model lineup drift recorded.** xAI's official models overview now
  highlights `grok-4.5` (500k context, configurable reasoning) for code/chat,
  plus the Voice and Imagine APIs. The previous `grok-4.3` / `grok-4.20-*` /
  `grok-build-0.1` lineup is no longer shown on the overview; the docs record
  absence as `not documented`, not as a retirement claim.
- **Antigravity dynamic render unavailable in this worker.** The seven
  `antigravity.google` URLs remained reachable but returned an empty SPA shell to
  static fetch; the in-app browser and Chrome control surfaces were unavailable,
  so this run did not update Antigravity claims.

## v1.30 — 2026-07-07

Daily refresh: all 56 manifest sources re-verified live. Billing still paused
(banner verbatim-unchanged); the Hermes plugin-build guide moved to
`/docs/developer-guide/plugins`; the Codex plugin `hooks` manifest field now
also accepts inline hooks objects, and Codex documents marketplace file
locations (including a legacy `.claude-plugin/marketplace.json` compat path);
`codex fork` lands as a CLI session-fork subcommand; Claude's PreToolUse hook
documents a fourth `defer` outcome.

### Changed

- **Billing status re-verified live 2026-07-07, still paused.** The support-page
  banner is verbatim-unchanged from 07-06 (change paused; monthly credit not
  available; any update announced before taking effect; API-key accounts stay
  pay-as-you-go); the manifest now also records the line under the banner ("The
  content below reflects the page before June 15…"). Advanced the billing
  time-sensitive stamps 07-06 → 07-07 (`cli-invocation.md`,
  `cloud-automation.md`, `official-sources.json`).
- **Hermes plugin-build guide URL moved** to
  `hermes-agent.nousresearch.com/docs/developer-guide/plugins`. The old
  `/docs/guides/build-a-hermes-plugin` now serves an HTTP-200 meta-refresh stub
  (no server-side redirect, so plain `curl -L` does not follow it); all claims
  verified at the new location (title still "Build a Hermes Plugin"). Manifest
  URL updated.
- **Codex plugin `hooks` manifest field widened** (plugins/build page): a single
  path, an array of paths, an inline hooks object, or an array of inline hooks
  objects (previously recorded as path-or-array). The page also documents
  marketplace file locations — repo `.agents/plugins/marketplace.json`, a
  legacy-compatible `.claude-plugin/marketplace.json`, personal
  `~/.agents/plugins/marketplace.json` — the
  `codex plugin marketplace add/list/upgrade/remove` CLI, and the
  `~/.codex/plugins/cache/<marketplace>/<plugin>/<version>/` install cache.
  Updated `plugin-packaging.md`, `compatibility-matrix.md`, and the manifest.
- **`codex fork` documented on the CLI reference** — forks a previous
  interactive session into a **new** thread (the CLI analogue of app-server
  `thread/fork`), alongside `codex archive` / `codex delete` /
  `codex unarchive` and remote-mode support. Session Resume mirrors updated
  (`SKILL.md`, `compatibility-matrix.md`). Caveat recorded: `~/.codex/sessions`
  now appears once inside a user-example prompt on the automations page — an
  example, not normative path documentation, so the not-documented discipline
  stands.
- **Claude PreToolUse documents a fourth decision outcome, `defer`** ("exits
  gracefully so the tool can be resumed later"; single tool calls only), plus a
  10,000-character cap on hook output strings (`additionalContext`,
  `systemMessage`, stdout). Claims added; `SKILL.md` already recorded `defer`
  in the shared decision schema.
- **Model lineups re-verified live, unchanged** (Claude / Codex / Grok pages
  match the `docs/models/` mirrors) — advanced the three `Last reviewed:`
  stamps to 07-07.
- **Note-level refreshes:** Antigravity pages re-verified by dynamic render
  07-07 — fenced code blocks hydrated empty on *every* docs page this run
  (code-block-only literals held via prose/tables), a CMD install option now
  appears alongside PowerShell on Windows, and the plugin subcommand documents
  a plural `plugins` alias; gajae-code README no longer mentions MCP (external
  control is stated as RPC/ACP/Bridge) nor any 0.x version marker; Claude
  sessions' "same session id reused" re-anchored to the two-terminals
  interleave sentence; Claude settings' v2.1.119 parenthetical corrected (it
  also renders on two notification-setting rows).

## v1.29 — 2026-07-06

Daily refresh: all 56 manifest sources re-verified live. Billing still paused
(banner verbatim-unchanged); Codex plugin hooks gain documented env vars
(including Claude-compat names); the Codex interactive seed-prompt is
re-anchored on the CLI reference; Cursor's `stop` hook is back in the
cloud-unavailable table; Hermes adds a `pre_verify` plugin hook event; the Grok
models page moved to `/developers/models`.

### Changed

- **Billing status re-verified live 2026-07-06, still paused.** The support-page
  banner is verbatim-unchanged from 07-05 (change paused; monthly credit not
  available; any update announced before taking effect; API-key accounts stay
  pay-as-you-go). Advanced the billing time-sensitive stamps 07-05 → 07-06
  (`cli-invocation.md`, `cloud-automation.md`, `official-sources.json`).
- **Codex plugin-hook env vars now documented** (plugins/build page): plugin
  hook commands receive `PLUGIN_ROOT` (installed plugin root) and `PLUGIN_DATA`
  (writable data directory), and Codex also sets `CLAUDE_PLUGIN_ROOT` /
  `CLAUDE_PLUGIN_DATA` "for compatibility with existing plugin hooks"; the
  `plugin.json` `hooks` field accepts a single path or an array (default
  `hooks/hooks.json`, `${PLUGIN_ROOT}` substitution). Added to
  `plugin-packaging.md`, `compatibility-matrix.md`, and the manifest claims.
- **Codex interactive seed-prompt re-anchored:** the CLI reference documents a
  top-level optional `PROMPT` positional ("Optional text instruction to start
  the session. Omit to launch the TUI without a pre-filled message."),
  resolving the 07-04 `unverified` state — `codex "<prompt>"` is official again
  (`SKILL.md`, `cli-invocation.md`; still absent from the CLI overview page).
- **Cursor hooks:** `stop` is **back** in the cloud-agent unavailable table as
  "Not yet wired for cloud agents" (on 07-05 it was briefly unstated). Restored
  `stop` to the cloud-unsupported lists in `compatibility-matrix.md` and
  `plugin-packaging.md`.
- **Hermes hooks:** new plugin control-flow hook event **`pre_verify`** — fires
  once per turn when the agent edited code, just before it verifies/finishes
  (related config `agent.verify_guidance: false`). Added to both hook mirrors
  and the manifest claims.
- **Grok models page moved:** `docs.x.ai/docs/models` now 308-redirects to
  `docs.x.ai/developers/models` (model detail links under
  `/developers/models/<id>`); manifest URL and `docs/models/grok.md` source line
  updated — all model ids/claims unchanged.
- **Claude settings page:** `fileCheckpointingEnabled` still documents default
  `true`, but its v2.1.119 version tie is no longer stated — claim weakened in
  the manifest (the v2.1.119 note survives only for `autoCompactEnabled` on the
  config-preference-keys storage list).
- **Antigravity (7 SPA pages re-rendered dynamically, claude-in-chrome):** all
  prose/table/inline-code claims verified unchanged; the conversations page no
  longer mentions the picker's F2 rename (note updated). This run the fenced
  code blocks hydrated empty under automation, so code-block-only command
  literals were held via surrounding prose (noted in the manifest).
- **Model lineup stamps:** Claude/Codex/Grok `docs/models/*.md` re-verified
  live, `Last reviewed` 07-05 → 07-06; Claude/Codex lineups and the Codex
  availability matrix unchanged.

## v1.28 — 2026-07-05

Daily refresh: all 56 manifest sources re-verified live (55 prior + 1 added).
Billing still paused (banner now longer); Codex availability matrix drops Codex
Cloud for all models; Codex `~/.codex/history.jsonl` re-anchored (documented on
config-advanced); Grok hook env vars moved to a dedicated hooks page (new
manifest source); several no-longer-stated anchor moves on Claude/Codex/Cursor
pages; gajae-code README weakened its skills path.

### Added

- **New manifest source `xai-grok-hooks`** (https://docs.x.ai/build/features/hooks):
  the skills-plugins-marketplaces page now states only the plugin-hook env vars
  (`GROK_PLUGIN_ROOT`, `GROK_PLUGIN_DATA`) and defers events/JSON/script contract
  to the dedicated hooks page, so `GROK_HOOK_EVENT`, `GROK_HOOK_NAME`,
  `GROK_SESSION_ID`, `GROK_WORKSPACE_ROOT` are re-anchored there (56 sources).

### Changed

- **Billing status re-verified live 2026-07-05, still paused.** The banner now
  carries two additional sentences: the previously announced monthly credit
  "isn't available", and any updated plan will be shared "before anything takes
  effect". The paused credit table also splits Enterprise into usage-based ($20)
  and seat-based Premium seats ($200, Standard seats not eligible). Advanced all
  billing time-sensitive stamps 07-04 → 07-05 (`cli-invocation.md`,
  `cloud-automation.md`, `official-sources.json`).
- **Codex models availability matrix:** **Codex Cloud is now marked unavailable
  for all four models** (consistent with "you can't change the default model for
  Codex cloud tasks"); `gpt-5.3-codex-spark` is CLI & SDK + app & IDE only (no
  ChatGPT Credits, no API access). Model ids/deprecations unchanged
  (`docs/models/codex.md`).
- **Codex session store re-anchored:** `~/.codex/history.jsonl` is documented
  again — the config-advanced page states "Codex saves local session transcripts
  under `CODEX_HOME` (for example, `~/.codex/history.jsonl`)" with
  `[history] persistence = "none"` / `history.max_bytes`; the rollout/sessions
  directory (`~/.codex/sessions/`) remains not documented. Session Resume
  mirrors updated (`compatibility-matrix.md`, manifest claims).
- **Codex noninteractive page keeps thinning:** `--cd`/`-C` and the `-s` short
  alias are no longer stated there (only long `--sandbox` remains); both stay
  documented on the CLI reference — claims re-anchored, `cli-invocation.md`
  headless table unchanged (it already cites the reference).
- **Claude sessions page anchor moves:** the `-c` short form and the URL-accepting
  `--from-pr` forms are no longer stated on the sessions page (URL pasting
  survives as a picker search feature); both remain on the CLI reference, which
  now anchors them. New on the CLI reference: `--permission-mode manual` (alias
  of `default`, v2.1.200) — added to `cli-invocation.md`. The headless page is
  retitled "Run Claude Code programmatically" (the literal word "headless" left
  the body; same URL and behavior).
- **Grok headless page:** the ACP example now uses camelCase `sessionId`
  (`session/new`); the snake_case `session_id` token is gone — Session Resume
  id-form cell updated.
- **Cursor hooks:** `stop` no longer appears in either cloud-agent support
  table — its cloud status is now *not stated* (previously listed as
  unsupported). Removed `stop` from the cloud-unsupported lists in
  `compatibility-matrix.md` and `plugin-packaging.md`.
- **gajae-code README (non-vendor):** the exact `~/.gjc/skills/` path is no
  longer literally stated — bundled skills install "into your user `.gjc`
  directory" via `gjc setup defaults`. Weakened the path claim in `SKILL.md`,
  `compatibility-matrix.md`, `plugin-packaging.md`; README verified stamps
  2026-06-27 → 2026-07-05. New 0.6/0.7 README content (rlm mode, notifications
  daemon) noted in the manifest, outside claim scope.
- **Antigravity (7 SPA pages re-rendered dynamically, Playwright):** the
  gcli-migration page no longer states the `~/.local/bin/agy` install path (the
  install page remains the anchor) and now states the global skills path pair
  (`~/.gemini/skills/` → `~/.gemini/antigravity-cli/skills/`) — claims updated;
  the other six pages are unchanged.
- **Hermes overview:** the feature is phrased "Scheduled automations —
  built-in cron" (claim wording aligned; concept unchanged).
- **Model lineup stamps:** Claude/Codex/Grok `docs/models/*.md` re-verified live,
  `Last reviewed` 07-04 → 07-05; fixed the Claude mirror's redirect-URL note
  (actual target is `platform.claude.com/docs/en/about-claude/models/overview`,
  no doubled `/docs/` segment).

## v1.27 — 2026-07-04

Daily refresh: all 56 manifest sources re-verified live. Billing still paused;
model lineups verified against the official Claude/Codex/Grok model pages for
the first time (Codex adds `gpt-5.4`, deprecates `gpt-5.2`/`gpt-5.3-codex`);
Codex CLI docs dropped the session-store paths; Antigravity docs moved to
`/docs/cli/<page>` URLs and resolved the MCP-path inconsistency.

### Changed

- **Billing status re-verified live 2026-07-04, still paused.** The Agent SDK
  support page banner is character-identical to the 07-03 snapshot ("Update June
  15: We're pausing the changes…"). Advanced every billing time-sensitive stamp
  07-03 → 07-04 (`cli-invocation.md`, `cloud-automation.md`,
  `official-sources.json`).
- **Model Lineup verified live for Claude, Codex, and Grok** (first live pass
  since the category shipped in v1.25); `docs/models/claude.md`, `codex.md`,
  `grok.md` rewritten from the official pages and their `unverified this run`
  seed caveats cleared:
  - **Claude:** current = Fable 5, Opus 4.8, Sonnet 5, Haiku 4.5 (id
    `claude-haiku-4-5-20251001`, alias `claude-haiku-4-5`). Reasoning is
    **adaptive thinking** on the current generation (Haiku 4.5: extended
    thinking) — corrected from the earlier blanket "extended thinking". Newly
    documented, **not GA**: `claude-mythos-5` / `claude-mythos-preview`
    (invitation-only, Project Glasswing). `claude-opus-4-1-20250805` is
    deprecated, retiring 2026-08-05. `docs.anthropic.com` now 301-redirects to
    `platform.claude.com` (same doc; URL kept, redirect noted).
  - **Codex:** current = `gpt-5.5`, **`gpt-5.4` (new)**, `gpt-5.4-mini`,
    `gpt-5.3-codex-spark` (text-only research preview, ChatGPT Pro);
    **deprecated: `gpt-5.2`, `gpt-5.3-codex`** (no one-to-one replacement
    mapping documented). The models page documents `codex -m <id>` selection but
    no per-model reasoning/service tiers.
  - **Grok:** current = `grok-4.3` (1M), `grok-4.20-0309`
    reasoning/non-reasoning/multi-agent (1M), `grok-build-0.1` (256k), plus
    Imagine image/video models and the Voice API. Kuma-catalog id
    `grok-composer-2.5-fast` is **not documented** on the official page (no
    retired section — recorded as absence, not retirement).
- **Codex session-store paths no longer documented.** The CLI reference dropped
  `~/.codex/sessions/` and `~/.codex/history.jsonl`; rollout files survive only
  indirectly via `--ephemeral`, and the app-server doc adds `thread/archive`
  (JSONL thread logs, archived-sessions directory, exact paths unstated).
  Session Resume mirrors updated (`compatibility-matrix.md` Codex rows +
  implementer note) to `not documented` per the source discipline.
- **Codex CLI overview no longer states the seed-prompt arg** (`codex
  "<prompt>"`); marked `unverified this run` in the spawn tables (SKILL.md,
  `cli-invocation.md`) pending re-anchoring. The noninteractive page also
  dropped its `--model`/`-m` listing (defers to the CLI reference; the flag
  remains official via the models page) — manifest note only.
- **Antigravity docs re-verified by dynamic render (Playwright); all tracked
  claims hold.** Structural changes: every page moved from `/docs/cli-<page>` to
  `/docs/cli/<page>` (and `/docs/sdk-overview` → `/docs/sdk/overview`) — old
  URLs redirect; manifest + doc citations updated to the canonical paths. The
  plugins page no longer states MCP config paths (defers to a dedicated MCP
  docs page), which **resolves the previously recorded global-MCP-path
  inconsistency** — the migration page's `~/.gemini/config/mcp_config.json`
  (global) / `.agents/mcp_config.json` (workspace) is now the only stated pair.
  New on the reference page: `/statusline`, `/fast`, `/planning`, `/btw`,
  `/add-dir`, `/diff`, `/usage` etc.; `plugin.json` now documents a `$schema`
  with only `name` required.
- **Claude Code doc drift (3 claims):** `CLAUDE_CONFIG_DIR` left the memory page
  (sessions page remains the anchor); `maxSkillDescriptionChars` was renamed
  `skillListingMaxDescChars` (default 1536 unchanged);
  `CLAUDE_CODE_SYNC_PLUGIN_INSTALL` left the plugins page (headless page remains
  the anchor). Manifest claims updated; no doc-body mirrors were affected.
- **Cursor overview no longer mentions the worktree flag** (still documented on
  cli/using and cli/reference/parameters) — manifest claim moved to those
  anchors.

## v1.26 — 2026-07-03

Daily refresh: billing re-verified live, still paused; Antigravity SPA re-rendered; freshness stamps advanced.

### Changed

- **Billing status re-verified live 2026-07-03, still paused.** The Agent SDK
  support page (`support.claude.com/.../15036540`) was fetched this run and its
  banner still reads *"Update June 15: We're pausing the changes to Claude Agent
  SDK usage described below. For now, nothing has changed: Claude Agent SDK,
  `claude -p`, and third-party app usage still draw from your subscription's usage
  limits."* No structural drift. Advanced every billing time-sensitive stamp
  07-02 → 07-03 (`cli-invocation.md`, `cloud-automation.md`,
  `official-sources.json` `updated` + billing notes/claim).
- **Antigravity CLI docs re-verified by dynamic render.** The `antigravity.google`
  SPA (a static fetch returns an empty shell) was rendered dynamically and the
  `cli-reference` page still lists every tracked slash command (`/resume` +
  `/switch`/`/conversation`, `/fork`/`/branch`, `/model`, `/mcp`, `/skills`,
  `/permissions`, `/hooks`, `/config`/`/settings`, `/keybindings`, `/rewind`,
  `/agents`, `/tasks`) plus the `settings.json` config-key table
  (`toolPermission` request-review/proceed-in-sandbox/always-proceed/strict,
  `artifactReviewPolicy`, `enableTerminalSandbox`). No drift; the structural
  verification stamp (06-22) is left as-is per the freshness rule.
- Model-lineup stamps (07-02) left untouched — structural, not re-verified this
  run — as were the other stable structural stamps (06-22 / 06-27 / the settled
  06-18 Gemini cutoff). Only time-sensitive billing stamps advance.

## v1.25 — 2026-07-02

New **Model Lineup** category: track each runtime's current shipping model ids, reasoning/effort tiers, and retired models against the official vendor model pages, re-verified by the daily refresh.

### Added

- **`docs/models/` folder** — one file per runtime (`claude`, `codex`, `grok`,
  `gemini-antigravity`, `cursor`, `hermes`, `kuma-studio`) plus a `README.md`
  documenting the SSoT boundary, maintenance policy, and provenance-stamp rule.
  Each file records current shipping model ids, reasoning/effort tiers, retired
  models, its official source URL, and a `Last reviewed:` stamp. Seed lineup
  (2026-07-02): Claude = Opus 4.8 / Sonnet 5 / Haiku 4.5 / Fable 5 current, Opus
  4.7 + Sonnet 4.6 retired; Codex/Grok/others seeded from the Kuma catalog and
  marked `unverified this run` pending official-page confirmation.
- **Three `kind: "model-lineup"` sources** in `docs/official-sources.json`
  (`anthropic-model-lineup` / `openai-codex-model-lineup` / `xai-grok-model-lineup`),
  anchored on the official model pages (`docs.anthropic.com`,
  `developers.openai.com/codex/models`, `docs.x.ai`) — all reachable (HTTP 200) in
  the check run; no new `allowedHosts` needed.
- **`guardCategory("model-lineup", "Model Lineup")`** in
  `scripts/check-official-sources.mjs` so a future edit cannot silently drop the
  category or its codex + claude-code anchors, with two covering tests in
  `check-official-sources.test.mjs` (drop-entirely and missing-anchor).
- **`## Model Lineup`** section in `SKILL.md` and a **MODEL LINEUP — do not skip
  this category** paragraph in `prompts/daily-official-doc-update.md`, both stating
  the SSoT boundary (owns current ids/tiers/retirement; links out to pricing =
  `claude-api`, spawnable catalog = kuma-studio `team.json` downstream, naming =
  Kuma vault) and the `unverified this run` discipline.

### Boundary

- `docs/models/` is a **vendor-truth record**; the Kuma Studio `team.json`
  `modelCatalog` is a **downstream consumer** that syncs from it, never the
  reverse. Pricing stays with the `claude-api` skill; naming/phonetic-gloss stays
  with the Kuma vault. This category links to those, does not duplicate them.

## v1.24 — 2026-07-02

Daily refresh: billing re-verified live, still paused; Antigravity SPA re-rendered; freshness stamps advanced.

### Changed

- **Billing status re-verified live 2026-07-02, still paused.** The Agent SDK
  support page was fetched this run and its banner still reads *"Update June 15:
  We're pausing the changes to Claude Agent SDK usage described below. For now,
  nothing has changed: Claude Agent SDK, `claude -p`, and third-party app usage
  still draw from your subscription's usage limits."* No structural drift.
  Advanced every billing time-sensitive stamp 07-01 → 07-02 (`cli-invocation.md`,
  `cloud-automation.md`, `official-sources.json` `updated` + billing notes/claim).
- **Antigravity CLI docs re-verified by dynamic render.** The `antigravity.google`
  SPA (a static fetch returns an empty shell) was rendered dynamically and the
  `cli-reference` page still lists every tracked slash command (`/resume` +
  `/switch`/`/conversation`, `/fork`/`/branch`, `/model`, `/mcp`, `/skills`,
  `/permissions`, `/hooks`, `/config`/`/settings`, `/keybindings`, `/rewind`,
  `/agents`, `/tasks`) plus the `settings.json` config-key table. No drift; the
  structural verification stamp (06-22) is left as-is per the freshness rule.
- Stable structural stamps (06-22 / 06-27 / the settled 06-18 Gemini cutoff) left
  untouched.

## v1.23 — 2026-07-01

Daily refresh: billing re-verified live, still paused; freshness stamps advanced.

### Changed

- **Billing status re-verified live 2026-07-01, still paused.** Both official
  support pages were fetched this run. The Agent SDK page banner still reads
  *"Update June 15: We're pausing the changes to Claude Agent SDK usage described
  below. For now, nothing has changed: Claude Agent SDK, `claude -p`, and
  third-party app usage still draw from your subscription's usage limits."* The
  Pro/Max page still confirms the subscription covers Claude Code, a present
  `ANTHROPIC_API_KEY` switches to pay-as-you-go API billing, and `/status`
  monitors remaining plan allocation. No structural drift. Advanced every billing
  time-sensitive stamp 06-30 → 07-01 (`cli-invocation.md`, `cloud-automation.md`,
  `official-sources.json` `updated` + billing notes/claim). Stable structural
  stamps (06-22 / 06-27 / the settled 06-18 Gemini cutoff) left untouched.

## v1.22 — 2026-06-30

Fix the auto-merge guard's post-merge branch cleanup for git-worktree layouts.

### Fixed

- **`auto-merge-guard.sh` no longer fails on `gh pr merge --delete-branch` in a
  worktree checkout.** When the daily refresh runs from a linked git worktree (the
  routine's own `aldegad/routine1` worktree) while `main` is checked out in the
  shared canonical worktree, `--delete-branch`'s post-merge *local* step ("switch
  off the just-deleted branch") aborts with `fatal: 'main' is already used by
  worktree ...` — **after** the remote squash-merge has already succeeded, and it
  leaves the remote branch stale on that failure. The guard now runs
  `gh pr merge "$PR" --squash` and then deletes the remote ref explicitly
  (`git push origin --delete <headRefName> || true`), which never touches a local
  checkout. The routine worktree is left intact for reuse and the next run's
  `git fetch --prune` clears the stale remote-tracking ref. The merge gate's
  docs-only + source-check policy is unchanged; only the cleanup mechanics changed.

## v1.21 — 2026-06-30

Daily refresh: billing re-verified live, still paused; freshness stamps advanced.

### Changed

- **Billing status re-verified live 2026-06-30, still paused.** The official
  support page banner still reads *"Update June 15: We're pausing the changes to
  Claude Agent SDK usage described below. For now, nothing has changed: Claude
  Agent SDK, `claude -p`, and third-party app usage still draw from your
  subscription's usage limits."* The Pro/Max page still confirms the subscription
  covers interactive Claude Code, a present `ANTHROPIC_API_KEY` switches to
  pay-as-you-go API billing, and `/status` monitors plan allocation. Advanced
  every billing time-sensitive stamp 06-29 → 06-30 (`cli-invocation.md`,
  `cloud-automation.md`, `official-sources.json`, the daily prompt) per the
  freshness-stamp carve-out. No structural facts changed. (Source:
  https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan)

### Notes

- **No structural drift this run.** Both `kind: "billing"` sources re-verified
  live with no material drift; all tracked claims still hold. A minor wording
  clarification on the Pro/Max page (Claude Code's credit prompt and Claude
  Console's auto-reload are "separate systems") does not contradict any tracked
  claim, so no doc body changed. The other structural sources (Codex, Claude
  hooks/settings/plugins, Grok, Hermes, Cursor, GitHub, gajae-code) were carried
  forward without claimed drift; their structural stamps were left as-is per the
  low-noise freshness rule.
- **Antigravity SPA unverified this run.** The `antigravity.google` docs are a
  JS-rendered SPA; dynamic render via `claude-in-chrome` requires the interactive
  browser-selection gate, which is not available in this scheduled (ephemeral) job,
  so the six Antigravity sources could not be rendered. Recorded as *unverified
  this run* and their structural render stamps (06-22) left untouched (no change
  claimed).

## v1.20 — 2026-06-29

Daily refresh: billing re-verified live, still paused; freshness stamps advanced.

### Changed

- **Billing status re-verified live 2026-06-29, still paused.** The official
  support page banner still reads *"Update June 15: We're pausing the changes to
  Claude Agent SDK usage described below. For now, nothing has changed: Claude
  Agent SDK, `claude -p`, and third-party app usage still draw from your
  subscription's usage limits."* The Pro/Max page still confirms the subscription
  covers interactive Claude Code, a present `ANTHROPIC_API_KEY` switches to
  pay-as-you-go API billing, and `/status` monitors plan allocation. Advanced
  every billing time-sensitive stamp 06-28 → 06-29 (`cli-invocation.md`,
  `cloud-automation.md`, `official-sources.json`, the daily prompt) per the
  freshness-stamp carve-out. No structural facts changed. (Source:
  https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan)

### Notes

- **No structural drift this run.** Codex, Claude, Grok, Hermes, Cursor, and
  GitHub sources re-verified with no material drift; the two facts recorded
  yesterday (plugins-reference experimental `themes/` + `channels` field; headless
  10-minute background-subagent wait cap since v2.1.182) were re-confirmed still
  present and accurate. The gajae-code README re-verified, no drift; its
  structural `verified 2026-06-27` stamp was left as-is per the low-noise freshness
  rule.
- **Antigravity SPA unverified this run.** The `antigravity.google` docs are a
  JS-rendered SPA and `claude-in-chrome` was not connected this run, so the six
  Antigravity sources could not be dynamically rendered; recorded as *unverified
  this run* and their structural render stamps (06-22) left untouched (no change
  claimed).

## v1.19 — 2026-06-28

Daily refresh: billing re-verified live (still paused); two verified Claude doc
drifts recorded in the source manifest; freshness stamps advanced.

### Changed

- **Billing status re-verified live 2026-06-28, still paused.** The official
  support page banner still reads *"Update June 15: We're pausing the changes to
  Claude Agent SDK usage described below. For now, nothing has changed: Claude
  Agent SDK, `claude -p`, and third-party app usage still draw from your
  subscription's usage limits."* The Pro/Max page still confirms the subscription
  covers interactive Claude Code, a present `ANTHROPIC_API_KEY` switches to
  pay-as-you-go API billing, and `/status` monitors plan allocation. Advanced
  every billing time-sensitive stamp 06-27 → 06-28 (`cli-invocation.md`,
  `cloud-automation.md`, `official-sources.json`, the daily prompt) per the
  freshness-stamp carve-out. (Source:
  https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan)

### Added

- **Claude plugins-reference: themes + channels components recorded.** The
  official plugins-reference now documents two components beyond the core six
  (skills, agents, hooks, MCP servers, LSP servers, monitors): an **experimental
  `themes/`** component (JSON `base` preset + sparse `overrides`, surfaced in
  `/theme`) and a **`channels`** manifest field declaring MCP-backed
  message-injection channels. The page also moves `themes` and `monitors` under an
  `experimental` manifest key (top-level still works with a `claude plugin
  validate` warning, a future release will require `experimental.*`). Added these
  as claims to `anthropic-claude-plugins-reference` in `docs/official-sources.json`.
  (Source: https://code.claude.com/docs/en/plugins-reference)
- **Claude headless: background-subagent wait cap recorded.** `claude -p` waits
  for background subagents/workflows (exempt from the 5s grace); since **v2.1.182**
  that wait is **capped at 10 minutes by default**, tunable via
  `CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS` (`0` = no limit). Added as claims to
  `anthropic-claude-headless` in `docs/official-sources.json`. (Source:
  https://code.claude.com/docs/en/headless)

### Notes

- **Antigravity SPA unverified this run.** The `antigravity.google` docs are a
  JS-rendered SPA and `claude-in-chrome` was not connected this run, so the six
  Antigravity sources could not be dynamically rendered; they are recorded as
  *unverified this run* and their structural render stamps (06-22) were left
  untouched (no change claimed). All other vendor sources (Codex, Grok, Hermes,
  Cursor, GitHub) and the gajae-code README re-verified with no drift; their
  structural stamps were left as-is per the low-noise freshness rule.

## v1.18 — 2026-06-27

Added **gajae-code** (`gjc`) as an eighth tracked runtime — the first
**non-vendor** entry alongside Kuma Studio.

### Added

- **gajae-code coverage across the wiki.** gajae-code (community/MIT beta by
  Yeachan-Heo, binary `gjc`) is a coding-agent harness that runs adjacent to other
  CLIs. Added rows/sections to every comparison surface: SKILL.md (Runtime Coverage,
  CLI Spawn, Session Resume, Project Instruction Files, Skill Invocation, plus a
  trigger keyword `가재`/`gjc`), `docs/compatibility-matrix.md` (all five tables),
  `docs/cli-invocation.md` (interactive/headless/resume tables + sources), and
  `docs/plugin-packaging.md` (a dedicated section). Documented facts: install
  `bun install -g gajae-code`; interactive `gjc` / `--tmux` / `--worktree`; headless
  `gjc --mode rpc` (no JSON flag); skills in `~/.gjc/skills/` via `gjc skills
  list/read`, invoked as `/skill:<name>` (colon form — the only runtime that differs
  from `/<skill-name>`), defaults `deep-interview`/`ralplan`/`ultragoal`/`team`;
  config `~/.gjc/config.yml` + per-project `.gjc/`. Hooks, plugins, session-id
  resume, and project-instruction-file loading are all recorded as `not documented`.
- **Non-vendor source discipline.** Added `policy.nonVendorRule` and a
  `kind: "community-runtime"` source (`gajae-code-readme`) to
  `docs/official-sources.json`, and `github.com` to `policy.allowedHosts` so the
  daily refresh can fetch the README. The daily prompt
  (`prompts/daily-official-doc-update.md`) now lists gajae-code in WHAT TO CHECK and
  carries a NON-VENDOR note: re-verify it from its README every run, keep it flagged
  as community/non-vendor, never present it as a vendor guarantee.

## v1.17 — 2026-06-27

Daily refresh: billing status re-verified live, unchanged; freshness stamps advanced.

### Changed

- **Billing status re-verified live 2026-06-27, still paused.** The official
  support page banner still reads *"Update June 15: We're pausing the changes to
  Claude Agent SDK usage described below. For now, nothing has changed: Claude
  Agent SDK, `claude -p`, and third-party app usage still draw from your
  subscription's usage limits."* API-key accounts remain pay-as-you-go (no Agent
  SDK monthly credit). Advanced every billing time-sensitive stamp 06-26 → 06-27
  (`cli-invocation.md`, `cloud-automation.md`, `official-sources.json`, the daily
  prompt) per the freshness-stamp carve-out. No structural facts changed; the
  Gemini cutoff (2026-06-18, a settled past event) and the Antigravity SPA render
  stamps (06-22, structural) were left untouched.

## v1.16 — 2026-06-26

Daily refresh: billing status re-verified live, unchanged; freshness stamps advanced.

### Changed

- **Billing status re-verified live 2026-06-26, still paused.** The official
  support page banner still reads *"Update June 15: We're pausing the changes to
  Claude Agent SDK usage described below. For now, nothing has changed: Claude
  Agent SDK, `claude -p`, and third-party app usage still draw from your
  subscription's usage limits."* The Pro/Max page (subscription covers interactive
  Claude Code; a present `ANTHROPIC_API_KEY` switches to pay-as-you-go API billing;
  `/status` monitors allocation) is also unchanged. Advanced every billing
  time-sensitive stamp 06-25 → 06-26 (`cli-invocation.md`, `cloud-automation.md`,
  `official-sources.json`, the daily prompt) per the freshness-stamp carve-out. No
  structural facts changed; the Gemini cutoff (2026-06-18, a settled past event)
  and the Antigravity SPA render stamps (06-22, structural — re-rendered live this
  run via Playwright + system Chrome, slash commands/conversation scoping
  unchanged) were left untouched.

## v1.15 — 2026-06-25

Daily refresh: billing status re-verified live, unchanged; freshness stamps advanced.

### Changed

- **Billing status re-verified live 2026-06-25, still paused.** The official
  support page banner still reads *"Update June 15: We're pausing the changes to
  Claude Agent SDK usage described below. For now, nothing has changed: Claude
  Agent SDK, `claude -p`, and third-party app usage still draw from your
  subscription's usage limits."* The Pro/Max page (subscription covers interactive
  Claude Code; a present `ANTHROPIC_API_KEY` switches to pay-as-you-go API billing;
  `/status` monitors allocation) is also unchanged. Advanced every billing
  time-sensitive stamp 06-24 → 06-25 (`cli-invocation.md`, `cloud-automation.md`,
  `official-sources.json`, the daily prompt) per the freshness-stamp carve-out. No
  structural facts changed; the Gemini cutoff (2026-06-18, a settled past event)
  and the Antigravity SPA render stamps (06-22, structural) were left untouched.

## v1.14 — 2026-06-24

Fixed the daily refresh's blind spot for **time-sensitive status claims** and
re-verified the Claude billing status live.

### Fixed

- **Stale freshness stamps were rotting a still-true claim.** The daily prompt's
  `IF THERE ARE NO CHANGES: do not modify any file` rule suppressed verification-date
  bumps, so the billing "paused" status kept its stamp across the no-op 06-23 and
  06-24 runs even though it was re-checked — making a correct claim read as
  stale/wrong. Added a **freshness-stamp carve-out**: a *time-sensitive status
  claim* (billing paused/resumed/cancelled, an announced-but-not-yet-effective
  cutoff, any "currently X" status) MUST advance its `verified` / `as of` date and
  the doc-level `Last reviewed:` on every successful re-verification, even with no
  wording change — that date bump *is* a legitimate edit, not "no changes". Stable
  structural facts keep their stamp until the fact itself changes (no new churn).
  Codified in `prompts/daily-official-doc-update.md` and the SKILL.md "Keep history
  out of doc bodies" rule.

### Changed

- **Billing status re-verified live 2026-06-24, unchanged.** The official support
  page banner still reads *"Update June 15: We're pausing the changes… nothing has
  changed: Claude Agent SDK, `claude -p`, and third-party app usage still draw from
  your subscription's usage limits."* Advanced every billing freshness stamp
  06-22 → 06-24 (`cli-invocation.md`, `cloud-automation.md`, `official-sources.json`,
  the daily prompt) and led the wording with the practical outcome (draws from the
  subscription pool, no separate per-run credit). The Antigravity SPA render stamps
  (06-22) were deliberately left untouched — they are structural, not re-rendered
  this run.
- **README billing made durable across all 7 editions.** Removed the self-rotting
  inline `as of <date>` from the human-facing READMEs (English + six translations),
  which were the source of per-day translation churn; they now state the durable
  fact and defer the dated verified status to `docs/cli-invocation.md` (the SSoT
  stamp).

## v1.13 — 2026-06-22

Daily re-verification of all 51 official sources (six WebFetch-able runtimes
fact-checked in parallel; all seven Antigravity SPA pages re-rendered
dynamically; both billing pages re-fetched live). Two real drifts corrected, the
Agent SDK billing change confirmed **still paused**, and verification stamps
refreshed.

### Fixed

- **Hermes `subagent_start` hook was missing.** The official hooks doc documents
  both `subagent_start` and `subagent_stop` plugin hooks; the repo enumerations
  listed only `subagent_stop`. Added `subagent_start` in `compatibility-matrix.md`,
  `plugin-packaging.md`, and the `nous-hermes-hooks` claims in
  `official-sources.json`.
- **Gemini "origin-path separators" was unsourced.** The official `gemini-md`
  page states only that it "concatenates the contents of all found files" and
  documents no separator/origin-marker format. Reworded to "separator format not
  documented" in `compatibility-matrix.md` and the `gemini-cli-gemini-md` claim in
  `official-sources.json`.

### Verified (no content change)

- **Agent SDK / `claude -p` billing still paused.** The 2026-06-15 change remains
  paused per the live support-page banner; subscription usage limits still cover
  Agent SDK, `claude -p`, and third-party app usage. Status dates moved
  2026-06-18 → 2026-06-22 in `cli-invocation.md` and `cloud-automation.md`.
- **All seven Antigravity SPA pages re-rendered with zero drift** (cli-reference,
  conversations, sdk-overview, plugins, using, install, gcli-migration); the
  documented MCP global-path inconsistency (`~/.gemini/config/` per migration vs
  `~/.gemini/antigravity-cli/` per plugins) still stands. Render stamps refreshed
  to 2026-06-22.
- Codex (13), Claude Code (10), Grok (2), Cursor (5), GitHub (2), and the Gemini
  transition blog re-verified against official docs with no drift.

## v1.12 — 2026-06-18

Full adversarial re-verification of every source against the official vendor docs
(7 WebFetch-able runtimes fact-checked in parallel; all 7 Antigravity SPA pages
re-rendered dynamically). The Antigravity surface confirmed with **zero drift**
from the 2026-06-16 render. Corrections and currency updates:

### Fixed

- **Grok session store was fabricated.** The Session Resume table claimed
  `~/.grok/active_sessions.json` with a `[{session_id, pid, cwd, opened_at}]`
  schema; the official headless-scripting doc documents only `~/.grok/sessions`
  and no such index. Corrected to `~/.grok/sessions` and the index marked
  `not documented`.
- **Unsourced "Apache 2.0" claim removed.** The Google transition blog does
  **not** mention Apache-2.0, the OSS repo's fate, or the `agy` binary name; those
  were attributed to the blog URL. De-attributed in `official-sources.json` and
  `cli-invocation.md` (the binary name stays sourced to the antigravity.google docs).
- **Gemini CLI cutoff shifted future → present.** 2026-06-18 (the individual
  cutoff) is today; `SKILL.md`, `cli-invocation.md`, `compatibility-matrix.md`,
  and `plugin-packaging.md` now read in present/past tense.
- **`check-official-sources.mjs` was failing since v1.11.** The `gemini-cli-gemini-md`
  source's host `google-gemini.github.io` was never added to `policy.allowedHosts`.
  Added it; the check passes (51 sources).
- **README billing was stale.** v1.10 paused the 2026-06-15 Agent SDK credit
  change everywhere except `README.md`, which still described it as in effect.
  Corrected (English + all six translations regenerated). The daily prompt's
  billing/cutoff instructions were likewise updated.
- **SKILL.md self-contradiction.** The taxonomy still said Claude documents "no
  Codex-style `.codex-plugin/plugin.json` equivalent"; Claude documents
  `.claude-plugin/plugin.json`. Fixed.
- **`/status` over-claimed.** The Pro/Max page references `/status` only for
  remaining-plan-allocation, not for revealing the active auth method. Reworded in
  `official-sources.json` and `cli-invocation.md`.
- **Codex plugins-overview claims trimmed.** The overview page lists only
  skills/apps/MCP servers; `marketplaces`/`hooks` were moved to the `plugins/build`
  source where they are actually documented.

### Changed (currency)

- **Cursor cloud-agent unsupported hook set expanded** to include
  `beforeMCPExecution`/`afterMCPExecution`, `afterAgentResponse`/`afterAgentThought`,
  and `stop` ("Not yet wired for cloud agents"); recorded `failClosed` default
  `false`, `loop_limit` default `5` (Cursor) / `null` (Claude Code), and the
  per-OS enterprise `hooks.json` paths.
- **Hermes:** added the `session:reset` gateway event and the
  `HERMES_ACCEPT_HOOKS=1` shell-hook bypass; appended `.cursor/rules/*.mdc` to the
  SKILL.md precedence summaries.
- **Codex:** documented the PreToolUse "only the simple ones" shell-coverage
  caveat, the lifecycle event set in the matrix, the `behavior`-field
  `PermissionRequest` hook (and `ask`/`approve` as "parsed but not yet supported"),
  and the `codex exec` automation flags (`--ephemeral`, `--output-schema`,
  `--ignore-rules`, `--ignore-user-config`, `CODEX_API_KEY`).
- **Grok:** documented hook env vars (`GROK_HOOK_*`), marketplace config sources
  (`[[marketplace.sources]]`, `known_marketplaces.json`, `--plugin-dir`).
- **Claude:** noted `claude setup-token` and `--output-format json` `total_cost_usd`
  for scripted/CI billing, the `--bare` API-key auth requirement, and the
  `skillOverrides` value set (`on`/`name-only`/`user-invocable-only`/`off`).
- All `Last reviewed:` / `verified` / dynamic-render stamps refreshed to
  2026-06-18; manifest `updated` → 2026-06-18.

## v1.11 — 2026-06-17

### Added — Project Instruction File Loading mechanics

The compat matrix recorded project-instruction *filenames* per engine but not how
each engine **discovers, merges, and times** those files. Added a dedicated
`docs/compatibility-matrix.md` → **Project Instruction File Loading** section (and
a condensed working model in `SKILL.md` → Project Instruction Files), source-cited
per engine along two axes — ancestor walk-up and subdirectory discovery
(upfront vs on-demand):

- **Claude Code** — ancestor chain (cwd → fs root) loaded **in full at launch**,
  concatenated root → cwd (closer wins); nested subdir `CLAUDE.md` loaded
  **on-demand** and not re-injected after `/compact` until touched again.
- **Codex** — walks *root → down to cwd*, ≤ 1 file/dir, closer overrides, built
  once per run under a 32 KiB cap, **no subdirectory lookahead**.
- **Gemini / Antigravity** — global + ancestor + **entire subtree below cwd
  concatenated upfront** (`.gitignore`-aware); `/memory show|reload`.
- **Hermes** — **single** project file, first-match (`.hermes.md` → `AGENTS.md`
  → `CLAUDE.md` → `.cursorrules`), no merge; on-demand dir + 5-parent discovery
  during file ops; `SOUL.md` always separate.
- **Cursor** — project-root `AGENTS.md`/`CLAUDE.md` only; tree-walk/merge
  **not documented**. **Grok** — Claude-compat claimed, tree semantics **unknown**.

New source `gemini-cli-gemini-md` added to `official-sources.json`; codex and
claude entries' claims augmented with the loading-mechanics keywords.

## v1.10 — 2026-06-16

### Changed

- **Agent SDK billing change paused.** The 2026-06-15 separate-monthly-credit
  change is paused; `claude -p` and Agent SDK usage still draw from the regular
  subscription limits. Corrected in `docs/cli-invocation.md`,
  `docs/cloud-automation.md`, and the `anthropic-*` billing sources.
- **Claude/Cursor refresh claims** folded in: new Claude hooks/settings/memory/
  sessions/plugins claims, Cursor tab hooks + cloud-agent hook restrictions, and
  the `/migrate-to-skills` command.

### Added — Antigravity CLI gathered by dynamic render

The daily automation marks `antigravity.google/docs/*` unreachable (JS-rendered
SPA → static fetch returns an empty shell). Rendered the pages dynamically and
folded in the verified truth, correcting drift:

- **Hooks now documented** (was "config format not verified"): pre/post-tool
  hooks live in a plugin's `hooks.json` or the primary `settings.json`, browsed
  via `/hooks`.
- **Native plugin layout documented**: `~/.gemini/antigravity-cli/plugins/<name>/`
  with `plugin.json` (required), `hooks.json`, `mcp_config.json`, `skills/`,
  `agents/`, `rules/`; managed by `agy plugin list/install/enable/disable/uninstall`.
- **Skill invocation corrected** (was "no typed invocation token"): registered
  skills auto-compile to typed `/<skill-name>` slash commands in the TUI.
- **Antigravity SDK** is the programmatic/headless path: `pip install
  google-antigravity`, Python `Agent`/`LocalAgentConfig`.
- New official sources tracked: `antigravity-cli-plugins`, `antigravity-cli-using`,
  `antigravity-cli-install`, `antigravity-sdk-overview`; existing three Antigravity
  sources stamped "verified by dynamic render 2026-06-16". Recorded the global
  `mcp_config.json` path inconsistency between Google's migration and plugins pages.

## v1.9 — 2026-06-13

### Changed

- **Project-local skills/hooks matrix refreshed.** Added a direct
  `docs/compatibility-matrix.md` table for project-specific skills and hooks:
  Codex, Claude Code, Grok, and Cursor are documented as project-local
  skills+hooks; Antigravity and Hermes are recorded as partial where official
  docs do not establish the same repo-local pair.
- **Claude Code packaging updated.** Claude now has documented
  `.claude-plugin/plugin.json` plugins, skills-directory plugins, plugin hooks,
  and project `.claude/skills/`; older "no cited Codex-style package format"
  wording was replaced with Claude's own plugin format.
- **Hermes and Cursor surfaces updated.** Hermes now records gateway hooks,
  shell hooks, plugin hooks, and `plugin.yaml` plugins with bundled skills.
  Cursor now records Agent Skills and project `.cursor/hooks.json` hooks.
- **Daily refresh PRs absorbed.** Folded in open PR #26, #27, and #28 factual
  updates: Codex hook gaps, Claude hook capabilities, Claude Agent SDK credit
  amounts, and corrected Claude settings claims.

### Added

- New official source entries for Codex skills/config, Claude plugins/reference,
  Hermes hooks/plugins/build-plugin, and Cursor skills/hooks.

## v1.8 — 2026-06-11

### Added

- **Multilingual README.** `README.ko/ja/zh-Hans/es/fr/de.md` generated from
  the English source (the SSoT) with a language switcher; regenerate via
  `kuma translate README.md --lang <code>` after editing the English file.
- **Identity icon.** `assets/icon.png` (hub-cube: one source-of-truth core
  radiating to seven runtime nodes) at the top of every README edition.

### Fixed

- **Auto-merge gate never fired.** `scripts/auto-merge-guard.sh` SAFE regex was
  whole-string anchored (`^(docs/|...)$`), so `docs/<file>` never matched and
  every daily-refresh PR stalled for human review. Regex fixed; PR #18 and
  #25 then merged through the gate.
- **Agent SDK billing claim corrected** (via PR #25): from 2026-06-15,
  `claude -p` / Agent SDK usage on eligible plans draws from a separate
  monthly Agent SDK credit — not plain per-token API billing. README and
  `docs/cloud-automation.md` aligned.

## v1.7 — 2026-06-10

### Added

- **Skill Invocation matrix.** New `docs/compatibility-matrix.md` → **Skill
  Invocation** section: per-runtime explicit (user-typed) invocation token and
  model-triggered invocation, source-cited (verified 2026-06-10). Key fact:
  Claude Code and Grok expose skills as `/<skill-name>`; Codex uses `/skills`
  or `$<skill-name>` — typed `/<skill-name>` is not a documented Codex form.
  `SKILL.md` Runtime Coverage gained the short working model.
- **Core rule: no host-layer slash surface.** Don't intercept keystrokes in a
  GUI/terminal wrapper to fake `/command` above the engine — it duplicates the
  engine-side skill's context resolution and assumes one invocation token
  across runtimes. (Trial-and-error 2026-06-10: kuma-studio WorkspaceTerminal
  `/kuma-plan` popover shipped and was removed the same day.)

## v1.6 — 2026-06-09

### Removed

- **Stale-checkout notifier + local installer rolled back.** Removed
  `scripts/notify-if-stale.sh` and `scripts/install-local.mjs`. The per-session
  `git fetch` (Claude `SessionStart`) and per-tool-call process fork (Codex
  `PreToolUse`) cost more than the convenience was worth for a repo that changes
  about once a day. **Remote auto-update stays** via the daily refresh +
  auto-merge gate; sync local checkouts with a plain `git pull`. The matcher and
  macOS-`timeout` lessons from v1.5 are kept in `SKILL.md` as runtime-compat
  knowledge, and manual symlink install remains in the Cross-Agent Install
  Pattern.

## v1.5 — 2026-06-09

### Fixed

- **Codex stale-hook never fired — matcher bug.** `install-local.mjs` registered
  the Codex `PreToolUse` hook with a Claude-style `"*"` matcher, but Codex
  matchers are **regex**, where `"*"` is invalid and matches nothing — so the hook
  silently never ran (confirmed with a probe hook: the event was never invoked).
  Changed to `".*"`. Documented the Claude (`"*"`/omit = all) vs. Codex (regex)
  matcher difference in `SKILL.md`. Claude `SessionStart` path was unaffected.
- **Stale notifier never fetched on macOS — `timeout` bug.** `notify-if-stale.sh`
  wrapped the fetch in `timeout 5`, but `timeout` (GNU coreutils) is absent on
  stock macOS, so it `command not found`-failed and `|| exit 0` made the hook
  silently skip every fetch — it never fired regardless of staleness. Now degrades
  `timeout` → `gtimeout` → plain `git fetch`.

## v1.4 — 2026-06-09

Local install automation for the two runtimes with stable install/hook surfaces
(Claude + Codex), and the stale notifier extended to cover Codex.

### Added

- **`scripts/install-local.mjs`** — local installer. `--runtime claude|codex|both`,
  `--link symlink|copy`, `--with-stale-hook`, `--dry-run`. Symlinks (or copies)
  the skill into `~/.<runtime>/skills/`, is idempotent, backs up any JSON it
  patches, and skips a runtime whose `~/.<runtime>` root is absent.

### Changed

- **Stale-checkout notifier now covers Codex.** `scripts/notify-if-stale.sh`
  auto-detects the hook event: Claude `SessionStart` (once per session) and Codex
  `PreToolUse` (per tool call, self-throttled ~6h via a stamp file). It injects
  `additionalContext` with no `permissionDecision`, so the tool call proceeds
  normally and nothing blocks. `install-local.mjs --with-stale-hook` registers it
  on the matrix-correct event per runtime. The `docs/cloud-automation.md` install
  section was rewritten around the installer; the notifier stays opt-in.

## v1.3 — 2026-06-09

Closes the daily-refresh loop: the routine can now merge its own docs-only PRs
behind a deterministic gate, and local checkouts get a nudge when they fall behind.

### Added

- **Auto-merge gate** (`scripts/auto-merge-guard.sh`): squash-merges a refresh PR
  **only when** the diff is docs/prose-only and `check-official-sources.mjs`
  passes; otherwise it leaves the PR open for human review. Merge authority sits
  on the shell gate's exit code, not the agent's judgement. Wired into
  `prompts/daily-official-doc-update.md` and documented in
  `docs/cloud-automation.md` (the lightweight "Option A" path — no GitHub Actions
  or branch protection required).
- **Stale-checkout notifier** (`scripts/notify-if-stale.sh`): a repo-scoped,
  read-only, non-blocking Claude Code `SessionStart` hook. Silent when the
  checkout is current or you are not in this repo; injects a one-line `git pull`
  heads-up as `additionalContext` when `origin/main` is ahead. Registered in
  `~/.claude/settings.json` (machine config, not in-repo).

### Changed

- Daily prompt + `README.md`: "you review and merge" → the auto-merge gate handles
  docs-only passes and everything else waits for review. `Do NOT push to main`
  softened to "no direct push; merge only via the gate after a PR".

## v1.2 — 2026-06-09

Repositioning release: the package is now framed as what it had already grown
into — a cross-runtime interoperability wiki plus the methodology to manage it.

### Changed

- **Repositioned as a cross-runtime agent-platform interoperability wiki +
  methodology.** `SKILL.md` and `README.md` now lead with the daily-refreshed
  7-runtime compatibility wiki (Codex, Claude Code, Grok, Hermes, Antigravity
  CLI, Cursor, Kuma Studio); the old "Four-Runtime Baseline" became "Runtime
  Coverage" listing all seven. The skill `name` stays `skill-hook-authoring`
  (install symlinks and the `cc-guard` hook depend on the id).

### Added

- **Billing capability domain.** New `kind: "billing"` sources in
  `docs/official-sources.json`: Claude Code subscription vs. API billing, and the
  **2026-06-15** change after which Agent SDK / `claude -p` (headless) usage no
  longer counts toward the Claude plan. Mirrored as a Billing caveat in
  `docs/cli-invocation.md` and a "Why not a local cron" block in
  `docs/cloud-automation.md`; the daily refresh now re-verifies the billing
  category.
- **History-out-of-bodies rule** in `SKILL.md` Core Rules and the daily prompt:
  changelog narrative lives in `CHANGELOG.md` + git tag, doc bodies state current
  truth only (a `Last reviewed:` / `verified` stamp is the lone dated exception).

### Fixed

- `README.md` daily-refresh branch prefix corrected `claude/` → `aldegad/` (the
  `cc-guard` hook rejects branch names containing `claude` or `codex`).

## v1.1 — 2026-06-06

A large doc release adding two capability domains (CLI spawn and session resume),
the Gemini CLI → Antigravity CLI transition, and stronger baseline guards.

### Added

- **CLI spawn & headless launch** — new `docs/cli-invocation.md`: per-runtime
  interactive launch vs non-interactive/headless run for Codex, Claude Code,
  Grok, Hermes, Antigravity CLI, and Cursor, including the mode-switch shape
  difference (flag `-p` vs separate subcommand `codex exec` vs SDK-only) and how
  to pin a specific session. Tracked as `kind: "cli-invocation"` sources.
- **Session Resume** — `SKILL.md` section + `docs/compatibility-matrix.md`
  Session Resume table: same-platform resume invocation, session store, and id
  form for Codex (CLI + app-server `thread/resume`), Claude, Grok, Hermes, and
  Antigravity. Tracked as `kind: "session-resume"` sources.
- **Google Antigravity CLI (`agy`)** as the Gemini CLI successor: interactive
  launch, `--continue` / `--conversation <uuid>` resume, and the
  `agy plugin import gemini` migration, all verified against `antigravity.google`
  (a JS-rendered SPA that needs dynamic rendering).
- **Baseline guards** in `scripts/check-official-sources.mjs` for the
  `cli-invocation` and `session-resume` source categories (codex + claude-code
  anchors), mirroring the existing project-instructions guard.
- Daily refresh (`prompts/daily-official-doc-update.md`) now re-verifies the CLI
  spawn and session-resume categories every run, with an Antigravity SPA-render
  caveat and a 2026-06-18 cutoff note.

### Changed

- **Gemini CLI removed as a tracked runtime** — it is retiring for AI Pro/Ultra
  and free individual users on **2026-06-18** (enterprise/Google Cloud retained;
  OSS repo stays Apache 2.0). Replaced by Antigravity CLI across `SKILL.md`,
  `docs/compatibility-matrix.md`, `docs/plugin-packaging.md`, and the manifest.
  The headless `agy -p` flag and a `GEMINI_API_KEY → AV_API_KEY` env swap are
  **excluded** as officially unconfirmed (third-party only).
- Claude Code settings/memory claims refreshed (auto-memory, `policyHelper`,
  `parentSettingsBehavior`, `httpHookAllowedEnvVars`, `forceLoginMethod`, …);
  skill `name`/`description` "no XML tags" constraint added; OpenAI skill bundle
  size limits recorded.
- Project Instruction Files baseline is now tracked by the daily refresh; the
  symlink-wrapper rule (edit the canonical `AGENTS.md`, treat `CLAUDE.md`
  symlinks as read-only) is documented.
- Cloud automation branch policy: `aldegad/`-prefixed branches (the `cc-guard`
  hook rejects branch names containing `claude` or `codex`).

## v1.0

Baseline: skill/hook authoring rules aligned with official Claude Code + Codex
specs — four-runtime baseline, plugin/extension packaging boundaries, project
instruction files, the `docs/official-sources.json` manifest, and the daily
official-docs refresh automation (Claude Routines, Codex App alternative).
