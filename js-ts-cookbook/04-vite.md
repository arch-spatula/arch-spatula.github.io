---
sidebar_position: 4
description: 'vite과 관련된 이런저런 줍줍'
tags: ['vite']
---

# vite

vite은 프랑스어로 빠르다는 의미를 갖고 있습니다. 성능이 좋다는 느낌이라도 듭니다. 하지만 CRA랑 설치시간을 밴치마크하면 차이를 볼 수 있습니다.

조심해야 할 것은 번들러로 단순하게 생각하면 안됩니다. vite은 번들러 보다 더 넓은 의미로 빌드툴로 이해해야 합니다. 플러그인 상태계를 활용해서 다양한 편의성 지원을 받을 수 있습니다.

vite을 활용하면 개발하는 동안 타입스크립트를 그대로 활용합니다. 개발 중에 에러, 버그가 발생해서 원인을 파악해야 할 때 타입스크립트를 그대로 볼 수 있습니다. 원래 타입스크립트는 자바스크립트로 컴파일되어야 하지만 컴파일은 빌드 시점에 처리합니다.

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
