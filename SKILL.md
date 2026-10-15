---
name: skill-hook-authoring
description: 'Methodology for authoring and shipping one repo-owned source of truth — skills, hooks, slash commands, plugins, installers — across Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor and Kuma Studio without drift, plus the lookup discipline for any cross-runtime capability question (an official-source manifest and a fetch-and-cite procedure; no mirrored wiki). Use when authoring, editing, retiring, renaming, disabling/enabling, or debugging a skill / hook / slash-command / plugin; when deciding which engines a skill installs to; when a skill is not triggering and its description needs fixing; or when you need to know what a runtime can do and must cite the vendor page. Triggers (KR/EN): 스킬 작성/수정/폐기/삭제/이름변경, 스킬 끄기/비활성/다시 켜기, 안 쓰는 스킬 정리, 특정 엔진에서만, 스킬 발동 안 됨, description 고치기, 훅 작성, 슬래시 커맨드, 플러그인 패키징, 크로스런타임 호환, 공식 문서 확인; skill authoring/retire/rename/disable/enable, prune unused skills, scope a skill to one engine, skill not triggering, hook authoring, plugin packaging, cross-runtime comparison, look up a runtime capability.'
---

# Cross-Runtime Skill, Hook and Plugin Authoring

This package is two things:

1. **A methodology** for *interoperating and managing* agent runtimes — Codex, Claude
   Code, Grok, Hermes, Antigravity CLI, Cursor, and Kuma Studio — by shipping one
   repo-owned source of truth (skills, hooks, commands, scripts, docs, assets, MCP/app
   wiring, runtime plugin metadata) without drifting between them.
2. **A lookup guide** for every question about what a runtime can do. Vendor facts are
   not stored here; they are fetched from the vendor's page when asked and cited with
   URL and date. The map of pages is `docs/official-sources.json`; the procedure is
   [`docs/lookup.md`](docs/lookup.md).

Everything below is the methodology. Where a rule rests on a vendor behaviour, the line
names the source id from the manifest so the premise can be re-verified.

## Vendor facts: look them up

Any of these is a lookup, not a recollection — follow [`docs/lookup.md`](docs/lookup.md):

- which instruction file a runtime reads, how far up or down it walks, size caps;
- interactive vs headless launch, output-format flags, how a session resumes;
- which hook events exist, which can block, what the payload carries;
- skill discovery roots, the explicit invocation token (`/name` vs `$name`), frontmatter limits;
- plugin/extension manifest shapes and trust review;
- shipping model ids, effort tiers, retirements; billing coverage.

Write the answer where the work is (plan, vault, code comment) with `(source: <url>,
verified YYYY-MM-DD)`. Absence is `not documented (checked <urls>, <date>)`, never
inferred from another runtime. Nothing comes back into this repository except a fix to
one of our rules or to the manifest.

## Taxonomy

Use these words precisely:

- **Skill**: instructions the model reads when the task matches. Usually `SKILL.md`
  plus optional `scripts/`, `docs/`, and `assets/` (`references/` only for genuine
  lookup material — see Skill Document Topology). A skill can tell the model what to
  do, but it does not enforce tool behavior by itself.
- **Hook**: a harness-level guard or automation invoked around lifecycle events such
  as tool calls. A hook can allow, deny, ask, mutate input, or add context depending on
  runtime support. Hooks must be registered in the runtime config or plugin metadata;
  putting a hook script inside a skill folder is not enough.
- **Plugin / extension**: a runtime-specific packaging and trust boundary that can
  bundle skills, hooks, MCP servers, apps, commands, agents, or metadata. Per-runtime
  package shapes are vendor facts — `kind: plugins` in the manifest.
- **Package root**: the repo-owned canonical source directory we maintain. Most local
  "skills" in this workspace are actually plugin-like package roots because they
  include `SKILL.md`, scripts, docs, installers, and policy.

If the task changes discovery, installation, trust, hook behavior, bundled scripts, or
cross-runtime compatibility, treat it as **package authoring**, not just skill text
editing.

## Core Rules

Each rule's rationale, measured evidence, and the failure it was written against live in
[`docs/authoring-rules.md`](docs/authoring-rules.md). The rules themselves:

- **One canonical repo path.** Installed copies under the engines' skill roots are
  symlinks or generated config entries. Never edit an installed home copy.
- **Registration goes through the `agent-extensions/skills.json` manifest, and nothing else.**
  Adding a skill = one entry there plus a re-run of `scripts/install/install-local.mjs`.
  Hand-symlinking into an engine root, or adding an engine-config entry, is a second
  registration channel and it drifts.
- **A repo that also builds artifacts registers its skill subfolder, not its repo root**
  (`<repo>/skills/<name>/`). Runtimes scan the skill root recursively under a traversal
  budget — a `target/`/`node_modules/`/`dist/` swept into the scan can starve discovery
  of *other* skills.
- **No separate Claude and Codex versions** unless the difference is explicitly
  documented and tested.
- **Name the package layer before editing** — skill-only, hook-only, plugin-like
  package, or generated runtime plugin. A `SKILL.md` entrypoint must not hide
  installer, hook, or trust-boundary changes.
- **Keep the `SKILL.md` body under 500 lines** — a performance guideline, not a loading
  cap (`anthropic-skill-authoring-best-practices`). Deterministic behavior goes in
  scripts; scenario-specific detail goes into `docs/*.md` linked one level deep.
- **Frontmatter limits.** `name`: ≤64 chars, lowercase/numbers/hyphens, no XML tags, no
  reserved words (`anthropic`, `claude`), gerund preferred. `description`: ≤1024 chars,
  no XML tags, third person, stating both *what* and *when* (trigger terms) — not the
  procedure. (`anthropic-skill-authoring-best-practices`; re-check the limits there
  before relying on a number.)
- **Quote a `description` containing a colon-space (`: `) or the skill silently fails
  to load** — unquoted YAML parses `: ` as a nested mapping. Wrap the value in single
  quotes and confirm the frontmatter parses before shipping.
- **Hooks are guardrails, not silent fallback paths.** Block clearly, explain why,
  require an explicit operator decision for dangerous actions.
- **Do not re-implement a slash surface above the engine.** A host wrapper faking
  `/command` builds a second input path that must re-derive session context, and it
  standardizes one invocation token where runtimes differ. Forward typed input
  verbatim; ship the capability as skill + CLI.
- **Cross-agent claims come from official vendor docs.** Undocumented = `not
  documented` / `unknown`, never inferred parity. Procedure: [`docs/lookup.md`](docs/lookup.md).
- **Pick an executable's language by how fast it runs: Rust first; Node or Python
  second, by the ecosystem the job needs; shell last and only as a launcher.** The order,
  what each language is for and the measurements: [`docs/authoring-rules.md`](docs/authoring-rules.md#choosing-the-language-of-a-skills-or-hooks-executable).
- **A hook command must run as registered.** A compiled binary is executable as built; a
  script needs `chmod +x`, a shebang and the mode committed (`100755`). A missing exec bit
  fails with `Permission denied` on every matching event in every session.
- **Hook scripts must not assume GNU coreutils.** macOS ships neither `timeout` nor
  `stat -c`; a fail-closed `|| exit 0` turns that into a silent no-op that looks green.
  Detect and degrade (`command -v timeout || gtimeout`), use portable forms
  (`stat -f %m || stat -c %Y`).
- **Keep history out of doc bodies.** Changelog narrative belongs in `CHANGELOG.md`
  plus the git tag; a doc body states the current truth only. The one exception is a
  *verification* stamp (`verified YYYY-MM-DD`) on a line whose premise is a vendor
  behaviour — provenance for a live claim. kuma-studio enforces this at commit:
  `npm run lint:instruction-doc-history` (the scanner header owns what counts).
- **Symlink the wrapper, edit only the canonical file.** When `CLAUDE.md`/`GEMINI.md`
  are symlinks to a repo-owned `AGENTS.md`, every runtime reads the canonical content
  and git stores mode `120000`. Claude Code's Edit/Write refuses to write through a
  symlink (measured 2026-06-05), which is the feature: an atomic save cannot replace the
  link with a divergent copy. Use **relative** links (`ln -s AGENTS.md CLAUDE.md`). A
  Windows checkout without `core.symlinks` materializes the link as a plain file — use a
  one-line stub+pointer instead when a Windows runtime is in scope. Which filenames each
  runtime reads, and how deep, is a lookup (`kind: project-instructions`) — place a
  shared instruction where the *weakest* reader in scope finds it.
- **Explicit skill invocation is not the same token across runtimes.** For
  cross-engine commands, rely on **description-triggered** invocation as the portable
  layer and treat the typed token as per-engine sugar (`kind: skills` for each token).

## Skill Document Topology

**A `SKILL.md` body is a topology, not a manual.** It carries what the model needs in
order to *route*: what the skill is for, the command surface, and one pointer per
concern to the sub-document that owns it.

- **Must not accrete in the body:** history (changelog narrative, incident write-ups,
  dated decisions → `CHANGELOG.md`), architecture and rationale (→ `docs/<topic>.md`),
  per-feature procedure (→ `docs/<feature>.md`), **and vendor facts** (→ a lookup — a
  body that restates a vendor page is a mirror that rots).
- **Stays in the body:** purpose and trigger scope, the command/verb surface, rules
  short enough to state once and never expand, and one pointer line per sub-document.
- **Sub-documents go in `docs/`, not `references/`.** A reference is material you look
  things up in — vendor tables, payload schemas, source-cited matrices. Instruction
  prose telling an agent what to do is not a reference, and naming it one makes the
  folder lie.
- **Split by feature, not by line count.** Splitting on size alone produces
  `part-1.md`/`part-2.md`, a worse index than the un-split original. The trigger is a
  *second* concern's procedure landing in the body.
- **A split must shrink the body.** What remains is a **one-line pointer, not a
  summary** — a condensed restatement is a second source of truth that drifts on the
  next edit. Judge by the body's line count, not the total: an honest split grows the
  total by one header per new file. **The discriminator is whether a moved line now
  exists in two places** — diff the moved lines against what stayed: zero lost, zero
  duplicated.

## Recommended Layout

```text
agent-extensions/ # a plain folder of skill repos, not a git repo; never `git init` it
 skills.json # the manifest: each skill's id -> canonical path (single registration record)
 scripts/install/install-local.mjs # reads skills.json, generates the engine-root symlinks
 scripts/test/*
 alex-core-invariants/ # standalone repo, own remote
 safedeps/ # standalone repo, own remote
 sprite-gen/ # standalone repo, own remote
 skill-hook-authoring/ # standalone repo, own remote (these conventions)
 katok/ # standalone repo that ALSO builds a binary
 skills/katok/SKILL.md # skills.json path -> this subfolder, so target/ stays out of the scan root
 target/ # build cache (gitignored); never the link target
 ../my-agent-girlfriend/ # sibling repo installed via a `../` path (source owned by its own remote)
```

Three layers, one direction: **conventions** (this skill) → **manifest** (`skills.json`)
→ **installer** (`install-local.mjs`) → generated symlinks. A canonical source may live
outside the folder (a sibling repo); register it with a `../` path so `skills.json`
stays the one registration record. A skill that needs history is its own repo; work on it
is planned in that repo's project, never in the folder.

Keep the folder flat. Do not add a `skills/` or `hooks/` index **in the folder root**
unless there is a specific migration plan, because that creates a second
registration source competing with `skills.json`. This is separate from a standalone
repo's *own* internal `skills/` layout (e.g. `katok/skills/katok/`), which is that repo's
upstream structure and a valid link target. If a hook belongs to a standalone repo,
reference that repo path directly from the installer and agent config.

## Authoring Flow

Before adding or changing a package:

1. Classify the change: skill instruction, hook guard, plugin/extension package,
   installer/config, or docs-only.
2. Pick the canonical package root and the generated install paths. For a repo that also
   builds artifacts, the registered `path` is the skill subfolder, not the repo root.
3. Decide whether each installed artifact is a symlink, generated config entry, copied
   file, or runtime-native plugin package. Package shapes and trust rules per runtime
   are a lookup (`kind: plugins`); the packaging decision gate we apply to any of them is
   in [`docs/authoring-rules.md`](docs/authoring-rules.md) → *Packaging*.
4. Update the canonical source first, then its entry in the manifest
   `skills.json`, then docs. Do not add a second registration channel alongside it.
5. Validate discovery in every claimed runtime. For undocumented runtimes, mark support
   as unknown until live verification exists.

Do not move a root-level `SKILL.md` into a plugin subdirectory, or convert a skill folder
into a runtime plugin, unless the installer, docs, validation, and rollback path change
in the same commit.

## Disable / Scope / Retire

Three operations, three mechanisms — disabling is **per engine** and never touches
`skills.json`; scoping to one engine is `engines:` in the manifest and is a claim that
the skill *cannot run* elsewhere; retiring is the checklist below. Decision table and
per-engine mechanics (each row carries its source id):
[`docs/skill-lifecycle.md`](docs/skill-lifecycle.md).

## Retiring Or Renaming Artifacts

Deleting a hook, skill, command, or plugin-like package means removing every active
ownership path, not just the visible file:

1. Delete or rename the canonical source file/folder.
2. Remove active installer registration and generated config writes.
3. Remove active overlay/settings entries.
4. Add the old id/path/command to the relevant retired list so future installer runs
   clean existing symlinks or copies.
5. Remove live home-directory symlinks/copies if they are repo-owned.
6. Update docs and plans that describe the artifact in present tense.
7. Search repo and live config for the old id. Remaining hits should be retired lists
   or historical notes only.
8. Run syntax/config checks and prove the installer no longer recreates the retired
   artifact.
9. Sweep *instructions* that point at the old name, not just code: agent-executed docs
   (`AGENTS.md`/`CLAUDE.md`-class files, operating doctrine, skill bodies) referencing a
   renamed/retired CLI verb or moved doc path fail at runtime the moment an agent follows
   them. Grep doc corpora for backticked command mentions and for relative links to the
   old path. Prefer a CI guard that re-checks this on every test run (kuma-studio:
   `docs-reference-integrity.test.mjs`).

This rule exists because deleting only `~/.claude/hooks/<id>` or only
`scripts/hooks/<id>` can let the artifact reappear on the next setup run — and because
instructions pointing at the old name keep *re-teaching* agents the broken path long
after the code is gone.

## Cross-Agent Install Pattern

1. Prefer repo-local skill roots when the runtime documents them and the workflow is
   project-specific; the roots are a lookup (`kind: skills`).
2. Symlink user-wide canonical skill folders into the runtime's documented user skill
   root only when the workflow should apply outside one repo.
3. Patch project-local hook config for project guardrails; patch user-level hook config
   only for personal/global guardrails.
4. Backup mutated JSON config files before writing.
5. Make every hook command runnable before registering it (a built binary, or a script
   with `chmod +x`).
6. Validate by feeding representative JSON payloads into the hook scripts — and run the
   script **directly** (`./hook.cjs ...`, no `node` prefix) to catch a missing exec bit
   the way a direct-spawn runtime would.
7. **Land the change on EVERY engine AND every routed home, then prove it with a
   machine.** See the contract below — this step is not satisfied by remembering.

## Engine × Home Is A Product, And It Must Be Enumerated By A Machine

A hook policy change is never done on one engine, and never on one *home*: the
registration surface is `engine × home`, and the second factor is the one people drop.
This skill already said "cover every engine" and the drift kept happening anyway (수홍
2026-07-23) — so it is no longer a rule an author follows, it is a check a machine runs.
Full rationale and the measured incidents: [`docs/authoring-rules.md`](docs/authoring-rules.md).

- **Enumerate homes by DERIVATION, never a hand-kept list.** A home is a hook surface
  **iff the spawner points the engine at it**. In Kuma Studio that source is
  `ENGINE_ACCOUNT_ENV` (`packages/shared/engine-resume-provider.mjs`): Codex →
  `CODEX_HOME`, Grok → `GROK_HOME`.
- **An engine's absence from that map is itself a claim, and it must be read.** Claude
  is deliberately absent — its account switch swaps the global credential and
  `CLAUDE_CONFIG_DIR` is stripped from the spawn env, so the per-account directories
  are credential stores, not hook surfaces. Scanning the filesystem instead would invent
  phantom homes.
- **An isolated account home IS the config root** — `CODEX_HOME`/`GROK_HOME` hold
  `hooks.json` directly, with no `.codex`/`.grok` segment to join.
- **The same policy means different things per engine.** Whether a given hook event can
  block at all is a vendor fact (`kind: hooks`); a Stop-based guard that blocks on one
  engine may only *observe* on another. Registration parity and enforcement parity are
  two different claims.
- **A home you could not read is `unknown`, never "matches."** Not measured is not equal.
- **Drift fails loudly.** A parity check that passes quietly on a surface it skipped is
  worse than no check.

**The machine (Kuma Studio).** `npm run hooks:parity` judges every discovered
`engine × home` against the canonical policy; `npm run skill:doctor` runs it on every
sweep. Its oracle is the installer itself — the canonical policy is applied to a
throwaway copy and the config is canonical iff nothing moved — so there is no second
description of "canonical" to drift from. Other runtimes should copy the *shape*, not
the paths.

## Hook Payload And Decision Contract

The cross-engine traps our hook scripts are written against — the fields that mean
different things or fail differently per engine — are in
[`docs/hook-contract.md`](docs/hook-contract.md), each with the source id to re-verify
against. The schemas themselves are a lookup (`kind: hooks`).

## Validation Checklist

- The frontmatter YAML parses (quote any `description` containing `: `) — load it and
  confirm no parse error.
- The skill triggers from its frontmatter description.
- The hook allows normal commands and blocks the intended risky command.
- The hook command runs as registered — a compiled binary, or a script with a shebang
  committed as `100755` — with no `Permission denied` and no interpreter prefix the engine
  does not add.
- The installer is idempotent and can run twice without duplicate hook entries.
- Config writes are atomic or backup-before-write.
- Dangerous-mode bypasses are never taught to the agent as automatic retry steps.
- Every vendor-behaviour premise you relied on carries a source id and a verified date.

## Repository Map

- [`docs/lookup.md`](docs/lookup.md) — how to answer a runtime question from the vendor page, and how to maintain the manifest.
- `docs/official-sources.json` — the manifest: official URLs by `agent` × `kind`, with the questions each answers.
- [`docs/authoring-rules.md`](docs/authoring-rules.md) — the why behind Core Rules, Engine × Home, and the packaging decision gate.
- [`docs/hook-contract.md`](docs/hook-contract.md) — cross-engine hook traps, source-cited.
- [`docs/skill-lifecycle.md`](docs/skill-lifecycle.md) — disable / scope / retire decision table.
- [`docs/skill-boundary-rules.md`](docs/skill-boundary-rules.md) — skill vs vault: where a piece of truth belongs.
- [`docs/agent-extensions-routing.md`](docs/agent-extensions-routing.md) — routing rules for the `agent-extensions` folder (Korean).
- [`docs/research-forge.md`](docs/research-forge.md) — the workflow for document-based skills where a wrong document is worse than none.
- [`docs/kuma-studio-patterns.md`](docs/kuma-studio-patterns.md) — public Kuma Studio operating patterns.
- [`docs/cloud-automation.md`](docs/cloud-automation.md) — the weekly source check and its auto-merge gate.
- `CHANGELOG.md` plus the git tag — the version record.
