---
sidebar_position: 7
description: 'json-server'
tags: ['json', 'json server', 'mocking']
---

# json-server

json-server는 DB랑 API를 만들어주는 패키지입니다. 이런 패키지는 백엔드 엔지니어와 병렬로 작업하기 위해 사용합니다. 기본적으로 프론트엔드와 백엔드 작업은 병렬로 진행됩니다. Mock Data를 만들어서 모의서버, 모의 데이터베이스를 만들어 개발에 착수합니다. 그리고 양쪽이 완료되었으면 연결합니다.

```sh
yarn add json-server
```

설치입니다. 리액트부터 설치하고 난뒤에 추가하기 바랍니다. 간단하게 구축할 수 있습니다. 리액트 서버랑 백엔드 서버를 별도로 실행해줘야 합니다.

```sh
yarn json-server --watch db.json --port 3001
```

서버 활성화합니다.

`db.json` 파일이 자동생성되는 것을 볼 수 있습니다. 이 파일이 DB역할을 합니다.
json-test

```json title="db.json"
{
  "posts": [
    {
      "id": 1,
      "title": "json-server",
      "author": "typicode"
    }
  ],
  "comments": [
    {
      "id": 1,
      "body": "some comment",
      "postId": 1
    }
  ],
  "profile": {
    "name": "typicode"
  }
}
```

이미 이런 데이터를 넣줍니다. 하지만 과감히 삭제합시다.

브라우저 주소에 URL을 입력한다는 것은 GET 요청을 날린 것입니다.

```url
http://localhost:3001/todos
```

이런 url을 브라우저에 입력하면 todos 자원을 얻고자 get 요청을 날린 것입니다.

```json
{
  "name": "svelte-todo",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    // highlight-next-line
    "serve": "json-server --watch db.json --port 3001"
  },
  "devDependencies": {
    "@sveltejs/vite-plugin-svelte": "^2.4.2",
    "@tsconfig/svelte": "^5.0.0",
    "svelte": "^4.0.5",
    "svelte-check": "^3.4.6",
    "tslib": "^2.6.0",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  },
  "dependencies": {
    "json-server": "^0.17.3"
  }
}
```

위처럼 설정하면 다음 명령으로 json-server를 활성화 시킬 수 있습니다.

```sh
yarn serve
```
