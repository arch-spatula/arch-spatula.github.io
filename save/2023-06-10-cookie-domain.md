---
title: cookie는 도메인이 같아야 주고 받을 수 있습니다.
authors: [arch-spatula]
tags: ['cookie', '배포전략', '원티드 특강', 'domain']
description: 우회할 방법은 cookie를 사용 안 하는 것 말고 없습니다.
toc_max_heading_level: 6
date: 2023-06-10
---

# cookie는 도메인이 같아야 주고 받을 수 있습니다.

우회할 방법은 cookie를 사용 안 하는 것 말고 없습니다.

<!--truncate-->

## 에러로그: 쿠키 미전송 에러

### 문제: 클라이언트에서 cookie가 서버로 보내지지 않습니다.

클라이언트 서버 미들웨어에 2가지 token을 받아야 합니다. 하나는 access token을 header로 전달해줘야 합니다. 다른 하나는 cookie를 보내야 합니다. 서버에 post 요청을 하면 set-cookie 응답을 받는 것까지는 성공했습니다.

문제가 되는 지점은 받은 cookie를 다시 서버로 보낼 때입니다.

```ts
const accessToken = request.headers.get('Authorization');
const refreshToken = await cookies.get('user');

console.log('tokens', accessToken, refreshToken); // tokens Bearer (token 값) undefined
```

access token은 정상 전달을 확인할 수 있었습니다.

### 시도

#### thunder client 시도

thunder client에서 요청과 응답을 시험했습니다. 그것도 배포서버 기준으로 요청과 응답을 얻은 결과 문제가 없었습니다.

```json
{
  "documents": [
    {
      "_id": "646f1ddb471560ac7eab3735",
      "question": "도큐사우르스 짱짱맨",
      "answer": "킹정",
      "submitDate": "Wed May 17 2023 21:11:26 GMT+0900 (한국 표준시)",
      "stackCount": "0",
      "userId": "646f05c55706b3d59520426b"
    },
    {
      "_id": "646f2c7b471560ac7eae6c9b",
      "question": "블로그를 더 간지나게 만드는 방법",
      "answer": "github pages로 DIY로 만든다.",
      "submitDate": "Wed May 17 2023 21:11:26 GMT+0900 (한국 표준시)",
      "stackCount": "0",
      "userId": "646f05c55706b3d59520426b"
    },
    {
      "_id": "646f36c14df1ac0e273eb0d8",
      "question": "혹시나 했는데???",
      "answer": "역시나!!!",
      "submitDate": "Wed May 17 2023 21:11:26 GMT+0900 (한국 표준시)",
      "stackCount": "1",
      "userId": "646f05c55706b3d59520426b"
    }
  ]
}
```

요청 응답이 정상적으로 동작했습니다.

여기서 추론해볼 수 있는 점은 브라우저 정책문제라는 것으로 에러의 면적을 줄일 수 있습니다. 브라우저가 차단하지만 thunder client는 차단을 하지 않아서 정상 동작했습니다.

#### 배포전략이 틀렸습니다.

> 서브 도메인이나 다른 도메인에서 쿠키에 접속할 방법은 없습니다. site.com에서 생성한 쿠키를 other.com에선 절대 전송받을 수 없습니다.[^1]

모던 자바스크립트 튜토리얼에서 찾은 내용입니다.

여기서 문제는 배포 도메인과 서버 도메인이 달라서 cookie를 공유할 수 없다는 것을 알 수 있습니다.

일단 무식한 전략으로 deno deploy의 도메인을 변경할 수 있는지 확인해봤습니다.

flash-card-frontend-pi.vercel.app을 도메인 설정으로 입력했습니다. 어림도 없습니다. 반대로 vercel에서 설정을 시도했는데 역시 이미 있어서 막혔다고 합니다.

문제가 있고 문제를 해결하기 위해서는 우회해야 합니다. 우회를 효과적으로 하는 방법을 ChatGPT에게 질문했습니다.

> 만약에 클라이언트와 서버가 통신하는데 클라이언트 도메인과 서버 도메인이 달라서 클라이언트가 쿠키를 전달할 수 없는 상황에서는 어떻게 대응할 수 있는가? 최대한 다양한 전략들을 알려주십시오.
>
> \- 저의 질문

> 즉 처음 설계할 때 다양한 도메인을 갖게 만들어서 문제가 된 것입니다. 또 개발부채가 추가되었다는 생각이 듭니다. 그냥 Next.js 사용했으면 같은 도메인 API 서버에 요청하고 응답받고 풀스택 프레임워크로 만들 수 있었을 텐데 아쉽습니다. 아마 2.0에서는 메타 프레임워크로 전환해야 합니다.
>
> 클라이언트와 서버가 서로 다른 도메인을 가지고 있을 때, 일반적인 방법으로는 클라이언트가 쿠키를 서버에 전달할 수 없습니다. 그러나 다음과 같은 다양한 전략들을 사용하여 이러한 상황에 대응할 수 있습니다:
>
> 1. 도메인 간 통신 (Cross-Origin Communication):
>
> 웹 브라우저는 도메인 간 통신을 위한 다양한 메커니즘을 제공합니다. 가장 일반적인 방법은 Cross-Origin Resource Sharing (CORS)입니다. 서버에서 CORS 헤더를 설정하여 특정 도메인에서의 요청을 허용할 수 있습니다.
> 또는 서버에서 JSONP(JSON with Padding)이나 프록시를 사용하여 클라이언트와 서버 간의 통신을 중개할 수 있습니다.
>
> 2. 서버 간 쿠키 전달 (Server-to-Server Cookie Transfer):
>
> 클라이언트와 서버 간의 쿠키 전달을 우회하기 위해 서버 간에 쿠키를 전달할 수 있는 메커니즘을 구현할 수 있습니다. 예를 들어, 클라이언트가 서버 A에 요청을 보내면, 서버 A는 서버 B에 요청을 전달하고, 서버 B에서는 클라이언트에 대한 응답과 함께 쿠키를 설정하여 서버 A로 전달할 수 있습니다.
>
> 3. URL 매개변수 사용:
>
> 클라이언트가 서버에 쿠키를 전달할 수 없는 경우, URL 매개변수를 사용하여 필요한 정보를 직접 전달할 수 있습니다. 클라이언트는 매 요청마다 인증 정보나 세션 ID와 같은 데이터를 URL에 포함시켜 서버로 전달합니다. 서버는 해당 매개변수를 검사하여 클라이언트를 식별하고 필요한 동작을 수행합니다.
>
> 4. 토큰 기반 인증 (Token-based Authentication):
>
> 클라이언트와 서버 간의 인증을 위해 토큰 기반 인증을 사용할 수 있습니다. 클라이언트는 로그인 시에 서버로부터 토큰을 받아서 보관하고, 각 요청마다 토큰을 헤더나 매개변수로 전달합니다. 서버는 토큰을 검증하여 클라이언트를 인증하고 요청을 처리합니다.
>
> 5. 다른 도메인 간의 프레임 사용 (Cross-Domain Iframes):
>
> 클라이언트와 서버 간의 통신을 위해 다른 도메인 간에 프레임을 사용할 수 있습니다. 클라이언트에서 프레임을 로드하고, 프레임은 자체 도메인의 쿠키를 전달할 수 있습니다. 프레임은 부모 도메인과 통신하여 필요한 정보를 전달하고 응답을 받을 수 있습니다.
>
> 이러한 전략들은 서로 다른 도메인 간의 상호작용을 위해 사용되는 일반적인 메커니즘입니다. 선택할 전략은 상황에 따라 다를 수 있으며, 보안 요구사항과 기술적 제약 등을 고려하여 적합한 전략을 선택해야 합니다.
>
> \- ChatGPT

가장 단순하게 생각되는 전략은 Refresh token은 Session Storage에 저장하고 header에 같이 보내는 방법입니다. 그리고 나중에 배포를 수정하는 전략이 있습니다. 백엔드 코드를 또 건드리고 patch 릴리즈를 또 해야 하지만 최후의 전략으로 적당해 보입니다.

### 해결: cookie에서 session storage

- 일단 갱신이 필요하면 refresh를 처리하는 절차를 인터셉터로 구현하면 됩니다. 즉 개발 부채가 또 쌓입니다. 하지만 YAGNI 원친에 맞춰 미래의 저에게 맡기겠습니다. 또 패치업데이트 하겠습니다.

[axios interceptors와 refresh token을 활용한 jwt 토큰 관리 - HyunGyu-Kim](https://gusrb3164.github.io/web/2022/08/07/refresh-with-axios-for-client/)

위 아티클에서 보면 cookie를 활용하고 있지 않습니다. 위 아티클에서도 백엔드에 도메인이 프론트엔드 도메인과 다를 것이라고 파악할 수 있습니다.

### 학습: cookie를 고통스러운 방식으로 배웠습니다.

- cookie는 요청응답 도메인이 같아야 합니다. 그래야 cookie를 포함하고 통신합니다. 도메인이 다르면 cookie는 서버로 전송되지 않습니다. access token은 header에 정상 동작합니다.
- 배포 전략에서 cookie 자원 공유문제를 잘 고려하도록 합니다. 도메인이 달라서 생기는 문제도 고려해야 합니다.
- 한가지 의문이 들었습니다. 모바일은 어떻게 처리하는가?
  > 모바일 애플리케이션에서는 안전한 저장소인 안전한 키 체인(Secure Keychain) 또는 안드로이드의 안전한 저장소(Secure Storage)를 사용하는 것이 좋습니다. 이러한 안전한 저장소는 암호화된 형식으로 사용자의 인증 토큰을 저장하고 안전하게 관리합니다.
  - 얻은 답변입니다. 저장하고 접근하는 전략이 다르다는 것입니다.

## 원티드 특강

- 스토리북을 활용한 컴포넌트 주도 개발(CDD)을 탐구합니다.
- 실질적으로 코드 실질적은 예시도 보여줄 것입니다.
- 코드는 직접 작성하도록 합니다.
- 아토믹 디자인 패턴을 가끔 현업에서 나올 수 있습니다. 아토믹 디자인 패턴을 절대 오해하면 곤란합니다. 한계가 있습니다.
- 아토믹 디자인 패턴은 이론적으로 전달하기 좋습니다. 아토믹 디자인 패턴을 이해하기 전에 알아야 할 것이 있습니다. 바로 인터페이스입니다.
- 아토믹 디자인 패턴을 잘 모르는 사람은 거의 없습니다.

[Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)

- 브래드 프로스트가 창시한 이론입니다. 원자, 분자, 유기체, 템플릿, 페이지로 조합하는 개념입니다. 이런 컴포넌트를 공유 자원으로 활용하면 아토믹 디자인 패턴입니다.
- 디자인 시스템 개발 방법론입니다.
- 하지만 더 중요한 것은 인터페이스입니다. [자동차 인터페이스 디자인](https://www.yes24.com/Product/Goods/109590932)에 인터페이스를 정의합니다.
- 개발에서 단어를 보면 일상에서 어떻게 사용하고 소프트웨어 공학에서 어떻게 추상화되어 있는지 탐구하도록 합니다.
- 문서도 하나의 인터페이스입니다.
- 아토믹 디자인은 원자와 분자를 구성하는 방법을 만드는 방법입니다.
- 원자는 가장 작은 단위입니다.
- 블로그, 회사마다 기준이 모두 다릅니다.
- 서로 같은 레벨과 기준을 정의하기 어렵습니다.
- 브래드 프로스트는 대략적인 원칙을 정의한 것 뿐입니다.
- 템플릿과 페이지는 설명이 비슷합니다.
- 조합하고 구분하는 기준은 없습니다. 각자 회사 프로젝트에 따라 다릅니다.

- 인터페이스는 가위바위보랑 비슷합니다. 사회적 관습상 상호작용(인터랙션)하고 승패를 정합니다. 신호등도 인터페이스의 예시입니다.
- 아토믹 디자인에서 UI 디자인에 대한 정의와 개발할 때 정의는 어떻게할지 정해야 합니다.

- 아토믹 디자인은 정답이 아닙니다. 학습용으로 좋은 이론입니다.
- 디자인과 개발은 다릅니다. 리액트 스럽게 개발하고 회사 도메인 컨텍스트를 고려하면서 방법론을 적용할 수 있는가? 아닙니다. 아토믹디자인은 사람이 생각하는 관점을 제공해준 점까지 유용합니다.
- 리액트 스로운 사고 방식을 학습해야 합니다. 리액트 공식 문서 읽도록 합니다.

[Thinking in React - react.dev](https://react.dev/learn/thinking-in-react)

- 아토믹 디자인 방법론으로 리액트로 개발을 하게 되면 리액트 컴포넌트를 만들기 때문에 결국 이미 아토믹 디자인 패턴을 도입하게 되는 것입니다.
- 회사가 추구하는 비즈니스 가치와 도메인을 고려해야 합니다.
- TPO를 고려해야 합니다. 회사에서 당연히 기본적으로 고려하는 비즈니스 스킬입니다. 업무의 가치라는 것은 맥락에 따라 달라기집니다.
- 도메인 컨텍스트는 회사마다 다릅니다. 고객이 겪고 있는 문제를 기준으로 설정하고 해결하기 위해 이해해야 하는 컨텍스트입니다.

- 상향식 컴포넌트 개발과 하향식 컴포넌트 개발 2가지입니다. CDD는 컴포넌트 주도 개발입니다.
- 하향식 컴포넌트 개발은 페이지를 먼저 개발하고 리팩토링하면서 쪼개고 작게 만드는 것입니다.
- 상향식 컴포넌트 개발은 아토믹 디자인 패턴을 적용한 경우입니다.
- 각각 장단점이 있습니다.
- 가장 작은 컴포넌트를 만들면 사용자는 개발자입니다. 작은 컴포넌트를 만들면 일반 사용자와 개발자도 고려해야 합니다.
- 하향식은 전체적으로 만들고 나중에 분리하는 방식으로 진행합니다. 하지만 르블랑의 법칙 문제가 있습니다. 나중에 하겠다고 미루면 절대 안 합니다.
  - 한번 작성한 쓰레기 코드는 나중에 수정하는 일은 결코 없습니다.
- 상향식 컴포넌트는 잘못하면 YAGNI 문제 빠지기 쉽습니다.

- 제어 컴포넌트와 비제어 컴포넌트는 중요한 개념입니다.
- 개발을 공부할 때 강조하는 것들입니다. 영어와 한자로 번역하고 이해합니다. 용어가 일상에서 어떻게 사용되는지 이해합니다.
- 제어 & 비제어, pull & push로 이해하면 이해가 쉬워집니다.

### 제어 컴포넌트 비제어 컴포넌트

- 제어컴포넌트는 push이고 SOT(단일진실원천)입니다. input에 value와 onChange를 활용합니다. 상당히 기본적인 내용입니다.
- 리액트 상태에 있고 html input value에 있습니다. 제어 컴포넌트는 push입니다. 데이터를 넣습니다. 값이 들어갑니다. DOM, 리액트, VDOM 모두 동기화됩니다.
- 비제어 컴포넌트는 Pull입니다. ref가 필요합니다. 제어에 관여하지 않기 때문에 상태를 가져오기만 합니다.
- 제어할지 말지는 개발자가 정하는 것입니다.
- ref는 랜더링이 일어나지 않습니다.
- 제어 비제어의 장단점입니다. 제어되면 이벤트 핸들러를 상상 작성해야 합니다. 비제어는 필요 없습니다.
- 제어 비제어는 입력이라는 이벤트가 발생할 때마다 유효성 검증할 때 활용합니다.
- 제어 비제어 컴포넌트가 CDD에 중요한 이유는 컴포넌트를 만들고 구성할 때 코드레벨 설계에 영향을 많이 주기 때문에 그렇습니다. 이런 이유로 이 기초가 중요합니다.
- 유효성 검사는 제어컴포넌트가 수월합니다. 물론 순련도가 높으면 비제어 컴포넌트로 유효성 검사하는데 문제 없습니다.
- 제어 비제어는 push pull로 생각하면 됩니다.

### 테스트

- 스토리북 상호작용 테스트입니다. TDD를 추구합니다.
- 전통적인 테스트는 테스트 피라미드로 테스트 코드를 작성합니다. 단위, 서비스, UI로 3계층 테스트를 작성합니다. 이것은 전통적입니다.
- RTL 메인테이너는 테스트 피라미드 보다 프론트엔드에게 더 적합한 테스트 트로피를 권장합니다. 올바른 테스트 전략을 선택하는 것이 중요합니다.
- 테스트를 통해서 달성할 목표를 설정하고 그 전략에 맞는 도구들을 선택하는 것이 중요합니다.
- 결합테스트는 회사마다 조금 다릅니다.
- 정적 분석은 이미 많이 활용하고 있습니다.

- 회사에서 모든 비즈니 로직을 Redux에 넣으면 Redux만 테스트해도 비즈니스 로직이 안전하다는 것을 검증할 수 있습니다.
- 시간이 없어서 일부만 테스트하고 싶을 때 필요한 것은 테스트 전략입니다. 테스트를 어디까지 할지 정할지 잘 정해야 합니다.
- Stroybook + Chromatic 조합도 많습니다.

### 개발환경 설정

- 개발 환경을 설정하기 위한 노력은 현재 최신 버전에서는 그렇게 많지는 않습니다.
- CRA 시대의 패막 이후 vite으로 리액트를 만드는 것이 일반적입니다.

```sh
yarn create vite
```

- 알아서 리액트 플러그인 잘 선택하기 바랍니다.
- 스토리북도 점유율이 높아져서 설치와 설정이 쉬워졌습니다.

```sh
yarn add storybook
```

- 스타일링은 vanilla-extract를 활용합니다.

```sh
yarn add @vanilla-extract/css
```

- 스토리북은 deps를 만들 수 있습니다.
- 최근 스토리북이 7.0으로 버전으로 올랐습니다. 버전이 오르면 API 지원을 안해서 리팩토링이 필요한 경우가 있습니다. 이것을 보고 breaking changes가 있을 것입니다.
- 공식문서를 잘 확인하도록 합니다.
- CSF 문법이 많이 바뀌고 mdx2로 바뀝니다.
- RRD도 Remix가 인수하면서 바뀐 점이 많아졌습니다.
- MDX는 마크다운에 JSX가 결합된 문법입니다.

[dry-frontend / dry-design-system](https://github.com/dry-frontend/dry-design-system)

- 디자인 시스템 강의를 위해 활용한 강의자료입니다.

### Q&A

- 상향식 하향식은 팀의 숙련도가 높으면 하이브리드로 작성합니다. 떨어지면 하향식으로 작성합니다.
- 과제는 리액트 과제가 일반적입니다.
  - 과제 복붙이 많아서 회사에서 사용하는 기술을 적용하도록 하는 경우가 많습니다.
- 테스트와 스토리북 중 우선순위를 둬야 한다면 둘다 안 하는 것이 좋습니다.
  - 테스트는 CLI로 단위테스트를 구현하고 일부 E2E로 작성합니다.
- AI가 프론트엔드를 대체할 시기는 5 ~ 10년이라고 봅니다.
  - 생성 AI가 대체 가능성이 높습니다.
- 취준생은 리덕스를 억지로 학습할 필요는 없습니다. 그리고 배울 거면 RTK로 배우면됩니다.
  - 상태관리 라이브러리는 본인의 강점이 담긴 것 1개 정도 잘 알면 좋습니다.
- 스타일링 라이브러리는 CSS-in-JS 계열을 활용하고 있습니다.
- SI, 웹에이전시 다니면 일단 주경야독하고 면접보고 합격하면 바로 다니도록 합니다.
  - 붙으면 가고 떨어지면 지원 계속 반복합니다.
- 주니어 이직과제는 과제보고 면접을 채우면서 이직했습니다.
- 컴포넌트 계층화는 프로젝트 상황마다 다릅니다.
  - 원자단에 가까울수록 시멘틱, Primitive하게 만듭니다.
  - 페이지에 가까워질수록 도메인 컨텍스트가 개입합니다.
    - 라우터, 화면 레이아웃 중복도 발생합니다.
    - 비동기적인 요소도 개입합니다.
  - 하지만 개인적인 생각입니다.
- 대부분 신입 수준입니다.
  - 부트캠프, IT 연합동아리 경험이 있습니다.
  - 프로젝트 1 ~ 3개,
  - 프로그래머스 레벨 1 이상,
  - TS 기본, Next.js는 대부분 공부중
  - 리액트 쿼리를 활용하지만 캐시 무효화 못하는 경우가 대부분입니다. 그냥 편해서 사용하는 경우가 대부분입니다.
  - 경력 2년이면 Next.js 복잡한 기능들을 활용할 수 있고 캐시 무효화도 가능합니다.
- 모노레포 이해해야 회사에서 업무 투입이 쉬워집니다.
- 테스트 도입은 무조건 옳은 선택이라고 할 수 없습니다.
  - 이력서에는 회사 필요한 기술적 기여를 해야합니다.
  - 회사에 기여하기 위해 필요한 기술을 논하면 됩니다. 기술적인 난이도가 엄청나지 않아도 괜찮습니다.
- 최근에는 부트캠프 안나온 사람을 찾기 더 어렵습니다.
  - 부트캠프 2개 다닌 사람 많습니다. 3 ~ 5개 다닌 사람도 봤습니다.
  - 동시에 2개 다니는 사람도 봤습니다. 꽤 많습니다.
  - 3개 다닌 사람은 훌륭한 회사에서 탈락했습니다.
  - 네부캠 다니고도 취업 못한 사람 많습니다. 엘리트는 아닙니다. 네이버 자사는 100중 4명 채용했습니다.
  - 학원에 많은 것을 생각할 필요는 없습니다.

---

https://goshacmd.com/controlled-vs-uncontrolled-inputs-react/

https://wix.github.io/Detox/

https://github.com/ynawhocodes/self-perish-project

[^1]: [쿠키와 document.cookie - 모던자바스크립트 튜토리얼](https://ko.javascript.info/cookie#ref-355)
