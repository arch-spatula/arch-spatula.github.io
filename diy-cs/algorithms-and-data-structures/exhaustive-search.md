---
sidebar_position: 15
description: '완전 탐색'
tags: ['완전 탐색', '알고리즘', '문제유형']
draft: true
---

# 완전 탐색(Exhaustive Search)

부르트 포스랑 자주 혼용합니다. 하지만 다릅니다. 정렬안된 자료에서 순차 탐색이 부르트포스입니다.

경우의 수 지식에 의존성을 갖고 있습니다.

<!-- @todo 아래 내용 정리하기 -->
<!-- ## dfs와 순열과 조합 -->

<!-- https://leejams.github.io/%EC%A1%B0%ED%95%A9/ -->

<!-- https://velog.io/@rlatp1409/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-JS-%EC%88%9C%EC%97%B4%EA%B3%BC-%EC%A1%B0%ED%95%A9-%EA%B5%AC%ED%98%84-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8 -->

<!-- https://velog.io/@devjade/JavaScript%EB%A1%9C-%EC%88%9C%EC%97%B4%EA%B3%BC-%EC%A1%B0%ED%95%A9-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0 -->

## 순열과 조합

<!-- [[알고리즘] JavaScript 순열과 조합 알고리즘 구현하기 (순열 편)](https://leejams.github.io/%EC%88%9C%EC%97%B4/) -->

### 순열

경우의 수 알고리즘

아래는 순열(Permutation)입니다. k개 중 n를 연속으로 나열하면이라는 의미를 갖고 있습니다.

$$

_nP_k = \frac{n!}{(n-r)!}


$$

순열이란 정히진 순서에 따라 나열할 수 있는 경우의 수를 말합니다.

공식은 경우의 수 결과만을 표현합니다. 우리에게 진정으로 필요한 것은 그 과정들입니다. 프로그래밍적으로 나열하는 행위, 표현 혹은 컴퓨터의 작업을 보여줄 수 있어야 합니다.

이 나열하는 행위는 어떻게 표현할 수 있는가?

하나는 고르는 행위입니다. 예를 들어 `[1, 2, 3, 4]` 배열이 존재합니다. 4개 중 1개를 나열하라 하면 결국 1개를 뽑아야 합니다. `[[1], [2], [3], [4]]` 이런 표현이 되어야 합니다.

여기서 2개를 나열하는 것은 어떻게 표현할 수 있는가? 방금 뽑은 원소을 제외하고 다른 원소를 뽑아야 합니다.

```js
[
  [4, 3],
  [4, 2],
  [4, 1],
  [3, 4],
  [3, 2],
  [3, 1],
  [2, 4],
  [2, 3],
  [2, 1],
  [1, 4],
  [1, 3],
  [1, 2],
];
```

위처럼 값이 존재해야 합니다. 중요한 것은 현재에서 다른 원소를 접근하는 것입니다.

조금더 이해가 잘되게 도식화를 하겠습니다.

![](https://private-user-images.githubusercontent.com/84452145/285906740-119d3de6-5844-4aab-a4f4-b35c4b7400ab.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDEyNjY1NjcsIm5iZiI6MTcwMTI2NjI2NywicGF0aCI6Ii84NDQ1MjE0NS8yODU5MDY3NDAtMTE5ZDNkZTYtNTg0NC00YWFiLWE0ZjQtYjM1YzRiNzQwMGFiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzExMjklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMTI5VDEzNTc0N1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTY5YTEyMGY3NTM0ZjdjMDNlYTJlNmE5ODYwOGE4MjA5NTlmYzY4NTdlNzA3NjBkZDVjODA5NzgzMWRhZWEyZGQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.UBVffgDYEmpfJDeuiqjIUDor5JU2DmuCJlpNQU-Iai0)

1가지 패턴만 보이면 됩니다. 첫번째 고른 원소가 루트가 되는 DFS가 됩니다.

첫번째 원소를 고르는 기록을 보관하고 DFS로 선택하는 것을 기록하면 됩니다.

```js
describe('permutations', () => {
  test('1deps', () => {
    const given = Array.from({ length: 4 }, (_, idx) => idx + 1);

    const result = permutations(given, 1);

    expect(result.length).toBe(4);
    expect(result).toEqual([[1], [2], [3], [4]]);
  });
  test('2deps', () => {
    const given = Array.from({ length: 4 }, (_, idx) => idx + 1);

    const result = permutations(given, 2);

    expect(result.length).toBe(12);
    expect(result).toEqual([
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 1],
      [2, 3],
      [2, 4],
      [3, 1],
      [3, 2],
      [3, 4],
      [4, 1],
      [4, 2],
      [4, 3],
    ]);
  });
  test('4deps', () => {
    const given = Array.from({ length: 4 }, (_, idx) => idx + 1);

    const result = permutations(given, 4);

    // expect(result.length).toBe(24);
    expect(result).toEqual([
      [1, 2, 3, 4],
      [1, 2, 4, 3],
      [1, 3, 2, 4],
      [1, 3, 4, 2],
      [1, 4, 2, 3],
      [1, 4, 3, 2],
      [2, 1, 3, 4],
      [2, 1, 4, 3],
      [2, 3, 1, 4],
      [2, 3, 4, 1],
      [2, 4, 1, 3],
      [2, 4, 3, 1],
      [3, 1, 2, 4],
      [3, 1, 4, 2],
      [3, 2, 1, 4],
      [3, 2, 4, 1],
      [3, 4, 1, 2],
      [3, 4, 2, 1],
      [4, 1, 2, 3],
      [4, 1, 3, 2],
      [4, 2, 1, 3],
      [4, 2, 3, 1],
      [4, 3, 1, 2],
      [4, 3, 2, 1],
    ]);
  });
});
```

위는 통과시킬 테스트 코드입니다.

<details>
<summary>정답</summary>
<div markdown="1">

```js
/**
 * @param {number[]} arr
 * @param {number} n
 * @returns {number[]}
 */
export function permutations(arr, n) {
  const result = [];
  (function graph(visited, remaining) {
    if (visited.length === n) {
      result.push(visited);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      const current = visited.concat(remaining[i]);
      const nextRemaining = remaining
        .slice(0, i)
        .concat(remaining.slice(i + 1));
      graph(visited, remaining);
    }
  })([], arr);
  return result;
}
```

</div>
</details>

<details>
<summary>풀이</summary>
<div markdown="1">

```js
describe('permutations', () => {
  test('1부터 4까지 4개 나열하는 경우의 수', () => {
    const given = Array.from({ length: 4 }, (_, idx) => idx + 1);

    const result = permutations(given, 4);

    expect(result.length).toBe(24);
    expect(result).toEqual([
      [1, 2, 3, 4],
      [1, 2, 4, 3],
      [1, 3, 2, 4],
      [1, 3, 4, 2],
      [1, 4, 2, 3],
      [1, 4, 3, 2],
      [2, 1, 3, 4],
      [2, 1, 4, 3],
      [2, 3, 1, 4],
      [2, 3, 4, 1],
      [2, 4, 1, 3],
      [2, 4, 3, 1],
      [3, 1, 2, 4],
      [3, 1, 4, 2],
      [3, 2, 1, 4],
      [3, 2, 4, 1],
      [3, 4, 1, 2],
      [3, 4, 2, 1],
      [4, 1, 2, 3],
      [4, 1, 3, 2],
      [4, 2, 1, 3],
      [4, 2, 3, 1],
      [4, 3, 1, 2],
      [4, 3, 2, 1],
    ]);
  });
});
```

위 테스트 코드를 통과 시키는 코드를 작성하면 됩니다. 하지만 지금당장은 어려울 수 있습니다. 가장 쉬운 첫단계부터 하나식 해봅시다. 그렇다면 더 쉬운 테스트 케이스부터 작성하겠습니다.

```js
test('1부터 4까지 1개 나열하는 경우의 수', () => {
  const given = Array.from({ length: 4 }, (_, idx) => idx + 1);

  const result = permutations(given, 1);

  expect(result.length).toBe(4);
  expect(result).toEqual([[1], [2], [3], [4]]);
});
```

위 테스트 코드는 통과시키기 쉽습니다.

```js
/**
 * @param {number[]} arr
 * @param {number} n
 * @returns {number[]}
 */
export function permutations(arr, n) {
  const copy = arr.slice().reverse();

  const result = [];
  while (copy.length) {
    const root = copy.pop();
    result.push([root]);
  }

  return result;
}
```

이렇게 되면 방금 1 Depth 테스트코드를 통과합니다.

이제 2 Depth를 접근하는 경우를 봅시다. DFS 재귀함수를 활용하면 그 이상의 Depth를 접근할 수 있습니다. 현재 방문한 것을 기준으로 앞으로 방문할 것들을 계속 보면 됩니다.

아쉽게도 위에서 작성한 코드로는 한계가 많습니다. ~~사실 작성하기 복잡합니다~~

먼저 모두 통과시켜야 하는 테스트 코드부터 작성하겠습니다.

```js
describe('permutations', () => {
  test('1deps', () => {
    const given = Array.from({ length: 4 }, (_, idx) => idx + 1);

    const result = permutations(given, 1);

    expect(result.length).toBe(4);
    expect(result).toEqual([[1], [2], [3], [4]]);
  });
  test('2deps', () => {
    const given = Array.from({ length: 4 }, (_, idx) => idx + 1);

    const result = permutations(given, 2);

    expect(result.length).toBe(12);
    expect(result).toEqual([
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 1],
      [2, 3],
      [2, 4],
      [3, 1],
      [3, 2],
      [3, 4],
      [4, 1],
      [4, 2],
      [4, 3],
    ]);
  });
  test('4deps', () => {
    const given = Array.from({ length: 4 }, (_, idx) => idx + 1);

    const result = permutations(given, 4);

    // expect(result.length).toBe(24);
    expect(result).toEqual([
      [1, 2, 3, 4],
      [1, 2, 4, 3],
      [1, 3, 2, 4],
      [1, 3, 4, 2],
      [1, 4, 2, 3],
      [1, 4, 3, 2],
      [2, 1, 3, 4],
      [2, 1, 4, 3],
      [2, 3, 1, 4],
      [2, 3, 4, 1],
      [2, 4, 1, 3],
      [2, 4, 3, 1],
      [3, 1, 2, 4],
      [3, 1, 4, 2],
      [3, 2, 1, 4],
      [3, 2, 4, 1],
      [3, 4, 1, 2],
      [3, 4, 2, 1],
      [4, 1, 2, 3],
      [4, 1, 3, 2],
      [4, 2, 1, 3],
      [4, 2, 3, 1],
      [4, 3, 1, 2],
      [4, 3, 2, 1],
    ]);
  });
});
```

```js
/**
 * @param {number[]} arr
 * @param {number} n
 * @returns {number[]}
 */
export function permutations(arr, n) {
  const result = [];
  (function graph() {})();
  return result;
}
```

여기까지 정의하겠습니다. 저는 제가 중간고사를 출제하는 상황이라면 permutations 시그니쳐만 알려줬을 것입니다. 그리고 통과시킬 테스트 케이스는 ChatGPT 시켜서 여러개 작성하고 말 것입니다.

```js
/**
 * @param {number[]} arr
 * @param {number} n
 * @returns {number[]}
 */
export function permutations(arr, n) {
  const result = [];
  (function graph(visited, remaining) {})([], arr);
  return result;
}
```

여기서 시그니처를 생각해봅시다. 이 전략은 분할정복 전략입니다. 정복된 부분과 정복할 부분으로 구분해야 합니다. 그래서 시그니처를 이렇게 정의할 수 있습니다. 우리는 여기서 즉시 실행함수에 대입할 것은 정복할 부분인 `arr`, 정복한 부분인 `[]`입니다. ~~가진 것은 없지만 세상을 노리고 있습니다.~~

재귀함수를 사용할 때는 늘 조심해야 합니다. 베이스 케이스를 두고 베이스 케이스로 유도해보겠습니다.

```js
/**
 * @param {number[]} arr
 * @param {number} n
 * @returns {number[]}
 */
export function permutations(arr, n) {
  const result = [];
  (function graph(visited, remaining) {
    console.log(visited, remaining);
    if (visited.length === n) {
      result.push(visited);
      return;
    }
  })([], arr);
  return result;
}
```

여기까지는 베이스 케이스를 두고 관측하는 것입니다. 이제는 유도입니다.

```js
/**
 * @param {number[]} arr
 * @param {number} n
 * @returns {number[]}
 */
export function permutations(arr, n) {
  const result = [];
  (function graph(visited, remaining) {
    if (visited.length === n) {
      result.push(visited);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      const current = visited.concat(remaining[i]);
      console.log(current, remaining);
    }
  })([], arr);
  return result;
}

// [ 1 ] [ 1, 2, 3, 4 ]
// [ 2 ] [ 1, 2, 3, 4 ]
// [ 3 ] [ 1, 2, 3, 4 ]
// [ 4 ] [ 1, 2, 3, 4 ]
```

현재 순차적으로 방문하는 것들입니다. 이전에 봤던 root에 해당하기는 합니다. 현재 방문한 것과 방문할 것을 표현하는 것이 상당히 애매한 점이 존재합니다. 여기서 실제 로그를 찍어보면 방문할 것들을 분할 하기 어려워 보입니다.

```js
/**
 * @param {number[]} arr
 * @param {number} n
 * @returns {number[]}
 */
export function permutations(arr, n) {
  const result = [];
  (function graph(visited, remaining) {
    if (visited.length === n) {
      result.push(visited);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      const current = visited.concat(remaining[i]);
      const nextRemaining = remaining.slice(0, i);
      console.log(current, nextRemaining);
    }
  })([], arr);
  return result;
}

// [ 1 ] []
// [ 2 ] [ 1 ]
// [ 3 ] [ 1, 2 ]
// [ 4 ] [ 1, 2, 3 ]
```

위처럼 로그가 찍힙니다. 현재 인덱스에서 방문하지 않은 부분을 찍어 줘야 합니다. 뒷부분을 찍어 줘여야 합니다.

```js
/**
 * @param {number[]} arr
 * @param {number} n
 * @returns {number[]}
 */
export function permutations(arr, n) {
  const result = [];
  (function graph(visited, remaining) {
    if (visited.length === n) {
      result.push(visited);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      const current = visited.concat(remaining[i]);
      const nextRemaining = remaining.slice(0, i);
      console.log(current, remaining.slice(0, i), remaining.slice(i + 1));
    }
  })([], arr);
  return result;
}

// [ 1 ] [] [2, 3, 4]
// [ 2 ] [ 1 ] [3, 4]
// [ 3 ] [ 1, 2 ] [4]
// [ 4 ] [ 1, 2, 3 ] []
```

이렇게 처리하고 하는 것이 좋습니다. 여기서 2개의 배열을 합치면 됩니다.

위를 보면 방문한 것과 할 것 2가지로 분리될 것입니다.

```js
/**
 * @param {number[]} arr
 * @param {number} n
 * @returns {number[]}
 */
export function permutations(arr, n) {
  const result = [];
  (function graph(visited, remaining) {
    if (visited.length === n) {
      result.push(visited);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      const current = visited.concat(remaining[i]);
      const nextRemaining = remaining
        .slice(0, i)
        .concat(remaining.slice(i + 1));
      graph(visited, remaining);
    }
  })([], arr);
  return result;
}
```

위에 작성한 코드가 최종코드입니다.

</div>
</details>

### 조합

아래는 조합(Combination)입니다.

$$

_nC_k = \frac{n!}{r!(n-r)!}


$$

조합은 순열과 다르게 뽑는다는 행위가 더 중요합니다. 순열은 나열한다는 행위가 더 중요합니다.

몇가지 파악할 특징들이 있습니다. 첫째는 배열의 인덱스를 기준으로 검색해야 합니다. 배열에서 원소는 중복할 수 있어도 인덱스는 중복할 수 없습니다. 적어도 인덱스를 기준으로 뽑을 때 중복이 발생하지 않고 충족할 수 있기 때문입니다.

먼저 테스트 케이스부터 짜겠습니다. 테스트 케이스를 보면 이해가 더 잘 될 것입니다.

```js
describe('permutations', () => {
  test('pick 1', () => {
    const given = Array.from({ length: 5 }, (_, idx) => idx + 1);

    const result = combination(given, 1);

    expect(result.length).toBe(5);
    expect(result).toEqual([[1], [2], [3], [4], [5]]);
  });
  test('pick 2', () => {
    const given = Array.from({ length: 5 }, (_, idx) => idx + 1);

    const result = combination(given, 2);

    expect(result.length).toBe(10);
    expect(result).toEqual([
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [2, 3],
      [2, 4],
      [2, 5],
      [3, 4],
      [3, 5],
      [4, 5],
    ]);
  });
  test('pick 3', () => {
    const given = Array.from({ length: 5 }, (_, idx) => idx + 1);

    const result = combination(given, 3);

    expect(result.length).toBe(10);
    expect(result).toEqual([
      [1, 2, 3],
      [1, 2, 4],
      [1, 2, 5],
      [1, 3, 4],
      [1, 3, 5],
      [1, 4, 5],
      [2, 3, 4],
      [2, 3, 5],
      [2, 4, 5],
      [3, 4, 5],
    ]);
  });
});
```

순열도 재귀함수로 접근해야 하는 부분들이 있습니다. 현재 노드를 방문하고 다음 방문 할 노드를 분할 정복하는 전략입다. 그리고 슬라이딩 윈도우 패턴도 같이 사용하면 됩니다. 도식을 보면 바로 이해될 것입니다.

![](https://private-user-images.githubusercontent.com/84452145/286907995-3cc06e0d-5496-4acf-a54d-5ec30e5ab349.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDEzNDczNzEsIm5iZiI6MTcwMTM0NzA3MSwicGF0aCI6Ii84NDQ1MjE0NS8yODY5MDc5OTUtM2NjMDZlMGQtNTQ5Ni00YWNmLWE1NGQtNWVjMzBlNWFiMzQ5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzExMzAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMTMwVDEyMjQzMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTVkYzhhM2QzYjczNTBmNmI1MzA5MWMzMTRkYzMyYjFmNjgxNjM4ODYyYTJiODFlMmMwNTU3NzQxMjc5N2ZkNGEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.Nw-XhgErIM5jKxrmqL8HmIo3gns6QVXx8QUYgXtnERA)

![](https://private-user-images.githubusercontent.com/84452145/286908076-04dcb8cf-8a1f-4329-9ace-ff36694b7a8a.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDEzNDczNzEsIm5iZiI6MTcwMTM0NzA3MSwicGF0aCI6Ii84NDQ1MjE0NS8yODY5MDgwNzYtMDRkY2I4Y2YtOGExZi00MzI5LTlhY2UtZmYzNjY5NGI3YThhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzExMzAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMTMwVDEyMjQzMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTExMzZhODBjMjFkN2Q0YWFlMjA2ZmEwMGFhYzMzMzk1OWQwNjIxMTRmNGZlM2ZlMGNjNmM0MjNlZWMxNDMzMWEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.ohBLQFjBP--iMPHzrl_X-zTx2Y5xy05WIJwKDuWppNk)

![](https://private-user-images.githubusercontent.com/84452145/286908112-e0665ef7-17d2-46af-a6de-d9ca97b81863.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDEzNDczNzEsIm5iZiI6MTcwMTM0NzA3MSwicGF0aCI6Ii84NDQ1MjE0NS8yODY5MDgxMTItZTA2NjVlZjctMTdkMi00NmFmLWE2ZGUtZDljYTk3YjgxODYzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzExMzAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMTMwVDEyMjQzMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTY5YzdkYjViZTU0MWY1NDAwNDQyMjc1YmNmYzVmZGJiYjc1ZjM4YjI4MjE2M2Y1MmM4N2VkMmUzMDAxNzYwMDkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.RA1NcbKMMxABLsEF5Oqh8z40QkcMWPiGgWWEr7Zl8RE)

현재 노드와 남은 노드를 계속 분할 정복하면 됩니다. 재귀함수의 대입할 인자로 분할 해서 각각 대입하면 됩니다.

<details>
<summary>정답</summary>
<div markdown="1">

```js
/**
 * @param {number[]} arr
 * @param {number} n
 * @returns {number[][]}
 */
export function combination(arr, n) {
  const result = [];
  (function graph(visited, remaining) {
    if (visited.length === n) {
      result.push(visited);
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      const current = visited.concat(remaining.slice(i, i + 1));
      const nextRemaining = remaining.slice(i + 1);
      graph(current, nextRemaining);
    }
  })([], arr);
  return result;
}
```

</div>
</details>

제일 먼저할 부분은 함수 시그니처를 정의하겠습니다.

<details>
<summary>풀이</summary>
<div markdown="1">

```js
/**
 * @param {number[]} arr
 * @param {number} n
 * @returns {number[][]}
 */
export function combination(arr, n) {
  const result = [];
  return result;
}
```

여기서 시작합니다. 이제 재귀함수와 베이스 케이스를 작성하겠습니다.

```js
/**
 * @param {number[]} arr
 * @param {number} n
 * @returns {number[][]}
 */
export function combination(arr, n) {
  const result = [];
  (function graph(visited, remaining) {})([], arr);
  return result;
}
```

여기까지 재귀함수입니다. 즉시실행함수에 처음 대입할 것은 비어있는 배열(`[]`)입니다. 모든 것을 탐색해야 하기 때문에 아무것도 없는 상태에서 시작합니다. 그리고 `arr`는 모든 것을 탐색해야 하기 때문에 넣고 시작합니다.

```js
/**
 * @param {number[]} arr
 * @param {number} n
 * @returns {number[][]}
 */
export function combination(arr, n) {
  const result = [];
  (function graph(visited, remaining) {
    if (visited.length === n) {
      result.push(visited);
      return;
    }
  })([], arr);
  return result;
}
```

여기까지는 베이스케이입니다. 뽑는 수량을 달성하면 탐색에 성공한 것입니다.

```js
/**
 * @param {number[]} arr
 * @param {number} n
 * @returns {number[][]}
 */
export function combination(arr, n) {
  const result = [];
  (function graph(visited, remaining) {
    if (visited.length === n) {
      result.push(visited);
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      const current = visited.concat(remaining.slice(i, i + 1));
      const nextRemaining = remaining.slice(i + 1);
      console.log(current, nextRemaining);
    }
  })([], arr);
  return result;
}
```

여기서 로그를 확인했을 때 현재 노드와 다음으로 탐색할 노드들을 확인했으면 이제 재귀함수를 호출하면 됩니다. 현재 방문하고 있는 부분과 방문하게 될 부분을 분할하는 것을 확인하는 것이 중요합니다. 방문한 노드를 늘리고 방문할 노드를 줄여갈 것이라는 것만 파악하면 됩니다.

```js
/**
 * @param {number[]} arr
 * @param {number} n
 * @returns {number[][]}
 */
export function combination(arr, n) {
  const result = [];
  (function graph(visited, remaining) {
    if (visited.length === n) {
      result.push(visited);
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      const current = visited.concat(remaining.slice(i, i + 1));
      const nextRemaining = remaining.slice(i + 1);
      graph(current, nextRemaining);
    }
  })([], arr);
  return result;
}
```

그래서 이게 정답코드가 됩니다.

</div>
</details>

## 피로도

[피로도](https://school.programmers.co.kr/learn/courses/30/lessons/87946)

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

![](https://private-user-images.githubusercontent.com/84452145/286958284-ce4de25c-59c9-46c8-90bf-87d83a88d666.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDEzNTQwMDMsIm5iZiI6MTcwMTM1MzcwMywicGF0aCI6Ii84NDQ1MjE0NS8yODY5NTgyODQtY2U0ZGUyNWMtNTljOS00NmM4LTkwYmYtODdkODNhODhkNjY2LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzExMzAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMTMwVDE0MTUwM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTQ1ZjQ0ZTE5NTU5ZTg5NzY4N2EzZTVjNjg1NTZiYzExNGUwOTIxNjc1NzZjNjlhOWMxZDg2MGVmZjIyYzRhZjAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.9CU3Z4DioUuCiQhO35MLJGMWQceWW_BUz9u6nM8pDlo)

위 힌트를 활용하면 1차 접근이 잘못되었다는 것을 알 수 있습니다.

<details>
<summary>1차 그리디로 시도</summary>
<div markdown="1">

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

</div>
</details>

2차 시도는 DFS로 해야 합니다. 하지만 경우의 수와 완전탐색의 관계를 파악하고 진행할 것입니다.

<details>
<summary>2차 DFS 시도</summary>
<div markdown="1">

```js
/**
 * @param {number} k
 * @param {[number, number][]} dungeons
 * @returns {number}
 */
function solution(k, dungeons) {
  let result = [];
  let depth = 0;
  /**
   * @param {[number, number][]} visited
   * @param {[number, number][]} remaining
   * @param {number} health
   */
  (function graph(visited, remaining, health, depth) {
    if (!remaining.length) {
      result.push(depth);
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      const current = visited.concat(remaining[i]);
      // 진행여부 가드
      // 통과 못하면 초기화
      const [barrier, cost] = remaining[i];
      if (health < barrier) {
        graph(current, [], health - cost, depth);
      } else {
        const nextRemaining = remaining
          .slice(i + 1)
          .concat(remaining.slice(0, i));
        graph(current, nextRemaining, health - cost, depth + 1);
      }
    }
  })([], dungeons, k, 0);
  return Math.max(...result);
}

export default solution;
```

최적화 측면에서 아쉬운 부분이 상당히 많습니다. 가장 큰 값을 보는 방식도 굳이 배열에 안 담고 탐색 하고 특정 조건에 도달하면 대소비교하고 더크면 갱신만 해도 되는데 비효율적인 방법으로 처리했습니다.

</div>
</details>

DFS를 사용하면 문제가 풀립니다.

<details>
<summary>DFS 모범 정답</summary>
<div markdown="1">

```js
function solution(k, d) {
  const N = d.length;
  const visited = new Array(N).fill(0);
  let ans = 0;

  function dfs(k, cnt) {
    ans = Math.max(cnt, ans);

    for (let j = 0; j < N; j++) {
      if (k >= d[j][0] && !visited[j]) {
        visited[j] = 1;
        dfs(k - d[j][1], cnt + 1);
        visited[j] = 0;
      }
    }
  }

  dfs(k, 0);
  return ans;
}
```

</div>
</details>
