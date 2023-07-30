---
sidebar_position: 4
description: '자바스크립트 생태계에 중요한 기관과 사람들입니다. 지극히 개인적이고 주관적인 기준으로 선정한 목록입니다.'
draft: true
---

## TIL.22.12.28. - 타입스크립트 예습하기

### Typescript for Beginners

[Typescript for Beginners](https://github.com/gitdagray/typescript-course)

### Typescript for Beginners - Starter Lesson

[Typescript for Beginners - Starter Lesson](https://www.youtube.com/watch?v=MOO5vrtTUTE)

타입 스크립트란 무엇인가? 툴링과 정적 타입을 제공하는 자바스크립트입니다. 타입 스크립트는 더 좋은 툴링을 제공합니다. 그저 더 좋은 자바스크립트를 작성할 수 있게 해줍니다. C#개발자가 타입스크립트입니다.

관련 아티클
https://survey.stackoverflow.co/2022/#technology-most-popular-technologies

https://dev.to/destrodevshow/typescript-and-c-both-created-by-the-same-person-named-anders-hejlsberg-42g4

타입 스크립트는 자바스크립트로 컴파일 됩니다. 타입스크립트는 자바스크립트이지만 자바스크립트를 더 잘 작성할 수 있게 해주는 언어에 불과합니다.

타입스크립트를 배우기 전에 자바스크립트를 잘 해야 합니다. 마이크로 소프트에서 VScode도 개발하고 타입스크립트도 개발합니다.

```sh
npm i typescript -g
```

타입 스크립트 전역 설치입니다.

```ts
let username = 'Jake';
console.log(username);
```

위 코드 main.ts가 있는 디렉토리에서 아래 코드를 실행합니다.

```sh
tsc main.ts
```

main.js로 컴파일해줍니다. 타입 스크립트는 옛날 브라우저를 기준으로 컴파일 시켜주기 때문에 아래처럼 컴파일 해줍니다.

```js
var username = 'Jake';
console.log(username);
```

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        background-color: #000;
      }
    </style>
    <script src="main.js"></script>
  </head>
  <body></body>
</html>
```

위 코드를 라이브 서버로 실행하면 컴파일 된 자바스크립트가 실행됩니다.

하지만 문제가 있습니다. 컴파일을 여러번 계속 다시 해줘야 합니다. 다른 방법이 있습니다.

```sh
tsc main.ts -w
```

위 명령으로 처리하면 됩니다. SCSS를 실시간 컴파일 하듯이 처리합니다.

일반적으로 프로젝트를 만들 때는 아래 디렉토리 구조를 갖고 있습니다.

```
build/
    index.html
src/
    main.ts
tsconfig.json
```

```sh
tsc --init # tsconfig.json 설치
```

tsconfig.json은 컴파일러 설정하는 파일입니다. 기준 위치와 출력 위치를 정하는 것으로 시작할 수 있습니다.

```json
"include": ["src"]
```

위로 설정하면 src 파일에서 생성한 것만 컴파일하도록 설정할 수 있습니다.

```ts
let a = 12;
let b = '6';
let c = 2;

console.log(a / b);
```

정적 언어에서는 불가능한 계산입니다. 자바스크립트는 가능하지만 타입스크립트는 에러를 돌려줍니다.

과거 자바스크립트 프로젝트랑 하위 호환하면서 작업 진행은 가능합니다.

noEmitOnError 설정을 확성화하는 것으로 에러가 발생할 때 컴파일을 정지시킬 수 있습니다.

```sh
tsc --noEmitOnError -w
```

으로 컴파일 설정을 해둘 수 있습니다.

## TIL.22.12.30. - 타입스크립트 예습

### Typescript Basic Types - Beginners Lesson

타입 스크립트 용어들입니다. 강형 타입 언어는 자료형을 명시하면서 프로그래밍하는 언어입니다. 동적 자료형 언어는 자료형을 명시할 필요가 없습니다.

strictly typed와 strongly typed는 다릅니다. loosely typed는 dynamic typed랑 다릅니다.

타입 스크립트는 컴파일할 때 자료형을 검토합니다. 자바스크립트는 런타임에 자료형을 검토합니다.

타입 스크립트는 용어가 혼란스러울 수 있습니다. 또 타입 스크립트는 자료형을 추론할 수 있습니다.

```ts
let username = 'Jake';
console.log(username);
```

이렇게 작성하면 문자열을 이미 암시만 하고 있습니다.

```ts
let username: string = 'Jake';
console.log(username);
```

이렇게 하면 명시하는 것입니다. 이 자료형을 명시하면

```ts
let username: string = 'Jake';

username = 24;
username = '';
console.log(username);
```

이렇게 하면 24에서 에러가 발생합니다. 오직 해당하는 식별자에 문자열만 재할당할 수 있습니다. 물론 이렇게 해서 데이터를 재할당하는 것을 막는 것은 전혀 아닙니다. 자료형이 의도한 자료형 한정으로 재할당이 가능합니다.

아주가끔 any를 사용해야 할 때는 있지만 가능하면 사용하지 않는 것이 좋습니다. 타입스크립트의 의미가 퇴색됩니다.

```ts
const num = (a, b) => {
  return a + b;
};
```

위처럼 작성하면 에러가 발생할 것입니다. 자바스크립트는 정상작동할 것이지만 함수 매개변수로 정의하면 매개변수의 자료형은 기본적으로 any에 해당하기 때문에 에러를 돌려줍니다.

```ts
const num = (a: number, b: number) => {
  return a + b;
};
```

이렇게 작성해야 정상 작동합니다.

```ts
let album: string | number; // 문자열 혹은 숫자형
```

이렇게 작성하면 2가지 자료형 모두 받을 수 있습니다. 유니언 타입이라고 부릅니다.

```ts
let postId: string | number; // id를 정의할 때 사용할 수 있습니다.
let isActive: number | boolean; // 사용자 수를 추적하기 위해 사용할 수 있습니다.
```

```ts
let re: RegExp = /\w+/g; // 정규표현식
```

특수한 자료형도 이렇게 표현할 수 있습니다.

### Typescript Objects, Arrays, Tuples & Enums | Basics Tutorial

타입스크립트 객체, 배열, 튜플, 이넘(Enums) 기본을 배웁니다.

```ts
let stringArr = ['one', 'hey', 'Jake'];

let guitars = ['Strat', 'Les Paul', 5150];

let mixedData = ['EVH', 1984, true];
```

타입스크립트에서 지금 상태에서 자료를 추론할 때는 지금 입력한 자료를 유니언 타입으로 추론합니다.

```ts
let stringArr = ['one', 'hey', 'Jake'];

let guitars = ['Strat', 'Les Paul', 5150];

let mixedData = ['EVH', 1984, true];

stringArr[0] = 'asdf'; //문제 없는 코드
stringArr.push('asdf'); //문제 없는 코드
stringArr[0] = 24; //에러
stringArr.push(56); // 에러

guitars[0] = 'asdf'; //문제 없는 코드
guitars[0] = 456; //문제 없는 코드
guitars[1] = true; // 에러
```

처음 정의할 때 배열에 들어가 있는 자료형을 기준으로 추론합니다.

```ts
let test = []; // test:any[]로 추론
```

정의하면서 배열에 들어갈 수 있는 자료형을 다음과 같이 정의할 수 있습니다.

```ts
let bands: string[] = [];

bands.push('offspring'); // 자료형이 맞기 때문에 에러 없음
```

타입 스크립트에서 배열은 위치가 자유롭습니다.

더 엄격하게 위치와 배열 크기와 자료형을 정의하는 경우 튜플을 사용하면 됩니다.

```ts
let myTuple: [string, object] = ['Jake', {}];

myTuple.push(456); // 에러: 튜플은 자료 추가 불가능
```

useState처럼 정의할 수 있습니다.

```ts
let myObj: object;
myObj = [];
console.log(typeof myObj); // object 재할당 에러가 없습니다.
```

```ts
const exampleObj = {
  prop1: 'Jake',
  prop2: true,
};
```

각각의 키별로 자료형이 정해집니다. 하지만 여기서 의문이 생길 수 있습니다. 자료형 주석을 추가하고 싶으면 어떻게 해야하는가?

```ts
type Guitarist = {
  name: string;
  active: boolean;
  albums: (string | number)[];
};

let evh: Guitarist = {
  name: 'offspring',
  active: true,
  albums: ["kid's"],
};
```

`type`으로 객체의 각 자료형에 주석을 정의할 수 있습니다.

하지만 이렇게 정의하고 키와 값 중 하나를 배출하면 에러를 발생시킵니다. 또 추가도 못합니다.

이런 설정을 선택적으로 변경하는 방법이 있습니다.

```ts
type Guitarist = {
  name: string;
  active: boolean;
  albums?: (string | number)[];
};

let evh: Guitarist = {
  name: 'offspring',
  active: true,
};
```

속성 하나를 삭제해도 에러가 발생하지 않습니다.

```ts
type Guitarist = {
  name: string;
  active: boolean;
  albums?: (string | number)[];
};

let evh: Guitarist = {
  name: 'offspring',
  active: true,
};

const greetGuitarist = (greetGuitarist: Guitarist) =>
  `Hello, ${greetGuitarist.name}`;
```

이렇게 매개 변수 말고 외부에 매개변수를 정의할 수 있습니다.

타입 스크립트를 배우기 시작할 때 `interface`랑 `type`는 개인 취향에 따라 알아서 사용합니다. 하지만 나중에 객체지향 패턴의 깊은 지식을 활용해서 구분합니다.

Enums는 일반적인 자바스크립트에서 당연히 본적없는 자료형입니다.

```ts
enum Grade {
  U = 1,
  D,
  C,
  B,
  A,
}

console.log(Grade.U);
```

배열의 시작과 끝을 정의하는 특수한 자료형입니다.

### Typescript Functions | Basics Tutorial for Beginners

type aliases, functions, literal types, never type을 공부합니다.

```ts
// type aliases
type Guitarist = {
  name?: string;
  active: boolean;
  albums: (string | number)[];
};
```

이것을 타입 에일리어스라고 합니다. 객체 이외 자료형에도 사용할 수 있습니다.

```ts
type stringOrNumber = string | number;

type stringOrNumberArray = (string | number)[];

type Guitarist = {
  name?: string;
  active: boolean;
  albums: (string | number)[];
};

type userId = stringOrNumber;
```

type으로 자료형을 유형을 정의하는 것입니다.

interface는 클래스의 인스턴스처럼 생각하도록 합니다.

```ts
// Literal type

let myName: 'Jake';
```

리터럴로 자료형을 정의할 수 있습니다.

```ts
let userName: 'Dave' | 'John' | 'Amy';
userName = 'Amy'; // 에러 없음
```

재할당의 범위를 이렇게 축소하는 것으로 카테고리를 설정하는 것같은 로직을 만들 수 있습니다. 당연히 숫자에도 적용할 수 있습니다. 이런 방법으로 코드 재사용성을 높일 수 있습니다.

```ts
// function
const add = (a, b) => {
  return a + b;
};
```

타입 스크립트는 이럴 때 에러를 돌려줍니다.

```ts
const add = (a: number, b: number) => {
  // 에러가 사라집니다.
  return a + b;
};
```

```ts
const add = (a: number, b: number): number => {
  return a + b;
};
```

이렇게 작성해서 반환하는 저료형을 지정할 수 있습니다.

`void`는 반환 값이 없는 함수입니다. 즉 사이드이펙트를 발생시키는 함수입니다.

```ts
const logMsg = (message: string): void => console.log(message);
```

타입 스크립트는 자료형에 맞지 않는 값을 대입하면 피드백을 제공합니다.

```ts
const add = (a: number, b: number): number => {
  return a + b;
};

add('a', 3); // 에러가 발생합니다.
```

재사용할 type을 정의하고 호출하는 것도 가능합니다.

```ts
// function
const add = (a: number, b: number): number => {
  return a + b;
};

const subtract = (a: number, b: number): number => {
  return a - b;
};

// 타입 정의
type mathFunc = (a: number, b: number) => number;

// 타입 호출
let multiply: mathFunc = (a, b) => {
  return a * b;
};
```

함수의 입출력할 자료형을 정의하고 재사용할 수 있습니다.

```ts
type mathFunc = (a: number, b: number) => number;

interface mathFunc {
  (a: number, b: number): number;
}
```

둘은 동일한 기능을 하지만 독자로서 맥락에 따라 다르게 사용해야 한다는 것을 파악할 수 있습니다. 인터페이스 답게 메서드처럼 생겼습니다. 반면 함수 자료형은 함수처럼 생겼습니다.

```ts
// 선택적으로 인자 대입가능하게 정의하기
const addAll = (a: number, b: number, c?: number): number => {
  // 타입 가드
  if (typeof c !== 'undefined') return a + b + c;
  return a + b;
};
```

당연히 매개변수의 순서가 영향을 주는 것은 자바스크립트랑 동일합니다.

```ts
const addAll = (a: number, b: number, c: number = 0): number => {
  return a + b + c;
};
```

이렇게 하면 타입 가드가 사라집니다.

Rest 매개변수입니다.

```ts
const total = (...nums: number[]): number =>
  nums.reduce((prev, curr) => prev + curr);
```

이렇게 Rest 자료형을 지정하면서 함수에 대입이 가능합니다. 하지만 여기서 콜백 함수에서는 자료형을 지정하지 않았는지 의문이 발생할 수 있습니다. 이미 자료형을 지정했기 때문에 괜찮습니다.

아주 가끔 필요하고 유용한 자료형이 있습니다.

```ts
// 에러
const createError = (errMsg: string): never => {
  throw new Error(errMsg);
};

// 무한 루프
const infinite = (): never => {
  let i: number = 1;
  while (true) {
    i++;
  }
};

// 응용해볼 수 있는 경우입니다.
const numberOrString = (value: number | string): string => {
  if (typeof value === 'string') return 'string';
  if (typeof value === 'number') return 'number';
  return createError('발생하면 안 됩니다.');
};
```

커스텀 타입 가드를 만드는 방법입니다.

```ts
// 커스텀 타입 가드
const isNumber = (value: any): boolean => {
  return typeof value === 'number';
};

// 응용해볼 수 있는 경우입니다.
const numberOrString = (value: number | string): string => {
  if (typeof value === 'string') return 'string';
  if (isNumber(value)) return 'number';
  return createError('발생하면 안 됩니다.');
};
```

이런 방법으로 커스텀 타입 가드를 만들 수 있습니다.

## TIL.23.01.13. - 타입스크립트 문제풀이(2점)

https://github.com/total-typescript/beginners-typescript-tutorial

https://www.totaltypescript.com/tutorials/beginners-typescript/implicit-any-type-error

# The Implicit ‘Any’ Type Error(절대적인 any 자료형 에러)

```sh
npm run exercise 01
```

```ts
import { expect, it } from 'vitest';

export const addTwoNumbers = (a: number, b: number): number => {
  return a + b;
};

it('Should add the two numbers together', () => {
  expect(addTwoNumbers(2, 4)).toEqual(6);
  expect(addTwoNumbers(10, 10)).toEqual(20);
});
```

타입스크립트는 함수를 생성할 때마다 매개변수의 자료형을 정해줘야 합니다. 함수를 만들 때 각 매개변수마다 정해줘야 합니다. 엄격모드에서 피드백을 제공합니다. any 타입은 피할 타입인데 사용하고 있다고 경고해주는 것입니다.

단연히 타입스크립트는 엄격모드를 활성화 해야 합니다. 안하는 사람도 있지만 초심자일수록 더욱더 엄격모드를 권장합니다.

# Working with Object Params(객체 매개변수 다루기)

```ts
import { expect, it } from 'vitest';

export const addTwoNumbers = (params) => {
  return params.first + params.second;
};

it('Should add the two numbers together', () => {
  expect(
    addTwoNumbers({
      first: 2,
      second: 4,
    })
  ).toEqual(6);

  expect(
    addTwoNumbers({
      first: 10,
      second: 20,
    })
  ).toEqual(30);
});
```

이 에러를 해결하도록 합니다.

```ts
import { expect, it } from 'vitest';

interface numbers {
  first: number;
  second: number;
}

export const addTwoNumbers = (params: numbers): number => {
  return params.first + params.second;
};

it('Should add the two numbers together', () => {
  expect(
    addTwoNumbers({
      first: 2,
      second: 4,
    })
  ).toEqual(6);

  expect(
    addTwoNumbers({
      first: 10,
      second: 20,
    })
  ).toEqual(30);
});
```

이렇게 풀었습니다. 이 문제를 풀수 있을 때는 다양하게 풀 수 있습니다. 객체의 각각의 요소를 인라인으로 해결할 수 있습니다.

```ts
import { expect, it } from 'vitest';

export const addTwoNumbers = (params: { first: number; second: number }) => {
  return params.first + params.second;
};

it('Should add the two numbers together', () => {
  expect(
    addTwoNumbers({
      first: 2,
      second: 4,
    })
  ).toEqual(6);

  expect(
    addTwoNumbers({
      first: 10,
      second: 20,
    })
  ).toEqual(30);
});
```

```ts
import { expect, it } from 'vitest';

type AddTwoNumbersArgs = {
  first: number;
  second: number;
};

export const addTwoNumbers = (params: AddTwoNumbersArgs) => {
  return params.first + params.second;
};

it('Should add the two numbers together', () => {
  expect(
    addTwoNumbers({
      first: 2,
      second: 4,
    })
  ).toEqual(6);

  expect(
    addTwoNumbers({
      first: 10,
      second: 20,
    })
  ).toEqual(30);
});
```

이것은 2번째 방법입니다. 마지막 방법은 이미 한 풀이입니다.

interface의 단점은 객체에만 적용될 수 있습니다.

interface이든 type을 사용하든 취향 문제입니다.

타입 엘리어스(별칭)를 사용하면 읽기 더 쉽습니다. 타입 엘리어스를 자주 만들기를 권장합니다. 하지만 처음 공부할 때는 안해도 괜찮습니다.

# Set Properties as Optional

```ts
import { expect, it } from 'vitest';

export const getName = (params: { first: string; last: string }) => {
  if (params.last) {
    return `${params.first} ${params.last}`;
  }
  return params.first;
};

it('Should work with just the first name', () => {
  const name = getName({
    first: 'Matt',
  });

  expect(name).toEqual('Matt');
});

it('Should work with the first and last name', () => {
  const name = getName({
    first: 'Matt',
    last: 'Pocock',
  });

  expect(name).toEqual('Matt Pocock');
});
```

```ts
import { expect, it } from 'vitest';

export const getName = (params: { first: string; last?: string }) => {
  if (params.last) {
    return `${params.first} ${params.last}`;
  }
  return params.first;
};

it('Should work with just the first name', () => {
  const name = getName({
    first: 'Matt',
  });

  expect(name).toEqual('Matt');
});

it('Should work with the first and last name', () => {
  const name = getName({
    first: 'Matt',
    last: 'Pocock',
  });

  expect(name).toEqual('Matt Pocock');
});
```

제가 풀이한 정답입니다. ?를 선택적으로 입력하는 매개변수로 지정했습니다. 이게 있으면 객체 속성을 선택적으로 넣을 수 있게 해줍니다.

# Optional Parameters(선택적 매개변수)

```ts
import { expect, it } from 'vitest';

export const getName = (first: string, last?: string) => {
  if (last) {
    return `${first} ${last}`;
  }
  return first;
};

it('Should work with just the first name', () => {
  const name = getName('Matt');

  expect(name).toEqual('Matt');
});

it('Should work with the first and last name', () => {
  const name = getName('Matt', 'Pocock');

  expect(name).toEqual('Matt Pocock');
});
```

이전 문제와 동일합니다.

# Assigning Types to Variables

```ts
import { expect, it } from 'vitest';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

/**
 * How do we ensure that defaultUser is of type User
 * at THIS LINE - not further down in the code?
 */
const defaultUser = {};

const getUserId = (user: User) => {
  return user.id;
};

it('Should get the user id', () => {
  expect(getUserId(defaultUser)).toEqual(1);
});
```

```ts
import { expect, it } from 'vitest';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

/**
 * How do we ensure that defaultUser is of type User
 * at THIS LINE - not further down in the code?
 */
const defaultUser: User = {
  id: 1,
  firstName: 'Jake',
  lastName: 'the dog',
  isAdmin: true,
};

const getUserId = (user: User) => {
  return user.id;
};

it('Should get the user id', () => {
  expect(getUserId(defaultUser)).toEqual(1);
});
```

객체에는 인터페이스로 지정해서 특정 속성값이 없으면 에러가 발생하도록 합니다. 또 유용한 자동완성도 활용할 수 있습니다.

특정 식별자에 특정 자료형 요건을 정의하기 유용한 방식입니다.

# Constraining Value Types(값 자료형의 제약)

```ts
interface User {
  id: number;
  firstName: string;
  lastName: string;
  /**
   * How do we ensure that role is only one of:
   * - 'admin'
   * - 'user'
   * - 'super-admin'
   */
  role: string;
}

export const defaultUser: User = {
  id: 1,
  firstName: 'Matt',
  lastName: 'Pocock',
  // @ts-expect-error
  role: 'I_SHOULD_NOT_BE_ALLOWED',
};
```

문제는 role이 `admin`, `user`, `super-admin` 중 하나여야 합니다.

```ts
interface User {
  id: number;
  firstName: string;
  lastName: string;
  /**
   * How do we ensure that role is only one of:
   * - 'admin'
   * - 'user'
   * - 'super-admin'
   */
  role: 'admin' | 'user' | 'super-admin';
}

export const defaultUser: User = {
  id: 1,
  firstName: 'Matt',
  lastName: 'Pocock',
  // @ts-expect-error
  role: 'I_SHOULD_NOT_BE_ALLOWED',
};
```

유니언 타입을 사용한 것으로 문제를 해결한 것입니다. 생각보다 많이 사용합니다. 자료형의 유형을 정의할 수 있게 해줍니다. 학생, 교직원, 교수, 연구원처럼 대학교에서 구분하는 것처럼 구분도 가능합니다.

# Working with Arrays(배열 다루기)

```ts
interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'super-admin';
  posts: Post;
}

interface Post {
  id: number;
  title: string;
}

export const defaultUser: User = {
  id: 1,
  firstName: 'Matt',
  lastName: 'Pocock',
  role: 'admin',
  posts: [
    {
      id: 1,
      title: 'How I eat so much cheese',
    },
    {
      id: 2,
      title: "Why I don't eat more vegetables",
    },
  ],
};
```

문제입니다.

```ts
interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'super-admin';
  posts: Post[];
}

interface Post {
  id: number;
  title: string;
}

export const defaultUser: User = {
  id: 1,
  firstName: 'Matt',
  lastName: 'Pocock',
  role: 'admin',
  posts: [
    {
      id: 1,
      title: 'How I eat so much cheese',
    },
    {
      id: 2,
      title: "Why I don't eat more vegetables",
    },
  ],
};
```

정답입니다. 2가지가 정답이 있습니다.

제네릭을 사용하는 방법입이 있습니다.

```ts
interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'super-admin';
  posts: Array<Post>;
}

interface Post {
  id: number;
  title: string;
}

export const defaultUser: User = {
  id: 1,
  firstName: 'Matt',
  lastName: 'Pocock',
  role: 'admin',
  posts: [
    {
      id: 1,
      title: 'How I eat so much cheese',
    },
    {
      id: 2,
      title: "Why I don't eat more vegetables",
    },
  ],
};
```

조금더 복잡한 상황에서 많이 사용합니다. map, set, recode, promise에서 많이 사용합니다. 일단은 배열도 이런 표기가 가능합니다.

## TIL.23.01.16. - 타입스크립트 정리

타입스크립트를 공부하기 시작하면 인간적으로 아래있는 것들은 무조건 알았으면 합니다. 어디가 사람취급 받거나 사람 비슷한 흉내라도 내고 싶으면 아래는 무조건 알아야 합니다.

- [ ] Typescript를 왜 사용해야하는 지 이해할 수 있다.
- [ ] Typescript와 Javascript의 차이에 대해 설명할 수 있다.
- [ ] 왜 Typescript를 Javascript로 변환해야하는 지 설명할 수 있다.
- [ ] Typescript의 기본타입이 어떠한 것이 있는 지 알고 사용할 수 있다.
- [ ] Typescript로 함수를 작성할 수 있으며, Optional Parameter를 사용할 수 있다.
- [ ] 필요에 따라 Union 타입를 사용할 수 있다.
- [ ] interface와 type를 사용할 수 있다.

# 1. 타입스크립란?

https://www.youtube.com/watch?v=Zck22jkGPNA

https://likeable-eggnog-5b5.notion.site/1-0ea38dc1fb9044a9a629766183f0f5a2

- Typescript 간단 소개
- Typescript vs Javascript 비교
- 왜 Typescript을 사용해야하나?

타입스크립트는 타입을 위한 문법을 더한 것입니다. 시작은 이렇게 하면 좋습니다.

타입스크립트는 타입이 추가된 자바스크립트에 불과합니다. 편리함을 추가해준 것입니다.

타입스크립트는 자바스크립트의 수퍼셋입니다. CSS와 SCSS처름 이미 있는 기능에 부가기능을 더해준 것과 비슷합니다.

자바스크립트는 동적타입 그리고 타입스크립트는 정적타입을 가지고 있습니다. 자료형의 형변환이 어렵습니다.

```js
let num = 3;
num = '삼';
```

자바스크립트는 동적타입을 갖고 있기 때문에 형변환을 에러로 안 봅니다. 의도면 상관없습니다.

하지만 동일한 행동을 타입스크립트에서 하면 에러가 발생합니다.

이유는 이미 숫자형으로 타입을 추론하고 있는데 문자열을 식별자에 재할당하게 되면 에러를 발생시킵니다.

이제는 프론트엔드 언어가 조금 정상적인 언어스러운 흉내를 내려고 합니다.

타입스크립트는 컴파일타임(자바스크립트로 변환할 때)에서 타입을 결정합니다. 자바스크립트는 런타임(실행)에 결정합니다.

VScode는 유용하게도 컴파일타임에서 에러가 발생할 것을 미리 알려줍니다.

타입스크립트를 사용하는 이유입니다. 장단점만 비교하면 가치를 쉽게 알 수 있습니다.

|            | 장점                                                                                                                                                                                                                           | 단점                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Typescript | 1. Microsoft에서 만들었고 꾸준히 업데이트한다 <br/> 2. 생태계가 크다 <br/> 3. Microsoft에서 개발한 vscode와 잘 맞는다 <br/>4. 여러분이 사용하는 대부분의 lib에서 타입 정의 파일을 제공한다 <br/> 5. 유지보수가 JS보다 유리하다 | 1. Javascript에 비해 어렵다                                                                                                   |
| Javascript | 1. 다른 언어에 비해 쉽다                                                                                                                                                                                                       | 1. 적은 양의 코딩을 할 때 쉽고 빠르게 가능 <br/> 2. 런타임 시 오류가 검출 <br/> 3. 프로젝트 사이즈가 커지면 유지보수가 어렵다 |

# 타입스크립트 세팅

temp는 연습 폴더입니다.

```sh
npm init -y
```

프로젝트 초기설정입니다.

```sh
npm install typescript
```

해당한 폴더에서 사용하겠다는 명령입니다. 많은 사람들이 전역 설치를 하기도 합니다.

```sh
npm install -g typescript
```

-g 플레그로 가능합니다.

```sh
npx tsc --init
```

tsx는 타입스크립트 컴파일러를 의미합니다. 이 커맨드를 입력하면 tsconfig 파일이 생성됩니다.

tsconfig 파일을 보면 타입스크립트 설정을 다양하게 할 수 있습니다.

여기서 target은 목표로 하는 자바스크립트 버전입니다. 해당하는 버전의 자바스크립트로 컴파일하겠다는 설정입니다.

module은 타입스크립트를 자바스크립트로 변환할 때 import 문법을 지정하는 법을 제어합니다. commonjs는 과거 문법입니다.

타입스크립트를 자바스크립트로 변환하는 것은 트렌스파일링이지만 컴파일러라 할 수 있기는 합니다.

```ts
// hello.ts
export const helloFunc = () => {
  console.log('hello');
};
```

```ts
import { helloFunc } from './hello';

const str = 'TS';

const hi = () => {
  console.log(`Hello ${str}!`);
};

helloFunc();
```

예를 들어 이런 코드가 있습니다.

```sh
npx tsc
```

이 명령을 하면 자바스크립트로 컴파일(트렌스파일)이 됩니다.

근본적으로 브라우저는 타입스크립트를 이해할 수 없습니다.

```sh
node hi.js
```

참고로 컴파일된 자바스크립트를 읽고 이해할 필요는 없습니다. 타입스크립트가 좋은 추상화를 제공하기 때문에 필요하지 않습니다.

ES5와 ES6 사이 버전별로 지원하는 언어 기능이 다릅니다.

```js
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const hello_1 = require('./hello');
const str = 'TS';
const hi = () => {
  console.log(`Hello ${str}!`);
};
(0, hello_1.helloFunc)();
```

```js
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var hello_1 = require('./hello');
var str = 'TS';
var hi = function () {
  console.log('Hello '.concat(str, '!'));
};
(0, hello_1.helloFunc)();
```

es5와 es6에서 지원하는 문법이 없기 때문에 각각 다르게 트렌스파일이 됩니다.

트렌스파일이 필요한 이유는 근본적으로 브라우저는 타입스크립트를 이해하지 못하기 때문에 필요합니다.

# 3. 기본타입

1. https://youtu.be/N1SBVHXW5lA
2. https://youtu.be/5gQPJBve45Q
3. https://youtu.be/3jYAd7d1ns8

https://www.notion.so/3-9c1cd3359dee4039ab3553e7579d11d7

타입스크립트 기본 타입들입니다.

타입스크립트에서 string은 동일합니다. 특별한 부가 기능은 없습니다.

```ts
let str: string = 'TypeScript';

// : <- 타입 표기(Type Annotation)

str = 123; // Error
str = true; // Error
str = undefined; // Error

let fullName: string = `NBC`;
let age: number = 10;
let sentence: string = `my name is ${fullName}. I'm ${age + 1} years old`;
```

이런 것은 타입 표기인데 이렇게 원시형 하나 지정할 때는 하는게 안티패턴입니다. 타입스크립트가 이미 타입추론을 지원해주고 있고 이 기능에 의존하면 됩니다.

숫자형입니다. 동일합니다. 10진수, 16진수처럼 표현과 ES6에서 2진수 8진수 표현을 지원합니다. 이것은 교양입니다.

타입 표기로 진수표현도 가능합니다.

```ts
let num: number = 123;

let decimal: number = 6;
let hex: number = 0xf00d; //16진수
let binary: number = 0b1010; // 2진수
let octal: number = 0o744; // 8진수
```

부울리안도 동일합니다. 이런 원시형에는 자바스크립트랑 차이가 없습니다.

배열 표기법입니다. 타입스크립트는 배열을 명시적으오 표기할 수 있습니다. 배열의 원소들의 타입을 지정하는 법들이 있습니다.

```ts
let arr: number[] = [1, 2, 3];
let array: Array<number> = [1, 2, 3];

let arr2: string[] = ['1', '2', '3'];
let arr3: boolean[] = [true, false, true];
```

`타입[]`이런 표기법을 많이 사용합니다. 하지만 `Array<number>`같은 표기법도 나중에 배우지만 알아야 하는 방법입니다.

제네릭에 대한 표기법으로 작성하는 부분은 나중에 배우고 상당히 중요한 부분입니다.

튜플타입은 요소의 타입과 배열의 크기를 고정시킬 수 있습니다.

```ts
let x: [string, number];
x = ['hi', 1];
x = [1, 'hi']; // Error
console.log(x[0], x[1]);
console.log(x[2]); // Error

x[2] = 'world'; // Error

let tuple: [string, number, boolean] = ['str', 1, false];
```

배열의 원소마다 타입을 지정해줘야 합니다.

참고로 타입스크립트를 컴파일과 실행을 같이할 수 있는 라이브러리가 있습니다.

```sh
npm install -g ts-node
```

```sh
ts-node (타입스크립트 파일이름)
```

이 명령으로 타입스크립트를 바로 console.log해서 볼 수 있습니다.

any는 자바스크립트의 모든 변수에 해당하게 만들 수 있습니다.

```ts
let str: any = 'hi';
let num: any = 10;
let arr: any = ['a', 2, true];
```

잠깐 디버깅하기 위해 풀어놓는 것 말고 자제하도록 합니다.

이렇게 사용하게 되면 타입스크립트의 의미가 퇴색됩니다. 최후의 방법으로도 자제하려고 합니다.

Void입니다. 함수의 반환값이 없을 때의 타입입니다.

```ts
function c(): void {
  console.log('c');
}
```

함수가 반환값이 없다고 지정하기 위해 사용하는 타입입니다. 변수의 타입으로 지정하는 경우가 없습니다.

```ts
// 아래 코드를 제외하고 이 변수들에 할당할 수 있는 값이 없습니다!
let a: null = null;
let b: undefined = undefined;

let unionType: number | null = null;
```

null과 undefined는 각각의 변수에 할당할 수 있는 값이 없기 때문에 유니언 타입으로 같이 사용합니다. 예를 들어 useState가 서버에서 데이터를 가져오기 전까지 null로 지정하고 가져오고 나면 객체를 원소로 담은 배열을 자주 사용하는 패턴 중 하나입니다.

Never는 함수가 비정상적인 종료 혹은 끝까지 실행될 때 의미하는 타입니다.

```ts
function a(): never {
  while (true) {}
}

function b(): never {
  throw new Error('Error');
}
```

a는 무한루프가 발생합니다. b는 에러가 발생해서 그 아래 실행되지 않을 때 사용합니다.

무한 루프가 발생하고 그 뒤에 실행이 없거나 에러로 정상종료하지 않을 때 사용합니다.

3년 정도 시리즈 C 라운이 스타트업에서 프론트엔드 엔지니어로 일했지만 거의 사용해본적이 없는 타입이었습니다.

존재를 알고 또 면접용으로 알아둡니다.

# 함수 타입

https://www.youtube.com/watch?v=wE2aBy-Ojqk
https://www.youtube.com/watch?v=5BZD9HFxcyo

https://likeable-eggnog-5b5.notion.site/4-feeae4c1b6cf4622a67d575dcfccb732

```js
function add(n1, n2) {
  return n1 + n2;
}
```

합산에 사용하는 자바스크립트 함수입니다.

```ts
function add(n1: number, n2: number): number {
  return n1 + n2;
}
```

하지만 타입스크립트는 매개변수와 반환값의 타입을 지정해줘야 합니다. 하지만 반환타입은 상황에 따라 생략할 수 있습니다. 타입스크립트는 그정도로 타입추론을 잘하고 똑똑합니다.

반환값 타입지정은 컨벤션 문제입니다.

하지만 매개변수에는 지정을 해줘야 합니다.

```ts
function printResult(num: number): void {
  console.log('Result' + num);
}

printResult(5);
```

반환값이 없을 때 지정하는 방법입니다.

매개변수를 선택적으로 넣는 상황들이 있습니다.

```ts
function add2(n1: number, n2?: number): number {
  if (!n2) return n1;
  return n1 + n2;
}

const a2 = add2(1, 2);
const b2 = add2(10, 20, 30); // Error
const c2 = add2(10);
```

길이가 정해지고 할당을 Optional로 대입할 때 대입을 안 하면 undefined가 됩니다.

`n2?: number`는 `n2: number | undefined`랑 실행할 때는 동일합니다. 하지만 `n2: number | undefined`으로 작성하면 호출할 때 `undefined`를 대입해줘야 합니다.

```ts
function add2(n1: number, n2?: number): number {
  if (!n2) return n1;
  return n1 + n2;
}

const a2 = add2(1, 2);
const c2 = add2(10);

console.log(a2, c2); // 3 10
```

```ts
function add2(n1: number, n2: number | undefined): number {
  if (!n2) return n1;
  return n1 + n2;
}

const a2 = add2(1, 2);
const c2 = add2(10); // 에러가 발생합니다. undefined라도 대입해야 합니다.
```

할당이 안 되어 있으면 기본값을 할당하는 매개변수입니다. 자바스크립트에서 제공하는 기능이지만 타입을 지키기 위해 타입스크립트에서 많이 사용하게 되는 언어의 기능입니다.

```ts
function add3(n1: number, n2: number = 0): number {
  if (!n2) return n1;
  return n1 + n2;
}

const a3 = add3(1, 2);
const c3 = add3(10);
```

할당하지 않는 상황이 있으면 이렇게 간단하게 예외처리할 수 있습니다.

```ts
function add4(n1: number, ...nums: number[]): number {
  let totalOfNums = 0;
  for (let key in nums) {
    totalOfNums += nums[key];
  }
  return n1 + totalOfNums;
}

const result = add4(10, 20, 30, 40);
```

함수에 동적으로 대입하는 상황은 상당히 자주 있습니다. 배열 혹은 객체를 함수 매개변수에 원소별로 대입하는 방법입니다.

Rest Parameter는 기본적으로 자료형이 배열입니다.

# enum 타입

https://www.youtube.com/watch?v=M487zkMaYqM

https://likeable-eggnog-5b5.notion.site/5-enum-bea6ccb283f646848530270ac3bd9031

이넘은 enumeration의 줄임말입니다. 타입스크립트에만 존재하는 자료형입니다. 특정 값들을 열거합니다.

객체랑 많이 닮았습니다.

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

const up: Direction = Direction.Up;
// Direction = Direction.UP | Direction.Down | Direction.Left | Direction.Right
const leftOrRight: Direction.Left | Direction.Right = Direction.Left;
```

이넘은 내부적으로 순서가 존재합니다.

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

console.log(Direction.Up, Direction.Down, Direction.Left, Direction.Right);
// 0 1 2 3
```

이렇게 로그가 찍힙니다.

수동으로 인덱스 번호를 변경할 수 있습니다. 하지만 연속되기 때문에 하나의 값을 바꾸면 그 뒤 다른 원소의 인덱스 모두 업데이트 됩니다. 이것을 보고 auto increment라고 부릅니다.

```ts
enum Direction {
  Up,
  Down = 42,
  Left,
  Right,
}

console.log(Direction.Up, Direction.Down, Direction.Left, Direction.Right);
// 0 42 43 44
```

이넘의 값을 활용해서 키를 알아 낼 수 있습니다. 키를 통해 값을 접근하는 것의 반대입니다.

문자형 이넘은 auto increment를 지원하지 않습니다. 그래서 하나식 수동으로 입력해줘야 합니다.

```ts
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
```

복합형 이넘은 안티패턴입니다. 유지보수하기 어렵게 만들기 때문입니다.

# Union 타입/Type Alias

https://www.youtube.com/watch?v=FIpJX0j_vcM

https://likeable-eggnog-5b5.notion.site/6-Union-Type-Alias-0617bf68395b46e98e1f9ca3f030dd5c

유니언타입과 타입별칭입니다.

유니언 타입은 자바스크립트 or 연산과 유사합니다.

```ts
const printOut = (input: string | number) => {
  console.log(input);
};

printOut('문자열');
printOut(20);
printOut(true);
```

`|` 이것을 보고 파이프연산자(pipe)이라고 부릅니다. 유니온 타입을 만들 때 사용합니다.

유니온 타입의 장점입니다.

```ts
function getAge(age: any) {
  age.toFixed(); // Error
  return age;
}

getAge('20'); // 에러
getAge(20);
```

이럴 때 유니언 타입으로 문제를 해결할 수 있습니다.

```ts
function getAge(age: number | string) {
  if (typeof age === 'number') {
    age.toFixed();
    return age;
  }
  if (typeof age === 'string') {
    return age;
  }
}

getAge('20');
getAge(20);
```

자바스크립트의 typeof 연산자를 활용해서 type을 접근해서 자료별로 예외처리를 할 수 있습니다.

```ts
function padLeft(value: string, padding: any) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value;
  }
  if (typeof padding === 'string') {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

console.log(padLeft('Hello world', 4)); // "    Hello world"
console.log(padLeft('Hello world', '!!!')); // "!!!Hello world"
console.log(padLeft('Hello world', true)); // Error
```

이렇게 컴파일타임에서는 에러는 없지만 런타임에서는 에러가 발생합니다. 다른 자료형이 들어가면 유니언 타입을 먼저 사용하는 것으로 컴파일 타엠에서 에러 피드백을 받도록 합니다.

```ts
function padLeft(value: string, padding: number | string) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value;
  }
  if (typeof padding === 'string') {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

console.log(padLeft('Hello world', 4)); // "    Hello world"
console.log(padLeft('Hello world', '!!!')); // "!!!Hello world"
console.log(padLeft('Hello world', true)); // 컴파일 타임 Error
```

이렇게 작성하면 조기에 에러를 발견할 수 있습니다.

타입 별칭(Type Alias)입니다.

```ts
const hero1: { name: string; power: number; height: number } = {
  name: '슈퍼맨',
  power: 1000,
  height: 190,
};

const printHero = (hero: { name: string; power: number; height: number }) => {
  console.log(hero.name, hero.power);
};

console.log(printHero(hero1));
```

지금 코드를 보면 중복이 상당히 많습니다. 유지보수하면서 에러발생 가능성 코드 수정하면서 얻을 수 있는 유연성이 떨어집니다.

타입을 복붙하는 것은 낭비가 상당히 큽니다.

이런 중복을 제거하기 위해 나온 것이 타입 별칭입니다.

```ts
type hero = {
  name: string;
  power: number;
  height: number;
};

const hero1: hero = {
  name: '슈퍼맨',
  power: 1000,
  height: 190,
};

const printHero = (hero: hero) => {
  console.log(hero.name, hero.power);
};

console.log(printHero(hero1));
```

이렇게 하면 중복을 줄일 수 있습니다.

또 중간에 타입을 추가해줘야 하면 대응도 여러 곳이 아닌 한곳에서 처리할 수 있게 됩니다.

현업에서는 한 폴더에 type.ts이라는 폴더를 만듭니다. 그리고 거기서 import 하는 패턴으로 많이 사용합니다. 코드베이스 전체의 일관성을 갖고도록 합니다.

```ts
// type.ts

type Hero = {
  name: string;
  power: number;
  height: number;
};
```

```ts
import type { Hero } from './type';

const hero1: Hero = {
  name: '슈퍼맨',
  power: 1000,
  height: 190,
};

const printHero = (hero: Hero) => {
  console.log(hero.name, hero.power);
};

console.log(printHero(hero1));
```

코드를 보면 이런 패턴이 될 것입니다.

```ts
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const printDirection = (direction: Direction) => {
  console.log(direction);
};

printDirection('UP');
printDirection('UP!');
```

몇가지 유형만 존재할 때 유니언 타입을 응용해서 전용 타입을 만드는 패턴도 가능합니다.

# 7. interface & Intersection Type

https://likeable-eggnog-5b5.notion.site/7-interface-Intersection-Type-a45ee96cfe95488c9dfff10a2e3fe50f

https://www.youtube.com/watch?v=8l_Iioq-KVc

인터페이스를 공부합니다. 인터페이스는 다른언어를 공부해봤으면 클래스를 구현하기 전에 필요한 메서드와 속성들을 정의할 때 많이 사용합니다. 타입스크립트는 조금더 많은 활용법을 지원합니다.

인테페이스로 타입을 정의하는 방법을 배웁니다.

```ts
interface Person {
  name: string;
  age: number;
}

const person1: Person = { name: 'Jake', age: 30 };
const person2: Person = { name: 'Jake', age: '30' }; // 에러가 발생합니다.
```

선택속성은 옵셔널 파라미터랑 유사합니다.

```ts
interface Person {
  name: string;
  age?: number;
}
```

readonly 속성도 지원합니다.

인터페이스 객체를 처음 할당할 때만 사용할 수 있고 그 이외에는 변경이 불가능합니다.

```ts
interface Person {
  readonly name: string;
  age?: number;
}

const person1: Person = { name: 'Jake', age: 30 };

person1.name = 30; // 에러가 발생합니다.
```

생성한 인스턴스에 뮤테이션을 막습니다.

읽기 전용 배열도 생성할 수 있습니다.

```ts
let readOnlyArr: ReadonlyArray<number> = [1, 2, 3];
```

유틸타입의 제네릭으로 지정해서 이렇게 읽기 전용 배열을 만들 수 있습니다.

읽기 전용 배열은 가끔 사용합니다.

참고로 객체의 인덱스의 자료형을 지정해줘야 합니다. 기본적으로 any에 해당합니다.

```ts
interface Person {
  readonly name: string;
  [key: string]: string | number;
}

const p1: Person = { name: 'js', birthday: '비밀', age: 20 };
```

객체의 키는 문자열로 지정하고 추가가 가능하다는 의미입니다.

키는 문조건 문자열 혹은 숫자형만 지정할 수 있습니다. 그중에서 이 예시는 문자열만 지정한 것입니다.

```ts
interface Person {
  readonly name: string;
  [key: string]: string | number | undefined;
  age?: number;
}

const person1: Person = { name: 'Jake', age: 30, value: 'none' };
```

만약에 Optional하게 지정한 속성은 추가로 `undefined`를 지정해줘야 합니다. 지정을 안 하고 있는 동안 `undefined`를 할당받는 유니언 타입처럼 동작하기 때문입니다.

인터페이스로 함수타입을 생성할 수 있습니다.

```ts
interface Print {
  (name: string, age: number): string;
}

const getNameAndAge: Print = function (name, age) {
  return `name: ${name}, age: ${age}`;
};
```

매개변수와 반환값을 지정한것과 동일합니다.

당연히 type으로도 만들 수 있습니다.

```ts
type Print = (name: string, age: number) => string;

const getNameAndAge: Print = function (name, age) {
  return `name: ${name}, age: ${age}`;
};
```

인터페이스는 메서드처럼 보이지만 타입은 함수처럼 생겼습니다.

컨벤션, 취향에 따라 다릅니다. type을 사용해서 함수처럼 작성할 수 있습니다.

인터페이스 확장입니다. 인터페이스를 확장하고 조합하는 것도 가능합니다.

인터페이스의 `extends` 키워드로 상속받아 추가 속성을 달아둘 수 있습니다.

```ts
interface Person {
  name: string;
  age: number;
}

interface Korean extends Person {
  birth: 'KOR';
}
```

이 코드는

```ts
// 의미는 아래와 같습니다.
interface Korean {
  name: string;
  age: number;
  birth: 'KOR';
}
```

이렇게 확장본을 구체화하면서 만들수 있습니다.

2가지 인터페이스를 모두 상속 받는 것도 가능합니다.

```ts
interface Person {
  name: string;
  age: number;
}

interface Korean extends Person {
  birth: 'KOR';
}

interface Developer {
  job: 'developer';
}

interface KorAndDev extends Korean, Developer {}
```

2개를 각각 상속 받아

```ts
interface KorAndDev {
  name: string;
  age: number;
  birth: 'KOR';
  job: 'developer';
}
```

이런 인터페이스를 만들 수 있습니다.

인터페이스를 조합하고 집합연산을 할 수 있습니다.

```ts
interface Person {
  name: string;
  age: number;
}

interface Developer {
  name: string;
  skill: string;
}

type DevJob = Person & Developer;

const nbcPerson: DevJob = {
  name: 'a',
  age: 20,
  skill: 'ts',
};
```

![타입 합집합 연산](https://user-images.githubusercontent.com/84452145/256959949-37d26a36-8d4f-4df7-8119-c70ddc4344e3.png)

이렇게 인터페이스 혹은 타입을 사용해서 합집합 혹은 교집합 연산을 할수 있습니다. 지금의 경우 합집합 연산을 한 것에 해당합니다.

타입별칭과 인터페이스의 가장 큰 차이는 확장 같은 상속 여부입니다. 인터페이스는 확장이 가능하지만 타입별칭은 불가능합니다.

회사의 컨벤션이 객체지향적이면 인터페이스를 적극적으로 사용하고 함수지향적이면 타입별칭을 조합(compose)하는 패턴으로 작성하면됩니다.

# 8. 제네릭

https://www.youtube.com/watch?v=3swfhXYzYrI

https://likeable-eggnog-5b5.notion.site/8-ad2ace762efd4a17a88f080b87df1128

제네릭이란 타입을 마치 함수의 파라미터처럼 사용하는 것입니다.

```ts
function getText<T>(text: T): T {
  return text;
}

getText<string>('hi');
getText<number>(10);
getText<boolean>(true);
```

이렇게 입력하는 매개변수의 타입와 반환한는 타입을 일치시기는 것처럼 활용할 수 있습니다.

어떤 자료형이든 동적으로 대응할 수 있게 해줍니다.

타입을 저정할 때가 함수를 정의할 때가 아닌 함수를 호출할 때 결정됩니다.

`T` 자체를 매개변수로 읽도록 합니다. T를 사용하는 것은 컨밴션입니다.

```ts
function getItemArray(arr: any[], index: number): any {
  return arr[index];
}

function pushItemArray(arr: any[], item: any): void {
  arr.push(item);
}

const techStack = ['js', 'react'];
const nums = [1, 2, 3, 4];

getItemArray(techStack, 0); // 'js'
pushItemArray(techStack, 'ts'); // ['js', 'react', 'ts']

getItemArray(nums, 0); // 1
pushItemArray(nums, 5); // [1, 2, 3, 4, 5];
```

원래 이렇게 작성한 함수가 있습니다.

여기서 한계는 매개변수를 `any`로 지정하는

프로젝트 전반에 사용하는 유틸함수에 많이 사용하지만 성숙한 프로덕트를 구현할 때는 많이 작성할 일이 없습니다.

프로젝트 규모가 클 때는 타입 추론기능이 잘 동작해도 제네릭을 대입하도록 합니다.

```ts
function getItemArray<T>(arr: T[], index: number): T {
  return arr[index];
}

function pushItemArray<T>(arr: T[], item: T): void {
  arr.push(item);
}

const techStack = ['js', 'react'];
const nums = [1, 2, 3, 4];

getItemArray(techStack, 0); // 'js'
pushItemArray<string>(techStack, 'ts'); // ['js', 'react', 'ts']

// pushItemArray<number>(techStack, 123); // Error

getItemArray(nums, 0); // 1
pushItemArray(nums, 5); // [1, 2, 3, 4, 5];
```

이렇게 지정하면 매개변수는 함수를 호출할 때 제네릭으로 대입할 때 타입이 지정됩니다.

이렇게 해서 any를 사용하는 안티패턴을 피하면서 자료형을 유연하게 대입할 수 있는 함수를 구현할 수 있게 됩니다.

```ts
function printOut<T>(input: T): T {
  console.log(input.length); // Error: T doesn't have .length
  return input;
}
```

제네릭은 타입을 호출할 때 지정하기 때문에 오류가 발생합니다. 정의하는 동안에는 문자열 혹은 배열처럼 `length` 속성이 없습니다. 타입 지정이 안 되어 있기 때문입니다.

타입스크립트는 이 때 오류를 줍니다. 자바스크립트는 에러를 안 돌려줄 것입니다.

```ts
function printOut<T>(input: T[]): T[] {
  console.log(input.length);
  return input;
}

printOut([1, 2, 3]);
```

이런식으로 제네릭으로 배열을 지정하게 될 것이라고 지정할 수 있습니다.

배열은 무조건 `length` 속성이 존재할 것이기 떄문에 에러가 발생하지 않습니다. 즉 배열이라는 사실만 지정하고 배열의 원소는 호출할 때 지정하도록 표현한 것입니다.

제네릭에도 제약 조건이 있습니다.

```ts
function printOut<T>(input: T): T {
  console.log(input.length); // Error: T doesn't have .length
  return input;
}
```

아까 본 동일한 문제를 다른 패턴으로 해결할 수 있습니다.

```ts
interface LengthWise {
  length: number;
}

function printOut<T extends LengthWise>(input: T): T {
  console.log(input.length);
  return input;
}

// printOut(10); // Error, 숫자 타입에는 `length`가 존재하지 않으므로 오류 발생
// printOut({ length: 0, value: 'hi' }); // `input.length` 코드는 객체의 속성 접근과 같이 동작하므로 오류 없음
```

제네릭 매개변수는 LengthWise를 상속받아 length 속성이 존재하게 될 것이라고 타입스크립트에게 알려주는 것입니다. 상속을 받았기 때문에 반드시 존재할 것이라는 것을 알 수 있게 되는 것입니다.

# 타입 추론

https://www.youtube.com/watch?v=j4QX7xw6VWs

https://likeable-eggnog-5b5.notion.site/9-b27d47acab6945b4beea99543196e9a8

정적타입 언어의 단점은 타입을 하나하나 지정하면서 생산성이 떨어질 수 있습니다. 타입스크립트의 경우 타입 추론을 제공하기 때문에 꼭 모두 타입을 지정해줄 필요가 없습니다.

```ts
let a = 123;
let b = 'abc';

a = 'abc';
b = 123;

const c1 = 123;
const c2 = 'abc';

const arr = [1, 2, 3];
const [n1, n2, n3] = arr;
arr.push('a');

const obj = { numId: 1, stringId: '1' };
const { numId, stringId } = obj;
console.log(numId === stringId);
```

타입을 일일이 명시하지 않고 타입이 무엇인지 타입스크립트가 스스로 알아 낼 수 있습니다.

타입 추론은 let, const 마다 각각 다르게 타입을 추론합니다. let이 더 유연하게 추론합니다.

const의 경우 그 원시형을 지정하면 지정한 그 값자체를 타입으로 지정합니다. 하지만 let은 타입의 범위까지 지정합니다.

```ts
const c1 = 123;
```

$$

c1 \supset \{123\}


$$

const는 이렇게 타입을 지정합니다. 숫자형이라는 집합 속에서 123이라는 원소만 고른 것입니다.

$$

let \supset \{number\} \supset \{123\}


$$

let은 숫자형이라는 집합을 지정하는 것이기 때문에 더 유연합니다.

자바스크립트 기초개념을 다시생각해보면 const 식별자는 readonly기 때문에 아주 기초적이고 당연합니다.

배열의 타입 추론입니다.

```ts
const arr = [1, 2, 3];
```

이런 경우 모두 숫자형만 할당하기 때문에 `arr: number[]`으로 생략하고 있습니다.

객체도 비슷합니다.

```ts
const obj = { numId: 1, stringId: '1' };
const { numId, stringId } = obj;
console.log(numId === stringId);
```

당연히 자료형이 다른 것에 비교를 지원하지 않습니다.

```ts
const func1 = (a = 'a', b = 1) => {
  return `${a} ${b};`;
};
func1(3, 6);

const v1: number = func1('a', 1); // 이미 문자열로 추론하고 있기 때문에 에러가 발생합니다.
```

함수의 기본값을 지정하면서 타입추론도 자동적으로 이루어집니다.

```ts
const func2 = (value: number) => {
  if (value < 10) {
    return value;
  } else {
    return `${value} is big`;
  }
};
```

함수가 반환값을 추론할 때는 `return`의 자료형을 기준으로 반환하는 값마다의 자료형을 보고 타입을 지정합니다.
