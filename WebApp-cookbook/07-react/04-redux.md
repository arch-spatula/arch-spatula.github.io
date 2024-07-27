---
description: '리덕스가 무엇인지 high level로 설명함'
tags: ['react', 'redux', 'introduction']
sidebar_position: 4
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

## 고전 리덕스(Redux)

:::danger 경고

여기서 다루는 Redux는 Toolkit 전입니다. 2023년에는 Redux는 Redux toolkit을 활용하기 바랍니다.

:::

리덕스는 리액트의 상태관리 라이브러리 중 하나로 reducer와 ducks pattern을 결합한 의미를 갖습니다.

리덕스의 몇가지 장점은 중 하나는 하나의 state가 다른 state와 서로 강하게 결합관계를 갖을 수 밖에 없을 때 reducer로 비교적 처리가 수월하게 할 수 있습니다. 다른 하나는 데이터의 흐름이 단방향이라는 장점을 갖습니다.

하지만 단점도 있습니다. 불필요하게 복잡한 state를 만들어 낼 수 있다는 것입니다. ducks pattern으로 하나의 store에서 모든 state를 접근해야 합니다.

이것은 문화권마다 다르지만 미국권에서는 리덕스는 코드 작성량이 많은 것(verbose)도 단점이라고 지적합니다.

### Redux를 사용하는 이유

리덕스의 장점 중 하나는 전역으로 State를 관리할 수 있습니다. 훨씬더 복잡한 앱을 만들 수 있습니다.

리덕스는 state와 props에 대해서 학습의존성을 갖고 있습니다. 리덕스는 상태관리 라이브러리입니다.

기존 리액트는 prop drilling을 했어야 합니다. 실제 프로그램을 만들 때는 부모에서 자식에게 전달할 수 있는 경우는 많지 않습니다. 전역 state로 만들어서 관리하는 라이브러리가 리덕스입니다. 리덕스를 사용하면 중간에 불필요하게 건너가야하는 컴포넌트를 피할 수 있습니다.

리덕스를 사용하는 다른 장점은 전달하기 위해 불필요하게 전달했어야 합니다. 리덕스는 글로벌 state랑 로컬 state로 구분해서 사용할 수 있습니다.

store는 글로벌 state를 보관합니다.

store를 통해서 따로 전달하면 얻는 장점은 2가지 측면입니다. 하나는 랜더링 관점에서 정확히 갱신해야 할 컴포넌트만 State를 주입하기 때문에 불필요한 부모컴포넌트의 랜더링을 막습니다. 다른 측면은 제어 측면입니다. prop drilling을 하면서 관심사와 무관한 props를 읽는 것을 피할 수 있습니다.

### Redux 설정

설치하는 방법입니다. 리액트를 설치하고 난뒤에 다음 명령을 하도록 합니다.

```sh
yarn add redux react-redux
```

```sh
# yarn add redux react-redux 과 같은 의미
yarn add redux
yarn add react-redux
```

`react-redux`는 리액트에서 사용가능하게 서로 연결해주는 패키지입니다.

설치하고 후 `config`, `modules` 폴더를 추가합니다.

```txt
├── src/
│   └── redux/
│       ├── config/
│       │   └── configStore.js
│       └── modules/
│           └── ???.js
├── app.js
└── index.js
```

디렉토리 구조는 이렇게 생겼습니다.

configStore.js는 설정 파일입니다. 전역 상태로 받을 수 있게 해주는 설정 파일입니다.

```js title="configStore.js"
import { createStore } from 'redux';
import { combineReducers } from 'redux';

/**
 * - Action —> Dispatch —> Reducer 순서에서 Reducer를 여기 연결합니다.
 * - Ducks Pattern에서 받을 Reducer들은 모두 여기서 연결됩니다.
 * - 여러 개의 독립적인 reducer의 반환 값은 하나의 상태 객체입니다.
 */
const rootReducer = combineReducers({});

/**
 * - Ducks Pattern에서 접근할 단일 스토어입니다.
 */
const store = createStore(rootReducer);

export default store;
```

modules은 만든 state의 묶음입니다. 모듈을 저장하는 파일입니다.

index.js에서 작성할 코드입니다.

```js
// 원래부터 있던 코드
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// highlight-start
import store from './redux/config/configStore'; // 우리가 추가할 코드
import { Provider } from 'react-redux';
// highlight-end

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //App을 Provider로 감싸주고, configStore에서 export default 한 store를 넣어줍니다.
  // highlight-next-line
  <Provider store={store}>
    <App />
    // highlight-next-line
  </Provider>
);
```

공부하는 방법에 따라다르지만 지금은 사용법을 먼저 공부하고 다음에 원리를 이해한다고 가정하면 내부의 동작원리는 설명은 잠시 보류하겠습니다.

### 예제: Counter App

이번에 만들어볼 예제는 카운터 app입니다.

```js title="src/modules/counter.js"
// 초기 상태값
const initialState = {
  number: 0,
};

// Reducer
const counter = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// 모듈파일에서는 리듀서를 export default 한다.
export default counter;
```

여기서 이렇게 시작합니다.

```txt
├── src/
│   └── redux/
│       ├── config/
│       │   └── configStore.js
│       └── modules/
│           └── ???.js
├── app.js
└── index.js
```

디렉토리 구조는 이렇게 됩니다.

```js
// 초기 상태값
const initialState = {
  number: 0,
};
```

코드 중이 부분은 `useState(0)`의 인자 `0`을 넣은 것과 유사합니다.

참고로 초기상태는 반드시 객체(`{}`)일 필요가 없습니다. 참조형, 원시형 무관합니다.

```js
// Reducer
const counter = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
```

리듀서입니다. 리듀서란 변화를 일으키는 함수입니다. 상태라는 데이터에 최종적으로 쓰기를 하는 함수라고 할 수 있습니다.

```js title="예시"
function Component() {
  const [number, setNumber] = useState(0);

  const onClickHandler = () => {
    setNumber(number + 1); // setState를 이용해서 state 변경
  };

  return <button onClick={onClickHandler}>버튼</button>;
}
```

useState만 활용하면 위처럼 코드를 작성해서 state를 업데이트했습니다.

state는 초깃값 할당이 필요합니다. 그리고 action 매개 변수가 필요합니다.

Redux 속에 Store가 있고 Store 속에는 Reducer가 있습니다. Store 상태를 저장하는 곳입니다.

어떤 액션을 실행하는 것을 보고 디스패치(dispatch)라고 합니다. reducer가 자동실행되고 액션에 해당하는 방식으로 데이터를 수정합니다.

모듈과 store를 연결하는 방법입니다.

```js title="configStore.js"
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import counter from '../modules/counter';

const rootReducer = combineReducers({
  counter,
});
const store = createStore(rootReducer);

export default store;
```

연결여부를 판단할 때는 컴포넌트에서 store를 조회하면 됩니다. redux의 `useSelector` hook을 사용하면 조회할 수 있습니다.

```js title="app.jsx"
import './App.css';
import React from 'react';
import { useSelector } from 'react-redux';

function App() {
  // highlight-start
  const countStore = useSelector((state) => state);
  console.log(countStore); // { counter: { number: 0 } }
  // highlight-end
  return <div className="App"></div>;
}

export default App;
```

`console.log`를 확인하면 이렇게 피드백 주는 것을 확인할 수 있습니다.

데이터가 흐르는 방향입니다.

modules은 기능의 이름을 참고해서 파일을 생성합니다. modules의 데이터를 `configStore.js`에 전달합니다. `configStore.js`에서 호출할 때 redux의 `useSelector` hook으로 접근합니다. state는 모든 모듈의 데이터를 접근할 수 있습니다.

모듈의 구성요소는 initialState, reducer 2가지가 있습니다. 생성하면 store에 연결해야 합니다. `useSelector`로 사용할 컴포넌트에 전달합니다.

### 데이터의 흐름

![리덕스 흐름 도식화](https://user-images.githubusercontent.com/84452145/205887636-7bf7044a-72e3-4cae-ada6-81e2b05a06f5.gif)

위 이미지는 서버와 통신까지 포함하고 있습니다. 하지만 우리의 예시에서는 통신은 잠시 보류하겠습니다.

1. 사용자는 ui와 어떤 상호작용(이벤트)을 합니다.
2. dispatch에서 action이 일어나게 됩니다.
3. action에 의한 reducer 함수가 실행되기 전에 middleware가 동작합니다.
4. middleware에서 요청한 수행 이후 reducer함수를 실행합니다.
5. reducer의 실행결과 store에 새로운 값을 저장합니다.
6. store의 state에 subscribe하고 있던 ui에 변경된 값을 줍니다.

이 순서에서 3, 4는 나중에 배웁니다.

리덕스에는 dispatch, reducer 같은 다양한 중간단계가 있습니다. 중요한 개념들입니다.

<!-- 다시 말하지만 setter 함수처럼 값을 업데이트하는 부분은 reducer에서 진행합니다. -->

글로벌 state는 어디서나 접근할 수 있기 때문에 접근하기 쉬운 만큼 변경도 쉽습니다.

글로벌 state를 변경하는 함수는 reducer함수이고 그리고 이 함수를 실행하는 것을 보고 action입니다. action 객체를 통해 접근하고 실행합니다.

action객체를 사용할 때는 지켜야할 규칙이 있습니다. `{type: 명령}`처럼 생긴 것이 액션 객체입니다. 이 액션객체는 반드시 `type`이라는 명령할 때는 `key`를 가져야 합니다.

```js
const counter = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
```

그 이유는 이렇게 생긴 reducer를 보면 바로 알 수 있습니다.

`useDispatch` redux hook으로 제어할 수 있습니다.

```js title="App.js"
import './App.css';
import React from 'react';
// highlight-next-line
import { useDispatch } from 'react-redux';

function App() {
  // highlight-next-line
  const dispatch = useDispatch();

  const handlePlusOne = () => {
    // highlight-next-line
    dispatch({ type: 'plusOne' });
  };

  return (
    <div className="App">
      <button onClick={handlePlusOne}>+1</button>
    </div>
  );
}

export default App;
```

```js title="src/modules/counter.js"
const initialState = {
  number: 0,
};

const counter = (state = initialState, action) => {
  // highlight-next-line
  console.log(action, state); // { type: 'plusOne' }, { number: 0 }
  switch (action.type) {
    // highlight-start
    case 'plusOne':
      return { number: state.number + 1 };
    // highlight-end
    default:
      return state;
  }
};

export default counter;
```

이렇게 state를 업데이트할 수 있습니다.

```js
import './App.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  // highlight-next-line
  const countStore = useSelector((state) => state.counter.number);

  const handlePlusOne = () => {
    dispatch({ type: 'plusOne' });
  };

  return (
    <div className="App">
      <h2>{countStore}</h2>
      <button
        onClick={() => {
          dispatch({ type: 'plusOne' });
        }}
      >
        +1
      </button>
    </div>
  );
}

export default App;
```

UI에는 반영을 이렇게 보여줄 수 있습니다.

`useState`처럼 `useSelector`가 참조하고 있는 컴포넌트도 모두 리랜더링됩니다. useSelector에서 정확히 무엇을 구독할지 잘 지정해주도록 합니다. 컨벤션상 구독도 modules에서 무엇을 어떻게 구독할지 정하는 경우도 많습니다.

반대로 빼기도 직접 구현해보기 바랍니다.

```js title="src/modules/counter.js"
const initialState = {
  number: 0,
};

const counter = (state = initialState, action) => {
  switch (action.type) {
    case 'plusOne':
      return { number: state.number + 1 };
    case 'minusOne':
      return { number: state.number - 1 };
    default:
      return state;
  }
};

export default counter;
```

```js
import './App.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const countStore = useSelector((state) => state.counter.number);

  const handlePlusOne = () => {
    dispatch({ type: 'plusOne' });
  };
  const handleMinusOne = () => {
    dispatch({ type: 'minusOne' });
  };

  return (
    <div className="App">
      <h2>{countStore}</h2>
      <button onClick={handlePlusOne}>+1</button>
      <button onClick={handleMinusOne}>-1</button>
    </div>
  );
}

export default App;
```

- 액션객체란, 반드시 `type`이란 `key`를 가져야 하는 객체입니다. 또한 reducer로 보낼 `명령`입니다.
- 디스패치란, 액션객체를 리듀서로 보내는 `전달자` 함수입니다.
- 리듀서란, 디스패치를 통해 전달받은 액션객체를 검사하고, 조건이 일치했을 때 `state`를 업데이트하는 함수입니다.
- 디스패치(dispatch)를 사용하기위해서는 `useDispatch()` 라는 훅을 이용해야 합니다.
  - 디스패치는 스토어의 내장함수 중 하나입니다.
  - 우선, 디스패치는 액션을 발생 시키는 것 정도로 이해하시면 됩니다.
  - `dispatch` 라는 함수에는 액션을 파라미터로 전달합니다(예: `dispatch(action)`).
- 액션객체 `type`의 `value`는 상수의 식별자로 작성합니다(예: `{type: "PLUS_ONE"}`). 따라서 위 코드의 카멜케이스(camelCase)에서 어퍼스네이크(UPPER_CASE) 케이스로 작성해야 올바릅니다.

### Action Creator

Action Creator입니다. action 객체를 지금까지 하드코딩을 많이 했습니다. 액션 객체를 여러곳에 만들었지만 만약에 수정해야 한다면 큰일날 수 있습니다. 현실에서는 더욱더 복잡한 프로젝트에서 다룰 것이기 때문에 알아야합니다.

액션객체를 한곳에서 관리할 것입니다. 함수와 action value 상수를 이용해서 만듭니다.

action 객체를 만드는 것이 함수의 기능입니다.

```js title="src/modules/counter.js"
// highlight-start
// 액션 value를 상수들로 만들어 줍니다. 보통 이렇게 한곳에 모여있습니다.
const PLUS_ONE = 'PLUS_ONE';
const MINUS_ONE = 'MINUS_ONE';
// highlight-end

// highlight-start
// Action Creator를 만들어 줍니다.
export const plusOne = () => {
  return {
    type: PLUS_ONE,
  };
};

export const minusOne = () => {
  return {
    type: MINUS_ONE,
  };
};
// highlight-end

const initialState = {
  number: 0,
};

const counter = (state = initialState, action) => {
  switch (action.type) {
    // highlight-next-line
    case PLUS_ONE: // case에서도 문자열이 아닌, 위에서 선언한 상수를 넣어줍니다.
      return {
        number: state.number + 1,
      };
    // highlight-next-line
    case MINUS_ONE: // case에서도 문자열이 아닌, 위에서 선언한 상수를 넣어줍니다.
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
};

export default counter;
```

컴포넌트에서 사용하는 방법은 간단합니다.

먼저 액션함수는 export되어 있어야 합니다. 반대로 사용할 때는 import하면 됩니다.

```js title="src/App.js"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// highlight-start
// 사용할 Action creator를 import 합니다.
import { minusOne, plusOne } from './redux/modules/counter';
// highlight-end

const App = () => {
  const dispatch = useDispatch();
  const countStore = useSelector((state) => state.counter.number);

  const handlePlusOne = () => {
    dispatch(plusOne()); // 액션객체를 Action creator로 변경합니다.
  };
  const handleMinusOne = () => {
    dispatch(minusOne()); // 액션객체를 Action creator로 변경합니다.
  };

  return (
    <div>
      {countStore}
      <button onClick={handlePlusOne}>+ 1</button>
      <button onClick={handleMinusOne}>- 1</button>
    </div>
  );
};

export default App;
```

위 코드를 보면 이전 `dispatch`의 인자로 함수를 넣었습니다. 당연히 함수의 반환값인 객체를 대입하게 된 것입니다.

Action creator를 사용하면 상당히 큰 장점이 있습니다.

1. 오타확인하기 좋습니다. 자동완성으로 사용했던 액션의 이름을 볼 수 있습니다.
2. 유지보수하기도 좋습니다. 하나의 추상화로 전역으로 수정하기 용이합니다.
3. 문서의 역할도 합니다. 어떤 액션을 수행하게 될지 알 수 있습니다.

### Payload

Payload입니다. 액션객체에 담아 보내는 데이터를 보고 Payload라고 합니다. 주로 사용자가 조금더 복잡한 액션을 취할 때 사용합니다. 예를 들어 이전 카운터는 1단위로 더하고 빼고를 제어했지만 이제는 사용자가 단위를 정할 수 있게 해줍니다.

```js
// payload가 추가된 액션객체

{type: "ADD_NUMBER", payload: 10} // type뿐만 아니라 payload라는 key와 value를 같이 담는다.
```

리덕스는 유연한 라이브러리라 `payload`이외 용어로도 보낼 수 있습니다. 그래서 `type` 이외는 원하는 키를 사용해도 됩니다. `payload`를 사용하는 이유는 컨벤션 때문입니다.

나중에 혼자 한번에 진행해보도록 합니다.

```js title="src/redux/modules/counter.js"
// Action Value
const ADD_NUMBER = 'ADD_NUMBER';
const SUBTRACT_NUMBER = 'SUBTRACT_NUMBER';

// Action Creator
// highlight-start
export const addNumber = (payload) => {
  return { type: ADD_NUMBER, payload };
  // highlight-end
};

// highlight-start
export const subtractNumber = (payload) => {
  return { type: SUBTRACT_NUMBER, payload };
  // highlight-end
};

// Initial State
const initialState = {
  number: 0,
};

// Reducer
const counter = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NUMBER:
      return { number: state.number + action.payload };
    case SUBTRACT_NUMBER:
      return { number: state.number - action.payload };
    default:
      return state;
  }
};

// export default reducer
export default counter;
```

payload를 포함한 전형적인 형태입니다.

```js title="app.js"
import React, { useState } from 'react';
import { addNumber, subtractNumber } from './redux/modules/counter';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const [num, setNum] = useState(0);
  const globalNumber = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();

  const handleChangeText = (event) => {
    const { value } = event.target;
    setNum(+value);
  };
  const onClickAddNumberHandler = () => {
    dispatch(addNumber(num));
  };
  const onClickSubtractNumberHandler = () => {
    dispatch(subtractNumber(num));
  };

  return (
    <div className="App">
      <h2>{globalNumber}</h2>
      <button onClick={onClickSubtractNumberHandler}>-</button>
      <input type="number" onChange={handleChangeText} value={num} />
      <button onClick={onClickAddNumberHandler}>+</button>
    </div>
  );
}

export default App;
```

리덕스를 사용하기 위해서는 모든 구성요소를 만들어야 합니다. 구성요소를 만드는 패턴이 존재합니다. 이 강의는 Ducks 패턴으로 작성한 것입니다.

1. Reducer 함수를 `export default` 합니다.

2. Action creator 함수들을 `export` 합니다.

3. Action type은 `app/reducer/ACTION_TYPE` 형태로 작성합니다.

리덕스 작성 패턴의 고전이라고 많이 알고 있습니다.

[Ducks Pattern 소개 리포](https://github.com/erikras/ducks-modular-redux)

이외 flux 패턴이라는 것도 존재합니다.

### Ducks Pattern이란 무엇인가?

Ducks Pattern이란 하나의 Store에 모든 state을 보관하는 패턴을 말합니다. 몰어 넣는다는 것이 중요한 특징입니다.

### 상태관리 라이브러리는 왜 사용해야 하는가?

상태관리 라이브러리를 사용하는 이유는 성능측면과 프로그래머의 제어측면 2가지로 볼 수 있습니다.

컴포넌트의 Props에 갱신이 있으면 그 자식컴포넌트도 리랜더링 됩니다. 하지만 자식 중 특정 부분만 갱신되는데 모두 리랜더링한다는 것이 비효율적입니다. 하지만 자식 컴포넌트가 context에서 독립적으로 state를 갖고 있으면 해당하는 자식만 갱신할 수 있습니다.

제어측면에서도 좋습니다. props drilling으로 구현하게 되면 개발자의 관심과 무관하게 받고 주입해줘야 하는 data들이 많아집니다. 특정 props를 바꿀 때 조심성이 더 필요하고 리팩토링을 위한 노력이 더 많이 필요해집니다. 이것을 보고 코드 결합도가 높아졌다고 합니다. 하지만 상태관리 라이브러리의 hook에서 상태를 접근하게 만들면 결합도를 낮출 수 있습니다. 원하는 곳에서 호출로 상태를 주입해주면 되기 때문입니다.

참고로 상태관리 라이브러리 없이 props drilling을 피할 수 있습니다. React가 지원하는 Context API를 활용하면 됩니다. 하지만 리랜더링 문제가 발생하기 상당히 쉽습니다.

<!-- 

## Redux Saga

리덕스가 통신하는 하나의 방법입니다.

-->

## 리덕스 관련된 이런저런 용어

React Redux: Redux를 React 많이 사용하지만 React가 아닌 라이브러리에도 활용합니다.

- React 용이 아닌 다른 라이브러릴 위한 Redux도 지원합니다.

Store: Redux의 모든 상태는 Store에 보관하고 접근합니다.

- Store는 Module, Slice를 주입받습니다.

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

InitState: 초기 상태를 의미합니다.

```js
// 초기 상태값
const initialState = {
  number: 0,
};
```

Reducer: Store를 직접 갱신하는 함수입니다.

```js
// 리듀서
const counter = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
```

Module: State와 Reducer를 보관하는 단위입니다.

- Action Type, Action Creator, Reducer로 구현합니다.

<!-- Saga: -->

Slice: State와 Reducer를 보관하는 단위입니다.

- Reducer와 Action으로 만듭니다.
- Action Type, Action Creator를 내부적으로 만들어줍니다.

Persist: 웹 스토리지에 저장한 Redux 상태를 말합니다.

<!-- Middleware: -->

<!-- Thunk: -->

<!-- Builder Pattern: -->

RTK-Query: Redux에 ducks pattern과 Reducer pattern을 유지하면서 활용할 수 있는 서버 상태 라이브러입니다.

Zustand: Redux
