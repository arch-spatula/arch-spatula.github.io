---
sidebar_position: 2
tags: ['SQL', 'supabase', 'BaaS', 'postgres']
draft: true
---

# supabase

[supabase 공식 홈페이지](https://supabase.com/)

supabase는 firebase 대체제로 자주 사용합니다. firebase의 이상한 통신방식을 탈출할 수 있어서 사용합니다. 소캣 통신을 할 때만큼은 firebase의 규칙을 지켜야 한다는 것이 firebase 단점입니다.

먼저 firebase는 백엔드를 대체하기 위한 BaaS입니다. 그리고 firebase를 대체하기 위해 supabase가 탄생했습니다. 하지만 그것으로도 부족해서 supabase를 대체하기 pocketbase가 탄생했습니다. 마지막으로 저는 미래에 jsonbase를 만들어서 pocketbase를 대체하도록 할 것입니다. 그리고 그 미래에는 무엇이 jsonbase를 대체할지 기대가 됩니다.

이상한 드립은 집어치우고 좋은점도 많고 나쁜점도 많습니다. 하지만 개인적으로 회사에서 쓰고 싶다고 하면 다른 길을 찾아보라고 권할 것입니다. 1달 프로젝트에서 사용해보니까 좋은 점도 많지만 안 좋은 점이 더 많습니다.

- BaaS의 소비자가 프론트엔드 엔지니어인데 DB 지식이 풍부할 것이라고 가정합니다.
- 은근히 SQL문을 직접 작성해야 할 때도 많습니다.
- 특수한 요청에 대해서는 RPC 방식으로 DB 서버에서 SQL문을 실행해달라고 요청을 보내야 하고 또 실행할 SQL문도 직접 작성해야 합니다.
  - 예전에 팀원이 좋아요, 즐겨찾기 기능 만들 때 해당하는 SQL문을 직접작성했었습니다.

## supabase code gen

https://supabase.com/docs/guides/api/generating-types

타입스크립트를 활용하기 위해서 필요한 부분이 있습니다.

```sh
npx supabase login
```

본인 계정에서 토큰을 생성해야 합니다.

```sh
npx supabase gen types typescript --project-id "$PROJECT_ID" --schema public > types/supabase.ts
```

프로젝트 ID를 주입하면 됩니다.

참고로 `types/supabse.ts`를 따로 만들어 둬야 명령이 실행됩니다. 실행이 성공하면 덮어쓰기로 동작합니다.

```ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // ... 보안을 위해 생략
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
```

DB의 데이터를 참조해서 이렇게 알아서 타입을 생성해줍니다.

## NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY은 예약어입니다.

```ts
import { createClient } from '@supabase/supabase-js';

const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  options
);

export default supabase;
```

`.env` 파일에서 `NEXT_PUBLIC_SUPABASE_URL`과 `NEXT_PUBLIC_SUPABASE_ANON_KEY`은 예약어입니다.
