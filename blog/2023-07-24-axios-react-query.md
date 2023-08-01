---
title: 'axios, react-query 타입지정'
authors: [arch-spatula]
tags: ['typescript', 'react-query', 'axios', 'error log']
description: '????'
toc_max_heading_level: 6
draft: true
---

# axios, react-query 타입지정

<!--truncate-->

### 문제: 타입지정에 혼란이 많습니다.

error타입을 활용하지 못하고 있습니다. error가 발생하면 react-query는 재요청을 하도록 합니다. 성공상태에서 재요청도 가능하지만 그것은 낭비이고 라이브러리의 장점을 활용하지 못하는 것입니다. 조금더 올바르고 정교한 에러처리방법을 적용하고자 이 문제를 풀어봅니다. 통신이 실패하면 react-query에게 통신이 실패했다고 throw로 알려줄 것입니다.

성공에 대한 타입과 실패에 대한 타입으 서버에서 구체적으로 정해져있는데 클라이언트도 같이 구체적으로 정의해야 합니다.

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

저는 try-catch를 axios 내부에서 제공하고 있었습니다. 그래서 모두 성공으로 간주하고 있었습니다. promise에 throw하면 error로 간주하게 만들 수 있습니다.

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

타입은 이렇게 지정되어 있습니다. 여기서 `error`의 `unknown`과 cards의 `undefined` 2가지 문제가 있습니다.

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

### 시도

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
  error;

  return { cards, isLoading, error };
}
```

이렇게 하면 제가 원하는 타입에 많이 가까워집니다. 하지만 별로 좋은 방법이 아닙니다. 누군가 API를 변경하면 변경이 바로 반영되지 않을 것입니다.

모든 통신은 axios가 하고 react-query로 추상화하는 방식입니다. error가 발생하면 Axios 에러가 발생할 것이라는 것은 확실하게 알 수 있습니다.

### 해결

https://tkdodo.eu/blog/react-query-and-type-script

https://tkdodo.eu/blog/react-query-fa-qs#why-do-i-not-get-errors-

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

console.log를 확인하면 요청이 성공하면 error는 null이 됩니다.

```ts
type ErrorResponse = { success: boolean; msg: string };

async function getCardsNewAPI() {
  try {
    const res = await axiosClient.get<{ documents: Card[] }>(API_URLS.CARDS);
    return res.data.documents;
  } catch (error) {
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
  } = useQuery<Card[], ErrorResponse>({
    queryKey: ['cards'],
    queryFn: getCardsNewAPI,
    staleTime: 5000,
    initialData: loaderCards,
  });

  return { cards, isLoading, error };
}
```

결국에는 이런 방법을 적용했습니다. throw할 때 추출할 것을 미리 뽑고 error에서 뽑힌 상태로 뒀습니다.

이렇게 사용하면 error에서도 타입지정을 받을 수 있는데 react-query 차원에서 catch하는 것이 아니였습니다.

### 학습:

react-query가 내부에서 catch해주는 것은 아닙니다.

## Error Boundaries

### 문제:

산넘어 산입니다. 타입지정 자체는 성공했지만 적절한 에러핸들링이 없습니다.

https://www.youtube.com/watch?v=_FuDMEgIy7I

catch하자마자 바로 throw하기 때문에 Error Boundaries가 필요해졌습니다. 최소한 error 값을 지정할 수 있다는 장점이 있습니다.

### 시도: 라이브러리 없이

### 학습:

- loader에서 요청의 에러가 발생하면 그 상위 errorElement에서 catch하고 랜더링합니다.
  - loader에서 try-catch에서 처리를 안했습니다. 그리고 실패시 react-query에 retch 처리를 어떻게 해야할지 고민입니다.
