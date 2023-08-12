# ETC

## REST API 명세서 작성하기

API 명세서 작성하면

https://covenant.tistory.com/241

URL에 케밥케이스(kebab-case)를 사용하자

```url
[GET] /system-orders
```

이렇게 작성합니다.

## hotfix

hotfix는 이슈에 안 올라온 버그에 대한 커밋입니다.

hotfix 브랜치는 배포 브랜치의 문제를 긴급 고치는 브랜치입니다.

## 빠른 ID 생성함수

```js
// utility for creating unique Id
let id = 0;
function getId() {
  return id++;
}
```

이런 패턴도 존재합니다. 프로덕션에서는 쓰지맙시다.

실행횟수를 알아낼 때도 활용할 수 있습니다.

## eslint 지정

https://velog.io/@xmun74/Next.js-TS%EC%97%90%EC%84%9C-ESLint-Prettier-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0
