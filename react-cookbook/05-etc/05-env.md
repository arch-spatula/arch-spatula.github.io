---
sidebar_position: 5
---

# .env

```tsx
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
// const supabaseKey = process.env.REACT_APP_ANON_KEY!;

const supabaseKey = process.env.REACT_APP_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);
```

어제 설정하면서 발생한 에러를 팀원이 해결해줬습니다. 감사합니다.

```title=".env"
REACT_APP_SUPABASE_URL = 비밀
REACT_APP_ANON_KEY = 비밀
```

`env` 설정하는데 리액트의 경우 `REACT_APP`이 접두어로 붙는게 예약어로 설정되어 있습니다.
