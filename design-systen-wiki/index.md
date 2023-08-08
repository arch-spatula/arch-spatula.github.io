---
sidebar_position: 1
tags: ['design system', 'intro']
toc_max_heading_level: 6
---

# 디자인 시스템 위키

:::caution 주의

디자이너로 재직하면서 디자인 시스템에 대해서 정리했던 내용을 점진적으로 마이그레이션하는 문서입니다.

<!-- 참고로 storybook.js, bit.js는 안 다룹니다. -->

이 문서는 문제를 해결하는 일렬의 절차를 알려주는 레시피의 모음인 cook book이 아닙니다.

2023년 기준 리액트를 많이 활용할 것입니다. 하지만 리액트와 무관하게 적용가능한 이론을 정리하고 보여주고자 합니다.

<!-- 디자인 시스템은 1.0 버전 이하에 최초 도입은 반대하도록 합니다. 반대로 이미 여러번 구축한 제품들이 있는데 신사업 확장으로 만드는 관점이면 효율적일 수 있습니다. -->

:::

여기는 프론트엔드 엔지니어를 위한 디자인 시스템 위키입니다.

저는 UX/UI 디자이너로 1년 근무했었습니다. 근무하면서 디자인 시스템과 관련된 작업(플랫폼 디자인)을 많이 했습니다. 물론 이런 이유로 신뢰하라는 것은 아닙니다. 프론트엔드 엔지니어가 된 입장에서 디자인 시스템에 대해서 더 조심스러워졌습니다. 좋은 점도 있지만 결합도가 높아진다는 단점도 있습니다.

이 문서는 디자이너와 개발자 사이 커뮤니케이션을 더욱더 원활하게 해주기 위한 자료입니다. 디자이너 혹은 저와 함께 일하는 다른 엔지니어가 그 UI의 이름을 모를 때 활용할 수 있게 만들기 위해 존재합니다.

<!-- https://www.notion.so/5d8eafb6fde4446c8b94dad80c1ea865 -->

## Atomic Design Pattern

원자 - 분자 - 유기체 - 템플릿 - 페이지 단위로 컴포넌트를 개발하는 패턴입니다. bottom up으로 하위 컴포넌트부터 잘 조립해서 만드는 패턴입니다.

그의 이론은 [Atomic Design - by Brad Frost](https://atomicdesign.bradfrost.com/)에서 정리됩니다. 하지만 찾아 읽기 귀찮고 편하게 앉듣는 것 만으로 이해하고 싶은 우리를 위해 제가 핵심 이미지 하나만 선택해서 요약합니다.

![Atomic Design Pattern 요약](https://user-images.githubusercontent.com/84452145/258878023-c46fed80-006e-437f-b2a6-8840f76b1e44.png) 출처: Brad Frost[^1]

이렇게 됩니다. 백문이 불여일견이라고 이정도면 충분합니다.

<!--

<iframe class="codepen" src="https://www.youtube.com/embed/W-h1FtNYim4" title="Atomic Design by Brad Frost—An Event Apart Austin 2015" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

-->

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

## 단점

이런 패턴은 단점도 있습니다.

- 프론트엔드 엔지니어에게 props drilling이라는 고질적인 문제를 만드는 패턴입니다. 하나의 use case를 대응하기 위해 props를 추가하는 경우도 생길지도 모릅니다.

- 또 패턴의 모양이 상속에 가깝습니다. 우리가 추구해야 할 것은 조합니다. 상위의 컴포넌트를 제어해서 하위 컴포넌트를 제어해야 하는 상황이 자주 발생합니다. 객체지향 관점에서 잘못된 설계입니다.

- 코드 결합도가 높아집니다. 제어가 역전된 방식으로 제어할 수 없다면 하위 컴포넌트의 독립성이 없습니다. 원자를 제어하는 것부터 출발해야 page에 특정 폰트를 제어하는 모습을 보게 될 것입니다. 몰론 모든 것을 디자인 시스템에서 가져온 컴포넌트로 구현할 필요는 없습니다.

- 디자이너가 플랫폼 디자인 지식(CSS 지식, 컴포넌트 지식)을 많이 보유해야 합니다.

- 디자인 시스템도 프론트엔드 엔지니어가 다른 다른 프론트엔드 엔지니어의 작업을 전담하는 것으로 줄여주는 것에 불과합니다. 리소스가 어느정도 투자가 필요합니다.

<!-- 하지만 이 디자인 이론은 프론트엔드 엔지니어가 컴포넌트의 관심사를 분리하고 다시 로직을 기준으로 조립한다는 부분에서 지대한 영향을 줬다고 저혼자 주관적으로 생각합니다. -->

[^1]: [atomic design and storybook](https://bradfrost.com/blog/post/atomic-design-and-storybook/)
