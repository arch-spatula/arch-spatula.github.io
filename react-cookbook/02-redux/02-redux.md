---
description: 'Redux 예시'
tags: ['react', 'redux', 'redux classic']
sidebar_position: 2
draft: true
---

# 리덕스(Redux)

:::danger 경고

여기서 다루는 Redux는 Toolkit 전입니다.

:::

리덕스는 리액트의 상태관리 라이브러리 중 하나로 reducer와 ducks pattern을 결합한 의미를 갖습니다.

리덕스의 몇가지 장점은 중 하나는 하나의 state가 다른 state와 서로 강하게 결합관계를 갖을 수 밖에 없을 때 reducer로 비교적 처리가 수월하게 할 수 있습니다. 다른 하나는 데이터의 흐름이 단방향이라는 장점을 갖습니다.

하지만 단점도 있습니다. 불필요하게 복잡한 state를 만들어 낼 수 있다는 것입니다. ducks pattern으로 하나의 store에서 모든 state를 접근해야 합니다.

이것은 문화권마다 다르지만 미국권에서는 리덕스는 코드 작성량이 많은 것(verbose)도 단점이라고 지적합니다.

## Redux를 사용하는 이유

리덕스의 장점 중 하나는 전역으로 State를 관리할 수 있습니다. 훨씬더 복잡한 앱을 만들 수 있습니다.

리덕스는 state와 props에 대해서 학습의존성을 갖고 있습니다. 리덕스는 상태관리 라이브러리입니다.

기존 리액트는 prop drilling을 했어야 합니다. 실제 프로그램을 만들 때는 부모에서 자식에게 전달할 수 있는 경우는 많지 않습니다. 전역 state로 만들어서 관리하는 라이브러리가 리덕스입니다. 리덕스를 사용하면 중간에 불필요하게 건너가야하는 컴포넌트를 피할 수 있습니다.

리덕스를 사용하는 다른 장점은 전달하기 위해 불필요하게 전달했어야 합니다. 리덕스는 글로벌 state랑 로컬 state로 구분해서 사용할 수 있습니다.

store는 글로벌 state를 보관합니다.

store를 통해서 따로 전달하면 얻는 장점은 2가지 측면입니다. 하나는 랜더링 관점에서 정확히 갱신해야 할 컴포넌트만 State를 주입하기 때문에 불필요한 부모컴포넌트의 랜더링을 막습니다. 다른 측면은 제어 측면입니다. prop drilling을 하면서 관심사와 무관한 props를 읽는 것을 피할 수 있습니다.

## Redux 설정

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
├── App.js
└── index.js
```

디렉토리 구조는 이렇게 생겼습니다.

configStore.js는 설정 파일입니다. 전역 상태로 받을 수 있게 해주는 설정 파일입니다.

```js title="configStore.js"
import { createStore } from 'redux';
import { combineReducers } from 'redux';

/*
1. createStore()
리덕스의 가장 핵심이 되는 스토어를 만드는 메소드(함수) 입니다. 
리덕스는 단일 스토어로 모든 상태 트리를 관리한다고 설명해 드렸죠? 
리덕스를 사용할 시 creatorStore를 호출할 일은 한 번밖에 없을 거예요.
*/

/*
2. combineReducers()
리덕스는 action —> dispatch —> reducer 순으로 동작한다고 말씀드렸죠? 
이때 애플리케이션이 복잡해지게 되면 reducer 부분을 여러 개로 나눠야 하는 경우가 발생합니다. 
combineReducers은 여러 개의 독립적인 reducer의 반환 값을 하나의 상태 객체로 만들어줍니다.
*/

const rootReducer = combineReducers({});
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

// 우리가 추가할 코드
import store from './redux/config/configStore';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //App을 Provider로 감싸주고, configStore에서 export default 한 store를 넣어줍니다.
  <Provider store={store}>
    <App />
  </Provider>
);
```

공부하는 방법에 따라다르지만 지금은 사용법을 먼저 공부하고 다음에 원리를 이해한다고 가정하면 내부의 동작원리는 설명은 잠시 보류하겠습니다.

## Redux part 3

이번에 만들어볼 예제는 카운터 app입니다.

```js title="src/modules/counter.js"
// 초기 상태값
const initialState = {
  number: 0,
};

// 리듀서
const counter = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// 모듈파일에서는 리듀서를 export default 한다.
export default counter;
```

```txt
├── src/
│   ├── redux/
│   │   ├── config/
│   │   │   └── configStore.js
│   │   └── modules/
│   │       └── counter.js
│   ├── App.js
│   └── index.js
```

디렉토리 구조는 이렇게 됩니다.

```js
// 초기 상태값
const initialState = {
  number: 0,
};
```

코드 중이 부분은 `useState(0)`의 인자 `0`을 넣은 것과 유사합니다.

참고로 초깃값은 반드시 객체일 필요가 없습니다. 참조형, 원시형 무관합니다.

```js
// 리듀서
const counter = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
```

리듀서입니다. 리듀서란 변화를 일으키는 함수입니다.

```js
// 예시 코드

const onClickHandler = () => {
  setNumber(number + 1); // setState를 이용해서 state 변경
};
```

useState만 활용하면 위처럼 코드를 작성해서 state를 업데이트했습니다.

state는 초깃값 할당이 필요합니다. 그리고 action 매개 변수가 필요합니다.

Redux 속에 Store가 있고 Store 속에는 Reducer가 있습니다. Store 상태를 저장하는 곳입니다.

어떤 액션을 실행하는 것을 보고 디스패치(dispatch)라고 합니다. reducer가 자동실행되고 액션에 해당하는 방식으로 데이터를 수정합니다.

모듈과 store를 연결하는 방법입니다.

```js
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

```js
import './App.css';
import React from 'react';
import { useSelector } from 'react-redux';

function App() {
  const countStore = useSelector((state) => state);
  console.log(countStore); // { counter: { number: 0 } }
  return <div className="App"></div>;
}

export default App;
```

`console.log`를 확인하면 이렇게 피드백 주는 것을 확인할 수 있습니다.

데이터가 흐르는 방향입니다.

modules은 기능의 이름을 참고해서 파일을 생성합니다. modules의 데이터를 `configStore.js`에 전달합니다. `configStore.js`에서 호출할 때 redux의 `useSelector` hook으로 접근합니다. state는 모든 모듈의 데이터를 접근할 수 있습니다.

모듈의 구성요소는 initialState, reducer 2가지가 있습니다. 생성하면 store에 연결해야 합니다. `useSelector`로 사용할 컴포넌트에 전달합니다.

## Redux part 4

![리덕스 흐름 도식화](https://user-images.githubusercontent.com/84452145/205887636-7bf7044a-72e3-4cae-ada6-81e2b05a06f5.gif)

1. 사용자는 ui와 어떤 상호작용을 합니다.
2. dispatch에서 action이 일어나게 됩니다.
3. action에 의한 reducer 함수가 실행되기 전에 middleware가 동작합니다.
4. middleware에서 요청한 수행 이후 reducer함수를 실행합니다.
5. reducer의 실행결과 store에 새로운 값을 저장합니다.
6. store의 state에 subscribe하고 있던 ui에 변경된 값을 줍니다.

이 순서에서 3, 4는 나중에 배웁니다.

리덕스에는 dispatch, reducer 같은 다양한 중간단계가 있습니다. 중요한 개념들입니다.

다시 말하지만 setter 함수처럼 값을 업데이트하는 부분은 reducer에서 진행합니다.

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
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  return (
    <div className="App">
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

```js title="src/modules/counter.js"
// 초기 상태값
const initialState = {
  number: 0,
};

// 리듀서
const counter = (state = initialState, action) => {
  console.log(action, state);
  switch (action.type) {
    case 'plusOne':
      return { number: state.number + 1 };
    default:
      return state;
  }
};

// 모듈파일에서는 리듀서를 export default 한다.
export default counter;
```

이렇게 state를 업데이트할 수 있습니다.

```js
import './App.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const countStore = useSelector((state) => state.counter.number);
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

useState처럼 useSelector가 참조하고 있는 컴포넌트도 모두 리랜더링됩니다.

```js title="src/modules/counter.js"
// 초기 상태값
const initialState = {
  number: 0,
};

// 리듀서
const counter = (state = initialState, action) => {
  console.log(action, state);
  switch (action.type) {
    case 'plusOne':
      return { number: state.number + 1 };
    case 'minusOne':
      return { number: state.number - 1 };
    default:
      return state;
  }
};

// 모듈파일에서는 리듀서를 export default 한다.
export default counter;
```

```js
import './App.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const countStore = useSelector((state) => state.counter.number);
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
      <button
        onClick={() => {
          dispatch({ type: 'minusOne' });
        }}
      >
        -1
      </button>
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
- 액션객체 `type`의 `value`는 상수의 식별자로 작성합니다(예: `{type: "PLUS_ONE"}`). 따라서 위 코드의 카멜케이스에서 어퍼스네이크 케이스로 작성해야 올바릅니다.

## Redux part 5

Action Creator입니다. action 객체를 지금까지 하드코딩을 많이 했습니다. 액션 객체를 여러곳에 만들었지만 만약에 수정해야 한다면 큰일날 수 있습니다. 현실에서는 더욱더 복잡한 프로젝트에서 다룰 것이기 때문에 알아야합니다.

액션객체를 한곳에서 관리할 것입니다. 함수와 action value 상수를 이용해서 만듭니다.

action 객체를 만드는 것이 함수의 기능입니다.

```js title="src/modules/counter.js"
// 추가된 코드 👇 - 액션 value를 상수들로 만들어 줍니다. 보통 이렇게 한곳에 모여있습니다.
const PLUS_ONE = 'PLUS_ONE';
const MINUS_ONE = 'MINUS_ONE';

// 추가된 코드 👇 - Action Creator를 만들어 줍니다.
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

// 초기 상태값
const initialState = {
  number: 0,
};

// 리듀서
const counter = (state = initialState, action) => {
  switch (action.type) {
    case PLUS_ONE: // case에서도 문자열이 아닌, 위에서 선언한 상수를 넣어줍니다.
      return {
        number: state.number + 1,
      };
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

// 사용할 Action creator를 import 합니다.
import { minusOne, plusOne } from './redux/modules/counter';

const App = () => {
  const dispatch = useDispatch();
  const number = useSelector((state) => state.counter.number);

  return (
    <div>
      {number}
      <button
        onClick={() => {
          dispatch(plusOne()); // 액션객체를 Action creator로 변경합니다.
        }}
      >
        + 1
      </button>
      {/* 빼기 버튼 추가 */}
      <button
        onClick={() => {
          dispatch(minusOne()); // 액션객체를 Action creator로 변경합니다.
        }}
      >
        - 1
      </button>
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

## Redux part 6

Payload입니다. 액션객체에 담아 보내는 데이터를 보고 Payload라고 합니다. 주로 사용자가 조금더 복잡한 액션을 취할 때 사용합니다. 예를 들어 이전 카운터는 1단위로 더하고 빼고를 제어했지만 이제는 사용자가 단위를 정할 수 있게 해줍니다.

```js
// payload가 추가된 액션객체

{type: "ADD_NUMBER", payload: 10} // type뿐만 아니라 payload라는 key와 value를 같이 담는다.
```

리덕스는 유연한 라이브러리라 `payload`이외 용어로도 보낼 수 있습니다. 그래서 `type` 이외는 원하는 키를 사용해도 됩니다. `payload`를 사용하는 이유는 컨벤션 때문입니다.

나중에 혼자 한번에 진행해보도록 합니다.

```js title=""
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import counter from '../modules/counter';

const rootReducer = combineReducers({
  counter: counter,
});
const store = createStore(rootReducer);

export default store;
```

```js title="src/redux/modules/counter.js"
// Action Value
const ADD_NUMBER = 'ADD_NUMBER';
const SUBTRACT_NUMBER = 'SUBTRACT_NUMBER';

// Action Creator
export const addNumber = (payload) => {
  return { type: ADD_NUMBER, payload };
};

export const subtractNumber = (payload) => {
  return { type: SUBTRACT_NUMBER, payload };
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
      <input
        type="number"
        onChange={(event) => handleChangeText(event)}
        value={num}
      />
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

[덕스 패턴 소개 리포](https://github.com/erikras/ducks-modular-redux)

이외 flux 패턴이라는 것도 존재합니다.
