---
sidebar_position: 2
description: "C 언어 줍줍"
tags: ["C 언어", "줍줍"]
toc_max_heading_level: 6
---

# C 언어 CLI 만들기

<iframe className="codepen" src="https://www.youtube.com/embed/87SH2Cn0s9A" title="C Programming Full Course for free 🕹️" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

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

```c
/* 표준입력을 받음 */
int playerFrist, playerSecond, playerThird;
int isNum = scanf("%d %d %d", &playerFrist, &playerSecond, &playerThird);

/* 타입확인 */
if (isNum != 3) {
  printf("숫자로 입력해주세요\n");
  /* 버퍼 비우기 */
  while (getchar() != '\n') {
    continue;
  }
  continue;
}
```

`scanf`는 타입이 맞는 수량만큼 반환합니다. 만약에 3개의 실수형이 아니면 작업을 중단하도록 만들면 됩니다.

### `scanf`의 동작 원리는 무엇인가?

<!-- TODO: 명세 및 동작 방식 정리하기 -->

[문자열(string) - 버퍼에 관한 이해 - 모두의 코드](https://modoocode.com/32)

https://www.ibm.com/docs/ko/i/7.3?topic=functions-scanf-read-data

https://learn.microsoft.com/ko-kr/cpp/c-runtime-library/scanf-width-specification?view=msvc-170

https://ko.wikipedia.org/wiki/Scanf 

https://bigpel66.oopy.io/library/c/chewing-c/6 

## 표준입력에 문자열이 들어가면 버퍼를 비워줘야 하는 이유는 무엇인가?

### 버퍼란 무엇인가?

버퍼란 메모리상 임시 저장공간있습니다. 디스크에 저장하기 전에 잠시 보관하고 덮어쓸 때 활용합니다. 위키피디아에서는 "완충기억기"라고 합니다. 한곳에서 다른 곳으로 저장 전에 보관하는 공간입니다. 버퍼를 채우는 것을 버퍼링(buffering)이라고 합니다. 버퍼는 큐(Queue) 구조로 선입선출입니다.[^1]

C 언어로 CLI 인자를 입력할 때는 라인 버퍼링에 해당합니다. 대부분의 컴퓨터 내부구현은 완전버퍼링으로 구현되어 있습니다.

버퍼를 활용하는 이유는 메모리와 디스크에 읽기 쓰기 시간의 차이 때문에 활용합니다. 메모리는 읽고 쓰는 시간이 디스크에 비해 빠릅니다. 메모리에 있는 데이터를 직접 디스크에 바로 저장하면 메모리는 이미 작업을 끝내도 디스크는 아직도 작업 중일 것입니다. 메모리는 더많은 동작을 할 수 있는데 디스크 IO 시간에 동기적으로 동작해서 비효율적입니다. 메모리가 메모리 버퍼 공간을 따로 만들고 디스크가 버퍼를 읽기한다면 저장 중 디스크 IO를 비동기적으로 효율적이게 작업을 수행할 수 있습니다.

버퍼 메모리는 근본적으로 하드웨어 개념인데 소프트웨어에서 논리적으로 자주 활용하는 개념입니다. 버퍼 메모리는 모니터, 키보드, 디스크 각각 입출력 장치마다 위치하고 있습니다. 이렇게 위치한 버퍼들을 보고 로컬 버퍼라고 부릅니다.[^3]

메모리 버퍼는 물리적으로 존재하는 개념이지만 소프트웨어 공학적으로 논리적으로 존재하는 개념도 있습니다. Batch 서비스의 경우 정산하기 전까지 보관하고 백업에 저장하는 과정처럼 논리적 버퍼도 존재합니다. 나중에 수행할 작업을 위해 담아두는 공간이라는 개념으로 이해할 수 있습니다.

<iframe className="codepen" src="https://www.youtube.com/embed/mpIFag8zSWo" title="How input buffering works" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

[msbasic - 강의에서 사용한 레포](https://github.com/beneater/msbasic)

1. Unbuffered input

- 지금은 터미널이 문자를 받아 처리하고 프로그램을 실행하게 만들고 싶습니다.
- 버퍼가 없이 터미널에 입력하면 모든 문자를 처리할 수 없습니다.
- 터미널 설정을 바꿔서 0.02초마다 문자를 받도록 수정하니까 문자를 타이핑하듯이 천천히 입력합니다. 그리고 실행은 성공적입니다.
- 버퍼가 없다면 이런 불편이 생깁니다.
- CPU가 문자를 받을 때마다 처리하는데 CPU가 받고 처리고 다시 받고 처리하기에는 시간이 부족해서 일부 문자를 잃게 됩니다. 이럴 때 입력이 스트림이고 이 데이터의 흐름에서 일부를 잃어서 유실(流失)되었다는 표현도 적절합니다.

2. Interrupts

- 지금처럼 처리를 느리게 하기에는 비효율적입니다. 이펙트브한 해결책 중하나는 CPU 인터럽트입니다.
- 문자를 받을 때마다 인터럽트를 발생시키도록 하는 것입니다.
- 입력레지스터에 문자를 받으면 인터럽트가 발생하도록 로직을 설정할 수 있습니다. 입력 레지스터를 받으면 처리하고 다시 메모리에 쓰기를 하도록 만들면 됩니다.

3. Circular buffer

- 문자열을 받으면 메모리 어디에 잠시 저장을 해둬야 합니다. 추적만 가능하면 어디든 크게 상관없습니다.
- 키보드 입력을 받자마자 배열로 취급해서 글자마다 현재 메모리 주소에서 1개식 더해가는 전략을 취할 수 있습니다. 이것은 쓰기 포인터가 됩니다.
- 사용자가 이제 받은 글자를 활용하고 싶으면 읽기 포인터로 일게 됩니다.
- 읽기 포인터와 쓰기 포인터의 주소가 같아지면 더이상 읽을 것을 없다고 간주할 수 있습니다.
- 이렇게 되면 사용자의 입력과 CPU의 작업의 동기화가 풀리게 됩니다.
- 이런 경우를 보고 원형 버퍼라고 부릅니다. 주소가 부족하면 주소를 오버플로우하게 됩니다.
- 주의할 점들이 있습니다. 쓰기 속도가 너무 빨라서 쓰기 포인터가 한바퀴 돌아 읽기 포인터를 접근할 경우 데이터가 유실될 것이라고 알 수 있습니다. 또 데이터가 너무 크면 부족한 메모리를 처리하기 전에 덮어쓰고 유실되는 문제가 발생할 것입니다.

#### 문해력 유치원생 미만을 위함 그림 설명

그림을 보면서 자세히 이해해봅시다.

![](/img/doc/diy-cs/Clang/01-init.png)

원형 버퍼 메모리가 초기화 되면 다음과 같습니다. 읽기 포인터가 있고 쓰기포인터가 있고 같은 주소를 바라보면서 시작합니다.

![](/img/doc/diy-cs/Clang/02-write.png)

유저가 키보드에 `A`를 입력하면 쓰기 포인터는 해당 데이터를 받아 메모리에 저장합니다.

![](/img/doc/diy-cs/Clang/03-mov-ptr.png)

쓰기 포인터는 다음 포인터 주소로 가산합니다. ~~데이터를 받으면 포인터를 1 가산하는지 아니면 데이터를 저장하고 가산하는지는 모릅니다.~~

![](/img/doc/diy-cs/Clang/04-write-end.png)

유저가 `ASDF`를 입력하면 쓰기포인터는 글자 4개만큼 4번 이동할 것입니다. 입력이 여기서 정지되었습니다.

![](/img/doc/diy-cs/Clang/05-read-end.png)

이제 읽기를 접근하고 처리하는데 쓰기포인터와 주소가 같아졌습니다. 여기서 더 처리할 작업이 없어집니다.

![](/img/doc/diy-cs/Clang/06-write-overflow.png)

원형 버퍼 메모리라 메모리 주소 끝에 도달하면 overflow하고 가장 작은 주소로 돌아갑니다.

여기까지는 문제없을 일반적인 동작들입니다. 하지만 한계들이 있습니다.

![](/img/doc/diy-cs/Clang/07-start.png)

`ASDFGHJ`를 입력하는 상황입니다. 지금은 `A`까지 입력했습니다.

![](/img/doc/diy-cs/Clang/08-read-not-mov.png)

하지만 입력을 원형으로 입력하는데 원의 둘레(?)가 너무 짧아 이렇게 `A`가 유실될 수 있습니다. 것처럼 버퍼 메모리의 공간이 부족하면 결국에는 유실됩니다. 이것을 보고 버퍼 오버플로우라고 부릅니다.

![](/img/doc/diy-cs/Clang/09-write-start.png)

다른 문제는 읽기 속도 문제도 있습니다. 읽기 속도가 너무 느려 그사이 한바퀴를 돌아오면 한바퀴만큼의 데이터가 유실됩니다. 지금은 `A`를 읽고 있습니다.

![](/img/doc/diy-cs/Clang/10-slow-read.png)

여기서 `ASDFGHJK`인데 여기서 `L` 접근하면 쓰기 포인터와 읽기 포인터의 주소가 같아집니다. 한바퀴 둘레만큼의 데이터가 유실되는 문제가 발생합니다.

이러한 현상들을 보고 overrun이라고 합니다.

![](/img/doc/diy-cs/Clang/11-slow-write.png)

다른 문제도 있습니다. Buffer underrun입니다. 이번에는 쓰기 속도가 너무 느린 경우입니다. 지금은 이렇게 시작할 수 있습니다.

![](/img/doc/diy-cs/Clang/12-slow-write.png)

지금 읽기 포인터가 쓰기 포인터를 도달해서 처리를 할 것입니다. 읽기 포인터가 쓰기 포인터를 따라 다니는데 쓰기가 너무 느려서 버벅이는 것처럼 보이는 경우를 의미합니다.

![](/img/doc/diy-cs/Clang/13-slow-write.png)

버퍼는 어느정도 채워지고 읽으면서 비워져야 하는데 쓰기 속도가 너무 느려서 얼마 안 채워지고 계속 읽는 상황입니다. 버퍼를 효율적으로 활용을 못하고 있는 것입니다. 버퍼의 목적이 처리의 비동기로 CPU의 효율적인 테스크 관리입니다. 하지만 처리가 비효율적이게 된 것입니다. 다시 옛날처럼 동기적으로 동작하는 문제가 발생합니다.[^2]

<!--4. Setting up variables-->
<!--5. Buffer subroutines-->
<!--6. Interrupt handler-->
<!--7. New input routines-->
<!--8. Testing it out-->
<!--9. Fixing a bug-->
<!--10. Success!-->

[메모리 버퍼 - 나무위키](https://namu.wiki/w/%EB%B2%84%ED%8D%BC#s-4)

### 버퍼를 비우는 방법은 무엇인가?

```c
#include <stdio.h>

int main() {
  scanf("%d", &num1);

  /* input 버퍼 메모리를 지우는 방법 */
  while (getchar() != '\n') {
    continue;
  }
  return 0;
}
```

위는 제가 검색해서 찾은 방법입니다.

[How can I clear an input buffer in C?](https://stackoverflow.com/questions/7898215/how-can-i-clear-an-input-buffer-in-c)

```c
int c;
while ((c = getchar()) != '\n' && c != EOF) { }
```

위 방식을 더 권장합니다. `getchar` 더 보관가능하다고 합니다.

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
  char ch1, ch2;
  printf("Input the first character:"); // Line 1
  scanf("%c", &ch1); // az
  printf("Input the second character:"); // Line 2
  ch2 = getchar();

  printf("ch1=%c, ASCII code = %d\n", ch1, ch1);
  printf("ch2=%c, ASCII code = %d\n", ch2, ch2);

  system("PAUSE");
  return 0;

  // 출력
  /*Input the first character:az*/
  /*Input the second character:ch1=a, ASCII code = 97*/
  /*ch2=z, ASCII code = 122*/
  /*sh: PAUSE: command not found*/
}
```

하나의 버퍼에 `az`를 입력했는데 버퍼가 연속하는 공간입니다. `getchar`가 버퍼에서 첫번째 `a` 이후 다음에 붙어있는 `z`를 접근한 것입니다. 특이하게 읽으면서 삭제를 하고 있습니다.

### 버퍼를 수동으로 비우도록 설계한 이유는 무엇인가?

아마 반대 질문도 있습니다. 왜 버퍼를 자동으로 비워줘야 하는가? 버퍼를 채운다는 의미는 무엇인가? 이런 질문부터해야 합니다. 지금 이런 질문을 하는 것은 그져 C 언어를 사용하다가 발생한 현상입니다. 표준입력을 숫자로 받기로 했는데 사용자가 문자열을 입력해서 발생한 현상이고 프로그래머가 의식적으로 `getchar`을 호출한다는 것이 부조리하다는 생각을 갖을 것입니다. 여기서 부조리는 프로그래머 본인의 부족한 식견이라는 것부터 파악해야 합니다. 보이는 것이 별로 없기 때문에 타당함을 그져 모르는 것입니다.

> 프로그래머를 믿어라. (Trust the programmer)

이 철학을 실천하는 언어입니다. 이 철학을 부정하는 견문을 갖고 있고 부조리하다고 생각하는 프로그래머는 다른 직업이 더 적합할 것입니다. 다른 사람 고생그만 시키고 퇴사하기 바랍니다.

버퍼를 접근해서 어떻게 처리할지도 프로그래머의 재량으로 두는 언어이기 때문에 수동으로 버퍼를 비워줘야 합니다.

직접 명시한 부분을 본적이 없어서 알 수 없습니다.

<!-- TODO: 아래 문단 확인 검증하기-->

<!--버퍼를 채운다는 의미부터 다루겠습니다. 사실 컴퓨터 시스템 모든 것이 다 정확히 동기적으로 동작하는 것은 아닙니다. 컴퓨터마다 가용할 수 있는 전산자원의 규모(CPU 코어수)는 다릅니다. 옛날에 싱글 코어일 때 마우스 움직임을 동기적으로 처리하면 어떻게 되었을까? 마우스를 움직이는 동안 컴퓨터는 다른 작업을 수행할 수 없을 것입니다. 버퍼는 비동기적으로 idel 상태일 때 수행할 작업대상을 잠시 저장하는 공간입니다. 키보드 입력도 표준 입력 버퍼에 저장하고 입력 버퍼에서 읽어서 처리합니다. 비우는 것과 채우는 것은 읽기라는 행위와 채우기라는 행위를 위해 설계된 것입니다. 하지만 버퍼를 자동으로 비운다는 것은 애초에 설계가 필요한 대상도 아니고 설계의도도 아닙니다. 수동으로 비우도록 의도해서 설계한적은 없습니다.-->

## C 언어로 난수를 생성하는 방법은 무엇인가?

[How to generate a random int in C?](https://stackoverflow.com/questions/822323/how-to-generate-a-random-int-in-c)

[C 언어 무작위로 숫자 생성하기 (난수 생성기)](https://ludeno-studying.tistory.com/39)

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

[Rand Implementation](https://stackoverflow.com/questions/4768180/rand-implementation)

C 언어의 난수 생성함수는 LCG([Linear congruential generator](https://en.wikipedia.org/wiki/Linear_congruential_generator))의 단순한 버전입니다.

```c
#include <stdio.h>
#include <time.h>

static unsigned long int next = 1;

int rand(void) { // RAND_MAX assumed to be 32767
  next = next * 1103515245 + 12345;
  return (unsigned int)(next / 65536) % 32768;
}

void srand(unsigned int seed) { next = seed; }

int main(void) {
	srand(time(NULL));
  for (int i = 1; i < 10; i++) {
    printf("%d\n", rand());
  }
  return 0;
}
```

위 코드를 컴파일하고 실행하면 매번 새로운 랜덤값을 생성한다는 것을 알수 있습니다. 놀랍게도 그렇게 어려운 코드는 아닌 것 같습니다.

## 함수의 선언, 함수의 구현, 함수 프로토타입은 모두 어떻게 다른가?

함수의 선언은 포괄적입니다. 함수 프로토타입 선언과 함수 정의 즉 함수 구현에 대한 선언 모두 의미합니다.

함수 프로토타입은 함수에 대한 시그니쳐 정의입니다. `main` 이전에서 정의할 수 있습니다. 함수 정의를 하단에 하고 `main`에 호출하면 컴파일러는 느슨하게 플래그를 안 넣었다면 모릅니다. 컴파일이 되고 이상한 동작을 할 가능성이 높습니다. 프로토타입을 정의하면 함수를 호출할 때 무엇이 문제인지 알 수 있습니다. 무슨 시그니쳐가 안 맞아서 컴파일타임에 에러를 돌려줄 수 있습니다. C 컴파일러는 매개변수 확인을 안하기 때문에 그냥 컴파일 할 수 있습니다.

함수를 프로토타입을 먼저 선언하면 프로토타입 시그니쳐에 맞는 함수를 구현하는 정의를 선언하고 사용하면 됩니다. 일반적으로 좋은 관례에 해당합니다.

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int pickRandNum(int *first, int second, int third); // 함수 프로토타입 선언

int main(void) { // int argc, char *argv[]
  srand(time(NULL));
  int first = 0;
  int second = 0;
  int third = 0;

  // 함수 호출
  first = pickRandNum(&first, second, third);
  second = pickRandNum(&second, first, third);
  third = pickRandNum(&third, second, first);

  return 0;
}

int pickRandNum(int *first, int second, int third) { // 함수 구현 선언
  while (*first == 0 || *first == second || *first == third) {
    *first = rand() % 10;
  }
  return *first;
}
```

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

[^1]: [버퍼 (컴퓨터 과학) - 위키피디아](<https://ko.wikipedia.org/wiki/%EB%B2%84%ED%8D%BC_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99)>)
[^2]: [버퍼 underrun - ㅈ(식)무위키](https://namu.wiki/w/%EB%B2%84%ED%8D%BC%20%EC%96%B8%EB%8D%94%EB%9F%B0)
[^3]: [컴퓨터 구조와 I/O](https://jongmin92.github.io/2019/02/18/Programming/computer-structure/)
