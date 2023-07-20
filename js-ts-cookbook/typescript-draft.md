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
