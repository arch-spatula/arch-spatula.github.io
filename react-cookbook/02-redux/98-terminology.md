---
description: '리덕스 관련된 이런저런 용어'
tags: ['react', 'redux', 'error']
sidebar_position: 98
draft: true
---

# 리덕스 관련된 이런저런 용어

React Redux: Redux를 React 많이 사용하지만 React가 아닌 라이브러리에도 활용합니다.

- React 용이 아닌 다른 라이브러릴 위한 Redux도 지원합니다.

Store: Redux의 모든 상태는 Store에 보관하고 접근합니다.

Provider: 컴포넌트 트리에 상태를 접근 가능하도록 주입하는 컴포넌트입니다.

- Redux 고유용어가 아닙니다. 하지만 Redux를 통해 처음배우는 경우가 많아 설명합니다.

Ducks pattern: 모든 상태를 Store에 담고 Store에 접근하는 패턴입니다.

Subscribe: Store 있는 데이터의 상태변화를 읽는 것을 말합니다.

Dispatch: Store에 데이터를 갱신해달라고 요청입니다.

Payload: Store에 넘겨줄 데이터를 말합니다.

Action: Reducer에 갱신하는 방식을 선택합니다.

```js
const ACTION_TYPE = 'ACTION_TYPE';

const actionCreator = (payload) => {
  return { type: ACTION_TYPE, payload: payload };
};
```

Action Type: Action Type은 실행할 Reducer의 종류를 고릅니다. 문자열로 정의합니다. 이름과 값이 동일합니다. 또 상수로 표현합니다.

Action Creator: Action Type은 직접 사용하지 않습니다. Action Creator 함수를 호출해서 활용합니다.

Reducer: Store를 직접 갱신하는 함수입니다.

<!-- Module: -->

Slice: State와 Reducer를 보관하는 단위입니다.

InitState: 초기 상태를 의미합니다.

Persist: 웹 스토리지에 저장한 Redux 상태를 말합니다.

<!-- Middleware: -->

<!-- Thunk: -->

<!-- Builder Pattern: -->

RTK-Query: Redux에 ducks pattern과 Reducer pattern을 유지하면서 활용할 수 있는 서버 상태 라이브러입니다.

<!-- Saga: -->
