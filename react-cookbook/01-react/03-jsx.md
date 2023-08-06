---
sidebar_position: 3
---

# 컴포넌트

컴포넌트라는 것은 UI의 단위를 의미합니다. 컴포넌트라는 것은 JSX, hook, state 모든 것을 포함할 수 있습니다. 하지만 JSX만으로 표현을 충분히 할 수 있습니다.

<!-- 리액트에서 컴포넌트는 레고랑 비슷합니다. 앱은 레고를 조립하는 방식으로 구현합니다. -->

<!-- 누군가 컴포넌트를 만들라고 하먄 html을 `return`하는 부분만 조작하면 됩니다. -->

컴포넌트는 자바스크립트를 사용해야 할 때가 있습니다.

컴포넌트는 재사용할 수 있습니다. 재사용하려면 `export`, `import`가 필요합니다. 이 부분은 자바스크립트 문법에 해당합니다.

`return`은 html처럼 생긴 JSX를 작성하는 영역입니다. 그 위는 자바스크립트로 로직을 처리합니다.

```tsx
function App() {
  // 자바스크립트 로직
  return <div>App</div>;
}
```

자바스크립트 로직과 HTML로직은 `return`에 작성합니다. html로직에 자바스크립트의 동적인 부분을 처리할 수 있습니다.

컴포넌트를 만들 때는 항상 파스칼케이스라는 것으 잊지말도록 합니다. 폴더는 카멜케이스로 작성합니다. 이름으로 컴포넌트, 폴더 등을 읽으면서 바로 추론할 수 있어야 합니다.

```jsx
import './App.css';

function App() {
  return (
    <div>
      <h1>Grand Parent</h1>
      <Parent></Parent>
    </div>
  );
}

function Parent() {
  return (
    <div>
      <h2>Parent</h2>
      <Child></Child>
    </div>
  );
}

function Child() {
  return (
    <div>
      <span>Child</span>
    </div>
  );
}

export default App;
```

부모자식, 자매, 손주, 증조 관계를 만들 수 있습니다.

컴포넌트를 부모 자식관계로 만들 수 있습니다. html은 부모자식 관계를 들었을 것입니다. 포함관계로 속해있으면 자식에 해당합니다.

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

화면에 보여지게 하는 것을 보고 랜더링이라고 부릅니다. return에 작성하는 코드들을 보고 JSX라고 합니다.

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

참고로 홀태그는 `<TagName />`이렇게 작성합니다.

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

`class`는 `className`으로 작성합니다. 자바스크립트 예약어(`class`)랑 충돌을 방지하기 위함입니다. 그리고 대부분의 html 속성은 카멜 케이스로 작성합니다.

```jsx
// 중괄호를 두 번 쓰는 이유? 객체도 자바스크립트니까요!
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

props는 부모컴포넌트로 가져온 데이터입니다. props는 컴포넌트가 부모에서 자식에게 전달하는 데이터입니다. 속성값으로 전달해주면 됩니다.

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

```jsx title="components/Child.js"
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
