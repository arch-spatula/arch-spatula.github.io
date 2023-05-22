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

```py
fruits = ["apple", "banana", "cherry", "kiwi", "mango"]

newlist = [x for x in fruits if "a" in x]

print(newlist)
```

이런 응용도 가능합니다.

[순서쌍의 개수](https://school.programmers.co.kr/learn/courses/30/lessons/120836)문제에서 아래처럼 응용하는 것도 가능합니다.

```py
def solution(n):
    return len([number for number in range(1, n+1) if n%number == 0])
```

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

## 파이썬의 반복문

자바스크립트는 배열 순회를 편안하게 할 수 있었습니다.

```js
const arr = [...Array(3).keys()].forEach((elem, idx) => {
  // 배열의 원소도 인덱스도 쉽게 알아 낼 수 있었습니다.
});
```

하지만 파이썬은 `range(len(list))` 방식을 사용합니다. 물론 간단하 for문의 문법은 간결해서 좋습니다.

```py
#파이썬의 for문
for letter in string:
	if letter in bin: return letter

# 파이썬의 range in len을 사용한 for문
for idx in range(len(alphabet_occurrence_array)):
        if alphabet_occurrence_array[idx] % 2 != 0:
            bin.append(chr(idx + ord('a')))
```

대부분의 경우 코드의 심미적인 부분은 파이썬이 더 좋지만 이런 순회에서는 자바스크립트가 더 좋습니다.

### For Else

```py
input = "abcba"

def is_palindrome(string: str):
    # 문자열을 한글자식 순회합니다.
    for index, letter in enumerate(string):
        # 앞뒤를 비교합니다.
        if string[index] != string[-index-1]: return False
            # 불일치하면 False를 반환값이다.
    else: return True


print(is_palindrome(input))
```

for문 뒤에 `else`를 쓸 수 있습니다. 상당히 달달하네요.

## 문자열 다루기

파이썬에는 다양한 내장함수가 있습니다. `chr`, `ord` 내장함수는 문자열을 아스키 인덱스 혹은 아스키 인덱스를 문자열로 바꿀 수 있게 해줍니다.

```py
chr()  # 아스키 10진수 -> 문자열
ord()  # 문자열 -> 아스키 10진수
```

어느 메서드에 붙어있지 않고 그냥 사용하면 됩니다.

자바스크립트는 프로토타입 기반 언어답게 내장함수보단 내장객체와 메서드로 문제를 해결해야 합니다.

```js
console.log(String.fromCharCode(97), "a".charCodeAt(0));
```

`fromCharCode` 정적 매서드랑 `charCodeAt` 동적 매서드를 암기하고 코딩테스트를 풀도록 합시다.

## 정렬

문법 설탕은 아니지만 정렬 내장함수가 상당히 달달합니다.

```py
arr = [2, 3, 1]
print(sorted(arr)) # [1, 2, 3]
print(sorted(arr, reverse=True)) # [3, 2, 1]
```

`sorted`는 다양한 자료형에 사용할 수 있는 내장함수고 `sort` 메서드도 같이 제공하고 있습니다.

```py
arr = [2, 3, 1]
print(arr.sort()) # [1, 2, 3]
print(arr.sort(reverse=True)) # [3, 2, 1]
```
