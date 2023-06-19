---
title: '새 React 프로젝트는 vite를 활용해야 하는 이유'
authors: [arch-spatula]
tags: ['vite', 'react', 'vitest', 'React.dev']
description: '이유가 있다면 더 간소하고 성능이 더 좋습니다. HMR 지원이 상당히 빠릅니다.'
toc_max_heading_level: 6
---

# 새 React 프로젝트는 vite를 활용해야 하는 이유

이유가 있다면 더 간소하고 성능이 더 좋습니다. HMR 지원이 상당히 빠릅니다. 그리고 설치 마법사가 직관적이고 친절합니다. 시작하거나 실험 프로젝트에 활용하기 적합합니다.

물론 예외도 있습니다. 처음 테스트를 공부하는 입장에서는 CRA 활용하는 것이 좋습니다.

<!--truncate-->

## Hot Module Replacement(HMR)

<iframe class="codepen" src="https://www.youtube.com/embed/KCrXgy8qtjM?start=116" title="Vite in 100 Seconds - Fireship" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

상태를 유지하면서 저장 시점에 화면에 반영이 가능합니다. 리랜더링 처리 성능이 엄청나게 빠릅니다. 가끔 특이한 디버깅할 때 유용합니다.

영상을 처음부터 보면 비교적 간소한 라이브러리로 시작하는 것을 알 수 있습니다.

## vitest

[vitest 공식문서](https://vitest.dev/)

vite을 사용하면 vite 플러그인을 활용할 수 있는데 그중 가장 유용한 플러그인은 vitest라고 봅니다. 그외에는 아직 모르는 플러그인이 많습니다.

테스트 코드량과 규모가 커지면 테스트러너는 점점 성능이 떨어집니다. CRA는 Jest로 작성해서 성능 문제가 있만 vitest는 성능 문제가 덜합니다.

안그래도 msw랑 같이 사용하면 테스트 처리시간이 늘어나는데 vitest로 시간을 많이 줄여줍니다.

또 테스트 중에 UI를 지원합니다. ~~저는 개인적으로 이런 매직을 많이 좋아합니다.~~

## 2022년은 vite의 해

작년은 vite의 해였습니다.

[State of JS 2022 Awards](https://2022.stateofjs.com/en-US/awards/)

가장 많은 점유율 증가와 관심을 받았습니다. 이런 측면으로 보면 생태계의 성숙을 기대해볼 수 있고 기존 webpack이 갖고 있던 한계를 극복하는 모습을 금방 보여줄 수 있을 것 같습니다.

<!--

## Million.js

2023년 23주차입니다. docker volume이 오늘은 안 땡깁니다. 사실 주말은 뭔가 배워보고 싶은 거 배워보자고 했는데 느낌대로 행동해야 합니다.

<iframe class="codepen" src="https://www.youtube.com/embed/VkezQMb1DHw" title="High-school student makes React a million times faster" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

fireship이 소개한 새로운 리액트 프레임워크입니다. 생각보다 기능이 작습니다. 그래서 더 좋습니다.

하지만 중요한지 판단하기 어렵습니다. 좋은 성능을 쉽게 뽑는다는 점은 좋지만 리액트가 아닌 프레임워크와 라이브러리를 활용해보고 싶습니다.

~~svelte가 더 재미있습니다.~~

오늘 교훈 중 하나는 학습을 재미있게 하려면 계획을 굳이 하지 않습니다. 일이 됩니다. 궁금하고 배우고 싶으면 바로 배워보도록 합니다.

-->

## 참고. React.dev 출시 이후 개발 커뮤니티의 반응

이것은 참고사항입니다. 개발자 커뮤니티 전체를 대변하는 것은 전혀아닙니다. 개발자 커뮤니티를 대변하는지 확인하기 위해서는 설문조사가 필요합니다.

[React.dev 문서](https://react.dev/)가 출시되었습니다. 리액트 공신문서의 신버전입니다. 프로젝트를 시작할 때 vite을 권장하지 않는 부분을 의아하게 여기는 일부 개발자들도 존재합니다. 강의를 판매하거나 튜토리얼을 게시하는 개발자들은 vite이 적절하다고 생각하는 것으로 보입니다.

<iframe class="codepen" src="https://www.youtube.com/embed/NxaOvaO_cXo?start=79" title="REACT.DEV LAUNCHED! Goodbye Create React App? - Codevolution" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<iframe class="phone-video" src="https://www.youtube.com/embed/Xrgddey8jcA" title="Stop Using Create React App - Web Dev Simplified" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<iframe class="phone-video" src="https://www.youtube.com/embed/GNNBxTY1_C0" title="React.dev is Live! - Jack Herrington" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<iframe class="phone-video" src="https://www.youtube.com/embed/wG0Cx_D3cy0" title="DON'T USE CREATE-REACT-APP ✋ Try this instead 👀" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

아래 일부는 그냥 CRA 시대가 끝났다는 사실을 중요시하고 있습니다.

<iframe class="codepen" src="https://www.youtube.com/embed/M4CLvtCS2YU" title="Create React App is Finally Dead - Theo - t3․gg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

물론 설문 조사를 하고 더 심층적으로 파악해야 합니다.

하지만 저는 저의 부족한 식견으로 동의합니다. 물론 회사에서 일하는 코드베이스가 webpack으로 되어 있고 마이그레이션 하는 것이 너무 어려우면 유지해도 충분히 괜찮다고 생각합니다. 그저 새롭게 시작하는 프로젝트에 괜찮다는 생각입니다.
