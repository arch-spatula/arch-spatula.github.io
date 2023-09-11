---
sidebar_position: 4
description: '빈도수 세기'
tags: ['빈도수 세기', 'frequency counter', '문제 유형']
---

# 빈도수 세기

빈도수 세기(frequency counter)는 등장 횟수를 기록하는 문제 유형입니다. `Map` 문제랑 겹치는 경우가 많습니다.

## 최빈값 구하기

[최빈값 구하기 - 프로그래머스](https://school.programmers.co.kr/learn/courses/30/lessons/120812)

```js
/**
 * @param {number[]} array
 * @returns {number}
 */
function solution(array) {
  var answer = 0;
  return answer;
}
```

```js
import solution from './playground';
import { test, expect, describe } from 'vitest';

// array	            result
// [1, 2, 3, 3, 3, 4]	3
// [1, 1, 2, 2]	      -1
// [1]	              1

describe('최빈값 구하기', () => {
  test('예제 1', () => {
    expect(solution([1, 2, 3, 3, 3, 4])).toBe(3);
  });
  test('예제 2', () => {
    expect(solution([1, 1, 2, 2])).toBe(-1);
  });
  test('예제 3', () => {
    expect(solution([1])).toBe(1);
  });
});
```

<details>
<summary>2023년 09월 01일</summary>
<div markdown="1">

```js
/**
 * @param {number[]} array
 * @returns {number}
 */
function solution(array) {
  const memo = new Map();

  array.forEach((elem) => {
    if (memo.get(elem) === undefined) memo.set(elem, 1);
    else memo.set(elem, memo.get(elem) + 1);
  });

  let modeCount = 0;
  let modeValue = 0;
  memo.forEach((value, key) => {
    if (modeCount < value) {
      modeValue = key;
      modeCount = value;
    }
  });

  let maxDouble = 0;
  memo.forEach((value, key) => {
    if (value === modeCount) maxDouble += 1;
  });
  if (maxDouble >= 2) return -1;

  return modeValue;
}
```

</div>
</details>
