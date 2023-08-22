---
description: 'React Router DOM Tip'
tags: ['React Router', 'introduction', 'React Router DOM']
sidebar_position: 1
---

# React Router DOM

React Router DOM은 클라이언트 사이드 라우팅을 처리하는 라이브러리입니다. SPA로 CSR로 프로그래밍 하면 page 단위 라우팅의 로직은 클라이언트의 책임이 됩니다.

React Router DOM은 현재 산업 표준입니다.

## react-router-dom loader 함수 매개변수 타입지정 LoaderFunctionArgs

```ts
import { type LoaderFunctionArgs } from 'react-router-dom';

function loader({}: LoaderFunctionArgs) {
  return null;
}

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Component />,
    loader,
  },
]);
```

loader 내부에 접근할 수 있는 매개 변수를 알고자 타입을 찾아봤습니다. 이제 page에서 위처럼 `import`하고 사용하면 됩니다.
