---
title: '토큰 싱글튼'
authors: [arch-spatula]
tags: ['deno', 'token', 'singleton']
description: 싱글튼 패턴이 적당해보여서 활용했습니다.
toc_max_heading_level: 6
date: 2023-05-23
---

# 토큰 싱글튼

싱글튼 패턴이 적당해보여서 활용했습니다.

<!--truncate-->

## password hash와 salt 저장하기

[BCrypt](https://deno.land/x/bcrypt@v0.4.1)

> BCrypt algorithm is computationally quite expensive

직접 인용하면 계산비용이 비싸다고 합니다. 통신비용까지 감안하면 어느쪽이 더 비쌀지는 모르겠습니다.

<iframe class="codepen" src="https://www.youtube.com/embed/zt8Cocdy15c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

과정 끝나고 면접질문 답변하면서 발견한 지식입니다.

일단 평서문으로 저장하면 곤란합니다.

```ts
import { config } from 'https://deno.land/x/dotenv@v3.2.2/mod.ts';
import CardRecord from '../model/cards.ts';
import {
  hash,
  genSalt,
  compare,
} from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

const { APP_ID, CARD_API_KEY } = config();

type Collection = {
  dataSource: string;
  database: string;
  collection: string;
};

class MongoAPI {
  private static instance: MongoAPI;
  private baseURL: string;
  private options: {
    method: string;
    headers: { 'Content-Type': string; 'api-key': string };
    body: BodyInit;
  };
  private cardBody: Collection;
  private constructor() {
    this.baseURL = `https://us-west-2.aws.data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1/action`;
    this.options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': CARD_API_KEY,
      },
      body: '',
    };
    // ... 생략
    this.userBody = {
      dataSource: 'Cluster0',
      database: 'cards_db',
      collection: 'user',
    };
  }

  static getInstance(): MongoAPI {
    if (!MongoAPI.instance) {
      MongoAPI.instance = new MongoAPI();
    }
    return MongoAPI.instance;
  }
  // ... 생략

  // 회원가입
  async signup({ email, password }: { email: string; password: string }) {
    try {
      if ((await this.getUser(email)) === null) {
        return await this.postUser(email, password);
      } else {
        throw Error('이미 가입한 아이디입니다.');
      }
    } catch (error) {
      return error;
    }
  }

  // 로그인
  async signin({ email, password }: { email: string; password: string }) {
    try {
      const document = await this.getUser(email);
      if (document === null) {
        throw Error('이메일이 없습니다.');
      } else {
        if (!(await compare(password, document.passwordHash))) {
          throw Error('비밀번호가 알치하지 않습니다.');
        } else {
          return document;
        }
      }
    } catch (error) {
      return error;
    }
  }

  async postUser(email: string, password: string) {
    try {
      const passwordSalt = await genSalt(8);
      const passwordHash = await hash(password, passwordSalt);
      const result = await fetch(`${this.baseURL}/insertOne`, {
        ...this.options,
        body: JSON.stringify({
          ...this.userBody,
          document: { email, passwordHash, passwordSalt },
        }),
      });
      return result.json();
    } catch (error) {
      return error;
    }
  }

  async getUser(email: string) {
    try {
      const result = await fetch(`${this.baseURL}/findOne`, {
        ...this.options,
        body: JSON.stringify({
          ...this.userBody,
          filter: { email },
        }),
      });
      const data = await result.json();
      return data.document;
    } catch (error) {
      return error;
    }
  }
}

export default MongoAPI;
```

hash와 salt를 만드는데 성공했습니다. ~~상으로 해쉬브라운을 본인에게 대접해야겠습니다.~~

## API 싱글튼에 아쉬운 점

API에 controller 로직이 있어서 아쉽습니다. 순수하게 DB와 통신하는 책임을 져야 하는데 다른 책임도 갖고 있습니다.

```ts
import { config } from 'https://deno.land/x/dotenv@v3.2.2/mod.ts';
import CardRecord from '../model/cards.ts';

const { APP_ID, CARD_API_KEY } = config();

type Collection = {
  dataSource: string;
  database: string;
  collection: string;
};

/**
 * @see https://www.mongodb.com/developer/languages/rust/getting-started-deno-mongodb/
 * 모든 method가 POST로 고정되어 있습니다. 특정 메서드에 맞게 갱신은 없습니다.
 */

class MongoAPI {
  private static instance: MongoAPI;
  private baseURL: string;
  private options: {
    method: string;
    headers: { 'Content-Type': string; 'api-key': string };
    body: BodyInit;
  };
  private userBody: Collection;
  private constructor() {
    this.baseURL = `https://us-west-2.aws.data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1/action`;
    this.options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': CARD_API_KEY,
      },
      body: '',
    };
    this.cardBody = {
      dataSource: 'Cluster0',
      database: 'cards_db',
      collection: 'cards',
    };
  }

  static getInstance(): MongoAPI {
    if (!MongoAPI.instance) {
      MongoAPI.instance = new MongoAPI();
    }
    return MongoAPI.instance;
  }

  async postUser({
    email,
    passwordHash,
    passwordSalt,
  }: {
    email: string;
    passwordHash: string;
    passwordSalt: string;
  }) {
    try {
      const result = await fetch(`${this.baseURL}/insertOne`, {
        ...this.options,
        body: JSON.stringify({
          ...this.userBody,
          document: { email, passwordHash, passwordSalt },
        }),
      });
      return result.json();
    } catch (error) {
      return error;
    }
  }

  async getUser(email: string) {
    try {
      const result = await fetch(`${this.baseURL}/findOne`, {
        ...this.options,
        body: JSON.stringify({
          ...this.userBody,
          filter: { email },
        }),
      });
      const data = await result.json();
      return data.document;
    } catch (error) {
      return error;
    }
  }
}
```

API에서 controller에 있어야 할 부분을 제거했습니다.

```ts
import type { Context } from 'https://deno.land/x/oak@v12.4.0/mod.ts';
import MongoAPI from '../api/mongoAPI.ts';
import {
  hash,
  genSalt,
  compare,
} from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

const mongoAPI = MongoAPI.getInstance();

async function signup({ request, response }: Context) {
  try {
    if (!request.hasBody) {
      throw Error('body가 없습니다.');
    }
    const card = await request.body().value;

    if (!card.email || !card.password) {
      throw Error('이메일 혹은 비밀 번호가 없습니다.');
    }

    const document = await mongoAPI.getUser(card.email);

    if (document !== null) {
      throw Error('이미 가입한 아이디입니다.');
    } else {
      const passwordSalt = await genSalt(8);
      const passwordHash = await hash(card.password, passwordSalt);

      response.status = 201;
      response.body = await mongoAPI.postUser({
        email: card.email,
        passwordHash,
        passwordSalt,
      });
    }
  } catch (error) {
    response.status = 400;
    response.body = {
      success: false,
      msg: `${error}`,
    };
  }
}

async function signin({ request, response, cookies }: Context) {
  try {
    if (!request.hasBody) {
      throw Error('body가 없습니다.');
    }
    const card = await request.body().value;
    if (!card.email || !card.password) {
      throw Error('이메일 혹은 비밀 번호가 없습니다.');
    }
    const document = await mongoAPI.getUser(card.email);
    if (!document) throw Error('이메일이 없습니다.');
    else {
      if (await compare(card.password, document.passwordHash)) {
        response.status = 201;
        response.body = document;
        cookies.set('user', document._id);
      } else {
        throw Error('비밀번호가 알치하지 않습니다.');
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

이동 리팩토링에 성공했습니다.

controller에 로그인 관련 로직을 추가했습니다.

다음 문제는 JWT 토큰을 만들고 서버에서 유효성을 검증하는 것입니다.

## JWT 토큰 만들어보기

일단 5월 원티드 챌린지에서 프론트엔드 보안에서 중요한 점은 cookie를 서버에서 set하고 클라이언트 요청에서 cookie를 검증하는게 베스트 프랙티스(best practice)라고 했습니다. 그래서 거기까지는 시도해보고자 합니다.

<iframe class="codepen" src="https://www.youtube.com/embed/UBUNrFtufWo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

```ts
import { create, getNumericDate } from 'https://deno.land/x/djwt@v2.8/mod.ts';

async function signin({ request, response, cookies }: Context) {
  try {
    if (!request.hasBody) {
      throw Error('body가 없습니다.');
    }
    const card = await request.body().value;
    if (!card.email || !card.password) {
      throw Error('이메일 혹은 비밀 번호가 없습니다.');
    }
    const document = await mongoAPI.getUser(card.email);
    if (!document) throw Error('이메일이 없습니다.');
    else {
      if (await compare(card.password, document.passwordHash)) {
        response.status = 201;
        response.body = document;

        const key = await crypto.subtle.generateKey(
          { name: 'HMAC', hash: { name: 'SHA-512' } },
          true,
          ['sign', 'verify']
        );
        const jwt = await create(
          { alg: 'HS512' },
          { exp: getNumericDate(60 * 60), sub: document._id },
          key
        );

        cookies.set('user', jwt);
      } else {
        throw Error('비밀번호가 알치하지 않습니다.');
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
```

일단 토큰을 만들 수 있습니다. 이제 문제는 만료시키는 것입니다. jwt 토큰을 생성할 때 만료는 가능한데 oak cookie에서도 만료를 설정해야 합니다.

## JWT 토큰 만료 로직

```ts
import {
  create,
  getNumericDate,
  verify,
} from 'https://deno.land/x/djwt@v2.8/mod.ts';

async function makeKey() {
  const key = await crypto.subtle.generateKey(
    { name: 'HMAC', hash: { name: 'SHA-512' } },
    true,
    ['sign', 'verify']
  );
  return key;
}

async function makeToken(userId: string, sec = 3600) {
  const key = await makeKey();
  const jwt = await create(
    { alg: 'HS512' },
    { exp: getNumericDate(sec), sub: userId },
    key
  );
  return {
    jwt,
    expires: {
      expires: new Date(new Date().getTime() + sec * 1000),
    },
  };
}

async function tokenToUserId(jwt: string) {
  const key = await makeKey();
  const { sub } = await verify(jwt, key);
  return sub;
}

export { makeToken, makeKey, tokenToUserId };
```

```ts
async function signin({ request, response, cookies }: Context) {
  try {
    // ... 생략
    const document = await mongoAPI.getUser(card.email);
    if (!document) throw Error('이메일이 없습니다.');
    else {
      if (await compare(card.password, document.passwordHash)) {
        response.status = 201;
        response.body = document;

        const { jwt, expires } = await makeToken(document._id, 60 * 60);
        cookies.set('user', jwt, expires);
      } else {
        throw Error('비밀번호가 알치하지 않습니다.');
      }
    }
  } catch (error) {
    // ... 생략
  }
}
```

일단 만료와 토큰 생성 로직을 컨트롤러에서 분리할 수 있었습니다. 하지만 다른 문제가 있는데 `makeKey`는 고유해야 하는데 여러번 생성됩니다. 최초 인스턴스 생성 이후에 읽기 전용으로 만들어야 합니다. 네 싱글튼처럼 들립니다.

## token 싱글튼

```ts
import {
  create,
  getNumericDate,
  verify,
} from 'https://deno.land/x/djwt@v2.8/mod.ts';

// 싱글은 싱글튼
class TokenManager {
  private static instance: TokenManager;
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

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  async makeToken(userId: string, sec = 3600) {
    const jwt = await create(
      { alg: 'HS512' },
      { exp: getNumericDate(sec), sub: userId },
      await this.key
    );
    return {
      jwt,
      expires: {
        expires: new Date(new Date().getTime() + sec * 1000),
      },
    };
  }

  async tokenToUserId(jwt: string) {
    const { sub } = await verify(jwt, await this.key);
    return sub;
  }
}
```

인스턴스화할 때 1번만 실행되고 그 이후로 읽기 전용이 된다면 이렇게 만들 수 있습니다.

key는 1회만 실행하고 할당되기 때문에 문제가 없습니다.

싱글튼을 올바르게 사용하는 예시가 맞는지 모르겠습니다.

```ts
import type { Context } from 'https://deno.land/x/oak@v12.4.0/mod.ts';
import MongoAPI from '../api/mongoAPI.ts';
import { Token } from '../util/token.ts';
import CardRecord from '../model/cards.ts';

const mongoAPI = MongoAPI.getInstance();
const token = Token.getInstance();

async function addCard({ request, response, cookies }: Context) {
  try {
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: 'No Data',
      };
    } else {
      const jwt = await cookies.get('user');
      if (!jwt) {
        throw Error('인증이 안 되어 있습니다.');
      }
      const userId = await token.tokenToUserId(jwt);
      if (!userId) throw Error('사용자 id가 없습니다.');

      const { question, answer, submitDate, stackCount } = await request.body()
        .value;
      if (!question || !answer || !submitDate || !stackCount)
        throw Error('question, answer, data, stackCount 중 값이 1개 없습니다.');

      const card = new CardRecord(
        question,
        answer,
        submitDate,
        stackCount,
        userId
      );
      response.status = 201;
      response.body = await mongoAPI.postCards(card);
    }
  } catch (error) {
    response.status = 400;
    response.body = {
      success: false,
      msg: `${error}`,
    };
  }
}

async function getCards({ response, cookies }: Context) {
  try {
    const jwt = await cookies.get('user');
    if (!jwt) {
      throw Error('인증이 안 되어 있습니다.');
    }

    const userId = await token.tokenToUserId(jwt);
    if (!userId) throw Error('사용자 id가 없습니다.');
    console.log(userId);

    response.status = 200;
    response.body = await mongoAPI.getCards(userId);
  } catch (error) {
    response.status = 400;
    response.body = {
      success: false,
      msg: `${error}`,
    };
  }
}
```

여기까지 작성되었습니다. 다른 API를 제공하고 완성하고 PR 올리면 될 것 같습니다. PR 이후에는 CORS 설정이 될 것 같습니다.
