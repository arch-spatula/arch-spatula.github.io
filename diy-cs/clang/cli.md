---
sidebar_position: 2
description: "C 언어 줍줍"
tags: ["C 언어", "줍줍"]
toc_max_heading_level: 6
---

# C 언어 CLI 만들기

## 올바른 C 언어 컴파일 명령

CLI를 만들기 전에 C 언어 컴파일러를 활용할 줄 알아야 합니다. 저는 gcc를 사용해서 컴파일 할 것입니다. 굳이 gcc를 사용하는 이유는 맥에서 기본 설치 되어 있기 때문입니다.

```sh
gcc -o 실행_파일이름 컴파일할_파일이름.c # 실행파일 생성
```

```sh
./실행_파일이름 # 실행파일 실행
```

위는 학생들을 위한 커맨드입니다. 그것도 초등학교에서 유치원생을 위한 커맨드입니다. 그냥 돌아가는 수준을 위한 커맨드입니다. 저희는 올바른 코드를 작성해야 합니다.

[Learn X in Y minutes에 작성되어 있는 C 문서](https://learnxinyminutes.com/docs/c/)는 아래 플래그를 추가할 것을 권장합니다.

```sh
-Wall -Wextra -Werror -O2 -std=c99 -pedantic
```

최종적으로는 다음처럼 컴파일 커맨드를 해야 합니다.

```sh
gcc -o 실행_파일이름 컴파일할_파일이름.c -Wall -Wextra -Werror -O2 -std=c99 -pedantic
```

각각의 플래그에 대해서 설명하겠습니다.

- `Wall`: 모든 경고 메시지를 활성화합니다.
- `Wextra`: 일부 추가적인 경고 메시지를 활성화합니다.
- `Werror`: 모든 경고를 오류로 처리하여 컴파일을 중단하도록 합니다.
- `O2`: 최적화 레벨 2를 활성화합니다.
  - 최적화는 최대 4까지 있습니다. 내부적으로 하는 최적화는 사실 아직 잘 모릅니다. 일단 귀찮은 저의 편의성을 위해 무지성 2단계로 두겠습니다.
- `std`=c99: C99 표준을 준수하도록 합니다.
  - C99은 C 언어 버전을 말합니다.
- `pedantic`: 엄격한 표준 준수를 요구합니다.

## C 언어로 작성한 코드를 컴파일해서 얻은 실행파일을 `.gitignore`하는 방법은 무엇인가?

```txt title=".gitignore"
# Ignore compiled executables
*.exe
*.out
*.o
```

참고로 실행파일 바이너리를 직접 커밋하고 공유하면 위험합니다. 컴파일된 파일이라고 생각하고 공유받은 파일을 실행하면 해커가 원하는 코드를 실행하게 만들지도 모릅니다. 팀원 A, B가 있는데 B는 A 시스템을 해킹하기 위해 파일을 먼저 편집하고 PR을 올리는데 소스코드로 생성한 바이너리와 다른 실행파일을 올릴지도 모릅니다. PR은 소스코드를 보고 보안취약점을 유발할지 읽고 생각하고 대응할 수 있습니다. 하지만 바이너리 확인은 느리고 비효율적인 과정입니다. 각자 로컬에서 컴파일하고 실행하게 만드는 것이 더 적절합니다.

## `int main(int argc, char *argv[])`은 무엇을 의미하는가?

```c title="test.c"
#include <stdio.h>

int main(int argc, char *argv[]) {
    printf("프로그램 이름: %s\n", argv[0]);

    for(int i = 1; i < argc; i++) {
        printf("인자 %d: %s\n", i, argv[i]);
    }

    return 0;
}
```

매개변수를 활용하는 프로그램입니다.

```sh
./test foo bar baz
# 프로그램 이름: ./test
# 인자 1: foo
# 인자 2: bar
# 인자 3: baz
```

실행파일 이름과 실행파일이 처리할 인자를 받습니다.

## 표준 입출력에 숫자를 받는 방법은 무엇인가?

```c
scanf("%d %d %d", &num1, &num2, &num3);
```

3개를 숫자로 표준입출력으로 받을 수 있습니다.

### `scanf` 검증 방법은 무엇인가?

```c
scanf("%d %d %d", &num1, &num2, &num3);
```

위에서는 숫자를 받는다고 명시했습니다. 하지만 문자를 입력하면 어떻게 되는가? 하나는 문자 즉 `char` 타입과 다른 하나는 문자열타입(`char[]`) 2가지 경우가 있고 이 경우로부터 방어해야 합니다.

## C 언어로 난수를 생성하는 방법은 무엇인가?

[[C 언어] 무작위로 숫자 생성하기 (난수 생성기)](https://ludeno-studying.tistory.com/39)

```c
#include <stdio.h>
#include <stdlib.h> //srand, rand를 사용하기 위한 헤더파일
#include <time.h> // time을 사용하기 위한 헤더파일
 
int main() {
  srand(time(NULL)); // 난수 초기화
  for (int i = 0; i< 10; i++) {
    int random = rand() % 5; // 0 ~ 4 사이의 숫자를 뽑아서 random 변수에 저장
    printf("%d ", random); // 출력
  }
  return 0;
}
```

위는 편한 방법입니다. 하지만 틀린 방법입니다. 난수는 표준 라이브러리에서 제공해줘도 직접 구현해야 합니다.

### 난수 생성기 직접 구현하기

<iframe className="codepen" src="https://www.youtube.com/embed/DSBDQhsOmhs" title="(양심고백) 랜덤 가챠는 실은 랜덤이 아님" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

컴퓨터는 못하는 것이 있습니다. 그것은 무작위적인 것입니다. 규모가 큰 프로그램에서 프로그램의 동작이 무작위 적인 것은 인간이 무작위적으로 행동하게 명령했기 때문입니다.

```c
#include <stdio.h>

int main() {
  // ????
  return 0;
}
```

## 버퍼에 문자열이 들어가면 버퍼를 비워줘야 하는 이유는 무엇인가?

버퍼란 무엇인가? 버퍼를 비우는 방법은 무엇인가? 그리고 버퍼를 수동으로 비우도록 설계한 이유는 무엇인가?

## 함수의 선언, 함수의 구현, 함수 프로토타입은 모두 어떻게 다른가?

## fgets란 무엇인가?

```c
#include <stdio.h>

#define MAX_INPUT_LENGTH 100

int main() {
  // 생략...
  /* 표준입력을 문자열로 받음 */
  char input[MAX_INPUT_LENGTH];
  if (fgets(input, sizeof(input), stdin) == NULL) {
    printf("입력 오류\n");
    return 1;
  }

  return 0;
}
```

