---
description: '리액트 면접질문'
tags: ['react', '면접질문']
sidebar_position: 14
draft: true
---

# 리액트 면접질문

<details>
<summary>useRef가 필요한 상황을 예시를 들어 설명해주세요</summary>
<div markdown="1">

답변일자: 2023.04.04.

- 가장 많이 useRef를 사용했던 경우는 JSX에서 DOM을 선택하는 경우였습니다. hook의 본래 의도는 아닙니다. 하지만 많이 사용하면서 정착하게 되었습니다.
- 리액트의 라이프사이클의 영향을 받지 않고 값을 저장해야 할 때 활용합니다. 즉 값이 Props, State가 아닌 값으로 보관해서 갱신되어도 리렌더링을 시키지 않기 위해 활용합니다.
- DOM 노드의 위치나 크기를 측정하기 위해 활용합니다.
- 참고로 어떤 활용이든 Ref를 접미어로 붙이는 것이 컨벤션은 동일합니다.

1. DOM Ref

리액트를 처음배우고 DOM을 조작하고 제어할 때 활용하는 방식입니다.

```tsx
import { useRef, useEffect } from 'react';

export const DomRef = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <input type="text" ref={inputRef} />
    </div>
  );
};
```

이렇게 DOM 선택을 할 수 있습니다.

참고로 custom hook으로 활용하기 위해 특정 DOM만 선택가능하도록 제네릭도 활용할 수 있습니다.

```tsx
import { useRef, useEffect } from 'react';

export const DomRef = () => {
  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <input type="text" ref={inputRef} />
    </div>
  );
};
```

이렇게 하면 오직 input만 지정할 수 있게 만들 수 있습니다.

원래 의도한 활용법은 리액트의 라이프사이클과 무관하게 값을 저장하고 갱신하기 위함입니다.

2. MutableRef

라이프사이클과 무관하고 갱신이 리렌더링을 시키는 것을 방지할 때 활용하는 방법입니다.

```ts
import { useRef, useEffect } from 'react';

export const App = () => {
  const numRef = useRef<string | null>(null);
  useEffect(() => {
    const todoItem = fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((json) => console.log(json));
    numRef.current.value = todoItem.id;
  }, []);
  return <div>{numRef.current}</div>;
};
```

useRef로 만든 인스턴스의 current에 useEffect 콜백함수 안에 있는 값을 참조시켜서 외부로 가져오는 방법으로 활용하는 것도 가능합니다.

```tsx
import { useState, useRef, useEffect } from 'react';

export const MutableRef = () => {
  const [timer, setTimer] = useState(0);
  const interValRef = useRef<number | null>(null);

  const stopTimer = () => {
    if (interValRef.current) window.clearInterval(interValRef.current);
  };

  useEffect(() => {
    interValRef.current = window.setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div>
      HookTimer - {timer} -{' '}
      <button onClick={() => stopTimer()}>Stop Timer</button>
    </div>
  );
};
```

`MutableRef`는 각각의 적절한 타입을 지정합니다. 이경우는 `number`를 타입으로 지정해줘야 합니다.

이런식으로 `useEffect`로 부터 자유롭게 값을 할 당할 수 있습니다.

```js
function CounterKai() {
  const counter = useRef(0);
  useEffect(() => {
    const timer = setInterval(() => {
      counter.current += 1;
    }, 1000);
    return () => {
      clearInterval(timer);
      alert('<CounterKai/>:', counter.current);
    };
  }, []);
  return (
    <div>
      <p>{counter.current}</p>
    </div>
  );
}
```

감이 잘 안 온다면 인터넷에서 찾은 다른 예시입니다.

[React Hooks useEffect를 쓸 때, useState vs useRef (feat.closure)](https://cereme.dev/frontend/react-hooks-useeffect-useref-feat-closure/)

3. Callback Ref

DOM Ref는 DOM을 동작시키고 쓰기(write)작업과 비슷합니다. Callback Ref는 DOM을 읽을 때 활용합니다. 또 useRef hook을 사용하는 것이 아니라 useCallback hook을 활용하기 때문에 useRef를 사용한 경우라고 볼 수 없습니다. 하지만 Ref 개념을 다룰 때는 같이 알아야 하는 것 중 하나입니다.

```js
function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
}
```

4. 결론

- useRef는 DOM을 조작하고 제어할 때 활용하는 DOMRef의 경우가 있습니다.
- 라이프사이클과 무관하게 데이터를 보관하기 위해 MutableRef가 존재합니다.
- useRef를 활용하는 경우가 아니지만 DOM 측정을 위해 활용하는 Callback Ref로 DOM의 변화를 감지할 수 있습니다. DOM을 참조한다는 측면에서 같이 알아 둬야 합니다.

---

[이화랑 블로그 - React useRef의 다양한 활용 방법(mutable object, callback ref와 forwardRef)](https://leehwarang.github.io/2020/11/29/ref.html)

[cereme.dev - React Hooks useEffect를 쓸 때, useState vs useRef (feat.closure)](https://cereme.dev/frontend/react-hooks-useeffect-useref-feat-closure/)

[Codevolution - React TypeScript Tutorial - 16 - useRef Hook](https://www.youtube.com/watch?v=hA4i1RTbZ2A)

[전 리액트 공식문서 - 콜백 ref](https://ko.reactjs.org/docs/refs-and-the-dom.html#callback-refs)

[전 리액트 공식문서 - DOM 노드를 측정하려면 어떻게 해야 합니까?](https://ko.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node)

</div>
</details>

<details>
<summary>React의 state와 props에 대해서 설명해주세요.</summary>
<div markdown="1">

React의 State와 Props는 리액트가 리렌더링을 위해 참조하는 데이터입니다. 하지만 그 이외에는 차이가 없습니다. 먼저 State는 그 해당하는 컴포넌트가 갖고 있는 값입니다. useState hook을 사용해서 값을 생성하고 useState의 setter함수를 실행해서 값을 갱신할 수 있습니다. 또 이 setter함수가 실행되었다는 것 자체가 리렌더링 트리거로 화면상 보일 UI를 갱신할 수 있습니다. Props는 DOM트리에서 부모 컴포넌트가 갖고 있는 데이터를 자식 컴포넌트로 전달하는 값에 불과합니다. Props도 다양한 상황에 따라 갱신될 수 있습니다. Props에 갱신이 발생하면 리렌더링의 트리거로 UI를 갱신합니다.

state는 넓은 의미를 갖을수도 있습니다. local state는 컴포넌트가 독립적으로 활용하거나 global state로 다른 컴포넌트에 호출하고 참조하거나 서버로 부터 통신의 진행 상태를 보여주는 server state 등 다양한 값이 될 수 있습니다. 또 모든 state는 서버에 저장할 필요는 없습니다. 일부 state는 화면상 상호작용하기 위한 정보만 담기 위한 state도 존재합니다. 하지만 대부분의 state는 서버에서 가져온 데이터고 mutation 요청에 따라 갱신될 수 있습니다.

<details>
<summary>State란 무엇인가?</summary>
<div markdown="2">

답변일자: 2023.04.05.

State란 정확히는 화면에 보이는 컴포넌트에 한정된 인스턴스에 불과합니다. 인스턴스란 클래스로 생성하는 구체적인 하나의 객체입니다. 그리고 이 객체는 값 그자체가 getter이고 두번째 배열에서 나오는 set을 접두어로 붙이는 함수가 setter입니다.

> State is local to a component instance on the screen.
>
> -react.dev

하지만 모델을 뷰에 반영시키는 데이터 중 하나라는 정의가 개인적으로 더 와닿았습니다.

</div>
</details>

---

[State is isolated and private](https://react.dev/learn/state-a-components-memory#state-is-isolated-and-private)

</div>
</details>

<details>
<summary>Redux 상태관리의 주요 개념들과 연결 관계를 설명해주세요. 다른 상태관리 도구와 비교 설명 해주세요.</summary>
<div markdown="1">

답변일자: 2023.04.06.

Redux 상태관리의 주요 개념들과 연결 관계를 설명해주세요. 다른 상태관리 도구와 비교 설명 해주세요.

핵심용어: action(type, function), dispatcher, store, selector, slice, reducer, payload, state, subscribe, Builder, Middleware, Thunk

Redux의 상태관리 라이브러리로 2가지 패턴을 갖고 있습니다. ducks 패턴과 flux 패턴입니다.

ducks 패턴은 Redux가 하나의 통합된 Store에서 State를 관리하는 패턴을 의미합니다. ~~개인적으로는 패턴보단 독선이라고 생각합니다.~~ 각설하고 중요한 점은 단일 모듈 즉 모든 길이 로마로 향하듯이 모든 State는 Store에 담습니다. Store 모듈 하나 안에 모두 담으면 생기는 장점은 다른 모듈과 충돌이 없어진다는 점입니다. 또 유지보수하고 확장하기 유리합니다. RTK와 Zustand를 기준으로 이제는 slice만 추가하는 확장을 해주면 됩니다. 특이한 점은 RTK-Query도 Store에 담습니다. ducks 패턴은 프로그램을 구성하는 방식에 대한 패턴입니다.

flux 패턴은 State가 단방향으로 흐르도록 하는 패턴입니다. 리덕스에는 Redux의 모듈(module)과 RTK의 슬라이스(slice)가 있습니다. 모두 논하겠습니다.

Redux의 모듈(module)의 경우 경우 Store 모듈에 모든 reducer를 결합시킵니다. Store에는 rootReducer를 위치시키고 combineReducers로 하나로 통합한 뒤에 createStore로 보관합니다. 그리고 전역상태로 관리할 reducer와 initial state를 만들고 state 갱신을 제어할 action을 만듭니다. action은 action value인 상수와 action creator 함수를 만듭니다. 또 action creator는 렉시컬 환경에 있는 action value를 참조하고 반환합니다. 만약에 dispatch할 컴포넌트에서 payload를 store로 전달해야 할 상황에는 객체를 반환하도록 합니다. 또 이 객체는 type을 키로 action value를 값으로 하고 payload를 객체 키의 식별자와 매개변수 식별자가 같아 단축구문으로 표기합니다. 또 selector 함수도 만들어 구독을 쉽게 해줄 수 있게 해줍니다. store에 있는 값을 읽기만 하는 행위를 보고 구독(subscribe)이라고 합니다. 반대로 값을 갱신할 때는 action creator와 dispatcher를 호출해야 합니다. dispatcher는 action creator를 담을 Middleware 함수입니다. dispatcher로 action creator를 전달하고 action creator로 action value로 실행시키려는 reducer의 type을 고르고 실행합니다. reducer의 action type에 해당하느 state가 갱신되고 그 state를 store에서 구독하던 모든 컴포넌트는 해당 갱신을 화면에 반영합니다.

RTK의 슬라이스(slice)의 경우 모듈이 슬라이스로 바뀐 것입니다. 더 간소해지고 서버통신을 위해 thunk도 지원했었고 현재는 RTK-Query를 지원하고 있습니다. 제일먼저 하는 것은 store를 만드는 것입니다. store는 configureStore에 reducer를 보관할 객체를 대입하면 됩니다. reducer를 키로하고 객체를 값으로 합니다. 객체를 값으로할 때 거기에 슬라이스에 해당하는 reducer를 넣으면 됩니다. 슬라이스를 만들 때는 initial state를 만들고 슬라이스를 만듭니다. createSlice 안에 객체를 대입하면 됩니다. action creator, action value는 name의 값으로 대체됩니다. initialState는 단축표기로 대입합니다. reducers에는 실행시킬 메서드를 담은 객체를 대입합니다. 객체의 메서드 이름은 createSlice의 action 프로퍼티를 객체 구조분해 할당으로 유출시킬 수 있습니다. 이 메서드 이름을 dispatcher에 대입해서 사용합니다. 또 통신과 관련될 경우 extraReducers 프로퍼티를 슬라이스 객체에 추가합니다. extraReducers는 빌더 표기법으로 thunk 함수를 작성합니다. thunk 함수는 고유한 키를 갖은 문자열을 대입하고 비동기 통신함수를 대입합니다. 비동기 통신함수는 payload와 thunkAPI를 매개변수로 갖는 함수입니다. 그리고 반환값은 thunkAPI의 프로퍼티별로 통신 상태에 따라 대입하면 됩니다. 또 구독을 위해 selector 함수도 만드는 것도 동일합니다. 또 dispatch할 때는 비동기는 thunk 함수를 동기는 슬라이스의 액션함수를 대입합니다.

다른 상태관리 도구는 도구별로 접근방법이 다 다릅니다. recoil, jotai의 경우 atom을 만들고 읽고 쓰기로 원자화된 상태관리를 합니다. 또 다른 아키텍쳐를 구성하는 전략으로 server state로 React-Query, SWR, apollo client와 간소한 client state(local state & globe state)로 context API, Jotai, Zustand와 조합해 사용하는 경우도 있습니다.

</div>
</details>
