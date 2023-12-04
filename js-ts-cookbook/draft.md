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

# HashTable 만들기

> 배열의 fill 메서드는 원시형만 대입하자.

## 문제

- push를 여러 배열에 순회하면서 추가되는 문제가 발생했습니다.

```ts
export class HashTable<T> {
  private keyMap: [string, T][][];
  constructor(size = 53) {
    this.keyMap = new Array(size).fill([]);
  }

  private hash(key: string) {
    let total = 0;
    let weirdPrime = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * weirdPrime + value) % this.keyMap.length;
    }
    return total;
  }

  set(key: string, value: T) {
    const hashKey = this.hash(key);
    this.keyMap[hashKey].push([key, value]);
  }

  get(key: string) {
    return this.keyMap;
  }
}
```

- 타입스크립트로 HashTable을 만들고 있었습니다.

```ts
import { describe, test, expect } from 'vitest';
import { HashTable } from './HashTable';

describe('HashTable', () => {
  test('set하고 get', () => {
    const hashTable = new HashTable<string>();

    hashTable.set('springgreen', '#00FF7F');

    expect(hashTable.get('springgreen')).toBe('#00FF7F');
  });
});
```

- 이 테스트 케이스를 통과시키려고 했습니다.

```
  - Expected  - 1
  + Received  + 320

  - #00FF7F"
  + "Array [
  +   Array [
  +     Array [
  +       "springgreen",
  +       "#00FF7F",
  +     ],
  +   ],
  +   Array [
  +     Array [
  +       "springgreen",
  +       "#00FF7F",
  +     ],
  +   ],
  +   Array [
```

- 콘솔에서 받은 피드백이 이거였습니다. set 메서드를 사용하면 사이드 이펙트가 발생합니다. push가 hashTable 모든 원소에 추가되는 것이었습니다.

```
[
  [
    [key, value],
    [key, value],
    [key, value],
  ],
  [
    [key, value],
    [key, value],
    [key, value],
  ],
  [
    [key, value],
    [key, value],
    [key, value],
  ],
];
```

- 의도한 구조는 이렇습니다. 가장 외부 배열은 hash키로 접근하고 내부 배열에서는 튜플을 선형탐색하는 방식을 강의로 듣고 구현하려고 했습니다.
- 2차원 배열에서 외부배열에 push가 되는 이유를 알아내야 합니다.

## 시도

### 2차원 배열 인덱스 push

```js
const hashTable = [
  [['red', '#FF0000']],
  [
    ['gree', '#00FF00'],
    ['springgreen', '#00FF7F'],
  ],
  [['blue', '#0000FF']],
];

hashTable[0].push(['pink', 'FFC0CB']);

console.log(hashTable);
// [
//   [ [ 'red', '#FF0000' ], [ 'pink', 'FFC0CB' ] ],
//   [ [ 'gree', '#00FF00' ], [ 'springgreen', '#00FF7F' ] ],
//   [ [ 'blue', '#0000FF' ] ]
// ]
```

- 아주 기초적이지만 배열속 배열을 읽을 때 문제가 있는지 실험을 해봤습니다. 저의 개념에는 문제가 없었습니다.
- 물론 저의 개념에 문제가 많지만 적어도 이부분에는 없다는 것을 이 실험으로 검증했습니다.

### class property

- 저의 모자란 this 바인딩 문제인지 확인해보겠습니다.

```js
class HashTable {
  constructor(...arr) {
    this.table = [...arr];
  }

  add(key, value, idx) {
    this.table[idx].push([key, value]);
  }
}

const hashTable = new HashTable(
  [['red', '#FF0000']],
  [
    ['gree', '#00FF00'],
    ['springgreen', '#00FF7F'],
  ],
  [['blue', '#0000FF']]
);

console.log(hashTable.table);
// [
//   [ [ 'red', '#FF0000' ] ],
//   [ [ 'gree', '#00FF00' ], [ 'springgreen', '#00FF7F' ] ],
//   [ [ 'blue', '#0000FF' ] ]
// ]

hashTable.add('pink', '#FFC0CB', 0);

console.log(hashTable.table);
// [
//   [ [ 'red', '#FF0000' ], [ 'pink', '#FFC0CB' ] ],
//   [ [ 'gree', '#00FF00' ], [ 'springgreen', '#00FF7F' ] ],
//   [ [ 'blue', '#0000FF' ] ]
// ]
```

- this 바인딩 지식도 모자라기는 하지만 강의 코드를 이해하는 능력이 더 모자란 것 같습니다.

## 해결

```ts
export class HashTable<T> {
  private keyMap: [string, T][][];
  constructor(size = 53) {
    this.keyMap = Array.from({ length: size }, () => []); // 여기가 문제입니다.
  }

  private hash(key: string) {
    let total = 0;
    let weirdPrime = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * weirdPrime + value) % this.keyMap.length;
    }
    return total;
  }

  set(key: string, value: T) {
    this.keyMap[this.hash(key)].push([key, value]);
  }

  get(key: string) {
    return this.keyMap[this.hash(key)].find((elem) => elem[0] === key)?.[1];
  }
}
```

- `new` 키워드가 문제였습니다.
- 저의 이전 실험이 통과하는 이유는 `new` 키워드로 새로운 인스턴스를 생성하지 않기 때문에 성공한 것입니다.

## 학습

- 문제는 해결했지만 여기서 새로운 의문이 생깁니다. `constructor`에서 `new` 키워드의 동작방식이 의문입니다. `constructor`는 `new` 키워드를 선언할 때 1번만 실행되어야 하는 것이 아닌가? 그리고 배열의 인스턴스를 생성할 때 같이 인스턴스를 생성하는 `callstack`을 `pop`하고 말아야 하는 것이 아닌가?
- 그래서 일단 chatGPT 선생님에게 질문했습니다. 문제가 있던 코드와 없는 코드를 보여줬습니다.

> 2개의 HashTable 자료구조가 있습니다. 하나는 new 키워드를 활용하고 다른 하나는 사용하지 않습니다. 동작 방식의 차이는 무엇인가?

- chatGPT 선생님의 눈치를 먼저 테스트해봤습니다.

> 위 두개의 코드는 기능적으로 동일합니다. 그러나 `Array.from`을 사용하여 배열을 생성한 것과, `new Array()`와 `.fill()` 메소드를 사용하여 배열을 생성한 것의 차이가 있습니다.
>
> `Array.from`을 사용한 배열 생성은 인자로 주어진 iterable을 배열로 변환하여 반환합니다. iterable이란, 배열처럼 index를 가지고 순회할 수 있는 객체를 의미합니다. 따라서 `Array.from({ length: size }, () => [])` 코드는 배열의 길이가 `size`인 빈 배열을 생성합니다. 이는 `new Array(size).fill([])` 코드와 동일하게 `size`개의 빈 배열을 생성하는 코드와 같습니다.
>
> 그러나, `Array.from`을 사용한 코드는 배열 생성을 좀 더 다양한 방식으로 조작할 수 있도록 해주는 장점이 있습니다. `Array.from`은 콜백 함수를 인자로 전달받아 배열의 원소를 초기화하는 로직을 추가할 수 있습니다. 이는 배열을 초기화할 때 더 많은 유연성을 제공합니다.

- 선생님은 눈치가 없습니다. 그래서 더 구체적으로 질문을 했습니다.

> 2개의 HashTable 자료구조가 있습니다. 하나는 new 키워드를 활용하고 다른 하나는 사용하지 않습니다. 동작 방식의 차이는 무엇인가? 혹시 각각 set 메서드를 사용하면 keyMap에는 결과가 다른가?

- 이상한 포인트를 집었습니다.

> 위 코드의 두 HashTable 클래스의 차이는 `this.keyMap = Array.from({ length: size }, () => []);` 와 `this.keyMap = new Array(size).fill([]);` 부분입니다.
>
> Array.from 메서드를 사용한 코드에서는, Array.from 메서드로 새로운 배열을 만든 후, 빈 배열로 초기화합니다. 따라서, this.keyMap의 각 요소는 서로 다른 빈 배열을 참조합니다.
>
> 반면에, new 키워드를 사용하여 배열을 생성한 코드에서는, fill 메서드로 생성된 배열의 모든 요소가 동일한 빈 배열을 참조합니다.
>
> 따라서, 첫 번째 코드는 각 keyMap의 요소들이 모두 서로 다른 배열을 참조하므로 set 메서드를 사용해 keyMap에 값을 추가하는 경우에는 서로 다른 배열이 변경됩니다. 그러나, 두 번째 코드는 모든 keyMap 요소가 동일한 배열을 참조하므로 하나의 배열만 변경됩니다.
>
> 즉, 첫 번째 코드에서는 각 요소의 참조가 서로 다르기 때문에, 하나의 요소를 변경해도 다른 요소에는 영향을 미치지 않습니다. 반면에 두 번째 코드에서는 모든 요소가 동일한 배열을 참조하기 때문에, 하나의 요소를 변경하면 다른 모든 요소에도 변경이 반영됩니다.

- Array 메서드의 fill의 동작방식의 문제였습니다. new 키워드를 그나마 덜봐서 new 키워드의 문제라고 착각하고 있었습니다. 하지만 fill의 참조방식의 문제였습니다.
- fill에 참조형을 대입하면 동일한 주소를 갖은 참조형을 대입하게 되는 것입니다. 즉 Array.form에서 만든 것처럼 각각 독립적인 주소를 갖을 수 있는 것이었습니다. 2차원 배열에서 인덱스로 읽어도 결국은 동일한 배열을 읽고 쓰는 것이었습니다.
- 나중에 면접관이 된다면 저는 이걸 질문으로 내볼 것입니다. 인턴에게 몸풀기 정도로 내면 될 것 같습니다. 깊은 복사 얕은 복사를 이해하면 이 문제도 같이 이해할 수 있습니다. 하지만 거기에 `fill`이라는 메서드의 상세 스펙도 이해하는지 측정할 수 있을 것 같습니다. 저에게는 하루 2시간을 날린 에러였지만 다른 사람은 바로 문제를 봤을 것 같습니다.
- 여러가지 부분이 문제이지만 가장 잘못된 부분은 의심을 하는 방식입니다. 상당히 비효율적인 소거 방식으로 탐구했습니다. set 메서도 발생시키는 사이드 이펙트는 관측하기 쉽습니다. hash 메서드는 순수함수입니다. fill이 문제라는 것을 더욱더 빠르게 파악할 수 있었어야 합니다.
- 오늘도 자바스크립트는 이상합니다.

[MDN - Array.prototype.fill()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
