---
sidebar_position: 2
description: '클립보드 API'
tags: ['클립보드 API']
---

# Clipboard API 

[Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)

- https에서만 지원하는 기능이라 피쳐서버에서는 지원하고 있지 않습니다.


```ts
navigator.clipboard.writeText('클립보드에 저장할 텍스트')
```

- 위처럼 작성하면 클립보드 데이터를 접근할 수 있습니다.
- 어떻게 활용하는가에 따라 다르지만 원하면 클립보드 인젝션 같은 공격 전략도 생기는 것 같습니다. 혹은 클립보드 탈취전략도 XSS만 할 수 있으면 가능할 것 같습니다.


