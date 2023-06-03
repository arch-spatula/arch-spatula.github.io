---
title: vitest, RTL, MSW 테스트 설정
authors: [arch-spatula]
tags: ['vitest', 'axios', 'vite', 'react', 'msw', 'react testing library']
description: deno 런타임에서 axios로 mongoDB랑 통신하는데 에러가 계속됩니다.
toc_max_heading_level: 6
---

# vitest, RTL, MSW 테스트 설정

vitest처럼 빠른 테스트러너에 RTL과 MSW를 같이 사용할 수 있게 설정하는 방법을 다룹니다.

<!--truncate-->

## 플래시 카드 설치 & 설정

저는 패키지 매니저는 pnpm을 사용했고 리액트는 vite로 설치했습니다. 또 우리나라의 자부심 swr을 활용 버전으로 설치했습니다.

```
chore/init
```

설치만 하기 위해 브랜치 생성하기

```sh
open https://github.com/arch-spatula/flash-card-frontend/pull/new/chore/init
```

### vitest

공식 홈페이지 예시 레포 [react-testing-lib-msw](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib-msw)를 활용합니다.

```sh
pnpm add -D vitest
```

일단 설치합니다.

<!-- [Setting up vite, React, TypeScript, eslint, prettier, vitest, testing-library and react-router](https://youtu.be/cchqeWY0Nak?t=1435) -->

<iframe class="codepen" src="https://www.youtube.com/embed/cchqeWY0Nak" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

위 영상이 제가 이번 프로젝트에 사용할 기술스택과 유사해서 활용하겠습니다.

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
```

vite으로 설치한 리액트의 기본 설정이었습니다.

```ts
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setup.ts'],
  },
});
```

공식문서와 관련된 레포에서 알려준 코드입니다.

둘을 잘 조합하면 다음과 같이 작성하면 됩니다.

```ts
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setup.ts'],
  },
});
```

이렇게 모듈을 편집하고나서 `./src`에 `setup.ts` 파일을 만들도록 합니다. 모든 테스트 실행전에 실행될 파일입니다.

여기까지 되면 테스트 러너가 설치 된 것입니다.

### RTL 설치

```sh
pnpm i -D @testing-library/react
```

```sh
pnpm i -D @testing-library/jest-dom
```

이 명령으로 설치하면 됩니다.

```json
{
  "name": "@vitest/example-react-testing-lib-msw",
  "private": true,
  "scripts": {
    "build": "tsc && vite build",
    "coverage": "vitest run --coverage",
    "dev": "vite",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui"
  },
  "dependencies": {
    "@apollo/client": "^3.6.6",
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "@testing-library/react": "^12.1.5",
    "@testing-library/user-event": "^13.5.0",
    "@types/react": "^17.0.45",
    "@types/react-dom": "^17.0.17",
    "@vitejs/plugin-react": "^1.3.2",
    "@vitest/ui": "latest",
    "cross-fetch": "^3.1.5",
    "jsdom": "latest",
    "msw": "^1.2.1",
    "vite": "latest",
    "vitest": "latest"
  },
  "stackblitz": {
    "startCommand": "npm run test:ui"
  }
}
```

공식 문서에서는 `jsdom`을 설치하고 있습니다. 하지만 저는 `jsdom`을 잘 모르기 때문에 일단 `jest-dom`을 설치했습니다.

여기까지는 설치입니다. 다음은 설정입니다.

[Using Testing Library jest-dom with Vitest](https://markus.oberlehner.net/blog/using-testing-library-jest-dom-with-vitest/)

위 아티클이 고전인듯합니다. 이 고전아티클을 활용하면 설정할 수 있습니다.

```ts
// ./src/setup.ts
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);
```

설치 직후에 matchers에는 이런 에러가 있을 것입니다.

> Could not find a declaration file for module '@testing-library/jest-dom/matchers'.

```ts
/* eslint-disable import/no-extraneous-dependencies */
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);
```

튜토리얼에서 알려준 그대로 하면 여전히 에러가 발생합니다.

```ts
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);
```

이렇게 설정하면 에러가 발생하지 않습니다. 하지만 단기적인 해결책입니다.

하지만 pnpm으로 설치했으면 아래 설치하면 문제가 해결됩니다.

```sh
pnpm add -D @types/testing-library__jest-dom
```

그리고 `setup.ts`에 lint 무시도 필요 없어집니다.

[Property 'toBeInTheDocument' does not exist on type 'Matchers`<any>`'](https://stackoverflow.com/questions/57861187/property-tobeinthedocument-does-not-exist-on-type-matchersany)

구글링 한방에 찾아서 다행입니다.

```ts
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);
```

test script를 돌렸을 때 결국 필요했습니다. 다음 jsdom을 설치해주시기 바랍니다.

```sh
pnpm i -D jsdom
```

### tsx 테스트 코드

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('should renders hello world!', () => {
    // Arrange
    render(<App />);

    // Act(선택적)
    // 현재는 생략

    // Expect
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'hello world!'
    );
  });
});
```

이렇게 하면 통과하는 테스트코드가 작성된 것입니다.

```tsx
import { useState } from 'react';
import './App.css';

function App() {
  return <h1>hello world!</h1>;
}

export default App;
```

이렇게 작성하면 테스트가 통과 될 것입니다. 이제 설치 후 설정까지 되어서 커밋 한 번 합니다.

[About Queries - Priority - testing-library](https://testing-library.com/docs/queries/about/#priority)

### 리액트 테스트 코드 베스트 프렉티스

테스팅 라이브러리는 테스트 코드 작성에 대한 의견이 있습니다. DOM 쿼리하는 우선순위를 준수할 것을 베스트 프렉티스라고 합니다. 이유는 접근성 테스트도 동시하기 때문입니다.

RTL 메인테이너 Kent.C Dodds 선생님은 다음 아티클에서 테스트 코드 작성에서 자주 하는 실수를 다룹니다.

[Common mistakes with React Testing Library - 원문](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

[Common mistakes with React Testing Library - 국문](https://seongry.github.io/2021/06-20-common-mistakes-with-rty/)

### @testing-library/user-event

유저의 동작도 테스트할 것이기 때문에 `user-event`도 설치해야 합니다.

```sh
pnpm i -D @testing-library/user-event @testing-library/dom
```

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import user from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('should renders hello world!', async () => {
    // Arrange
    user.setup();
    render(<App />);

    // Act(선택적)
    // 현재는 생략

    // Expect
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'hello world!'
    );
  });
});
```

불러오고 사용하면 됩니다.

### msw 설치

통신을 mocking 하는 것도 이번 프로젝트의 의의입니다. 만든 jsx, hook 즉 view, controller가 통신에 실패하면 어떻게 반응하는지 통합테스트 스러운 테스트 코드를 작성하는 것이 중요합니다.

또 JSON 서버만 주구장창 쓰기에는 아쉬운 점이 많습니다. 물론 좋은 유사 백엔드이기는 합니다. 머나먼 미래에는 유사 BaaS 같은 라이브러리로 JSON base를 만들어 보는 것이 꿈입니다. pocket base도 부족해서 더 간소한 라이브러리를 만들어보고 싶어졌습니다.

각설하고 설치합니다.

```sh
pnpm i -D msw
```

일단 이렇게 되면 설치된 것입니다.

```sh
npx msw init public/ — save
```

실제 서버에 요청이 보내기 전에 위 명령을 하면 생성됩니다. `Y` 선택하는 것 잊지말도록 합니다.

다음은 설정입니다. 공식문서는 CRA로 설정하는 법만 알려줍니다. vite도 동일하게 설정해도 동작합니다.

#### worker 설정

```ts
// mocks/handlers.ts
import { rest } from 'msw';

const todos = ['먹기', '자기', '놀기'];

export const handlers = [
  // 할일 목록
  rest.get('/todos', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),
];
```

handlers에서 mocking할 API를 임시로 만듭니다. 여기서는 여러 모의 API를 묶어둡니다.

```ts
// mocks/worker.ts
import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
```

이렇게 만들어진 API는 `worker`로 전달합니다.

```tsx
// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { worker } from './mocks/worker';
if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

이 설정을 하면 개발환경에서만 동작하도록 합니다. `process.env.NODE_ENV`에 따라 조건부로 worker가 동작하기 때문에 그렇습니다.

여기까지 설정 중간입니다. 여기서 모킹 확인을 한번 해보겠습니다.

```tsx
// src/App.tsx
import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  fetch('http://localhost:5173/todos')
    .then((response) => response.json())
    .then((data) => setCount(data));

  return <h1>hello world! {count}</h1>;
}

export default App;
```

모의 통신이 성공한 것을 볼 수 있을 것입니다.

#### server 설정하기

server는 테스트 서버를 위해서 설정합니다.

worker는 브라우저 통신과 반영을 위해서 설정하는 서버입니다.

```ts
// mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

`msw/node`와 `setupServer`가 다르다는 점을 주의깊게 살피도록 합니다.

다음은 `setup.ts` 설정하는 방법입니다.

```ts
// src/setup.ts
import { server } from './mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
```

위는 공식문서에 제공하는 레포에서 가져온 것입니다. 하지만 우리에게 맞게 커스터마이징 하면 다음과 같습니다.

```ts
// src/setup.ts
import matchers from '@testing-library/jest-dom/matchers';
import { server } from './mocks/server';
import { expect } from 'vitest';

expect.extend(matchers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
```

[MSW로 백앤드 API 모킹하기 - DaleSeo](https://www.daleseo.com/mock-service-worker/) 아티클을 참고했습니다.

이렇게 되면 통신과 JSX 모두 테스트할 수 있게 됩니다.

여기까지 작성하고 커밋합시다.

```json
{
  "name": "flash-card-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest watch"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@testing-library/dom": "^9.3.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^14.4.3",
    "@types/react": "^18.2.7",
    "@types/react-dom": "^18.2.4",
    "@types/testing-library__jest-dom": "^5.14.6",
    "@typescript-eslint/eslint-plugin": "^5.59.7",
    "@typescript-eslint/parser": "^5.59.7",
    "@vitejs/plugin-react-swc": "^3.3.1",
    "eslint": "^8.41.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.3.5",
    "jsdom": "^22.1.0",
    "msw": "^1.2.1",
    "typescript": "^5.0.4",
    "vite": "^4.3.9",
    "vitest": "^0.31.1"
  },
  "msw": {
    "workerDirectory": "public"
  }
}
```

프로젝트의 `package.json`은 위와 비슷할 것입니다.

### test provider

이제 4개의 라이브러리만 설치하고 설정하면 기능을 개발에 착수할 수 있습니다.

Jotai, React-Query, Emotion, React-Router-Dom

하지만 여기서 문제가 있습니다. 모두 provider로 감싸야 합니다. 그것도 4개나 처리해야 합니다. provider의 문제는 리액트 root에서 provider로 감싸고 트리에서 해당 노드를 접근하는 방식으로 동작합니다. 하지만 테스트 환경은 트리 외부에 존재하기 때문에 provider를 통해 접근하는 테스트는 모두 감싸줘야 합니다.

hook을 테스트할 때는 문제가 없지만 컴포넌트를 호출 했을 때는 문제가 될 것입니다.

일단 테스트는 각각의 독립적인 공식문서를 활용해서 테스트 해야 합니다.

가장 단순하게 접근해서 일단 설치하고 다음에 대응하도록 하겠습니다.

```sh
pnpm i jotai
```

```sh
pnpm i jotai-devtools --save # 선택
```

```sh
pnpm add @tanstack/react-query
```

```sh
pnpm add @tanstack/react-query-devtools
```

```sh
pnpm add -D @tanstack/eslint-plugin-query
```

```sh
pnpm i @emotion/styled @emotion/react
```

```sh
pnpm i react-router-dom
```

### axios

```sh
pnpm i axios
```

```json
{
  "name": "flash-card-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest watch"
  },
  "dependencies": {
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "@tanstack/react-query": "^4.29.12",
    "axios": "^1.4.0",
    "jotai": "^2.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.11.2"
  },
  "devDependencies": {
    "@tanstack/eslint-plugin-query": "^4.29.9",
    "@testing-library/dom": "^9.3.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^14.4.3",
    "@types/react": "^18.2.7",
    "@types/react-dom": "^18.2.4",
    "@types/testing-library__jest-dom": "^5.14.6",
    "@typescript-eslint/eslint-plugin": "^5.59.7",
    "@typescript-eslint/parser": "^5.59.7",
    "@vitejs/plugin-react-swc": "^3.3.1",
    "eslint": "^8.41.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.3.5",
    "jsdom": "^22.1.0",
    "msw": "^1.2.1",
    "typescript": "^5.0.4",
    "vite": "^4.3.9",
    "vitest": "^0.31.1"
  },
  "msw": {
    "workerDirectory": "public"
  }
}
```

일단 단순설치해서 여기까지 되었습니다.

다음은 설정하겠습니다.
