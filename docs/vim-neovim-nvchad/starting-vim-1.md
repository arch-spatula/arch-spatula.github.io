---
sidebar_position: 1
tags: ["vim", "방탈출"]
---

# vim 시작하기

![how-to-exit-vim-meme](/img/doc/vim/how-to-exit-vim-meme.jpg)

일단 제일 중요한 것은 초보자 입장에서 탈출하는 법부터 알려주겠습니다.

- `:` + `wq`: 저장하고 나가기
- `:` + `q!`: 저장 안하고 나가기

저 덕분에 여러분은 코딩방탈출 실력 1이 늘었습니다.

<iframe class="codepen" src="https://www.youtube.com/embed/-txKSRn0qeA" title="Vim in 100 Seconds" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<iframe class="codepen" src="https://www.youtube.com/embed/c4OyfL5o7DU" title="Neovim in 100 Seconds" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

아마 시작하면 실수로 vi 에디터로 vim을 들어가게 되었을 가능성이 큽니다. 특히 git을 처음 공부하고 있는데 CLI로 git을 제어하다가 git commit 커맨드를 작성하고 실수로 vi에 들어갔을 것입니다. 그리고 어떻게 탈출할지 몰라서 껐다가 켰습니다. 저는 그렇게 시작하고 개발을 공부하고 몇달 뒤에 [이상한 개발자 스트리머](https://www.youtube.com/watch?v=1UXHsCT18wE)를 보고 vim 익스텐션을 VScode에 설치하기로 결심했습니다. 그리고 그렇게 저의 vim 여정이 시작되었습니다.

```
vscodevim.vim
```

위 익스텐션 id로 접근하고 설치해서 vim으로 빠르게 파일이동을 경험해보기 바랍니다.

## vim 버전 확인

```sh
vim --version
```

이 커맨드로 현재 vim의 버전을 파악합니다.

<!--

만약에 vim 더 정확히 neovim의 여정을 시작하고 싶은데 개발 환경 설정이 이미 어느정된 IDE 같은 경험을 하고 싶다면 neovim distro를 추천합니다.

## nvchad 설치

[nvchad 공식 홈페이지](https://nvchad.com/)

nvim 설치하는 전략은 다양하지만 일일이 설정하는 것이 귀찮고 처음 학습할 때 버겁습니다. 그래서 위 공식 홈페이지에서 제공하는 방식이 적당합니다.

```sh
git clone https://github.com/NvChad/NvChad ~/.config/nvim --depth 1 && nvim
``` -->

## alias 설정

neovim을 설치하고 나면 다음 커맨드로 접근해야 합니다. 그래야 vi, vim으로 접근하는 일을 차단해야 합니다.

```sh
nvim index.js
```

아래는 `~/.zshrc`으로 접근해서 `alias`를 접근해야 합니다.[^1]

```sh
alias vim="nvim"
alias vi="nvim"
alias vimdiff="nvim -d"
export EDITOR=/usr/local/bin/nvim # M1이면 /opt/homebrew/bin/nvim
```

위 설정들을 대략했으면 다음으로 넘어갑시다.

<iframe className="codepen" src="https://www.youtube.com/embed/m8C0Cq9Uv9o" title="The Only Video You Need to Get Started with Neovim" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

- [DHH](https://world.hey.com/dhh) 보라고 만든 풍문이 있습니다.
- 여러번 봐야 이해되는 [Lua-guide](https://neovim.io/doc/user/lua-guide.html)

[^1]: [CLI 프로그램 - macOS 안내서](https://subicura.com/mac/dev/terminal-apps.html#neovim)
