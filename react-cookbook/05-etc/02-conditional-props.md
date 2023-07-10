---
sidebar_position: 2
---

# 조건부 props(Conditional Props)

```tsx
type ComponentProps = {
  disabled: boolean;
};

function Component({ disabled }: ComponentProps) {
  return <button {...(disabled && { tabIndex: -1 })}></button>;
}
```

tabIndex는 컴포넌트가 호출된 순서대(혹은 html을 작성한 순서)로 브라우저가 알아서 번호를 지정해줍니다.

하지만 가끔은 tabIndex 접근을 유저경험상 차단해야 하는 경우가 있습니다.

조건에 따라 props를 정의하고 지정할지 말지 이렇게 제어할 수 있습니다.
