---
sidebar_position: 1
tags: ['design system', 'intro']
toc_max_heading_level: 6
---

# 디자인 시스템 위키

:::caution 주의

디자이너로 재직하면서 디자인 시스템에 대해서 정리했던 내용을 점진적으로 마이그레이션하는 문서입니다.

<!-- 참고로 storybook.js, bit.js는 안 다룹니다. -->

<!--이 문서는 문제를 해결하는 일렬의 절차를 알려주는 레시피의 모음인 cook book이 아닙니다.-->

2024년 기준 vue를 많이 활용할 것입니다.

<!-- 하지만 리액트와 무관하게 적용가능한 이론을 정리하고 보여주고자 합니다. -->

<!-- 디자인 시스템은 1.0 버전 이하에 최초 도입은 반대하도록 합니다. 반대로 이미 여러번 구축한 제품들이 있는데 신사업 확장으로 만드는 관점이면 효율적일 수 있습니다. -->

:::

여기는 프론트엔드 엔지니어를 위한 디자인 시스템 위키입니다.

저는 UX/UI 디자이너로 1년 근무했었습니다. 근무하면서 디자인 시스템과 관련된 작업(플랫폼 디자인)을 많이 했습니다. 물론 이런 이유로 신뢰하라는 것은 아닙니다. 프론트엔드 엔지니어가 된 입장에서 디자인 시스템에 대해서 더 조심스러워졌습니다. 좋은 점도 있지만 결합도가 높아진다는 단점도 있습니다.

이 문서는 디자이너와 개발자 사이 커뮤니케이션을 더욱더 원활하게 해주기 위한 자료입니다. 디자이너 혹은 저와 함께 일하는 다른 엔지니어가 그 UI의 이름을 모를 때 활용할 수 있게 만들기 위해 존재합니다.

<!-- https://www.notion.so/5d8eafb6fde4446c8b94dad80c1ea865 -->

## 참고자료

다음 자료를 활용합니다.

- [UX 신입 디자이너가 알아야 할 UI디테일 용어 1탄](https://story.pxd.co.kr/616)
- [UX 신입 디자이너가 알아야 할 UI디테일 용어 2탄](https://story.pxd.co.kr/638)
- [UX 신입 디자이너가 알아야 할 UI디테일 용어 3탄](https://story.pxd.co.kr/647)
- [UX 신입 디자이너가 알아야 할 UI디테일 용어 4탄](https://story.pxd.co.kr/718)
- [모르면 곤란한 UIUX 용어집 - 1](https://brunch.co.kr/@bundi/41)
- [모르면 곤란한 UIUX 용어집 - 2](https://brunch.co.kr/@bundi/42)
- [GUI 위젯 - 위키피디아](https://ko.wikipedia.org/wiki/GUI_%EC%9C%84%EC%A0%AF)
- [Selection controls — UI component series](https://uxdesign.cc/selection-controls-ui-component-series-3badc0bdb546)

## Atomic Design Pattern

원자 - 분자 - 유기체 - 템플릿 - 페이지 단위로 컴포넌트를 개발하는 패턴입니다. 아주 거창하게 설명하려는 사람들이 있습니다. 사실 거창할 것은 없습니다. 그냥 컴포넌트가 계층구조를 갖는다는 것뿐입니다. bottom up으로 하위 컴포넌트부터 잘 조립해서 만드는 패턴입니다. 보통 컴포넌트를 만들 때는 top down으로 만드는 방식이 편리합니다. 큰 레이아웃에서 작은 레이아웃을 점진적으로 접근하고 만드는 방식이 수월합니다. 또 작업당 결과도 효율적입니다.

그의 이론은 [Atomic Design - by Brad Frost](https://atomicdesign.bradfrost.com/)에서 정리됩니다. 하지만 찾아 읽기 귀찮고 편하게 앉듣는 것 만으로 이해하고 싶은 우리를 위해 제가 핵심 이미지 하나만 선택해서 요약합니다.

![Atomic Design Pattern 요약](https://user-images.githubusercontent.com/84452145/258878023-c46fed80-006e-437f-b2a6-8840f76b1e44.png) 출처: Brad Frost[^1]

이렇게 됩니다. 백문이 불여일견이라고 이정도면 충분합니다.

[Atomic Design by Brad Frost—An Event Apart Austin 2015](https://www.youtube.com/embed/W-h1FtNYim4)에 외부 공개를 금지 설정하기는 했지만 원본 링크를 볼 수 있습니다. 강연 전체를 볼 수 있습니다.

프론트엔드 엔지니어들이 이미 실천하고 있는 패턴입니다. 단지 이것을 구분하기 위해 각 계층 구조마다 명명이 안 되어 있었는데 이 패턴으로 컴포넌트 계층구조는 명명할 수 있게 됩니다.

```
├── src/
│   ├── style/
│   ├── components/
│   │   ├── molecule/
│   │   ├── organism/
│   │   └── template/
│   └── pages/
└── App.tsx
```

이런 계층 구조를 가질 수 있습니다. 여기서 style 속에 atom에 해당하는 로직을 모두 담아 넣습니다. 가장 큰 범주의 pages는 기존 패턴을 그대로 유지합니다. components에 대한 계층 구조만 3 단계의 폴더로만 표시해줍니다. 컴포넌트에는 다른 독립적인 정리를 해도 괜찮습니다.

### 단점

이런 패턴은 단점도 있습니다.

- 프론트엔드 엔지니어에게 props drilling이라는 고질적인 문제를 만드는 패턴입니다. 하나의 use case를 대응하기 위해 props를 추가하는 경우도 생길지도 모릅니다.

- 또 패턴의 모양이 상속에 가깝습니다. 우리가 추구해야 할 것은 조합니다. 상위의 컴포넌트를 제어해서 하위 컴포넌트를 제어해야 하는 상황이 자주 발생합니다. 객체지향 관점에서 잘못된 설계입니다.

- 코드 결합도가 높아집니다. 제어가 역전된 방식으로 제어할 수 없다면 하위 컴포넌트의 독립성이 없습니다. 원자를 제어하는 것부터 출발해야 page에 특정 폰트를 제어하는 모습을 보게 될 것입니다. 몰론 모든 것을 디자인 시스템에서 가져온 컴포넌트로 구현할 필요는 없습니다.

- 디자이너가 플랫폼 디자인 지식(CSS 지식, 컴포넌트 지식)을 많이 보유해야 합니다.

- 디자인 시스템도 프론트엔드 엔지니어가 다른 다른 프론트엔드 엔지니어의 작업을 전담하는 것으로 줄여주는 것에 불과합니다. 리소스가 어느정도 투자가 필요합니다.

<!-- 하지만 이 디자인 이론은 프론트엔드 엔지니어가 컴포넌트의 관심사를 분리하고 다시 로직을 기준으로 조립한다는 부분에서 지대한 영향을 줬다고 저혼자 주관적으로 생각합니다. -->

## 디자인 시스템에 대해서

정확한 기원은 모릅니다. 하지만 포토샵 혹은 PPT로 작업물을 전달하던 시대에도 있었습니다. 하지만 스케치가 출시된 적용하고자 하는 팀이 많아졌습니다. 컴포넌트가 있었습니다. 하지만 협업이 동시에 실시간 방식이 아니라서 각자 파편화된 시대였습니다. 2022년에 figma는 90% UI/UX를 평정했습니다. figma는 하나의 파일에 동시 편집이 가능했습니다. 그리고 공용 컴포넌트로 협업을 더욱더 효과적으로 하고자 하면서 일반화 되었습니다.

디자인 시스템은 UI에 디자이너 관점에서 브랜딩을 더 정확히 브랜드 아이덴티티를 시각적으로 넣고자 한 것입니다. 개발자 관점에서는 UI 및 View를 체계적으로 관리하려는 수단입니다.

경계해야 할 것은 만능도구가 전혀 아닙니다. 오히려 관리비용이 높습니다. 그래서 폰트, 아이콘, 컬러 정도만 정하고 나머지는 파편화되는 경우가 더 흔합니다. ~~전설에 의하면 탈중앙화 정치신념을 디자인에도 실천하고 싶어서 깬다고 합니다.~~ ~~전체주의자도 정치신념을 실천하기 위해 디자인 시스템 강박으로 컨펌을 안 시켜준다고 합니다.~~ 일부 기업에서는 내부적으로 사용하지 않고 그냥 홍보수단으로 보여주기도 합니다.

디자인 시스템은 사내 제품의 규모가 거대하고 비슷한 부분이 많을 때 그나마 가치가 있습니다. 주로 회사의 코어팀이 담당할 것인데 보통 코어팀은 회사에서 실력이 좋은 개발자들이 상주하는 팀입니다. 하지만 실력이 뛰어난 개발자에게 디자인 시스템을 보수하도록 시간을 지불한다고 보면 비용이 꽤 큽니다. 엄청 많은 팀이 있고 난이도 높고 가치있는 문제를 해결해야 하는데 이 해결이 뒤로 밀리는 것이 비용입니다.

다른 문제 중 하나는 조기 추상화의 문제도 만들어냅니다. 나중에 어떻게 필요할지 모르는데 모르는 시점에 컴포넌트를 만들면서 조기추상화를 하게 됩니다.

<!--
기능 단위로 스프린트에 배정받을 때는 고정적으로 있는 개발자는 핵심 기능만 실력 좋은 개발자이고 나머지 부가적인 부분은 실력없는 개발자가 담당합니다. 가끔 중요할 때
-->

아토믹 디자인은 궁극적으로 buzz word에 불과합니다. 문제를 해결하기보단 문제를 만들 가능성이 높은 방법론입니다. 주목할 것은 제어하기 쉽게 만드는 계층 구조입니다. 그리고 독립적인 관심사와 책임입니다.

<iframe class="codepen" src="https://www.youtube.com/embed/AQwXK8XcXcE" title="🏆 React component props like a senior dev" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

중요한 것 중하는 모든 문제를 `props`로 해결하려고 하지 말기 바랍니다. 일부 프레임워크는 react에 `children`이 있다면 svelte와 vue는 `slot`을 지원해서 제어를 역전시킵니다. 심지어 `named slot`으로 제어역전할 때 관심사도 분리할 수 있습니다. 템플릿과 유기체 수준에서는 제어를 역전해줘야 합니다. 제어를 역전할 요소를 얼마나 많이 둘지 설계를 잘해야 합니다.

[^1]: [atomic design and storybook](https://bradfrost.com/blog/post/atomic-design-and-storybook/)
