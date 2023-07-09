---
title: 'request waterfall 해결'
authors: [arch-spatula]
tags: ['react', 'custom hook']
description: '로그인하고 홈페이지로 이동하면 하면 로딩 스피너가 보입니다. 잘 몰랐지만 상당히 기초가 없는 짓이라고 합니다.'
toc_max_heading_level: 6
---

# request waterfall 해결

로그인하고 홈페이지로 이동하면 하면 로딩 스피너가 보입니다. 잘 몰랐지만 상당히 기초가 없는 짓이라고 합니다.

<!--truncate-->

[React Query meets React Router - tkdodo](https://tkdodo.eu/blog/react-query-meets-react-router)

SSR의 getServerSideProps를 클라이언트 사이드에서 흉내낼 수있습니다. CSR의 프리패칭 전략입니다.

놀랍게도 번역도 올라왔습니다.

[리액트 쿼리 : 리액트 라우터와 연계하기](https://itchallenger.tistory.com/719)

```ts
import { redirect } from 'react-router-dom';
import { checkLogin } from '..';
import { ROUTE_PATHS } from '@/constant/config';

type Direction = 'signin' | 'cards';

const DirectionMap: { [key in Direction]: () => null } = {
  cards: () => {
    if (checkLogin()) throw redirect(ROUTE_PATHS.CARDS);
    return null;
  },
  signin: () => {
    if (!checkLogin()) throw redirect(ROUTE_PATHS.SIGN_IN);
    return null;
  },
} as const;

export function protectRoutes(direction: Direction) {
  return DirectionMap[direction];
}
```

```ts title="route.ts"
const routes = createBrowserRouter([
  {
    path: ROUTE_PATHS.WELCOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: protectRoutes('cards'),
      },
      {
        path: ROUTE_PATHS.SIGN_IN,
        element: <SignIn />,
        loader: protectRoutes('cards'),
      },
      {
        path: ROUTE_PATHS.SIGN_UP,
        element: <SignUp />,
        loader: protectRoutes('cards'),
      },
      {
        path: ROUTE_PATHS.CARDS,
        element: <Cards />,
        loader: protectRoutes('signin'),
      },
      {
        path: ROUTE_PATHS.DECK,
        element: <Deck />,
        loader: protectRoutes('signin'),
      },
      {
        path: ROUTE_PATHS.SETTING,
        element: <Setting />,
        loader: protectRoutes('signin'),
      },
    ],
    errorElement: <NotFound />,
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
```

예전에 loader 리다이렉팅을 처리하기 위햇 작성했던 코드입니다. 기존에 갖고 있던 로직은 2가입니다. 로그인 상태로 token이 있으면 접근하지 말아야 할 페이지를 마운트 시키기 전에 리다이렉팅을 loader에서 호출하는 것으로 깜박임을 방지합니다. 만약 해당 페이지에 컴포넌트 속에 위치하면 깜박임이 있을 것입니다.

하지만 좋은 컨벤션이 아닌 점이 있습니다. 관심사의 문제입니다. loader는 그 특정 페이지가 먼저 처리해주기 바라는 로직을 처리해달라는 것입니다. 그런 측면에서 loader 함수는 page에 존재해야 합니다.
