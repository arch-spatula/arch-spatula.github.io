---
description: 'React Query'
tags: ['react', 'intro']
sidebar_position: 99
draft: true
---

리액트 쿼리는 천천히 공개하겠습니다.

## useTableQuery

사실 다시 생각해보면 react-query를 다룰 때 mutation은 table 단위로 다루면 좋겠다는 생각이 들었습니다. db도 테이블 단위로 호출하고 활용하는데 들었던 생각입니다.

custom hook을 모르면 react를 모르는 것입니다.

```ts
import { getUserProfile, patchUserProfile } from '@/utils/APIs/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const USER_PROFILE = 'user_profile';

/**
 * user_profile 테이블에 관한 query hook입니다.
 * @see https://tanstack.com/query/v4/docs/react/guides/optimistic-updates
 * @TODO updateCache함수 구현
 * @TODO 최초 데이터를 유출하지 말고 갱신된 쿼리캐시를 유출하기
 * @TODO 변수명 변경: const { profileCache, setProfileCache, updateProfileData } = useUserProfile();
 */

const useUserProfile = () => {
  const queryClient = useQueryClient();

  // get
  const { data } = useQuery([USER_PROFILE], getUserProfile, {});

  // null이면 갱신
  const profileData: UserProfileType = {
    id: data?.id ?? '',
    user_id: data?.user_id ?? '',
    user_name: data?.user_name ?? '',
    phone: data?.phone ?? '01000000000',
    contact_email: data?.contact_email ?? '',
    profile_image: data?.profile_image ?? '',
    background_color: data?.background_color ?? '#ffffff',
    birth_year: data?.birth_year ?? new Date().getFullYear(),
    self_profile: data?.self_profile ?? '',
    gender: data?.gender ?? '선택안함',
    is_public: data?.is_public ?? true,
    field: data?.field ?? [],
    skills: data?.skills ? data?.skills : [],
    career: data?.career ?? '신입',
    bookmark_folders: data?.bookmark_folders ?? [],
  };

  // 무한 리랜더링 버그 해결하기
  useEffect(() => {
    queryClient.setQueryData([USER_PROFILE], profileData);
  }, []);

  // patch
  const { mutate: updateProfileData } = useMutation(patchUserProfile, {
    onMutate: async (newProfile) => {
      await queryClient.cancelQueries({ queryKey: [USER_PROFILE] });
      const previousProfile = queryClient.getQueriesData([USER_PROFILE]);
      queryClient.setQueriesData([USER_PROFILE], newProfile);

      return { newProfile, previousProfile };
    },
    onError: (_err, _newProfile, context) => {
      queryClient.setQueriesData([USER_PROFILE], context?.previousProfile);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [USER_PROFILE] });
    },
  });

  return { profileData, updateProfileData };
};

export default useUserProfile;
```

hook을 설계할 때 관심사의 기준을 Table로 작성한 custom hook입니다. 여전히 사람같지 않습니다.

Zod도 활용이 필요해보입니다.

관심사를 유출입을 기준으로 한 것은 좋으나 거기까지인듯 합니다. 코드 전반적으로 더러운 것은 여전합니다.

고장나기 전까지는 관심사가 아니지만 자주 고장날 hook입니다. 그럼 이 hook의 소비자의 관심사는 맞습니다. test도 적용해서 더욱더 신뢰할 수 있는 코드를 작성할 수 있도록 합니다.

## TIL.23.01.05. - 리액트 쿼리

https://github.com/gopinav/React-Query-Tutorials

https://velog.io/@jkl1545/React-Query

위 블로그는 아래 강의를 한글로 요약한 버전입니다. 복습용으로 사용하기 바랍니다.

https://velog.io/@jay/10-minute-react-query-concept

# 1강

https://www.youtube.com/watch?v=VtWkSCZX0Ec

리액트는 데이터 통신 라이브러리입니다. 리액트는 UI 라이브러리입니다. 데이터를 가져오는 패턴이 없습니다.

대부분의 상태관리 라이브러리는 클라이언트측면 위주로 동작합니다. 서버 상태는 반면 별로 다루지 않습니다.

클라이언트 state는 동기적입니다. 서버 state는 비동기적입니다. 클라이언트와 다르게 자원이 공유됩니다. 데이터가 UI랑 싱크가 잘 맞아야 합니다.

캐싱, 재 순회, 업데이트 등 다양한 문제가 있습니다. 이런 문제는 상당한 시간과 노력이 필요합니다. 리액트 쿼리가 없다는 가정에서 힘듭니다.

리액트 쿼리는 이런 문제를 괭장히 쉽게 해결해줍니다.

- 기본 권리
- 리액트 쿼리 가밸자 도구
- 커스텀 hook
- 쿼리 ID
- 병렬 쿼리
- 동적 쿼리
- 의존적 쿼리
- 뮤테이션
- 낙관적 업데이트
- Axios interceptor

이 과정을 효율적으로 수강하려면 리액트 hook들을 잘 알도록 합니다.

# React Query Tutorial - 2 - Project Setup

https://www.youtube.com/watch?v=Nm0inP3B_zs

프로젝트를 직접 손으로 코딩하지 않으면 효용을 잘 알 수 없습니다. 그래서 프로젝트 설정을 배웁니다.

1. CRA로 만듭니다.
2. API 엔드 포인트인 모의 서버를 만듭니다.
3. 리액트 라우터를 만듭니다. 그래야 기능을 이해합니다.
4. 데이터를 전통적인 방법으로 회수하는 방법을 배웁니다.

```sh
npx create-react-app react-query-demo
```

이렇게 하면 프로젝트를 만들 수 있습니다.

```sh
npm install json-server
```

모의 데이터를 만드는 방법입니다. Json-server를 활용합니다.

프로젝트 파일에서 db.json을 생성합니다.

```json
{
  "superheroes": [
    {
      "id": 1,
      "name": "Batman",
      "alterEgo": "Bruce Wayne"
    },
    {
      "id": 2,
      "name": "Superman",
      "alterEgo": "Clark Kent"
    },
    {
      "id": 3,
      "name": "Wonder Woman",
      "alterEgo": "Princess Diana"
    }
  ],
  "friends": [
    {
      "id": 1,
      "name": "Chandler Bing"
    },
    {
      "id": 2,
      "name": "Joey Tribbiani"
    },
    {
      "id": 3,
      "name": "Rachel Green"
    }
  ],
  "users": [
    {
      "id": "vishwas@example.com",
      "channelId": "codevolution"
    }
  ],
  "channels": [
    {
      "id": "codevolution",
      "courses": ["react", "vue", "angular"]
    }
  ],
  "colors": [
    {
      "id": 1,
      "label": "red"
    },
    {
      "id": 2,
      "label": "blue"
    },
    {
      "id": 3,
      "label": "green"
    },
    {
      "id": 4,
      "label": "yellow"
    },
    {
      "id": 5,
      "label": "black"
    },
    {
      "id": 6,
      "label": "white"
    },
    {
      "id": 7,
      "label": "orange"
    },
    {
      "id": 8,
      "label": "purple"
    }
  ]
}
```

이 데이터를 루트 디렉토리에 붙입니다.

package.json을 다음을 추가합니다.

```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server-json": "json-server --watch db.json --port 4000"
  },
```

이렇게 하면 json 서버를 쉽게 킬 수 있습니다.

```sh
yarn server-json
```

이 명령으로 서버를 동작시킬 수 있습니다.

```sh
yarn add react-router-dom
```

라우팅을 처리할 라이브러리를 추가합니다.

데이터를 가져오는 컴포넌트를 따로 만들어둡니다.

```js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { HomePage } from './components/Home.page';
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page';
import { SuperHeroesPage } from './components/SuperHeroes.page';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/super-heroes" element={<SuperHeroesPage />} />
          <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

일단 이것을 복붙합니다.

```sh
yarn add axios
```

axios를 통신에 활용합니다.

```js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/superheroes').then((res) => {
      setData(res.data); // 통신에 성공하면 서버 데이터를 붙입니다.
      setIsLoading(false); // 통신이 끝나면 state를 false로 바꿉니다.
    });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data.map((hero) => {
        return <div>{hero.name}</div>;
      })}
    </>
  );
};
```

json 서버를 구동하고 있으면 동작시킬 수 있습니다.

여기까지는 전통적인 리액트 쿼리 없는 통신하는 방법입니다.

# React Query Tutorial - 3 - Fetching Data with useQuery

리액트 쿼리 설치입니다.

```sh
yarn add react-query
```

리덕스처럼 Provider를 제공해야 합니다.

```js
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>{/* ... */}</QueryClientProvider>
  );
}
```

이런식으로 작성합니다.

```js
import { useQuery } from 'react-query';
import axios from 'axios';

export const RQSuperHeroesPage = () => {
  const { isLoading, data } = useQuery('super-heroes', () => {
    return axios.get('http://localhost:4000/superheroes');
  });
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <div>RQ Super Heroes Page</div>
      {data?.data.map((hero) => (
        <div key={hero.name}>{hero.name}</div>
      ))}
    </>
  );
};
```

위 코드는 리액트 쿼리를 사용합니다.

```js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/superheroes').then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data.map((hero) => {
        return <div>{hero.name}</div>;
      })}
    </>
  );
};
```

그리고 위는 전통적인 방법입니다. 상당히 불필요하게 복잡합니다.

또 useEffect에 의존하지 않고 state를 관리해줄 필요가 없습니다.

```js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

export const RQSuperHeroesPage = () => {
  const { isLoading, data } = useQuery('super-heroes', fetchSuperHeroes);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <div>RQ Super Heroes Page</div>
      {data?.data.map((hero) => (
        <div key={hero.name}>{hero.name}</div>
      ))}
    </>
  );
};
```

이렇게 자주하는 요청을 추상화할 수 있습니다. 여기까지가 기초입니다.

# React Query Tutorial - 4 - Handling Query Error

https://www.youtube.com/watch?v=7WrxOLdBW4Y

이전 시간에 데이터를 가져오는 데이터는 흔한 패턴입니다. 이번에는 에러를 다루는 법을 배웁니다.

```js
const [isLoading, setIsLoading] = useState(true);
const [data, setData] = useState([]);
const [error, setError] = useState('');

useEffect(() => {
  axios
    .get('http://localhost:4000/superheroes')
    .then((res) => {
      setData(res.data);
      setIsLoading(false);
    })
    .catch((error) => setError(error.message));
  setIsLoading(false);
}, []);
```

전통적인 패턴입니다. 에러가 발생하면 처리하도록 개별 state를 제어합니다.

리액트 쿼리에서 적용할 패턴입니다.

```js

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes1");
};

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error } = useQuery(
    "super-heroes",
    fetchSuperHeroes
  );

  if (isError) {
    return <h2>{error.message}</h2>;
  }
```

통신이 실패하는 시간까지 꽤걸릴 것입니다. 래액트 쿼리는 자동으로 여러번 통신 재시도를 하기 때문입니다.

에러 핸들링이 상당히 간소해졌습니다.

리액트 쿼리는 이렇게 작은 프로젝트에서도 상당히 유용합니다.

# React Query Tutorial - 5 - React Query Devtools

리액트 쿼리 개발자 도구입니다. 리액트 쿼리의 동작을 시각화하고 디버깅을 도와줍니다.

네트워크 패널보다 다루기 쉽습니다. 버튼을 FAB로 설정할 수 있습니다.

```js
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* ... */}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
```

이렇게 설정을 하면 개발하는 동안 확인하기 유용합니다.

# 6 Query Cache

모든 쿼리는 5분동안 케시합니다. 나중에 다시 접근할 때 제공합니다. useQuery의 기능입니다.

isLoading이 true로 바뀌고 그동안 서버에서 데이터를 회수합니다. 그리고 데이터가 이미 케시에 존재하는지 확인합니다. 존재하면 바로 반환합니다. 그래서 재요청을 아껴줍니다.

하지만 만약 데이터가 업데이트 되어있으면 다시 회수합니다. 이것은 간단한 설명입니다.

isLoading이 바뀌지 않으면 백그라운드 isFetching에서 다시 데이터를 회수합니다.

그래서 네트워크 통신을 더 잘이해하기 위해서는 아래처럼 작성해야 합니다.

```js
const { isLoading, data, isError, error, isFetching } = useQuery(
  'super-heroes',
  fetchSuperHeroes
);
console.log('isFetching', isFetching, 'isLoading', isLoading);
if (isError) {
  return <h2>{error.message}</h2>;
}
```

이런 패턴으로 활용해볼 수 있습니다.

로딩과 fetching이 다르다는 것을 알 수 있습니다. fetching은 백그라운드에서 로직을 처리하고 모든 부분을 다 로딩하지 않습니다.

참고로 캐시삭제 및 새로고침은 개발자 도구를 활성화 했을 때만 사용할 수 있습니다.

캐시타임을 설정할 수 있습니다. 명시하지 않으면 5분입니다. 하지만 정말 설정이 필요하면 3번째 인자로 설정합니다.

```js
const { isLoading, data, isError, error, isFetching } = useQuery(
  'super-heroes',
  fetchSuperHeroes,
  { cacheTime: 5000 }
);
console.log('isFetching', isFetching, 'isLoading', isLoading);
if (isError) {
  return <h2>{error.message}</h2>;
}
```

5초로 설정한 경우입니다. 하지만 기본설정 5분도 충분히 좋습니다.

# 7 Stale Time

이전에 요청한 데이터를 저장한다는 것을 배웠습니다.

쿼리 캐시는 네트워크 요청의 수를 줄여줍니다.

Stale Time은 백그라운드 요청이 발생합니다. 개발자 데이터가 별로 변형되지 않는 데이터는 저장해둘 수 있습니다.

```js
const { isLoading, data, isError, error, isFetching } = useQuery(
  'super-heroes',
  fetchSuperHeroes,
  {
    staleTime: 30000,
  }
);
```

staleTime으로 쿼리가 재요청이 발생하지 않습니다. 라우팅하고 접근할 때마다 통신을 다시 하지않고 시간이 조금 지나야 요청을 날립니다. 이런 방식으로 서버 부담을 많이 줄여줄 수 있습니다.

staleTime은 기본설정은 0입니다. 그리고 가장 안전한 설정입니다. 그래서 기본값입니다. 요구사항에 따라 이해하고 변형하면 됩니다.

알 수 있는 것은 fetch이 백그라운드에서 발생할 수 있지만 로딩은 처리하지 않을 수 있습니다.

# 8 Refetch Defaults

쿼리 캐시와 스틸타임을 배웠습니다. 캐시 시간 5분 스틸 시간 0초를 배웠습니다. 이제 Refetcging을 배웁니다.

```js
export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      refetchOnMount: true,
    }
  );
```

마운트가 발생할 때마다 요청합니다.

`refetchOnMount`는 `true`가 기본입니다. 그외 `false`, `"always"`로 설정할 수 있습니다.

`refetchOnWindowFocus`는 중요한 기능입니다. 중간에 서버 데이터가 업데이트 되는 경우를 실시간 반영시킬 수 있습니다. 원격 데이터와 싱크가 안 맞으면 클라이언트의 요청이 가서 응답으로 덮어써지기 전까지는 모릅니다. 하지만 리액트 쿼리의 `refetchOnWindowFocus`는 변형이 발생하고 클라이언트가 보면 바로 반영해줍니다.

```json
"superheroes": [
    {
      "id": 1,
      "name": "Batman 다크 나이트", // Batman -> 다크 나이트
      "alterEgo": "Bruce Wayne"
    },
```

```js
export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      refetchOnWindowFocus: true,
    }
  );
```

`refetchOnWindowFocus`는 `true`, `false`, `"always"`인 것은 동일합니다.

이렇게 변형된 데이터는 화면에 보일 때 바로 반영시켜줍니다. 이것을 배우는 이유는 의도하지 않게 바로 업데이트된 이유를 알기 위해서입니다. 이런 기본설정을 인지하고 있어야 의도를 파악할 수 있습니다. 상당히 좋은 기본 설정입니다.

# 9 - Polling

https://www.youtube.com/watch?v=PvcRaMqtEPQ

리액트 쿼리로 폴링입니다. 어떤 간격을 갖고 데이터를 요청하는 방법입니다. 주식 거래 서비스면 자주 요청해야 할 것입니다. 클라이언트 동작에 의존하지 않고 계속 요청하게 만들 수 있습니다.

```js
export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      refetchInterval: 3000,
    }
  );
```

3초에 1번 요청하는 방법입니다. 폴링은 동작하기 위해서는 클라이언트가 계속 해당하는 컴포넌트를 보고 있는 동안 동작할 수 있습니다.

화면을 안보고 있는 계속 폴링을 시키려면 다음처럼 실행하면 됩니다.

```js
export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      refetchInterval: 3000,
      refetchIntervalInBackground: true,
    }
  );
```

항상 생각해보세요. 이런 로직을 리액트 쿼리 없이 직접 만들어야 했으면 상당히 큰 고통을 안 겨줬을 것입니다.

# 10 useQuery on click

마운트 시점에 요청을 보내는 것말고 요구사항에 따라 다르게 요청을 보내는 전략입니다.

단계는 2개입니다. 처음에 마운트 시점에 요청이 아니라고 리액트 쿼리에게 알려줘야 합니다.

```js
export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      enabled: false,
    }
```

쿼리는 트레킹하지만 요청하지는 않습니다. 이제 요청을 만들 트리거입니다.

```js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      enabled: false,
    }
  );
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <div>RQ Super Heroes Page</div>
      <button onClick={refetch}>Fetch Super Heroes</button>
      {data?.data.map((hero) => (
        <div key={hero.name}>{hero.name}</div>
      ))}
    </>
  );
};
```

이런 로직이면 버튼을 눌렀을 때 요청을 동작하게 만듭니다.

`useQuery`는 `refetch`함수를 반환하기 때문에 컴포넌트 로직에 맞게 활용할 수 있습니다. 이렇게 핸들러로 활용할 수 있습니다.

다시 말하지만 isLoading은 최초 로딩시점이고 isFetching은 최초 로딩이 후 캐시된 데이터랑 다를 때 또 요청을 보낼 때 사용합니다.

# 11 Success and Error Callbacks

쿼리가 완료 되었을 때 어떤 사이드이펙트를 발생시키고 싶을 수 있습니다.

이럴 때 사용하는 것이 callback입니다. 첫 단계는 통신의 성공과 실패에 각각 다르게 실행시킬 함수를 정의합니다.

```js
export const RQSuperHeroesPage = () => {
  const onSuccess = () => {
    console.log("통신 성공 사이드 이펙트");
  };
  const onError = () => {
    console.log("통신 실패 사이드 이펙트");
  };
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
```

이렇게 통신의 성공 혹은 실패 여부에 따라 `onSuccess`, `onError`의 메서드로 정의해주면 됩니다.

```js
export const RQSuperHeroesPage = () => {
  const onSuccess = () => {
    console.log("통신 성공 사이드 이펙트");
  };
  const onError = () => {
    console.log("통신 실패 사이드 이펙트");
  };
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      onSuccess,
      onError,
    }
  );
```

키와 메서드 이름이 동일해서 이렇게 더욱더 간략한 표현이 가능합니다.

```js
export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log("통신 성공 사이드 이펙트", data);
  };
  const onError = (error) => {
    console.log("통신 실패 사이드 이펙트", error);
  };
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      onSuccess,
      onError,
    }
  );
```

메서드의 매개 변수에 `error`, `data` 객체를 접근할 수 있습니다. 실패하면 뒤로가기 모달 같은 것들을 구현해 줄 수 있을 것 같습니다. 또 통신에 성공해도 사용자가 비로그인이면 거기에 맞게 로그인 모달을 보여주게 만드는 로직을 구현할 수 있습니다.

```js
import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

export const RQSuperHeroesPage = () => {
  const [heroCount, setHeroCount] = useState(0);
  const [fetchInterval, setFetchInterval] = useState(3000);
  const onSuccess = (data) => {
    console.log('통신 성공 사이드 이펙트', data);
    setHeroCount(data.data.length);
    console.log(heroCount);
    if (heroCount === 4) {
      setFetchInterval(false);
    }
  };
  const onError = (error) => {
    console.log('통신 실패 사이드 이펙트', error);
  };
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      onSuccess,
      onError,
      refetchInterval: fetchInterval,
    }
  );
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <div>RQ Super Heroes Page</div>
      <button onClick={refetch}>Fetch Super Heroes</button>
      {data?.data.map((hero) => (
        <div key={hero.name}>{hero.name}</div>
      ))}
    </>
  );
};
```

아마 숙제 정답입니다. 백그라운데에서 데이터를 변환하면 폴링을 정지시키는 방법입니다. 놀랍게도 간단합니다. 또 현실에서 발생할 것 같은 통신 요구사항 같습니다. 택배가 배송완료 될때까지 계속 통신하도록 하는 것처럼 사용할 수 있을 것 같습니다.

# 12 Data Transformation

데이터 트렌스포메이션입니다. useQuery hook으로 처리할 수 있습니다.

```js
export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log("통신 성공 사이드 이펙트", data);
  };
  const onError = (error) => {
    console.log("통신 실패 사이드 이펙트", error);
  };
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      onSuccess,
      onError,
      select: (data) => {
        // 여기서 처리합니다.
        const superHeroesNames = data.data.map((hero) => hero.name);
        return superHeroesNames;
      },
    }
  );
```

이런 방식으로 서버에서 데이터를 받으면서 처리할 수 있습니다.

```js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log('통신 성공 사이드 이펙트', data);
  };
  const onError = (error) => {
    console.log('통신 실패 사이드 이펙트', error);
  };
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      onSuccess,
      onError,
      select: (data) => {
        const superHeroesNames = data.data.map((hero) => hero.name);
        return superHeroesNames;
      },
    }
  );
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <div>RQ Super Heroes Page</div>
      <button onClick={refetch}>Fetch Super Heroes</button>
      {data.map((heroName) => (
        <div key={heroName}>{heroName}</div>
      ))}
    </>
  );
};
```

`select` 메서드로 데이터의 부분을 선택하고 반환하면 `data`에 자동으로 할당됩니다.

데이터를 변환하면서 필터링도 가능하기 때문에 원하는 변형을 바로 할 수 있습니다.

# 13 - Custom Query Hook

useQuery의 패턴을 파악할 수 있을 것입니다. 그리고 대부분 데이터를 요청하는데 사용한다는 것을 파악할 수 있습니다.

```js
useQuery('유니크 키', 요청함수, { 설정객체 });
```

이런 패턴이라는 것을 알 수 있습니다.

이전 예시들처럼 비슷한 코드를 다시 작성할 수 있지만 재사용성이 높은 방법으로 구현할 수 있습니다.

useQuery를 활용한 커스텀 hook을 만들 때 컨벤션은 접두어로 use를 붙입니다. 그리고 다음에 요청할 데이터를 이름을 붙입니다. 접미어는 Data을 붙여서 데이터를 요청하고 원격 데이터랑 송수신한다는 것을 암시하기 위해 붙여줍니다.

그래서 예시로 useSuperHerosData라고 명명했습니다.

```js
// hooks/useSuperHerosData.js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

/**
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns useQuery입니다. isLoading, data, isError, error, isFetching, refetch
 */
const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery('super-heroes', fetchSuperHeroes, {
    // 매개변수로 동작을 전달해줍니다.
    onSuccess,
    onError,
    select: (data) => {
      const superHeroesNames = data.data.map((hero) => hero.name);
      return superHeroesNames;
    },
  });
};

export default useSuperHeroesData;
```

hook은 함수에 불과합니다. hook을 가져왔을 때 콜백함수를 대입하는 것으로 성공과 실패별로 각각 다응하게 만듭니다.

```js
import useSuperHeroesData from '../hooks/useSuperHeroesData';

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log('통신 성공 사이드 이펙트', data);
  };
  const onError = (error) => {
    console.log('통신 실패 사이드 이펙트', error);
  };
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <div>RQ Super Heroes Page</div>
      <button onClick={refetch}>Fetch Super Heroes</button>
      {data.map((heroName) => (
        <div key={heroName}>{heroName}</div>
      ))}
    </>
  );
};
```

이렇게 커스텀 hook으로 리팩토링하면 코드가 훨씬더 간략하고 직관적이게 바뀝니다.

커스텀 쿼리 hook은 fetch함수를 정의하고 필요하면 제어할 매개변수를 넘겨주는 방식으로 구현합니다.

# 14 Query by Id

useQuery hook과 그 설정을 많이 배웠습니다. 이번에는 상세페이지 로직에 자주 활용하는 기능을 구현합니다. 이것은 id를 기준으로 쿼리를 날리는 것입니다.

클릭하면 상세페이지로 이동하는 법도 포함합니다.

```js
<Routes>
  <Route path="/rq-super-heroes/:id" element={<RQSuperHeroPage />} />
  <Route path="/super-heroes" element={<SuperHeroesPage />} />
  <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
  <Route path="/" element={<HomePage />} />
</Routes>
```

```js
export const RQSuperHeroPage = () => {
  return <div>Super hero details</div>;
};
```

```js
<>
  <div>RQ Super Heroes Page</div>
  <button onClick={refetch}>Fetch Super Heroes</button>
  {data?.data.map((hero) => {
    return (
      <div key={hero.id}>
        <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
      </div>
    );
  })}
</>
```

```js
const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery('super-heroes', fetchSuperHeroes, {
    // 매개변수로 동작을 전달해줍니다.
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroesNames = data.data.map((hero) => hero.name);
    //   return superHeroesNames;
    // },
  });
};
```

이렇게 변형해주면 됩니다. 데이터의 특정 부분만 나가는게 아니기 때문에 select를 주석처리합니다.

라우팅 로직은 기존과 동일합니다. 하지만 라우팅을 통해 상세페이지를 접근하는 로직이 더 간단합니다.

```js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

// id에 따라 동적으로 접근해야 합니다.
export const useSuperHeroData = (heroId) => {
  // 포함관계를 첫번째에 지정합니다. 두번째는 동적으로 들어갈 키입니다.
  return useQuery(['super-hero', heroId], () => fetchSuperHero(heroId));
};
```

```js
import { useParams } from 'react-router-dom';
import { useSuperHeroData } from '../hooks/useSuperHeroData';

export const RQSuperHeroPage = () => {
  const { id } = useParams();
  const { isLoading, data, isError, error } = useSuperHeroData(id);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  );
};
```

커스텀 hook을 만들고 상세페이지에서 사용하는 로직입니다.

상세페이지 로직이 다른 라이브러리에 비해 훨씬더 간단합니다.

이런 로직은 상당히 중요합니다. 키를 아이디로 알고 있기 때문에 로딩화면을 보여주고 다른 이전에 방문했던 상세페이지를 안 보여줍니다. 다르다는 것을 알고 있게 만든 것입니다.

리액트 쿼리는 fetcher함수를 대입하면 자동으로 매개변수를 대입합니다.

```js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  return useQuery(['super-hero', heroId], fetchSuperHero);
};
```

`fetcher`함수는 이런 표현도 가능합니다. 단순한 함수로 대입하면 객체가 매개변수로 자동할당됩니다. 그래서 `useSuperHeroData`의 쿼리 키 배열도 접근할 수 있습니다. 이렇게 배열의 2번째 요소를 접근하는 로직도 만들 수 있습니다.

# 15 - Parallel Queries

병렬 쿼리입니다. 가끔은 하나의 컴포넌트가 여러개의 API를 요청해야할 때가 있습니다.

```json
{
  "superheroes": [
    {
      "id": 1,
      "name": "Batman 다크 나이트",
      "alterEgo": "Bruce Wayne"
    },
    {
      "id": 2,
      "name": "Superman",
      "alterEgo": "Clark Kent"
    },
    {
      "id": 3,
      "name": "Wonder Woman",
      "alterEgo": "Princess Diana"
    },
    { "id": 4, "name": "Jake The Dog", "alterEgo": "Jake" }
  ],
  "friends": [
    {
      "id": 1,
      "name": "Chandler Bing"
    },
    {
      "id": 2,
      "name": "Joey Tribbiani"
    },
    {
      "id": 3,
      "name": "Rachel Green"
    }
  ],
  "users": [
    {
      "id": "vishwas@example.com",
      "channelId": "codevolution"
    }
  ],
  "channels": [
    {
      "id": "codevolution",
      "courses": ["react", "vue", "angular"]
    }
  ],
  "colors": [
    {
      "id": 1,
      "label": "red"
    },
    {
      "id": 2,
      "label": "blue"
    },
    {
      "id": 3,
      "label": "green"
    },
    {
      "id": 4,
      "label": "yellow"
    },
    {
      "id": 5,
      "label": "black"
    },
    {
      "id": 6,
      "label": "white"
    },
    {
      "id": 7,
      "label": "orange"
    },
    {
      "id": 8,
      "label": "purple"
    }
  ]
}
```

이런 데이터가 존재합니다.

```js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
  return axios.get(`http://localhost:4000/superheroes/`);
};

const fetchFriends = () => {
  return axios.get(`http://localhost:4000/friends/`);
};

export const ParallelQueriesPage = () => {
  useQuery(['super-heroes'], fetchSuperHeroes);
  useQuery(['friends'], fetchFriends);
  return <div>Parallel Queries Page</div>;
};
```

병렬 쿼리는 요청 동시성을 유지하기 위해 사용합니다. 리액트 쿼리는 단순하게 여러번 이렇게 요청하면 됩니다.

여기서 의문이 생길 수 있습니다. 이럴 때는 별칭 즉 에일리어스를 사용하면 됩니다. 이것은 자바스크립트 문법입니다.

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%EC%83%88%EB%A1%9C%EC%9A%B4_%EB%B3%80%EC%88%98_%EC%9D%B4%EB%A6%84%EC%9C%BC%EB%A1%9C_%ED%95%A0%EB%8B%B9%ED%95%98%EA%B8%B0

```js
var o = { p: 42, q: true };
var { p: foo, q: bar } = o;

console.log(foo); // 42
console.log(bar); // true
```

```js
export const ParallelQueriesPage = () => {
  const { data: superheroes } = useQuery(['super-heroes'], fetchSuperHeroes);
  const { data: friends } = useQuery(['friends'], fetchFriends);
  return <div>Parallel Queries Page</div>;
};
```

이렇게 처리하면 됩니다. 여기까지는 단순 병렬 쿼리였습니다. 다음에는 동적 병렬 쿼리를 배웁니다.

# 16 Dynamic Parallel Queries

동적 병렬 쿼리입니다.

```js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
  return axios.get(`http://localhost:4000/superheroes/`);
};

export const DynamicParallelPage = ({ heroIds }) => {
  return <div>DynamicParallelPage</div>;
};
```

예를 들어 이렇 상황입니다. 동적으로 다양한 id에 해당하는 데이터를 요청해야할 때 입니다.

```js
<Routes>
  <Route
    path="/rq-dynamic-parallel"
    element={<DynamicParallelPage heroIds={[1, 3]} />}
  />
</Routes>
```

이렇게 페이지를 접근했을 때 각각 id를 요청해야 할 수 있습니다. 나중에는 사용자가 표를 보고 여러개를 다양하게 동적으로 선택해야 하는 상황이 올 수 있을 것입니다.

동적으로 여러번 useQuery를 사용하는 것은 비효율적입니다.

```js
import { useQueries } from 'react-query';
import axios from 'axios';

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );
  console.log({ queryResults });
  return <div>DynamicParallelPage</div>;
};
```

동적 병렬 쿼리는 이렇게 처리할 수 있습니다. useQueries는 순회할 배열을 대입합니다. 그리고 순회할 때 id를 접근하고 각각 쿼리키와 fetcher함수를 대입하고 제어합니다. 그러면 병렬 쿼리 로직을 구현할 수 있게 됩니다.

# 17 Dependent Queries

이전 시간에는 병렬 쿼리를 배웠습니다. 동시성을 유지하기 위해 로직입니다. 하지만 또 쿼리를 순차적으로 실행해야 하는 경우도 생길 것입니다. 하나의 쿼리가 다른 쿼리에 의존하는 경우가 있을 것입니다.

```js
<Routes>
  <Route
    path="/rq-dependent"
    element={<DependentQueriesPage email="vishwas@example.com" />}
  />
</Routes>
```

현실의 라우팅이 이렇게 되어 있을 때입니다.

이메일이 context로 받을 수도 있습니다. 하지만 간단하게 예시를 위해 prop으로 받았습니다.

```json
{
  "users": [
    {
      "id": "vishwas@example.com",
      "channelId": "codevolution"
    }
  ],
  "channels": [
    {
      "id": "codevolution",
      "courses": ["react", "vue", "angular"]
    }
  ]
}
```

만약 현재 db가 이런 구조라면 id로 서로 정규화 되어 있습니다. id가 서로 의존성을 갖고 있습니다.

users의 정보를 얻고 그리고 channels의 id를 기준으로 정보를 얻습니다. 이렇게 의존성을 갖고 정규화 되어 있는 경우는 일반적입니다.

```js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUserEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(['user', email], () => fetchUserEmail(email));
  // 처음에는 undefined입니다. 그래서 옵셔널 체이닝을 붙입니다.
  const channelId = user?.data.channelId;
  console.log(channelId);
  // 데이터를 할당 했을 때 실행되도록 설정합니다.
  useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), {
    // 처음 undefined일 때는 false로 변환 됩니다. 그리고 할당이 되었을 때 true로 변환됩니다.
    enabled: !!channelId,
  });
  return <div>DependentQueries</div>;
};
```

개발자 도구를 보면 `["courses", null]`을 볼 수 있습니다. 의존성상 다음에 해당하는 쿼리키에 아무것도 할당이 안되어 있기 때문입니다. 첫번째 쿼리를 처리하고 다음 쿼리를 처리할 때 그때 새로운 쿼리 키로 업데이트 됩니다.

의존성 쿼리는 이런 패턴으로 간단하게 구현할 수 있습니다.

# 18 Initial Query Data

https://www.youtube.com/watch?v=rLdSWo1TD50

리액트 쿼리의 초기 쿼리 데이터 기능입니다.

상세 페이지를 접근하면서 이미 데이터를 목록에서 요청하고 받았습니다. 하지만 이미 갖고 있는데 라우팅을 하면서 또 요청을 보내고 있습니다. 하지만 알아야 할 것입니다.

목록 페이지에는 상세페이지에 대한 정보 일부만 갖고 있을 수 있습니다. 목록페이지에는 없지 만 상세페이지에 없으면 결국 없는 부분을 요청해서 가져와야 합니다.

리액트 쿼리가 바로 loading으로 처리하기 전에 목록 페이지에 있는 일부 데이터를 초기값으로 활용할 수 있습니다. 그리고 요청을 백그라운드에서 진행할 수 있습니다. 상세 페이지 정보를 가져오면 다른 부분을 갱신합니다.

데이터의 부분을 렌더링을 처리할 수 있습니다. 사용자 입장에서 데이터가 바로 가져온 것처럼 보일 수있습니다. 하지만 실제로는 일부만 보이고 없는 데이터를 가져오는 것입니다.

```js
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  // 쿼리 클라이언트 인스턴스는 쿼리 캐시를 접근할 수 있습니다. 쿼리 캐시로 초기값을 접근해서 설정할 수 있습니다.
  const queryClient = useQueryClient();
  return useQuery(['super-heroes', heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueriesData('super-heroes')
        ?.data?.find((hero) => hero.id === parseInt(heroId));
      if (hero) {
        return { data: hero };
      } else {
        // 없으면 fetch를 실행합니다.
        return undefined;
      }
    },
  });
};
```

```js
import { useParams } from 'react-router-dom';
import { useSuperHeroData } from '../hooks/useSuperHeroData';

export const RQSuperHeroPage = () => {
  const { id } = useParams();
  const { isLoading, data, isError, error } = useSuperHeroData(id);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  );
};
```

상세 페이지에서 데이터를 접근하는 방식을 참고하기 바랍니다.

작성하면서 쿼리키가 맞는지 잘 확인하도록 합니다.

많은 코드를 작성을 합니다. 하지만 사용자에게 로딩이외 표시를 보여줄 수 있습니다.

# 19 Paginated Queries

데이터 요청의 자주 있는 패턴입니다. 페이지 네이션 컴포넌트 같은 경우입니다. 페이지 네이션은 구현이 간단합니다. 하지만 사용자 경험을 더 좋게 만들 수 있습니다.

```json
{
  "colors": [
    {
      "id": 1,
      "label": "red"
    },
    {
      "id": 2,
      "label": "blue"
    },
    {
      "id": 3,
      "label": "green"
    },
    {
      "id": 4,
      "label": "yellow"
    },
    {
      "id": 5,
      "label": "black"
    },
    {
      "id": 6,
      "label": "white"
    },
    {
      "id": 7,
      "label": "orange"
    },
    {
      "id": 8,
      "label": "purple"
    }
  ]
}
```

현재 예시를 위한 DB입니다.

```js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchColor = () => {
  return axios.get(`http://localhost:4000/colors`);
};

export const PaginatedQueriesPage = () => {
  const { isError, error, isLoading, data } = useQuery(['color'], fetchColor);
  if (isError) return <h2>{error.message}</h2>;
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <div>
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              <h2>
                {color.id}. {color.label}
              </h2>
            </div>
          );
        })}
      </div>
    </>
  );
};
```

놀랍게도 json-server는 페이지네이션을 지원합니다.

```url
http://localhost:4000/colors?_limit=2&_page=3
```

이렇게 작성하면 페이지네이션처럼 데이터를 볼 수 있습니다. 이런 요청 로직을 리액트 구현하면 됩니다.

```js
import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

const fetchColor = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

export const PaginatedQueriesPage = () => {
  // state의 값을 참조해서 쿼리키로 활용합니다.
  const [pageNumber, setPageNumber] = useState(1);

  // useQuery키를 state값을 제어하면서 데이터를 요청하는 패턴입니다.
  const { isError, error, isLoading, data } = useQuery(
    ['color', pageNumber],
    () => fetchColor(pageNumber)
  );
  if (isError) return <h2>{error.message}</h2>;
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <div>
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              <h2>
                {color.id}. {color.label}
              </h2>
            </div>
          );
        })}
      </div>
      <div>
        {/* 이전 페이지로 이동하는 버튼입니다. */}
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev
        </button>
        {/* 다음 페이지로 이동합니다. */}
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next
        </button>
      </div>
    </>
  );
};
```

구현자체는 어렵지 않습닏.

하지만 완벽한 것은 아닙니다. 다음 페이지마다 계속 요청을 보내야 합니다. 새로고침처럼 깜박거리는 느낌이 듭니다.

```js
const { isError, error, isLoading, data } = useQuery(
  ['color', pageNumber],
  () => fetchColor(pageNumber),
  {
    keepPreviousData: true,
  }
);
```

`keepPreviousData: true`는 키가 바뀌어도 일단은 가져온 값을 유지합니다. 그리고 데이터를 가져왔을 때 바꿉니다.

지금은 큰 감흥이 없을 수 있지만 표같은 컴포넌트를 표현하고 갱신할 때 큰 효용을 느낄 수 있을 것입니다.

# 20 Infinite Queries

이번에는 무한 쿼리를 배웁니다. load more 버튼으로 요청을 보내도록 만드는 것입니다.

더보기 혹은 무한 스크롤 기능처럼 구현하는 기능입니다.

```js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchColor = () => {
  return axios.get(`http://localhost:4000/colors`);
};

export const InfiniteQueriesPage = () => {
  const { isError, error, isLoading, data } = useQuery(['color'], fetchColor, {
    keepPreviousData: true,
  });

  if (isError) return <h2>{error.message}</h2>;
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <div>
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              <h2>
                {color.id}. {color.label}
              </h2>
            </div>
          );
        })}
      </div>
    </>
  );
};
```

시작하는 실습 예제입니다.

useQuery 대신에는 useInfiniteQuery를 사용합니다.

그리고 다음은 fetcher 함수를 사용하는데 집중합니다.

```js
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { Fragment } from 'react';

const fetchColors = ({ pageParam = 1 }) => {
  // 페이지는 1로 시작하도록 설정합니다.
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const InfiniteQueriesPage = () => {
  // 마지막 페이지에 도달하면 정지시키기 위해 hasNextPage는 추출합니다.
  // fetchNextPage 함수로 클릭에 다음 페이지로 이동하도록 구현할 수 있습니다.
  // isFetchingNextPage은 이름처럼 다음 페이지를 요청 중인지 상태를 알 수 있습니다.
  const {
    isError,
    error,
    isLoading,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(['color'], fetchColors, {
    // 2개의 매개변수를 갖습니다. 첫번째 마지막 페이지입니다. 필요가 없으면 언더스코어(_)로 컨벤션에 맞게 표기합니다.
    // 두번째 매개변수는 각 페이지 별로 데이터를 요청합니다.
    getNextPageParam: (_, pages) => {
      // 페이지를 더하는 패턴입니다. 하지만 4페이지를 도달하면 더이상 다음 페이지로 못가게 정지시킵니다.
      // 현재 하드코딩한 4는 json-server의 한계에 의한 것입니다.
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isError) return <h2>{error.message}</h2>;
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <div>
        {/* data?.data 대신에 pages를 얻습니다.  */}
        {data?.pages.map((group, idx) => {
          return (
            <Fragment key={idx}>
              {/* 이렇게 중첩 순회가 발생합니다. */}
              {group.data.map((color) => (
                <h2 key={color.id}>
                  {color.id} {color.label}
                </h2>
              ))}
            </Fragment>
          );
        })}
      </div>
      <div>
        {/* 마지막에 도달하면 비활성화됩니다. 클릭할 때마다 요청을 보냅니다. */}
        <button onClick={fetchNextPage} disabled={!hasNextPage}>
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching' : null}</div>
    </>
  );
};
```

무한 스크롤과 유사하게 이런 패턴으로 구현할 수 있습니다.

# 21 Mutations

여기까지는 데이터를 요청해서 얻는 것 중심으로 배웠습니다. 이제부터는 백엔드로 데이터를 보내는 법을 배웁니다.

데이터를 보내는 패턴은 상당히 흔합니다. 리액트 쿼리는 이런 유스케이스에 대응을 잘 해주고 또 그보다 더 많은 기능들을 제공해줍니다.

이번에는 post 요청을 보내는 법을 배웁니다.

사용자에게 데이터를 추가하는 기능을 제공할 것입니다.

input을 제공하기 위해 전통적인 제어된 input 패턴으로 시작합니다.

```js
import useSuperHeroesData from '../hooks/useSuperHeroesData';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const RQSuperHeroesPage = () => {
  // 전통적인 제어된 input입니다.
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const onSuccess = (data) => {
    console.log('통신 성공 사이드 이펙트', data);
  };
  const onError = (error) => {
    console.log('통신 실패 사이드 이펙트', error);
  };
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  // 클릭 이벤트 저장하는 함수입니다.
  const handleAddHeroClick = () => {
    // 생성, 수정, 삭제는 리액트 쿼리에서 개념적으로 뮤테이션이라고 합니다.
    console.log({ name, alterEgo });
  };

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <div>RQ Super Heroes Page</div>
      {/* 여기를 추가합니다 */}
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add hero</button>
      </div>
      <button onClick={refetch}>Fetch Super Heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
    </>
  );
};
```

커스텀 hook에서 생성하는 로직을 이어서 만들겠습니다.

```js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

/**
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns useQuery입니다. isLoading, data, isError, error, isFetching, refetch
 */
const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery('super-heroes', fetchSuperHeroes, {
    // 매개변수로 동작을 전달해줍니다.
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroesNames = data.data.map((hero) => hero.name);
    //   return superHeroesNames;
    // },
  });
};

export default useSuperHeroesData;
```

기존 커스텀 hook입니다.

```js
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

// 뮤테이션 함수입니다.
const addSuperHero = (hero) => {
  return axios.post('http://localhost:4000/superheroes', hero);
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery('super-heroes', fetchSuperHeroes, {
    onSuccess,
    onError,
  });
};

export const useAddSuperHeroesData = () => {
  // 뮤테이션에는 놀랍게도 쿼리 키가 필요 없습니다.
  // fetcher 함수랑 대응해서 뮤테이션 함수를 작성해줘야 합니다.
  return useMutation(addSuperHero);
};
```

수정한 커스텀 hook입니다.

```js
// 데이터에 변형을 가할 mutate함수만 추출하면 됩니다.
const { mutate: addHero } = useAddSuperHeroesData();

// 클릭 이벤트 저장하는 함수입니다.
const handleAddHeroClick = () => {
  // 생성, 수정, 삭제는 리액트 쿼리에서 개념적으로 뮤테이션이라고 합니다.
  console.log({ name, alterEgo });
  const hero = { name, alterEgo };
  addHero(hero);
};
```

수정한 커스텀 hook도 가져왔습니다.

여기서 주의할 점은 서버에 데이터를 보내는 것과 보낸 서버 데이터로 갱신하기 위해서 또 요청을 보내야 합니다.

useMutation은 로딩, 에러 같은 다른 값들도 지원해줍니다.

```js
// 데이터에 변형을 가할 mutate함수만 추출하면 됩니다.
const {
  mutate: addHero,
  isLoading: sending,
  isError: fallToSend,
  error: fall,
} = useAddSuperHeroesData();

// 클릭 이벤트 저장하는 함수입니다.
const handleAddHeroClick = () => {
  // 생성, 수정, 삭제는 리액트 쿼리에서 개념적으로 뮤테이션이라고 합니다.
  console.log({ name, alterEgo });
  const hero = { name, alterEgo };
  addHero(hero);
};

if (fallToSend) {
  return <h2>{fall.message}</h2>;
}

if (sending) {
  return <h2>sending...</h2>;
}
```

이런 로직도 구현할 수 있습니다. 데이터를 보내면서 생기는 서버 상태도 참조할 수 있습니다.

# 22 Query Invalidation

이전 시간에 데이터를 서버에 보내면 서버 데이터는 갱신됩니다. 하지만 화면의 데이터는 오래 된 데이터입니다. 뮤테이션이 성공하면 화면을 업데이트하면 참 좋을 것 같습니다. 이 기능을 보고 Query Invalidation이라고 부릅니다.

```js
import { useQueryClient } from 'react-query';
export const useAddSuperHeroesData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero);
};
```

첫번째는 useQueryClient hook의 인스턴스를 생성합니다.

```js
export const useAddSuperHeroesData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess: () => {
      // 서버의 데이터가 갱신되면 다시 요청을 보냅니다.
      // 같은 쿼리 키를 대입하면 됩니다.
      queryClient.invalidateQueries('super-heroes');
    },
  });
};
```

뮤테이션이 성공하면 백그라운드에서 refetch를 실행하고 다시 업데이트하게 됩니다. 흔한 문제이지만 쉽게 해결할 수 있게 해줍니다.

# 23 Handling Mutation Response

뮤테이션은 UI가 참고할 원격 데이터를 업데이트하기 유용합니다. 하지만 여전히 문제가 있습니다.

새로롭게 서버에 넣은 데이터를 response로 반환하는 경우는 흔합니다. 그래서 다시 fetching해서 서버 부담을 늘리는 것보단 이 데이터를 바로 업데이트하는게 더 효율적입니다.

불필요한 네트워크 요청을 하지 않고 업데이트할 수 있습니다.

먼저 요청을 날릴 부분을 주석처리합니다.

```js
export const useAddSuperHeroesData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess: () => {
      // queryClient.invalidateQueries("super-heroes");
    },
  });
};
```

```js
export const useAddSuperHeroesData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess: (data) => {
      // data는 post 요청으로 보낸 것을 응답으로 받게 됩니다(컨벤션입니다)
      // setQueriesData는 쿼리 캐시를 업데이트합니다.
      queryClient.setQueriesData('super-heroes');
    },
  });
};
```

setQueriesData를 먼저 접근합니다. 그리고 데이터를 담을 쿼리 캐시를 지정합니다.

```js
export const useAddSuperHeroesData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess: (data) => {
      // data는 post 요청으로 보낸 것을 응답으로 받게 됩니다(컨벤션입니다)
      // setQueriesData는 쿼리 캐시를 업데이트합니다.
      queryClient.setQueriesData('super-heroes', (oldQueryData) => {
        // oldQueryData는 현재 캐시되어 있는 데이터들입니다.
        // 뮤테이션 응답 속에 담겨있는 데이터는 data.data입니다.
        return { ...oldQueryData, data: [...oldQueryData.data, data.data] };
      });
    },
  });
};
```

체감하는 성능적으로는 훨씬더 좋습니다. 일반적인 뮤테이션 응답 처리입니다. 추가 통신을 덜하기 때문에 리소 낭비를 줄이기 시작할 수 있습니다.

# 24 Optimistic Updates

낙관적 업데이트입니다. 이름이 암시하는 것처럼 클라이언트가 뮤테이션을 가하기 전에 가할 것이라고 가정하고 state를 업데이트하는 것입니다. 가정은 아무 문제 없을 것이라는 것입니다. 서비스가 맹렬히 빠르게 보입니다.

낙관적 업데이트는 에러가 발생할 수 있는 케이스를 조심해야 합니다. 낙관적 업데이트는 그렇게 직관적이지 않습니다. 하지만 리액트 쿼리는 어느정도 단순화시켜줍니다.

```js
export const useAddSuperHeroesData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onMutate: () => {},
    onError: () => {},
    onSettled: () => {},
  });
};
```

3개 메서드를 정의해야 합니다.

```js
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

// 뮤테이션 함수입니다.
const addSuperHero = (hero) => {
  return axios.post('http://localhost:4000/superheroes', hero);
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery('super-heroes', fetchSuperHeroes, {
    onSuccess,
    onError,
  });
};

export const useAddSuperHeroesData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onMutate: async (newHero) => {
      // 재요청이 낙관적 업데이트를 덮어 쓰지 않도록 막아줘야 합니다.
      await queryClient.cancelQueries('super-heroes');
      // 현재 캐시된 데이터를 접근할 수 있습니다.
      const previousHeroData = queryClient.getQueriesData('super-heroes');
      queryClient.setQueryData(
        'super-heroes',
        // 요청을 보내기 전에 데이터에 뮤테이션을 가합니다.
        (oldQueryData) => {
          return {
            ...oldQueryData,
            data: [
              ...oldQueryData.data,
              { id: oldQueryData?.data?.length + 1, ...newHero },
            ],
          };
        }
      );
      // 요청을 보내기 전에 화면에 변경을 보여줍니다.
      return { previousHeroData };
    },
    // 첫번째 매개변수는 에러입니다. 두번째는 뮤테이션으로 전달하는 데이터입니다.
    // 세번째는 context입니다.뮤테이션에 대한 부가적인 정보입니다.
    onError: (_, __, context) => {
      queryClient.setQueriesData('super-heroes', context.previousHeroData);
    },
    // 뮤테이션이 성공하든 실패하든 동작합니다. refetch만 하면 됩니다.
    onSettled: () => {
      // 클라이언트 상태가 서버 상태랑 동일하게 싱크를 맞추어줍니다.
      queryClient.invalidateQueries('super-heroes');
    },
  });
};
```

이렇게 하고나서는 이제 `isLoading`동안 보일 컴포넌트는 모두 가려줍니다. 화면에 바로 업데이트 되어 바로 보일 것입니다. 통신하기 전에 먼저 화면에 보여주는 것이기 때문입니다. 낙관적인 것은 사용자가 데이터를 넣으려 하는 것도 통신이 성공할 것이라는 것 모두 해당합니다.

에러는 `onError`와 `onSettled` 메서드에서 처리합니다.

# 25 Axios Interceptor

Axios 인터셉터입니다. 리액트 쿼리랑 Axios는 특별한 이해관계는 딱히 없습니다. 하지만 2개의 라이브러리를 같이 사용하면서 사용하기 좋고 흔한 패턴입니다.

```txt
/utils
  axios-utils.js
```

```js
import axios from 'axios';

const client = axios.create({ baseURL: 'http://localhost:4000' });

// 함수 매개변수는 모든 axios는 설정을 받을 수 있습니다.
export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer token`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    // 에러를 핸들하고 로깅을 추가합니다.
    // 필요하면 로그인 페이지로 돌려줍니다.
    // 마지막에 error을 반환하는 것은 잊지않도록 합니다.
    return error;
  };
  return client(options).then(onSuccess).catch(onError);
};
```

이렇게 작성한 것이 인터셉터입니다.

모든 요청을 처리하고 요청과 응답마다 처리할 로직이 생겼습니다.

```js
import { request } from '../utils/axios-utils';

const fetchSuperHeroes = () => {
  return request({ url: '/superheroes' });
};

const addSuperHero = (hero) => {
  return request({ url: '/superheroes', method: 'post', data: hero });
};
```

네트워크를 확인하면 `Bearer token`이 header에 추가된 것을 확인할 수 있을 것입니다.
