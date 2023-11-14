---
sidebar_position: 3
---

# html 특수한 태그

## py-script

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <title>pyScript test</title>
    <script defer src="https://pyscript.net/alpha/pyscript.js"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css"
    />
  </head>
  <body>
    <h1>import Not-This</h1>
    <py-script> import this </py-script>
  </body>
</html>
```

파이썬을 html에 넣고 활용할 수 있습니다.

[pyscript 공식 문서](https://pyscript.net/)
