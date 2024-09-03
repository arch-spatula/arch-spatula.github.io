---
sidebar_position: 5
tags: ["vim", "vim command", "vimtutor"]
---

# Vimtutor에서 배운 Vim 단축키

Vim 단축키는 `vimtutor`으로 학습을 시작할 수 있습니다. 그냥 shell 명령으로 접근하고 학습할 수 있습니다.

```sh
vimtutor # 터미널 명령
```

```sh
:vimtutor
```

### 단축키

- `ctrl` + `R`: 재실행
- `dd`: 줄삭제(버퍼에 저장하고 붙일 수 있습니다.)
- `r`: 글자 교체
- `ce`: 단어 끝까지 자르고 삽입(자른 단어를 버퍼에 저장합니다.)
- `/` 혹은 `?`: 검색 명령
  - `n` / `N`: 검색한 단어 앞뒤로 이동
- `ctrl` + `I`/`O`: 이전 이후 위치로 이동
- `R`: 연속해서 문자 치환
- `A`: 줄끝 삽입
- `ctrl` + `W`: 윈도우 바꾸기
- `U` / `u`: 대문자/소문자 변환
- `ctrl` + `a`/`x` 을 숫자 위에서 실행하면 숫자가 증가/감소합니다.
- `(`, `)`은 문장단위 이동 모션입니다.
- 충격적인 커맨드를 배웠습니다. `vi` + `b`, `{`, `(`, `<` 등 괄호 범위 기준으로 선택할 수 있습니다.
  [여기서](https://www.youtube.com/watch?v=by0E9Nm2Eco) 발견했습니다.
- `ctrl` + `p`/`n`을 사용하면 neovim에서 상하이동입니다. 자동완성도 적절해보입니다.
- `ctrl` + `w` -> `h`, `j`, `k`, `l` 로 창을 변경할 수 있다는 것이 충격입니다.
- `>>` / `<<`: 비주얼 모드로 선택한 상태에서 탭하는 방법입니다.
  - [Tabbing visual selection](https://stackoverflow.com/questions/442302/tabbing-visual-selection)
- `=`은 다음줄의 시작하는 단어로 이동합니다.

<!-- - https://frhyme.github.io/vim/vim02_indent_tab/-->

### vim 커맨드

커맨드는 `:`을 입력하는 것을 접근합니다.

- `%`: 괄호 짝을 찾습니다.
- `:%s/이전/이후/g`: 단어 이전을 이후로 교체합니다.
  - `:%s/이전/이후`: 첫 단어만 교체
  - `:시작번호,끝번호s/이전/이후/g`: 줄의 범위만 교체
  - `:%s/이전/이후/gc`: 하나하나 모두 변경할지 확인
  - [Find and replace strings in vim on multiple lines](https://stackoverflow.com/questions/19994922/find-and-replace-strings-in-vim-on-multiple-lines)
- `:help`: vim 도움말 받기
- `:set` + `ic`/`noic`: 대소문자 키고 끄기 설정
  - `:set` + `ic`/`is`/`hls`: 검색의 대소문자 구분 설정, 부분 검색 결과, 검색 결과 하이라이트
  - `:set` + `no` + `ic`/`is`/`hls`: 위 설정 명령을 해제합니다.
- `:(글자)` + `ctrl` + `D`: `글자`로 시작하는 명령합니다. `TAB`으로 vim 명령을 순회하면서 명령을 결정할 수 있습니다.
- `:!` + (터미널 명령): vim 환경에서 명령
  - `:w 파일`: vim에서 파일을 만들 수 있습니다.
  - `:!rm 파일`: vim 명령을 터미널에서 해서 파일을 삭제합니다.
- `:< ,>w` + (파일이름): 파일을 줄단위로 저장
- [화면을 분할하는 방법](https://neovim.io/doc/user/usr_08.html)도 있습니다.
  - `:split 파일이름`으로 화면을 분할 할 수 있습니다.
  - `:vsplit 파일이름`으로 수평 분할도 가능합니다.
- `:e`: 으로 버퍼를 초기화할 수 있습니다. lsp, git 표시 등을 초기화할 수 있습니다.

#### `:messages`로 로그보기

```
Word 'n' added to ~/.config/nvim/spell/en.utf-8.add
```

위와 같은 로그가 발생했는데 찝찝했었습니다. 그래서 nvim으로 로그를 어떻게 볼 수 있는지 검색했습니다.

```
:messages
```

위 커맨드로 로그를 확인할 수 있습니다.

### explore

- `%`: vim에서 파일 생성
- `d`: vim에서 폴더를 생성
  - [How to make a new directory and a file in Vim](https://stackoverflow.com/questions/37255222/how-to-make-a-new-directory-and-a-file-in-vim)
- `D`: vim에서 파일 삭제
- `-`: 디렉토리에서 나가기
