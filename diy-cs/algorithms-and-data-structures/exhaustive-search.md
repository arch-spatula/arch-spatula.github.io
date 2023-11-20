---
sidebar_position: 15
description: '완전 탐색'
tags: ['완전 탐색', '알고리즘', '문제유형']
draft: true
---

# 완전 탐색(Exhaustive Search)

부르트 포스랑 자주 혼용합니다. 하지만 다릅니다. 정렬안된 자료에서 순차 탐색이 부르트포스입니다.

경우의 수 지식에 의존성을 갖고 있습니다.

## 피로도

[피로도](https://school.programmers.co.kr/learn/courses/30/lessons/87946)

### 1차 시도

https://school.programmers.co.kr/learn/courses/30/lessons/87946

```js
/**
 * @param {number} k
 * @param {[number, number][]} dungeons
 * @returns {number}
 */
function solution(k, dungeons) {
  let answer = -1;
  return answer;
}

export default solution;
```

```js
/**
 * @param {number} k
 * @param {[number, number][]} dungeons
 * @returns {number}
 */
function solution(k, dungeons) {
  const sortedDungeons = dungeons.slice().sort((a, b) => {
    const [entryA, costA] = a;
    const [entryB, costB] = b;
    if (entryA / costA > entryB / costB) return 1;
    else return -1;
  });
  let result = 0;
  const sortedDungeonsLength = sortedDungeons.length;
  for (let i = 0; i < sortedDungeonsLength; i++) {
    const currentDungeon = sortedDungeons.pop();
    const [entry, cost] = currentDungeon;
    if (entry > k) break;
    k -= cost;
    result += 1;
  }
  return result;
}

export default solution;
```

```js
import solution, { getIntersection, getUnion } from './playground';
import { test, expect, describe } from 'vitest';

// k	dungeons	                result
// 80	[[80,20],[50,40],[30,10]]	3

describe('피로도', () => {
  test('예제 1', () => {
    expect(
      solution(80, [
        [80, 20],
        [50, 40],
        [30, 10],
      ])
    ).toBe(3);
  });
});
```

2차 시도는 DFS로 해야 합니다. 하지만 경우의 수와 완전탐색의 관계를 파악하고 진행할 것입니다.
