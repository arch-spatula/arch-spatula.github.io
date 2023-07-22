---
description: '스크롤을 정지하는 방법입니다.'
tags: ['react', 'modal']
sidebar_position: 2
---

# useStopScroll

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
