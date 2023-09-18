---
sidebar_position: 9
description: 'LRU'
tags: ['LRU', '알고리즘', '캐시']
---

# LRU

빈도수 카운터와 Queue의 확장입니다.

## 1차 캐시

[1차 캐시](https://school.programmers.co.kr/learn/courses/30/lessons/17680)

진짜 Queue자료구조처럼 정확히 삽입, 탐색, 삭제 시간을 갖어야 하는 것은 아닙니다.

```js
import solution from './playground';
import { test, expect, describe } from 'vitest';

describe('1차 캐시', () => {
  test('예제 1', () => {
    expect(
      solution(3, [
        'Jeju',
        'Pangyo',
        'Seoul',
        'NewYork',
        'LA',
        'Jeju',
        'Pangyo',
        'Seoul',
        'NewYork',
        'LA',
      ])
    ).toBe(50);
  });
  test('예제 2', () => {
    expect(
      solution(3, [
        'Jeju',
        'Pangyo',
        'Seoul',
        'Jeju',
        'Pangyo',
        'Seoul',
        'Jeju',
        'Pangyo',
        'Seoul',
      ])
    ).toBe(21);
  });
  test('예제 3', () => {
    expect(
      solution(2, [
        'Jeju',
        'Pangyo',
        'Seoul',
        'NewYork',
        'LA',
        'SanFrancisco',
        'Seoul',
        'Rome',
        'Paris',
        'Jeju',
        'NewYork',
        'Rome',
      ])
    ).toBe(60);
  });
  test('예제 4', () => {
    expect(
      solution(5, [
        'Jeju',
        'Pangyo',
        'Seoul',
        'NewYork',
        'LA',
        'SanFrancisco',
        'Seoul',
        'Rome',
        'Paris',
        'Jeju',
        'NewYork',
        'Rome',
      ])
    ).toBe(52);
  });
  test('예제 5', () => {
    expect(solution(2, ['Jeju', 'Pangyo', 'NewYork', 'newyork'])).toBe(16);
  });
  test('예제 6', () => {
    expect(solution(0, ['Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA'])).toBe(25);
  });
  test('test', () => {
    const arr = [1, 2, 3, 4, 5];
    arr.splice(2, 1);
    arr.unshift(3);
    expect(arr).toEqual([3, 1, 2, 4, 5]);
  });
});
```

<details>
<summary>2023년 09월 15일 풀이</summary>
<div markdown="1">

```js
/**
 * @param {number} cacheSize
 * @param {string[]} cities
 * @returns {number}
 */
function solution(cacheSize, cities) {
  let time = 0;
  const cache = [];
  // 도시 탐색
  for (let i = 0; i < cities.length; i++) {
    let hitFlag = false;
    for (let j = 0; j < cache.length; j++) {
      if (cache[j] === cities[i].toLowerCase()) {
        time += 1;
        hitFlag = true;
        cache.splice(j, 1);
        cache.unshift(cities[i].toLowerCase());
        break;
      }
    }
    if (hitFlag) continue;

    // miss
    time += 5;
    cache.unshift(cities[i].toLowerCase());
    if (cache.length > cacheSize) cache.pop();
  }
  return time;
}
```

</div>
</details>
