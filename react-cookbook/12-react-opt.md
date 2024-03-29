---
description: '문서에 대해서 개괄적으로 설명합니다.'
tags: ['react', 'intro']
sidebar_position: 12
draft: true
---

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

<!-- https://velog.io/@sehyunny/how-react-18-improves-app-perf -->

<!-- https://vercel.com/blog/how-react-18-improves-application-performance -->

<!-- https://dev.to/alais29/building-a-real-time-search-filter-in-react-a-step-by-step-guide-3lmm -->

<!--

(번역) 하이드레이션은 트리이고, 재개 가능성(Resumability)은 맵입니다

https://velog.io/@superlipbalm/hydration-tree-resumability-map

-->
