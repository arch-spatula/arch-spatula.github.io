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

## [1차] 뉴스 클러스터링

[[1차] 뉴스 클러스터링](https://school.programmers.co.kr/learn/courses/30/lessons/17677)

```js
function solution(str1, str2) {
  var answer = 0;
  return answer;
}
```

```js
import solution, { getIntersection, getUnion } from './playground';
import { test, expect, describe } from 'vitest';

// str1	      str2	      answer
// FRANCE	    french	    16384
// handshake	shake hands	65536
// aa1+aa2	  AAAA12	    43690
// E=M*C^2	  e=m*c^2	    65536

describe('뉴스 클러스터링', () => {
  test('예제 1', () => {
    expect(solution('FRANCE', 'french')).toBe(16384);
  });
  test('예제 2', () => {
    expect(solution('handshake', 'shake hands')).toBe(65536);
  });
  test('예제 3', () => {
    expect(solution('aa1+aa2', 'AAAA12')).toBe(43690);
  });
  test('예제 4', () => {
    expect(solution('E=M*C^2', 'e=m*c^2')).toBe(65536);
  });
});
```

<details>
<summary>추가 테스트 코드</summary>
<div markdown="1">

```js
describe('helper', () => {
  test('getUnion - 1', () => {
    expect(
      getUnion(['fr', 'ra', 'an', 'nc', 'ce'], ['fr', 're', 'en', 'nc', 'ch'])
    ).toEqual(['fr', 'ra', 'an', 'nc', 'ce', 're', 'en', 'ch']);
  });
  test('getUnion - 2', () => {
    expect(getUnion(['aa', 'aa'], ['aa', 'aa', 'aa'])).toEqual([
      'aa',
      'aa',
      'aa',
    ]);
  });
  test('getIntersection - 1', () => {
    expect(
      getIntersection(
        ['FR', 'RA', 'AN', 'NC', 'CE'],
        ['FR', 'RE', 'EN', 'NC', 'CH']
      )
    ).toEqual(['FR', 'NC']);
  });
  test('getIntersection - 2', () => {
    expect(getIntersection(['aa', 'aa'], ['aa', 'aa', 'aa'])).toEqual([
      'aa',
      'aa',
    ]);
  });
});
```

</div>
</details>

<details>
<summary>2023년 10월 05일 시도</summary>
<div markdown="1">

```js
/**
 * @param {string} str1
 * @param {string} str2
 * @returns {number}
 */
function solution(str1, str2) {
  // 모두 소문자 처리
  // 2개 쪼개기
  const leftList = splitByTwo(str1.toUpperCase());
  const rightList = splitByTwo(str2.toUpperCase());

  // 교집합
  const intersectionSet = getIntersection(leftList, rightList);

  // 합집합
  const unionSet = getUnion(leftList, rightList);

  // 분모 사이즈 0대응하기
  if (unionSet.length === 0) return 65536;
  return parseInt((intersectionSet.length / unionSet.length) * 65536);
}

/**
 * @param {string} str
 * @returns {string[]}
 */
function splitByTwo(str) {
  const result = [];
  for (let i = 0; i < str.length - 1; i += 1) {
    const item = str.slice(i, i + 2);
    // 공백이나 숫자, 특수 문자 -> 문나열만 해당하는 정규표현식
    if (/^[a-zA-Z]+$/.test(item)) result.push(item);
  }
  return result;
}

/**
 * @param {string[]} set1
 * @param {string[]} set2
 * @returns {string[]}
 */
function getIntersection(set1, set2) {
  // 빈도수 카운터
  /** @type {Map<string, {left: number, right: number}>} */
  const memo = new Map();
  set1.forEach((elem) => {
    const pointer = memo.get(elem);
    if (pointer)
      memo.set(elem, { ...pointer, left: pointer.left + 1, right: 0 });
    else memo.set(elem, { ...pointer, left: 1, right: 0 });
  });
  set2.forEach((elem) => {
    const pointer = memo.get(elem);
    if (pointer) memo.set(elem, { ...pointer, right: pointer.right + 1 });
    else memo.set(elem, { ...pointer, right: 1 });
  });
  const result = [];
  memo.forEach((value, key) => {
    const left = value.left;
    const right = value.right;
    if (left > right) result.push(...Array.from({ length: right }, () => key));
    else result.push(...Array.from({ length: left }, () => key));
  });

  return result;
}

/**
 * @param {string[]} set1
 * @param {string[]} set2
 * @returns {string[]}
 */
function getUnion(set1, set2) {
  // 빈도수 카운터
  /** @type {Map<string, {left: number, right: number}>} */
  const memo = new Map();
  set1.forEach((elem) => {
    const pointer = memo.get(elem);
    if (pointer)
      memo.set(elem, { ...pointer, left: pointer.left + 1, right: 0 });
    else memo.set(elem, { ...pointer, left: 1, right: 0 });
  });
  set2.forEach((elem) => {
    let pointer = memo.get(elem);
    if (!pointer || !pointer.left) memo.set(elem, { ...pointer, left: 0 });
    pointer = memo.get(elem);
    if (pointer.right) memo.set(elem, { ...pointer, right: pointer.right + 1 });
    else memo.set(elem, { ...pointer, right: 1 });
  });

  const result = [];
  memo.forEach((value, key) => {
    const left = value.left;
    const right = value.right;
    if (left < right) result.push(...Array.from({ length: right }, () => key));
    else result.push(...Array.from({ length: left }, () => key));
  });
  return result;
}

export default solution;

export { getUnion, getIntersection, splitByTwo };
```

모범정답이 아닙니다.

```js
function solution(str1, str2) {
  function explode(text) {
    const result = [];
    for (let i = 0; i < text.length - 1; i++) {
      const node = text.substr(i, 2);
      if (node.match(/[A-Za-z]{2}/)) {
        result.push(node.toLowerCase());
      }
    }
    return result;
  }

  const arr1 = explode(str1);
  const arr2 = explode(str2);
  const set = new Set([...arr1, ...arr2]);
  let union = 0;
  let intersection = 0;

  set.forEach((item) => {
    const has1 = arr1.filter((x) => x === item).length;
    const has2 = arr2.filter((x) => x === item).length;
    union += Math.max(has1, has2);
    intersection += Math.min(has1, has2);
  });
  return union === 0 ? 65536 : Math.floor((intersection / union) * 65536);
}
```

</div>
</details>
