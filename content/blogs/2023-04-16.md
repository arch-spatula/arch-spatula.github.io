---
title: 원티드 프리온보딩 과제 - 8일차
authors: [arch-spatula]
tags: ['button', 'wanted', 'pre-on-boarding']
description: 원티드 과제 진행과정
date: 2023-04-16
---

# 원티드 프리온보딩 과제 - 8일차

<!--truncate-->

## Button `type`을 타입지정하기

`ButtonHTMLAttributes<HTMLButtonElement>["type"]`이렇게 하면 `"button" | "submit" | "reset" | undefined`으로 타입을 지정할 수 있습니다. 대충 하드코딩할 수 있었지만 코드 퀄리티가 중요한 작업인만큼 이 방법을 찾았습니다.

질문을 아래처럼 했습니다.

> `React.ButtonHTMLAttributes<HTMLButtonElement>.type?: "button" | "reset" | "submit" | undefined`에서 `"button" | "reset" | "submit" | undefined`을 추출하고 싶습니다

```tsx
import { ButtonHTMLAttributes } from 'react';

interface CustomButtonProps {
  text: string;
  hierarchy: 'primary' | 'secondary';
  href?: string;
  customType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: () => void;
  testId?: string;
  disabled?: boolean;
}
```

이렇게 지정해서 해결할 수 있었습니다.
