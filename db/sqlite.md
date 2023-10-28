---
sidebar_position: 3
tags: ['SQL', 'SQLite']
draft: true
---

# SQLite

## SQLite - 1/7. 수업소개

<iframe class="codepen" src="https://www.youtube.com/embed/ePodq8vyucQ" title="SQLite - 1/7. 수업소개" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

구조화된 이라는 뜻을 잘 이해해야 합니다. MS는 크게 2가지 도구가 있습니다. 엑셀과 워드 여기서 엑셀은 구조화된 도구 즉 표는 구조화 된 정보입니다. 일정 기준으로 정렬과 원하는 정보를 보고 계산도 가능합니다.

단순하게 엑셀은 개인이 간단하게 표 작업을 위한 도구입니다. 다양한 종류의 데이터 베이스가 있는 관계형 데이터 베이스입니다. SQL은 엑셀과 동일하게 표입니다.

1970 에드가 프랭크는 SQL을 만들고 다양한 SQL이 위에 만들어집니다. SQL이라는 언어를 반드시 이해해야 합니다. SQL은 관계형 데이터 베이스를 처리하는 언어입니다.

SQL을 실행하면 SQLite가 컴퓨터의 변경을 기록합니다. SQL은 잘하기는 어렵습니다. 하지만 시작은 쉽습니다. 관계형 SQL을 배우면 다른 데이터 베이스도 비슷하게 사용할 수 있습니다.

MySQL도 활용할 수 있게 됩니다.

## SQLite - 2/7. 설치

<iframe class="codepen" src="https://www.youtube.com/embed/3PFrGzv2sEA" title="SQLite - 2/7. 설치" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

SQL들은 보통 서버가 필요한데 SQLite는 서버가 필요 없습니다.

[sqlite 공식 문서](https://www.sqlite.org/index.html)

위 사이트에서 본인 운영체제에 맞게 설치합니다.

SQLite를 GUI에서 제어할 수 있는 도구들이 있습니다.

[sqlitestudio 공식 홈페이지](https://sqlitestudio.pl/)

여기서 실행하면 됩니다.

## SQLite - 3/7. 데이터베이스와 표 생성

<iframe class="codepen" src="https://www.youtube.com/embed/znOGp0jLHXA" title="SQLite - 3/7. 데이터베이스와 표 생성" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

디렉토리 같은 그룹을 보고 데이터 베이스라고 부릅니다. 데이터 베이스는 시스템 전체를 말하는 포괄적인 의미도 하고 서로 연관을 말하는 폴더를 보고고 DB라고 말합니다.

SQLite는 아주 단순합니다.

null

int

real

text

blob

5가지 데이터 타입을 지원합니다.

```sql
CREATE TABLE topics (
    id             INTEGER  PRIMARY KEY,
    title          TEXT     NOT NULL,
    body           TEXT,
    created        DATETIME NOT NULL,
    author_name    TEXT     NOT NULL,
    author_profile TEXT
);
```

SQL은 명령으로 이렇게 작성할 수 있습니다. DDL은 데이터 정의 언어라는 의미입니다. colum을 이렇게 설정할 수 있습니다. GUI를 활용하면 내부적으로 이렇게 만들 수 있습니다.

GUI로 한번 만들어보고 다시 코드를 보니까 생각보다 직관적입니다.

## SQLite - 4/7. INSERT

<iframe class="codepen" src="https://www.youtube.com/embed/HH5HTQ5PXws" title="SQLite - 4/7. INSERT" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

표의 데이터를 추가하는 방법입니다.

SQL은 프로그래밍 명령으로 데이터를 읽고 작성할 수 있습니다.

SQL에서 Q는 질문 퀄리가 가능합니다. 즉 데이터를 찾는 작업을 잘 할 수 있습니다.

```sql
INSERT INTO topics (title, body, created, author_name, author_profile)
VALUES ("SQL server", "SQL server is ...", "2023-06-01", "PB", "JavaScript")
```

SQL 삽입문은 생각보다 단순합니다. 테이블과 Colum을 매개변수처럼 입력하고 VALUES에 값을 대입하면 됩니다.

## SQLite - 5/7. SELECT

<iframe class="codepen" src="https://www.youtube.com/embed/3j1J_y3BqqM" title="SQLite - 5/7. SELECT" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

```sql
SELECT * FROM topics;
```

읽기 시작 작업입니다.

```sql
SELECT * FROM topics WHERE id > 1;
```

```sql
SELECT * FROM topics WHERE id < 3 AND author_name = "Jake";
```

WHERE와 AND를 활용해서 보여주는 조건을 선택할 수 있습니다.

```sql
SELECT title, body FROM topics WHERE id < 3 AND author_name = "Jake";
```

```sql
SELECT title, body FROM topics ORDER BY id DESC;
```

순서를 제어할 수 있습니다.

일부의 데이터만 가져오는 방법이 있습니다.

```sql
SELECT title, body FROM topics ORDER BY id DESC LIMIT 2;
```

`DESC LIMIT (숫자)`는 가져올 개수를 제한합니다.

```sql
SELECT title, body FROM topics ORDER BY id DESC LIMIT 0, 2;
```

범위를 제어할 수 있습니다. 숫자제어만 잘하면 paging 기능도 만들 수 있습니다.

## SQLite - 6/7. Update Delete

<iframe class="codepen" src="https://www.youtube.com/embed/US24t45S2Cc" title="SQLite - 6/7. Update Delete" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

갱신과 삭제입니다.

```sql
UPDATE topics SET title="SQLite3", body="SQLite3 is ..." WHERE id=2;
```

갱신 명령입니다. `WHERE` 지정을 항상 잘해야 합니다. 읽기 생성은 별로 안 위험하지만 갱신, 삭제는 늘 주의를 기울여야 합니다.

```sql
DELETE FROM topics WHERE id=3
```

삭제도 무엇을 할지 잘 지정하는 것 잊지 말아야 합니다.

## SQLite - 7/7. 수업을 마치며

<iframe class="codepen" src="https://www.youtube.com/embed/KYFCQdOsFpc" title="SQLite - 7/7. 수업을 마치며" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

하나의 표로 모든 것을 담으면 곤란합니다. JOIN 명령이 표를 합쳐서 읽습니다.

데이터 모델링으로 효과적으로 표를 합쳐 읽는 법을 학습하도록 합니다.

index로 데이터 입력마다 쉽게 조회할 수 있게 합니다. 성능문제는 indexing을 학습하는 것으로 해결하기 바랍니다.

백업도 잘 공부해야 합니다. 비즈니스에 치명적인 문제로 부터 보호할 수 있어야 합니다.
