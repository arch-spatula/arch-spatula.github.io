---
sidebar_position: 4
description: "네트워크"
tags: ["네트워크"]
draft: true
---

# 네트워크

네트워크 지식은 문과처럼 용어와 관계로 공부할 수 있습니다.

[HTTP 완벽 가이드](https://www.yes24.com/Product/Goods/15381085)

http는 사실 따로 다뤄야 하지만 나중에 하겠습니다.

네트워크란 무엇인가? 컴퓨터와 컴퓨터 사이 연결을 말합니다. 그리고 인터넷은 기중 가장 거대한 연결관계를 말합니다.

인터넷은 누구의 것인가? 모두의 것입니다. 인터넷을 규제할 수 있는 것은 그 망을 지리적으로 통제할 수 있는 그 국가의 주권문제입니다. 중국의 경우 미국의 일부 서비스를 금지하고 검열하고 있습니다. 국가는 검열하고 차단만 할 수 있습니다. 만약에 중국인이 유학을 가게 되면 검열로 차단했던 서비스를 접근할 수 있게 됩니다.

<!--
## 네트워크의 종류

https://www.youtube.com/watch?v=Vc-PGeu94c4

https://www.youtube.com/watch?v=P6SZLcGE4us

Top 8 Most Popular Network Protocols Explained -->

<!-- ## 비행기모드

[What happens if you don’t put your phone in airplane mode? - Lindsay DeMarchi](https://www.youtube.com/watch?v=iKYHf22qVdM) -->

## 유용한 자료

- [TCP/IP 완벽 가이드](http://www.acornpub.co.kr/book/tcpip)

## 하이 레벨: 인터넷이란 무엇인가?

<iframe className="codepen" src="https://www.youtube.com/embed/jjKFXlFNR4E" title="POV: I'm on my third coffee and you just asked me how the internet works" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

<!--## 버퍼를 수동으로 비우도록 설계한 이유는 무엇인가?-->

<!--유용하다고 착각하는 자료를 줍줍했습니다.-->

<!--https://modoocode.com/32 -->

<!--어쎔블리를 다루는 블로그입니다.-->

<!--근본적인 설계이유는 모릅니다. 하지만 버퍼에 남는 `scanf`의 동작원리를 설명해줍니다.-->

<!--하지만 추측은 버퍼에 담는 이유는 프로그램의 효율성 때문에 넣는다는 것을 압니다. 모아서 한번에 저장하는 것이 입력마다 저장하는 것보다 효율적입니다.-->

<!--과거에는 컴퓨터 아키텍쳐가 복잡해지면서 성장한 세대들에게 버퍼 메모리라는 개념은 어쩌면 직관적이었을 것입니다. 당시 시점에서는 혁신이라고 생각하고 있었을 것입니다.-->

## 방화벽이란 무엇인가?

방화벽이란 트레픽을 제한하거나 허용하는 하드웨어 및 소프트웨어입니다. 네트워크 분야의 보안 시스템입니다.

[방화벽 (네트워킹)](https://ko.wikipedia.org/wiki/%EB%B0%A9%ED%99%94%EB%B2%BD_(%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%82%B9))

방화벽은 WAN와 LAN를 구분하는데 주로 사용합니다. LAN으로 내부 네트워크는 예를 들어 회사에서 서로 신뢰할 수 있습니다. 하지만 외부 WAN를 통해 들어오는 트레픽은 신뢰할 수 없습니다. 이 신뢰할 수 없기 때문에 장벽을 만듭니다.

장벽은 보안 규칙을 준수하는지 확인하는 기능을 갖고 있습니다. 방화벽과 관련된 대표적인 보안 규칙은 잘 모릅니다. 

들어오는 것과 나가는 것들을 검열, 수정, 차단을 할 수 있습니다.

대부분 인터넷에서 오는 요청은 신뢰할 수 없습니다.

방화벽은 리버스 프록스 역할을 수행합니다. 신뢰할 수 없는 요청은 DMZ로 리다이렉팅합니다. 신뢰할 수 있으면 원래 서버로 요청을 허용합니다.

방화벽은 놀랍게도 다양한 세대를 갖고 있습니다.

---

지금까지 찾은 것의 문제는 방화벽에 대한자료를 위키피디아 1개 보고 설명하고 있습니다. 깊이가 없습니다.

네트워크 트레픽 부하를 막는데 무슨 역할을 하는지 어떻게 구현하는지 설명이 전혀 없습니다. C 언어 네트워크 프로토콜 구현은 어떻게 하는지 일반적으로 활용하는 보안 규칙도 안 다룹니다.

이런 설명으로는 DoS만 막고 DDoS를 막는 방법은 모릅니다.

## What is GraphQL? Is it a replacement for the REST API?

![GraphQL](https://yt3.ggpht.com/4I63dVsgVMM-9_-Nl1ae9NrQAce4WvWayKgHchAjRaCwAHBA-YEhYcQYHNkfo4aNDvndZNSH8GP3Mw=s640-nd-v1)

The diagram below shows the quick comparison between REST and GraphQL.

🔹 GraphQL is a query language for APIs developed by Meta. It provides a complete description of the data in the API and gives clients the power to ask for exactly what they need.

🔹 GraphQL servers sit in between the client and the backend services.

🔹 GraphQL can aggregate multiple REST requests into one query. GraphQL server organizes the resources in a graph.

🔹 GraphQL supports queries, mutations (applying data modifications to resources), and subscriptions (receiving notifications on schema modifications).

We talked about the REST API in last week’s video and will compare REST vs. GraphQL vs. gRPC in a separate post/video.

Over to you:

1. Is GraphQL a database technology?
2. Do you recommend GraphQL? Why/why not?

## http

![http 발전과정](https://yt3.ggpht.com/sQTOjYNG3-waBGcZT5kN64-jbxQfiHxnGDv3-gv89CBVUIQeLs8f0jFEkw3TBOmbDW3fZL7hCld7HEc=s1600-nd-v1)

https://www.youtube.com/post/UgkxW_R-sMO-e6L1d3rdRBSt3WtpQGt0sQw9

HTTP 1.0 -> HTTP 1.1 -> HTTP 2.0 -> HTTP 3.0 (QUIC).

What problem does each generation of HTTP solve?

The diagram below illustrates the key features.

🔹 HTTP 1.0 was finalized and fully documented in 1996. Every request to the same server requires a separate TCP connection.

🔹 HTTP 1.1 was published in 1997. A TCP connection can be left open for reuse (persistent connection), but it doesn’t solve the HOL (head-of-line) blocking issue.

HOL blocking - when the number of allowed parallel requests in the browser is used up, subsequent requests need to wait for the former ones to complete.

🔹 HTTP 2.0 was published in 2015. It addresses HOL issue through request multiplexing, which eliminates HOL blocking at the application layer, but HOL still exists at the transport (TCP) layer.

As you can see in the diagram, HTTP 2.0 introduced the concept of HTTP “streams”: an abstraction that allows multiplexing different HTTP exchanges onto the same TCP connection. Each stream doesn’t need to be sent in order.

🔹 HTTP 3.0 first draft was published in 2020. It is the proposed successor to HTTP 2.0. It uses QUIC instead of TCP for the underlying transport protocol, thus removing HOL blocking in the transport layer.

QUIC is based on UDP. It introduces streams as first-class citizens at the transport layer. QUIC streams share the same QUIC connection, so no additional handshakes and slow starts are required to create new ones, but QUIC streams are delivered independently such that in most cases packet loss affecting one stream doesn't affect others.

Question: When shall we upgrade to HTTP 3.0? Any pros & cons you can think of?

## 용어

[url vs uri vs urn](https//www.youtube.com/post/UgkxFWdiySGxN41hpohPYQsBXHjcX0dhfMx0)

네트워크

- 네트워크란 컴퓨터와 컴퓨터 사이 통신을 의미합니다.

LAN

- 인터넷 설치기사들이 설치하는 것입니다. 보통 건물단위로 LAN 망을 활용합니다.

WAN

- LAN들은 WAN로 향합니다.
- 지역 인터넷 회사가 관리합니다.
- 망을 통제하는 것은 국가 혹은 회사가 WAN 단위로 통제할 수 있습니다.
  - 이런 이유로 다른나라의 망을 통신할 수 없습니다.

왕복 시간(Round Trip Time, RTT)

- [왕복 시간 MDN](https://developer.mozilla.org/ko/docs/Glossary/Round_Trip_Time)
- 패킷을 주고 받는데 걸리는 시간입니다.

```sh
ping www.naver.com
```

위 명령으로 IP 패킷 전송 후 응답 등을 알아 낼 수 있습니다.

<!-- 이더넷 -->

(번역) 웹 소켓 vs Server-Sent-Events vs 롱 폴링 vs WebRTC vs 웹 트랜스포트

https://ricki-lee.medium.com/%EC%9B%B9-%EC%86%8C%EC%BC%93-vs-server-sent-events-vs-%EB%A1%B1-%ED%8F%B4%EB%A7%81-vs-webrtc-vs-%EC%9B%B9-%ED%8A%B8%EB%9E%9C%EC%8A%A4%ED%8F%AC%ED%8A%B8-25bb6be64904
