---
title: 'axios, react-query 타입지정'
authors: [arch-spatula]
tags: ['typescript', 'react-query', 'axios', 'error log']
description: 'axios와 React-Query에 특히 Error에 타입지정하는 여정입니다.'
toc_max_heading_level: 6
date: 2023-07-24
---

# axios, react-query 타입지정

axios와 React-Query에 특히 Error에 타입지정하는 여정입니다.

기존 [request waterfall 해결](2023-07-03-request-waterfal.md)의 후속 편이라고 생각해도 괜찮습니다.

나중에 Error Boundaries까지 연결됩니다. 놀랍게도 ~~사실 별로 놀랍지 않지만~~ 대부분 tkdodo 블로그 자료를 활용했습니다.

<!--truncate-->

## 문제: 타입지정에 혼란이 많습니다.

`error`타입을 활용하지 못하고 있습니다. `error`가 발생하면 react-query는 재요청을 하도록 합니다. 성공상태에서 재요청도 가능하지만 그것은 낭비이고 라이브러리의 장점을 활용하지 못하는 것입니다. 조금더 올바르고 정교한 에러처리방법을 적용하고자 이 문제를 풀어봅니다. 통신이 실패하면 react-query에게 통신이 실패했다고 `throw`로 알려줄 것입니다.

성공에 대한 타입과 실패에 대한 타입으 서버에서 구체적으로 정해져있는데 클라이언트도 같이 구체적으로 정의해야 합니다. ~~백엔드가 잘 정해주면 백엔드 팀은 실력이 좋은 것입니다.~~

꽤 많이 거슬렸던 작업입니다. axios를 많이 활용하는데 React-Query는 어떻게 타입지정하는지 궁금했습니다. 올바른 타입지정하는 예시가 있었습니다.

```ts
useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    const response = await fetch('/todos/' + todoId);
    // ✅ transforms 4xx and 5xx into failed Promises
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },
});
```

[React Query FAQs > Why do I not get errors ? - tkdodo 블로그](https://tkdodo.eu/blog/react-query-fa-qs#why-do-i-not-get-errors-)

보통 위와 같은 방식으로 예외처리를 합니다. 이유는 백엔드 엔지니어가 에러를 합의없이 막돌려주는 경우가 대부분입니다. ~~꼬우면 Java Spring 직접하라고 합니다.~~ 위에서 조금더 가공할 필요가 있습니다.

```ts
async function getCardsAPI() {
  try {
    const res = await axiosClient.get<{ documents: Card[] }>(API_URLS.CARDS);
    return res.data.documents;
  } catch (error) {
    // highlight-next-line
    return error.response?.data; // error가 발생하지 않습니다.
  }
}
```

하지만 저는 try-catch를 axios 내부에서 제공하고 있었습니다. 그래서 모두 성공으로 간주하고 있었습니다. `promise`에 `throw`하면 `error`로 간주하게 만들 수 있습니다.

```ts
export function useCards() {
  const loaderCards = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof cardLoader>>
  >;

  const {
    data: cards,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['cards'],
    queryFn: getCardsAPI,
    staleTime: 5000,
    initialData: loaderCards,
  });

  return { cards, isLoading, error };
}
```

```ts
function useCards(): {
  cards: string | Card[] | undefined;
  isLoading: false;
  error: unknown;
};
```

현재 코드에서 타입추론은 이렇게 지정되어 있습니다. 여기서 `error`의 `unknown`과 cards의 `undefined` 2가지 문제가 있습니다.

요청에 성공하면 `card`를 담은 배열을 돌려줘야 합니다. 그리고 실패는 `error`에 응답객체가 있어야 합니다.

```ts
type ResponseType = {
  cards: Card[];
  isLoading: boolean;
  error: { success: boolean; msg: string };
};
```

제가 원하는 타입지정은 이렇게 하고싶습니다.

상황은 타입스크립트를 axios와 react-query를 사용하고 있습니다.

## 시도: AxiosError 제네릭 지정

```ts
export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>
```

권장하지 않는 방식이지만 위 정의를 활용해볼 수 있습니다. 제네릭을 활용하면 거짓말하는 것입니다. 장기적으로 보수하기 어려울 수 있습니다. 가장 좋은 것은 알아서 타입추론을 하는 것입니다.

```ts
async function getCardsAPI() {
  const res = await axiosClient.get<{ documents: Card[] }>(API_URLS.CARDS);
  return res.data.documents;
}

export function useCards() {
  const loaderCards = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof cardLoader>>
  >;

  const {
    data: cards,
    isLoading,
    error,
  } = useQuery<Card[], AxiosError<{ success: boolean; msg: string }>>({
    queryKey: ['cards'],
    queryFn: getCardsAPI,
    staleTime: 5000,
    initialData: loaderCards,
  });

  return { cards, isLoading, error };
}
```

이렇게 하면 제가 원하는 타입에 많이 가까워집니다. 하지만 별로 좋은 방법이 아닙니다. 누군가 API를 변경하면 변경이 바로 반영되지 않을 것입니다.

모든 통신은 axios가 하고 react-query로 추상화하는 방식입니다. error가 발생하면 Axios 에러가 발생할 것이라는 것은 확실하게 알 수 있습니다.

## 해결: isAxiosError 제네릭 활용하기

[React Query and TypeScript - tkdodo 블로그](https://tkdodo.eu/blog/react-query-and-type-script)

일단 에러가 발생하면 모두 unknown으로 처리한다는 치명적인 단점은 언어차원에서 문제입니다. 물론 에러를 값으로 받는 것도 가능합니다. 물론 거짓말을 해야 합니다.

하지만 우리는 타입스크립트보다 타입 상황을 더 잘 알고 있습니다. 캡슐화만 잘하면 문제가 없을 것이라는 거만한 착각을 하고 있지만 괜찮습니다.

```ts
export function useCards() {
  const loaderCards = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof cardLoader>>
  >;

  const {
    data: cards,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['cards'],
    queryFn: getCardsAPI,
    staleTime: 5000,
    initialData: loaderCards,
  });

  console.log(cards, isLoading, error); // Array(3) false null

  return { cards, isLoading, error };
}
```

`console.log`를 확인하면 요청이 성공하면 `error`는 `null`이 됩니다.

```ts
type ErrorResponse = { success: boolean; msg: string };

async function getCardsNewAPI() {
  try {
    const res = await axiosClient.get<{ documents: Card[] }>(API_URLS.CARDS);
    return res.data.documents;
  } catch (error) {
    // highlight-next-line
    if (axios.isAxiosError<ErrorResponse>(error)) throw error.response?.data;
  }
  return [];
}

export function useCardsNew() {
  const loaderCards = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof cardLoader>>
  >;

  const {
    data: cards,
    isLoading,
    error,
    // highlight-next-line
  } = useQuery<Card[], ErrorResponse>({
    queryKey: ['cards'],
    queryFn: getCardsNewAPI,
    staleTime: 5000,
    initialData: loaderCards,
  });

  return { cards, isLoading, error };
}
```

통신할 때 axios를 통해서 처리하기 때문에 `catch`에 `if`문이 반드시 참일 것을 압니다. axios error에 대한 타입을 지정하는 방법입니다.

여기서 동일한 에러 객체를 적용한 이유는 status code를 접근할 필요가 없어서 ErrorResponse로 지정했습니다. 하지만 Status Code도 접근이 필요하면 조금더 넓은 범위의 제네릭으로 지정하면 됩니다.

결국에는 이런 방법을 적용했습니다. `throw`할 때 추출할 것을 미리 뽑고 `error`에서 뽑힌 상태로 뒀습니다.

이렇게 사용하면 `error`에서도 타입지정을 받을 수 있는데 react-query 차원에서 `catch`하는 것이 아니였습니다.

## 학습: react-query가 모든 것을 추상화해주지는 않습니다.

- react-query가 내부에서 catch해주는 것은 아닙니다.
- error또 throw하면 error에 대한 다른 대응이 필요합니다.
  - 나중에 Error Boundaries로 해결하는 것을 보여주겠습니다.
- 여기서 Error가 발생하면 React-Router-DOM의 errorElement에 넣은 컴포넌트가 보입니다.

## 부록

위 예시는 모든 곳에서 타입을 자각하면서 사용하고 있습니다. 사실 별로 좋은 타입 지정이 아닙니다. status code는 생각보다 자주 접근해야 하는 정보입니다. 이럴 때는 `AxiosError<ErrorResponse>` 제네릭을 활용하도록 합니다.

React-Query로 통신에 대해서 추상화를 제공하기 어렵거나 하기 비효율적인 부분들이 있습니다. refresh, loader 내에서 통신할 경우가 해당합니다.

```ts
import { useQuery } from '@tanstack/react-query';
import { cardLoader, cardsQuery } from '@/utils';
import { useLoaderData } from 'react-router-dom';
import type { AxiosError } from 'axios';

export function useCards() {
  const loaderCards = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof cardLoader>>
  >;

  const query = cardsQuery();
  const {
    data: cards,
    isLoading,
    error,
    // highlight-next-line
  } = useQuery<Card[], AxiosError<ErrorResponse>>({
    ...query,
    initialData: loaderCards,
    useErrorBoundary: true,
  });

  return { cards, isLoading, error: error?.response?.data };
}
```

```tsx
import type { AxiosError } from 'axios';
import { Button, CardContainer, DisabledText } from '..';
import { ErrorCardsContainer } from './ErrorCards.style';

type ErrorCardsProps = {
  // highlight-next-line
  error: AxiosError<ErrorResponse>;
  resetErrorBoundary: resetErrorBoundary;
};

export function ErrorCards({ error, resetErrorBoundary }: ErrorCardsProps) {
  return (
    <CardContainer>
      <ErrorCardsContainer>
        <DisabledText>{error.response?.data.msg}</DisabledText>
        <Button onClick={resetErrorBoundary}>Retry</Button>
      </ErrorCardsContainer>
    </CardContainer>
  );
}
```

이렇게 사용하는 이유는 이 Error Boundaries는 loader 내에서 처리하기 때문에 이렇게 지정합니다.

개인적으로 d.ts로 선언하고 다른 엔지니어 모두가 거기서 지정하도록 하는 패턴이 적절해 보입니다.

<!--

## Error Boundaries

### 문제:

산넘어 산입니다. 타입지정 자체는 성공했지만 적절한 에러핸들링이 없습니다.

https://www.youtube.com/watch?v=_FuDMEgIy7I

catch하자마자 바로 throw하기 때문에 Error Boundaries가 필요해졌습니다. 최소한 error 값을 지정할 수 있다는 장점이 있습니다.

### 시도: 라이브러리 없이

### 학습:

- loader에서 요청의 에러가 발생하면 그 상위 errorElement에서 catch하고 랜더링합니다.
  - loader에서 try-catch에서 처리를 안했습니다. 그리고 실패시 react-query에 retch 처리를 어떻게 해야할지 고민입니다.

-->
