---
sidebar_position: 3
description: '슬라이딩 윈도우'
tags: ['슬라이딩 윈도우', 'sliding window', '문제 풀이 전략']
---

# 슬라이딩 윈도우

## 괄호 회전하기

[괄호 회전하기](https://school.programmers.co.kr/learn/courses/30/lessons/76502)

```js
/**
 * @typedef {"["|"]"|"{"|"}"|"("|")"} BracketType
 * @param {`${BracketType}`} s
 * @returns {number}
 */
function solution(s) {
  let result = -1;
  return result;
}
```

```js
import solution, { isCorrect } from './playground';
import { test, expect, describe } from 'vitest';

// s	      result
// "[](){}"	3
// "}]()[{"	2
// "[)(]"	  0
// "}}}"	  0

describe('연속 부분 수열 합의 개수', () => {
  test('예제 1', () => {
    expect(solution('[](){}')).toBe(3);
  });
  test('예제 2', () => {
    expect(solution('}]()[{')).toBe(2);
  });
  test('예제 3', () => {
    expect(solution('[)(]')).toBe(0);
  });
  test('예제 4', () => {
    expect(solution('}}}')).toBe(0);
  });
});
```

테스트 코드입니다. 작업을 작게 분해해서 테스트 코드를 작성하니까 풀이가 더 쉬웠습니다.

<details>
<summary>추가 테스트 코드</summary>
<div markdown="1">

```js
import { isCorrect } from './playground';

describe('isCorrect', () => {
  test('예제 1', () => {
    expect(isCorrect('[](){}')).toBe(true);
  });
  test('예제 2', () => {
    expect(isCorrect('](){}[')).toBe(false);
  });
  test('예제 3', () => {
    expect(isCorrect('[{}]()')).toBe(true);
  });
  test('예제 4', () => {
    expect(isCorrect('}')).toBe(false);
  });
});
```

</div>
</details>

<details>
<summary>2023년 09월 05일</summary>
<div markdown="1">

```js
/**
 * @typedef {"["|"]"|"{"|"}"|"("|")"} BracketType
 * @param {`${BracketType}`} s
 * @returns {number}
 */
function solution(s) {
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    const brackets = [...s.split(''), ...s.split('')];
    if (isCorrect(brackets.slice(i, i + s.length))) result += 1;
  }
  return result;
}

/**
 * @param {("["|"]"|"{"|"}"|"("|")")[]} s
 * @returns {boolean}
 */
export function isCorrect(s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    stack.push(s[i]);
    if (
      isPare(stack, '(', ')') ||
      isPare(stack, '[', ']') ||
      isPare(stack, '{', '}')
    ) {
      stack.pop();
      stack.pop();
    }
  }
  return stack.length === 0;
}

/**
 * @param {("["|"]"|"{"|"}"|"("|")")[]} s
 * @param {("["|"]"|"{"|"}"|"("|")")} left
 * @param {("["|"]"|"{"|"}"|"("|")")} right
 * @returns {boolean}
 */
function isPare(arr, left, right) {
  return arr.at(-2) === left && arr.at(-1) === right;
}

export default solution;
```

저의 정답코드입니다.

여기서 애매한 것은 문제 분류입니다. stack으로 분류할 수 있고 sliding window로 생각할 수 있습니다.

</div>
</details>

<details>
<summary>모범 정답</summary>
<div markdown="1">

```js
function solution(s) {
  var answer = 0;

  for (let i = 0; i < s.length; i++) {
    s = s.slice(1, s.length) + s[0];

    let string = s;

    for (let j = 0; j < Math.floor(s.length / 2); j++) {
      string = string.replace(/([\[][\]]|[\{][\}]|[\(][\)])+/g, '');

      if (!string) break;
    }

    answer += !string ? 1 : 0;
  }

  return answer;
}
```

정규표현식으로 문제를 푼 사람도 있습니다. 정규표현식의 성능에 의구심을 갖을 수 있지만 일반적으로는 좋은 방법이라고 생각합니다.

</div>
</details>

## 연속 부분 수열 합의 개수

[연속 부분 수열 합의 개수](https://school.programmers.co.kr/learn/courses/30/lessons/131701)

```js
import solution, { sumWindow } from './playground';
import { test, expect, describe } from 'vitest';

describe('연속 부분 수열 합의 개수', () => {
  test('예제 1', () => {
    expect(solution([7, 9, 1, 1, 4])).toBe(18);
  });
});

describe('sumWindow', () => {
  test('1개', () => {
    expect(sumWindow(0, 1, [7, 9, 1, 1, 4])).toBe(7);
    expect(sumWindow(1, 1, [7, 9, 1, 1, 4])).toBe(9);
    expect(sumWindow(2, 1, [7, 9, 1, 1, 4])).toBe(1);
    expect(sumWindow(3, 1, [7, 9, 1, 1, 4])).toBe(1);
    expect(sumWindow(4, 1, [7, 9, 1, 1, 4])).toBe(4);
  });
  test('2개', () => {
    expect(sumWindow(0, 2, [7, 9, 1, 1, 4])).toBe(16);
    expect(sumWindow(1, 2, [7, 9, 1, 1, 4])).toBe(10);
    expect(sumWindow(2, 2, [7, 9, 1, 1, 4])).toBe(2);
    expect(sumWindow(3, 2, [7, 9, 1, 1, 4])).toBe(5);
    expect(sumWindow(4, 2, [7, 9, 1, 1, 4])).toBe(11);
  });
  test('3개', () => {
    expect(sumWindow(0, 3, [7, 9, 1, 1, 4])).toBe(17);
    expect(sumWindow(1, 3, [7, 9, 1, 1, 4])).toBe(11);
    expect(sumWindow(2, 3, [7, 9, 1, 1, 4])).toBe(6);
    expect(sumWindow(3, 3, [7, 9, 1, 1, 4])).toBe(12);
    expect(sumWindow(4, 3, [7, 9, 1, 1, 4])).toBe(20);
  });
});
```

<details>
<summary>2023년 09월 5일 풀이</summary>
<div markdown="1">

```js
/**
 * @param {number[]} elements
 * @returns {number}
 */
function solution(elements) {
  const result = new Set();
  let windowSize = 1;
  while (windowSize <= elements.length) {
    for (let i = 0; i < elements.length; i++) {
      result.add(sumWindow(i, windowSize, elements));
    }
    windowSize += 1;
  }

  return result.size;
}

/**
 * @param {number} idx
 * @param {number} size
 * @param {number[]} arr
 * @returns {number}
 */
export function sumWindow(idx, size, arr) {
  const result = [...arr, ...arr];
  return result.slice(idx, idx + size).reduce((acc, curr) => acc + curr);
}

export default solution;
```

아래 질문을 참고했습니다. 다시보니까 접근은 맞는데 작은 실수를 했었습니다. windowSize를 나중에 더해야 하는데 먼저 더했던 실수를 했습니다. for문 전에 더했습니다.

또 이 문제에서 다루는 순열을 보고 원순열이라고 부릅니다.

무식한 방법을 활용하면 배열을 2배로 복제하면 됩니다.

사실 정답을 못 맞췄는데 질문을 찾아다녔습니다.

[JS 전반적인 접근 스포 O](https://school.programmers.co.kr/questions/41278)

</div>
</details>

## 할인 행사

[할인 행사](https://school.programmers.co.kr/learn/courses/30/lessons/131127)

예시 때문에 혼선이 발생할 수 있습니다. 모든 물건을 살 수 있는 날이 **총 며칠**인지 구하는 문제입니다. 가장 빨리 모든 물건을 살 수 있는날이 아닙니다.

```js
/**
 * @param {string[]} want
 * @param {number[]} number
 * @param {string[]} discount
 * @returns {number}
 */
function solution(want, number, discount) {
  let result = 0;
  return result;
}
```

```js
import solution from './playground';
import { test, expect, describe } from 'vitest';

// want	                                      number	        discount	                                                  result
// ["banana", "apple", "rice", "pork", "pot"]	[3, 2, 2, 2, 1]	["chicken", "apple", "apple", "banana", "rice", "apple", "pork", "banana", "pork", "rice", "pot", "banana", "apple", "banana"]	3
// ["apple"]	                                [10]	          ["banana", "banana", "banana", "banana", "banana", "banana", "banana", "banana", "banana", "banana"]	0

describe('n^2 배열 자르기', () => {
  test('예제 1', () => {
    expect(
      solution(
        ['banana', 'apple', 'rice', 'pork', 'pot'],
        [3, 2, 2, 2, 1],
        [
          'chicken',
          'apple',
          'apple',
          'banana',
          'rice',
          'apple',
          'pork',
          'banana',
          'pork',
          'rice',
          'pot',
          'banana',
          'apple',
          'banana',
        ]
      )
    ).toBe(3);
  });
  test('예제 2', () => {
    expect(
      solution(
        ['apple'],
        [10],
        [
          'banana',
          'banana',
          'banana',
          'banana',
          'banana',
          'banana',
          'banana',
          'banana',
          'banana',
          'banana',
        ]
      )
    ).toBe(0);
  });
});
```

<details>
<summary>2023년 09월 12일 풀이</summary>
<div markdown="1">

```js
/**
 * @param {string[]} want
 * @param {number[]} number
 * @param {string[]} discount
 * @returns {number}
 */
function solution(want, number, discount) {
  let result = 0;
  let flag = false;
  for (let i = 0; i <= discount.length - 10; i++) {
    const groceryList = new Map();
    want.forEach((elem, idx) => {
      groceryList.set(elem, number[idx]);
    });

    const window = discount.slice(i, i + 10);
    for (let j = 0; j < window.length; j++) {
      if (groceryList.get(window[j]) !== undefined) {
        groceryList.set(window[j], groceryList.get(window[j]) - 1, i);
      }
    }

    if (
      new Set(groceryList.values()).size === 1 &&
      new Set(groceryList.values()).has(0)
    ) {
      result += 1;
    }
  }
  return result;
}

export default solution;
```

</div>
</details>
