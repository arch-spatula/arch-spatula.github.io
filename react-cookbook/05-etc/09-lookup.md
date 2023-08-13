---
description: 'look up 패턴'
tags: ['react', 'pattern', 'tip']
sidebar_position: 9
draft: true
---

# look up 패턴

여러개의 조건부랜더링을 처리해야 할 때 활용할 수 있는 패턴입니다. 원래는 주로 삼항연산자로 많이 해결했지만 컴포넌트는 함수이고 함수 자체를 객체에 할당하고 객체에서 읽어 오게하는 방식으로 코드를 정리할 수 있습니다.

개인적으로 여전히 안티패턴으로 생각이 듭니다. 원래 하지말아야 하는 활용법으로 코드를 작성합니다. 마치 `{Component()}`의 모양로 작성하기 때문에 거부감이 있습니다.

https://www.youtube.com/shorts/gvMpY48kf2w

look up 패턴은 생각보다 다양한 곳에 활용할 수 있습니다.

```tsx
const DefaultButton = ({ text, type, size, onClick }: DefaultButtonProps) => {
  return (
    <DefaultButtonContainer type={type} size={size} onClick={onClick}>
      {text}
    </DefaultButtonContainer>
  );
};

interface DefaultButtonContainerProps {
  type: DefaultButtonType;
  size: DefaultButtonSize;
  children: string;
}

type DefaultButtonType = 'full' | 'outline';
type DefaultButtonSize = 's' | 'm';

const getDefaultButtonType = (type: DefaultButtonType) => {
  if (type === 'full') {
    return `background-color: grey;
            color: white;`;
  }

  return `background-color: transparent;
         color: grey;
         border: 1px solid grey;
        `;
};

const getDefaultButtonSize = (size: DefaultButtonSize) => {
  if (size === 'm') {
    return `width: 8rem; 
            height:2.5rem;`;
  }
  return `width: 5.625rem; 
          height: 2.5rem;`;
};

const DefaultButtonContainer = styled.button<DefaultButtonProps>`
  border-radius: 0.3125rem;
  border: none;
  cursor: pointer;
  ${({ type }: Pick<DefaultButtonContainerProps, 'type'>) =>
    getDefaultButtonType(type)};
  ${({ size }: Pick<DefaultButtonContainerProps, 'size'>) =>
    getDefaultButtonSize(size)};
` as any;

export default DefaultButton;
```

스타일드 컴포넌트도 lookup 패턴을 적용할 수 있습니다. 이렇게 적용할 것이라 생각하지는 못했습니다. 지금은 if문을 사용하지만 나중에는 switch case 문을 사용하도록 수정할 것입니다.

참고로 제가 작성한 코드가 아닙니다.
