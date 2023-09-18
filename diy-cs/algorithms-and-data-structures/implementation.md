---
sidebar_position: 5
description: '구현'
tags: ['구현', 'implementation', '문제 유형']
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

### 행렬의 곱셈

[행렬의 곱셈](https://school.programmers.co.kr/learn/courses/30/lessons/12949)

```js
import solution, { extractCol, extractRow, multiply } from './playground';
import { test, expect, describe } from 'vitest';

// arr1	arr2	return
// [[1, 4], [3, 2], [4, 1]]	[[3, 3], [3, 3]]	[[15, 15], [15, 15], [15, 15]]
// [[2, 3, 2], [4, 2, 4], [3, 1, 4]]	[[5, 4, 3], [2, 4, 1], [3, 1, 1]]	[[22, 22, 11], [36, 28, 18], [29, 20, 14]]

describe('n^2 배열 자르기', () => {
  test('예제 1', () => {
    expect(
      solution(
        [
          [1, 4],
          [3, 2],
          [4, 1],
        ],
        [
          [3, 3],
          [3, 3],
        ]
      )
    ).toEqual([
      [15, 15],
      [15, 15],
      [15, 15],
    ]);
  });
  test('예제 2', () => {
    expect(
      solution(
        [
          [2, 3, 2],
          [4, 2, 4],
          [3, 1, 4],
        ],
        [
          [5, 4, 3],
          [2, 4, 1],
          [3, 1, 1],
        ]
      )
    ).toEqual([
      [22, 22, 11],
      [36, 28, 18],
      [29, 20, 14],
    ]);
  });
  test('감축', () => {
    expect(solution([[1, 2]], [[3], [4]])).toEqual([[3 * 1 + 2 * 4]]);
  });
  test('확장', () => {
    expect(solution([[1], [2]], [[3, 4]])).toEqual([
      [1 * 3, 1 * 4],
      [2 * 3, 2 * 4],
    ]);
  });
});
```

<details>
<summary>활용해볼 수 있는 추가 단위테스트</summary>
<div markdown="1">

```js
describe('helper', () => {
  test('row', () => {
    expect(
      extractRow(
        [
          [1, 4],
          [3, 2],
          [4, 1],
        ],
        0
      )
    ).toEqual([1, 4]);
  });
  test('col', () => {
    expect(
      extractCol(
        [
          [1, 4],
          [3, 2],
          [4, 1],
        ],
        0
      )
    ).toEqual([1, 3, 4]);
  });
  test('multiply', () => {
    expect(multiply([1, 2, 3], [1, 2, 3])).toBe(1 * 1 + 2 * 2 + 3 * 3);
  });
});
```

</div>
</details>

---

<details>
<summary>2023년 09월 14일 풀이</summary>
<div markdown="1">

```js
/**
 * @param {number[][]} arr1
 * @param {number[][]} arr2
 * @returns {number[][]}
 */
function solution(arr1, arr2) {
  const result = [];

  for (let i = 0; i < arr1.length; i++) {
    const row = [];
    for (let j = 0; j < arr2[0].length; j++) {
      row.push(multiply(extractRow(arr1, i), extractCol(arr2, j)));
    }
    result.push(row);
  }

  return result;
}

/**
 * @param {number[][]} arr
 * @param {number} idx
 * @returns {number[]}
 */
function extractRow(arr, idx) {
  return arr[idx];
}

/**
 * @param {number[][]} arr
 * @param {number} idx
 * @returns {number[]}
 */
function extractCol(arr, idx) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i][idx]);
  }
  return result;
}

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @returns {number}
 */
function multiply(arr1, arr2) {
  let sum = 0;
  for (let i = 0; i < arr1.length; i++) {
    sum += arr1[i] * arr2[i];
  }
  return sum;
}

export default solution;

export { extractCol, extractRow, multiply };
```

</div>
</details>

- 단위테스트에 추출로 문제를 풀었습니다.
- 성능이 아주 나쁠 것이라는 생각이 듭니다.

<details>
<summary>모범답안</summary>
<div markdown="1">

```js
function solution(arr1, arr2) {
  return arr1.map((row) =>
    arr2[0].map((x, y) => row.reduce((a, b, c) => a + b * arr2[c][y], 0))
  );
}
```

```js
function productMatrix(A, B) {
    return A.map(function(row) {
        return row.map(function(_, i) {
            return row.reduce(function(sum, cell, j) {
                return sum + cell * B[j][i];
            }, 0);
        });
    });
```

</div>
</details>

이렇게 본질을 보면 이 풀이가 적절합니다.

## 최소공배수 최대공약수

최소공배수와 최대공약수는 대수적으로 표현하기는 어려운 문제입니다. 알고리즘처럼 풀이하는 절차표현하는 일반적인 문제입니다.

수학적 성질을 이해하는 것도 중요하지만 문제의 요구사항을 알고리즘으로 표현하는 것이 더 중요합니다.

### N개의 최소공배수

[N개의 최소공배수 - 프로그래머스](https://school.programmers.co.kr/learn/courses/30/lessons/12953)

```js
/**
 * @param {number[]} arr
 * @returns {number}
 */
function solution(arr) {
  const multiple = [];
  let copyArr = arr.slice();
  let div = 2;

  while (div <= Math.max(...copyArr)) {
    if (copyArr.every((num) => num % div === 0)) {
      copyArr = copyArr.map((num) => parseInt(num / div));
      multiple.push(div);
      div = 2;
    } else {
      div += 1;
    }
  }

  return copyArr.concat(multiple).reduce((acc, curr) => acc * curr);
}

export default solution;
```

원래 시도한 정답

최소 공배수를 구하기 위해 수학적으로 표를 만들고 나눗셈하는 방식을 활용했습니다.

소수가 섞여있고 이 소수를 제외하는 방법을 생각하지 못했습니다.

```js
import solution from './playground';
import { test, expect, describe } from 'vitest';

// arr	      result
// [2,6,8,14]	168
// [1,2,3]	  6

describe('N개의 최소공배수', () => {
  test('예제 1', () => {
    expect(solution([2, 6, 8, 14])).toBe(168);
  });
  test('예제 2', () => {
    expect(solution([1, 2, 3])).toBe(6);
  });
  test('예제 3', () => {
    expect(solution([2, 7])).toBe(14);
  });
  test('예제 4', () => {
    expect(solution([12, 32, 45, 67, 72])).toBe(96480);
  });
  test('예제 5', () => {
    expect(solution([17, 34])).toBe(34);
  });
  test('예제 6', () => {
    expect(solution([4, 4])).toBe(4);
  });
});
```

<details>
<summary>2023년 08월 28일</summary>
<div markdown="1">

```js
/**
 * @param {number[]} arr
 * @returns {number}
 */

function solution(arr) {
  arr.sort((a, b) => b - a);
  let result,
    isDivide = false,
    count = arr[0];

  while (!isDivide) {
    isDivide = arr.every((num) => count % num === 0);
    if (isDivide) {
      result = count;
      break;
    }
    count += 1;
  }
  return result;
}

export default solution;
```

정답 코드에 해당합니다.

</div>
</details>

## 배열 조작

### K번째수

```js
/**
 * @param {number[]} array,
 * @param {[number, number, number][]} commands
 * @returns {number[]}
 */
function solution(array, commands) {
  var answer = [];
  return answer;
}
export default solution;
```

```js
import solution from './playground';
import { test, expect, describe } from 'vitest';

// array	                commands	                        return
// [1, 5, 2, 6, 3, 7, 4]	[[2, 5, 3], [4, 4, 1], [1, 7, 3]]	[5, 6, 3]

describe('K번째수', () => {
  test('예제 1', () => {
    expect(
      solution(
        [1, 5, 2, 6, 3, 7, 4],
        [
          [2, 5, 3],
          [4, 4, 1],
          [1, 7, 3],
        ]
      )
    ).toBe([5, 6, 3]);
  });
});
```

```js
/**
 * @param {number[]} array,
 * @param {[number, number, number][]} commands
 * @returns {number[]}
 */
function solution(array, commands) {
  const result = [];
  commands.forEach((elem) => {
    const [i, j, k] = elem;

    result.push(array.slice(i - 1, j).sort((a, b) => a - b)[k - 1]);
  });
  return result;
}

export default solution;
```

## 문자열 조작

문자열 조작은 일상적으로 자주합니다. 또 컴파일러만들 때 기초가 되는 부분입니다.

### 다항식 더하기

```js
/**
 * @param {string} polynomial
 * @returns {string}
 */
function solution(polynomial) {
  var answer = '';
  return answer;
}

export default solution;
```

```js
import solution from './playground';
import { test, expect, describe } from 'vitest';

// polynomial	    result
// "3x + 7 + x"	  "4x + 7"
// "x + x + x"	  "3x"

describe('다항식 더하기', () => {
  test('예제 1', () => {
    expect(solution('3x + 7 + x')).toBe('4x + 7');
  });
  test('예제 2', () => {
    expect(solution('x + x + x')).toBe('3x');
  });
  test('예제 3', () => {
    expect(solution('x')).toBe('x');
  });
  test('예제 4', () => {
    expect(solution('1')).toBe('1');
  });
  test('예제 5', () => {
    expect(solution('1 + x')).toBe('x + 1');
  });
});
```

<details>
<summary>저의 정답</summary>
<div markdown="1">

```js
/**
 * @param {string} polynomial 정수, 공백, ‘x’, ‘+'
 * @returns {string}
 */
function solution(polynomial) {
  let x = 0;
  let num = 0;
  const parsePolynomial = polynomial.split(' ').filter((char) => char !== '+');

  for (let i = 0; i < parsePolynomial.length; i++) {
    const char = parsePolynomial[i];
    if (char.includes('x')) {
      // 계수
      const coefficient = char.replace('x', '')
        ? parseInt(char.replace('x', ''))
        : 1;
      x += coefficient;
    } else {
      num += parseInt(char);
    }
  }

  let result = `${x}x + ${num}`;

  if (x === 1) result = result.slice(1);
  if (x === 0) result = result.split(' ').slice(2).join('');
  if (num === 0) result = result.split(' ').slice(0, 1).join('');

  return result;
}

export default solution;
```

</div>
</details>
