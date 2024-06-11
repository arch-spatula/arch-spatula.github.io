---
sidebar_position: 1
description: "C 언어 줍줍"
tags: ["C 언어", "줍줍"]
toc_max_heading_level: 6
---

# C 언어 시작하기

## C 언어를 공부해야 하는 이유

<!-- NOTE: 하드웨어를 이해하기 좋은 언어입니다.  -->
개인적인 경험으로 CS 지식을 학습할 목적으로 배워두면 좋은 언어라고 봅니다. 하이레벨 언어가 대신해주는 추상화의 계층이 많이 풀려있기 때문입니다. 한계층만 더 내려가면 어셈블리입니다. 아키텍쳐에 무관한 아니 무관하고자 했던 최초의 언어입니다. 어셈블리 언어는 필연적으로 CPU 아키텍쳐에 종속적일 수 밖에없습니다. C 언어는 이 아키텍쳐 무관함을 도전한 하이레벨 언어입니다. 업무 때문에 아니면 부트캠프나 대학교를 다시면서는 분명 로우레벨에 가깝다는 생각이 들 것입니다. 절대로 C 언어는 하이레벨 언어입니다.

근본적으로 모든 소프트웨어는 하드웨어에 종속되어 있습니다. 클라우드 컴퓨터로 가상화를 해도 결국 원격으로 컴퓨터를 대여하고 대여한 가상화된 원격 컴퓨터도 어떤 하드웨어에서 실행합니다. 컴퓨터 하드웨어 동작의 이해부터 갖고 있어야지 컴퓨터를 이해할 수 있습니다. 그리고 이해를 기반으로 운영체제를 이해고 성능 최적화를 고민하기 시작할 수 있습니다.

<!-- NOTE: 다른 언어를 이해하기 좋은 언어입니다.  -->
> c is the mother of all languages 

이런 문구를 본적이 있을 것입니다. C 언어는 다른 언어를 만들기 위해 호스트 언어로 가장 많이 활용하고 있는 언어입니다. C 언어를 활용해서 python도 만들었습니다. C++로 만든 언어도 많지만 C++은 결국 C 언어로 만들어졌습니다. 언어를 공부할 때 언어로 컴퓨터를 제어할 때 제공하는 추상화를 모두 제거하고 사용하게 됩니다. 언어를 만들 때 컴파일러,  인터프리터 등 이해할 수 있습니다. 2024년 현재 추세를 보면 그냥 GC 없는 언어로 GC 있는 언어를 만드는 추세같습니다.

<!-- NOTE: 운영체제 커널 작성의 고전입니다.  -->
C 언어는 운영체제를 이해하기 좋은 언어입니다. 많은 운영체제는 C 언어로 만들어졌습니다. 운영체제 프로그래밍을 경험하면서 컴퓨터가 효과적으로 작업관리하는 방식을 배울 수 있습니다. 운영체제 실습 프로그래밍은 C 언어와 어쎔블리로 많이 작성합니다. 2024년에 rust 처럼 GC 없는 언어로 커널을 작성한다고 이야기는 많습니다. 문제는 말만 많고 실천이 거의 없습니다. 그래서 지금까지 그리고 앞으로도 계속 C 언어로 커널을 작성할 것입니다. 그러니 걱정할 필요 없습니다.

정보처리기사를 공부하기 전에 이해하면 아주 좋습니다.

하드웨어를 이해하기 좋은 언어라 전기공학 전공한 사람들이 임베디드 분야에 많이 활용하고 있습니다.

C 언어는 어쎔블리를 추상화한 언어입니다. 직업적으로 하이레벨 언어를 작성하던 사람이라도 C 언어를 이해하면 컴퓨터 과학 지식을 쉽게 얻을 수 있습니다.

## C 언어에 대해서

<iframe className="codepen" src="https://www.youtube.com/embed/U3aXWizDbQ4" title="C in 100 Seconds" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

컴퓨터(computer)의 C가 아니라 Algol, B, C의 C로 3세대 언어입니다. 놀랍게도 C 언어를 배우면서 알게 되는 것과 먼저 알아야 하는 것과 배우고 난 뒤에 알게 되는 것 각각 다릅니다. 하지만 먼저 알아야 하는 것은 컴퓨터 구조론 정도에 해당합니다. 그것도 아주 심오한 정도는 아닙니다. ~~저의 뇌피셜입니다.~~

C 언어랑 파이썬이랑 공통점이 있습니다. 프로그래밍 언어 자체는 쉬습니다. 하지만 어려운 것은 프로그래밍이라는 것을 알려줍니다. 의외로 문법자체는 단순한데 사람들이 복잡하게 응용하는 예시를 많이 볼 수 있는 언어입니다.

C 언어는 얼마나 깊게 알아야 하는가? 저는 임베디드 개발자가 아닌 개발자만큼 알라고 주장합니다.

C 언어는 교육목적으로 상당히 좋고 임베디드 분야에 상당히 좋다고 봅니다.

<iframe className="codepen" src="https://www.youtube.com/embed/9kjZ049F_-A" title="C/C++ 계열 전문 개발자가 되려는 분들을 위한 널널하지 않은 커리큘럼" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

- 1단계
  - 컴퓨터 과학 개론
  - 기본 자료구조 알고리즘(DSA)
  - SSL
  - 네트워크 심화
- 2단계
  - [독하게 시작하는 C 프로그래밍](https://www.yes24.com/Product/Goods/18732021)
  - [독하게 되새기는 C 프로그래밍](https://www.inflearn.com/course/%EB%8F%85%ED%95%98%EA%B2%8C-%EB%90%98%EC%83%88%EA%B8%B0%EB%8A%94-c%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D#curriculum)
  - 선형 자료구조
  - 비선형 자료구조
    - B-Tree & B-Plus-Tree
    - 무게, 방향 그래프 & 우선순위 큐 -> 다익스트라 알고리즘 구현
  - C++로 구현하는 OOP
    - 아래 2개 구현 경험 없으면 C++ 사용 금지
      - 주소록 프로젝트 B-Plus-Tree로 10만개단위
      - 자료구조 알고리즘 다익스트라 검색 없이 C 언어로 구현
  - 미니 프로젝트
- 3단계
  - 고성능 주소록(1억개 단위)
  - HTML, JSON parser
  - 인터프린터 컴파일러
    - go 언어 금지
      - [밑바닥부터 만드는 인터프리터 in Go](https://www.yes24.com/Product/Goods/103157156), [밑바닥부터 만드는 컴파일러 in Go](https://www.yes24.com/Product/Goods/103099817) 도서 2권을 권장하는데 go 언어로 작성되어 있습니다.
      - go 언어는 C 언어랑 상당히 닮았습니다. 하지만 다릅니다. 나중에 취업할 때 면접관들에게 불이익 있습니다. 하라는 Java나 C++은 안한다고 싫어합니다.
    - [Crafting Interpreters 로버트 나이스트롬의 인터프리터 in Java, C](https://www.yes24.com/Product/Goods/123859288)
- 4단계
  - 시스템 프로그래밍
  - 소켓 프로그래밍
  - 운영체제론 & 데이터 베이스(SQLD 자격증 포함)
  - 네트워크 플레이가능한 온라인 게임 만들기
  - MMORPG 만들기 최소 700억명 이상
    - 부하생성툴 알아서 만들기
  - RDBMS 직접만들기
  - 보안 소프트웨어
- 5단계
  - 디자인 패턴
  - 프로젝트 리팩토링

위는 전공자들이 경험하는 것들입니다. 저것들 다 해도 실력 없는 하찮은 개발자 취급받습니다.

## 활용 자료

- [x] [C를 배우기 전에 반드시 알아야 할 것들](https://www.yes24.com/Product/Goods/17967251)
  - 바로 C 언어 책을 읽기 전에 읽어 봤습니다. 상당히 쉬운 책입니다.
  - 저는 이미 회사를 다니고 있을 때 읽기 시작한 책입니다.
  - 하드웨어부터 어셈블리까지 다양한 측면에서 하이레벨로 알주는 책이라 좋습니다.
  - 특히 장점은 책이 작고 가볍습니다. 전공책은 책상에 독서대를 두고 읽어야 합니다. 하지만 이 책은 잠들기 전에 읽기 위해 손에 들만한 크기와 무게를 갖고 있습니다.
- [x] [독하게 시작하는 C 프로그래밍](https://www.yes24.com/Product/Goods/18732021)
  - 위 책을 읽고 다음으로 읽기 시작한 책입니다. 순수 C 언어를 다루고 window 환경에서 다룹니다.
  - 저는 솔루션 파일 생기는게 싫어서 neovim 설정하고 GCC로 예제 작성하는데 큰 문제는 없었습니다.
  - 이미 다른 언어를 배운 입장에서 이 책읽는 것은 비교적 쉬운 편이었습니다. 하지만 초심자에게는 정말 큰 도전이 될 것입니다.
    - 이미 익숙한 언어가 1개 있다면 포인터부터 읽을 것을 권장합니다.
- [ ] [알고리듬으로 생각하기](https://www.yes24.com/Product/Goods/124867842)
  - C 언어를 배우고난 뒤에 바로 해볼 것은 백준 문제 풀기입니다. 
    - 꼭 백준일 필요는 없습니다. 다른 플랫폼을 활용해도 괜찮습니다.
    - 백준을 해도 좋고 작게 본인의 일상에 도움되는 CLI를 만들어봐도 좋습니다.
  - 막연하게 문제를 풀기보단 지식을 습득하고 지식을 적용하는 것이 효과적일 것입니다.
    -  이때 본인만의 루틴이 있으면 좋습니다.
  - 참고로 여기서부터는 제가 아직 책을 못 읽어봤습니다.
- [ ] [컴퓨터 시스템 딥 다이브](https://www.yes24.com/Product/Goods/124301248)
  - 운영체제 관련된 도서를 조금더 핸즈온으로 읽어볼 만한 책처럼 보입니다.
- [ ] [Crafting Interpreters 로버트 나이스트롬의 인터프리터 in Java, C](https://www.yes24.com/Product/Goods/123859288)
  - 나중에 Java 배우고 읽어도 됩니다.
- [ ] [컴파일러 개발자가 들려주는 C 이야기](https://www.yes24.com/Product/Goods/105982099)
  - C 언어 표준을 알려주는 책입니다.
- [ ] [깐깐하게 배우는 C](https://www.yes24.com/Product/Goods/58215872)
  - C 언어를 수단으로 방어적 프로그래밍 기법을 배울 수 있는 도서입니다.
- [ ] [Effective C](https://www.yes24.com/Product/Goods/119423118)
  - 익히 알고 있는 이펙티브 시리즈는 아닌 것 같습니다. 보통 이팩티브, 인액션 문구가 들어간 도서는 실무랑 관련성이 높은 책들입니다.
- [ ] [전문가를 위한 C](https://www.yes24.com/Product/Goods/114250605)
  - 상당히 훌륭한 책이라고 합니다.

<!-- TODO: 순수 C 언어로 해볼 프로젝트-->
<!-- CLI 표준 입출력 파일 입출력(메모리 버퍼 비우는 유틸 함수, 보안상 안전한 표준입력 방법) -->
<!-- CLI 게임으로 블랙잭 만들어보기 -->
<!-- 랜던함수 직접 구현하기-->
<!-- 해쉬 함수 만들기 -->
<!-- 주소록 만들기 -->
<!-- 비밀번호 관리자 만들기 -->
<!-- 전용 라이브러리 만들기 -->
<!-- 단위 테스트 만들기 -->
<!-- 이미지처리 만들기 -->
<!-- GC 만들기(힙 구현, 해시, 참조 카운터 구현) -->
<!-- 컴파일러, 인터프리터 만들기 -->
<!-- DB 만들기(B-tree, B+tree 구현) -->
<!-- 방화벽 -->
<!-- 네트워크 프로토콜 직접 구현(Https, http, tcp, udp) -->
<!-- 네트워크 프레임충돌 방지 직접 구현 -->
<!-- 운영체제 만들기 -->

<!-- TODO: C 언어로 해볼 수 있는 실수로 문서 분리 -->
## C 언어 줍줍

<iframe className="codepen" src="https://www.youtube.com/embed/yOyaJXpAYZQ" title="Comparing C to machine language" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

<!-- https://www.youtube.com/watch?v=yOyaJXpAYZQ -->

<!-- https://www.youtube.com/@BenEater -->

## printf 사용 방법 & wchar_t 타입 사용 방법

```c
#include <stdio.h>
#include <wchar.h>

int main(void)
{
	char ch = 'A';
	wchar_t wch = L'A';
	short sData = 10;
	int nData = 10;
	long lData = 10L;
	long int lnData = 10L;
	long long int llnData = 10LL;

	printf("ch: %c, wch: %lc, sData: %d, lData: %ld, llnData: %lld\n", ch, wch, sData, lData, llnData);

	unsigned char byNewData = 'A';
	unsigned short sNewData = 65535U;
	unsigned int uNewData = 1U;
	unsigned long int ulData = 1UL;
	unsigned long long int ullNewData = 1ULL;

	printf("byNewData: %c, sNewData: %u, uNewData: %u, ulData: %lu, ullNewData: %llu\n", byNewData, sNewData, uNewData, ulData, ullNewData);

	return 0;

}
```

## C 언어 메모리 사이즈를 알아내는 방법

```c
#include <malloc/malloc.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
  char *pszData = NULL;

  pszData = (char *)malloc(sizeof(char) * 6);
  if (pszData == NULL) {
    perror("Failed to allocate memory");
    return EXIT_FAILURE;
  }

  printf("Allocated memory size: %zu\n", malloc_size(pszData));
  printf("Usable memory size: %zu\n", malloc_good_size(sizeof(char) * 6));

  free(pszData);
  return EXIT_SUCCESS;
}
```

메모리 사이즈를 알려준다고 했는데 C 언어에서 약간의 저혼자 경험하는 난제를 발견했네요. 

`malloc_good_size`라는 것도 존재해서 신기합니다.

하지만 정확히 메모리 사이즈를 알아낼 수 없었습니다.

C 언어의 난제 문서를 따로 만들어야겠습니다.

<!--## C 언어로 방화벽은 구현은 어떻게 할 수 있는가?-->
