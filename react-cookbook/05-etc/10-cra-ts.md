---
description: 'CRA에 타입스크립트 추가하기'
tags: ['react', 'create react app', 'typescript']
sidebar_position: 10
---

# CRA에 타입스크립트 추가하기

이제는 거의할 일이 없을 가능성이 높습니다. 새로운 프로젝트를 CRA로 시작하는 경우는 별로 없고 그 프로젝트 마져 자바스크립트인 경우도 별로 없습니다. 하지만 아주 가끔 필요할지도 모릅니다.

[Add TypeScript to React in Less Than 5 Minutes](https://www.youtube.com/watch?v=12qzCOYLLoc)

https://create-react-app.dev/docs/adding-typescript/

```sh
npm install --save typescript @types/node @types/react @types/react-dom
```

CRA 공식문서는 일반 의존성에 추가하라고 합니다. 개발 의존성이 아닌 이유가 궁금해졌습니다. 또 처음부터 CRA로 설치해보니까 모두 일반 의존성에 있습니다.

위 라이브러리를 설치하면 터미널에서 다음과 같은 경고가 발생할 것입니다.

```txt
One of your dependencies, babel-preset-react-app, is importing the
"@babel/plugin-proposal-private-property-in-object" package without
declaring it in its dependencies. This is currently working because
"@babel/plugin-proposal-private-property-in-object" is already in your
node_modules folder for unrelated reasons, but it may break at any time.

babel-preset-react-app is part of the create-react-app project, which
is not maintianed anymore. It is thus unlikely that this bug will
ever be fixed. Add "@babel/plugin-proposal-private-property-in-object" to
your devDependencies to work around this error. This will make this message
go away.
```

이런 에러가 발생합니다. 그래서 다음 라이브러리를 설치합니다.

```sh
npm install --save-dev @babel/plugin-proposal-private-property-in-object
```

여기서 다음 에러 메시지가 터미널에 보입니다.

```txt
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR!
npm ERR! While resolving: react-scripts@5.0.1
npm ERR! Found: typescript@5.1.6
```

[(react-scripts) Support for TypeScript 5.x](https://github.com/facebook/create-react-app/issues/13080)

위 명령으로 패키지를 설치하는데 다음 에러가 발생했습니다.

```json title="package.json"
{
  "dependencies": {
    "typescript": "^5.1.6"
  },
  "overrides": {
    "typescript": "^5.1.6"
  }
}
```

overrides를 추가하고 다시 명령하면 설치가 성공합니다. 그리고 실행하면 정상 작동합니다.

### 부록: 배포버전 확인을 위해 serve 설치하기

```sh
npm install -g serve
serve -s build
```

평소 serve를 그냥 스크립트 명령으로 봤었지만 수동으로 이렇게 설정하니까 이런 패키지가 필요할 줄 몰랐습니다.
