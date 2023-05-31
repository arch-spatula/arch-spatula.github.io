---
sidebar_position: 2
tags: ["firebase", "error log"]
---

# 본인 Post 요청하기

```js
import { authService, dbService } from "./firebase.js";
import {
  query,
  getDocs,
  collection,
  where,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

export const readMyPost = async () => {
  authService.onAuthStateChanged(async (user) => {
    const myPostList = [];

    // 본인 고유 id랑 일치는 쿼리만 요청합니다. 쿼리 자체는 하나의 클래스입니다.
    const getMyPost = query(
      collection(dbService, "posts"),
      // 첫번째 인자는 요청할 대상이고 두번째 인자는 요청하는 방식입니다. 요청하는 방식은 현재 접속한 유저의 uid랑 일치하는 것만 요청합니다. ???
      where("userId", `==`, user.uid)
    );
    const querySnapshot = await getDocs(getMyPost);

    querySnapshot.forEach((doc) => {
      const postObj = {
        id: doc.id,
        ...doc.data(),
      };
      myPostList.push(postObj);
    });

    myPostList.forEach((post) => {
      // DOM업데이트하면서 그려주기
      console.log(post.time);
    });
  });

  return myPostList;
};
```

자바스크립트에 파이어베이스 쓰던 시절을 어떻게 버텼는지 신기합니다.
