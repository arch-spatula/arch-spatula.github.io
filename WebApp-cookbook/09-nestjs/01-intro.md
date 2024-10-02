---
sidebar_position: 1
---

# Nest.js

:::danger 경고

주니어 프론트엔드 엔지니어가 이런거 다루는 거 보면 신뢰할 수 없습니다.

<!--  TODO: 시니어가 되면 Spring 따라하는 NestJS라고 수정하기 -->
:::

https://namu.wiki/w/NestJS

나무위키도 신기하게 있습니다.

https://www.youtube.com/watch?v=GHTA143_b-s&t=82s

express의 단점은 아키텍쳐문제입니다. 어떻게 구조화해야 할지 의견이 없습니다. Nest.js는 의견을 갖고 어떻게 구현해야 하는지 아키텍쳐를 구성할지 압니다.

Nest.js는 백엔드 앵귤러라는 별명을 갖고 있습니다.

구조화, 모듈화, 타입스크립ㅌ, 마이크로서비스 등 다양한 장점이 있습니다.

express 다음으로 제일 인기가 많습니다.

아키텍쳐 구조가 다 결정되어 있기 때문에 기업입장에서 교육비용이 낮은 편입니다.

```sh
npm i -g @nestjs/cli
```

전역으로 설치할 라이브러리입니다.

```sh
nest new project-name
```

`app.module.ts`은 다른 모듈이 모일 파일입니다.

```ts title="app.module.ts"
import { Module } from '@nestjs/common';

@Module({
  imports: [],
})
export class AppModule {}
```

https://docs.nestjs.com/

Module은 controller와 provider를 받을 수 있습니다.

어플리케이션을 기능단위로 쪼갤 수 있습니다.

auth, todo, user 처럼 분리가 가능합니다. 모듈기준으로 앱을 정리합니다.

작은 하위 모듈을 분리할 수 있습니다.

컨벤션은 모듈을 만들 때마다 폴더를 만들어야 합니다. app.module.ts만 상위에서 예외로 둡니다.

```ts title="auth.module.ts"
import { Module } from '@nestjs/common';

@Module({
  imports: [],
})
export class Auth {}
```

```sh
yarn run start
```

위 명령은 시작입니다.

```sh
yarn start dev
```

개발서버 시작입니다.

```sh
nest g module user
```

모듈 자동생성입니다. `app.module.ts`에 자동추가된 것을 확인할 수 있을 것입니다.

```ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule],
})
export class AppModule {}
```

공식 문서에서 컨트롤러는 요청을 처리하고 응답하는 책임을 갖는다고 합니다.

Provider는 비즈니스로직을 처리하는 책임을 갖고 있다고 합니다.

```ts title="auth.controller.ts"
import { Controller } from '@nestjs/common';

@Controller()
export class AuthController {}
```

```ts title="auth.service.ts"
import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {}
```

```ts title="auth.module.ts"
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
```


