---
sidebar_position: 3
tags: ["syntactic sugar", "python"]
---

# 파이썬 문법 줍줍

파이썬의 문법적 설탕을 줍줍합니다. 참고로 원래 문법이 달달한 언어입니다.

## 슬라이싱이 곧 복사

```py
f="abcdefghijklmnopqrstuvwxyz"

print(f[4:15])  # efghijklmno           f[4]부터 f[15] 전까지, 총 15-4=11개!

print(f[:])  # abcdefghijklmnopqrstuvwxyz  처음부터 끝까지
```

슬라이싱 문법부터 달달한데 슬라이싱을 하면서 복사를 합니다.

## in 연산

```py
a = [1, 2, 3, 4, 5]

a.append(99)
a.sort(reverse=True)

print(6 in a)
```

파이썬은 정렬 뒤집기가 직관적입니다. `in`으로 탐색을 간단하게 할 수 있습니다.

```py
a = {
    'name': 'Jake',
    'age' : 30,
}

a['height'] = 'inf'

print('height' in a)
print('inf' in a)
```

딕셔너리 자료형에서는 안타깝게 `key`만 조회할 수 있습니다. `value` 조회는 모르겠습니다.

## 구조분해할당 지원

```py
people = [
    {'name': 'bob', 'age': 20},
    {'name': 'carry', 'age': 38},
    {'name': 'john', 'age': 7},
    {'name': 'smith', 'age': 17},
    {'name': 'ben', 'age': 27},
    {'name': 'bobby', 'age': 57},
    {'name': 'red', 'age': 32},
    {'name': 'queen', 'age': 25}
]

for person in people:
    [name, age] = [person['name'], person['age']]
    print(name, age)
```

`list`를 활용해 구조분해할당을 지원한다는 것을 알 수 있었습니다. 순서가 중요하면 이렇게 접근할 수 있습니다.

## enumerate

```py
people = [
    {'name': 'bob', 'age': 20},
    {'name': 'carry', 'age': 38},
    {'name': 'john', 'age': 7},
    {'name': 'smith', 'age': 17},
    {'name': 'ben', 'age': 27},
    {'name': 'bobby', 'age': 57},
    {'name': 'red', 'age': 32},
    {'name': 'queen', 'age': 25}
]

for idx, person in enumerate(people):
    [name, age] = [person['name'], person['age']]
    print(idx, name, age)
```

`enumerate` 내장함수는 반복문의 인덱스에 활용할 수 있습니다.

## 집합(set)과 집합연산

```py
a = set(['사과','감','수박','참외','딸기'])
b = set(['사과','멜론','청포도','토마토','참외'])

print(a & b)  # 교(and) 집합
print(a | b)  # 합(or)  집합
print(a - b)  # 차(not) 집합
```

집합 자료형만 있는 것이 아니라 수학처럼 계산도 가능합니다.

## 예외처리

```py
people = [
    {'name': 'bob'},
    {'name': 'carry', 'age': 38},
    {'name': 'john', 'age': 7},
    {'name': 'smith', 'age': 17},
    {'name': 'ben', 'age': 27},
    {'name': 'bobby', 'age': 57},
    {'name': 'red', 'age': 32},
    {'name': 'queen', 'age': 25}
]

for person in people:
    try:
        [name, age] = [person['name'], person['age']]
        if age > 20: print(name)
    except:
        print(f'{person} 자료는 에러입니다.')
```

파이썬은 `catch`가 아니라 `except`입니다.

## 문법설탕

그외 다양한 문법적 설탕들이 또 있습니다.

### 삼항연산자

```py
"짝수" if num % 2 == 0 else '홀수'
```

### list comprehension

```py
a_list  = [1, 3, 2, 5, 1, 2]

b_list = [a*2 for a in a_list]

print(b_list)
```

배열 복사입니다.

### map

```py
people = [
    {'name': 'bob', 'age': 20},
    {'name': 'carry', 'age': 38},
    {'name': 'john', 'age': 7},
    {'name': 'smith', 'age': 17},
    {'name': 'ben', 'age': 27},
    {'name': 'bobby', 'age': 57},
    {'name': 'red', 'age': 32},
    {'name': 'queen', 'age': 25}
]

print(list(map(lambda person: ('성인' if person['age'] > 20 else '아동'), people)))
```

자바스크립트 `map`메서드랑 비슷합니다. `map` 내장 함수는 연속된 자료의 원소를 함수에 하나씩 대입합니다.

### 람다함수

```py
print((lambda x, y : x + y )(2, 3))  # 5 람다를 홀로 쓸 때 문법
```

람다의 간단한 구조는 이렇습니다.

### filter

```py
people = [
    {'name': 'bob', 'age': 20},
    {'name': 'carry', 'age': 38},
    {'name': 'john', 'age': 7},
    {'name': 'smith', 'age': 17},
    {'name': 'ben', 'age': 27},
    {'name': 'bobby', 'age': 57},
    {'name': 'red', 'age': 32},
    {'name': 'queen', 'age': 25}
]

results = filter(lambda x: x['age'] > 20, people)
print(list(results))
```

`filter`내장함수도 지원합니다.

## 함수

```py
def fn(*args):
    for arg in args:
        print(f'{arg}이다.')

```

함수에 연속된 자료를 넣을 수 있습니다.

```py
def fn(**kwargs):
    return kwargs

print(fn(name='Jake', age=30))  # {'name': 'Jake', 'age': 30}
```

딕셔너리도 생성할 수 있습니다.
