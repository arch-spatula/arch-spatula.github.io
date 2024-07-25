---
sidebar_position: 3
description: "C 언어에 대한 이런 저런 줍줍"
tags: ["C 언어", "줍줍"]
toc_max_heading_level: 6
---

# C 언어에 대한 이런 저런 줍줍

## index 보단 subscript로 생각하기

- C 언어는 포인터 연산이 흔합니다. 바이트 단위로 인덱스를 더해서 메모리상 인접한 정보를 접근하는 방식으로 동작합니다.
- 이런 이유로 C 언어는 `0`인덱스에 첫번째 정보를 갖고 있습니다.
  - 이렇게 했을 때 갖고 있는 단점은 `off by one` 에러를 만들기 쉽습니다.
  - 본질은 바로 정보를 갖고 있어서 `0`부터 있는 것에 불과합니다.
    - 이런 스타일은 다른 게스트 언어에 영향을 많이 주었습니다.
- 이럴 때는 몇번째의 순서로 생각하기보단 메모리 주소상 수학적으로 어디를 구독하고 있는지로 생각해야 합니다.

<iframe className="codepen" src="https://www.youtube.com/embed/0uQ3bkiW5SE" title="Why you're wrong about 0-based indexing" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

```c
array[subscript];
```

```c
*((array)+(subscript));
```

위는 서로 같습니다.

주소에서 이동할 만큼 구독하는 것에 불과합니다.

인덱스랑 구독은 다릅니다.

## 맥크로 문자열의 sizeof를 구할 수 없습니다.

제곧내

상수 문자의 크기를 알아서 구해가지고 얼만큼 반복할지 알아낼 수 있었으면 좋겠습니다.

```c
#define DECK_UNIT 104
#define CARD_SHAPE "SHDC"
#define CARD_VALUE "A23456789TJQK"

// 생략

char deck[DECK_UNIT] = {0};
for (i = 0; i < 4; i++) {
  for (j = 0; j < 13; j++) {
    deckIdx = (i * 13 + j) * 2;
    deck[deckIdx] = CARD_SHAPE[i];
    deck[deckIdx + 1] = CARD_VALUE[j];
  }
}
```

이렇게 코드가 작성되어 있습니다.  여기서 문제는 만약에 트럼프 카드의 값이 13개가 아니라 14개로 늘어나면 보수할 방법이 없습니다. 모양도 마찬가지입니다.

## 덱 셔플 로직

2가지를 해야 합니다. 하나는 범위내 난수를 생성해야 합니다.

다음 작업은 난수로 지정한 부분의 앞은 뒤로 밀어두고 뒤에 있던 부분은 앞에 쓰기를 해야 합니다.

이런 작업을 수행하려면 덱의 사이즈만큼 임시공간을 만들고 제거해야 합니다.

발견한 상당히 특수한 지식이 있습니다.

https://ko.javascript.info/task/shuffle

예전에 위링크를 본적이 있습니다.

```js
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
```

C 언어도 위처럼 구현해볼 수 있지만 문제는 각각의 인덱스에 2개의 자리를 차지한다는 것이 문제입니다. Sort 순회를 직접 구현해서 2단위 인덱스로 이동하게 만들어야 합니다.

다른 방법도 소개되었습니다.

[피셔-예이츠 셔플(Fisher-Yates shuffle) 알고리즘](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)이 있습니다.

```js
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // 무작위 인덱스(0 이상 i 미만)

    // array[i]와 array[j]를 바꿔치기합니다.
    // 아래 답안에선 "구조 분해 할당(destructuring assignment)"이라 불리는 문법을 사용하여
    // 원하는 것을 구현하였는데,
    // 이 문법에 대한 자세한 내용은 이후 챕터에서 다룰 예정입니다.
    // 구조 분해 할당을 사용하지 않고 작성한 코드는 아래와 같습니다.
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}
```

난수호출을 여러번 한다는 점이 불편하지만 제가 원하는 결과는 카드가 섞인다는 점에서는 적절합니다. swap은 덱을 위한 유틸함수로 따로 구현하면 됩니다.

무작위 인덱스를 선택하고 마지막요소와 임의로 뽑은 요소의 자리를 교환하는 알고리즘입니다.

한번만 순회하면 된다는 점에서는 오히려 장점이 됩니다.

```c
  int swapPoint = 0;
  char tempCard[2] = {0};

  srand(time(NULL));
  // INFO: 덱 셔플
  for (i = 51; i >= 0; i--) {
    swapPoint = rand() % 52;

    // 마지막 모양  i * 2  숫자 i * 2 + 1
    // 무작위 모양 swapPoint * 2 숫자 swapPoint * 2 + 1
    tempCard[0] = deck[i * 2];
    tempCard[1] = deck[i * 2 + 1];

    deck[i * 2] = deck[swapPoint * 2];
    deck[i * 2 + 1] = deck[swapPoint * 2 + 1];

    deck[swapPoint * 2] = tempCard[0];
    deck[swapPoint * 2 + 1] = tempCard[1];
  }

  printf("%s 덱\n", deck);
```

덱셔플 로직을 복사붙여넣기 하는데 성공했습니다.

다음은 리팩토링과 다른 로직 추가가 필요합니다.

리팩토링은 쉽습니다. 어려운 것은 가독성있게 변수 선언과 함수선언하는 것입니다.

또 반복하는 상수리터럴을 맥크로 상수로 전환해야 합니다.

주의할 부분은 시작인덱스입니다. 마지막 인덱스를 정확히 골라야 합니다. 범위를 초과하면 문자열을 제거합니다.

## 스택만 활용할 때 단점

빈 메모리 공간을 자동으로 생성할 수 있고 필요 없으면 free 만 하면 됩니다. 스택으로 관리하고 초기화가 필요하면 문자열 전체를 순회하고 제거하는 작업을 수행해야 합니다.

C 언어에서 문자열에 모든 값을 `{0}`으로 초기화한 것처럼 만들어 버리는 방법을 알아내야 합니다.

### 문자열 초기화

문자열을 초기화하기 위한 방법이 필요했습니다. 의외로 전략은 다양했습니다.

https://stackoverflow.com/questions/8107826/proper-way-to-empty-a-c-string

위 질문에서 방법이 소개되어 있습니다.

```c
strcpy(player.cards, "");
strcpy(dealer.cards, "");
```

CLI에서 문제가 있었는데 전판의 손패를 계속 들고 있는 버그가 있었습니다. 새로운 판이 시작하면 문자열을 모두 비워야 했습니다.

## 나중에 볼 C 언어 튜토리얼

Learn C Programming and OOP with Dr. Chuck (feat. classic book by Kernighan and Ritchie) 

https://www.youtube.com/watch?v=PaPN51Mm5qQ
