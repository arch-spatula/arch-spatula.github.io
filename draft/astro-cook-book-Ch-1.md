---
layout: ../../../layouts/MarkdownPostLayout.astro
title: "Ch 1 Why Astro"
pubDate: 2022-12-01
description: "Astro를 다루는 방법을 소개합니다."
author: "Arch Spatula"
tags: ["astro", "Cook-book", "learning in public"]
---

> TL;DR
>
> 1. astro는 취미 이외 유스케이스가 없습니다.
>
> 2. 모든 것이 가능해보이지만 모든 것이 비효율적입니다.
>
> 3. 개발자의 UI라이브러리와 프레임워크 취향을 반영할 수 있게 유연합니다.

## draft를 바로 공개하는 이유가 있나요?

블로그 관리 안 하는 것처럼 보이기 싫었습니다.

# 왜 Astro를 활용해야 하는가?

상당히 부적절한 질문입니다. 프레임워크를 선택하는 이유는 왜 보단 언제 즉 맥락의 문제입니다. 맥락은 해결할 문제가 결정합니다. 여기까지는 누구나 아는 훈수입니다.

사실 Astro를 사용할 이유는 없습니다. 이 이유는 Astro가 무엇이고 핵심 개념을 전달한 뒤에 트레이드 오프를 비교할 때 고를 수 있을 것입니다.

여기서 약간의 의문이 들 수 있습니다. 이 블로그는 왜 Astro를 다루는가? 이 블로그를 Astro로 만들었기 때문에 적어도 저는 공부하려고 합니다.

- 게츠비
- next.js
- docusaurus
- hugo
- jekyll
- Qwik
- Deno - fresh

## Astro는 무엇인가?

[Astro 공식 홈페이지](https://astro.build/)

> Astro는 빠르고 콘텐츠 집약적인 올인원 웹프레임워크입니다. (Astro is an all-in-one web framework for building fast, content-focused websites).
> [Astro 공식 문서](https://docs.astro.build/en/getting-started/)

번역 그 자체는 가치가 없습니다. 제가 문서만 번역할 거면 공식 홈페이지를 번역해 줄 거면 제가 한국어 PR을 아마 따로 올렸을 것입니다(~~참고로 생각은 있습니다. 실천이 문제죠~~).

Astro는 프레임워크입니다. 그 중 랜더링을 제어하는 프레임워크 즉 메타프레임워크입니다. Astro는 정적으로 웹을 생성(Static Site Generator)하는 라이브러리입니다. 백엔드 설정만 잘 하면 SSR(Server Side Rendering)을 지원합니다.

[State of JavaScript - Rendering Frameworks](https://2022.stateofjs.com/en-US/libraries/rendering-frameworks/)

Astro의 특징은 다양한 프론트엔드 프레임워크를 수용할 수 있습니다.

이런 특징 때문에 플랫폼, 라이브러리라는 느낌을 많이 받습니다.

https://www.youtube.com/watch?v=dsTXcSeAZq8

https://www.youtube.com/watch?v=gxBkghlglTg&pp=ugMICgJrbxABGAE%3D

## 사용하지 말아야 할 상황

1. 문서화

정적사이트고 문서화를 상당히 잘 할 것이라는 느낌을 받습니다. 이것은 개발자로서 라이브러리 서치 능력이 부족한 것입니다. 문서화를 제일 잘하는 프레임워크 혹은 라이브러리는 docusaurus입니다. 회사에서 거래처 혹은 고객사가 읽어야 할 기술 문서가 있고 공개해야 하면 docusaurus를 권장합니다.

https://docusaurus.io/

하지만 저는 사용해본 경험이 없습니다.

2. 개발자 블로그

프론트엔드 엔지니어 이외 개발자는 권장하지 않습니다. hugo, jekyll도 존재합니다. 또 docusaurus를 그대로 사용해도 됩니다.

프론트엔드 엔지니어는 gatsby를 고민할 것입니다. astro로 개발자 블로그를 만들고 있는 입장에서는 당연히 docusaurus를 추천할 것입니다.

3. 웹 콘텐츠

웹 콘텐츠는 다양합니다. 당연히 영상처리는 생각도 안합니다. 웹툰과 웹소설은 Next image랑 비교가 필요합니다. 직접 검증하기 귀찮아서 생략했습다. 하지만 Next image가 효율이 좋다고만 했습니다. 검증된 Next.js를 일단 권장합니다.

4. 마케팅 사이트

본인 회사가 SaaS 회사이고 랜딩 페이지만 독립적인 서비스로 만들고 있다면 sveltekit을 권장합니다. 새롭게 다시 만들어야 하는 것이 많은 가능성이 높기 때문에 그렇습니다.

5. 커머스

Next.js가 적절합니다. 커머스가 동적일 이유가 없습니다. 동적인 상호작용을 포기하고 검증된 최적화를 선택하도록 합니다.

가끔 컨셉샵 비슷하게 크리에티브한 커머스들도 존재합니다. sveltekit으로 프로토타이핑하고 css만으로 대부분 커버 가능하고 또 커버 가능해야 합니다.

6. 프로토타입

초기 사이드 프로젝트 deno fresh도 상당히 괜찮습니다. 프론트엔드 코드와 백엔드 코드를 응집도있게 작성이 가능합니다.

소규모로 받는 외주가 전자정부 프레임워크 기준을 따를 필요가 없으면 또 sveltekit을 활용합니다.

7. 어드민 & 대시보드

SPA로 react, svelte로 빠르게 만들 것을 권장합니다. 마이크로 프론트엔드 아키텍쳐처럼 오버엔지니어링 할 필요가 없습니다.

8. SaaS

Solid처럼 성능좋은 SPA로 처리합니다. flex같은 툴은 충분해보입니다.

figma 수준이면 Rust의 Yew를 사용하도록 합니다.

### 결론

생각보다 유스케이스가 많지 않습니다. 더 효과적인 도구가 이미 존재하는 경우가 대부분입니다. 그래서 각각 해당하는 더 효율적은 도구를 공부하고 활용하도록 합니다. 그렇다면 저는 왜 Astro로 블로그를 만들었을까요? docusaurus를 몰랐습니다. 물론 프론트엔드 엔지니어로서 재미있는 기능들을 많이 추가해볼 생각도 있습니다.

## 해결하는 문제

해결하는 문제를 보면 주목받을만한 것들이 많이 있습니다. 하나는 다양한 라이브러리 및 프레임워크 수용과 다른 하나는 아일랜드 아키텍쳐입니다. 경력이 많지 않아도 회의적어야 합니다.

### 유사 마이크로 프론트엔드

가장 큰 특징은 다양한 프론트엔드 프레임워크 혹은 라이브러리를 수용할 수 있습니다. react, vue, svelte 등 모두 수용할 수 있습니다. 물론 webpack의 federation을 사용하면 해결할 수 있는 문제입니다. 물론 대부분의 프론트 엔지니어는 이미 webpack을 다 알고 있습니다. 그래서 webpack의 federation을 설정하는 것은 쉽습니다. ~~물론 저는 해본적 없습니다.~~

마이크로 프론트엔드 느낌만 난다고 했지 진정한 마이크로 프론트엔드가 아닙니다. 진정한 마이크로 무언가 아키텍처를 만들고 싶다면 astro로 해결할 수 없습니다. 먼저 필요한 것은 RxJS, Nx, Webpack부터 사용하는 법부터 배우도록 합니다. astro는 마이크로 프론트엔드 아키텍쳐를 어디까지나 흉내만 내는 것입니다.

또 MFA가 필요한가? 없습니다. 필요할 상황은 커리어상 마주할 일이 없을 것입니다.

### 아일랜드 아키텍쳐

부분 하이드레이션(partial hydration)을 지원합니다. 리액트는 root dom을 통해 모든 것을 자바스크립트로 html을 만들어 냅니다. next.js는 서버에서 html을 랜더링하고 클라이언트로 보냅니다. astro도 html의 부분을 클라이언트로 보내지만 원하면 일부 동적인 동작을 위해 남길 수 있는 제어가 가능합니다.

## 인식

놀랍게도 나무위키에서도 다루었습니다.

[Astro(웹 프레임워크) - 나무위키](<https://namu.wiki/w/Astro(%EC%9B%B9%20%ED%94%84%EB%A0%88%EC%9E%84%EC%9B%8C%ED%81%AC)>)

나무위키는 전망이 안 좋다고 말합니다. 저는 전망도 안 좋다고 봅니다.

<iframe src="https://www.youtube.com/embed/dsTXcSeAZq8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<iframe src="https://www.youtube.com/embed/gxBkghlglTg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

개인적으로 Fireship을 굉장히 재미있게 봅니다. 평소 구독하고 있으면 테크 트렌드를 따라가기 쉽습니다. 하지만 알아야 할 것은 Fireship을 신뢰할 수 있는가? Fireship은 외주개발자입니다. 즉 소프트웨어 제품 수명주기를 매우 짧게 경험한 사람입니다. 이런 이유로 신뢰할 수 없습니다.

[ghost.js 에서 astro 기반으로 블로그 옮긴 후기 - 로토의 블로그](https://blog.roto.codes/migrate-ghostjs-to-astro)

이 블로그는 마이그레이션 경험을 이야기 해줍니다. 학습이 쉬웠다고 후기를 남겼습니다.

[Astro.js 찍먹 후기 (장점, 단점, 결론)](https://gmyankee.tistory.com/377)

저자 이름을 모르겠습니다. 하지만 리뷰를 확인해보면 유스케이스가 거의 없다는 것을 알려줍니다. 프로덕션 레벨에서 마이그레이션할 이유는 당연히 없습니다. 하지만 새로운 프로젝트라고 해도 astro로 시작할 이유도 크게 없습니다.

[아일랜드 아키텍쳐 - Composite](https://velog.io/@composite/%EC%95%84%EC%9D%BC%EB%9E%9C%EB%93%9C-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90)

예전에 <[실무 개발자 입문을 위한 준비물](https://velog.io/@composite/%EC%8B%A4%EB%AC%B4-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%9E%85%EB%AC%B8%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%A4%80%EB%B9%84%EB%AC%BC)>을 재미있게 읽었던 글쓴이 입니다. 이분은 astro에 나름 긍정적인 평가를 내렸고 전망을 긍정적으로 보고 있습니다. 하지만 본인 스스로를 인용하면 외주 개발자의 조언은 무시해야 하기 때문에 주장한 명제의 역을 수용하는게 현명할 것입니다.

### 결론

대체로 프로젝트 규모가 작거나 외주관련 프로젝트에 긍정적인 경향을 갖고 있습니다. 하지만 외주에 더 효율적인 것들이 있기 때문에 누군가 저에게 astro 괜찮은지 질문한다면 다른 거 사용할 것을 권장할 것입니다.

만약 블로그를 다시 시작할 것이면 docusaurus를 활용했을 것입니다. 당시에는 신뢰가 안 갔는데 [State of JS 2022](https://2022.stateofjs.com/)을 보니 생각이 바뀌었습니다. 점유율과 공식 문서를 확인해보니 astro보다 덜 귀찮게 문서화, 블로그 사이트를 구축할 수 있었습니다. 탓할 것은 저의 정보력과 프레임워크 및 라이브러리 선정 능력 밖에 없습니다.

---

아래는 다시 작성할 부분들입니다.

---

## 무엇을 할 수 있는가?

- 정적인 웹페이지를 생성할 수 있습니다.
  - 물론 원하면 서버사이드 랜더링(SSR)으로 구현할 수 있습니다.
- 원하는 UI라이브러리를 추가할 수 있습니다.
  - React, Preact, Solid, Vue, Svelte

## 왜 Astro인가?

프론트엔드 엔지니어로서 개발자 블로그를 만들기 위해 다양한 선택지가 있었습니다.

엔지니어는 선택을 내릴 때마다 다양한 트레이드오프를 고려해야 합니다. Astro의 트레이드오프입니다. 게츠비에 비하면 후발주자입니다. 그렇기 때문에 국문 자료가 많지 않습니다. 트러블 슈팅, 디버깅 등 다른 사람들이 문제해결한 것은 많지도 않고 다른 또 있어도 대부분 영어입니다.

이 글은 2023.01.07.에 작성하기 시작했습니다. 시간이 지나면서 바뀔 수 있습니다. 하지만 이 시점이라고 고정을 가정하고 작성하겠습니다. 또 제가 게으른 사람이라 2023.03.01. 또 작성합니다.

## 누구에게 추천하는가?

개발공부를 시작한지 얼마 안 되어도 괜찮습니다. Astro 제작자의 의도이기도 합니다. 비교적 쉬운게 접근할 수 있도록 설정하게 두었습니다. HTML, CSS, JavaScript만 잘 알고 있으면 Astro를 학습해도 괜찮습니다. 어느정도 잘 알아야 하는가? 리액트 없이 Todo-app을 만들 수 있으면 리액트를 공부하기 시작할 수 있고 Astro도 공부하기 시작해도 괜찮습니다.

- 개발자 블로그를 만들기 시작하는 프론트엔드 엔지니어
- 테크니컬 라이터

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">html</p>&mdash; Astro (@astrodotbuild) <a href="https://twitter.com/astrodotbuild/status/1558238973499039744?ref_src=twsrc%5Etfw">August 12, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# Astro 개념

Astro를 사용하기 위해 알아야 하는 개념들이 있습니다. 바로 랜더링과 자바스크립트 전달(javascript shipping)입니다. 랜더링 개념은 Next.js를 공부한 사람이면 바로 알 수 있습니다. CSR, SSG, ISG, SSR가 존재한다는 것입니다. 몇가지 문제가 있습니다. html만 전달하게 되는 문제고 부분적으로 동적인 지원을 못합니다.

## 하이드레이션

저는 하이드레이션을 보고 곰벌레라고 설명합니다. 곰벌레는 물이 없으면 잠시 가사상태가 됩니다. 웹페이지도 비슷하게 자바스크립트라는 물이 있어서 동적으로 살아날 수 있게 됩니다.

## SSG란 무엇인가?

SSG는 신세계 백화점 아닙니다. 하지만 개발자들에게는 아주 멋진 신세계(brave new world)는 맞습니다.

과거 Next.js를 다루었던 초보 개발자들은 `getStaticProps`처럼 빌드타임에 랜더링한 것입니다. 클라이언트의 요청이 있으면 HTML로 응답하는 방식으로 동작합니다.

## 아일랜드 아키텍쳐란 무엇인가?

아일랜드 아키텍쳐는 사이트가 동적으로 동작할 수 있도록 자바스크립트를 부분만 전달하고 부분만 독립적으로 동작하게 만드는 아키텍쳐입니다. html이라는 바다에서 자바스크립트라는 섬으로 생각하면 쉽습니다.

<iframe width="768" height="432" src="https://www.youtube.com/embed/SICd8tTEqvs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

deno fresh에서도 받아들이기 시작했습니다. 프레임워크 이름답게 신선했습니다. 프론트엔드와 백엔드 사이 관계가 애매해지는 코드베이스를 경험해볼 수 있을 것입니다. 나중에 fresh를 다루는 튜토리얼도 만들고 싶습니다. 그만큼 쉽기 때문에 다뤄보고 싶어졌습니다.

# 시작하기

시작할 때 보면 도움될 자료들입니다.
