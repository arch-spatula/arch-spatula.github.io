---
sidebar_position: 1
tags: ["vscode", "error log", "moduleResolution"]
---

# VSCode와 관련된 이런 저런 에러 추가

## Argument for `--moduleResolution` option must be: `node`, `classic`, `node16`, `nodenext`

에러 로그라고 하기에는 거창하지만 다른 사람들도 발견하고 해결하기 바라는 마음에 남겨둡니다.

### 문제: vite 설치로 발견

```sh
pnpm create vite .
```

vite으로 리액트를 설치했습니다.

> Argument for `--moduleResolution` option must be: `node`, `classic`, `node16`, `nodenext`

이 에러를 발견했습니다.

상당히 특이한 에러입니다. 역사의 전통의 CRA만 고집하는 사람도 있지만 새로 시작하고 편안하게 vite으로 설치하는 사람들도 있습니다.

하지만 프로덕션 코드에서 이런 에러가 발생한다는 점이 이상했습니다.

### 시도: 검색

[[Vite] tsconfig 설정하기](https://velog.io/@otterji/Vite-tsconfig-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)

불신의 velog에서 위 아티클을 발견했습니다.

[VSCode and Typescript 5 moduleResolution "bundler"](https://stackoverflow.com/questions/75870063/vscode-and-typescript-5-moduleresolution-bundler)

블로그 출처를 확인해보니까 stack overflow 질문에도 있습니다.

### 해결: VSCode를 최신 버전으로 업데이트

![VSCode 업데이트 하는 방법 이미지](https://user-images.githubusercontent.com/84452145/241535836-8e76e38f-69b5-456d-a8f8-5f190c4f8e17.png)

그래서 일단 velog 글을 믿고 업데이트 하니까 에러가 해결되었습니다.

### 학습: 에디터가 에러의 범인이 될 수 입니다

- 에디터도 에러의 범인이 될 수 있습니다. 하지만 짧은 개발 경험에도 불구하고 에디터가 문제를 일으킨 경우는 많지 않았습니다.
  - 지금처럼 검색해서 발견하기 전까지는 용의자에서 보류합니다.
