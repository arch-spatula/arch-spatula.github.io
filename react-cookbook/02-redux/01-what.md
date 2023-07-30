---
description: '리덕스가 무엇인지 high level로 설명함'
tags: ['react', 'redux', 'introduction']
sidebar_position: 1
---

:::caution 주의

리덕스를 따로 다루는 이유는 리덕스는 리액트 엔지니어의 상태관리 라이브러리의 헤게모니를 완전히 장악했기 때문에 다룹니다. 과거에는 리액트 엔지니어에게 상태관리 문제를 해결하는 실버불릿으로 통했습니다. 지금도 그렇게 통하는 곳이 많습니다.

하지만 저는 2023년 지금 시점에 새로운 프로젝트를 만드는 입장에서는 그렇게 매력적이지 않습니다. 이미 만들어진 프로젝트이고 전환비용이 너무 크다면 이해할 수 있습니다.

:::

# 리덕스란 무엇인가?

Redux는 Reducer와 Ducks Pattern의 합성어입니다.

## Reducer란 무엇인가?

리액트의 useReducer는 특정 상황에 따라 특정 방식으로 state를 갱신하는 hook입니다. 하지만 React에만 있는 것이 아닙니다.

```tsx
const initialState = { count: 0 };

function reducer(
  state: { count: number },
  action: { type: 'increment' | 'decrement' }
) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleIncrement = () => dispatch({ type: 'decrement' });
  const handleDecrement = () => dispatch({ type: 'decrement' });
  return (
    <div>
      Count: {state.count}
      <button onClick={handleIncrement}>-</button>
      <button onClick={handleDecrement}>+</button>
    </div>
  );
}
```

과거 리액트 공식 문서에서 가져온 useReducer 예시입니다. 사실 useState에 handler hook에서 갱신하는 방식을 설정하고 처리할 수 있습니다. 하지만 이렇게 useReducer를 활용하면 더 많은 복잡성을 수용할 수 있습니다. 보통 처음보면 혼란스러울 것입니다. 하지만 나중에 리팩토링하면서 useState를 정리할 때 많이 활용해볼 수 있는 hook이 될 것입니다.

```js
total = [0, 1, 2, 3].reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);
```

JavaScript Array의 reduce 메서드입니다. 많은 경우 총합을 구할 때 많이 활용하지만 여기서 하나의 값으로 합쳐집니다.

<!-- ![](https://user-images.githubusercontent.com/84452145/253721205-41ed3a08-fe21-4ce9-b70a-4249918ee8ab.png) -->

<!-- 함수형 프로그래밍에서는 하나로 합친다는 의미로 -->

## Ducks Pattern이란 무엇인가?

Ducks Pattern이란 하나의 Store에 모든 state을 보관하는 패턴을 말합니다. 몰어 넣는다는 것이 중요한 특징입니다.

## 상태관리 라이브러리는 왜 사용해야 하는가?

상태관리 라이브러리를 사용하는 이유는 성능측면과 프로그래머의 제어측면 2가지로 볼 수 있습니다.

컴포넌트의 Props에 갱신이 있으면 그 자식컴포넌트도 리랜더링 됩니다. 하지만 자식 중 특정 부분만 갱신되는데 모두 리랜더링한다는 것이 비효율적입니다. 하지만 자식 컴포넌트가 context에서 독립적으로 state를 갖고 있으면 해당하는 자식만 갱신할 수 있습니다.

제어측면에서도 좋습니다. props drilling으로 구현하게 되면 개발자의 관심과 무관하게 받고 주입해줘야 하는 data들이 많아집니다. 특정 props를 바꿀 때 조심성이 더 필요하고 리팩토링을 위한 노력이 더 많이 필요해집니다. 이것을 보고 코드 결합도가 높아졌다고 합니다. 하지만 상태관리 라이브러리의 hook에서 상태를 접근하게 만들면 결합도를 낮출 수 있습니다. 원하는 곳에서 호출로 상태를 주입해주면 되기 때문입니다.

참고로 상태관리 라이브러리 없이 props drilling을 피할 수 있습니다. React가 지원하는 Context API를 활용하면 됩니다. 하지만 리랜더링 문제가 발생하기 상당히 쉽습니다.
