---
sidebar_position: 99
description: '타입스크립트 이런저런 팁'
---

# 타입스크립트 팁

<!--

AOP in TypeScript

https://d2.naver.com/helloworld/3010710

-->

## keyof 연산자

keyof는 자바스크립트에 없습니다. 객체에서 key만 추출하고 싶을 때 사용할 수 있는 타입스크립트 연산자입니다.

```ts
const obj = { foo: 1, bar: 2, baz: 3 };

type Key = keyof typeof obj; // type Key = "foo" | "bar" | "baz"
```

이렇게 객체에서 키를 string enum으로 타입 추출이 가능합니다.

## instanceof Type Guards

instanceof는 자바스크립트 자원에서 지원하고 있습니다.

class는 instanceof 연산자로 해당하는 인스턴스가 어느 클래스에서 온 것인지 구분할 수 있고 이것을 타입가드로 활용할 수 있습니다.[^1]

```ts
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof!');
  }
}

function makeSound(animal: Animal) {
  if (animal instanceof Dog) {
    animal.bark(); // Type: Dog
  } else {
    console.log('Unknown animal');
  }
}

const dog = new Dog('Buddy');
const animal = new Animal('Unknown');

makeSound(dog); // Output: Woof!
makeSound(animal); // Output: Unknown animal
```

<!-- https://dev.to/lakshmananarumugam/15-advanced-typescript-tips-for-development-5ddj -->

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

## as const

<iframe class="codepen" src="https://www.youtube.com/embed/6M9aZzm-kEc" title="The most underrated TypeScript feature" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

```ts
const routes = {
  home: '/',
  admin: '/admin',
  users: '/users',
};
```

이렇게 라우팅을 설정합니다. 당연히 상수이고 변형이 가해지면 안됩니다.

```ts
const routes = {
  home: '/',
  admin: '/admin',
  users: '/users',
};

function goToRoute(route: '/' | '/admin' | '/users') {
  // ...
}
```

일단 코드 중복이 발생합니다. 라우팅은 정책으로 언제든지 금방 늘어날 수 있습니다.

```ts
const routes = {
  home: '/',
  admin: '/admin',
  users: '/users',
};

function goToRoute(route: '/' | '/admin' | '/users') {
  // ...
}

goToRoute(routes.home); // 타입에러
```

이것은 타입스크립트가 타입 체킹하는 방식의 문제 때문에 발생합니다.

`routes`의 값은 `string`이지만 매개변수의 타입은 문자열 이넘(enum)입니다.

즉 `string`은 `"/"`이 아니다라는 이유로 타입에러를 돌려주는 것입니다.

`string`으로 타입추론을 하는 이유는 다른 문자열로 재할당이 가능하기 때문에 상위 문자열 타입으로 간주합니다.

```ts
const routes = {
  home: '/',
  admin: '/admin',
  users: '/users',
} as const;

function goToRoute(route: '/' | '/admin' | '/users') {
  // ...
}

goToRoute(routes.home); // 문제 없음
```

이렇게 `as const`로 단언하면 `readonly`로 지정합니다. 재할당이 불가능합니다. `object.freeze`와 비슷하게 재할당을 막지만 `object.freeze`는 얕은 `freeze`만합니다. `as const`은 깊은 `freeze`를 지원합니다.

```ts
const routes = {
  home: '/',
  admin: '/admin',
  users: '/users',
} as const;

type Routes = (typeof routes)[keyof typeof routes];

function goToRoute(route: Routes) {
  // ...
}

goToRoute(routes.home); // 문제 없음
```

이렇게 지정하면 읽기 전용 상수객체의 `Routes`를 활용할 수 있습니다. 위와 같은 `'/' | '/admin' | '/users'`을 추출할 수 있게 됩니다.

```ts
const routes = {
  home: '/',
  admin: '/admin',
  users: '/users',
} as const;

type RotesKeys = keyof typeof routes; // "home" | "admin" | "users"

type Routes = (typeof routes)[RotesKeys]; // "/" | "/admin" | "/users"

function goToRoute(route: Routes) {
  // ...
}

goToRoute(routes.home); // 문제 없음
```

타입에서 키와 그 값을 이런 패턴으로 as const를 활용해서 접근이 가능합니다.

## instanceof 가드

```ts
const onImagePasted = useCallback(
  async (
    dataTransfer: DataTransfer | FileList | null // Drag and Drop API
  ) => {
    if (!dataTransfer) return;
    const files: File[] = []; // 드래그 앤 드랍으로 가져온 파일들
    if (dataTransfer instanceof DataTransfer) {
      for (let index = 0; index < dataTransfer.items.length; index += 1) {
        const file = dataTransfer.items[index].getAsFile();
        if (!file) return;
        files.push(file);
      }
    } else if (dataTransfer instanceof FileList) {
      const file = dataTransfer[0];
      if (!file) return;
      files.push(file);
    }
  },
  []
);
```

2개 타입을 같이 받아야 할 때 활용할 수 있는 패턴입니다.

인스턴스를 통해서 타입가드를 하는 전략입니다.

[Codefolio 프로젝트 해당 모듈](https://github.com/react-challengers/Codefolio/blob/dev/Components/CreatePost/PostEditor.tsx)

옛날에 `instanceof`로 타입가드를 했었습니다.

<!--

<iframe class="codepen" src="https://www.youtube.com/embed/z12xYmmJ8Ww" title="🔥 NEW to TypeScript - satisfies" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

-->

[^1]: [15 Advanced TypeScript Tips for Development](https://dev.to/lakshmananarumugam/15-advanced-typescript-tips-for-development-5ddj)
