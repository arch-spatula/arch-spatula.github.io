---
sidebar_position: 1
tags: ["vim", "방탈출"]
---

# vim 시작하기

일단 제일 중요한 것은 초보자 입장에서 탈출하는 법부터 알려주겠습니다.

- `:` + `wq`: 저장하고 나가기
- `:` + `q!`: 저장 안하고 나가기

저 덕분에 여러분은 코딩방탈출 실력 1이 늘었습니다.

아마 시작하면 실수로 vi 에디터로 vim을 들어가게 되었을 가능성이 큽니다. 저는 그렇게 시작하고 개발을 공부하고 몇달 뒤에 [이상한 개발자 스트리머](https://www.youtube.com/watch?v=1UXHsCT18wE)를 보고 vim 익스텐션을 VScode에 설치하기로 결심했습니다.

```
vscodevim.vim
```

위 익스텐션 id로 접근하고 설치해서 vim으로 빠르게 파일이동을 경험해보기 바랍니다.

## vim 버전 확인

```sh
vim --version
```

이 커맨드로 현재 vim의 버전을 파악합니다.

## nvchad 설치

[nvchad 공식 홈페이지](https://nvchad.com/)

nvim 설치하는 전략은 다양하지만 일일이 설정하는 것이 귀찮고 처음 학습할 때 버겁습니다. 그래서 위 공식 홈페이지에서 제공하는 방식이 적당합니다.

```sh
git clone https://github.com/NvChad/NvChad ~/.config/nvim --depth 1 && nvim
```

## alias 설정

neovim을 설치하고 나면 다음 커맨드로 접근해야 합니다.

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

[^1]: [CLI 프로그램 - macOS 안내서](https://subicura.com/mac/dev/terminal-apps.html#neovim)
