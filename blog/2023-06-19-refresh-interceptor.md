---
title: '토큰 갱신 처리하기'
authors: [arch-spatula]
tags: ['auth', 'token', 'axios', 'jotai', 'refresh']
description: '토큰 갱신을 위해서 interceptor를 구현한 이야기입니다.'
toc_max_heading_level: 6
---

# 토큰 갱신 처리하기

토큰을 갱신하는 추가 요청을 보내는 interceptor를 활용하는 이야기입니다. 프론트엔드가 처리해야 하는 작업은 이부분이 대부분입니다. 백엔드는 다른 작업들 더 해줘야 합니다.

<!--truncate-->

## 이 글이 왜 필요한가?

검색을 해보면 velog에서 많이 다룬 주제입니다.

이 글이 필요한 이유입니다. 언젠가 새로운 서비스를 또 만들면 또 인증관련 처리가 필요합니다. 이거 다시보면 됩니다.

## 왜 token 갱신이 필요한가?

이 token 갱신이 필요한 이유는 보안상 이유가 첫번째입니다. 유저가 본인이 본인이라는 것을 인증하기 위한 전략 중 하나입니다. 다른 전략은 session입니다. 전략 자체는 대표적으로 이 2가지 중 1가지를 고르면 됩니다. 서버의 부담은 session이 더크고 보안이 더 철저합니다. session은 클라이언트의 set-cookie를 활용하고 http-only에 CORS 설정해서 session id를 보관하도록 합니다. 요청을 받으면 cookie를 확인하고 DB를 조회하고 남은 작업을 처리합니다. 반면 token을 활용하면 서버는 복화처리만 하면 되기 때문에 부하가 더 적습니다. 조회로 발생하는 비용이 복호화 비용보다 비쌉니다. 그리고 token의 경우 session id 대신에 refresh token을 보관하도록 하고 access token을 인메모리, local storage, session storage 중 1곳에 저장합니다. 참고로 인메모리의 경우 새로고침하면 사라져서 서버에 재요청 비용이 발생할 것입니다.

UX/UI 관점에서 필요한 이유는 인증 노력비용을 아껴줘야 합니다. 생각을 깊게 하지않고 access token 유효 기간을 짧게 하면 유저의 action cost가 크게 증가합니다. 만약의 프로덕트에 유저 트레커를 달아두고 대부분 유저의 하루 평균 체류시간이 1시간인데 10분마다 재로그인 입력을 해야 하면 action cost 관점에서 상당히 나쁩니다. 체류시간을 반영해서 유효기간을 늘리는 전략도 있지만 보안상의 이유를 생각하면 access token 갱신을 내부적으로 자동 처리하는 것이 action cost를 0으로 감소시킬 수 있을 것입니다.

### 참고

저의 제품은 refresh token은 갱신시키지 않기로 했지만 요구사항에 따라 refresh token도 갱신하게 만드는 경우도 많이 있습니다.

처음 시작할 때 유효기간의 어림잡기는 개발자와 PM이 같이 결정하면 됩니다. 그리고 서비스에 유저 데이터가 쌓이고 트레커로 체류시간 정보를 알 수 있으면 체류시간 정보를 활용해서 2개의 token 유효기간을 다시 설정하도록 합니다.

## 타임라인

시간은 인간이 만들어낸 개념이고 허상에 불과합니다.

처음 배울 때는 보통 혼란스럽습니다. 저는 머리가 나쁜 편이라 혼란스러웠습니다.

타임라인을 간단하게 보면 아래와 같습니다.

![token 타임라인](https://user-images.githubusercontent.com/84452145/248524296-fdaf3d69-e8c6-4527-85c6-9805fafa5152.png)

access token을 확인하고 유효하면 응답합니다. access token이 만료되었고 refresh token이 유효하면 access token을 갱신할 수 있는 window입니다~~window 운영체제 말고 한정된 시간동안 무엇을 할 기회를 말하는 영어식 표현~~. 꽤 길게 제공합니다. 이 기간이 만료되었을 때 refresh 요청 혹은 access 요청에 로그아웃 처리할 수 있습니다. 백엔드 엔지니어의 재량의 영역이지만 프론트엔드가 갱신요청을 하도록 만들 수 있고 아니면 그냥 갱신된 access token을 응답으로 주는 경우도 있습니다. 사실 프론트엔드 엔지니어가 여기서 고생하주면 해커는 더 많은 고생을 해야 하기 때문에 프론트엔드가 axios interceptor를 활용해서 처리하는 경우가 많습니다.

하지만 위 시각자료만 보면 이해가 덜 될 것입니다. 그래서 조금 더 자세히 부분별로 도식화 하겠습니다.

![login](https://user-images.githubusercontent.com/84452145/252542176-dfff4b8a-0af9-46c2-9f8f-44eeb151f4af.png)

일반적인 login입니다. 유저는 이메일과 비밀번호를 담아 서버에 POST 요청을 하고 유효함을 확인(인증)하면 token 2개를 응답합니다. 이 token 2개는 일반적이고 정석인 상황은 위에서 이야기 한 것처럼 refresh token은 set-cookie하고 CORS 설정으로 다른 도메인 요청을 차단하고 http-only 설정으로 자바스크립트로 접근을 차단하는 것이 일반적입니다. 그리고 access token은 보유한 인프라와 정책에 따라 다르지만 웹 스토리 혹은 인메모리 보관을 합니다.

여기서 중요한 것은 refresh, access token을 생성해서 클라이언트에게 전달합니다. 출발은 여기서부터입니다.

기간 구조를 보면 3가지 경우의 수가 있습니다. access token 유효, refresh token 유효, refresh token 만료

### access token 유효

![access token - 유효한](https://user-images.githubusercontent.com/84452145/252547838-f39b51cd-6d07-48f9-a255-76ca772d67d6.png)

서버는 인가받은 유저의 요청에서 다양한 정보를 확인해야 하지만 보통 refresh token을 cookie에서 확인하고 access token을 header에서 확인합니다. 유저의 cookie가 존재하지 않으면 로그아웃처리합니다. 복호화 검증은 아직 필요한 시점은 아닙니다. access token을 복화하고 활용합니다. 주로 유저의 프라이머리 키(uuid)를 복호화해서 얻고 이 키를 로직에 활용합니다. 유저 본인 정보를 조회하거나 본인이 생성한 정보를 편집할 수 있을 때 사용합니다.

```ts title="AxiosClient.ts"
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { BASE_URL, STORAGE_KEY } from '../constant/config';

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    const configCopy = { ...config };
    if (token) configCopy.headers.Authorization = `Bearer ${token}`;
    else throw new Error('token이 없습니다.');

    return configCopy;
  },
  (error) => Promise.reject(error)
);

export { axiosClient };
```

인가받아야 하는 모든 요청은 axiosClient를 통해서 처리하도록 합니다. 저의 경우 불필요한 서버 부하를 낮추고 추가 Edge 서버를 만들 줄 몰라서 일단 유저의 access token을 localStorage에 보관하도록 했습니다. 그리고 모든 요청을 보낼 때 죄하고 header에 설정해서 보내도록 했습니다.

### refresh token 유효

이 경우 로직을 처음 보면 복잡할 것입니다. 또 성능도 꽤 않 좋습니다. request-response 사이클을 3회 정도 오게가 됩니다.

![](https://user-images.githubusercontent.com/84452145/252550472-4adb0b36-fb8a-49b0-b6c2-02b43a2186f6.png)

본인에 해당하는 card 리소스를 요청하고 access token이 만료된 상황이면 refresh 요청을 보내야 합니다. refresh는 백엔드에서 단순하게 access token을 다시 만드는 것입니다.

```ts
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { BASE_URL } from '../constant/config';

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ... 생략

axiosClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    // 기존 설정, status code 접근
    const {
      config,
      response: { status },
    } = err;

    // 401이 아닌 경우, 재요청 실패
    if (status !== 401 || config.sent) {
      return Promise.reject(err);
    }

    config.sent = true; // 재요청 여부 flag 활성화
    const accessToken = await refreshAccessAPI(); // access token 갱신 요청
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // 새 access token 설정
    }
    return axiosClient(config); // 기존 요청 재시도
  }
);
```

아까 예시는 request할 때마다 처리하는 interceptor이지만 지금 예시는 응답마다 처리하는 interceptor입니다.

`use` 메서드를 보면 2가지 콜백함수를 대입합니다. 첫째는 성공이고 둘째는 에러를 처리 할 수 있습니다. 여기서 중요한 것은 에러일 때 처리입니다.

에러는 발생할 것인데 에러마다 다양한 상황을 대응(가드)해야 합니다. 에러가드는 3가지 경우 중 1개라도 해당하면 일반 에러로 취급하게 하고 `Promise.reject`를 반환하고 interceptor를 종료해야 합니다.

- 401이 아닌 경우(`status !== 401`)는 해당 영역에서 알아서 처리하도록 합니다. 이 interceptor에서 처리하는 것은 적절한 관심사가 아닙니다.
  - 참고로 [401은 권한 없음](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/401)을 의미합니다.
  - 실무에서 백엔드 엔지니어가 200번대 응답을 돌려주는 곳이 대부분이라는 것이 충격이기는 하지만 그렇게 되면 에러 메시지에서 알아서 해결하기 바랍니다.
  - ~~백엔드 엔지니어링 못하는 저도 200번대 응답은 안했습니다.~~
  <!-- - refresh 실패(`config.url === API_URLS.REFRESH`)입니다. 백엔드 엔지니어가 refresh 엔드포인트를 제공해주면 해당 url에 요청을 보낸고 또 실패하면 interceptor를 종료합니다. -->
- 401을 받고 실패한 동일한 요청을 재시도 했을 때 실패(`config.sent`)하면 `Promise.reject`를 반환하고 interceptor를 종료합니다.

위 3가지 가드를 통과(해당하지 않으면)하면 다음 로직들을 처리합니다. `config.sent`에 `true`를 할당해서 flag를 활성화부터 합니다. 그리고 refresh 요청을 합니다. refresh 요청하는 함수는 아래입니다.

```ts title="authClient.ts"
/** - API 명세의 요구사항 때문에 authClient 중 유일하게 header를 활용해야 함 */
async function refreshAccessAPI() {
  try {
    const sessionToken = sessionStorage.getItem(STORAGE_KEY.SESSION_TOKEN);
    if (!sessionToken) throw Error('sessionToken');

    const {
      data: { access_token },
    } = await authClient.post<{
      success: boolean;
      access_token: string;
    }>(API_URLS.REFRESH, null, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, `${access_token}`);

    return access_token;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_KEY.SESSION_TOKEN);
    redirect(ROUTE_PATHS.SIGN_IN);
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
}
```

이부분에서 특수성을 갖는 것은 `session storage`를 접근합니다. refresh token을 `cookie`에 보관할 수 없는 이유는 프론트엔드는 vercel로 배포하고 백엔드는 Deno deploy로 배포했서 origin이 다르기 때문에 `cookie`를 클라이언트에서 서버로 보낼 수 없습니다.

만약에 기술스택으로 Next.js를 선택하고 vercel하나를 활용했다면 origin 문제는 없었을 것입니다.

위 3가지 중 3번은 다음 코드를 보면 이해가 될 것입니다.

### refresh token 만료

핵심 로직은 아래와 같습니다.

![](https://user-images.githubusercontent.com/84452145/252550875-caddfa97-3952-46dc-b86f-02b6e546cd04.png)

401에러가 발생하면 갱신요청을 진행할입니다. 만약에 갱신 요청이 실패하면 refresh token이 만료된 것으로 가정하고 로그아웃 처리를 했습니다.

물론 서버에 장애가 발생할 수 있지만 장애가 발생해도 비슷한 처리를 하는 것이 적절하다고 봅니다. 리소스 갱신과 조회를 반영할 수 없다면 사용을 중단시키는 것이 적절하다고 봤습니다.

```ts title="authClient.ts"
/** - API 명세의 요구사항 때문에 authClient 중 유일하게 header를 활용해야 함 */
async function refreshAccessAPI() {
  try {
    const sessionToken = sessionStorage.getItem(STORAGE_KEY.SESSION_TOKEN);
    if (!sessionToken) throw Error('sessionToken');

    const {
      data: { access_token },
    } = await authClient.post<{
      success: boolean;
      access_token: string;
    }>(API_URLS.REFRESH, null, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, `${access_token}`);

    return access_token;
  } catch (error) {
    // highlight-start
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_KEY.SESSION_TOKEN);
    redirect(ROUTE_PATHS.SIGN_IN);
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    // highlight-end
  }
}
```

다시 코드를 보면 에러 처리 부분입니다. 실패하면 try-catch에서 catch 블럭을 실행합니다. 여기서 해당하는 key만 삭제하는 이유는 email에 대한 localStorage는 보존하기 위함입니다.

### 로직

![](https://user-images.githubusercontent.com/84452145/252534777-b2560c85-23d4-4e01-85e0-587d45b00828.png)

### 여기서 의문: Jotai의 atomStorage를 사용하지 않은이유는?

Jotai가 제공한 편의기능이지만 편한 경우보다 불편한 경우가 더 많았습니다. 즉 코드 작성하면서 배보다 배꼼이 더 큰 경우가 더 많았습니다. Jotai가 atom을 web storage에 보관할 때는 큰따옴표(`"`)로 감쌉니다. hook이 아닌 context에서 큰따옴표 관련된 처리를 hook인 context에서 더 많이 처리했습니다. 이 큰따옴표 제거 처리를 위해서 `slice`, `replace` 적용하는 것은 낭비가 너무 많은 것 같습니다.

<!-- 직접 구현하면서 제가 만든 백엔드에도 문제가 있었습니다. 원래 401에러를 돌려줘야 하는데 406에를 돌려주고 있었습니다.

오늘 배운 것 중 하나는 테스트 코드에는 status code도 포함해서 테스트 해야한다는 것입니다. 일단 msw를 보류하기 잘한 것 같습니다. 저의 백엔드 엔지니어링을 신뢰할 수 없습니다.

https://github.com/arch-spatula/flash-card-frontend/pull/42

https://github.com/arch-spatula/flash-card-backend/pull/46

프론트엔드 백엔드 모두 결합테스트가 필요합니다.

그리고 요청관련 함수는 그냥 button에 따로 구현하는 것이 정신 건강에 좋은 것 같습니다. -->

<!-- 이상 오늘 2시간 짜리 삽질이었습니다. -->

## 참고자료.

[axios interceptors와 refresh token을 활용한 jwt 토큰 관리](https://gusrb3164.github.io/web/2022/08/07/refresh-with-axios-for-client/)
