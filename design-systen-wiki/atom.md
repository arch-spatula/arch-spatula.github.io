---
sidebar_position: 2
tags: ['design system', 'atom']
toc_max_heading_level: 6
---

# atom

atom의 3가지 핵심은 element는 Typography, Color, Icon입니다. 디자인 시스템에 따라 더 많은 요소들이 추가되는 경우도 많습니다.

이런 atom에 해당하는 element는 디자이너가 정의하는 것과 엔지니어가 정의하는 것이 다를 수 있는 경우도 있습니다. 대표적인 경우가 정렬 관계입니다.

## Typography

굳이 font가 아닌 Typography라고 부르는 이유는 font를 다루는 디자이너만의 체계가 있기 때문입니다. 이 체계를 구현하는 것의 시작은 어렵지 않습니다. ~~어려운 것은 폰트 설치와 최적화입니다.~~

디자이너에게 알려줘야 하는 것은 UI에서는 매번 자간을 체계적으로 제어하기 어렵다는 것을 전달해야 합니다. 특정 부분만을 위해 override하면 나중에 변형하기 번거롭다고 알려줘야 합니다.

```ts title="styles/theme.ts"
const theme = {
  fonts: {
    heading24Regular: `
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 36px;
  `,
    heading24Bold: `
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
  `,
    body16Regular: `
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
  `,
    body16Bold: `
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 28px;
  `,
    caption12Regular: `
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
  `,
    caption12Bold: `
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 20px;
  `,
  },
};
```

위 예시에서 fonts 내에 key value 짝 1개가 font 1개 단위라고 볼 수 있습니다. 여기서 기능(caption, text, paragraph, heading), 번호(기능 중복이 있으면), 사이즈, 무게 등 변수처럼 차이가 발생하는 지점을 명명할 수 있습니다. CSS의 class name은 BEM 혹은 케밥케이스 네이밍의 관습을 유지할지 아니면 케멀케이스 관습을 유지할지는 알아서 선택하도록 두겠습니다.

참고. 좋은 디자이너랑 일해보면 발견할 수 있는 특이한 점 중 하나는 좋은 디자이너일수록 사용하는 font의 개수가 많지 않습니다.

## Color

### 시멘틱

Color는 시멘틱 컬러로 출발하도록 합니다. 보통 브랜드 컬러(없으면 초록으)로 승인을 보여주고 빨간색으로 거부를 보여줍니다. 선택 사항이지만 노랑으로 경고 혹은 주의와 파란색으로 팀 혹은 이유 같은 정보를 표시합니다.

또 디자이너가 브랜딩과 관련된 컬러 시스템을 UI에 적용할 것입니다. 디자이너가 컬러를 선정하는 기준은 웹만의 영역 문제가 아닙니다. 광고 매체, 실물 제품에 대한 패키지, 경쟁사 컬러와 겹치지 않아서 인상을 남기겨야 하는 등 더 많은 요소들이 개입합니다. 이런 이유로 컬러는 가능하면 높은 가변성을 유지하도록 합니다. 가변성이라는 것이 매번 입력하라는 것은 아닙니다.

```ts title="styles/theme.ts"
const theme = {
  colors: {
    red050: '#FEF2F2',
    red100: '#FEE2E2',
    red200: '#FECACA',
    red300: '#FCA5A5',
    red400: '#F87171',
    red500: '#EF4444',
    red600: '#DC2626',
    red700: '#B91C1C',
    red800: '#991B1B',
    red900: '#7F1D1D',
    green050: '#ECFDF5',
    green100: '#D1FAE5',
    green200: '#A7F3D0',
    green300: '#6EE7B7',
    green400: '#34D399',
    green500: '#10B981',
    green600: '#059669',
    green700: '#047857',
    green800: '#065F46',
    green900: '064E3B',
    gray050: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#6B7280',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
  },
};
```

명명할 때 컬러명 뒤에 100단위 숫자로 구분하는 것이 대체로 좋은 전략입니다. 아주가끔 애매하게 50이 필요한 경우가 꽤 많습니다. 또 50부터 900까지 모두 활용하는 경우는 많지 않습니다. 많이 사용하는 컬러만 사용하기 때문에 50부터 600사이 위주로 사용하는 경우가 많습니다.

다크모드 색상 반전이 있을 수 있는 경우 950에서 400까지 활용할 것이라고 수학적으로 예측하게 됩니다. 꼭 그렇지는 않습니다. 디자인은 일관성을 얻기 위해 수학적 기준을 활용하고 다시 이상해보이면 감각으로 맞추는 작업이기 때문에 예상과 다른 논리가 발생하는 지점들이 있을 것입니다.

~~또 회사 다니면서 팀원이 줄여줬습니다.~~

### 접근성

Color는 알아야 하는 지식은 4.5:1 색상 대비 비율을 초과해야 합니다. 이정도는 준수해야 접근성 문제가 발생하지 않습니다. 이 지식이 있는 디자이너는 컬러를 조합할 때 숫자를 활용해서 얼마 이상 차이가 발생하는지 기준을 두는 경우도 있을 것입니다. 개발자는 꼭 그것마저 자동 반영해줄 필요는 없습니다.

<!-- 이러한 접근성 문제는 작게는 잠시 아주 조금 SEO에서 불리해질 수 있거나 극단적이면 장애시민단체에게 소송당할 수 있습니다. -->

<!--

font는 일상적으로 디자이너도 원래 서체(typeface)라고 불러야 하는 것을 알아도 font라고 부르는 경우가 많습니다.

font란 사이즈, 무게, 서체, 행간, 자간에 대한 구체적인 체계가 있습니다.

디자이너는 타이포그레피에 대한 체계를 기준을 잡고 그 이후 의존성을 갖는 레이아웃에 대한 체계를 갖고 또 shape에 대한 체계를 짜는 경우도 많습니다.

-->

<!--
@todo: 구현예시 확보하고 추가하기

## Icon

아이콘은 svg 이미지입니다. 용량이 상당히 작은 편입니다. 그래서 협업전략이 다양하고 프론트엔드가 구현하는 전략도 다양합니다.

제가 회사에서 재직하던 시절에는 [Nucleo](https://nucleoapp.com/)로 공유했습니다. 스타트업 입장에서 구독비용이 꽤비쌉니다.

대안이 되는 전략은 스토리지에 올리기, SVG를 하드코딩 등이 있습니다.

아이콘은 fill, line 2가지 유형이 있을 수 있습니다. 이 유형마다 컬러가 다르게 들어갑니다. 또 badge에 영향을 받는 것까지 설계하는 경우도 있습니다. 또 아이콘은 사이즈별 구분도 있습니다.

-->
