---
sidebar_position: 5
tags: ["Markdown", "docusaurus"]
---

# docusaurus 다루기

## 설치

### 낙서장 레포에 설치

공식문서를 보면 상당히 불친절하게 npx로 설치하도록 강요하고 있습니다.

하지만 우리는 pnpm 혹은 yarn으로 설치하는 방법을 배울 것입니다.

```sh
yarn create docusaurus
```

```sh
pnpm create docusaurus
```

일단 설치부터 시작합니다.

`website` > `classic (recommended)` > `y` 순서로 선택합니다.

참고로 타입스크립트는 반드시 선택해줍시다.

그리고 `open .`으로 폴더를 열어봅니다.

![파일 선택](https://user-images.githubusercontent.com/84452145/241558529-c3f14bc4-c74f-42d5-95ec-c5ae2a3ccb66.png)

그리고 파일을 선택하고 밖으로 드래그해서 뽑습니다.

기존에 있는 website 폴더는 삭제합니다.

이렇게 하는 이유는 docusaurus 설치할 때 이름이 필요합니다. 하지만 루트 즉 현재 `.`을 주면 Error: `Directory already exists at ...`라고 피드백을 줍니다.

[Can't create project inside existing dir #1768](https://github.com/facebook/docusaurus/issues/1768)

### 백지 레포 설치

```sh
yarn create docusaurus (폴더이름)
```

```sh
pnpm create docusaurus (폴더이름)
```

그 뒤 `classic (recommended)` > `y`은 똑같습니다.
