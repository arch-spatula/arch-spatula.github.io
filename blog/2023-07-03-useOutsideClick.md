---
title: 'useOutSideClick'
authors: [arch-spatula]
tags: ['react', 'custom hook']
description: 'dropdown, modal, accordion 등 컴포넌트 로직에 자주 사용하는 로직입니다. 모두 개별적으로 만들지 말고 이 hook 하나 호출하고 적용해야 인생이 편해집니다.'
toc_max_heading_level: 6
---

# useOutSideClick

dropdown, modal, accordion 등 컴포넌트 로직에 자주 사용하는 로직입니다. 모두 개별적으로 만들지 말고 이 hook 하나 호출하고 적용해야 인생이 편해집니다.

<!--truncate-->

```tsx
import { useCallback, useEffect, useRef, useState } from 'react';

type OutSideProviderProps = {
  component: JSX.Element;
};

export function useOutsideClick<T extends HTMLElement>() {
  const areaRef = useRef<T>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (areaRef.current?.contains(e.target as Node) === false) {
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

  const OutSideProvider = ({ component }: OutSideProviderProps) => {
    return <>{isOpen && component}</>;
  };

  return {
    customRef: areaRef,
    isOpen,
    handleClose,
    handleOpen,
    handleRevers,
    OutSideProvider,
  };
}
```

더 보완된 `useOutsideClick`입니다. 조건부 랜더링을 활용하는 점도 추상화했습니다.
