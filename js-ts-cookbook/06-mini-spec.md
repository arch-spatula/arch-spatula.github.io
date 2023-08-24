---
sidebar_position: 6
description: '자바스크립트의 이상한 상세 스펙을 다룹니다.'
---

# 오늘도 자바스크립트는 저를 실망시키지 않습니다.

## 자바스크립트는 음수 0을 지원합니까?

```js
console.log(Object.is(-0, 0)); // false
```

네

## null은 객체인가?

```js
typeof null == 'object'; // true
typeof null === 'object'; // false
```

네니요?

객체이지만 객체로 취급하면 안됩니다.

## switch case에 할당을 표현할 수 있는가?

```js
const a = 3;
let b = null;
switch (a) {
  case 1: {
    b = 1;
    break;
  }
  case 2: {
    b = 2;
    break;
  }
  case 3: {
    b = 3;
    break;
  }
  default: {
    b = 7;
    break;
  }
}

console.log(b); // 3
```

넹

## 숫자가 아닌데 숫자다.

```js
console.log(typeof (1 % 0));
```
