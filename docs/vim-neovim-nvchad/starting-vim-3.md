---
sidebar_position: 3
tags: ['vim', 'vim command']
---

# vim 커맨드 시작하기 - 2

[Vim As Your Editor - Horizontal](https://www.youtube.com/watch?v=5JGVtttuDQA)을 참고했습니다.

## 삽입 모드 전략

`_`, `$`: 줄 맨앞 줄 맨뒤로 이동하기입니다.

`_`, `$` + `D`: 줄 앞 뒤로 삭제하기

`f` + (찾는 글자): 커서에서 해당하는 글자로 이동

`f` + (찾는 글자) + , ; : 글자 단위로 앞뒤로 이동하기

당연히 다른 기능이랑 섞어서 사용할 수 있습니다. 선택과 삭제로 응용할 수 있습니다.

`I`: 인서트 모드 줄 맨앞

`A`: 인서트 모드 줄 끝

`o`: 다음에 새 줄을 생성합니다.

`O`: 위에 새 줄을 생성합니다.

## 이동전략

`(숫자)` + `(모션)`: 숫자만큼 움직입니다.

상대적인 숫자로 움직이는 것은 좋습니다. 하지만 부족합니다.

`{`, `}`: 문단 단위로 움직일 수 있습니다. 단점은 함수가 너무 거대하면 함수 전체를 위아래로 움직이기 때문에 잘 움직이기 어렵습니다. 의도 하지 않는 장점은 코드를 작성할 때 중간에 줄 하나더 추가하고 여백을 넣는 습관이 생깁니다. 또 코드 중간에 여백을 선호하는 취향도 길러집니다.

`ctrl` + `d,` `ctrl` + `u`: 반 페이지 단위로 움직입니다. 개인적으로 파일 내에서 움직일 때 주로 활용하는 방법입니다.

`zz`: 커서를 기준으로 화면을 가운데로 정렬합니다.

`zt`: 커서를 기준으로 화면을 상단으로 정렬합니다.

`zb`: 커서를 기준으로 화면을 하단으로 정렬합니다.

`ZZ`: 저장 후 나가기입니다.

`gg`, `[`: 맨 위로 움직입니다.

`G`, `]`: 맨 아래로 움직이입니다.

## 유용한 학습자료

[vim-be-good](https://github.com/ThePrimeagen/vim-be-good) 플러그인 입니다.

`:VimBeGood`: vim 연습 커맨드입니다.
