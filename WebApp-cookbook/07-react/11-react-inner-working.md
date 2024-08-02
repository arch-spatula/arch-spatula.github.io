---
description: '문서에 대해서 개괄적으로 설명합니다.'
tags: ['react', 'intro']
sidebar_position: 11
draft: true
---

# React Core

<!-- [React 파이버 아키텍처 분석](https://d2.naver.com/helloworld/2690975) -->

<!-- @todo: 폴더 만들고 주제별로 다루기 -->

<!-- @todo: https://github.com/arch-spatula/technical-interview-for-FE/blob/main/%EB%A9%B4%EC%A0%91%EC%A7%88%EB%AC%B8/%EB%A6%AC%EC%95%A1%ED%8A%B8.md -->

<!-- https://www.youtube.com/watch?v=7YhdqIR2Yzo -->

## Virtual DOM

Virtual DOM은 인메모리 객체입니다. 진짜 객체형 데이터타입입니다. 하지만 자료구조 알고리즘으로 분류하면 트리입니다. 하지만 이진트리는 아니고 자식의 개수가 여러개일 수 있습니다.

Virtual DOM을 생성하는 것은 React.js라는 라이브러리가 생성합니다. React는 라이브러리입니다. 그리고 React 라이브러리는 React-DOM, React-Native처럼 호스트 환경에 랜더링을 처리해줄 라이브러리와 같이 사용해야 합니다. React 라이브러리는 Virtual DOM을 생성하고 생성한 Virtual DOM을 활용해서 랜더링하는 것은 랜더링 라이브러리가 처리합니다.

### 휴리스틱 알고리즘

## React Fiber

React Fiber는 자바스크립트의 call stack의 한계를 극복하는 알고리즘입니다. 더 정확히 리액트의 재조정 알고리즘입니다. 리액트가 여러계층의 추상화가 극단적이라는 것도 이 Fiber 개념이 한몫하기 때문입니다.

fiber가 도입되면서 리액트는 크게 2개의 알고리즘으로 나누어졌습니다. 자바스크립트의 call stack을 활용해서 처리할 작업의 순서를 정하는 stack 알고리즘이 있습니다. 이것은 자바스크립트 스펙입니다. 하지만 이 스펙에 문제가 있습니다. 자바스크립트는 동시성을 이벤트 루프로 상당히 잘 처리하는데 이 이벤트 루프가 대부분 자바스크립트 엔진에서 promise를 먼저 stack에 push합니다. 조금더 쉽게 promise가 우선순위가 높습니다.

2가지 함수가 중요합니다. `requestIdleCallback`, `requestAnimationFrame`입니다. 이 2가지 window 메서드는 중요합니다. 먼저 `requestIdleCallback`의 기능은 call stack이 비어있으면 여기에 대입한 callback을 call stack으로 push합니다. `requestAnimationFrame`은 브라우저가 다음 repaint할 때 실행할 callback함수를 실행합니다.

리액트가 내부적으로 처리하는 작업의 순서를 더 유연하게 변경할 수 있습니다.

### 용어

더블 버퍼링:

- 2개의 노드가 있습니다. 하나는 현재 보이는 노드이고 다른 하나는 작업을 처리중인 노드입니다. 처리가 완료되면 보이는 노드와 작업 중인 노드를 바꾸는 기법입니다.
- 게임 개발 분야에서 이런 방법을 활용하는 것으로 더 높은 화질에 부드러운 느낌을 줄 수 있게 되었습니다. 이러한 기법이 리액트에 적용되었습니다.

starvation:

- 계속 우선순위 높은 작업들만 받아서 원래 처리해야 하는 우선순위가 낮은 작업은 작업할 기회가 없어서 결국 처리 못하는 것을 의미합니다.
- 리액트 고유한 용어는 아닙니다.
- 영단어 의미는 기아입니다. 즉 관심에 굶줄인 작업이 결국 아사하는 것으로 비유할 수 있습니다.

<!-- 약간의 역사입니다. 16 버전에 도입된 되었습니다. 여기서부터 meta(당시 페이스북)은 장기적인 계획을 갖고 이 fiber 알고리즘을 만듭니다. -->

<!-- React는 UI 라이브러리입니다. 가장 잘 처리해야 하는 것은 UI와 관련된 로직들입니다. -->

## hook의 동작방식

<!--

# 리액트 성능 최적화

구현 -> 리팩토링 -> 성능 개선

개인적으로 위 과정을 거처 개발하는 것이 좋다고 봅니다.

성능을 개선하면 코드의 결합도가 높아지기 쉽습니다. 그래서 가변성이 높은 제품에서는 성능개선 업무를 분리하고 착수하는 것이 좋다고 봅니다.

물론 어른들의 사정으로 우리는 늘 처음부터 최적화를 해야합니다.

성능최적화는 일반적인 best practice로 `useMemo`, `useCallback`, `React.Memo`을 적절히 사용하는 문제가 아닙니다. react profiler로 랜더링 성능을 측정하고 대응책을 찾고 적용하고 개선하는 과정입니다.

성능개선은 일상적으로 자주 주어지는 업무는 아닙니다. 자주 발생하지도 않습니다. 또 클라이언트 머신에 성능최적화가 억지로 필요하지 않을 수 있습니다. 또 성능을 최적화하지 않고 다른 방식으로 비즈니스 문제를 해결하는 방법도 있습니다.

하지만 이 경험을 갖고 있으면 이력서가 상당히 간지나보입니다.

성능최적화에는 철학적인 문제도 있습니다. 성능이란 무엇인가? 클라이언트 사이드에서 사용자가 사용하는 부분을 엔지니어링하는 입장에서 성능이란 무엇인가? 이것부터 잘 정의해야 합니다. 사용자의 대기시간이 너무 긴가? 클라이언트 기계에서 서버로 요청을 너무 많이 보내는가? 렌더링하면서 CLS가 발생하는가? 클라이언트에서 계산작업이 너무 오래걸리는가?

[How To Maximize Performance In Your React Apps](https://www.youtube.com/watch?v=Qwb-Za6cBws)

-->

<!-- https://velog.io/@sehyunny/how-react-18-improves-app-perf -->

<!-- https://vercel.com/blog/how-react-18-improves-application-performance -->

<!-- https://dev.to/alais29/building-a-real-time-search-filter-in-react-a-step-by-step-guide-3lmm -->

<!--

(번역) 하이드레이션은 트리이고, 재개 가능성(Resumability)은 맵입니다

https://velog.io/@superlipbalm/hydration-tree-resumability-map

-->
