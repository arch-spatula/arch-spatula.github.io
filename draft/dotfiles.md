## macos window tiling manager

https://www.youtube.com/watch?v=k94qImbFKWE

https://github.com/koekeishiya/yabai

https://www.youtube.com/watch?v=8W06wMNZmo8

## WezTerm

https://parksb.github.io/article/33.html#terminal-emulator

WezTerm을 추천하고 있습니다. 윈도우의 경우 `cmd`가 기본설정인게 문제입니다. 원하는 것은 `powerShell`입니다. 이것은 극복해야 할 문제입니다.

```lua 
local wezterm = require 'wezterm'
local config = {}

config.font = wezterm.font 'JetBrains Mono'
config.default_prog = { 'powershell' }

return config
```

이렇게 하면 windows 11은 powershell로 설정이 가능합니다.

## lazygit

vim 기반이랑 비슷한 경험을 주고 있어서 `q`로 탈출할 수 있습니다. `:`을 먼저 입력할 필요가 없습니다.

https://github.com/catppuccin/lazygit

lazygit에 catppuccin을 적용할 수 있는 것이 충격입니다.

## sketchybar 

화면에 배치할 수 있는 상태바입니다.

## tmux 줍줍

오늘은 tmux로 `ctrl` + `b` -> `w` 하면 윈도우를 선택할 수 있고 `ctrl` + `b` -> `c` 로 새로운 윈도우를 만들 수 있는 것을 배웠습니다.

누를 때는 `ctrl`을 먼저 누르고 있는 상태에서 `b`를 누릅니다.

`ctrl` + `b` -> `(숫자)`으로 tmux window로 이동할 수 있습니다.

