---
sidebar_position: 1
description: 'C 언어 줍줍'
tags: ['C 언어', '줍줍']
---

# C 언어

컴퓨터(computer)의 C가 아니라 ABC의 C로 3세대 언어입니다. 놀랍게도 C언어를 배우면서 알게 되는 것과 먼저 알아야 하는 것과 배우고 난 뒤에 알게 되는 것 각각 다릅니다. 하지만 먼저 알아야 하는 것은 컴퓨터 구조론 정도에 해당합니다. 그것도 아주 심오한 정도는 아닙니다. ~~저의 뇌피셜입니다.~~ 

C 언어랑 파이썬이랑 공통점이 있습니다. 프로그래밍 언어 자체는 쉬습니다. 하지만 어려운 것은 프로그래밍이라는 것을 알려줍니다.

<iframe class="codepen" src="https://www.youtube.com/embed/yOyaJXpAYZQ" title="Comparing C to machine language" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

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
