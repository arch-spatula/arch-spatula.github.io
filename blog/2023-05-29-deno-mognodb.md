---
title: deno, axios, mongoDB 에러 미제사건
authors: [arch-spatula]
tags: ["deno", "axios", "mongoDB"]
description: deno 런타임에서 axios로 mongoDB랑 통신하는데 에러가 계속됩니다.
toc_max_heading_level: 6
draft: false
---

deno 런타임에서 axios로 mongoDB랑 통신하는데 에러가 계속됩니다. mongoDB API 문서를 잘 숙지하지 않고 있어서 발생하는 문제 같습니다.

<!--truncate-->

# deno 통신

## deno 통신

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

### 해결: fetch 싱글튼

- fetch로 다시 작성해보니까 get, post 모두 정상동작했습니다.

### 학습: 왜 Post인가?

- mongoDB를 fetch로 요청할 때는 모든 것이 Post입니다.
  - 의문인 것은 왜 모든 요청이 Post인가? 아직 답을 모르겠습니다.
