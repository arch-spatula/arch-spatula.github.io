---
sidebar_position: 12
description: '큐'
tags: ['큐', '자료구조', '문제유형', 'queue']
---

# 큐(Queue)

## 프로세스

[프로세스](https://school.programmers.co.kr/learn/courses/30/lessons/42587)

```js
function solution(priorities, location) {
  let result = 0;
  return result;
}

export default solution;
```

```js
import solution from './42587';
import { test, expect, describe } from 'vitest';

describe('프로세스', () => {
  test('예제 1', () => {
    expect(solution([2, 1, 3, 2], 2)).toBe(1);
  });
  test('예제 2', () => {
    expect(solution([1, 1, 9, 1, 1, 1], 0)).toBe(5);
  });
  test('예제 3', () => {
    expect(solution([2, 1, 2, 1, 2, 1, 2, 1, 2], 1)).toBe(6);
  });
});
```

<details>
<summary>2023년 09월 30일 풀이</summary>
<div markdown="1">

```js
/**
 * @param {number[]} priorities
 * @param {number} location
 * @returns {number}
 */
function solution(priorities, location) {
  const queue = [...priorities].map((num, idx) => ({ priority: num, idx }));
  const orderedList = [];

  while (queue.length > 0) {
    // dequeue
    const dequeue = queue.shift();
    const max = Math.max(...queue.map((elem) => elem.priority));
    if (max > dequeue.priority) {
      // 더 큰것이 있으면 enqueue
      queue.push(dequeue);
    } else {
      // 더 큰것이 없으면 ordered에 추가하고 삭제
      orderedList.push(dequeue);
    }
    // 없으면 while 중단
  }

  // location 선형탐색
  const result = orderedList.findIndex((elem) => elem.idx === location) + 1;
  // 해당 인덱스 반환
  return result;
}

export default solution;
```

</div>
</details>
