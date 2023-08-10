---
sidebar_position: 5
description: '분류하기 애매한 미세팁들'
---

# 분류하기 애매한 미세팁들

## jsDoc `@deprecated`

```js
/** @deprecated */
function inNewEngland(aCustomer) {
  const stateCode = aCustomer.address.state;
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode);
}

inNewEngland();
```

코드 베이스가 극단적으로 거대하고 부분적으로 수정하는게 너무 많은 영역에서 버그를 발생시키고 merge conflict를 발생시킬 것 같으면 `@deprecated` 주석으로 더이상 쓰지말라고 전달하는 전략도 있습니다.

~~ 이 내용은 리덕스가 싫어합니다. ~~

## barrel export

최근 프로젝트에 export하는 방식에 명칭이 barrel export였습니다.

```ts title="foldername/foo.ts"
export function foo() {
  console.log('foo');
}
```

```ts title="foldername/index.ts"
export * from './foo';
```

폴더 내에서 자유롭게 정의하고 모두 `index`로 묶어주면 됩니다.

```ts
import { foo } from '../foldername';

foo();
```

호출할 때는 호출하고자 하는 함수의 내부 계층구조를 알 필요가 없어집니다.

[Barrel - TypeScript Deep dive](https://basarat.gitbook.io/typescript/main-1/barrel)

<!-- @todo: default export랑 섞어 사용해야 하는 경우 추가로 다루기 -->

## URL을 읽는 법

모든 것을 모르는 것은 아닙니다.

URL 인터페이스의 search 속성은 맨 앞의 '?'와 함께 URL의 쿼리 문자열, 즉 검색 매개변수를 나타내는 USVString입니다.

```js
const url = new URL(
  'https://developer.mozilla.org/ko/docs/Web/API/URL/search?q=123'
);
console.log(url.search); // ?q=123
```

위는 MDN 예시입니다. 제가 검색을 이해한다면 다음 응용도 가능합니다.

```js
const url = new URL('https://www.youtube.com/watch?v=WI0ElY2XTAI');
console.log(url.search); // ?v=WI0ElY2XTAI
```

유튜브 영상에서 watch가 path 이고 영상에 해당하는 검색은 뒤 `?v=WI0ElY2XTAI`입니다. 이것을 보고 search라고 부르는 듯합니다.

단순하게 검색이라 말하면 첫번째를 의미합니다.

```js
const string = 'https://example.com/?name=Jonathan%20Smith&age=18';
let params = new URL(string).searchParams;
let name = params.get('name');
let age = parseInt(params.get('age'));
console.log(name, age); // Jonathan Smith 18
```

이렇게 검색의 복수형 searchPrams를 의미합니다. key, value관계를 갖고 값을 저장할 수 있습니다.

## 큰파일을 다운로드 받는 중 중단하고 싶으면?

중단하는 방법은 `AbortController`를 활용하면 됩니다. 현재 experimental technology 단계라 활용은 조심스럽게 하도록 합니다.

[AbortController](https://developer.mozilla.org/ko/docs/Web/API/AbortController)

```js
var controller = new AbortController();
var signal = controller.signal;

var downloadBtn = document.querySelector('.download');
var abortBtn = document.querySelector('.abort');

downloadBtn.addEventListener('click', fetchVideo);

abortBtn.addEventListener('click', () => {
  controller.abort();
  console.log('Download aborted');
});

/**
 * --------------------------------------------------------------------------
 * helper
 * --------------------------------------------------------------------------
 */
function fetchVideo() {
  // ...
  fetch(url, { signal }) // 여기서 signal 설정으로 fetch API에서 중단합니다.
    .then(function (response) {
      // ...
    })
    .catch(function (e) {
      reports.textContent = 'Download error: ' + e.message;
    });
}
```

## as const

<iframe class="codepen" src="https://www.youtube.com/embed/6M9aZzm-kEc" title="The most underrated TypeScript feature" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

```ts
const routes = {
  home: '/',
  admin: '/admin',
  users: '/users',
};
```

이렇게 라우팅을 설정합니다. 당연히 상수이고 변형이 가해지면 안됩니다.

```ts
const routes = {
  home: '/',
  admin: '/admin',
  users: '/users',
};

function goToRoute(route: '/' | '/admin' | '/users') {
  // ...
}
```

일단 코드 중복이 발생합니다. 라우팅은 정책으로 언제든지 금방 늘어날 수 있습니다.

```ts
const routes = {
  home: '/',
  admin: '/admin',
  users: '/users',
};

function goToRoute(route: '/' | '/admin' | '/users') {
  // ...
}

goToRoute(routes.home); // 타입에러
```

이것은 타입스크립트가 타입 체킹하는 방식의 문제 때문에 발생합니다.

`routes`의 값은 `string`이지만 매개변수의 타입은 문자열 이넘(enum)입니다.

즉 `string`은 `"/"`이 아니다라는 이유로 타입에러를 돌려주는 것입니다.

`string`으로 타입추론을 하는 이유는 다른 문자열로 재할당이 가능하기 때문에 상위 문자열 타입으로 간주합니다.

```ts
const routes = {
  home: '/',
  admin: '/admin',
  users: '/users',
} as const;

function goToRoute(route: '/' | '/admin' | '/users') {
  // ...
}

goToRoute(routes.home); // 문제 없음
```

이렇게 `as const`로 단언하면 `readonly`로 지정합니다. 재할당이 불가능합니다. `object.freeze`와 비슷하게 재할당을 막지만 `object.freeze`는 얕은 `freeze`만합니다. `as const`은 깊은 `freeze`를 지원합니다.

```ts
const routes = {
  home: '/',
  admin: '/admin',
  users: '/users',
} as const;

type Routes = (typeof routes)[keyof typeof routes];

function goToRoute(route: Routes) {
  // ...
}

goToRoute(routes.home); // 문제 없음
```

이렇게 지정하면 읽기 전용 상수객체의 `Routes`를 활용할 수 있습니다. 위와 같은 `'/' | '/admin' | '/users'`을 추출할 수 있게 됩니다.

```ts
const routes = {
  home: '/',
  admin: '/admin',
  users: '/users',
} as const;

type RotesKeys = keyof typeof routes; // "home" | "admin" | "users"

type Routes = (typeof routes)[RotesKeys]; // "/" | "/admin" | "/users"

function goToRoute(route: Routes) {
  // ...
}

goToRoute(routes.home); // 문제 없음
```

타입에서 키와 그 값을 이런 패턴으로 as const를 활용해서 접근이 가능합니다.
