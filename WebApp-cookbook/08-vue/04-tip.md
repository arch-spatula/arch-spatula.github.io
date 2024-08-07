---
sidebar_position: 8
---

# tip

## vue는 MVVM 디자인 패턴입니다.

`ref`가 `template`에 해당하는 view와 `script`에서 호출하는 `ref`가 ViewModel 역할을 합니다. 양방향으로 바인딩 되어 있다는 점에서 해당합니다.

React는 MVC 패턴에 더 가깝습니다. 상태에 대한 Model과 Controller 역할을 하는 이벤트 함수와 View 역할을 하는 JSX로 제어합니다.

### 이벤트보단 옵저버

이벤트보단 `watch`, `computed`를 적극적으로 활용하기 바랍니다. 변화의 주체를 최소한으로 두고 변화를 구독하는 대상을 만들도록 합니다. 이런 방식을 지향해야 하는 이유는 상태변화를 추적하기 명료하게 만드는 다는 점이 있습니다. 또 MVVM 패턴을 사용하기 때문에 상태변화에 대한 데이터를 View와 동기화 되도록 해야 합니다.

## 제어할 값과 보여줄 값을 분리

```json
[
  {
    "show": "보여줄 값1",
    "id": "foo123"
  },
  {
    "show": "보여줄 값2",
    "id": "bar456"
  },
  {
    "show": "보여줄 값3",
    "id": "baz789"
  }
]
```

값을 제어할 때는 실제 값과 보이는 값이 같은 경우는 사용자가 입력한 input을 제외하고 클릭하는 값은 서로 분리하기 바립니다. 사용자가 입력하는 값은 문자열을 활용해도 괜찮지만 클릭처럼 여러 묶음을 선택하는 경우면 객체를 활용하고 보이는 값과 서버 통신에 활용할 값을 분리하기 바랍니다.

## pania의 $patch 하지만 반응성이 없음

- `$patch`는 pania 전역 상태를 갱신할 때 사용하는 메서드입니다. 하지만 반응성이 없습니다.
- 반응성이 필요하면 `store`의 `ref`에 `value` 할당으로 setter를 실행하도록 합니다.
- pania 창시자는 싱글튼 `ref`로 취급하라고 조언합니다.

## Vue CLI

:::caution

[vite](https://ko.vitejs.dev/guide/)을 통해 설치하는 것이 더 안정적입니다.

:::

[Vue CLI](https://cli.vuejs.org/)는 유사 레거시입니다.

- 더 정확히는 지금 시점에서는 활용이 어럽습니다.
- Nest.js같은 CLI는 아닙니다. CLI로 자동으로 파일을 생성하고 연결해주지 않습니다.

### CLI 설치

```sh
npm install -g @vue/cli
```

### CLI 삭제

```sh
npm uninstall -g @vue/cli
```

## `ref`는 무조건 1개만 가질 필요는 없음

[Multiple v-model bindings](https://ko.vuejs.org/guide/components/v-model.html#multiple-v-model-bindings)

```html
<template>
  <AutoCompleteInput v-model:item="item" v-model:text="text" />
</template>
```

위처럼 호출합니다.

```html
<script setup>
  const firstName = defineModel('item');
  const lastName = defineModel('text');
</script>
```

아래처럼 정의합니다.

위처럼 2개의 ref를 1개의 컴포넌트에 넣을 수 있습니다. 2개의 상태를 갖게 만드는 것이 가능합니다. 2개의 상태는 컴포넌트 내부에서 처리하고 갱신된 것은 호출자에게 다시 전달해줍니다.

이런 측면을 생각해보면 vue가 더 많은 상태로서의 프로퍼티를 제공한다는 점에서 객체지향적인 것 같습니다.

## vue props 어답터 패턴

```html
<template>
  <Children :props="adapter" />
</template>

<script setup lang="ts">
const adapter = computed(() => {
  if (typeof foo.value !== 'object') return {}
  return foo.value
})
</script>
```

- 중간 컴포넌트에 `adapter`를 props로 넣어야 동작하게 만들 수 있는 로직이 있었습니다. `foo.value`는 과거 제어를 역전시킬지 안 할지 몰라서 일단 부울리안으로 작성하고 있었습니다. props로 넣으면 내부적으로 `v-bind`로 들어가는데 객체 형태가 아닐 때를 방어해줘야 했습니다.
- `adapter`를 `props` 값으로 넣어주면 됩니다. 중간 컨테이너 컴포넌트인데 무슨 값을 받을지 모르는 경우가 꽤 있습니다. 가드를 컨테이너에서 1번하고 자식에게 넘겨주는 전략도 있습니다.
- 좋은 전략인가? 결론은 아닙니다. 자식에서 처리하면 될 것을 굳이 부모에서 처리할 이유는 없습니다. 하지만 자식에서 호출한 컴포넌트가 이미 재사용이 너무 많이 되고 있는 경우라면 부모에서 처리하는 것이 맞습니다. 자식이 컨테이너 역할을 하는 부모 1곳에서 만 사용하면 자식에서 처리해서 부모컴포넌트는 크게 의식할 피요가 없게 해야합니다.

## vue의 `provide`, `inject`의 목적

상태관리를 하는 방식입니다. 페이지 영역에서는 store를 유지하는 것이 적절한 것 같습니다. 이런 값들은 페이지에서 단일 메모리 인스턴스로 공유가 필요하기 때문입니다. 그리고 컴포턴트에서는 provide, inject를 사용하는 것이 가치있습니다. provide 단위로 독립적인 메모리 인스턴스 범위를 갖습니다. Form 컴포넌트에 provide를 호출하고 input에서 inject로 꺼내면 Form의 상태를 input에서 공유할 수 있습니다. 하지만 Form을 3 ~ 4개 단계로 작성하는 UI에서는 상태를 간섭하지 않습니다. 만약에 store에 저장했다면 간섭이 발생했을 것입니다. 이런 관점에서 provide, inject는 컴포넌트 단위로 의존성 주입이라고 사고해야 합니다. 또 input을 호출하는 지점마다 context에 맞게 의존성을 갖게 만들 수 있습니다. 만약에 form에서 호출하는 컨텍스트는 helper text를 사용하고 다른 경우에는 사용안하는 로직을 갖게 만드는 것과 같습니다. Input이 Form 내부에 무조건 종속적인 것은 아니기 때문에 `inject`에 기본 값을 넣어둔 것입니다. 궁극적으로 데이터를 공유하고 데이터를 공유할 수 있으면서 상태도 공유할 수 있게 때문에 컴포넌트 단위로 의존성을 주입해서 상태를 관리할 수 있게 된 것입니다.

예전에 컴포넌트가 비교적 거대해서 상태를 공유하게 만들고 싶은 경우가 있었습니다. 그 당시 store에 넣었다가 간섭이 발생한 문제가 있었는데 지금관점에서 다시보면 provide, inject로 해결할 수 있었습니다.

## 부하는 `watch`의 `deep: true`를 확인

프론트엔드에 성능 이슈가 발생하고 있으면 `watch`도 후보군으로 둬야 합니다.

`deep: true`로 설정하면 깊은 비교를 합니다. 객체의 속성별로 값을 비교하고 그리고 그 자식을 계속 재귀로 순회해야 합니다. 배열도 해당합니다. 이 탐색하는 작업이 비싼 작업에 해당합니다. 만약에 같다면 비싼 탐색을 하고 로직을 실행할지 말지 결정합니다. 

`watch`의 `deep: true`를 해도 구독하는 대상의 크기를 봐가면서 작업합니다. 탐색시간이 너무 길면 자제합니다. 아니면 변경할 부분만 골라서 구독합니다. 전체 비교는 비효율적입니다.

## v-if, v-show 조건부 처리 전략

```html
v-if="(!useVShow && modalState) || useVShow" v-show="useVShow && modalState"
```

```html
<div v-bind="true {'v-show': true} : {'v-if': true}"></div>
```

- 위처럼 vue 다이렉티브를 직접 넣는 방법을 모르겠습니다. 아마 없을지도 모릅니다.
- 지금 코드는 막짰습니다. 호출자는 v-show로 랜더링 캐싱을 할지 v-if로 닫을 때 언마운트 시키는 것이 중요한지 정하는 부분이 중요합니다.
  - 나중에 단일 props가 string literal 타입선언으로 처리하도록 하고 싶습니다.

<!--  TODO: ## vue-query는 undefined를 반환하면 캐싱을 안함 -->

## useRoute는 URL에 대한 Ref

```ts
import { useRoute } from 'vue-router';

const route = useRoute();

watch(route, (oldRoute, newRoute) => {
  console.log(oldRoute.path, newRoute.path);
});
```
