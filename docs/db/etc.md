---
sidebar_position: 4
tags: ['SQL', 'NoSQL', 'vs', 'etc']
draft: true
---

# ETC

데이터 베이스와 관련된 이런 저런 작은 정보 줍줍을 추가합니다.

## DB 고르기

<iframe class="codepen" src="https://www.youtube.com/embed/kkeFE6iRfMM" title="How To Choose The Right Database?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

올바른 데이터베이스는 기본 중 기본입니다. 이상하게 고르면 비즈니스에 치명적인 문제를 야기할 것입니다.

먼저 다른 DB가 필요한가? 레이턴시가 극단적으로 느린가? 모든 것을 디스크로 저장하는가?

설정으로 먼저 해결이 가능한가? 데이터베이스 마이그레이션이 더 해야할 일이 많습니다.

## SQL vs NoSQL

### SQL 장점

- 명확하게 정의된 스키마, 데이터 무결성 보장
- 관계는 각 데이터를 중복없이 한번만 저장

### SQL 단점

- 덜 유연함. 데이터 스키마를 사전에 계획하고 알려야 함. (나중에 수정하기 힘듬)
- 관계를 맺고 있어서 조인문이 많은 복잡한 쿼리가 만들어질 수 있음
- 대체로 수직적 확장만 가능함

### NoSQL 장점

- 스키마가 없어서 유연함. 언제든지 저장된 데이터를 조정하고 새로운 필드 추가 가능
- 데이터는 애플리케이션이 필요로 하는 형식으로 저장됨. 데이터 읽어오는 속도 빨라짐
- 수직 및 수평 확장이 가능해서 애플리케이션이 발생시키는 모든 읽기/쓰기 요청 처리 가능

### NoSQL 단점

- 유연성으로 인해 데이터 구조 결정을 미루게 될 수 있음
- 데이터 중복을 계속 업데이트 해야 함
- 데이터가 여러 컬렉션에 중복되어 있기 때문에 수정 시 모든 컬렉션에서 수행해야 함 (SQL에서는 중복 데이터가 없으므로 한번만 수행이 가능)

## SQL For Web Developers - Complete Database Course

https://www.youtube.com/watch?v=KBDSJU3cGkc

개발자의 대부분의 업무는 데이터의 덩어리를 다른 곳으로 옮기는 작업입니다.

SQL을 수단으로 이런 옮기는 작업을 처리합니다.

DB는 규모가 큰 데이터를 저장하게 해주는 소프트웨어에 불과합니다.

SQL로 제어하면 CRUD를 자동화하기 쉽습니다.

https://www.boot.dev/course/bc0dc34b-025a-4d97-b7a0-382aa21533aa/995c212c-1f2c-44b6-9cf8-a1ed78ce4841/9dd84ab9-bf44-49fc-a2b3-d215cf6e81f1

```sql
SELECT * FROM users;
```

테이블을 선택하고 테이블에 속한 전체를 검색합니다. SELECT는 Read에 해당합니다.

SQL은 대소문자 구분을 하지 않습니다. 하지만 컨벤션은 키워드는 모두 대문자처리합니다.

`*`을 보고 와일드 카드라고 합니다. 여기서만 와일드카드라고 부르지 않고 프로그래밍 일반적의미에서 와일드카드라고 부릅니다.

```sql
SELECT name, balance FROM users;
```

지금 강의는 sqlite입니다. sql별로 작은 차이(방언)가 있습니다. 하지만 하나를 잘 사용할 줄 알면 다른 거 금방 배웁니다.

postgresql, mysql, sqlite, sqlserve, oracle

mongodb, redis, elastic, firebase, dynamo db

SQL의 장점은 SQL끼리 비슷합니다. NoSQL의 공통점은 일반적인 SQL과 다릅니다.

SQL은 일반적인 목적을 갖지만 원하면 특수목적을 갖게 만들 수 있습니다.

sqlite는 특수목적을 갖고 있는 앱에 같이 임베드할 목적입니다.

NoSQL은 특수목적을 갖고 만들어진 경우가 많습니다. redis는 빠르게 접근하기 위해, elastic은 집산과 검색을 위해 사용합니다. mongodb는 예외적으로 일반적인 상황에 적절합니다.

sql은 어느 데이터베이스인데 프로그래밍언어로 제어가 가능합니다.

NoSQL은 서로 유사한 점이 정말 별로 없습니다. 문서 기반은 mongoDB, firebase는 비슷합니다. kv도 다릅니다.

SQL은 테이블을 가정합니다. NoSQL은 테이블을 가정하지 않습니다.

SQLite는 임베디드 유스케이스 많이 활용합니다. 엣지 서버에 DB가 작게 필요하면 꽤 유용합니다. PostgreSQL은 자체 서버처럼 생각하면 됩니다. 거대한 크기를 처리하기 좋습니다.

```sql
CREATE TABLE users (id INTEGER, name TEXT, age INTEGER); -- 테이블 생성
INSERT into users (id, name, age) values (1, 'John Doe', 21); -- 레코드 추가
INSERT into users (id, name, age) values (2, 'Montgomery Burns', 33);
SELECT * from users;
```

```sql
CREATE TABLE users (id INTEGER, name TEXT, age INTEGER);
INSERT into users (id, name, age) values (1, 'John Doe', 21);
INSERT into users (id, name, age) values (2, 1, 33);
SELECT * from users;
```

sqlite는 동적타입 언어랑 유사하게 TEXT인데 INTEGER를 넣어도 정상동작합니다.

https://youtu.be/KBDSJU3cGkc?t=1350

## Ch 2. Tables

https://www.youtube.com/watch?v=KBDSJU3cGkc&t=1330s

컬럼과 필드를 혼용해서 표현하는 경우가 많습니다. SQL에서는 컬럼이 더 정확한 표현이고 필드는 프로그래밍 언어차원에서 의미합니다.

```sql
CREATE TABLE people(
    id INTEGER,
    handle TEXT,
    name TEXT,
    age INTEGER,
    balance INTEGER,
    is_admin BOOLEAN
);
```

엔티티당 테이블이 있을 것입니다. 테이블이 여러개일 것입니다.

```sql
CREATE TABLE transactions(
  id INTEGER,
  recipient_id INTEGER,
  sender_id INTEGER,
  note TEXT,
  amount INTEGER
);
```

프로덕션 배포 혹은 토이 프로젝트 진행할 때는 간단하지만 테이블 문을 변경하는 것은 실제로는 어렵습니다.

```sql
ALTER TABLE employees
RENAME TO contractors;
```

테이블 이름을 수정하는 방법입니다.

```sql
ALTER TABLE contractors
RENAME COLUMN salary TO invoice;
```

컬럼 이름을 수정하는 방법입니다.

```sql
ALTER TABLE contractors
ADD COLUMN job_title TEXT;
```

컬럼을 추가하는 방법입니다.

```sql
ALTER TABLE contractors
DROP COLUMN is_manager;
```

역으로 삭제하는 방법입니다.

아래부분이 무엇을 하는지 설명합니다.

참고로 user라고 테이블을 명명하는 것은 일반적입니다.

```sql
ALTER TABLE people RENAME TO users;

ALTER TABLE users RENAME COLUMN handle TO username;

ALTER TABLE users ADD COLUMN password TEXT;
```

이런식으로 작성해서 테이블의 이름, 컬럼을 수정하고 password를 추가했습니다.

handle은 sns 성격이 강할 때 명명합니다. 그런 경우가 아니면 평소에 username으로 명명합니다.

---

좋은 데이터베이스 마이그레이션은 유닛테스트와 비슷합니다.

테이블에 컬럼을 추가하는 행위를 보고 마이그레이션이라고 합니다. 일반적으로 컬럼을 추가하는 행위는 비교적 안전합니다. 현재 코드는 무시할 가능성이 높습니다. 하지만 반대로 컬럼을 삭제하는 활동은 위험합니다.

추가(Add), 삭제(Delete), 갱신(Update) 3가지 경우가 있습니다.

Add 마이그레이션 방법입니다. 추가하고 코드를 수정하면 됩니다.

Delete 마이그레이션 방법입니다. 먼저 코드를 수정합니다. 코드가 수정되면 데이터 베이스에서 삭제하면 됩니다.

제일 어려운 것은 Update입니다. 테이블 컬럼의 이름을 수정하는 것은 상당히 어렵습니다. 그래서 이런 일이 없도록 처음부터 조심하도록 합니다. 진짜로 안전한 방법이 없습니다. 유일한 선택지는 데이터베이스 테이블이름과 코드베이스를 동시에 갱신해야 합니다. 서버가 장애시간이 반드시 있을 것입니다. 대응하는 방법은 정검시간을 실제로 확보합니다. 단순하지만 유저가 싫어합니다. 다른 방법은 동시 배포입니다. 현재 유저가 별로 없고 다운타임이 조금 있어도 괜찮으면 선택지 중 하나입니다. 마지막으로 가장 로버스트한 방법은 복사입니다. 기존 데이터를 복사하고 배포하는 전략입니다. 마이그레이션 스크립트가 복잡합니다. 에일리어싱이 더 좋은 방법입니다. 이것은 데이터베이스와 사용가능 여부 상황에 따라 다릅니다. 데이터 베이스에 테이블에 두번째이름을 부여하는 방법입니다. 이렇게 하고 완료되면 기존 이름을 Drop합니다. 하지만 처음부터 Update 안하도록 조심합니다.

Up 마이그레이션은 초신 마이그레이션입니다. 앞으로 이동합니다. Down 마이그레이션은 롤백입니다. 긴급상황에 사용하게 됩니다. 대부분 회사는 Down 마이그레이션이 없습니다. Up, Down은 시간과 관련된 문제입니다.

개발 일반적으로 데이터와 가까워질수록 작업을 조심스럽게 처리해야 합니다. 버그는 수정이 비교적 쉽지만 데이터는 수정이 어럽습니다.

좋은 마이그레이션은 이미 존재하는 스키마가 의존하는지 파악하고 처리합니다. 마이그레이션은 데이터베이스에 가한 작은 변화입니다. 마이그레이션을 작성하면 되돌리기 쉽습니다.

롤백하는 스키마를 되돌리는 것만으로 고쳐진 것은 아닙니다. 하지만 되돌린 상태에서 고치기가 더 쉽습니다.

---

- NULL - Null값
- INTEGER - 8 byte 혹은 정수입니다.
- REAL - 실수형입니다.
- TEXT - 문자열입니다.
- BLOB - 이미지, 오디오 같은 멀티미디어에 해당하는 (Binary large object)[https://en.wikipedia.org/wiki/Binary_large_object]입니다.
- 0은 false, 1은 true입니다. false로 작성해도 0으로 기록되고 true로 작성해도 1로 기록됩니다.
- varchar는 문자열 길이를 알면 활용합니다. 문자열 길이를 알면 성능개선에 활용할 수 있습니다. 비밀번호 해쉬, 이메일은 길이가 비교적 한정적입니다.
  - varchar은 캐릭터 가변을 의미합니다.
