---
title: '토큰 갱신 처리하기'
authors: [arch-spatula]
tags: ['auth', 'token', 'axios', 'jotai']
description: '토큰 갱신을 위해서 interceptor를 구현한 이야기입니다.'
toc_max_heading_level: 6
---

# 토큰 갱신 처리하기

토큰을 갱신하는 추가 요청을 보내는 interceptor를 활용하는 이야기입니다.

<!--truncate-->

## 왜?

이 글이 필요한 이유입니다. 언젠가 새로운 서비스를 또 만들면 또 인증관련 처리가 필요합니다. 이거 다시보면 됩니다.

![token 타임라인](https://user-images.githubusercontent.com/84452145/248524296-fdaf3d69-e8c6-4527-85c6-9805fafa5152.png)

갱신 응답 response에 따라 다양한 전략이 있는데 여기는 그냥 갱신이 필요하다는 응답만 하고 access token은 또 요청하도록 만든 경우입니다.

기술적으로는 이 방법은 틀린 방법입니다. cookie를 활용할 수 없을 때 대응하는 전략 중 하나입니다.

원래 정석은 cookie를 refresh에 저장하고 access token을 web storage에 저장하는 것입니다. cookie는 도메인이 같아야 하기 때문에 CSRF(Cross-Site Request Forgery) 공격에서 안전하게 만들기 위해서 활용하는 전략입니다. access token은 여전히 XSS(Cross-Site Scripting) 위험에 노출되어 있지만 web storage 접근이 어렵습니다.

## interceptors

interceptor는 직역하면 "중간에서 가로채는자"를 의미합니다. 중간에 가로챌 수 있는 지점은 당연히 통신 라이브러리 답게 request와 response 시점입니다. refresh interceptor는 response 시점에 실행되어야 합니다.

백엔드 엔지니어와 합의가 필요합니다. refresh가 필요하다는 response를 클라이언트가 확인해야 합니다.

interceptor에서 검증하고 refresh를 자동으로 요청하면 됩니다.

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
    const {
      config,
      response: { status },
    } = err;
    if (config.url === API_URLS.REFRESH || status !== 401 || config.sent) {
      return Promise.reject(err);
    }

    config.sent = true;
    const accessToken = await refreshAccessAPI();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return axiosClient(config);
  }
);
```

해설입니다. `use` 메서드를 보면 2가지 콜백함수를 대입합니다. 첫째는 성공에 대한 처리이고 둘째는 에러에 대한 처리입니다.

첫번째 if 문입니다. 3가지 조건 중 1개라도 해당하면 일반 에러로 인식하고 반환합니다. 하지만 3개 모두 해당하지 않으면 refresh가 필요한 것으로 인식합니다.

1. refresh url에 요청에 실패한 경우
2. status가 401이 아닌 경우
3. `config.sent`는 이미 재요청을 한번 보냈는데 또 실패한 경우

위 3가지 중 3번은 다음 코드를 보면 이해가 될 것입니다.

### refreshAccessAPI

refresh 요청을 서버에게 보내는 함수입니다. 서바가 바로 처음부터 갱신된 access 토큰으로 응답하는 전략이 아닐 때 필요한 메서드입니다.

```ts
/**
 * - access_token을 갱신하는 함수
 * - 함수 아래 interceptors만 의존해야 하기 때문에 export하지 않음
 * - API 명세의 요구에 맞춰 header를 활용하고 refresh token을 설정
 */
async function refreshAccessAPI() {
  try {
    const sessionToken = sessionStorage.getItem('sessionToken');
    if (!sessionToken) throw Error('sessionToken');

    const {
      data: { access_token },
    } = await authClient.post<{
      success: boolean;
      access_token: string;
    }>(API_URLS.REFRESH, null, {
      headers: {
        Authorization: `Bearer ${sessionToken.slice(
          1,
          sessionToken.length - 1
        )}`,
      },
    });

    localStorage.setItem('accessToken', `"${access_token}"`);

    return access_token;
  } catch (error) {
    localStorage.clear();
    sessionStorage.clear();
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
}
```

여러가지 컨텍스트를 제공하겠습니다.

- `refreshAccessAPI`는 `authClient`로 구현했습니다. `authClient`를 사용하는 이유는 `header`를 갖지 않고 서버에 요청을 보내기 위해 만들었습니다. 관심사가 인증 확보와 관련된 것을 제공하기 위한 것입니다. 또 `authClient`가 실패하면 interceptor가 또 실행될 것입니다.
- `sessionStorage`를 활용하는 이유는 배포 전략에서 프론트엔드 도메인과 백엔드 도메인이 다르기 때문입니다. 만약 같았으면 `cookie`를 활용할 수 있고 또 권장되는 방식입니다.
- `slice`와 큰따옴표(`"`)를 활용하는 이유는 컴포넌트에서 유저 상태관리는 [jotai의 atomStorage](https://jotai.org/docs/utilities/storage)를 활용하기 때문입니다. `jotai`가 `storage`를 제어할 때 큰따옴표로 한번 감싸는 동작을 하고 있었습니다. 또 `atomStorage`를 활용하는 이유는 유저의 로그인 여부를 `atomStorage`의 값의 존재로 제어하기 때문입니다.

`authClient.post`가 서버에 갱신할 token을 요청하는 메서드입니다. 성공하면 response로 받은 토큰을 `storage`에 갱신하고 `access_token`을 반환합니다. 만약에 실패하게 되면 웹 스토리지를 비우도록 만들었습니다.

<!-- 직접 구현하면서 제가 만든 백엔드에도 문제가 있었습니다. 원래 401에러를 돌려줘야 하는데 406에를 돌려주고 있었습니다.

오늘 배운 것 중 하나는 테스트 코드에는 status code도 포함해서 테스트 해야한다는 것입니다. 일단 msw를 보류하기 잘한 것 같습니다. 저의 백엔드 엔지니어링을 신뢰할 수 없습니다.

https://github.com/arch-spatula/flash-card-frontend/pull/42

https://github.com/arch-spatula/flash-card-backend/pull/46

프론트엔드 백엔드 모두 결합테스트가 필요합니다.

그리고 요청관련 함수는 그냥 button에 따로 구현하는 것이 정신 건강에 좋은 것 같습니다. -->

이상 오늘 2시간 짜리 삽질이었습니다.

[axios interceptors와 refresh token을 활용한 jwt 토큰 관리](https://gusrb3164.github.io/web/2022/08/07/refresh-with-axios-for-client/)
