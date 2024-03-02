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
