### 스타일링 결합

하나로 결합하는 것하는 것에 난관이 생겼습니다.

[Multiple inheritance (Composition) #773](https://github.com/styled-components/styled-components/issues/773)

레포 이슈에서는

```tsx
import { css } from 'styled-components';

const rounded = css`
  border-radius: 5px;
`;
```

```tsx
import { css } from 'styled-components';

const column = css`
  display: block;
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: 25%;
  width: 25%;
`;
```

```tsx
import styled from 'styled-components';

const Card = styled.div`
  ${rounded}
  ${column}
`;
```

이런 방법을 권장하고 있습니다. 이렇게 되면 생기는 단점은 props가 없다는 것입니다. 그래서 한계가 생깁니다.

회사 규모에서는 더 복잡한 버튼의 상태를 갖을 것인데 고민이 많아집니다. 다시 생각해보면 설계가 잘못되어 있습니다.
