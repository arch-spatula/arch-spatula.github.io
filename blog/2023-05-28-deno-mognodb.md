---
title: 공룡이 좋아졌습니다.
authors: [arch-spatula]
tags: ['deno', 'deno deploy', '공룡', '리액트 테스트 전략']
description: deno 런타임에서 axios로 mongoDB랑 통신하는데 에러가 계속됩니다.
toc_max_heading_level: 6
---

# 공룡이 좋아졌습니다.

이번주에 Deno를 활용해서 백엔드 미들웨어 서버를 만들었습니다. Axios, MongoDB, Worker, BCrypt을 사용하면서 겪은 에러들입니다.

<!--truncate-->

최근에 Deno를 활용해서 유사 백엔드를 만들기 시작했습니다. 프론트엔드 입장에서 잘해야 하는 부담이 덜해서 재미있게 만들었습니다.

또 docusaurus로 블로그도 만들고 문서화 사이트도 만들었습니다. 프로그래밍으로 만드는 즐거움은 공룡들 덕분에 만끽했습니다.

## deno deploy

배포할 때 github action을 사용하거나 Automatic 설정 2가지 중 1개를 고를 수 있습니다.

Automatic을 고르니까 쉽게 배포되었습니다.

## Your client has issued a malformed or illegal request.

```html
<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />
    <title>400 Bad Request</title>
  </head>
  <body text="#000000" bgcolor="#ffffff">
    <h1>Error: Bad Request</h1>
    <h2>Your client has issued a malformed or illegal request.</h2>
    <h2></h2>
  </body>
</html>
```

엄청난 보안 문제처럼 보이지만 아닙니다. API 명세만 잘 따르면 됩니다. 없는 요청을 보내면 저렇게 응답합니다.

## 배포 후 디버깅

```
hotfix/10
```

이슈 번호를 브랜치명에 붙이는 것이 좋은 전략 같습니다.

[[GitHub] Git 브랜치의 종류 및 사용법 (5가지)](https://gmlwjd9405.github.io/2018/05/11/types-of-git-branch.html)

이 블로그가 설명을 참 잘했습니다.

일단 버그를 별견했습니다.

## 오늘 얻은 일상에서 팁

멍청한 것은 괜찮다. 게으른 것은 문제다.

<iframe class="codepen" src="https://www.youtube.com/embed/D1sGvTU-sZU" title="Software Engineering Anxiety | Prime Reacts" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

문제를 풀어보는 중간에 가끔은 패배를 인정하고 질문을 해도 됩니다.

질문해서 멍청해 보이는 것에 화를 내는 사람은 자신도 멍청해 보이는 것에 화내는 사람입니다. 뛰어난 개발자들이 근무하고 있는 넷플릭스에서도 멍청한 질문을 합니다.

<iframe class="codepen" src="https://www.youtube.com/embed/7FKvrqg636o" title="Engineering Managers: An Important Conversation" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

회사에서 의도적으로 하루 2개 멍청한 질문하도록 요구합니다. 좋은 의도 같습니다. 신입개발자가 멍청한 질문을 의도적으로 멍청해 보이는 것으로 부터 스스로 가리는 행위를 막습니다.

---

## 발견한 Deno 프레임워크

[Dero](https://dero.herudi.workers.dev/#/)

[DestJS](https://deno.land/x/destjs@v0.2.0)

---

## 글을 써서 생각하고 생각하기 위해 글을 씁시다.

<iframe class="codepen" src="https://www.youtube.com/embed/vtIzMaLkCaM" title="LEADERSHIP LAB: The Craft of Writing Effectively" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

이 강의에서 배운 것 중 하나입니다. 순환적으로 접근합니다. 블로그를 수단으로 제가 하는 작업을 더 깊게 생각할 수 있었습니다.

---

## 리액트 테스트 전략

리액트를 활용해서 MVC 패턴으로 관심사를 분리하는 것은 가능합니다. 관심사를 분리하면 관심사별로 테스트를 작성하기 수월해집니다.

테스트를 잘 작성하기 전에 먼저 관심사를 분리하는 개념부터 갖고 있어야 합니다. JSX는 View를 담당해야 하고 hook은 Controller를 담당합니다. Props와 State는 Model을 담당하는데 class 인스턴스로 생성해서 제어하도록 합니다. Model에서 어떻게 갱신할지에 대한 로직을 모두 갖고 처리합니다.

### 컴포넌트를 테스트하는 방법

조건별로 올바르게 랜더링하는지 테스트하면 됩니다.

### Model을 테스트하는 방법

리액트가 아닌 전통적인 테스트방법을 그대로 적용하면 됩니다.

### hook을 테스트하는 방법

hook에 대한 테스트가 성공하면 결합테스트에서 비중을 많이 차지하는 부분 중 하나가 된 것입니다.

hook을 테스트할 때 고려해야 할 점들이 있습니다. hook은 이벤트를 처리하는 함수들이 있고 이 이벤트가 어떻게 state 변형하는지 검증이 필요합니다. 즉 조건은 함수의 실행이고 검증할 결과는 state가 가져야할 값입니다.

### API를 테스트하는 방법

백엔드 엔지니어가 이미 API 명세까지만 진행했으면 테스트로 얻을 수 있는 이익이 더 많습니다.

MSW로 통신을 테스트하는 것이 일반적입니다. 특정 엔드포인트가 어떻게 동작해야 할지 사전에 설정하고 테스트를 작성하고 구현합니다.

### 결합테스트

프론트엔드 엔지니어로서 가장 작성을 많이해야 하는 테스트는 결합 테스트입니다.

결합테스트는 위 4가지 테스트 분야 중 각각 1개를 섞어서 작성하면 됩니다.

API 통신에 따라 컴포넌트 랜더링은 어떻게 다르게 할지 정할 수 있습니다.

Model이 올바르게 요청을 보낼 수 있는 형식인지 검증해볼 수 있습니다.

hook 이 통신을 올바르게 데이터를 처리하는지 검증해볼 수 있습니다. hook이 컴포넌트, model, API와 결합했을 때 올바르게 처리하는지 검증해볼 수 있습니다.
