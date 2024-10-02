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

## 플래그 컨트롤

- Typescript의 타입 선언을 활용해서 코드를 정리할 수 있음.
- 플래그가 상호 배타적이라는 것을 알면 `string literal`이 더 유리함

```ts
const foo = ref(true);
const bar = ref(false);
const baz = ref(false);
```

위처럼 선언하고 호출이 발생하는 지점마다 개별로 플래그 컨트롤하면 가독성과 제어 측면에서 불리합니다.

```ts
const onBazClick = () => {
	foo.value = false;
	bar.value = false;
	baz.value = true;
};
```

위처럼 작성하면 무엇을 키고 무엇을 끄는지 자세히 확인해야 합니다. 지금은 `onBazClick`를 살린다는 것을 알 수 있습니다.

위와 비슷한 코드가 5개 정도 있습니다. 더 직관적인 방법은 `string literal`을 사용하고 어디로 바뀌는지 보여주는 것입니다.

```ts
type ShowType = 'foo' | 'bar' | 'baz';

const show = ref<ShowType>('foo');

const changeShow = (showType: ShowType) => {
  show.value = showType;
};
```

위처럼 선언하면 무엇을 변경하고 살릴지 더 선언적으로 제어할 수 있습니다.

```ts
const onBazClick = () => {
  changeShow('baz');
};
```

- 이전에 본 코드는 이렇게 1줄로 정리됩니다.


```ts
type PageType = 'list' | 'detail'
```

- 조금더 생각해보면 플래그 컨트롤할 때는 `true`, `false`로 제어하는 것보다 상태를 명시하는 것이 좋습니다.
- 리스트 페이지, 상세 페이지 모달이 보이고 안보이고로 URL 변화 없이 제어해야 하는 상황이면 이런 것이 더 유리할 것입니다.

<!--
## 메서드 쿼리

switch case문 대신에 활용해볼 수 있는 패턴입니다.

정재남 선생님이 소개해준 패턴입니다.

-->

<!-- ## 예외처리로 실행 중단 -->
