---
sidebar_position: 99
description: '타입스크립트 이런저런 팁'
---

# 타입스크립트 팁

## satisfies

<iframe class="codepen" src="https://www.youtube.com/embed/49gHWuepxxE" title="The `satisfies` operator in TypeScript 4.9 is a game changer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

satisfies는 리털에 적용하기 유용합니다.

```ts
const red: Color = 'red';
const green = 'green' as Color;
const blue = 'blue' satisfies Color;
```

3가지 타입지정 전략이 있습니다.

```ts
type Color = string | { r: number; g: number; b: number };

const red: Color = 'red';
const green = 'green' as Color;
const blue = 'blue' satisfies Color;
```

이렇게 했을 때 satisfies가 갖는 장점은 해당하는 리터럴 값을 접근할 수 있습니다.

```ts
type Color = string | { r: number; g: number; b: number };

const red: Color = 'red';
const green = 'green' as Color;
const blue = 'blue' satisfies Color;

blue.startsWith(); // 문자열 메서드 접근 가능
```

문자열을 만족하기 때문에 문자열 메서드를 접근할 수 있다고 간주합니다. 만약에 객체형이면 객체에 해당하는 동적 메서드를 접근할 수 있습니다.

```ts
type Color = string | { r: number; g: number; b: number };

const red: Color = 'red';
const green = 'green' as Color;
const blue = 'blue' satisfies Color;

green.toString(); // 문자열 메서드 접근 불가
```

문자열이거나 객체이기 때문에 매서드를 접근할 수 없습니다.

참고로 as 키워드는 최대한 자제해야 하는 타입 단언입니다. 본인이 컴파일러보다 더 잘안다고 하는 것입니다.

```ts
type Color = string | { r: number; g: number; b: number };

const red: Color = { r: 0, g: 0, b: 0 };
const green = { r: 0 } as Color; // 타입에러를 안 알려줍니다.
const blue = { r: 0, g: 0, b: 0 } satisfies Color;
```

여기서 as는 타입에러를 안 알려줍니다.

```ts
type Color = string | { r: number; g: number; b: number };

const blue = { r: 0, g: 0, b: 0 } as const satisfies Color;

console.log(blue.r); // 0
```

이렇게 하면 객체 내부에 상수처리까지 할 수 있습니다.

<!--

<iframe class="codepen" src="https://www.youtube.com/embed/z12xYmmJ8Ww" title="🔥 NEW to TypeScript - satisfies" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

-->
