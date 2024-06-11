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

~~이 내용은 리덕스가 싫어합니다.~~

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

## replace로 search params 바꾸기

```js
if (!window.location.search) {
  const newUrl = `${window.location.origin}/?asdf=qwer`;
  window.location.replace(newUrl);
}
```

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

## 자바스크립트 console.log 포멧팅

```js
console.log('first: %d, second: %d, third: %d', first, second, third);
```

콘솔로그에 이런 표현도 가능했습니다. 저는 몰랐습니다. ㅂㄷㅂㄷ...

### console.log 컬러 입히기

[스택 오버플로우](https://stackoverflow.com/questions/7505623/colors-in-javascript-console)에서는 컬러 추가도 가능하다고 알려줍니다.

```js
console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
```

<!--
https://github.com/arch-spatula/Hyper-Modern-JavaScript-Cook-Book/blob/dev/draft/console.md

```js
console.groupEnd('array loop');
console.time();
console.timeEnd();
console.table();
console.trace();
``` -->

## 실행환경별로 실행

```ts
if (process.env.NODE_ENV === 'production') {
  console.log = () => {
    //
  };
  console.error = () => {
    //
  };
  console.warn = () => {
    //
  };
}
```

process.env.NODE_ENV은 `development`, `production` 중 1개를 선택할 수 있습니다.

## label로 중첩 순회 풀기

```js
loop1: for (i = 0; i < 3; i++) {
  //첫번째 for문은 "loop1" 레이블을 붙였다.
  for (j = 0; j < 3; j++) {
    //두번째 for문은 "loop2" 레이블을 붙였다.
    console.log('i = ' + i + ', j = ' + j);
    if (i === 1 && j === 1) break loop1;
  }
}
```

중쳡순회를 풀 수 있는 방법이 존재하는게 상당히 충격적입니다.

label을 사용하지 않으면 flag를 사용해서 중첩순회를 풀어야 하지만 label을 활용하면 어느 순회문에 `break`에 적용할지 제어할 수 있습니다.

## Date 객체인지 확인하는 방법

https://stackoverflow.com/questions/10589732/checking-if-a-date-is-valid-in-javascript

```js
var date = new Date();
console.log(date instanceof Date && !isNaN(date.valueOf()));
```

## reduce로 객체 만들기

```js
arr.reduce((acc, curr) => ((acc[curr] = null), acc), {});
// {A: null, B: null}
```

배열의 값을 키로 활용해 객체를 만드는 법을 찾던 중에 `reduce`를 이렇게 사용할 수 있다는 것을 발견했습니다. 작지만 특이한 용례입니다.

```ts
const distances: { [keys: Vertex]: number } = Object.keys(
  this.adjacencyList
).reduce((acc, curr) => ((acc[curr] = curr === start ? 0 : Infinity), acc), {});
```

화살표 함수에 반환하는 자리에 괄호로 반환하는 값만 아니라 할당하는 문장을 작성도 가능했습니다. 그리고 새로 만들고 참조할 객체를 다음 인자로 대입하면 되는 것이었습니다.

[Convert array to object keys [duplicate]](https://stackoverflow.com/questions/54789406/convert-array-to-object-keys)

## npkill 

https://www.npmjs.com/package/npkill

- 필요없는 node_modules를 찾고 선택해서 삭제해줍니다.

<!--
## 예외처리 전략

[좋은 예외(Exception) 처리](https://jojoldu.tistory.com/734)
-->

<!--
쉽고 빠른 NodeJS 부하테스트 툴, autocannon

https://medium.com/zigbang/%EC%89%BD%EA%B3%A0-%EB%B9%A0%EB%A5%B8-nodejs-%EB%B6%80%ED%95%98%ED%85%8C%EC%8A%A4%ED%8A%B8-%ED%88%B4-autocannon-c860886d6f15
 -->
