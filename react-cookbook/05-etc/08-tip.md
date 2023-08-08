---
description: '컴포넌트 제어역전'
tags: ['react', 'OOP', 'tip']
sidebar_position: 8
---

# 컴포넌트 제어역전

컴포넌트를 개발할 때 제어역전하는 전략도 있습니다.

<iframe class="codepen" src="https://www.youtube.com/embed/AQwXK8XcXcE" title="🏆 React component props like a senior dev" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

컴포넌트에 비슷하지만 사용할 때마다 고유하게 전략적으로 다를 때는 children을 활용해서 내부를 개조하는 전략이 있습니다.

```jsx
function Component() {
  return <Sidebar foo="bar" baz="qux" />;
}
```

이렇게 사용할 때마다 props를 추가하는 전략은 코드베이스를 멸망(apropcalypes)시키는 지름길입니다.

```jsx
function Component() {
  return (
    <Sidebar>
      <Foo />
      <Bar />
    </Sidebar>
  );
}
```

호출하는 지점에서 고유하게 취해야 하는 컴포넌트에서는 children을 주입하는 전략입니다. 상속보다 조합에 가까운 전략입니다.

호출하는 사람에게 책임을 어느정도 전가합니다.
