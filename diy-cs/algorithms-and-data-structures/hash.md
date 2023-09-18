---
sidebar_position: 8
description: '해시'
tags: ['그리디', '알고리즘', '문제 유형', '해시']
---

# 해시

해시를 직접 라이브 코딩으로 구현하는 문제도 존재합니다. 하지만 해시의 key-value 형태를 활용해서 푸는 문제가 더 많습니다. 또 이 해시를 표처럼 응용해서 풀이하는 경우도 많습니다.

## 영어 끝말잇기

단순하게 구현하면 되는 문제입니다. 그냥 긴장했었습니다. 표처럼 생각하면 맵로 풀 수 있는 문제입니다.

<!--truncate-->

[영어 끝말잇기](https://school.programmers.co.kr/learn/courses/30/lessons/12981)

```js
/*
 * @param {number} n
 * @param {string[]} words
 * @returns {[number, number]}
 */
function solution(n, words) {
  var answer = [];

  // [실행] 버튼을 누르면 출력 값을 볼 수 있습니다.
  console.log('Hello Javascript');

  return answer;
}
export default solution;
```

```js
import solution from './playground';
import { test, expect, describe } from 'vitest';

// n	words	result
// 3	["tank", "kick", "know", "wheel", "land", "dream", "mother", "robot", "tank"]	[3,3]
// 5	["hello", "observe", "effect", "take", "either", "recognize", "encourage", "ensure", "establish", "hang", "gather", "refer", "reference", "estimate", "executive"]	[0,0]
// 2	["hello", "one", "even", "never", "now", "world", "draw"]	[1,3]

describe('카펫', () => {
  test('예제 1', () => {
    expect(
      solution(3, [
        'tank',
        'kick',
        'know',
        'wheel',
        'land',
        'dream',
        'mother',
        'robot',
        'tank',
      ])
    ).toEqual([3, 3]);
  });
  test('예제 2', () => {
    expect(
      solution(5, [
        'hello',
        'observe',
        'effect',
        'take',
        'either',
        'recognize',
        'encourage',
        'ensure',
        'establish',
        'hang',
        'gather',
        'refer',
        'reference',
        'estimate',
        'executive',
      ])
    ).toEqual([0, 0]);
  });
  test('예제 3', () => {
    expect(
      solution(2, ['hello', 'one', 'even', 'never', 'now', 'world', 'draw'])
    ).toEqual([1, 3]);
  });
});
```

### 2. 풀이 전 계획과 생각

- 탐색문제인가? 그리디? 이런 문제로 생객했습니다.
- 일단 선형탐색은 필요했습니다.

```
// words를 선형 순회
//  단어를 말하면 이전 단어 조회
//    첫글자 마지막 글자 일치 확인
//    불일치하면 반환
//  단어 중복을 조회
//    단어가 없으면 기록
//    최근 단어로 기록
//    단어가 있으면 반환
```

### 3. 풀이

<details>
<summary>저의 풀이</summary>
<div markdown="1">

```js
/**
 * @param {number} n
 * @param {string[]} words
 * @returns {[number, number]}
 */
function solution(n, words) {
  const wordMemo = new Map();
  const playerTurnMemo = new Map();
  let latestWord = '';

  for (let i = 0; i < n; i++) {
    playerTurnMemo.set(i + 1, 0);
  }

  for (let i = 0; i < words.length; i++) {
    const currentPlayer = (i % n) + 1;
    const word = words[i];
    playerTurnMemo.set(currentPlayer, playerTurnMemo.get(currentPlayer) + 1);

    if (i === 0) {
      latestWord = word;
      wordMemo.set(word, 1);
      continue;
    }

    if (latestWord.at(-1) !== words[i][0])
      return [currentPlayer, playerTurnMemo.get(currentPlayer)];
    if (wordMemo.get(word))
      return [currentPlayer, playerTurnMemo.get(currentPlayer)];

    wordMemo.set(word, 1);
    latestWord = word;
  }

  return [0, 0];
}

export default solution;
```

</div>
</details>

### 4. 풀이하면서 고민했던 점

- 성능문제가 존재할 수 있는가?
  - 그냥 Map 읽고 쓰는데 발생하는 것도 이상합니다.

### 5. 문제를 풀고 알게된 개념 및 소감

- 막상 풀어보니까 해시로 풀 수 있는 문제였습니다.
- 해시도 테이블처럼 생각하고 2개로 역할분리하는 점근도 좋았던 것 같습니다.
  - 하나의 테이블은 중복을 기록
  - 다른 하나의 테이블은 누구 차례인지 기록
  - 문제에서 테이블 비슷하게 보여줬으면 활용하기
