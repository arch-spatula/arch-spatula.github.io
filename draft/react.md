### 좋은 리액트 코드의 기준

- JSX 컴포넌트는 상태가 없을수록 좋은 코드입니다. 상태는 최대한 hook에서 제어하고 JSX에 주입하는 방식으로 제어할 것을 권장합니다.

## 여기저기 돌아다니는 custom hook

useScrollTop

```ts
import { useCallback } from 'react';

const useScrollTop = () => {
  const scrollTop = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);
  return scrollTop;
};

export default useScrollTop;
```

이 custom hook은 보통 페이지 전환을 하면 SPA는 보통 스크롤 위치를 기억하고 있기 때문에 이 단점을 극복하는 hook입니다. 극단적으로 단순합니다.

```ts
import { useEffect } from 'react';

/**
 * @see https://joylee-developer.tistory.com/185
 * 뒷배경 스크롤을 정지시킵니다.
 * Model과 함께 사용할 것을 권장합니다.
 */

const useStopScroll = () => {
  // 모달 오버레이에서 스크롤 방지
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

이 custom hook은 modal을 활용할 때 뒤 배경의 스크롤 동작을 차단하기 위한 custom hook입니다.
