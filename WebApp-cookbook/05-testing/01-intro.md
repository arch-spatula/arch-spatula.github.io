---
sidebar_position: 1
description: '테스트 코드 시작하기'
---

# 테스트 코드 시작하기

테스트의 방식과 범위는 다양합니다.

테스트코드를 작성하기 좋은 경우들이 존재합니다. 하지만 대부분의 경우 일을 위한 일이 될 것입니다.

<!-- ## 테스트의 유형

- 공용으로 사용하는 유틸 함수 테스트
  - jest
  - vitest
- 백엔드 API 테스트
- 프론트엔드 UI 테스트
  - [cypress](https://www.cypress.io/)를 활용해서 테스트를 수행할 브라우저를 동작시킵니다.
  - [React Testing Library A.K.A. RTL](https://testing-library.com/docs/react-testing-library/intro/) -->

## 테스트 코드의 가치가 클 상황

- 처리할 값이 블랙박스입니다.
  - 다양한 예외처리를 해야 합니다.
- 요구사항의 변형이 점진적입니다.
- 코드베이스에서 경험하는 엣지케이스가 큽니다.

## 테스트 코드의 가치가 낮을 상황

- 처리할 값이 블랙박스인 경우 별로 없습니다.
- 대부분의 로직이 아주 단순합니다.
- 코드 베이스의 복잡성이 낮습니다.

## vitest로 테스트 경험하기

vitest는 out of the box로 대신 설정해주는 것이 많은 테스트 러너입니다.

### 같은 모듈 내의 함수는 mocking할 수 없습니다.

```js title="main.js"
import { get } from './mock-api';

export async function callJSONPlaceholder() {
  try {
    return await get();
  } catch (err) {
    return null;
  }
}
```

```js title="mock-api.js"
import axios from 'axios';

export async function get() {
  const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
  return res.data;
}
```

위와 같은 상황이 있습니다. 참고로 실제 요청은 최대한 분리할수록 좋습니다.

테스트 코드는 다음처럼 작성할 수 있습니다.

```js title="main.test.js"
import { describe, expect, it, vi } from 'vitest';
import { callJSONPlaceholder } from './main.js';

// highlight-start
vi.mock('./mock-api.js', () => {
  return {
    get: vi.fn().mockResolvedValue({
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    }),
  };
});
// highlight-end

describe('callJSONPlaceholder', () => {
  it('should work just fine', async () => {
    const result = await callJSONPlaceholder();

    expect(result).toEqual({
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    });
  });
});
```

`vi.mock`을 적용한 부분은 테스트 코드를 테스트 컨텍스트에서 덮어쓰기 한 것입니다. 그림을 보면 쉽게 이해할 수 있습니다.

![](https://user-images.githubusercontent.com/84452145/284890165-a0a8fe92-5ca6-4c1b-bb50-9d244926f80d.png)

위는 구현코드입니다. 하지만 테스트 환경에서는 실제로 외부요청을 보낼 필요는 없습니다. 단지 어떤 값을 어떻게 처리하는지 파악하는 것이 중요합니다.

하지만 테스트 코드는 어떻 값만 돌아왔을 때 어떻게 처리할지가 관심사입니다.

```js
vi.mock('./mock-api.js', () => {
  return {
    get: vi.fn().mockResolvedValue({
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    }),
  };
});
```

위 부분이 `get`의 `Promise.resolve` 값을 돌려줍니다.

![](https://user-images.githubusercontent.com/84452145/284890190-07ee72df-92fb-4a1d-9abd-e86d4773ca23.png)

테스트를 할때는 다른 함수로 이렇게 덮어쓰고 실행하게 됩니다. 그래서 실제 외부요청을 안하고 테스트할 수 있게 됩니다.

### 여러개 mocking

위 문제는 한계가 있습니다. 만약에 여러번 mocking해야 한다면 어떻게 할 수 있는가?

```js
import { describe, expect, it, vi } from 'vitest';
import { callJSONPlaceholder } from './main.js';
import * as exports from './mock-api.js';

vi.mock('./mock-api.js', () => {
  return {
    get: vi.fn().mockResolvedValue({
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    }),
  };
});

describe('callJSONPlaceholder', () => {
  it('should work just fine', async () => {
    const result = await callJSONPlaceholder();

    expect(result).toEqual({
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    });
  });

  it('should catch Error and return null', async () => {
    // highlight-next-line
    // 여기서 에러를 어떻게 처리할 수 있는가?

    const result = await callJSONPlaceholder();

    expect(result).toBeNull();
  });
});
```

위는 에러를 처리하지 않아서 다음 코드에서 발생하는 에러를 처리할 수 없습니다.

```js title="main.js"
import { get } from './mock-api';

export async function callJSONPlaceholder() {
  try {
    return await get();
  } catch (err) {
    return null;
  }
}
```

다음처럼 시도하는 실수하게 될 것입니다.

```js
import { describe, expect, it, vi } from 'vitest';
import { callJSONPlaceholder } from './main.js';
import * as exports from './mock-api.js';

vi.mock('./mock-api.js', () => {
  return {
    get: vi.fn().mockResolvedValue({
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    }),
  };
});

describe('callJSONPlaceholder', () => {
  it('should work just fine', async () => {
    const result = await callJSONPlaceholder();

    expect(result).toEqual({
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    });
  });

  it('should catch Error and return null', async () => {
    // highlight-start
    vi.mock('./mock-api.js', () => {
      return {
        get: vi.fn().mockRejectedValue(new Error('oh No!')),
      };
    });
    // highlight-end

    const result = await callJSONPlaceholder();

    expect(result).toBeNull();
  });
});
```

mocking을 테스트 내부에 한다고 덮어쎠지는 것은 아닙니다. 이럴 때는 One를 활용합니다. 그리고 실행 횟수를 기억해야 합니다.

![](https://user-images.githubusercontent.com/84452145/284896446-5310ec07-10b2-45d1-a03d-e0ff60650f6f.png)

다른 mocking을 `main.test.js` 하나의 모듈에 동시에 쓰려는 문제가 발생합니다. 정말 `Race Condition`이 실제로 발생하는 것은 아닙니다. 하지만 A이자 B이고자 하는 것입니다. 즉 논리적인 모순입니다. 방법은 다양합니다. 하나는 테스트를 작성하는 모듈을 분리합니다.

다른 방법은 `mockResolvedValueOnce`, `mockRejectedValueOnce`을 활용합니다. One이기 때문에 Queue로 선입선출 방식으로 사용합니다.

```js
import { describe, expect, it, vi } from 'vitest';
import { callJSONPlaceholder } from './main.js';
import * as exports from './mock-api.js';

vi.spyOn(exports, 'get')
  .mockResolvedValueOnce({
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  })
  .mockRejectedValueOnce(new Error('oh No!'));

describe('callJSONPlaceholder', () => {
  it('should work just fine', async () => {
    const result = await callJSONPlaceholder();

    expect(result).toEqual({
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    });
  });

  it('should catch Error and return null', async () => {
    const result = await callJSONPlaceholder();

    expect(result).toBeNull();
  });
});
```

![](https://user-images.githubusercontent.com/84452145/284896473-a1f85bd1-9dca-489b-b4b3-c9ff5f61423c.png)

mocking을 단일 횟수할 순서대로 실행하고 다음 mocking을 처리합니다.

[(번역) 뛰어난 테스팅 글 모음 (자바스크립트 포함)](https://velog.io/@sehyunny/a-compilation-of-outstanding-testing-articles)

[(번역) - 자바스크립트에서 테스트 어설션 스타일](https://medium.com/@yujso66/%EB%B2%88%EC%97%AD-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%96%B4%EC%84%A4%EC%85%98-%EC%8A%A4%ED%83%80%EC%9D%BC-314aea22faa8)

<!--

웹페이지 기기별 테스트 필요할 땐 ‘Responsively’

https://yozm.wishket.com/magazine/detail/2258/

-->
