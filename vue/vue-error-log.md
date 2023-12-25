---
sidebar_position: 3
---

# Vue Error log

## 1. React의 Portal처럼 vue는 Modal을 위한 외부 컨택스트는 무엇으로 구현하는가?

`Teleport`로 구현합니다.

[Teleport 공식 문서](https://vuejs.org/guide/built-ins/teleport.html#basic-usage)를 참고하기 바랍니다.

```html title="view/ExamplePage.vue"
<Teleport v-if="refVal" to="body">
  <Component />
</Teleport>
```

```html title="ModalComponent.vue"
<template>
  <div class="teleport-container">
    <div class="modal-container">hello</div>
    <div class="overlay"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
  .teleport-container {
    position: fixed;
    top: 0;
    left: 0;
  }

  .modal-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .overlay {
    height: 100vh;
    width: 100vw;
    background-color: #00000040;
  }
</style>
```

위처럼 작성하는 것이 일반적일 것 같습니다.

## 2. Vue에서는 props를 주석처리할 수 없습니다.

```txt
<input
  :value="text"
  <!-- @input="onInput" -->
  placeholder="Type here"
/>
```

위와 같은 행위를 리액트처럼 할 수 없습니다.

## 3. 숫자로 넣었는데 문자로 계속 판단하고 있습니다.

```html
<input value="24" />
```

보통 이렇게 작성하는 실수를 할 것입니다.

```html
<input :value="24" />
```

위처럼 작성하면 숫자로 인식합니다. `:속성명="값"`의 형태라는 것을 잊지 말기바랍니다. 일반 속성은 문자열로 간주합니다.

## 4. pinia 테스트 코드를 어떻게 설정하는가?

```ts
import { describe, it, expect, beforeEach } from 'vitest';

describe('테스트 이름', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('개별 테스트 이름', () => {
    const foo = useFooStore();

    foo.run();

    expect(foo.value).toBe('???');
  });
});
```

위는 개별테스트에 적용합니다. 하지만 pinia는 전역으로 적용하고 컴포넌트를 테스트하고 다른 상황에서도 적용이 필요합니다. 모든 테스트 컨텍스트 내에서 적용되어야 합니다.

```ts title="main.ts"
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia, setActivePinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { beforeEach } from 'vitest';

const app = createApp(App);

// highlight-start
beforeEach(() => {
  const pinia = createPinia();
  app.use(pinia);
  setActivePinia(pinia);
});
// highlight-end

app.use(createPinia());
app.use(router);

app.mount('#app');
```

위처럼 설정해주면 테스트가 전역으로 설정됩니다.

[pinia testing 방법 공식 문서](https://pinia.vuejs.org/cookbook/testing.html#Unit-testing-a-store)

## 5. JSDom을 설정해줘야 node.js가 테스트 환경에서 DOM을 재현할 수 있습니다.

웹 API에 해당하는 함수들이 존재합니다. `alert`는 일반적으로 브라우저에서만 사용하는데 테스트 코드가 실행하는 경우가 존재합니다. 이경우 테스트 코드가 에러를 던져줄 것입니다.

```sh
npm install -D vitest happy-dom @testing-library/vue
```

위는 [공식 문서](https://vuejs.org/guide/scaling-up/testing.html#recipes)에서 `@testing-library/vue`를 사용하는 경우를 보여줍니다.

```sh
npm install -D vitest jsdom @vue/test-utils
```

위는 `@vue/test-utils`으로 설치할 때는 `JSDom`으로 설정해줘야 합니다.

```ts title="vite.config.ts"
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
```

```ts title="vitest.config.ts"
import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // highlight-next-line
      environment: 'jsdom', // @vue/test-utils을 설정할 때는 JSDom 설정이 중요합니다.
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  })
);
```

## 5. 이벤트 타입은 어느정도 단언을 해야 합니다.

[What is the type for an event in Vue TypeScript project?](https://stackoverflow.com/questions/55140448/what-is-the-type-for-an-event-in-vue-typescript-project)

```html
<template>
  <input @input="handleInput" />
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';

  const handleInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    console.log(input.value);
  };
</script>
```

`input` 이벤트는 위처럼 타입지정하면 됩니다.

<iframe class="codepen" src="https://codesandbox.io/p/devbox/peaceful-chatelet-nlrlsd?embed=1&file=%2Fsrc%2FApp.vue"
     title="vue input 이벤트 타입은 Event와 단언"
   ></iframe>

## 6. watch는 얕은 비교만 가능합니다.

공식 문서에서는 [deep watch 문제](https://vuejs.org/guide/essentials/watchers.html#deep-watchers)라고 알려줍니다.

정확히는 현상만 보여주고 방지하는 방법만 알려줍니다. 하지만 실제 동작원리를 정확히 이해하는 것이 시작입니다. 나중에 동작 원리를 추가하겠습니다.

```html
<template>
  <h1>test watch</h1>
  <input @input="handleInput" :value="inputRef" />
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';

  const inputRef = ref<string>('');

  const handleInput = (e: Event) => {
    const input = e.target as HTMLInputElement;

    inputRef.value = input.value;
  };

  watch(inputRef, () => {
    console.log('inputRef의 변화를 구독', inputRef.value);
  });
</script>
```

<iframe class="codepen" src="https://codesandbox.io/p/devbox/danin-7lpk2h?file=%2Fsrc%2FApp.vue&embed=1"
title="원시형 문자열에 ref input"
></iframe>

위는 단일 문자열을 구독하는 대표적인 예시입니다. 이런 경우에는 별로 문제가 없습니다.

하지만 만약에 form처럼 여러개의 문자열을 하나의 객체로 묶어야 하는 상황이 생길 수 있습니다.

먼저 객체에 `ref`를 담아야 할때는 `reactive`를 활용해야 합니다.

```html
<template>
  <h1>test watch</h1>
  <input @input="handleInput1" :value="inputReactive.input1" />
  <input @input="handleInput2" :value="inputReactive.input2" />
  <input @input="handleInput3" :value="inputReactive.input3" />
</template>

<script setup lang="ts">
  import { reactive, watch } from 'vue';

  const inputReactive = reactive<{
    input1: string;
    input2: string;
    input3: string;
  }>({
    input1: '',
    input2: '',
    input3: '',
  });

  const handleInput1 = (e: Event) => {
    const input = e.target as HTMLInputElement;
    inputReactive.input1 = input.value;
  };

  const handleInput2 = (e: Event) => {
    const input = e.target as HTMLInputElement;
    inputReactive.input2 = input.value;
  };

  const handleInput3 = (e: Event) => {
    const input = e.target as HTMLInputElement;
    inputReactive.input3 = input.value;
  };

  watch(inputReactive, (oldInput, newInput) => {
    console.log('input1', oldInput.input1, newInput.input1);
    console.log('input2', oldInput.input2, newInput.input2);
    console.log('input3', oldInput.input3, newInput.input3);
  });
</script>
```

<iframe class="codepen" src="https://codesandbox.io/p/devbox/youthful-goodall-td929g?embed=1&file=%2Fsrc%2FApp.vue"
title="reactive는 말안드뤄"
   ></iframe>

위처럼 작성하면 문제가 됩니다. `oldInput`, `newInput` 값이 차이가 발생하지 않습니다. 구독하는 동작은 맞지만 동작 전후 차이를 통해 어떤 로직을 실행해야 하는데 못하게 됩니다.

```html
<template>
  <h1>test watch</h1>
  <input @input="handleInput1" :value="inputReactive.input1" />
  <input @input="handleInput2" :value="inputReactive.input2" />
  <input @input="handleInput3" :value="inputReactive.input3" />
</template>

<script setup lang="ts">
  import { reactive, watch } from 'vue';

  const inputReactive = reactive<{
    input1: string;
    input2: string;
    input3: string;
  }>({
    input1: '',
    input2: '',
    input3: '',
  });

  const handleInput1 = (e: Event) => {
    const input = e.target as HTMLInputElement;
    inputReactive.input1 = input.value;
  };

  const handleInput2 = (e: Event) => {
    const input = e.target as HTMLInputElement;
    inputReactive.input2 = input.value;
  };

  const handleInput3 = (e: Event) => {
    const input = e.target as HTMLInputElement;
    inputReactive.input3 = input.value;
  };

  // highlight-start
  watch(
    () => [inputReactive.input1, inputReactive.input2, inputReactive.input3],
    ([oldInput1, oldInput2, oldInput3], [newInput1, newInput2, newInput3]) => {
      console.log('input1', oldInput1, newInput1);
      console.log('input2', oldInput2, newInput2);
      console.log('input3', oldInput3, newInput3);
    }
  );
  // highlight-end
</script>
```

<iframe class="codepen" src="https://codesandbox.io/p/devbox/busy-haze-46kq4v?embed=1&file=%2Fsrc%2FApp.vue"
  title="reactive는 말잘드뤄"
></iframe>

콜백함수의 반환 값(`() => [inputReactive.input1, inputReactive.input2, inputReactive.input3]`)으로 `reactive`를 분할해서 대입하도록 합니다.

이렇게 하면 old, new 비교를 통해 실행해야 할 때 활용할 수 있습니다.

## 7. codepen.io로 vue 예시 만들기

마음 편하게 codesnadbox 사용하세요.
