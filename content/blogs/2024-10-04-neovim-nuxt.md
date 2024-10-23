---
title: "nuxt, vue를 위한 neovim 설정 과정"
authors: [arch-spatula]
tags: ["vue", "neovim", "Dotfile"]
description: "nuxt, vue로 개발하기 위한 neovim 설정"
toc_max_heading_level: 5
_draft: true
date: 2024-10-04
---

<!--
NOTE: 글쓰기 단계 - 아이디어
-->

# nuxt, vue를 위한 neovim 설정 과정

- 개발자 블로그를 nuxt로 전환하면서 개발환경과 관련된 문제들이 생겼습니다. 바로저의 로컬 개발환경이 문제였습니다. neovim이 상당히 조악하게 작동하는 것이었습니다. systax highlighting은 잘 동작하는데 LSP, forrmater는 잘 동작하지 않는 것이었습니다.
- 예전에 회사에서도 neovim 설정시도를 하고 있었습니다. 여기서 vue LSP 동작이 잘 안했는데 vue 커뮤니티에서 소수자라고 LSP 지원을 특별히 할 생각없이 2.0.0 버전으로 업데이트하고 말았습니다. 아마 당시 누가 neovim 같은 거로 개발이나 하겠어? 처럼 LSP 메인테이너는 상당히 무관심했습니다. 물론 프론트엔드 개발자들 대다수가 멋없게 VSCode를 사용하는 것은 사실입니다. 하지만 저처럼 멋있는 개발자들은 neovim으로 개발하면서 자동완성의 뽕맛에 취하고 싶습니다.
  - 개인 노트북은 MacOS, 회사컴퓨터는 windows에 NixOS - WSL로 설정을 했습니다.
  - WSL 환경으로 바꾸면서 실행가능한 CLI가 늘어나면서 이런저런 이슈가 많이 해결되었습니다.
  - 회사컴퓨터로 neovim으로 개발가능하도록 환경을 설정하고 있었는데 LSP가 정상동작을 안하는 이슈가 있었습니다.
- `draft`를 `_draft`로 전체 바꾸기를 해야 합니다. nuxt로 블로그를 만들면서 필요해진 유스케이스를 발견했습니다.

## Vue LSP 설정하기

<!--
NOTE: 글쓰기 단계 - 아이디어
-->

- 솔직히 이야기하자면 아직도 방법을 찾고 있습니다. 회사 개발환경에서 온전히 vue를 사용하고 있지는 않습니다. Vue - LSP에 타입스크립트 LSP랑 같이 엮이면서 타입스크릅티 서버에 많은 의존을 하고 있습니다.

## auto tags 추가하기

- 굉장해 엄청나 이런거는 아닙니다. 그냥 태그를 닫을 때 알아서 자동완성하는 기능을 붙인 것입니다.
  - 짤은 나중에 추가하겠습니다.

https://github.com/windwp/nvim-ts-autotag

- 위 래포가 자동완성을 지원해줍니다.

```lua
	{
		"windwp/nvim-ts-autotag",
		ft = {
			"vue",
			"javascript",
			"typescript",
			"jsx",
			"tsx",
		},
		config = function()
			require("nvim-ts-autotag").setup()
		end,
	},
```

- lazy 패키지 매니저 사용하고 있다면 위 코드 그대로 복붙하시면 됩니다.
- 이런 자동완성 혜택으로 생산성을 높이고 말겠습니다.
- 참고로 위에 있는 ts는 타입스크립트가 아니고 treesitter입니다.

### nuxt LSP 이슈

- auto-ts-tag만이 문제는 아니었습니다. 지금 거의다 작성해가는데 nuxt LSP도 설정하고 싶어졌습니다.
- code 복사 버튼이랑 toc 기능도 LSP 없이 구현하기는 했습니다.
- 이런 내용은 nuxt, vue를 위한 neovim 설정 과정으로 따로 옮기도록 하겠습니다.

<!--

### draft 정말로 숨기기

- 여기서 고민은 스크립트 파일을 작성하고 사용하는 것일지 직접 찾아 변경할지 입니다.
- neomvim의 기능을 다시 활용해야 할 것 같습니다. vscode에서 변경을 한다고 했었다면 어떻게 하는지 알았을 것입니다.

https://www.reddit.com/r/neovim/comments/187kdod/search_and_replace_in_multiple_files/

https://stackoverflow.com/questions/70003193/find-and-replace-all-instances-of-specific-string-in-multiple-files-in-vim

- stackoverflow에서 확인한 커맨드가 유용했습니다. 의외로 띄어쓰기 때문에 문제 생길 것이라고 생각했는데 아니었습니다. 약간 아쉬운 점은 code actions로 처리하고 싶었습니다. 거기에 반영하면서 저장하게 만들고 싶었습니다.

-->
