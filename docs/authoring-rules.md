# Authoring rules — the why behind them

SKILL.md states each rule in one line. This file owns the rationale, the measured evidence, and the
failure each rule was written against. Nothing here restates a rule the body does not already carry.

## Core Rules

- Pick one canonical repo path first. Installed copies under `~/.claude/skills` and `~/.agents/skills` must be symlinks or generated config entries.
- **Registration goes through the manifest, `skills.json`, and nothing else.** In the `agent-extensions` folder (a plain folder of skill repos, not a git repo), `skills.json` is the single record of *which* skill installs from *which* canonical path; `scripts/install/install-local.mjs` reads it and generates the symlinks into every engine's skill root. Adding a skill = adding one entry there, then re-running the installer. Do **not** register a skill by hand-symlinking it into an engine root or by adding an engine-config entry (e.g. Codex `~/.codex/config.toml` `[[skills.config]]`) — that is a second registration channel and it drifts. This skill states the *conventions*; `skills.json` is the *data* that applies them; the installer is what *executes* them.
- **A skill whose repo also builds artifacts must point its manifest `path` at the skill subfolder, not the repo root.** Runtimes scan the whole skill root recursively — Codex walks `~/.agents/skills` under a traversal budget and aborts with `skills scan reached its traversal limit` when one folder is oversized — so a repo root that carries a build cache (`target/`, `node_modules/`, `dist/`) gets swept into the scan and can starve discovery of *other* skills. Link the minimal skill folder inside the repo (`<repo>/skills/<name>/` or the runtime-native subpath) so the build tree stays outside the scan root; the repo itself, its build, and its upstream remote are untouched. Precedent: `kordoc` links `kordoc/plugins/kordoc/skills/kordoc/`, not its repo root. (This is a refinement of "one canonical repo path", not a `skills/` index in the folder root — that remains banned below.)
- Do not edit home-directory installed copies directly.
- Do not keep separate Claude and Codex versions unless a difference is explicitly documented and tested.
- Name the package layer explicitly before editing: skill-only, hook-only, plugin-like package, or generated runtime plugin. Do not let a `SKILL.md` entrypoint hide installer, hook, or trust-boundary changes.
- Keep `SKILL.md` body under 500 lines — a performance guideline, **not** a hard loading cap. Anthropic's [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) say "Keep SKILL.md body under 500 lines for optimal performance": once loaded, every line competes with conversation history and other context. Put deterministic behavior in scripts; move scenario-specific detail into `docs/*.md` linked **one level deep** from `SKILL.md` (progressive disclosure — Anthropic's page names the folder `reference/`; here it is `docs/`, see Skill Document Topology).
- `name`: max 64 chars, lowercase/numbers/hyphens only, no XML tags, no reserved words (`anthropic`, `claude`); prefer gerund form (`processing-pdfs`). `description`: max 1024 chars, no XML tags, third person, stating both *what* the skill does and *when* to use it (trigger terms) — not the procedure.
- **Quote the `description` if it contains a colon-space (`: `), or the skill silently fails to load.** A `: ` in an unquoted YAML scalar is parsed as a nested mapping → `mapping values are not allowed in this context`. Common trap: `description: ... Korean triggers: 원샷, ...`. Wrap the whole value in single quotes (`description: '...'`); double inner single-quotes, double-quotes are fine inside. Validate frontmatter parses before shipping.
- Hooks are guardrails, not silent fallback paths. They should block clearly, explain why, and require an explicit operator decision for dangerous actions.
- **Do not re-implement a slash surface in a host layer above the engine.** A GUI/terminal wrapper that intercepts keystrokes to fake `/command` creates a second input path that must re-derive session context (current target resolution, ambiguity handling) the engine-side skill already has, and it standardizes on one invocation token where runtimes differ (Claude/Grok `/name` vs Codex `$name` — see Runtime Coverage above). Forward typed input to the engine verbatim and ship the capability as a skill + CLI; reserve host-level interception for things no engine surface can do.
- Cross-agent guidance must be based on official vendor docs. If a platform does not document a feature, record it as `not documented` or `unknown`; do not infer parity from another agent.
- **Make the hook command runnable as registered — a script needs `chmod +x` and a shebang** (a compiled binary needs nothing more). Claude runs a hook in one of two documented forms: with `args` set the `command` is **spawned directly as an executable with no shell**; with `args` omitted the whole `command` string is **passed to a shell** (`sh -c`, Git Bash on Windows, or PowerShell). Either way the executable path itself must be runnable, so a missing exec bit fails with `Permission denied` on *every* matching event (PreToolUse/Stop) in *every* session — one forgotten `chmod +x` silently breaks all agents at once. Codex registers as `node <path>` so it tolerates a missing bit, but always `chmod +x` for parity and **commit the mode** (git stores `100755`). Use the `args` form on Claude when you want to avoid shell quoting entirely.
- **Hook scripts must not assume GNU coreutils.** macOS ships neither `timeout` nor `stat -c`; a hook that calls them unguarded fails on *every* macOS agent — and a fail-closed `|| exit 0` turns that into a silent no-op that looks like "working but quiet". Detect and degrade (`command -v timeout || gtimeout || plain`) and use portable forms (`stat -f %m || stat -c %Y`).
- **Keep history out of doc bodies.** Changelog narrative — what was added/changed/removed and when — lives in `CHANGELOG.md` plus the git tag (the version SSoT), never accreting in `SKILL.md` or `docs/*` prose. A doc body states the **current** truth only; when a fact changes, replace it, don't append the old one. The one exception is a *verification* stamp (`Last reviewed: YYYY-MM-DD`, `verified YYYY-MM-DD`): that is provenance for a live claim, not history. This is what keeps a daily-refreshed wiki from turning into a changelog as it is re-verified. **A freshness stamp must advance when the claim is re-verified, even if the wording is unchanged** — for a *time-sensitive status claim* (a status that can flip: billing paused/resumed/cancelled, an announced-but-not-yet-effective cutoff, any "currently X" status), re-confirming it on a new date *is* the update; a still-true status whose stamp is months old reads as wrong. A blanket "no content change → touch nothing" refresh rots exactly these claims, so carve them out. In kuma-studio this rule is a commit gate, `npm run lint:instruction-doc-history`: a dated heading, a dated parenthetical tag, a line led by a date or a "History" section in an instruction document refuses the commit, and the scanner header owns the definition.

## Choosing The Language Of A Skill's Or Hook's Executable

Choose by execution speed, not authoring difficulty: agents write every language here well, so authoring effort is not worth trading performance for (owner decision, 2026-10-15). Evaluate in this order:

1. **Rust — first.** Use for anything that runs often or must be fast: hooks and guards (they run on every tool call, multiplying start-up time), CLIs called in loops, and tasks that scan, parse, or hash large inputs. A native binary starts in about 2 ms with no runtime to install. Measured: `kuma-hook` 2 ms a run; safedeps went from bash to Rust and became more than 30x faster (owner report). Do not pick Rust when the work mainly drives an SDK or browser available only for Node or Python (Playwright, vendor SDKs, ML, image and document libraries), or for one-off glue whose per-platform build costs more than the single run it serves. Build per OS and architecture (or use the installer's cargo build); commit sources, not binaries.
2. **Node or Python — second, picked by the ecosystem the job needs, not by taste.**
   - **Node** (`.mjs`/`.cjs`): Kuma's runtime; present wherever Kuma runs. Use for HTTP and JSON glue, SDKs published for JavaScript, browser automation, and code shared with Kuma's server. Starts in about 26 ms (34 ms under Kuma's session preload): fine for an occasional skill script, but too slow for a hook that runs on every tool call.
   - **Python**: Use for data, ML, image, audio, and document work where those libraries live. Starts in about 11–18 ms (more with heavy imports). The interpreter is not guaranteed on a fresh machine; a skill that needs it must declare it or bundle it.
3. **Shell (`sh`/`bash`) — last, and only as a thin launcher** in an environment guaranteed to be POSIX (WSL, Linux guests, or remote-runner scripts). Start-up is fast (2–3 ms), but each invoked `grep`, `sed`, or `jq` spawns an additional process (about 1.5 ms each here). Behavior differs between macOS and GNU tools, and native Windows engines run hooks through Git Bash or PowerShell. Never use shell scripts for the core logic of a hook or skill.

Measured 2026-10-15 on the owner's arm64 Mac, mean of 30 empty runs: Rust binary 2 ms, `sh`/`bash` 2–3 ms, Python 3.14 11–18 ms (with and without `site`), Node 26 26–34 ms (without and with Kuma's preload); `sh` calling three tools 7 ms.

## Engine × Home Is A Product, And It Must Be Enumerated By A Machine

A hook policy change is never done on one engine. It is also never done on one *home*: an engine's registration surface is `engine × home`, and the second factor is the one people drop.

> 훅 작업할 때 엔진 빼먹으면 안 돼, skill-hook-authoring 으로 관리함에도 드리프트 계속 발생 (수홍, 2026-07-23)

That sentence is the reason this section exists. **This skill already said "cover every engine" and the drift kept happening anyway**, so the rule is no longer a rule an author follows — it is a check a machine runs. Prose cannot enumerate a product that changes when an account is added.

**The contract.**

- **Enumerate homes by DERIVATION, never by a hand-kept list.** A written list rots the moment an account is registered, and the failure is silent. Derive from the routing contract — a home is a hook surface **iff the spawner points the engine at it**. In Kuma Studio that source is `ENGINE_ACCOUNT_ENV` (`packages/shared/engine-resume-provider.mjs`): Codex → `CODEX_HOME`, Grok → `GROK_HOME`.
- **An engine's absence from that map is itself a claim, and it must be read.** Claude is deliberately absent: its account switch swaps the *global* credential and `CLAUDE_CONFIG_DIR` is stripped from the spawn env, so every Claude session reads the default home and the per-account directories are **credential stores, not hook surfaces**. Scanning the filesystem instead of the routing contract would invent ten phantom Claude homes and train everyone to ignore the guard.
- **An isolated account home IS the config root.** `CODEX_HOME`/`GROK_HOME` hold `hooks.json` directly — there is no `.codex`/`.grok` segment to join. Addressing them with a `$HOME`-shaped joiner is exactly how a profile home kept a stale registration (2026-07-23: a Codex profile home pinned to a worktree path with bare `node`).
- **The same policy means different things per engine — write down which, do not assume parity of semantics.** Grok's Stop hook is passive ("Only PreToolUse can block"), so a Stop-based guard that blocks on Claude/Codex only *observes* on Grok. Registration parity and enforcement parity are two different claims.
- **A home you could not read is `unknown`, never "matches."** Not measured is not equal. A corrupt or unreadable config must surface as its own verdict and must not be summarised away by a drifted-but-readable sibling.
- **Drift fails loudly.** A parity check that passes quietly on a surface it skipped is worse than no check.

**The machine (Kuma Studio).** `npm run hooks:parity` (`scripts/check-hook-parity.mjs`) judges every discovered `engine × home` against the canonical policy, and `npm run skill:doctor` runs it on every sweep. A commit touching `scripts/hooks/` or `scripts/install/` is gated on it by the repo pre-commit hook. Its oracle is the installer itself — the canonical policy is applied to a throwaway copy and the config is canonical iff nothing moved — so there is no second description of "canonical" to drift from.

Other runtimes should copy the *shape*, not the paths: derive the home set from whatever routes sessions, judge each home with the installer's own logic, and never let an unmeasured surface report green.


## Packaging

Per-runtime package formats (plugin manifests, marketplace files, trust review) are vendor facts —
`kind: plugins` in `docs/official-sources.json`, looked up per `docs/lookup.md`. Two rules of ours
apply to every one of them:

- **Shared rule.** Treat each runtime's package format as a separate adapter over the same canonical
  knowledge. The canonical instructions live in repo-owned source files; generated installs, plugin
  bundles, and home-directory copies are derived artifacts. Do not create parallel full copies unless
  the divergence is explicit and reviewed.
- **Packaging decision gate.** Before adding a generated plugin or extension package: (1) name the
  canonical source path; (2) name the generated install path; (3) decide whether the installed form is
  a symlink, link-mode extension, or generated copy; (4) add a validation command that proves the
  runtime discovers the package; (5) add a rollback path that removes generated config without editing
  canonical files. Do not migrate this repo into a runtime plugin layout until there is an explicit
  packaging plan — moving `SKILL.md` into `skills/<id>/SKILL.md` changes the root-level skill
  entrypoint, so it must be done atomically with installer and docs updates.
