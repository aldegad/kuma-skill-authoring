# Weekly Official-Source Check

Use `$kuma-skill-authoring`.

You are keeping `docs/official-sources.json` — the map of official vendor documentation
pages this skill looks facts up in — reachable. This runs weekly in a fresh checkout and
starts with zero context, so follow these steps exactly.

**WHAT THIS IS NOT.** This repo holds no mirror of vendor documentation any more
(`docs/lookup.md` explains why). You do not read page contents, compare them with anything,
or update any prose. You check that every URL still answers, and fix the ones that moved.

**STEP 0 — where am I.** Run `pwd` and `git remote get-url origin`. The directory must be
a fresh routine checkout (`~/.kuma/routine-runs/<jobId>/<runId>` or the scheduler's own
clean checkout) and origin must be `https://github.com/aldegad/kuma-skill-authoring.git`.
Never commit or push from any other checkout — in particular not from the shared
canonical checkout in the owner's workspace.

**STEP 1 — check.** Run `node scripts/check-official-sources.mjs --write-report`. It
validates the manifest shape (ids, `agent`, `kind`, `claims`, hosts in
`policy.allowedHosts`, https), the required category anchors, fetches every URL for an
HTTP status, and checks `SKILL.md` stays at or under 500 lines.

**IF IT PASSES:** change nothing. End with a one-line summary
(`weekly source check: <N> sources reachable, no change`).

**IF A URL FAILS:**

- Find the page's current location on the **same vendor host** (follow the vendor's docs
  navigation or redirect; never substitute a blog, forum, or another vendor's page). If
  the vendor answers compressed or serves a Markdown twin, request with
  `curl -sL --compressed` or the `<page>.md` twin before treating a 200 with no body as
  a failure.
- Fix only the `url` of that entry in `docs/official-sources.json`. Do not edit `claims`,
  `kind`, `agent`, or any `docs/*.md`, `SKILL.md`, `README*.md`. If the page is gone with
  no successor, leave the entry in place and report it as `unreachable` — removing a
  source is a decision made by a human where a question needed it (`docs/lookup.md` §6).
- Run the check again. Add one `CHANGELOG.md` entry under `## Unreleased — <date>` naming
  the id and the old → new URL.
- Commit on an `aldegad/`-prefixed branch (the local guard rejects branch names containing
  `claude` or `codex`), push it, open a pull request, then run
  `scripts/auto-merge-guard.sh <PR_NUMBER>`. Merge **only** on the guard's exit 0 — never
  by your own judgement. If the guard declines, stop and leave the PR open.
- After a merge, fast-forward the canonical checkout
  `~/Documents/workspace/personal/kuma-skill-authoring` to `origin/main`
  **only if** `git -C <canonical> status --porcelain` is empty and
  `git -C <canonical> merge-base --is-ancestor HEAD origin/main` holds. If either fails,
  report the divergence and do not touch that checkout.

**HARD CONSTRAINTS:** Do NOT read or summarize vendor page contents into this repo. Do NOT
modify `~/.codex`, `~/.claude`, or any local skill install path. Do NOT push to `main`
directly. Do NOT use API keys or GitHub Actions secrets. If you need to widen scope beyond
this, stop and report instead of guessing.
