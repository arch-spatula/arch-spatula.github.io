---
sidebar_position: 1
---

<!-- TODO: react에 사용하는 대표적인 인접 라이브러리 목록 추가 -->
<!-- TODO: react에 사용하는 상태관리 라이브러리 목록 추가 -->
<!-- TODO: react native 추가 -->
<!-- TODO: React Router DOM 문서 추가 -->
<!-- TODO: Nextjs 문서 추가 -->
<!-- TODO: style 문서 추가 -->
<!-- TODO: testing 문서 추가 -->
<!-- TODO: react 버전별 문서 추가 -->

# intro

:::caution

꽤 많은 레시피가 마이그레이션으로 추가 될 예정입니다. 문서의 내용과 순서가 크게 바뀔 수 있습니다.

:::

<!-- @todo: 레포의 자료 편집 및 마이그레이션 https://github.com/arch-spatula/React-Cook-Book -->

<!--리액트 시작하기-->

<!--## 이 문서에 대해서-->

<!--이 문서는 리액트와 리액트 생태계를 다룹니다. 주제가 방대합니다.-->

<!--이 문서는 저의 개인적인 경험 위주로 먼저 추가할 예정입니다.-->

<!--이런 이유로 살짝 응용한 내용 위주로 추가될 것입니다.-->

# 왜 리액트를 사용해야 하는가?

리액트를 사용하는 이유는 다양합니다. 2023년 리액트를 사용해야 하는 이유는 컨벤션, 생태계, 채용, 레퍼런스 때문입니다.

1. 컨벤션: 프론트엔드 엔지니어가 지금까지 사용해왔기 때문에 앞으로도 사용합니다. 사실 관성이라는 말이 더 어울립니다.
2. 생태계: 리액트는 이미 만들어진 바퀴가 많습니다. 이미 잘 만들어진 바퀴를 잘 찾기만 하면 됩니다.
3. 채용: 프론트엔드 엔지니어에게 리액트 사용을 기대할 수 있습니다. 국비지원 교육과정에 프론트엔드 엔지니어 교육 과정 대부분이 리액트를 다룹니다. 또 네임드 부트캠프도 리액트를 가르칩니다.
4. 래퍼런스: 생태계와 이어지지만 리액트로 만든 예시가 많아서 비슷한 문제를 해결을 시도하면 또 비슷한 예시를 수월하게 찾아낼 수 있습니다.

이런 측면들을 보면 리액트를 선택하는 이유는 공학적인 이유는 아닙니다. 경영과 개발 운영 관련된 문제를 잘 해결하기 때문에 사용합니다.

어떤 사람은 리액트를 사용하는 이유는 UI의 상태관리 때문에 사용한다고 합니다. 맞는 말이지만 주어가 더 포괄적일 필요가 있습니다. SPA 및 UI 라이브러리와 프레임워크를 사용하는 이유가 UI 상태관리를 위해서 사용한다는 말이 더 정확하기 때문입니다. 리액트가 해결하는 문제는 Solid, Svelte, Qwik, Angular, Vue, Alpine도 해결할 수 있습니다.

리액트를 공학적으로 사용해야 할 이유는 즉 성능적인 장점은 Solid, Svelte, Qwik의 등장 이후 의미가 많이 약해졌습니다.

약간 과거로 돌아간다면 리액트를 공학적으로 사용해야 할 이유가 있습니다. Virtual DOM 때문에 사용해야 합니다. UI 상태를 관리할 때 갱신이 발생해야 할 부분만 찾아서 다시 계산하고 반영하기 때문에 필요합니다. 지금은 Solid, Svelte, Qwik은 UI 라이브러리와 프레임워크 중 컴파일러를 사용해서 리액트와 동일한 결과를 만들지만 성능이 더 효율적입니다.

지금 2023년에 리액트를 공부한다고 손해가 있는 것은 아닙니다. 리액트의 개념은 Solid, Qwik에서도 연결되고 또 리액트의 메타프레임워크인 Next.js, Remix.js 모두 리액트 지식의 연장입니다. deno fresh의 프론트엔드도 preact를 사용하고 역시 리액트 개념과 연결됩니다. 이런 측면에서 공부해서 손해는 아닙니다. 공부를 하면 다음 프론트엔드 변화에 더 유연한 선택지를 유지할 수 있습니다. 즉 순조롭게 적응할 수 있기 때문에 배워야 합니다.

## 리액트는 언제 학습해야 하는가?

순수 JavaScript로 CRUD 작업(게시판, todo-app)을 만들 수 있으면 지식이 충분한 것입니다.

DOM을 조작하는 방법을 알고 UI 엔지니어링에 이벤트 주입을 이해할 수 있으면 충분합니다.

## 리액트는 언제 사용해야 하는가?

2023년에 새로운 제품을 비교적 크고 오랫동안 유지보수해야 한다면 리액트가 적합합니다. 다룰 줄 아는 인력이 많고 해결해본 비슷한 문제가 많으면 리액트를 사용하게 될 것입니다.

프론트엔드 엔지니어로서 포트폴리오를 만들어야 한다면 적당합니다.

~~개인적으로 너무 많이 써서 새로운 것도 사용해보고 싶습니다.~~

## 리액트란 무엇인가?

리액트는 UI 라이브러리입니다. 이 라이브러리라는 의미는 우리가 배우는 제어관점과 반제품 관점 2가지로 파악해보면 모두 적절히 해당합니다.

리액트의 제어관점은 라이브러리인지 프레임워크인지 구분하는 전통적인 관점입니다. 라이브러리는 소비자인 우리가 라이브러리 코드를 호출해서 사용하면 즉 코드에 대한 제어 주체가 프로그래머이면 라이브러리에 해당합니다. 하지만 프레임워크가 프로그래머의 코드를 호출한다면 그것은 프레임워크입니다. 이런 이유로 svelte는 컴파일처리하면서 프로그래머의 코드를 호출하기 때문에 프레임워크로 분류합니다. 반면 리액트는 프로그래머가 hook과 기타 API를 호출해서 사용하기 때문에 라이브러리에 해당합니다.

다른 관점은 반제품관점입니다. 프레임워크는 반제품입니다. 프로그래머가 일일이 정해줘야 하는 것을 스스로 정하지 않고 프레임워크가 미리다 정해줍니다. 우리는 중동 어느나라의 풍요로운 독재정치 아래 시키는대로 코드를 작성하면 됩니다. Next.js는 리액트를 사용하는 프레임워크입니다. Routing, 미들웨어 API, 스타일링(원하면 다른 선택이 가능하지만) 등이 이미 다 정해져있습니다. 반면 리액트 자체는 라이브러리입니다. 이런 이유로 API 호출은 어떻게할지 상태관리는 어떤 전략으로 할지 Routeing은 어떻게 지원할지 스타일링은 어떻게할지 정해줘야 합니다.

리액트는 조급더 넓게 랜더링 프레임워크를 포함합니다. React-DOM은 웹 React-Native는 모바일를 말합니다. 여기서 웹과 모바일은 우리가 조금더 고급스럽게 호스트 환경이라고 부릅니다. 리액트 자체는 UI 객체를 만듭니다. 그리고 리액트가 만든 UI 객체를 받아서 랜더링 라이브러리가 호스트 환경에 맞게 반영해줍니다.
