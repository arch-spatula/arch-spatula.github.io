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
<summary>DFS Stack 정답</summary>
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
```

</div>
</details>

<details>
<summary>BFS Queue 정답</summary>
<div markdown="1">

```js
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

위 정답을 확인하면 DFS, BFS에서 각각 Stack, Queue에 따라 다르게 동작한다는 것을 파악하는 것이 핵심입니다. DFS의 경우 Stack을 사용할 수 있고 재귀함수를 사용할 수 있는 경우도 존재합니다. 때로는 코드상 재귀함수가 더 직관적인 상황들도 있습니다. 재귀함수를 사용할 수 있는 이유는 결국 대부분의 프로그램은 콜스택이기 때문입니다.

<details>
<summary>DFS 재귀함수 정답</summary>
<div markdown="1">

```js
/**
 * @param {Record<string, string[]>} graph
 * @param {string} startingNode
 */
export function dfs(graph, startingNode) {
  const visited = new Set();
  const result = [];

  (function stack(currentNode) {
    if (visited.has(currentNode)) return;
    visited.add(currentNode);
    result.push(currentNode);
    graph[currentNode].reverse().forEach((nextNode) => {
      stack(nextNode);
    });
  })(startingNode);

  return result;
}
```

참고를 함수를 사용하면 방문하는 순서가 달라서 중간에 `reverse` 하나만 두면 테스트 케이스를 모두 통과합니다.

</div>
</details>

즉시실행 재귀함수를 활용해서 이렇게 풀 수 있습니다.

<!-- @todo: 성능을 개선해보겠습니다. -->

## 그래프 클래스

그래프를 클래스에 넣어보겠습니다.

이전에 봤던 함수 DFS-BFS의 문제는 객체와 배열을 사용한다는 점입니다. 즉 호출자가 어답터를 만들어 주는 등 번거로움이 있습니다.

<details>
<summary>한번에 풀어보고 싶은 사람들을 위한 테스트 코드</summary>
<div markdown="1">

```js
//     g
//   /   \
//  h     i
//   \   /
//     j
//    / \
//   k   l

describe('graph', () => {
  test('생각한 형식처럼 만들어짐', () => {
    const map = new Map();
    map.set('g', ['h', 'i']);
    map.set('h', ['g', 'j']);
    map.set('j', ['h', 'i', 'k', 'l']);
    map.set('i', ['g', 'j']);
    map.set('k', ['j']);
    map.set('l', ['j']);
    const graph = new Graph();

    graph.addNode('g');
    graph.addNode('h');
    graph.addNode('j');
    graph.addNode('i');
    graph.addNode('k');
    graph.addNode('l');

    graph.addEdge('g', 'h');
    graph.addEdge('g', 'i');
    graph.addEdge('h', 'j');
    graph.addEdge('i', 'j');
    graph.addEdge('j', 'k');
    graph.addEdge('j', 'l');

    expect(graph.getGraph).toEqual(map);
  });
  test('BFS: g -> h -> i -> j -> k -> l', () => {
    const graph = new Graph();

    graph.addNode('g');
    graph.addNode('h');
    graph.addNode('j');
    graph.addNode('i');
    graph.addNode('k');
    graph.addNode('l');

    graph.addEdge('g', 'h');
    graph.addEdge('g', 'i');
    graph.addEdge('h', 'j');
    graph.addEdge('i', 'j');
    graph.addEdge('j', 'k');
    graph.addEdge('j', 'l');

    const result = graph.BFS('g');

    expect(result).toEqual(['g', 'h', 'i', 'j', 'k', 'l']);
  });
  test('DFS: g -> i -> j -> l -> k -> h', () => {
    const graph = new Graph();

    graph.addNode('g');
    graph.addNode('h');
    graph.addNode('j');
    graph.addNode('i');
    graph.addNode('k');
    graph.addNode('l');

    graph.addEdge('g', 'h');
    graph.addEdge('g', 'i');
    graph.addEdge('h', 'j');
    graph.addEdge('i', 'j');
    graph.addEdge('j', 'k');
    graph.addEdge('j', 'l');

    const result = graph.DFS('g');

    expect(result).toEqual(['g', 'i', 'j', 'l', 'k', 'h']);
  });
});
```

</div>
</details>

<details>
<summary>한번에 풀어보고 바로 보고 싶은 정답</summary>
<div markdown="1">

```js
export class Graph {
  #graph;
  constructor() {
    this.#graph = new Map();
  }
  addNode(node) {
    if (this.#graph.get(node)) return null;
    this.#graph.set(node, []);
  }
  removeNode(node) {
    if (!this.#graph.get(node)) return null;
    this.#graph.delete(node);
  }
  addEdge(node1, node2) {
    /** @type {any[]} */
    const node1Adjacent = this.#graph.get(node1);
    /** @type {any[]} */
    const node2Adjacent = this.#graph.get(node2);
    if (!node1Adjacent || !node2Adjacent) return null;
    // 중복 생성에 대한 가드
    if (!node1Adjacent.includes(node2))
      this.#graph.set(node1, [...node1Adjacent, node2]);
    if (!node2Adjacent.includes(node1))
      this.#graph.set(node2, [...node2Adjacent, node1]);
  }
  removeEdge(node1, node2) {
    // 없는 것에 대한 가드
    /** @type {any[]} */
    const node1Adjacent = this.#graph.get(node1);
    /** @type {any[]} */
    const node2Adjacent = this.#graph.get(node2);
    if (!node1Adjacent || !node2Adjacent) return null;
    // 중복 제거에 대한 가드
    if (node1Adjacent.includes(node2))
      this.#graph.set(node1, [
        ...node1Adjacent.filter((node) => node !== node2),
      ]);
    if (node2Adjacent.includes(node1))
      this.#graph.set(node2, [
        ...node2Adjacent.filter((node) => node !== node1),
      ]);
  }
  get getGraph() {
    return this.#graph;
  }
  /**
   * @param {any} startingNode
   * @returns {any[]}
   */
  BFS(startingNode) {
    const result = [];
    const visited = new Set();
    const queue = [startingNode];
    while (queue.length) {
      const current = queue.shift();
      if (visited.has(current)) continue;
      visited.add(current);
      result.push(current);
      const adjacentNode = this.#graph.get(current);
      queue.push(...adjacentNode);
    }
    return result;
  }
  /**
   * @param {any} startingNode
   * @returns {any[]}
   */
  DFS(startingNode) {
    const result = [];
    const visited = new Set();
    const stack = [startingNode];
    while (stack.length) {
      const current = stack.pop();
      if (visited.has(current)) continue;
      visited.add(current);
      result.push(current);
      const adjacentNode = this.#graph.get(current);
      stack.push(...adjacentNode);
    }
    return result;
  }
}
```

</div>
</details>

<details>
<summary>풀이</summary>
<div markdown="1">

처음부터 관심사가 응집도 높게 클래스의 메서드로 존재했으면 더 편했을 것입니다. 지금 바로 만들어 보겠습니다.

```js
class Graph {
  constructor() {}
  addVertex() {}
  removeVertex() {}
  addEdge() {}
  removeEdge() {}
  DFS() {}
  BFS() {}
}
```

일반적으로는 위처럼 작성해주시기 바랍니다. 4가지 메서드로 그래프를 조작하고 DFS, BFS로 순수하게 읽기만 수행하도록 합니다.

하지만 일반적이지 않은 상황에서는 현재 그래프의 생김새를 알 수 있게 읽기 전용 getter를 제공해주는 것도 방법입니다.

```js
export class Graph {
  #graph;
  constructor() {
    this.#graph = new Map();
  }
  addNode(node) {}
  removeNode(node) {}
  addEdge(node1, node2) {}
  removeEdge(node1, node2) {}
  get getGraph() {
    return this.#graph;
  }
}
```

이렇게 제공하는 것도 전략입니다. `#graph`는 `privet`이라 호출자가 인스턴스를 생성하고 접근할 수 없습니다. 그리고 그래프의 생김새를 확인하기 위해서 `getGraph` 메서드를 호출하면 됩니다.

이제 테스트 코드를 먼저 작성하겠습니다.

```js
//     g
//   /   \
//  h     i
//   \   /
//     j
//    / \
//   k   l

describe('graph', () => {
  test('생각한 형식처럼 만들어짐', () => {
    const map = new Map();
    map.set('g', ['h', 'i']);
    map.set('h', ['g', 'j']);
    map.set('j', ['h', 'i', 'k', 'l']);
    map.set('i', ['g', 'j']);
    map.set('k', ['j']);
    map.set('l', ['j']);
    const graph = new Graph();

    graph.addNode('g');
    graph.addNode('h');
    graph.addNode('j');
    graph.addNode('i');
    graph.addNode('k');
    graph.addNode('l');

    graph.addEdge('g', 'h');
    graph.addEdge('g', 'i');
    graph.addEdge('h', 'j');
    graph.addEdge('i', 'j');
    graph.addEdge('j', 'k');
    graph.addEdge('j', 'l');

    expect(graph.getGraph).toEqual(map);
  });
});
```

통과시킬 메서드를 완성하겠습니다.

<details>
<summary>그래프 메서드 정답</summary>
<div markdown="1">

```js
export class Graph {
  #graph;
  constructor() {
    this.#graph = new Map();
  }
  addNode(node) {
    if (this.#graph.get(node)) return null;
    this.#graph.set(node, []);
  }
  removeNode(node) {
    if (!this.#graph.get(node)) return null;
    this.#graph.delete(node);
  }
  addEdge(node1, node2) {
    /** @type {any[]} */
    const node1Adjacent = this.#graph.get(node1);
    /** @type {any[]} */
    const node2Adjacent = this.#graph.get(node2);
    if (!node1Adjacent || !node2Adjacent) return null;
    // 중복 생성에 대한 가드
    if (!node1Adjacent.includes(node2))
      this.#graph.set(node1, [...node1Adjacent, node2]);
    if (!node2Adjacent.includes(node1))
      this.#graph.set(node2, [...node2Adjacent, node1]);
  }
  removeEdge(node1, node2) {
    // 없는 것에 대한 가드
    /** @type {any[]} */
    const node1Adjacent = this.#graph.get(node1);
    /** @type {any[]} */
    const node2Adjacent = this.#graph.get(node2);
    if (!node1Adjacent || !node2Adjacent) return null;
    // 중복 제거에 대한 가드
    if (node1Adjacent.includes(node2))
      this.#graph.set(node1, [
        ...node1Adjacent.filter((node) => node !== node2),
      ]);
    if (node2Adjacent.includes(node1))
      this.#graph.set(node2, [
        ...node2Adjacent.filter((node) => node !== node1),
      ]);
  }
  get getGraph() {
    return this.#graph;
  }
}
```

</div>
</details>
여기까지는 쉬울 것입니다.

```js
test('BFS: g -> h -> i -> j -> k -> l', () => {
  const graph = new Graph();

  graph.addNode('g');
  graph.addNode('h');
  graph.addNode('j');
  graph.addNode('i');
  graph.addNode('k');
  graph.addNode('l');

  graph.addEdge('g', 'h');
  graph.addEdge('g', 'i');
  graph.addEdge('h', 'j');
  graph.addEdge('i', 'j');
  graph.addEdge('j', 'k');
  graph.addEdge('j', 'l');

  const result = graph.BFS('g');

  expect(result).toEqual(['g', 'h', 'i', 'j', 'k', 'l']);
});
```

이제 테스트 코드를 먼저 작성해보겠습니다.

```js
export class Graph {
  #graph;
  constructor() {
    this.#graph = new Map();
  }
  addNode(node) {
    if (this.#graph.get(node)) return null;
    this.#graph.set(node, []);
  }
  removeNode(node) {
    if (!this.#graph.get(node)) return null;
    this.#graph.delete(node);
  }
  addEdge(node1, node2) {
    /** @type {any[]} */
    const node1Adjacent = this.#graph.get(node1);
    /** @type {any[]} */
    const node2Adjacent = this.#graph.get(node2);
    if (!node1Adjacent || !node2Adjacent) return null;
    // 중복 생성에 대한 가드
    if (!node1Adjacent.includes(node2))
      this.#graph.set(node1, [...node1Adjacent, node2]);
    if (!node2Adjacent.includes(node1))
      this.#graph.set(node2, [...node2Adjacent, node1]);
  }
  removeEdge(node1, node2) {
    // 없는 것에 대한 가드
    /** @type {any[]} */
    const node1Adjacent = this.#graph.get(node1);
    /** @type {any[]} */
    const node2Adjacent = this.#graph.get(node2);
    if (!node1Adjacent || !node2Adjacent) return null;
    // 중복 제거에 대한 가드
    if (node1Adjacent.includes(node2))
      this.#graph.set(node1, [
        ...node1Adjacent.filter((node) => node !== node2),
      ]);
    if (node2Adjacent.includes(node1))
      this.#graph.set(node2, [
        ...node2Adjacent.filter((node) => node !== node1),
      ]);
  }
  get getGraph() {
    return this.#graph;
  }
  /**
   * @param {any} startingNode
   * @returns {any[]}
   */
  BFS(startingNode) {
    const result = [];
    const visited = new Set();
    const queue = [startingNode];
    while (queue.length) {
      const current = queue.shift();
      if (visited.has(current)) continue;
      visited.add(current);
      result.push(current);
      const adjacentNode = this.#graph.get(current);
      queue.push(...adjacentNode);
    }
    return result;
  }
  /**
   * @param {any} startingNode
   * @returns {any[]}
   */
  DFS(startingNode) {}
}
```

통과시킬 코드입니다.

DFS는 2가지 접근 방법을 가질 수 있습니다. 하나는 재귀함수 다른 하나는 stack 역할을 동적 배열입니다. 일반적으로 동적배열로 만든 stack을 선호합니다. call stack 보다 더 많은 정보를 사용할 수 있습니다. 하지만 저희는 2가지 버전 모두 보여주겠습니다.

```js
test('DFS: g -> i -> j -> l -> k -> h', () => {
  const graph = new Graph();

  graph.addNode('g');
  graph.addNode('h');
  graph.addNode('j');
  graph.addNode('i');
  graph.addNode('k');
  graph.addNode('l');

  graph.addEdge('g', 'h');
  graph.addEdge('g', 'i');
  graph.addEdge('h', 'j');
  graph.addEdge('i', 'j');
  graph.addEdge('j', 'k');
  graph.addEdge('j', 'l');

  const result = graph.DFS('g');

  expect(result).toEqual(['g', 'i', 'j', 'l', 'k', 'h']);
});
```

먼저 달성할 테스트 케이스입니다.

```js
export class Graph {
  #graph;
  constructor() {
    this.#graph = new Map();
  }
  addNode(node) {
    if (this.#graph.get(node)) return null;
    this.#graph.set(node, []);
  }
  removeNode(node) {
    if (!this.#graph.get(node)) return null;
    this.#graph.delete(node);
  }
  addEdge(node1, node2) {
    /** @type {any[]} */
    const node1Adjacent = this.#graph.get(node1);
    /** @type {any[]} */
    const node2Adjacent = this.#graph.get(node2);
    if (!node1Adjacent || !node2Adjacent) return null;
    // 중복 생성에 대한 가드
    if (!node1Adjacent.includes(node2))
      this.#graph.set(node1, [...node1Adjacent, node2]);
    if (!node2Adjacent.includes(node1))
      this.#graph.set(node2, [...node2Adjacent, node1]);
  }
  removeEdge(node1, node2) {
    // 없는 것에 대한 가드
    /** @type {any[]} */
    const node1Adjacent = this.#graph.get(node1);
    /** @type {any[]} */
    const node2Adjacent = this.#graph.get(node2);
    if (!node1Adjacent || !node2Adjacent) return null;
    // 중복 제거에 대한 가드
    if (node1Adjacent.includes(node2))
      this.#graph.set(node1, [
        ...node1Adjacent.filter((node) => node !== node2),
      ]);
    if (node2Adjacent.includes(node1))
      this.#graph.set(node2, [
        ...node2Adjacent.filter((node) => node !== node1),
      ]);
  }
  get getGraph() {
    return this.#graph;
  }
  /**
   * @param {any} startingNode
   * @returns {any[]}
   */
  BFS(startingNode) {
    const result = [];
    const visited = new Set();
    const queue = [startingNode];
    while (queue.length) {
      const current = queue.shift();
      if (visited.has(current)) continue;
      visited.add(current);
      result.push(current);
      const adjacentNode = this.#graph.get(current);
      queue.push(...adjacentNode);
    }
    return result;
  }
  /**
   * @param {any} startingNode
   * @returns {any[]}
   */
  DFS(startingNode) {
    const result = [];
    const visited = new Set();
    const stack = [startingNode];
    while (stack.length) {
      const current = stack.pop();
      if (visited.has(current)) continue;
      visited.add(current);
      result.push(current);
      const adjacentNode = this.#graph.get(current);
      stack.push(...adjacentNode);
    }
    return result;
  }
}
```

이거로 전체 코드가 완성입니다.

하지만 재귀함수를 사용하는 예시도 추가하겠습니다.

```js
export class Graph {
  #graph;
  constructor() {
    this.#graph = new Map();
  }
  addNode(node) {
    if (this.#graph.get(node)) return null;
    this.#graph.set(node, []);
  }
  removeNode(node) {
    if (!this.#graph.get(node)) return null;
    this.#graph.delete(node);
  }
  addEdge(node1, node2) {
    /** @type {any[]} */
    const node1Adjacent = this.#graph.get(node1);
    /** @type {any[]} */
    const node2Adjacent = this.#graph.get(node2);
    if (!node1Adjacent || !node2Adjacent) return null;
    // 중복 생성에 대한 가드
    if (!node1Adjacent.includes(node2))
      this.#graph.set(node1, [...node1Adjacent, node2]);
    if (!node2Adjacent.includes(node1))
      this.#graph.set(node2, [...node2Adjacent, node1]);
  }
  removeEdge(node1, node2) {
    // 없는 것에 대한 가드
    /** @type {any[]} */
    const node1Adjacent = this.#graph.get(node1);
    /** @type {any[]} */
    const node2Adjacent = this.#graph.get(node2);
    if (!node1Adjacent || !node2Adjacent) return null;
    // 중복 제거에 대한 가드
    if (node1Adjacent.includes(node2))
      this.#graph.set(node1, [
        ...node1Adjacent.filter((node) => node !== node2),
      ]);
    if (node2Adjacent.includes(node1))
      this.#graph.set(node2, [
        ...node2Adjacent.filter((node) => node !== node1),
      ]);
  }
  get getGraph() {
    return this.#graph;
  }
  /**
   * @param {any} startingNode
   * @returns {any[]}
   */
  BFS(startingNode) {
    const result = [];
    const visited = new Set();
    const queue = [startingNode];
    while (queue.length) {
      const current = queue.shift();
      if (visited.has(current)) continue;
      visited.add(current);
      result.push(current);
      const adjacentNode = this.#graph.get(current);
      queue.push(...adjacentNode);
    }
    return result;
  }
  /**
   * @param {any} startingNode
   * @returns {any[]}
   */
  DFS(startingNode) {
    const result = [];
    const visited = new Set();
    const thisGraph = this.#graph;
    (function graph(node) {
      if (visited.has(node)) return;
      visited.add(node);
      result.push(node);
      thisGraph
        .get(node)
        .reverse()
        .forEach((nextNode) => {
          graph(nextNode);
        });
    })(startingNode);
    return result;
  }
}
```

이렇게 해주면 됩니다. 클래스 내부에서 helper 함수를 사용할 때 주의할 점은 렉시컬 환경은 접근할 수 있어도 this에 대한 컨텍스트는 접근할 수 없습니다. 메서드가 아니라 함수로 정의하고 함수로 클래스 내부에서 호출했기 때문에 원칙만 생각하면 this가 유실됩니다. 이런 이유로 렉시컬 환경에 `this.#graph`를 할당해서 접근할 수 있게 해주는 것입니다.

</div>
</details>
