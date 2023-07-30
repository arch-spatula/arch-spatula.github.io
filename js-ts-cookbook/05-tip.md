---
sidebar_position: 5
description: '분류하기 애매한 미세팁들'
---

# 분류하기 애매한 미세팁들

## barrel export

최근 프로젝트에 export하는 방식에 명칭이 barrel export였습니다.

```ts title="filename/foo.ts"
export function foo() {
  console.log('foo');
}
```

```ts title="filename/index.ts"
export * from './foo';
```

폴더 내에서 자유롭게 정의하고 모두 `index`로 묶어주면 됩니다.

```ts
import { foo } from '../filename';

foo();
```

호출할 때는 호출하고자 하는 함수의 내부 계층구조를 알 필요가 없어집니다.

[Barrel - TypeScript Deep dive](https://basarat.gitbook.io/typescript/main-1/barrel)

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
