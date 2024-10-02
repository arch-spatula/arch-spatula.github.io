---
description: "초기 프로젝트에 input 제어를 위해 사용하는 대표적으로 사용하는 custom hook입니다."
sidebar_position: 5
---

# custom hook

## 전형적인 useInput

초기 프로젝트에 input 제어를 위해 사용하는 대표적으로 사용하는 custom hook입니다.

```ts
import React, { useCallback, useRef, useState } from "react";

export function useInput(init = "") {
  const [inputVal, setInputVal] = useState(init);
  const inputRef = useRef<HTMLInputElement>(null);

  const changeInputVal = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputVal(e.target.value);
    },
    [],
  );

  const resetInputVal = useCallback(() => {
    setInputVal(init);
  }, [init]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return { inputVal, changeInputVal, resetInputVal, focusInput, inputRef };
}
```

이렇게 정의합니다.

```tsx
function Component() {
  const emailInput = useInput();
  const passwordInput = useInput();

  return (
    <>
      <input
        value={emailInput.inputVal}
        placeholder="user@user.com"
        onChange={emailInput.changeInputVal}
        ref={emailInput.inputRef}
        type="email"
      />
      <input
        value={passwordInput.inputVal}
        placeholder="8자리 이상 입력해주십시오."
        onChange={passwordInput.changeInputVal}
        ref={passwordInput.inputRef}
        type="password"
      />
    </>
  );
}
```

이렇게 소비합니다.

## 저성능 편한 제어

1번 호출하고 여러번 적용할 수 있습니다. 하지만 성능이 나쁩니다.

```ts
import { ChangeEvent, useState } from "react";

function useInput<T>(inputGroup: T) {
  const [inputValues, setInputValues] = useState(inputGroup);

  const handleInputChange = (field: keyof T) => {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInputValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };
  };

  const resetAllInput = () => {
    const resetObject: { [key: string]: string } = {};
    setInputValues((prev) => {
      if (prev) {
        Object.keys(prev).forEach((item) => {
          resetObject[item] = "";
        });
      }

      return prev;
    });
  };

  const resetSpecificInput = (field: keyof T) => {
    setInputValues((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  return { handleInputChange, inputValues, resetAllInput, resetSpecificInput };
}

export default useInput;
```

```tsx
function Component() {
  const { inputValues, handleInputChange } = useInput<{
    id: string;
    pw: string;
  }>({ id: "", pw: "" });

  return (
    <>
      <input
        value={inputValues.id}
        placeholder="user@user.com"
        onChange={handleInputChange("id")}
        type="email"
      />
      <input
        value={inputValues.pw}
        placeholder="8자리 이상 입력해주십시오."
        onChange={handleInputChange("pw")}
        type="password"
      />
    </>
  );
}
```

## useOutsideClick

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
  direction = "left",
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

## useStopScroll

`OnMount` 시점에 스크롤을 정지시키고 `UnMount` 시점에 스크롤을 다시 동작할 수 있게 만드는 custom hook입니다.[^1]

```ts
import { useEffect } from 'react';

const useStopScroll = () => {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);
};

export default useStopScroll;
```

DOM을 직접 접근해야 하기 때문에 권장하지 않는 방식이지만 최선입니다. 참고로 overlay를 다룰 때 조심하기 바랍니다.

[^1]: [[React] Modal 만들기(2) 외부화면 스크롤 방지하기](https://joylee-developer.tistory.com/185)
