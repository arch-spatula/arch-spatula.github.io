---
sidebar_position: 17
description: '기타'
tags: ['기타', '자료구조', '문제유형']
---

# 그냥 이상했던 문제들

## Node.js로 못 푼 문제

### Shares

```py
while True:
    try:
        n, s = map(int,input().split())
        print(int(s//(n+1)))
    except EOFError:
        break
```

### Julka

```py
T = int(input())
a = int(input())

print((T+a)//2)
print((T-a)//2)
```

## 임시 보관할 SQL

### 조건에 맞는 회원수 구하기

[조건에 맞는 회원수 구하기](https://school.programmers.co.kr/learn/courses/30/lessons/131535)

```sql
-- 코드를 입력하세요
SELECT count(USER_ID) as USERS FROM USER_INFO WHERE AGE BETWEEN 20 and 29 AND YEAR(JOINED) = 2021
```

`YEAR(JOINED) = 2021`이 연도를 선택합니다.

오늘도 SQL의 세계는 경이롭습니다.

### 어린 동물 찾기

[어린 동물 찾기](https://school.programmers.co.kr/learn/courses/30/lessons/59037)

```sql
-- 코드를 입력하세요
SELECT ANIMAL_ID, NAME FROM ANIMAL_INS WHERE INTAKE_CONDITION != "Aged" ORDER BY ANIMAL_ID
```

### 여러 기준으로 정렬하기

[여러 기준으로 정렬하기](https://school.programmers.co.kr/learn/courses/30/lessons/59404)

```sql
SELECT ANIMAL_ID, NAME, DATETIME FROM ANIMAL_INS ORDER BY NAME, DATETIME desc
```

<!--

자료구조 개념 이해하기 ‘힙과 힙 정렬 알고리즘’

https://yozm.wishket.com/magazine/detail/2312/

2024 카카오 겨울 인턴십 코딩테스트 문제해설

https://tech.kakao.com/2023/12/27/2024-coding-test-winter-internship/

알아두면 유용한 정렬 알고리즘과 시간 복잡도 분석

https://yozm.wishket.com/magazine/detail/2266/
 -->
