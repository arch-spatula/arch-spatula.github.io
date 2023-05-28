---
title: 공룡이 좋아졌습니다.
authors: [arch-spatula]
tags: ["deno", "axios", "mongoDB", "Worker", "BCrypt", "deno deploy"]
description: deno 런타임에서 axios로 mongoDB랑 통신하는데 에러가 계속됩니다.
toc_max_heading_level: 6
---

# 공룡이 좋아졌습니다.

이번주에 Deno를 활용해서 백엔드 미들웨어 서버를 만들었습니다. Axios, MongoDB, Worker, BCrypt을 사용하면서 겪은 에러들입니다.

<!--truncate-->

최근에 Deno를 활용해서 유사 백엔드를 만들기 시작했습니다. 프론트엔드 입장에서 잘해야 하는 부담이 덜해서 재미있게 만들었습니다.

또 docusaurus로 블로그도 만들고 문서화 사이트도 만들었습니다. 프로그래밍으로 만드는 즐거움은 공룡들 덕분에 만끽했습니다.

## 에러로그: deno, axios, mongoDB 에러 미제사건

deno 런타임에서 axios로 mongoDB랑 통신하는데 에러가 계속됩니다. mongoDB API 문서를 잘 숙지하지 않고 있어서 발생하는 문제 같습니다.

### 문제: 튜토리얼 보고 배우기

- [flash-card-backend](https://github.com/arch-spatula/flash-card-backend) 프로젝트를 진행하는 중간 발생했습니다.
- deno 런타임에서 mongoDB 통신하는데 axios가 작동하지 않습니다.
  - 특이하게 post 요청에는 문제가 없습니다.
  - 하지만 get 요청은 정상동작하지 않습니다.
- [Getting Started with Deno & MongoDB - MongoDB](https://www.youtube.com/watch?v=xOgicDUXnrE) 이 튜토리얼을 보고 따라 했습니다. 여기서는 모든 요청이 post이고 fetch로 통신했습니다.
  - 가독성이 너무 떨어지는 코드였습니다. 그래서 axios를 싱글튼 패턴으로 만들어서 DB에 요청하도록 변경을 시도하고 있었습니다.

### 시도: axios 싱글튼

#### 전체 코드

```ts
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import axios from "https://deno.land/x/redaxios@0.5.1/mod.ts";

// axios 싱글튼
const { APP_ID, CARD_API_KEY } = config();
const baseURL = `https://us-west-2.aws.data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1/action`; // /action

type Card = {
  question: string;
  answer: string;
  submitDate: string;
  stackCount: number;
};

class AxiosAPI {
  private static instance: AxiosAPI;
  private axiosConfig;
  private query: {
    dataSource: string;
    database: string;
    collection: string;
    document?: Card;
  };

  private constructor() {
    this.axiosConfig = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        "api-key": CARD_API_KEY,
      },
      method: "POST",
    });
    this.query = {
      dataSource: "Cluster0",
      database: "cards_db",
      collection: "cards",
    };
  }

  static getInstance(): AxiosAPI {
    if (!AxiosAPI.instance) {
      AxiosAPI.instance = new AxiosAPI();
    }
    return AxiosAPI.instance;
  }

  async getCards() {
    const body = JSON.stringify({});
    return await this.axiosConfig.post("/find", {
      body: JSON.stringify({
        dataSource: "Cluster0",
        database: "cards_db",
        collection: "cards",
      }),
    });
  }

  async postCards(payload: Card) {
    this.query.document = payload;
    return await this.axiosConfig.post("/insertOne", this.query);
  }

  async patchCards() {}
  async deleteCards() {}
  async singin() {}
  async singup() {}
}

const axiosLog = AxiosAPI.getInstance();

try {
  console.log(await axiosLog.getCards());
} catch (error) {
  console.log(error);
}

export default AxiosAPI;
```

이것이 전체 코드입니다.

반환하는 에러 메시지는 다음입니다.

> "Invalid parameter(s) specified: body"

요청을 보낼 때 body 문제라는 것은 파악할 수 있습니다. 하지만 body에 어떻게 변형해도 답을 얻을 수 없었습니다.

### 해결: fetch 싱글튼

```ts
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import CardRecord from "../model/cards.ts";

const { APP_ID, CARD_API_KEY } = config();

class MongoAPI {
  private static instance: MongoAPI;
  private baseURL: string;
  private options: {
    method: string;
    headers: { "Content-Type": string; "api-key": string };
    body: BodyInit;
  };
  private constructor() {
    this.baseURL = `https://us-west-2.aws.data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1/action`;
    this.options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": CARD_API_KEY,
      },
      body: JSON.stringify({
        dataSource: "Cluster0",
        database: "cards_db",
        collection: "cards",
      }),
    };
  }

  static getInstance(): MongoAPI {
    if (!MongoAPI.instance) {
      MongoAPI.instance = new MongoAPI();
    }
    return MongoAPI.instance;
  }

  async getCards() {
    return await fetch(`${this.baseURL}/find`, this.options);
  }

  async postCards(document: CardRecord) {
    return await fetch(`${this.baseURL}/insertOne`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": CARD_API_KEY,
      },
      body: JSON.stringify({
        dataSource: "Cluster0",
        database: "cards_db",
        collection: "cards",
        document,
      }),
    });
  }
}

const mongoAPI = MongoAPI.getInstance();

try {
  const card = new CardRecord(
    "순수 함수를 활용합니다.",
    "부작용이 없습니다.",
    new Date(),
    2,
    "1",
    "646a089f1c75ae5b5752d35d"
  );
  console.log(await mongoAPI.patchCards(card));
} catch (error) {
  console.log(error);
}

export default MongoAPI;
```

- fetch로 다시 작성해보니까 모두 정상동작했습니다.
- MongoDB에는 `POST`가 기본인 것 같습니다.
- 다른 `PATCH`, `DELETE` 동작이 `POST`로 설정하면 모두 동작했습니다.

### 학습: 왜 Post인가?

- mongoDB를 fetch로 요청할 때는 모든 것이 Post입니다.
  - 의문인 것은 왜 모든 요청이 Post인가? 아직 답을 모르겠습니다.

---

## password hash와 salt 저장하기

[BCrypt](https://deno.land/x/bcrypt@v0.4.1)

> BCrypt algorithm is computationally quite expensive

직접 인용하면 계산비용이 비싸다고 합니다. 통신비용까지 감안하면 어느쪽이 더 비쌀지는 모르겠습니다.

<iframe class="codepen" src="https://www.youtube.com/embed/zt8Cocdy15c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

과정 끝나고 면접질문 답변하면서 발견한 지식입니다.

일단 평서문으로 저장하면 곤란합니다.

```ts
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import CardRecord from "../model/cards.ts";
import {
  hash,
  genSalt,
  compare,
} from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

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
    headers: { "Content-Type": string; "api-key": string };
    body: BodyInit;
  };
  private cardBody: Collection;
  private constructor() {
    this.baseURL = `https://us-west-2.aws.data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1/action`;
    this.options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": CARD_API_KEY,
      },
      body: "",
    };
    // ... 생략
    this.userBody = {
      dataSource: "Cluster0",
      database: "cards_db",
      collection: "user",
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
        throw Error("이미 가입한 아이디입니다.");
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
        throw Error("이메일이 없습니다.");
      } else {
        if (!(await compare(password, document.passwordHash))) {
          throw Error("비밀번호가 알치하지 않습니다.");
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
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import CardRecord from "../model/cards.ts";

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
    headers: { "Content-Type": string; "api-key": string };
    body: BodyInit;
  };
  private userBody: Collection;
  private constructor() {
    this.baseURL = `https://us-west-2.aws.data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1/action`;
    this.options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": CARD_API_KEY,
      },
      body: "",
    };
    this.cardBody = {
      dataSource: "Cluster0",
      database: "cards_db",
      collection: "cards",
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
import type { Context } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import MongoAPI from "../api/mongoAPI.ts";
import {
  hash,
  genSalt,
  compare,
} from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const mongoAPI = MongoAPI.getInstance();

async function signup({ request, response }: Context) {
  try {
    if (!request.hasBody) {
      throw Error("body가 없습니다.");
    }
    const card = await request.body().value;

    if (!card.email || !card.password) {
      throw Error("이메일 혹은 비밀 번호가 없습니다.");
    }

    const document = await mongoAPI.getUser(card.email);

    if (document !== null) {
      throw Error("이미 가입한 아이디입니다.");
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
      throw Error("body가 없습니다.");
    }
    const card = await request.body().value;
    if (!card.email || !card.password) {
      throw Error("이메일 혹은 비밀 번호가 없습니다.");
    }
    const document = await mongoAPI.getUser(card.email);
    if (!document) throw Error("이메일이 없습니다.");
    else {
      if (await compare(card.password, document.passwordHash)) {
        response.status = 201;
        response.body = document;
        cookies.set("user", document._id);
      } else {
        throw Error("비밀번호가 알치하지 않습니다.");
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
import { create, getNumericDate } from "https://deno.land/x/djwt@v2.8/mod.ts";

async function signin({ request, response, cookies }: Context) {
  try {
    if (!request.hasBody) {
      throw Error("body가 없습니다.");
    }
    const card = await request.body().value;
    if (!card.email || !card.password) {
      throw Error("이메일 혹은 비밀 번호가 없습니다.");
    }
    const document = await mongoAPI.getUser(card.email);
    if (!document) throw Error("이메일이 없습니다.");
    else {
      if (await compare(card.password, document.passwordHash)) {
        response.status = 201;
        response.body = document;

        const key = await crypto.subtle.generateKey(
          { name: "HMAC", hash: { name: "SHA-512" } },
          true,
          ["sign", "verify"]
        );
        const jwt = await create(
          { alg: "HS512" },
          { exp: getNumericDate(60 * 60), sub: document._id },
          key
        );

        cookies.set("user", jwt);
      } else {
        throw Error("비밀번호가 알치하지 않습니다.");
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

## jwt 토큰 만료 로직

```ts
import {
  create,
  getNumericDate,
  verify,
} from "https://deno.land/x/djwt@v2.8/mod.ts";

async function makeKey() {
  const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: { name: "SHA-512" } },
    true,
    ["sign", "verify"]
  );
  return key;
}

async function makeToken(userId: string, sec = 3600) {
  const key = await makeKey();
  const jwt = await create(
    { alg: "HS512" },
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
    if (!document) throw Error("이메일이 없습니다.");
    else {
      if (await compare(card.password, document.passwordHash)) {
        response.status = 201;
        response.body = document;

        const { jwt, expires } = await makeToken(document._id, 60 * 60);
        cookies.set("user", jwt, expires);
      } else {
        throw Error("비밀번호가 알치하지 않습니다.");
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
} from "https://deno.land/x/djwt@v2.8/mod.ts";

// 싱글은 싱글튼
class TokenManager {
  private static instance: TokenManager;
  readonly key: Promise<CryptoKey>;

  private constructor() {
    this.key = (async () => {
      const key = await crypto.subtle.generateKey(
        { name: "HMAC", hash: { name: "SHA-512" } },
        true,
        ["sign", "verify"]
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
      { alg: "HS512" },
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
import type { Context } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import MongoAPI from "../api/mongoAPI.ts";
import { Token } from "../util/token.ts";
import CardRecord from "../model/cards.ts";

const mongoAPI = MongoAPI.getInstance();
const token = Token.getInstance();

async function addCard({ request, response, cookies }: Context) {
  try {
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "No Data",
      };
    } else {
      const jwt = await cookies.get("user");
      if (!jwt) {
        throw Error("인증이 안 되어 있습니다.");
      }
      const userId = await token.tokenToUserId(jwt);
      if (!userId) throw Error("사용자 id가 없습니다.");

      const { question, answer, submitDate, stackCount } = await request.body()
        .value;
      if (!question || !answer || !submitDate || !stackCount)
        throw Error("question, answer, data, stackCount 중 값이 1개 없습니다.");

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
    const jwt = await cookies.get("user");
    if (!jwt) {
      throw Error("인증이 안 되어 있습니다.");
    }

    const userId = await token.tokenToUserId(jwt);
    if (!userId) throw Error("사용자 id가 없습니다.");
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

## 에러로그: Connection was forcibly closed by a peer

혹시나 했는데 역시나 겪은 문제입니다.

### 문제: Connection was forcibly closed by a peer

1. 서버를 구동하고 삭제요청을 보내면 `Connection was forcibly closed by a peer`이라고 응답합니다.
2. `Connection was forcibly closed by a peer` 응답을 받은 이후부터는 MongoDB Atlas에서는 다른 요청을 거부합니다.

### 시도: MongoAPI가 문제인가?

#### 가설: MongoAPI 메서드에 문제가 있습니다.

```ts
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import CardRecord from "../model/cards.ts";

class MongoAPI {
  async deleteCards($oid: string) {
    try {
      const result = await fetch(`${this.baseURL}/deleteOne`, {
        ...this.options,
        body: JSON.stringify({
          ...this.cardBody,
          filter: { _id: { $oid } },
        }),
      });
      return result.json();
    } catch (error) {
      return error;
    }
  }
}

try {
  const mongoAPI = MongoAPI.getInstance();
  console.log(await mongoAPI.deleteCards("어떤 id"));
} catch (error) {
  console.log(error);
}
```

MongoAPI에서 삭제 모듈를 독립적으로 실행했는데 문제가 없습니다.

#### 갱신은 정상동작

```ts
async function updateCard(ctx: Context) {
  const { request, response, cookies } = ctx;
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  try {
    if (!request.hasBody) throw Error("No Data");

    const jwt = await cookies.get("user");
    if (!jwt) {
      throw Error("인증이 안 되어 있습니다.");
    }

    const userId = await token.tokenToUserId(jwt);
    if (!userId) throw Error("사용자 id가 없습니다.");

    const { question, answer, submitDate, stackCount } = await request.body()
      .value;
    if (!question || !answer || !submitDate || !stackCount)
      throw Error("question, answer, data, stackCount 중 값이 1개 없습니다.");

    const card = new CardRecord(
      question,
      answer,
      submitDate,
      stackCount,
      userId,
      id
    );

    response.status = 200;
    response.body = await mongoAPI.patchCards(card);
  } catch (error) {
    response.status = 400;
    response.body = {
      success: false,
      msg: `${error}`,
    };
  }
}
```

갱신은 body가 필요한데 정상적으로 동작합니다.

하지만 delete는 body가 딱히 필요한 메서드는 아닙니다.

```ts
async function deleteCard(ctx: Context) {
  const { response, cookies } = ctx;
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  try {
    const jwt = await cookies.get("user");
    if (!jwt) {
      throw Error("인증이 안 되어 있습니다.");
    }

    const userId = await token.tokenToUserId(jwt);
    if (!userId) throw Error("사용자 id가 없습니다.");

    response.status = 204;
    response.body = await mongoAPI.deleteCards(id);
  } catch (error) {
    response.status = 400;
    response.body = {
      success: false,
      msg: `${error}`,
    };
  }
}
```

#### 가설: DB 서버 보안문제

가설: 보안문제로 특정 요청에 대해서 설정을 풀어줘야 한다.

하지만 DB 서버에서 보안문제가 있었으면 독립적인 모듈로 통신할 때부터 요청 거절이 되어야 합니다. 하지만 문제가 없었습니다.

### 해결: Deno oak에서 delete의 response body는 null로 고정되어 있습니다.

```ts
async function deleteCard(ctx: Context) {
  const { response, cookies } = ctx;
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  try {
    const jwt = await cookies.get("user");
    if (!jwt) {
      throw Error("인증이 안 되어 있습니다.");
    }

    response.status = 204;
    const msg = await mongoAPI.deleteCards(id);
    console.log(msg);
    response.body = null;
  } catch (error) {
    response.status = 400;
    response.body = {
      success: false,
      msg: `${error}`,
    };
  }
}
```

이렇게 작성하니까 해결되었습니다. 즉 `response.body = null`로 작성하면 삭제 구현이 됩니다.

### 학습: deno oak에서 delete의 `response.body`는 `null`로 고정되어 있습니다.

1. deno oak에서 delete의 `response.body`는 `null`로 고정되어 있습니다.
2. 디버깅할 때는 기록하면서 가설을 잘 설정하면 효율적입니다. 무엇이 아닌지 소거할 수 있습니다. 고급스러운 표현을 사용하면 버그 발원지의 면적을 축소할 수 있습니다.
3. 에러메시지는 첫줄에 항상 주의합시다.

> [uncaught application error]: TypeError - Response with null body status cannot have body

이런 메시지를 봤는데 나중에 발견했습니다.

## 백엔드 엔지니어의 고역

파일을 변경하고 API를 메뉴얼 테스트할 때 cookie를 새로 만들어야 한다는 백엔드 엔지니어의 고통을 공감할 수 있었습니다. 요청응답 시간이 3초만 넘겨도 엄청난 세월이 흐른 느낌이었습니다.

다른 고역도 있습니다. 테스트 코드 작성입니다. Deno를 테스트하는 방법이 익숙하지 않아서 그런 것 같습니다. 익숙해지면 쉽게 해결할 수 있을 것 같습니다. 일부 동작하는 테스트도 있지만 일부 작성에 실패한 테스트도 있습니다. 다른 프로젝트 진행하면서 학습할 수 있을 것 같습니다.

---

## 컨디션 관리

수요일에 무슨 원인인지 모르겠는데 토했습니다. 뭐 잘못 먹은것 같습니다.

아니면 쉬면 안되는데 쉬어서 업보 받은 것이라 생각하겠습니다.

---

## deno deploy

배포할 때 github action을 사용하거나 Automatic 설정 2가지 중 1개를 고를 수 있습니다.

Automatic을 고르니까 쉽게 배포되었습니다.

## Your client has issued a malformed or illegal request.

```html
<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />
    <title>400 Bad Request</title>
  </head>
  <body text="#000000" bgcolor="#ffffff">
    <h1>Error: Bad Request</h1>
    <h2>Your client has issued a malformed or illegal request.</h2>
    <h2></h2>
  </body>
</html>
```

API 명세만 잘 따르면 됩니다.

## 배포 후 디버깅

```
hotfix/10
```

이슈 번호를 브랜치명에 붙이는 것이 좋은 전략 같습니다.

[[GitHub] Git 브랜치의 종류 및 사용법 (5가지)](https://gmlwjd9405.github.io/2018/05/11/types-of-git-branch.html)

이 블로그가 설명을 참 잘했습니다.

일단 버그를 별견했습니다.

## 환경차이

### 문제: 개발환경에서 요청을 보낼 때랑 배포환경에서 요청을 보낼 때 동작이 다릅니다.

요청: POST, `/api/auth/signup`

```json
{
  "email": "username@email.com",
  "password": "12345678"
}
```

응답:

```json
{
  "success": false,
  "msg": "Error: 이미 가입한 아이디입니다."
}
```

요청: POST, `/api/auth/signin`

```json
{
  "email": "username@email.com",
  "password": "12345678"
}
```

응답:

```json
{
  "success": false,
  "msg": "Error: 이메일이 없습니다."
}
```

### 시도: Docker가 배우고 싶어졌습니다.

#### 가설 설정도 하기 어려웠습니다.

ChatGPT 선생님에게 일단 질문했습니다.

> Deno에서 개발환경에서 oak로 요청을 보낼 때랑 Deno deploy로 배포하고 요청을 보냈을 때 동작이 다릅니다.
>
> (개발환경에서 보낸 요청응답과 배포환경에서 보낸 요청응답 차이 설명)
>
> 참고로 ENV 환경 변수 설정은 올바르게 되었습니다.
>
> (참고할 모듈 코드 블럭 올리기)

얻은 답변입니다.

> 주어진 코드를 통해 Deno 개발환경과 Deno Deploy 환경에서의 동작 차이를 파악할 수 있습니다. 문제의 원인은 Deno Deploy 환경에서 MongoDB와의 통신이 예상대로 작동하지 않는 것입니다.
>
> Deno Deploy는 클라우드 환경에서 실행되며, 이 경우에는 로컬 개발환경과는 다른 네트워크 환경과 보안 제한이 있을 수 있습니다. 이로 인해 Deno Deploy에서는 기본적으로 로컬 환경과 같은 방식으로 MongoDB에 연결하고 통신할 수 없습니다.
>
> 해결 방법은 다음과 같습니다:
>
> Deno Deploy용 백엔드 서비스 사용: Deno Deploy에서는 MongoDB와 같은 외부 서비스에 대한 직접적인 액세스가 제한되므로, Deno Deploy를 위한 백엔드 서비스를 사용해야 합니다. 이는 MongoDB를 대신하여 Deno Deploy와 호환되는 데이터베이스 서비스를 사용하거나, Deno Deploy와 통합되는 데이터베이스 서비스를 활용하는 것을 의미합니다.
>
> Deno Deploy의 환경 변수 사용: Deno Deploy에서는 환경 변수를 사용하여 데이터베이스 정보를 설정할 수 있습니다. .env 파일을 사용하여 Deno Deploy에 필요한 데이터베이스 연결 정보를 제공하고, Deno Deploy의 Deno.env.get() 메서드를 사용하여 해당 정보에 액세스할 수 있습니다.
>
> Deno Deploy용 데이터베이스 모듈 사용: Deno Deploy에서는 Deno 모듈을 사용하여 데이터베이스에 액세스할 수 있는 특정 모듈을 활용해야 합니다. MongoDB와의 통신을 위해 Deno Deploy에서 공식적으로 지원하는 모듈이 있는지 확인하고, 그에 맞게 코드를 수정해야 합니다.
>
> 위의 해결 방법 중 하나를 선택하여 Deno Deploy에서 MongoDB와의 통신을 활성화해야 합니다. 이를 통해 Deno Deploy 환경에서도 예상대로 작동하는 애플리케이션을 실행할 수 있을 것입니다.

시도해볼 수 있는 선택지는 꽤 다양해 보입니다.

가장 확실하고 노력이 많이 필요해보이는 선택지는 파이어베이스로 마이그레이션입니다. 레퍼런스도 어느정도 있습니다. 그래서 현실적이지만 나중에 시도해보고 싶습니다.

[Connect to Firebase](https://deno.com/deploy/docs/firebase)

[Deno Crash Course #5 - Integrating Deno with Firebase Firestore](https://www.youtube.com/watch?v=cgN77uI8Vuo)

리스크 테이킹을 하고 DenoKV를 선택하는 것도 방법입니다. 저 혼자 사용하고 저장할 데이터의 유형이 텍스트인데 1GB까지 지원한다고 합니다.

[Deno KV](https://deno.com/deploy/docs/kv)

언젠가 할 기능은 맞지만 현재 시도는 안 해보겠습니다. 없다고 viable 안 한것은 아닙니다.

그래서 `Deno.env.get()`로 활용하는 방법으로 우회부터 시도하겠습니다.

[erfanium / deno-deploy-mongo](https://github.com/erfanium/deno-deploy-mongo)

저랑 비슷한 이슈가 있었는데 해결한 사람 같습니다.

```ts
const { CARD_API_KEY, MONGO_URI } = config();
```

기존입니다.

```ts
const MONGO_URI = Deno.env.get("MONGO_URI")!;
const CARD_API_KEY = Deno.env.get("CARD_API_KEY")!;
```

적용입니다.

#### ReferenceError: Worker is not defined

에러가 바뀌었습니다. 또 개발환경에서도 다른 버그가 발생했습니다. 이렇게 되면 다른 문제도 있습니다. 환경 변수가 개발환경에서 `undefined`가 됩니다. 그래서 다른 시도로 일단 환경변수 접근할 때는 기존 모듈을 그대로 활용하지만 URL환경변수로 제공하는 시도했습니다.

에러는 동일합니다.

일단 GPT 선생님에게 질문하니까 이런 답변을 받았습니다.

> 주어진 정보를 토대로 분석해보면, Deno Deploy에서 발생하는 문제로 보입니다. 코드의 일부에서 `Worker`와 관련된 오류가 발생하고 있으며, 이는 Deno Deploy 환경에서 `Worker`를 지원하지 않기 때문입니다. Deno Deploy에서는 웹 워커(worker)를 사용할 수 없으므로 `Worker`를 사용하는 코드는 오류를 발생시킬 수 있습니다.
>
> 해결책으로는 다음과 같은 접근 방법을 고려할 수 있습니다:
>
> 1. `Worker`를 사용하지 않는 대안 채택:
>    Deno Deploy에서는 `Worker` 대신에 다른 방식으로 비동기 처리를 구현해야 합니다. Deno Deploy는 각 요청에 대해 독립적인 실행 환경을 생성하고, 이를 통해 요청을 처리합니다. 따라서 Deno Deploy에 맞게 코드를 리팩토링하여 `Worker`를 사용하지 않고 비동기 작업을 처리해야 합니다.
>
> 2. Oak 미들웨어와 라우터 사용:
>    Oak 프레임워크를 사용하여 Deno 애플리케이션을 개발할 때, Deno Deploy에서도 Oak를 사용할 수 있습니다. Deno Deploy에서 Oak를 사용하려면, 코드를 Deno Deploy 환경에 맞게 구성해야 합니다. Oak의 `Application` 클래스를 사용하여 Deno Deploy에 적합한 웹 애플리케이션을 작성하고, Deno Deploy의 제한사항을 고려하여 코드를 수정해야 합니다.
>
> 3. Deno Deploy의 문서와 예제 참조:
>    Deno Deploy에는 공식 문서와 예제가 제공되므로, 해당 자료를 참조하여 Deno Deploy 환경에서 애플리케이션을 개발하는 방법을 학습할 수 있습니다. 문서와 예제를 통해 Deno Deploy의 제한사항과 사용 방법에 대한 이해를 높이고, 문제를 해결하는 데 도움을 받을 수 있습니다.
>
> 위의 접근 방식을 고려하여 코드를 수정하고 Deno Deploy 환경에 맞게 애플리케이션을 구성하면, `Worker`를 사용하는 부분을 대체하고 원활한 실행을 이끌어 낼 수 있습니다.

hallucination 현상이 발생한 것 같습니다. Oak를 사용하고 있다는 컨텍스트를 제공했는데 이런 답변을 받았습니다. 또 문서참조를 요구하고 있습니다.

그래서 다음 타자 phind에게 질문했습니다.

> The error message "ReferenceError: Worker is not defined" suggests that there is an issue with the worker being defined in the deployment environment. Here are some possible solutions to this problem:
>
> - Check if the worker is defined in the deployment environment. Workers are not defined in all environments, so you need to make sure that the worker is defined in the environment you are deploying to. If it is not defined, you can try using a different environment that supports workers.
> - Try importing the required modules in the worker file. If the worker file is missing some required modules, it can cause the "ReferenceError: Worker is not defined" error. Make sure that all the required modules are imported in the worker file.
> - Check if the worker file is being loaded correctly. The worker file needs to be loaded correctly in order for the worker to be defined. Make sure that the worker file is being loaded correctly and there are no errors in the loading process.
> - Refactor the code to avoid using workers. If none of the above solutions work, you can try refactoring the code to avoid using workers. Workers are not always necessary, so you can try using a different approach to accomplish the same task.
>
> In the given code, there is no worker being defined, so the issue might be caused by other factors. Here are some possible solutions to the problem:
>
> - Check if the deployment environment has the necessary dependencies installed. The error message might be caused by missing dependencies in the deployment environment. Make sure that all the necessary dependencies are installed in the deployment environment.
> - Check if the environment variables are set correctly. The error message might be caused by incorrect environment variables in the deployment environment. Make sure that all the environment variables are set correctly in the deployment environment.
> - Check if the server is running correctly. The error message might be caused by a problem with the server. Make sure that the server is running correctly and there are no errors in the server logs.
> - Try running the code in a different environment. If none of the above solutions work, you can try running the code in a different environment to see if the problem is specific to the deployment environment.
>
> Overall, the "ReferenceError: Worker is not defined" error message suggests that there is an issue with the worker being defined in the deployment environment. However, in the given code, there is no worker being defined, so the issue might be caused by other factors.

같은 모델인데 다른 답변을 해줍니다.

#### 다른 가설들

잠시 생각하고 다른 가설들을 세워봤습니다.

1. Automatic은 기본이 READ-only
2. Allow-net으로 외부 요청이 허용되어 있지 않습니다.

1번의 문제는 get이 아닌 요청을 보내면 미들웨어 역할을 할 함수가 동작하기 전에 에러 피드백을 줘야 합니다. 하지만 토큰이 없다는 post, patch, delete 요청을 보면 미들웨어는 저의 의도대로 동작합니다.

그렇다면 이런 실험도 가능합니다. 외부에 요청할 API를 잠시 테스트용 API를 만들고 검증하는 전략입니다.

[{JSON} Placeholder](https://jsonplaceholder.typicode.com/)에 요청을 보내고 미들웨어 서버가 응답하는지 확인하면 됩니다.

```js
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => console.log(json));
```

외부 요청을 보낼 수 있게 되었습니다.

```ts
import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";

const router = new Router();

router
  .get("/api", (ctx) => {
    ctx.response.body = "hello world!";
  })
  .get("/api/secret", async (ctx) => {
    await fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => {
        ctx.response.status = 200;
        ctx.response.body = { json };
      });
  });

export default router;
```

임시로 이렇게 라우터에 추가하고 배포했습니다. 외부 네트워크 요청에는 문제가 없습니다.

다른 방법도 있습니다. 1가지 안 해본 것은 삭제하고 다시 배포하는 것입니다. 해보고 같은 에러 상태가 유지됩니다.

#### 버그 발원지 면적축소

배포환경에서 특이한 점을 발견했습니다.

```json
{
  "success": false,
  "msg": "Error: 이미 가입한 아이디입니다."
}
```

기존에 있던 버그는 그대로 유지되고 있었습니다. 가입하지 않은 POST 요청을 보내면

```ts
async function signup({ request, response }: Context) {
  try {
    if (!request.hasBody) {
      throw Error("body가 없습니다.");
    }
    const input = await request.body().value;

    if (!input.email || !input.password) {
      throw Error("이메일 혹은 비밀 번호가 없습니다.");
    }

    const document = await mongoAPI.getUser(input.email);

    if (document !== null) {
      throw Error("이미 가입한 아이디입니다.");
    } else {
      const passwordSalt = await genSalt(8);
      const passwordHash = await hash(input.password, passwordSalt);

      response.status = 201;
      response.body = await mongoAPI.postUser({
        email: input.email,
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
```

이 코드를 보면 응답을 받은 `document`는 존재하지 않은 id를 검색하면 `null`을 반환합니다. 하지만 `이미 가입한 아이디입니다.`라는 피드백을 주는 것을 보면 `document`는 `null`이 아닌 다른 값입니다. 하지만 가입한적이 없는 이메일을 body로 넣고 요청을 보냈는데 이런 요청을 보냈습니다.

```ts
console.log(null !== undefined); // true
```

저의 추론은 `document`는 `undefined`을 반환합니다.

```ts
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
```

그 다음은 이 부분이 문제입니다. `data.document`가 `undefined`가 된다는 것입니다. 여기서 다음 의문은 data는 일단 객체로 존재한다는 것입니다. 그 중에 `document`라는 프로퍼티가 없다는 것입니다.

그래서 수정을 해보고 직접 실험을 해봤습니다.

```ts
async function signup({ request, response }: Context) {
  try {
    if (!request.hasBody) {
      throw Error("body가 없습니다.");
    }
    const input = await request.body().value;

    if (!input.email || !input.password) {
      throw Error("이메일 혹은 비밀 번호가 없습니다.");
    }

    const document = await mongoAPI.getUser(input.email);
    if (document === undefined) throw Error("document is undefined");

    if (document !== null) {
      throw Error("이미 가입한 아이디입니다.");
    } else {
      const passwordSalt = await genSalt(8);
      const passwordHash = await hash(input.password, passwordSalt);

      response.status = 201;
      response.body = await mongoAPI.postUser({
        email: input.email,
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
```

이렇게 수정하고 다시 `merge`했습니다. 하지만 `이미 가입한 아이디입니다.` 응답은 동일했습니다.

이렇게 해도 응답이 `이미 가입한 아이디입니다.`이었습니다. 그래서 응답을 직접 관측하기로 했습니다.

```ts
async function signup({ request, response }: Context) {
  try {
    if (!request.hasBody) {
      throw Error("body가 없습니다.");
    }
    const input = await request.body().value;

    if (!input.email || !input.password) {
      throw Error("이메일 혹은 비밀 번호가 없습니다.");
    }

    const document = await mongoAPI.getUser(input.email);
    if (document === undefined) throw Error("document is undefined");

    if (document !== null) {
      throw Error(`이미 가입한 아이디입니다. ${document.email}`);
    } else {
      const passwordSalt = await genSalt(8);
      const passwordHash = await hash(input.password, passwordSalt);

      response.status = 201;
      response.body = await mongoAPI.postUser({
        email: input.email,
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
```

가설이 검증 되었습니다. `undefined`가 맞았습니다. `document`는 아마 어떤 객체일 것 같습니다.

#### mongoDB get 요청

```ts
  .get("/api/secret", async (ctx) => {
    const mongoAPI = MongoAPI.getInstance();

    ctx.response.status = 200;
    ctx.response.body = await mongoAPI.getAllCards();
  });
```

일단 이렇게 작성했습니다. getAllCards 요청을 보내면 보안 취약점입니다. 프로덕션 코드에서 이렇게 하면 큰일납니다.

하지만 일단 merge하고 ENV 설정 보니까 일단 동작합니다. get 요청에는 성공적입니다.

#### 가설: 문제는 bcrypt이다.

mongoDB 클라우드와 연결문제가 아니라는 것을 검증했습니다. `ReferenceError: Worker is not defined`에러가 발생한다는 것은 통신 문제가 아니라 라이브러리 활용 문제라는 것을 파악했습니다. `bcrypt`은 상당히 작은 규모의 라이브러리입니다.

추론이지만 [worker](https://deno.land/x/bcrypt@v0.4.1/src/worker.ts) 모듈이 존재합니다.

[BCrypt](https://deno.land/x/bcrypt@v0.4.1)를 확인하니까 다음과 같은 설명이 있습니다.

> The Async implementation requires WebWorkers which require `--allow-net` to import Deno standard modules from inside the Worker.

가설은 검증되었습니다. 다음은 대응책입니다. 2가지 선택지가 있습니다. 하나는 권장하지 않는 비동기화 다른 하나는 권장하는 방식을 따르지만 `--allow-net`으로 배포를 설정하는 것입니다.

검색을 더 해보는 과정에서 저랑 비슷한 에러를 겪은 사람들이 있습니다.

[Deno Deploy Support](https://github.com/JamesBroadberry/deno-bcrypt/issues/26)

```ts
import {
  hash as hashPromise,
  hashSync,
  compare as comparePromise,
  compareSync,
} from "https://deno.land/x/bcrypt/mod.ts";

export const isRunningInDenoDeploy = Deno.permissions?.query === undefined; // This is crude check for if the code in running in Deno Deploy. It works for now but may not work in the future.

export const hash: typeof hashPromise = isRunningInDenoDeploy
  ? (plaintext: string, salt: string | undefined = undefined) =>
      new Promise((res) => res(hashSync(plaintext, salt)))
  : hashPromise;
export const compare: typeof comparePromise = isRunningInDenoDeploy
  ? (plaintext: string, hash: string) =>
      new Promise((res) => res(compareSync(plaintext, hash)))
  : comparePromise;
```

이런 코드를 발견했습니다. 저는 genSalt도 추가해야 하기 때문에 다음으로 응용했습니다.

```ts
// util/customBcrypt.ts
import {
  hash as hashPromise,
  hashSync,
  compare as comparePromise,
  compareSync,
  genSalt as genSaltPromise,
  genSaltSync,
} from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

export const isRunningInDenoDeploy = Deno.permissions?.query === undefined; // This is crude check for if the code in running in Deno Deploy. It works for now but may not work in the future.

export const hash: typeof hashPromise = isRunningInDenoDeploy
  ? (plaintext: string, salt: string | undefined = undefined) =>
      new Promise((res) => res(hashSync(plaintext, salt)))
  : hashPromise;

export const compare: typeof comparePromise = isRunningInDenoDeploy
  ? (plaintext: string, hash: string) =>
      new Promise((res) => res(compareSync(plaintext, hash)))
  : comparePromise;

export const genSalt: typeof genSaltPromise = isRunningInDenoDeploy
  ? (plaintext: number | undefined) =>
      new Promise((res) => res(genSaltSync(plaintext)))
  : genSaltPromise;
```

저는 이렇게 변경했습니다. deno의 한계를 배운 부분입니다.

하지만 또 다른 문제가 또 있었습니다. 바로 `const isRunningInDenoDeploy = Deno.permissions?.query === undefined`부분입니다.

이슈 아래를 보니까 `const isRunningInDenoDeploy = (globalThis as any).Worker === undefined;`로 해결하신 분도 있었습니다.

적용하고 성공했습니다.

아래는 다른 가설 후보 및 문제 해결 방법들이었습니다.

> - https://glitch.com/로 배포하기
> - mongo client 활용하기
> - 가설: 응답을 받은 클라이언트 즉 thunder client에 worker가 없어서 생기는 문제인가?
> - docker가 필요합니다.

### 해결: Workerless Bcrypt

```ts
// util/customBcrypt.ts
import {
  hash as hashPromise,
  hashSync,
  compare as comparePromise,
  compareSync,
  genSalt as genSaltPromise,
  genSaltSync,
} from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const isRunningInDenoDeploy = (globalThis as any).Worker === undefined; // This is crude check for if the code in running in Deno Deploy. It works for now but may not work in the future.

export const hash: typeof hashPromise = isRunningInDenoDeploy
  ? (plaintext: string, salt: string | undefined = undefined) =>
      new Promise((res) => res(hashSync(plaintext, salt)))
  : hashPromise;

export const compare: typeof comparePromise = isRunningInDenoDeploy
  ? (plaintext: string, hash: string) =>
      new Promise((res) => res(compareSync(plaintext, hash)))
  : comparePromise;

export const genSalt: typeof genSaltPromise = isRunningInDenoDeploy
  ? (plaintext: number | undefined) =>
      new Promise((res) => res(genSaltSync(plaintext)))
  : genSaltPromise;
```

이렇게 util 함수를 만들고 소비하는 곳에 모두 이 함수로 교체했던니 문제가 풀렸습니다. 당연히 애매입니다.

Deno에 Worker가 생기기 전까지 아마 유지해야 할 것 같습니다. 또 라이브러리 운영자도 해당 이슈를 남긴다고 했습니다.

### 학습: 디버깅은 공학보단 과학처럼

1. 개발환경과 배포환경은 다릅니다. 환경을 통일시키는 방법을 찾도록 합니다.

- 이런 이유로 Docker로 환경을 통합해야 합니다. 그래서 Docker를 배우고 싶어졌습니다.
- Worker가 처음부터 없던 개발환경에서 구현했으면 `Deno.env`로 개발하고 `bcrypt`도 바로 디버깅했을 것입니다.

2. 개발환경과 배포환경 각각 환경변수를 읽기 위한 방법이 다릅니다.

```ts
// 개발환경
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const { CARD_API_KEY, MONGO_URI } = config();
```

```ts
// 배포환경
const MONGO_URI = Deno.env.get("MONGO_URI")!;
const CARD_API_KEY = Deno.env.get("CARD_API_KEY")!;
```

환경마다 환경변수를 접근하는 방법을 다르게 해야 합니다.

3. 배포는 조기에 합시다.

조기에 배포했으면 이 버그는 조기에 대응가능 했을 것입니다.

4. 디버깅할 때는 글을 쓰면서 합니다.

- 디버깅은 공학보단 과학입니다.
- 가설을 설정하고 검증 혹은 기각하면서 현상을 분석합니다.
- 기록해가면서 진행하면 했던 행동을 나중에 다시 반복하지 않습니다.
- 가설을 기각하면 버그의 발원지 면적을 축소한 것입니다.
- 가설을 검증하면 버그를 찾고 대응할 수 있는 것입니다.

5. Deno에는 Worker가 없습니다.

- Worker가 없어서 bcrypt 라이브러리를 애매로 개조해야 합니다.

## 오늘 얻은 일상에서 팁

멍청한 것은 괜찮다. 게으른 것은 문제다.

<iframe class="codepen" src="https://www.youtube.com/embed/D1sGvTU-sZU" title="Software Engineering Anxiety | Prime Reacts" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

문제를 풀어보는 중간에 가끔은 패배를 인정하고 질문을 해도 됩니다.

질문해서 멍청해 보이는 것에 화를 내는 사람은 자신도 멍청해 보이는 것에 화내는 사람입니다. 뛰어난 개발자들이 근무하고 있는 넷플릭스에서도 멍청한 질문을 합니다.

<iframe class="codepen" src="https://www.youtube.com/embed/7FKvrqg636o" title="Engineering Managers: An Important Conversation" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

회사에서 의도적으로 하루 2개 멍청한 질문하도록 요구합니다. 좋은 의도 같습니다. 신입개발자가 멍청한 질문을 의도적으로 멍청해 보이는 것으로 부터 스스로 가리는 행위를 막습니다.

---

## 발견한 Deno 프레임워크

[Dero](https://dero.herudi.workers.dev/#/)

[DestJS](https://deno.land/x/destjs@v0.2.0)

---

## 글을 써서 생각하고 생각하기 위해 글을 씁시다.

<iframe class="codepen" src="https://www.youtube.com/embed/vtIzMaLkCaM" title="LEADERSHIP LAB: The Craft of Writing Effectively" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

이 강의에서 배운 것 중 하나입니다. 순환적으로 접근합니다. 블로그를 수단으로 제가 하는 작업을 더 깊게 생각할 수 있었습니다.

---

## 리액트 테스트 전략

리액트를 활용해서 MVC 패턴으로 관심사를 분리하는 것은 가능합니다. 관심사를 분리하면 관심사별로 테스트를 작성하기 수월해집니다.

테스트를 잘 작성하기 전에 먼저 관심사를 분리하는 개념부터 갖고 있어야 합니다. JSX는 View를 담당해야 하고 hook은 Controller를 담당합니다. Props와 State는 Model을 담당하는데 class 인스턴스로 생성해서 제어하도록 합니다. Model에서 어떻게 갱신할지에 대한 로직을 모두 갖고 처리합니다.

### 컴포넌트를 테스트하는 방법

조건별로 올바르게 랜더링하는지 테스트하면 됩니다.

### Model을 테스트하는 방법

리액트가 아닌 전통적인 테스트방법을 그대로 적용하면 됩니다.

### hook을 테스트하는 방법

hook에 대한 테스트가 성공하면 결합테스트에서 비중을 많이 차지하는 부분 중 하나가 된 것입니다.

hook을 테스트할 때 고려해야 할 점들이 있습니다. hook은 이벤트를 처리하는 함수들이 있고 이 이벤트가 어떻게 state 변형하는지 검증이 필요합니다. 즉 조건은 함수의 실행이고 검증할 결과는 state가 가져야할 값입니다.

### API를 테스트하는 방법

백엔드 엔지니어가 이미 API 명세까지만 진행했으면 테스트로 얻을 수 있는 이익이 더 많습니다.

MSW로 통신을 테스트하는 것이 일반적입니다. 특정 엔드포인트가 어떻게 동작해야 할지 사전에 설정하고 테스트를 작성하고 구현합니다.

### 결합테스트

프론트엔드 엔지니어로서 가장 작성을 많이해야 하는 테스트는 결합 테스트입니다.

결합테스트는 위 4가지 테스트 분야 중 각각 1개를 섞어서 작성하면 됩니다.

API 통신에 따라 컴포넌트 랜더링은 어떻게 다르게 할지 정할 수 있습니다.

Model이 올바르게 요청을 보낼 수 있는 형식인지 검증해볼 수 있습니다.

hook 이 통신을 올바르게 데이터를 처리하는지 검증해볼 수 있습니다. hook이 컴포넌트, model, API와 결합했을 때 올바르게 처리하는지 검증해볼 수 있습니다.
