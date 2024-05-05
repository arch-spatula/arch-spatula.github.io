---
sidebar_position: 1
description: "C 언어 줍줍"
tags: ["C 언어", "줍줍"]
toc_max_heading_level: 6
---

# C 언어 시작하기

<iframe className="codepen" src="https://www.youtube.com/embed/U3aXWizDbQ4" title="C in 100 Seconds" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

컴퓨터(computer)의 C가 아니라 Algol, B, C의 C로 3세대 언어입니다. 놀랍게도 C 언어를 배우면서 알게 되는 것과 먼저 알아야 하는 것과 배우고 난 뒤에 알게 되는 것 각각 다릅니다. 하지만 먼저 알아야 하는 것은 컴퓨터 구조론 정도에 해당합니다. 그것도 아주 심오한 정도는 아닙니다. ~~저의 뇌피셜입니다.~~

C 언어랑 파이썬이랑 공통점이 있습니다. 프로그래밍 언어 자체는 쉬습니다. 하지만 어려운 것은 프로그래밍이라는 것을 알려줍니다.

C 언어는 얼마나 깊게 알아야 하는가? 임베디드 개발자가 아닌 개발자만큼 알라고 저는 주장합니다.

<iframe className="codepen" src="https://www.youtube.com/embed/9kjZ049F_-A" title="C/C++ 계열 전문 개발자가 되려는 분들을 위한 널널하지 않은 커리큘럼" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

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
