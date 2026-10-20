<p align="center">
  <img src="assets/icon.png" width="168" alt="모든 에이전트 런타임으로 뻗어 나가는 단일 진실 공급원" />
</p>

<h1 align="center">크로스 런타임 스킬·훅·플러그인 작성</h1>

<p align="center"><b>쓰고 있는 모든 AI 코딩 에이전트에서 스킬·훅·플러그인을 단일 진실 공급원 하나로 관리한다. 벤더 사실은 그때그때 조회하고, 절대 미러링하지 않는다.</b></p>

<p align="center">

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

</p>

---

이제 AI 에이전트를 하나만 쓰는 시대는 지났다. Codex, Claude Code, Grok, Hermes, Antigravity, Cursor는 "스킬"이 무엇인지, 훅을 어디에 등록하는지, 어떤 지침 파일을 읽는지, 세션을 어떻게 재개하는지에 대해 저마다 생각이 다르다. 같은 도구를 손으로 전부에 배포하면 일주일도 안 돼 서로 어긋난다.

이 레포는 그 방법론이자, 사실로 가는 지도다.

1. **레포가 소유한 단일 진실 공급원을 배포하는 방법론.** 스킬, 훅, 커맨드, 스크립트, 문서, 에셋, MCP/앱 연결, 플러그인 메타데이터를 드리프트 없이 모든 런타임에 설치한다. 구성 요소는 하나의 정본 패키지 루트, 심링크 설치, 단일 등록 매니페스트, 명시적인 폐기/이름 변경 절차, 기계가 검사하는 엔진 × 홈 동등성 규칙, 검증 체크리스트다. 이것이 `SKILL.md`다.
2. **위키 대신 조회 가이드.** `docs/official-sources.json`은 68개의 공식 벤더 페이지를 런타임 × 질문(`skills`, `hooks`, `plugins`, `project-instructions`, `cli-invocation`, `session-resume`, `model-lineup`, `billing`, …)으로 매핑한다. `docs/lookup.md`는 그중 한 페이지를 가져와 판단하고 인용하는 방법을 알려준다. 여기에는 벤더 사실을 하나도 저장하지 않는다. 모든 답은 질문을 받은 시점에 벤더 페이지에서 읽어 오며, 해당 URL과 날짜를 함께 담는다.

## 왜 위키가 없나

이 레포는 석 달 동안 출처를 인용한 호환성 위키를 유지했고, 매일 벤더 문서로 갱신했다. 그 결과 두 가지 일이 생겼다. 첫째, 에이전트가 실제로 읽는 사본이 갱신 작업이 쓰던 사본보다 9주나 뒤처졌다. 미러는 신뢰받는 바로 그 순간에 틀린다. 둘째, 실제 크로스 런타임 질문("중단된 턴을 새 프롬프트 없이 이어갈 수 있나? Claude Code, Codex, Grok에서?")이 들어온 날, 위키에는 재개 *문법*이 있었지만 답은 결국 공식 페이지에서 가져와야 했다. 미러는 매일 다시 써야 하는 비용이 든다. 링크는 한 번 가져오는 비용이면 충분하고, 벤더 문서가 틀렸을 때만 틀린다.

남는 것은 벤더가 알려줄 수 없는 것들이다. 하나는 그 모든 런타임에 걸쳐 *내* 도구를 한곳에서 관리하는 방법이고, 다른 하나는 두 엔진이 같은 필드를 다르게 읽는 몇 안 되는 지점이다. 이런 지점에는 다시 검증할 때 쓸 출처 id가 각각 달려 있다.

## 무엇에 답하나

| 이런 질문에 | 답이 나오는 곳 |
|---|---|
| "스킬을 어디에 두어야 사본 세 개 없이 Codex, Claude, Grok이 모두 찾을 수 있을까?" | `SKILL.md` → Core Rules, Recommended Layout, Cross-Agent Install Pattern |
| "훅을 바꿨다. 모든 엔진*과* 모든 계정 홈에 반영됐나?" | `SKILL.md` → Engine × Home Is A Product: 체크리스트가 아니라 기계가 표면을 열거한다 |
| "이 스킬을 한 엔진에서만 끄기 / 모든 곳에서 폐기하기 / 이름 바꾸기." | `docs/skill-lifecycle.md`, `SKILL.md` → Retiring Or Renaming Artifacts |
| "PreToolUse 가드가 왜 Codex에서는 fail-open되고 Claude에서는 차단했지?" | `docs/hook-contract.md`: 출처를 인용한 크로스 엔진 함정 |
| "Hermes는 어떤 지침 파일을 읽지? Antigravity는 헤드리스로 돌릴 수 있나? Grok 세션은 무엇으로 재개하지?" | **조회**: `docs/official-sources.json`에서 `agent` × `kind`로 항목을 고르고, 벤더 페이지를 가져와 인용한다. 절차는 `docs/lookup.md` |

**관리 도구는 이 레이어 위에 만든다.** Kuma Studio의 스킬/훅 토글 시스템은 GUI 하나에서 Claude, Codex, Grok, Hermes의 스킬이나 훅을 켜고 끄는 도구로, 이 방법론 위에 만들어졌다. 각 런타임의 실제 on/off 스위치는 벤더 페이지에서 조회했다. 공식 스위치가 없는 곳에서는 추측하지 않고, 도구가 의도적으로 그 빈자리를 메운다.

## 왜 믿을 수 있나

- **모든 크로스 런타임 주장은 벤더의 공식 문서를 인용한다.** 주장하는 시점에 날짜와 함께 인용한다. 문서가 없으면 `not documented (checked <urls>, <date>)`로 기록하며, 다른 런타임을 근거로 유추하지 않는다.
- **레포는 우리 것만 소유한다.** 규칙, 절차, 그리고 엔진 간 차이 때문에 우리 스크립트가 깨지는 지점이다. 그중 벤더 동작에 기대는 내용이 있으면 해당 줄에 매니페스트 출처 id를 적어 둔다. 그래서 한 번만 가져와 보면 그 전제를 다시 확인할 수 있다.
- **지도에 계속 접근할 수 있는지는 기계가 확인한다.** 주간 작업이 `scripts/check-official-sources.mjs`를 실행해 옮겨진 URL을 고치고 PR을 연다. 결정론적 가드는 diff가 문서만 바꾸고 검사를 통과할 때만 그 PR을 머지한다(`docs/cloud-automation.md`).

## 이 레포가 소유하는 것

- `SKILL.md`: 스킬 진입점. 작성/상호운용 방법론과 "벤더 사실은 조회한다"는 라우팅 규칙을 담는다.
- `docs/lookup.md`: 런타임 질문에 공식 페이지로 답하는 방법과 매니페스트를 관리하는 방법.
- `docs/official-sources.json`: 런타임 × 질문별 공식 URL 매니페스트. 각 페이지가 답하는 질문도 함께 담는다.
- `docs/authoring-rules.md`: 각 규칙의 근거와 실제로 측정된 사고 사례, 그리고 패키징 결정 게이트.
- `docs/hook-contract.md`: 우리 스크립트가 대비하도록 작성된 크로스 엔진 훅 함정.
- `docs/skill-lifecycle.md`: 비활성화 / 범위 지정 / 폐기.
- `docs/skill-boundary-rules.md`, `docs/research-forge.md`, `docs/skill-repo-routing.md`, `docs/kuma-studio-patterns.md`: 진실이 어디에 있는지, 문서 기반 스킬을 어떻게 다듬는지, 직접 만든 스킬이나 포크한 스킬의 변경을 어느 레포에 넣는지, 공개된 Kuma Studio 패턴.
- `docs/cloud-automation.md`: 주간 출처 검사와 그 자동 머지 게이트.
- `CHANGELOG.md`와 git 태그: 버전 기록. 이력은 문서 본문이 아니라 여기에 남긴다.

## 로컬 검사

```bash
node scripts/check-official-sources.mjs --write-report   # 매니페스트 형태, 호스트, 도달 가능성, SKILL.md 분량 예산
node --test scripts/check-official-sources.test.mjs
```