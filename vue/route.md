---
sidebar_position: 7
---

# vue router

[공식 vue router 문서](https://router.vuejs.org/)

## useRoute는 URL에 대한 Ref

```ts
import { useRoute } from 'vue-router';

const route = useRoute();

watch(route, (oldRoute, newRoute) => {
  console.log(oldRoute.path, newRoute.path);
});
```
