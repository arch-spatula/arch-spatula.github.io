---
title: '버튼에 로딩 스피너를 추가'
authors: [arch-spatula]
tags: ['falsy']
description: '버튼에 로딩 스피너를 추가하는 방법입니다.'
toc_max_heading_level: 6
date: 2023-06-19
---

# 버튼에 로딩 스피너를 추가

버튼에 로딩 스피너를 추가하는 방법입니다. button은 다양한 너비를 갖을 수 있고 또 입력한 텍스트 길이만큼 고정되어야 합니다. 로딩인 상황에 button의 너비가 줄어드는 일도 막아야 합니다.

<!--truncate-->

```tsx
import { ButtonWrapper, TextWrapper, LoaderWrapper } from './Button.style';
import { PulseLoader } from 'react-spinners';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
};

/** loader는 텍스트 너비가 필요해서 2개의 VisibilityWrapper 활용 */
export function Button({
  children,
  onClick,
  isLoading = false,
  ...other
}: ButtonProps) {
  return (
    <ButtonWrapper
      onClick={onClick}
      disabled={isLoading}
      isLoading={isLoading}
      {...other}
    >
      <TextWrapper isLoading={isLoading}>{children}</TextWrapper>
      // highlight-start
      {isLoading && (
        <LoaderWrapper>
          <PulseLoader
            color="#ffffff"
            loading
            margin={4}
            size={12}
            speedMultiplier={0.5}
          />
        </LoaderWrapper>
      )}
      // highlight-end
    </ButtonWrapper>
  );
}
```

전략을 바꿨습니다. loading은 조건부 랜더링을 계속 처리합니다. 하지만 로딩하는 동안 텍스트도 조건부 스타일링으로 안보이게 만듭니다.

존재하지만 가시적으로 보이지 않게 때문에 텍스트 크기만큼 영역을 확보합니다.

```tsx
import styled from '@emotion/styled';

export const ButtonWrapper = styled.button<{ isLoading: boolean }>`
  all: unset;
  ${(props) => props.theme.fonts.body16Regular}
  border-radius: 0.5rem;
  border: none;
  /* disabled 이면 gray가 되고 loading이면 green을 유지 */
  background-color: ${(props) =>
    props.disabled && !props.isLoading
      ? props.theme.colors.gray400
      : props.theme.colors.green};
  color: ${(props) => props.theme.colors.white};
  height: 2.75rem;
  position: relative;
  width: fit-content;
  min-width: 5.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TextWrapper = styled.span<{ isLoading: boolean }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;

  color: ${(props) =>
    // highlight-start
    props.isLoading
      ? 'transparent'
      : props.theme.colors.white}; /* 로딩하는 동안 text를 숨김 */
  // highlight-end
  margin: 0 1rem;
`;

export const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
```

이렇게 되면 레이아웃 쉬프트 없이 버튼에 로딩 상태를 보여줄 수 있습니다.

![버튼 로딩 스피너](https://user-images.githubusercontent.com/84452145/248538008-e329ff78-da9e-4506-b65c-fcddaed6ba6e.gif)
