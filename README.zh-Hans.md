<p align="center">
  <img src="assets/icon.png" width="168" alt="单一事实来源辐射至每个智能体运行时" />
</p>

<h1 align="center">跨运行时的技能、钩子与插件编写</h1>

<p align="center"><b>在你运行的每一个 AI 编程智能体上，为技能、钩子和插件提供唯一的事实来源。厂商事实随用随查，从不镜像。</b></p>

<p align="center">

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

</p>

---

你已经不再只运行一个 AI 智能体了。Codex、Claude Code、Grok、Hermes、Antigravity、Cursor 各有自己的一套规则：什么算“技能”、钩子在哪里注册、读取哪个指令文件、会话如何恢复。如果手动把同一套工具分发给它们，不出一周各处就会互相漂移。

本仓库提供的是方法，以及通往事实的地图：

1. **一套方法论，用于交付由仓库自己持有的唯一事实来源。** 技能、钩子、命令、脚本、文档、资源、MCP/应用接线、插件元数据，都能无漂移地安装到每个运行时。具体做法包括：一个规范的包根目录、符号链接安装、单一注册清单、明确的退役/重命名流程、由机器校验的 engine × home 一致性规则，以及一份验证清单。这就是 `SKILL.md`。
2. **一份查询指南，而不是 wiki。** `docs/official-sources.json` 按运行时 × 问题（`skills`、`hooks`、`plugins`、`project-instructions`、`cli-invocation`、`session-resume`、`model-lineup`、`billing` 等）映射了 68 个官方厂商页面，`docs/lookup.md` 则说明如何抓取、判断并引用这些页面。这里不存储任何厂商事实。每个答案都在被问到时从厂商页面读取，并附上其 URL 和日期。

## 为什么不用 wiki

本仓库曾维护过一份附来源引用的兼容性 wiki，持续三个月，每天根据厂商文档刷新。结果出了两个问题。第一，智能体实际读取的副本比刷新任务正在写入的副本落后了九周，镜像偏偏在被信任的时候出错。第二，当一个真正的跨运行时问题出现时（“在 Claude Code、Codex 和 Grok 上，被中断的轮次能否在没有新提示的情况下继续？”），wiki 里只有恢复的*语法*，答案仍然得去官方页面找。镜像的代价是每天重写一次；链接的代价只是一次抓取，而且只有厂商自己出错时它才会出错。

留下来的，是厂商无法告诉你的内容：如何让*你自己的*工具在所有运行时之间只维护一处，以及少数几个两个引擎对同一字段解读不同的地方。每一处都附有来源 id，供重新核验。

## 它能回答什么

| 你的问题 | 答案来源 |
|---|---|
| “技能应该放在哪里，才能让 Codex、Claude 和 Grok 都找到它，又不用复制三份？” | `SKILL.md` → Core Rules, Recommended Layout, Cross-Agent Install Pattern |
| “我改了一个钩子。它是否已经落到每个引擎*以及*每个账号 home 上？” | `SKILL.md` → Engine × Home Is A Product：由机器枚举整个覆盖面，而不是靠检查清单 |
| “在某个引擎上关闭这个技能 / 在所有地方退役它 / 给它改名。” | `docs/skill-lifecycle.md`、`SKILL.md` → Retiring Or Renaming Artifacts |
| “为什么我的 PreToolUse 守卫在 Codex 上失效放行（fail open），在 Claude 上却会拦截？” | `docs/hook-contract.md`：跨引擎陷阱，附来源引用 |
| “Hermes 读取哪个指令文件？Antigravity 能否无头运行？什么能恢复 Grok 会话？” | 做一次**查询**：在 `docs/official-sources.json` 中按 `agent` × `kind` 选出条目，抓取厂商页面并引用，参见 `docs/lookup.md` |

**这是构建管理工具的基础层。** Kuma Studio 的技能/钩子开关系统就是基于这套方法构建的，它能在一个 GUI 中跨 Claude、Codex、Grok 和 Hermes 开启或关闭任意技能和钩子。每个运行时真正的开关都是从厂商页面上查到的；官方没有提供开关的地方，工具会有意识地加以补偿，而不是靠猜。

## 为什么值得信任

- **每一条跨运行时的论断都引用厂商自己的文档**，在提出论断时引用，并注明日期。缺失的信息记录为 `not documented (checked <urls>, <date>)`，绝不从其他运行时推断。
- **仓库只负责属于我们自己的内容。** 包括规则、流程，以及引擎之间会让我们的脚本出错的差异。其中凡是依赖某个厂商行为的，都会在该行注明清单中的来源 id，只需一次抓取即可重新核验其前提。
- **地图的可达性由机器维护。** 每周任务会运行 `scripts/check-official-sources.mjs`，修复已迁移的 URL，并打开一个 PR。只有当 diff 仅涉及文档且检查通过时，确定性守卫才会合并它（`docs/cloud-automation.md`）。

## 本仓库负责的内容

- `SKILL.md`：技能入口，包含编写/互操作方法论，以及“厂商事实靠查询”的路由规则。
- `docs/lookup.md`：如何依据官方页面回答运行时问题，以及如何维护清单。
- `docs/official-sources.json`：按运行时 × 问题整理的官方 URL 清单，并列出每个页面能回答的问题。
- `docs/authoring-rules.md`：每条规则背后的理由与实测事故，以及打包决策关卡。
- `docs/hook-contract.md`：我们的脚本所针对的跨引擎钩子陷阱。
- `docs/skill-lifecycle.md`：禁用 / 限定范围 / 退役。
- `docs/skill-boundary-rules.md`、`docs/research-forge.md`、`docs/skill-repo-routing.md`、`docs/kuma-studio-patterns.md`：分别说明事实存放在哪里、基于文档的技能如何打磨成形、自有或分叉技能的改动应放进哪个仓库，以及公开的 Kuma Studio 模式。
- `docs/cloud-automation.md`：每周来源检查及其自动合并关卡。
- `CHANGELOG.md` 加上 git 标签：版本记录。历史记录保留在这里，不写进文档正文。

## 本地检查

```bash
node scripts/check-official-sources.mjs --write-report   # 清单结构、主机、可达性、SKILL.md 预算
node --test scripts/check-official-sources.test.mjs
```