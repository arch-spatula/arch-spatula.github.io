---
description: 'React Query'
tags: ['React Query', 'introduction']
sidebar_position: 6
---

# React Query

React Query는 간단하게 말하면 서버 상태관리(Server State Management) 라이브러리입니다. 하지만 이것은 편의상 사용하는 용어입니다. 정확히는 data fetching, data caching 라이브러리입니다.

data fetching의 상태를 관리한다는 것은 서버랑 통신이 진행 중인지, 성공했는지, 실패했는 관리한다는 것입니다.

data caching을 관리한다는 것은 라이브러리마다 다를 수 있습니다. 하지만 동일한 요청을 보내기 전에 캐싱된 데이터를 보여주고 갱신이 된 부분은 받아고 화면에 방영해준다는 것입니다.

## React Query 용어

쿼리 캐시(query cache): 서버에서 데이터를 가져오고 저장한 값을 보고 쿼리 캐시라고 합니다.

- 쿼리 캐시는 인메모리로 저장합니다. 그래서 새로고침하면 없기 때문에 refetch합니다.

Stale Time: 요청한 쿼리가 유효하다고 간주하는 시간입니다.

- 기본값으 `0`으로 설정되어 있습니다. 다른 사용자가 데이터를 갱신했을 가능성이 높기 때문에 둔 설정입니다.
- 그냥 두면 서버에 요청횟수가 너무 많아질 수 있습니다. 어림잡아 20초 정도 설정하면 무난합니다. <!-- tkdodo의 권고입니다. -->
- 부모컴포넌트에서 호출하고 자식 컴포넌트에서 호출하는데 랜더링을 나중에 처리해서 또 요청할 가능성이 있으면 Stale Time 설정으로 막을 수 있습니다.
- Stale Time 설정은 비즈니스 도메인의 문제입니다. 자주 갱신할지 갱신을 막을지 맥락에 따라 다릅니다.

Query Invalidation: 요청한 쿼리가 유효하지 않다고 처리하는 것입니다.

- Stale Time이 지나기 전이라도 유효하지 않다고 처리하면 refetch합니다.
  - Stale 하고 말고 상관없이 쿼리가 유효하지 않다고 하기 때문입니다.

isLoading, isFetching: 모두 서버에 요청을 처리하고 있는 상태를 나타내지만 캐시의 보유여부에 따라 다릅니다.

- isLoading, isFetching 모두 flag state입니다.
- isLoading은 캐시를 보유하지 않고 서버에 요청을 보내는 상태라고 합니다.
- isLoading은 캐시를 받고 다시 서버에 요청을 하게 되면 활성화 되지 않습니다.
- isFetching은 데이터를 캐싱하고 말고 상관없이 데이터를 요청하는 상태를 말합니다.
- 유저가 중간 저장할 때 로딩 스피너(Notion 확인해보기 바랍니다)를 보여줘야 한다면 활용할 수 있는 flag입니다.

## React Query Error Log

리액트 쿼리를 활용하면서 경험했던 문제들입니다.

### mutation 함수의 인자는 1개

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
