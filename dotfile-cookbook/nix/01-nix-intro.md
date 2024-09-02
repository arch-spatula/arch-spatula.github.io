---
sidebar_position: 1
---

# nix

<iframe className="codepen" src="https://www.youtube.com/embed/FJVFXsNzYZQ" title="Nix in 100 Seconds" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

꽤나 난해한 영역입니다.

언어이자 brew같은 패키지 매니져이자 리눅스 운영체제입니다. 마치 삼위일체처럼 생각할 수 있습니다. 순수하게 생각하면 그렇고 사실은 언어로 별짓거리를 다합니다.

다루게 된 배경부터 조금 난해할 것입니다. 제가 다니는 회사가 windows 운영체제 강성 팬입니다. 이 windows 운영체제의 커맨드라인이 일상적으로 macOS를 쓰는 저의 입장에서는 난해합니다. 어느것은 cmd이고 어느것은 powershell이고 ~~사실 상세 스펙은 살펴본적이 없습니다~~ CLI를 다뤄야 하는 상황에 커맨드가 너무 달라 혼란이 많았습니다.

그렇다가 WSL을 발견했습니다. 윈도우 내에 리눅스를 설치하고 커맨드라인 만큼은 unix를 조상님처럼 둔 운영체제처럼 사용할 수 있었습니다.

굳이 ubuntu나 Arch를 안고른 이유는 패키지 설치할 때 높은 재현가능성 때문입니다. 는 아니고 사실 저의 지독한 홍대병 때문아닙니다. ~~면접관들이 진짜 싫어하는 이유는 어런 것 때문인듯~~

참고로 나중에 특이한 리눅스 별로 다뤄볼 생각이 있습니다.

당장 문서는 상당히 허전할 것입니다.

이제는 다루어도 괜찮다고 생각이 드는 부분들이 있습니다. neovim 환경 회사에서 재현하는데 성공했습니다.

- 회사에서 nixos wsl을 개인적으로 설치했습니다. neovim을 사용하기 위핸 커맨드라인 툴들을 설치하니까 어느정도 동작하기 시작했습니다.
  - 이제는 세세한 부분에 문제가 되고 있습니다. 핵심적인 코드 작성과 네비게이션은 이제 가능합니다.
  - 이렇게 보고 다시 생각해보면 windows를 피하기 위해 linux를 간접 경험할 수 있었습니다.

