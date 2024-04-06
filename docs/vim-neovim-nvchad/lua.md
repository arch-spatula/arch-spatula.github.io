---
sidebar_position: 9
tags: ["vim", "neovim", "lua"]
draft: true
---

# lua

<iframe class="codepen" src="https://www.youtube.com/embed/jUuqBZwwkQw" title="Lua in 100 Seconds" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

lua는 스크립트 프로그래밍 언어입니다. 뭐 성능은 좋다고 하는데 한국에서 C++, Java 이외에 성능 좋다고 하면 신뢰 잃습니다. 중요한 것은 아니고 중요한 것은 neovim은 lua라는 프로그래밍 언어로 설정합니다. 하지만 이 lua 라는 프로그래밍 언어를 잘 이해해서 개발환경의 능력을 극한으로 끌어내야 합니다.

업무 자동화를 위해 응용도 가능합니다. 뭐 업무 자동화는 VBA로 가능한데 왜 굳이 lua를 사용하는가? neovim으로 vim 만으로 할 수 있는 기능말고 특별한 다른 기능도 활용할 수 있습니다.

한가지 놀란 것이 있습니다. ~~한국인이 lua를 다루니까~~ [꺼무위키](https://namu.wiki/w/Lua)에서 lua 문법을 설명해주고 있습니다.

<!-- @todo: 여정 다익스트라까지 만들기 -->
<!-- @todo: CLI 만들기 -->
<!-- @todo: http 서버 만들기 -->

https://learnxinyminutes.com/docs/lua/

lua의 타입스크립트 흉내내는 pluto라는 언어도 있습니다. 정적 타입확장을 제공합니다.

https://pluto-lang.org/

## 환경변수 호출하는 방법

제일 도움되는 자료는 이 질문이었습니다.

[Use variable from external file in Neovim init.vim](https://stackoverflow.com/questions/74087692/use-variable-from-external-file-in-neovim-init-vim)

저랑 겪은 비즈니스 컨텍스트 문제가 동일합니다.

저는 맥북에서 사용한 디렉토리랑 회사에서 사용하는 컴퓨터 디렉토리랑 다릅니다. 이 다른 디렉토리마다 각각 커밋하게 만들고 싶지 않았습니다.

```lua
os.getenv("HOME")
```

위처럼 세션에서 기본적으로 설정된 환경변수를 접근하면 되는 것이었습니다.

처음에는 `require`로 다른 곳에 디렉토리를 하드코딩하고 호출하면 해결될 줄 알았습니다. 전혀 해결이 안되었습니다. 오히려 해당하는 디렉토리를 전혀 못찾았습니다.

그래서 환경 변수를 설정하기로 했습니다. 환경변수를 설정하겠다고 했는데 문제가 있습니다. 도대체 무슨 환경변수인가? 나약한 현대 웹개발자인 저에게 환경변수는 `.env` 파일에 키와 값으로 쓰는 것을 생각했습니다. 하지만 neovim과 lua 세계에서 달랐습니다. shell RC(zshell, bash, posh ...)에 설정한 에일리어스를 의미하는 것이었습니다.

본인이 설정한 쉘 파일이 있다면 각자 접근하기 바랍니다. 저는 omz에 `.zshrc`로 설정했습니다.

```sh
nvim .zshrc
```

여기서 본인이 설정한 에일리어스를 확인해보기 바랍니다. 기본적으로 맥은 zsh로 설정되어있습니다.

윈도우는 [자습서 - Oh My Posh를 사용하여 PowerShell 또는 WSL에 대한 사용자 지정 프롬프트 설정](https://learn.microsoft.com/ko-kr/windows/terminal/tutorials/custom-prompt-setup)을 참고하기 바랍니다.

```sh title=".zshrc"
# 파일명 .zshrc
# HOME은 이미 기본설정되어 있음
export MYVIMRC="Foo"
```

약간 주의할 점들이 있습니다.

1. `export` 키워드가 없으면 환경변수로 접근할 수 없습니다.
2. 환경변수의 키(지금 예시는 `MYVIMRC`입니다.)는 모두 대문자로 표기해야 합니다. 상수라 적절하기는 합니다.
3. shell RC 파일의 설정이 적용되도록 실행하는 과정(지금의 경우 `source ~/.zshrc`)을 잊지 마세요.
4. 터미널을 한번 껐다가 켜보세요.

팁을 드리자면 현재 설정되어 있는지 확인해볼 수 있는 명령이 있습니다.

[Get value of $MYVIMRC from Lua](https://vi.stackexchange.com/questions/31737/get-value-of-myvimrc-from-lua)

```sh
:lua print(os.getenv("MYVIMRC"))
```

위처럼 하면 neovim 내에서 값을 확인해볼 수 있습니다. lua를 REPL으로 이런저런 작업을 해볼 수 있습니다.

참고로 `$`을 조심하세요.

[quick question: os.getenv() works for "PATH" but not "LUA_PATH"](https://www.reddit.com/r/lua/comments/xpr0hs/quick_question_osgetenv_works_for_path_but_not/)

```sh
:lua print(os.getenv("$MYVIMRC"))
```

위 명령도 동작합니다. 실제 값을 활용하고 접근하고자 할 때 `$`을 제거하도록 합니다. `os.getenv("$MYVIMRC")`이렇게 작성하면 `nil`을 반환할 가능성이 높습니다.

```lua title="lsp.lua"
local secret = os.getenv("VUELSPPATH")
if secret == nil then
    print("Environment variable PATH not set")
else
    lspconfig.tsserver.setup({
        init_options = {
            plugins = {
                {
                    name = "@vue/typescript-plugin",
                    location = secret,
                    languages = {
                        "typescript",
                        "javascript",
                        "vue",
                    },
                },
            },
        },
        filetypes = {
            "javascript",
            "typescript",
            "vue",
        },
        capabilities = capabilities,
    })
end
```

저는 VUE LSP를 로컬에 설치해야 동작할 수 있었습니다. 그래서 환경변수로 이렇게 설정하고자 했습니다.

지금 관점에서 다시 보면 코드의 다양한 문제가 있습니다. 상수라고 작성했지만 언어스코어로 띄어쓰기를 표시할 수 있어야 합니다.

nest.js처럼 타입스크립트를 작성해야 하는 경우가 있는데 vue LSP 접근에 실패한 것에 대해서 영향을 받는다는 점이 부조리해 보입니다.

```lua
local secret = os.getenv("VUELSPPATH")
if secret == nil then
    print("VUE LSP PATH not set")
    lspconfig.tsserver.setup({
       capabilities = capabilities,
    })
else
    lspconfig.tsserver.setup({
        init_options = {
            plugins = {
                {
                    name = "@vue/typescript-plugin",
                    location = secret,
                    languages = {
                        "typescript",
                        "javascript",
                        "vue",
                    },
                },
            },
        },
        filetypes = {
            "javascript",
            "typescript",
            "vue",
        },
        capabilities = capabilities,
    })
end
```

이게 더 적절해 보입니다. 여기서 의문은 환경변수를 조건부로 접근하고 싶습니다. 버퍼가 vue가 아닌데 vue lsp를 접근하는 환경변수를 읽는 함수를 호출합니다.

이상적인 것은 vue 버퍼에 해당하는지 확인하고 vue lsp가 있는 환경변수를 호출하게 만드는 것입니다.

```
:help vim.env 
```
