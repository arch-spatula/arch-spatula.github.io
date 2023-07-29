---
description: 'draft'
tags: ['react', 'redux', 'introduction']
sidebar_position: 2
draft: true
---

# draft

## TIL.22.12.19. - 정규 RTK

### Redux Toolkit

리덕스 툴킷을 학습합니다. 당연히 다른 프레임워킁입니다. 하지만 리덕스의 불편한점을 개선한 리덕스 프레임워크입니다.

리덕스를 잘 배우면 어려울 것이 없습니다. 리덕스를 잘 모르면 큰 고통이 올 것입니다.

리덕스를 작성할 때 형식적으로 설정해야 하는 것이 많았습니다. 리덕스는 이런 설정 코드가 많았습니다. 코드량이 많아진 만큼 불만도 많아졌습니다. 물론 영어권 개발 커뮤니티 한정입니다. 그래서 리덕스 개발팀은 이런 불편한 점을 수용하고 개선하기 위해 리덕스 툴킷을 만들었습니다. RTK가 약어입니다. ducks 패턴은 유지됩니다.

글로벌 state 데이터를 접근하고 보내는 패턴은 동일합니다. 사용하는 hook도 동일합니다. 바뀌는 부분은 모듈입니다.

설치하는 법입니다.

```sh
yarn add react-redux @reduxjs/toolkit
```

`package.json`을 잘 확인하면 `react-redux`도 자동 설치된다는 것을 알 수 있습니다.

파일링입니다.

```txt
├── src/
│   ├── redux/
│   │   ├── config/
│   │   │   └── configStore.js
│   │   └── modules/
│   │       ├── counterSlice.js
│   │       └── (... 이런저런 다양한 Slice)
│   ├── App.js
│   └── index.js
```

action 객체, action 생성자 함수를 의존할 필요가 없어졌습니다. 리듀서 함수 내에서 데이터를 직접 뮤테이션을 가할 수 있게 됩니다.

```js
// src/redux/modules/counterSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  number: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addNumber: (state, action) => {
      state.number = state.number + action.payload;
    },

    minusNumber: (state, action) => {
      state.number = state.number - action.payload;
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { addNumber, minusNumber } = counterSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default counterSlice.reducer;
```

리듀서는 로직이자 액션 생성자의 역할으 합니다. 메서드 이름이 액션함수가 됩니다. 모듈 명명 컨벤션으로 (모둘명+Slice)로 작성합니다. 안 하는 사람도 많지만 하는 것을 권장합니다.

```js
// src/redux/modules/config/configStore.js

import { configureStore } from '@reduxjs/toolkit';
/**
 * import 해온 것은 slice.reducer 입니다.
 */
import counter from '../modules/counterSlice';
import todos from '../modules/todosSlice';

/**
 * 모듈(Slice)이 여러개인 경우
 * 추가할때마다 reducer 안에 각 모듈의 slice.reducer를 추가해줘야 합니다.
 *
 * 아래 예시는 하나의 프로젝트 안에서 counter 기능과 todos 기능이 모두 있고,
 * 이것을 각각 모듈로 구현한 다음에 아래 코드로 2개의 모듈을 스토어에 연결해준 것 입니다.
 */
const store = configureStore({
  reducer: { counter, todos },
});

export default store;
```

```js
// index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/config/configStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
```

리덕스 dev tools 사용법입니다.

툴킷에서 리덕스 dev tools는 기본설정이 되어 있습니다. 일반 리덕스에서는 따로 설정해줘야 합니다. 리덕스 dev tools를 잘 사용해야 사람 취급받는 개발자가 될 수 있습니다.

slice를 이용하면, Reducer, Action Value, Action Creator를 한번에 구현할 수 있습니다. 또 다양한 내장된 패키지들이 같이 설치됩니다. 주요 패키지는 thunk, devtools, immer입니다. 여기서 immer에 대해서 추가학습을 권장합니다.

리덕스가 취하는 로직이 flux패턴입니다. 사람취급받고 싶으면 flux 패턴은 암기하도록 합니다. 암기가 되려면 이해가 먼저 필요할 것입니다.

### json-server

json-server는 DB랑 API를 만들어주는 패키지입니다. 이런 패키지는 병렬로 작업하기 위해 사용합니다. 기본적으로 프론트엔드와 백엔드 작업은 병렬로 진행됩니다. Mock Data를 만들어서 모의서버, 모의 데이터베이스를 만들어 개발에 착수합니다.

```sh
yarn add json-server
```

설치입니다. 리액트부터 설치하고 난뒤에 추가하기 바랍니다. 간단하게 구축할 수 있습니다. 리액트 서버랑 백엔드 서버를 별도로 실행해줘야 합니다.

```sh
yarn json-server --watch db.json --port 3001
```

서버 활성화합니다.

`db.json` 파일이 자동생성되는 것을 볼 수 있습니다. 이 파일이 DB역할을 합니다.
json-test

```json
{
  "posts": [
    {
      "id": 1,
      "title": "json-server",
      "author": "typicode"
    }
  ],
  "comments": [
    {
      "id": 1,
      "body": "some comment",
      "postId": 1
    }
  ],
  "profile": {
    "name": "typicode"
  }
}
```

이미 이런 데이터를 넣줍니다. 하지만 과감히 삭제합시다.

브라우저 주소에 URL을 입력한다는 것은 GET 요청을 날린 것입니다.

```url
http://localhost:3001/todos
```

이런 url을 브라우저에 입력하면 todos 자원을 얻고자 get 요청을 날린 것입니다.

# Axios

서버에서 데이터를 받아야 진정한 UI를 만들 수 있게 됩니다. 프론트엔드 엔지이어가 되려면 통신은 기본입니다. api랑 통신하는 방법입니다. Axios로 통신하는 방법입니다.

Axios는 스스로 node.js와 브라우저를 위한 Promise 기반 http 클라이언트 라고 소개하고 있습니다. http를 이용해서 서버와 통신하기 위해 사용하는 패키지라고 보면됩니다. 서버랑 통신하기 위한 패키지입니다.

axios를 json서버랑 연결해서 사용하는 법을 다룹니다.

```sh
yarn add axios
```

설치는 간단합니다.

axios 메서드 4가자입니다. 최소한의 연습은 CRUD라고 합니다. CRUD랑 대응하는 메서드입니다. GET, POST, PATCH, DELETE입니다.

GET은 값을 조회할 때 사용합니다. READ에 해당합니다.

설정은 [요청 Config](https://axios-http.com/kr/docs/req_config)에서 공부하기 바랍니다. 무엇이 들어갈 수 있는지 공식문서를 계속 찾아볼 수 있어야 합니다.

[JSON Server](https://www.npmjs.com/package/json-server)도 당연히 공부하도록 합니다.

Axios는 GET 요청을 할 수 있도록 도와주는 패키지일뿐입니다. 요청방식은 API 명세서를 확인하고 결정해야 합니다. path variable, query로 요청을 보낼 때는 API 만든 사람의 기준에 맞춥니다.

path variable은 아래 이미지처럼 생겼습니다.

![path variable](https://user-images.githubusercontent.com/84452145/208235805-8b9b5c03-c1fd-44de-98a0-8bbd30324dc1.png)

query는 이렇게 생겼습니다.

![query](https://user-images.githubusercontent.com/84452145/208235799-ed76a1d1-20c6-472c-a2ba-7e6b87de2b84.png)

물음표(?)뒤에 오는 것이 쿼리에 해당합니다. 정해진 id로 접근할 때는 path variable로 작성합니다. 검색 혹은 특정값 조회는 쿼리를 사용합니다.

```js
// src/App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios import 합니다.

const App = () => {
  const [todos, setTodos] = useState(null);

  // axios를 통해서 get 요청을 하는 함수를 생성합니다.
  // 비동기처리를 해야하므로 async/await 구문을 통해서 처리합니다.
  const fetchTodos = async () => {
    const { data } = await axios.get('http://localhost:3001/todos');
    setTodos(data); // 서버로부터 fetching한 데이터를 useState의 state로 set 합니다.
  };

  // 생성한 함수를 컴포넌트가 mount 됐을 떄 실행하기 위해 useEffect를 사용합니다.
  useEffect(() => {
    // effect 구문에 생성한 함수를 넣어 실행합니다.
    fetchTodos();
  }, []);

  // data fetching이 정상적으로 되었는지 콘솔을 통해 확인합니다.
  console.log(todos); // App.js:16
  return <div>App</div>;
};

export default App;
```

POST입니다. 정석은 DB에 데이터를 추가할 때 사용합니다. 서버데이터 추가 이외 용도로도 사용할 수 있습니다. 클라이언트 데이터를 body에 넣어서 보낼때 많이 사용합니다.

```js
// src/App.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios import 합니다.

const App = () => {
  // 새롭게 생성하는 todo를 관리하는 state
  const [todo, setTodo] = useState({
    title: '',
  });

  const [todos, setTodos] = useState(null);

  const fetchTodos = async () => {
    const { data } = await axios.get('http://localhost:3001/todos');
    setTodos(data);
  };

  const onSubmitHandler = async (todo) => {
    //1.  이때 todos는 [{투두하나}]임
    await axios.post('http://localhost:3001/todos', todo); // 이때 서버에 있는 todos도 [{투두하나}]임

    // 근데 여기서 서버 요청이 끝나고 서버는 [{투두가},{두개임}]

    setTodos([...todos, todo]); // 2. <-- 만약 이게 없다면, go to useEffect
    //4. 새로고침해서 진짜 현재 서버 데이터를 받아오기전에 상태를 똑같이 동기시켜줌
    //5. 어떻게보면 유저한테 서버에서 새로 받아온것처럼 속이는거지
  };

  useEffect(() => {
    fetchTodos(); //3. 새로고침해서 여기를 다시 실행해줘야 서버값이 새로 들어옴 e.g) [{투두가},{두개임}]
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          // 👇 submit했을 때 브라우저의 새로고침을 방지합니다.
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
        <input
          type="text"
          onChange={(ev) => {
            const { value } = ev.target;
            setTodo({
              ...todo,
              title: value,
            });
          }}
        />
        <button>추가하기</button>
      </form>
      <div>
        {todos?.map((todo) => (
          <div key={todo.id}>{todo.title}</div>
        ))}
      </div>
    </>
  );
};

export default App;
```

이렇게 작성하면 됩니다.

프론트엔드 개발할 때 항상 네트워크 탭을 활용하기 바랍니다.

payload에 서버로 보낸 body에 데이터를 볼 수 있습니다. response는 api명세서에 따라 다릅니다.

```js
// src/App.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [todo, setTodo] = useState({
    title: '',
  });

  const [todos, setTodos] = useState(null);

  const fetchTodos = async () => {
    const { data } = await axios.get('http://localhost:3001/todos');
    setTodos(data);
  };

  const onSubmitHandler = (todo) => {
    axios.post('http://localhost:3001/todos', todo);
  };

  // 새롭게 추가한 삭제 버튼 이벤트 핸들러
  const onClickDeleteButtonHandler = (todoId) => {
    axios.delete(`http://localhost:3001/todos/${todoId}`);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
        <input
          type="text"
          onChange={(ev) => {
            const { value } = ev.target;
            setTodo({
              ...todo,
              title: value,
            });
          }}
        />
        <button>추가하기</button>
      </form>
      <div>
        {todos?.map((todo) => (
          <div key={todo.id}>
            {todo.title}
            {/*  디자인이 요상하긴 하지만..! 삭제 버튼 추가 */}
            <button
              type="button"
              onClick={() => onClickDeleteButtonHandler(todo.id)}
            >
              삭제하기
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
```

삭제 구현입니다. 역시 업데이트보다 삭제가 더 쉽습니다.

업데이트입니다. 업데이트는 2가지가 존재합니다. 하나는 PUT과 PATCH입니다. PATCH는 리소스 일부를 합니다. PUT은 전체를 합니다. 그래서 대부분의 경우 PATCH가 더 효율적입니다. api 명세에 따라 다른 이름을 사용할 수 있지만 당연히 컨벤션이라 유지하도록 합니다.

```js
// src/App.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [todo, setTodo] = useState({
    title: '',
  });
  const [todos, setTodos] = useState(null);

  // patch에서 사용할 id, 수정값의 state를 추가
  const [targetId, setTargetId] = useState(null);
  const [editTodo, setEditTodo] = useState({
    title: '',
  });

  const fetchTodos = async () => {
    const { data } = await axios.get('http://localhost:3001/todos');
    setTodos(data);
  };

  const onSubmitHandler = (todo) => {
    axios.post('http://localhost:3001/todos', todo);
  };

  const onClickDeleteButtonHandler = (todoId) => {
    axios.delete(`http://localhost:3001/todos/${todoId}`);
  };

  // 수정버튼 이벤트 핸들러 추가 👇
  const onClickEditButtonHandler = (todoId, edit) => {
    axios.patch(`http://localhost:3001/todos/${todoId}`, edit);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
        {/* 👇 수정기능에 필요한 id, 수정값 input2개와 수정하기 버튼을 추가 */}
        <div>
          <input
            type="text"
            placeholder="수정하고싶은 Todo ID"
            onChange={(ev) => {
              setTargetId(ev.target.value);
            }}
          />
          <input
            type="text"
            placeholder="수정값 입력"
            onChange={(ev) => {
              setEditTodo({
                ...editTodo,
                title: ev.target.value,
              });
            }}
          />
          <button
            // type='button' 을 추가해야 form의 영향에서 벗어남
            type="button"
            onClick={() => onClickEditButtonHandler(targetId, editTodo)}
          >
            수정하기
          </button>
        </div>
        <input
          type="text"
          onChange={(ev) => {
            const { value } = ev.target;
            setTodo({
              ...todo,
              title: value,
            });
          }}
        />
        <button>추가하기</button>
      </form>
      <div>
        {todos?.map((todo) => (
          <div key={todo.id}>
            {/* todo의 아이디를 화면에 표시 */}
            {todo.id} :{todo.title}
            <button
              type="button"
              onClick={() => onClickDeleteButtonHandler(todo.id)}
            >
              삭제하기
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
```

http 메소드로 api 통신을 어떻게할지 항상 명세를 잘 확인해야 합니다. 그리고 브라우저탭은 항상 기본으로 확인하면서 작업을 진행합니다.

http method, staus code와 같은 정보들은 대부분 BE개발자가 구현해주는 부분입니다. 컨벤션에 맞게 BE와 FE간의 커뮤니케이션이 잘 되어야 한다.

## Thunk

RTK에는 Thunk가 있습니다. Thunk를 이해하기 위해서는 그 전에 미들웨어를 이해해야 합니다. 디스패치를 하면 리듀서에서 액션의 유형에 따라 새로운 state로 업데이트합니다. 미들웨어는 액션 후 리듀서 실행 전에 중간 작업을 진행할 수 있습니다.

![미들웨어](https://user-images.githubusercontent.com/84452145/208238708-8fec75a1-a2b9-45e4-a0ef-db3a93b7779a.png)

리듀서 로직은 그대로인데 실행하는 맥락에 따라 조금 다른 부분이 필요하면 리듀서 함수를 바꾸기 전에 미들웨어로 실행하고 처리하도록 하는게 더 좋을 수 있습니다. 예를 들어 똑같은 1을 더하는 액션이지만 어떤 것은 그냥 바로 1을 더하고 어떤 것은 3초 대기 후 1초를 더해야 하는 상황이 올 수 있습니다. 3초 대기시키는 로직은 미들웨어로 처리합니다. 여기서 대기는 사실 비동기처리입니다. 서버 통신에서 비동기처리에 많이 사용합니다. 미들웨어는 리덕스 thunk로 처리하는 경우가 가장 많습니다.

thunk의 원리는 생각해보면 직관적입니다. `dispatch(middlewareFunc())`로 보냅니다. 즉 dispatch할 때 함수를 대입해서 보내버립니다. 그리고 보낸 함수를 실행하고 실행한 미들웨어 함수를 실행시킵니다. 그리고 그 함수 속에서 `dispatch(actionObj())`으로 액션 객체를 실행시키면 됩니다.이것을 보고 thunk함수라고 부릅니다.

```js
// src/redux/modules/counterSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addNumberThunk = createAsyncThunk(
  // 첫번째 인자 : action value
  'addNumber',
  // 두번째 인자 : 콜백함수
  (payload, thunkAPI) => {
    setTimeout(() => {
      thunkAPI.dispatch(addNumber(payload));
    }, 3000);
  }
);

const initialState = {
  number: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addNumber: (state, action) => {
      state.number = state.number + action.payload;
    },

    minusNumber: (state, action) => {
      state.number = state.number - action.payload;
    },
  },
});

export const { addNumber, minusNumber } = counterSlice.actions;
export default counterSlice.reducer;
```

여기서 `createAsyncThunk`의 두번째 인자가 thunk 함수에 해당합니다. thunk함수의 매개변수를 자세히 봐야 합니다. 하나는 payload로 전달할 데이터입니다. 두번째 매개변수는 `thunkAPI`로 `dispatch`를 실행합니다. 이때 첫번째인자가 중요합니다. `createSlice`의 `reducers`의 addNumber 메서드 이름인 식별자와 `createAsyncThunk`의 첫번째인 문자열(`"addNumber"`)이 일치해야 합니다.

```js
// src/App.jsx

import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { minusNumber, addNumberThunk } from './redux/modules/counterSlice';

const App = () => {
  const dispatch = useDispatch();
  const [number, setNumber] = useState(0);
  const globalNumber = useSelector((state) => state.counter.number);

  const onChangeHandler = (evnet) => {
    const { value } = evnet.target;
    setNumber(+value);
  };

  // thunk 함수를 디스패치한다. payload는 thunk함수에 넣어주면,
  // 리덕스 모듈에서 payload로 받을 수 있다.
  const onClickAddNumberHandler = () => {
    dispatch(addNumberThunk(number));
  };

  const onClickMinusNumberHandler = () => {
    dispatch(minusNumber(number));
  };

  return (
    <div>
      <div>{globalNumber}</div>
      <input type="number" onChange={onChangeHandler} />
      <button onClick={onClickAddNumberHandler}>더하기</button>
      <button onClick={onClickMinusNumberHandler}>빼기</button>
    </div>
  );
};

export default App;
```

로직을 확인해보면 `addNumberThunk`을 유출해서 thunk함수를 실행하고 다음에 리듀서함수를 동작시킨 것입니다.

이제는 json-server를 띄우고 Thunk 함수를 통해서 API를 호출하고 서버로부터 가져온 값을 Store에 dispatch 하는 기능입니다.

api 명칭이 복잡하면 곤랍합니다.

Thunk 함수를 리듀서 로직을 구현할 때 주의할 것들이 있니다. 기타 reducer 로직을 구현할 때 원래 사용하는 method가 아니라 extraReducer를 통해 만들어야 합니다. 또 중요한 점은 통신중일 때, 통신에 성공했을 때, 통신에 실패했을 때 로직과 state를 구현해야 합니다. 사람들이 자주 착각하는게 통신이 자주 성공한다고 착각합니다. 통신은 늘 실패합니다. 네트워크 동작원리를 이해하면 대기 시간도 늘 깁니다. 이런 상태별로 시스템은 피드백을 제공해야 합니다. 이 피드백을 제공하기 위해 통신 상태를 추적해야 합니다.

```js
// src/redux/modules/todosSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  // 통신 시작 전, 통신 종료에 false가 됩니다.
  isLoading: false,
  // error는 서버에서 어떤 이유로 통신에 실패했는지 피드백을 제공할 것인데
  // 이 통신에 실패한 이유를 데이터로 담아놓을 프로퍼티입니다.
  error: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
```

많은 경우 서버랑 통신을 관리할 때는 date, loading, error 3가지로 관리합니다. 성공, 대기, 실패랑 서로 대응됩니다.

```sh
yarn json-server --watch db.json --port 3001
```

이 서버로 요청을 보낼 것입니다.

```js
// src/redux/modules/todosSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  todos: [],
};

export const getTodosThunk = createAsyncThunk(
  'getTodos',
  async (payload, thunkAPI) => {
    const data = await axios.get('');
  }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
```

`axios.get()`은 Promise를 반환합니다. 성공하면 fulfilled 실패하면 rejected 된 것을 처리합니다. 서버가 다운되는 경우도 있고 요청하는 url을 백엔드가 말없이 바꾸는 경우는 꽤 흔합니다. 에러는 `try`, `catch`로 처리합니다.

```js
// src/redux/modules/todosSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  todos: [],
};

export const getTodosThunk = createAsyncThunk(
  'getTodos',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(' http://localhost:3001/todos');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
```

이렇게 작성해두면 됩니다.

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/config/configStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

`Provider`도 구현하는 것을 잊지 않도록 합니다.

```js
// src/App.jsx

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTodosThunk } from './redux/modules/todosSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodosThunk());
    // fetchTodos();
  }, [dispatch]);

  return <div>App</div>;
};

export default App;
```

`fulfillWithValue`와 `rejectWithValue`는 RTK에서 제공하는 API 입니다.

Promise의 성공 혹은 실패에 따라 dispatch 해주는 기능을 가진 API 입니다. 모두 인자를 payload로 넣습니다.

```js
// src/redux/modules/todosSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  todos: [],
};

export const getTodosThunk = createAsyncThunk(
  'getTodos',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get('http://localhost:3001/todos');
      // 통신에 성공해서 얻은 데이터를 payload로 대입합니다.
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      // 통신에 실패해서 실패한 이유를 알려주는 error객체를 payload로 전달합니다.
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
```

여기까지는 리듀서함수를 작성한적이 없습니다. `dispatch`에 대입할 함수만 작성하고 결과에 따라 처리할 리듀서함수를 작성하지 않았습니다. 결과에 따라 처리할 리듀서는 `extraReducers`에 작성합니다.

thunk 함수는 리듀서에 직접 넣는 것이 아닙니다. 그래서 `extraReducers`를 작성해야 합니다. 통신 상태에 맞게 각각 state를 반환하도록 구현해줘야 합니다.

```js
// src/redux/modules/todosSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  todos: [],
};

export const getTodosThunk = createAsyncThunk(
  'getTodos',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get('http://localhost:3001/todos');
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: {
    [getTodosThunk.pending]: (state) => {
      // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
      state.isLoading = true;
    },
    [getTodosThunk.fulfilled]: (state, action) => {
      // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isLoading = false;
      // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      state.todos = action.payload;
    },
    [getTodosThunk.rejected]: (state, action) => {
      // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isLoading = false;
      // catch 된 error 객체를 state.error에 넣습니다.
      state.error = action.payload;
    },
  },
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
```

이것은 `Map Object 표기법`으로 구현한 것입니다. 지금 배운 것은 오래된 것입니다. 아래 `builder` 표기법으로 작성하는 것을 권장합니다.

```js
// src/redux/modules/todosSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  todos: [],
};

export const getTodosThunk = createAsyncThunk(
  'getTodos',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get('http://localhost:3001/todos');
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodosThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTodosThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    });
    builder.addCase(getTodosThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
```

```js
// src/App.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosThunk } from './redux/modules/todosSlice';

const App = () => {
  const dispatch = useDispatch();
  const { isLoading, todos, error } = useSelector((state) => state.todos);
  useEffect(() => {
    dispatch(getTodosThunk());
    // fetchTodos();
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
};

export default App;
```

이런 방식으로 통신상태과 결과별로 피드백을 제공할 수 있습니다.

## Hooks

memo, useCallback, useMemo 3가지로 성능 최적화를 할 수 있습니다. memo는 hook이 아닙니다. memo는 불필요한 리렌더링을 막는 함수입니다. 불필요한 리렌더링은 화면에 변경되는 부분이 없는데도 다시 렌더링되는 것입니다.

부모컴포넌트, state, 상속받은 props가 변경되면 컴포넌트는 리렌더링됩니다.

최적화는 프로젝트 기본입니다.

```js
//App.jsx

import React, { useState } from 'react';
import Button from './components/Button';

const App = () => {
  const [value, setValue] = useState('');

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={onChangeHandler} />
      <Button />
    </div>
  );
};

export default App;
```

```js
// components/Button.js

import React from 'react';

const Button = () => {
  console.log('리렌더링되고 있어요.');
  return <button>버튼</button>;
};

export default Button;
```

`console.log`를 확인하도록 합니다. input을 입력할 때마다 리렌더링이 여러번 되는 것을 볼 수 있습니다. 이것은 메모리 낭비입니다.

```js
// components/Button.js

import React, { memo } from 'react';

const Button = () => {
  console.log('리렌더링되고 있어요.');
  return <button>버튼</button>;
};
0;

export default memo(Button);
```

이렇게 하면 간단하게 리렌더링 문제를 해결할 수 있습니다.

```js
// src/App.jsx

import React, { useState } from 'react';
import Button from './components/Button';

const App = () => {
  // App.js가 리렌더링 될때마다 재생성됨
  const [value, setValue] = useState('');

  // App.js가 리렌더링 될때마다 재생성됨
  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  // App.js가 리렌더링 될때마다 재생성됨
  const onClickHandler = () => {
    console.log('hello button!');
  };

  return (
    <div>
      <input type="text" value={value} onChange={onChangeHandler} />
      {/* 매번 재생성되는 함수를 props로 넘겨줌 -> Button.js 리렌더링 유발 */}
      <Button onClick={onClickHandler} />
    </div>
  );
};

export default App;
```

```js
// src/components/Button.js

import React, { memo } from 'react';

const Button = ({ onClick }) => {
  console.log('리렌더링되고 있어요.');
  return <button onClick={onClick}>버튼</button>;
};

export default memo(Button);
```

이렇게 함수를 props로 상속시키면 리렌더링이 발생합니다. 이런 현상이 발생하는 이유는 간단합니다. state가 업데이트 될 때마다 함수들도 새롭게 재선언됩니다. 재선언된 함수를 새로운 props로 바라봅니다. 당연히 동일하게 작성되어 있지만 메모리 주소가 다르기 때문이라고 추론할 수 있을 것입니다. 이런 메모리 주소가 동일하게 유지하는 방법은 `useCallback`을 사용하면 유지할 수 있습니다. 보통 함수를 상속하게 되면 `useCallback`을 사용하기를 권장합니다.

useEffect처럼 첫번째 매개변수는 고정시킬 콜백함수를 넣습니다. 두번째 매개변수는 의존성 배열을 대입합니다.

`useMemo`는 배열, 객체처럼 데이터에 사용하는 `useCallback`입니다.

```js
// src/App.jsx

import React, { useState } from 'react';
import List from './components/List';

const App = () => {
  const [value, setValue] = useState('');

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const data = [
    {
      id: 1,
      title: 'react',
    },
  ];

  return (
    <div>
      <input type="text" value={value} onChange={onChangeHandler} />
      <List data={data} />
    </div>
  );
};

export default App;
```

```js
// src/components/List.jsx

import React, { memo } from 'react';

const List = ({ data }) => {
  console.log('리렌더링되고 있어요.');
  return (
    <div>
      {data.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
};

export default memo(List);
```

`console.log`를 확인하면 리렌더링일 발생한다는 것을 알 수 있습니다.

```js
import React, { useState } from 'react';
import { useMemo } from 'react';
import List from './components/List';

const App = () => {
  const [value, setValue] = useState('');

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const data = useMemo(() => {
    return [
      {
        id: 1,
        title: 'react',
      },
    ];
  }, []);

  return (
    <div>
      <input type="text" value={value} onChange={onChangeHandler} />
      <List data={data} />
    </div>
  );
};

export default App;
```

이렇게 하면 간단하게 해결할 수 있습니다.

이렇게 최적화를 hook들과 함수를 배웠지만 당연히 무분별한 사용이 꼭 성능을 높이는 것은 아닙니다. 비교연산을 추가하는 것입니다.

불필요한 렌더링이 많은지랑 최적화 hook으로 성능개선이 가능한지 검증한 뒤에 사용하도록 합니다.

참고로 원시형 데이터는 굳이 useMemo로 최적화할 필요가 없습니다.

```js
// src/App.jsx

import React from 'react';
import { useState } from 'react';

const App = () => {
  // input의 갯수가 늘어날때마다 state와 handler가 같이 증가한다.
  const [title, setTitle] = useState('');
  const onChangeTitleHandler = (e) => {
    setTitle(e.target.value);
  };

  // input의 갯수가 늘어날때마다 state와 handler가 같이 증가한다.
  const [body, setBody] = useState('');
  const onChangeBodyHandler = (e) => {
    setBody(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        name="title"
        value={title}
        onChange={onChangeTitleHandler}
      />
      <input
        type="text"
        name="title"
        value={body}
        onChange={onChangeBodyHandler}
      />
    </div>
  );
};

export default App;
```

custom hook입니다. input에 대해서 중복이 발생하고 있습니다. 이런 중복은 custom hook으로 줄일 수 있습니다. 네이티브 hook으로 custom hook을 만들 수 있습니다.

custom hook은 컨벤션상 개별 폴더(hooks) 속에 use를 접두어로 붙여 개발합니다.

```js
import React, { useState, useDebugValue } from 'react';

const useInput = () => {
  const [value, setValue] = useState('');
  const handler = (e) => {
    setValue(e.target.value);
  };
  useDebugValue();
  return [value, handler];
};

export default useInput;
```

```js
// src/App.jsx

import React from 'react';
import useInput from './hooks/useInput';

const App = () => {
  // 우리가 만든 훅을 마치 원래 있던 훅인것마냥 사용해봅니다.
  const [title, onChangeTitleHandler] = useInput();
  const [body, onChangeBodyHandler] = useInput();

  return (
    <div>
      <input
        type="text"
        name="title"
        value={title}
        onChange={onChangeTitleHandler}
      />

      <input
        type="text"
        name="title"
        value={body}
        onChange={onChangeBodyHandler}
      />
    </div>
  );
};

export default App;
```

이렇게 중복을 제거할 수 있습니다.

## TIL.22.12.20. - error log

### tailwind

리액트 설치부터합니다.

```sh
yarn create react-app .
```

```sh
yarn add -D tailwindcss postcss autoprefixer
```

```sh
yarn tailwindcss init -p
```

`tailwind.config.js`에 아래처럼 작성합니다.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

`index.css`으로 설치하면 됩니다.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

생각보다 번거로워 보이지만 간단합니다.

### error log

#### WebSocket connection to '(url)' failed

##### 발생 경위

리덕스 실습하는 도중에 통신 실패의 경우가 정상 동작하는지 확인하기 위해 의도적으로 에러를 발생시켰습니다.

```url
http://localhost:3001/todos
```

위 url이 올바른 요청인데 에러처리가 정상동작하는 의도적으로

```url
http://localhost:3001/asdf
```

로 바꾸었습니다.

##### 대응

[WebSocket 발생 에러 확인 및 조치 방법](https://hyeon-jinhyeok.tistory.com/38)

Java Spring 예제에서 사용했기 때문에 도움이 안 되었습니다.

[react websocket connection to ws failed](https://beta.sayhello.so/search?q=react+websocket+connection+to+ws+failed)

검색 방법을 바꿨습니다.

[WebSocketClient.js:16 WebSocket connection to 'ws://localhost:3000/ws' failed: React, Docker, NGINX](https://stackoverflow.com/questions/70585472/websocketclient-js16-websocket-connection-to-ws-localhost3000-ws-failed-r)

그냥 프로젝트 루트경로에 `.env` 만들고 `WDS_SOCKET_PORT=0`이라 작성하면 해결되는 문제였습니다. 하지만 발생하게 된 정확한 네트워크 지식은 모릅니다.

### Reducer와 Reducers는 다릅니다.

```js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    content: "I've heard bad things.",
  },
  {
    id: '2',
    title: 'Slice...',
    content: 'The more I say slice, the more I want pizza',
  },
];

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addNumber: (state, action) => {
      state.number = state.number + action.payload;
    },

    minusNumber: (state, action) => {
      state.number = state.number - action.payload;
    },
  },
});

export default postSlice.reducer;
```

이런 코드에서 마지막 `postSlice.reducer`를 `postSlice.reducers`로 잘못 작성했습니다. 디버깅에 브라우저 정지까지 꽤 많은 에러가 발생했었습니다. 아프로 자동완성에 의존하도록 합니다. `createSlice`인자로 대입한 객체의 프로퍼티와 반환값 프로퍼티는 당연히 다른 것인데 동일하다고 착각했습니다.

## TIL.22.12.21. - Redux Toolkit 과제 시작

### React Redux Toolkit Tutorials

`react_redux_toolkit`는 github에서 다운받은 파일입니다. 연습은 `react_redux_toolkit_prac`에 복붙하고 진행합니다.

[React Redux Full Course for Beginners | Redux Toolkit Complete Tutorial](https://www.youtube.com/watch?v=NqzdVN2tyvQ)

리덕스 제작자는 RTK를 사용하기를 권장합니다. 불필요한 복잡성이 늘어난다고 합니다.

### 01_lesson: React Redux Toolkit Tutorial for Beginners | Learn Modern Redux

리덕스는 글로벌 state 관리 라이브러리의 고전입니다. 이제는 RTK를 제공합니다. 그리고 리덕스를 사용하는 표준방법이고 모던한 리덕스 사용법이라고 제작자가 설명했습니다.

이 튜토리얼은 리덕스 초보자를 위한 강의이지 리액트 초보자를 위한 강의가 아닙니다. 리액트에 대한 학습의존성을 갖고 있습니다. useReducer hook은 잘 이해하고 있는 상태에서 수강하기 바랍니다.

RTK는 불필요한 패키지, 불필요하게 많은 코드, 너무 많은 설정 등이 문제였습니다.

RTK는 요약하면 베터리포함 리덕스입니다.

RTK의 로직에 집중하도록 합니다.

```sh
npm install react-redux @reduxjs/toolkit
```

리덕스랑 리덕스 store는 혼용해서 사용하는 용어입니다. 자바스크립트의 불변 객체 트리 컨테이너입니다. 복수의 store는 가능하지만 권장하지 않습니다.

```js
// src/app/store.js 설정
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});
```

지금 리듀서는 비어있지만 나중에 추가할 것입니다.

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

`index.jsx`를 이렇게 작성하면 전역으로 state를 주고 받을 수 있습니다. `useContext`랑 유사합니다.

슬라이스는 리덕스 state 객체를 여러 객체로 쪼갠다는 개념에서 부릅니다. 이런 로직은 각자 다르게 처리하기 때문에 각자 슬라이스를 갖습니다.

```js
// features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => (state.count += 1),
    decrement: (state) => (state.count -= 1),
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
```

위의 코드를 보면 이미 reducer처럼 생겼습니다. 자세히 보면 state를 직접 변형합니다.

features는 모든 기능을 담습니다. 그리고 기능별로 counter처럼 각 기능 단위로 폴더를 정리합니다. 규모가 거대하면 이런 방식을 권장합니다. 연결된 컴포넌트랑 slice를 같이 모아두도록 합니다.

```txt
├── features/
│   ├── counter/
│   │   ├── Counter.js
│   │   └── counterSlice.js
```

```js
import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

store에 이렇게 연결합니다.

컴포넌트와 기능 단위로 폴더를 정리합니다.

```jsx
// features/counter/Counter.js
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
} from './counter/counterSlice';

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(0);
  const addValue = Number(incrementAmount) || 0;
  const resetAll = () => {
    dispatch(reset());
    setIncrementAmount(0);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>-</button>
      <button onClick={() => dispatch(decrement())}>+</button>
      <input
        type="number"
        value={incrementAmount}
        onChange={(event) => setIncrementAmount(event.target.value)}
      />
      <button onClick={() => resetAll()}>Reset</button>
      <button onClick={() => dispatch(incrementByAmount(addValue))}>
        Add Amount
      </button>
    </div>
  );
};

export default Counter;
```

로컬 컴포넌트에서 state를 제어하고 있습니다. `addValue`는 숫자 자료형으로 변형해서 payload로 전달하고 있습니다.

```js
// features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions;

export default counterSlice.reducer;
```

`Counter` 컴포넌트에서 `payload`로 `addValue`를 받아 `addValue` 단위로 숫자를 늘리고 줄입니다.

`increment`, `decrement`, `incrementByAmount`, `reset`은 액션에 해당합니다. 액션을 `export`하는 것을 잊지말도록 합니다. 이런 액션을 `dispatch`에 대입하는 것은 동일한 로직을 갖습니다.

여기까지는 간단한 state 설정입니다.

[react_redux_toolkit / 01_lesson/](https://github.com/gitdagray/react_redux_toolkit/tree/main/01_lesson)

### 02_lesson: React Redux Example Project with Redux Toolkit

[React Redux Example Project with Redux Toolkit](https://www.youtube.com/watch?v=hI-VgEaCMyQ)

리덕스 앱 구조와 데이터 흐름을 더 잘 이해해보려는 튜토리얼입니다. RTK 예제를 응요한 강의자료입니다.

```js
// src/features/posts/postSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    content: "I've heard bad things.",
  },
  {
    id: '2',
    title: 'Slice...',
    content: 'The more I say slice, the more I want pizza',
  },
];

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});

export default postSlice.reducer;
```

리듀서함수를 만듭니다. `postSlice.reducer`를 사용할 때 조심합니다. createSlice에 대입한 객체의 프로퍼티 reducers랑 함수가 반환하고 그 값이 할당 된 식별자 postSlice의 reducer랑은 당연히 다른 프로퍼티입니다.

```js
import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postSlice';

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});
```

store에 연결합니다.

```js
// features/posts/PostsList.js
import { useSelector } from 'react-redux';

const PostsList = () => {
  const posts = useSelector((state) => state.posts);
  const renderedPosts = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
    </article>
  ));
  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostList;
```

`useSelector`는 `store`의 키값으로 `state`에 접근한다는 것으로 알 수 있습니다.

```js
import PostList from './features/posts/PostsList';

function App() {
  return (
    <main className="App">
      <PostList />
    </main>
  );
}

export default App;
```

설계방식은 아주 깊은 의존성을 갖고 있습니다. slice랑 slice를 사용하는 컴포넌트는 높은 결합도를 갖게 설계하는 것도 전략입니다.

```js
// src/features/posts/postSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    content: "I've heard bad things.",
  },
  {
    id: '2',
    title: 'Slice...',
    content: 'The more I say slice, the more I want pizza',
  },
];

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});

// 사용할 콜백함수를 추가합니다.
export const selectAllPost = (state) => state.posts;

export default postSlice.reducer;
```

```js
// src/features/posts/PostsList.js
import { useSelector } from 'react-redux';
import { selectAllPost } from './postSlice'; // 사용할 함수를 불러옵니다.

const PostsList = () => {
  const posts = useSelector(selectAllPost);
  const renderedPosts = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
    </article>
  ));
  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
```

튜토리얼은 한번에 구현여부를 확인했습니다. 저는 한번에 확인하지 말고 미리 구현을 점진적으로 확인할 것을 권장합니다.

```js
// src/features/posts/postSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    content: "I've heard bad things.",
  },
  {
    id: '2',
    title: 'Slice...',
    content: 'The more I say slice, the more I want pizza',
  },
];

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // 이렇게 액션을 추가합니다.
    postAdded: (state, action) => {
      // 직접 뮤테이션을 가할 수 있습니다.
      state.push(action.payload);
    },
  },
});

export const selectAllPost = (state) => state.posts;

// 액션 객체 함수를 같이 자동생성해줍니다.
export const { postAdded } = postSlice.actions;

export default postSlice.reducer;
```

RTK는 reducers의 메서드로 액션을 추가할 수 있습니다. 또 state를 직접 뮤테이션을 가할 수 있습니다(immer.js 덕분에 가능합니다. slice 내에서만 가능합니다.). 하지만 뮤테이션을 가하는 것처럼 보이기만 할 뿐 정말로 뮤테이션을 가하는 것은 아닙니다. 이렇게 메서드를 정의하면서 액션객체도 자동적으로 만들어집니다.

액션함수를 만들면 export를 할 때 아랫줄에 객체구조분해할당으로 내보냅니다.

```js
import { useState } from 'react';
// import { useDispatch } from "react-redux";
// import { nanoid } from "@reduxjs/toolkit";
// import { postAdded } from "./postSlice";

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button">Save Post</button>
    </section>
  );
};
```

form을 이렇게 만들 수 있습니다.

```js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { postAdded } from './postSlice';

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postAdded({
          id: nanoid(),
          title,
          content,
        })
      );
      setTitle('');
      setContent('');
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  );
};

export default AddPostForm;
```

이렇게 추가(Add)를 처리합니다. 컨벤션상 hook은 컴포넌트 시작하는 최상단에 작성하기를 권장합니다.

이제 유효성을 검증하고 재사용성을 위해 추상화하겠습니다. 이런 로직들을 slice에서 처리하겠습니다.

```js
// src/features/posts/postSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    content: "I've heard bad things.",
  },
  {
    id: '2',
    title: 'Slice...',
    content: 'The more I say slice, the more I want pizza',
  },
];

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // 기존 reducer의 postAdded 액션을 리팩토링
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      // prepare callback
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
  },
});

export const selectAllPost = (state) => state.posts;

export const { postAdded } = postSlice.actions;

export default postSlice.reducer;
```

기존 reducer의 postAdded 액션을 리팩토링합니다. prepare callback으로 추가하는 로직들을 처리합니다.

```js
// features/posts/AddPostFrom
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAdded } from './postSlice';

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      // payload를 객체로 전달할 필요가 없습니다.
      dispatch(postAdded(title, content));
      setTitle('');
      setContent('');
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  );
};

export default AddPostForm;
```

payload를 객체로 전달할 필요가 없습니다. 리듀서에서 처리하기 때문에 괜찮습니다.

```js
// features/users/usersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '0', name: 'Dude Lebowski' },
  { id: '1', name: 'Neil Young' },
  { id: '2', name: 'Dave Gray' },
];
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});
export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer;
```

이제 사용자를 추가하겠습니다.

```js
// features/posts/AddPostFrom
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAdded } from './postSlice';
import { selectAllUsers } from '../users/usersSlice';

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // 로컬에서 관리할 state추가
  const [userId, setUserId] = useState('');

  // users 데이터 구독
  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  // 작성자 추가
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      // userId 추가
      dispatch(postAdded(title, content, userId));
      setTitle('');
      setContent('');
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  );
};

export default AddPostForm;
```

유효성 검증을 추가합니다.

```js
// features/posts/AddPostFrom
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAdded } from './postSlice';
import { selectAllUsers } from '../users/usersSlice';

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));
      setTitle('');
      setContent('');
    }
  };

  // 유효성 검증
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  // 사용자 목록 보기
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        {/* 사용자 목록 선택 */}
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      {/* disabled로 유효성 검증 */}
      <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
        Save Post
      </button>
    </section>
  );
};

export default AddPostForm;
```

이제 작성자를 보여줍니다.

```js
// features/posts/PostAuthor
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);
  const author = users.find((user) => user.id === userId);
  return <span>by {author ? author.name : 'Unknown author'}</span>;
};

export default PostAuthor;
```

```js
// src/features/posts/PostsList.js
import { useSelector } from 'react-redux';
import { selectAllPost } from './postSlice';
import PostAuthor from './PostAuthor';

const PostsList = () => {
  const posts = useSelector(selectAllPost);
  const renderedPosts = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
      </p>
    </article>
  ));
  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
```

이제는 작성 시간을 추가하겠습니다.

```sh
npm i date-fns
```

`date-fns` 라이브러리를 설치하겠습니다.

```js
// features/posts/TimeAgo
import { parseISO, formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ timestamp }) => {
  let timeAgo = '';
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
```

새로운 컴포넌트를 만듭니다.

```js
// src/features/posts/postSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    content: "I've heard bad things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },
  {
    id: '2',
    title: 'Slice...',
    content: 'The more I say slice, the more I want pizza',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
  },
];

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
          },
        };
      },
    },
  },
});

export const selectAllPost = (state) => state.posts;

export const { postAdded } = postSlice.actions;

export default postSlice.reducer;
```

`date` 프로퍼티를 추가합니다.

```js
// src/features/posts/PostsList.js
import { useSelector } from 'react-redux';
import { selectAllPost } from './postSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';

const PostsList = () => {
  const posts = useSelector(selectAllPost);
  const renderedPosts = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
    </article>
  ));
  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
```

이렇게 작성하면 작성 시간을 볼 수 있습니다. 하지만 단점이 있습니다. 새로운 것은 최상단에 보는 것이 좋습니다.

```js
// src/features/posts/PostsList.js
import { useSelector } from 'react-redux';
import { selectAllPost } from './postSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';

const PostsList = () => {
  const posts = useSelector(selectAllPost);

  // 최근이 앞으로 오게 순서를 변경합니다.
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  // 최근순 부터오는 배열에 map을 사용합니다.
  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
    </article>
  ));
  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
```

이렇게하면 시간을 볼수 있게 됩니다.

```js
// src/features/posts/postSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    content: "I've heard bad things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 },
  },
  {
    id: '2',
    title: 'Slice...',
    content: 'The more I say slice, the more I want pizza',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 },
  },
];

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPost = (state) => state.posts;

export const { postAdded } = postSlice.actions;

export default postSlice.reducer;
```

이렇게 리액션을 추가할 수 있습니다. 데이터 조작은 slice 내에서 처리하기를 권장합니다.

```js
// features/posts/ReactionButtons
import { useDispatch } from 'react-redux';
import { reactionAdded } from './postSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
};
```

이모지로 매핑할 객체를 만듭니다.

```js
// features/posts/ReactionButtons
import { useDispatch } from 'react-redux';
import { reactionAdded } from './postSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  // 스코프 밖에 있는 reactionEmoji를 맵핑합니다.
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
```

컴포넌트를 이렇게 만듭니다.

```js
// src/features/posts/PostsList.js
import { useSelector } from 'react-redux';
import { selectAllPost } from './postSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostsList = () => {
  const posts = useSelector(selectAllPost);

  // 최근이 앞으로 오게 순서를 변경합니다.
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  // 최근순 부터오는 배열에 map을 사용합니다.
  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  ));
  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
```

### 3_lesson: React Redux Thunk Middleware in Redux Toolkit for Async Actions with Axios

[React Redux Thunk Middleware in Redux Toolkit for Async Actions with Axios](https://www.youtube.com/watch?v=93CR_yURoII)

Async Thunk로 컴포넌트를 활성화하고 서버랑 통신할 수 있습니다.

기본적으로 리덕스는 모든 것을 동기적으로 처리합니다. 무엇이든 비동기적이면 store 외부에서 처리해야 합니다. 이럴 때 사용하는 것이 미들웨어입니다. 이때 가장 흔히 사용하는 것이 Async Thunk입니다. Thunk라는 단어는 지연된 작업을 하는 코드의 한 부분이라는 뜻을 갖은 프로그래밍 용어입니다. 이 의미로 비동기작업을 진행합니다.

이제 시작하면서 state의 초기값을 제거할 것입니다.

```js
// features/posts/postsSlice
import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

// 여기를 지웁니다.
const initialState = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: '2',
    title: 'Slices...',
    content: 'The more I say slice, the more I want pizza.',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
```

통신해서 성공시 데이터를 가져오고 통신상태를 추적합니다.

```js
// features/posts/postsSlice
import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = {
  // posts는 비여있는 배열로 하이드레이션이 아직 안 되어 있습니다.
  posts: [],
  status: 'idle',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
```

앞으로 `state.posts` 프로퍼티로 데이터를 보관합니다.

이제 `axios`를 설치합니다.

```sh
npm i axios
```

```js
// features/posts/postsSlice
import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

// 통신할 URL을 상수로 지정합니다.
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  // posts는 비여있는 배열로 하이드레이션이 아직 안 되어 있습니다.
  posts: [],
  status: 'idle',
  error: null,
};

// Thunk 함수입니다. store의 키값과 식별자명을 붙여서 액션의 이름을 만듭니다.
// 키/식별자명
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
```

thunk 함수를 생성합니다. 첫번째인자는 액션에 해당하는 문자열입니다. creator payload callback함수를 넣습니다. 비동기함수로 통신여부에 따라 데이터를 얻습니다.

슬라이스 리듀서는 가끔은 리듀서 외부 액션에 해당하는 리듀서가 필요할 때가 있습니다.

```js
// features/posts/postsSlice
import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

// 통신할 URL을 상수로 지정합니다.
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  // posts는 비여있는 배열로 하이드레이션이 아직 안 되어 있습니다.
  posts: [],
  status: 'idle',
  error: null,
};

// Thunk 함수입니다.
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  //   Thunk함수를 처리합니다. builder인 이유는 추가 리듀서의 액션을 만어주기 때문입니다.
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, pending) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // 날짜와 리액션을 추가합니다.
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
          };
          return post;
        });
        // fetch한 데이터는 모두 추가합니다.
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
```

이렇게 보면 switch-case문 처럼 보입니다.

```js
// features/posts/PostsList
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from './postsSlice';
import { useEffect } from 'react';

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};
export default PostsList;
```

로컬 컴포넌트에서 데이터를 요청합니다.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { fetchUsers } from './features/users/usersSlice';

store.dispatch(fetchUsers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

이렇게 store에 프로퍼티로 달아두면 로그인 시점에 서버로부터 사용자 정보를 가져오게 만들 수 있습니다.

이제는 post로 생성하는 법을 구현합니다.

```js
// features/posts/postsSlice
import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

// 통신할 URL을 상수로 지정합니다.
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  // posts는 비여있는 배열로 하이드레이션이 아직 안 되어 있습니다.
  posts: [],
  status: 'idle',
  error: null,
};

// Thunk 함수입니다.
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const addNewPost = createAsyncThunk(
  'post/addNewPost',
  async (initialPost) => {
    try {
      const response = await axios.post(POSTS_URL, initialPost);
      // 배열 전체를 받는 데이터는 아닙니다. 통신 성공을 응답합니다.
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  //   Thunk함수를 처리합니다. builder인 이유는 추가 리듀서의 액션을 만어주기 때문입니다.
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, pending) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // 날짜와 리액션을 추가합니다.
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
          };
          return post;
        });
        // fetch한 데이터는 모두 추가합니다.
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.data = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        };
        state.posts.push(action.payload);
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
```

```js
// features/posts/AddPostForm
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewPost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

const AddPostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  // every를 메서드로 활용한 함수로 리팩토링합니다.
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(addNewPost(title, content, userId));
      setTitle('');
      setContent('');
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};
export default AddPostForm;
```

완성입니다.

```js
// features/posts/AddPostForm
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewPost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

const AddPostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  const onSavePostClicked = () => {
    if (canSave) {
      setAddRequestStatus('pending');
      dispatch(addNewPost({ title, body: content, userId })).unwrap();

      setTitle('');
      setContent('');
      setUserId('');
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};
export default AddPostForm;
```

## TIL.22.12.22.-yarn을 씁시다.

### error log

#### json-server는 무조건 yarn을 사용합니다.

##### 문제: json-server

아래 명령을 시도했는데 동작하지 않았습니다.

```sh
json-server --watch db.json --port 3001
```

#### 시도: 모듈삭제

노드 모듈을 삭제하고 재설치 시도를 했습니다. `package.json`에 `json-server`가 설치되지 않았다는 것도 확인했습니다.

#### 해결: yarn json-server --watch db.json --port 3001

```sh
yarn json-server --watch db.json --port 3001
```

#### 학습: 일부 라이브러리는 yarn만 사용할 수 있습니다.

일부 라이브러리는 `yarn`만 사용할 수 있습니다. `npm`으로 사용할 수 없는 경우도 존재합니다.

### react-script: 5.0.1

#### 문제: npm start

`react must be in scope when using jsx`라고 피드백을 돌려주었습니다.

에러에 대한 피드백부터 특이했습니다. 이상한 에러메시지를 반환했습니다.

#### 시도: 검색

[hello - react must be in scope when using jsx](https://beta.sayhello.so/search?q=react+must+be+in+scope+when+using+jsx)

[stack overflow - "React must be in scope when using JSX" (react/react-in-jsx-scope with "window.React = React" on index.js)](https://stackoverflow.com/questions/49335781/react-must-be-in-scope-when-using-jsx-react-react-in-jsx-scope-with-window-r)

```jsx
import React from 'react';
```

#### 해결: react-script 버전 업데이트

기존 `package.json`에는 `react-script`의 `2.x.x` 버전으로 설치되어 있었습니다. 그래서 `5.0.1`로 업데이트했습니다.

#### 학습: 에러메시지도 믿을 만한 것은 아닙니다. 또 yarn을 애용합시다.

CRA로 npx로 설치했습니다. 이럴 경우 오래된 버전으로 설치될 수 있습니다. 또 오래된 버전으로 생긴 에러는 신뢰하기 어려운 에러메시지를 피드백으로 돌려줄 수 있습니다.

## TIL.22.12.23.-커밋 컨벤션

### 커밋 컨벤션

커밋 컨벤션은 작게 시작하는게 좋습니다. 작은 팀은 작은 컨벤션에서 점점 유형을 추가하는 방식이 좋습니다.

| 태그이름   | 내용                                |
| ---------- | ----------------------------------- |
| `Feat`     | 기능추가                            |
| `Fix`      | 버그 픽스                           |
| `Refactor` | 동일한 기능에 최적화 or 네이밍 수정 |
| `Chore`    | 잡일                                |

### API

```json
{
  "boards": ["..."]
}
```

`.../boards`로 통신하지만 표기는 단수인 `.../board`로 작성합니다.

### 기대랑 예상은 많은 경우 다릅니다.

컨벤션을 많이 합의했다고 생각했지만 아닌 경우가 많습니다.

## TIL.22.12.26. - patch를 위해 input 채우기

### 편집 버튼을 누르면 input을 채웁니다.

맥락을 위해 댓글 편집 기능을 구현하는 것입니다. 로직은 편집을 구현하기 위해서 먼저 작성한 데이터를 저장합니다. 저장한 데이터를 편집하는 단계를 거칩니다. 편집을 완료하면 저장합니다. 저장은 서버에 반영시킵니다.

```txt
├── src/
│   ├── components/
│   │   ├── CommentRead.jsx/
│   │   └── CommentCreate.jsx/
│   └── redux/
│       ├── config/
│       │   └── configStore.js
│       └── modules/
│           └── commentSlice.js
```

프로젝트 디렉토리는 위처럼 생겼습니다.

```js title="CommentRead.js"
if (!isLoading) {
  const renderedComments = comments
    .filter((comment) => comment.boardId === id)
    .map((comment) => (
      <div key={comment.id}>
        <div>작성자: {comment.name}</div>
        <div>댓글내용: {comment.comment}</div>
        <button onClick={() => handleEditComment(comment.id)}>편집</button>
        <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
      </div>
    ));

  return (
    <CommentReadStyled>
      <div>
        <p>작성자</p>
        <p>댓글내용</p>
      </div>

      <div>{comments ? renderedComments : '댓글이 없습니다.'}</div>
    </CommentReadStyled>
  );
}
```

순회하는 목록에서 id를 선택하는 것은 생각보다 쉽습니다. `handleEditComment`의 인자는 순회를 하면서 `id`를 대입합니다.

```js title="CommentRead.js"
const handleEditComment = (id) => {
  dispatch(editComment(id));
};
```

아까 본 `handleEditComment`의 정의입니다. `editComment`을 `dispatch`합니다.

```js title="commentsSlice.js"
const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    editComment: (state, action) => {
      state.editText = action.payload;
    },
    emptyComment: (state) => {
      state.editText = null;
    },
  },
```

`editComment`의 정의입니다. 그리고 `emptyComment`의 정의도 같이 봅시다. `editComment`는 `dispatch`로 보낸 `id`를 잠시 보관하기 위해 사용합니다. 반대로 `emptyComment`는 보관한 데이터를 비우기 위해 사용하는 메서드입니다.

```js title="commentsSlice.js"
const initialState = {
  comments: [],
  isLoading: false,
  error: null,
  editText: null,
};
```

`initialState`에 잠시 보관할 프로퍼티 `editText`를 `null`로 정의합니다. `null`로 정의한 방식은 중요합니다. 의도적으로 비어있음을 표현하기 위함입니다.

```js title="commentCreate.js"
const { editText, comments } = useSelector((state) => state.comments);
```

`store`를 위 코드로 접근합니다.

```js title="commentCreate.js"
// useEffect 내부 boardId, id을 접근하기 위해 사용합니다.
let editTextSaveRef = useRef(null);

useEffect(() => {
  if (editText) {
    const { boardId, comment, id, name, password } = comments.find(
      (comment) => comment.id === editText
    );
    setWriter(name);
    setComment(comment);
    setPassword(password);

    editTextSaveRef.current = { boardId, id };
  }
}, [editText]);
```

`editText`가 `null`이 아닌 어떤 `id`값을 갖을 때 실행하도록 조건문을 추가했습니다. `comments.find`으로 db에서 해당하는 댓글의 데이터를 찾습니다. `CreateComment`는 제어된 `input`을 갖고 있는 로컬 컴포넌트에서 `setter 함수`로 댓글 데이터로 업데이트합니다.

`useRef`로 `useEffect`내부 콜백함수에서 `boardId`, `id`를 외부 스코프로 유출시킵니다.

```js title="commentCreate.js"
{
  editText ? (
    <button onClick={(e) => handleSaveComment(e)}>댓글저장</button>
  ) : (
    <button onClick={(e) => handlePostComment(e)}>댓글작성</button>
  );
}
```

`editText`의 상태에 따라 `patch` 혹은 `post`용 버튼을 각각 다르게 보여줍니다. `handleSaveComment`가 `patch`합니다.

```js title="commentCreate.js"
const handleSaveComment = () => {
  const editTextSave = {
    id: editTextSaveRef.current.id,
    boardId: editTextSaveRef.current.boardId,
    name: writer,
    comment: comment,
    password: password,
  };

  dispatch(patchCommentThunk(editTextSave));
  dispatch(emptyComment());
  setWriter('');
  setComment('');
  setPassword('');
};
```

`handleSaveComment`는 `editTextSave`에 업데이트할 데이터를 담고 `patchCommentThunk`으로 `store`에 보냅니다. 그리고 `editText`을 초기화할
`emptyComment`를 실행합니다. 그리고 로컬 컴포넌트의 제어된 input을 모두 초기화합니다.

```js title="commentCreate.js"
// 편집용 editText을 초기화합니다.
useEffect(() => {
  dispatch(emptyComment());
}, []);
```

이 `useEffect`를 통해서 다른 페이지를 접근할 때마다 `editText`를 `null`로 초기화합니다.

## TIL.22.12.27. - 모달은 global state 활용하기

[[react] 모달 팝업창 만들기 (react modal)](https://phrygia.github.io/react/2021-09-21-react-modal/)

위 블로그를 참고했습니다.

```js
const initialState = {
  boards: [],
  isLoading: false,
  error: null,
  createBoardModalVisibility: false,
};

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    showCreateBoardModal: (state) => {
      state.createBoardModalVisibility = true;
    },
    hideCreateBoardModal: (state) => {
      state.createBoardModalVisibility = false;
    },
  },
}
```

모달의 state를 글로벌 state로 제어합니다.

```js
// 구독
const modalVisibility = useSelector(
  (state) => state.boards.createBoardModalVisibility
);

// 추가
const handleSubmitBoard = (e) => {
  e.preventDefault();
  const newBoard = {
    id: nanoid(),
    name,
    title,
    category: `todo`,
    content,
    password,
  };
  dispatch(postBoardThunk(newBoard));
  resetAllInput();
  dispatch(hideCreateBoardModal());
  openScroll();
};

// 취소
const cancelPostBoard = () => {
  resetAllInput();
  dispatch(hideCreateBoardModal());
  openScroll();
};
```

```js
return (
  <CreateBoardModalStyled visibility={modalVisibility ? 'show' : null}>
    <div className="modal">
      <div className="user-info">
        <input
          className="modal-input user-info-item"
          type="text"
          placeholder="담당자 이름"
          name="name"
          id="name"
          value={name}
          onChange={(e) => handleOnChangeName(e)}
        />
        <input
          className="modal-input user-info-item"
          type="password"
          placeholder="비밀번호"
          name="password"
          id="password"
          value={password}
          onChange={(e) => handleOnChangePassword(e)}
        />
      </div>
      <input
        className="modal-input"
        type="text"
        placeholder="제목"
        name="title"
        id="title"
        value={title}
        onChange={(e) => handleOnChangeTitle(e)}
      />
      <textarea
        className="modal-input text-area"
        name="content"
        id="content"
        placeholder="(내용)"
        value={content}
        onChange={(e) => handleOnChangeContent(e)}
      ></textarea>
      <div className="modal-btn-container">
        <button className="modal-btn-item" onClick={() => cancelPostBoard()}>
          취소
        </button>
        <button
          className="modal-btn-item"
          onClick={(e) => handleSubmitBoard(e)}
        >
          저장
        </button>
      </div>
    </div>
  </CreateBoardModalStyled>
);
```

조건부 렌더링을 `styled-components`로 처리하도록 합니다.

```js
display: ${(props) => (props.visibility ? "flex" : "none")};
```

## TIL.23.01.17. - Zustand, Tailwind, React&TypeScript

# 서론

꿀빨고 싶어서 간단하기로 소문난 라이브러리로 todo app을 만들어 보겠습니다.

다 큰 어른인데 설치랑 폴더구조 각자 알아서 하시기 바랍니다(사실 작성하기 귀찮습니다).

# store

```ts
// store.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { todoSlice } from '../types';
import createTodoSlice from './todoSlice';

/**
 * slice마다 추상화시키고 결합시킬 수 있습니다.
 * 초기설정
 * @see https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md
 * 타입스크립트 패턴
 * @see https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md#slices-pattern
 * 브라우저에 저장
 * @see https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md
 */
const useBoundStore = create<todoSlice>()(
  persist(
    (...a) => ({
      ...createTodoSlice(...a),
    }),
    { name: 'all-store', storage: createJSONStorage(() => localStorage) }
  )
);

export default useBoundStore;
```

앱의 핵심이 되는 store입니다.

공식문서에서 권장하는 것은 slice 패턴을 활용하는 것입니다.

# todoSlice

```ts
// todoSlice.ts
import { StateCreator } from 'zustand';
import type { todoSlice } from '../types';

const createTodoSlice: StateCreator<todoSlice> = (set) => ({
  //
  todos: [],

  //
  addTodo: (newTodo) => {
    set((state) => ({
      ...state,
      todos: [...state.todos, newTodo],
    }));
  },

  // 사용자가 편집을 완료하면 Save하는 기능입니다.
  updateTodo: (id, content) => {
    set((state) => ({
      ...state,
      todos: [...state.todos].map((todo) =>
        todo.id === id ? { ...todo, content } : todo
      ),
    }));
  },

  //
  deleteTodo: (id) => {
    set((state) => ({
      ...state,
      todos: [...state.todos].filter((todo) => todo.id !== id),
    }));
  },

  shiftTodo: (id, progress) => {
    set((state) => {
      const newArr = [...state.todos].filter((todo) => todo.id !== id);
      const shiftItem = [...state.todos].filter((todo) => todo.id === id)[0];
      return { ...state, todos: [...newArr, { ...shiftItem, progress }] };
    });
  },
});

export default createTodoSlice;
```

개별 Slice인 todoSlice입니다. 여기서 모든 CRUD를 지원하고 있습니다. 불변성을 유지하면서 코드가독성이 상당히 많이 떨어졌습니다. 물론 `immer.js`를 지원하게 때문에 활용해도 되지만 일단은 안 했습니다.

# types

```ts
// types.ts
export type progressType = 'todo' | 'done';

export type todoItemType = {
  id: string;
  content: string;
  progress: progressType;
};

export type todoSlice = {
  todos: todoItemType[];
  addTodo: (newTodoItem: todoItemType) => void;
  updateTodo: (id: string, content: string) => void;
  deleteTodo: (id: string) => void;
  shiftTodo: (id: string, progress: progressType) => void;
};

export type IconType = {
  icon: 'arrow-back-up' | 'circle-check' | 'edit' | 'trash';
};
```

그리고 모두가 공유하는 `types.ts`입니다.

결함은 1번만 호출하고 사용하는 type들을 유틸파일에 넣어서 관리한다는 것입니다. 사전에 1회 사용할 경우 해당 sliec에서 정의하는 패턴은 공식문서에 있었는데 놓쳤습니다.

이제는 APP입니다.

# App

```ts
// App.tsx
import { CreateTodo, TodoColum } from './components';
import useBoundStore from './Store/Store';

function App() {
  return (
    <div>
      <CreateTodo />
      <div className="max-w-7xl mx-auto my-0 flex flex-row gap-4">
        <TodoColum progress="todo" />
        <TodoColum progress="done" />
      </div>
    </div>
  );
}

export default App;
```

tailwind로 스타일링을 시작했습니다. 상당히 단순하고 지루합니다.

Zustand를 사용했기 때문에 ContextAPI도 필요없습니다.

저장은 `localStorage`에 하기 때문에 서버랑 통신하지 않았습니다. 브라우저 자체를 캐시처럼 활용해보는 연습도 필요한 것 같습니다. 물론 이것은 연습에 해당하는 것 같지는 않습니다.

# CreateTodo

```ts
import { ChangeEvent, FC, useState } from 'react';
import type { todoItemType } from '../types';
import { nanoid } from 'nanoid';
import useBoundStore from '../Store/Store';
import { useTextInput } from '../hooks';

const CreateTodo: FC = () => {
  const addTodo = useBoundStore((state) => state.addTodo);

  // useTextInput으로 리팩토링
  const {
    textInputValue: inputValue,
    handleInputChange,
    resetInput,
  } = useTextInput();

  // 데이터 스키마 정의하기
  const newTodo: todoItemType = {
    id: nanoid(),
    content: inputValue,
    progress: 'todo',
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    addTodo(newTodo);
    resetInput();
  };

  return (
    <form className="flex h-24 bg-slate-100 items-center justify-center gap-4">
      <input
        className="px-3 py-2 border-2 border-emerald-500 rounded-lg text-base"
        type="text"
        onChange={handleInputChange}
        value={inputValue}
      />
      <button
        className="px-3 py-2 border-2 border-emerald-500 bg-emerald-500 text-white rounded-lg text-base"
        onClick={handleSubmit}
      >
        생성
      </button>
    </form>
  );
};

export default CreateTodo;
```

todo를 생성할 수 있게 해주는 컴포넌트입니다. todoItemTpye은 2번 사용되었기 때문에 공유하는 것은 적절한 설계라는 생각이 듭니다.

참고로 저는 폴더 구조잘 짜는 것과 코드의 import export 잘 짜는 것도 설계라고 생각하는 모자란 사람입니다.

# todoColum

```ts
// todoColum.tsx
import { FC } from 'react';
import useBoundStore from '../Store/Store';
import type { progressType } from '../types';
import TodoItem from './TodoItem';

interface TodoColumProps {
  progress: progressType;
}

const TodoColum: FC<{ progress: progressType }> = ({
  progress,
}: TodoColumProps) => {
  const todos = useBoundStore((state) => state.todos);

  return (
    <div className="w-1/2">
      <h2 className="font-bold text-2xl py-4 px-2">{progress}</h2>
      <ul className="flex flex-col gap-4">
        {todos
          .filter((todo) => todo.progress === progress)
          .map(({ id, content, progress }) => (
            <li key={id}>
              <TodoItem id={id} content={content} progress={progress} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoColum;
```

여러개의 목록을 묶어내는 컴포넌트에 해당합니다. 즉 `ul`, `il`관계에서 `ul`에 해당합니다.

Zustand 덕분에 `useBoundStore로` 글로벌 state를 간단하게 접근합니다. 목록 하나만 간단하게 선택합니다. 이렇게 보면 상당히 좋은 추상화입니다.

`FC`를 타입으로 지정하시는 분들도 있고 `ComponentNameProps`라고 인터페이스를 정의하고 `args`에 타입을 지정하는 사람도 있습니다.

`FC`는 많지만 구시대적인 것 같습니다. 하지만 제가 제네릭을 사용할 줄 아는 간지나는 사람 흉내를 내볼 수 있습니다. 물론 개발자 흉내내기도 어려워하는 사람이 이런 짓거리하고 있습니다.

# todoItem

```ts
// todoItem.tsx
import arrowBackUp from '/arrow-back-up.svg';
import circleCheck from '/circle-check.svg';
import edit from '/edit.svg';
import trash from '/trash.svg';
import cornerDownLeft from '/corner-down-left.svg';
import { FC, useState } from 'react';
import type { todoItemType } from '../types';
import useBoundStore from '../Store/Store';
import { useTextInput } from '../hooks';
import IconButton from './IconButton';

const TodoItem: FC<todoItemType> = ({ content, id, progress }) => {
  const { deleteTodo, shiftTodo, updateTodo } = useBoundStore(
    ({ deleteTodo, shiftTodo, updateTodo }) => ({
      deleteTodo,
      shiftTodo,
      updateTodo,
    })
  );

  // 추측: editing은 local state로 고유해도 됩니다.
  const [isEditing, setIsEditing] = useState(false);
  const { textInputValue, handleInputChange } = useTextInput(content);

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      updateTodo(id, textInputValue);
    }
  };

  return (
    <div className="bg-slate-100 flex flex-row justify-between items-center py-3 pr-2 pl-3 rounded-lg">
      {isEditing ? (
        <input
          className="font-medium text-base rounded-lg py-1 px-3 border-2 border-emerald-500"
          type="text"
          value={textInputValue}
          onChange={handleInputChange}
        />
      ) : (
        <h2 className="font-medium">{content}</h2>
      )}

      <div className="flex flex-row gap-2">
        {progress === 'todo' ? (
          <IconButton
            onClick={() => shiftTodo(id, 'done')}
            icon={circleCheck}
            alt="완료"
          />
        ) : (
          <IconButton
            onClick={() => shiftTodo(id, 'todo')}
            icon={arrowBackUp}
            alt="뒤로가기"
          />
        )}

        {!isEditing ? (
          <IconButton
            onClick={() => handleToggleEdit()}
            icon={edit}
            alt="편집"
          />
        ) : (
          <IconButton
            onClick={() => handleToggleEdit()}
            icon={cornerDownLeft}
            alt="수정완료"
          />
        )}

        <IconButton onClick={() => deleteTodo(id)} icon={trash} alt="삭제" />
      </div>
    </div>
  );
};

export default TodoItem;
```

`useBoundStore`에서 3개의 메서드를 뽑습니다. `deleteTodo`, `shiftTodo`, `updateTodo`, 3개를 뽑습니다.

# IconButton

```ts
//IconButton.tsx
import { FC } from 'react';

const IconButton: FC<{
  onClick: () => void;
  icon: string;
  alt: string;
}> = ({ onClick, icon, alt }) => {
  return (
    <button
      className="flex items-center justify-center p-2 bg-slate-200 rounded-lg"
      onClick={onClick}
    >
      <img src={icon} alt={alt} />
    </button>
  );
};

export default IconButton;
```

섭하지 않게 커스텀 컴포넌트입니다.

모든 클릭 이벤트는 대입하는 값이 없는 콜백함수라 가능합니다.

# useTextInput

```ts
// useTextInput.ts
import { useState, ChangeEvent } from 'react';

const useTextInput = (initText: string = '') => {
  const [textInputValue, setTextInputValue] = useState(initText);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInputValue(e.target.value);
  };

  const resetInput = () => {
    setTextInputValue('');
  };

  return { textInputValue, handleInputChange, resetInput };
};

export default useTextInput;
```

아주 귀여운 실력의 useTextInput입니다. custom hook입니다.

# 결론

Zustand, Tailwind는 🐶🍯입니다.

리액트를 위한 타입스크립트는 고인물들에게 패턴을 더 배워오겠습니다.
