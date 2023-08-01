---
sidebar_position: 7
---

# useRef 구체적으로 쉽게 타입 지정하기

<iframe class="codepen" src="https://www.youtube.com/embed/JuULWGuoI1A" title="Typing useRef is EASY with ElementRef" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

[Strongly Type useRef with ElementRef](https://www.totaltypescript.com/strongly-type-useref-with-elementref)

```ts
import { useRef, ElementRef } from 'react';

const Component = () => {
  const audioRef = useRef<ElementRef<'audio'>>(null);

  return <audio ref={audioRef}>Hello</audio>;
};
```

`ElementRef`의 제네릭을 대입할 때 원하는 태그에 자동완성으로 지정하면 됩니다.

custom hook에서 무슨 Element에 지정하지 말아야 하는지 구체적으로 명시할 때 활용할 수 있습니다.
