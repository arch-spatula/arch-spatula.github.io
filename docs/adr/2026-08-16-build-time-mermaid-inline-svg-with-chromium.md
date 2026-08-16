# Chromium을 사용해 Mermaid를 빌드 시점에 인라인 SVG로 렌더링한다

- 상태: Accepted
- 결정일: 2026-08-16

## 맥락

블로그 글은 Markdown에서 정적 HTML로 변환된다. Mermaid는 D3.js와 브라우저 DOM API를 사용하므로 Node.js 환경만으로는 다이어그램을 SVG로 렌더링할 수 없다.

클라이언트에서 Mermaid를 실행하면 브라우저로 렌더링 책임이 넘어간다. 이 경우 Mermaid 런타임 JavaScript를 배포해야 하고, 페이지를 연 뒤에야 다이어그램이 만들어진다. 이 블로그는 가능한 한 정적인 HTML을 배포하고 클라이언트 의존성을 줄이는 방향을 따른다.

Playwright는 E2E 테스트에도 사용하지만, Mermaid 렌더링에서는 테스트 도구가 아니라 빌드에 DOM 환경을 제공하는 도구다. 따라서 정적 빌드를 실행하는 환경에도 Playwright와 호환되는 Chromium 실행 파일이 필요하다.

## 결정

- `rehype-mermaid`의 `inline-svg` 전략으로 Mermaid 코드 블록을 빌드 시점에 `<svg>`로 변환한다.
- Playwright의 헤드리스 Chromium을 렌더링 환경으로 사용한다.
- 빌드와 개발 서버는 Chromium을 한 번 실행하고 Markdown 파일을 처리하는 동안 재사용한다.
- Chromium을 실행할 수 없거나 Mermaid 렌더링에 실패하면 원본 코드 블록으로 대체하지 않고 빌드를 실패시킨다.
- 정적 빌드를 수행하는 CI 작업은 `pnpm exec playwright install --with-deps chromium`으로 빌드용 Chromium과 Linux 시스템 의존성을 준비한다.
- E2E 작업의 브라우저 설치는 테스트 대상 브라우저를 준비하는 별도 책임으로 유지한다.
- `playwright`와 `@playwright/test`는 같은 정확한 버전으로 고정해 사용하는 브라우저 리비전을 일치시킨다.

## 결과

### 장점

- 배포된 HTML에 SVG가 포함되어 클라이언트 JavaScript 없이 다이어그램을 표시한다.
- 페이지 로드 후 다이어그램이 나타나는 지연이나 레이아웃 변화를 피한다.
- 검색 엔진과 JavaScript를 실행하지 않는 소비자도 다이어그램 마크업에 접근할 수 있다.
- 빌드와 E2E가 요구하는 브라우저의 목적과 설치 범위가 CI에서 명시된다.

### 비용

- 로컬과 CI 빌드 환경에 Playwright Chromium 설치가 필요하다.
- CI에서 브라우저와 시스템 의존성을 설치하므로 빌드 준비 시간이 늘어난다.
- Playwright 버전을 변경할 때 호환되는 Chromium 리비전도 함께 변경된다.
- 브라우저에 의존하므로 순수한 Node.js 빌드보다 실행 환경이 무겁다.

## 검토한 대안

### 클라이언트에서 Mermaid 렌더링

Mermaid 런타임을 모든 방문자에게 전달하고 페이지 로드 후 렌더링해야 하므로 선택하지 않았다.

### Mermaid 코드 블록을 그대로 출력

다이어그램을 제공하려는 요구를 충족하지 못하므로 선택하지 않았다.

### SVG 파일을 별도 파이프라인에서 사전 생성

Markdown과 생성 파일 사이의 동기화 및 별도 산출물 관리가 필요해 현재 규모에 비해 복잡하므로 선택하지 않았다.
