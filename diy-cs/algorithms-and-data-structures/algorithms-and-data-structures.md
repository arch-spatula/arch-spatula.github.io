---
sidebar_position: 1
description: '자료구조와 알고리즘'
tags: ['자료구조와 알고리즘', '자료구조', '알고리즘']
---

# 자료구조 & 알고리즘

:::danger 위험

개인적으로 마음대로 작성할 것입니다. 이 문서는 삭제될 수 있습니다. 사실 자바스크립트로 예시를 올릴 생각도 많습니다.

:::

자료구조와 알고리즘은 프로그램으로 문제를 효율적으로 해결하기 위한 지식들입니다.

프로그래밍에서 성능이 좋은 프로그램을 작성할 때 활용하는 지식입니다.

성능의 기준은 낮은 복잡성을 기준으로 합니다. 코드베이스를 이해하기 위한 그런 측면 말고 ~~물론 중요한 것 맞습니다.~~ 처리하기 위해 필요한 CPU 시간(더 정확히는 동작횟수)과 처리하기 위해 보관하고 있어야 하는 데이터의 크기를 말합니다. 이것은 시간복잡성과 공간복잡성입니다.

## 활용

<!-- 작은 수준의 웹개발에서는 생각보다 사용할 상황은 아주 가끔입니다. 이런 점에서 마이너한 것에 메이저한 노력을 들여야하는 느낌이 들 수 있습니다.

비전공자가 개발자로 도전해야 하는 상황이면 어느정도 이해합니다. 현금을 태울 수 있는 기간은 사람마다 다르고 포기해야 한다면 단기적으로 내려 되는 판단입니다.

하지만 장기적으로 상당히 도움 되는 지식들입니다. -->

<iframe class="codepen" src="https://www.youtube.com/embed/xbgzl2maQUU" title="Algorithms You Should Know Before System Design Interviews" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

시스템 디자인에서 생각보다 많이 사용합니다.

## 빅오 표기법

<iframe class="codepen" src="https://www.youtube.com/embed/g2o22C3CRfU" title="Big-O Notation in 100 Seconds" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

빅오 표기법을 가장 짧게 표현한 영상입니다.

![](https://user-images.githubusercontent.com/84452145/271777254-80484c24-16fd-44d0-81db-e0c3128d3ef0.png)

- $O(1)$ : 상수 복잡도(constant complexity)
- $O(log\  n)$ : 로그 복잡도(logarithmic complexity)
- $O(n)$ : 선형 복잡도(linear complexity)
- $O(n \cdot k)$ : 다항 복잡도(polynomial complexity)
- $O(n \cdot log_{10} n)$ : N 로그 복잡도(n logarithmic complexity)
- $O(n^{2})$ : 제곱 복잡도(quadratic complexity)
- $O(n^{3})$ : 큐빅 복잡도(cubic complexity)
- $O(2^{n})$ : 지수 복잡도(exponential complexity)
- $O(n!)$ : 팩토리얼 복잡도(factorial complexity)

<!-- 이 빅오 표기법은 영어로 말하면 간지나기 때문에 외웁시다. -->

<!-- ## 탐색

검색이라고 해도 됩니다. 어떤 데이터를 찾기 위한 동작입니다. -->

<!-- @todo 아래 내용 정리하기 -->
<!-- ## dfs와 순열과 조합 -->

<!-- https://leejams.github.io/%EC%A1%B0%ED%95%A9/ -->

<!-- https://velog.io/@rlatp1409/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-JS-%EC%88%9C%EC%97%B4%EA%B3%BC-%EC%A1%B0%ED%95%A9-%EA%B5%AC%ED%98%84-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8 -->

<!-- https://velog.io/@devjade/JavaScript%EB%A1%9C-%EC%88%9C%EC%97%B4%EA%B3%BC-%EC%A1%B0%ED%95%A9-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0 -->

## 학습자료

### 강의자료

[NeetCode](https://www.youtube.com/@NeetCode)

- 아마존, 구글에서 근무했던 엔지니어입니다.
- 유튜브에서 코테를 많이 다룹니다. 하지만 코테만 다루는 것은 아닙니다. 주로 다루는 언어는 python입니다.

[ThePrimeagen의 The Last Algorithms Course You'll Need - frontend masters](https://frontendmasters.com/courses/algorithms/)

- 현 넷플릭스 엔지니어가 자료구조 알고리즘을 무료 풀어둔 강의입니다.

[Colt Steele의 JavaScript Algorithms and Data Structures Masterclass](https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/)

- 유료강의입니다. 나중에 할인할 때 구매하기 바랍니다.

#### 권장 도서들

[자료구조, 알고리즘 그리고 코딩 테스트와 관련된 추천 책(교재)](https://www.sangkon.com/about_ds_book_2003/)

### 문제자료

[프로그래머스](https://school.programmers.co.kr/learn/challenges)

- 기초를 학습하기 아주 쉽습니다. 비교적 서비스가 좋습니다.

[백준](https://www.acmicpc.net/)

- 문제수가 제일 많습니다.
- 티어별로 문제를 풀어서 점진적으로 실력을 상승시킬 수 있습니다.
- 수동으로 티어 정리하기 귀찮으면 [solved.ac](https://solved.ac/)을 이용하면 편합니다.

[SW Expert Academy](https://swexpertacademy.com/main/main.do)

- ssafy에서 자주 사용합니다.

[LeetCode](https://leetcode.com/problemset/all/)

- 미국에서 많이 활용하는 서비스입니다.

[codewars](https://www.codewars.com/)

- LeetCode 대신에 사용할 수 있습니다.

[adventofcode](https://adventofcode.com/)

- 이 문제는 접근이 더 현실적입니다. 실제 코드를 변경을 자주하기 때문에 코드의 유지보수 가능성을 늘리기 좋습니다.

[프로젝트 오일러](https://projecteuler.net/)

- 직접 테스트 코드를 작성해야 하는 단점이 있습니다.

## 부록: 백준 설정

```
/(작업폴더)
  input.txt
  index.js
  index.test.js
```

일반적인 경우에는 아래와 같이 설정하기 바랍니다.

### fs 예시

```js
const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : __dirname + '/input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
```

```js title="index.js"
const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : __dirname + '/input.txt';
let input = fs.readFileSync(filePath).toString().split('\n').map(String);

/**
 * @param {string} input
 * @returns {sting}
 */
function solution(input) {
  // ... 이런저런 풀이과정
  return '';
}

console.log(solution(input));

module.exports = {
  solution,
};
```

### readline

```js
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let answer = '';
rl.on('line', (line) => {
  const input = line.split(' ');

  if (input.length === 2) {
    const A = parseInt(input[0]);
    const B = parseInt(input[1]);
    answer += A + B + '\n';
  }
}).on('close', () => {
  console.log(answer);
  process.exit();
});
```

### test

```js
import { solution } from './index';
import { test, expect, describe } from 'vitest';

describe('N 찍기', () => {
  test('예제 1', () => {
    expect(solution(1)).toBe(1);
  });
});
```

원하며는 중간에 테스트 코드를 추가하기바랍니다. 하지만 매번 출력을 편집해줘야 합니다.

### 팁

1. 마지막 줄에 줄바꿈을 하고 있는지 주의하기 바랍니다.

2. `input.txt`에 읽는 파일을 `console.log`로 한번 확인하기 바랍니다.
