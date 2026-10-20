<p align="center">
  <img src="assets/icon.png" width="168" alt="One source of truth radiating to every agent runtime" />
</p>

<h1 align="center">Cross-Runtime Skill, Hook and Plugin Authoring</h1>

<p align="center"><b>One source of truth for your skills, hooks, and plugins — on every AI coding agent you run. Vendor facts looked up, never mirrored.</b></p>

<p align="center">

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

</p>

---

You don't run one AI agent anymore. Codex, Claude Code, Grok, Hermes, Antigravity, Cursor — each has its own idea of what a "skill" is, where hooks register, which instruction file it reads, how sessions resume. Ship the same tooling to all of them by hand, and they drift apart within a week.

This repo is the method, and the map to the facts:

1. **A methodology for shipping one repo-owned source of truth** — skills, hooks, commands, scripts, docs, assets, MCP/app wiring, plugin metadata — installed across every runtime without drift: one canonical package root, symlink installs, a single registration manifest, explicit retire/rename procedures, a machine-checked engine × home parity rule, and a validation checklist. This is `SKILL.md`.
2. **A lookup guide instead of a wiki.** `docs/official-sources.json` maps 68 official vendor pages by runtime × question (`skills`, `hooks`, `plugins`, `project-instructions`, `cli-invocation`, `session-resume`, `model-lineup`, `billing`, …), and `docs/lookup.md` says how to fetch, judge and cite one. No vendor fact is stored here; every answer is read from the vendor's page when asked and carries its URL and date.

## Why no wiki

This repo kept a source-cited compatibility wiki for three months and refreshed it from vendor docs every day. Two things followed. The copy the agents actually read fell nine weeks behind the copy the refresh was writing — a mirror is wrong exactly when it is trusted. And on the day a real cross-runtime question came in ("can an interrupted turn continue without a new prompt, on Claude Code, Codex and Grok?"), the wiki had the resume *syntax* and the answer still had to come from the official pages. A mirror costs a daily rewrite; a link costs one fetch and is wrong only when the vendor is.

What stays is what the vendors cannot tell you: how to keep *your* tooling in one place across all of them, and the handful of places where two engines read the same field differently — each carrying the source id to re-verify against.

## What it answers

| You ask | Where the answer comes from |
|---|---|
| "Where do I put a skill so Codex, Claude and Grok all find it, without three copies?" | `SKILL.md` → Core Rules, Recommended Layout, Cross-Agent Install Pattern |
| "I changed a hook. Did it land on every engine *and* every account home?" | `SKILL.md` → Engine × Home Is A Product — a machine enumerates the surface, not a checklist |
| "Turn this skill off on one engine / retire it everywhere / rename it." | `docs/skill-lifecycle.md`, `SKILL.md` → Retiring Or Renaming Artifacts |
| "Why did my PreToolUse guard fail open on Codex but block on Claude?" | `docs/hook-contract.md` — the cross-engine traps, source-cited |
| "Which instruction file does Hermes read? Can Antigravity run headless? What resumes a Grok session?" | a **lookup**: pick the entry in `docs/official-sources.json` by `agent` × `kind`, fetch the vendor page, cite it — `docs/lookup.md` |

**This is the layer you build management tooling on.** Kuma Studio's skill/hook toggle system — flip any skill or hook on/off across Claude, Codex, Grok, and Hermes from one GUI — was built on this method: each runtime's real on/off switch was looked up on the vendor page, and where no switch officially exists the tooling compensates deliberately instead of guessing.

## Why trust it

- **Every cross-runtime claim cites the vendor's own documentation** — at the time it is made, with the date. Absence is recorded as `not documented (checked <urls>, <date>)`, never inferred from another runtime.
- **The repo owns only what is ours.** Rules, procedures, and the places where engines differ in a way that breaks our scripts. Where one of those rests on a vendor behaviour, the line names the manifest source id, so the premise can be re-checked in one fetch.
- **The map is kept reachable by a machine.** A weekly job runs `scripts/check-official-sources.mjs`, fixes a moved URL, and opens a PR that a deterministic guard merges only when the diff is docs-only and the check passes (`docs/cloud-automation.md`).

## What This Repo Owns

- `SKILL.md` — the skill entrypoint: the authoring/interoperation methodology and the routing rule "vendor facts are a lookup".
- `docs/lookup.md` — how to answer a runtime question from the official page, and how to maintain the manifest.
- `docs/official-sources.json` — the manifest of official URLs by runtime × question, with the questions each page answers.
- `docs/authoring-rules.md` — the rationale and measured incidents behind every rule, and the packaging decision gate.
- `docs/hook-contract.md` — the cross-engine hook traps our scripts are written against.
- `docs/skill-lifecycle.md` — disable / scope / retire.
- `docs/skill-boundary-rules.md`, `docs/research-forge.md`, `docs/skill-repo-routing.md`, `docs/kuma-studio-patterns.md` — where truth lives, how document-based skills are forged, where an owned or forked skill's change goes, public Kuma Studio patterns.
- `docs/cloud-automation.md` — the weekly source check and its auto-merge gate.
- `CHANGELOG.md` plus the git tag — the version record. History stays here, not in the doc bodies.

## Local Checks

```bash
node scripts/check-official-sources.mjs --write-report   # manifest shape, hosts, reachability, SKILL.md budget
node --test scripts/check-official-sources.test.mjs
```
