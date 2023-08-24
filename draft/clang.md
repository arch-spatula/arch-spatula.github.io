[C Programming Full Course for free 🕹️](https://www.youtube.com/watch?v=87SH2Cn0s9A)

```
ms-vscode.cpptools
```

```
formulahendry.code-runner
```

VScode 익스텐션 ID입니다.

```
clang -version
```

```
gcc -v
```

현재 c언어 버전을 확인할 수 있습니다.

vscode에서 상단 Terminal > configure default build task > c/c++: gcc 활성빌드를 설정합니다.

익스 텐션 중에 code runner로 컴파일 후 실행할 수 있게 해줍니다. 명령은 맥 기준으로 control + option + n입니다.

## clang gcc로 컴파일 하는 방법

```c
#include <stdio.h>

int main(void) {
  printf("hello, world ???\n");
  return 0;
}
```

```sh
gcc -o hello HelloWorld.c
./hello
```

여기서 `hello`는 실행파일 이름이 됩니다. `HelloWorld.c`는 컴파일할 소스코드 파일이 됩니다.
