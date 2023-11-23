---
sidebar_position: 1
description: '패키지 관리 시작하기'
---

# 패키지 관리

자바스크립트, 타입스크립트는 패키지 관리 생태계에 의존해야 합니다.

## 참고

패키지 관리와 런타임을 함께 제공하는 경우도 존재합니다. deno, bun이 이에 해당합니다. 아주 나중에 검증된 시점에 다루겠습니다.

:::info

Deno는 2023년 기준으로 시기상조입니다. 프로덕션 래디하다는 컨프런스 강연을 볼 수 있지만 과연 검증된 기업의 검증된 레포인가 의문을 가져야 합니다.

현재 Deno의 문제는 하위 호환성을 전혀 고려하지 않고 node.js와 별개의 생태계를 추구하고 있습니다. 물론 npm 설치지원으로 확장 지원을 늘리고 있지만 hype에 불과합니다.

:::

## pnpm으로 모노레포 구축하기

이 글은 [pnpm으로 모노레포 환경 구축하기](https://bepyan.github.io/blog/dev-setting/pnpm-monorepo)을 참고했습니다. 좀 더 자세한 설명을 추가하고자 합니다.

총 4개의 레포를 구성할 것입니다.

- frontend: nuxt.js
- backend: nest.js
- admin: vue.js
- shared: lodash.js

생각해야 하는 구조는 root에 `package.json`과 각각의 leaf에 독자적인 레포의 패키지를 갖습니다.

```
├── node_modules/
│   └── 여기는 미스테리로 두겠습니다.
├── packages/
│   ├── admin/
│   ├── backend/
│   ├── frontend/
│   └── shared/
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

위와 같은 구조로 프로젝트를 생성할 것입니다.

제일먼저 할 것은 pnpm을 설치하는 것입니다.

```sh
npm install -g pnpm
```

[npm 예시](https://pnpm.io/ko/installation#npm-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)

```sh
brew install pnpm
```

[brew 예시](https://pnpm.io/ko/installation#homebrew-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)

```sh
mkdir pnpm-monorepo
cd pnpm-monorepo
```

위처럼 폴더 이름을 생성해줍시다.

```sh
pnpm init
```

이렇게 프로젝트를 초기화하면 시작입니다.

```yaml title="pnpm-workspace.yaml"
packages:
  - 'packages/*'
```

그리고 다음 작업들을 처리하면 됩니다.

```sh
mkdir packages
mkdir packages/shared
mkdir packages/frontend
mkdir packages/backend
mkdir packages/admin
```

```sh
cd packages/admin
```

```sh
pnpm create vite
```

admin을 위해 vue를 설치합니다. [vite 공식 문서](https://ko.vitejs.dev/guide/)를 보고 취향것 설치하기 바랍니다.

```json title="package.json"
{
  // highlight-next-line
  "name": "@pnpm-monorepo/admin",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "preview": "vite preview",
    "build-only": "vite build",
    "type-check": "vue-tsc --noEmit -p tsconfig.app.json --composite false",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "format": "prettier --write src/"
  },
  "dependencies": {
    "@pnpm-monorepo/shared": "workspace:^",
    "pinia": "^2.1.7",
    "vue": "^3.3.4",
    "vue-router": "^4.2.5"
  },
  "devDependencies": {
    "@rushstack/eslint-patch": "^1.3.3",
    "@tsconfig/node18": "^18.2.2",
    "@types/node": "^18.18.5",
    "@vitejs/plugin-vue": "^4.4.0",
    "@vue/eslint-config-prettier": "^8.0.0",
    "@vue/eslint-config-typescript": "^12.0.0",
    "@vue/tsconfig": "^0.4.0",
    "eslint": "^8.49.0",
    "eslint-plugin-vue": "^9.17.0",
    "npm-run-all2": "^6.1.1",
    "prettier": "^3.0.3",
    "typescript": "~5.2.0",
    "vite": "^4.4.11",
    "vue-tsc": "^1.8.19"
  }
}
```

```sh
cd ../..
cd packages/backend
```

```sh
nest new .
```

[nest 공식 문서](https://docs.nestjs.com/)보고 여기도 알아서 취향것 설치하기 바랍니다. pnpm으로 설정하는 것만 잊지 말도록 합니다.

```json title="package.json"
{
  // highlight-next-line
  "name": "@pnpm-monorepo/backend",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@pnpm-monorepo/shared": "workspace:^",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^5.59.11",
    "@typescript-eslint/parser": "^5.59.11",
    "eslint": "^8.42.0",
    "eslint-config-prettier": "^8.8.0",
    "eslint-plugin-prettier": "^4.2.1",
    "jest": "^29.5.0",
    "prettier": "^2.8.8",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  },
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}
```

```sh
cd ../..
cd packages/frontend
```

```sh
npx nuxi@latest init .
```

[nuxt 공식 문서](https://nuxt.com/docs/getting-started/installation)보고 설치하도록 합니다. 여기도 pnpm으로 설정하면 됩니다.

```json title="package.json"
{
  // highlight-next-line
  "name": "@pnpm-monorepo/frontend",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
  "devDependencies": {
    "@nuxt/devtools": "latest",
    "nuxt": "^3.8.2",
    "vue": "^3.3.8",
    "vue-router": "^4.2.5"
  },
  "dependencies": {
    "@pnpm-monorepo/shared": "workspace:^"
  }
}
```

```sh
cd ../..
mkdir packages/shared
```

```sh
pnpm init .
```

```sh
pnpm i lodash
```

저는 util함수를 만들기 위해 [lodash](https://lodash.com/)를 설치하기로 했습니다.

이제 shared까지 설치했습니다.

```json title="package/shared/package.json"
{
  "name": "@pnpm-monorepo/shared",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {},
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@pnpm-monorepo/shared": "workspace:^",
    "lodash": "^4.17.21"
  }
}
```

`package.json` 이름을 설정해주는 것이 중요합니다.

그리고 root에 모든 레포가 공용으로 사용할 패키지도 설치하겠습니다.

```sh
cd ../..
```

```sh
pnpm add -w -D zod
pnpm add -w -D eslint
```

```json
{
  "name": "pnpm-monorepo",
  "version": "1.0.0",
  "description": "",
  "scripts": {},
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "eslint": "^8.54.0",
    "zod": "^3.22.4"
  }
}
```

여기까지는 패키지 설치입니다. 모노레포의 장점인 패키지 공유는 아직 아닙니다.

```json
{
  "name": "pnpm-monorepo",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "shared": "pnpm -F @pnpm-monorepo/shared",
    "frontend": "pnpm -F @pnpm-monorepo/frontend",
    "backend": "pnpm -F @pnpm-monorepo/backend",
    "admin": "pnpm -F @pnpm-monorepo/admin"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "eslint": "^8.54.0",
    "zod": "^3.22.4"
  }
}
```

root에 해당하는 `package.json`을 위처럼 설정하면

```ts
import { ZodNumber, type ZodArray } from 'zod';

type type = {
  foo: ZodArray<ZodNumber>;
};
```

### 공통 컴포넌트 및 함수 공유

[Building a Monorepo with pnpm Workspace](https://dev.to/soom/building-a-monorepo-with-pnpm-workspace-1544)를 참고했습니다.

프론트엔드 제품이 여러개면 디자인 시스템을 만들고 공유하게 만드는 경우도 존재할 것입니다.

위 예시랑 이어집니다.

```sh
pnpm frontend add @pnpm-monorepo/shared
pnpm backend add @pnpm-monorepo/shared
pnpm admin add @pnpm-monorepo/shared
```

먼저 패키지를 주입합니다.

```sh
pnpm install
```

그리고 설치를 시도합니다.

주입을 받으면 주입받은 패키지마다 `package.json`을 확인해보면 `dependencies`에 `"@pnpm-monorepo/shared": "workspace:^",`이 추가된 것을 확인할 수 있을 것입니다.

```json title="package/admin/package.json"
{
  "name": "@pnpm-monorepo/admin",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "preview": "vite preview",
    "build-only": "vite build",
    "type-check": "vue-tsc --noEmit -p tsconfig.app.json --composite false",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "format": "prettier --write src/"
  },
  "dependencies": {
    // highlight-next-line
    "@pnpm-monorepo/shared": "workspace:^",
    "pinia": "^2.1.7",
    "vue": "^3.3.4",
    "vue-router": "^4.2.5"
  },
  "devDependencies": {
    "@rushstack/eslint-patch": "^1.3.3",
    "@tsconfig/node18": "^18.2.2",
    "@types/node": "^18.18.5",
    "@vitejs/plugin-vue": "^4.4.0",
    "@vue/eslint-config-prettier": "^8.0.0",
    "@vue/eslint-config-typescript": "^12.0.0",
    "@vue/tsconfig": "^0.4.0",
    "eslint": "^8.49.0",
    "eslint-plugin-vue": "^9.17.0",
    "npm-run-all2": "^6.1.1",
    "prettier": "^3.0.3",
    "typescript": "~5.2.0",
    "vite": "^4.4.11",
    "vue-tsc": "^1.8.19"
  }
}
```

표시된 부분이 추가된 것이 중요합니다.

주의할 점들이 있습니다. 주고 받는 `package.json`에 작성되어 있는 패키지 이름이 맞는지 아는 것이 중요합니다.

또 주입하려는 패키지 이름도 주의하기 바랍니다.

```json
{
  "name": "pnpm-monorepo",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    // highlight-start
    "shared": "pnpm -F @pnpm-monorepo/shared",
    "frontend": "pnpm -F @pnpm-monorepo/frontend",
    "backend": "pnpm -F @pnpm-monorepo/backend",
    "admin": "pnpm -F @pnpm-monorepo/admin"
    // highlight-end
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "eslint": "^8.54.0",
    "zod": "^3.22.4"
  }
}
```

workspace에 설정했을 때 `package.json`의 이름하고 잘 대응되는지 확인하기 바랍니다.

또 shared에 공유용 함수와 상수를 만들 었는데 패키지는 공유했지만 import가 안되는 경우도 볼 것입니다.

```json title="package/shared/package.json"
{
  "name": "@pnpm-monorepo/shared",
  "version": "1.0.0",
  "description": "",
  // highlight-next-line
  "main": "main.ts",
  "scripts": {
    "build": "tsc"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@pnpm-monorepo/shared": "workspace:^",
    "lodash": "^4.17.21"
  }
}
```

`main`에 값에 해당하는 파일을 잘 확인하기 바랍니다. export로 모두 만나게 할 경로를 설정할 수 없으면 shared를 공유받아도 import할 수 없습니다.

```
├── node_modules/
│   └── 여기는 미스테리로 두겠습니다.
├── packages/
│   ├── admin/
│   ├── backend/
│   ├── frontend/
│   └── shared/
│       ├── node_modules
// highlight-next-line
│       ├── main.ts
│       └── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

위처럼 일치를 확인하기 바랍니다. 저는 한참 혜맸습니다.
