---
sidebar_position: 1
---

# Nest.js

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

---

```ts
import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup() {
    return 'sign up';
  }

  @Post('signin')
  signin() {
    return 'sign in';
  }
}
```

```
http://localhost:3000/auth/signup
```

post 요청을 하면 sign up 응답을 확인할 수 있습니다.

지금은 문자열인데 응답을 객체같은 참조형으로 응답해도 알아서 json으로 변환합니다.

```ts
import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup() {
    return { mas: 'good' };
  }

  @Post('signin')
  signin() {
    return 'sign in';
  }
}
```

요청응답처리는 controller가 처리합니다. 비즈니스 로직은 service에서 처리합니다.

```ts title="auth.service.ts"
import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  login() {
    return { msg: 'good' };
  }

  signup() {
    return { msg: 'fuiyoh' };
  }
}
```

```ts title="auth.controller.ts"
import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup() {
    return this.authService.signup();
  }

  @Post('signin')
  signin() {
    return this.authService.login();
  }
}
```

이렇게 하면 요청을 처리하는 객체와 비즈니스 로직을 처리하는 관심사가 분리됩니다.

요청과 비즈니스로직을 분리해서 비즈니스로직에 더 집중하는 전략입니다.

```yml
version: '3.8'
services:
  dev-db:
    image: postgres:13
    ports:
      - 5434:5432
    environment:
      - POSTGRES_USER:postgres
      - POSTGRES_PASSWORD:123
      - POSTGRES_DB:nest
    networks:
      - freecodecamp
networks:
  freecodecamp:
```

위 명령을 활용하니까 동작하지 않습니다.

```yml
version: '3.8'
services:
  dev-db:
    image: postgres:13
    ports:
      - 5434:5432
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=123
      - POSTGRES_DB=nest
    networks:
      - freecodecamp
networks:
  freecodecamp:
```

위 명령 파일로 명령하니까 동작했습니다.

참고로 동작하게 명령은 아래와 같습니다.

```sh
docker compose up dev-db -d
```

```sh
docker ps
```

위 명령을 동작하는 프로세스를 볼 수 있습니다.

어떤 `CONTAINER ID`를 명령에 활용하면 접근할 수 있습니다.

```sh
docker logs (CONTAINER_ID)
```

이렇게 명령하면 해당 컨테이너의 터미널 로그를 볼 수 있습니다.

프리즈마는 쿼리빌더입니다.

프리즈마 cli가 필요합니다. 프리즈마 client 2개를 설치해야 활용할 수 있습니다.

```sh
yarn add -D prisma # CLI
```

```sh
yarn add @prisma/client # Client
```

```sh
npx prisma init
```

프리즈마 파일을 만들어줍니다.

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User{
  id Int @id @default(autoincrement())
  createAt DateTime @default(now())
  updateAt DateTime @updatedAt
  email String
  hash String
  salt String
  firstName String?
  lastName String?
}

model Bookmark{
  id Int @id @default(autoincrement())
  createAt DateTime @default(now())
  updateAt DateTime @updatedAt
  title String
  description String?
  link String
}
```

아까만든 docker 파일을 보면 환경변수에 다음과 같이 설정하면 됩니다.

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public" # 프리즈마로 받은 정보
```

```
DATABASE_URL="postgresql://postgres:123@localhost:5434/nest?schema=public" # 설정할 환경변수
```

---

```sh
npx prisma migrate dev
```

이름을 정해주기는 해야합니다. 프로덕션 마이그레이션은 따로 있습니다.

```sh
npx prisma generate
```

프리즈마에 정의한 DB의 타입을 타입스크립트에 활용할 수 있습니다.

```sh
npx prisma studio
```

브라우저에 DB을 볼 수 있습니다.

프리즈마와 postgres SQL을 설정하고 나면 이제 DB에 연결하는 작업이 남았습니다. Nest.js에 모듈에 위임해서 처리하는 것 좋습니다.

```sh
nest g module prisma
```

```sh
nest g service prisma --no-spec
```

참고로 spec은 요구사항 즉 테스트코드를 작성하는 파일도 자동 생성해줍니다. 하지만 플레그 설정하면 자동생성은 안 합니다.

---

```ts title=/prisma.service.ts"
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { env } from 'process';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({ datasources: { db: { url: env.DATABASE_URL } } });
  }
}
```

확인을 위해 npx prisma studio으로 브라우저를 확인하고 서버를 가동합니다.

### local import

서비스 로직을 처리하는 것을 각각 독립적으로 주입받게 만들 수 있습니다.

```ts title="prisma.module.ts"
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 접근 가능하게 처리
})
export class PrismaModule {}
```

```ts title="auth.module.ts"
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
```

```ts title="auth.service.ts"
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  login() {
    return { msg: 'good' };
  }

  signup() {
    return { msg: 'fuiyoh' };
  }
}
```

이렇게 하면 접근가능해집니다.

의존성을 주입할 때 주입의 주체에서도 주입할지 말지 export 설정을 해야 합니다. 그리고 서비스끼리 공유하기 위해서는 module에서 먼저 받아야 service에서 접근할 수 있습니다.

하지만 하위 구체적인 의존성이면 적합하지만 다양한 module에 공유가 필요하다면 비효율적입니다.

### global import

```ts title="prisma.module.ts"
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

이렇게 설정하면 전역으로 공유할 수 있습니다.

```ts title="app.module.ts"
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule, PrismaModule],
})
export class AppModule {}
```

루트 모듈에도 공유하는 것을 잊지말도록 합니다.

nest.js는 설정작업을 많이 간소하게 해줍니다. 익숙해지기만 하면 일관된 구조를 확보할 수 있습니다.

여기서부터 비즈니스 로직을 처리하면 됩니다.

### 회원가입 로직 처리하기

```ts title="auth.controller.ts"
import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Req() req: Request) {
    console.log(req);
    return this.authService.signup();
  }

  @Post('signin')
  signin() {
    return this.authService.login();
  }
}
```

express를 이렇게 접근할 수 있습니다.

이렇게 요청의 정보를 받을 수 있습니다. 여기서 nest.js는 여러가지 검증 도구들이 있습니다.

Nest.js는 DTO를 지원합니다.

참고로 Nest.js에서 express이렇게 직접 접근하고 활용하는 것은 권장하지 않는 패턴입니다.

```ts title="auth.module.ts"
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: any) {
    console.log({ dto });
    return this.authService.signup();
  }

  @Post('signin')
  signin() {
    return this.authService.login();
  }
}
```

이렇게 @Body를 활용하는 것을 권장합니다.

폴더의 계층 구조는 dto를 각각의 module과 대응해서 정리하도록 합니다.

```ts title="auth/dto/auth.dto.ts"
export interface AuthDto {
  email: string;
  password: string;
}
```

```ts title="auth/dto/index.ts"
export * from './auth.dto';
```

```ts title="auth.controller.ts"
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log({ email: dto.email, password: dto.password });
    return this.authService.signup();
  }

  @Post('signin')
  signin() {
    return this.authService.login();
  }
}
```

이렇게 타입지정이 가능합니다.

```json
{
  "email": "email@email.com",
  "password": "qwer1234"
}
```

해당하는 body의 유효성을 검증해야 합니다. 만약에 body에 저런 방법으로 안 넘겨줬다면 어떻게 되었을 것인가?

아마 서버는 이상하게 처리할 것입니다. 로직을 직접 작성할 수 있지만 꽤 많은 사람들이 자주 겪은 문제입니다.

이때 사용할 수 있는 것은 pipe입니다. pipe은 nest.js에서 데이터를 변환하는 함수입니다.

```ts
import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(
    @Body('email') email: string,
    @Body('password', ParseIntPipe) password: string
  ) {
    console.log({ email: email, password: password });
    return this.authService.signup();
  }

  @Post('signin')
  signin() {
    return this.authService.login();
  }
}
```

```json
{
  "email": "email@email.com",
  "password": "qwer1234"
}
```

이렇게 하면 실패하고

```json
{
  "email": "email@email.com",
  "password": "1234"
}
```

이렇게 하면 성공합니다. 숫자로 변형도 자동으로 해줍니다.

하지만 이렇게 작성하면 verbose합니다.

pipe는 내부적으로 이렇게 동작한다는 것을 배웠습니다.

이제는 DTO 차원에서 알아서 유효성 검사하도록 할 것입니다.

```sh
yarn add class-validator class-transformer
```

먼저 위 라이브러리를 설치해야 합니다.

```ts title="auth/dto/auth.dto.ts"
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
```

대소문자 구분을 조심하기 바랍니다. 소문자 대문자 모두 있습니다.

```ts title="main.ts"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

`app.useGlobalPipes(new ValidationPipe());`까지 설정하는 것일 잊지말도록 합니다.

이렇게 설정하면 DTO에서 유효성을 대신 검증해줍니다.

여기서 약간의 보안에서도 좋은 설정도이 있습니다.

```ts title="main.ts"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
```

```json
{
  "email": "email@email.com",
  "password": "1234",
  "stop": "drop and roll"
}
```

이렇게 데이터를 보내도 stop key에 해당하는 정보는 알아서 차단합니다.

### 비밀번호 해쉬하기

```sh
yarn add argon2
```

위 라이브러리를 활용해서 비밀번호를 hashing하면 됩니다.

https://github.com/ranisalt/node-argon2#readme

```ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    const salt = hash;
    const user = await this.prisma.user.create({
      data: { email: dto.email, hash, salt },
    });
    delete user.hash;
    delete user.salt;
    return user;
  }

  login() {
    return { msg: 'good' };
  }
}
```

모르던 지식이었지만 argon을 활용하면 사용자 비밀번호를 저장할 때 salt도 같이 저장할 필요는 없었습니다.

### 마이그레이션하기

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}


model User{
  id Int @id @default(autoincrement())
  createAt DateTime @default(now())
  updateAt DateTime @updatedAt
  email String @unique
  hash String
  firstName String?
  lastName String?

  bookmarks Bookmark[]

  @@map("users")
}

model Bookmark{
  id Int @id @default(autoincrement())
  createAt DateTime @default(now())
  updateAt DateTime @updatedAt
  title String
  description String?
  link String

  userId Int
  user User @relation(fields: [userId], references: [id])

  @@map("bookmarks")
}
```

이렇게 되면 유저가 들고 있는 bookmark를 표현할 수 있습니다. bookmarks인 이유는 유저는 여러개의 bookmark를 들지만 bookmark는 하나의 유저에게 쥐어지기 때문입니다. 유저라는 1과 북마크라는 여러(다) 대응이 되는 구조입니다.

이 기회에 필요없는 salt도 삭제합시다.

또 email에 @unique로 지정해서 중복 생성문제도 차단해줍니다.

```sh
npx prisma migrate dev
```

하지만 중복생성을 하면 클라이언트에게 500에러를 반환합니다. 이상한 회사와 이상한 백엔드는 많지만 우리는 이것보다 더 문명인다운 방법을 활용할 것입니다.

```ts
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: { email: dto.email, hash },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('email is taken');
        }
      }
      throw error;
    }
  }

  login() {
    return { msg: 'good' };
  }
}
```

서버랑 통신하는데 예외처리를 안 할 수 없습니다. 하지만 특이하게 Nest.js는 에러가 발생하면 잡고 throw합니다. 추상화 해준다는 점이 좋은 것 같습니다.

참고로 `P2002`은 Prisma 문서 내용입니다.

### 로그인 처리하기

```ts
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: { email: dto.email, hash },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('email is taken');
        }
      }
      throw error;
    }
  }

  async login(dto: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (!user) throw new ForbiddenException('no email');
      const pwMatch = await argon.verify(user.hash, dto.password);

      if (!pwMatch) throw new ForbiddenException('password not match');

      delete user.hash;
      return user;
    } catch (error) {
      throw error;
    }
  }
}
```

몇번의 검증가드만 해주면 됩니다.

### DB & 프리즈마 마이그레이션 자동화

https://youtu.be/GHTA143_b-s?t=4645

데이터 마이그레이션 입력을 위해 일일이 입력하는 것은 번거롭습니다. 이것을 자동화하는 script 명령을 자동화해봅니다.

잠시 docker를 제거할 것입니다.

```sh
docker compose rm --help
```

```
  -f, --force     Don't ask to confirm removal
  -s, --stop      Stop the containers, if required, before removing
  -v, --volumes   Remove any anonymous volumes attached to containers
```

docker를 제어하는 스크립트 명령입니다. 현재 docker 설정을 다시한번더 확인하겠습니다.

```yml
version: '3.8'
services:
  dev-db:
    image: postgres:13
    ports:
      - 5434:5432
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=123
      - POSTGRES_DB=nest
    networks:
      - freecodecamp
networks:
  freecodecamp:
```

```json title="package.json"
{
  "name": "nest-test",
  "version": "0.0.1",
  "scripts": {
    "db:dev:rm": "docker compose rm dev-db -s -f -v",
    "db:dev:up": "docker compose up dev-db -b",
    "db:dev:restart": "yarn db:dev:rm && yarn db:dev:up"
  }
}
```

```sh
yarn db:dev:restart
```

위 명령을 하면 docker을 재가동하는 명령입니다.

```
yarn run v1.22.19
$ yarn db:dev:rm && yarn db:dev:up
$ docker compose rm dev-db -s -f -v
[+] Stopping 1/1
 ✔ Container nest-test-dev-db-1  Stopped                                                   0.2s
Going to remove nest-test-dev-db-1
[+] Removing 1/0
 ✔ Container nest-test-dev-db-1  Removed                                                   0.0s
$ docker compose up dev-db -d
[+] Running 1/1
 ✔ Container nest-test-dev-db-1  Started                                                   0.2s
✨  Done in 1.05s.
```

이런 피드백을 받은 것을 볼 수 있을 것입니다. `docker ps`명령으로 가동을 확인하도록 합니다.

이제 마이그레션을 적용하면 됩니다.

prisma 마이그레이션 명령도 같이 사용해서 자동화를 할 것입니다.

```json title="package.json"
{
  "name": "nest-test",
  "version": "0.0.1",
  "scripts": {
    "prisma:dev:deploy": "prisma migrate deploy",
    "db:dev:rm": "docker compose rm dev-db -s -f -v",
    "db:dev:up": "docker compose up dev-db -b",
    "db:dev:restart": "yarn db:dev:rm && yarn db:dev:up && sleep 1 && yarn prisma:dev:deploy"
  }
}
```

```sh
yarn db:dev:restart
```

명령하면 마이그레이션까지 모두 처리해줄 것입니다.

참고로 예전에 중간에 마이그레이션 실수로 추가한거 삭제 하니까 무시하지 않고 에러를 보여줍니다. 마이그레이션 삭제할 때는 주의하도록 합니다.

여기까지 마이그레이션 자동화입니다.

### config module

config module부터 구현할 것입니다.

```ts title="prisma.service.ts"
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { env } from 'process';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({ datasources: { db: { url: env.DATABASE_URL } } });
  }
}
```

위에서 처리한 것보다 조금더 우아하게 처리하는 방법을 볼 것입니다.

```sh
yarn add @nestjs/config
```

위 패키지를 설치하면 끝입니다.

env 유효성 검증을 위해 config module을 따로 폴더를 만드는 경우가 일반적이지만 가벼운 프로젝트에는 root module에 만들어도 문제가 없습니다.

```ts title="app.module.ts"
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({}), // 여기
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
  ],
})
export class AppModule {}
```

비슷한 module을 다시 작성하지 말고 프레임워크가 이미 직성해둔 것을 그냥 사용하면 됩니다.

ConfigModule은 내부적으로 dotenv를 내부적으로 활용합니다.

```ts title="app.module.ts"
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
  ],
})
export class AppModule {}
```

isGlobal 플레그로 global 데코레이터로 접근할 수 있게 해준 것처럼 설정해주면 됩니다.

```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({ datasources: { db: { url: config.get('DATABASE_URL') } } });
  }
}
```

이렇게 설정하면 타입세이프하게 접근할 수 있습니다. Injectable로 의존성 주입을 받을 수 있게 하고 config 클래스 메서드에서 접근할 수 있습니다.

### JWT 인증, 인가

사용자가 본인 인증을 위해 로그인하면 인증입니다. 인증 이후 계속 보안상 보호받으면 인가가가 필요합니다. 이 예시에서는 JWT를 사용합니다.

JWT를 처리하기 위해서 따로 모듈을 정의해야 합니다. 이전 예시는 직접 커스텀으로 모듈을 만든 예시입니다. 이제는 Nest.js가 제공하는 module을 활용할 것입니다.

인증, 인가는 상당히 간단할 것이라는 착각하기 쉽습니다. 하지만 실제로는 꽤 어렵습니다.

nest는 이미 내부적으로 구현한 것이 많습니다. 내부적으로는 past port를 사용합니다.

https://www.passportjs.org/

express를 위해 사용할 수 있습니다. 하지만 여기서 JWT를 활용할 것입니다.

```sh
yarn add @nestjs/passport passport
```

위 명령으로 passport를 설치합니다.

```sh
yarn add @nestjs/jwt passport-jwt
yarn add -D @types/passport-jwt
```

```ts title="auth.module.ts"
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
```

이렇게 모듈을 연결해주면됩니다.

```ts title="auth.service.ts"
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async signup(dto: AuthDto) {}

  async login(dto: AuthDto) {}
}
```

이렇게 연결해줍니다.

```ts
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}
  async signup(dto: AuthDto) {}

  async login(dto: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (!user) throw new ForbiddenException('no email');
      const pwMatch = await argon.verify(user.hash, dto.password);
      if (!pwMatch) throw new ForbiddenException('password not match');
      return await this.signToken(user.id, user.email);
    } catch (error) {
      throw error;
    }
  }

  async signToken(userId: number, email: string) {
    const payload = { sub: userId, email };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret,
    });

    return {
      access_token: token,
    };
  }
}
```

이렇게 해주면 전통적인 access_token을 반환하는 메서드를 만들고 로그인 갱신에 응답할 수 있는 메서드를 만들 수 있게 됩니다.

이제부터 인가 유효성 검증입니다. 이런것을 일반적으로 전략이라고 부릅니다.

https://docs.nestjs.com/recipes/passport#implementing-passport-jwt

이런 형태로 작성하면 됩니다.

```ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
```

이렇게 연결합니다.

```ts title="strategy/jwt.strategy.ts"
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
}
```

이렇게 구현하고 베런 export로 내보내면 됩니다.

이제 간단한 구현 확인을 해겠습니다. 본인 인가가 필요한 리소스인지 검증하는 로직을 구현합니다.

## guards

즉 간단한 수준의 가드를 만들고 get 요청을 구현할 것입니다.

https://docs.nestjs.com/guards

```sh
nest g controller user --no-spec
```

```ts
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get('me')
  getMe() {
    return 'user info';
  }
}
```

http://localhost:3000/users/me

여기로 get 요청으로 구현을 확인합니다.

```ts title="jwt.strategy.ts"
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
}
```

JWT 설정을 추가합니다.

```ts title="user.controller.ts"
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe() {
    return 'user info';
  }
}
```

이렇게 가드 설정을 추가합니다.

동일한 문자열을 입력하는 것으로 동일한 전략의 보호를 받는 것이라고 설정하는 것입니다.

```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  validate(payload: any) {
    console.log({ payload });
    return payload;
  }
}
```

이렇게 유효성검증하면 통과됩니다. 요청 객체에서 추가합니다.

```ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() req: Request) {
    console.log(req.user);
    return 'user info';
  }
}
```

요청 객체에 추가한다는 의미는 여기서 이해할 수 있습니다. payload에 유저가 접근가능해집니다.

이렇게 소비할 때 유저 JWT 정보를 접근하고 활용할 수 있게 됩니다.

```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    delete user.hash;
    return user;
  }
}
```

이렇게 해서 본인인증을 합니다. DB에 유저가 있는지 확인하고 없으면 접근 금지 있으면 허용하고 유저정보를 요청객체에 붙입니다.

```ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }
}
```

이렇게 본인정보를 볼 수 있게 제공합니다.

여기서 더 개선하는 방법이 있습니다. 커스텀 가드 설정으로 이제 추출해보겠습니다.
