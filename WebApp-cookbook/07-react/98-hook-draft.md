---
sidebar_position: 98
draft: true
---

# hooks

hook 용어는 소프트웨어 엔지니어링 분야에서 React 고유한 개념은 아닙니다. webhook이라는 것도 존재합니다.

소프트웨어 엔지니어링에서 특정 기능을 주입한다는 개념입니다.

## React hooks

- React의 버전마다 hook이 추가되기도 하고 삭제되기도 합니다.
- React hook은 로직을 담는 함수입니다. 프론트엔드 엔지니어링할 때 로직을 재사용할 수 있다는 점도 좋습니다.
- html에 해당하는 View에 관한 로직을 hook을 호출해서 해서 비즈니스 로직을 주입할 수 있습니다.
- 로직을 분리 하면 테스트도 쉬워집니다.
- 서비스를 운영해보면 View와 관련 요구사항은 자주 바뀌지만 비즈니스 로직은 상대적으로 덜바뀌거나 바뀌는 규모가 작습니다.

hook의 규칙이 있습니다. use를 접두어로 붙여야 합니다. 컴포넌트 함수 내에서 최상단으로 선언해야 합니다.

## useState

## useEffect

Mount, Update, Unmount 라이프 사이클에 접근하고 로직을 실행할 수 있습니다.

## useRef

Ref를 접미어로 붙이는 것이 컨벤션입니다.

## useReducer

확장에는 열려있지만 변화에 닫혀있는 코드를 함수와 객체를 활용해서 처리할 수 있습니다.

useState에서 사용하고 있는 로직이 복잡하면 리팩토링을 위해 활용할 수 있는 hook입니다.

## useMemo

깊게 생각하기 어려우면 로직상 정렬하면 사용하면 됩니다.

동일한 계산을 다시 처리해야 하면 비효율적일 수 있습니다. 계산비용을 절약할 때 활용하는 hook입니다.

## useCallback

custom hook에서 정의한 handler는 useCallback에 감싸서 사용하면 됩니다.

CallbackRef로 응용할 수 있습니다.


