---
sidebar_position: 2
---

# install

리액트는 역시 자바스크립트 답게 설치 전략이 상당히 다양합니다.

## vite

vite으로 설치할 이유는 CRA를 더이상 권장하지 않기 때문입니다.

```sh
npm create vite@latest
```

마법사의 제안에 따라 읽고 설치하면 됩니다.

```sh
yarn create vite . --template react-swc-ts
```

하지만 저는 위 명령 스타일을 선호합니다. 참고로 `.`은 현재 디렉토리를 의미합니다. 그래서 현재 파일 디렉토리에서 생성 명령을 내린 것입니다.

## Create React App a.k.a. CRA

CRA의 장점은 Test, Web Vitals가 같이 설정되어 있다는 것입니다. vite 보다 분명히 더 무거울 것입니다. 하지만 테스트관련 설정을 덜 할 수 있습니다.

```sh
npx create-react-app .
```

위 명령으로 간단하게 만들 수 있습니다.

[Create React App is Finally Dead](https://www.youtube.com/watch?v=M4CLvtCS2YU)

```sh
yarn create react-app . --template typescript
```

## CDN

설치하기 조금 애매한 상황이고 빠르게 예시를 보여줘야 하는 상황에는 CDN이 적합할 것입니다.

```sh
touch index.html style.css app.js
```

```html title="index.html"
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    ></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="root"></div>
    <script src="app.js" type="text/babel"></script>
  </body>
</html>
```

위 html을 그대로 복붙하세요.

```js title="app.js"
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>{/* 원하는 컴포넌트 작성 */}</React.StrictMode>
);
```

이렇게 하면 작성할 수 있지만 자동완성의 지원을 못 받는 치명적인 단점이 생깁니다. 자동완성은 코드의 뽕맛도 중요하지만 올바르게 작성하고 있는지 타입 검증하는 측면에서 더 중요합니다.

<!-- https://velog.io/@eunbinn/how-to-start-a-react-project-in-2023 -->

## NextJS

이접근은 리액트를 프레임워크가 기반으로 활용하고 있는 리액트라는 관점입니다.

```sh
yarn create next-app
```

[NextJS 공식 문서](https://nextjs.org/docs/getting-started/installation)

## Remix

```sh
yarn add remix
```

## Nx

Nx는 모노레포 툴입니다.

```sh
nx g @nx/react:app .
```

## Gatsby

```sh
yarn add gatsby
```

개발 공부를 처음 시작할 때 개발자 블로그를 만들고 싶어서 gatsby를 설치했던 기억이 있습니다. 그때 버그가 많아서 다른 대안을 찾기 시작했습니다.

## Astro

```sh
yarn create astro
yarn astro add react
```

예전에 개발자 블로그 만들 때 astro를 활용했었습니다. 블리딩엣지를 쓰다가 블리딩했습니다.

<!-- https://velog.io/@eunbinn/how-to-start-a-react-project-in-2023#%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%99%80-astro%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%96%88%EC%9D%84-%EB%95%8C-%EB%8B%A8%EC%A0%90 -->

<!-- https://www.youtube.com/watch?v=2OTq15A5s0Y -->

<!-- 01:00 - StackBlitz, CodeSandBox

01:33 - Vite
02:40 - Nx
03:57 - NextJS
04:32 - Remix
05:06 - Gatsby
05:48 - Astro 

-->

---

## 부록

리액트를 설치하기 위해 따로 필요한 것들이 있습니다. node, 패키지 매니저가 필요합니다. 이것은 선택과 무관하게 필요합니다. 또 있으면 리액트 코드를 작성하기 쉬워지는 것들도 있습니다.

### node

[node.js 공식 홈페이지](https://nodejs.org/ko)

공식 홈페이지에서 LTS버전을 설치하면 됩니다.

시키는대로 설치하고 다음 명령으로 확인해봅니다.

```sh
node --version
```

```sh
npm --version
```

node를 설치하면 자동적으로 npm 패키지 매니저도 설치됩니다.

참고로 맥사용자는 homebrew로 설치할 수 있습니다.

```sh
brew install node
```

<!--

TODO: homebrew 설치법

-->

### nvm

node의 버전은 상당히 다양합니다. 그리고 버전별로 동작이 달라질 수 있습니다.

### yarn

```sh
npm install -g yarn
```

```sh
yarn -v
```

yarn은 페이스북이 만든 패키지 매니저입니다. pnpm도 있습니다. 취향것 사용하면 됩니다.

<!--

TODO: 프리티어 설치 & 설정

-->

<!--

TODO: DIY 개별 설치법

[7 better ways to create a React app](https://www.youtube.com/watch?v=2OTq15A5s0Y)

-->
