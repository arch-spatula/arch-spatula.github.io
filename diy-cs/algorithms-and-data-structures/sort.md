---
sidebar_position: 10
description: '정렬'
tags: ['정렬', '알고리즘', '문제유형']
---

# 정렬

정렬을 활용하는 문제도 있고 정렬을 구현하는 알고리즘도 있습니다.

## H-index

[H-index](https://school.programmers.co.kr/learn/courses/30/lessons/42747)

문해력 문제가 되기도 합니다. 질문들을 보면 사람들이 문해력으로 고생한 것을 볼 수 있습니다. ~~저도 고생했습니다.~~

```js
import solution from './playground';
import { test, expect, describe } from 'vitest';

// citations	      return
// [3, 0, 6, 1, 5]	3

describe('n^2 배열 자르기', () => {
  test('예제 1', () => {
    expect(solution([3, 0, 6, 1, 5])).toBe(3);
  });
  test('예제 2', () => {
    expect(solution([0, 0, 0])).toBe(0);
  });
  test('예제 3', () => {
    expect(solution([6, 5, 5, 5, 3, 2, 1, 0])).toBe(4);
  });
  test('예제 4', () => {
    expect(solution([1, 4, 5])).toBe(2);
  });
  test('예제 5', () => {
    expect(solution([5, 6, 7])).toBe(3);
  });
});
```

<details>
<summary>2023년 09월 13일 풀이</summary>
<div markdown="1">

```js
/**
 * 어떤 과학자가 발표한 논문 n편 중, h번 이상 인용된 논문이 h편 이상이고 나머지 논문이 h번 이하 인용되었다면 h의 최댓값이 이 과학자의 H-Index입니다.
 * @param {number[]} citations
 * @returns {number}
 */
function solution(citations) {
  // 빈도수 카운터
  const hList = [];
  // 어떤 과학자가 발표한 논문 n편 중,
  for (let h = 0; h <= citations.length; h++) {
    const above = [];
    const below = [];
    for (let i = 0; i < citations.length; i++) {
      if (citations[i] >= h) above.push(citations[i]);
      else below.push(citations[i]);
    }
    // h번 이상 인용된 논문이 h편 이상이고
    // 나머지 논문이 h번 이하 인용되었다면
    if (above.length >= h && below.every((num) => num <= h)) hList.push(h);
  }

  // h의 최댓값이 이 과학자의 H - Index입니다.
  return Math.max(...hList);
}

export default solution;
```

나중에 알았지만 문제 분류가 정렬이었습니다.

</div>
</details>

<details>
<summary>모범답안</summary>
<div markdown="1">

```js
/**
 * 어떤 과학자가 발표한 논문 n편 중, h번 이상 인용된 논문이 h편 이상이고 나머지 논문이 h번 이하 인용되었다면 h의 최댓값이 이 과학자의 H-Index입니다.
 * @param {number[]} citations
 * @returns {number}
 */
function solution(citations) {
  citations = citations.sort((a, b) => b - a);
  var i = 0;
  while (i + 1 <= citations[i]) i++;
  return i;
}
```

모범 답안입니다. 간략한 것도 충격입니다. $O(N \cdot log(N))$ 으로 풀이한 것이 충격적입니다.

</div>
</details>
