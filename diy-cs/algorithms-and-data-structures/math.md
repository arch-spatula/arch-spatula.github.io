---
sidebar_position: 13
description: '수학'
tags: ['수학', '자료구조', '문제유형', 'math']
---

# 수학(Math)

수학적 소양과 지식에 의존해서 문제를 풀어야 하는 경우들도 존재합니다. 이런 문제 유형은 이공계열이 절대적으로 유리합니다. 물론 여전히 제일 유리한 사람들은 컴퓨터 과학 계열 전공자입니다.

## 소수 찾기

[소수 찾기](https://school.programmers.co.kr/learn/courses/30/lessons/12921)

에라토스테네스의 체(Sieve of Eratosthenes)을 활용해야 합니다.

```js
/**
 * @param {number} n
 * @returns {number}
 */
function solution(n) {
  let result = 0;
  return result;
}
```

```js
import solution, { isPrime } from './playground';
import { test, expect, describe } from 'vitest';

// n	result
// 10	4
// 5	3

describe('소수 만들기', () => {
  test('예제 1', () => {
    expect(solution(10)).toBe(4);
  });

  test('예제 2', () => {
    expect(solution(5)).toBe(3);
  });
});
```

<details>
<summary>2023년 09월 12일 풀이</summary>
<div markdown="1">

[[프로그래머스] 소수 찾기 - Lv.1 - pyflu](https://1ets-just-do-it.tistory.com/43#google_vignette)

[에라토스테네스의 체 - 나무위키](https://namu.wiki/w/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98%20%EC%B2%B4)

[Sieve of Eratosthenes algorithm in JavaScript running endless for large number - stackoverflow](https://stackoverflow.com/questions/15471291/sieve-of-eratosthenes-algorithm-in-javascript-running-endless-for-large-number)

```js
/**
 * @param {number} n
 * @returns {number}
 */
function solution(n) {
  const upperLimit = Math.sqrt(n);
  const arr = Array.from({ length: n + 1 }, () => true);

  for (let i = 2; i <= upperLimit; i++)
    if (arr[i]) for (let j = i * i; j <= n; j += i) arr[j] = false;

  arr[0] = false;
  arr[1] = false;

  return arr.filter((elem) => elem).length;
}
```

부분을 복사해서 풀었습니다.

</div>
</details>

## 소수 만들기

[소수 만들기](https://school.programmers.co.kr/learn/courses/30/lessons/12977)

```js
/**
 * @param {number[]} nums
 * @returns {number}
 */
function solution(nums) {
  let result = -1;
  return result;
}
```

```js
import solution, { isPrime } from './playground';
import { test, expect, describe } from 'vitest';

// nums	        result
// [1,2,3,4]	  1
// [1,2,7,6,4]	4

describe('소수 만들기', () => {
  test('예제 1', () => {
    expect(solution([1, 2, 3, 4])).toBe(1);
  });
  test('예제 2', () => {
    expect(solution([1, 2, 7, 6, 4])).toBe(4);
  });
});
```

<details>
<summary>2023년 09월 25일 풀이</summary>
<div markdown="1">

```js
describe('helper', () => {
  test('소수 맞음', () => {
    expect(isPrime(7)).toBe(true);
  });
  test('소수 아님', () => {
    expect(isPrime(6)).toBe(false);
  });
});
```

```js
/**
 * @param {number[]} nums
 * @returns {number}
 */
function solution(nums) {
  let result = 0;
  // 3개를 뽑는다. ijk
  for (let i = 0; i < nums.length; i++) {
    // 첫번째를 뽑는다.
    const first = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      // 두번째를 뽑는다.
      const second = nums[j];
      for (let k = j + 1; k < nums.length; k++) {
        // 세번째를 뽑는다.
        const third = nums[k];
        // 뽑은 숫자 3개를 합하고 소수인지 판별한다.
        // console.log('first: %d, second: %d, third: %d', first, second, third);
        if (isPrime(first + second + third)) result += 1;
        // 소수면 1을 가산한다.
      }
    }
  }

  return result;
}

/**
 * @param {number} num
 * @returns {boolean}
 */
function isPrime(num) {
  let div = 2;
  while (num > div) {
    if (num % div === 0) return false;
    div += 1;
  }
  return true;
}

export default solution;

export { isPrime };
```

</div>
</details>

## 의상

[의상](https://school.programmers.co.kr/learn/courses/30/lessons/42578)

```js
/**
 * @param {[string, string][]} clothes
 * @returns {number}
 */
function solution(clothes) {
  let result = 1;
  return result;
}
```

```js
import solution from './playground';
import { test, expect, describe } from 'vitest';

describe('의상', () => {
  test('예제 1', () => {
    expect(
      solution([
        ['yellow_hat', 'headgear'],
        ['blue_sunglasses', 'eyewear'],
        ['green_turban', 'headgear'],
      ])
      // 2개 중 1개 + 1개 중 1개 = 2
      // 1개 중 1개 = 3
      // 3C1 전체 중 1개 = 3
      // 2개의 키로 2C1 = 2

      // 2C1 + 1C1 = 3
      // 2C1 * 1C1 = 2
    ).toBe(5);
  });
  test('예제 2', () => {
    expect(
      solution([
        ['crow_mask', 'face'],
        ['blue_sunglasses', 'face'],
        ['smoky_makeup', 'face'],
      ])
      // 3개 중 1개 = 3 3C1
    ).toBe(3);
  });

  test('예제 3', () => {
    expect(
      solution([
        ['crow_mask', 'foo'],
        ['blue_sunglasses', 'bar'],
        ['smoky_makeup', 'baz'],
      ])
      // 3개 중 1개 = 3 3C1
      // 3개 중 2개 = 3 3C2
      // 3개 중 3개 = 1 3C3
    ).toBe(7);
  });
});
// AB CD EF
// A B C D E F
// AC AD AE AF BC BD BE BF CE CF DE DF
// ACE ACF ADE ADF BCE BCF BDE BDF
```

<details>
<summary>2023년 09월 19일</summary>
<div markdown="1">

```js
/**
 * @param {[string, string][]} clothes
 * @returns {number}
 */
function solution(clothes) {
  let result = 1;
  const memo = new Map();
  clothes.forEach(([name, kind]) => {
    if (!memo.get(kind)) memo.set(kind, [name]);
    else memo.set(kind, [...memo.get(kind), name]);
  });
  // 아래가 어려웠습니다.
  for (const item of memo.values()) {
    result *= item.length + 1;
  }
  // 1종류 1개
  // nC1 + nC1 ...
  // 2종류 1개
  // nC1 * nC1 +
  // 3종류 1개
  // 4종류 1개 ...
  return result - 1;
}

export default solution;
```

순열과 조합을 표현하지 못했고 또 위 문제를 대수적으로 표현하지 못했습니다.

[해설을 봐도 모르겠습니다.. 누가 설명좀 해주셨으면 감사하겠습니다.](https://school.programmers.co.kr/questions/46417)

해설을 봤습니다.

순열과 조합 경우의 수 문제였습니다.

</div>
</details>
