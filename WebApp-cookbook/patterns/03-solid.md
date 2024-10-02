---
sidebar_position: 3
description: 'solid 원칙'
draft: true
---

# solid 원칙

## 단일 책임 원칙(Single Responsibility Principle)

함수 혹은 클래스의 역할은 1가지로 합니다.

## 개방 패쇄 원칙(Open-Closed Principle)

## 리스코프 치환 원칙(Liskov Substitution Principle)

## 인터페이스 분리 원칙(Interface Segregation Principle)

## 의존 역전 원칙(Dependency Inversion Principle)

보통 import 문으로 호출해서 사용하는 경우를 보면 의존하는 관계를 역전시킨 것입니다.

Java 같은 곳 위주로 생각하지만 꼭 그런것은 아닙니다.

--- 

어제부터 갖기 시작한 의문입니다. 바로 의존성 주입이라는 것은 무엇인가?

회사에서는 vue를 사용하고 vue도 프레임워크 차원에서 의존성 주입을 제공한는데 지금 회사에서는 페이지에 저장하는 상태로 활용하고 있습니다.

확장성이 높고 가변성이 높은 패턴을 생각하고 있는데 의존성 주입으로 이 문제를 풀 수 있는지 의문입니다. 좋다 나쁘다가 아니라 이 의존성 주입을 프론트엔드 엔지니어 관점에서 이해하기 어렵습니다.

너무 많은 예제가 Java - Spring 조합으로 작성되었습니다. 순수한 코드로 의존성 주입을 파악하고 왜 확장성과 유지보수 테스트 가능성에 유리한지 알고 싶습니다. 

Dependency Injection, The Best Pattern

https://www.youtube.com/watch?v=J1f5b4vcxCQ

도식화된 그래픽을 보면 인터페이스가 중요해보입니다. 코드에 구체적인 것과 추상적인 것을 분리하는 것입니다. 클래스는 구체적인데 인터페이스는 추상적입니다. 테스트를 목적으로 클래스를 따로 만드는 것도 가능하다는 것입니다. 이런 점에서 의존성 주입은 유용한 것 같습니다. 하지만 클래스 인스턴스를 생성하는 방식을 아직 이해못했습니다.

의존성 주입은 코드를 직접 클로져처럼 외부 스코프에서 접근하지 않고 매개변수로 넘겨줍니다. 복잡하고 구체적인 비즈니스로직을 관심사 단위로 분리합니다.

보통 비즈니스 로직이 더 구체적이거나 변경되면 코드를 그대로 작성하는 경우가 많습니다. 그리고 나중에는 책임이 너무 많아집니다.

의존성 주입을 시작할 때는 주입할 추상적인 인터페이스 정의부터 해야 합니다. 그리고 구체적인 비즈니스 로직을 갖을 클래스를 구현(implement)합니다. 

비즈니스를 실행하고 주입받을 클래스는 주입받고자 하는 인터페이스로 타입을 지정합니다. 이렇게 정의하면 호출자가 구체적으로 구현한 클래스를 대입, 넘겨주기, 고급스럽게 의존성을 주입할 수 있습니다. 비즈니스 실행 클래스 혹은 함수는 무엇이 구체적으로 실행되었는지 모릅니다.

여기서 생각해볼 점은 인터페이스가 주입할 클래스와 주입될 클래스 사이 어답터 역할을 해줘야 합니다. 시그니쳐를 일치시켜서 실행과 결과에 대한 추상적으로 무엇을 할지 보장해야 합니다. 이렇게 해야 관심사 분리가 수월해집니다.

<!-- TODO: 주석 내용별로 분류하기-->

<!--https://yozm.wishket.com/magazine/detail/2479/-->

<!--https://yozm.wishket.com/magazine/detail/2478/-->

<!--https://careerly.co.kr/comments/100242?utm_source=slack&utm_medium=bot&utm_campaign=T056MP5374J-->

<!--https://techicons.dev/-->

<!--https://course.fast.ai/-->

<!--https://tech.inflab.com/20240227-finops-for-startup/-->

<!--https://news.hada.io/topic?id=13662&utm_source=slack&utm_medium=bot&utm_campaign=T056MP5374J-->

<!--https://news.hada.io/topic?id=13644&utm_source=slack&utm_medium=bot&utm_campaign=T056MP5374J-->
