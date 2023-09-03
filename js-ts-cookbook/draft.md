---
sidebar_position: 99
description: 'draft'
tags: ['draft']
draft: true
---

## promises 동시에 다루기

<!-- @todo 아래 내용 정리하기 -->

https://www.youtube.com/shorts/HrL8HXlvlgE

https://www.builder.io/blog/promises

## DOM으로 추출한 유사배열객체는 NodeList라고 부릅니다.

https://developer.mozilla.org/ko/docs/Web/API/NodeList

사실 존재는 알고 있었는데 이름은 몰랐습니다.

## 제너레이터란 뭔가요? 일반 함수와는 어떤 차이가 있죠?

제너레이터 함수는 이터러블한 객체를 생성하는 함수입니다. 이터러블한 객체라는 것은 이터러블 프로토콜을 준수해서 for of 문을 사용할 수 있게 프로퍼티를 갖는 것을 말합니다. 즉 순회가 가능해서 접근할 수 있습니다.

```js
function* generator(i) {
  yield i;
  yield i + 10;
}

const gen = generator(30);

console.log(gen.next()); // 30
console.log(gen.next()); // 40
console.log(gen.next()); // undefined
```

위는 제너레이터 객체를 직접 사용하는 경우입니다.

```js
function* generator(i) {
  yield i;
  yield i + 10;
}

const gen = generator(30);

for (bar of gen) {
  console.log(bar); // 30 40
}
```

`of` 연산자로 접근해서 순회한 예시입니다.

제너레이터라고 말하면 제너레이터 함수와 제너레이터 객체를 포괄한 의미입니다. 먼저 지금 질문의 맥락을 보면 제너레이터 함수와 일반함수를 비교하려는 것 같습니다.

제너레이터는 객체를 생성하는 함수입니다. 함수를 호출하는 횟수에 따라 반환값이 다릅니다. 이런 이유로 사이드 이펙트 제어가 용이합니다.

```js
function* sumGenerator() {
  console.log('sumGenerator이 시작됐습니다.');
  let a = yield;
  console.log('a값을 받았습니다.');
  let b = yield;
  console.log('b값을 받았습니다.');
  yield a + b;
}

const sum = sumGenerator();

sum.next(); // sumGenerator이 시작됐습니다. {value: undefined, done: false}
sum.next(2); // a값을 받았습니다.           {value: undefined, done: false}
sum.next(3); // b값을 받았습니다.           {value: 5,         done: false}
sum.next(); //                          {value: undefined, done: true}
```

일반함수의 경우 사이드 이펙트가 없다면 호출횟수와 무관하게 입력이 동일하면 출력이 같습니다.

또 제너레이터는 일반함수처럼 생성자함수로 사용할 수 없습니다.

```js
function* f() {}
const instance = new f(); // throws "TypeError: f is not a constructor"
```

[function\* - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/function*)

[redux-saga](https://react.vlpt.us/redux-middleware/10-redux-saga.html)
