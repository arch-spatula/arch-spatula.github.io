---
description: '문서에 대해서 개괄적으로 설명합니다.'
tags: ['react', 'testing']
sidebar_position: 94
draft: true
---

# React Testing

제일 먼저 TDD랑 테스팅이랑은 다릅니다.

<!-- https://jbee.io/developments/frontend-testing-and-dependency/ -->

# 왜 테스트를 공부하는가?

지루하고 현타가 와서 시작한 것은 맞습니다.

1달 동안 5명이 코드작성량이 많을 코드베이스를 리팩토링하고 코드 퀄리티를 높이는 하나의 좋은 수단이라고 합리화를 하고 수강했습니다.

https://github.com/gopinav/React-Testing-Tutorial

# React Testing Tutorial - 1 - Introduction

https://www.youtube.com/watch?v=T2sv8jXoP4s

리액트 입문자를 위한 테스팅입니다.

Jest와 리액트 테스팅 라이브러리를 활용합니다.

개발자로서는 동작하는 소프트웨어를 만드는 것이 일입니다. 중요하는 것은 소프트웨어가 동작하고 말고 여부입니다.

동작여부를 확인하기 위해서는 테스트를 합니다. 테스트로 의도한 방식으로 동작하는지 확인합니다.

시작할 때는 보통 수동 테스트를 합니다. 문제가 없으면 동일한 테스트를 반복합니다.

하지만 문제는 신기능을 추가하면서 이전에 있던 기능도 같이 테스트합니다.

배포할 때마다 테스트를 계속하면 시간 비용이 많이 듭니다. 또 비슷하게 반복되는 일이 많으면 실수할 가능성이 높습니다.

메뉴얼 테스팅의 한계입니다. 그래서 필요한 것이 자동화 테스팅입니다. 물론 신기능을 추가할 때 조금더 노력을 지불해야 합니다. 하지만 테스트하는 시간을 많이 감축시킬 수 있습니다. 테스트는 컴퓨터가하기 때문에 그렇습니다. 또 인간과 다르게 실수할 가능성도 많이 줄어듭니다. 또 오류를 쉽게 관측할 수 있습니다. 마지막으로 의도한 방식으로 동작할 것이라고 자신감을 줍니다.

1. Jest and React Testing Library
2. 기초 테스트 작성
3. 컴포넌트 인터랙션 테스트
4. Provider로 감싸진 컴포넌트 테스트하기
5. API mocking
6. 정적 분석 테스팅

한국과 다르게 미국에서는 리액트 개발자에게 테스팅 능력은 기초중 하나입니다.

선수요건

- 리액트 기초
- 리액트를 위한 타입스크립트 기본

# React Testing Tutorial - 2 - Jest vs React Testing Library

https://www.youtube.com/watch?v=Budumtq35Ls

라이브러리의 역할을 설명합니다.

Jest는 자바스크립트 테스팅라이브러리입니다. 테스트러너입니다.

RTL은 자바스크립트 테스팅 유틸입니다. VDOM을 테스팅할 수 있습니다. 리액트에 맞는 VDOM에 접근해서 의도한 행동인지 테스트해줍니다. RTL는 리액트를 위한 DOM 테스팅 라이브러링입니다.

서로 상호보완적인 라이브러입니다.

# React Testing Tutorial - 3 - Types of Tests

https://www.youtube.com/watch?v=Z_U6M1hMC6s

자동화된 테스트의 종류입니다. 테스트의 종류에 따라각각 다른 목적이 있습니다.

유닛테스트, 결합테스트, E2E 테스트

유닛테스트는 함수, 클래스, 컴포넌트도 작은 코드의 독립적인 부분을 테스트합니다. 의존성은 모의로 만듭니다. 유닛테스트는 작성하기 간단합니다. 문제를 쉽게 찾습니다.

유닛들이 결합되었을 때 정상작동여부를 파악합니다.

E2E는 앱의 모든 부분을 테스트합니다. 실제 UI, 백엔드, 서비스를 테스트합니다. 제일 오래걸립니다. 또 실제 API를 다루면서 요청당 비용문제로 가장 비용이 큽니다.

테스팅 피라미드에 따라 유닛테스트를 제일 많이하고 결합에서 E2E 테스트를 덜합니다.

RTL의 철학입니다. 더 테스트를 의도한 방식으로 테스트할 수록 소트프웨어를 더욱더 잘 신뢰할 수 있습니다.

컴포넌트단위에서 쉽게 작성하는 것부터 실제 유저가 사용하게 될 것처럼 E2E까지 작성합니다.

컴포넌트는 사용자와 인터랙션하면서 어떻게 결과가 발생하는지를 중심으로 테스트합니다.

함수테스트처럼 결과가 같다면 과정이 바뀌어도 괜찮습니다. 5+ 3이든 4+4이든 8이라는 결과가 같은지 확인합니다.

# React Testing Tutorial - 4 - What is a Test?

https://www.youtube.com/watch?v=kAwvESdz2kQ

자동화된 테스트란?

자동화된 테스트란 코드가 의도랑 다른 결과를 갖을 때 에러를 돌려주는 것입니다.

```js
const getFullName = (firsName, LastName) => {
  return `${firsName} ${LastName}`;
};

const actualFullName = getFullName('Bruce', 'Wayne');
const expectedFullName = 'BruceWayne';
if (actualFullName !== expectedFullName) {
  throw new Error(`${actualFullName} is not equal to ${expectedFullName}`);
}
```

이런 코드가 있습니다.

> throw new Error(`${actualFullName} is not equal to ${expectedFullName}`);

이런 에러를 돌려줍니다. 중간의 공백이 다르다고 피드백들 받았습니다. 예상받은데로 동작하게 만들 수 있게 됩니다.

자동화된 테스트는 예상된 결과와 다를 때 에러를 돌려주는 테스트입니다. 의미있는 피드백을 받을 수 있게 됩니다.

# React Testing Tutorial - 5 - Project Setup

https://www.youtube.com/watch?v=9kPiq8-i-0M

프로젝트를 셋업하는 방법입니다. CRA를 활용합니다.

```sh
yarn create react-app . --template typescript
```

git은 jest를 이해하는데 아주 중요합니다.

이번과정에는 브라우저에서 실행하는 것보다 Node환경에서 성공과 실패를 중심으로 다룹니다.

CRA는 처음부터 Jest, RTL를 제공합니다. React-Script는 Jest를 의존성으로 갖고 있습니다. Jest는 간접의존성으로 존재합니다.

설치와 config하면서 불필요한 시간낭비를 줄일 수 있습니다.

# React Testing Tutorial - 6 - Running Tests

https://www.youtube.com/watch?v=NEEtzkLn2Gc

CRA는 Jest와 RTL을 자동설치한다고 했습니다. 또 스크립트와 샘플코드도 포함하고 있습니다.

App.test.tsx가 테스트가 작성된 파일입니다. 테스트는 컴포넌트에 해당하는 텍스트가 존자하고 안하고 판단합니다.

Jest는 테스트러너로 테스트를 찾고 테스트의 결과를 보고하는 라이브러리입니다.

Jest는 CRA에 포함되어 있습니다. `"test": "react-scripts test",`이렇게 이미 test 설정이 되어있습니다.

```sh
yarn test
```

이 명령으로 테스트를 실행합니다. 와치모드 계속 실행됩니다.

```tsx
// App.test.tsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

```tsx
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

최초 다운로드 했을 때의 코드입니다.

테스트에 `getByText(/learn react/i)`이라는 요건이 있습니다. 지금 코드에 반영이 되어 있는 것을 확인할 수 있습니다.

# React Testing Tutorial - 7 - Anatomy of a Test

https://www.youtube.com/watch?v=2j5jC3IK0So

테스팅 코드의 구조를 이해해봅니다.

test는 3가지 인자를 받습니다. 첫번째는 테스트이름, 두번째는 함수, 셋제는 테스트 대기시간입니다.

```tsx
// App.test.tsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

첫번째 인자는 테스트 이름이 보입니다. App 컴포넌트를 받아 랜더 처리합니다. render함수는 VDOM을 만듭니다.

getByText는 대소문자 구분없이 문구 존재여부를 알아냅니다.

모든 요건을 충적하기 때문에 통과로 처리합니다.

test는 import가 없습니다. 또 expect도 import가 없습니다. React 키워드처럼 import 할 필요가 없습니다.

두번째인자 함수는 테스트에서 예상하는 결과를 작성합니다.

# React Testing Tutorial - 8 - Your First Test

https://www.youtube.com/watch?v=R6Opu2K6xbk

이번에는 리액트에 테스트를 작성해볼 것입니다.

Greet 컴포넌트를 만들어볼 것입니다.

```tsx
// Greet.tsx
export const Greet = () => {
  return <div>Hello</div>;
};
```

이렇게 컴포넌트를 작성합니다.

```tsx
// Greet.test.tsx
import { render, screen } from '@testing-library/react';
import { Greet } from './Greet';

test('Greet 랜더링해서 보입니다.', () => {
  render(<Greet />);
  const textElement = screen.getByText('Hello');
  expect(textElement).toBeInTheDocument();
});
```

```txt
PASS  src/App.test.tsx
 PASS  src/Component/Greet.test.tsx

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.298 s
Ran all test suites related to changed files.
```

이렇게 피드백을 받을 수 있습니다. 테스트에서 중요한 부분 중 하나는 테스트가 실패하해서 문제를 확인하는 것입니다.

의도적으로 테스트를 실패시켜서 테스트에 대한 신뢰를 확인해보겠습니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Greet } from './Greet';

test('Greet 랜더링해서 보입니다.', () => {
  render(<Greet />);
  const textElement = screen.getByText('hello');
  expect(textElement).toBeInTheDocument();
});
```

테스트가 실패한 피드백을 확인했습니다. 이번에는 정규표현식으로 대소문자 구분을 없애달라고 하겠습니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Greet } from './Greet';

test('Greet 랜더링해서 보입니다.', () => {
  render(<Greet />);
  const textElement = screen.getByText(/hello/i);
  expect(textElement).toBeInTheDocument();
});
```

테스트가 통과되는 것을 확인하는 것을 봤습니다.

# React Testing Tutorial - 9 - Test Driven Development

https://www.youtube.com/watch?v=foiMMI-pEes

이번에는 TDD 접근법을 활용해보겠습니다. TDD는 소프트웨어 개발방법론으로 테스트를 먼저 작성하고 테스트를 통과하는 코드를 작성합니다.

테스트를 먼저 작성합니다. 실패하는 테스트를 확인합니다. 테스트를 통과하는 코드를 작성합니다. 테스트를 통과하는 코드를 작성하고나서 리팩토링합니다. 레드-그린-리팩터라는 명칭도 갖고 있습니다.

```tsx
// Greet.test.tsx
import { render } from '@testing-library/react';

/**
 * Greet는 hello 텍스트를 랜더해서 보여줘야 합니다.
 */

test('Greet는 hello를 test로 랜더해서 보여줍니다.', () => {});
```

이상태로 요구사항을 정의하고 시작합니다. 그리고 테스트를 다음에 작성합니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Greet } from './Greet';

/**
 * Greet는 hello 텍스트를 랜더해서 보여줘야 합니다.
 */

test('Greet는 hello를 test로 랜더해서 보여줍니다.', () => {
  render(<Greet />);
  const textElement = screen.getByText('Hello');
  expect(textElement).toBeInTheDocument();
});

test('Greet는 이름을 인자로 받으면 이름을 랜더해서 화면에 보여줍니다.', () => {
  render(<Greet name="Jake" />);
  const textElement = screen.getByText('Hello Jake');
  expect(textElement).toBeInTheDocument();
});
```

```tsx
export const Greet = () => {
  return <></>;
};
```

테스트를 코드의 요구사항으로 명시하고 작성합니다. 여기까지가 1단계 레드입니다. 이제 통과시키는 코드를 작성하겠습니다.

여기서부터는 Greet의 컴포넌트를 작성하면 됩니다.

```tsx
export const Greet = () => {
  return <div>Hello</div>;
};
```

이렇게 작성하면 2개 중 1개는 통과했다는 것을 확인했습니다.

```tsx
type GreetProps = {
  name: string;
};
export const Greet = ({ name }: GreetProps) => {
  return <div>Hello {name}</div>;
};
```

이렇게 작성하니 2개의 테스트를 모두 통과합니다. 하지만 테스트 파일에서는 에러를 돌려줍니다. 이것은 타입스크립트 에러입니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Greet } from './Greet';

/**
 * Greet는 hello 텍스트를 랜더해서 보여줘야 합니다.
 */

test('Greet는 hello를 test로 랜더해서 보여줍니다.', () => {
  render(<Greet />); // 타입을 강제해서 타입스크립트 오류를 돌려준 부분입니다.
  const textElement = screen.getByText('Hello');
  expect(textElement).toBeInTheDocument();
});

test('Greet는 이름을 인자로 받으면 이름을 랜더해서 화면에 보여줍니다.', () => {
  render(<Greet name="Jake" />);
  const textElement = screen.getByText('Hello Jake');
  expect(textElement).toBeInTheDocument();
});
```

물론 타입스크립트 에러는 타입체크는 컴파일타임 테스팅에 해당합니다. 유닛테스팅에는 없습니다.

실패하는 테스트에서 통과하는 코드를 작성하고 그리고 리팩토링하는 단계가 있습니다. 리팩토링은 선택적입니다. 현재의 경우 코드가 너무 단순해서 리팩토링할 부분이 없습니다.

여기까지는 소프트웨어 테스트에 대한 개괄적인 부분입니다.

# React Testing Tutorial - 10 - Jest Watch Mode

https://www.youtube.com/watch?v=KSvHNSLf-6c

Jest 도구를 이해합니다. 미리 알아야 할 것은 처음부터 리액트는 Jest를 Watch Mode로 실행됩니다. 테스트를 더빠르게 실행할 수 있도록 만든 최적화입니다.

yarn test를 하면 git에서 변형을 가한 것만 테스팅을 합니다. 코드베이스가 거대해지면 이런 설정이 더 좋을 것입니다.

Watch Mode를 끄고 커밋을 하고 다시 Watch Mode를 동작시키면 아무 테스트도 돌아가지 않습니다. 즉 변형이 가해질 때를 기준으로 테스트로 정상동작여부를 판단합니다.

CRA의 Jest를 기본으로 설정한 방법입니다.

# React Testing Tutorial - 11 - Filtering Tests

https://www.youtube.com/watch?v=2TkpBziqkRA

```txt
yarn test
No tests found related to files changed since last commit.
Press `a` to run all tests, or run Jest with `--watchAll`.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
```

이런 피드백을 확인합니다.

a는 모든 테스트를 실행합니다. o는 변형을 가한 파일만 테스트합니다. 정규표현식으로 파일을 필터하는 패턴입니다. p를 누르면 입력을 요청받습니다. 정규표현식은 검색해서 알아보도록 합니다. w c를 누르면 필터를 해제합니다. w를 누르고 t는 테스트명 기준으로 필터합니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Greet } from './Greet';

/**
 * Greet는 hello 텍스트를 랜더해서 보여줘야 합니다.
 */

// 테스트를 건너뜁니다.
test.skip('Greet는 hello를 test로 랜더해서 보여줍니다.', () => {
  render(<Greet />);
  const textElement = screen.getByText('Hello');
  expect(textElement).toBeInTheDocument();
});

// 여기 테스트만 실행됩니다.

test.only('Greet는 이름을 인자로 받으면 이름을 랜더해서 화면에 보여줍니다.', () => {
  render(<Greet name="Jake" />);
  const textElement = screen.getByText('Hello Jake');
  expect(textElement).toBeInTheDocument();
});
```

test의 메서드인 only와 skip으로 실행할 테스트를 검토할 수 있습니다.

# React Testing Tutorial - 12 - Grouping Tests

https://www.youtube.com/watch?v=5Zw6P_2fad0

여러개의 테스트를 묶어내는 방법이 있습니다. test랑 똑같이 describe는 import문이 없습니다. 2가지 인자를 받습니다. 하나는 그룹명이고 둘째는 실행할 테스트함수들입니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Greet } from './Greet';

/**
 * Greet는 hello 텍스트를 랜더해서 보여줘야 합니다.
 */

describe('Greet', () => {
  test('hello를 test로 랜더해서 보여줍니다.', () => {
    render(<Greet />);
    const textElement = screen.getByText('Hello');
    expect(textElement).toBeInTheDocument();
  });

  test('이름을 인자로 받으면 이름을 랜더해서 화면에 보여줍니다.', () => {
    render(<Greet name="Jake" />);
    const textElement = screen.getByText('Hello Jake');
    expect(textElement).toBeInTheDocument();
  });
});
```

이렇게 해서 테스트 리포트의 가독성을 높일 수 있습니다. 개발자의 관심사 및 맥락에 맞게 묶어두면 편할 것입니다.

skip, only 메서드는 동일하게 적용가능합니다. 또 describe 블록을 네스팅하는 것도 가능합니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Greet } from './Greet';

/**
 * Greet는 hello 텍스트를 랜더해서 보여줘야 합니다.
 */

describe('Greet', () => {
  test('hello를 test로 랜더해서 보여줍니다.', () => {
    render(<Greet />);
    const textElement = screen.getByText('Hello');
    expect(textElement).toBeInTheDocument();
  });
  describe('내부 테스팅', () => {
    test('이름을 인자로 받으면 이름을 랜더해서 화면에 보여줍니다.', () => {
      render(<Greet name="Jake" />);
      const textElement = screen.getByText('Hello Jake');
      expect(textElement).toBeInTheDocument();
    });
  });
});
```

이렇게 터미널에 위계관계를 보이도록 할 수 있습니다.

네팅도 테스트 규모가 거대하면 이런것도 전략입니다.

describe도 test처럼 여러번 작성할 수 있습니다.

Test Suites는 테스트의 파일 단위라고 합니다. 개별 describe 블록 단위라고 보고있지 않습니다. 즉 도구와 TDD 개념이 서로 다른 의미를 갖고 있습니다.

# React Testing Tutorial - 13 - Filename Conventions

https://www.youtube.com/watch?v=YZtNLuwGCMA

CRA의 파일네이밍 컨벤션입니다. CRA는 다음 네이밍 컨벤션을 갖고 있으면 모두 테스트를 실행합니다.

- 파일이름.test.js, 파일이름.test.tsx 등 접미사
- 파일이름.spec.js, 파일이름.spec.tsx 등
- js, tsx 확장자를 갖은 모든 `__tests__` 폴더속 모두

권장사항은 테스트 코드는 해당하는 코드 옆에 두도록 합니다. 상대경로 import를 짧게 할 수 있도록 하기 위해서 중요합니다.

3가지 이런 방법을 활용할 수 있습니다. 하지만 더 좋은 대안이 있습니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Greet } from './Greet';

/**
 * Greet는 hello 텍스트를 랜더해서 보여줘야 합니다.
 */

describe('Greet', () => {
  fit('hello를 test로 랜더해서 보여줍니다.', () => {
    render(<Greet />);
    const textElement = screen.getByText('Hello');
    expect(textElement).toBeInTheDocument();
  });
  describe('내부 테스팅', () => {
    xit('이름을 인자로 받으면 이름을 랜더해서 화면에 보여줍니다.', () => {
      render(<Greet name="Jake" />);
      const textElement = screen.getByText('Hello Jake');
      expect(textElement).toBeInTheDocument();
    });
  });
});
```

it을 test대신에 용어를 사용할 수 있습니다. it을 사용하면 접두어로 f로 only, x로 skip을 구현할 수 있습니다.

각각의 팀의 취향것 결정할 사항입니다.

# React Testing Tutorial - 14 - Code Coverage

https://www.youtube.com/watch?v=W-dc5fpxUVs

코드 커버리지리포팅입니다. 코드커버리지는 소프트웨어의 테스트가 된 비율을 측정합니다.

Statement 커버리지
Branches 커버리지
Function 커버리지
Line 커버리지

CRA의 장점은 테스트커버리지 리포팅이 기본적으로 설정되어 있습니다.

```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "coverage": "yarn test --coverage"
  },
```

이렇게 커버리지를 추가로 설정하면 됩니다.

커버리지는 일반적으로 오래걸리는 명령입니다. 그래서 자주 실행하고 싶지 않은 명령입니다.

```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "coverage": "yarn test --coverage --watchAll"
  },
```

모든 테스트를 커버하도록 설정하는 것입니다.

모든 테스트를 통과시키는 것이 무조건 의미가 있는 것은 아닙니다. 일부파일은 리포팅 안해도 되는 것들이 있습니다.

```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "coverage": "yarn test --coverage --watchAll --collectCoverageFrom='src/components/**/*.{ts,tsx}' --collectCoverageFrom='!src/components/**/*.{types, stories, constants, test, spec}.{ts,tsx}'",
  },
```

이렇게 볼파일과 무시할 파일을 설정할 수 있습니다.

type, stores, constants, test, spec을 무시하도록 설정합니다.

이 파일들 자체는 테스트가 필요없기 때문에 이렇게 설정합니다.

커버리지비율을 강제하게 만들 수 있습니다. 이것은 `coverageThreshold`입니다.

```json
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": -10
      }
    }
  },
```

`package.json`에서 설정합니다.

Jest는 html파일로 시각적으로 리포트를 받을 수 있습니다.

`coverage/Icov-report/src/index.html`에서 커버리지 리포트를 볼 수 있습니다.

커버리지 100%에 강박을 갖지 말도록 합니다. 일반적으로 성숙한 소프트웨어에게는 80%정도를 권장합니다.

커버리지는 CI/CD를 위해 중요한 부분 중 하나입니다.

# React Testing Tutorial - 15 - Assertions

https://www.youtube.com/watch?v=GiPXVB-lL7w

Assertions입니다. 가끔은 값이 어떤 조건을 충족하는지 확인해야 할 때가 많습니다.

표명은 테스트가 성공하는지 실패하는지 판단합니다. 테스트 작성에 아주 중요한 부분입니다.

`expect(value)`의 인자는 value를 갖습니다. matcher는 예상하는 값을 지정하는 함수입니다.

이전 예시에서 본 `toBeTheDocument()`가 해당합니다.

https://jestjs.io/docs/using-matchers

여기서 matcher를 확인할 수 있습니다. 하지만 여기서 생각해볼 것은 DOM과 관련된 Matchers가 없습니다.

Jest는 자바스크립트와 관련된 것만 테스팅합니다. Jest-DOM으로 DOM에 반영된 것을 테스팅합니다.

https://github.com/testing-library/jest-dom

여기서 jest-dom을 접근할 수 있습니다. 문서화가 상당히 잘 되어 있습니다. 미리 알아둘 것은 CRA를 세팅할 때 이미 세팅이 되어있습니다.

테스트 표명과 matcher를 배웠습니다.

# React Testing Tutorial - 16 - What to test?

https://www.youtube.com/watch?v=rPTj1fX_inE

무엇을 테스트할 것인가? 테스트를 작성하면서 늘 고민하게 되는 것입니다. 이번에는 이부분을 다룹니다.

규칙은 없습니다. 하지만 유용한 기준들은 있습니다.

- 랜더링되는 컴포넌트를 테스트합니다. 존재하는지 안 하는지 여부를 판별합니다. 이것으로 시작하는 것이 방법입니다.
- props에 따라 랜더링되는지 확인합니다.
- state에 따라 랜더링상태를 테스트합니다. 예를 들어, 로그인의 상태에 따라 nav가 다르게 보이면 이부분을 테스트합니다.
- 이벤트에 반응하는지 테스트합니다. 검색에 달아둘 수 있습니다.

테스트하지 말 것들입니다.

- 구현테스트입니다. 어떻게 구현되었는지는 테스트하지 않습니다.
- 제3자 코드는 테스트하지 않습니다. 외부 라이브러리와 프레임워크는 테스트하지 않습니다. 이미 제작자가 이미다 테스트합니다.
- 사용자 입장에서 중요하지 코드는 테스트하지 않습니다. 클라이언트가 호출하지 않게 될 함수는 특별히 테스트하지 않습니다.

# React Testing Tutorial - 17 - RTL Queries

https://www.youtube.com/watch?v=GWRIv6kHZqk

RTL에 중요한 시작점입니다.

1. 컴포넌트를 랜더합니다.
2. 랜더링 된 컴포넌트를 찾습니다.
3. 2단계로 통과 혹은 실패하는지 표명합니다.

랜더링은 RTL으로 처리합니다. 표명은 Jest, Jest-DOM으로 처리합니다. 하지만 컴포넌트를 찾는 것은 아직 안 다루었습니다. RTL에서 컴포넌트를 쉽게 찾을 수 있도록 해줍니다.

여기서 Queries를 활용합니다. 페이지에 해당하는 엘리먼트가 존재하는지 찾을 수 있습니다.

getBy, queryBy, findBy로 개별 엘리먼트를 찾을 수 있습니다. 접두어(get, query, find)와 By 사이에 All을 넣으면 복수의 엘리먼트를 찾을 수 있습니다.

접미어에 따라 쿼리가 결정됩니다. Role, PlaceHolderText, DisplayValue, AltText ...

이번에는 getBy 쿼리입니다. 는 해당하는 클래스가 하나도 없으면 에러를 돌려줍니다.

# React Testing Tutorial - 18 - getByRole

https://www.youtube.com/watch?v=Veaql3noyyo

getByRole입니다. HTML의 시멘틱에는 Role이 있습니다. 기본적으로 Role이 없으면 Role속성값을 추가하도록 합니다. a태그에 role을 추가하는 것처럼 사용할 수 있습니다.

```tsx
import './App.css';
import { Application } from './Component/application/application';

function App() {
  return (
    // <AppProviders>
    <div className="App">
      <Application />
    </div>
  );
}

export default App;
```

```tsx
export const Application = () => {
  return (
    <>
      <form>
        <div>
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" />
        </div>
        <div>
          <label htmlFor="job-location">Job location</label>
          <select id="job-location">
            <option value="">Select a country</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="IN">India</option>
            <option value="AU">Australia</option>
          </select>
        </div>
        <div>
          <label>
            <input type="checkbox" id="terms" /> I agree to the terms and
            conditions
          </label>
        </div>
        <button disabled>Submit</button>
      </form>
    </>
  );
};
```

이렇게 시작합니다.

이제는 getByRole을 적용해봅니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Application } from './Application';

describe('Application', () => {
  test('렌더링이 됩니다.', () => {
    render(<Application />);
    const nameElement = screen.getByRole('textbox');
    expect(nameElement).toBeInTheDocument();
  });
});
```

이제는 다른 엘리먼트도 존재하는지 확인합니다.

https://testing-library.com/docs/queries/byrole 여기서 제공하는

https://www.w3.org/TR/html-aria/#docconformance에서 html 역할을 모두 확인하고 검색하면 됩니다.

getByRole은 1개의 엘리먼트만 찾아내기 때문에 복수로 존재하면 에러를 돌려줍니다.

# React Testing Tutorial - 19 - getByRole Options

https://www.youtube.com/watch?v=jq7Q_MwotDA

쿼리를 위한 로직을 추가할 수 있습니다.

```tsx
export const Application = () => {
  return (
    <>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Fullname"
            value="Vishwas"
            onChange={() => {}}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" />
        </div>
        <div>
          <label htmlFor="job-location">Job location</label>
          <select id="job-location">
            <option value="">Select a country</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="IN">India</option>
            <option value="AU">Australia</option>
          </select>
        </div>
        <div>
          <label>
            <input type="checkbox" id="terms" /> I agree to the terms and
            conditions
          </label>
        </div>
        <button disabled>Submit</button>
      </form>
    </>
  );
};
```

이렇게 되면 테스트가 실패합니다. 1개의 input만 기대했지만 2개가 존재했습니다.

이럴 때 사용하는 것이 option입니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Application } from './Application';

describe('Application', () => {
  test('렌더링이 됩니다.', () => {
    render(<Application />);

    const nameElement = screen.getByRole('textbox', {
      name: 'Name',
    });
    expect(nameElement).toBeInTheDocument();

    const bioElement = screen.getByRole('textbox', {
      name: 'Bio',
    });
    expect(bioElement).toBeInTheDocument();

    const jobLocationElement = screen.getByRole('combobox');
    expect(jobLocationElement).toBeInTheDocument();

    const termsElement = screen.getByRole('checkbox');
    expect(termsElement).toBeInTheDocument();

    const submitButtonElement = screen.getByRole('button');
    expect(submitButtonElement).toBeInTheDocument();
  });
});
```

이렇게 `name`을 설정하면 테스트가 통과됩니다.

각각 갖고 있는 name 속성에 접근하고 존재하고 안하고를 판단합니다.

name 속성은 다음과 같은 것들을 접근할 수 있습니다.

1. label
2. button의 text content
3. aria-label attribute의 value

대소문자 구분하기 때문에 주의하도록 합니다.

level option입니다.

```tsx
export const Application = () => {
  return (
    <>
      <h1>Job application form</h1>
      <h2>Section 1</h2>
      <p>All fields are mandatory</p>
      <span title="close">X</span>
      <img src="https://via.placeholder.com/150" alt="a person with a laptop" />
      <div data-testid="custom-element">Custom HTML element</div>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Fullname"
            value="Vishwas"
            onChange={() => {}}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" />
        </div>
        <div>
          <label htmlFor="job-location">Job location</label>
          <select id="job-location">
            <option value="">Select a country</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="IN">India</option>
            <option value="AU">Australia</option>
          </select>
        </div>
        <div>
          <label>
            <input type="checkbox" id="terms" /> I agree to the terms and
            conditions
          </label>
        </div>
        <button disabled>Submit</button>
      </form>
    </>
  );
};
```

예를 들어 이렇게 컴포넌트가 작성되어 있습니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Application } from './Application';

describe('Application', () => {
  test('렌더링이 됩니다.', () => {
    render(<Application />);

    const pageHeading = screen.getByRole('heading');
    expect(pageHeading).toBeInTheDocument();
  });
});
```

이렇게 작성하면 테스트가 실패합니다. 해딩역할 하는 것이 2개이기 때문입니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Application } from './Application';

describe('Application', () => {
  test('렌더링이 됩니다.', () => {
    render(<Application />);

    const pageHeading = screen.getByRole('heading', {
      name: 'Job application form',
    });
    expect(pageHeading).toBeInTheDocument();

    const sectionHeading = screen.getByRole('heading', {
      name: 'Section 1',
    });
    expect(sectionHeading).toBeInTheDocument();
  });
});
```

이렇게 작성하고 문제를 해결할 수 있습니다.

```tsx
describe('Application', () => {
  test('렌더링이 됩니다.', () => {
    render(<Application />);

    const pageHeading = screen.getByRole('heading', {
      level: 1,
    });
    expect(pageHeading).toBeInTheDocument();

    const sectionHeading = screen.getByRole('heading', {
      level: 2,
    });
    expect(sectionHeading).toBeInTheDocument();
  });
});
```

RTL에서 제공하는 level로 이렇게 해결할 수 있습니다. 레벨별로 보이는 UI를 이렇게 해딩을 제어할 수 있습니다.

hidden, selected, checked, pressed 처럼 다양한 option을 제어할 수 있습니다.

getByRole부터 가장 먼저 활용하는 것이 좋습니다. 하지만 부족하면 다른 쿼리가 있습니다.

# React Testing Tutorial - 20 - getByLabelText

https://www.youtube.com/watch?v=lxxeuWSd4v4

getByLabelText입니다. 해당하는 텍스트를 찾게 만드는 쿼리입니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Application } from './Application';

describe('Application', () => {
  test('렌더링이 됩니다.', () => {
    render(<Application />);

    const nameElement = screen.getByRole('textbox', {
      name: 'Name',
    });
    expect(nameElement).toBeInTheDocument();

    const nameElement2 = screen.getByLabelText('Name');
    expect(nameElement2).toBeInTheDocument();
  });
});
```

```tsx
export const Application = () => {
  return (
    <>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Fullname"
          value="Vishwas"
          onChange={() => {}}
        />
      </div>
    </>
  );
};
```

이렇게 작성되어 있으면 테스트를 통과합니다. Name에 해당하는 label의 텍스트로 쿼리를 하게 되는 것입니다.

테스트를 할 때 동일하게 검증하는 것을 중복해서 테스트를 추가했습니다. 이렇게 테스트를 진행하지는 않습니다.

```tsx
export const Application = () => {
  return (
    <>
      <div>
        <label>
          <input type="checkbox" id="terms" /> I agree to the terms and
          conditions
        </label>
      </div>
      <button disabled>Submit</button>
    </>
  );
};
```

```tsx
import { render, screen } from '@testing-library/react';
import { Application } from './Application';

describe('Application', () => {
  test('렌더링이 됩니다.', () => {
    render(<Application />);

    const termsElement2 = screen.getByLabelText(
      'I agree to the terms and conditions'
    );
    expect(termsElement2).toBeInTheDocument();
  });
});
```

htmlFor없이 동작하게도 만들 수 있습니다. 이렇게 작성할 수 있습니다.

지금까지는 해피페스만 다루었습니다. 엣지케이스같은 경우도 있습니다. 테스트에서 1종오류는 흔하게 발생합니다.

만약 레이블이 같은 것이 2개가 있는 경우도 존재합니다.

이럴 때는 selector 옵션으로 해결합니다.

```tsx
export const Application = () => {
  return (
    <>
      <h1>Job application form</h1>
      <h2>Section 1</h2>
      <p>All fields are mandatory</p>
      <span title="close">X</span>
      <img src="https://via.placeholder.com/150" alt="a person with a laptop" />
      <div data-testid="custom-element">Custom HTML element</div>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Fullname"
            value="Vishwas"
            onChange={() => {}}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" />
        </div>
        <div>
          <label htmlFor="job-location">Name</label>
          <select id="job-location">
            <option value="">Select a country</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="IN">India</option>
            <option value="AU">Australia</option>
          </select>
        </div>
        <div>
          <label>
            <input type="checkbox" id="terms" /> I agree to the terms and
            conditions
          </label>
        </div>
        <button disabled>Submit</button>
      </form>
    </>
  );
};
```

Name이 2개라서 테스트는 실패합니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Application } from './Application';

describe('Application', () => {
  test('렌더링이 됩니다.', () => {
    render(<Application />);

    const nameElement = screen.getByRole('textbox', {
      name: 'Name',
    });
    expect(nameElement).toBeInTheDocument();

    const nameElement2 = screen.getByLabelText('Name', { selector: 'input' });
    expect(nameElement2).toBeInTheDocument();
  });
});
```

이렇게 작성하면 테스트를 통과할 수 있습니다.

복수의 엘리먼트 중에 input을 선택하는 것입니다. 자주 발생하는 케이스는 아닙니다.

# React Testing Tutorial - 21 - getByPlaceholderText

https://www.youtube.com/watch?v=Iz4Uf4oqKCk

placeholderText 속성값을 갖은 모든 엘리먼트를 찾고 해당하는 텍스트를 반환하는지 확인합니다.

```tsx
export const Application = () => {
  return (
    <div>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        placeholder="Fullname"
        value="Vishwas"
        onChange={() => {}}
      />
    </div>
  );
};
```

이렇게 작성되어 있습니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Application } from './Application';

describe('Application', () => {
  test('렌더링이 됩니다.', () => {
    render(<Application />);
    const nameElement3 = screen.getByPlaceholderText('Fullname');
    expect(nameElement3).toBeInTheDocument();
  });
});
```

이렇게 테스트 케이스를 추가하면 됩니다. 해당하는 텍스트가 존재하는지 알아냅니다.

# React Testing Tutorial - 22 - getByText

https://www.youtube.com/watch?v=JXStr4MDrAQ

텍스트노드에 해당하는 텍스트가 일치하는지 알아냅니다.

보통 p, span, div엘리먼트에 많이 사용합니다.

```tsx
export const Application = () => {
  return (
    <div>
      <p>All fields are mandatory</p>
    </div>
  );
};
```

이런 컴포넌트가 있습니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Application } from './Application';

describe('Application', () => {
  test('렌더링이 됩니다.', () => {
    render(<Application />);

    const paragraphElement = screen.getByText('All fields are mandatory');
    expect(paragraphElement).toBeInTheDocument();
  });
});
```

동일하게 selector option도 추가하는 것이 가능합니다.

# React Testing Tutorial - 23 - getByDisplayValue

https://www.youtube.com/watch?v=Rq6rv7o1WyI

input, textarea, select가 일치하는 값을 갖는지 판별합니다.

```tsx
export const Application = () => {
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        placeholder="Fullname"
        value="Jake The Dog"
        onChange={() => {}}
      />
    </form>
  );
};
```

이런 컴포넌트가 있습니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Application } from './Application';

describe('Application', () => {
  test('렌더링이 됩니다.', () => {
    render(<Application />);

    const nameElement4 = screen.getByDisplayValue('Jake The Dog');
    expect(nameElement4).toBeInTheDocument();
  });
});
```

이렇게 값에 따라 화면에 보이는 값이 일치하는지 판별합니다.

# React Testing Tutorial - 24 - getByAltText

https://www.youtube.com/watch?v=3ETiMUMnPAY

해당하는 altText가 존재하는지 판별합니다. input, area, 커스텀 태그를 쿼리합니다.

```tsx
export const Application = () => {
  return (
    <div>
      <img src="https://via.placeholder.com/150" alt="a person with a laptop" />
    </div>
  );
};
```

이런 컴포넌트가 있습니다. 이미지에 alt 속성이 있습니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Application } from './Application';

describe('Application', () => {
  test('렌더링이 됩니다.', () => {
    render(<Application />);
    const imageElement = screen.getByAltText('a person with a laptop');
    expect(imageElement).toBeInTheDocument();
  });
});
```

해당하는 alt 텍스트가 일치하는 테스트를 판별할 수 있습니다.

# React Testing Tutorial - 25 - getByTitle

https://www.youtube.com/watch?v=9OP3irZ6t98

title 속성을 갖고 있는 태그를 찾습니다.

```tsx
export const Application = () => {
  return (
    <div>
      <span title="close">X</span>
    </div>
  );
};
```

```tsx
import { render, screen } from '@testing-library/react';
import { Application } from './Application';

describe('Application', () => {
  test('렌더링이 됩니다.', () => {
    render(<Application />);
    const closeElement = screen.getByTitle('close');
    expect(closeElement).toBeInTheDocument();
  });
});
```

# React Testing Tutorial - 26 - getByTestId

https://www.youtube.com/watch?v=pJCEM6CQCec

마지막 쿼리메서드입니다. data-testid 속성값을 쿼리하는 메서드입니다.

```tsx
export const Application = () => {
  return (
    <div>
      <div data-testid="custom-element">Custom HTML element</div>
    </div>
  );
};
```

커스텀 태그를 만든 것이라고 가정하겠습니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Application } from './Application';

describe('Application', () => {
  test('렌더링이 됩니다.', () => {
    render(<Application />);

    const customElement = screen.getByTestId('custom-element');
    expect(customElement).toBeInTheDocument();
  });
});
```

커스텀 태그에 대해 커스텀 속성값이 존재하는지 확인할 수 있습니다.

# React Testing Tutorial - 27 - Priority Order for Queries

https://www.youtube.com/watch?v=_e0Jhf0lR2w

동일한 결과를 얻을 수 있어도 우선순위가 있습니다.

쿼리를 적용하는 우선순위는 공식 문서를 기준으로 합니다.

테스트는 사용자의 상호작용할지를 나타낼 수 있어야 합니다.

1. getByRole

- 접근성트리의 최상위입니다. 가장 선호해야할 쿼리입니다.

2. getByLabelText

- form을 위해 많이 사용합니다. 사용자 행동을 나타내기 때문에 유용합니다.

3. getByPlaceholderText

- 레이블을 대체할 수 없지만 없으면 대안입니다.

4. getByText

- div, p, span처럼 상호작용하지 않을 때 많이 사용합니다.

5. getByDisplayValue

- 결과적으로 화면에 보이는 값을 쿼리하게 되는 것입니다.
- 여기까지 일반적으로 사용하게 될 것입니다. 하지만 부족한 경우는 아주 가끔 발생합니다.
- 다음은 브라우저마다 다릅니다.

6. getByAltText

- 1개의 엘리먼트 일때 많이 사용합니다

7. getByTitle
8. getByTestId

- 시각장애인을 위한 지원이 전혀 없습니다. 텍스트가 동적일 때 활용합니다.

이 우선순위로 VDOM에서 쿼리하는 순서입니다. 이 개념은 상당히 중요하기 때문에 암기하도록 합니다.

# React Testing Tutorial - 28 - Query Multiple Elements

https://www.youtube.com/watch?v=YgYx8Y6Vbck

RTL의 쿼리를 이어서 다룹니다.

DOM에서 복수의 엘리먼트를 찾을 때가 있습니다. getAllBy 쿼리예시입니다.

모든 기본쿼리는 All을 지원합니다.

```tsx
// skills.types.tsx
export type SkillsProps = {
  skills: string[];
};
```

```tsx
import { SkillsProps } from './skills.types';

export const Skills = (props: SkillsProps) => {
  const { skills } = props;
  return (
    <>
      <ul>
        {skills.map((skill) => {
          return <li key={skill}>{skill}</li>;
        })}
      </ul>
    </>
  );
};
```

이런 코드가 있습니다. 리액트가 순회하는 컴포넌트입니다.

컴포넌트자체는 아주 간단합니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Skills } from './skills';

describe('Skills', () => {
  const skills = ['HTML', 'CSS', 'JavaScript'];

  test('ul태그에 해당하는 컴포넌트가 랜더링이 됩니다', () => {
    render(<Skills skills={skills} />);
    const listElement = screen.getByRole('list');
    expect(listElement).toBeInTheDocument();
  });

  test('li태그에 해당하는 개별 skills를 목록이 랜더링합니다.', () => {
    render(<Skills skills={skills} />);
    const listItemElement = screen.getAllByRole('listitem');
    expect(listItemElement).toHaveLength(3);
  });
});
```

이렇게 하면 테스트를 통해서 코드를 설명하고 문서화할 수 있습니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Skills } from './skills';

describe('Skills', () => {
  const skills = ['HTML', 'CSS', 'JavaScript'];

  test('ul태그에 해당하는 컴포넌트가 랜더링이 됩니다', () => {
    render(<Skills skills={skills} />);
    const listElement = screen.getByRole('list');
    expect(listElement).toBeInTheDocument();
  });

  test('li태그에 해당하는 개별 skills를 목록이 랜더링합니다.', () => {
    render(<Skills skills={skills} />);
    const listItemElement = screen.getAllByRole('listitem');
    expect(listItemElement).toHaveLength(skills.length);
  });
});
```

이렇게 매직넘버도 제거하도록 합니다.

이렇게하면 복수의 컴포넌트를 쿼리하는 법도 배웠습니다.

# React Testing Tutorial - 29 - TextMatch

https://www.youtube.com/watch?v=BD1r5ADfe28

지금까지 쿼리한 방식입니다.

```tsx
const pageHeading = screen.getByRole('heading');

const nameElement2 = screen.getByLabelText('Name', { selector: 'input' });

const nameElement3 = screen.getByPlaceholderText('Fullname');

const nameElement4 = screen.getByDisplayValue('Jake The Dog');

const paragraphElement = screen.getByText('All fields are mandatory');
expect(paragraphElement).toBeInTheDocument();

const closeElement = screen.getByTitle('close');

const imageElement = screen.getByAltText('a person with a laptop');

const customElement = screen.getByTestId('custom-element');

const listItemElement = screen.getAllByRole('listitem');
```

이렇게 많은 쿼리를 텍스트로 보냈습니다. 첫번째인자는 무조건 문자열처럼 보일 것입니다. 하지만 TextMatch라는 자료형입니다. string, regex, function 중 하나입니다.

문자열입니다. 해당하는 문자열을 찾는 방법입니다.

```tsx
<div>Hello World</div>
```

이 엘리먼트가 존재하고 안하고를 쿼리하고 싶습니다.

```tsx
screen.getByText('Hello World');
```

이렇게 해결하는 것은 이미 배웠습니다. 하지만 해당하는 문자열을 포함하고 안하고로 쿼리를 보내게 만드는 것도 가능합니다.

```tsx
screen.getByText('Hello World'); // full string match
screen.getByText('llo Worl', { exact: false }); // substring match
screen.getByText('hello world', { exact: false }); // 대소문자 구분 해제
```

이렇게로 문자열 일치를 판별할 수 있습니다. 하지만 개인적으로 더 우아하게 정규표현식을 사용할 것을 권장합니다.

```tsx
screen.getByText(/World/); // substring match
screen.getByText(/world/i); // substring match, 대소문자 구분 없음
screen.getByText(/^hello world$/i); // full string match, 대소문자 구분 없음
```

이렇게 작성하면 더 자유도 높게 작성할 수 있습니다.

커스텀 함수로 처리하는 방법이 있습니다.

```tsx
screen.getByText((content) => content.startsWith('Hello'));
```

이렇게 커스텀 함수로 처리할 수 있습니다.

쿼리는 모든 유형의 쿼리에서 가능합니다. 하지만 주로 getByText에서 주로 사용하게 될 가능성이 많습니다.

# React Testing Tutorial - 30 - queryBy

https://www.youtube.com/watch?v=AabRgJD3rjI

이번에는 역으로 랜더링이 되지 말아야 할 경우를 테스트하는 방법입니다.

```tsx
import { useState } from 'react';
import { SkillsProps } from './skills.types';

export const Skills = (props: SkillsProps) => {
  const { skills } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <ul>
        {skills.map((skill) => {
          return <li key={skill}>{skill}</li>;
        })}
      </ul>
      {isLoggedIn ? (
        <button>Start learning</button>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Login</button>
      )}
    </>
  );
};
```

예를 들어 이렇게 코드가 있습니다. 유저의 로그인 상태에 따라 보이고 안보이고를 제어하는 것입니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Skills } from './skills';

describe('Skills', () => {
  test('비로그인 상태일 때 로그인버튼을 랜더링합니다.', () => {
    render(<Skills skills={skills} />);
    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton).toBeInTheDocument();
  });
});
```

이렇게 작성해서 테스트를 통과하는 것을 확인할 수 있습니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Skills } from './skills';

describe('Skills', () => {
  test('비로그인 상태일 때 로그인버튼을 랜더링합니다.', () => {
    render(<Skills skills={skills} />);
    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton).toBeInTheDocument();
  });

  test('비로그인 상태에서는 Start learning이 안보입니다.', () => {
    render(<Skills skills={skills} />);
    const startLearningButton = screen.getByRole('button', {
      name: 'Start learning',
    });
    expect(startLearningButton).not.toBeInTheDocument();
  });
});
```

이렇게하면 의도한 동작처럼 비로그인한 유저에게 안보일 것이라고 판별에 성공했습니다. 하지만 jest는 DOM에 존재하지 않는다고 실패를 보여줍니다.

이럴 때 사용하는 것은 queryBy입니다. 일치하는 노드를 반환하고 없으면 null을 반환합니다. 복수의 엘리먼트를 발견하면 실패를 돌려줍니다. 그럴 때는 queryAllBy를 사용하면 됩니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Skills } from './skills';

describe('Skills', () => {
  test('비로그인 상태일 때 로그인버튼을 랜더링합니다.', () => {
    render(<Skills skills={skills} />);
    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton).toBeInTheDocument();
  });

  test('비로그인 상태에서는 Start learning이 안보입니다.', () => {
    render(<Skills skills={skills} />);
    const startLearningButton = screen.queryByRole('button', {
      name: 'Start learning',
    });
    expect(startLearningButton).not.toBeInTheDocument();
  });
});
```

이렇게 작성하면 코드와 테스트가 모두 의도한대로 동작합니다.

# React Testing Tutorial - 31 - findBy

https://www.youtube.com/watch?v=XTKF8GKD1tA

모든 케이스를 커버한 것같지만 아닙니다. 처음에는 DOM에 없지만 fetch를 통해 데이터가 없다가 생겨야 하는 경우들이 존재합니다. 보이고 사라지는 로직을 처리할 때 findBy로 처리할 수 있습니다.

```tsx
import { useState, useEffect } from 'react';
import { SkillsProps } from './skills.types';

export const Skills = (props: SkillsProps) => {
  const { skills } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoggedIn(true);
    }, 1001);
  }, []);
  return (
    <>
      <ul>
        {skills.map((skill) => {
          return <li key={skill}>{skill}</li>;
        })}
      </ul>
      {isLoggedIn ? (
        <button>Start learning</button>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Login</button>
      )}
    </>
  );
};
```

이렇게 서버랑 통신하는 것을 가정합니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Skills } from './skills';

describe('Skills', () => {
  const skills = ['HTML', 'CSS', 'JavaScript'];

  test('start learning button이 랜더링 되는지 확인합니다.', () => {
    render(<Skills skills={skills} />);
    const startLearningButton = screen.getByRole('button', {
      name: 'Start learning',
    });
    expect(startLearningButton).toBeInTheDocument();
  });
});
```

실패하는 테스트라고 피드백을 받습니다. 이렇게 되는 이유는 getByRole은 기다려주지 않습니다. 그래서 1초 후에 랜더링 될 테스트가 실패합니다.

이때 findBy로 해결합니다. findBy는 프로미스를 반환합니다. 엘리먼트가 보이면 해소됩니다. 기본값 1초를 초과하면 실패로 봅니다.

findAllBy는 배열로 이 로직을 처리합니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Skills } from './skills';

describe('Skills', () => {
  const skills = ['HTML', 'CSS', 'JavaScript'];

  test('start learning button이 랜더링 되는지 확인합니다.', async () => {
    render(<Skills skills={skills} />);
    const startLearningButton = await screen.findByRole(
      'button',
      {
        name: 'Start learning',
      },
      { timeout: 2000 }
    );
    expect(startLearningButton).toBeInTheDocument();
  });
});
```

서버통신은 비동기통신이기 때문에 테스트도 비동기대응하는 findBy를 활용합니다. 프로미스를 반환하기 때문에 await를 활용할 수 있습니다.

이렇게 1000ms로 불충분할 경우까지 대응해서 2000ms로 설정할 수 있습니다.

# React Testing Tutorial - 32 - Manual Queries

수동으로 쿼리를 작성합니다. RTL은 기본적으로 3가지 쿼리를 제공합니다. getBy, queryBy, findBy입니다. 하지만 없으면 수동으로 만들 수 있습니다.

자바스크립트의 쿼리선택자를 활용할 수 있습니다. 하지만 권장되지 않는 방식입니다. 직접 DOM을 다루는 것과 상통합니다.

# React Testing Tutorial - 33 - Debugging

https://www.youtube.com/watch?v=Kvby4W2TpQU

까끔은 테스트가 의도하지 않은 방식으로 동작할 때도 있습니다. DOM의 구조를 파악하면 올바른 표명을 만들 수 있습니다.

```tsx
import { useState, useEffect } from 'react';
import { SkillsProps } from './skills.types';

export const Skills = (props: SkillsProps) => {
  const { skills } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoggedIn(true);
    }, 1001);
  }, []);
  return (
    <>
      <ul>
        {skills.map((skill) => {
          return <li key={skill}>{skill}</li>;
        })}
      </ul>
      {isLoggedIn ? (
        <button>Start learning</button>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Login</button>
      )}
    </>
  );
};
```

다시 이런 컴포넌트에서 동작여부를 파악합니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Skills } from './skills';

describe('Skills', () => {
  const skills = ['HTML', 'CSS', 'JavaScript'];

  test('ul태그에 해당하는 컴포넌트가 랜더링이 됩니다', () => {
    render(<Skills skills={skills} />);
    const listElement = screen.getByRole('list');
    expect(listElement).toBeInTheDocument();
  });

  test('li태그에 해당하는 개별 skills를 목록이 랜더링합니다.', () => {
    render(<Skills skills={skills} />);
    const listItemElement = screen.getAllByRole('listitem');
    expect(listItemElement).toHaveLength(skills.length);
  });

  test('비로그인 상태일 때 로그인버튼을 랜더링합니다.', () => {
    render(<Skills skills={skills} />);
    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton).toBeInTheDocument();
  });

  test('비로그인 상태에서는 Start learning이 안보입니다.', () => {
    render(<Skills skills={skills} />);
    const startLearningButton = screen.queryByRole('button', {
      name: 'Start learning',
    });
    expect(startLearningButton).not.toBeInTheDocument();
  });

  test('start learning button이 랜더링 되는지 확인합니다.', async () => {
    render(<Skills skills={skills} />);
    const startLearningButton = await screen.findByRole(
      'button',
      {
        name: 'Start learn',
      },
      { timeout: 2000 }
    );
    expect(startLearningButton).toBeInTheDocument();
  });
});
```

의도적으로 마지막 테스트를 실패하게 만들었습니다.

```txt
 FAIL  src/Component/skills/Skills.test.tsx
  ● Skills › start learning button이 랜더링 되는지 확인합니다.

    Unable to find role="button" and name "Start learn"

    Ignored nodes: comments, script, style
    <body>
      <div>
        <ul>
          <li>
            HTML
          </li>
          <li>
            CSS
          </li>
          <li>
            JavaScript
          </li>
        </ul>
        <button>
          Start learning
        </button>
      </div>
    </body>

      33 |   test("start learning button이 랜더링 되는지 확인합니다.", async () => {
      34 |     render(<Skills skills={skills} />);
    > 35 |     const startLearningButton = await screen.findByRole(
         |                                              ^
      36 |       "button",
      37 |       {
      38 |         name: "Start learn",

      at waitForWrapper (node_modules/@testing-library/dom/dist/wait-for.js:166:27)
      at findByRole (node_modules/@testing-library/dom/dist/query-helpers.js:86:33)
      at Object.<anonymous> (src/Component/skills/Skills.test.tsx:35:46)

Test Suites: 1 failed, 2 passed, 3 total
Tests:       1 failed, 7 passed, 8 total
Snapshots:   0 total
Time:        3.418 s
Ran all test suites related to changed files.
```

이런 피드백을 받을 것을 확인할 수 있습니다.

RTL은 이런 테스트 라이브러리 기능이 있습니다. 하지만 실패전에 확인하는 것이 더 편리할 것입니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Skills } from './skills';

describe('Skills', () => {
  const skills = ['HTML', 'CSS', 'JavaScript'];
  test('start learning button이 랜더링 되는지 확인합니다.', async () => {
    render(<Skills skills={skills} />);
    screen.debug();
    const startLearningButton = await screen.findByRole(
      'button',
      {
        name: 'Start learning',
      },
      { timeout: 2000 }
    );
    screen.debug();
    expect(startLearningButton).toBeInTheDocument();
  });
});
```

```txt
 PASS  src/Component/Greet.test.tsx
 PASS  src/Component/application/Application.test.tsx
 PASS  src/Component/skills/Skills.test.tsx
  ● Console

    console.log
      <body>
        <div>
          <ul>
            <li>
              HTML
            </li>
            <li>
              CSS
            </li>
            <li>
              JavaScript
            </li>
          </ul>
          <button>
            Login
          </button>
        </div>
      </body>

      /Users/kimsanghyun/Desktop/mainDir/React-Cook-Book/testing/react-testing/src/Component/skills/Skills.test.tsx:35:12
        33 |   test("start learning button이 랜더링 되는지 확인합니다.", async () => {
        34 |     render(<Skills skills={skills} />);
      > 35 |     screen.debug();
           |            ^

      at logDOM (node_modules/@testing-library/dom/dist/pretty-dom.js:85:13)

    console.log
      <body>
        <div>
          <ul>
            <li>
              HTML
            </li>
            <li>
              CSS
            </li>
            <li>
              JavaScript
            </li>
          </ul>
          <button>
            Start learning
          </button>
        </div>
      </body>

      /Users/kimsanghyun/Desktop/mainDir/React-Cook-Book/testing/react-testing/src/Component/skills/Skills.test.tsx:43:12
        41 |       { timeout: 2000 }
        42 |     );
      > 43 |     screen.debug();
           |            ^

      at logDOM (node_modules/@testing-library/dom/dist/pretty-dom.js:85:13)


Test Suites: 3 passed, 3 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        2.121 s
```

이렇게 하면 실행 전후 DOM을 간단하게 비교할 수 있습니다.

하지만 의도적으로 에러를 돌려줍니다. 이런 디버깅은 커밋에 올라가지 말도록 피드백을 제공해줍니다.

```tsx
import { render, screen, logRoles } from '@testing-library/react';
import { Skills } from './skills';

describe('Skills', () => {
  const skills = ['HTML', 'CSS', 'JavaScript'];
  test('start learning button이 랜더링 되는지 확인합니다.', async () => {
    const view = render(<Skills skills={skills} />);
    logRoles(view.container);
    const startLearningButton = await screen.findByRole(
      'button',
      {
        name: 'Start learning',
      },
      { timeout: 2000 }
    );
    expect(startLearningButton).toBeInTheDocument();
  });
});
```

```txt
    console.log
      list:

      Name "":
      <ul />

      --------------------------------------------------
      listitem:

      Name "":
      <li />

      Name "":
      <li />

      Name "":
      <li />

      --------------------------------------------------
      button:

      Name "Login":
      <button />

      --------------------------------------------------
```

이렇게 피드백을 받아 Role을 확인할 수 있습니다. 디버깅에 상당히 유용합니다.

# React Testing Tutorial - 34 - Testing Playground

https://www.youtube.com/watch?v=424C8ppfzQA

이번에는 Testing Playground 크롬 화장자입니다. 테스팅 라이브러리를 활용 초보자에게 좋습니다.

https://testing-playground.com/

https://chrome.google.com/webstore/detail/testing-playground/hejbmebodbijjdhflfknehhcgaklhano

크롬에 탭을 추가합니다. 그리고 리액트 탭에 적용할 수 있습니다. 권장하는 쿼리를 탭에서 확인하고 테스트작성을 편안하게 진행할 수 있습니다.

이 확장자는 조기에 리액트 테스팅에 활용하기를 권장합니다.

여러 엘리먼트를 쿼리하고 DOM에 변하는 쿼리 등을 다루었습니다. 테스트 디버깅도 다루었습니다.

다음부터는 유저이벤트를 다룹니다.

# React Testing Tutorial - 35 - User Interactions

https://www.youtube.com/watch?v=mSWYQUXXF5Q

서비스를 개발하면서 인터랙션 이벤트를 처리해야 할 때가 있습니다. 소프트웨어는 이런 인터랙션을 처리할 수 있으면 이런 것또한 테스트가 가능해야 합니다.

이럴 때는 라이브러리를 활용합니다. user-event입니다. 사용자 인터랙션을 처리할 수 있게 RTL과 같이 사용하도록 권장하는 라이브러리입니다.

fireEvent는 DOM 이벤트를 디스패칭해서 처리할 수 있습니다. 하지만 user-event는 여러 이벤트를 처리할 수 있습니다.

user-event는 실제유저 인터랙션처럼 세세한 로직처리가 가능합니다. 이런 것이 장점입니다.

CRA의 장점은 user-event가 기본적으로 설치되어 있습니다. CRA는 13을 설치하지만 최근에는 14버전이 출시되었습니다.

그래서 업그레이드 명령이 필요합니다.

```sh
yarn upgrade @testing-library/user-event@latest
```

이렇게하면 최근 버전으로 업데이트가 가능합니다.

# React Testing Tutorial - 36 - Pointer Interactions

https://www.youtube.com/watch?v=pyKS3H2i7gk

마우스인터랙션입니다.

```tsx
import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

이런 평범한 카운터 앱이 있습니다. 클릭에 따라 숫자가 올라가는지 확인합니다.

여기서 테스트를 만들겠습니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter', () => {
  test('랜더링을 확인합니다.', () => {
    render(<Counter />);
    const countElement = screen.getByRole('heading');
    expect(countElement).toBeInTheDocument();

    const incrementButton = screen.getByRole('button', { name: 'Increment' });
    expect(incrementButton).toBeInTheDocument();
  });
});
```

여기서 초기값 테스트를 추가하겠습니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter', () => {
  test('랜더링을 확인합니다.', () => {
    render(<Counter />);
    const countElement = screen.getByRole('heading');
    expect(countElement).toBeInTheDocument();

    const incrementButton = screen.getByRole('button', { name: 'Increment' });
    expect(incrementButton).toBeInTheDocument();
  });

  test('count를 0으로 랜더합니다.', () => {
    render(<Counter />);
    const countElement = screen.getByRole('heading');
    expect(countElement).toHaveTextContent('0');
  });
});
```

문자열이라는 것을 주의합니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Counter } from './Counter';
import user from '@testing-library/user-event';

describe('Counter', () => {
  test('랜더링을 확인합니다.', () => {
    render(<Counter />);
    const countElement = screen.getByRole('heading');
    expect(countElement).toBeInTheDocument();

    const incrementButton = screen.getByRole('button', { name: 'Increment' });
    expect(incrementButton).toBeInTheDocument();
  });

  test('count를 0으로 랜더합니다.', () => {
    render(<Counter />);
    const countElement = screen.getByRole('heading');
    expect(countElement).toHaveTextContent('0');
  });

  test('클릭 이후 count를 1로 랜더합니다.', async () => {
    // 유저가 존재한다는 것을 설정합니다.
    user.setup();

    // 여기는 이전과 동일합니다.
    render(<Counter />);
    const incrementButton = screen.getByRole('button', { name: 'Increment' });

    // 모든 유저동작은 비동기적입니다.
    await user.click(incrementButton);

    // 클릭 동작 이후 0에서 1로 증가했는지 확인합니다.
    const countElement = screen.getByRole('heading');
    expect(countElement).toHaveTextContent('1');
  });
});
```

유저의 행동을 쿼리선택하고 재현하고 의도한 결과가 화면에 반영되는지 이렇게 확인할 수 있습니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Counter } from './Counter';
import user from '@testing-library/user-event';

describe('Counter', () => {
  test('유저는 2번 클릭하고 count는 2로 랜더링 됩니다.', async () => {
    user.setup();

    render(<Counter />);
    const incrementButton = screen.getByRole('button', { name: 'Increment' });

    await user.dblClick(incrementButton);

    const countElement = screen.getByRole('heading');
    expect(countElement).toHaveTextContent('2');
  });
});
```

더블클릭 연습문제도 이렇게 풀 수 있습니다.

클릭은 포인터 API가 아닙니다. Convenience API입니다. 내부적으로 포인터 API를 부르기만 합니다. 하지만 테스트에 자주 활용합니다.

click(), dblClick(), tripleClick()의 메서드가 존재합니다.

hover(), unhover()로 툴팁의 존재여부, 스타일의 적용여부를 테스트할 수 있습니다.

더 로우레벨 포인터 API를 활용하는 것도 가능합니다.

```tsx
pointer({ keys: '[MouseLeft]' });
pointer({ keys: '[MouseLeft][Mouseright]' });
pointer('[MouseLeft][Mouseright]');
pointer('[MouseLeft>]');
pointer('[MouseLeft]');
```

이렇게 마우스 인터랙션을 구현하는 것이 가능합니다. 하지만 바로 사용하지말고 Convenience API를 먼저 활용하도록 합니다.

# React Testing Tutorial - 37 - Keyboard Interactions

https://www.youtube.com/watch?v=kqX14UyjhDM

이번에는 키보드 인터랙션을 다룹니다.

```tsx
import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState(0);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input
        type="number"
        name="amount"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <button onClick={() => setCount(amount)}>Set</button>
    </div>
  );
};
```

이렇게 컴포넌트를 작성했습니다. input과 set 버튼이 생겼습니다.

10을 입력하고 Increment 버튼을 누르면 10단위로 증가하는 기능입니다.

```tsx
test('set 버튼을 누르고 난뒤에 count를 10으로 랜더링합니다.', async () => {
  user.setup();
  render(<Counter />);

  // <input type="number" />는 Role이 spinbutton입니다.
  const amountInput = screen.getByRole('spinbutton');
  // 첫번째 인자는 선택한 엘리먼트를 대입합니다.
  await user.type(amountInput, '10');
  expect(amountInput).toHaveValue(10);

  // 버튼을 쿼리합니다.
  const setButton = screen.getByRole('button', { name: 'Set' });
  await user.click(setButton);

  // 동작을 확인합니다.
  const countElement = screen.getByRole('heading');
  expect(countElement).toHaveTextContent('10');
});
```

이렇게 테스트를 작성할 수 있습니다.

탭에 따라 포커스가 순서대로 동작하는지 확인해볼 수 있습니다.

```tsx
test('엘리먼트가 순서대로 포커스됩니다.', async () => {
  user.setup();
  render(<Counter />);
  const incrementButton = screen.getByRole('button', { name: 'Increment' });
  const amountInput = screen.getByRole('spinbutton');
  const setButton = screen.getByRole('button', { name: 'Set' });

  await user.tab();
  expect(incrementButton).toHaveFocus();
  await user.tab();
  expect(amountInput).toHaveFocus();
  await user.tab();
  expect(setButton).toHaveFocus();
});
```

이런식으로 포커스를 구현하는 것도 가능합니다. 순서대로 포커스되는지 판별하는 것도 가능합니다. form에 활용하면 아주 좋을 것 같습니다.

type과 tab은 각각 다른 API입니다.

type() - Utility API
tab() - Convenience API

Utility API

clear()는 input을 비우는 명령입니다.

selectOptions(), deselectionOptions() listbox, dropdown에서 여러 선택하는 옵션을 제어할 수 있습니다.

upload()는 파일업로드를 가정해서 동작합니다.

클립보드 APIf copy(), cut(), past()가 있습니다.

Keyboard API는 키액션을 재현합니다. `keyboard("foo")` f, o, o처럼 누른 것입니다.

키를 누른 상태를 재현하려면 `keyboard("{Shift>}A{/Shift}")`로 쉬프트를 누르고 A를 누르고 쉬프트키를 땐 것이라고 이벤트를 처리합니다. 쉬프트처럼 특수한 키는 중괄호로 감싸야 합니다.

# React Testing Tutorial - 38 - Providers

https://www.youtube.com/watch?v=8FCP7fYICio

이번에는 provider와 custom hook을 테스트하는 방법입니다.

```tsx
import './App.css';
import { Application } from './Component/application/Application';
import { AppProviders } from './providers/AppProviders';

function App() {
  return (
    <AppProviders>
      <div className="App">
        <Application />
      </div>
    </AppProviders>
  );
}

export default App;
```

MUI의 Provider를 사용한 경우입니다.

```sh
yarn add @mui/material @emotion/react @emotion/styled
```

예시를 위해 이렇게 설치할 수 있습니다.

```tsx
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
```

다크모드 테마로 이렇게 지정합니다. 의도는 모는 Provider에 적용하기 위한 것입니다.

```tsx
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const MuiMode = () => {
  const theme = useTheme();
  return (
    <>
      <Typography component="h1">{`${theme.palette.mode} mode`}</Typography>
    </>
  );
};
```

이렇게 `MuiMode.tsx`를 작성합니다. 모드에 따라 해당하는 텍스트컬러를 지정합니다.

```tsx
import './App.css';
import { Application } from './Component/application/Application';
import { MuiMode } from './Component/mui/MuiMode';
import { AppProviders } from './providers/AppProviders';

function App() {
  return (
    <AppProviders>
      <div className="App">
        <Application />
        <MuiMode />
      </div>
    </AppProviders>
  );
}

export default App;
```

이렇게 불러옵니다.

이제 목표는 이 provider의 정상동작을 테스트하는 것입니다.

```tsx
import { render, screen } from '@testing-library/react';
import { MuiMode } from './MuiMode';

describe('MuiMode', () => {
  test('텍스트를 올바르게 랜더링합니다.', () => {
    render(<MuiMode />);
    const headingElement = screen.getByRole('heading');
    expect(headingElement).toHaveTextContent(/dark mode/);
  });
});
```

이렇게 테스트를 작성하느까 의도랑 다르게 테스트가 실패합니다.

의도랑 다르게 테스트가 실패하는 이유는 provider가 없어서 발생하는 문제입니다.

RTL은 원할 때 wrapper 설정할 수 있습니다.

```tsx
import { render, screen } from '@testing-library/react';
import { MuiMode } from './MuiMode';
import { AppProviders } from '../../providers/AppProviders';

describe('MuiMode', () => {
  test('텍스트를 올바르게 랜더링합니다.', () => {
    render(<MuiMode />, { wrapper: AppProviders });
    const headingElement = screen.getByRole('heading');
    expect(headingElement).toHaveTextContent(/dark mode/);
  });
});
```

이렇게 작성하면 의도한 것처럼 테스트가 통과합니다.

하지만 생각해보면 모든 컴포넌트가 provider로 감싸져있기를 바랍니다. 일일이 이렇게 import하면 비효율적입니다.

효율적이게 처리하는 방법은 다음 강의입니다.

# React Testing Tutorial - 39 - Custom Render Functions

https://www.youtube.com/watch?v=eA7MEy8dTYY

```tsx
import { render, screen } from '@testing-library/react';
import { MuiMode } from './MuiMode';
import { AppProviders } from '../../providers/AppProviders';

describe('MuiMode', () => {
  test('텍스트를 올바르게 랜더링합니다.', () => {
    render(<MuiMode />, { wrapper: AppProviders });
    const headingElement = screen.getByRole('heading');
    expect(headingElement).toHaveTextContent(/dark mode/);
  });
});
```

리덕스 store, theme provider같은 것들은 모든 레벨에 한번에 적용하는 것이 간편해질 것입니다.

https://testing-library.com/docs/react-testing-library/setup

설정을 알려줍니다.

```tsx
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { AppProviders } from './providers/AppProviders';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AppProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
```

이번 예시를 위해 이렇게 작성합니다.

```tsx
import { render, screen } from '../../test-utils'; // import 경로를 변경합니다.
import { MuiMode } from './MuiMode';

describe('MuiMode', () => {
  test('텍스트를 올바르게 랜더링합니다.', () => {
    render(<MuiMode />);
    const headingElement = screen.getByRole('heading');
    expect(headingElement).toHaveTextContent(/dark mode/);
  });
});
```

이렇게 하니까 일일이 `import`작성하고 `wrapper` 설정을 안해도 됩니다. 물론 import 문을 다르게 작성해야 한다는 단점이 있습니다.

# React Testing Tutorial - 40 - Custom React Hooks

https://www.youtube.com/watch?v=Ru4V8yCR6jQ

Custom hook을 테스트하는 방법입니다.

```ts
export type UseCounterProps = {
  initialCount?: number;
};
```

```tsx
import { useState } from 'react';
import { UseCounterProps } from './useCounter.types';

export const useCounter = ({ initialCount = 0 }: UseCounterProps = {}) => {
  const [count, setCount] = useState(initialCount);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  return { count, increment, decrement };
};
```

이렇게 커스텀 hook이 작성되어 있습니다.

증가감소 함수를 만들었습니다. 어떤 앱이든 카운터 로직을 만들 수 있습니다.

이 hook을 신뢰할 수 있게 테스트를 만들 것입니다.

```tsx
import { render } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  test('초기값을 랜더합니다.', () => {
    render(useCounter);
  });
});
```

이렇게 작성하면 당연히 타입스크립트가 에러를 돌려줍니다. 리액트 노드가 아닌 것을 인자로 대입하면서 생기는 문제를 타입체킹으로 막아준 것입니다.

반환하는 JSX가 없습니다. 또 hook은 함수 외부에서 호출하는 것도 불가능합니다.

이런 경우에 테스트할 때는 다른 방법이 있습니다.

renderHook은 함수로 한번감싸줍니다. 그리고 result의 current 속성값으로 반환값을 담아두고 있습니다.

```tsx
import { renderHook } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  test('초기값을 랜더합니다.', () => {
    const { result } = renderHook(useCounter);
    expect(result.current.count).toBe(0);
  });
});
```

이렇게 접근하고 테스트를 작성할 수 있습니다.

```tsx
import { renderHook } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  test('동일한 초기값을 받고 랜더링합니다.', () => {
    const {
      result: {
        current: { count },
      },
    } = renderHook(useCounter, { initialProps: { initialCount: 10 } });
    expect(count).toBe(10);
  });
});
```

인자 대입하는 값에 따라 달라지는 반환값을 테스트하는 것이 가능합니다.

다음은 custom hook에 캡슐화되어 있는 함수를 테스트하는 법을 다룹니다.

# React Testing Tutorial - 41 - Act Utility

https://www.youtube.com/watch?v=W7CbUiO3_28

```tsx
import { renderHook } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  test('증가합니다.', () => {
    const { result } = renderHook(useCounter);
    result.current.increment();
    expect(result.current.count).toBe(1);
  });
});
```

예상과 다르게 테스트가 실패합니다.

state를 업데이트할 때는 Act로 감싸야 합니다.

https://reactjs.org/docs/testing-recipes.html#act

ui테스트를 랜더링, 유저이벤트, 데이터 fetching은 할 때 UI 인터랙션의 유닛에 해당합니다.

act는 이런 유닛들은 처리되고 DOM에 반영하고 표명하기 전에 설계합니다. 이렇게 해야 적용을 보증할 수 있습니다. RTL의 act()함수를 활용해서 보일러플레이트를 피할 수 있습니다.

```tsx
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  test('증가합니다.', () => {
    const { result } = renderHook(useCounter);
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  test('감소합니다.', () => {
    const { result } = renderHook(useCounter);
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(-1);
  });
});
```

이렇게 증가감소가 정상동작하는지 확인할 수 있습니다. 각각의 테스트는 독립적으로 동작합니다.

커스텀 hook을 테스트할 때는 state update는 개발자가 수동으로 act로 감싸줘야 합니다. 대부분의 경우 RTL이 감싸주지만 custom hook만큼은 이렇게 노출되어 있습니다. 이부분은 익숙해져야 하는 부분입니다.

# React Testing Tutorial - 42 - Mocking Functions

https://www.youtube.com/watch?v=TuxmnyhPdhA

Mocking입니다. 나중에는 통신 Mocking도 진행합니다.

```tsx
import { CounterTwoProps } from './CounterTwo.types';

export const CounterTwo = (props: CounterTwoProps) => {
  return (
    <div>
      <h1>Counter Two</h1>
      <p>{props.count}</p>
      {props.handleIncrement && (
        <button onClick={props.handleIncrement}>Increment</button>
      )}
      {props.handleDecrement && (
        <button onClick={props.handleDecrement}>Decrement</button>
      )}
    </div>
  );
};
```

```tsx
export type CounterTwoProps = {
  count: number;
  handleIncrement?: () => void;
  handleDecrement?: () => void;
};
```

이렇게 props를 지정할 때마다 버튼이 보이고 안 보이고 로직을 처리합닏.

```tsx
import { render, screen } from '@testing-library/react';
import { CounterTwo } from './CounterTwo';

describe('CounterTwo', () => {
  test('랜더링이 됩니다.', () => {
    render(<CounterTwo count={0} />);
    const textElement = screen.getByText('Counter Two');
    expect(textElement).toBeInTheDocument();
  });
});
```

랜더링이 동작하고 말고를 시작하는 테스트케이스로 작성했습니다. 이렇게 되면 테스트는 정상적으로 통과합니다.

```tsx
import { render, screen } from '@testing-library/react';
import { CounterTwo } from './CounterTwo';

describe('CounterTwo', () => {
  test('랜더링이 됩니다.', () => {
    render(<CounterTwo count={0} />);
    const textElement = screen.getByText('Counter Two');
    expect(textElement).toBeInTheDocument();
  });

  test('handler로 제어합니다.', () => {
    render(<CounterTwo count={0} handleIncrement={} handleDecrement={} />);
  });
});
```

여기서 의문이 생깁니다. 증가감소를 하는 단위를 몇으로 설정을 해야 하는지 문제입니다. 우리의 관심사가 아닙니다. 중요한 것은 함수를 props넘겨주고 정상적으로 동작하는지만 확인하는 것이 우리의 관심사입니다.

여기서 필요한 것이 Mock함수들입니다.

```tsx
import { render, screen } from '@testing-library/react';
import { CounterTwo } from './CounterTwo';

describe('CounterTwo', () => {
  test('handler로 제어합니다.', () => {
    const incrementHandler = jest.fn();
    const decrementHandler = jest.fn();

    render(
      <CounterTwo
        count={0}
        handleIncrement={incrementHandler}
        handleDecrement={decrementHandler}
      />
    );
  });
});
```

이렇게 모의함수를 임의로 넣어서 처리할 수 있습니다.

```tsx
import { render, screen } from '@testing-library/react';
import { CounterTwo } from './CounterTwo';
import user from '@testing-library/user-event';

describe('CounterTwo', () => {
  test('handler로 제어합니다.', async () => {
    user.setup();
    const incrementHandler = jest.fn();
    const decrementHandler = jest.fn();

    render(
      <CounterTwo
        count={0}
        handleIncrement={incrementHandler}
        handleDecrement={decrementHandler}
      />
    );

    const incrementButton = screen.getByRole('button', { name: 'Increment' });
    const decrementButton = screen.getByRole('button', { name: 'Decrement' });
    await user.click(incrementButton);
    await user.click(decrementButton);
    expect(incrementHandler).toHaveBeenCalledTimes(1);
    expect(decrementHandler).toHaveBeenCalledTimes(1);
  });
});
```

함수를 호출한 횟수를 테스팅합니다. 각각 1번 함수를 실행하게 되었습니다. 모두 정상동작하는 것을 획인했습니다.

이렇게 작성하면 테스트가 통과하는 것을 확인할 수 있습니다. 컴포넌트의 생산자는 어떤 함수든 실행이 되는 것을 확인하고 소비자는 알아서 함수를 잘 대입만 하면됩니다.

더 복잡합니다. 요구사항에 따라 다르게 활용하게 됩니다.

다음에는 서버통신을 Mocking합니다.

# React Testing Tutorial - 43 - Mocking HTTP Requests

https://www.youtube.com/watch?v=dL_TsWTASfg

```tsx
import { useState, useEffect } from 'react';

export const Users = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data.map((user: { name: string }) => user.name)))
      .catch(() => setError('Error fetching users'));
  }, []);
  return (
    <div>
      <h1>Users</h1>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
};
```

이런 컴포넌트가 존재합니다. api로 요청을 날리고 데이터를 받게 됩니다. 데이터에 에러가 발생하면 에러처리까지합니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Users } from './Users';

describe('Users', () => {
  test('정상적인 랜더링여부를 확인합니다.', () => {
    render(<Users />);
    const textElement = screen.getByText('Users');
    expect(textElement).toBeInTheDocument();
  });
});
```

이 테스트로 시작하게 됩니다. 유저가 화면에 표시될지 아니면 서버에 통신에 실패했을 때 테스트케이스를 작성해야 합니다. 하지만 문제가 있습니다. E2E 테스트를 제외하고 요청을 보내지 않습니다. 이런 테스트는 비교적 자주 발생하기 때문 실제 API를 달아두면 비용이 꽤 큽니다.

이럴 때는 요청을 모의로 성공과 실패를 Mocking으로 만듭니다.

https://mswjs.io/

여기서 라이브러리를 설치합니다. 모의서버를 가장 간단하게 작성합니다. MSW라고 줄여서 부릅니다. 모의요청을 보내는 법을 배우고 자습을 시도해보도록 합니다.

# React Testing Tutorial - 44 - MSW Setup

https://www.youtube.com/watch?v=rM_OsI8rS-g

셋업입니다.

```sh
yarn add msw --dev
```

개발의존성인 것을 파악합니다. 설치 이후에는 mocks폴더를 만듭니다. 그리고 server.ts 파일을 만듭니다.

```txt
/root
  /src
    /mocks
      server.ts
```

```ts
// src/mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);
```

여기서는 에러가 발생합니다. 이제 handlers 파일을 만들어야 에러가 풀립니다.

# React Testing Tutorial - 45 - MSW Handlers

https://www.youtube.com/watch?v=MJb0lc2AOq4

handler 파일 생성입니다.

```tsx
import { rest } from 'msw';

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: 'Bruce Wayne',
        },
        {
          name: 'Clark Kent',
        },
        {
          name: 'Princess Diana',
        },
      ])
    );
  }),
];
```

지금은 매직 string이 보이지만 나중에 baseURL로 상수로 처리해도 됩니다. 첫번째 인자는 모의로 요청을 날릴 엔드포인트입니다. 두번째인자는 요청, 응답, context를 인자로 갖고 있는 함수입니다. 요청에 성공하면 3개의 객체를 원소로 갖고 있는 배열을 응답하게 만들 수 있습니다.

각각의 핸들러는 메서드에 가깝습니다.

이렇게 설정하고 다음은 모의 요청을 합니다.

# React Testing Tutorial - 46 - Testing with MSW

https://www.youtube.com/watch?v=niqiP_5MrRA

```tsx
import { render, screen } from '@testing-library/react';
import { Users } from './Users';

describe('Users', () => {
  test('정상적인 랜더링여부를 확인합니다.', () => {
    render(<Users />);
    const textElement = screen.getByText('Users');
    expect(textElement).toBeInTheDocument();
  });

  test('유저 목록을 랜더링합니다.', async () => {
    render(<Users />);
    // 통신이 필요하기 때문에 await를 앞에 추가합니다.
    const users = await screen.findAllByRole('listitem');
    // 모의요청의 응답는 3개의 객체를 갖은 배열로 응답해달라 설정했습니다. 거기에 기대하는 응답니다.
    expect(users).toHaveLength(3);
  });
});
```

응답은 실제 API로 요청을 보내고 응답 받아 10를 받았을 것입니다. 아직 설정을 모의 요청을 테스트에서 설정하지 않았습니다.

참고로 공유할 데이터는 다른 파일로 분리해서 상수처럼 접근하는 것이 더 생산적일 것입니다.

```ts
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// src/setupTests.js
import { server } from './mocks/server';
// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
```

설정하기 위해서는 `setupTest.ts`에 붙여넣습니다.

서버를 import합니다. 그리고 jest의 helper함수를 통해 처리합니다. afterEach는 런타임에서는 모의서버로 덮어쓰지지 않게 합니다. 이렇게 작성하면 모의 요청을 성공적으로 만든 것입니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Users } from './Users';

describe('Users', () => {
  test('정상적인 랜더링여부를 확인합니다.', () => {
    render(<Users />);
    const textElement = screen.getByText('Users');
    expect(textElement).toBeInTheDocument();
  });

  test('유저 목록을 랜더링합니다.', async () => {
    render(<Users />);
    // 통신이 필요하기 때문에 await를 앞에 추가합니다.
    const users = await screen.findAllByRole('listitem');
    // 모의요청의 응답는 3개의 객체를 갖은 배열로 응답해달라 설정했습니다. 거기에 기대하는 응답니다.
    expect(users).toHaveLength(3);
  });
});
```

이렇게 보면 테스트도 코드도 모두 의도한대로 동작합니다. 다음에는 모의요청에 실패했을테 로직처리를 테스트합니다.

# React Testing Tutorial - 47 - MSW Error Handling

https://www.youtube.com/watch?v=dajPDWGJ75M

이번에는 요청이 실패되었을 때 테스트를 합니다. 이럴 때는 방법이 또 있습니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Users } from './Users';
import { server } from '../../mocks/server';
import { rest } from 'msw';

describe('Users', () => {
  test('정상적인 랜더링여부를 확인합니다.', () => {
    render(<Users />);
    const textElement = screen.getByText('Users');
    expect(textElement).toBeInTheDocument();
  });

  test('유저 목록을 랜더링합니다.', async () => {
    render(<Users />);
    // 통신이 필요하기 때문에 await를 앞에 추가합니다.
    const users = await screen.findAllByRole('listitem');
    // 모의요청의 응답는 3개의 객체를 갖은 배열로 응답해달라 설정했습니다. 거기에 기대하는 응답니다.
    expect(users).toHaveLength(3);
  });

  test('에러를 랜더링합니다.', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/users',
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    render(<Users />);
    const error = await screen.findByText('Error fetching users');
    expect(error).toBeInTheDocument();
  });
});
```

이렇게하면 통신이 실패앴을의 테스트케이스도 추가할 수 있습니다.

server는 통신실패에 해당하는 테스트케이스만 스코프가 한정됩니다.

지난시간 설정이 테스트각 호출된 스코프만 한정되도록 설정했습니다. 당연히 부정확한 개념이고 이해하기 쉬운 틀린 개념입니다. 더 정확한 개념은 Jest문서를 통해 파악합니다.

# React Testing Tutorial - 48 - Static Analysis Testing

https://www.youtube.com/watch?v=dqUi2SB2fOw

정적분석 테스팅합니다. 테스트가 실행없디 진짜 동작하는지 확인합니다.

- 스타일링과 포맷팅이 올바르게 적용되었는지 확인합니다.
- 자주발생할만한 실수와 버그를 감지합니다.
- 코드의 복잡성을 제한합니다.
- 타입일관성을 유지합니다.

모든 테스트는 코드를 실행하고 결과를 확인하고 코드의 정상동작을 확인했습니다. 하지만 정적 테스트는 코드 실행전에 실행합니다. 코드 그자체가 어떻게 작성되었는지 하는 테스트입니다.

이렇게 하는 이유는 테스팅과 정적분석은 테스트와 상호보완적입니다.

정적 테스팅은 5가지 도구를 사용할 수 있습니다.

1. 타입스크립트
2. ESlint
3. Prettier
4. Husky
5. lint-staged

타입스크립트는 이번시간에 기본적으로 활용했습니다.

# React Testing Tutorial - 49 - Eslint

https://www.youtube.com/watch?v=AiIpVmmU3Vg

ESlint입니다. ECMAScript를 일관되고 버그를 방지하는 패턴을 방지하게 해줍니다.

CRA는 설치할 때부터 ESlint를 설치해줍니다. 개발자 인은 VScode 확장자를 설치해주면 됩니다.

```tsx
console.log(name);
const name = 'Jake';
```

버그를 바로 알려줍니다.

테스트코드에도 적용이됩니다.

```tsx
export const Application = () => {
  return (
    <>
      <button disabled>Submit</button>
    </>
  );
};
```

이렇게 작성이 되어있습니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Application } from './Application';

describe('Application', () => {
  test('렌더링이 됩니다.', () => {
    render(<Application />);
    const submitButtonElement = screen.getByRole('button');
    expect(submitButtonElement).toBeInTheDocument();
    expect(submitButtonElement).not.toBeEnabled();
  });
});
```

이렇게 작성해도 동작합니다. 하지만 더 우아한 접근방법이 있습니다.

```sh
yarn add -D eslint-plugin-jest-dom
```

이렇게 설치합니다.

```json
"devDependencies": {
    "eslint-plugin-jest-dom": "^4.0.3",
    "msw": "^1.0.0"
  }
```

이렇게 추가된 것을 확인할 수 있을 것입니다.

```json
"eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      "plugin:jest-dom/recommended"
    ]
  },
```

package.json 설정을 이렇게 변경하면 적용이 됩니다.

```tsx
import { render, screen } from '@testing-library/react';
import { Application } from './Application';

describe('Application', () => {
  test('렌더링이 됩니다.', () => {
    render(<Application />);
    const submitButtonElement = screen.getByRole('button');
    expect(submitButtonElement).toBeInTheDocument();
    expect(submitButtonElement).toBeDisabled();
  });
});
```

이렇게 권장하는 패턴을 에러를 피드백으로 받고 수정할 수 있습니다.

```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint --ignore-path .gitignore .",
    "coverage": "yarn test --coverage --watchAll --collectCoverageFrom='src/components/**/*.{ts,tsx}' --collectCoverageFrom='!src/components/**/*.{types, stories, constants, test, spec}.{ts,tsx}'"
  },
```

이렇게 스크립트를 작성하고 테스트에서 에러 피드백을 받을 수 있습니다. 코드베이스 전체를 스켄하고 피드백을 돌려줄 것입니다.

# React Testing Tutorial - 50 - Prettier

https://www.youtube.com/watch?v=rHcR-YuZ0I4

프리티어는 일관된 코드 스타일링이 가능하게 독선적인 툴입니다.

```sh
yarn add --dev exact prettier
```

프리티어는 약간 다른 포맷팅이 가능하고 앞뒤로 계속 바뀔 가능성이 있습니다. 그래서 프리티어는 공유하는 것이 좋습니다.

```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint --ignore-path .gitignore .",
    "format": "prettier --ignore-path .gitignore --write \"**/*.{ts,tsx,css,scss}\"",
    "coverage": "yarn test --coverage --watchAll --collectCoverageFrom='src/components/**/*.{ts,tsx}' --collectCoverageFrom='!src/components/**/*.{types, stories, constants, test, spec}.{ts,tsx}'"
  },
```

이렇게 설정하면 됩니다. 프로젝트 전체에 한에 포맷팅이 가능합니다.

외부파일에 설치하는 전략도 있습니다.

`.prettier.json`을 루트디랙토리에 추가하면 됩니다.

```json
{
  "semi": false,
  "singleQuote": true
}
```

이런 포맷팅을 직접할 수 있습니다.

스크립트를 동작시키는 것도 좋지만 자동포맷을 확장자로 처리하는게 훨씬더 효율적입니다.

```sh
yarn add -D eslint-config-prettier
```

이렇게 프리티어를 추가할 수 있습니다.

# React Testing Tutorial - 51 - Husky

https://www.youtube.com/watch?v=smR351T-roc

Husky를 다룹니다. 스크립트를 실행하지 않는 시나리오가 있습니다. 린트와 포맷을 한번에 처리하는 방법입니다.

Husky는 commits를 개선합니다.

```sh
npx husky-init && yarn
```

Husky를 설치하게 됩니다.

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

yarn lint && yarn format
```

커밋을 진행하기 전에 테스트가 실패하면 커밋이 취소됩니다.

커밋을 하면 포맷팅이 동작하게 됩니다.

# React Testing Tutorial - 52 - lint-staged

https://www.youtube.com/watch?v=36VhpIIlerQ

husky를 또 보완할 수 있습니다. 커밋 직전의 파일만 동작하게 만들 수 있습니다.

```sh
yarn add -D lint-staged
```

```json
"lint-staged": {
    "*.{ts, tsx}": ["eslint"],
    "*.{ts, tsx, css, scss}":["prettier --web"]
  }
```

package.json에 이렇게 작성하면 됩니다.

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-sated
```

이렇게 설정하면 변형이 가해진 파일만 적용합니다.

스테이징이 된 파일만 검토하기 때문에 처리가 더 빠릅니다.

```sh
npx husky add .husky/pre-push "npm test -- watchAll=false
```

테스트가 성공했을 때만 push가 가능하게 만든 설정입니다.

# React Testing Tutorial - 53 - Wrapping Up

https://www.youtube.com/watch?v=F1-5HGibqAs

요약입니다.

- 테스팅이 무엇인가?
- Jest 와 RTL의 차이는?
- 테스트의 종류
- 테스트의 해부도
- CRA 프로젝트
- 자동화테스트란 무엇인가?
- TDD가 무엇인지 살펴봤습니다.

- Jest watch mode
- 테스트 필터
- 테스트 그룹화
- 파일네임 커버리지
- 코드 커버리지
- 표명

- RTL 쿼리
- 쿼리의 종류
- 쿼리의 우선순위
- get, query, find
- 수동쿼리
- 디버깅 테스트
- 테스팅 플레이그라운드

- 인터랙션 테스팅
- 포인터와 키보드

- provider
- 커스텀 hook

- mocking 함수
- mocking 요청

- 정적 분석

이런 모든 것들은 코드를 팀으로 작성할 때 코드 퀄리티를 높이는 방법입니다.

이부분은 아주 기본이고 시작하는 부분입니다.
