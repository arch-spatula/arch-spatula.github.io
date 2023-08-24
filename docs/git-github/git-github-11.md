---
sidebar_position: 11
tags: ['git', 'DevOpes', 'CI/CD', 'github action']
description: 'github action로 이런저런 짓거리하기'
draft: true
---

# github action로 개발자 업무 자동화

왜 쓰는지는 제목으로 나왔습니다. github action로 자동화의 혜택을 받을 수 있고 다른 도구도 있지만 저는 귀찮아서 github action 위주로 다루겠습니다.

## github action 릴리즈 노트 자동화

[github actions로 버전 관리하기-릴리즈 노트편](https://mong-blog.tistory.com/entry/github-actions%EB%A1%9C-%EB%B2%84%EC%A0%84-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0-%EB%A6%B4%EB%A6%AC%EC%A6%88-%EB%85%B8%ED%8A%B8%ED%8E%B8)

예전에 적용하고 싶었던 릴리즈 노트입니다. 왜 검색을 못했는지 모르겠습니다. ㅂㄷㅂㄷ...

<iframe class="codepen" src="https://www.youtube.com/embed/yfBtjLxn_6k" title="How GitHub Actions 10x my productivity" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

`.github/workflows` 폴더를 만듭니다.

https://docs.github.com/ko/actions/quickstart

push하면 실행됩니다.

https://github.com/nektos/act

위 CLI 툴을 설치하기 바랍니다.

Docker도 설치해야 합니다.

```yml
name: foo
```

workflow에 name은 구분할 수 있게 해줍니다.

```yml
name: foo

on
```

on은 실행할 이벤트를 설정합니다. 이 이벤트가 발행하면 job을 실행합니다.

```yml
name: foo

on:
  push:
    branches: ['main']
  pull_request:
    branches: ['main']

job:
  bar:
    runs-on: ubuntu-latest
```

job 다음에는 실행할 명령의 이름을 정합니다. 지금은 bar라고 했습니다.

```yml
name: foo

on:
  push:
    branches: ['main']
  pull_request:
    branches: ['main']

job:
  bar:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
```

job은 여러 steps로 나누어집니다.

---

## 릴리즈 노트 자동화 적용

TanStack 레포를 팔로우하면 자주 보는 것이 있습니다. 릴리즈노트가 아주 자주 나옵니다. Tanner Linsley 상당히 근면 성실해보입니다.

여기서 저도 자주 배포할 프로젝트가 있는데 일일이 릴리즈 노트를 작성하는 것은 번거로울 것입니다. 이 부분을 자동화하고 싶어졌습니다.

https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes

문제는 이해가 잘 안됩니다.

이벤트, 워크플로우, 잡이 뭔지 알겠습니다. 어디를 어떻게 적성하고 제어해야 하는지 모르겠습니다.
