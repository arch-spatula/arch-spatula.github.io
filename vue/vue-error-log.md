---
sidebar_position: 3
---

# Vue Error log

1. React의 Portal처럼 vue는 Modal을 위한 외부 컨택스트는 무엇으로 구현하는가?

`Teleport`로 구현합니다.

[Teleport 공식 문서](https://vuejs.org/guide/built-ins/teleport.html#basic-usage)를 참고하기 바랍니다.

2. Vue에서는 props를 주석처리할 수 없습니다.

```
<input
  :value="text"
  <!-- @input="onInput" -->
  placeholder="Type here"
/>
```

위와 같은 행위를 리액트처럼 할 수 없습니다.

3. 숫자로 넣었는데 문자로 계속 판단하고 있습니다.

```vue
<input value="24" />
```

보통 이렇게 작성하는 실수를 할 것입니다.

```vue
<input :value="24" />
```

위처럼 작성하면 숫자로 인식합니다. `:속성명="값"`의 형태라는 것을 잊지 말기바랍니다. 일반 속성은 문자열로 간주합니다.
