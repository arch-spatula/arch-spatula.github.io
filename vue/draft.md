---
sidebar_position: 99
draft: true
---

## 새창 띄우는 방법

```ts
const windowDOMPopup = ref();

const openWindowDOMPopup = () => {
  if (windowDOMPopup.value) windowDOMPopup.value.close();

  windowDOMPopup.value = window.open(
    '/path',
    '',
    'width=1280,height=768,left=0,top=0,resizable=no,status=no,scrollbars=no'
  );
  windowDOMPopup.value.document.title = '새 브라우져창 이름';
};
```

### 최대 사이즈 적용하는 2가지 전략

`screen`과 `window`의 속성을 각각 `screen.availWidth`, `screen.availHeight`과 `window.outerWidth`, `window.outerHeight`으로 접근합니다. 최대 사이즈를 접근할 수 있는 2가지 방법입니다.

```ts
const windowDOMPopup = ref();

const openWindowDOMPopup = () => {
  if (windowDOMPopup.value) windowDOMPopup.value.close();

  windowDOMPopup.value = window.open(
    '/path',
    '',
    `width=${window.outerWidth},height=${window.outerHeight},left=0,top=0,resizable=no,status=no,scrollbars=no`
  );
  windowDOMPopup.value.document.title = '새 브라우져창 이름';
};
```

## 순환참조 문제가 발생하면 watchEffect 시도해보기

`watchEffect`는 실행하고 대입한 콜백함수 내에서 반응성을 확인합니다.

https://ko.vuejs.org/guide/essentials/watchers.html#watcheffect

## ResizeObserver DOM Ref와 사용하는 방법

https://vueuse.org/core/useResizeObserver/

https://heropy.blog/2019/11/30/resize-observer/

https://ko.javascript.info/event-loop

`getBoundingClientRect`으로 DOM 관련된 값 접근 가능합니다.

템플릿 Ref 지정하는 전략이 있습니다.

https://ko.vuejs.org/guide/typescript/composition-api#typing-template-refs

https://stackoverflow.com/questions/65002098/how-to-define-type-for-refbinding-on-template-in-vue3-using-typescript

```ts
const useObserver = () => {
  const domRef = ref<HTMLElement | null>(null);
  const width = ref(0);

  let observer: ResizeObserver;

  onMounted(async () => {
    observer = new ResizeObserver((entries) => {
      const [dom] = entries;
      width.value = dom.contentRect.width;
    });

    await nextTick(() => {});
  });

  onBeforeUnmount(() => {
    observer.disconnect();
  });

  return { domRef, width };
};
```

위처럼 정의하면 `domRef` 지정한 Element의 width 변화를 감지하게 만들 수 있습니다.

```html
<template>
  <p ref="domRef">{{ text }}</p>
</template>

<script setup lang="ts">
  import { useObserver } from '@utilHook';
  const { domRef, width } = useObserver();
</script>
```

## window new tab

```ts
let _router: Router | null = null;

export const setRouter = (router: Router) => {
  _router = router;
};

/**
 * 라우터 링크를 새탭으로 열기
 */
export const openLinkNewTab = (route: RouteLocationRaw) => {
  if (_router == null) return;

  const routeData = _router.resolve(route);
  window.open(routeData.href, '_blank');
};
```

링크 태그 설정보다 좋은 이유는 무엇인가? 사실 잘 모릅니다. `setRouter`는 앱 최초 실행 시점에 호출하면 됩니다.

```html
<a target="_blank" href="http://your_url_here.html">Link</a>
```

https://stackoverflow.com/questions/15551779/open-link-in-new-tab-or-window

## 재귀컴포넌트

```html title="RecursiveComponent.vue"
<template>
  <div>
    <p>{{ node.name }}</p>
    <!-- 자식 노드가 있다면 재귀적으로 자신을 호출합니다. -->
    <RecursiveComponent
      v-if="node.children"
      v-for="child in node.children"
      :key="child.id"
      :node="child"
    />
  </div>
</template>

<script setup lang="ts">
  interface TreeNode {
    id: number;
    name: string;
    children?: TreeNode[];
  }

  const props = defineProps<{
    node: TreeNode;
  }>();
</script>
```

정의한 곳에서 정의한 본인을 호출하고 props를 전달해줘야 합니다.

정의한 곳에서 받은 props를 그대로 넘겨줘야 한다는 점과 그리고 재귀를 끝낼 베이스 케이스를 두는 것도 잊지말도록 합니다.

```html title="App.vue"
<template>
  <div id="app">
    <RecursiveComponent :node="tree" />
  </div>
</template>

<script setup lang="ts">
  import RecursiveComponent from '@/components/RecursiveComponent.vue';

  const tree = {
    id: 1,
    name: 'Root',
    children: [
      {
        id: 2,
        name: 'Node 1',
        children: [
          {
            id: 3,
            name: 'Node 1.1',
          },
          {
            id: 4,
            name: 'Node 1.2',
          },
        ],
      },
      {
        id: 5,
        name: 'Node 2',
      },
    ],
  };
</script>
```

## window new tab

```ts
let _router: Router | null = null;

export const setRouter = (router: Router) => {
  _router = router;
};

/**
 * 라우터 링크를 새탭으로 열기
 */
export const openLinkNewTab = (route: RouteLocationRaw) => {
  if (_router == null) return;

  const routeData = _router.resolve(route);
  window.open(routeData.href, '_blank');
};
```

## v-if VS v-show

https://simplevue.gitbook.io/intro/05.-v-if-v-show

```html
<div v-if="true">True</div>
```

랜더링을 처리하고 안하고 반응하고 처리합니다. 매번 보일 때마다 다를 수 있으면 적용하는 것이 좋습니다.

```html
<div v-show="true">The spot light</div>
```

랜더링 작업하고 `display: none`을 인라인으로 처리합니다. 매번 재 랜더링은 안하고 보이고 안보는 상황에 적절합니다. toggle 처럼 특정 부분이 보이고 안 보이고를 제어할 때 활용합니다. 다시보여도 내용이 같은 경우입니다. 랜더링 성능상 유리합니다.

## vue computed get, set 실험하기

computed는 기본적으로 읽기 전용 상태입니다. 함수로 대입하면 다른 반응형 데이터에 반응하고 반환값이 상태입니다.

```ts
const now = computed(() => Date.now());
```

위는 `Date`를 계속 반응하고 현재를 반환할 것입니다.

```html
<template>
  <p>{{ sideEffect }}</p>
  <button @click="handleDouble">update</button>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  const count = ref(0);
  const sideEffect = ref(0);

  const doubleCount = computed({
    get: () => {
      return count.value * 2;
    },
    set: (value) => {
      console.log('실행: ', value);
      sideEffect.value += value;
    },
  });

  const handleDouble = () => {
    doubleCount.value = count.value + 1;
  };
</script>
```

`update` 버튼을 클릭할 때마다 `handleDouble`이 실행됩니다. `handleDouble`이 실행되면서 `doubleCount`를 `set`하고 `set` 메서드를 실행하게 됩니다.

객체 get과 set 메서드를 설정하고 대입하면 읽고 쓰기 모두 지원하기 시작합니다. 쓰기 행위를 할 때마다 set 메서드가 실행됩니다. 반대 접근할 때마다 get 메서드가 실행됩니다.

value는 쓰기로 넣는 값이 매개변수로 들어오게 됩니다.

## hooks

## useOutSideClick

```ts
const useOutSideClick = () => {
  const DOMRef = ref<HTMLElement | null>(null);
  const isOpen = ref(true);

  const handleClickOutside = (event: Event) => {
    if (DOMRef.value && !DOMRef.value.contains(event.target as Node)) {
      isOpen.value = false;
    }
  };

  onMounted(() => {
    window.addEventListener('click', handleClickOutside);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('click', handleClickOutside);
  });

  return { DOMRef, isOpen };
};
```

이렇게 만들 수 있습니다. 클릭한 외부 요소에 이벤트 핸들러가 실행됩니다.
