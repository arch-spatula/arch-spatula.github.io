---
title: 'useStopScroll'
authors: [arch-spatula]
tags: ['react', 'custom hook']
description: '스크롤을 정지하는 방법입니다.'
toc_max_heading_level: 6
---

# useStopScroll

스크롤을 정지시키는 custom hook입니다. modal에서 많이 호출합니다.

<!--truncate-->

modal이 활성화(onMount 시점이)되면 scroll을 정지시켜야 합니다. 이 기능을 잊었습니다.

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

[useStopScroll - Codefolio](https://github.com/react-challengers/Codefolio/blob/dev/hooks/common/useStopScroll.ts)

예전에 제가 만들었던 hook입니다. 아 물론 제가 만든 것은 아니고 제가 보고 붙인 hook입니다.

또 다른 블로그에서 보고 적용한 것입니다.
