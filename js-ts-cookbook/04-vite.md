---
sidebar_position: 4
description: 'vite과 관련된 이런저런 줍줍'
tags: ['vite']
---

# vite

<!-- [10분 테코톡] 도밥의 모듈 번들러와 빌드 도구 https://www.youtube.com/watch?v=xLziDinqBj0 -->

<!-- Module Bundlers Explained... Webpack, Rollup, Parcel, and Snowpack https://www.youtube.com/watch?v=5IG4UmULyoA -->

<!-- Vite in 100 Seconds https://www.youtube.com/watch?v=KCrXgy8qtjM -->

vite은 프랑스어로 빠르다는 의미를 갖고 있습니다. 성능이 좋다는 느낌이라도 듭니다. 하지만 CRA랑 설치시간을 밴치마크하면 차이를 볼 수 있습니다.

vite은 자바스크립트 빌드툴입니다. 일반적인 번들러와 다르게 번들링의 확장이라고 볼 수 있습니다. 내부적으로 번들러는 rollup을 사용하고 그 위에 다양한 확장기능을 제공하고 있습니다. 확장기능이라고 하면 code splitting 설정을 쉽게 해주거가 기본적으로 빌드에 필요한 최적화를 추상화 해줍니다. 일반 번들러를 활용하면 라이브러리 호환 문제, 중복 라이브러리 의존성 문제, 트리쉐이킹 등 같이 수동으로 설정해줘야 하는 부분이 많습니다.

## 번들러 vs 빌드 툴?

조심해야 할 것은 번들러로 단순하게 생각하면 안됩니다. vite은 번들러 보다 더 넓은 의미로 빌드툴로 이해해야 합니다.

먼저 번들러라는 것은 자바스크립트를 몇개의 파일로 묶어내는 도구입니다. 프로그래머가 파일 혹은 모듈단위로 프로그램을 많이 작성하는데 순수 자바스크립트 만으로 서로 연결하는데는 한계가 많습니다. 먼저 프로그래밍 관점입니다. 여러 모듈 사이 같은 변수명을 사용하면 충돌이 발생할 수 있습니다. 사용자 관점입니다. 라이브러의 일부만 사용하는데 라이브러리 전체가 사용자에게 전달되는 문제도 있습니다. 처음 사이트를 접근할 때 라이브러리 전체를 다운 받는 비효율도 있습니다. 또 라우팅을 안할지도 모르는데 다른 페이지까지 모두 전달합니다.

번들러가 해주는 역할 중 하나는 사용하지 않는 라이브러리를 제거해줍니다. 코드 주석과 공백제거를 하는 소스코드 최소화도 대신 처리해서 용량을 압축합니다. 모듈과 모듈간 관계를 쉽게 정리하고 변수명 충돌도 방지해줍니다. 리소스를 접근하고자 할 때 코드를 쪼개고 필요한 시점에 맞게 제공할 수 있게 해줍니다.

빌드 툴은 이것보다 더 기능이 확장되어 있다고 볼 수 있습니다. 소스코드 컴파일, 의존성 관리, 번들링, 환경 설정 등 out of the box로 대신해주는 기능이 추상화되어 있습니다.

프레임워크와 라이브러리 관점을 활용하면 번들러는 라이브러리와 유사하게 직접 설정해줘야 하는 부분이 많고 빌드 툴은 프레임워크처럼 대신 많은 부분을 처리해줍니다.

일반적인 소프트웨어 엔지니어링 관점에서 차이는 있지만 프론트엔드 엔지니어링 분야에서는 차이가 모호합니다.

참고. vite을 활용하면 개발하는 동안 타입스크립트를 그대로 활용합니다. 개발 중에 에러, 버그가 발생해서 원인을 파악해야 할 때 타입스크립트를 그대로 볼 수 있습니다. 원래 타입스크립트는 자바스크립트로 컴파일되어야 하지만 컴파일은 빌드 시점에 처리합니다.

## vite port 설정 방법

```env title=".env"
VITE_PORT=1234
```

```ts title="vite.config.ts"
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_PORT } = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: { port: parseInt(VITE_PORT) },
  };
});
```

[설정에서 환경 변수 사용하기 - vite](https://ko.vitejs.dev/config/#using-environment-variables-in-config)

defineConfig에는 객체 혹은 함수를 대입할 수 있습니다. 함수를 대입하면 접근할 수 있는 매개변수로 개발환경설정을 접근할 수 있습니다.

## vite alias 설정

```ts title="vite.config.ts"
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
```

다른 폴더에서 `import`하면 앞에 `@`이 이쁘게 붙습니다.

<!--

@todo: 번들사이즈가 페이별로 고르지 않습니다. code splitting

rollup-plugin-visualizer: 추가하기

-->

## rollup-plugin-visualizer

vite 라이브러리가 아닙니다. 딱잘라 단순합니다.

하지만 굳이 다루는 이유는 vite이 rollup 번들러 기만으로 만들어졌습니다.

[rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)

```sh
yarn add --dev rollup-plugin-visualizer
```

위 명령으로 설치하면 됩니다.

```ts
import { defineConfig, type PluginOption } from 'vite';
export default defineConfig({
  plugins: [visualizer() as PluginOption],
});
```

일반적으로 위처럼 설정하면 됩니다.

```ts title="vite.config.ts"
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), visualizer() as PluginOption],
    // ...
  };
});
```

설정이 많으면 반환 값 속성에 이렇게 설정해주면 됩니다.

`visualizer() as PluginOption`로 배열에 추가하면 됩니다.

특별한 설정을 안 하면 `yarn build` 명령에 `state.html`을 생성할 것입니다. 알아서 브라우저로 열기 바랍니다.

라이브러리와 각 모듈의 대략적인 점유율을 확인할 수 있습니다.

![모듈 번들 계층형 트리맵](https://user-images.githubusercontent.com/84452145/266338159-1bca76e9-3e03-44cb-9603-b43705351e70.png)

참고로 위 도표를 보고 (계층형)트리맵이라고 합니다. 데이터 시각화할 때 비중을 확인할 때 사용합니다.

```txt title=".gitignore"
# 아래 stats.html를 추가해주세요
stats.html
```

마지막으로 `.gitignore`에 추가해주세요. 모두의 빌드가 모두에게 각자 다를 것입니다. 개발하는 중간에 누가 새로운 라이브러리를 추가할 것입니다.
