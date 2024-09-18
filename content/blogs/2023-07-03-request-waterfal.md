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

![request waterfall - 1](https://user-images.githubusercontent.com/84452145/252219174-765f2a02-48cf-41d3-9dd5-cdc6181f4ab7.gif)

이 아티클 위에서 로그인 후 또 로딩하는 현상을 해결하는 방법을 다룹니다.

## 왜 해결해야 하는가?

UX적으로도 해결해야 하는 문제는 맞습니다. 일반적으로 시스템에서 유저는 A를 달라고 하고 처리하를 기다린 후에 A를 받아야 합니다. 하지만 2번의 다른 스피너를 보여준 다는 것은 2번의 request-response 라이프 사이클을 보여주는 것입니다. A를 달라고 하고 잠시 기다렸다가 B를 보여주고 B를 기다리다가 다시 A를 주는 방식입니다. 그냥 1번 기다리게 하는 것이 UX적으로 더 좋습니다. 이것은 action cost 관점이 아니라 시스템 피드백 관점에서 필요한 것입니다. 유저에게 불필요한 2번째 요청을 한다는 정보를 숨기는 해결책입니다.

## 누군가 먼저 해결했는가?

사실 이 글은 아래 아티클을 해결(적용)을 먼저하고 여기서 일부를 풀어 쓰는 것입니다. 또 저보다 더 잘했다고 생각하는 원티드 프리온보딩 레포의 일부를 보고 배낀 것입니다. ~~죄의식을 갖을 필요는 있지만 사실 별로 없습니다.~~

[React Query meets React Router - tkdodo](https://tkdodo.eu/blog/react-query-meets-react-router)

놀랍게도 번역도 올라왔습니다.

[리액트 쿼리 : 리액트 라우터와 연계하기](https://itchallenger.tistory.com/719)

## 어떻게 해결하는가?

SSR의 `getServerSideProps`를 클라이언트 사이드에서 흉내낼 수있습니다. CSR의 프리패칭 전략입니다.

```ts title="ProtectRoutes.ts"
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

예전에 loader 리다이렉팅을 처리하기 위햇 작성했던 코드입니다. 기존에 갖고 있던 로직은 2개입니다. 로그인 상태로 token이 있으면 접근하지 말아야 할 페이지를 마운트 시키기 전에 리다이렉팅을 loader에서 호출하는 것으로 깜박임을 방지합니다. 만약 해당 페이지에 컴포넌트 속에 위치하면 깜박임이 있을 것입니다.

하지만 좋은 컨벤션이 아닌 점이 있습니다. 관심사의 문제입니다. loader는 그 특정 페이지가 먼저 처리해주기 바라는 로직을 처리해달라는 것입니다. 그런 측면에서 loader 함수는 page에 존재해야 합니다.

```tsx title="Page.tsx"
export function loader() {
  return null;
}

function Page() {
  return <div></div>;
}

export default Page;
```

위와 같은 예시로 작성하는 것이 일반적입니다. `loader`는 `getServerSideProps`처럼 컴포넌트를 호출하기 전에 먼저 실행하는 함수입니다. 그냥 `loader` 혹은 `loaderPageName`으로 명명하는 것도 컨벤션입니다.

컨벤션상 같은 모듈에 위치시키는 것을 보고 coLocation이라고 부릅니다. deno fresh에서도 볼 수 있습니다. 아마 다른 메타프레임워크에서도 볼 수 있을 것입니다. 하지만 저의 경우 coLocation을 깼습니다. 페이지마다 고유한 loader 로직이 많지 않아서 util에서 정의하고 Route 컴포넌트에서 호출했습니다.

```tsx title="cardLoader"
import { cardsQuery } from '@/utils';
import queryClient from '@/libs/queryClient';

export const cardLoader = () => async () => {
  const query = () => ({
    queryKey: ['cards'],
    queryFn: getCardsAPI,
    staleTime: 5000,
  });

  return (
    queryClient.getQueryData<Card[]>(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
```

`loader`는 반드시 어떤 값을 반환해야 합니다. 즉 void 타입함수일 수 없습니다. 여기서 봐야 할 것은 `queryClient`에서 먼저 데이터(query-cache)를 접근하고 없으면 요청을 보내는 방식으로 동작합니다. `queryClient`를 사용하는 이유는 loader는 컴포넌트도 hook도 아니기 때문입니다. 여기서 주의할 것이 있는데 `queryClient`는 싱글튼처럼 모두 동일한 인스턴스로 접근할 수 있게 대입해야 합니다. `App` 혹은 `index`에서 Provider로 대입한 `queryClient`랑 동일한 인스턴스로 접근해야 합니다.

`loader`에서 어떤 로직을 처리하고 반환값도 접근이 가능합니다.

반환값은 Page 컴포넌트에서 `useLoaderData`로 접근할 수 있습니다.

```tsx
import { useQuery } from '@tanstack/react-query';
import { cardLoader, cardsQuery } from '@/utils';
import { useLoaderData } from 'react-router-dom';

export function useCards() {
  const loaderCards = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof cardLoader>>
  >;

  const query = cardsQuery();
  const {
    data: cards,
    isLoading,
    error,
  } = useQuery({ ...query, initialData: loaderCards });

  return { cards, isLoading, error };
}
```

반환값을 page 컴포넌트에서 바로 접근하지 않고 custom hook에서 접근했습니다. 동일로직이 2번 사용되었기 때문에 추출을 결정했습니다.

위 예시의 경우 loader로 실행한 반환값을 먼저 접근합니다. 또 loader를 타입지정에 활용하면 typesafe하게 assertion할 수 있습니다. 지금 상황에서는 일단 먼저 믿음(~~좋좋소?~~)으로 가야 합니다.

먼저 서버에 요청하고 실행한 결과를 `loaderCards`를 초깃값으로 지정하면 react-query의 경우 일단 cache가 있기 때문에 onMount 라이프 사이클에 isLoading flag는 활성화되지 않습니다.

```tsx
function Cards() {
  const { cards, isLoading, error } = useCards();

  return <>{/* ... 생략 */}</>;
}
```

로직이 중복해서 `useCard` custom hook으로 담습니다. 또 custom hook이지만 캐시를 공유하기 때문에 페이지 전환에 발생하는 loading 스피너도 없습니다.

![request waterfall - 2](https://user-images.githubusercontent.com/84452145/252223625-04292074-2754-46c6-9ec3-6038689a7c1b.gif)

- 로그인 시점에 1번만 기다리고 페이지를 방문할 수 있게 됩니다.
- 다른 페이지를 접근해도 불필요한 로딩 스피너가 보이지 않습니다.
