---
sidebar_position: 16
description: 'DFS & BFS'
tags: ['DFS & BFS', '알고리즘', '자료구조', '문제유형']
draft: true
---

# DFS & BFS

실제 업무에서도 활용하는 개념입니다. 포괄적으로 그래프 자료형에 사용됩니다.

Stack, Queue 지식에 대한 의존성이 있습니다.

<iframe class="codepen" src="https://www.youtube.com/embed/cWNEl4HE2OE" title="I watch your videos but nothing changes" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## 그래프(Graph) 자료구조

그래프(Graph)의 유형은 2가지가 존재합니다. 행렬과 객체입니다. 방향과 무게가 존재할 수 있고 안 존재할 수 있습니다. 한번 보면 생각보다 단순합니다.

아주가끔은 본인에게 돌아올 때도 있습니다. 이것을 보고 사이클이라고 합니다.

```
    g
  /   \
 h     i
  \   /
    j
   / \
  k   l
```

|     | g   | h   | j   | i   | k   | l   |
| --- | --- | --- | --- | --- | --- | --- |
| g   | 0   | 1   | 0   | 1   | 0   | 0   |
| h   | 1   | 0   | 1   | 0   | 0   | 0   |
| j   | 0   | 1   | 0   | 1   | 1   | 1   |
| i   | 1   | 0   | 1   | 0   | 0   | 0   |
| k   | 0   | 0   | 1   | 0   | 0   | 0   |
| l   | 0   | 0   | 1   | 0   | 0   | 0   |

위 관계를 이런 표로 표현할 수 있습니다.

```js
const order = ['g', 'h', 'j', 'i', 'k', 'l'];
const matrix = [
  [0, 1, 0, 1, 0, 0],
  [1, 0, 1, 0, 0, 0],
  [0, 1, 0, 1, 1, 1],
  [1, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
];
```

표를 활용하면 중첩배열로 이렇게 표현이 가능합니다. 이렇게하면 단점은 공간복잡성이 크다는 것입니다.

읽기 위주의 데이터 사이언스 분야가 아니라면 대체로 피하려고 할 것입니다. 또 그래프에 삽입 삭제가 복잡성이 높은 것도 단점입니다.

```js
const graph = {
  g: ['h', 'i'],
  h: ['g', 'j'],
  j: ['h', 'i', 'k', 'l'],
  i: ['g', 'j'],
  k: ['j']
  l: ['j']
};
```

일반적으로 자주보게 될 형식입니다.

DFS는 Stack을 사용해서 현재 노드에서 마지막에 확인한 노드부터 바로 방문합니다.

BFS는 Queue를 사용해서 인접 노드들을 보고 추가했던 순서대로 방문합니다.

<!-- @todo: 그래프 클래스 다루기 -->

## 쉬운 실제 예시

최대한 단순한 예시에서 시작하겠습니다.

```js
const graph = {
  g: ['h', 'i'],
  h: ['g', 'j'],
  j: ['h', 'i', 'k', 'l'],
  i: ['g', 'j'],
  k: ['j'],
  l: ['j'],
};

/**
 * @param {Record<string, string[]>} graph
 * @param {string} startingNode
 * @returns {string[]}
 */
function dfs(graph, startingNode) {
  const result = [];
  return result;
}

/**
 * @param {Record<string, string[]>} graph
 * @param {string} startingNode
 * @returns {string[]}
 */
function bfs(graph, startingNode) {
  const result = [];
  return result;
}
```

여기까지 시그니쳐보다 약간 더 정의합시다. 그리고 여기에 맞는 테스트 코드는 다음과 같습니다.

```js
import { describe, test, expect } from 'vitest';
import { bfs, dfs } from './main';

//     g
//   /   \
//  h     i
//   \   /
//     j
//    / \
//   k   l

describe('DFS', () => {
  test('g -> i -> j -> l -> k -> h', () => {
    const graph = {
      g: ['h', 'i'],
      h: ['g', 'j'],
      j: ['h', 'i', 'k', 'l'],
      i: ['g', 'j'],
      k: ['j'],
      l: ['j'],
    };

    const result = dfs(graph, 'g');

    expect(result).toEqual(['g', 'i', 'j', 'l', 'k', 'h']);
  });
});

describe('BFS', () => {
  test('g -> h -> i -> j -> k -> l', () => {
    const graph = {
      g: ['h', 'i'],
      h: ['g', 'j'],
      j: ['h', 'i', 'k', 'l'],
      i: ['g', 'j'],
      k: ['j'],
      l: ['j'],
    };

    const result = bfs(graph, 'g');

    expect(result).toEqual(['g', 'h', 'i', 'j', 'k', 'l']);
  });
});
```

먼저 성능과 무관하게 단순탐색만 하겠습니다.

<details>
<summary>정답</summary>
<div markdown="1">

```js
/**
 * @param {Record<string, string[]>} graph
 * @param {string} startingNode
 * @returns {string[]}
 */
function dfs(graph, startingNode) {
  const visited = new Set();
  const stack = [startingNode];
  const result = [];
  while (stack.length) {
    const current = stack.pop();
    if (visited.has(current)) continue;
    visited.add(current);
    result.push(current);
    stack.push(...graph[current]);
  }
  return result;
}

/**
 * @param {Record<string, string[]>} graph
 * @param {string} startingNode
 * @returns {string[]}
 */
function bfs(graph, startingNode) {
  const visited = new Set();
  const queue = [startingNode];
  const result = [];
  while (queue.length) {
    const current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);
    result.push(current);
    queue.push(...graph[current]);
  }
  return result;
}
```

방문여부를 계속 기록하고 방문할 노드를 순서대로 확인하는 방식으로 동작합니다. 최대한 단순하고 몇줄의 코드로 이해하게 만들고자 작성했습니다.

여기에서 실제로 성능 개선할 부분들이 존재합니다.

</div>
</details>

<!-- @todo: 성능을 개선해보겠습니다. -->
