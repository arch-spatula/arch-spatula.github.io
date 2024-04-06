---
sidebar_position: 1
description: '자바스크립트 특수 API'
---

# 자바스크립트 특수 API

자바스크립트에서 사용할 수 있는 특수한 API를 사용한 경험들을 다룹니다.

## Observer API

앞으로 다룰 API입니다.

- 무한 스크롤을 위해 사용하는 [Intersection Observer](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API)
- 화면의 요소 변화를 감지하는 [Resize Observer](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
  - Resize Observer는 제가 회사에서 사용할 일이 있었는데 귀찮아서 아직 정리를 안 했습니다.
- 성능 측정을 위한 [Performance Observer](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)

## queueMicrotask

```js 
let callback = () => log("일반 타임아웃 콜백을 실행했습니다.");

let urgentCallback = () => log("*** 앗! 긴급 콜백을 실행했습니다!");

log("주 프로그램 시작");
setTimeout(callback, 0);
queueMicrotask(urgentCallback);
log("주 프로그램 종료");

// 주 프로그램 시작
// 주 프로그램 종료
// *** 앗! 긴급 콜백을 실행했습니다!
// 일반 타임아웃 콜백을 실행했습니다.
```

- 마이크로 테스크에 해당하는 함수를 직접 만드는 것도 가능합니다.
- 언어에서 Task Queue에서 우선순위가 높은 콜백을 이제 프로그래머의 제어권에 들어오게 됩니다.
- TaskQueue에 대한 [심층 탐구 문서](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth)도 있습니다.
- [마이크로태스크 사용](https://developer.mozilla.org/ko/docs/Web/API/HTML_DOM_API/Microtask_guide)하는 방법을 직접 보여줍니다.
