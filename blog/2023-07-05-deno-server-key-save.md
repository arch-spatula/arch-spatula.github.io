---
title: '서버 key 고정시키기'
authors: [arch-spatula]
tags: ['deno', 'auth', 'deno deploy']
description: 'Deno Deploy로 배포하고 있는데 서버가 재시작하면 Module 스코프로 1번만 실행해야 할 함수 모두 재실행하고 서버의 키가 바뀌는 문제가 발생했습니다. 이 문제를 해결하기 위해서 항상 동일한 key를 만들도록 해결했습니다.'
toc_max_heading_level: 6
---

# 서버 key 고정시키기

Deno Deploy로 배포하고 있는데 서버가 재시작하면 Module 스코프로 1번만 실행해야 할 함수 모두 재실행하고 서버의 키가 바뀌는 문제가 발생했습니다. 이 문제를 해결하기 위해서 항상 동일한 key를 만들도록 해결했습니다.

<!--truncate-->

### 에러 로그: axios interceptor 동작 실패

이 문제는 access token이 만료되고 refresh token이 유효하면 다음 요청에 자동 갱신처리하고 재요청해야 하는 기능입니다.

예전에 [axios interceptors와 refresh token을 활용한 jwt 토큰 관리](https://gusrb3164.github.io/web/2022/08/07/refresh-with-axios-for-client/)을 대충보고 구현하고 한번 동작해서 성공한줄 알고 착각했습니다.

이 버그만 고치면 어려운 난이도의 개발은 해결됩니다. 물론 스스로 생각할 때 어려운 부분이라고 봅니다. 이 기능을 해결하면 기능 구현과 병렬로 문서화를 진행하면 됩니다.

이 기능은 사실 어려우면 안되는 기능입니다. 다른 교육과정에서 기본적으로 알려주지만 제가 받은 교육과정은 BaaS로 해결해서 몰랐던 것입니다.

#### 문제: 재요청 실패

토큰이 만료되면 로그아웃도 안 보여주고 재요청이 그냥 실패합니다.

새로고침하면 로그아웃이 되는 것은 동작합니다.

#### 시도: ???

##### local에서 환경 재현

일단 동일한 문제를 재현해야 하지만 30분 ~ 1시간 토큰기간을 프로덕션에서 그대로 사용할 수 없습니다.

로컬 환경에서 일단 재현해야 합니다.

```ts
import { Application } from 'https://deno.land/x/oak@v12.4.0/mod.ts';
import router from './routes/index.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';

const app = new Application();

app.use(
  oakCors({
    origin: '*',
  })
);
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
```

deno에서 와일드 카드로 CORS를 localhost에서 열어 줬습니다. 이것은 커밋할 생각이 없습니다. 이상태로 서버를 열어둘 것입니다.

여기서 실수를 했는데 라이브러리를 deps에서 import를 안했네요;;;

```
http://localhost:8000/
```

여기로 이제 핵심 url을 변경하면 됩니다.

```ts
import { create, getNumericDate } from '../deps.ts';

async function generateAccessToken(
  userId: string,
  expiresInSec = 10,
  key = privateKey
) {
  const jwt = await create(
    { alg: 'HS512' },
    { exp: getNumericDate(expiresInSec), sub: userId },
    key
  );

  console.log(new Date(), 'Access Token 생성');

  return {
    jwt,
    expires: new Date(new Date().getTime() + expiresInSec * 1000),
  };
}
```

access token의 만료 시간을 10초로 설정했습니다. 그리고 logging을 잘하도록 합시다.

여기서 10초 지나면 또 통신여부를 볼 수 있을 것입니다.

로그인 시점에서 10초 미만이 됩니다. 통신으로 받고 리다이렉팅하기 때문입니다.

access token이 만료되면 response 인터셉터가 동작합니다.

인터셉터가 하는 동작은 access token을 갱신요청을 하고 받아서 동일한 요청을 한번더 합니다.

만료 이후 요청은 3번 요청 응답 사이클을 순회하지만 결국 동작에 성공합니다. 만료시간은 꽤 길기 때문에 괜찮습니다. 아주 가끔만 통신 시간이 길어지게 되는 것입니다.

#### 원인: 서버 재구동시 primitive 재생성 시점에 요청하면 에러가 발생

하지만 해결이라고 착각하고 있었습니다.

이슈는 1주일 전에 만들었지만 이문제는 놀랍게도 제가 6월 21일에 해결했습니다.

서버를 재구동하면 동일한 문제가 발생했습니다.

이렇게 되면 해결하기 위해서는 매번 동일한 key를 생성하도록 해야 합니다. 이럴 때 활용할 수 있는 전략은 env에 key를 저장하고 읽게 만드는 것입니다.

#### 해결: CryptoKey 저장

```ts
const publicKey = await crypto.subtle.exportKey(
  'jwk',
  await crypto.subtle.generateKey(
    { name: 'HMAC', hash: { name: 'SHA-512' } },
    true,
    ['sign', 'verify']
  )
);

Deno.writeTextFileSync('key.json', JSON.stringify(data));
```

위 코드로 키를 생성합니다. json을 env에 이제 저장해주면 됩니다. 이렇게 읽을 수 있습니다. `console.log`는 중간에 짤립니다.

```
PUBLIC_KEY={(key 내용)}
```

이제 이 key를 활용하면 됩니다.

```ts
const PUBLIC_KEY = JSON.parse(
  Deno.env.get('PUBLIC_KEY') || config()['PUBLIC_KEY']
);

const privateKey = await crypto.subtle.importKey(
  'jwk',
  PUBLIC_KEY,
  { name: 'HMAC', hash: { name: 'SHA-512' } },
  true,
  ['sign', 'verify']
);
```

이렇게 되면 key는 항상 동일하기 때문에 서버를 재가동해도 token을 유효하게 만들 수 있습니다.

#### 학습: private key 저장하는 방법을 사용해야 하는 이유는 서버 재가동이 많기 때문입니다.

결국 본인도 모르는 privateKey를 생성하게 만드는 전략을 활용할 수 없었습니다.
