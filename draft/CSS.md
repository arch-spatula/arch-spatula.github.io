### 스타일링 결합

하나로 결합하는 것하는 것에 난관이 생겼습니다.

[Multiple inheritance (Composition) #773](https://github.com/styled-components/styled-components/issues/773)

레포 이슈에서는

```tsx
import { css } from 'styled-components';

const rounded = css`
  border-radius: 5px;
`;
```

```tsx
import { css } from 'styled-components';

const column = css`
  display: block;
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: 25%;
  width: 25%;
`;
```

```tsx
import styled from 'styled-components';

const Card = styled.div`
  ${rounded}
  ${column}
`;
```

이런 방법을 권장하고 있습니다. 이렇게 되면 생기는 단점은 props가 없다는 것입니다. 그래서 한계가 생깁니다.

회사 규모에서는 더 복잡한 버튼의 상태를 갖을 것인데 고민이 많아집니다. 다시 생각해보면 설계가 잘못되어 있습니다.

## flex-grow는 부모가 flex여야 적용가능

제곧내

복습이 되었습니다. CSS cookbook을 따로 만들어야 할 것 같습니다.

height는 기본적으로 auto로 되어 있습니다. 콘텐츠 크기만큼 큽니다. div에 남은 길이만큼 채우기 위해서는 flex 혹은 gird 중 하나를 선택해야 합니다.

## onClink CSS

[:active - MDN](https://developer.mozilla.org/ko/docs/Web/CSS/:active)

```css
a:active {
  background-color: springgreen;
}
b:active {
  background-color: springgreen;
}
```

클릭 시점에 적용되어야 할 스타일은 이렇게 적용할 수 있습니다.

### filter으로 밝기 조절

이미지 밝기를 조절하는 방법이 있습니다.

```css
img {
  filter: brightness(50%);
}
```

[Darkening an image with CSS (In any shape)](https://stackoverflow.com/questions/15765550/darkening-an-image-with-css-in-any-shape)

### 텍스트 드레그 방지

텍스트 드레그를 방지하는 방법입니다.

```tsx
export const NoCardMessage = styled.p`
  ${(props) => props.theme.fonts.heading20Bold}
  color: ${(props) => props.theme.colors.gray300};
  /* 텍스트 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;
```

```css
.class {
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
```

위 예시를 적용하면 됩니다.
