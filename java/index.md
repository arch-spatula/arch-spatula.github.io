---
sidebar_position: 1
---

# 꼰대가 되기 위한 Java

:::danger 경고

이 문서는 보통 민족명절에 커밋할 것입니다. 한글날, 제헌절, 추석, 신정, 구정, 설날, 광복절, 삼일절, 현충일 등... 작성합니다.

Java가 한국의 점유율이 높아서 제2 한국어라고 자주 놀리는 프로그래밍 언어입니다. ~~민족적 자부심을 느끼고 싶을 때 커밋할 것입니다.~~ ~~다시는 한국을 무시하지마라~~

면접관이 되어서 제가 별로 안 좋아하는 지원자 자진 지원취소하게 만들 때 활용할 것입니다. ~~바로 프론트엔드에게 JVM 아키텍쳐를 물어볼 것입니다.~~

:::

사실 Java는 백엔드 엔지니어가 아니라면 기본 문법만 익히고 [cracking the coding interview](https://www.yes24.com/Product/Goods/44305533)같은 도서를 읽기 위해 활용해도 충분합니다. [클린코드](https://www.yes24.com/Product/Goods/11681152)도 예시가 Java로 되어 있습니다.

Java가 주된 기술 스택이 아니라면 최대한 문법 위주로 학습해야 가치가 클 것입니다.

만약에 주된 언어로 사용해야 한다면 언어를 깊게 학습하기 바랍니다.

농담반 진담반으로 배워야 하는 이유는 Java는 우리나라 프로그래머의 한국어이기 때문입니다. 자민정음이라는 농담을 할정도로 많이 사용합니다. 한국인이 한국말을 못하는게 말이 되는가 라면서 Java를 못한다는 이유로 혼낸다는 전설이 많습니다. 대학교 프로그래밍 언어 강의에 Java와 객체지향 프로그래밍을 포함하는 학교가 많습니다. 그래서 전공자처럼 기대하는 것이 많을 것입니다. 또 Java를 많이 사용하는 이유는 Java를 많이 사용하고 있기 때문에 Java를 많이 사용해야 한다는 순환논리에 도달했습니다.

## Java 소개

<iframe class="codepen" src="https://www.youtube.com/embed/l9AzO1FMgM8" title="Java in 100 Seconds" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Java에 대한 정상적인 소개입니다.

<iframe class="codepen" src="https://www.youtube.com/embed/m4-HM_sCvtQ" title="Java for the Haters in 100 Seconds" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

제가 훨씬 더 좋아하는 소개 영상입니다. ~~우리나라 프로그래머거 싫어합니다.~~

### 국내 상황

![자바 두명 타세요](https://user-images.githubusercontent.com/84452145/271985187-126c5a39-8ff3-439d-be16-a8ce1b57c3c6.png)

![자바 두명 타세요](https://user-images.githubusercontent.com/84452145/271985138-8f545133-4283-400b-a20c-bdcbfd57ad75.png)

솔직하게 말하면 국내 상황을 정확히 알고 있지는 않습니다. 사실 위에 Java 밈 2개를 공유하고 싶어서 작성했습니다.

Java는 우리나라의에서 점유율이 제일 높은 언어입니다. 점유율이 높아진 이유는 제조업 대기업에서 임베디드 개발하던 사람들 상당수가 Java을 사용한 것부터 시작했다고 합니다. 하지만 생각보다 유능한 사람들이고 대규모 트래픽을 처리한 래퍼런스가 Java 많아서 그렇다고 합니다.

Java는 외주의 언어입니다. 우리나라의 가슴이 웅장해지는 SI 인력시장에서 수요가 엄청나게 많습니다.

SI에서 막장으로 짜놓은 코드도 Java일 가능성이 높고 네카라쿠배직당야토의 MSA, 대규모 분산시스템 서버 중 하나는 Java일 가능성이 높습니다.

천상계와 심해계 모두 Java가 많습니다. 아주 잘하는 언어가 되거나 아주 막나가는 언어가 될 것입니다.

### 해외 상황

<iframe class="phone-video" src="https://youtube.com/embed/TwXu4cJ9pCY" title="Exposed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

~~아들도 손절하게 만드는 언어~~

### 제임스 고슬링

![](https://user-images.githubusercontent.com/84452145/273433111-ea9ffc80-db2b-4902-a428-7a583ec2d60e.png)

~~[제임스 고슬링(James Arthur Gosling, 1955년 5월 19일 ~ )](https://ko.wikipedia.org/wiki/%EC%A0%9C%EC%9E%84%EC%8A%A4_%EA%B3%A0%EC%8A%AC%EB%A7%81)은 한국 개발자들에게 마치 세종대왕과 같은 존재입니다.~~

## 학습 리소스

[Java의 정석 - 남궁성](https://www.yes24.com/Product/Goods/24259565)

- Java 강의와 도서로 유명합니다.
- [유튜브 채널](https://www.youtube.com/channel/UC1IsspG2U_SYK8tZoRsyvfg)도 운영하고 있습니다.

[김영한의 스프링 완전 정복](https://www.inflearn.com/roadmaps/373)

- 스프링 인터넷 강의로 유명합니다.
- [자바 ORM 표준 JPA 프로그래밍](https://www.yes24.com/Product/Goods/19040233) 도서도 유명합니다.

[토비의 스프링](https://www.yes24.com/Product/Goods/7516911)

- 주 1일 근무하고 남은 일동안 다른 취미를 즐겼다는 전설의 개발자로 통합니다.

[점프 투 자바 - 박응용](https://wikidocs.net/book/31)

- 자바 문법만 공부하려면 적당할지도 모릅니다.

[Amigoscode](https://www.youtube.com/@amigoscode)

- 런던에서 살고 있는 아프리카 이민자입니다.
- Java, Spring 명강의를 만들어냈습니다.

[java 유튜브 채널](https://www.youtube.com/@java/featured)

- 난해한 오라클 감성을 느낄 수 있습니다.
- 유튜브 숏츠가 유용하다는 착각을 줍니다.

<iframe class="codepen" src="https://www.youtube.com/embed/GdzRzWymT4c" title="Java Basics – Crash Course" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- 저처럼 글보다 영상을 좋아하는 사람들을 위해서 freecodecamp가 제공강의도 있습니다.

[React.js, 스프링 부트, AWS로 배우는 웹 개발 101 2/e](https://www.yes24.com/Product/Goods/112938949)

- 개인적으로 신뢰하는 에이콘 출판사에서 낸 책입니다.
- 한국적인 풀스택 웹앱을 만들 수 있습니다.

[java 로드맵](https://roadmap.sh/java)

- 좀더 수월하게 학습할 수 있는 Java 로드맵입니다.

[이팩티브 자바](https://www.yes24.com/Product/Goods/65551284)

- Java를 쓸 줄 아는 것과 Java를 **잘** 쓸 줄 아는 것은 다릅니다. 이 책은 잘을 다룹니다.

### Java로 작성된 유명 도서

다음 도서 혹은 자료들은 Java를 학습하고 다른 개념들을 학습하기 수월하게 해주는 것들입니다.

[cracking the coding interview](https://www.yes24.com/Product/Goods/44305533)

- 미국은 기술면접 중에 라이브 코딩을 시키는 기업이 많습니다. 어떻게 기술면접을 합격할 수 있는지 알려주는 도서입니다.
- 기술면접을 보기 전에 이력서를 제출하는 것도 미국과 한국 동일합니다. 그리고 이력서가 합격이면 코테를 주는데 코테를 푸는 방법을 알려줍니다.

<details>
<summary>how programmers overprepare for job interviews</summary>
<div markdown="1">

<iframe class="codepen" src="https://www.youtube.com/embed/5bId3N7QZec" title="how programmers overprepare for job interviews" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

이런 곳에서도 언급되는 고전에 해당합니다.

</div>
</details>

[클린코드](https://www.yes24.com/Product/Goods/11681152)

- 클린코드는 코드를 잘 정리하자는 유명한 고전 중 하나입니다. 모든 부분을 강박적으로 따르기 보단 유용한 개념을 줍줍하고 적용하려고 하면 좋습니다.
- 많은 경우 비전공 신입개발자가 취업하자마자 회사 기술스택, 컨벤션을 익히고 난 뒤에 학습하는 도서입니다.

[헤드 퍼스트 디자인 패턴](https://www.yes24.com/Product/Goods/108192370)

- 디자인 패턴을 다루는 고전 도서입니다.
- GoF가 정의한 디자인 패턴을 다룹니다.
- 디자인 패턴을 적용하려는 강박은 갖지 말도록 합니다. 하지만 어느정도 지식이 있고 코드를 잘 정리하는데 유용한 도서입니다.

[오브젝트](https://www.yes24.com/Product/Goods/74219491)

- 놀랍게도 한국 저술입니다. 객체지향을 잘 다루는 도서입니다.

<iframe class="codepen" src="https://www.youtube.com/embed/GdzRzWymT4c" title="Java Basics – Crash Course" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
