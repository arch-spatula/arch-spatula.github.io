---
sidebar_position: 1
description: 'C 언어 줍줍'
tags: ['C 언어', '줍줍']
---

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
