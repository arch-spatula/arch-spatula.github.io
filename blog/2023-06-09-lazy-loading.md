---
title: lazy loading은 default export만 지원합니다.
authors: [arch-spatula]
tags:
  [
    'frontend',
    'named export',
    'default export',
    'lazy loading',
    '컨테이너 쿼리',
    'container query',
  ]
description: https는 서버만 있으면 됩니다.
toc_max_heading_level: 6
---

# lazy loading은 default export만 지원합니다.

`React.lazy`는 현재 `default exports`만 지원합니다. 다른 방법이 없습니다. 페이지 컴포넌트 단위 Code-Splitting이 현재 지식에서 최선이었습니다.

<!--truncate-->

## lazy loading

사실 기본 중 기본인데 교육 과정에서 아무도 안 알려줬습니다. 개발자가 야성을 길러야 하는 것은 맞지만 이것도 안알려주는 거는 좀... ㅂㄷㅂㄷ...

예전에 사용해보고 아주 좋았던 라이브러리가 있어서 또 사용하려고 합니다.

[REACT SPINNERS](https://www.davidhu.io/react-spinners/)

컴포넌트 활용이 상당히 직관적이어서 사용하기로 했습니다.

```tsx
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './GlobalLayout';
import { ROUTE_PATHS } from '../constant/config';
import { lazy } from 'react';

const Landing = lazy(() =>
  import('../pages/Landing').then((module) => ({ default: module.Landing }))
);
const SignIn = lazy(() =>
  import('../pages/SignIn').then((module) => ({ default: module.SignIn }))
);
const SignUp = lazy(() =>
  import('../pages/SignUp').then((module) => ({ default: module.SignUp }))
);
const Cards = lazy(() =>
  import('../pages/Cards').then((module) => ({ default: module.Cards }))
);
const Deck = lazy(() =>
  import('../pages/Deck').then((module) => ({ default: module.Deck }))
);
const Setting = lazy(() =>
  import('../pages/Setting').then((module) => ({ default: module.Setting }))
);
const NotFound = lazy(() =>
  import('../pages/NotFound').then((module) => ({ default: module.NotFound }))
);

const routes = createBrowserRouter([
  {
    path: ROUTE_PATHS.WELCOME,
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      { path: ROUTE_PATHS.SIGN_IN, element: <SignIn /> },
      { path: ROUTE_PATHS.SIGN_UP, element: <SignUp /> },
      { path: ROUTE_PATHS.CARDS, element: <Cards /> },
      { path: ROUTE_PATHS.DECK, element: <Deck /> },
      { path: ROUTE_PATHS.SETTING, element: <Setting /> },
    ],
    errorElement: <NotFound />,
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
```

페이지 단위로 lazy loading만 적용한다고 끝나는 것이 아닙니다.

```tsx
import { Global } from '@emotion/react';
import GlobalStyle from '../styles/Reset';
import { Navbar } from '../Components';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { PulseLoader } from 'react-spinners';

/**
 * @see https://github.com/WANTED-TEAM03/pre-onboarding-10th-1-3/blob/main/src/routes/_globalLayout.tsx
 */
function Layout() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Navbar />
      <Suspense
        fallback={
          <PulseLoader
            color="#36d7b7"
            cssOverride={{}}
            loading
            margin={4}
            size={20}
            speedMultiplier={0.5}
          />
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
}

export default Layout;
```

로징을 처리하는 동안 보여줄 로더를 넣어야 합니다. 아래 이부분은 의도적으로 커밋하지 않을 것입니다. 커밋 전에 pull을 한번해야 편하게 진행할 수 있을 것 같습니다.

> `React.lazy`는 현재 `default exports`만 지원합니다. `named exports` "default export", "컨테이너 쿼리", "container query",를 사용하고자 한다면 `default`로 이름을 재정의한 중간 모듈을 생성할 수 있습니다. 이렇게 하면 **tree shaking이 계속 동작하고 사용하지 않는 컴포넌트는 가져오지 않습니다.**

리액트 공식 문서를 읽는 중간에 발견했습니다.[^1]

`tree shaking`을 위해 `default exports`로 변경해야 합니다.

## 로그인 상태관리

[atomWithStorage](https://jotai.org/docs/utilities/storage)

> Warning: Cannot update a component (`RouterProvider`) while rendering a different component (`Landing`). To locate the bad setState() call inside ...

그냥 `useEffect` 사용하라는 에러였습니다.

에러메시지가 달라서 당황했습니다.

[Warning: Cannot update a component (`A`) while rendering a different component (`B`). To locate the bad setState() call inside `B`, follow the stack trace as described in \*\*\* 에러 해결](https://velog.io/@pon06188/Warning-Cannot-update-a-component-A-while-rendering-a-different-component-B.-To-locate-the-bad-setState-call-inside-B-follow-the-stack-trace-as-described-in-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0)

```tsx
// useLogin.tsx
import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const loggedIn = atom(false);
const tokenAtom = atomWithStorage('token', '');

export function useLogin() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(loggedIn);
  const [token, setToken] = useAtom(tokenAtom);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout, token, setToken };
}
```

구현은 상당히 쉽습니다. 로그인 상태도 Storage의 토큰 문자열을 활용하면 됩니다. 비어있는 문자열은 로그아웃 상태 문자열이 있으면 로그인 상태로 보면 구현이 됩니다.

참고로 임시 로그인으로 만들었던 함수들도 이제 제거해야 합니다.

```tsx
import { Link } from 'react-router-dom';
import { Nav, Container, List, ListItem } from './Navbar.style';
import { useLogin } from '../../hooks';

export function Navbar() {
  const { token } = useLogin();
  return <Nav>{token ? <LoggedInNav /> : <LoggedOutNav />}</Nav>;
}
```

새로고침을 해도 깜박임 없이 일단 처리가 됩니다.

```tsx
import { useNavigate } from 'react-router-dom';
import { Button } from '../../Components';
import { useLogin } from '../../hooks';
import { ROUTE_PATHS } from '../../constant/config';
import { useEffect } from 'react';

function Landing() {
  const { login, logout, token } = useLogin();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate(ROUTE_PATHS.CARDS);
    }
  }, [token]);

  return (
    <div>
      <h1>Welcome</h1>
      <Button onClick={login}>login</Button>
      <Button onClick={logout}>logout</Button>
    </div>
  );
}

export { Landing };
```

문제는 메인 페이지입니다. 메인 페이지에 suspense를 걸어야 합니다. 또 로직이 있다는 것도 문제입니다.

Jotai 유틸은 상당히 유용합니다.

## 카드 모델 클래스 구현 a.k.a 도메인 객체

도메인 객체는 비즈니스 로직의 부분을 독립적이게 캡슐화해야 합니다. 도메인에 해당하는 개념을 프로그래밍적으로 잘 표현해야 합니다.

독립적이기 때문에 테스트하기 쉬워야 합니다.

```ts
class CardRecord {
  public question: string;
  public answer: string;
  public stackCount: number;
  public submitDate: Date;
  private _id?: string;
  readonly userId?: string;

  constructor(
    question: string,
    answer: string,
    stackCount = -1,
    submitDate = new Date(),
    id?: string,
    userId?: string
  ) {
    this.question = question;
    this.answer = answer;
    this.stackCount = stackCount;
    this.submitDate = submitDate;
    this._id = id;
    this.userId = userId;
  }

  get count() {
    return this.stackCount;
  }

  get id() {
    return this._id;
  }
}

export class CardCollection {
  private cardArr: CardRecord[];
  constructor(...cards: CardRecord[]) {
    this.cardArr = [...cards];
  }

  addCard(
    question: string,
    answer: string,
    count: number,
    submitDate: Date,
    id?: string
  ) {
    const card = new CardRecord(question, answer, count, submitDate, id);
    this.cardArr.push(card);
  }

  deleteCard(id: string) {
    this.cardArr = this.cardArr.filter((card) => card.id !== id);
  }

  editCard(id: string, question: string, answer: string) {
    this.cardArr.map((card) => {
      if (card.id === id) {
        if (question) card.question = question;
        if (answer) card.answer = answer;
      } else return card;
    });
  }

  checkAnswer(id: string, submit: string) {
    const [card] = this.cardArr.filter((card) => card.id === id);
    const regex = new RegExp(card.answer, 'i');
    regex.test(submit) ? this.#correct(id) : this.#wrong(id);
  }

  #correct(id: string) {
    const [card] = this.cardArr.filter((card) => card.id === id);
    if (card.stackCount === -1) card.stackCount = 1;
    else card.stackCount += 1;
  }

  #wrong(id: string) {
    const [card] = this.cardArr.filter((card) => card.id === id);
    card.stackCount = 0;
  }

  get items() {
    return this.cardArr;
  }
}
```

카드 도메인 객체를 만들었습니다. 어떤 정보의 갱신은 메서드를 통해서만 하도록 의도했습니다.

```ts
import { CardCollection } from './Cards';

describe('CardCollection', () => {
  let cardCollection: CardCollection;

  beforeEach(() => {
    cardCollection = new CardCollection();
  });

  it('should add a card to the collection', () => {
    const question = 'What is the capital of France?';
    const answer = 'Paris';
    const count = 0;
    const submitDate = new Date();

    cardCollection.addCard(question, answer, count, submitDate);

    expect(cardCollection.items.length).toBe(1);
    expect(cardCollection.items[0].question).toBe(question);
    expect(cardCollection.items[0].answer).toBe(answer);
    expect(cardCollection.items[0].stackCount).toBe(count);
    expect(cardCollection.items[0].submitDate).toBe(submitDate);
  });

  it('should delete a card from the collection', () => {
    const question = 'What is the capital of France?';
    const answer = 'Paris';
    const count = 0;
    const submitDate = new Date();
    const cardId = 'card-123';

    cardCollection.addCard(question, answer, count, submitDate, cardId);

    cardCollection.deleteCard(cardId);

    expect(cardCollection.items.length).toBe(0);
  });

  it('should edit a card in the collection', () => {
    const question = 'What is the capital of France?';
    const answer = 'Paris';
    const count = 0;
    const submitDate = new Date();
    const newQuestion = 'What is the capital of Germany?';
    const newAnswer = 'Berlin';
    const cardId = 'card-123';

    cardCollection.addCard(question, answer, count, submitDate, cardId);

    cardCollection.editCard(cardId, newQuestion, newAnswer);

    expect(cardCollection.items[0].question).toBe(newQuestion);
    expect(cardCollection.items[0].answer).toBe(newAnswer);
  });

  it('should update stackCount when checking answer', () => {
    const question = 'What is the capital of France?';
    const answer = 'Paris';
    const count = 0;
    const submitDate = new Date();
    const cardId = 'card-123';

    cardCollection.addCard(question, answer, count, submitDate, cardId);

    // Correct answer
    cardCollection.checkAnswer(cardId, 'paris');
    expect(cardCollection.items[0].stackCount).toBe(1);

    // Incorrect answer
    cardCollection.checkAnswer(cardId, 'berlin');
    expect(cardCollection.items[0].stackCount).toBe(0);
  });
});
```

테스트를 위해 id를 입력할 수 있도록 했습니다.

비즈니스 로직이 아주 단순해서 다행입니다.

개념적으로 머릿속에 확실해서 도메인 객체는 금방만들었습니다.

## 컨테이너 쿼리

[올해부턴 CSS 다르게 짬 ㅅㄱ (2022년 CSS 채신기술)](https://www.youtube.com/watch?v=4Vq8CQf-egI)

컨테이너 쿼리는 새로운 표준이라 예상하고 적용해봅니다.

```css
.class-name {
  color: red;
}

@container (max-width: 360px) {
  .class-name {
    color: green;
  }
}
```

### 컨테이너 쿼리 단위

컨테이너 쿼리만 있는 것이 아닙니다. 이제는 사용할 수 있는 단위도 있습니다. `cq`단위입니다.

- `cqw` : 쿼리 컨테이너 너비의 1%
- `cqh` : 쿼리 컨테이너 높이의 1%
- `cqi` : 쿼리 컨테이너 인라인 크기의 1%
- `cqb` : 쿼리 컨테이너의 블록 크기의 1%
- `cqmin` : `cqi` 또는 `cqb` 중 더 작은 값
- `cqmax` : `cqi` 또는 `cqb` 중 더 큰 값

### 컨테이너 쿼리를 사용할 때는 설정도 있습니다. 무엇을 따르고 안 따를지 지정도 가능합니다.

`container-type` 에는 `size`, `inline-size`, `normal` 속성값이 존재한다.

`inline-size` : 인라인 레벨 기준으로 컨테이너를 적용. 요소의 `width` 값에 따라 반응형이 동작된다.
`size` : 블록 레벨 기준으로 컨테이너를 적용. `width` 뿐만 아니라 `height` 값에 따라 반응형이 동작 된다.
`normal` : 해당 값이 부여된 요소를 `container`에서 제외시킨다. 일종의 `none` 의미라고 보면 되겠다.

```css
div {
  container-name: div-container;
  container-type: inline-size; /* 왠만한 상황에선 inline-size 로 이용한다고 보면 된다 */
}

/* 특정 container-name의 요소에 반응 */
@container div-container (min-width: 700px) {
  div {
    font-size: 2em;
  }
}
```

[🌟 @media는 이제 그만 ! 최신 @container 사용법](https://inpa.tistory.com/entry/%F0%9F%8C%9F-css-container-%EC%82%AC%EC%9A%A9%EB%B2%95#%EC%BB%A8%ED%85%8C%EC%9D%B4%EB%84%88_%EC%BF%BC%EB%A6%AC_%EA%B8%B8%EC%9D%B4_%EB%8B%A8%EC%9C%84)

블로그 설명을 상당히 잘합니다.

이제 styled components에 적용할 수 있으면 됩니다.

문제는 그냥 지원하고 있지는 않습니다.

```sh
yarn add react-container-query
```

위 라이브러리를 설치해야 하는데 매번 새로운 라이브러리를 설치할 때마다 거부감이 있습니다.

그래서 일단 적용 보류를 결정했습니다.

<!-- ## 설정 페이지 로그아웃 기능

로그아웃은 회원가입과 무관하게 독립적으로 적용할 수 있을 것 같아서 하기로 결심했습니다.

로그아웃 기능은 비교적 단순하게 만들어졌습니다. -->

<!-- ## cookie 전송

서버에 cookie를 전송할 수 없습니다.

내일 해결 시도를 시작하겠습니다. 에러 로그 형식으로 오늘 했던 시도를 내일 다시하면서 기록하고 진행해볼 것입니다.

최후의 수단은 cookie를 풀어두고 작업을 진행하는 것입니다. -->

[^1]: [Code-Splitting](https://legacy.reactjs.org/docs/code-splitting.html#named-exports)
