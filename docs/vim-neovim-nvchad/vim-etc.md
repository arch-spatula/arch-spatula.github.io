---
sidebar_position: 7
tags: ['vim', 'vim distro']
---

# vim distro 목록

vim distro를 실제로 받아서 사용하기 전에 개인에게 맞는 vim 설정하는 것을 권장합니다. vim의 사용법, lsp 등 CS 지식 기본기에 비례해서 혜택을 받을 수 있습니다.

## distro 목록

[NvChad](https://nvchad.com/)

- 기본 설정이 꽤 충분하고 많은 편입니다.

[AstroNvim](https://astronvim.com/)

[LAZYVIM](https://www.lazyvim.org/)

[LunarVim](https://www.lunarvim.org/)

[helix](https://helix-editor.com/)

[kickstart](https://github.com/nvim-lua/kickstart.nvim)

- neovim 학습용 레포로 생각하는 것이 더 적절합니다.

## 설정을 위한 학습자료

<iframe class="codepen" src="https://www.youtube.com/embed/w7i4amO_zaE" title="0 to LSP : Neovim RC From Scratch" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

[Dreams of Code의 Neovim 시리즈](https://www.youtube.com/playlist?list=PL05iK6gnYad1sb4iQyqsim_Jc_peZdNXf)

<!-- ## 추천 플러그 -->

## 사람과 기관

[TJ DeVries](https://github.com/tjdevries)

- [neovim](https://github.com/neovim/neovim)
- [Telescope](https://github.com/nvim-telescope/telescope.nvim?tab=readme-ov-file)
- [kickstart](https://github.com/nvim-lua/kickstart.nvim)

[Folke Lemaitre](https://github.com/folke)

- vim distro [💤 LazyVim](https://github.com/LazyVim/LazyVim)
- 플러그인 매니저 [💤 lazy.nvim](https://github.com/folke/lazy.nvim)
- [💥 Noice](https://github.com/folke/noice.nvim)
- [💥 Which Key](https://github.com/folke/which-key.nvim)

[ThePrimeagen](https://github.com/ThePrimeagen)

- [harpoon](https://github.com/ThePrimeagen/harpoon)

## vim 용어

- buffer: 현재 열어둔 파일 탭
  - 버퍼인 이유는 작성시점에 저장하지 않고 `:w`에 저장하기 때문입니다. 디스크에 쓰기 전에 메모리에만 있습니다. 버퍼 메모리 개념으로 접근하면 이해하기 쉽습니다.
- keymap: 사용자가 정의한 단축키
- LSP: IDE가 클라이언트이고 프로그래밍 언어를 효과적으로 사용할 수 있게 해주는 서버입니다.
- 모드: vim은 다양한 모드의 상태에 따라 제어할 수 있습니다.
  - 삽입모드: 텍스트를 추가, 삭제 등 작업할 수 있는 상태입니다.
  - 노멀모드: 일반적으로 코드를 확인하고 돌아다닐 때 사용하는 모드입니다.
  - 비주얼모드: 텍스트를 선택하는 상태입니다. 커맨드를 통해 복사, 잘라내기 등... 작업을 수행할 수 있습니다.
- yank: vim에서 복사를 의미합니다.
  - 기본적으로 프로세스에 복사하고 클립보드에는 복사하지 않습니다. 프로세스 내에서만 공유합니다. 하지만 기본설정으로 가능하게 만들 수 있습니다.
