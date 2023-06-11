---
title: 토큰 테스트 코드 작성
authors: [arch-spatula]
tags: ['token', 'testing', 'refactoring']
description: 토큰을 생성, 검증하는 테스트 코드를 작성하는 방법입니다. token을 싱글튼으로 제어하는 것은 일반적이지 않은 패턴입니다. 이부분을 리팩토링하고 테스트합니다.
toc_max_heading_level: 6
---

# 토큰 테스트 코드 작성

토큰을 생성, 검증하는 테스트 코드를 작성하는 방법입니다. token을 싱글튼으로 제어하는 것은 일반적이지 않은 패턴입니다. 이부분을 리팩토링하고 테스트합니다.

<!--truncate-->

```ts
import { create, getNumericDate, verify } from '../deps.ts';

class Token {
  private static instance: Token;
  readonly key: Promise<CryptoKey>;

  private constructor() {
    this.key = (async () => {
      const key = await crypto.subtle.generateKey(
        { name: 'HMAC', hash: { name: 'SHA-512' } },
        true,
        ['sign', 'verify']
      );
      return key;
    })();
  }

  static getInstance(): Token {
    if (!Token.instance) {
      Token.instance = new Token();
    }
    return Token.instance;
  }

  async makeAccessToken(userId: string, expiresInSec = 3600) {
    const jwt = await create(
      { alg: 'HS512' },
      { exp: getNumericDate(expiresInSec), sub: userId },
      await this.key
    );
    return {
      jwt,
      expires: new Date(new Date().getTime() + expiresInSec * 1000),
    };
  }

  async makeRefreshToken(userId: string, expiresInSec = 2592000) {
    const jwt = await create(
      { alg: 'HS512' },
      { exp: getNumericDate(expiresInSec), sub: userId },
      await this.key
    );
    return {
      jwt,
      expires: new Date(new Date().getTime() + expiresInSec * 1000),
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const userId = await this.tokenToUserId(refreshToken);

      if (!userId) throw new Error('토큰이 만료되었습니다.');

      const { jwt: accessToken } = await this.makeAccessToken(userId);
      return { accessToken, success: true };
    } catch (error) {
      return { accessToken: null, success: false };
    }
  }

  async tokenToUserId(jwt: string) {
    const { sub } = await verify(jwt, await this.key, {});
    return sub;
  }
}

export default Token;
```

이런 토큰 클래스가 있습니다. 참고로 `private` 키는 개발자인 저도 모르게 만들었습니다. 이건 중요한 것이 아닙니다.

중요한 것은 이것을 어떻게 테스트하는가?

테스트해볼 지점들을 생각해봅시다. 먼저 싱글튼 패턴이기 때문에 둘이 같은 메모리 주소를 공유하는지 검증이 필요합니다. 토큰이 만들어지는지 2개의 메서드를 테스트해볼 수 있습니다. 토큰을 갱신하는 함수에 2가지 경우의 수를 테스트 할 수 있습니다. 만료, 유효 2가지로 갱신해서 응답하는지 확인해볼 수 있습니다. 마지막으로 token이 userId로 변환해주는지 또는 실패하면 어떻게 처리할지 검증해볼 수 있습니다.

- [x] 2개 생성 같은 인스턴스
- [ ] 리팩토링
- [ ] makeRefreshToken
- [ ] makeAccessToken
- [ ] refreshAccessToken
  - [ ] 유효
  - [ ] 만료
- [ ] tokenToUserId
  - [ ] 유효
  - [ ] 만료

여기까지는 테스트 설계입니다.

다음 문제는 Deno가 제공하는 테스트 도구를 어떻게 잘 활용할 수 있는지 고민입니다. 잠시 공식 문서를 순서대로 읽어야 합니다.

## Deno 공식문서

https://deno.com/manual@v1.34.1/basics/testing

## 피드백

token을 싱글튼으로 작성해서 자원공유하는 접근에 단점이 있습니다. 코드 스멜입니다. 생각자체가 나쁜 것은 아닙니다. 하지만 실제로 만들고나서 테스트코드 작성이 어려우면 코드 스멜이 있다고 볼 수 있습니다. 이런 이유로 싱글튼 패턴에서 해체해야 합니다.

```ts
import { assertEquals } from '../deps.ts';
import {
  convertTokenToUserId,
  generateAccessToken,
  generateKey,
  generateRefreshToken,
  refreshAccessToken,
} from './token.ts';

Deno.test('should return access token', async () => {
  const privateKey = generateKey();
  const userId = 'user123';
  const expiresInSec = 3600;

  const result = await generateAccessToken(privateKey, userId, expiresInSec);

  assertEquals(typeof result.jwt, 'string');
  assertEquals(typeof result.expires, 'object');
});

Deno.test('should return refresh token', async () => {
  const privetKey = generateKey();
  const userId = 'user123';
  const expiresInSec = 3600;

  const result = await generateRefreshToken(privetKey, userId, expiresInSec);

  assertEquals(typeof result.jwt, 'string');
  assertEquals(typeof result.expires, 'object');
});

Deno.test('should refresh access token', async () => {
  const privetKey = generateKey();
  const userId = 'userId123';
  const refreshToken = (await generateRefreshToken(privetKey, userId)).jwt;

  const result = await refreshAccessToken(privetKey, refreshToken);

  assertEquals(typeof result.accessToken, 'string');
  assertEquals(result.success, true);
});

Deno.test('should convert token as userId', async () => {
  const privateKey = generateKey();
  const userId = 'userId123';
  const accessToken = (await generateAccessToken(privateKey, userId)).jwt;

  const result = await convertTokenToUserId(privateKey, accessToken);

  assertEquals(result, userId);
});
```

일단 테스트 코드를 함수로 모두 분리해서 작성했습니다. 그리고 보완할 점들을 피드백받았습니다.

1. 실패 시에 대한 추가 정보: 테스트 코드에 실패한 경우 어떤 부분에서 실패했는지 자세한 정보를 제공하는 것이 도움이 될 수 있습니다. 실패 메시지에 추가 정보를 포함시켜 어떤 조건이 실패했는지 더 쉽게 이해할 수 있도록 할 수 있습니다.

2. 경계 조건 테스트: 입력값의 경계 조건을 테스트하는 케이스를 추가하는 것이 좋습니다. 예를 들어, 토큰 만료 시간이 0이나 매우 큰 값을 가지는 경우를 테스트하여 예상한 동작을 확인할 수 있습니다.

3. 모의 객체 사용: 테스트할 함수가 외부 의존성을 가질 때, 모의 객체(Mock Object)를 사용하여 외부 의존성을 대체하고 테스트할 수 있습니다. 이를 통해 외부 리소스에 의존하지 않고 테스트할 수 있습니다.

4. 예외 처리 테스트: 예외 상황에 대한 테스트도 추가하는 것이 좋습니다. 예를 들어, 유효하지 않은 토큰이나 잘못된 입력에 대한 예외 처리를 테스트하여 코드의 안정성을 검증할 수 있습니다.

## 리팩토링

테스트하기 좋다고 좋은 코드는 아니다. 하지만 테스트하기도 어려우면 나쁜 코드다.

```ts
const authMiddleware: Middleware = async (
  { request, response, cookies },
  next
) => {
  try {
    const jwt = request.headers.get('Authorization')!;
    if (!jwt || !jwt.startsWith('Bearer '))
      throw new AuthorizationError('Unauthorized');

    const userId = await convertTokenToUserId(jwt);

    if (!userId) {
      const refreshToken = await cookies.get('user');
      if (!refreshToken) throw new AuthorizationError('logout');

      response.status = 401;
      response.body = {
        success: false,
        msg: '토큰이 만료되었습니다',
        accessToken: await refreshAccessToken(refreshToken, privateKey),
      };
      cookies.set(
        'user',
        (await refreshAccessToken(refreshToken, privateKey)).accessToken
      );
      return;
    }

    request.headers.append('userId', userId);
    await next();
  } catch (error) {
    if (error instanceof AuthorizationError) {
      response.status = 400;
      response.body = {
        error,
        success: false,
      };
    } else {
      response.status = 401;
      response.body = {
        error,
        success: false,
      };
    }
  }
};

export { authMiddleware };
```

```ts
Deno.test(
  'should pass with validate access token and refresh token',
  async () => {
    // given
    const privateKey = generateKey();
    const userId = 'userId123';
    const expiresInSec = 3600;
    const { jwt: accessToken } = await generateAccessToken(
      userId,
      expiresInSec,
      privateKey
    );
    const { jwt: refreshCookie } = await generateRefreshToken(
      userId,
      expiresInSec,
      privateKey
    );
    const ctx = testing.createMockContext({
      headers: [['cookie', `user=${refreshCookie}`]],
    });
    ctx.request.headers.set('Authorization', accessToken);
    const next = testing.createMockNext();

    // when
    await authMiddleware(ctx, next);

    //then
    assertEquals(
      [...ctx.request.headers],
      [
        ['authorization', accessToken],
        ['cookie', `user=${refreshCookie}`],
        ['userId', userId],
      ]
    );
    assert(ctx.request.headers.has('userId'), 'should have userId');
  }
);

Deno.test('should return new refresh token', async () => {
  const refreshCookie = 'refreshToken';
  const ctx = testing.createMockContext({
    headers: [
      ['Authorization', ''],
      ['cookie', `user=${refreshCookie}`],
    ],
  });
  const next = testing.createMockNext();

  await authMiddleware(ctx, next);

  assert(ctx.response.status === 400, '400');
  assertEquals(
    ctx.response.body,
    {
      msg: '토큰이 만료되었습니다.',
      accessToken: Promise.resolve({ accessToken: null, success: false }),
    },
    'access token 갱신 응답'
  );
});

Deno.test({
  name: '모든 Token이 만료',
  async fn() {
    const ctx = testing.createMockContext({
      headers: [['Authorization', '']],
    });
    await ctx.cookies.set('user', null);
    const next = testing.createMockNext();

    await authMiddleware(ctx, next);

    assert(ctx.response.status === 400, '400');
    assertEquals(ctx.response.body, { msg: '로그아웃 되었습니다.' });
  },
});
```

## 미들웨어가 처리한 데이터를 넘겨주는 방법

> TypeError: Headers are immutable.

```ts
const authMiddleware: Middleware = async (
  { request, response, cookies, state },
  next
) => {
  try {
    const refreshToken = request.headers.get('Authorization');
    const accessToken = await cookies.get('user');
    if (!refreshToken || !refreshToken.startsWith('Bearer ') || !accessToken)
      throw new BadRequestError('Bad Request');

    const userId = await convertTokenToUserId(accessToken, privateKey);
    if (!userId) {
      const isNotExpired = await convertTokenToUserId(refreshToken, privateKey);
      if (!isNotExpired) {
        throw new AuthorizationError('Unauthorized');
      }

      const { accessToken } = await refreshAccessToken(
        refreshToken,
        privateKey
      );
      response.status = 401;
      response.body = {
        success: false,
        mag: 'new token is required',
      };
      cookies.set('user', accessToken);
      return;
    }

    state.userId = userId; // 여기서 state에 쓰기로 넘겨 줍니다. 다음 미들웨어는 state에 읽으면 됩니다.
    await next();
  } catch (error) {
    if (error instanceof BadRequestError) {
      response.status = 400;
      response.body = {
        success: false,
        msg: `${error}`,
      };
    } else if (error instanceof AuthorizationError) {
      response.status = 401;
      response.body = {
        success: false,
        msg: `${error}`,
      };
    } else {
      response.status = 406;
      response.body = {
        success: false,
        msg: `${error}`,
      };
    }
  }
};

export { authMiddleware };
```

## 서버클라이언트 암호화 복호화

> TypeError: Cannot send secure cookie over unencrypted connection.

```ts
async function signin({ request, response, cookies }: Context) {
  try {
    if (!request.hasBody) {
      throw Error('body가 없습니다.');
    }

    const input = await request.body().value;
    if (!input.email || !input.password) {
      throw Error('이메일 혹은 비밀번호가 없습니다.');
    }

    const document = await mongoAPI.getUser(input.email);
    if (document === null) throw Error('이메일이 없습니다.');
    else {
      if (await compare(input.password, document.passwordHash)) {
        const { jwt: refreshToken, expires: refreshExpires } =
          await generateRefreshToken(document._id);

        const { jwt: access_token } = await generateAccessToken(
          document._id,
          60 * 60
        );

        cookies.set('user', refreshToken, {
          expires: refreshExpires,
          httpOnly: true,
          // secure: true, 암호화 방식 찾고 주석을 풀어주세요
        });
        response.status = 201;
        response.body = {
          success: true,
          access_token,
        };
      } else {
        throw Error('비밀번호가 일치하지 않습니다.');
      }
    }
  } catch (error) {
    response.status = 400;
    response.body = {
      success: false,
      msg: `${error}`,
    };
  }
}

export { signup, signin };
```

`secure: true` 설정을 하려면 암호화하고 복호화가 필요합니다. 잠시 보류 처리하도록 하겠습니다. 물론 생각해보면 생각보다 서버 부하가 클 것 같지 않습니다. 가끔 토큰을 확인해야 하기 때문에 설정이 필요합니다. 나중에 처리하도록 하겠습니다.
