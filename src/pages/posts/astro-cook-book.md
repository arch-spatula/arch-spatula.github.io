---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Astro Cook Book"
pubDate: 2022-12-01
description: "Astro를 다루는 방법을 소개합니다."
author: "Arch Spatula"
tags: ["astro", "Cook-book", "learning in public"]
---

> TL;DR
>
> 1. 동적인 인터랙션을 통한 서버통신이 많이 필요하면 비효율적입니다.
>
> 2. 블로그, 개발문서처럼 정적인 프로젝트에는 상당히 효율적입니다. 더 동적으로 다루기 편한 HTML입니다.
>
> 3. 개발자의 UI라이브러리와 프레임워크 취향을 반영할 수 있게 유연합니다.

# draft를 바로 공개하는 이유가 있나요?

블로그 관리 안 하는 것처럼 보이기 싫었습니다.

# Astro는 무엇인가?

Astor는 랜더링을 제어하는 프레임워크 즉 메타프레임워크입니다. Astro는 정적으로 웹을 생성(Static Site Generator)하는 라이브러리입니다.

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
