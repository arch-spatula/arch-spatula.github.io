---
sidebar_position: 2
---

# HTML & CSS 팁

<!-- Create direction-aware effects using modern CSS https://www.youtube.com/watch?app=desktop&v=G_h2pGZcOzc -->

<!-- 웹에서 그라데이션 손쉽게 만드는 ‘CSS HD Gradients’ https://yozm.wishket.com/magazine/detail/2079/ -->

<!-- @todo: https://www.notion.so/CSS-e801506f89374e75a564994a7d1ea950 -->

## 은근히 자주 까먹는 link 태그

```html title="index.html"
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    // highlight-next-line
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <p>블록 block</p>
    <a href="#">인라인 inline</a>
  </body>
</html>
```

<!-- ## flex-grow는 부모가 flex여야 적용가능

제곧내

복습이 되었습니다. CSS cookbook을 따로 만들어야 할 것 같습니다.

height는 기본적으로 auto로 되어 있습니다. 콘텐츠 크기만큼 큽니다. div에 남은 길이만큼 채우기 위해서는 flex 혹은 gird 중 하나를 선택해야 합니다. -->

## filter으로 밝기 조절

이미지 밝기를 조절하는 방법이 있습니다.

```css
img {
  filter: brightness(50%);
}
```

[Darkening an image with CSS (In any shape)](https://stackoverflow.com/questions/15765550/darkening-an-image-with-css-in-any-shape)

## 텍스트 드레그 방지

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

## CSS 버튼 비활성화

접근을 금지하는 것과 접근할 수 없는 것은 다릅니다. 일반적으로 버튼이 비활성화 되어 있으면 접근할 수 없도록 설정합니다.

```tsx
const Button = styled.button`
  :hover {
    cursor: ${(props) => !props.disabled && 'pointer'};
    ${(props) =>
      props.disabled &&
      `
        -ms-user-select: none;
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
      `}
  }
`;
```

일반적으로 비활성화되어 있으면 상호작용이 불가능하다고 이렇게 설정합니다.

```tsx
const Button = styled.button`
  :hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;
```

이렇게 설정하면 버튼 접근 금지상태가 됩니다.

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

## 스타일 초기화

### `<li>`태그의 불릿 포인트(●)를 제거하는 방법

```css
li {
  list-style-type: none; /*불릿 포인트(●)를 제거*/
}
```

### a태그 스타일링

```css
a {
  text-decoration: none; /*밑줄 제거 방법*/
  text-decoration: line-through; /*취소선 입력 방법*/
  text-decoration: underline; /*밑줄 주는 방법*/
  text-decoration: line-through; /*취소선 넣는 방법*/
}
```

### 최소 초기화

```css
/*css 초기화*/

* {
  padding: 0;
  border: 0;
  margin: 0;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}
```

### clearFix

```css
item::after {
  content: '';
  display: block;
  clear: both;
}
```

## html input의 type color

```html
<input type="color" />
```

input은 이런것도 지원합니다. 이런것도 있는게 신기합니다.
