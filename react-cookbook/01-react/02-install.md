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

CRA의 장점은 Test, Web Vitals가 같이 설정되어 있습니다. vite 보다 분명히 더 무거울 것입니다. 하지만 테스트관련 설정을 덜 할 수 있는 점이 장점입니다.

```sh
npx create-react-app .
```

위 명령으로 간단하게 만들 수 있습니다.

[Create React App is Finally Dead](https://www.youtube.com/watch?v=M4CLvtCS2YU)

```sh
yarn create react-app . --template typescript
```

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

TODO: CDN 설치법 추가하기
---

## CDN

CDN을 활용해서 리액트를 활용하는 것도 가능합니다. 하지만 치명적인 단점은 자동완성을 지원하지 않습니다.

TODO: Next.js 설치법
TODO: Remix.js 설치법
TODO: Nx.js 설치법
TODO: Astro.js 설치법
TODO: Gatsby.js 설치법
TODO: DIY 개별 설치법

[7 better ways to create a React app](https://www.youtube.com/watch?v=2OTq15A5s0Y)

-->
