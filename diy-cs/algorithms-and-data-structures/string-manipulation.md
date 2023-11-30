---
sidebar_position: 14
description: '문자열 조작'
tags: ['자료구조', '문제유형', '문자열 조작']
---

# 문자열 조작

일상 생활에서 자주 표현하는 형식들이 있습니다. 이 형석을 맞출 때 유용한 메서드가 존재합니다.

`toLocaleString`입니다. `Number`의 동적 메서드입니다. 문자의 콤마(`,`) 표시 등 유용합니다.

대소문자 조작이 [필요한 경우](https://www.acmicpc.net/problem/2744)들이 있습니다. 다음 함수를 활용하기 바랍니다.

```js
/**
 * @param {string} char
 * @returns {boolean}
 */
function isLowerCase(char) {
  if ('a'.charCodeAt() <= char.charCodeAt()) return true;
  else return false;
}
```

이렇게 아스키코드를 활용해서 풀기 바랍니다.

<!-- @todo:
- KMP 알고리즘 다루기
 -->

## 튜플

[튜플](https://school.programmers.co.kr/learn/courses/30/lessons/64065)

```js
/**
 * @param {string} s
 * @returns {number[]}
 */
function solution(s) {
  let result = [];
  return result;
}
```

```js
import solution, { parseTuple, splitNestedTuple } from './playground';
import { test, expect, describe } from 'vitest';

// s	                              result
// "{{2},{2,1},{2,1,3},{2,1,3,4}}"	[2, 1, 3, 4]
// "{{1,2,3},{2,1},{1,2,4,3},{2}}"	[2, 1, 3, 4]
// "{{20,111},{111}}"	              [111, 20]
// "{{123}}"	                      [123]
// "{{4,2,3},{3},{2,3,4,1},{2,3}}"	[3, 2, 4, 1]

describe('튜플', () => {
  test('예제 1', () => {
    expect(solution('{{2},{2,1},{2,1,3},{2,1,3,4}}')).toEqual([2, 1, 3, 4]);
  });

  test('예제 2', () => {
    expect(solution('{{1,2,3},{2,1},{1,2,4,3},{2}}')).toEqual([2, 1, 3, 4]);
  });

  test('예제 3', () => {
    expect(solution('{{20,111},{111}}')).toEqual([111, 20]);
  });

  test('예제 4', () => {
    expect(solution('{{123}}')).toEqual([123]);
  });

  test('예제 5', () => {
    expect(solution('{{4,2,3},{3},{2,3,4,1},{2,3}}')).toEqual([3, 2, 4, 1]);
  });
});
```

<details>
<summary>2023년 09월 19일</summary>
<div markdown="1">

```js
/**
 * @param {string} s
 * @returns {number[]}
 */
function solution(s) {
  /** @type {string[]} */
  let parsedTuple = [];
  let pushFlag = false;
  for (let i = 0; i < s.slice(1, s.length - 1).length; i++) {
    if (s[i] === '{') {
      pushFlag = true;
      parsedTuple.push('');
      continue;
    }
    if (s[i] === '}') {
      pushFlag = false;
      continue;
    }
    if (pushFlag) parsedTuple[parsedTuple.length - 1] += s[i];
  }

  parsedTuple = parsedTuple
    .map((char) => char.split(',').map((char) => parseInt(char)))
    .slice(1)
    .sort((a, b) => a.length - b.length);

  let prev = [];
  const result = Array.from({ length: parsedTuple.length }, (_, idx) => {
    const newElem = parsedTuple[idx].filter((elem) => !prev.includes(elem))[0];
    prev = parsedTuple[idx];
    return newElem;
  });

  return result;
}

export default solution;
```

위는 저의 답안입니다.

```js
function solution(s) {
  return JSON.parse(s.replace(/{/g, '[').replace(/}/g, ']'))
    .sort((a, b) => a.length - b.length)
    .reduce((arr, v, n) => {
      if (n) {
        return arr.concat(v.filter((f) => !arr.includes(f)));
      }
      return v;
    }, []);
}
```

위는 모범답안입니다.

</div>
</details>

## 오늘 날짜

[오늘 날짜](https://www.acmicpc.net/problem/10699)

<details>
<summary>2023년 10월 26일</summary>
<div markdown="1">

```js
console.log(new Date().toISOString().split('T')[0]); // 2023-10-26
```

</div>
</details>

## 대문자 변환

[CAPS](https://www.acmicpc.net/problem/15000)

이런 문제는 곧 삭제할지도 모릅니다.

```js
const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : __dirname + '/input.txt';
const [input] = fs.readFileSync(filePath).toString().split('\n');

/**
 * @param {string} input
 * @returns {string}
 */
function solution(input) {
  return input.toLocaleUpperCase();
}

console.log(solution(input));
```
