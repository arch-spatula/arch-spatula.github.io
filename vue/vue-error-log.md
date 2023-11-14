---
sidebar_position: 3
---

# Vue Error log

1. React의 Portal처럼 vue는 Modal을 위한 외부 컨택스트는 무엇으로 구현하는가?

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

2. Vue에서는 props를 주석처리할 수 없습니다.

```txt
<input
  :value="text"
  <!-- @input="onInput" -->
  placeholder="Type here"
/>
```

위와 같은 행위를 리액트처럼 할 수 없습니다.

3. 숫자로 넣었는데 문자로 계속 판단하고 있습니다.

```html
<input value="24" />
```

보통 이렇게 작성하는 실수를 할 것입니다.

```html
<input :value="24" />
```

위처럼 작성하면 숫자로 인식합니다. `:속성명="값"`의 형태라는 것을 잊지 말기바랍니다. 일반 속성은 문자열로 간주합니다.

4. pinia 테스트 코드를 어떻게 설정하는가?

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
