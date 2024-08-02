---
sidebar_position: 8
---

# react tip

## htmlFor

```js
import React from 'react';

const Form = ({
  todoTitle,
  setTodoTitle,
  todoContent,
  setTodoContent,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <label htmlFor="title">제목</label>
      <input
        onChange={(event) => setTodoTitle(event.target.value)}
        type="text"
        id="title"
        placeholder="예: 1일 1커밋"
        value={todoTitle}
      />
      <label htmlFor="content">내용</label>
      <input
        onChange={(event) => setTodoContent(event.target.value)}
        type="text"
        id="content"
        placeholder="예: git 명령어 정리"
        value={todoContent}
      />
      <input type="submit" value="추가" />
    </form>
  );
};

export default Form;
```

jsx에서 `label`의 속성값 `for`는 반복 예약어이기 때문에 `htmlFor`를 사용해야 합니다.

## 조건부 props(Conditional Props)

```ts
type ComponentProps = {
  disabled: boolean;
};

function Component({ disabled }: ComponentProps) {
  return <button {...(disabled && { tabIndex: -1 })}></button>;
}
```

tabIndex는 컴포넌트가 호출된 순서대(혹은 html을 작성한 순서)로 브라우저가 알아서 번호를 지정해줍니다.

하지만 가끔은 tabIndex 접근을 유저경험상 차단해야 하는 경우가 있습니다.

조건에 따라 props를 정의하고 지정할지 말지 이렇게 제어할 수 있습니다.

## html 기본 props(html native props) 접근

```ts
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

function Button({ children, ...other }: ButtonProps) {
  return <button {...other}>{children}</button>;
}
```

HTML이 제공하는 기본 attribute를 접근하는 방법입니다. 그리고 `&`으로 다른 타입을 확장할 수 있습니다.

## React 리팩토링

React 코드를 정리하는 방법과 원칙들이 있습니다.

1. 상태는 없을수록 좋습니다.
2. hook은 로직만 담습니다.
3. 반복하는 로직은 hook으로 추출합니다.
4. 비즈니스 로직의 관심사가 다르면 hook 추출로 관심사를 분리하고 추상화합니다.
5. 중첩 삼항 연산자는 어디서든지 안티패턴입니다. JSX에서도 마찬가지입니다.
6. JSX가 조건부랜더링을 하면 추출합니다.
7. JSX에 순회가 있으면 추출합니다.
8. DB랑 통신하는 state는 class로 앤티티 및 레코드 인스턴스를 만들고 메서드로 쓰기를 추상화합니다.
9. 액션은 최대한 hook에 몰아줍니다.
10. 순수 계산은 util 함수에 몰아줍니다.

### handler는 hook 아래

```ts
function Component() {
  const handlerFromComponent = () => {
    // 이런저런 로직
  };

  const { handlerFromHook, toggle } = useHook(handlerFromComponent);

  return (
    <div>
      <button onClick={handlerFromHook}>foo</button>
      <button onClick={handlerFromComponent}>bar</button>
    </div>
  );
}
```

만약에 이렇게 작성했다면 컴포넌트 내에서 설계를 잘못한 것입니다.

```ts
function Component() {
  const { handlerFromHook, toggle } = useHook();

  const handlerFromComponent = () => {
    // 이런저런 로직
  };

  return (
    <div>
      <button onClick={handlerFromHook}>foo</button>
      <button onClick={handlerFromComponent}>bar</button>
    </div>
  );
}
```

이런 구조로 작성하는 것이 올바릅니다.

만약에 hook이 handler를 callback로 받아야 한다면 잘못된 설계입니다. 또 나중에 잘못된 설계로 확장될 가능성이 큽니다.

### 순회는 개별 component로 추출

```ts
import { useState } from 'react';

const arr = ['foo', 'bar', 'baz'];

function Component() {
  const [isShow, setIsShow] = useState(false);

  const handleToggleIsShow = () => {
    setIsShow();
  };

  return (
    <div>
      <button onClick={handleToggleIsShow}>{isShow ? 'hi' : 'bye'}</button>
      <ul>
        {arr.map((elem) => (
          <li>{elem}</li>
        ))}
      </ul>
    </div>
  );
}
```

위에 코드의 관심사는 다릅니다. 하나는 handler와 순회는 서로 무관합니다. 코드에 알 것은 호출이되었다는 사실만 알면 됩니다. 구현 디테일은 굳이 보여줘서 정신적인 부하를 늘릴 필요는 없습니다.

```ts
import List from './List';

function Component() {
  const [isShow, setIsShow] = useState(false);

  const handleToggleIsShow = () => {
    setIsShow();
  };

  return (
    <div>
      <button onClick={handleToggleIsShow}>{isShow ? 'hi' : 'bye'}</button>
      <List />
    </div>
  );
}
```

코드를 위에 이렇게만 보면 이해는 상당히 직관적입니다.

```ts
const arr = ['foo', 'bar', 'baz'];

function List() {
  return (
    <ul>
      {arr.map((elem) => (
        <li>{elem}</li>
      ))}
    </ul>
  );
}

export default List;
```

순회는 숨겨둡니다. 순회할 때 자세히 어떻게 되는지는 필요한 시점에 진입해서 읽어도 문제는 없습니다.

또 조건부 랜더링도 숨길 수 있습니다.

```ts
import List from './List';
import Button from './List';

function Component() {
  return (
    <div>
      <Button />
      <List />
    </div>
  );
}
```

```ts
function Button() {
  const [isShow, setIsShow] = useState(false);

  const handleToggleIsShow = () => {
    setIsShow();
  };
  return <button onClick={handleToggleIsShow}>{isShow ? 'hi' : 'bye'}</button>;
}

export default Button;
```

이렇게 되면 상위의 컴포넌트는 순수 마크업에 가까워집니다. 즉 독자 관점에서는 상태가 없어 보이게 됩니다.

---

#### 래퍼런스

[I kinda hate hooks ... a refactoring story](https://www.youtube.com/watch?v=t3jC2xbEyTI)

- 조건문이 있으면 custom hook으로 추출합니다.

[React Query tips from the maintainer @tkDodo](https://www.youtube.com/watch?v=PtHRZqh3LHI)

- useEffect는 custom hook으로 추출합니다.
  - useState도 있으면 추가 랜더링도 발생할 것입니다.
- ReactQuery를 직접활용하는 것이 좋습니다. 캐시를 직접 접근하는 경우는 자제하도록 합니다.
  - useQuery에서 접근해야 리액트가 화면상 구독하고 캐싱관리를 잘합니다.
- useMutation의 반환값을 지역상태로 활용하지 않습니다.
  - loading, error flag를 편하게 활용하도록 제공하는 wrapper에 불과합니다.
  - 반환 데이터를 data를 클라이언트의 local state로 사용하도록 설계를 의도하지는 않았습니다.
  - stateManager의 역할이 아니라 갱신의 역할을 부여할 의도로 만들었습니다.
  - 1가지 방법은 반환응답을 캐시에 반영하는 것입니다. 다른 방법은 현재 캐시를 유효하지 않음 처리하고 refetch해서 받아옵니다.
  - mutation이 발생하면 캐시(useQuery)에서 데이터를 읽도록 합니다.
- 통신으로 갱신이 발생하면 option 객체에서 onSettled callback으로 queryClient.invalidateQueries에서 해당하는 캐시의 유효함을 무효처리하면 됩니다.
- queryClient는 트리에서 가장가까운 순서로 조회합니다.
- react-query의 state 모두 복사하지 말고 최소한의 state만 활용합니다.
- 사이드이펙트는 이벤트 핸들러 내에 있고 useEffect는 자제하도록 합니다.
- useQuery는 여러개의 query를 하나로 결합하는 것도 가능합니다.
  - 비즈니스 특성상 의존성을 원래부터 갖고 있으면 코드를 제어하고 중복을 제거하는 관점에서 결합이 좋습니다. 2개의 리소스를 동시에 제어하는 관점입니다.
  - 트레이드오프는 만약에 관련성이 원래부터 없었으면 무관한 리소스에 요청이 발생한다는 것입니다.

## .env

```ts
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
// const supabaseKey = process.env.REACT_APP_ANON_KEY!;

const supabaseKey = process.env.REACT_APP_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);
```

어제 설정하면서 발생한 에러를 팀원이 해결해줬습니다. 감사합니다.

```env title=".env"
REACT_APP_SUPABASE_URL = 비밀
REACT_APP_ANON_KEY = 비밀
```

`env` 설정하는데 리액트의 경우 `REACT_APP`이 접두어로 붙는게 예약어로 설정되어 있습니다.

## html이 제공하는 attributes type 접근하기

```ts title="input"
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  customRef?: React.RefObject<HTMLInputElement>;
};

export function Input({ value, onChange, customRef, ...other }: InputProps) {
  return (
    <InputWrapper
      onChange={onChange}
      value={value}
      ref={customRef}
      {...other}
    />
  );
}
```

## `useRef` 구체적으로 쉽게 타입 지정하기

<iframe class="codepen" src="https://www.youtube.com/embed/JuULWGuoI1A" title="Typing useRef is EASY with ElementRef" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

[Strongly Type useRef with ElementRef](https://www.totaltypescript.com/strongly-type-useref-with-elementref)

```ts
import { useRef, ElementRef } from 'react';

const Component = () => {
  const audioRef = useRef<ElementRef<'audio'>>(null);

  return <audio ref={audioRef}>Hello</audio>;
};
```

`ElementRef`의 제네릭을 대입할 때 원하는 태그에 자동완성으로 지정하면 됩니다.

custom hook에서 무슨 Element에 지정하지 말아야 하는지 구체적으로 명시할 때 활용할 수 있습니다.

## 컴포넌트 제어역전

컴포넌트를 개발할 때 제어역전하는 전략도 있습니다.

<iframe class="codepen" src="https://www.youtube.com/embed/AQwXK8XcXcE" title="🏆 React component props like a senior dev" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

컴포넌트에 비슷하지만 사용할 때마다 고유하게 전략적으로 다를 때는 children을 활용해서 내부를 개조하는 전략이 있습니다.

```js
function Component() {
  return <Sidebar foo="bar" baz="qux" />;
}
```

이렇게 사용할 때마다 props를 추가하는 전략은 코드베이스를 멸망(apropcalypes)시키는 지름길입니다.

```js
function Component() {
  return (
    <Sidebar>
      <Foo />
      <Bar />
    </Sidebar>
  );
}
```

호출하는 지점에서 고유하게 취해야 하는 컴포넌트에서는 children을 주입하는 전략입니다. 상속보다 조합에 가까운 전략입니다.

호출하는 사람에게 책임을 어느정도 전가합니다.

## look up 패턴

여러개의 조건부랜더링을 처리해야 할 때 활용할 수 있는 패턴입니다. 원래는 주로 삼항연산자로 많이 해결했지만 컴포넌트는 함수이고 함수 자체를 객체에 할당하고 객체에서 읽어 오게하는 방식으로 코드를 정리할 수 있습니다.

개인적으로 여전히 안티패턴으로 생각이 듭니다. 원래 하지말아야 하는 활용법으로 코드를 작성합니다. 마치 `{Component()}`의 모양로 작성하기 때문에 거부감이 있습니다.

https://www.youtube.com/shorts/gvMpY48kf2w

look up 패턴은 생각보다 다양한 곳에 활용할 수 있습니다.

```ts
const DefaultButton = ({ text, type, size, onClick }: DefaultButtonProps) => {
  return (
    <DefaultButtonContainer type={type} size={size} onClick={onClick}>
      {text}
    </DefaultButtonContainer>
  );
};

interface DefaultButtonContainerProps {
  type: DefaultButtonType;
  size: DefaultButtonSize;
  children: string;
}

type DefaultButtonType = 'full' | 'outline';
type DefaultButtonSize = 's' | 'm';

const getDefaultButtonType = (type: DefaultButtonType) => {
  if (type === 'full') {
    return `background-color: grey;
            color: white;`;
  }

  return `background-color: transparent;
         color: grey;
         border: 1px solid grey;
        `;
};

const getDefaultButtonSize = (size: DefaultButtonSize) => {
  if (size === 'm') {
    return `width: 8rem; 
            height:2.5rem;`;
  }
  return `width: 5.625rem; 
          height: 2.5rem;`;
};

const DefaultButtonContainer = styled.button<DefaultButtonProps>`
  border-radius: 0.3125rem;
  border: none;
  cursor: pointer;
  ${({ type }: Pick<DefaultButtonContainerProps, 'type'>) =>
    getDefaultButtonType(type)};
  ${({ size }: Pick<DefaultButtonContainerProps, 'size'>) =>
    getDefaultButtonSize(size)};
` as any;

export default DefaultButton;
```

스타일드 컴포넌트도 lookup 패턴을 적용할 수 있습니다. 이렇게 적용할 것이라 생각하지는 못했습니다. 지금은 if문을 사용하지만 나중에는 switch case 문을 사용하도록 수정할 것입니다.

참고로 제가 작성한 코드가 아닙니다.

## CRA에 타입스크립트 추가하기

이제는 거의할 일이 없을 가능성이 높습니다. 새로운 프로젝트를 CRA로 시작하는 경우는 별로 없고 그 프로젝트 마져 자바스크립트인 경우도 별로 없습니다. 하지만 아주 가끔 필요할지도 모릅니다.

[Add TypeScript to React in Less Than 5 Minutes](https://www.youtube.com/watch?v=12qzCOYLLoc)

https://create-react-app.dev/docs/adding-typescript/

```sh
npm install --save typescript @types/node @types/react @types/react-dom
```

CRA 공식문서는 일반 의존성에 추가하라고 합니다. 개발 의존성이 아닌 이유가 궁금해졌습니다. 또 처음부터 CRA로 설치해보니까 모두 일반 의존성에 있습니다.

위 라이브러리를 설치하면 터미널에서 다음과 같은 경고가 발생할 것입니다.

```txt
One of your dependencies, babel-preset-react-app, is importing the
"@babel/plugin-proposal-private-property-in-object" package without
declaring it in its dependencies. This is currently working because
"@babel/plugin-proposal-private-property-in-object" is already in your
node_modules folder for unrelated reasons, but it may break at any time.

babel-preset-react-app is part of the create-react-app project, which
is not maintianed anymore. It is thus unlikely that this bug will
ever be fixed. Add "@babel/plugin-proposal-private-property-in-object" to
your devDependencies to work around this error. This will make this message
go away.
```

이런 에러가 발생합니다. 그래서 다음 라이브러리를 설치합니다.

```sh
npm install --save-dev @babel/plugin-proposal-private-property-in-object
```

여기서 다음 에러 메시지가 터미널에 보입니다.

```txt
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR!
npm ERR! While resolving: react-scripts@5.0.1
npm ERR! Found: typescript@5.1.6
```

[(react-scripts) Support for TypeScript 5.x](https://github.com/facebook/create-react-app/issues/13080)

위 명령으로 패키지를 설치하는데 다음 에러가 발생했습니다.

```json title="package.json"
{
  "dependencies": {
    "typescript": "^5.1.6"
  },
  "overrides": {
    "typescript": "^5.1.6"
  }
}
```

overrides를 추가하고 다시 명령하면 설치가 성공합니다. 그리고 실행하면 정상 작동합니다.

### 부록: 배포버전 확인을 위해 serve 설치하기

```sh
npm install -g serve
serve -s build
```

평소 serve를 그냥 스크립트 명령으로 봤었지만 수동으로 이렇게 설정하니까 이런 패키지가 필요할 줄 몰랐습니다.


<!--# React Router DOM-->

<!--React Router DOM은 클라이언트 사이드 라우팅을 처리하는 라이브러리입니다. SPA로 CSR로 프로그래밍 하면 page 단위 라우팅의 로직은 클라이언트의 책임이 됩니다.-->

<!--React Router DOM은 현재 산업 표준입니다.-->

## react-router-dom loader 함수 매개변수 타입지정 LoaderFunctionArgs

```ts
import { type LoaderFunctionArgs } from 'react-router-dom';

function loader({}: LoaderFunctionArgs) {
  return null;
}

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Component />,
    loader,
  },
]);
```

loader 내부에 접근할 수 있는 매개 변수를 알고자 타입을 찾아봤습니다. 이제 page에서 위처럼 `import`하고 사용하면 됩니다.
