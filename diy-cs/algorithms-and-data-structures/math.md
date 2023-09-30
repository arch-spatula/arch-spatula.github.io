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
