---
sidebar_position: 4
description: '구현'
tags: ['구현', 'implementation']
---

# 구현

사실 분류하기 애매한 알고리즘을 여기에 일단 추가하겠습니다.

## 2차원 배열

### n^2 배열 자르기

[n^2 배열 자르기](https://school.programmers.co.kr/learn/courses/30/lessons/87390)

```js
import solution from './playground';
import { test, expect, describe } from 'vitest';

// n	left	right	result
// 3	2	    5	    [3,2,2,3]
// 4	7	    14	  [4,3,3,3,4,4,4,4]

describe('n^2 배열 자르기', () => {
  test('예제 1', () => {
    expect(solution(3, 2, 5)).toEqual([3, 2, 2, 3]);
  });
  test('예제 2', () => {
    expect(solution(4, 7, 14)).toEqual([4, 3, 3, 3, 4, 4, 4, 4]);
  });
});
```

<details>
<summary>2023년 09월 02일 1차 시도</summary>
<div markdown="1">

```js
/**
 * @param {number} n
 * @param {number} left
 * @param {number} right
 * @returns {number[]}
 */
function solution(n, left, right) {
  return squareArr(n)
    .flat()
    .slice(left, right + 1);
}

/**
 * @param {number} n
 * @returns {number[][]}
 */
export function squareArr(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    const row = [];
    for (let j = 1; j <= n; j++) row.push(Math.max(i, j));
    result.push(row);
  }
  return result;
}

export default solution;
```

[힌트가 필요하신 분은 봐주세요](https://school.programmers.co.kr/questions/53856)

> n이 3인 경우 123,223,333이고 n이 4인 경우 1234,2234,3334,4444가 됩니다. 여기서 확인할 수 있는 규칙성은 외부 배열 인덱스 값+1(이하 i)의 값이 i-1번 인덱스의 내부 배열에서 i개만큼 들어가고
>
> 그 반복이 끝나고 난 다음 내부 배열에서 비어 있는 부분은 빈 인덱스 이전의 인덱스 값에서 +1을 하여 채워넣는다 입니다.
>
> 이를 알면 굳이 모든 행과 열에 값을 넣지 않아도 몇 행에서 어떤 식으로 배열될지 알 수 있습니다 모든 행과 열에 값을 넣으면 메모리가 초과되거든요 제가 해봐서 압니다.
>
> 이 문제를 해결하려면 left~right까지의 값에 해당하는 인덱스를 찾으시면 됩니다 첫 행은 left/n+1이고 첫 열은 left%n+1이 되니 해당 행에서 나올 배열을 그때그때 만들어서 해당 열의 값을 찾아주시면 모든 행과 열을 다 만들지 않아도 문제를 풀 수 있습니다
>
> 머리로는 아는데 글로 쉽게 풀어내려고 하니 어렵네요 글이 부족해서 이해가 안되는 부분은 다른 분들이 써놓은 힌트를 보시면 쉽게 이해될 것 같습니다.

힌트를 보면 공간복잡성 문제를 갖고 있다고 합니다. iot 디바이스에서 프로그래밍하는 것처럼 메모리 사이즈를 의식해야 하나봅니다.

</div>
</details>

<details>
<summary>2023년 09월 02일 2차 시도</summary>
<div markdown="1">

[정~~~말 단편적인 힌트 (풀이x)](https://school.programmers.co.kr/questions/48897)

> 몫과 나머지

이 힌트가 상당히 유용했습니다. i, j 행렬을 표현하는데 몫과 나머지로 표현할 것이라는 생각은 못했습니다.

```js
/**
 * @param {number} n
 * @param {number} left
 * @param {number} right
 * @returns {number[]}
 */
function solution(n, left, right) {
  return Array.from({ length: right - left + 1 }, (_, idx) => {
    const [i, j] = [Math.floor((idx + left) / n) + 1, ((idx + left) % n) + 1];
    return Math.max(i, j);
  });
}

export default solution;
```

결국에는 위처럼 풀었습니다.

</div>
</details>
