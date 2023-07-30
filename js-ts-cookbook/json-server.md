# json-server

json-server는 DB랑 API를 만들어주는 패키지입니다. 이런 패키지는 병렬로 작업하기 위해 사용합니다. 기본적으로 프론트엔드와 백엔드 작업은 병렬로 진행됩니다. Mock Data를 만들어서 모의서버, 모의 데이터베이스를 만들어 개발에 착수합니다.

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
