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

## Amplitude

Amplitude는 구글 애널리틱스처럼 사용자 행동을 분석할 수 있는 도구입니다. 사용자의 클릭 방문 등 다양한 행위에 대한 데이터를 수집할 수 있습니다.

유저 행동에 따라 퍼널이 다를 것입니다. 단순한 설문 조사보다는 좋습니다. 데이터 기반으로 분석해서 정성적인 성격이 강한 자료보단 유저 데이터에 의존해서 문제를 정의할 수 있습니다.

설치와 분석예시까지 다룹니다.

회원가입을 통해서 진행하도록 합니다. 이메일 인증까지 잘 하도록 합니다. 웹 개발은 브라우저 SDK를 활용하면 됩니다. Next, CRA모두 동일합니다.

환경변수 설정을 통해 가리도록 합니다.

모든 페이지에 적용하기 만들기 위해 `_app.js`에 설정하도록 합니다. 비회원도 트레킹하기 위해서 init 함수의 두번째 인자는 생략합니다.

이벤트 추적이 가능하게 `amplitude.track`으로 할 수 있습니다.

```ts
import * as amplitude from '@amplitude/analytics-browser';

amplitude.init('YOUR_API');
amplitude.track('Button Clicked');
```

실제 활용은 개발에 활용할 때는 조금 다릅니다. init, track, setUserId, reset등을 util로 관리하는 것이 더 좋습니다.

```js
export const logEvent = (eventName, eventProperties) => {
  track(eventName, eventProperties);
};
```

여기서 eventProperties는 버전 페이지에서 다양한 정보를 객체로 담아서 보내도록 합니다.

AmplitudeId는 디바이스 ID로 생성됩니다. 디바이스 ID는 SDK로 디바이스 정보를 받아서 보내도록 합니다. 동일한 디바이스에 다양한 유저 반대로 동일한 유저가 다양한 디바이스를 사용하는 문제가 있을 수 있습니다. 디바이스 ID의 맹점을 보완하기 위해 유저 Id를 설정할 수 있습니다. setUserId로 설정할 수 있습니다.

시크릭모드로 테스트가 가능합니다.

User Look-Up table을 활용해서 확인할 수 있습니다. 하지만 개발자는 개발 테스트를 위해 크롬 확장자를 설치하도록 합니다.

기획 측면에서 Segmentation을 활용할 수 있습니다. 특정이벤트를 시간별로 발생한것과 조건문을 달아둘 수 있습니다. 보통 연령, 지역같은 정보로 분리합니다. Funnel은 유저 플로우의 이탈률을 분석하는 도구입니다.

데이터 기반으로 이터레이션을 돌고 목표를 정하고 개발하는 방법론을 적용할 수 있습니다.

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
