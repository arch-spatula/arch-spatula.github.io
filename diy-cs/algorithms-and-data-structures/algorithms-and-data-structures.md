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

[NeetCode](https://www.youtube.com/@NeetCode)

- 아마존, 구글에서 근무했던 엔지니어입니다.
- 유튜브에서 코테를 많이 다룹니다. 하지만 코테만 다루는 것은 아닙니다. 주로 다루는 언어는 python입니다.

[ThePrimeagen의 The Last Algorithms Course You'll Need - frontend masters](https://frontendmasters.com/courses/algorithms/)

- 현 넷플릭스 엔지니어가 자료구조 알고리즘을 무료 풀어둔 강의입니다.

[Colt Steele의 JavaScript Algorithms and Data Structures Masterclass](https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/)

- 유료강의입니다. 나중에 할인할 때 구매하기 바랍니다.
