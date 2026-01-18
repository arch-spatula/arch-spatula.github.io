---
title: 'switch case 리팩토링 전략'
authors: [arch-spatula]
tags: ['refactoring', 'javaScript', 'switch case']
description: 'switch case를 사용할 수 있는 상황이면 `map` 혹은 `object`를 사용할 수 있습니다.'
toc_max_heading_level: 6
date: 2023-06-23
---

# switch case 리팩토링 전략

switch case를 사용할 수 있는 상황이면 `map` 혹은 `object`를 사용할 수 있습니다. 저는 신입 엔지니어라서 무조건 안티패턴이고 코드 스멜이라고 강하게 주장해야 하기는 하지만 별로 그렇게 하고 싶지는 않습니다. 저는 개인적으로 생각이 복잡할 때는 사용해도 괜찮다고 봅니다.

<!--truncate-->

```tsx
export const HelperText = styled.p<{
  helperTextColor: 'warning' | 'success' | 'information' | 'normal';
}>`
  ${(props) => props.theme.fonts.body14Regular}
  color: ${(props) => {
    switch (props.helperTextColor) {
      case 'normal':
        return props.theme.colors.black;
      case 'success':
        return props.theme.colors.green;
      case 'warning':
        return props.theme.colors.red;
      case 'information':
        return props.theme.colors.blue;
      default:
        return props.theme.colors.black;
    }
  }};
  min-height: 1.5rem;
`;
```

switch case 문은 보수하기 쉬운 편은 맞습니다. 하지만 선형 시간 복잡성을 갖습니다. 조건에 해당할 때까지 계속 비교합니다. 언어 상세 스펙마다 다릅니다.

```tsx
export const HelperText = styled.p<{
  helperTextColor: 'warning' | 'success' | 'information' | 'normal';
}>`
  ${(props) => props.theme.fonts.body14Regular}
  color: ${(props) => {
    const colorMap = {
      normal: props.theme.colors.black,
      success: props.theme.colors.green500,
      warning: props.theme.colors.red500,
      information: props.theme.colors.blue500,
    } as const;

    return colorMap[props.helperTextColor];
  }};
  min-height: 1.5rem;
`;
```

이렇게 리팩토링했습니다. 객체를 생성하고 삭제하는 문제가 있지만 객체에서 상수시간으로 읽게 됩니다.
