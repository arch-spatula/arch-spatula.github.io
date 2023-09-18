---
sidebar_position: 11
description: '스택'
tags: ['스택', '자료구조', '문제유형']
---

# 스택

일상에서 상당히 자주 활용하는 자료구조입니다. 대부분 언어차원에서 제공하고 있습니다.

극한의 상황에서 라이브 코딩을 시킨다면 stack이 존재하지 않는 C언어로 시켜볼 것입니다. 하지만 링크드 리스트의 응용이라고 설명할 수 있으면 충분히 이해했다고 간주하는 사람들도 있습니다.

## 카드 뭉치

[카드 뭉치](https://school.programmers.co.kr/learn/courses/30/lessons/159994)

```js
import solution from './playground';
import { test, expect, describe } from 'vitest';

describe('n^2 배열 자르기', () => {
  test('예제 1', () => {
    expect(
      solution(
        ['i', 'drink', 'water'],
        ['want', 'to'],
        ['i', 'want', 'to', 'drink', 'water']
      )
    ).toBe('Yes');
  });
  test('예제 2', () => {
    expect(
      solution(
        ['i', 'water', 'drink'],
        ['want', 'to'],
        ['i', 'want', 'to', 'drink', 'water']
      )
    ).toBe('No');
  });
});
```

<details>
<summary>2023년 09월 12일 풀이</summary>
<div markdown="1">

```js
/**
 * @typedef {string[]} CardsType
 * @param {CardsType} cards1
 * @param {CardsType} cards2
 * @param {CardsType} goal
 * @returns {"Yes" | "No"}
 */
function solution(cards1, cards2, goal) {
  cards1.reverse();
  cards2.reverse();
  goal.reverse();

  const count = goal.length;

  for (let i = 0; i < count; i++) {
    if (goal.at(-1) === cards1.at(-1)) {
      cards1.pop();
      goal.pop();
      continue;
    }
    if (goal.at(-1) === cards2.at(-1)) {
      cards2.pop();
      goal.pop();
      continue;
    }
  }

  return goal.length === 0 ? 'Yes' : 'No';
}

export default solution;
```

</div>
</details>
