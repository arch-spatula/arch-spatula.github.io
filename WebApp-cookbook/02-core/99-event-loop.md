---
sidebar_position: 99
tags: ['event loop', 'core', 'inner working']
draft: true
---

# 이벤트 루프

자바스크립트 동작방식에서 가장 특이하고 가장 유용한 부분 중 하나는 이벤트 루프입니다.

그래서 이벤트 루프란 무엇인가?

<iframe class="codepen" src="https://www.youtube.com/embed/8aGhZQkoFbQ" title="어쨌든 이벤트 루프는 무엇입니까? | Philip Roberts | JSConf EU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### 이벤트 루프 딥다이브

<iframe class="codepen" src="https://www.youtube.com/embed/cCOL7MC4Pl0" title="Jake Archibald: 루프 속 - JSConf.Asia" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## 콜백 큐

## 콜스택

자바스크립트에만 존재하는 것은 아닙니다.

## 힙메모리(Memory Heap)

~~힙한 메모리가 아닙니다.~~

식별자 이름을 저장합니다.

프로그램이란 것은 디스크에 저장되어 있다가 메모리로 호출되면 그것은 그 시점부터 프로세스가 됩니다.

프로세스에는 쓰레드(1개 혹은 여러개)와 힙메모리로 구성됩니다. 계산 같은 동작과 관련된 것은 쓰레드에서 처리하고 정보를 저장하는 것은 힙에 처리합니다. 힙메모리라고 부르는 이유는 자료구조 중에 힙 구조를 차용해서 사용하고 있기 때문에 힙메모리라고 부릅니다.

## Environment Record

콜 스택(Call Stack)

실행콘텍스트를 통해 식별자별 자료를 접근합니다.

this를 바인딩합니다.

코드 실행 순서드을 관리합니다.

콜백 큐(Callback Queue)

Web APIs
