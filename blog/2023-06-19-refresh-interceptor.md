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

검색을 해보면 velog에서 많이 다룬 주제입니다. 그만큼 프론트엔드 업무에서 기초적인 내용입니다. 또 분명 저보다 더 설명 잘한 사람들이 많을 것입니다.

이 글이 필요한 이유입니다. 언젠가 새로운 서비스를 또 만들면 또 인증관련 처리가 필요합니다. 저는 저의 글부터 찾아보기 위해 필요합니다.

## 왜 token 갱신이 필요한가?

보안을 유지하면서 UX 해치지 않기 위해 필요합니다.

access token은 유효기간을 보통 짧게 제공합니다. 해커가 탈취에 성공해도 짧은 유효기간이 너무 짧으면 악용하기 어렵도록 만든 의도입니다. 하지만 이렇게 되면 UX적인 문제가 생깁니다. 유효기간이 너무 짧으면 유저가 다시 로그인(재인증)하는 노력이 필요합니다. 체류시간이 긴 서비스에 이런 방식으로 보안을 적용하면 유저가 다른 서비스로 이탈할 가능성이 높습니다. 하지만 refresh token으로 재인증하면 action cost 0으로 만들 수 있습니다.

access token이 만료되면 만료 응답을 intercept하고 refresh 요청해서 token을 갱신하고 만료로 실패한 기존요청을 재시도합니다. 유저의 action cost를 2번의 request-response 사이클로 교환하는 것입니다.

### 참고

저의 서비스는 refresh token은 갱신시키지 않기로 했습니다. 하지만 여러분은 요구사항에 따라 refresh token도 갱신하게 만드는 경우도 필요해질 수 있습니다.

처음 시작할 때 유효기간의 어림잡기는 개발자와 PM이 같이 결정하시기 바랍니다. 나중에 유저 데이터가 쌓이고 트레커로 체류시간 정보를 알 수 있으면 체류시간 정보를 활용해서 2개의 token 유효기간을 다시 설정하기 바랍니다.

<!-- ### token 인증/인가를 활용하는 이유

token을 활용하는 이유는 서버 부하가 덜 발생하기 때문에 활용합니다. 이 질문 token refresh보다 더 high level입니다.

인가 상태부터 논하겠습니다. 가장 먼저 인가 상태를 어디에 보관하는가의 문제가 있습니다. http는 상태가 없습니다. 모든 요청과 응답 즉 통신자체는 서로 독립적입니다. 인가 상태는 통신을 주고 받는 클라이언트 혹은 서버에서 보관해야 합니다. 그리고 이 인가 상태관리 전략은 대표적으로 2가지가 존재합니다. 하나는 session 다른 하나는 token입니다. 아주 간단하게는 session은 서버가 상태관리하고 token은 클라이언트가 관리한다고 생각할 수 있습니다. 그리고 cookie는 이 인가를 위한 매개체입니다.

먼저 cookie입니다. cookie는 정보를 상당히 안전하게 보관할 수 있습니다. token이든 session이든 set-cookie 응답을 활용하는 것이 일반적입니다. set-cookie응답을 할 때 http-only 설정으로 클라이언트가 자바스크립트 접근하는 것을 차단합니다. 또 cookie는 브라우저 정책으로 서버와 다른 origin을 갖고 있으면 자동으로 삭제하고 요청을 보냅니다. 즉 다른 origin을 갖고 있으면 cookie로 정보를 공유할 수 없습니다.

session입니다. session은 인가 상태를 서버에서 관리합니다. 이런 이유로 서버의 부담이 더있지만 일반적으로 더 안전합니다. session은 클라이언트의 로그인(인증) 요청을 받고 인증되면 session DB에 `sessionId`, `Date`(생성 시점), `userId`를 만들고 `sessionId`를 set-cookie로 응답합니다. 클라이언트 요청을 받을 때마다 cookie를 확인하고 session DB를 조회하는 방식으로 인가하고 남은 서버측 로직을 처리합니다.

token입니다. token은 인증 상태를 클라이언트에서 관리합니다. token을 활용하면 서버는 암호화(token 생성)와 복호화(token 검증)처리만합니다. token을 활용할 때는 2개의 token(refresh token, access token)을 각각 보안상 상호보완적인 위치에 보관합니다. refresh token은 cookie에 보관합니다. access token은 인메모리, local storage, session storage 중 1곳에 저장합니다. 참고로 인메모리의 경우 새로고침하면 사라져서 서버에 재요청 비용이 발생할 것입니다. 이런 이유로 web storage를 많이 활용합니다. 그리고 모든 요청을 보낼 때는 access token을 검증합니다. 하지만 만료되면 refresh token으로 access token을 갱신하는 방식입니다.

token의 장점은 인가 상태관리가 클라이언트 측에서 많이 처리하기 때문에 서버부담이 줄어듭니다. 또 session DB 사이즈 문제도 없습니다. -->

## 타임라인

<!-- 시간은 인간이 만들어낸 개념이고 허상에 불과합니다. 시간은 없고 시공간이 존재합니다. -->

저는 처음 배울 때는 보통 혼란스럽습니다. 참고로 저는 이 쉬운게 혼란스러울 정도로 머리가 나쁜 편입니다. 그래서 여러분은 한번에 캐치해야 합니다.

타임라인을 간단하게 보면 아래와 같습니다.

![token 타임라인](https://user-images.githubusercontent.com/84452145/248524296-fdaf3d69-e8c6-4527-85c6-9805fafa5152.png)

위 시각자료는 시간에 따라 허용된 권한이라고 이해하면 됩니다.

access token을 확인하고 유효하면 응답합니다. access token이 만료되었고 refresh token이 유효하면 access token을 갱신할 수 있는 시간입니다. 일반적으로 꽤 길게 제공합니다. 이 기간이 만료되었을 때 refresh 요청 혹은 access 요청에 로그아웃 처리할 수 있습니다. 백엔드 엔지니어의 재량의 영역입니다. 백엔드 엔지니어가 프론트엔드 엔지니어 보고 갱신요청을 하도록 만들 수 있고 아니면 그냥 갱신된 access token을 응답으로 주는 경우도 있습니다.

### 참고. 인증

특정 요청에 token을 포함해서 주고받는 것은 인가이고 인가 전에 인증이 필요합니다. 인증을 받아야 token을 받을 수 있기 때문에 간단하게 이해해보겠습니다.

![login](https://user-images.githubusercontent.com/84452145/252848033-71d56f74-1ab0-4811-ba84-a0a980b60d51.png)

일반적인 login입니다. 유저는 이메일과 비밀번호를 담아 서버에 POST 요청으로 출발합니다. 서버가 요청을 받으면 이메일이 있는지 조회를 합니다. 없으면 없다는 응답을 하고 있으면 해당하는 이메일의 hash와 salt를 찾습니다. 그리고 유저가 전송한 비밀번호와 hash, salt를 활용해서 일치를 확인합니다. 불일치하면 불일치 응답하고 일치하면 token 2개로 응답합니다.

이 token 2개는 일반적이고 정석인 상황은 위에서 이야기 한 것처럼 refresh token은 set-cookie하고 응답합니다. 이 응답에서 2가지 설정이 중요합니다. http-only 설정으로 자바스크립트 접근을 차단합니다. secure 설정으로 응답하는 cookie를 암호화합니다. 참고로 CORS 설정은 cookie랑 무관합니다. cookie는 origin이 다르면 브라우저에서 요청할 때 cookie를 삭제하고 요청을 보냅니다.

여기서 중요한 것은 refresh, access token을 생성해서 클라이언트에게 전달합니다. 인가의 출발은 여기서부터입니다.

기간을 보면 3가지 경우의 수가 있습니다. access token 유효, refresh token 유효, refresh token 만료입니다.

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

인가받아야 하는 모든 요청은 `axiosClient`를 통해서 처리하도록 합니다. 인가가 필요 없는 요청과 구분하기 위해서 2개의 client 설정을 했습니다. 다른 하나는 나중에 볼 수 있습니다. `axiosClient`를 활용해서 보내는 모든 request는 요청 전에 `localStorage`를 확인하고 `header`의 `Authorization`에 담아 보냅니다. 메모리에 저장하는 전략도 존재하지만 새로고침에 새 token을 또 받아야 하는 번거로움이 있습니다.

### refresh token 유효

이 경우 로직을 처음 보면 복잡할 것입니다. 또 성능도 나쁩니다. request-response 사이클을 3회 정도 오게가 됩니다.

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
type TokenResponse = {
  success: boolean;
  access_token: string;
};

async function refreshAccessAPI() {
  try {
    const sessionToken = sessionStorage.getItem(STORAGE_KEY.SESSION_TOKEN);
    if (!sessionToken) throw Error('sessionToken 없음');

    const {
      data: { access_token },
    } = await authClient.post<TokenResponse>(API_URLS.REFRESH, null, {
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

이부분에서 특이한 점은 `Cookie`를 사용할 수 없다는 것입니다. refresh token을 `cookie`에 보관할 수 없는 이유는 프론트엔드와 백엔드 각각 개별 배포했기 때문입니다. 프론트엔드는 vercel로 배포하고 백엔드는 Deno deploy로 배포했습니다. 그래서 origin이 다르고 설정으로 통일 할 수 없습니다. 서버에서 클라이언트로 set-cookie response는 가능하지만 클라이언트에서 `cookie`를 서버로 보낼 수 없습니다.

만약에 기술스택으로 Next.js를 선택하고 vercel하나를 활용했다면 origin 문제는 없었을 것입니다.

<!-- 위 3가지 중 3번은 다음 코드를 보면 이해가 될 것입니다. -->

### refresh token 만료

핵심 로직은 아래와 같습니다.

![](https://user-images.githubusercontent.com/84452145/252550875-caddfa97-3952-46dc-b86f-02b6e546cd04.png)

401에러가 발생하면 갱신요청을 진행할입니다. 만약에 갱신 요청이 실패하면 refresh token이 만료된 것으로 가정하고 로그아웃 처리를 했습니다.

물론 서버에 장애가 발생할 수 있지만 장애가 발생해도 비슷한 처리를 하는 것이 적절하다고 봅니다. 리소스 갱신과 조회를 반영할 수 없다면 사용을 중단시키는 것이 적절하다고 봤습니다.

```ts title="authClient.ts"
type TokenResponse = {
  success: boolean;
  access_token: string;
};

async function refreshAccessAPI() {
  try {
    const sessionToken = sessionStorage.getItem(STORAGE_KEY.SESSION_TOKEN);
    if (!sessionToken) throw Error('sessionToken');

    const {
      data: { access_token },
    } = await authClient.post<TokenResponse>(API_URLS.REFRESH, null, {
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

통신과 무관한 클라이언트 상태관리를 위해 Jotai를 사용하고 있습니다. Jotai가 제공하는 다양한 편의 기능중에 atomStorage가 있습니다. atomStorage는 web storage를 제어할 수 있습니다. 하지만 보관할 때 큰따옴표(`"`)로 감쌉니다. axios interceptor는 hook으로 사용하는 경우가 아닙니다. 그래서 큰따옴표 제거 처리를 위해 `slice`, `replace` 적용하는 것은 낭비가 너무 큽니다.

<!-- 직접 구현하면서 제가 만든 백엔드에도 문제가 있었습니다. 원래 401에러를 돌려줘야 하는데 406에를 돌려주고 있었습니다.

오늘 배운 것 중 하나는 테스트 코드에는 status code도 포함해서 테스트 해야한다는 것입니다. 일단 msw를 보류하기 잘한 것 같습니다. 저의 백엔드 엔지니어링을 신뢰할 수 없습니다.

https://github.com/arch-spatula/flash-card-frontend/pull/42

https://github.com/arch-spatula/flash-card-backend/pull/46

프론트엔드 백엔드 모두 결합테스트가 필요합니다.

그리고 요청관련 함수는 그냥 button에 따로 구현하는 것이 정신 건강에 좋은 것 같습니다. -->

<!-- 이상 오늘 2시간 짜리 삽질이었습니다. -->

## 참고자료.

[axios interceptors와 refresh token을 활용한 jwt 토큰 관리](https://gusrb3164.github.io/web/2022/08/07/refresh-with-axios-for-client/)
