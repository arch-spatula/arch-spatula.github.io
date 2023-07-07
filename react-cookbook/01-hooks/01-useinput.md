---
description: '문서에 대해서 개괄적으로 설명합니다.'
tags: ['react', 'intro', 'form']
sidebar_position: 1
---

# useInput

초기 프로젝트에 대표적으로 사용하는 custom hook입니다.

## 전형적인 useInput

```ts
import React, { useCallback, useRef, useState } from 'react';

export function useInput(init = '') {
  const [inputVal, setInputVal] = useState(init);
  const inputRef = useRef<HTMLInputElement>(null);

  const changeInputVal = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputVal(e.target.value);
    },
    []
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
import { ChangeEvent, useState } from 'react';

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
          resetObject[item] = '';
        });
      }

      return prev;
    });
  };

  const resetSpecificInput = (field: keyof T) => {
    setInputValues((prev) => ({
      ...prev,
      [field]: '',
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
  }>({ id: '', pw: '' });

  return (
    <>
      <input
        value={inputValues.id}
        placeholder="user@user.com"
        onChange={handleInputChange('id')}
        type="email"
      />
      <input
        value={inputValues.pw}
        placeholder="8자리 이상 입력해주십시오."
        onChange={handleInputChange('pw')}
        type="password"
      />
    </>
  );
}
```
