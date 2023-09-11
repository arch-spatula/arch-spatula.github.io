---
sidebar_position: 2
description: '삽입정렬'
tags: ['슬라이딩 윈도우', 'sliding window', '문제 풀이 전략']
---

# 삽입정렬

삽입 정렬은 대부분 정렬된 자료구조에 활용하면 효율적인 정렬알고리즘입니다.

## 명예의 전당 (1)

### 1.명예의 전당 (1)

[명예의 전당 (1) - 프로그래머스](https://school.programmers.co.kr/learn/courses/30/lessons/138477)

### 2. 풀이 전 계획과 생각

- 한정된 사이즈에 삽입 sort
- 없으면 삽입
- 있으면 대소 비교 더 크면 추가
- 범위를 초과하면 pop
- 선형 순회하면서 peek를 추가

```
fn k score

명예_전당_생존자들 = []
result = []

for scorePointer in score:
  if 명예_전당_생존자들.길이 == 0:
    명예_전당_생존자들.push(scorePointer)
    continue
  for 명예_전당_생존자 in 명예_전당_생존자들:
    if scorePointer > 생존자:
      명예_전당_생존자.insert(scorePointer)
      if (명예_전당_생존자들.길이 > k)
        명예_전당_생존자들.pop()

  result.push(명예_전당_생존자들.peek())

return result
```

### 3. 풀이

<details>
<summary>2023년 09월 02일 1, 2차 시도</summary>
<div markdown="1">

```js
/**
 * @param {number} k
 * @param {number[]} score
 * @returns {number}
 */
function solution(k, score) {
  const survivors = [];
  const result = [];

  for (let scoreIdx = 0; scoreIdx < score.length; scoreIdx++) {
    if (survivors.length === 0) survivors.push(score[scoreIdx]);
    else {
      for (let survivorIdx = 0; survivorIdx < survivors.length; survivorIdx++) {
        if (score[scoreIdx] > survivors[survivorIdx]) {
          survivors.splice(survivorIdx, 0, score[scoreIdx]);
          if (survivors.length > k) {
            survivors.pop();
          }
          break;
        } else if (survivors.length < k) {
          survivors.push(score[scoreIdx]);
          break;
        }
      }
    }
    result.push(survivors.at(-1));
  }
  return result;
}
```

1차와 2차 시도는 실패했습니다.

</div>
</details>

과제를 쪼개서 다시 풀었습니다.

<details>
<summary>2023년 09월 02일 3차 시도</summary>
<div markdown="1">

```js
import solution, { cutOff, insert } from './playground';
import { test, expect, describe } from 'vitest';

// k	score	                                        result
// 3	[10, 100, 20, 150, 1, 100, 200]	              [10, 10, 10, 20, 20, 100, 100]
// 4	[0, 300, 40, 300, 20, 70, 150, 50, 500, 1000]	[0, 0, 0, 0, 20, 40, 70, 70, 150, 300]

describe('명예의 전당 (1)', () => {
  test('예제 1', () => {
    expect(solution(3, [10, 100, 20, 150, 1, 100, 200])).toEqual([
      10, 10, 10, 20, 20, 100, 100,
    ]);
  });
  test('예제 2', () => {
    expect(solution(4, [0, 300, 40, 300, 20, 70, 150, 50, 500, 1000])).toEqual([
      0, 0, 0, 0, 20, 40, 70, 70, 150, 300,
    ]);
  });
  test('예제 3', () => {
    expect(solution(3, [10, 20, 30, 40, 50])).toEqual([10, 10, 10, 20, 30]);
  });
  test('예제 4', () => {
    expect(solution(5, [100, 200, 300, 400, 500])).toEqual([
      100, 100, 100, 100, 100,
    ]);
  });
  test('예제 5', () => {
    expect(solution(3, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1])).toEqual([
      10, 9, 8, 8, 8, 8, 8, 8, 8, 8,
    ]);
    // [10] -> [10, 9] -> [10, 9, 8] -> ...
  });
  test('예제 6', () => {
    expect(solution(2, [5, 5, 5, 5, 5, 5])).toEqual([5, 5, 5, 5, 5, 5]);
  });
});

describe('insert', () => {
  test('없으면 추가', () => {
    expect(insert(1, [])).toEqual([1]);
  });
  test('앞에 추가', () => {
    expect(insert(3, [2, 1])).toEqual([3, 2, 1]);
  });
  test('뒤에 추가', () => {
    expect(insert(8, [10, 9])).toEqual([10, 9, 8]);
  });
  test('중간에 추가', () => {
    expect(insert(9, [10, 8])).toEqual([10, 9, 8]);
  });
});

describe('cutOff', () => {
  test('cutOff', () => {
    expect(cutOff([1, 2, 3, 4], 3)).toEqual([1, 2, 3]);
  });
});
```

통과 시킬 테스트 코드를 분할하고 통과시켰습니다.

```js
/**
 * @param {number} k
 * @param {number[]} score
 * @returns {number}
 */
function solution(k, score) {
  let survivors = [];
  const result = [];

  for (let scoreIdx = 0; scoreIdx < score.length; scoreIdx++) {
    survivors = cutOff(insert(score[scoreIdx], survivors), k);
    result.push(survivors.at(-1));
  }
  return result;
}

/**
 * @param {number} num
 * @param {number[]} arr
 * @returns {number[]}
 */
export function insert(num, arr) {
  const result = arr.slice();
  let insertFlag = false;
  for (let i = 0; i < arr.length; i++) {
    if (num >= arr[i]) {
      result.splice(i, 0, num);
      insertFlag = true;
      break;
    }
  }
  if (!insertFlag) result.push(num);

  return result;
}

/**
 * @param {number[]} arr
 * @param {number} maxLength
 * @returns {number[]}
 */
export function cutOff(arr, maxLength) {
  return arr.slice(0, maxLength);
}

export default solution;
```

</div>
</details>

### 4. 풀이하면서 고민했던 점

- 관심사를 분리해서 디테일한 문제를 쉽게 바꿨습니다.
  - 처음에는 insert 함수를 작성할 때 중간 삽입이 동작하지 않았습니다.
  - 결국에는 chatGPT의 도움을 약간 받아 flag를 밖으로 빼고 push 하는 방식으로 테스트를 통과시켰습니다.
  - 작은 문제가 해결되서 큰문제도 같이 해결되었습니다.

### 5. 문제를 풀고 알게된 개념 및 소감

- 삽입정렬 문제이지만 과제 분해 문제에 더 가까웠습니다.
- 함수추출을 하니까 작성해야 하는 단위 테스트의 테스트 케이스가 줄어들었습니다.
