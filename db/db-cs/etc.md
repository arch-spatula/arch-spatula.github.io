---
sidebar_position: 3
tags: ['SQL', 'etc']
draft: true
---

# DB etc

데이터 베이스와 관련된 이런 저런 작은 정보 줍줍을 추가합니다.

## DB 고르기

<iframe class="codepen" src="https://www.youtube.com/embed/kkeFE6iRfMM" title="How To Choose The Right Database?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

올바른 데이터베이스는 기본 중 기본입니다. 이상하게 고르면 비즈니스에 치명적인 문제를 야기할 것입니다.

먼저 다른 DB가 필요한가? 레이턴시가 극단적으로 느린가? 모든 것을 디스크로 저장하는가?

설정으로 먼저 해결이 가능한가? 데이터베이스 마이그레이션이 더 해야할 일이 많습니다.

## isNull

`ISNULL('칼럼이름', '칼럼이 NULL일경우 대체할 값')` SQL의 null 병합연산자입니다. 아마 자바스크립트가 SQL의 `ISNULL`함수를 참고한 것 같습니다.

```SQL
SELECT ISNULL(DEPT, '미배정') AS DPET
FROM employee
```

## CROSS JOIN 

행렬곱과 유사합니다. 더 정확히는 카테시안 곱입니다. 가끔 사용하는 JOIN 전략입니다.
