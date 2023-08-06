---
sidebar_position: 10
---

# 용어 줍줍

<!-- ## 미분류

- 직렬화
- 엔티티
- 컬렉션

-->

## 레코드란?

컴퓨터 과학에서 레코드(record, struct)는 기본적인 자료 구조이다. 데이터베이스나 스프레드시트의 레코드는 보통 로우(row)라고 부른다.

레코드는 각기 다른 자료형에 속할 수 있는 필드의 모임이며, 보통 고정 숫자나 시퀀스로 이루어져 있다.[5] 레코드의 필드들은 특히 객체 지향 프로그래밍에서 멤버(member)로도 부른다.

```go
type Date struct {
        year  int
        month time.Month
        day   int
}
```

위는 golang으로 레코드 비슷하게 표현한 예시입니다.[^3]

---

## 영어 및 영어권 표현

<!-- recipe for disaster: -->

- Shoot Yourself In The Foot: 자가당착
  - 미국권에서는 개발자 가장 많이 학습하는 방식입니다. 한국에서는 개발자들이 남들에게 말 안하고 몰래 배우는 방식입니다.
- Out of the box: 소프트웨어에서 즉시 사용 가능한 기능은 공급업체에서 직접 제공되는 제품의 기본 기능 또는 기본 제공 기능[^1]
- Benevolent Dictator for Life(BDFL): 자비로운 종신독재자
  - 프로그래밍 언어, 라이브러리, 프레임워크 창시자가 설계를 잘한 경우 주어집니다.
  - 창시자 본인의 결정에 커뮤니티가 전적으로 내릴 수 있고 커뮤니티도 전적으로 따릅니다.
- school of thought: 유파, 학파
- Miscellaneous: 여러 가지 잡다한
- 개밥먹기(dogfooding): 본인 스스로가 사용할 제품 및 서비스를 본인이 만드는 행위(the practice of using one's own products or services).[^2]

[^1]: [Out of the box (feature) - wikipedia](<https://en.wikipedia.org/wiki/Out_of_the_box_(feature)>)
[^2]: [Eating your own dog food - wikipedia](https://en.wikipedia.org/wiki/Eating_your_own_dog_food)
[^3]: [레코드 - 컴퓨터 과학](<https://ko.wikipedia.org/wiki/%EB%A0%88%EC%BD%94%EB%93%9C_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99)>)
