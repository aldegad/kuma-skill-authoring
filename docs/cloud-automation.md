# Automation — the weekly source check

Last reviewed: 2026-09-18

This repo no longer mirrors vendor documentation, so there is nothing to refresh daily.
What can still rot is the **map**: a URL in `docs/official-sources.json` moves or dies,
and the next lookup fails at the door. One scheduled job keeps the map honest.

## What runs

Once a week, an agent session in a fresh checkout of this repository:

1. runs `node scripts/check-official-sources.mjs --write-report` — manifest shape, allowed
   hosts, https, the required category anchors, URL reachability (HTTP status only —
   no page content is read or compared), and the `SKILL.md` 500-line budget;
2. if every source answers, writes nothing and ends with a one-line "no change" report;
3. if a URL fails, finds the page's current location on the **same vendor host**, fixes
   the `url` in the manifest (never the `claims`, never a doc), runs the check again,
   and opens a pull request from an `aldegad/`-prefixed branch;
4. runs `scripts/auto-merge-guard.sh <PR_NUMBER>`, which squash-merges **only** a
   docs/prose-only diff that passes the check — anything else stays open for a human.

The prompt is `prompts/weekly-source-check.md`. It never edits `SKILL.md`, `docs/*.md`,
or `README*.md`, never adds a source (a new source is a decision made where a question
needed it — `docs/lookup.md` §6), and never pushes to `main`.

## Where it runs

Kuma Studio's scheduler owns the job (`kuma cron list` → `daily-doc-refresh`, kept under
its historical id; trigger `0 3 * * 1`, project `kuma-skill-authoring`, a fresh routine
worktree per fire). Any scheduler that can run an agent in a clean checkout with `gh`
credentials works the same way — a Claude Routine (`/schedule`) or a Codex App
Automation — with the same prompt and the same guard.

## Auto-merge gate

Merge authority sits on `scripts/auto-merge-guard.sh`, a deterministic shell gate, not on
the agent's judgement: it squash-merges when the diff touches only
`docs/`, `prompts/`, `reports/`, `SKILL.md`, `README*.md` or `CHANGELOG.md` **and**
`check-official-sources.mjs` passes; otherwise it exits non-zero and leaves the PR open.
A declined PR reaches the reviewer through the repository's pull-request notifications.

For manual edits, run `node scripts/check-official-sources.mjs --write-report` locally
before pushing.

## Keeping local checkouts in sync

Runtime installs are symlinks into the canonical checkout, so one `git pull` refreshes
every runtime at once. Pull when you start work. The weekly job fast-forwards the
canonical checkout after a merge; if that checkout has diverged (local commits not on
`origin/main`), the job reports it and stops — it never rewrites local history. The
2026-09-18 revamp landed a nine-week divergence exactly that way; the fix was a merge,
not a force.
