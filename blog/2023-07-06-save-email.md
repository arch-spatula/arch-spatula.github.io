---
title: '이메일 저장하기'
authors: [arch-spatula]
tags: ['react', 'ux', 'auth']
description: '이메일을 저장하는 방법입니다.'
toc_max_heading_level: 6
---

# 이메일 저장하기

이메일 저장하는 방법입니다. 하지만 이 방법을 적용하기 전에 왜 저장해야 하는가? 이것은 ux 문제입니다.

<!--truncate-->

## 프론트엔드 엔지니어를 위한 짧은 UX 지식

보통 PM과 디자이너가 요구사항을 정의할 때 무엇이 좋은 UX를 제공하는지 정하는 기준 중 하나는 action cost입니다. 이 action cost라는 것은 사용자가 제품을 사용하기 위한 노력 비용 혹은 동작 비용이라고 직역할 수 있습니다. 프론트엔드 엔지니어가 UX 소양을 갖고 있다는 것은 action cost 관리를 잘한다는 것입니다.

![](https://user-images.githubusercontent.com/84452145/252849357-b8b244c1-e454-438e-bc9b-098933706bb8.gif)

대표적인 경우 검색의 자동완성도 해당합니다. 검색을 위해 모든 것을 다 입력하기 전에 사람들이 많이 찾는 정보를 제시하고 선택할 수 있게 합니다. 모든 입력을 위한 노력을 아껴줄 수 있습니다.

참고로 프론트엔드 엔지니어의 작업은 대부분은 서버 요청비용 관리입니다. 최소한의 요청으로 실제 비용관리를 잘하는 프론트엔지니어가 UX 소양이 있는 엔지니어보다 훨씬더 가치가 있습니다. 이 action cost 관점에서 사용자의 동작최적화는 PM과 디자이너의 역할입니다.

<!-- 상황에 따라 프론트엔드 엔지니어도 알아야 하는 경우가 있습니다. 개발팀 규모 대비 비개발직군 규모가 극단적으로 작은 경우가 있습니다. 다른 경우는 만약에 내부에 시니어 디자이너 및 PM이 없다면 프론트엔드 엔지니어가 어느정도 알아야 합니다. 경험으로 정답을 정할 수 없기 때문에 토론으로 답을 정해야 합니다.

규모가 많이 작은 스타트업이라도 PM(프로덕트 매니저) 및 서비스 기획자와 UX/UI/프로덕트 디자이너가 정의하고 프론트엔드 엔지니어가 구현합니다. 개발을 설계하고 진행하면서 비개발직군이 고려하지 못하고 반드시 발생하게 될 엣지케이스와 코너케이스는 중간중간에 바로 말하면 됩니다.

정상적인 조직에서는 프론트엔드 엔지니어에게 별로 중요하지 않은 소양이 맞습니다.

하지만 이것은 책속의 이야기이고 대부분 우리는 이상한 회사에 다니고 대부분 회사도 이상하기 때문에 PM이 알아서 센스있게 라는 말을 일상적으로 하고 디자이너는 디자인을 하다말고 느낌에 맞게 남은 부분 알아서 채워달라고 하는 곳이 많습니다.

또 PM과 디자이너가 내부에서 답을 못 정하고 있다면 해결하는 문제와 얼마나 잘 대응되는지 부터 확인합니다. 대응이 잘되는지 왜 안되는지는 action cost, 시스템 피드백, 유저테스트를 근거로 중재합니다. -->

## 왜 이메일을 저장해줘야 하는가?

![](https://user-images.githubusercontent.com/84452145/252849741-6b807921-160d-4972-a401-cdef848f2656.gif)

action cost 관점으로 생각해보겠습니다. 특별한 기능지원이 없다면 유저는 매번 서비스를 접근하고자 할 때마다 들여야 하는 동작 즉 이메일 입력, 비밀번호 입력이 필요합니다. 여기서 이메일을 저장해주면 비밀번호 입력만 하면 되기 때문에 노력비용을 반으로 줄일 수 있습니다. DAU를 높이기 위해서 동작을 이런식으로 간소회 시킬 수 있습니다.

많은 서비스들이 사용자 정보를 저장하고 다시 방문했을 때 이메일, 비밀번호도 없이 로그인할 수 있게 해주는 것도 이런 이유로 지원해줍니다. 노력비용이 쌓이지 않고 url, 즐겨찾기 클릭 정도 수준의 노력 비용으로 낮은 지불의사에 맞춰줄 수 있습니다.

여기서 더 좋은 것은 실제 서비스처럼 비밀번호 입력 노력도 덜어주는 것입니다. 하지만 지금은 보류하겠습니다. ~~그 짐은 미래의 저에게 전가하겠습니다.~~

## 이메일 저장하기 적용

```tsx title="useInput"
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

`useInput`이 이렇게 있습니다. 생각보다 사용이 많고 다른 hook들도 의존을 많이 합니다. util 계층에 있는 hook으로 분류하는 것이 좋을 것 같습니다.

```tsx
// ... import 생략

function Component() {
  const {
    inputVal: emailValue,
    changeInputVal: changeEmail,
    inputRef: emailRef,
    focusInput: focusEmail,
  } = useInput(localStorage.getItem('email') ?? '');

  const [isChecked, setIsChecked] = useState<boolean>(
    !!localStorage.getItem('email')
  );

  // ...생략

  const signIn = async () => {
    // ... api 호출 생략
    if (isChecked) localStorage.setItem('email', emailValue);
  };

  const handleSaveEmail = () => {
    if (isChecked) {
      localStorage.removeItem('email');
      setIsChecked(false);
    } else {
      localStorage.setItem('email', emailValue);
      setIsChecked(true);
    }
  };

  return (
    <>
      <input
        type="email"
        onChange={changeEmail}
        value={emailValue}
        customRef={emailRef}
        placeholder="user@email.com"
      />
      <input type="checkbox" value={isChecked} onClick={handleSaveEmail} />
    </>
  );
}

export default Component;
```

이렇게 소비하면 됩니다. 저장할지말지를 storage를 기준으로 보존하고 상태를 제어합니다.

이렇게 하고도 새로고침해도 여전히 input에 이메일이 남아있을 것입니다.

## custom hook 추출

```ts title="useEmailSave.ts"
import { STORAGE_KEY } from '@/constant/config';
import { useInput } from '..';
import { useState } from 'react';

export function useEmailSave() {
  const {
    inputVal: emailValue,
    changeInputVal: changeEmail,
    inputRef: emailRef,
    focusInput: focusEmail,
  } = useInput(localStorage.getItem(STORAGE_KEY.EMAIL) ?? '');

  const [isChecked, setIsChecked] = useState(
    !!localStorage.getItem(STORAGE_KEY.EMAIL)
  );

  const storeEmail = () => {
    if (isChecked) localStorage.setItem(STORAGE_KEY.EMAIL, emailValue);
  };

  const handleSaveEmail = () => {
    if (isChecked) {
      storeEmail();
      setIsChecked(false);
    } else {
      localStorage.setItem(STORAGE_KEY.EMAIL, emailValue);
      setIsChecked(true);
    }
  };

  return {
    emailValue,
    changeEmail,
    emailRef,
    focusEmail,
    handleSaveEmail,
    storeEmail,
    isChecked,
  };
}
```

이렇게 정의하고 조합합니다. `useInput`은 더 상위 계층인 util로 간주하고 호출로 주입받습니다. 그리고 이메일을 `localStorage`에 읽고 쓰는 로직을 모두 몰아 넣습니다.

```tsx
function Component() {
  const {
    emailValue,
    emailRef,
    storeEmail,
    focusEmail,
    changeEmail,
    handleSaveEmail,
    isChecked,
  } = useEmailSave();

  // ...생략

  const signIn = async () => {
    // ... api 호출 생략
    if (isChecked) localStorage.setItem('email', emailValue);
  };

  return (
    <>
      <input
        type="email"
        onChange={changeEmail}
        value={emailValue}
        customRef={emailRef}
        placeholder="user@email.com"
      />
      <input type="checkbox" value={isChecked} onClick={handleSaveEmail} />
    </>
  );
}

export default Component;
```

소비할 때는 이렇게 호출하면 됩니다. 로직처리할 함수를 꺼내서 조합하면 됩니다.

## 결과

![](https://user-images.githubusercontent.com/84452145/252849762-3e35c4a4-e737-49aa-8c7b-f87dc3e818ee.gif)

최종 적용은 이렇게 됩니다.
