---
sidebar_position: 98
description: "컴파일러 & 인터프리터"
tags: ["컴파일러 & 인터프리터"]
draft: true
---

# 컴파일러 & 인터프리터

<!-- [밑바닥부터 만드는 컴파일러 in Go](https://www.yes24.com/Product/Goods/103099817) -->
<!-- [밑바닥부터 만드는 인터프리터 in Go](https://www.yes24.com/Product/Goods/103157156) -->
<!-- [Crafting Interpreters 로버트 나이스트롬의 인터프리터 in Java, C](https://www.yes24.com/Product/Goods/123859288) -->

:::info 참고

컴파일러 & 인터프린터는 면접질문의 단골 주제는 아닙니다. 2024년 프론트엔드 엔지니어에게는 상당히 트렌디한 지식이지만 프론트엔드 답게 다시 식어버릴 것입니다.

`자료구조 알고리즘`, `이산 수학` 지식을 갖고 `프로그래밍 언어론`을 먼저 학습하고 컴파일러와 인터프린터를 다음에 학습할 것을 권장합니다.

<!--어쎔블리 지식도 어느정도 필요할 것입니다.-->

컴파일러와 인터프리터는 프로그래머로서 반드시 구현해봐야 하고 알고 있어야합니다. 하지만 실무적으로 활용하는 분야는 생각보다 작습니다.

:::

## 시작하며

컴파일러와 인터프리터는 본질적으로 다른가?

"과일과 채소가 다른가?"랑 같은 질문입니다. 이것은 관점의 문제입니다. 채소는 요리 관점입니다. 하지만 과일은 식물학 관점입니다. 프로그래머가 컴퓨터에게 수행할 작업을 작성하는 문서라는 것에서는 같습니다. 다른 것은 처리하고 명령할지 읽으면서 처리할지 입니다.

컴파일러는 제조업에서도 자주 사용합니다. 최소화된 바이너리를 전자제품 펌웨어로 넣기 위해 자주 사용합니다.

컴파일러 및 인터프리터 자체도 결국 프로그램입니다. 사람이 작성해야 합니다.

LLVM 툴체인덕분에 많은 사람들이 프로그래밍 언어를 만들어볼 수 있게 되었습니다.

의외로 자주보게 될 패턴들이 있습니다. 하나는 서버-클라이언트 아키텍쳐부터 보게 될 것입니다. 클라이언트는 언어 프론트엔드로서 소스코드를 받아 문법이 바른지 평가하고 토큰으로 변환하고 변환한 토큰은 AST를 만들것입니다. 이 만든 AST는 언어 백엔드가 VM으로 받아서 변환하고 처리하거나 현재 CPU 아키택쳐기준으로 실행할 수 있는 바이너리를 만들 것입니다. 언어 프론트엔드는 소스코드에서 AST로 처리를 다루고 백엔드는 AST를 적절한 타겟머신에 처리할 수 있게 만드는 것을 다룹니다.

막상 하이레벨로 보면 별거 없습니다. 그냥 파싱하고 트리순회하는 것에 불과합니다.

## 소스코드는 어떻게 실행하는가?

<iframe className="codepen" src="https://www.youtube.com/embed/2y1IgW2T8bo" title="how does source become code?" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

## 인터프린터

인터프린터부터 다루고자 합니다.

## 컴파일러란?

프로그래밍 언어로 작성된 소스 코드를 컴퓨터가 이해하고 실행할 수 있는 기계어로 변환해주는 소프트웨어입니다.

이 컴파일러를 왜 공부해야 하는가? 오늘날 만들어진 컴퓨터언어를 이해하기 위한 근간입니다. 프로그래머로서 문자열 다루기는 기본적인 소양입니다. 이 소양을 기르기 위해 공부해볼만한 주제는 컴파일러와 인터프린터만한 것이 없습니다.

어휘분석과 구분분석 2단계로 나누어집니다.

## 프랫파싱이란?

본 프랫이라는 사람이 만든 것입니다. 왼쪽 결합도 오른쪽 결합도에 따라 트리 구조를 만들 때 활용하는 이론입니다.

https://drop.rooi.dev/posts/2024/02/10/01/

검색해보니까 우리나라 블로그에 위처럼 정리한 사람이 있다는 것이 신기합니다.

## 파서 제너레이터

역사와 전통의 Yacc, Bison 이런 것들을 파서 제너레이터라고 부릅니다.

출력으로 파서를 생성하는 도구라고 합니다.

출력물이 코드입니다. 컴파일, 인터프린트 가능한 코드입니다. 피서 그자체가 구문 트리를 생성하는 입력 소스 코드도 제공됩니다.

문맥 무관(Context Free Grammar, CFG)를 사용합니다. 배커스-나우어 표기법(Backus-Naur Form, BNF), 확장된 배커스-나우어 표기법(Extended Backus-Naur Form, EBNF)이 있습니다. 존 배커스, 피터 나우어가 창안 했습니다.

파서 제너레이터는 상용 언어를 구현할 때는 사용하지만 학습용으로는 직접 파싱 기능을 구현할 것을 권장합니다.

<!-- 

https://github.com/PLTEAM1/lisp-interpreter

위랑 같은 것이 정상적인 프로그래머의 실력입니다.

--> 
