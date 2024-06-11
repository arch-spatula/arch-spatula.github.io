---
sidebar_position: 1
description: '자료구조와 알고리즘'
tags: ['자료구조와 알고리즘', '자료구조', '알고리즘']
---

# 자료구조 & 알고리즘

:::danger 위험

개인적으로 마음대로 작성할 것입니다. 이 문서는 삭제될 수 있습니다. 나중에 자료구조 알고리즘 문서를 분리할지도 모릅니다. 또 일반적으로 강의하는 순서도 아닙니다. 선형 자료구조 비선형 자료구조 이렇게 해야하는데 안 하고 있습니다. 물론 선형자료구조 비선형 자료구조 등 순서를 편집할 예정입니다.

코테는 좋은 기업을 가기 위한 필터 장치 중 하나입니다. 이 필터 장치를 통과할 수준으로는 정상적인 프로그래머가 되기에는 턱없이 부족합니다. 물론 좋은 기업이 보기 시작했다고 안 좋은 기업이 안 보는 것도 아닙니다. 최저임금을 주지만 학과 수석에 알고리즘 대회 수상자를 원하는 회사가 대다수입니다. 급여를 줄 능력이 안되는 개발자를 원합니다.

처음에는 자바스크립트로 예시를 올릴 생각도 많습니다. 하지만 앞으로는 C 언어로 전환해둘 것입니다. 자바스크립트로 풀어야 하는 이유는 직업으로 프론트엔드 개발자라서 자바스크립트로 다루고자 합니다. 제가 면접관이라면 프론트엔드는 자바스립트로 가능해야 한다고 보기 때문입니다. 제가 나중에 분야를 AI로 바꾸고 면접관이 된다면 데이터 사이언티스트는 C++로 보도록 할 것입니다.

나중에는 C++ 예시도 추가할 계획도 있습니다. 하지만 고급알고리즘을 먼저 순수 C 언어로 구현하고 그 후에 C++로 추가 할 것입니다. 물론 고급이라는 수준은 석사부터 다루기 시작하는 부분부터입니다. 급하면 B+tree까지 순수 C 언어로 구현하고 C++ 전환 작업을 시작할 것입니다.

대학교 교육과정에서는 이산수학에 대해서 선수과목을 지정합니다. 어느정도 맞는 말입니다. 제가 면접관이라면 수학적 사고력을 많이 요구하는 문제를 일부러 많이 출제해서 비전공자를 탈락시킬 것입니다.

비전공자이고 C 언어의 산을 방금 넘었다면 DSA로 반드시 연습해야 한다고 봅니다.

C 언어 백준을 위한 CLI는 따로 만들어 둘 것입니다. 단위 테스트도 포함할 것입니다.

:::

자료구조와 알고리즘은 프로그램으로 문제를 효율적으로 해결하기 위한 지식들입니다.

프로그래밍에서 성능이 좋은 프로그램을 작성할 때 활용하는 지식입니다.

성능의 기준은 낮은 복잡성을 기준으로 합니다. 코드베이스를 이해하기 위한 그런 측면 말고 ~~물론 중요한 것 맞습니다.~~ 처리하기 위해 필요한 CPU 시간(더 정확히는 동작횟수)과 처리하기 위해 보관하고 있어야 하는 데이터의 크기를 말합니다. 이것은 시간복잡성과 공간복잡성입니다.

## 활용

<!-- 작은 수준의 웹개발에서는 생각보다 사용할 상황은 아주 가끔입니다. 이런 점에서 마이너한 것에 메이저한 노력을 들여야하는 느낌이 들 수 있습니다.

비전공자가 개발자로 도전해야 하는 상황이면 어느정도 이해합니다. 현금을 태울 수 있는 기간은 사람마다 다르고 포기해야 한다면 단기적으로 내려 되는 판단입니다.

하지만 장기적으로 상당히 도움 되는 지식들입니다. -->

<iframe className="codepen" src="https://www.youtube.com/embed/xbgzl2maQUU" title="Algorithms You Should Know Before System Design Interviews" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

시스템 디자인에서 생각보다 많이 사용합니다.

## 빅오 표기법

<iframe className="codepen" src="https://www.youtube.com/embed/g2o22C3CRfU" title="Big-O Notation in 100 Seconds" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

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

## 활용하는 학습자료

### 강의자료

- [ ] [Colt Steele의 JavaScript Algorithms and Data Structures Masterclass](https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/)
  - 유료강의입니다. 나중에 할인할 때 구매하기 바랍니다.
  - 저는 모든 강의를 다 들었습니다. 하지만 필기자료를 그대로 모두 공개하지 않을 것입니다.
- [ ] [Data Structures & Algorithms Roadmap](https://roadmap.sh/datastructures-and-algorithms)
  - 이런 저런 공부 순서를 알려주는 웹사이트입니다. 거기서 자료구조 알고리즘 공부 서순도 있습니다.
- [ ] [NeetCode](https://www.youtube.com/@NeetCode)
  - 아마존, 구글에서 근무했던 엔지니어입니다.
  - 유튜브에서 코테를 많이 다룹니다. 하지만 코테만 다루는 것은 아닙니다. 주로 다루는 언어는 python입니다.
  - 유료 코테 서비스도 만들었습니다.
- [ ] [ThePrimeagen의 The Last Algorithms Course You'll Need - frontend masters](https://frontendmasters.com/courses/algorithms/)
  - 전 넷플릭스 엔지니어가 자료구조 알고리즘을 무료 풀어둔 강의입니다.
  - 하지만 서비스이용을 위해서는 회원가입이 필요합니다.

### 권장 도서들

<!--

알고리즘 트레이닝(통칭 파란책) 

알고리즘 문제 해결 전략(통칭 종만북, 하얀책)

프로그래밍 콘테스트 챌린징(통칭 노란책)

FOUNDATION OF ALGORITHMS USING C++ PSEUDOCODE 

Introduction to Algorithms

-->

- [ ] [Do it! 자료구조와 함께 배우는 알고리즘 입문 : 파이썬 편](https://www.yes24.com/Product/Goods/91219874)
  - 우리나라는 코테를 파이썬으로 많이 응시해서 이 책은 상당히 인기가 많습니다.
  - 아주 옛날에 구매했습니다. 그 때는 파이썬에 관심있었을 때 였습니다. 아직 안 읽었습니다.
  - 지금은 개념은 읽으지만 모든 예제는 C 언어로 풀려고 합니다.
- [ ] [코딩인터뷰 완전분석](https://www.yes24.com/Product/Goods/44305533)
  - 상당히 고전입니다.
  - 언어는 Java로 되어 있어서 우리나라 정서에 상당히 잘 맞습니다.
- [ ] [2024 알고리즘 이론+기출](https://www.yes24.com/Product/Goods/126113295)
  - 아직 안 읽었습니다. 하지만 저는 한국에서 공부는 수험서로 하는 것이 올바르다고 봅니다.
- [ ] [어떻게 문제를 풀 것인가](https://www.yes24.com/Product/Goods/325507)
  - 프로그래머가 문제를 접근할지 다루는 고전입니다.

### 문제자료

[프로그래머스](https://school.programmers.co.kr/learn/challenges)

- 기초를 학습하기 아주 쉽습니다. 비교적 서비스가 좋습니다.
- 0단계부터 정답률이 높은 순서로 풀면 할만합니다.

[백준](https://www.acmicpc.net/)

- 문제 수가 제일 많습니다.
- 티어별로 문제를 풀어서 점진적으로 실력을 상승시킬 수 있습니다.
- 수동으로 티어 정리하기 귀찮으면 [solved.ac](https://solved.ac/)을 이용하면 편합니다.
  - 과거 C++ 개발자가 골드 2 티어로 SK C&C 합격했다는 전설이 있습니다.

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

### 자바스크립트 설정

```
/(작업폴더)
  input.txt
  index.js
  index.test.js
```

일반적인 경우에는 아래와 같이 설정하기 바랍니다.

#### fs 예시

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

#### readline

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

#### test

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

#### 팁

1. 마지막 줄에 줄바꿈을 하고 있는지 주의하기 바랍니다.

2. `input.txt`에 읽는 파일을 `console.log`로 한번 확인하기 바랍니다.

<!-- @TODO: 프림 알고리즘, MST 최소 신장 트리(MST, Minimum Spanning Tree) https://gmlwjd9405.github.io/2018/08/28/algorithm-mst.html
-->

<!-- @TODO: KMP  -->

<!-- @TODO: 허프만 알고리즘 -->

<!-- @TODO: 위상 정렬 https://namu.wiki/w/%EC%9C%84%EC%83%81%20%EC%A0%95%EB%A0%AC
 -->

<!-- @TODO: 유클리드 호제법

https://namu.wiki/w/%EC%9C%A0%ED%81%B4%EB%A6%AC%EB%93%9C%20%ED%98%B8%EC%A0%9C%EB%B2%95
 -->

<!-- @TODO: 소인수분해/알고리즘

https://namu.wiki/w/%EC%86%8C%EC%9D%B8%EC%88%98%EB%B6%84%ED%95%B4/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98
 -->

<!-- @TODO:

최소 공배수 최대 공약수 알고리즘
 -->

<!-- @TODO:

하노이의 탑
 -->

<!-- @TODO:

카운트 정렬 & 기수 정렬
-->

<!-- @TODO: LIS 최장 증가 부분 수열

https://namu.wiki/w/%EC%B5%9C%EC%9E%A5%20%EC%A6%9D%EA%B0%80%20%EB%B6%80%EB%B6%84%20%EC%88%98%EC%97%B4
 -->

<!-- @TODO: 플로이드-워셜 알고리즘

https://namu.wiki/w/%ED%94%8C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EC%9B%8C%EC%85%9C%20%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98
 -->

<!-- @TODO: 래드 블랙 트리
 -->

<!-- @TODO: 벨먼-포드 알고리즘

https://namu.wiki/w/%EB%B2%A8%EB%A8%BC-%ED%8F%AC%EB%93%9C%20%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98
 -->

<!-- @TODO: 크루스칼 알고리즘
 -->
