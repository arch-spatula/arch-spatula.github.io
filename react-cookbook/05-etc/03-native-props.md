---
sidebar_position: 3
---

# html 기본 props(html native props) 접근

```tsx
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

function Button({ children, ...other }: ButtonProps) {
  return <button {...other}>{children}</button>;
}
```

HTML이 제공하는 기본 attribute를 접근하는 방법입니다. 그리고 `&`으로 다른 타입을 확장할 수 있습니다.
