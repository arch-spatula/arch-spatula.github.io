---
description: 'React TypeScript'
tags: ['react', 'intro', 'TypeScript']
sidebar_position: 99
draft: true
---

# React와 TypeScript 조합하기

# React TypeScript Tutorial - 1 - Introduction

https://www.youtube.com/watch?v=TiSGujM22OI

타입스크립트를 위한 리액트 입문 튜토리얼입니다.

타입스크립트를 오랬동안 사용하면서 개발 경험이 더 좋았습니다. 런타임 디버깅하는 시간도 줄였고 문서화와 자동완성, 리팩토링 편의성 등 다양한 점에서 좋습니다.

타입스크립트는 평소보다 더 많은 코드를 작성해야 한다고 하지만 꼭 그렇지 않습니다.

타입스크립트는 장기투자입니다. 시간당 투자대비 효율이 상당히 좋습니다.

리액트 개발자로 엄청나게 성장하게 해줄 수 있습니다.

타입스크립트를 리액트랑 사용하는 예시를 알려주는 튜토리얼입니다.

필요하면 타입스크립트 개념을 더 자세히 알려줍니다.

# React TypeScript Tutorial - 2 - Getting Started

https://www.youtube.com/watch?v=Kt4PQlcLHco

타입스크립트랑 설정된 앱으로 설정해야 합니다. 운이 좋겠도 CRA는 리액트를 타입스크립트로 설정해줄 수 있습니다.

```sh
npx create-react-app react-typescrtip-demo --template typescript
```

이렇게 되면 타입스크립트는 자동으로 config 되어 있습니다.

index.tsx는 엔트리포인트입니다. 컴포넌트를 마운트 시켜주는 파일입니다.

전통적인 JSX랑 다르게 tsx확장자를 활용합니다. 이것은 중요합니다. 타입스크립트를 작성하기 시작할 때 습관적으로 js, jsx로 작성하는 사람들이 있습니다. 확장자는 tsx로 잘지정하도록 합니다.

특이한 점은 코드를 보면 자바스크립트랑 별로 달라보이는게 없어 보입니다.

하지만 타입 추론을 횔씬더 잘해주고 있습니다.

# React TypeScript Tutorial - 3 - Typing Props

https://www.youtube.com/watch?v=KpA6oEaCHtk

타입스크립트를 리액트위한 리액트입니다.

```tsx
import './App.css';
import { Greet } from './components/Greet';

function App() {
  return (
    <div className="App">
      <Greet />
    </div>
  );
}

export default App;
```

```tsx
export const Greet = () => {
  return (
    <div>
      <h2>Hello... it's me...</h2>
    </div>
  );
};
```

이상태는 별로 도움되지 않습니다. 데이터는 하드 코딩되어 있습니다.

이제 동적으로 변형하겠습니다.

```tsx
import './App.css';
import { Greet } from './components/Greet';

function App() {
  return (
    <div className="App">
      <Greet name="Jake" />
    </div>
  );
}

export default App;
```

```tsx
type GreetProps = {
  name: string;
};

export const Greet = ({ name }: GreetProps) => {
  return (
    <div>
      <h2>Hello... it's me... {} </h2>
    </div>
  );
};
```

컴포넌트의 props는 기본적으로 객체입니다. 그래서 props의 타입을 객체로 지정하고 객체의 속성별로 타입을 지정하는 패턴입니다.

컴포넌트 활용의 의도를 설계할 수 있습니다. 더 많은 코드이지만 대신 문서화도 줄어듭니다.

컴파일타임에 에러를 미리파악 할 수 있어서 상당히 생산적입니다.

라이브러리를 만들 때는 인터페이스(interface)를 사용하고 앱을 만들 때는 타입(type)을 사용하는 것을 권장합니다. 물론 여전히 정론이 없습니다.

# React TypeScript Tutorial - 4 - Basic Props

https://www.youtube.com/watch?v=mDu54a5U3OU

```ts
import './App.css';
import { Greet } from './components/Greet';

function App() {
  return (
    <div className="App">
      <Greet name="Jake" num={7} isLogin={true} />
    </div>
  );
}

export default App;
```

```tsx
type GreetProps = {
  name: string;
  num: number;
  isLogin: boolean;
};

export const Greet = ({ name, num, isLogin }: GreetProps) => {
  return (
    <div>
      {isLogin ? <h2>Hello... it's me... {name} </h2> : null}
      <p>lucky number {num}</p>
    </div>
  );
};
```

이렇게 시작해볼 수 있습니다.

다음 예시입니다.

```tsx
type PersonProps = {
  firstName: string;
  lastName: string;
};

export const Person = ({ firstName, lastName }: PersonProps) => {
  return <div>finn the human</div>;
};
```

```tsx
import './App.css';
import { Greet } from './components/Greet';
import { Person } from './components/Person';

function App() {
  const personName = {
    first: 'find',
    last: 'the human',
  };
  return (
    <div className="App">
      <Greet name="Jake" num={7} isLogin={true} />
      <Person firstName={personName.first} lastName={personName.last} />
    </div>
  );
}

export default App;
```

이렇게 작성해볼 수 있습니다.

목록일 때의 예시입니다.

```tsx
import './App.css';
import { Greet } from './components/Greet';
import { Person } from './components/Person';
import { PersonList } from './components/PersonList';

function App() {
  const personName = {
    first: 'find',
    last: 'the human',
  };
  return (
    <div className="App">
      <Greet name="Jake" num={7} isLogin={true} />
      <Person firstName={personName.first} lastName={personName.last} />
      <PersonList />
    </div>
  );
}

export default App;
```

```tsx
export const PersonList = () => {
  return (
    <div>
      <h2>Bruce Wayne</h2>
      <h2>Clark Kent</h2>
      <h2>Princess Diana</h2>
    </div>
  );
};
```

이렇게 하드코딩된 목록이 있습니다. 목록이 증가할 때의 대응이 불가능합니다.

```tsx
type PersonListProps = {
  names: { first: string; last: string }[];
};

export const PersonList = ({ names }: PersonListProps) => {
  return (
    <div>
      {names.map((name) => (
        <h2 key={name.first}>
          {name.first} {name.last}
        </h2>
      ))}
    </div>
  );
};
```

```tsx
import './App.css';
import { Greet } from './components/Greet';
import { Person } from './components/Person';
import { PersonList } from './components/PersonList';

function App() {
  const personName = {
    first: 'find',
    last: 'the human',
  };

  const nameList = [
    { first: 'Bruce', last: 'Wayne' },
    { first: 'Clark', last: 'Kent' },
    { first: 'Princess', last: 'Diana' },
  ];

  return (
    <div className="App">
      <Greet name="Jake" num={7} isLogin={true} />
      <Person firstName={personName.first} lastName={personName.last} />
      <PersonList names={nameList} />
    </div>
  );
}

export default App;
```

이렇게 처리하면 됩니다.

# React TypeScript Tutorial - 5 - Advanced Props

https://www.youtube.com/watch?v=zLyeWSfTMa8

기초적인 props 타입지정을 이어서 다룹니다.

```tsx
export const Status = () => {
  return (
    <div>
      <h2>에러</h2>
      <h2>성공</h2>
      <h2>로딩</h2>
    </div>
  );
};
```

일단 이런 코드가 있습니다. props로 통신상태를 표시할 수 있어야 합니다.

```tsx
type StatusProps = {
  status: string;
};

export const Status = ({ status }: StatusProps) => {
  let message;

  if (status === 'loading') message = '로딩';
  if (status === 'success') message = '완료';
  if (status === 'error') message = '에러';

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};
```

```tsx
import './App.css';
import { Status } from './components/Status';

function App() {
  return (
    <div className="App">
      <Status status="loading" />
    </div>
  );
}

export default App;
```

이렇게 작성하는 것이 가능합니다. 하지만 한계가 있습니다. status에 무작위적인 문자열을 입력할지 모릅니다. 몇가지 유형만 허용하게 만들 수 있습니다.

```tsx
type StatusProps = {
  status: 'loading' | 'success' | 'error';
};

export const Status = ({ status }: StatusProps) => {
  let message;

  if (status === 'loading') message = '로딩';
  if (status === 'success') message = '완료';
  if (status === 'error') message = '에러';

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};
```

이렇게 변형해서 정의하면 컴포넌트를 호출할 때 에러를 만들 가능성이 줄어듭니다.

```tsx
const Heading = () => {
  return <h1>Placeholder text</h1>;
};
```

예를 들어 이렇게 컴포넌트가 작성되어 있습니다. 하지만 `children`으로 태그 사이에 넣어야 하는 상황이 생길 수 있습니다.

```tsx
import './App.css';
import { Heading } from './components/Heading';
import { Status } from './components/Status';

function App() {
  return (
    <div className="App">
      <Status status="success" />
      <Heading>?????</Heading>
    </div>
  );
}

export default App;
```

이렇게 작성하면 에러가 발생합니다. 수치스럽게 마우스를 위에 올려서 타입의 문제를 피드백을 받고 해결할 수 있습니다.

```tsx
type HeadingProps = {
  children: string;
};

export const Heading = ({ children }: HeadingProps) => {
  return <h1>{children}</h1>;
};
```

이렇게하면 간단하게 해결할 수 있습니다.

```tsx
export const Oscar = () => {
  return <div>Oscar goes to Leonardo Dicpario!</div>;
};
```

다음 위처럼 정의가 되어 있습니다. 이번에는 컴포넌트를 children으로 넣어보고 싶습니다.

```tsx
import './App.css';
import { Heading } from './components/Heading';
import { Status } from './components/Status';
import { Oscar } from './components/Oscar';

function App() {
  return (
    <div className="App">
      <Status status="success" />
      <Heading>?????</Heading>
      <Oscar>
        <Heading></Heading>
      </Oscar>
    </div>
  );
}

export default App;
```

이렇게 작성하면 에러가 발생합니다.

여기서 질문입니다. 리액트의 컴포넌트의 타입은 무엇인가? 다양한 타입이 있지만 `ReactNode`를 일반적으로 많이 사용합니다.

```tsx
import './App.css';
import { Heading } from './components/Heading';
import { Status } from './components/Status';
import { Oscar } from './components/Oscar';

function App() {
  return (
    <div className="App">
      <Status status="success" />
      <Heading>?????</Heading>
      <Oscar>
        <Heading>Oscar goes to Leonardo Dicpario!</Heading>
      </Oscar>
    </div>
  );
}

export default App;
```

```tsx
import { ReactNode } from 'react';

type OscarProps = {
  children: ReactNode;
};

export const Oscar = ({ children }: OscarProps) => {
  return <div>{children}</div>;
};
```

이렇게 해결할 수 있습니다.

```tsx
import './App.css';
import { Heading } from './components/Heading';
import { Status } from './components/Status';
import { Oscar } from './components/Oscar';
import { Greet } from './components/Greet';

function App() {
  return (
    <div className="App">
      <Status status="success" />
      <Heading>?????</Heading>
      <Oscar>
        <Heading>Oscar goes to Leonardo Dicpario!</Heading>
      </Oscar>
      <Greet isLogin={false} name="Jake" />
    </div>
  );
}

export default App;
```

선택적으로 props를 지정하게 만들고 싶은 상황이 올 것입니다.

```tsx
type GreetProps = {
  name: string;
  num?: number;
  isLogin: boolean;
};

export const Greet = ({ name, num = 0, isLogin }: GreetProps) => {
  return (
    <div>
      {isLogin ? <h2>Hello... it's me... {name} </h2> : null}
      <p>lucky number {num}</p>
    </div>
  );
};
```

`?`를 붙이는 것으로 선택적으로 props를 넘기게 만들 수 있습니다. 또 대입한 값이 없으면 `default parameter`를 지정까지 할 수 있습니다.

# React TypeScript Tutorial - 6 - Event Props

https://www.youtube.com/watch?v=xNSIHFi8o2M

이벤트 prop의 타입을 지정하는 방법입니다.

리액트에는 정말 다양한 이벤트가 있지만 자주 사용하는 클릭이벤트와 input 입력 이벤트 2개만 다루겠습니다.

```tsx
export const Button = () => {
  return <button>Click</button>;
};
```

예를들어 이런 컴포넌트가 있습니다. 클릭하면 이벤트를 prop로 받아 전달하고 싶습니다.

대입할 매개변수가 없고 반환하는 값이 없다고 타입을 지정할 수 있습니다.

```tsx
import './App.css';
import { Button } from './components/Button';

function App() {
  return (
    <div className="App">
      <Button handleClick={() => console.log('클릭')} />
    </div>
  );
}

export default App;
```

```tsx
type ButtonProps = {
  handleClick: () => void;
};

export const Button = ({ handleClick }: ButtonProps) => {
  return <button>Click</button>;
};
```

이렇게 처리가 가능합니다. 하지만 이벤트를 매개변수를 전달해줘야 할 때가 있습니다.

여기서 의문은 클릭 이벤트의 타입입니다. 타입은 리액트가 제공해주는 타입을 활용합니다.

```tsx
import { MouseEvent } from 'react';

type ButtonProps = {
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const Button = ({ handleClick }: ButtonProps) => {
  return <button onClick={handleClick}>Click</button>;
};
```

```tsx
import './App.css';
import { Button } from './components/Button';

function App() {
  return (
    <div className="App">
      <Button handleClick={(e) => console.log('클릭', e)} />
    </div>
  );
}

export default App;
```

이렇게 타입을 지정해주면 됩니다.

함수에 매개변수를 활용하게 될 것이면 아래처럼 작성하면 됩니다.

```tsx
import { MouseEvent } from 'react';

type ButtonProps = {
  handleClick: (event: MouseEvent<HTMLButtonElement>, id: number) => void;
};

export const Button = ({ handleClick }: ButtonProps) => {
  return <button onClick={(e) => handleClick(e, 1)}>Click</button>;
};
```

```tsx
import './App.css';
import { Button } from './components/Button';

function App() {
  return (
    <div className="App">
      <Button handleClick={(e, id) => console.log('클릭', e, id)} />
    </div>
  );
}

export default App;
```

이렇게 작성합니다. id의 매개변수 타입을 지정하게 되는 방식입니다.

```tsx
export const Input = () => {
  return <input type="type" />;
};
```

이런 input이 있습니다. input 제어를 위한 타입또한 자주 사용하는 패턴입니다.

```tsx
import { ChangeEvent } from 'react';

type InputProps = {
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
export const Input = ({ value, handleChange }: InputProps) => {
  return <input type="type" onChange={handleChange} value={value} />;
};
```

input은 주로 이런 패턴으로 많이 작성하게 됩니다. 하지만 input을 제어하기 위해 무조건 prop으로 넘겨줄 필요는 없습니다.

```tsx
import { ChangeEvent } from 'react';

type InputProps = {
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
export const Input = ({ value, handleChange }: InputProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  };
  return <input type="type" onChange={handleInputChange} value={value} />;
};
```

하지만 이벤트 객체에 타입을 지정하는 것은 동일합니다.

클릭과 인풋 제어 타입을 가장 자주 발생하기 때문에 암기하도록 합니다.

# React TypeScript Tutorial - 7 - Style Props

https://www.youtube.com/watch?v=FNfHtujZE4k

스타일을 타입으로 지정하는 방법입니다. props로 전달할 때 지정하는 방법입니다.

```tsx
import './App.css';
import { Button } from './components/Button';
import { Container } from './components/Container';

function App() {
  return (
    <div className="App">
      <Button handleClick={(e, id) => console.log('클릭', e, id)} />
      <Container />
    </div>
  );
}

export default App;
```

```tsx
export const Container = () => {
  return (
    <div style={{ border: `1px solid black`, padding: `1rem` }}>
      Text content goes here
    </div>
  );
};
```

예를 들어 이렇게 코드가 작성되어 있습니다. style 속성은 그냥 string으로 제어하는 것은 가능합니다. 하지만 의문이 발생합니다. 어떻게 해야 올바른 스타일링을 문자열이라는 것을 알아내는 방법입니다.

리액트 개발팀이 타입을 지정할 수 있도록 제공하고 있습니다.

```tsx
import './App.css';
import { Button } from './components/Button';
import { Container } from './components/Container';

function App() {
  return (
    <div className="App">
      <Button handleClick={(e, id) => console.log('클릭', e, id)} />
      <Container style={{ border: `1px solid black`, padding: `1rem` }} />
    </div>
  );
}

export default App;
```

```tsx
import { CSSProperties } from 'react';

type ContainerProps = {
  style: CSSProperties;
};

export const Container = ({ style }: ContainerProps) => {
  return <div style={style}>Text content goes here</div>;
};
```

이렇게 인라인 스타일링이 가능해집니다. 이렇게 되면 스타일링 자동완성도 지원하게 됩니다.

# React TypeScript Tutorial - 8 - Prop Types and Tips

https://www.youtube.com/watch?v=4Ml7Lp_QcSo

리액트 타입 지정 3가지 팁입니다.

props를 객체구조분해할당하는 것이 가능합니다. 지금까지 예시에서 많이 봐왔습니다.

```tsx
type GreetProps = {
  name: string;
  num?: number;
  isLogin: boolean;
};

export const Greet = ({ name, num = 0, isLogin }: GreetProps) => {
  return (
    <div>
      {isLogin ? <h2>Hello... it's me... {name} </h2> : null}
      <p>lucky number {num}</p>
    </div>
  );
};
```

이런 패턴은 자주 보게될 것입니다.

컴포넌트가 단순할 때는 해당 컴포넌트에서만 사용하고 export하지 않습니다. 하지만 규모가 큰 어플리케이션을 만들 때는 공유용 타입을 따로 관리하기를 권장합니다.

타입을 관리하는 전략은 다양합니다. 하지만 하나의 모듈만 의존하고 있고 타입지정이 선언형 컴포넌트로 코드를 정리하는데 방해한다면 `모듈명.type.tsx` 패턴으로 명명하면 됩니다.

```tsx
// Person.type.tsx
export type PersonProps = {
  firstName: string;
  lastName: string;
};
```

```tsx
// Person.tsx
import { PersonProps } from './Person.type';

export const Person = ({ firstName, lastName }: PersonProps) => {
  return <div>finn the human</div>;
};
```

지금은 컴포넌트의 규모가 작아서 같이 작성해도 괜찮지만 규모가 큰 컴포넌트에서 많은 타입을 지정할 때는 가독성을 개선해줄 수 있는 패턴이 됩니다.

마지막 팁은 타입자체를 재사용하는 것입니다.

```tsx
// Person.type.tsx
export type Name = {
  firstName: string;
  lastName: string;
};

export type PersonProps = {
  name: Name;
};
```

```tsx
import { PersonProps, Name } from './Person.type';

type PersonListProps = {
  names: Name[];
};

export const PersonList = ({ names }: PersonListProps) => {
  return (
    <div>
      {names.map((name) => (
        <h2 key={name.firstName}>
          {name.firstName} {name.lastName}
        </h2>
      ))}
    </div>
  );
};
```

이렇게 사용할 수 있게 됩니다. 타입을 조합하고 상속하고 다양한 집합연산을 할 수 있습니다.

# React TypeScript Tutorial - 9 - useState Hook

https://www.youtube.com/watch?v=2NKNjeB0WVs

```tsx
export const LoggedIn = () => {
  const handleLogin = () => {};
  const handleLogout = () => {};
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
```

예를 들어 이런 컴포넌트가 있습니다. 로그인을 할 때마다 각각 처리가 달라저야 하는 로직입니다.

이럴 때 필요한 것은 `useState`입니다.

```tsx
import { useState } from 'react';

export const LoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <div>User is {isLoggedIn ? 'logged in' : 'logged out'}</div>
    </div>
  );
};
```

타입스크립트 없이 useState를 작성할 수 있습니다. 물론 지금같은 경우에 해당하기 때문에 가능합니다.

타입스크립트는 useState를 호출할 대입한 값의 타입을 기준으로 지정합니다. 지금 예제에서는 부울리안 타입을 지정했기 때문에 가능합니다.

더 복합적이고 복잡한 경우에는 다음에 다룹니다.

# React TypeScript Tutorial - 10 - useState Future Value

https://www.youtube.com/watch?v=LNpWuRUIR5A

미래에서만 알 수 있을 때 타입을 지정하는 방법입니다.

```tsx
// User.tsx
import { useState } from 'react';

type AuthUser = {
  name: string;
  email: string;
};

export const User = () => {
  const [user, setuser] = useState(false);

  const handleLogin = () => {};
  const handleLogout = () => {};
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <div>User name is </div>
      <div>User email is </div>
    </div>
  );
};
```

이런 예시가 있습니다.

사용자는 보통 첫 방문에 비로그인 상태입니다.

```tsx
import { useState } from 'react';

type AuthUser = {
  name: string;
  email: string;
};

export const User = () => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const handleLogin = () => {
    setUser({
      name: 'Jake',
      email: 'JakeTheGod@nomailman.com',
    });
  };
  const handleLogout = () => {
    setUser(null);
  };
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <div>User name is {user?.name}</div>
      <div>User email is {user?.email} </div>
    </div>
  );
};
```

이렇게 되면 유니언 타입의 제네릭으로 useState으로 갱신할 수 있는 타입을 지정할 수 있게 됩니다.

또 자동완성할 때 옵셔널 체이닝이 된 상태로 지정이 된 상태로 됩니다. 옵셔널 체이닝을 제거하면 타입스크립트가 에러를 돌려줍니다.

데이터가 없을 수 있고 있을 수 있기 때문에 이렇게 작성이 된 것입니다. 옵셔널 체이닝 자체는 자바스크립트 안티패턴이기는 합니다.

# React TypeScript Tutorial - 11 - useState Type Assertion

https://www.youtube.com/watch?v=U3UizPM4aSk

`null`을 발생가능한 타입으로 지정하면 옵셔널채이닝이라는 안티패턴이 생긴다는 단점을 지난 시간에 이야기 했습니다.

하지만 확실하게 null값이 발생하지 않을 것이라고 확신할 수 있는 경우가 있습니다. 예를들어 로그인 실패하면 강제로 뒤로가기를 만들어 null에 의존할 필요가 없어지는 경우가 있을 것입니다.

이럴 때 사용하는 것이 타입 표명(Type Assertion)입니다. 근본적으로 타입스크릷트에게 거짓말하는 것입니다.

```tsx
import { useState } from 'react';

type AuthUser = {
  name: string;
  email: string;
};

export const User = () => {
  const [user, setUser] = useState<AuthUser>({} as AuthUser);

  const handleLogin = () => {
    setUser({
      name: 'Jake',
      email: 'JakeTheGod@nomailman.com',
    });
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <div>User name is {user.name}</div>
      <div>User email is {user.email} </div>
    </div>
  );
};
```

{} as AuthUser처러럼 타입스크립트에게 거짓말 할때는 타입스크립트보다 개발자가 더 잘알고 있기 때문에 타입 지정을 거짓말로 하는 것입니다.

거짓말 인것도 비어있는 객체를 보고 해당하는 타입이라고 하는 말입니다.

옵셔널 체이닝보다는 좋은 패턴은 맞습니다. 하지만 요구사항과 맥락을 더 잘 파악하고 도입을 결정하도록 합니다. 통신을 실패해도 실패한 페이지를 그대로 보여줘야 하는 경우라면 옵셔널 체이닝을 사용하는 패턴을 유지하도록 합니다. 페이지의 컴포넌트들이 각각 독립적으로 서버랑 통신하고 있을 가능성이 큽니다.

# React TypeScript Tutorial - 12 - useReducer Hook

https://www.youtube.com/watch?v=lSh9RyYcnPA

useState는 유아용입니다. 또 유아들에게도 미안할 정도로 쉽습니다. 정상인들은 useReducer hook을 일상적으로 사용합니다.

state가 복잡하면 useReducer를 활용합니다. 타입지정을 위한 패턴을 다루겠습니다.

```tsx
import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.payload };
    case 'decrement':
      return { count: state.count - action.payload };
    default:
      return state;
  }
}

export const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // count: {state.count}
  return (
    <>
      <h2>count: {state.count}</h2>
      <button onClick={() => dispatch({ type: 'increment', payload: 10 })}>
        Increment 10
      </button>
      <button onClick={() => dispatch({ type: 'decrement', payload: 10 })}>
        Decrement 10
      </button>
    </>
  );
};
```

전통적인 useReducer의 카운터 패턴입니다. 유치원 다녔을 때 추억이 새록새록 피어날 것입니다.

이상태에서 타이핑을 해야 합니다. 처리할 것이 상당히 많습니다.

```tsx
import { type } from '@testing-library/user-event/dist/type';
import { useReducer } from 'react';

type CounterState = {
  count: number;
};

type CounterAction = {
  type: string;
  payload: number;
};

const initialState: CounterState = { count: 0 };

function reducer(state: CounterState, action: CounterAction) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.payload };
    case 'decrement':
      return { count: state.count - action.payload };
    default:
      return state;
  }
}

export const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h2>count: {state.count}</h2>
      <button onClick={() => dispatch({ type: 'increment', payload: 10 })}>
        Increment 10
      </button>
      <button onClick={() => dispatch({ type: 'decrement', payload: 10 })}>
        Decrement 10
      </button>
    </>
  );
};
```

타입 인프런스 덕분에 상당히 간단하게 타이핑을 할 수 있습니다.

리듀서 타이핑을 위해서 파악할 패턴은 `(컴포넌트이름)State`, `(컴포넌트이름)Action`으로 명명하고 타입을 지정하면 됩니다.

생각보다 많은 타입지정이 필요하지는 않습니다.

타입스크립트는 정말 필요할 때만 타입지정을 요구하게 됩니다.

`state`, `dispatch`를 props로 넘겨줘야 할 때는 VScode에서 마우스를 올려서 타입을 보고 props 타입을 간단하게 지정해주도록 합니다.

또 지금 패턴을 보면 액션을 더욱더 엄격하게 지정해줄 필요가 있습니다.

# React TypeScript Tutorial - 13 - useReducer Strict Action Types

https://www.youtube.com/watch?v=bcmes6hUO3U

리듀서 hook에 타이핑하는 법을 배웠지만 한계가 있습니다.

```tsx
type CounterAction = {
  type: string;
  payload: number;
};
```

`Action type`을 문자열로 지정했기 때문에 `dispatch`에 이상하게 입력해도 에러가 발생하도록 막을 수 없습니다.

탬플릿 리터럴로 지정하도록 하면 제약을 만들어 낼 수 있습니다.

```tsx
import { type } from '@testing-library/user-event/dist/type';
import { useReducer } from 'react';

type CounterState = {
  count: number;
};

type CounterAction = {
  type: 'increment' | 'decrement' | 'reset';
  payload: number;
};

const initialState: CounterState = { count: 0 };

function reducer(state: CounterState, action: CounterAction) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.payload };
    case 'decrement':
      return { count: state.count - action.payload };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

export const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // count: {state.count}
  return (
    <>
      <h2>count: {state.count}</h2>
      <button onClick={() => dispatch({ type: 'increment', payload: 10 })}>
        Increment 10
      </button>
      <button onClick={() => dispatch({ type: 'reset', payload: 0 })}>
        reset
      </button>
      <button onClick={() => dispatch({ type: 'decrement', payload: 10 })}>
        Decrement 10
      </button>
    </>
  );
};
```

이렇게 탬플릿 리터럴로 타입의 유형을 지정하면서 하나의 한계를 극복했습니다. 하지만 다른 문제가 있습니다. `reset`을 할때 필요없는 `payload`를 전달해줘야 한다는 점입니다.

```tsx
import { type } from '@testing-library/user-event/dist/type';
import { useReducer } from 'react';

type CounterState = {
  count: number;
};

type UpdateAction = {
  type: 'increment' | 'decrement';
  payload: number;
};

type ResetAction = {
  type: 'reset';
};

// 차별적 유니언
type CounterAction = UpdateAction | ResetAction;

const initialState: CounterState = { count: 0 };

function reducer(state: CounterState, action: CounterAction) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.payload };
    case 'decrement':
      return { count: state.count - action.payload };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

export const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h2>count: {state.count}</h2>
      <button onClick={() => dispatch({ type: 'increment', payload: 10 })}>
        Increment 10
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>reset</button>
      <button onClick={() => dispatch({ type: 'decrement', payload: 10 })}>
        Decrement 10
      </button>
    </>
  );
};
```

차별적 유니언 타이핑은 다음과 같은 상황에서 권장되는 패턴입니다. 꼭 payload가 필요 없는 상황이 생기면는 다른 타입으로 분리하고 각각분리된 타입을 유니언타입으로 합치는 패턴입니다.

권장되는 패턴에 해당합니다.

# React TypeScript Tutorial - 14 - useContext Hook

https://www.youtube.com/watch?v=rbtTb9hLYS8

타입스크립트로 Context API를 사용하는 패턴입니다.

Context로 테마를 지정하는 것은 상당히 흔합니다.

```tsx
// context/theme.ts
export const theme = {
  primary: {
    main: '#3f51b5',
    text: '#fff',
  },
  secondary: {
    main: '#f50057',
    text: '#fff',
  },
};
```

```tsx
// context/Box.tsx
export const Box = () => {
  return <div>Theme context</div>;
};
```

여기서부터 시작합니다. `theme`에 있는 데이터를 `Box` 컴포넌트에 반영시켜줘야 합니다.

```tsx
// Context/ThemeCTX.tsx
import { createContext, ReactNode } from 'react';
import { theme } from './theme';

type ThemeContextProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext(theme);

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
```

이런 패턴으로 간단하게 입력합니다.

```tsx
import './App.css';
import { Box } from './components/context/Box';
import { ThemeContextProvider } from './components/context/ThemeCTX';

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <Box />
      </ThemeContextProvider>
    </div>
  );
}

export default App;
```

Provider로 전달해주면 됩니다.

```tsx
import { useContext, CSSProperties } from 'react';
import { ThemeContext } from './ThemeCTX';

export const Box = () => {
  const theme = useContext(ThemeContext);
  return (
    <div
      style={{ backgroundColor: theme.primary.text, color: theme.primary.main }}
    >
      Theme context
    </div>
  );
};
```

타입스크립트 인프런스로 대부분의 로직이 처리되었습니다.

리액트에서 Context API는 특별히 많이 타입지정이 필요하지 않습니다. 물론 지금은 단순한 케이스에 해당합니다. Context로 나중에 타입이 지정되는 경우가 존재합니다.

# React TypeScript Tutorial - 15 - useContext Future Value

https://www.youtube.com/watch?v=9726Yq3Scjk

```tsx
export const User = () => {
  const handleLogin = () => {};
  const handleLogout = () => {};
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <div>User is </div>
    </div>
  );
};
```

```tsx
// context/UserCTX.tsx
export type AuthUser = {
  name: string;
  email: string;
};
```

이전에 본것처럼 동일하게 시작합니다. 단지 타입지정만 Context 파일에서 다룹니다.

```tsx
import { createContext, ReactNode } from 'react';

export type AuthUser = {
  name: string;
  email: string;
};

type UserCTXProviderProps = {
  children: ReactNode;
};

export const UserCTX = createContext(null);

export const UserCTXProvider = ({ children }: UserCTXProviderProps) => {};
```

비로그인에는 null이고 로그인 시에는 AuthUser 객체를 갖게 되는 Context입니다.

```tsx
import { createContext, ReactNode, useState } from 'react';

export type AuthUser = {
  name: string;
  email: string;
};

type UserCTXProviderProps = {
  children: ReactNode;
};

export const UserCTX = createContext(null);

export const UserCTXProvider = ({ children }: UserCTXProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  return (
    <UserCTX.Provider value={{ user, setUser }}>{children}</UserCTX.Provider>
  );
};
```

이렇게 처음에 null을 값을 갖는 객체를 넘길수 없다고 애러를 돌려줄 것입니다.

```tsx
import {
  createContext,
  Dispatch,
  ReactNode,
  useState,
  SetStateAction,
} from 'react';

export type AuthUser = {
  name: string;
  email: string;
};

type UserCTXProviderProps = {
  children: ReactNode;
};

type UserCTXType = {
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
};

export const UserCTX = createContext<UserCTXType | null>(null);

export const UserCTXProvider = ({ children }: UserCTXProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  return (
    <UserCTX.Provider value={{ user, setUser }}>{children}</UserCTX.Provider>
  );
};
```

타입지정을 엄청 많이 하게 됩니다. createContext에서 제네릭을 지정해줄 때 지정될지도 모르는 타입을 유니언타입으로 지정합니다. `UserCTXType`은 설정이 복잡합니다. user인 state 값에 대한 설정과 setUser인 setter 함수에 대해서도 타입지정을 해준 것입니다. 마우스를 올려서 단순하게 타입에 대한 정답을 얻은 것입니다.

제네릭 속에 제네릭을 지정하게 되는 패턴을 보게 됩니다. setter함수는 Dispatch 타입에서 속하고 SetStateAction은 지정하게 될 state값의 타입을 지정하게 될 것이라는 것을 개발을 하면서 공부하게 됩니다.

```tsx
import './App.css';
import { UserCTXProvider } from './components/context/UserCTX';
import { User } from './components/context/User';

function App() {
  return (
    <div className="App">
      <UserCTXProvider>
        <User />
      </UserCTXProvider>
    </div>
  );
}

export default App;
```

이렇게 Provider를 활용합니다.

```tsx
import { useContext } from 'react';
import { UserCTX } from './UserCTX';

export const User = () => {
  const userContext = useContext(UserCTX);

  const handleLogin = () => {
    if (userContext) {
      userContext.setUser({
        name: 'Jake',
        email: 'Jakethegod@nomailman.com',
      });
    }
  };

  const handleLogout = () => {
    if (userContext) {
      userContext.setUser(null);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <div>User name is {userContext?.user?.name} </div>
      <div>User email is {userContext?.user?.email} </div>
    </div>
  );
};
```

context로 보내고 가져올 수 있습니다.

```tsx
import {
  createContext,
  Dispatch,
  ReactNode,
  useState,
  SetStateAction,
} from 'react';

export type AuthUser = {
  name: string;
  email: string;
};

type UserCTXProviderProps = {
  children: ReactNode;
};

type UserCTXType = {
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
};

// 여기서 타입표명을 처리합니다.
export const UserCTX = createContext({} as UserCTXType);

export const UserCTXProvider = ({ children }: UserCTXProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  return (
    <UserCTX.Provider value={{ user, setUser }}>{children}</UserCTX.Provider>
  );
};
```

```tsx
import { useContext } from 'react';
import { UserCTX } from './UserCTX';

export const User = () => {
  const userContext = useContext(UserCTX);

  const handleLogin = () => {
    userContext.setUser({
      name: 'Jake',
      email: 'Jakethegod@nomailman.com',
    });
  };

  const handleLogout = () => {
    userContext.setUser(null);
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <div>User name is {userContext.user?.name} </div>
      <div>User email is {userContext.user?.email} </div>
    </div>
  );
};
```

이렇게 하면 일부 옵셔널 체이닝을 제거할 수 있습니다.

# React TypeScript Tutorial - 16 - useRef Hook

https://www.youtube.com/watch?v=hA4i1RTbZ2A

useRef hook을 다룹니다. 인스턴스 변수처럼 뮤테이션을 가할 수 있는 경우와 readonly ref로 DOM을 선택할 때 활용합니다.

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

이렇게 생긴 패턴은 많이 봤을 것입니다. 마운트에 input을 바로 `focus`하게 만드는 패턴입니다.

```tsx
import { useRef, useEffect } from 'react';

export const DomRef = () => {
  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      {' '}
      <input type="text" ref={inputRef} />
    </div>
  );
};
```

이렇게 사용하면 됩니다. 타입 표명으로 이렇게 처리할 수 있습니다. 타입표명을 하면 더이상 옵셔널 체이닝에 의존할 필요가 없어집니다.

```tsx
import { useState, useRef, useEffect } from 'react';

export const MutableRef = () => {
  const [timer, setTimer] = useState(0);
  const interValRef = useRef(null);

  const stopTimer = () => {
    window.clearInterval(interValRef.current);
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

다음 예시입니다. 간단한 타이머 기능을 갖고 있습니다.

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

뮤터블 `Ref`는 각각의 적절한 타입을 지정합니다. 이경우는 `number`를 타입으로 지정해줘야 합니다.

# React TypeScript Tutorial - 17 - Class Component

https://www.youtube.com/watch?v=JOhIMtMxjpU

클래스형 컴포넌트에 타입을 지정하는 법입니다. 상당히 오래된 컴포넌트에서 발견할 수 있습니다.

```tsx
import { Component, ReactNode } from 'react';

export class Counter extends Component {
  state = {
    count: 0,
  };

  handleClick = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Increment</button>
        {this.props.message} {this.state.count}
      </div>
    );
  }
}
```

카운터 앱이 이렇게 있습니다.

이 에러를 해결해볼 것입니다. 클래스형 컴포넌트에 타입을 지정하는 것은 2단계입니다. props를 지정하고 State를 지정하면 됩니다. 이것이 1단계입니다. 2단계는 클래스 컴포넌트에 타입들을 연결하는 것입니다.

```tsx
import { Component, ReactNode } from 'react';

type CounterProps = {
  message: string;
};

type CounterState = {
  count: number;
};

export class Counter extends Component<CounterProps, CounterState> {
  state = {
    count: 0,
  };

  handleClick = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render(): ReactNode {
    return (
      <div>
        <button onClick={this.handleClick}>Increment</button>
        {this.props.message} {this.state.count}
      </div>
    );
  }
}
```

이렇게 지정해주면 됩니다. 컴포넌트의 이름을 접두어로 활용하고 접미어로 각각 어디에 사용할지 Props, State로 명명합니다.

Component의 제네릭으로 2개의 타입을 지정해주면 됩니다. 첫번째가 Props에 해당하고 두번째가 State에 해당합니다.

# React TypeScript Tutorial - 18 - Component Prop

https://www.youtube.com/watch?v=qvdnTfyv7y8

컴포넌트 자체를 props로 넘겨주는 법입니다.

```tsx
export const Login = () => {
  return <div>Please login to continue</div>;
};
```

```tsx
export const Profile = () => {
  return <div>Private Profile component</div>;
};
```

```tsx
import { LoggedIn } from '../state/LoggedIn';

export const Private = ({ isLoggedIn, Component }) => {
  if (isLoggedIn) {
    return <Component />;
  } else {
    return <LoggedIn />;
  }
};
```

이렇게 시작하는 코드가 있습니다. 로그인 상태에 따라 컴포넌트 접근 가능여부를 결정해야 합니다.

컴포넌트에서 로그인 상태면 컴포넌트를 보여주고 비로그인이면 로그인 요청 컴포넌트를 화면에 보여줍니다.

props를 `<Component/>`라고 지정하면 컴포넌트 자체를 props로 전달할 수 있게 됩니다.

```tsx
import { ComponentType } from 'react';
import { LoggedIn } from '../state/LoggedIn';

type PrivateProps = {
  isLoggedIn: boolean;
  Component: ComponentType;
};

export const Private = ({ isLoggedIn, Component }: PrivateProps) => {
  if (isLoggedIn) {
    return <Component />;
  } else {
    return <LoggedIn />;
  }
};
```

컴포넌트를 props로 넘길 때는 이렇게 타입을 지정하면 됩니다.

이번 예제의 혼선을 줄이기 위해 간단하게 props하나를 또 지정합니다.

```tsx
type ProfileProps = {
  name: string;
};

export const Profile = ({ name }: ProfileProps) => {
  return <div>Private Profile component. Name is {name}</div>;
};
```

```tsx
import { ComponentType } from 'react';
import { LoggedIn } from '../state/LoggedIn';
import { ProfileProps } from './Profile';

type PrivateProps = {
  isLoggedIn: boolean;
  Component: ComponentType<ProfileProps>;
};

export const Private = ({ isLoggedIn, Component }: PrivateProps) => {
  if (isLoggedIn) {
    return <Component name="Jake" />;
  } else {
    return <LoggedIn />;
  }
};
```

이렇게 하면 props로 넘긴 컴포넌트가 name이라는 props를 받게 할 수 있습니다.

```tsx
import './App.css';
import { Private } from './components/auth/Private';
import { Profile } from './components/auth/Profile';

function App() {
  return (
    <div className="App">
      <Private isLoggedIn={true} Component={Profile} />
    </div>
  );
}

export default App;
```

이렇게 지정하면 컴포넌트를 받는 컴포넌트를 만들 수 있습니다.

컴포넌트를 받는 컴포넌트는 ComponentType으로 타입을 지정합니다. 그리고 제네릭으로 매개변수 컴포넌트에 props의 타입을 지정하는 패턴입니다.

# React TypeScript Tutorial - 19 - Generic Props

https://www.youtube.com/watch?v=xFNk2nfDh4M

제네릭은 리액트 컴포넌트를 만들기 상당히 유용한 타입스크립트 기능입니다.

```tsx
type ListProps = {
  items: string[];
  onClick: (value: string) => void;
};

export const List = ({ items, onClick }: ListProps) => {
  return (
    <div>
      <h2>List of items</h2>
      {items.map((item, idx) => {
        return (
          <div key={idx} onClick={() => onClick(item)}>
            {item}
          </div>
        );
      })}
    </div>
  );
};
```

```tsx
import './App.css';
import { List } from './components/generics/List';

function App() {
  return (
    <div className="App">
      <List
        items={['string', '1234', 'asdf']}
        onClick={(item) => console.log(item)}
      />
    </div>
  );
}

export default App;
```

이런 컴포넌트가 있습니다. 목록이 보이고 클릭하면 이름이 출력됩니다.

문제가 생겼습니다. 확장을 해야 하는 경우입니다. 이번에는 숫자형만 받게 만들어야 합니다.

```tsx
import './App.css';
import { List } from './components/generics/List';

function App() {
  return (
    <div className="App">
      <List
        items={['string', '1234', 'asdf']}
        onClick={(item) => console.log(item)}
      />
      <List items={[1, 2, 3]} onClick={(item) => console.log(item)} />
    </div>
  );
}

export default App;
```

타입을 추가하고 끝내면 되기는 하지만 나중에 또 확장이 필요한 경우가 생길 것입니다. 동적으로 다양한 상황을 수용해야 하는 상황이 발생할 수 있습니다.

이럴 때는 제네릭으로 타입을 동적으로 지정하게 만드는 것입니다. 지금까지는 리액트가 제공하는 타입과 함수에 제네릭을 지정한 것이지만 이번에는 우리가 직접 정의해볼 것입니다.

`<T>`라고 컨벤션상 자주 작성합니다. 다른 텍스트를 붙여도 동작하기는 합니다.

```tsx
type ListProps<T> = {
  items: T[];
  onClick: (value: T) => void;
};

export const List = <T extends {}>({ items, onClick }: ListProps<T>) => {
  return (
    <div>
      <h2>List of items</h2>
      {items.map((item, idx) => {
        return (
          <div key={idx} onClick={() => onClick(item)}>
            {item}
          </div>
        );
      })}
    </div>
  );
};
```

`ListProps<T>`는 매개변수인 Props의 타입을 지정하면서 지정하게 되는 것입니다. 하지만 `T extends {}`로 함수를 호출할 때 제네릭을 지정하게 되는 것입니다. 함수는 props에 지정한 type을 참조하고 참조하고 있는 ListProps의 타입을 지정하기 위해 붙이는 것입니다.

```tsx
type ListProps<T> = {
  items: T[];
  onClick: (value: T) => void;
};

export const List = <T extends { id: string }>({
  items,
  onClick,
}: ListProps<T>) => {
  return (
    <div>
      <h2>List of items</h2>
      {items.map((item, idx) => {
        return (
          <div key={idx} onClick={() => onClick(item)}>
            {JSON.stringify(item)}
          </div>
        );
      })}
    </div>
  );
};
```

이렇게 작성하게 만들면 컴포넌트를 호출할 때 id를 강제로 지정하게 만들 수 있습니다.

JSON.stringify(item)은 에러를 막기 위해 잠시 둡니다. 내일 질문하도록 합니다.

# 어제 의문

```tsx
import './App.css';
import { List } from './components/generics/List';

function App() {
  return (
    <div className="App">
      <List
        items={['string', '1234', 'asdf']}
        onClick={(item) => console.log(item)}
        renderItem={(item) => <div>{item}</div>}
      />
    </div>
  );
}

export default App;
```

```tsx
type ListProps<T> = {
  items: T[];
  onClick: (value: T) => void;
  renderItem: (item: T) => React.ReactNode;
};
export const List = <T extends {}>({
  items,
  onClick,
  renderItem,
}: ListProps<T>) => {
  return (
    <div>
      <h2>List of items</h2>
      {items.map((item, idx) => {
        return (
          <div key={idx} onClick={() => onClick(item)}>
            {renderItem(item)}
          </div>
        );
      })}
    </div>
  );
};
```

이렇게 해결합니다.

# React TypeScript Tutorial - 20 - Restricting Props

https://www.youtube.com/watch?v=yqn9Fkv7f2M

props를 넘기는데 제약을 걸어두는 방법입니다.

```tsx
type RandomNumberProps = {
  value: number;
  isPositive?: boolean;
  isNegative?: boolean;
  isZero?: boolean;
};

export const RandomNumber = ({
  value,
  isPositive,
  isNegative,
  isZero,
}: RandomNumberProps) => {
  return (
    <div>
      {value} {isPositive && 'positive'} {isNegative && 'negative'}{' '}
      {isZero && 'zero'}
    </div>
  );
};
```

지금 이런 코드가 있습니다.

```tsx
import './App.css';
import { RandomNumber } from './components/restruction/RandomNumber';

function App() {
  return (
    <div className="App">
      <RandomNumber value={10} />
    </div>
  );
}

export default App;
```

이렇게 하면 에러가 발생하지 않습니다. 하지만 의도랑 다르게 컴포넌트가 사용될 수 있습니다.

```tsx
import './App.css';
import { RandomNumber } from './components/restruction/RandomNumber';

function App() {
  return (
    <div className="App">
      <RandomNumber
        value={10}
        isNegative={true}
        isPositive={false}
        isZero={true}
      />
    </div>
  );
}

export default App;
```

이런식으로 올바르지 못한 유스케이스를 만들 수 있습니다. 이 유스케이스가 발생하는 것에 제약을 걸어둬야 합니다.

```tsx
type RandomNumberType = {
  value: number;
};

type PositiveNumber = RandomNumberType & {
  isPositive: boolean;
  isNegative?: never;
  isZero?: never;
};

type NegativeNumber = RandomNumberType & {
  isPositive?: never;
  isNegative: boolean;
  isZero?: never;
};

type ZeroNumber = RandomNumberType & {
  isPositive?: never;
  isNegative?: never;
  isZero: boolean;
};

type RandomNumberProps = PositiveNumber | NegativeNumber | ZeroNumber;

export const RandomNumber = ({
  value,
  isPositive,
  isNegative,
  isZero,
}: RandomNumberProps) => {
  return (
    <div>
      {value} {isPositive && 'positive'} {isNegative && 'negative'}{' '}
      {isZero && 'zero'}
    </div>
  );
};
```

이런식으로 제약을 걸어두면 로직상 불가능할 때 에러가 발생하게 만들 수 있습니다.

```tsx
import './App.css';
import { RandomNumber } from './components/restruction/RandomNumber';

function App() {
  return (
    <div className="App">
      <RandomNumber value={10} isPositive={true} />
    </div>
  );
}

export default App;
```

이런식으로 로직을 구현할수 있게 됩니다.

# React TypeScript Tutorial - 21 - Template Literals and Exclude

https://www.youtube.com/watch?v=jrnIh0RPeCw

템플릿리터럴 타입입니다. string 리터럴 타입을 지정하는 것은 템플릿리터럴에 응용할 수 있습니다.

```tsx
type StatusProps = {
  status: 'loading' | 'success' | 'error';
};

export const Status = ({ status }: StatusProps) => {
  let message;

  if (status === 'loading') message = '로딩';
  if (status === 'success') message = '완료';
  if (status === 'error') message = '에러';

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};
```

과거 봤던 string 리터럴 타입니다.

```tsx
/**
 * Position prop can be one of
 * "left-center" | "left-top" | "left-bottom" | "center" | "center-top"
 * "center-bottom" | "right-center" | "right-top" | "right-bottom"
 */

export const Toast = ({ position }) => {
  return <div>Toast Notification Position - {position}</div>;
};
```

이런 컴포넌트가 있습니다. 토스트 컴포넌트는 다양한 위치 종류가 있습니다. 위치는 특정 유형으로 만들어서 보이게 만들 수 있습니다. 위의 예시처럼 너무 많은 하드코딩을 하지않는 패턴입니다.

템플릿리털 패턴으로 처리할 수 있습니다. 값을 합쳐서 새로운 값을 만드는 패턴입니다.

```tsx
type HorizontalPosition = 'left' | 'center' | 'right';
type VerticalPosition = 'top' | 'center' | 'bottom';

type ToastProps = {
  position: `${HorizontalPosition}-${VerticalPosition}`;
};

export const Toast = ({ position }: ToastProps) => {
  return <div>Toast Notification Position - {position}</div>;
};
```

9개를 하드코딩하지않고 조합할 수 있게 됩니다.

```tsx
import './App.css';
import { Toast } from './components/templateliterals/Toast';

function App() {
  return (
    <div className="App">
      <Toast position="center-center" />
    </div>
  );
}

export default App;
```

9개의 위치를 자동완성으로 지원해주지만 한계가 있습니다. center-center입니다.

```tsx
type HorizontalPosition = 'left' | 'center' | 'right';
type VerticalPosition = 'top' | 'center' | 'bottom';

type ToastProps = {
  position:
    | Exclude<`${HorizontalPosition}-${VerticalPosition}`, 'center-center'>
    | 'center';
};

export const Toast = ({ position }: ToastProps) => {
  return <div>Toast Notification Position - {position}</div>;
};
```

이렇게 `Exclude`인 유틸 타입으로 특정 타입을 제외하게 만들 수 있습니다. `center-center`를 제외하고 유니언 타입으로 center를 대신 고르게 만듭니다.

```tsx
import './App.css';
import { Toast } from './components/templateliterals/Toast';

function App() {
  return (
    <div className="App">
      <Toast position="center" />
    </div>
  );
}

export default App;
```

`center-center`에서 `center`로 작성할 수 있게 됩니다.

# React TypeScript Tutorial - 22 - Wrapping HTML Elements

https://www.youtube.com/watch?v=4GchlC06ca0

HTML을 결합하고 커스텀 컴포넌트를 만들 수 있습니다.

```tsx
export const CustomButton = () => {
  return <button>Label</button>;
};
```

이런 버튼이 있습니다.

```tsx
type ButtonProps = {
  variant: 'primary' | 'secondary';
};

export const CustomButton = ({ variant }: ButtonProps) => {
  return <button className={`class-with-${variant}`}>Label</button>;
};
```

이런 패턴이면 variant에 따라 적용할 클래스를 동적으로 만들 수 있습니다.

```tsx
import './App.css';
import { CustomButton } from './components/html/Button';

function App() {
  return (
    <div className="App">
      <CustomButton variant="primary" />
    </div>
  );
}

export default App;
```

이렇게 작성하면 문제가 없습니다. 하지만 한계가 있습니다. 하나는 버튼의 텍스트를 지정하는 것이 문제입니다.

```tsx
import './App.css';
import { CustomButton } from './components/html/Button';

function App() {
  return (
    <div className="App">
      <CustomButton variant="primary">???</CustomButton>
    </div>
  );
}

export default App;
```

이렇게 작성하면 에러가 발생합니다. 이런 케이스를 위해 타입을 또 지정합니다.

```tsx
import { ComponentProps } from 'react';

type ButtonProps = {
  variant: 'primary' | 'secondary';
} & ComponentProps<'button'>;

export const CustomButton = ({ variant, children, ...rest }: ButtonProps) => {
  return (
    <button className={`class-with-${variant}`} {...rest}>
      {children}
    </button>
  );
};
```

이렇게 작성하면 동작하게 됩니다.

```tsx
import { ComponentProps } from 'react';

type InputProps = ComponentProps<'input'>;

export const CustomInput = (props: InputProps) => {
  return <input {...props} />;
};
```

이렇게만 해주면 컴포넌트를 커스터마이징할 수 있게 됩니다. 로직과 스타일링을 분리할 수 있게 됩니다.

omit, pick을 활용하면 의도랑 더 많은 제약을 걸어둘 수 있습니다.

```tsx
import './App.css';
import { CustomButton } from './components/html/Button';

function App() {
  return (
    <div className="App">
      <CustomButton variant="primary">
        <div>???</div>
      </CustomButton>
    </div>
  );
}

export default App;
```

지금같은 경우가 있습니다. 단순하게 컴포넌트 사이 텍스트만 넣게 만들고 싶을 수 있습니다.

```tsx
import { ComponentProps } from 'react';

type ButtonProps = {
  variant: 'primary' | 'secondary';
  children: string;
} & ComponentProps<'button'>;

export const CustomButton = ({ variant, children, ...rest }: ButtonProps) => {
  return (
    <button className={`class-with-${variant}`} {...rest}>
      {children}
    </button>
  );
};
```

이것도 하나의 방법입니다. 하지만 조금더 우아한 방법이 있습니다.

```tsx
import { ComponentProps } from 'react';

type ButtonProps = {
  variant: 'primary' | 'secondary';
  children: string;
} & Omit<ComponentProps<'button'>, 'children'>;

export const CustomButton = ({ variant, children, ...rest }: ButtonProps) => {
  return (
    <button className={`class-with-${variant}`} {...rest}>
      {children}
    </button>
  );
};
```

이렇게 하면됩니다. 리액트 노드에서 children은 제외하고 문자열로만 입력가능헤 지정할 수 있습니다. 앞으로 디자인시스템을 만들때 활용하도록 합니다.

# React TypeScript Tutorial - 23 - Extracting a Components Prop Types

https://www.youtube.com/watch?v=AHadSDk7i6s

컴포넌트의 proptype을 추출하는 법입니다. 이미 존제하는 컴포넌트의 prop가 사용하는 타입만 추출하는 것은 가능합니다.

```tsx
export const CustomComponent = (props) => {
  return <div></div>;
};
```

이런 컴포넌트가 있습니다. 하지만 다른 props 타입을 그대로 일 경우 다른 컴포넌트를 import해서 type만 가져올 수 있습니다.

```tsx
type GreetProps = {
  name: string;
  num?: number;
  isLogin: boolean;
};

export const Greet = ({ name, num = 0, isLogin }: GreetProps) => {
  return (
    <div>
      {isLogin ? <h2>Hello... it's me... {name} </h2> : null}
      <p>lucky number {num}</p>
    </div>
  );
};
```

이렇게 되어 있는 컴포넌트에서 바로 받아서 사용해야 할 경우입니다.

```tsx
import { ComponentProps } from 'react';
import { Greet } from '../Greet';

export const CustomComponent = (props: ComponentProps<typeof Greet>) => {
  return (
    <div>
      {props.isLogin} {props.name}
    </div>
  );
};
```

이렇게 작성하면 자동완성도 지원하게 됩니다. 다른 컴포넌트의 type을 재사용할 수 있게 됩니다.

# React TypeScript Tutorial - 24 - Polymorphic Components

https://www.youtube.com/watch?v=uZ8GZm5KEXY

다형성 컴포넌트입니다. 입문자에서 기초로 진입하기 위해 알게되는 개념 중 하나입니다. 컴포넌트라이브러리, 디자인 시스템을 만들 때 필요한 개념입니다.

```tsx
import { ReactNode } from 'react';

type TextProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary';
  children: ReactNode;
};

export const Text = ({ size, color, children }: TextProps) => {
  return <div className={`class-with-${size}-${color}`}>{children}</div>;
};
```

```tsx
import './App.css';
import { Text } from './components/polymorphic/Text';

function App() {
  return (
    <div className="App">
      <Text size="lg">Heading</Text>
      <Text size="md">Paragraph</Text>
      <Text size="sm" color="secondary">
        Label
      </Text>
    </div>
  );
}

export default App;
```

이런 컴포넌트가 있습니다. 문제가 있습니다. 재사용성이 있는 컴포넌트가 있지만 하지만 결국에는 div태그입니다. 그래서 html 태그로 무엇을 넣을지 제어해야 합니다.

```tsx
import './App.css';
import { Text } from './components/polymorphic/Text';

function App() {
  return (
    <div className="App">
      <Text as="h1" size="lg">
        Heading
      </Text>
      <Text as="p" size="md">
        Paragraph
      </Text>
      <Text as="label" size="sm" color="secondary">
        Label
      </Text>
    </div>
  );
}

export default App;
```

우리는 시멘틱한 html이 나오기를 원합니다. 이것을 보고 다형적 컴포넌트라고 부릅니다.

처음 필요한 것은 as를 prop로 만드는 것입니다.

```tsx
import { ReactNode } from 'react';

type TextProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary';
  children: ReactNode;
  as?: string;
};

export const Text = ({ size, color, children, as }: TextProps) => {
  const Component = as || 'div';
  return (
    <Component className={`class-with-${size}-${color}`}>{children}</Component>
  );
};
```

여기까지가 1단계입니다. 당연히 타입스크립트가 에러를 돌려줍니다.

`Component`의 타입이 문제입니다.

```tsx
import { ElementType, ReactElement, ReactNode } from 'react';

type TextProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary';
  children: ReactNode;
  as?: ElementType;
};

export const Text = ({ size, color, children, as }: TextProps) => {
  const Component = as || 'div';
  return (
    <Component className={`class-with-${size}-${color}`}>{children}</Component>
  );
};
```

이렇게 하면 컴포넌트를 호출하는 곳에도서 html을 동적으로 지정해줄 수 있게 됩니다.

호출을 하고 `as`를 입력하면 자동완성을 지원하기 시작합니다.

하지만 한계가 있습니다.

```tsx
import './App.css';
import { Text } from './components/polymorphic/Text';

function App() {
  return (
    <div className="App">
      <Text as="h1" size="lg">
        Heading
      </Text>
      <Text as="p" size="md">
        Paragraph
      </Text>
      <Text as="label" htmlFor="Id" size="sm" color="secondary">
        Label
      </Text>
    </div>
  );
}

export default App;
```

label 태그에는 htmlFor를 입력할 수 있어야 하는데 타입스크립트가 에러를 돌려줍니다.

```tsx
import { ComponentProps, ElementType, ReactElement, ReactNode } from 'react';

type TextOwnProps<E extends ElementType> = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary';
  children: ReactNode;
  as?: E;
};

type TextProps<E extends ElementType> = TextOwnProps<E> & ComponentProps<E>;

export const Text = ({ size, color, children, as }: TextProps) => {
  const Component = as || 'div';
  return (
    <Component className={`class-with-${size}-${color}`}>{children}</Component>
  );
};
```

이렇게 해서 제네릭에 상속을 섞어 사용할 수 있습니다. 하지만 생기는 문제가 있습니다. 동일한 이름의 충돌이 발생할 수 있습니다.

```tsx
import { ComponentProps, ElementType, ReactElement, ReactNode } from 'react';

type TextOwnProps<E extends ElementType> = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary';
  children: ReactNode;
  as?: E;
};

type TextProps<E extends ElementType> = TextOwnProps<E> &
  Omit<ComponentProps<E>, keyof TextOwnProps<E>>;

export const Text = <E extends ElementType>({
  size,
  color,
  children,
  as,
}: TextProps<E>) => {
  const Component = as || 'div';
  return (
    <Component className={`class-with-${size}-${color}`}>{children}</Component>
  );
};
```

```tsx
import './App.css';
import { Text } from './components/polymorphic/Text';

function App() {
  return (
    <div className="App">
      <Text as="h1" size="lg">
        Heading
      </Text>
      <Text as="p" size="md">
        Paragraph
      </Text>
      <Text as="label" htmlFor="Id" size="sm" color="secondary">
        Label
      </Text>
    </div>
  );
}

export default App;
```

이렇게 작성하면 적용이 가능합니다. 상당히 기초적인 수준이라 반드시 알아야 합니다.

디자인 시스템을 엔지니어링할 때 상당히 기초적인 내용이 됩니다.

# React TypeScript Tutorial - 25 - Wrapping up

https://www.youtube.com/watch?v=YmATkdc-5NY

- 입문에서 기본적인 props 제어를 배웠습니다.
- 이벤트 객체와 스타일 객체도 다루는 법도 배웠습니다.
- useState, useReducer, Context API, useRef를 배웠습니다.
- 클래스형 컴포넌트도 방문했습니다.

여기서부터는 타입스크립트 자체를 더 공부하기를 권장합니다.

리액트 타입스크립트로 프로젝트를 진행해보기를 권장합니다.

# Types.d.ts

```tsx
// type.d.ts
// 전역 변수
declare const pi = 3.14;

// 전역 함수
declare namespace myLib {
  function greet(person: string): string;
  let name: string;
}
myLib.greet('캡틴');
myLib.name = '타노스';
```

아래가 출처입니다.

https://joshua1988.github.io/ts/usage/declaration.html#%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%84%A0%EC%96%B8-%ED%8C%8C%EC%9D%BC
