---
sidebar_position: 2
description: '관용어구'
---

# 관용어구

자바스크립트, 타입스크립트를 다루면서 자주 작성하는 대표적인 관용어구입니다.

## 가드 혹은 부정 negate

```js
/**
 * @param {boolean} arg
 */
function main(arg) {
  if (arg) {
    // 이런저런 로직
  }
}

main();
```

```js
/**
 * @param {boolean} arg
 */
function main(arg) {
  if (!arg) return;
  // 이런저런 로직
}

main();
```

이렇게 부정하면 네스팅을 안 할 수 있습니다.

타입스크립트를 사용하면 타입가드가 해당합니다. 타입가드면 해당하는 타입이 아닐 때 로직을 중단하고 해당하면 이어서 로직을 처리합니다. 모던한 IDE의 LSP 성능만 좋다면 타입추론을 쉽게 해서 자동완성도 더 확실하고 잘 지원해줄 것입니다.

```ts
function main(x: number | null) {
  if (!x) return null;
  let result = 0;
  for (let i = 0; i < x; i++) result += i;
  return result;
}
```

## 1줄 처리

조건문에 많이 활용하는데 반복문에서도 활용할 수 있습니다.

```js
/**
 * @param {boolean} arg
 * @param {Record<string, number>} foo
 */
function main(arg, foo) {
  if (arg) foo.bar += 1;
}

main();
```

반복문도 1줄로 표현할 수 있습니다.

```js
/**
 * @param {number[]} arg
 * @param {Record<string, number>} foo
 */
function main(arg, foo) {
  for (let i = 0; i < arg.length; i++) foo.bar += 1;
}

main();
```

<!--
## 메서드 쿼리

switch case문 대신에 활용해볼 수 있는 패턴입니다.

정재남 선생님이 소개해준 패턴입니다.

-->

<!-- ## 예외처리로 실행 중단 -->
