---
sidebar_position: 1
---

# htmlFor

```js
import React from 'react';

const Form = ({
  todoTitle,
  setTodoTitle,
  todoContent,
  setTodoContent,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <label htmlFor="title">제목</label>
      <input
        onChange={(event) => setTodoTitle(event.target.value)}
        type="text"
        id="title"
        placeholder="예: 1일 1커밋"
        value={todoTitle}
      />
      <label htmlFor="content">내용</label>
      <input
        onChange={(event) => setTodoContent(event.target.value)}
        type="text"
        id="content"
        placeholder="예: git 명령어 정리"
        value={todoContent}
      />
      <input type="submit" value="추가" />
    </form>
  );
};

export default Form;
```

jsx에서 `label`의 속성값 `for`는 반복 예약어이기 때문에 `htmlFor`를 사용해야 합니다.
