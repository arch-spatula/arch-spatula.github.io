---
sidebar_position: 4
description: '네트워크'
tags: ['네트워크']
draft: true
---

# 네트워크

네트워크 지식은 문과처럼 용어와 관계로 공부할 수 있습니다.

[HTTP 완벽 가이드](https://www.yes24.com/Product/Goods/15381085)

http는 사실 따로 다뤄야 하지만 나중에 하겠습니다.

네트워크란 무엇인가? 컴퓨터와 컴퓨터 사이 연결을 말합니다. 그리고 인터넷은 기중 가장 거대한 연결관계를 말합니다.

인터넷은 누구의 것인가? 모두의 것입니다. 인터넷을 규제할 수 있는 것은 그 망을 지리적으로 통제할 수 있는 그 국가의 주권문제입니다. 중국의 경우 미국의 일부 서비스를 금지하고 검열하고 있습니다. 국가는 검열하고 차단만 할 수 있습니다. 만약에 중국인이 유학을 가게 되면 검열로 차단했던 서비스를 접근할 수 있게 됩니다.

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
