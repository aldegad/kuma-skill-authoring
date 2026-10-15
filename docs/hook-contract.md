# Hook payload and decision contract (Claude Code / Codex)

Last reviewed: 2026-09-18 — against `anthropic-claude-hooks` and `openai-codex-hooks` in
`docs/official-sources.json` (the field-level corrections below came from the 2026-09-18 refresh of
those two pages). Re-verify there before relying on any field named here; the schemas themselves are
the vendor's, this file only records the places where the two engines read the same field
differently — the traps our hook scripts are written against. SKILL.md points here; it does not
restate any of it.

## Hook Payload Pattern

Claude Code and Codex CLI use the **same input schema** for `PreToolUse` / `PostToolUse` hooks. A Bash tool call arrives as:

```json
{
 "session_id": "abc123",
 "prompt_id": "prompt_abc123",
 "transcript_path": "~/.claude/projects/.../transcript.jsonl",
 "cwd": "/Users/me/project",
 "permission_mode": "default",
 "hook_event_name": "PreToolUse",
 "tool_name": "Bash",
 "tool_use_id": "toolu_...",
 "tool_input": {
 "command": "npm install foo",
 "description": "Install foo",
 "timeout": 120000
 }
}
```

Notes:

- `tool_input.command` — the shell command. Use this single field; do not read from `.input.command`, `.arguments.command`, or other variants.
- `cwd`, `session_id`, `prompt_id`, `transcript_path`, `permission_mode`, `hook_event_name`, `tool_name`, `tool_use_id` are all **top-level**, not under `tool_input`. Reading `tool_input.cwd` returns nothing.
- `permission_mode` is one of `default`, `plan`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`.
- Both engines share this schema. Codex additionally provides `turn_id` and `model`.

## Hook Decision Output

Claude Code and Codex use the **same decision schema** for `PreToolUse`. Pick one of these to block:

Modern (recommended):

```json
{
 "hookSpecificOutput": {
 "hookEventName": "PreToolUse",
 "permissionDecision": "deny",
 "permissionDecisionReason": "safedeps: install not approved — run `safedeps check ...` first"
 }
}
```

Legacy (still supported by both engines):

```json
{"decision": "block", "reason": "safedeps: install not approved ..."}
```

`permissionDecision` accepts `"allow" | "deny" | "ask" | "defer"` on Claude Code. Official Codex hooks docs document only `"allow"` and `"deny"` for `PreToolUse`, and `"defer"` is not documented for Codex at all. Codex parses several other fields but does not implement them — know which failure mode each has:

- **Handler kinds** — only `type: "command"` runs; `prompt` and `agent` handlers are parsed but skipped. `async` is parsed but async command hooks are unsupported, so those handlers are skipped too.
- **PreToolUse** — `permissionDecision: "ask"`, the legacy `decision: "approve"`, `continue: false`, `stopReason`, and `suppressOutput` are parsed but not supported: the hook run is **marked failed and the tool call continues**.
- **PostToolUse** — `updatedMCPToolOutput` and `suppressOutput` are parsed but not supported.
- **PermissionRequest** — `updatedInput`, `updatedPermissions`, and `interrupt` are **reserved and fail closed today**, a different failure mode from the "marked failed, call continues" fields above. Codex's `PermissionRequest` hook otherwise uses a `behavior` field (`"allow"`/`"deny"` with an optional `message`), not `permissionDecision`.

`hookSpecificOutput` may also carry `updatedInput` (replace the tool input before it runs) and `additionalContext` (inject context for the model). For **allow**, exit 0 with no output is sufficient; or emit `permissionDecision: "allow"` explicitly.

**Do not use `{"continue": false, "stopReason": "..."}` to block a single PreToolUse call.** On Claude Code `continue` is a *universal* hook field, not a Stop-only schema: `continue: false` stops Claude entirely and "takes precedence over any event-specific decision fields" (`anthropic-claude-hooks`, verified 2026-09-18), and Codex marks `continue: false` on PreToolUse as unsupported (hook run marked failed, tool call continues). Use `permissionDecision: "deny"` to block the call. The same applies to `{"continue": true}` as an allow signal — it is not one.

For `PostToolUse` block (prevent normal post-processing), use `{"decision": "block", "reason": "..."}` on both engines.

## Codex hook registration

`~/.codex/hooks.json` shape (or inline `[hooks]` in `~/.codex/config.toml`):

```json
{
 "hooks": {
 "PreToolUse": [
 {
 "matcher": "^Bash$",
 "hooks": [
 { "type": "command", "command": "~/.agents/skills/<id>/bin/<hook>", "timeout": 30 }
 ]
 }
 ],
 "PostToolUse": [
 {
 "matcher": "^Bash$",
 "hooks": [
 { "type": "command", "command": "~/.agents/skills/<id>/bin/<hook>", "timeout": 30 }
 ]
 }
 ]
 }
}
```

`<hook>` stands for the skill's hook executable — a compiled binary first, by the language order in [`authoring-rules.md`](authoring-rules.md#choosing-the-language-of-a-skills-or-hooks-executable); a Node script with a shebang registers the same way.

Claude `~/.claude/settings.json` uses the same `hooks.PreToolUse[].hooks[]` shape. Idempotent installers should match on the canonical `command` string and skip if already present.

**Matcher semantics: wildcards now agree, per-event honoring does not.** **Codex matchers are regex strings** (`^apply_patch$`, `Edit|Write`, `mcp__filesystem__.*`), but Codex special-cases the wildcard forms: `"*"`, `""`, or omitting `matcher` entirely matches every occurrence of a supported event — the same as Claude. So a Claude-style `"*"` matcher ports to Codex unchanged, and the old matcher-syntax divergence is gone. What still differs is **which events honor `matcher` at all**: on Codex, `UserPromptSubmit` and `Stop` ignore any configured matcher, so scope those hooks inside the script rather than by matcher.

Codex tool coverage (verified 2026-06-22 against <https://learn.chatgpt.com/docs/hooks>): PreToolUse intercepts **Bash, `apply_patch` file edits, and MCP tool calls**, and a denying PreToolUse prevents the blocked `apply_patch` file from being created (`openai/codex#16732` fixed; PR `#18391`). The earlier "Bash only" behavior is obsolete — do **not** assume apply_patch is unhookable. Three things still bite, so design accordingly:

- **Shell coverage is partial — "only the simple ones".** The official docs state PreToolUse "doesn't intercept all shell calls yet, only the simple ones" (and excludes WebSearch and other non-shell tools), so a compound/complex shell invocation can still slip past a Bash `PreToolUse` guard. Treat a Bash hook as best-effort, not a complete shell gate.
- **Field shape differs per tool.** Bash and apply_patch carry `tool_input.command`; Write/Edit/MultiEdit carry `tool_input.file_path`; MCP tools send their own args. For `apply_patch` the target path lives in the patch body's `*** Add/Update/Delete File: <path>` header lines, **not** a `file_path` field — read the right field and gate on `tool_name`. Scanning the whole `tool_input` blob over-blocks (it matches the path string appearing in *content*, reads, or even the hook script itself).
- **Coverage can still be inconsistent across tool handlers** on some versions (`openai/codex#20204`); very old Codex fired hooks for `Bash` only. Verify on the *target* Codex version rather than assuming.

