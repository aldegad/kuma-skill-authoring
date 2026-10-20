#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

function fail(failures, message) {
  failures.push(message);
}

function assertNonEmptyArray(failures, value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    fail(failures, `${label} must be a non-empty array`);
    return false;
  }
  return true;
}

function assertNonEmptyString(failures, value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    fail(failures, `${label} must be a non-empty string`);
    return false;
  }
  return true;
}

function normalizeAllowedHosts(manifest, failures) {
  const allowedHosts = new Set();
  if (!assertNonEmptyArray(failures, manifest.policy?.allowedHosts, "policy.allowedHosts")) {
    return allowedHosts;
  }

  for (const host of manifest.policy.allowedHosts) {
    if (!assertNonEmptyString(failures, host, "policy.allowedHosts entry")) {
      continue;
    }
    if (host !== host.trim()) {
      fail(failures, `policy.allowedHosts entry must not include surrounding whitespace: ${host}`);
      continue;
    }
    if (host !== host.toLowerCase()) {
      fail(failures, `policy.allowedHosts entry must be lowercase: ${host}`);
    }
    if (host.includes("/") || host.includes(":")) {
      fail(failures, `policy.allowedHosts entry must be a bare hostname: ${host}`);
      continue;
    }
    allowedHosts.add(host);
  }

  return allowedHosts;
}

function sourceList(manifest) {
  return Array.isArray(manifest.sources) ? manifest.sources : [];
}

export function validateManifest(manifest) {
  const failures = [];
  const ids = new Set();
  const allowedHosts = normalizeAllowedHosts(manifest, failures);

  assertNonEmptyArray(failures, manifest.sources, "sources");

  for (const source of sourceList(manifest)) {
    if (source === null || typeof source !== "object" || Array.isArray(source)) {
      fail(failures, "source must be an object");
      continue;
    }

    const id = source.id;
    if (!assertNonEmptyString(failures, id, "source.id")) {
      continue;
    }
    if (ids.has(id)) {
      fail(failures, `duplicate source id: ${id}`);
    }
    ids.add(id);

    assertNonEmptyString(failures, source.agent, `${id}.agent`);
    assertNonEmptyString(failures, source.kind, `${id}.kind`);

    const hasUrl = assertNonEmptyString(failures, source.url, `${id}.url`);
    if (hasUrl) {
      try {
        const url = new URL(source.url);
        if (url.protocol !== "https:") {
          fail(failures, `${id}: URL must use https`);
        }
        if (!allowedHosts.has(url.hostname)) {
          fail(failures, `${id}: host ${url.hostname} is not in policy.allowedHosts`);
        }
      } catch {
        fail(failures, `${id}: invalid URL`);
      }
    }

    if (assertNonEmptyArray(failures, source.claims, `${id}.claims`)) {
      source.claims.forEach((claim, index) => {
        assertNonEmptyString(failures, claim, `${id}.claims[${index}]`);
      });
    }
  }

  // Guard the Project Instruction Files baseline so a future edit cannot silently
  // drop the category that the daily refresh must keep verifying. Codex and Claude
  // Code are the anchor runtimes with dedicated official memory/AGENTS.md pages.
  const projectInstructionAgents = new Set(
    sourceList(manifest)
      .filter((source) => source.kind === "project-instructions")
      .map((source) => source.agent)
  );
  if (projectInstructionAgents.size === 0) {
    fail(
      failures,
      "no source has kind=project-instructions; the Project Instruction Files baseline must stay covered"
    );
  }
  for (const requiredAgent of ["codex", "claude-code"]) {
    if (!projectInstructionAgents.has(requiredAgent)) {
      fail(failures, `missing kind=project-instructions source for ${requiredAgent}`);
    }
  }

  // Guard the CLI Spawn (headless launch) and Session Resume baselines the same
  // way: a future edit must not silently drop either category that the daily
  // refresh re-verifies. Codex and Claude Code are the anchor runtimes with
  // dedicated official CLI / session pages.
  function guardCategory(kind, label) {
    const agents = new Set(
      sourceList(manifest)
        .filter((source) => source.kind === kind)
        .map((source) => source.agent)
    );
    if (agents.size === 0) {
      fail(failures, `no source has kind=${kind}; the ${label} baseline must stay covered`);
    }
    for (const requiredAgent of ["codex", "claude-code"]) {
      if (!agents.has(requiredAgent)) {
        fail(failures, `missing kind=${kind} source for ${requiredAgent}`);
      }
    }
  }
  guardCategory("cli-invocation", "CLI Spawn And Headless Launch");
  guardCategory("session-resume", "Session Resume");
  guardCategory("model-lineup", "Model Lineup");

  return failures;
}

function fetchableSources(manifest) {
  return sourceList(manifest).filter((source) => {
    if (source === null || typeof source !== "object" || Array.isArray(source)) {
      return false;
    }
    if (typeof source.id !== "string" || source.id.trim() === "") {
      return false;
    }
    if (typeof source.url !== "string" || source.url.trim() === "") {
      return false;
    }
    try {
      new URL(source.url);
      return true;
    } catch {
      return false;
    }
  });
}

export async function runOfficialSourceCheck({
  root = process.cwd(),
  shouldWriteReport = false,
  skipNetwork = false,
  fetchImpl = globalThis.fetch
} = {}) {
  const manifestPath = path.join(root, "docs", "official-sources.json");
  const reportPath = path.join(root, "reports", "official-source-check.md");
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  const failures = validateManifest(manifest);
  const checks = [];

  if (!skipNetwork) {
    for (const source of fetchableSources(manifest)) {
      const started = Date.now();
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        const response = await fetchImpl(source.url, {
          method: "GET",
          redirect: "follow",
          signal: controller.signal,
          headers: {
            "user-agent": "kuma-skill-authoring-official-source-check/1.0"
          }
        });
        clearTimeout(timeout);
        const elapsed = Date.now() - started;
        const ok = response.status >= 200 && response.status < 400;
        checks.push({ id: source.id, status: response.status, ok, elapsed });
        if (!ok) {
          fail(failures, `${source.id}: HTTP ${response.status}`);
        }
        await response.arrayBuffer();
      } catch (error) {
        checks.push({ id: source.id, status: "error", ok: false, elapsed: Date.now() - started });
        fail(failures, `${source.id}: fetch failed: ${error.message}`);
      }
    }
  }

  const skillPath = path.join(root, "SKILL.md");
  const skillLines = (await fs.readFile(skillPath, "utf8")).split(/\r?\n/).length;
  if (skillLines > 500) {
    fail(failures, `SKILL.md has ${skillLines} lines; keep it at or below 500`);
  }

  if (shouldWriteReport) {
    const now = new Date().toISOString();
    const lines = [
      "# Official Source Check",
      "",
      `Generated: ${now}`,
      "",
      "Manifest: `docs/official-sources.json`",
      `Network: ${skipNetwork ? "skipped" : "checked"}`,
      `SKILL.md lines: ${skillLines}`,
      "",
      "## Sources",
      "",
      "| Source | Status | Time |",
      "|---|---:|---:|"
    ];

    if (checks.length === 0) {
      for (const source of sourceList(manifest)) {
        lines.push(`| ${source.id} | not checked | - |`);
      }
    } else {
      for (const check of checks) {
        lines.push(`| ${check.id} | ${check.status} | ${check.elapsed}ms |`);
      }
    }

    lines.push("", "## Result", "");
    if (failures.length === 0) {
      lines.push("PASS");
    } else {
      lines.push("FAIL", "");
      for (const failure of failures) {
        lines.push(`- ${failure}`);
      }
    }

    await fs.mkdir(path.dirname(reportPath), { recursive: true });
    await fs.writeFile(reportPath, `${lines.join("\n")}\n`);
  }

  return {
    failures,
    checks,
    sourceCount: sourceList(manifest).length,
    skillLines
  };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const result = await runOfficialSourceCheck({
    shouldWriteReport: process.argv.includes("--write-report"),
    skipNetwork: process.argv.includes("--skip-network")
  });

  if (result.failures.length > 0) {
    for (const failure of result.failures) {
      console.error(failure);
    }
    process.exit(1);
  }

  console.log(
    `official source check passed (${result.sourceCount} sources, SKILL.md ${result.skillLines} lines)`
  );
}
