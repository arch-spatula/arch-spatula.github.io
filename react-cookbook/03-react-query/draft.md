---
description: 'React Query 용어'
tags: ['React Query', 'introduction']
sidebar_position: 2
draft: true
---

https://velog.io/@drrobot409/Firebase-Auth-error-%EB%AA%A8%EC%9D%8C%EC%A7%91#authinternal-error

파이어 베이스는 다양한 에러를 뿜습니다. 위 에러 모음은 유용합니다.

## 병렬 쿼리에 error boundary를 적용할 수 있는가?

https://github.com/TanStack/query/issues/2395

넹

병렬 쿼리는 보통 계층 구조에서 많이 의존하는데 다른 hook이 호출하면 모두 에러가 발생해서 모두 error boundary처리를 해야 합니다.

## TIL.23.01.10. - 낙관과 난관사이

낙관적 업데이트 말고 난관적 업데이트를 구현했습니다.

```js
// 약 isTaken 업데이트 함수 / firestore에 약 복용 정보 업데이트
const toggleTakenPill = ({ id, togglePayload }) => {
  return updateDoc(doc(dbService, 'pill', id), {
    ...togglePayload,
    isTaken: !togglePayload.isTaken,
  });
};

/**
 * 약 isTaken 업데이트 함수
 * 낙관적 업데이트로 캐시를 먼저 업데이트가 되고 서버에 반영되는 패턴입니다.
 * 참고로 캐시가 업데이트 되면서 UI가 업데이트 됩니다.
 * @returns useMutation
 */
export const useToggleTakenPill = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleTakenPill, {
    onMutate: async (togglePill) => {
      // 쿼리를 취소합니다.
      await queryClient.cancelQueries(['pill-list']);

      // 기본 데이터를 저장합니다.
      const previousPillList = queryClient.getQueryData(['pill-list']);

      // 새롭게 변형된 데이터로 설정합니다.
      queryClient.setQueriesData(['pill-list'], (old) => {
        // useGetPillData에서 데이터를 선택하는 것과 유사한 파이어베이한 로직 문제입니다
        old.docs.map((doc) => {
          return doc.id === togglePill.id
            ? // 복용하면서 isTaken을 false에서 true로 변경합니다. 반대도 동작합니다.
              {
                ...doc.data(),
                id: doc.id,
                isTaken: togglePill.togglePayload.isTaken,
              }
            : // 안 건드린 약입니다.
              { ...doc.data(), id: doc.id };
        });

        // 파이어베이스로 선택한 데이터를 반환합니다.
        return old;
      });

      // 저장한 값을 먼저 반환합니다.
      return { previousPillList };
    },

    onSuccess: () => {
      // console.log('성공');
    },

    onError: (__err, __togglePill, context) => {
      // console.log('실패');
      queryClient.setQueryData(['pill-list'], context.previousPillList);
    },

    onSettled: (togglePill) => {
      // 통신 후 서버에 반영합니다.
      queryClient.invalidateQueries(['pill-list']);
    },
  });
};
```

경고도 없습니다. 정상 구현했다는 착각을 갖는 것 같습니다.

## TIL.23.01.12. - 낙관인가? 난관인가?

# 진정한 낙관적 업데이트

https://tanstack.com/query/v4/docs/react/guides/optimistic-updates

낙관적 업데이트를 유스케이스를 소개하는 공식 문서입니다.

참고로 저는 파이어베이스를 DB로 선택했습니다. 엄청나게 나쁜 선택이었습니다. 통신에 대해서 독선적(opinionated)입니다.

```js
// 약 isTaken 업데이트 함수 / firestore에 약 복용 정보 업데이트
const toggleTakenPill = ({ id, togglePayload }) => {
  return updateDoc(doc(dbService, 'pill', id), {
    ...togglePayload,
    isTaken: !togglePayload.isTaken,
  });
};

/**
 * 약 isTaken 업데이트 함수
 * 낙관적 업데이트로 캐시를 먼저 업데이트가 되고 서버에 반영되는 패턴입니다.
 * 참고로 캐시가 업데이트 되면서 UI가 업데이트 됩니다.
 * @returns useMutation
 */
export const useToggleTakenPill = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleTakenPill, {
    onMutate: async (togglePill) => {
      // 쿼리를 취소합니다.
      await queryClient.cancelQueries(['pill-list']);

      // 기본 데이터를 저장합니다.
      const previousPillList = queryClient.getQueryData(['pill-list']);

      // 새롭게 변형된 데이터로 설정합니다.
      queryClient.setQueryData(['pill-list'], (old) => {
        return {
          ...old,
          docs: old.docs.map((doc) => {
            return doc.id === togglePill.id
              ? {
                  ...doc,
                  data: () => ({
                    ...doc.data(),
                    isTaken: !togglePill.togglePayload.isTaken,
                  }),
                }
              : doc;
          }),
        };
      });

      // 저장한 값을 먼저 반환합니다.
      return { previousPillList };
    },

    onSuccess: () => {
      // console.log('성공');
    },

    onError: (__err, __togglePill, context) => {
      // console.log('실패');
      queryClient.setQueryData(['pill-list'], context.previousPillList);
    },

    onSettled: (togglePill) => {
      // 통신 후 서버에 반영합니다.
      queryClient.invalidateQueries(['pill-list']);
    },
  });
};
```

이런 패턴입니다. 이전에는 쿼리캐시를 이상하게 업데이트했습니다. 이번에는 업데이트가 잘 반영되지만 여전히 많은 문제를 갖고 있습니다.

여기서 DB는 파이어베이스를 사용하면서 중대한 문제가 발생했습니다.

```js
// 사용자의 약 읽기 함수 / firestore에 사용자의 약 정보 읽기
const getPill = (uid) => {
  const selectedDocs = query(
    collection(dbService, 'pill'),
    where('userId', '==', uid)
  );
  return getDocs(selectedDocs);
};

/**
 * 약 읽기 함수 / 의존성을 갖는 쿼리입니다. 사용자 정보를 먼저 요청해야 사용할 수 있습니다.
 * @param {String} uid useUID custom hook의 반환값을 대입합니다.
 * @returns isLoading, isError, error, data: pillList,
 */
export const useGetPillData = (uid) => {
  return useQuery('pill-list', () => getPill(uid), {
    enabled: !!uid,
    refetchOnWindowFocus: true,
    // TODO: 실시간 업데이트 반영 옵션 활성화하기
    select: (data) => {
      const dataArr = [];
      data.docs.forEach((doc) => dataArr.push({ ...doc.data(), id: doc.id }));

      /**
       * 시간 순서로 정렬해주는 함수입니다. ASCII기준으로 정렬을 했습니다. 정렬해준 상태로 내보내줍니다.
       * 타임스탬프 반영 이후 리팩토링 해도 괜찮습니다.
       * @see https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
       * @param {object} a
       * @param {object} b
       * @returns {number}
       */
      const sortByTime = (a, b) => {
        /**
         * @returns ["AM" or "PM", 시*60 + 분]
         */
        const parseTimeOrder = (timeString) => {
          // 숫자 비교
          const [selectTime, noon] = translateTime(
            strToObjTime(timeString.time)
          ).split(' ');
          const [hour, minute] = selectTime.split(':');
          return [noon, +hour * 60 + +minute];
        };

        const [noonA, minuteA] = parseTimeOrder(a);
        const [noonB, minuteB] = parseTimeOrder(b);

        // AM PM 비교
        if (noonA > noonB) return 1;
        if (noonA < noonB) return -1;
        // 분단위 시간 비교
        if (minuteA > minuteB) return 1;
        if (minuteA < minuteB) return -1;
      };

      dataArr.sort(sortByTime);
      return dataArr;
    },
    refetchOnMount: true,
  });
};
```

저는 `select` 옵션으로 쿼리 캐시에 직접 변형을 가하게 될 것이라고 착각했습니다. 그냥 선택만 해줍니다.

즉 파이어베이스의 더러운 객체 상태인 그대로 남아있고 그 객체랑 비슷하게 변형을 가해야 했습니다.

그래서 정신 건강을 위해 react-query-firebase를 배웁시다.

https://react-query-firebase.invertase.dev/

아니면 supabase를 배웁시다. 저는 supabase를 배우고 싶습니다. 그리고 리액트 쿼리는 순수하게 냅두고 싶습니다.
