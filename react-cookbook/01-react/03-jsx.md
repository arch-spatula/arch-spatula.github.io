---
sidebar_position: 3
draft: true
---

# 컴포넌트

리액트에서 컴포넌트는 레고랑 비슷합니다. 앱은 레고를 조립하는 방식으로 구현합니다.

누군가 컴포넌트를 만들라고 하먄 html을 `return`하는 부분만 조작하면 됩니다.

컴포넌트는 자바스크립트를 사용해야 할 때가 있습니다.

컴포넌트는 재사용할 수 있습니다. 재사용하려면 `export`, `import`가 필요합니다. 이 부분은 자바스크립트 문법에 해당합니다. `return`은 html처럼 생긴 JSX를 작성하는 영역입니다. 그 위는 자바스크립트로 로직을 처리합니다.

컴포넌트를 만들 때는 항상 파스칼케이스라는 것으 잊지말도록 합니다. 폴더는 카멜케이스로 작성합니다. 이름으로 컴포넌트, 폴더 등을 읽으면서 바로 추론할 수 있어야 합니다.

```jsx
import './App.css';

function App() {
  const handleClick = () => {
    alert('클릭!');
  };
  return (
    <div
      className="App"
      style={{
        height: '100vh',
        display: ' flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>이것은 내가 만든 App 컴포넌트입니다.</p>
      <button onClick={handleClick}>클릭!</button>
    </div>
  );
}

export default App;
```

이렇게 html처럼 생긴 자바스크립트로 화면을 구현할 수 있습니다.

컴포넌트를 부모 자식관계로 만들 수 있습니다. html은 부모자식 관계를 들었을 것입니다. 포함관계로 속해있으면 자식에 해당합니다.

화면에 보여지게 하는 것을 보고 랜더링이라고 부릅니다. return에 작성하는 코드들을 보고 JSX라고 합니다.

```jsx
import './App.css';

const Child = () => {
  return (
    <div>
      <span>Child</span>
    </div>
  );
};

const Parent = () => {
  return (
    <div>
      <h2>Parent</h2>
      <Child></Child>
    </div>
  );
};

function App() {
  return (
    <div>
      <h1>Grand Parent</h1>
      <Parent></Parent>
    </div>
  );
}

export default App;
```

부모자식, 자매, 손주, 증조 관계를 만들 수 있습니다.

## JSX

JSX 문법입니다. 컴포넌트의 생김새를 정의하고 DOM 객체의 위치를 표현할 때 사용합니다.

놀랍게도 바벨이라는 라이브러리가 변환해주는 것입니다. 그래서 자바스크립트입니다. html에 없는 문법 규칙이 있습니다. 무엇이 있는지 알아야 합니다.

오류 메시지를 잘 보도록 합니다.

태그는 짝을 맞추어야 합니다.

```jsx
// input 태그를 닫지 않고 넣어볼거예요!
function App() {
  return (
    <div className="App">
      <input type='text'>
    </div>
  );
}
```

참고로 홀태그는 `<tagName />`이렇게 작성합니다.

```jsx
return (
    <p>안녕하세요! 리액트 반입니다 :)</p>

    <div className="App">
      <input type='text'/>
    </div>
);
```

모든 태그는 하나의 태그 안에 있어야 합니다. `div` 혹은 Fragments(`<></>`)로 감싸야 합니다.

모든 속성은 카멜케이스로 변환해서 작성합니다.

```jsx
return (
  <div className="App">
    <p>안녕하세요! 리액트 반입니다 :)</p>
    <input type="text" />
  </div>
);
```

`class`는 `className`으로 작성합니다. 자바스크립트 예약어랑 충돌합니다. 그리고 대부분의 html 속성은 카멜 케이스로 작성합니다.

```jsx
// 중괄호를 두 번 쓰는 이유? 딕셔너리도 자바스크립트니까요!
// 이렇게 쓰거나,
<p style={{ color: 'orange', fontSize: '20px' }}>orange</p>;

//혹은 스타일 딕셔너리를 변수로 만들고 쓸 수 있어요!
function App() {
  const styles = {
    color: 'orange',
    fontSize: '20px',
  };

  return (
    <div className="App">
      <p style={styles}>orange</p>
    </div>
  );
}
```

html 태그에 스타일을 넣는 방법이 조금 다릅니다. 객체로 넣어야 합니다.

```jsx
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const number = 1;

  return (
    <div className="App">
      <p>안녕하세요! 리액트 반입니다 :)</p>
      {/* JSX 내에서 코드 주석은 이렇게 씁니다 :) */}
      {/* 삼항 연산자를 사용했어요 */}
      <p>
        {number > 10 ? number + '은 10보다 크다' : number + '은 10보다 작다'}
      </p>
    </div>
  );
}

export default App;
```

자바스크립트 코드는 중괄호속에 작성합니다.

## props

컴포넌트를 잘 다루기 위해서는 2가지를 잘 다루어야 합니다. state와 props입니다.

props는 부모컴포넌트로 가져온 데이터입니다. props는 컴포넌트가 부모에서 자식으로 전달하는 데이터입니다. 속성값으로 전달해주면 됩니다.

```jsx
// src/App.js

import React from 'react';

function App() {
  return <GrandFather />;
}

function GrandFather() {
  return <Mother />;
}

function Mother() {
  const name = '홍부인';
  return <Child />;
}

function Child() {
  return <div>연결 성공</div>;
}

export default App;
```

props는 부모로 부터 받은 모든 데이터입니다. 부모에서 입력한 속성값으로 접근할 수 있습니다.

```js
import React from 'react';

// div안에서 { } 를 쓰고 props.motherName을 넣어보세요.
function Child(props) {
  return <div>{props.motherName}</div>;
}

function Mother() {
  const name = '홍부인';
  return <Child motherName={name} />;
}

function GrandFather() {
  return <Mother />;
}

function App() {
  return <GrandFather />;
}

export default App;
```

이런 식으로 데이터를 전달할 수 있습니다. props의 데이터 전달은 일방적입니다. 부모에서 자식에게만 전달할 수 있습니다.

```jsx
import React from 'react';

// div안에서 { } 를 쓰고 props.motherName을 넣어보세요.
function Child({ GrandFatherName }) {
  return <div>{GrandFatherName}</div>;
}

function Mother({ GrandFatherName }) {
  return <Child GrandFatherName={GrandFatherName}></Child>;
}

function GrandFather(props) {
  const name = 'ATF is ';
  return <Mother GrandFatherName={name}></Mother>;
}

function App() {
  return <GrandFather />;
}

export default App;
```

이런식으로 자식에게 전달할 수 있습니다. 관례적으로 매개변수는 props로 보냅니다.

많은 경우 객체구조분해할당으로 전달하는 경우도 많습니다.

props drilling은 그 자체가 문제는 전혀 아닙니다. 하면 복잡해질 수 있어서 문제인 것 뿐입니다. 그래서 state를 잘 설계하고 라이프러리와 상태관리 프레임워크를 활용합니다.

prop types는 props에 종류들이 존재합니다. props는 사용하는 쪽에서 정의하는 경우가 있습니다. props의 타입을 미리 지정하지 않으면 여러 문제가 발생할 수 있습니다. 의도하지 않은 형변환으로 버그를 유발할 수 있습니다.

[PropTypes와 함께 하는 타입 검사](https://ko.reactjs.org/docs/typechecking-with-proptypes.html#gatsby-focus-wrapper)

다른 방법으로 자식에게 데이터를 전달할 수 있습니다.

`children`으로 전달할 수 있습니다. 자식에서 데이터를 받아 처리하는 것이 아닙니다. 태그 사이 존재하는 콘텐츠로 전달하는 방법이 `children`입니다.

```jsx
import React from 'react';

function User(props) {
  return <div>{props.children}</div>;
}

function App() {
  return <User>안녕하세요</User>;
}

export default App;
```

이렇게 하면 콘텐츠 영역의 내용으로 전달할 수 있습니다.

보통 레이아웃에 많이 활용합니다. 레이아웃 컴포넌트의 `children`으로 스타일을 한번에 적용할 수 있습니다.

구조 분해할당으로 더욱더 가독성 높은 코드를 작성할 수 있습니다. props 키워드를 줄이고 객체의 key를 입력하는 것으로 접근할 수 있습니다.

```jsx
function Todo({ title, body, isDone, id }) {
  return <div>{title}</div>;
}
```

지정안해도 기본값을 갖도록 만들 수 있습니다.

```jsx
// components/Child.js

import React from 'react';

function Child({ name }) {
  return <div>내 이름은 {name} 입니다. </div>;
}

// 이렇게 설정합니다.
Child.defaultProps = {
  name: '기본 이름',
};

export default Child;
```

객체 구조분해할당으로 정의하고 속성값의 객체에 지정하면 됩니다.

예를 들어 비로그은 마이페이처럼 유저정보가 없을 때 기본으로 제공해야 하는 props를 바로 넣을 수 있습니다.

PropTypes는 타임스크립트를 활용하기 전에 사용할 수 있는 전략입니다.

```js
import PropTypes from 'prop-types';

function HelloWorldComponent({ name }) {
  return <div>Hello, {name}</div>;
}

HelloWorldComponent.propTypes = {
  name: PropTypes.string,
};

export default HelloWorldComponent;
```

위는 클래스형 컴포넌트이지만 함수형컴포넌트도 위처럼 사용할 수 있습니다.

[PropTypes와 함께 하는 타입 검사](https://ko.reactjs.org/docs/typechecking-with-proptypes.html#gatsby-focus-wrapper) 공식 문서를 잘 읽기 바랍니다.

# React 입문

## State

State랑 props만 알아도 리액트의 상당부분을 알게되는 것입니다.

state를 사용할 때는 useState 훅을 사용합니다. state를 통해 데이터를 변형하는 이유입니다. 컴포넌트에는 라이프 사이클이 있습니다. 화면의 변화된 값을 업데이트하기 위해서 이렇게 합니다. state에 따라 랜더링 여부를 반영하고 판단합니다. 리액트라 변화를 감지하고 즉시 랜더링하게 만들기 위해서 state를 활용합니다.

state는 리액트에서만 제공하고 존재합니다. 이것은 hook이라고 부릅니다.

```js
import React, { useState } from 'react';

function GrandFather() {
  const [name, setName] = useState('김할아'); // 이것이 state!
  return <Mother grandFatherName={name} />;
}

// .. 중략
```

`name`은 state값입니다. `setName`은 Setter함수입니다. 이 함수로 `name`값을 업데이트할 수 있습니다.

```js
// src/App.js

import React, { useState } from 'react';

function Child(props) {
  return (
    <div>
      <button
        onClick={() => {
          props.setName('박할아');
        }}
      >
        할아버지 이름 바꾸기
      </button>
      <div>{props.grandFatherName}</div>
    </div>
  );
}

function Mother(props) {
  return (
    <Child grandFatherName={props.grandFatherName} setName={props.setName} />
  );
}

function GrandFather() {
  const [name, setName] = useState('김할아');
  return <Mother grandFatherName={name} setName={setName} />;
}

function App() {
  return <GrandFather />;
}

export default App;
```

화면에서 바뀐 값만 반영합니다. 서버랑 통신해야 바뀐 값을 저장할 수 있습니다.

위 코드는 `setter`함수도 `props`로 같이 전달합니다.

컴포넌트의 라이프 사이클과 리랜더링 조건을 알아내도록 합니다.

웹사이트에서 사용자가 상호작용해서 데이터를 변형하는 경우입니다.

```js
import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('춉춉이');
  const onClickHandler = () => {
    setName('루랑이');
  };
  return (
    <div>
      <button onClick={onClickHandler}>{name}</button>
    </div>
  );
}

export default App;
```

버튼을 클릭하면 state가 업데이트 됩니다.

```js
import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const handleTyping = (event) => {
    setText(event.target.value);
  };
  return (
    <div>
      <input type="text" onChange={handleTyping} value={text} />
    </div>
  );
}

export default App;
```

input에 state를 설정하는 방법입니다.

이벤트 객체는 DOM의 개념입니다.

리액트를 사용할 때는 불변성을 주의해야 합니다. 자바스크립트 데이터 중에 원시형은 불변성이 있고 참조형은 불변성이 없습니다. 메모리의 동작 방식의 문제입니다. 원시형을 비교할 때 엄밀비교하고 동일하면 true를 반환하는 이유는 주소가 동일하기 때문입니다.

참조형은 불변성이 없습니다.

```js
let obj1 = { name: 'kim' };
let obj2 = { name: 'kim' };
console.log(obj1 === obj2); // false
```

각다 다른 주소를 갖고 있기 때문에 동일하게 보여도 주소가 다릅니다.

리액트에서는 데이터의 불변성을 지켜주는 것이 중요합니다. 리랜더링 기준은 state가 변하고 안 변하고가 기준입니다. state 변화 전후를 비교합니다. state의 변화를 알아내기 위해서는 메모리 주소를 비교하는 전략을 활용합니다. 리액트에서 state value만 새로 할당하는 것은 리랜더링이 발생하지 않습니다(`state = "valeu"`). setter함수를 통해 변경해야지만 리랜더링이 발생합니다. setter함수를 통해 변경해야 이전 이후 메모리 차이가 나게 말들 수 있기 때문입니다(`setState("new value")`). 리액트는 내부에서 참조형비교의 `false`가 발생하는지 확인하고 변경여부를 판단하는 방식으로 동작합니다.

직접 수정하지 않습니다. 기존의 값을 복사하고 그 이후의 값을 추가하고 삭제하는 방식으로 구현합니다.

## 컴포넌트와 랜더링

이번에는 이론입니다.

리액트의 모든 UI들은 컴포넌트로 만듭니다. 컴포넌트 기반 라이브러리의 장점을 배웁니다.

컴포넌트는 UI의 최소 단위 선언체입니다. 리액트 컴포넌트가 선언체라는 것은 중요한 개념입니다. 이전까지는 직업 DOM을 조작하는 명령형 프로그래밍이었습니다.

명령형: 어떻게(How)를 중요시여겨서 프로그램의 제어의 흐름과 같은 방법을 제시하고 목표를 명시하지 않는 형태입니다.
선언형: 무엇(What)을 중요시 여겨서 제어의 흐름보다는 원하는 목적을 중요시 여기는 형태입니다.

```js
// Hello, World! 화면에 출력하기
// 순수 javaScript 명령형 코드
const root = document.getElementById('root');
const header = document.createElement('h1');
const headerContent = document.createTextNode('Hello, World!');

header.appendChild(headerContent);
root.appendChild(header);
```

위 코드는 명령형입니다. 처음 작게 프로토타입 정도 만들 때는 적당합니다. 하지만 대규모 앱을 만들면 관리하고 변경하기 상당히 어렵습니다.

```js
// React 코드 (선언적인)
const header = <h1>Hello World</h1>; // jsx
ReactDOM.render(header, document.getElementById('root'));
```

위 코드는 선언형입니다. 번들사이즈가 크기 때문에 바로 사용하지 않습니다. 하지만 어느정도 규모가 있으면 비교적 변경하기 쉬운습니다. 관리하기도 용이합니다.

트리거링(triggering): 랜더링이 발생하게 만드는 것

렌더링(rendering): UI 컴포넌트를 html로 변환시키는 것

커밋(commit): 실제 DOM에 UI를 반형하는 것

1. 렌더링 트리거

   - 첫 리액트 앱을 실행했을 때
   - 래액트 내부의 state가 변경되었을 때
     - 컴포넌트 내부 state가 변경되었을 때
     - 컴포넌트에 새로운 props가 변경되었을 때
     - 부모 컴포넌트가 state, props변경으로 랜더링이 발생할 때

2. 리랜더링

   - 리랜더링 트리거는 state를 변경하면 됩니다. 리랜더링을 유발하는 트리거는 더 많이 있습니다. 하지만 지금은 생략합니다.
   - state변화가 발생하면 리랜더링이 됩니다. 여러 state가 바뀌면 큐 자료구조로 처리합니다. 변경이 가해진 순서대로 처리합니다.

3. 브라우저 렌더링

   - 브라우저의 랜더링과 리액트의 랜더링은 당연히 다른 것입니다. 혼동을 피하기 위해서 브라우저 랜더링을 페인팅이라고 부르기도 합니다. 리액트는 렌더링을 완료하면 DOM에 업데이트 하고 브라우저에 화면을 그립니다.

[브라우저는 어떻게 동작하는가?](https://d2.naver.com/helloworld/59361)

## Counter App

```js
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const handleCountUp = () => {
    setCount((count) => ++count);
  };
  const handleCountDown = () => {
    setCount((count) => --count);
  };
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleCountUp}>+ 1</button>
      <button onClick={handleCountDown}>- 1</button>
    </div>
  );
}

export default App;
```

이렇게 작성해도 괜찮지만 1번 쓸거면 익명함수가 좋은 해결책이 됩니다.

## 컴포넌트 꾸미기

```js
import './App.css';

const Card = ({ props }) => {
  const style = {
    width: `120px`,
    height: `120px`,
    border: `solid 1px springgreen`,
    borderRadius: `8px`,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
  };
  const card = props.map((food, idx) => {
    return (
      <div style={style} key={idx}>
        {food}
      </div>
    );
  });
  return <div style={{ display: `flex`, gap: `24px` }}>{card}</div>;
};

function App() {
  const food = ['감자', '고구마', '오이', '가지', '옥수수'];
  return (
    <div
      className="App"
      style={{
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        height: `100vh`,
      }}
    >
      <Card props={food}></Card>
    </div>
  );
}

export default App;
```

## 반복되는 컴포넌트 처리하기

`map` 고차함수로 동적으로 UI를 만들 수 있습니다.

```js
import './App.css';
import React, { useState } from 'react';

const CustomButton = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

const User = ({ props, deleteUserHandler }) => {
  const { id, age, name } = props;
  return (
    <div>
      {age}살 - {name}
      <CustomButton onClick={() => deleteUserHandler(id)}>삭제</CustomButton>
    </div>
  );
};

function App() {
  const [users, setUsers] = useState([
    { id: 1, age: 30, name: '송중기' },
    { id: 2, age: 24, name: '송강' },
    { id: 3, age: 21, name: '김유정' },
    { id: 4, age: 29, name: '구교환' },
  ]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const addUserHandler = () => {
    const newUser = { id: users.length + 1, age, name };
    setUsers((users) => [...users, newUser]);
  };
  const deleteUserHandler = (id) => {
    // const newUserList = users.filter((user) => user.id !== id);
    setUsers((users) => users.filter((user) => user.id !== id));
  };
  return (
    <div className="App">
      {users.map((user, idx) => (
        <User deleteUserHandler={deleteUserHandler} props={user} key={idx} />
      ))}
      <input
        type="text"
        placeholder="이름을 입력해주세요"
        onChange={(event) => {
          setName(event.target.value);
        }}
        value={name}
      />
      <input
        type="text"
        placeholder="나이를 입력해주세요"
        onChange={(event) => {
          setAge(event.target.value);
        }}
        value={age}
      />
      <CustomButton onClick={addUserHandler}>추가</CustomButton>
    </div>
  );
}

export default App;
```

컴포넌트를 분리하는 것으로 스타일링도 디커플링할 수 있습니다. props를 넣고 선언할 때 컬러 같은 스타일 설정하면 됩니다.

key값이 있어야 리액트는 컴포넌트의 차이를 참조할 수 있습니다. key는 props처럼 보이지만 고차함수의 2번째 인자인 idx를 활용하는 것은 자제해야 합니다. 공식 문서에서 제외하도로록 합니다.

하지만 key는 형제관계에서만 고유하면 괜찮습니다. 전체에 모두 고유할 필요은 없습니다.

[리스트와 Key](https://ko.reactjs.org/docs/lists-and-keys.html)

TL;DR

```js
import { nanoid } from 'nanoid';
const createNewTodo = (text) => ({
  completed: false,
  id: nanoid(),
  text
}
```

나노 아이디를 활용합니다.

```js
const User = ({ props, deleteUserHandler }) => {
  const { id, age, name } = props;
  return (
    <div>
      {age < 25 ? (
        <div>
          {age}살 - {name}{' '}
          <CustomButton onClick={() => deleteUserHandler(id)}>
            삭제
          </CustomButton>{' '}
        </div>
      ) : null}
    </div>
  );
};
```

25세 미만만 출력하게 만든 조건부 렌더링입니다. `filter`를 사용해도 큰 문제는 아니지만 배열 메서드를 체이닝하면 시간복잡도를 증가시킵니다. 고차함수 배열 메소드가 하나의 반복문이고 이것을 체이닝(반복문 중첩)하기 때문입니다.

## 컴포넌트 분리하기

재사용성이 높은 컴포넌트는 파일 분리를 권장합니다. 컴포넌트는 파일단위로 연관성 기준으로 분류하기를 권장합니다.

특정한 관심사에 따라 기능을 나누고, 각 기능을 독립적으로 개발한 뒤 이를 조합하는 방식으로 복잡한 소프트웨어를 구성해보자는 아이디어를 관심사의 분리(Separation of concerns, SoC)

```js
// App.js
import './App.css';
import React, { useState } from 'react';
import CustomButton from './components/CustomButton';
import User from './components/User';

function App() {
  const [users, setUsers] = useState([
    { id: 1, age: 30, name: '송중기' },
    { id: 2, age: 24, name: '송강' },
    { id: 3, age: 21, name: '김유정' },
    { id: 4, age: 29, name: '구교환' },
  ]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const addUserHandler = () => {
    const newUser = { id: users.length + 1, age, name };
    setUsers((users) => [...users, newUser]);
  };
  const deleteUserHandler = (id) => {
    // const newUserList = users.filter((user) => user.id !== id);
    setUsers((users) => users.filter((user) => user.id !== id));
  };
  return (
    <div className="App">
      {users.map((user, idx) => (
        <User deleteUserHandler={deleteUserHandler} props={user} key={idx} />
      ))}
      <input
        type="text"
        placeholder="이름을 입력해주세요"
        onChange={(event) => {
          setName(event.target.value);
        }}
        value={name}
      />
      <input
        type="text"
        placeholder="나이를 입력해주세요"
        onChange={(event) => {
          setAge(event.target.value);
        }}
        value={age}
      />
      <CustomButton onClick={addUserHandler}>추가</CustomButton>
    </div>
  );
}

export default App;
```

```js
// User.js
import CustomButton from './CustomButton';

const User = ({ props, deleteUserHandler }) => {
  const { id, age, name } = props;
  return (
    <div>
      {age < 25 ? (
        <div>
          {age}살 - {name}{' '}
          <CustomButton onClick={() => deleteUserHandler(id)}>
            삭제
          </CustomButton>{' '}
        </div>
      ) : null}
    </div>
  );
};

export default User;
```

```js
// CustomButton.js
const CustomButton = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default CustomButton;
```

## 리액트 배포하기 (vercel)

배포하는 방법은 2가지입니다.

배포를 도와주는 서비스
웹 서버를 직접 구축하고 서버를 통해 배포하는 방법

Vercel를 통해 배포할 수 있습니다. 많은 회사는 Vercel은 거의 사용할 가능성이 없습니다.

Vercel을 활용하면 `git push`로 배포한 사이트를 업데이트할 수 있습니다.

Styled-Component, ReactHook, Redux를 예습하도록 합니다.

[How do I add environment variables to my Vercel project?](https://vercel.com/guides/how-to-add-vercel-environment-variables)

위 아티클은 환경 변수를 설정하는 법을 알려줍니다.

---

# 숙련 주차

[react-homework](react-homework-bk6tik4no-arch-spatula.vercel.app)

배포까지 끝났습니다. 숙련주차 강의 수강 시작했습니다.

리덕스는 다른 자료를 활용해서 추가 공부를 할 것입니다. 강의자료만으로는 당연히 부족합니다. 간단한 체험에 가깝습니다.

https://react-homework-bk6tik4no-arch-spatula.vercel.app/

---

## sidebar_position: 1

# 리덕스(Redux)

리덕스는 리액트의 상태관리 라이브러리 중 하나로 reducer와 ducks pattern을 결합한 의미를 갖습니다.

리덕스의 몇가지 장점은 중 하나는 하나의 state가 다른 state와 서로 강하게 결합관계를 갖을 수 밖에 없을 때 reducer로 비교적 처리가 수월하게 할 수 있습니다. 다른 하나는 데이터의 흐름이 단방향이라는 장점을 갖습니다.

하지만 단점도 있습니다. 불필요하게 복잡한 state를 만들어 낼 수 있다는 것입니다. ducks pattern으로 하나의 store에서 모든 state를 접근해야 합니다.

이것은 문화권마다 다르지만 미국권에서는 리덕스는 코드 작성량이 많은 것(verbose)도 단점이라고 지적합니다.

## Redux part 1

리덕스의 장점 중 하나는 전역으로 State를 관리할 수 있습니다. 훨씬더 복잡한 앱을 만들 수 있습니다.

리덕스는 state와 props에 대해서 학습의존성을 갖고 있습니다. 리덕스는 상태관리 라이브러리입니다.

기존 리액트는 prop drilling을 했어야 합니다. 실제 프로그램을 만들 때는 부모에서 자식에게 전달할 수 있는 경우는 많지 않습니다. 전역 state로 만들어서 관리하는 라이브러리가 리덕스입니다. 리덕스를 사용하면 중간에 불필요하게 건너가야하는 컴포넌트를 피할 수 있습니다.

리덕스를 사용하는 다른 장점은 전달하기 위해 불필요하게 전달했어야 합니다. 리덕스는 글로벌 state랑 로컬 state로 구분해서 사용할 수 있습니다.

store는 글로벌 state를 보관합니다.

## Redux part 2

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

```js
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

공부하는 방법에 따라다르지만 지금은 사용법을 먼저 공부하고 다음에 원리를 이해한다고 가정하면 내부의 동작원리는 설명은 잠시 보류하겠습니다.

## Redux part 3

이번에 만들어볼 예제는 카운터 app입니다.

```js
// src/modules/counter.js

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
│   └── redux/
│       ├── config/
│       │   └── configStore.js
│       └── modules/
│           └── counter.js
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
  counter: counter,
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
  console.log(countStore);
  return <div className="App"></div>;
}

export default App;
```

```js
{
  counter: {
    number: 0,
  }
}
```

console.log를 확인하면 이렇게 피드백 주는 것을 확인할 수 있습니다.

데이터가 흐르는 방향입니다.

modules은 기능의 이름을 참고해서 파일을 생성합니다. modules의 데이터를 configStore.js에 전달합니다. configStore.js에서 호출할 때 redux의 `useSelector` hook으로 접근합니다. state는 모든 모듈의 데이터를 접근할 수 있습니다.

모듈의 구성요소는 initialState, reducer 2가지가 있습니다. 생성하면 store에 연결해야 합니다. `useSelector`로 사용할 컴포넌트에 전달합니다.

## Redux part 4

[리덕스 흐름 도식화](https://user-images.githubusercontent.com/84452145/205887636-7bf7044a-72e3-4cae-ada6-81e2b05a06f5.gif)

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

```js
// App.js
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

```js
// src/modules/counter.js

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

```js
// src/modules/counter.js

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

```js
// src/modules/counter.js

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

```js
// src/App.js

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

```js
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import counter from '../modules/counter';

const rootReducer = combineReducers({
  counter: counter,
});
const store = createStore(rootReducer);

export default store;
```

```js
// src/redux/modules/counter.js

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

```js
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

## 리액트 라우터

react-router-dom입니다. 버전별로 문법차이가 큽니다.

여러 페이지를 만들 수 있습니다.

```sh
yarn add react-router-dom
```

위처럼 리액트 설치이후 추가하면 됩니다.

```txt
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── Works.jsx
│   ├── shared/
│   │   └── Router.js
│   ├── App.js
│   └── index.js
```

url을 입력하면 페이지 컴포넌트를 접근할 수 있게 해줍니다.

라우터 파일은 주로 따로 분리해서 작성합니다.

```js
// shared/Router.js
import React from 'react';
// 1. react-router-dom을 사용하기 위해서 아래 API들을 import 합니다.
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// 2. Router 라는 함수를 만들고 아래와 같이 작성합니다.
//BrowserRouter를 Router로 감싸는 이유는,
//SPA의 장점인 브라우저가 깜빡이지 않고 다른 페이지로 이동할 수 있게 만들어줍니다!
const Router = () => {
  return (
    <BrowserRouter>
      <Routes></Routes>
    </BrowserRouter>
  );
};

export default Router;
```

위 코드로 작성하는 것이 출발입니다.

```js
import React from 'react';
// 1. react-router-dom을 사용하기 위해서 아래 API들을 import 합니다.
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Works from '../pages/Works';

// 2. Router 라는 함수를 만들고 아래와 같이 작성합니다.
//BrowserRouter를 Router로 감싸는 이유는,
//SPA의 장점인 브라우저가 깜빡이지 않고 다른 페이지로 이동할 수 있게 만들어줍니다!
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="works" element={<Works />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
```

라우팅할 때마다 접근할 페이지를 이렇게 맵핑할 수 있습니다.

```js
import './App.css';
import Router from './shared/Router';

function App() {
  return <Router />;
}

export default App;
```

모든 라우트는 App을 통해 거처가야 합니다. 개념적으로 라우트는 앱에 포함된 개념입니다.

react-router-dom가 제공하는 hook들이 존재합니다.

`useNavigate`는 어떤 페이지로 이동시킬 때 사용합니다.

[https://reactrouter.com/en/6.4.4/hooks/use-navigate](useNavigate - 공식 문서링크)

```js
// src/pages/home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate('/works');
      }}
    >
      works로 이동
    </button>
  );
};

export default Home;
```

`useLocation`현재 url 정보를 얻을 수 있습니다. 조건부 랜더링에 활용할 수 있습니다.

[https://reactrouter.com/en/6.4.4/hooks/use-location](useLocation - 공식 문서링크)

```js
// src/pages/works.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const Works = () => {
  const location = useLocation();
  console.log('location :>> ', location);
  return (
    <div>
      <div>{`현재 페이지 : ${location.pathname.slice(1)}`}</div>
    </div>
  );
};

export default Works;
```

`<Link></Link>`는 JSX에서 a태그랑 동일한 기능을 지원해줍니다.

[Link 태그 - 공식 문서링크](https://reactrouter.com/en/6.4.4/components/link)

```js
import { Link, useLocation } from 'react-router-dom';

const Works = () => {
  const location = useLocation();
  console.log('location :>> ', location);
  return (
    <div>
      <div>{`현재 페이지 : ${location.pathname.slice(1)}`}</div>
      <Link to="/contact">contact 페이지로 이동하기</Link>
    </div>
  );
};

export default Works;
```

`useParams`은 URL의 query를 접근할 수 있습니다.

[useParams - 공식 문서링크](https://reactrouter.com/en/6.4.4/hooks/use-params)

```js
import * as React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

function ProfilePage() {
  // Get the userId param from the URL.
  let { userId } = useParams();
  // ...
}

function App() {
  return (
    <Routes>
      <Route path="users">
        <Route path=":userId" element={<ProfilePage />} />
        <Route path="me" element={...} />
      </Route>
    </Routes>
  );
}
```

어떤 컴포넌트들은 어떤 자식 엘리먼트가 들어올지 미리 예상할 수 없는 경우가 있습니다. 범용적으로 사용하는 컴포넌트들이 있습니다. Sidebar, Header, Footer, Dialog같은 컴포넌트들이 존재합니다. 이런 컴포넌트들을 라우팅과 무관하게 접근할 수 있게 해줍니다.

컴포지션은 합성이라는 의미를 가졌습니다.

```js
// src/shared/Layout.js

import React from 'react';

const HeaderStyles = {
  width: '100%',
  background: 'black',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '20px',
  color: 'white',
  fontWeight: '600',
};
const FooterStyles = {
  width: '100%',
  height: '50px',
  display: 'flex',
  background: 'black',
  color: 'white',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
};

const layoutStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '90vh',
};

function Header() {
  return (
    <div style={{ ...HeaderStyles }}>
      <span>Sparta Coding Club - Let's learn React</span>
    </div>
  );
}

function Footer() {
  return (
    <div style={{ ...FooterStyles }}>
      <span>copyright @SCC</span>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div>
      <Header />
      <div style={{ ...layoutStyles }}>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
```

`children props`를 활용해서 적용하는 개념입니다. 어떤 자식 태그가 들어와도 범용적으로 적용할 수 있게 됩니다.

```js
import React from 'react';
// 1. react-router-dom을 사용하기 위해서 아래 API들을 import 합니다.
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Works from '../pages/Works';
import Layout from './Layout';

// 2. Router 라는 함수를 만들고 아래와 같이 작성합니다.
//BrowserRouter를 Router로 감싸는 이유는,
//SPA의 장점인 브라우저가 깜빡이지 않고 다른 페이지로 이동할 수 있게 만들어줍니다!
const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="works" element={<Works />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
```

`Layout`컴포넌트가 감싸야 공통 컴포넌트를 적용할 수 있습니다.

이제 동적 라우팅입니다. url에 특정 데이터를 넣어 동적으로 이동하는 것입니다. 주로 커머스에서 레이아웃은 동일합니다. 같은 컴포넌트의 같은 레이아웃을 활용합니다. 하지만 Content만 다릅니다. url에 따라 동적으로 데이터를 연결하고 제공합니다.

```js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Works from '../pages/Works';
import Layout from './Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="works" element={<Works />} />
          <Route path="works/:id" element={<Works />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
```

여기서 id가 동적인 부분에 해당합니다. `useParams` hook으로 접근할 수 있습니다.

```url
http://localhost:3000/works/100
```

이렇게 입력해도 정상작동하는 것을 확인할 수 있습니다.

동적 라우팅의 url path의 데이터를 가져오는 방법입니다. 동적 라우팅을 하면 페이지에 동일하게 랜더링합니다. 컴포넌트는 모두 같지 content만 달라야 합니다.

```js
// src/pages/Works.js

import React from 'react';
import { Link, useParams } from 'react-router-dom';

const data = [
  { id: 1, todo: '리액트 배우기' },
  { id: 2, todo: '노드 배우기' },
  { id: 3, todo: '자바스크립트 배우기' },
  { id: 4, todo: '파이어 베이스 배우기' },
  { id: 5, todo: '넥스트 배우기' },
  { id: 6, todo: 'HTTP 프로토콜 배우기' },
];

function Works() {
  return (
    <div>
      {data.map((work) => {
        return (
          <div key={work.id}>
            <div>할일: {work.id}</div>
            <Link to={`/works/${work.id}`}>
              <span style={{ cursor: 'pointer' }}>➡️ Go to: {work.todo}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Works;
```

커머스가 홈에서 상세페이지 접근하기 전에 중간 상품 목록페이지랑 유사합니다. `<Link>`태그를 활용해서 상세페이지를 접근하게 해줍니다.

```js
// src/pages/Work.js

import React from 'react';
import { useParams } from 'react-router-dom';

const data = [
  { id: 1, todo: '리액트 배우기' },
  { id: 2, todo: '노드 배우기' },
  { id: 3, todo: '자바스크립트 배우기' },
  { id: 4, todo: '파이어 베이스 배우기' },
  { id: 5, todo: '넥스트 배우기' },
  { id: 6, todo: 'HTTP 프로토콜 배우기' },
];

function Work() {
  const param = useParams();

  const work = data.find((work) => work.id === parseInt(param.id));

  return <div>{work.todo}</div>;
}

export default Work;
```

접근하게 될 상세 페이지입니다.

고유한 id를 활용하는 것이 전략입니다. 각 url의 고유한 id를 활용하는 전략입니다.

리액트 라우터 DOM으로 동적 라우팅 설정이 가능합니다. id는 각 컴포넌트에서 조회할 수 있습니다.

```js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Works from '../pages/Works';
import Work from '../pages/Work';
import Layout from './Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="works" element={<Works />} />
          <Route path="works/:id" element={<Work />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
```

이렇게 접근가능하도록 Route 설정을 하면 끝납니다.

## 예습 키워드

redux-toolkit, JSON server, axios, thunk, optimizing custom hook

## React Redux Full Course for Beginners | Redux Toolkit Complete Tutorial

[React Redux Full Course for Beginners | Redux Toolkit Complete Tutorial](https://www.youtube.com/watch?v=NqzdVN2tyvQ)

리덕스 제작자는 RTK를 사용하기를 권장합니다. 불필요한 복잡성이 늘어난다고 합니다.

```sh
npm install redux react-redux @reduxjs/toolkit
```

리덕스랑 리덕스 store는 혼용해서 사용하는 용어입니다. 자바스크립트의 불변 객체 트리 컨테이너입니다. 복수의 store는 가능하지만 권장하지 않습니다.

```js
// store.js 설정
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});
```

```jsx
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

index.jsx를 이렇게 작성하면 전역으로 state를 주고 받을 수 있습니다. useContext랑 유사합니다.

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

```js
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

[react_redux_toolkit / 01_lesson/](https://github.com/gitdagray/react_redux_toolkit/tree/main/01_lesson)

# useCallBack

useCallBack은 함수를 메모리제이션 하기 위한 hook입니다. 다이나믹 프로그래밍의 메모리제이션 개념과 상통합니다. 이미 한번 계산한 것을 다시 계산할 필요없게 저장합니다.

재랜더링할 때마다 모든 값이 바뀌는 것은 아닙니다. 리액트 컴포넌트가 동작하는 원리의 문제인데 모든 함수를 꼭 저장한 것은 아닙니다. 리액트 앱이 어떤 이벤트가 발생해서 리렌더링할 때 이미 있던 함수를 재사용하는 것이 아니라 처음부터 다시 정의하고 다시 사용하는 함수들이 존재합니다. 그래서 다시 정의할 필요없이 메모리에 저장시키고 접근하게 만는 hook입니다.

useCallBack은 의존성배열을 통해서 값의 변화에 따라 다시 실행할지 말지 결정합니다.

보통 단독컴포넌트보단 자식 컴포넌트로 전달할 때 많이 사용합니다.

```jsx
import React, { useState, useCallback } from 'react';

export const One = () => {
  const [value, setValue] = useState('123456');
  const logger = useCallback(() => {
    console.log('업데이트');
  }, []);
  return (
    <div>
      <p>{value}</p>
      <button onClick={() => setValue('789')}>업데이트</button>
      <Two logger={logger} />
    </div>
  );
};

export const Two = ({ logger }) => {
  return <button onClick={logger}>콜솔 보기</button>;
};
```

부모 컴포넌트에서 자식컴포넌트로 함수를 넘깁니다.

성능개선을 위해 사용하지만 작은 프로젝트에서는 성능을 체감하기 어렵습니다. 보통 규모가 큰 프로젝트에서 체감하기 쉽습니다.

useMemo hook과 함께 많이 사용합니다. 하지만 무분별한 사용이 무조건 좋은 것은 아닙니다. 무조건 사용한다고 랜더링이 줄어드는 것은 아닙니다.

# DIY React

```js
// webpack.config.js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  stats: { children: true },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)/,
        use: ['file-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack-react-start-kit',
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
};
```

```js
{
  "name": "webpack-n-babel",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "webpack --mode production",
    "start": "webpack-dev-server"
  },
  "devDependencies": {
    "@babel/core": "^7.20.5",
    "@babel/preset-env": "^7.20.2",
    "@babel/preset-react": "^7.18.6",
    "babel-loader": "^9.1.0",
    "clean-webpack-plugin": "^4.0.0",
    "css-loader": "^6.7.2",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.5.0",
    "mini-css-extract-plugin": "^2.7.2",
    "sass-loader": "^13.2.0",
    "webpack": "^5.75.0",
    "webpack-cli": "^5.0.1"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "webpack-dev-server": "^4.11.1"
  }
}
```

```js
import React from 'react';
import ReactDOM from 'react-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<div>안녕 여러분! :)</div>);
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />

    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

DIY로 리액트를 설치하는 방법입니다. CRA, Vite를 애용합시다.

webpack 자체를 하나의 큰 주제로 공부를 해야겠습니다.
