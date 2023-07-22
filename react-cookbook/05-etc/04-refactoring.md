---
sidebar_position: 4
---

# React 리팩토링

React 코드를 정리하는 방법과 원칙들이 있습니다.

1. 상태는 없을수록 좋습니다.
2. hook은 로직만 담습니다.
3. 반복하는 로직은 hook으로 추출합니다.
4. 비즈니스 로직의 관심사가 다르면 hook 추출로 관심사를 분리하고 추상화합니다.
5. 중첩 삼항 연산자는 어디서든지 안티패턴입니다. JSX에서도 마찬가지입니다.
6. JSX가 조건부랜더링을 하면 추출합니다.
7. JSX에 순회가 있으면 추출합니다.
8. DB랑 통신하는 state는 class로 앤티티 및 레코드 인스턴스를 만들고 메서드로 쓰기를 추상화합니다.
9. 액션은 최대한 hook에 몰아줍니다.
10. 순수 계산은 util 함수에 몰아줍니다.

## handler는 hook 아래

```tsx
function Component() {
  const handlerFromComponent = () => {
    // 이런저런 로직
  };

  const { handlerFromHook, toggle } = useHook(handlerFromComponent);

  return (
    <div>
      <button onClick={handlerFromHook}>foo</button>
      <button onClick={handlerFromComponent}>bar</button>
    </div>
  );
}
```

만약에 이렇게 작성했다면 컴포넌트 내에서 설계를 잘못한 것입니다.

```tsx
function Component() {
  const { handlerFromHook, toggle } = useHook();

  const handlerFromComponent = () => {
    // 이런저런 로직
  };

  return (
    <div>
      <button onClick={handlerFromHook}>foo</button>
      <button onClick={handlerFromComponent}>bar</button>
    </div>
  );
}
```

이런 구조로 작성하는 것이 올바릅니다.

만약에 hook이 handler를 callback로 받아야 한다면 잘못된 설계입니다. 또 나중에 잘못된 설계로 확장될 가능성이 큽니다.

## 순회는 개별 component로 추출

```tsx
import { useState } from 'react';

const arr = ['foo', 'bar', 'baz'];

function Component() {
  const [isShow, setIsShow] = useState(false);

  const handleToggleIsShow = () => {
    setIsShow();
  };

  return (
    <div>
      <button onClick={handleToggleIsShow}>{isShow ? 'hi' : 'bye'}</button>
      <ul>
        {arr.map((elem) => (
          <li>{elem}</li>
        ))}
      </ul>
    </div>
  );
}
```

위에 코드의 관심사는 다릅니다. 하나는 handler와 순회는 서로 무관합니다. 코드에 알 것은 호출이되었다는 사실만 알면 됩니다. 구현 디테일은 굳이 보여줘서 정신적인 부하를 늘릴 필요는 없습니다.

```tsx
import List from './List';

function Component() {
  const [isShow, setIsShow] = useState(false);

  const handleToggleIsShow = () => {
    setIsShow();
  };

  return (
    <div>
      <button onClick={handleToggleIsShow}>{isShow ? 'hi' : 'bye'}</button>
      <List />
    </div>
  );
}
```

코드를 위에 이렇게만 보면 이해는 상당히 직관적입니다.

```tsx
const arr = ['foo', 'bar', 'baz'];

function List() {
  return (
    <ul>
      {arr.map((elem) => (
        <li>{elem}</li>
      ))}
    </ul>
  );
}

export default List;
```

순회는 숨겨둡니다. 순회할 때 자세히 어떻게 되는지는 필요한 시점에 진입해서 읽어도 문제는 없습니다.

또 조건부 랜더링도 숨길 수 있습니다.

```tsx
import List from './List';
import Button from './List';

function Component() {
  return (
    <div>
      <Button />
      <List />
    </div>
  );
}
```

```tsx
function Button() {
  const [isShow, setIsShow] = useState(false);

  const handleToggleIsShow = () => {
    setIsShow();
  };
  return <button onClick={handleToggleIsShow}>{isShow ? 'hi' : 'bye'}</button>;
}

export default Button;
```

이렇게 되면 상위의 컴포넌트는 순수 마크업에 가까워집니다. 즉 독자 관점에서는 상태가 없어 보이게 됩니다.

---

## 래퍼런스

[I kinda hate hooks ... a refactoring story](https://www.youtube.com/watch?v=t3jC2xbEyTI)

- 조건문이 있으면 custom hook으로 추출합니다.

[React Query tips from the maintainer @tkDodo](https://www.youtube.com/watch?v=PtHRZqh3LHI)

- useEffect는 custom hook으로 추출합니다.
  - useState도 있으면 추가 랜더링도 발생할 것입니다.
- ReactQuery를 직접활용하는 것이 좋습니다. 캐시를 직접 접근하는 경우는 자제하도록 합니다.
  - useQuery에서 접근해야 리액트가 화면상 구독하고 캐싱관리를 잘합니다.
- useMutation의 반환값을 지역상태로 활용하지 않습니다.
  - loading, error flag를 편하게 활용하도록 제공하는 wrapper에 불과합니다.
  - 반환 데이터를 data를 클라이언트의 local state로 사용하도록 설계를 의도하지는 않았습니다.
  - stateManager의 역할이 아니라 갱신의 역할을 부여할 의도로 만들었습니다.
  - 1가지 방법은 반환응답을 캐시에 반영하는 것입니다. 다른 방법은 현재 캐시를 유효하지 않음 처리하고 refetch해서 받아옵니다.
  - mutation이 발생하면 캐시(useQuery)에서 데이터를 읽도록 합니다.
- 통신으로 갱신이 발생하면 option 객체에서 onSettled callback으로 queryClient.invalidateQueries에서 해당하는 캐시의 유효함을 무효처리하면 됩니다.
- queryClient는 트리에서 가장가까운 순서로 조회합니다.
- react-query의 state 모두 복사하지 말고 최소한의 state만 활용합니다.
- 사이드이펙트는 이벤트 핸들러 내에 있고 useEffect는 자제하도록 합니다.
- useQuery는 여러개의 query를 하나로 결합하는 것도 가능합니다.
  - 비즈니스 특성상 의존성을 원래부터 갖고 있으면 코드를 제어하고 중복을 제거하는 관점에서 결합이 좋습니다. 2개의 리소스를 동시에 제어하는 관점입니다.
  - 트레이드오프는 만약에 관련성이 원래부터 없었으면 무관한 리소스에 요청이 발생한다는 것입니다.
