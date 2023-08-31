---
sidebar_position: 2
description: '리팩토링'
---

# 리팩토링

이미 작성된 코드를 이해하기 좋게 수정하는 작업을 보고 리팩토링이라고 합니다.

개인적으로 객체지향 프로그래밍, 함수형 프로그래밍 같은 패러다임보다 더 중요한 지식이라고 봅니다.

## 참고자료

[refactoring - dev-in-book](https://dev-in-book.github.io/refactoring/)

위 온라인 자료도 활용합니다. 오타가 몇개 있어서 PR 올리고 싶지만 참겠습니다.

[리팩터링 2판 - 마틴 파울러](https://www.yes24.com/Product/Goods/89649360)

위 도서를 실제로 읽기는 했습니다. 하지만 속독해서 복습이 필요합니다.

[martinfowler.com](https://martinfowler.com/)

위는 마틴마울러가 운영하는 본인 사이트입니다. 리팩터링 2판의 내용을 다루기도 하지만 다른 분야의 리팩토링도 다룹니다.

## 왜 리팩토링을 하는가?

이유는 단순합니다. 경제성 때문입니다. 코드베이스의 복잡성이 늘어나면 기능을 추가하거나 디버깅하기 위한 시간도 같이 늘어납니다. 빠르게 유저에게 기능을 전달하기 위한 생산성이 높아야 합니다.

소프트웨어 엔지니어링에서 주적을 1가지 정의하라고 하면 복잡성은 분명히 적입니다.

리팩토링 전략은 언어 이해가 있으면 수월한 경우도 있습니다. 또 엔지니어링하는 분야에 따라 다를 수 있습니다. 하지만 몇가지 방법론을 보면 분명히 유용한 것을 많이 볼 수 있습니다.

<iframe class="codepen" src="https://www.youtube.com/embed/vqEg37e4Mkw" title="Martin Fowler @ OOP2014 'Workflows of Refactoring'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

~~사실 한글자막 있는 영상 예전에 봤는데 안 올릴 것입니다. 여러분 영어듣기 연습하기 바랍니다.~~

<!-- 코드가 클린하다는 의미는 읽는 코드가 익숙해보인다는 가능성이 큽니다. -->

## 실제 예시

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
      case 'tragedy': // 비극
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;

      case 'comedy': // 희극
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    // 포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);

    // 희극 관객 5명 마다 추가 포인트를 제공한다.
    if ('comendy' === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다.
    result += ` ${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
    result += `총액: ${format(totalAmount / 100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;
    return result;
  }
}
```

위와 같은 코드가 있습니다. 위 코드가 작성된 맥락입니다.

- 공연 요청이 들어오면 연극의 장르와 관객 규모를 기초로 비용을 책정한다.
- 이 극단은 두 가지 장르, 비극과 희극만 공연한다.
- 공연료와 별개로 포인트(volume credit)를 지급해서 다음번 의뢰시 공연료를 할인받을 수도 있다.

저는 이런 코드보면 다루기 싫어집니다. <!-- 또 쫄보라서 테스트 코드를 추가하겠습니다. -->

```js
import { describe, expect, test } from 'vitest';
import { statement } from './statement';

describe('statement', () => {
  test('리팩토링 이전', () => {
    const plays = {
      hamlet: { name: 'Hamlet', type: 'tragedy' },
      'as-like': { name: 'As You Like It', type: 'comedy' },
      othello: { name: 'Othello', type: 'tragedy' },
    };
    const invoice = [
      {
        customer: 'BigCo',
        performances: [
          { playID: 'hamlet', audience: 55 },
          { playID: 'as-like', audience: 35 },
          { playID: 'othello', audience: 40 },
        ],
      },
    ];

    const billing = statement(invoice[0], plays);

    expect(billing).toBe(
      '청구 내역 (고객명: BigCo)\nHamlet: $650.00 (55석)\nAs You Like It: $580.00 (35석)\nOthello: $500.00 (40석)\n총액: $1,730.00\n적립 포인트: 47점'
    );
  });
});
```

위와 같은 테스트 코드를 작성하면 됩니다. 여기서 결과를 값으로 검증하면 처리는 바꿔도 괜찮습니다.

또 편의를 위해 타입지정을 해줍시다.

```js
/**
 * @param {{customer: string, performances: {playID: string, audience: number}[]}} invoice
 * @param {Record<string, {name: string, type: "tragedy" | "comedy"}>} plays
 */
function statement(invoice, plays) {
  // 생략 ...
}
```

자바스크립트에 일단 이렇게 타입을 흉내냅시다.
