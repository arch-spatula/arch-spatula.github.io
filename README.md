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
pnpm run i # 패키지 설치
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
