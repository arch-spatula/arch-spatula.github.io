---
sidebar_position: 6
description: '자바스크립트의 이상한 상세 스펙을 다룹니다.'
---

# 오늘도 자바스크립트는 저를 실망시키지 않습니다.

## 자바스크립트는 음수 0을 지원합니까?

```js
console.log(Object.is(-0, 0)); // false
```

네

## null은 객체인가?

```js
typeof null == 'object'; // true
typeof null === 'object'; // false
```

네니요?

객체이지만 객체로 취급하면 안됩니다.

## switch case에 할당을 표현할 수 있는가?

```js
const a = 3;
let b = null;
switch (a) {
  case 1: {
    b = 1;
    break;
  }
  case 2: {
    b = 2;
    break;
  }
  case 3: {
    b = 3;
    break;
  }
  default: {
    b = 7;
    break;
  }
}

console.log(b); // 3
```

넹

## 숫자가 아닌데 숫자다.

```js
console.log(typeof (1 % 0));
```

## Date 객체의 난해한 감성

아래 코딩 테스트 문제를 풀어보세요.

두 수 a ,b를 입력받아 2016년 a월 b일이 무슨 요일인지 리턴하는 함수를 완성하세요.

자바스크립트 `Data` 객체의 난해한 감성을 느낄 수 있는 문제입니다.

[2016년 - 프로그래머스](https://school.programmers.co.kr/learn/courses/30/lessons/12901)

```js
/**
 * @typedef {"SUN"|"MON"|"TUE"|"WED"|"THU"|"FRI"|"SAT"} DayType
 * @param {number} a
 * @param {number} b
 * @returns {DayType}
 */
function solution(a, b) {
  let result = '';
  return result;
}
```

저의 자체 ts 능력은 무시해주시기 바랍니다.

```js
import solution from './playground';
import { test, expect, describe } from 'vitest';

describe('2016년', () => {
  test('예제 1', () => {
    expect(solution(5, 24)).toBe('TUE');
  });
  test('예제 2', () => {
    expect(solution(1, 1)).toBe('FRI');
  });
  test('예제 3', () => {
    expect(solution(8, 31)).toBe('WED');
  });
  test('예제 4', () => {
    expect(solution(5, 5)).toBe('THU');
  });
  test('예제 5', () => {
    expect(solution(9, 29)).toBe('THU');
  });
  test('9월 1일 수요일', () => {
    expect(solution(9, 1)).toBe('THU');
  });
});
```

<details>
<summary>추가 테스트 코드</summary>
<div markdown="1">

```js
test('예제 6', () => {
  expect(solution(1, 2)).toBe('SAT');
});
test('예제 7', () => {
  expect(solution(1, 3)).toBe('SUN');
});
test('예제 8', () => {
  expect(solution(1, 4)).toBe('MON');
});
test('예제 9', () => {
  expect(solution(1, 5)).toBe('TUE');
});
test('예제 10', () => {
  expect(solution(1, 6)).toBe('WED');
});
test('예제 11', () => {
  expect(solution(1, 7)).toBe('THU');
});
test('예제 12', () => {
  expect(solution(1, 8)).toBe('FRI');
});
```

</div>
</details>

<details>
<summary>정답</summary>
<div markdown="1">

```js
/**
 * @typedef {"SUN"|"MON"|"TUE"|"WED"|"THU"|"FRI"|"SAT"} DayType
 * @param {number} a
 * @param {number} b
 * @returns {DayType}
 */
function solution(a, b) {
  const date = new Date(2016, a - 1, b);
  const day = date.getDay();
  /** @type {DayType[]} */
  const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return week[day];
}

export default solution;
```

월은 0부터 시작해야 합니다. 그래서 `-1`을 해줘야 합니다. 당황해서 1시간 날렸습니다. ㅂㄷㅂㄷ...

그래도 요일은 고정되어 있습니다.

</div>
</details>

## `Array.prototype.fill()`에 참조형을 대입하면 모두 동일한 주소를 바라봅니다.

매번 새로운 새로운 참조형 인스턴스를 할 당하고 싶으면 from의 2번째 콜백함수를 활용해주시기 바랍니다.

```js
const arr = Array.from({ length: 100 }).fill([]);
arr[0][0] = null;
console.log(arr);
```

배열 0 ~ 99는 하나의 배열을 참조합니다.

```js
const arr = Array.from({ length: 100 }, () => []);
arr[0][0] = null;
console.log(arr);
```

위처럼 작성하면 독립적인 할당이 가능해집니다. 0 ~ 99는 모두 개별적인 배열을 참조하게 됩니다.
