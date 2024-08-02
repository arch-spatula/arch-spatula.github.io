---
sidebar_position: 2
tags: ['compile', 'core', 'loop']
---

# 이터러블(iterable)

자바스크립트에서 순회가 가능한 자료형들이 있습니다. 이것은 왜 순회가 가능한가? 아주 늦게 의문이 들 수 있습니다.

어플리케이션 엔지니어는 다룰 일이 거의 없지만 바닥부터 시작하는 라이브러리 엔지니어는 가끔 다룰지도 모릅니다.

## 이터러블(iterable) 이란 무엇인가?

자바스크립트에는 내부적으로 다양한 숨겨진 프로퍼티가 있습니다. 이것을 이해하기 위해서는 먼저 symbol을 이해해야 합니다. symbol은 겹치지 않는 자료라고 볼 수 있습니다.

```js
const arr = ['a', 'b', 'c'];

for (const char of arr) console.log(char); // a, b, c

arr[Symbol.iterator] = function () {
  let idx = 0;
  let arr = this;
  return {
    next: function () {
      if (idx >= arr.length) return { done: true };
      else {
        const value = (arr[idx] += ' 🤯');
        idx += 1;
        return { value, done: false };
      }
    },
  };
};

for (const char of arr) console.log(char); // a 🤯, b 🤯, c 🤯
```

이렇게 하면 이터러블 히든 프로퍼티를 오버리이드할 수 있습니다.

본인이 만든 클래스가 있다면 순회 중에 특수한 동작을 하도록 만들고 싶으면 이런것도 분명히 전략이 될 것입니다.

<!-- https://www.youtube.com/watch?v=x7Xzvm0iLCI -->
