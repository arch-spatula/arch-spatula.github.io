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

보통 PM과 디자이너가 요구사항을 정의할 때 무엇이 좋은 UX를 제공하는지 정하는 기준 중 하나는 노력 비용action cost(노력 비용)입니다. 이 action cost라는 것은 사용자가 제품을 사용하기 위한 노력비용입니다. 프론트엔드 엔지니어가 UX 소양을 갖고 있다는 것은 action cost 관리를 잘한다는 것입니다. 대부분의 경우 서버 요청비용 관리가 중요합니다. 많은 경우 PM(프로덕트 매니저) 및 서비스 기획자와 UX/UI/프로덕트 디자이너가 정의하고 프론트엔드 엔지니어가 구현합니다. 정상적인 조직에서는 프론트엔드 엔지니어에게 별로 중요하지 않은 소양이 맞습니다.

만약에 내부에 시니어 디자이너 및 PM이 없다면 프론트엔드 엔지니어가 어느정도 알아야 합니다. 경험으로 정답을 정할 수 없기 때문에 토론으로 답을 정해야 합니다.

또 PM과 디자이너가 내부에서 답을 못 정하고 있다면 해결하는 문제와 얼마나 잘 대응되는지 부터 확인합니다. 대응이 잘되는지 왜 안되는지는 action cost, 시스템 피드백, 유저테스트를 근거로 중재합니다.

## 왜 이메일을 저장해줘야 하는가?

action cost 관점으로 생각해보겠습니다. 특별한 기능지원이 없다면 유저는 매번 서비스를 접근하고자 할 때마다 들여야 하는 노력 즉 이메일 입력, 비밀번호 입력이 필요합니다. 여기서 이메일을 저장해주면 비밀번호 입력만 하면 되기 때문에 노력비용을 반으로 줄일 수 있습니다.

많은 서비스들이 사용자 정보를 저장하고 다시 방문했을 때 이메일, 비밀번호도 없이 로그인할 수 있게 해주는 것도 이런 이유로 지원해줍니다. 노력비용이 쌓이지 않고 url, 즐겨찾기 클릭 정도 수준의 노력 비용으로 낮은 지불의사에 맞춰줄 수 있습니다.

여기서 더 좋은 것은 실제 서비스처럼 비밀번호 입력 노력도 덜어주는 것입니다. 하지만 지금은 보류하겠습니다.

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

export default SignIn;
```

이렇게 소비하면 됩니다. 저장할지말지를 storage를 기준으로 보존하고 상태를 제어합니다.

이렇게 하고도 새로고침해도 여전히 input에 이메일이 남아있을 것입니다.
