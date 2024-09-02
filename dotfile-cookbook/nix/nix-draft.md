---
sidebar_position: 99
draft: true
---

# nix 줍줍

## UTM 

https://namu.wiki/w/UTM 

위는 macOS를 위한 운영체제 가상화 툴입니다. NixOS 설치시도를 해보고 싶었습니다. 먼저 연습하고 나중에 부트로더를 만들려고 합니다.

위 시도를 먼저 해보고 macOS에서 마음에 드는 설정을 하면 해당하는 NixOS의 Nix 파일을 활용할 것입니다. 물론 생각에 불과합니다.

Docker에서 사용할 때랑 그리고 듀얼 부트로더로 회사 컴퓨터를 2개의 운영체제를 운용할 수 있으면 현재의 저의 설정을 완전히 재현할 수 있을 것이라는 착각을 할 수 있습니다.

https://nixos.org/download/

위는 패키지 매니져랑 운영체제 설치를 알려줍니다.

### 실제 UTM 설치

https://mac.getutm.app/

https://github.com/utmapp/UTM/

의외로 설치는 직관적이었습니다.

## nix iso image 구하고 설정하기

- gui 없는 버전은 그냥 다운 받을 수 있었는데 GUI 포함 iso는 한참걸립니다.
  - 2.4GB입니다.
  - 운영체제는 동작하는데 상당히 느렸습니다. 또 키보드 종류를 알아내야 했습니다.
  - 회사에서 사용하는 것은 wsl입니다. 그래서 Docker에서 환경 재현시도가 더 유리할 것 같습니다.

## docker nix 컨테이너에서 검증

```sh 
docker run -it nixos/nix
```

- 컨테이너를 띄웁니다.

```sh
# shell.nix 설정을 위해 설치
nix-shell -p git neovim 
nvim shell.nix
``` 

- `shell.nix`에 의존하는 CLI를 추가하니까 이제는 LSP가 동작합니다.
