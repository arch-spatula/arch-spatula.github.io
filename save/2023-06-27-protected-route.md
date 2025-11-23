---
title: 'Protected Route'
authors: [arch-spatula]
tags: ['react', 'react-router-dom', 'protected route', 'refactoring', 'design pattern']
description: '특정 route에 접근하면 리다이렉팅 깜박임을 제거하는 방법입니다.'
toc_max_heading_level: 6
draft: true
date: 2023-06-27
---

# Protected Route

기본 중 기본입니다.

예전에 원티드 인턴 과제를 진행할 때 떨어진 이유 중 하나입니다.

특정 route에 접근하면 리다이렉팅 깜박임을 제거하는 방법입니다.

<!--truncate-->

사실 중요하고 교육과정에서 또 안 배운 내용입니다. 야성으로 알아내야죠 뭐...

Protected Route라고 하면 인증 안된 유저가 특정 페이지를 접근하면 접근을 막고 리다이렉팅하는 것을 생각합니다.

## 문제: data router에 맞는 protected route 전략

nav는 물론이고 다른 라우팅에 대해서 리소스 접근 제한을 걸어두려고 했습니다.

다시 보면 지금도 결국에는 최선의 방법을 선택한 것입니다.

## 시도

### 시도: 검색

일단 공식 문서에서 설정하는 것이 있나 검색을 시도했습니다. 의외로 없고 아티클과 stack overflow 게시글이 있었습니다.

[Reactjs Protected Route - dev.to](https://dev.to/collins87mbathi/reactjs-protected-route-m3j)

[How to create a protected route with react-router-dom? - Stack Overflow](https://stackoverflow.com/questions/66289122/how-to-create-a-protected-route-with-react-router-dom)

좋아요가 꽤 많이 달렸습니다.

### 시도: github 참고 자료

[wanted frontend 5 team pre-onboarding-10th](https://github.com/wanted-frontedend-team5/pre-onboarding-10th-1-5/blob/main/src/router/Router.jsx)

저보다 더 뛰어난 개발자들이 해결한 방식도 있습니다.

```jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/signin" />,
    errorElement: <NotFound />,
  },
  {
    path: '/signin',
    element: <SignIn />,
    loader: () => {
      if (getUserTokenInLocalStorage()) {
        throw redirect('/todo');
      }
      return null;
    },
  },
  {
    path: '/signup',
    element: <SignUp />,
    loader: () => {
      if (getUserTokenInLocalStorage()) {
        throw redirect('/todo');
      }
      return null;
    },
  },
  {
    path: '/todo',
    element: (
      <ProtectedRoute>
        <Todo />
      </ProtectedRoute>
    ),
  },
]);
```

흥미로운 전략입니다. 로그인 상태가 되었고 다른 라우트 접근 시도를 하면 다시 리다이렉팅을 시켜줍니다.

또 인가가 나있는 상태에서는 todo를 접근할 수 있게 됩니다.

로그인 했을 때와 로그아웃했을 때 접근 가능한 리소스가 다릅니다.

또 공식 문서를 확인해보니까 라우팅을 했을 때 해당하는 데이터에 요청을 보내도록 하는 것이었습니다.

[loader - React Router DOM 공식문서](https://reactrouter.com/en/main/route/loader)

아마 라우팅을 하고 화면에 로딩 스피너가 보이는 문제를 해결하려고 했습니다. 원래 서버사이드 라우팅은 데이터를 모두 갖고 클라이언트에게 보여주지만 클라이언트 사이드 라우팅이기 때문에 마운트 시점에 요청을 보내는 것이 유저 경험에 안 좋다고 보고 해결하려는 것처럼 보입니다.

이런을 보고 request waterfall이라고 부릅니다.

ProtectedRoute는 예민한 데이터 렌더링 자체를 차단합니다. 민감한 정보는 로그인 페이지로 리다이렉팅합니다.

### 시도: 튜토리얼

[The New Way To Create Protected Routes With React Router V6](https://www.youtube.com/watch?v=2k8NleFjG7I)

[Creating Protected Routes With React Router V6](https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c)

미디엄 아티클 중에서 자바스크립트 하이라이트가 안 되어 있어서 인도사람이라고 생각하고 있었는데 아니었습니다.

### 시도

[React Router 6 – Full Course](https://youtu.be/nDGA3km5He4?t=21263)

사실 신뢰할 수 있는 튜토리얼 강사입니다. 하지만 `loader`에 리다이렉팅한다는 것이 충격입니다.

그리고 loader는 라우딩 전에 실행하는 것으로 추측됩니다. 브라우저에 history stack이 안 쌓입니다.

```tsx
// ... 생략
const routes = createBrowserRouter([
  {
    path: ROUTE_PATHS.WELCOME,
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Landing />,
          },
          {
            path: ROUTE_PATHS.SIGN_IN,
            element: <SignIn />,
          },
          {
            path: ROUTE_PATHS.SIGN_UP,
            element: <SignUp />,
          },
          {
            path: ROUTE_PATHS.CARDS,
            element: <Cards />,
          },
          {
            path: ROUTE_PATHS.DECK,
            element: <Deck />,
          },
          {
            path: ROUTE_PATHS.SETTING,
            element: <Setting />,
          },
        ],
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

위처럼 작성해도 동작하지 않습니다.

```tsx
function Router() {
  return (
    <ProtectedRoute>
      <RouterProvider router={routes} />
    </ProtectedRoute>
  );
}
```

이렇게 되면 route context 밖에 존재 해야 합니다.

더러운 해결책은 있지만 올리면 혼낼 것입니다. 물론 동작합니다.

```tsx
import { ROUTE_PATHS } from '@/constant/config';
import { useLogin } from '@/hooks';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <Outlet /> : <Navigate to={ROUTE_PATHS.SIGN_IN} />;
}
```

이 `ProtectedRoute` 컴포넌트를 갖고 한땀한땀 감싸는 방법이 있습니다.

```tsx
// ... 생략
const routes = createBrowserRouter([
  {
    path: ROUTE_PATHS.WELCOME,
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Landing />
              </ProtectedRoute>
            ),
          },
          {
            path: ROUTE_PATHS.SIGN_IN,
            element: (
              <ProtectedRoute>
                <SignIn />
              </ProtectedRoute>
            ),
          },
          {
            path: ROUTE_PATHS.SIGN_UP,
            element: (
              <ProtectedRoute>
                <SignUp />
              </ProtectedRoute>
            ),
          },
          {
            path: ROUTE_PATHS.CARDS,
            element: (
              <ProtectedRoute>
                <Cards />
              </ProtectedRoute>
            ),
          },
          {
            path: ROUTE_PATHS.DECK,
            element: (
              <ProtectedRoute>
                <Deck />
              </ProtectedRoute>
            ),
          },
          {
            path: ROUTE_PATHS.SETTING,
            element: (
              <ProtectedRoute>
                <Setting />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);
```

이렇게 하면 동작합니다. 그리고 제가 만들고 있는 서비스는 라우팅 로직이 복잡하게 성장할 가능성이 없어서 여기서 끝내도 충분합니다.

하지만 제가 면접관이면 언더 엔니이어링을 더 싫어할 것입니다. 그리고 강성적으로 DRY와 조기 최적화를 외칠 것이기 때문에 코드가 드러워서 탈락시켰다고 피드백을 줄 것입니다.

data router 스타일에 loader 유틸함수를 만들면 해결할 수 있습니다. data router 스타일에 맞는 올바른 protected route 패턴이 아직 없습니다.

## 해결

해결자체는 했지만 이 해결책도 결국에는 안티패턴입니다. loader는 데이터 로딩을 위해 처리해줘야 하는데 취지에 어긋나고 리소스 접근 제한에 활용했기 때문입니다.

다른 접근 방법은 4시간 안에 못 찾았습니다. ~~react-router-dom이 remix 팀에 인수되고 다들 근면 성실해졌습니다.~~ data route 패턴에
올바른 protected route 패턴은 검색해도 잘 안 나옵니다.

```ts title="/utils/queryLogin.ts"
import { redirect } from 'react-router-dom';
import { checkLogin } from '..';
import { ROUTE_PATHS } from '@/constant/config';

export function queryLogin(direct: 'signin' | 'cards') {
  if (direct === 'signin' && !checkLogin()) throw redirect(ROUTE_PATHS.SIGN_IN);
  if (direct === 'cards' && checkLogin()) throw redirect(ROUTE_PATHS.CARDS);
}
```

이 부분은 리다이렉팅 로직을 처리합니다. 확인을 하고 리다이렉팅 처리를 합니다. 참고로 `throw`는 react-router-dom이 권장하고 있는 패턴이라고 합니다. 그리고 진짜 적용해야 리다이렉팅이 동작합니다.

이 함수는 route 컴포넌트에 호출하고 loader에서 사용합니다.

```ts title="route/route.tsx"
const routes = createBrowserRouter([
  {
    path: ROUTE_PATHS.WELCOME,
    element: <Layout />,
    children: [
      // ... 생략
      {
        path: ROUTE_PATHS.SIGN_IN,
        element: <SignIn />,
        loader: () => {
          queryLogin('cards');
          return null;
        },
      },
      // ... 생략
      {
        path: ROUTE_PATHS.CARDS,
        element: <Cards />,
        loader: () => {
          queryLogin('signin');
          return null;
        },
      },
      // ... 생략
    ],
    errorElement: <NotFound />,
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
```

이렇게 구현하면 동작합니다. `loader`에서 호출할 때 예외처리(`catch`) 동작방식이 내부적으로 연괸되어 있을 것 같습니다.

이제 레다이렉팅할 조건을 살펴보면 됩니다.

```ts title="util/checkLogin.ts"
import { STORAGE_KEY } from '@/constant/config';

export function checkLogin() {
  return Boolean(localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN) && sessionStorage.getItem(STORAGE_KEY.SESSION_TOKEN));
}
```

2개의 token을 확인하고 로그인 상태를 검증합니다. 이것은 useLogin hook에서도 유용한 로직이 됩니다.

### 부록

이렇게 해결하면 단점이 보일 것입니다. `nav` 리랜더링과 갱신 문제입니다. `<Layout/>` 컴포넌트에서는 atom을 구독하고 atom은 storage를 구독하는 방식으로 동작하면 nav는 로그인 상태를 구독하고 리랜더링을 반영하게 됩니다.

```ts
import { STORAGE_KEY } from '@/constant/config';
import { checkLogin } from '@/utils';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const loginAtom = atom(checkLogin());

export function useLogin() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(loginAtom);

  const setTokens = useCallback(
    (accessToken: string, sessionToken: string) => {
      localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);
      sessionStorage.setItem(STORAGE_KEY.SESSION_TOKEN, sessionToken);
      setIsLoggedIn(checkLogin());
    },
    [setIsLoggedIn],
  );

  const emptyTokens = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_KEY.SESSION_TOKEN);
    setIsLoggedIn(checkLogin());
  }, [setIsLoggedIn]);

  return {
    isLoggedIn,
    setTokens,
    emptyTokens,
  };
}
```

atom은 storage와 수동으로 구독하게 만들었습니다. 좋은 패턴은 이렇게 보면 당연히 안 좋습니다. 로직의 규모가 작아서 큰 문제는 없습니다.

참고로 새로고침해도 storage를 구독하기 때문에 계속 로그인 상태를 유지할 수 있습니다.

`atomStorage`는 사용해보면서 큰따옴표 문제가 너무 많아서 아쉬웠습니다.

### 학습

`ProtectedRoute`이라고 부르는 것이 컨벤션입니다.

data router와 page router 모두 각각 다릅니다. 하지만 중요한 패턴입니다. 그리고 공식적으로 제공하는 api는 아닙니다.

- auth같은 token 제어는 Jotai와 무관하게 제어하는 것이 적절합니다.
  - Jotai storage는 해결하는 문제보다 만드는 문제가 더 많습니다.
    - 큰따옴표로 감싸지는 이슈가 다른 곳에서 storage를 확인하는데 문법이 더러워집니다.
    - hook으로 호출한다는 것이 치명적인 단점입니다. 다른 util 함수가 서로 호출하고 재사용하는데 hook으로 `jsx` 혹은 객체가 아닌 것을 `return`할 때 문제가 됩니다.

## 리팩토링: 추상 팩토리 패턴

이번에도 역시다 조기 추상화를 시키는 전략을 취합니다.

[Enforcing the type of the indexed members of a Typescript object? - Stack Overflow](https://stackoverflow.com/questions/13315131/enforcing-the-type-of-the-indexed-members-of-a-typescript-object)

```ts title="route/route.tsx"
const routes = createBrowserRouter([
  {
    path: ROUTE_PATHS.WELCOME,
    element: <Layout />,
    children: [
      // ... 생략
      {
        path: ROUTE_PATHS.SIGN_IN,
        element: <SignIn />,
        loader: () => {
          queryLogin('cards');
          return null;
        },
      },
      // ... 생략
      {
        path: ROUTE_PATHS.CARDS,
        element: <Cards />,
        loader: () => {
          queryLogin('signin');
          return null;
        },
      },
      // ... 생략
    ],
    errorElement: <NotFound />,
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
```

어제 작성한 이 코드에 중복은 은근히 있습니다. 조기 추상화도 경계할 필요가 있다고 하는 사람도 있습니다. 실력없는 사람이 이런 말 하는 것입니다. 뭐 개인적으로는 전자에 동의하지만 면접과 회사는 무조건 후자입니다.

```ts
import { redirect } from 'react-router-dom';
import { checkLogin } from '..';
import { ROUTE_PATHS } from '@/constant/config';

export function protectRoutes(direct: 'signin' | 'cards') {
  return () => {
    switch (direct) {
      case 'cards':
        if (checkLogin()) throw redirect(ROUTE_PATHS.CARDS);
        break;
      case 'signin':
        if (!checkLogin()) throw redirect(ROUTE_PATHS.SIGN_IN);
        break;
      default:
        break;
    }

    return null;
  };
}
```

일단 이렇게 작성하면 호출하는 사람은 인증이 안 되어 있으면 어디로 보낼지 내부적으로 처리했습니다.

```ts title="route/route.tsx"
const routes = createBrowserRouter([
  {
    path: ROUTE_PATHS.WELCOME,
    element: <Layout />,
    children: [
      // ... 생략
      {
        path: ROUTE_PATHS.SIGN_IN,
        element: <SignIn />,
        loader: protectRoutes('cards'),
      },
      // ... 생략
      {
        path: ROUTE_PATHS.CARDS,
        element: <Cards />,
        loader: protectRoutes('signin'),
      },
      // ... 생략
    ],
    errorElement: <NotFound />,
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
```

이렇게 되면 이제 내부 구현을 몰라도 됩니다. 그냥 리소스 접근 전에 내부적으로 처리한다는 것만 압니다.

```ts
import { redirect } from 'react-router-dom';
import { checkLogin } from '..';
import { ROUTE_PATHS } from '@/constant/config';

export function protectRoutes(direct: 'signin' | 'cards') {
  return () => {
    switch (direct) {
      case 'cards':
        if (checkLogin()) throw redirect(ROUTE_PATHS.CARDS);
        break;
      case 'signin':
        if (!checkLogin()) throw redirect(ROUTE_PATHS.SIGN_IN);
        break;
      default:
        break;
    }

    return null;
  };
}
```

일단은 이렇게 코드를 작성하고 끝낼 수 있지만 여전히 아쉽습니다. 먼저 switch case는 대부분의 경우 차선책입니다.

이렇게 작성하면 다형성을 못 갖습니다. 다형성을 확보하기 위해 switch case는 팩토리함수에 있고 프로덕트 함수는 switch case의 case 별로 반환하개 만들면 됩니다.

```ts
import { redirect } from 'react-router-dom';
import { checkLogin } from '..';
import { ROUTE_PATHS } from '@/constant/config';

export function protectRoutes(direction: 'signin' | 'cards') {
  switch (direction) {
    case 'cards':
      return () => {
        if (checkLogin()) throw redirect(ROUTE_PATHS.CARDS);
        return null;
      };
    case 'signin':
      return () => {
        if (!checkLogin()) throw redirect(ROUTE_PATHS.SIGN_IN);
        return null;
      };
    default:
      return () => {
        return null;
      };
  }
}
```

이렇게 되면 다형성을 확보할 수 있습니다. `direction`의 type에 따라 case를 확장할 수 있습니다.

생산적인 엔지니어면 이정도로 충분합니다. PM의 요구사항으로 만들어지는 경우의 수는 선형시간복잡성이어도 아쉬울 것이 전혀 없습니다. 하지만 성능 강박증을 행복하게 만들어주려면 switch case 문을 제거해야 합니다.

첫째로 읽고 쓰기는 없으면 객체로 리팩토링이 가능합니다. 객체로 만들고 객체의 메서드를 접근하게 만들어서 상수시간 복잡성을 얻을 수 있습니다. 물론 지금 `switch case`는 2개 밖에 없습니다.

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

성능 성능강박증 환자도 행복하게 만들어 줄 수 있는 읽기 전용객체의 메서드를 반환하도록 만들었습니다.

하지만 또 문제가 있다고 합니다. 클래스 변태는 객체 리터럴을 보면 불편하다고 합니다. ㅂㄷㅂㄷ...

일단 여기서 큰 교훈이 하나 있다면 `key in type`이 큽니다. `Direction`처럼 선언한 타입 대응이 가능합니다.
