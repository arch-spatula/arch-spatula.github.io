---
sidebar_position: 3
tags: ['docker', 'Dev container']
draft: true
---

# dev container

로컬에 직접 설치하는 것을 피하고 컨테이너로 접근해서 작업을 하고 싶을 것입니다.

Docker도 MS가 운영하는 inner source입니다. VScode도 MS가 운영합니다. 그냥 생각나서 공유합니다.

dev container는 그냥 VScode 플러그인이라고 생각하고 넘길 수 있습니다.

<iframe class="codepen" src="https://www.youtube.com/embed/b1RavPr_878" title="Get Started with Dev Containers in VS Code" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

위 영상 보고 따라 하셔도 됩니다.

제일 먼저 해야할 것은 **백그라운드에 container가 실행 중**이어야 합니다. 우리가 하고자 하는 것은

![](/img/doc/docker/attach_to_running_container.png)

`cmd` + `shift` + `p` 커맨드 팔레트에서 `Attach to Running Container`를 입력하기 바랍니다.

![](/img/doc/docker/select_container.png)

본인이 만든 컨테이너 목록 중에서 본인이 내부에서 편집하고 싶은 컨테이너를 선택하기 바랍니다.

![](/img/doc/docker/open_dev_container.png)

이렇게 접근했는데 빈화면이라면 VScode 터미널에 `code .` 라고 한번 명령해주기 바랍니다. 여기서부터 북치고 장구치고 알아서 하기 바랍니다.

<!-- @todo: neovim -->
