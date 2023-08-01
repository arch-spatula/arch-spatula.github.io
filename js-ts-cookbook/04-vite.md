---
sidebar_position: 4
description: 'vite과 관련된 이런저런 줍줍'
---

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
