---
description: 'React Query Error Log'
tags: ['React Query', 'introduction']
sidebar_position: 99
---

# React Query Error Log

리액트 쿼리를 활용하면서 경험했던 문제들입니다.

## mutation 함수의 인자는 1개

이미 해결하고 큰 문제는 아닙니다.

선언할 때는 문제가 없습니다. 호출할 때 문제가 됩니다. 호출하면 인자는 1개만 대입할 수 있습니다.

```js
// mutation 함수정의
export const SignUp = async (payload) => {
  const { email, password } = payload;
  Keyboard.dismiss(); // 버튼 클릭 시 키보드 접기
  return createUserWithEmailAndPassword(authService, email, password);
};

// custom hook 정의
export const useSignUp = () => {
  return useMutation(SignUp, {
    onError: (error) => {
      if (error.message.includes('email-already-in-use')) {
        alert(
          '이미 가입된 이메일입니다. 로그인을 시도하거나 다른 이메일을 사용해 주세요.'
        );
      }
    },
  });
};

// custom hook 호출
const { mutate: signUp } = useSignUp();

// mutation 함수 호출
signUp({ email, password });
```

1사용할 때는 1개의 인자만 대입할 수 있습니다. 그래서 객체 1개에 모든 것을 담아야 합니다.

2023년 지금 시점에서 부족한 백엔드 지식을 활용하면 DTO처럼 생각하면 됩니다.
