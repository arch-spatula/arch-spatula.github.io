---
description: 'modal, dropdown 같은 상황에 많이 사용하는 hook입니다.'
tags: ['react', 'modal']
sidebar_position: 2
---

# useOutsideClick

modal, dropdown 같은 상황에 많이 사용하는 hook입니다.

```ts
import { useCallback, useEffect, useRef, useState } from 'react';

type OutSideProviderProps = {
  component: JSX.Element;
};

export function useOutsideClick<T extends HTMLElement>() {
  const nonTargetAreaRef = useRef<T>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (nonTargetAreaRef.current?.contains(e.target as Node) === false) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [handleClick]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleRevers = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const OutsideProvider = ({ component }: OutsideProviderProps) => {
    return <>{isOpen && component}</>;
  };

  return {
    nonTargetAreaRef,
    isOpen,
    handleClose,
    handleOpen,
    handleRevers,
    OutsideProvider,
  };
}
```

```tsx
export function DropdownMenu({
  menuItem,
  direction = 'left',
}: DropdownMenuProps) {
  const { nonTargetAreaRef, isOpen, handleRevers, OutsideProvider } =
    useOutsideClick<HTMLDivElement>();

  return (
    <DropdownMenuContainer ref={nonTargetAreaRef}>
      <DropdownOpen type="button" onClick={handleRevers} isOpen={isOpen}>
        <Icon />
      </DropdownOpen>
      <OutsideProvider
        component={<Menu menuItem={menuItem} direction={direction} />}
      />
    </DropdownMenuContainer>
  );
}
```

이렇게 소비하면 됩니다. ref는 클릭하면 사라질 외부영역을 지정합니다. isOpen은 보이고 안보이고 상태를 이야기합니다.

`OutsideProvider`는 조건부 랜더링인데 hook의 소비는 조건부 랜더링이라는 사실을 알 필요없습니다.

설명하면서 다시 생각해보니까 isViable이 더 좋은 이름인 것 같습니다.
