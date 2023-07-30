---
sidebar_position: 6
---

# html이 제공하는 attributes type 접근하기

```ts title="input"
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  customRef?: React.RefObject<HTMLInputElement>;
};

export function Input({ value, onChange, customRef, ...other }: InputProps) {
  return (
    <InputWrapper
      onChange={onChange}
      value={value}
      ref={customRef}
      {...other}
    />
  );
}
```
