---
sidebar_position: 7
description: '그리디'
tags: ['그리디', '알고리즘', '문제 유형', '']
---

# 그리디

자주보는 문제유형이고 동시에 알고리즘입니다.

그리디 알고리즘을 다루는 방법입니다.

## 설명

참고. 부분 최적화를 위해서 **정렬**을 활용하는 경우가 많다는 것을 발견했습니다.

그리디 알고리즘은 매 순간마다 최적의 선택을 하는 알고리즘으로, 현재 상황에서 가장 좋아 보이는 선택을 계속해서 수행하여 최종적으로 전체적으로 최적의 결과를 얻는 것을 목표로 합니다. 이 때문에 그리디 알고리즘은 항상 최적해를 보장하지는 않지만, 많은 문제에서 효과적인 해법을 제공할 수 있습니다.

일반적으로 그리디 알고리즘을 사용해 문제를 푸는 단계는 다음과 같습니다:

1. **문제 이해:** 먼저 문제를 정확히 이해하고 필요한 조건, 제약, 목표 등을 분석합니다. 문제의 성격과 요구사항을 파악하는 것이 중요합니다.

2. **탐욕적 선택:** 각 단계에서 가장 좋아 보이는 선택을 수행합니다. 이 선택은 현재 상황에서 최적인 것처럼 보이는 선택입니다.

3. **유효성 검사:** 탐욕적 선택을 한 후에는 해당 선택이 문제의 제약과 조건을 만족하는지 검사합니다. 선택이 유효하지 않다면 다른 선택을 고려해야 할 수 있습니다.

4. **해 선택의 반복:** 2와 3단계를 반복하여 전체 문제를 해결할 때까지 진행합니다. 각 단계에서는 최적의 선택을 계속해 나가는 것이 목표입니다.

5. **해 검증:** 문제를 해결한 결과가 정말로 최적의 해인지 확인하고, 필요하다면 추가적인 검증을 수행합니다.

6. **시간 복잡도 분석:** 문제의 크기에 따른 그리디 알고리즘의 시간 복잡도를 분석하고 평가합니다.

그리디 알고리즘은 주로 최적화 문제에서 사용되며, 탐욕적 선택이 지역 최적해(local optimum)를 선택하지만, 이들의 조합이 전역 최적해(global optimum)를 이룰 수 있다는 가정하에 사용됩니다. 그러나 그리디 알고리즘이 항상 최적해를 보장하지 않기 때문에 문제의 성격에 따라 다른 접근 방법도 고려해야 합니다.

### 배낭 문제

배낭 문제(knapsack problem)는 그리디 문제의 하위 분류입니다. 최대 적재을 초과하지 않으면서 이동횟수를 최소화하는 문제입니다. 현실에서 자주 볼 수 있는 문제 유형이 됩니다.

[나무위키](https://namu.wiki/w/%EB%B0%B0%EB%82%AD%20%EB%AC%B8%EC%A0%9C)

## 두 개 뽑아서 더하기

그리디 보단 단순 구현문제에 가깝습니다. 성능 허용이 있어서 중첩 순회에 투포인터로 해결할 수 있었습니다.

[두 개 뽑아서 더하기](https://school.programmers.co.kr/learn/courses/30/lessons/68644)

```js
/**
 * @param {number[]} array,
 * @returns {number[]}
 */
function solution(numbers) {
  var answer = [];
  return answer;
}

export default solution;
```

```js
import solution from './playground';
import { test, expect, describe } from 'vitest';

// numbers	    result
// [2,1,3,4,1]	[2,3,4,5,6,7]
// [5,0,2,7]	  [2,5,7,9,12]

describe('두 개 뽑아서 더하기', () => {
  test('예제 1', () => {
    expect(solution([2, 1, 3, 4, 1])).toEqual([2, 3, 4, 5, 6, 7]);
  });
  test('예제 2', () => {
    expect(solution([5, 0, 2, 7])).toEqual([2, 5, 7, 9, 12]);
  });
});
```

<details>
<summary> 저의 정답</summary>
<div markdown="1">

```js
/**
 * @param {number[]} numbers
 * @returns {number[]}
 */
function solution(numbers) {
  const result = new Set();
  // 정렬
  numbers.sort((a, b) => a - b);

  while (0 < numbers.length) {
    // 투포인터
    // 하나 고정
    const fixed = numbers.pop();

    // 하나 이동
    for (let i = 0; i < numbers.length; i++) {
      result.add(fixed + numbers[i]);
    }
  }

  return [...result].sort((a, b) => a - b);
}

export default solution;
```

</div>
</details>

문제에서 성능문제 제한은 없었습니다.

<details>
<summary>모범 정답입니다.</summary>
<div markdown="1">

```js
function solution(numbers) {
  const temp = [];

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      temp.push(numbers[i] + numbers[j]);
    }
  }

  const answer = [...new Set(temp)];

  return answer.sort((a, b) => a - b);
}
```

</div>
</details>

저보다 효율이 더 좋습니다. 정렬 횟수가 1회이기 때문입니다.

## 구명보트

[구명보트](https://school.programmers.co.kr/learn/courses/30/lessons/42885)

이 문제는 배낭문제의 전형입니다.

그리디 알고리즘을 적용하라고 합니다. 부분 최적화가 전체 최적화로 이어진다는 개념입니다. 이러한 선입견을 갖고 문제에 임하겠습니다.

```js
/**
 * @param {number[]} people
 * @param {number} limit
 * @returns {number}
 */
function solution(people, limit) {
  var answer = 0;
  return answer;
}

export default solution;
```

```js
import solution from './playground';
import { test, expect, describe } from 'vitest';

// people	          limit	return
// [70, 50, 80, 50]	100	  3
// [70, 80, 50]	    100	  3

describe('구명보트', () => {
  test('예제 1', () => {
    expect(solution([70, 50, 80, 50], 100)).toBe(3);
  });
  test('예제 2', () => {
    expect(solution([70, 80, 50], 100)).toBe(3);
  });
});
```

<details>
<summary>오답 1차 시도</summary>
<div markdown="1">

```js
/**
 * @param {number[]} people
 * @param {number} limit
 * @returns {number}
 */
function solution(people, limit) {
  let count = 0;
  while (0 < people.length) {
    const first = people.pop();
    for (let i = 0; i < people.length; i++) {
      if (people[i] <= limit - first) people.pop();
    }
    count += 1;
  }
  return count;
}

export default solution;
```

1차 접근법입니다.

</div>
</details>

<details>
<summary>2차 시도</summary>
<div markdown="1">

```js
/**
 * @param {number[]} people
 * @param {number} limit
 * @returns {number}
 */
function solution(people, limit) {
  let count = 0;
  people.sort((a, b) => b - a);
  while (0 < people.length) {
    const first = people.pop();
    if (people.at(-1) <= limit - first) people.pop();
    count += 1;
  }
  return count;
}

export default solution;
```

이제 2번째 접근입니다. nlogn 시간복잡성을 갖습니다.

하지만 선형시간복잡성으로 낮출 수 있어야 합니다. 1회 순회할 때 가능한 높은 적제량을 찾아야합니다.

선형탐색을 하면서 1개를 뽑지말고 한계에 가까운 2개를 뽑아야 합니다. 그리고 정렬에 의존할 수 없습니다.

</div>
</details>

<details>
<summary>발견한 정답</summary>
<div markdown="1">

```js
function solution(people, limit) {
  const descPeople = people.sort((a, b) => b - a);
  let boatCount = 0;
  descPeople.forEach((people) => {
    if (people + descPeople.at(-1) > limit) {
      boatCount++;
    } else {
      descPeople.pop();
      boatCount++;
    }
  });
  return boatCount;
}
```

이것이 정답입니다. 일단 시간초과로 문제를 확인했습니다.

</div>
</details>

<details>
<summary>모범답안</summary>
<div markdown="1">

```js
function solution(people, limit) {
  people.sort((a, b) => a - b);
  for (var i = 0, j = people.length - 1; i < j; j--) {
    if (people[i] + people[j] <= limit) i++;
  }
  return people.length - i;
}
```

저는 이것이 더 좋은 최적화의 예시라고 봅니다. 양끝에 포인터 2개를 두고 하나식 줄여가는 방식입니다.

이렇게 되면 단순 선형 탐색으로 해결이 가능합니다.

탐욕적 선택을 할 때 숫자와 관련되면 정렬하는 것이 탐욕적 선택 전에 전처리입니다.

</div>
</details>

---

## 귤 고르기

[귤 고르기](https://school.programmers.co.kr/learn/courses/30/lessons/138476)

### 2. 풀이 전 계획과 생각

- 순열과 조합 문제라고 생각하고 있었습니다.

```js
import solution from './playground';
import { test, expect, describe } from 'vitest';

// k	tangerine	                result
// 6	[1, 3, 2, 5, 4, 5, 2, 3]	3
// 4	[1, 3, 2, 5, 4, 5, 2, 3]	2
// 2	[1, 1, 1, 1, 2, 2, 2, 3]	1
// 귤 k개를 고를 때 크기가 서로 다른 종류의 수의 최솟값을 return

describe('귤 고르기', () => {
  test('예제 1', () => {
    expect(solution(6, [1, 3, 2, 5, 4, 5, 2, 3])).toBe(3);
    // [2, 2, 3, 3, 5, 5]
  });
  test('예제 2', () => {
    expect(solution(4, [1, 3, 2, 5, 4, 5, 2, 3])).toBe(2);
    // [2, 2, 3, 3] or [3, 3, 5, 5] or [2, 2, 5, 5]
  });
  test('예제 3', () => {
    expect(solution(2, [1, 1, 1, 1, 2, 2, 2, 3])).toBe(1);
    // [1, 1] or [2, 2]
  });
});
```

이런 관점으로 생각하고 있었습니다. 문제는 홀수 경우의 수에 대한 테스트 케이스를 생각하지 못했습니다.

상세 정책을 이해하지 못했습니다. 예시가 더 있었으면 좋았을 것 같습니다.

### 3. 풀이

<details>
<summary>2023년 09월 02일 풀이</summary>
<div markdown="1">

```js
/**
 * @param {number} k
 * @param {number[]} tangerine
 * @returns {number}
 */
function solution(k, tangerine) {
  // 귤 k개를 고를 때 크기가 서로 다른 종류의 수의 최솟값을 return
  // 중복 기록
  const memo = new Map();
  tangerine.forEach((elem) => {
    if (memo.get(elem) === undefined) memo.set(elem, 1);
    else memo.set(elem, memo.get(elem) + 1);
  });

  const box = Array.from(memo.values()).sort((a, b) => b - a);

  let count = 0;
  for (let i = 0; i < box.length; i++) {
    if (k <= 0) break;
    k -= box[i];
    count += 1;
  }

  return count;
}

export default solution;
```

</div>
</details>

### 4. 풀이하면서 고민했던 점

- 현실에서 비슷한 문제가 있을 것 같은데 올바르게 문제를 푸는 것 같다는 생각이 들지 않습니다.

### 5. 문제를 풀고 알게된 개념 및 소감

- 프로그래머스 문제가 이제 어려워지기 시작합니다.
- 백준으로 전환하는 것이 좋을 것 같습니다. 문제를 통해 학습한 인사이트가 없습니다.
- 파이썬으로 풀어보는 연습이 필요할 것 같습니다.
