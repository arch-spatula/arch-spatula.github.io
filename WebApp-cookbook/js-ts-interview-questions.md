---
sidebar_position: 3
description: '자바스크립트 및 타입 스크립트 면접 질문을 다룹니다.'
draft: true
---

# 자바스크립트 타입스크립트 면접질문

## 브라우저

### 🌟🌟🌟🌟🌟

<details>
<summary>웹페이지가 브라우저에 렌더링되는 과정을 설명해주세요.</summary>
<div markdown="1">

5단계로 렌더링을 처리합니다. 파싱, 스타일, 레이아웃, 페인트, 컴포짓입니다. 1단계는 HTML 파일과 CSS 파일 파싱입니다. 파싱으로 DOM Tree, CSSOM Tree를 만드는 것으로 시작합니다. 2단계는 스타일입니다. HTML과 CSS를 결합하고 Rendering Tree를 만드는 과정입니다. 3단계는 레이아웃입니다. Rendering Tree에서 각 노드의 위치와 크기를 계산하는 과정입니다. 4단계는 페인트입니다. 렌더 트리의 계산된 값을 이용해 각 노드를 화면상의 실제 픽셀로 변환하고, 레이어를 만드는 과정입니다. 5단계는 컴포짓입니다. 만들어진 레이어들을 합성해 화면상 나타나게 됩니다.

</div>
</details>

### ⭐⭐⭐⭐

<details>
<summary>Semantic HTML의 필요성을 예시를 들어 설명해주세요.</summary>
<div markdown="1">

기업 차원에서는 SEO의 우위를 위해 필요합니다. SEO에 더 유리한 이유는 브라우저 정책상 시멘틱 태그를 잘 활용할 때 더 높은 점수를 부여합니다. 또 스크린 리더입장에서는 콘텐츠 유형과 의미를 유추하기 더 쉬워져 웹 접근성을 높일 수 있습니다. 또 프로그래머가 마크업을 읽고 제어할 때 그 의미와 역할 및 관계를 쉽게 유추할 수 있습니다.

```html
<header>
  <div class="logo">
    <img src="logo.png" alt="My Website" />
  </div>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
</header>
```

</div>
</details>

### ⭐⭐⭐

<details>
<summary>position 을 어떻게 사용하는지 알려주세요</summary>
<div markdown="1">

position은 CSS로 레이아웃을 제어할 때 사용할 수 있는 속성입니다. 특정 element를 어디에 위치시킬지 제어할 수 있습니다. relative와 absolute는 같이 사용하는 속성입니다. 자식 컴포넌트에 absolute를 입력하고 부모컴포넌트에 relative를 입력하는 것으로 자식컴포넌트가 부모컴포넌트 기준으로 위치를 갖게 만들 수 있습니다. 많은 경우 modal 컴포넌트에서 닫기에 활용을 많이 합니다. fixed는 스크롤 위치와 무관하게 뷰포트를 기준으로 고정시킬 수 있습니다. 그래서 부모 element와 무관하게 동작합니다. sticky는 fixed처럼 스크롤에 영향을 받지만 부모 element 내에서만 이동하게 됩니다. nav, FAB 같은 컴포넌트에 많이 활용합니다. 마지막으로 static은 위 relative, absolute, fixed, sticky이 4가지가 아닌 것입니다. 특별한 설정하지 않으면 대부분의 element는 static값을 갖습니다.

[A couple of cool things you can do with CSS position sticky](https://www.youtube.com/watch?v=8TyoihVGErI)

</div>
</details>

<details>
<summary>Cookie의 MaxAge, Expires 옵션이 무엇인지, 설정하지 않으면 어떻게 되는지 설명해주세요.</summary>
<div markdown="1">

답변일자: 2023.04.04.

- MaxAge와 Expires Cookie 옵션은 Cookie의 만료를 설정하는 옵션입니다.
  - MaxAge는 초단위로 만료일이 짧아야 할 때 설정하는 옵션입니다.
    - [RFC6265 - Max-Age 4.1.2.2. ](https://www.rfc-editor.org/rfc/rfc6265#section-4.1.2.2)
  - Expires는 날짜 단위로 설정할 수 있습니다. 만료까지 기간이 길 때 활용합니다.
    - [RFC6265 - Expires 4.1.2.1.](https://www.rfc-editor.org/rfc/rfc6265#section-4.1.2.1)
- Cookie의 이런 옵션을 처음부터 설정하지 않으면 브라우저가 닫힐 때 같이 삭제됩니다.
  - 쿠키가 영구적으로 보존되면 그 또한 치명적이기 때문에 의도한 설계입니다.
    - 이 설계는 RFC 6265 명시되어 있습니다.
    - > If a cookie has neither the Max-Age nor the Expires
      > attribute, the user agent will retain the cookie until "the current
      > session is over" (as defined by the user agent).
      >
      > - RFC6265

1. MaxAge 만료기간

```js
// 1시간 뒤에 쿠키가 삭제됩니다.
document.cookie = 'user=John; max-age=3600';

// 만료 기간을 0으로 지정하여 쿠키를 바로 삭제함
document.cookie = 'user=John; max-age=0';
```

- `max-age`가 지나면 Cookie는 삭제될 것입니다.
- `max-age`를 처음부터 0으로 지정하는 것으로 삭제하는 전략도 있습니다.

2. Expires 유효일자

```js
// 지금으로부터 하루 후
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString(); // GMT(Greenwich Mean Time)형식 적용
console.log(date);
document.cookie = 'expires=' + date;
```

- Expires는 `Wed, 05 Apr 2023 06:46:02 GMT`처럼 정확한 만료기준일과 시간을 갖습니다.
  - `요일, 일자 월 연도 시:분:초 GMT`의 형식을 갖고 있습니다.
  - 필요한 문자열의 길이가 더 깁니다.
- Max-Age를 사용할 수 없는 일부 구식 브라우저에서 사용할 수 있습니다.

3. 추가 질문입니다. Max-Age와 Expires 모두 갖고 있으면 어떻게 되는가?

> If a cookie has both the Max-Age and the Expires attribute, the Max-Age attribute has precedence and controls the expiration date of the cookie.

만약 Cookie에 Max-Age와 Expires 속성 모두 보유하고 있으면 Max-Age가 우선 적용됩니다.

3-1. Cookie에 Max-Age를 우선적용하는 이유는 무엇인가?

- Max-Age는 초단위기 때문에 다루기가 더 쉽습니다.
- Expires는 Date 객체를 활용하고 GMT(Greenwich Mean Time)형식을 활용해야 합니다.

4. 그럼 Expires는 왜 사용해야 하는가?

- 구식 브라우저의 하위호환성을 위해 사용해야 합니다.

> NOTE: Some existing user agents do not support the Max-Age
> attribute. User agents that do not support the Max-Age attribute
> ignore the attribute.
>
> - RFC6265 중 4.1.2.2. Max-Age

- RFC6265 명세에 의하면 Max-Age를 활용할 수 없는 구식브라우저 대응을 위해 Expires를 사용해야 합니다.

---

[모던 자바스크립트 튜토리얼 - 쿠키와 document.cookie - expires와 max-age](https://ko.javascript.info/cookie#ref-516)

</div>
</details>

### ⭐⭐

<details>
<summary>`li`요소는 왜 `ul`요소의 자식 요소여야만 하나요?</summary>
<div markdown="1">

답변일자: 2023.04.07.

간단한 대답은 `<ul></ul>` 혹은 `<ol></ol>` 태그로 목록임을 알려주고 자식태그로 `<li></li>`는 개별 항목이라 알려주자는 합의 때문에 그렇습니다. 웹 접근성을 제공하기 위해 활용합니다. `<ul></ul>`은 unordered list의 약자이고 `<ol></ol>`은 ordered list의 약자입니다. 즉 묶음을 의미하고 순서를 표현하고자 할 때만 다릅니다. `<li></li>`은 list item의 약자입니다. 묶음 안에 있는 개별 항목을 의미합니다. 어디까지 시멘틱 마크업을 준수하는 것에 불과합니다. 다른 태그를 삽입해도 정상동작하기는 합니다. 하지만 준수하면 SEO와 웹접근성 또 프로그래머가 코드를 독해 할 때 덜어 줄 수 있는 인지부하가 트레이드오프를 보면 괜찮은 거래입니다.

이제는 더 깊은 답변을 찾아 보겠습니다.

도입할 때 사람들이 목록을 많이 작성하는 것을 아마 발견했을 것 같습니다. HTML도 결국은 문서고 일반 문서에서도 목록을 표현하는 경우도 많으니 타당했을 것 같습니다. `ol`, `ul`, `li` 태그를 도입하면서 목록에 대한 색인작업이 더 쉬웠을 것 같습니다. 검색엔진이 파싱처리하기가 더 숴워 보이기는 합니다. `ul`은 세트를 사용하고 `ol`은 배열 혹은 링크드 리스트로 각각의 `li`를 담아 처리하면 될 것처럼 보입니다.

HTML3.2에 `ol`, `ul`, `li`가 도입되었습니다.`block element` 스펙에 포함되어 있었습니다. 이전까지는 표준이 없어 보이기는 했습니다. 검색하면 나와야 하지만 딱히 보이지 않았습니다. HTML 2.0도 이전부터 존재했었지만 표준이 없었습니다. 브라우저마다 스펙이 다 달랐습니다. 스펙을 통일하면서 시멘틱 마크업이라는 개념을 같이 도입할 때는 HTML3.2부터 였습니다. 거기에 `ol`, `ul`, `li`를 포함했습니다. 시도는 3.0부터인데 스펙을 반영하기 어려웠던 모양입니다.

1. 몇가지 chatGPT로 얻은 흥미롭게 발견한 것들입니다.

HTML3.2 스펙을 정의한 사람들은 Dave Raggett, Arnaud Le Hors, Ian Jacobs, Murray Altheim이라고 말합니다. 사실인지 어떻게 검증해야 할지 모르겠습니다. [HTML3.2 공식문서 스펙](https://www.w3.org/TR/2018/SPSD-html32-20180315/)을 보면 Dave Raggett가 저자라는 것을 확인할 수 있었습니다. 하지만 Arnaud Le Hors, Ian Jacobs, Murray Altheim 도 참여자인지 검증을 못하겠습니다.

위키피디아의 [HTML working group](https://en.wikipedia.org/wiki/HTML_Working_Group)으로 명시해 놓을 것을 확인할 수 있지만 여전히 검증은 아닙니다.

https://www.w3.org/TR/REC-html32 이 링크를 제공해주었지만 https://www.w3.org/TR/2018/SPSD-html32-20180315/ 이 링크로 계속 리다이렉팅 됩니다.

당시 참여자들이 언제 무슨 문제를 발견하고 어떻게 해결하기 위해 `ol`, `ul`, `li` 태그를 지정하고 HTML3.2 스펙에 포함했는지 알고자했습니다. 3.2 버전에 표준을 마련하고 시멘틱 버전도 도입한다는 것을 알아낼 수 있었습니다. 그리고 시멘틱하게 유용한 것도 알겠습니다. 파싱처리도 간단하다는 것도 알겠습니다. 하지만 여전히 모르겠는 것은 누가 목록형이 필요하다고 했는지 그 이유랑 당시 목록형이 없어서 있던 문제는 모르겠습니다. 도입하면서 w3c 기관 내부에서 어떤 논의를 했는지 진행과정도 알 수 없었습니다. 1시간 chatGPT와 구글링으로 알아낼 수 없었습니다.

참고. 3.0 버전에 [ul](https://www.w3.org/MarkUp/html3/bulletlists.html), [ol](https://www.w3.org/MarkUp/html3/seqlists.html)에 스펙이 포함되어 있던 것을 알 수 있었습니다.

---

[HTML - 3.0 스펙](https://www.w3.org/MarkUp/html3/Contents.html)

[HTML - 3.2 스펙](https://www.w3.org/TR/2018/SPSD-html32-20180315/)

[HTML working group](https://en.wikipedia.org/wiki/HTML_Working_Group)

</div>
</details>

<details>
<summary>HTML 의 `inline` 요소와 `block` 요소의 차이점을 설명해주세요. 예시도 들어주세요</summary>
<div markdown="1">

답변일자: 2023.04.07.

inline element와 block element의 차이는 element의 레이아웃입니다. 어디에 어떻게 배치하는가가 다릅니다.

먼저 inline 태그가 등장한 이유는 콘텐츠의 흐름을 방해하지 않고자 했던 것이 의도였습니다.

- `inline`: 한 줄에 여러 요소가 나열될 수 있고, `width`와 `height` 속성을 지정할 수 없으며, `margin`과 `padding` 속성을 지정할 수 없습니다. 대표적인 예시로 `span`, `a`, `img` 등이 있습니다.

- `block`: 새로운 줄에서 시작되고, `width`, `height` 속성을 지정할 수 있으며, `margin`과 `padding` 속성을 지정할 수 있습니다. 대표적인 예시로 `div`, `p`, `h1~h6`, `ul`, `ol`, `li` 등이 있습니다.

- `inline-block`: 한 줄에 여러 요소가 나열될 수 있으면서도 `width`, `height`, `margin`과 `padding` 속성을 지정할 수 있습니다. 대표적인 예시로 `button`, `input`, `textarea` 등이 있습니다.

다음은 제가 codepen에서 발견한 예시입니다.

[Inline vs Block vs Inline-block](https://codepen.io/dasshounak/pen/eYWdEGr)

---

고마워요 chatGPT

</div>
</details>

### ⭐

## 자바스크립트

### 🌟🌟🌟🌟🌟

<details>
<summary>자바스크립트 번들러에 대해서 설명해주세요.</summary>
<div markdown="1">

- 변수명 충돌을 방지해줍니다. 번들러가 없으면 다른 모듈에서 사용한 같은 이름의 변수랑 충돌이 발생할 것입니다.
- 라이브러리에서 사용하지 않는 부분은 포함하지 않습니다. 라이브러리에서 트리쉐이킹으로 사용하는 것만 보냅니다.
  - 이렇게 되면 클라이언트가 받게되는 리소스의 사이즈가 작아집니다.
- 모듈방식을 지원합니다. 자바스크립트 자체는 다른 현대적인 언어들이랑 다르게 번들러를 통해서 모듈을 만들어야 합니다.
- 코드 스프릿팅으로 어플리케이션에서 현재 보고 있는 페이지부터 순서대로 사용자에게 전달합니다. 한번에 많은 데이터를 이동하는 것이 아닙니다.

</div>
</details>

<details>
<summary>Hoisting 이란? TDZ란?</summary>
<div markdown="1">

호이스팅은 자바스크립트 분석과정에서 function 키워드 선언된 함수 식별자와 var 키워드로 정의된 식별자를 모듈 및 함수에서 정의한 위치와 무관하게 참조할 수 있는 현상을 보고 호이스팅이라고 합니다. 호이스팅을 번역하면 끌어올려지다 라는 의미를 갖고 있습니다. 이 의미는 사람이 코드를 읽을 때 특정 식별자가 상단으로 끌어올려져서 읽으면 이해가 쉽다고 소개되었기 때문에 붙은 이름입니다. 호이스팅은 위치와 무관하게 참조할 수 있기 때문에 정점이 되고 또 단점이 되기도 합니다. top-level 함수는 function 키워드를 활용하고 내부에서는 화살표함수를 권장합니다.

TDZ는 번역하면 일시적으로 죽은 공간을 의미합니다. const, let으로 선언한 변수 이전에 해당하는 변수를 호출하면 참조 에러를 돌려주는 것을 알 수 있습니다. 호이스팅 현상이 없었고 변수 선언 전에 호출하기 때문에 참조할 변수가 없어서 발생한 에러입니다. es6 문법으로 변수를 선언하기 전까지의 공간은 TDZ에 해당합니다.

https://ui.toast.com/weekly-pick/ko_20191014

</div>
</details>

<details>
<summary>배열, 객체를 const로 선언했는데 요소나 속성을 추가할 수 있는 이유에 대해서 설명해주세요</summary>
<div markdown="1">

답변일자: 2023.04.03.

const는 할당한 식별자에 대한 재할당 즉 갱신만 막히기 때문에 가능합니다. 먼저 자바스크립트에서 생성하는 배열과 객체는 매번 생성할 때마다 모두 싱글튼 패턴입니다. 즉 고유합니다. 그리고 이 고유한 배열과 객체가 const로 선언된 식별자에 할당되어 접근하는 방식입니다.

```js
const arr = [];
const obj = {};
```

이렇게 선언하면 `[]`, `{}`은 리터럴 생성입니다. 즉 Map과 Set처럼 생성자함수 즉 클래스를 통하지 않고 해당하는 인스턴스를 생성할 수 있습니다. 그리고 이 인스턴스는 모두 고유합니다.

```js
const num = 1;
num = 2; // 에러가 발생
```

이렇게 했을 때 에러가 발생하는 이유는 원시형을 재할당할 때는 새로운 메모리주소를 바라보고 있기 때문입니다.

```js
const arr = [];
arr[0] = 1;
arr[1] = 2;
```

arr 식별자가 바라보는 참조형인 배열은 그대로이지만 배열이 담고 있는 자료만 갱신이 되는 것입니다. 자바스크립트에서 const, let은 식별자가 할당하고 있는 메모리주소의 갱신여부만 제어합니다. 또 참조형은 안에 무엇을 추가, 삭제, 갱신 같은 mutation을 가해도 참조형의 메모리 주소는 동일하기 때문에 문제가 없습니다. 이 말을 쉽게 풀면 let과 const가 어떤 참조형을 다룰 때는 어떤 그릇을 바라봐야 하는지 고정할지 말지만 정하고 안에 무엇이 담길지는 제어할 수 없습니다.

안에 있는 숫자형은 원시형으로 분류되고 각 원시형에 대한 식별자는 배열의 인덱스 객체의 키가 해당합니다.

참고로 읽기 전용으로 참조형을 다루어야 할 때가 있습니다. 특히 함수형 프로그래밍을 지향하고 있으면 원본 데이터에 대한 mutation을 주의할 것입니다.

```js
const arr = [1, 2, 3];
Object.freeze(arr);
arr.push(4);
```

이렇게 작성하면 코드가 정상적으로 에러를 돌려줍니다. 참조형을 readonly가 되게 만듭니다.

</div>
</details>

<details>
<summary>this 가 동작하는 원리와 용법을 아는대로 설명해주세요. 평소 코드 중에서는 어떤 부분에서 가장 큰 차이가 생기나요?</summary>
<div markdown="1">

답변일자: 2023.03.31

`this`는 호출하는 객체에 따라 달라집니다. 자바스크립트는 프로토타입 기반 언어입니다. 모든 것이 프로토타입입니다. 모든 것이 프로타입이기 때문에 모든 함수는 사실 메서드입니다. 문법을 보면 단순히 함수를 실행한 것 같지만 전역객체의 메서드로서 실행된다는 것이 생략되어 있습니다. 그리고 이 전역 객체의 메서드로 호출 되었을 때를 주의해야 합니다.

```js
function f1() {
  return this;
}

// 브라우저
f1() === window; // true

// Node.js
f1() === global; // true
```

이 경우 생략된 전역객체의 메서드로 실행된 것입니다.

```js
function f2() {
  'use strict'; // 엄격 모드 참고
  return this;
}

f2() === undefined; // true
```

엄격 모드를 활성화하면 정상적으로 undefined를 바라보게 됩니다.

먼저 실행 컨텍스트라는 것이 있는데 함수를 호출하는 주체인 객체 따라 다르게 this를 할당하기 때문입니다. 하지만 이 this가 할당 될 객체는 call, apply, bind로 제어하는 것도 가능합니다. 이런 메서드를 활용해서 DOM 조작을 하면서 얻는 유사배열객체에 배열메서드를 활용하는 것도 가능합니다.

참고로 실행 컨텍스트란 자바스크립트 코드를 실행하기 위해 제공할 환경 정보들을 모아놓은 객체입니다. 코드를 실행하는데 자바스크립트 코드가 실행하고 있는 동안의 맥락에 실행되는 방식을 좌우한다는 말입니다. this의 경우 호출하는 주체가 어느 객체인지에 따라 맥락이 결정된다는 의미입니다.

`평소 코드 중에서는 어떤 부분에서 가장 큰 차이가 생기나요?`에 대한 답의 의미를 잘 파악하기 어렵습니다. 다른 언어처럼 정의한 위치에서 this 혹은 self가 결정된 다는 것을 질문하는 것인지 모르겠습니다.

</div>
</details>

### ⭐⭐⭐⭐

### ⭐⭐⭐

<details>
<summary>브라우저 저장소에 대해서 차이점을 설명해주세요(local storage, session storage, cookie)</summary>
<div markdown="1">

브라우저에서 이용할 수 있는 저장공간인 웹 스토리지가 있습니다. 웹 스토리지 객체의 특징은 쿠키보다 저장공간이 큽니다. 웹 스토리지는 origin를 참조합니다. origin이 다르면 접근할 수 없습니다.

웹 스토리지는 2가지 종류가 존재합니다. 하나는 로컬스토리지 다른 하나는 세션 스토리지입니다. 로컬 스토리지의 경우 인증과 무관한 정보를 JSON 형식으로 임시저장할 때 많이 활용합니다. 예를 들어 설문 조사를 진행하던 중 중간에 인터넷이 끊겨 입력한 자료를 잃을 수 있습니다. 이렇게 정보를 잃는 것을 방지하기 위해 로컬 스토리지에 저장시키는 전략이 있습니다.

반면 세션스토리지는 사용자의 세션과 관련된 정보를 저장합니다. 주로 사용자의 로그인 상태, 결제 진행단계 같은 정보를 저장합니다. 하지만 세션 스토리지는 세션정보를 보관하지만 브라우저가 종료되면 삭제됩니다. 이것은 보안 문제입니다. 다른 사용자가 같은 컴퓨터를 접근했을 때 세션이 남기면 안 됩니다.

쿠키는 웹 스토리지 객체가 아닙니다. 하지만 웹 스토리지는 맞습니다. HTTP header에 포함되어 서버에 자동으로 전송됩니다. 그리고 쿠키는 서버에서 생성해서 클라이언트가 저장하도록 합니다.

만약 개념적인 편의상 분류를 해야 한다면 로컬 스토리지와 세션 스토리지는 웹 스토리지 객체이지만 쿠키는 웹 스토리지 문자열이라보 볼 수 있습니다.

https://ko.javascript.info/localstorage

<details>
<summary>왜 쿠키는 document에서 접근해야 하고 localStorage와 sessionStorage는 Window에서 접근해야 하는가?</summary>
<div markdown="2">

```js
// 쿠키를 접근하는 방법
const cookieValue = document.cookie;
console.log(cookieValue);
```

```js
// 웹 스토리지 객체를 읽는 방법
localStorage.getItem('username');
sessionStorage.getItem('token');
```

이런 차이가 발생하는 이유는 자원생성의 주체의 문제입니다. 쿠키의 경우 서버가 페이지와 함께 전달합니다. 하지만 스토리지의 경우 서버로부터 데이터를 받기는 하지만 받은 데이터를 클라이언트가 받은 자바스크립트로 저장해야 합니다.

</div>
</details>

</div>
</details>

<details>
<summary>require와 import차이점을 설명해주세요. 각각 어떤 상황에서 쓸 수 있나요?</summary>
<div markdown="1">

답변일자: 2023.04.03.

require는 commonJS A.K.A. CJS로 es6이전 혹은 node.js에서 모듈을 가져올 때 사용하는 문법입니다.

import는 ES module A.K.A. ESM으로 es6 문법을 지원하고 주로 브라우저에서 많이 활용합니다.

문법적으로 비교를 해볼 수 있습니다.

```js
const foo = require('bar');

function baz() {
  return 'qux';
}

module.exports = {
  baz,
};
```

```js
import foo from 'bar';

function baz() {
  return 'qux';
}

export { baz };
```

일단 ESM이 더 간결합니다.

각각 상황은 브라우저와 서버 런타임에 따라 다릅니다. 런타임마다 각각 필요한 것이 다릅니다. 먼저 CommonJS는 동기적으로 동작합니다. 모든 모듈을 불러오는 작업을 해야 합니다. 또 Node.js는 실질적으로 싱글쓰레드이기 때문에 다른 작업을 못합니다. 동기적으로 모든 파일을 가져오는 방식으로 동작합니다. 여기서 파악할 수 있는 것은 서버를 처음 작동시킬 때는 느리더라고 계속 동작하고 있으면 크게 상관없습니다.

ESM은 CJS와 다릅니다. ESM은 클라이언트에서 동작을 고려하고 만들어졌습니다. 비동기적인 단계를 거처 동작합니다. 첫 단계에는 import, export 문을 찾기 위해 실행은 안 하고 파싱만 합니다. 파싱을 하는 동안에 named imports의 오타를 감지할 수 있습니다. 파싱 단계 이후 ESM는 비동기적으로 import한 스크립트를 다운로드하고 파싱합니다. 그리고 스크립트로 import한 스크립트를 계속 다운받습니다. 의존성 그래프를 더이상 import할 스크립트가 없을 때까지 다운받고 파싱합니다. 의존성 그래프를 그리는 단계 이후부터 자바스크립트를 실행할 수 있게 됩니다.

ESM은 정적분석이 쉬운 장점이 있습니다. 또 의존성 그래프를 그리기 때문에 tree-shaking이 더 쉽습니다.

---

[CommonJS와 ESM에 모두 대응하는 라이브러리 개발하기: exports field](https://toss.tech/article/commonjs-esm-exports-field)

[rnfltpgus - require VS import 문법 비교](https://rnfltpgus.github.io/knowledge/require-import/)

[stackoverflow - Is there any performance difference in ES modules vs Common JS modules in NodeJS servers?](https://stackoverflow.com/questions/71780629/is-there-any-performance-difference-in-es-modules-vs-common-js-modules-in-nodejs)

[DevCHA - CommonJs와 ECMAScript Modules(ESM)](https://velog.io/@runprogrmm/CommonJs%EC%99%80-ECMAScript-ModulesESM)

[저자: Dan Fabulich, 역자: yceffort 번역:CommonJS와 ES Modules은 왜 함께 할 수 없는가(Node Modules at War: Why CommonJS and ES Modules Can’t Get Along)?](https://yceffort.kr/2020/08/commonjs-esmodules)

<details>
<summary>왜 Node는 CommonJS로 활용해야 하는가?</summary>
<div markdown="2">

귀찮음 때문입니다. import 문으로 바꾸는 수고를 거칠 수 있지만 현재를 안주할 수 있습니다. 서버의 성능을 개선하기 위해 ESM으로 개선해도 차이는 미비합니다. 파일을 불러오는 작업만 끝나면 되기 때문에 큰 문제는 아닙니다. 컨벤션과 하위호환성 문제도 있어 보입니다. 규모가 거대한 코드베이스를 리팩토링하는 수고도 클 수 있습니다.

</div>
</details>
<details>
<summary>import 위에 코드를 작성할 수 있는가?</summary>
<div markdown="2">

제가 실험을 해봤습니다. 결론은 가능합니다. 런타임은 상관없습니다. 하지만 컨벤션은 깨지맙시다.

```js
const obj = { a: 1, b: 2 };

export { obj };
```

```js
// index.js
const a = 23;
import { obj } from './test';

console.log(obj, 3, window); // {a: 1, b: 2} 3 {window: Window, self: Window, document: HTMLDocument, name: "", location: Location…}
```

브라우저 런타임에서도 에러를 반환합니다. 물론 정확히는 codesandbox의 브라우저 예시를 활용했습니다.

> import in body of module; reorder to top. (import/first) eslint

이런 피드백을 받았습니다. 동작은 하지만 권장하지 않는 것뿐입니다.

```js
// test.js
const obj = { a: 1, b: 2 };

export { obj };
```

```js
// index.js
const a = 1;
import { obj } from './test.js';

const arr = [obj, 3, 2];
console.log(arr);
```

일단 node로 import를 시도했습니다. import보다 높은 곳에서 할당은 가능합니다.

```json
{
  "type": "module"
}
```

하지만 실험을 위해 json을 이렇게 건드려야 합니다. 또 알아야 할점은 codesandbox의 node 환경을 또 활용했습니다.

모두 브라우저와 Node.js 런타임 무관하게 import 위에 코드를 작성해도 정상동작했습니다.

</div>
</details>

</div>
</details>

### ⭐⭐

### ⭐

## 프로그래밍 일반

<details>
<summary>parameter와 argument의 차이에 대해 설명해주세요.</summary>
<div markdown="1">

parameter는 번역하면 매개변수에 해당합니다. 함수가 받는 변수로 어떤 값을 대입받았을 때 함수 내에서 어떻게 처리할지 대수적으로 표현하는 변수입니다.

argument는 번역하면 인자입니다. 함수를 호출하고 대입하는 값에 해당합니다.

https://www.youtube.com/shorts/OMIrZ8G2rBc

</div>
</details>

<details>
<summary>프레임워크와 라이브러리의 차이란 무엇인가?</summary>
<div markdown="1">

프레임워크와 라이브러리의 차이는 다양한 접근이 가능합니다. 제어의 주체로 접근할 수 있고 반제품과 부품으로 접근할 수 있습니다.

먼저 라이브러리입니다. 라이브러리의 제어의 주체는 프로그래머입니다. 프로그래머가 라이브러리를 호출하고 소비합니다. 라이브러리는 특정 종류의 문제만 해결하고 그 외에는 코드를 어떻게 작성해야 하는 의견이 없습니다. 리액트는 공식 문서에서 소개하기로 UI 라이브러리입니다. 그리고 그 이름에 맞게 UI를 만드는 것 이외에 특별한 의견이 없습니다. 상태를 어떻게 관리할지, 스타일링을 어떻게 할지, 통신을 어떻게 처리할지, 라우팅 등... 프론트엔드 엔지니어로서 UI를 생성하는 방식 이외에 모두 결정을 내려야 합니다. 이런 측면에서 부품에 해당합니다. 제품을 완성하기 위해 많은 부품들을 검토가 필요합니다.

프레임워크의 제어의 주체는 프로그래머의 코드입니다. 즉 제어관계가 역전된 것입니다. 프레임워크는 코드를 어떻게 작성해야 하는지 대부분의 경우 의견을 갖고 있습니다. 문제를 어떻게 해결해야 하는지 프레임워크가 대신 정해준 것입니다. Next.js는 리액트 프레임워크에 해당합니다. 라우팅, 통신, 스타일링, 최적화 전략 등... 다양한 부분에서 프레임워크가 대신 정해줬습니다. 즉 몇가지 소수로 결정이 안 된 부분만 결정하고 프로그래머의 코드로 반제품을 완제품으로 만들면 됩니다.

답변에 리팩토링이 필요합니다.

[라이브러리? 프레임워크? 차이점 아직도 모름? 5분 순삭.](https://www.youtube.com/watch?v=t9ccIykXTCM)

모두 다른 프로그래머가 작성한 코드입니다.

라이브러리는 부품이기 때문에 교체하면 문제가 생기면 안 됩니다. 예전에 TOAST UI 텍스트 에디터를 사용했지만 번들 사이즈 때문에 wui textarea로 교체를 했었습니다. 즉 라이브러리를 교체한 것입니다. 하지만 프레임워크를 교체하면 곤란합니다. Next.js와 Remix.js로 교체하면 천문학적인 문제가 발생할 수 있습니다.

<details>
<summary>또 여기서 추가 문제가 있습니다. 그렇다면 API는 무엇인가?</summary>
<div markdown="2">

API를 직역하면 응용 프로그램 인터페이스입니다. 여기서 응용은 다른 사람이 만들어 놓은 것을 소비하게 된다는 의미로 받아 들일 수 있습니다. 그리고 프로그래밍 인터페이스에서 인터페이스는 제어장치라고 생각할 수 있습니다. 프로그래머가 클래스 혹은 함수에 좋은 인터페이스를 만들었다고 하면 소비자 입장에서 제어가 직관적이라는 의미입니다. 즉 프로그래밍 인터페이스는 프로그램으로 제어하기 좋다는 의미입니다. 물론 이것은 상당히 포괄적인 의미에서 API입니다.

하지만 웹, 어플리케이션 등 분야에서는 요청과 응답의 중간다리로 볼 수 있습니다. 통신을 위해 클라이언트가 어떻게 리소스를 요청할지 또 그 요청에 서버가 어떻게 응답할지 정한 약속으로도 볼 수 있습니다.

[[10분 테코톡] 📢 욘의 프레임워크 vs 라이브러리 vs API](https://www.youtube.com/watch?v=_j4u4ftWwhQ)

</div>
</details>

</div>
</details>

<details>
<summary>캐시의 장단점과 어떤 부분에 활용하는지 설명해주세요. 프론트엔드에서 캐시를 사용할 수 있는 2~3가지 영역을 제시해주세요.</summary>
<div markdown="1">

캐시의 장점은 접근 속도가 빠르다는 것입니다. 하지만 저장공간의 사이즈가 작습니다. CPU 내부에 캐시가 위치해있고 가장 최근 요청들을 저장해 놓고 또 요청이 있었을 때 캐시에 있는 데이터를 제공하는 방식으로 동작합니다. 하드웨에서 성능이 좋은 이유는 물리적으로 위치가 가깝습니다. 전기가 이동할 길이가 짧기 때문에 이동하는 시간이 덜 걸립니다. 캐시의 단점은 저장공간의 사이즈입니다. 저장할 수 있는 데이터의 크기가 작습니다. 또 가격도 비쌉니다.

프론트엔드에서 캐시를 사용할 수 있는 3가지 영역들이 있습니다.

첫째는 웹 캐시입니다. 다른 이름은 http 캐시입니다. 서버로 부터 요청 받은 자원들을 저장합니다. 웹 문서, 이미지, 웹 멀티미디어 등... 저장합니다.

둘째는 브라우저에 캐시처럼 활용할 수 있는 공간입니다. 로컬 스토리지, 세션 스토리지가 있습니다. 사용자 인허가와 관련된 데이터는 세션 스토리지를 활용합니다. 하지만 인허가와 무관할 경우 로컬 스토리지를 캐시처럼 활용합닏다. 웹 사이트에서 사용자가 보고 있던 탭, 입력 중이었는데 제출하기 전의 form 등을 저장할 때 많이 활용합니다.

마지막은 실제 메모리입니다. React-Query는 실제로 in-memory에 캐싱을 처리합니다. 하지만 직접 다룰 경우가 가장 없습니다. 물론 React-Query의 Optimistic Updates로 캐시를 갱신하는 것처럼 라이브러리를 통해서는 제어할 때가 많습니다.

[Where does the cache is stored in react-query? #3219](https://github.com/TanStack/query/discussions/3219)

</div>
</details>

<details>
<summary>순수함수란 무엇인가요? 불변성과 사이드 이펙트와 연결하여설명해주세요.</summary>
<div markdown="1">

답변일자: 2023.04.05.

순수함수란 언제든 몇 번이든 실행해도 결과가 같은 함수를 의미합니다. 순수함수는 함수 외부의 영향을 받지않고 또 영향을 주지도 않습니다. 순수함수는 주로 계산만 할 때 활용합니다. 인자는 자유롭게 바뀌어도 문제가 없습니다. 인자가 동일하면 반환도 동일해야 합니다. 즉 외부 영향을 받지도 주지도 않아야 합니다. 즉 계산에 사용한 혹은 인자에 대입한 자료의 원본에 변형이 가해지지 않아야 합니다. 자료의 원본에 변형을 가하지 않는 다는 것은 다른 말로 불변성을 지키는 것입니다. 반면 비순수함수는 동일한 인자를 대입해도 매번 다를 결과를 출력할지도 모르는 함수입니다. 즉 외부 영향을 주는 사이드 이펙트가 있는 함수입니다. 외부 데이터에 직접 변형을 가하기 때문에 불변성을 깨게됩니다.

```js
const arr = [1, 2, 3];

/**
 * @param {number[]} arr
 * @returns {number[]}
 */
function addNum(arr, add = 0) {
  arr.push(add);
  return arr;
}

console.log(addNum(arr, 4)); // [1, 2, 3, 4]
console.log(addNum(arr, 5)); // [1, 2, 3, 4, 5]
console.log(addNum(arr, 6)); // [1, 2, 3, 4, 5, 6]
console.log(arr); //[1, 2, 3, 4, 5, 6]
```

이 코드는 addNum은 사이드이펙트를 발생시키는 함수입니다. 함수의 인자로 대입한 `arr`가 실행될 때마다 변경이 가해집니다. 이런 함수는 비순수함수입니다.

원본 데이터 변형이 가해졌습니다.

```js
const arr = [1, 2, 3];

/**
 * @param {number[]} arr
 * @returns {number[]}
 */
function addNum(arr, add = 0) {
  arr.push(add);
  return arr;
}

console.log(addNum(arr, 4)); // [1, 2, 3, 4]
console.log(addNum(arr, 4)); // [1, 2, 3, 4, 4]
console.log(addNum(arr, 4)); // [1, 2, 3, 4, 4, 4]
console.log(arr); //[1, 2, 3, 4, 4, 4]
```

매번 실행할 때마다 다른 결과가 발생합니다. 사이드이펙트로 외부 데이터에 영향을 주고 그 영향을 준 데이터를 다시 사용하면서 매번 실행할 때마다 다릅니다.

```js
const arr = [1, 2, 3];

/**
 * @param {number[]} arr
 * @returns {number[]}
 */
function addNum(arr, add = 0) {
  const result = [...arr];
  result.push(add);
  return result;
}

console.log(addNum(arr, 4)); // [1, 2, 3, 4]
console.log(addNum(arr, 5)); // [1, 2, 3, 5]
console.log(addNum(arr, 6)); // [1, 2, 3, 6]
console.log(arr); // [1, 2, 3]
```

이 함수는 순수함수입니다. 원본데이터에 변형을 가하지 않았습니다. 즉 사이드이펙트가 발생하지 않는 순수함수입니다.

```js
const arr = [1, 2, 3];

/**
 * @param {number[]} arr
 * @returns {number[]}
 */
function addNum(arr, add = 0) {
  const result = [...arr];
  result.push(add);
  return result;
}

console.log(addNum(arr, 4)); // [1, 2, 3, 4]
console.log(addNum(arr, 4)); // [1, 2, 3, 4]
console.log(addNum(arr, 4)); // [1, 2, 3, 4]
console.log(arr); // [1, 2, 3]
```

사이드이펙트를 가하지 않고 매번 동일한 인자에 동일한 결과를 반환합니다. 사이드 이펙트가 없어서 매번 실행할 때마다 갱신된 값이 아닌 동일한 값을 대입하게됩니다.

일반적으로 최대한 순수함수를 많이 작성하는 방향으로 프로그래밍을 하면 좋습니다. 예측과 테스트하기 쉬운 장점이 있습니다. 하지만 사이드 이펙트가 무조건 안하거나 나쁜 것은 아닙니다. 현실에서 많은 기능을 개발할 때는 사이드 이펙트를 발생시켜야 합니다. 그저 사이드 이펙트를 다룰 때는 관측가능하게 주의를 잘 해주면 괜찮습니다.

</div>
</details>
