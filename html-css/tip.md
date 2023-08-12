---
sidebar_position: 2
---

# HTML & CSS 팁

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
