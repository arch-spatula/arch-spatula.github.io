# Arch-Spatula의 개발 레시피

- 개발자 블로그를 최소한의 개발 의존성으로 만들고자 함.
- node.js로 빌드를 처리.
- typescript로 로직을 처리.
- pnpm으로 패키지 매니징.

## 프로젝트 시작하기

```sh
git clone https://github.com/arch-spatula/arch-spatula.github.io.git
```

```sh
pnpm install # 패키지 설치
```

```sh
pnpm exec playwright install chromium # Mermaid inline SVG 정적 빌드에 필요한 Chromium 설치
```

## 디버깅

[VS Code / NvChad 디버깅 설정과 사용 방법](docs/debugging/README.md)

## 블로그 글쓰기 스킬

이 저장소의 `.agents/skills/`에 있는 스킬입니다. 블로그 글의 Markdown 파일을 지정해 사용합니다.

| 스킬 | 검토 범위 | 결과 기록 방식 |
| --- | --- | --- |
| [korean-spelling](.agents/skills/korean-spelling/SKILL.md) | 맞춤법, 띄어쓰기, 문법적 호응, 비문 | 원문을 보존하고 파일 하단의 검토 표에 교정안과 이유를 기록합니다. 교정 적용은 별도로 승인해야 합니다. |
| [review-writing](.agents/skills/review-writing/SKILL.md) | 독자 이해를 우선으로 논리와 근거, 내용의 가치 검토 | 원문을 보존하고 관련 구절 아래의 HTML 주석에 문제, 수정 방향, 필요한 경우 대체 문단 예시를 기록합니다. |

사용 예시:

```text
$korean-spelling blogs/2026-10-03/2026-10-03.md
```

```text
$review-writing blogs/2026-10-03/2026-10-03.md 내용을 리뷰해줘.
```

## 클라이언트 구조

```
app/client/
├── index.ts                          # 진입점
├── search/
│   ├── highlightText.ts              # 순수 함수
│   ├── highlightText.test.ts         # 단위 테스트
│   ├── SearchPopup.ts                # 검색 팝업 클래스
│   └── SearchPopup.test.ts           # DOM 테스트 (happy-dom)
├── tags/
│   ├── tagUtils.ts                   # 순수 함수 (getSelectedTags, toggleTag)
│   ├── tagUtils.test.ts              # 단위 테스트
│   ├── TagFilter.ts                  # 태그 필터링 클래스
│   └── TagFilter.test.ts             # DOM 테스트 (happy-dom)
└── shared/
    ├── hashParams.ts                 # URL 해시 유틸리티
    └── hashParams.test.ts            # 단위 테스트
```
