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

## Constraints

https://youtu.be/KBDSJU3cGkc?t=3045

https://github.com/bootdotdev/fcc-learn-sql-assets/tree/main/course/3-constraints/exercises

null 값은 중요합니다. 만약에 유저이름 셀이 비어있는 문자열("")이면 유저이름이 존재한다는 의미입니다. 빈 문자열, false보단 null을 활용해서 비어있음을 알려주는 것이 더 직관적입니다.

Constraints는 직역하면 제약입니다. 처리가 불가능하게 프로그래머가 막을 수 있습니다.

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    country_code TEXT NOT NULL,
    username TEXT UNIQUE,
    password TEXT NOT NULL,
    is_admin BOOLEAN
);
```

PRIMARY KEY 제약은 row가 고유합니다. 테이블마다 1개만 사용할 수 있습니다. 보통 id에 많이 사용합니다. 고유하게 해주고 또 Not Null입니다.

UNIQUE는 고유자하지만 null이 될 수 있습니다.

이메일이 고유하다고 이메일을 프라이머리 키로 사용하는 짓거리를 하지말도록 합니다. 일단 id가 더 직관적입니다. 또 비즈니스 로직은 변화합니다. 만약에 이메일 중복을 허용하면 변형이 어렵습니다.

```sql
INSERT into users (
    id,
    name,
    age,
    username,
    password,
    is_admin
) values (
    1,
    "Jerry",
    25,
    "jerrysmith",
    "mypasswordis1234",
    true
);
```

삽입할 때는 매개변수의 순서에 주의해주시기 바랍니다.

프라이머리 키가 있으면 이제는 Foreign는 sql이 관계를 갖고 있다고 표현할 수 있는 수단입니다. Foreign 키를 Foreign라고 굳지 제약을 설정해줄 필요는 없습니다. 참조에 불과하기 때문에 그렇습니다.

지정하는 문법은 소개하겠습니다. 이유는 참조하고 있음을 보장해야 하기 때문입니다. 관계가 존재하면 처리하고 없으면 차단하도록 설정할 수 있습니다.

```sql
CREATE TABLE departments (
    id INTEGER PRIMARY KEY,
    department_name TEXT NOT NULL
);

CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    department_id INTEGER,
    CONSTRAINT fk_departments   -- CONSTRAINT 이름
    FOREIGN KEY (department_id) -- department_id INTEGER의 department_id매개변수를 고릅니다.
    REFERENCES departments(id)  -- departments 테이블의 id를 참조하도록 합니다.
);
```

스키마란 DB베이스에서 테이블관의 관계와 테이블의 이름과 컬럼별 자료형을 보고 포괄적으로 지칭하는 용어입니다.

세상에 완벽한 스키마는 없습니다. 데이터베이스 스키마는 최선을 고르도록 합니다. 최대한 단순하게 유지하면서 관계를 적절히 표현하도록 합니다. 처음부터 복잡성을 넣으면 나중에 풀어서 없애야할 때 고생하게 됩니다.

```sql
CREATE TABLE transactions (
    id INTEGER PRIMARY KEY,
    sender_id INTEGER,
    recipient_id INTEGER,
    memo TEXT NOT NULL,
    amount INTEGER NOT NULL,
    balance INTEGER NOT NULL
);
```

이렇게 거래 내역을 저장하는 테이블을 정의하고 스키마를 정의할 수 있습니다.

금융은 정수단위로 저장할 가능성이 더 높습니다. 5달러는 500개 페니를 저장하기 위해서 real 대신에 integer를 사용합니다. 메모리 공간의 유한함을 CS 지식으로 갖고 있으명 알 수 있습니다.

row를 보고 레코드라고 부릅니다.

관계형 DB는 이제 알 수 있습니다. 그렇다면 NoSQL은 어떻게 생겼는가?

일반적으로 NoSQL은 nested된 데이터로 표현합니다. 큼직한 json이라고 생각할 수 있습니다.

```json
{
  "users": [
    {
      "id": 0,
      "name": "Elon",
      "courses": [
        {
          "name": "Biology",
          "id": 0
        },
        {
          "name": "Biology",
          "id": 0
        }
      ]
    }
  ]
}
```

이런 관계를 갖고 있습니다. 이렇게 포함관계를 갖고 있는데 단점이 있습니다. 동일한 데이터가 복사됩니다.

NoSQL은 관계형 데이터 베이스에서 many to many 관계를 표현하는 방식을 표현하기 어렵습니다.

## CRUD

https://github.com/bootdotdev/fcc-learn-sql-assets/tree/main/course/4-crud/exercises

CRUD는 데이터와 데이터 베이스 관련된 것의 핵심입니다. 일반적인 REST API는 대응관계가 잘 됩니다.

http는 post - create, get - read, put - update, delete - delete로 대응됩니다.

sql도 대응됩니다. create - create, read - select, update - update, delete - delete

```sql
INSERT INTO employees(id, name, title)
VALUES (1, 'Allan', 'Engineer');
```

인서트문은 이렇게 생겼습니다.

```sql
INSERT INTO 테이블 이름(컬럼이름1, 컬럼이름2, 컬럼이름3)
VALUES (필드1, 필드2, 필드3);
```

이런 형식입니다.

데이터가 웹앱에 일반적으로 흐르는 방식입니다. 프론트엔드, 백엔드 웹서버, 데이터베이스가 있습니다. 프론트엔드는 백엔드에게 http로 주로 통신합니다. 백엔드 서버는 데이터 베이스를 sql로 통신합니다.

사용자가 회원가입 요청을 post로 서버에게 요청을 보내면 서버는 해당 정보를 sql로 실행해서 기록합니다. 이 처리가 성공하면 클라이언트는 성공응답 200을 돌려 받습니다.

프론트엔드랑 db랑 직접 통신하는 경우는 로컬 전용 어플리케이션에서 주로 합니다. 하지만 클라우드를 수단으로 서로 통신해야 하면 프론트엔드는 서버랑 통신해야 합니다.

auto increment는 자동 증감을 명시하지 않고 1개 증가를 처리할 수 있습니다. 하지만 이렇게 사용하면 db를 한번 읽어야 합니다. 하지만 그 뒤부터 서버가 구동되는 동안 증가시켜줄 필요는 없습니다. 재구동으로 메모리가 비워지면 다시 db를 읽어야 합니다. uuid도 자주 볼 수 있습니다. uuid는 삽입 전에 읽을 필요 없어서 좋습니다.

어떤 데이터 베이스는 auto increment는 명시해야 합니다. 하지만 sqlite는 명시할 필요 없습니다.

```sql
INSERT INTO users (name, age, country_code, username, password, is_admin)
VALUES (Lance, 20, US, LanChr, b00tdevisbest, false)
```

sqlite는 id를 생략하면 위처럼 자동으로 id를 increment 해줄 것입니다.

```go
sqlQuery := fmt.Sprintf(`
INSERT INTO users(name, age, country_code)
VALUES ('%s', %v, %s);
`, user.Name, user.Age, user.CountryCode)
```

위처럼 작성하는 경우는 거의 없습니다. 다른 프레임워크 orm을 통해서 처리할 것입니다. sql injection 공격으로부터 방어해줄 수 있습니다.

sql문은 동적으로 프로그래밍 언어에서 생성되는 경우가 대부분입니다. code gen을 해주는 프레임워크 및 라이브러리를 활용하게 될 것입니다.

```sql
SELECT count(*) from employees;
```

row 전체의 개수를 구하는 명령입니다. sqlite에서 지원합니다.

클라이언트는 get 서버는 db에게 select합니다. 그리고 db에서 가져오면 json으로 응답합니다. 유일한 방법은 아니고 자주 볼 수 있는 방법입니다.

where 절은 자주 볼 것입니다. where 절 없이 db를 조회하는 경우는 거의 없습니다.

```sql
SELECT name FROM users WHERE power_level >= 9000;
```

이렇게 생겼습니다.

```sql
SELECT 컬럼명 FROM 테이블명 WHERE 선택 조건;
```

위처럼 where를 사용하는 것이 일반적입니다. 안 사용하면 클라이언트, 서버가 터질 수 있습니다.

```sql
SELECT username FROM users WHERE is_admin=true;
```

위는 is_admin이 true 경우만 선택합니다.

is null과 is not null 문법으로 선택 혹은 무시하게 만들 수 있습니다.

```sql
SELECT name FROM users WHERE first_name IS NULL; -- 존재하지 않는 경우

SELECT name FROM users WHERE first_name IS NOT NULL; -- 존재하는 경우
```

위처럼 입력이 없는 경우를 무시 혹은 확인하게 만들 수 있습니다.

```sql
DELETE from employees
    WHERE id = 251;
```

위에서 where 절이 없으면 테이블이 비워집니다. where 절로 필터를 반드시 해주시기 바랍니다.

노하우가 하나 있다면 delete 명령 전에 select로 where 의도가 맞는지 확인하고 select를 delete로 바꿉니다.

삭제를 할 때는 또 조심할 점은 프라이머리키를 통해서 삭제하도록 합니다. 동시에 여러개 삭제할 필요가 없으면 프라이머리키를 접근해서 삭제합니다. 의도하지 않게 중복삭제가 발생할 수 있습니다.

```sql
DELETE from employees
    WHERE name="jake";
```

가장 지혜로운 개발자는 프로덕션 앱이 분명 버그로 가득하다는 것을 알고 있습니다. 장애까지 1커밋 남은 상황일 수 있습니다. 장애가 발생해도 db를 메모리에 저장하지 말고 사용자 db를 저장하고 있는 것이 지혜로울 것입니다.

이번에는 백업의 동작방식입니다.

제일 일반적인 방식입니다. 매일 스냅샷을 찍습니다. 밤 12시 정각에 정검시간이 있을 수 있습니다. 이때 백업 처리를 진행합니다. 파일 시스템로 디스크를 제공해주는 클라우드 서비스에 쑤셔 넣을 것입니다. 만약에 잘못되면 하루전으로 돌릴 수 있습니다. 하루 단위 스탭샷을 보관하고 월 단위로 보관할 것입니다. 월을 넘기면 삭제합니다.

단점은 스냅샷 이후로 데이터를 모두 잃습니다. 보완은 시간단위입니다. 이렇게 되면 비용이 커집니다. 하지만 작은 회사는 이렇게 해도 괜찮습니다.

조금이라도 데이터를 잃으면 안되는 경우면 다른 방법이 있습니다. DB에 변화가 발생하면 append only log에 추가되도록 합니다. 해당 log를 기록합니다. 실제 db에서 삭제하면 삭제가 된 것이지만 append only log는 삭제가 되었다는 기록을 남길 수 있습니다.

대부분의 작은 회사는 스냅샷으로 충분합니다.

항상 프로덕션 환경을 위해 백업 db를 구축하도록 합니다. 하루 단위로 데이터를 잃지만 모든 데이터를 잃는 것보다 좋습니다.

가끔은 soft delete 전략을 갖고 있습니다. db에 진짜로 delete 처리를 하지 않고 delete log를 기록하고 나중에 진짜로 삭제하고 다시 쿼리할 때는 안보이게 합니다. 문제는 복잡성입니다. 필터링이 필요합니다. 또 프라이버시 문제도 있습니다. 유저가 탈퇴했지만 유저의 데이터는 남기 쉽습니다. 또 문제는 쿼리가 느리게 만들어 줄 것입니다. 조회해야 하는 량이 많아지기 때문입니다.

```sql
UPDATE employees
SET job_title = 'Backend Engineer', salary = 150000
WHERE id = 251;
```

위와 같이 처리하면 갱신됩니다. 구체적으로 1개의 row를 갱신합니다.

ORM입니다. ORM은 DB 제어를 더 편하게 해주는 라이브러리입니다. 인메모리 객체, 구조, 레코드를 데이터베이스 스키마에 맞춰서 제어할 수 있게 해줍니다.

go는 구조체가 있습니다.

```go
type User struct {
    ID int
    Name string
    IsAdmin bool
}

user := User{
    ID: 10,
    Name: "Lane",
    IsAdmin: false,
}

// generates a SQL statement and runs it,
// creating a new record in the users table
db.Create(user)
```

모든 것은 sql문으로 직접 작성할 필요가 없어서 제어하기 좋습니다. ORM은 직접 sql작성도 쉽다는 조건 하에 ORM을 통해 작성할 것을 권장합니다.

나중에는 아주 복잡한 쿼리도 작서해야 합니다. ORM은 제어를 지불해서 낮은 복잡성을 얻는 경우가 많습니다.

코드의 작성량이 작아서 아주 좋은 장점이 있습니다. 하지만 절대 제어가 늘지 않습니다. 또 가끔 디버깅도 더 어려워질 수 있습니다. ORM이 복잡해지면 쿼리 성능도 나빠질 수 있습니다.

하지만 대부분의 경우 ORM을 사용하는 것이 좋습니다.

https://youtu.be/KBDSJU3cGkc?t=7214

## Ch 5. Basic Queries

https://youtu.be/KBDSJU3cGkc?t=7217

SQL에 AS 키워드로 별칭(alias)을 지정할 수 있습니다.

```sql
SELECT employee_id AS id, employee_name AS name
FROM employees;
```

위처럼 작성하면 그냥 id, name이라고 작성할 수 있고 또 DB에서 가져온 테이블의 컬럼 이름도 바뀝니다.

SQL도 언어입니다. 대부분의 프로그래밍 언어처럼 함수를 사용할 수 있습니다.

sqlite는 삼항연산자처럼 IIF 함수를 사용할 수 있습니다.

```sql
IIF(carA > carB, "Car a is bigger", "Car b is bigger")
```

참이면 앞의 매개변수 거짓이면 뒤의 매개변수를 반환하게 만들 수 있습니다.

Between 절도 유용합니다.

```sql
SELECT employee_name, salary
FROM employees
WHERE salary BETWEEN 30000 and 60000;
```

위처럼 범위를 표현할 수 있습니다.

```sql
SELECT product_name, quantity
FROM products
WHERE quantity NOT BETWEEN 20 and 100;
```

NOT을 앞에 붙이면 역이라 제외할 범위를 설정하게 됩니다.

DISTINCT는 쿼리의 중복 레코드를 제외합니다. 예를 들어 국가코드를 쿼리하면 분명 겹치는 국가가 많을 것인데 중복을 제거합니다.

```sql
SELECT DISTINCT previous_company
    FROM employees;
```

논리연산자들도 제공합니다. AND, OR 키워드 그대로 사용합니다. WHERE절에 AND, OR에 여러 로직을 조합할 때 활용할 수 있습니다.

```sql
SELECT product_name, quantity, shipment_status
    FROM products
    WHERE shipment_status = 'pending'
    AND quantity BETWEEN 0 and 10;
```

대문자 AND가 2개의 조건을 조합합니다. 참고로 sql은 동등비교 연산자가 `=`입니다. 일반적인 프로그래밍 언어들은 할당이지만 sql은 아닙니다.

OR는 예상한 것처럼 조건 둘 중 하나라도 참이면 모두 쿼리가 됩니다. 또 소괄호(`()`)로 순서를 제어할 수 있습니다.

또 IN 절도 존재합니다. 유용한데 직관적이지 않습니다.

```sql
SELECT product_name, shipment_status
    FROM products
    WHERE shipment_status IN ('shipped', 'preparing', 'out of stock');
```

```sql
SELECT product_name, shipment_status
    FROM products
    WHERE shipment_status = 'shipped'
        OR shipment_status = 'preparing'
        OR shipment_status = 'out of stock';
```

같은 동작이지만 위 SQL이 더 간소합니다. 컬럼에서 인자에 해당하는 값 중 하나라도 해당하면 쿼리할 수 있게 됩니다.

LIKE 연산자도 있습니다. 퍼지 매칭, 와일드카드 매칭입니다. 데이터 베이스에서 부분적으로 일치하는 것을 찾습니다.

```sql
SELECT * FROM products
WHERE product_name LIKE 'banana%';
```

banana%: banana로 시작하면 선택합니다.
%banana: banana로 끝나면 선택합니다.
%banana%: banana문자가 존재하면 선택합니다.

다른 연산자들이 있습니다. 언더스코어(`_`)도 존재합니다. 정확히 그문자의 개수를 맞출 수 있습니다.

```sql
SELECT * FROM products
    WHERE product_name LIKE '_oot';
```

boot
root
foot

```sql
SELECT * FROM products
    WHERE product_name LIKE '__oot';
```

shoot
groot

즉 문자열의 일치하는 부분만 조회합니다.

https://youtu.be/KBDSJU3cGkc?t=8681

https://www.youtube.com/post/Ugkx2gW-KZJWRZhRmv9U31BPPX5OajCLGJt1

## Ch 6. Structuring

LIMIT 키워드는 자주 사용하는 키워드입니다. 어플리케이션과 데이터 베이스 퀄리 모두 사용합니다. 프로덕션 데이터 베이스는 1000줄 단위입니다.

LIMIT 키워드는 1000줄 쿼리가 나올 거 같을 때 사용합니다.

```sql
SELECT * FROM products
    WHERE product_name LIKE '%berry%'
    LIMIT 50;
```

처음 50개의 row만 가져오게 됩니다.

데이터 베이스가 있고 모든 레코드를 봐야할 필요는 없습니다. 연결하고 10 ~ 20개 정도 가볍게 쿼리합니다.

LIMIT은 최대만 정합니다. 그 이하로 반환하는 경우도 있습니다.

쿼리를 한번에 너무 많이 하면 처리시간이 길어집니다. 서버가 가져온 데이터가 많고 거기에 가하는 변형이 많기 때문에 주의해야 합니다. 성능부하를 줄이기 위해 사용합니다.

```sql
SELECT name, price, quantity FROM products
    ORDER BY price;
```

ORDER BY는 어센딩 순서 즉 작은 것에서 큰 순서로 나열합니다.

```sql
SELECT name, price, quantity FROM products
    ORDER BY price desc;
```

desc 키워드를 뒤에 붙여서 큰 것에서 작은 순서로 나열합니다.

데이터는 정렬을 먼저하고 그다음에 LIMIT을 걸어야 합니다. 즉 서순이 중요합니다.

```sql
SELECT * FROM transactions
WHERE amount BETWEEN 10 AND 80
ORDER BY amount desc
LIMIT 4;
```

위에서 LIMIT과 ORDER BY 서순을 바꾸면 에러가 발생할 것입니다.

## Ch 7. Aggregations

Aggregations은 큰 데이터를 하나로 합하는 것입니다. 즉 집산입니다.

결과를 미리 처리하고 저장하는 것은 별로 권장하지 않습니다. 원본을 저장하고 필요할 때 집산하는 것이 좋습니다.

```sql
SELECT COUNT(*)
FROM products
WHERE quantity = 0;
```

COUNT 함수가 row의 숫자를 더하기 때문에 이미 집산 함수를 이미 한번 경험해본 것입니다.

row의 수량을 저장하는 것도 전략이지만 나중에 원본을 확인하기 어렵습니다.

최대한 원본에 가깝게 저장하도록 합니다.

```sql
SELECT SUM(salary)
FROM employees;
```

SUM 함수는 해당하는 컬럼의 합산을 구할 수 있습니다.

```sql
SELECT max(price)
FROM products
```

MAX 최댓값을 찾습니다. 직관적입니다.

```sql
SELECT product_name, min(price)
from products;
```

MIN은 MAX의 역입니다. 최솟값을 찾습니다.

```sql
SELECT album_id, count(song_id)
FROM songs
GROUP BY album_id;
```

GROUP BY 절은 집산 기능이 아닙니다. 다른 집산과 유용한 처리할 때 자주 사용합니다. 그래서 맥락에 유용하기 때문에 알려줍니다.

GROUP BY는 여러개의 집산 결과를 만들 때 유용합니다. 위 예시는 album_id를 기준으로 묶어서 각각의 album_id 별로 수록된 노래의 수량을 출력합니다.

```sql
SELECT user_id, sum(amount) AS balance
  FROM transactions
  GROUP BY user_id;
```

`AS balance`로 에일리어싱 처리까지 하면 유용하게 새로운 row를 뽑는 것이 가능합니다.

```sql
select song_name, avg(song_length)
from songs
```

sql은 산술 평균을 구하는 AVG 함수도 지원합니다. 참고로 null은 무시합니다.

```sql
SELECT album_id, count(id) as count
FROM songs
GROUP BY album_id
HAVING count > 5;
```

having 절은 이해하기 어려울 수 있습니다. where절과 비슷합니다. 집산 이후 처리합니다. where은 쿼리하고 다음에 집산을 처리하고 having으로 처리합니다.

필터링하는 기능이라는 것은 동일합니다. having은 where보다 덜 사용합니다.

처음 공부하는 사람들에게 많은 혼란이 발생할 수 있습니다. 그래서 잘 암기하도록 합니다. where은 쿼리 having은 집산입니다.

```sql
select song_name, round(avg(song_length), 1) AS song_int
from songs
```

ROUND는 집산 함수가 아닙니다. 꽤 집산과 같이 자주 사용합니다. 소수점 버리기 할 때 꽤 유용할 것입니다.

## Ch 8. Subqueries

이부분은 복잡합니다. 일반 쿼리는 잘 이해해야 합니다.

```sql
SELECT id, song_name, artist_id
FROM songs
WHERE artist_id IN (
    SELECT id
    FROM artists
    WHERE artist_name LIKE 'Rick%'
);
```

IN 키워드는 이미 사용해봤습니다. IN 키워드 내부에 서브 쿼리를 먼저 실행하고 다음 일반 쿼리를 처리합니다.

```sql
SELECT * from transactions
WHERE user_id = (
  SELECT id
  FROM users
  WHERE name = 'David'
)
```

= 동등 연산자에서도 서브 쿼리를 같이 사용할 수 있습니다. IN 키워드는 서브쿼리에 받드시 필요한 것은 아닙니다. 지금은 예시는 1명 유저를 찾기 때문에 이렇게 작성했습니다.

서브쿼리는 실행하는 동안에만 테이블이 존재합니다. 성능과 대부분 무관합니다. 중첩된 구조로 쿼리할 수 있는 것입니다.

서브 쿼리는 테이블 전체에서 한번 선택을 하고 일반쿼리로 컬럼을 선택하는 방식으로도 작성합니다.

SQL은 프로그래밍 언어입니다. 도메인 구체적인 언어입니다. 데이터 베이스를 위해 사용하는 언어입니다. SQL을 DB 없이 작성하는 것은 가능합니다.

```sql
SELECT 5 + 10 as sum;
```

충격적이게도 15입니다.

```sql
SELECT * FROM users
WHERE age_in_days > (
  SELECT 365 * 40
)
```

이런 응용도 가능합니다. 근무일수로 재직기간을 측정했는데 40년 이상 재직자를 쿼리하는 것입니다.

## Ch 9 . Normalization

정규화입니다. 1대1, 1대다, 다대다 대응을 잘하면 잘 맞아떨어집니다.

1대1 대응은 엔티티가 각각 1개와 1개가 대응합니다. 학생과 수능 성적은 1대1로 대응합니다. 이런 경우면 1대1 대응입니다. 필드를 그냥 추가하고 말아도 괜찮습니다. 하지만 기관에 따라 학생 테이블과 성적 테이블을 분리하는 경우도 있습니다. 운영문제가 있으면 이렇게 해결할 수 있습니다. 프라이머리키를 1대1로 테이블을 대응하게 될 것입니다.

1대다 대응은 트위터에서 유저와 트윗관계입니다. 유저는 1개이지만 트윗은 0개에서 n개입니다. 이럴 때는 트윗테이블에 user_id를 foreign로 설정할 것입니다.

다대다도 존재합니다. 가장 복잡한 관계입니다. 유저와 그룹입니다. 유저는 다양한 그룹에 포함될 수 있고 그룹도 다양한 유저가 있을 수 있습니다. foreign 키로 해결할 수 없습니다. 방법은 join table을 만드는 것입니다. 유저와 그룹의 관계를 보여주기 위해 만듭니다. 이런 이유로 유저그룹이라고 부를 것입니다. 제약도 추가합니다. 중복을 허용하지 않게 만듭니다.

| id  | user_name |
| --- | --------- |
| 1   | lane      |
| 2   | allan     |
| 3   | john      |

| id  | group_name  |
| --- | ----------- |
| 1   | gophers     |
| 2   | pythonistas |

| user_id | group_id |
| ------- | -------- |
| 1       | 1        |
| 1       | 2        |

다대다는 테이블을 하나 만들어서 해결해야 합니다.

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  username TEXT UNIQUE,
  password TEXT NOT NULL,
  is_admin BOOLEAN
);

CREATE TABLE countries(
  id INTEGER PRIMARY KEY,
  country_code: TEXT NOT NULL,
  name: TEXT NOT NULL,
  user_id: INTEGER,
  FOREIGN KEY (user_id)
  REFERENCES users (id)
);
```

테이블 관계는 위와 같아집니다.

다대다는 모델링은 번거롭습니다. joining table은 메타 정보가 없는 테이블을 만듭니다. 다른 엔티티와 엔티티의 관계입니다. 식별자만 담고 메타데이터가 없습니다. 모델링만이 책임이기 때문에 그렇습니다.

```sql
CREATE TABLE product_suppliers (
  product_id INTEGER,
  supplier_id INTEGER,
  UNIQUE(product_id, supplier_id)
);
```

UNIQUE는 중복을 방지하는 제약입니다. 같은 관계를 또 만드는 것이 없습니다.

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  username TEXT UNIQUE,
  password TEXT NOT NULL,
  is_admin BOOLEAN
);

CREATE TABLE countries (
  id INTEGER PRIMARY KEY,
  country_code TEXT,
  name TEXT,
  -- user_id INTEGER,
  FOREIGN KEY (country_code)
  REFERENCES users (id)
);

CREATE TABLE userscountries(
  user_id: INTEGER,
  countries_id: INTEGER,
  UNIQUE(user_id, countries_id)
);
```

대학교에서 컴퓨터과학 수업에서 데이터베이스 정규화 과목도 따로 있습니다. 지루합니다. 하지만 지금은 학술적인 정의도 다룰 것입니다. 하지만 데이터 중복을 낮추고 정합성을 챙기는 전략에 지중하기 바랍니다.

정규화가 잘 되어 있을수록 정합성과 중복이 없습니다. 데이터 관련 버그를 발생시킬 가능성이 줄어듭니다.

정규화는 1차, 2차, 3차, Boyce-Codd 정규화 4가지가 있습니다. 정규화가 아래로 내려갈수록 많아집니다.

정화를 할 때마다 기존의 규칙을 추가해야 합니다. 정규화를 많이 하면 정규화 티어처럼 내려갈 것입니다.

1차 정규화의 규칙입니다.

1. 모든 row는 프라이머리 키를 갖고 있어여 합니다.

- 즉 테이블의 중복이 없습니다.
- id가 고유하기 때문에 모두 중복이 없습니다.

2. 중첩 테이블이 없습니다.

- 프로덕션에서 자주 볼 상황이 없습니다.
- 대부분 데이터베이스들이 차단합니다.

2차 정규화 규칙입니다.

1. 1차 정규화 규칙을 준수합니다.
2. 프라이머리 키에 해당하지 않는 모든 컬럼이 반드시 전체 프라이머리키에 의존해야 합니다.

- 기록한 값 자체적으로 프라이머리 키를 만들 수 없습니다. 하지만 2개의 값을 합쳐서 프라이머리 키를 만들 수 있습니다. 프라이머리키 부분이 아니라 전체로 프라이머리키를 만드는 것입니다.

| 주문번호 (OrderID, 기본 키) | 고객번호 (CustomerID) | 주문일자 (OrderDate) | 제품번호 (ProductID, 외래 키) | 제품명 (ProductName) | 가격 (Price) | 주문수량 (Quantity) |
| --------------------------- | --------------------- | -------------------- | ----------------------------- | -------------------- | ------------ | ------------------- |
| 1                           | A123                  | 2023-09-08           | 101                           | 제품 A               | 10.99        | 3                   |
| 2                           | B456                  | 2023-09-09           | 102                           | 제품 B               | 15.99        | 2                   |
| 3                           | C789                  | 2023-09-10           | 103                           | 제품 C               | 9.99         | 1                   |
| 4                           | A123                  | 2023-09-10           | 104                           | 제품 D               | 12.49        | 5                   |

> 함수종속성에 따라 테이블을 2개로 나눠서 따라 작성하는게 2차 정규화

| 주문번호 (OrderID, 기본 키) | 고객번호 (CustomerID) | 주문일자 (OrderDate) |
| --------------------------- | --------------------- | -------------------- |
| 1                           | A123                  | 2023-09-08           |
| 2                           | B456                  | 2023-09-09           |
| 3                           | C789                  | 2023-09-10           |
| 4                           | A123                  | 2023-09-10           |

| 제품번호 (ProductID, 기본 키) | 제품명 (ProductName) | 가격 (Price) |
| ----------------------------- | -------------------- | ------------ |
| 101                           | 제품 A               | 10.99        |
| 102                           | 제품 B               | 15.99        |
| 103                           | 제품 C               | 9.99         |
| 104                           | 제품 D               | 12.49        |

정규화가 중복을 제거하는 이것이 해당합니다.

3차 정규화입니다.

1. 1차 2차 정규화 규칙을 준수합니다.2
2. 프라이머리 키에 없는 모든 컬럼은 오직 프라이머리키에만 의존합니다.

학술적인의 부분입니다. 2차와 3차의 구분은 실무적으로는 모호합니다.

BC 정규화입니다.

> A colum that is part of the primary key may not be dependent on a colum that is Not part of the primary key

1, 2, 3정규화를 고안한 뒤에 나중에 추가된 개념입니다. 1, 2, 3 정규화를 함에도 불구하고 중복데이터가 들어갈 수 있는 한계가 있습니다.

사람들이 문제된다는 것을 나중에 발견해서 나중에 도입된 것입니다.

프라이머리키로 활용할 수 있는 것이 많을 때 문제가 됩니다.

실무적으로는 학술적 정의에 강박을 갖을 필요는 없습니다. 강박의 방향은 데이터 정합성 즉 데이터 중복을 잘 방지하고 있는지 파악해야 합니다.

미리계산된 값을 저장해야 할 때는 성능 문제 때문입니다. 쿼리가 진짜 느려지고 문제가 될 때부터 대응하기 바랍니다.

데이터 중복은 정부 데이터베이스과 같습니다. 정부 기관마다 각자 다른 데이터베이스를 갖고 있어서 기관마다 신청해야 합니다. 본인 이사가면 법원, 세무청 등... 신고해야 합니다.

이론적으로 정규화 관점에서 학술적으로 1 ~ 여러개 컬럼으로 프라이머리키를 만듭니다. 하지만 sql 데이터 베이스 관점으로는 항상 그렇지 않습니다. 몇개 데이터 베이스는 1개만 허용하거나 어느 데이터베이스는 여러개를 허용하는 경우도 있습니다.

프로덕션에서 id가 없는 경우를 거의 볼일이 없습니다.

join table은 id가 필요없습니다. 오히려 없어야 합니다.

BC 정규화는 자주 언급하지 않습니다.

일반적으로 처음에는 데이터 정합정을 중시합니다. 리팩토링과 중복데이터가 없어서 버그 문제를 방지합니다. 하지만 성능 문제가 발생하면 중복데이터가 만약에 해결한다면 도입을 하기는 하지만 가능한 안 합니다. 캐시 무효화는 어렵습니다.

id는 프라이머리키를 명명하는 국룰입니다. i를 반복문에서 사용하는 것과 비슷한 컨벤션입니다.

데이터 베이스 정규화의 어림잡기 규칙을 내면화하는 것이 가치가 더 큽니다. 물론 이론을 잘 이해는 것도 유용하지만 어림잡기, 간편추론을 우선시해야 합니다.

## Ch 10. Joins

https://youtu.be/KBDSJU3cGkc?t=14145

Joins입니다. 관계형 DB의 강력한 기능입니다. 쿼리를 여러개의 테이블을 동시에 처리하는 것입니다.

모든 row를 찾는 것이 아닙니다. A, B 테이블 2개 동시에 존재하는 것만 찾습니다. 예를들어 어떤 id가 서로 공유하고 있을 것입니다.

```sql
SELECT *
FROM employees
INNER JOIN departments
ON employees.department_id = departments.id;
```

employees라는 테이블에서 departments에서 정규화 관계를 찾는 것입니다.

테이블을 Join하면 모든 컬럼을 합치기 때문에 중복이 발생합니다.

네임 스페이스는 프로퍼티의 속성을 접근하는 것과 같습니다. 테이블에서 `.`으로 프로퍼티를 접근합니다. 다른 프로그래밍 언어에서 자주 볼만한 문법입니다.

테이블은 복수형으로 명명하는 것이 좋은 컨벤션입니다.

```sql
SELECT students.name, classes.name
FROM students
INNER JOIN classes on classes.class_id = students.class_id;
```

SELECT를 네임스페이스로 한 경우입니다.

LEFT JOIN은 왼쪽 테이블의 모든 레코드를 반환하게 만들 수 있습니다. 오른쪽은 왼쪽에 포함된 레코드만 반환하게 됩니다.

테이블 명에 별칭을 지정해서 코드 길이를 줄이는 경우도 있을 것입니다. 쿼리는 여러번 사용하기 때문에 별칭을 너무 많이 사용하지는 말도록 합니다.

```sql
SELECT e.name, d.name
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.id;
```

위는 별칭을 사용한 경우입니다.

```sql
SELECT users.name, sum(transactions.amount) as sum, count(transactions.id) as count
FROM users
LEFT JOIN transactions
ON users.id = transactions.user_id
GROUP BY users.id
ORDER BY sum DESC;
```

이 경우에는 users가 left에 해당하는 테이블이 됩니다. 즉 모든 users를 선택하게 됩니다. transactions는 오른쪽입니다. 부분선택합니다.

Right Join도 존재합니다. 하지만 굳이 사용할 이유가 없습니다. sqlite는 Right JOIN을 사용을 금지합니다. 사실 left join의 순서만 바꾸면됩니다. 이렇게되면 혼선이 덜 발생할 것입니다.

Full JOIN은 두 테이블의 모든 row를 반환합니다. JOIN은 컬럼단위로 동작하지 않습니다. row 단위로 동작합니다.

LEFT JOIN을 할 때 GROUP BY를 안하면 중복이 발생할 수 있습니다. 엄밀하게 중복은 아니라 SELECT로 만든 테이블의 부분이 중복이 발생하는 것입니다.

JOIN도 여러 JOIN으로 조합할 수 있습니다. 데이터를 JOIN할 때마다 쿼리가 느려질 수 있습니다.

```sql
SELECT *
FROM employees
LEFT JOIN departments
ON employees.department_id = departments.id
INNER JOIN regions
ON departments.region_id = regions.id
```

위는 여러개의 JOIN을 처리한 경우입니다.

컬럼 이름이 중복할 때 as 키워드로 별칭지정을 자주합니다.
