---
sidebar_position: 3
tags: ['Markdown', 'docusaurus', 'error', '보안 사고']
---

# docusaurus를 github pages에 배포하는 방법

## tl;dr

- 공식 문서 블로그가 시키는데로 하시기 바랍니다.
- build 명령을 하면 `.env`의 정보가 노출되었는지 확인하도록 합니다.
- 지금은 토큰이 만료되었기 때문에 상황을 공유합니다.

## 문제: 보안 토큰이 커밋에 포함되었습니다.

![이메일](https://user-images.githubusercontent.com/84452145/264007736-464ca370-aa17-44e5-83ca-1a8731da1495.png)

저는 위와 같은 메일을 여러개 받았습니다. 내용은 저의 github 토큰이 커밋에 노출되었다는 것입니다.

저는 이 블로그를 5월 15일에 개발했습니다. 더 정확히는 설치했습니다. 당시 배포할 때는 유튜브 튜토리얼보고 `yarn deploy` 명령으로 배포했습니다.

```sh
yarn deploy
```

위 명령을 하고 명령하는 과정에서 `.env`을 읽고 해당 토큰에서 읽은 내용을 빌드할 때 포함합니다. 이렇게 되면 dist 파일에 포함이 됩니다.

```js title="docusaurus.config.js"
// ... 생량
/** @type {import('@docusaurus/types').Config} */
const config = {
  // ... 생략

  customFields: {
    GIT_PASS: process.env.GIT_PASS,
    GIT_USER: process.env.GIT_USER,
  },
  // ... 생략
};
```

이 `customFields`에서 `process.env.GIT_PASS`이 제가 발급한 토큰을 dist에 쓰고 처리하는 것이었습니다. 그래서 배포할 때 커밋 내역에 실제로 노출되었습니다.

![](https://user-images.githubusercontent.com/84452145/282484485-58dacb70-16fc-4342-acb3-92b8525dbf5e.png)

~~물론 지금은 몇달이 지나서 해커 여러분이 취약점으로 활용할 수는 없습니다. 또 github이 토큰을 커밋에서 감지하면 강제로 만료시킵니다.~~

## 해결: github actions로 배포하기

틀린 방법으로 배포를 하고 있었기 때문에 올바른 방법이 무엇인지 찾고 있었고 개인 프로젝트도 잠시 보류하고 블로그 전념했습니다.

사실 장애 상황은 아니었습니다. 하지만 하루 안에 모두 해결했습니다.

바로 본것은 공식문서부터 확인했습니다.

[Deploying to GitHub Pages - docusaurus 공식 문서](https://docusaurus.io/docs/deployment#deploying-to-github-pages)

여기서 deploy 명령도 확인했지만 SSH로 설정했어야 합니다. 저는 action으로 처리하고자 했습니다. ~~github pages 갱신하는데 매번 토큰 발급받는 것도 귀찮았습니다.~~

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
    # Review gh actions docs if you want to further define triggers, paths, etc
    # https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#on

jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: yarn

      - name: Install dependencies
        run: yarn install --frozen-lockfile
      - name: Build website
        run: yarn build

      # Popular action to deploy to GitHub Pages:
      # Docs: https://github.com/peaceiris/actions-gh-pages#%EF%B8%8F-docusaurus
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          # Build output to publish to the `gh-pages` branch:
          publish_dir: ./build
          # The following lines assign commit authorship to the official
          # GH-Actions bot for deploys to `gh-pages` branch:
          # https://github.com/actions/checkout/issues/13#issuecomment-724415212
          # The GH actions bot is used by default if you didn't specify the two fields.
          # You can swap them out with your own user credentials.
          user_name: github-actions[bot]
          user_email: 41898282+github-actions[bot]@users.noreply.github.com
```

공식 문서를 그대로 복사하고 붙입니다. 이렇게하고 `main` 브랜치에 PR이 merge 할 때마다 배포가 됩니다. 또 토큰도 action이 동작할 때 발급하고 활용합니다. 개인적으로 따로 발급해야 하는 작업이 사라집니다.

또 배포용 브랜치도 따로 생성됩니다.

하지만 저는 쫄보라 merge 전에 테스트 빌드 시도하는 것도 추가했습니다. 이것도 공식문서에 같이 있습니다.

```yaml
name: Test deployment

on:
  pull_request:
    branches:
      - main
    # 트리거, 경로 등을 추가로 정의하려면 gh 액션 문서를 참고하세요.
    # https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#on

jobs:
  test-deploy:
    name: Test deployment
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: yarn

      - name: Install dependencies
        run: yarn install --frozen-lockfile
      - name: Test build website
        run: yarn build
```

위 `jobs`가 빌드시도를 하고 빌드가 실패하는지 확인할 수 있습니다.

## 학습: 빌드 파일을 반드시 검토합니다.

빌드 파일은 반드시 확입합니다. build에 `.env`로 설정한 값이 있는지 검색합니다.
