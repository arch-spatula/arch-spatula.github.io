---
sidebar_position: 99
description: "npm에 관한 설명"
tags: ["error log", "npm"]
draft: true
---

# npm

node.js를 설치하면 기본적으로 npm도 자동 설치됩니다. node.js라는 런타임을 설치하면 자동적으로 같이 패키지매니저도 설치됩니다.

## 패키지 출시하는 방법

<iframe className="codepen" src="https://www.youtube.com/embed/eh89VE3Mk5g" title="Blazing Fast Tips: Publishing to NPM" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

위 영상은 npm 패키지를 출시하기 위한 팁들만 모아두고 있습니다. 진짜 출시는 없습니다.

## 캐러셀 구현과 디버깅

### 문제: npm 캐러셀 설치 후 받은 피드백

https://trendyol.github.io/react-carousel/docs/installation 이 라이브러리를 설치하고 버그가 발생했습니다. VScode에는 더이상 버그가 없었습니다.

```tsx
import React from "react";
import { Carousel } from "@trendyol-js/react-carousel";

type VideoListProps = {
  title: string;
  list: string[];
};

const VideoList = ({ title, list }: VideoListProps) => {
  return (
    <div className="pt-6">
      <h2 className="text-white text-3xl font-bold mb-3">{title}</h2>
      <Carousel
        show={3}
        slide={1}
        infinite={false}
        rightArrow={<div className="text-white">{">"}</div>}
        leftArrow={<div className="text-white">{"<"}</div>}
      >
        {list.map((item) => (
          <div key={item}>
            <iframe
              className="w-[25rem] h-[14.0625rem] rounded"
              src={item}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default React.memo(VideoList);
```

### 시도: 재설치 그리고 재설치 그리고 검색

1. 삭제 후 git clone하고 재설치해봤습니다. 소용없었습니다.
2. 원래 사용하는 라이브러리와 다른 라이브러리를 사용하기로 했습니다. 이유는 가장 최근 커밋이 6개월 전이었습니다. 하지만 여전히 해결할 수 없었습니다. 원래 사용하던 라이브러리는 nice-react-carousel이었습니다. 하지만 가장 최근 커밋이 2년 전이었습니다.
3. 에러를 복붙하고 검색하기 시작했습니다. hook을 사용한적도 없는데 사용했다는 피드백을 받으니 검색하는 것이 더 효율적이었던 것 같습니다.

https://pimpdevelop.tistory.com/14 이 블로그 글을 읽었습니다.

```sh
escape-hell@0.1.0 /Users/kimsanghyun/Desktop/mainDir/2301/escape-hell
├─┬ @testing-library/react@13.4.0
│ └── react@18.2.0 deduped
├─┬ @trendyol-js/react-carousel@3.0.0
│ └── react@16.14.0
├─┬ react-dom@18.2.0
│ └── react@18.2.0 deduped
├─┬ react-query@3.39.2
│ └── react@18.2.0 deduped
├─┬ react-router-dom@6.7.0
│ ├─┬ react-router@6.7.0
│ │ └── react@18.2.0 deduped
│ └── react@18.2.0 deduped
├─┬ react-scripts@5.0.1
│ └── react@18.2.0 deduped
├── react@18.2.0
└─┬ zustand@4.3.2
  ├── react@18.2.0 deduped
  └─┬ use-sync-external-store@1.2.0
    └── react@18.2.0 deduped
```

커맨드라인에서 이런 아웃 풋을 확인했습니다. 여기서 가장 최근에 설치한 패키지 혼자 `react@16.14.0`인 것을 발견했습니다. 여기까지는 원인만 알게 되었습니다.

다음은 deduped라는 용어를 검색했습니다.

https://stackoverflow.com/questions/52781142/what-is-deduped-in-npm-packages-list

원인을 이해할 수 있게만 되었습니다.

### 해결: peerDependencies 버전 지정

해결은 아래 블로그를 통해서 가능했습니다.

https://egas.tistory.com/49

가장 명료한 답변을 준 블로그입니다.

```sh
npm ls react
```

이 명령으로 의존성 관계를 파악할 수 있습니다. 호환성 문제가 생기면 package.json에 peerDependencies 항목을 추가하도록 합니다.

```json
  "peerDependencies": {
    "react": "^현재버전",
    "react-dom": "^현재버전"
  },
```

저의 경우 `react@18.2.0`으로 지정했습니다. 그리고 재설치를 또 진행했습니다. 그리고 더이상 문제가 없었습니다.

### 학습: npm 다루는 법을 따로 공부할 것

패키지 유지보수가 오랫동안 이루어지지 않으면 발생할 수 있는 문제입니다. 옛날 패키지를 활용하면서 경험하고 해결해봐야할 문제를 해결한 것입니다.

npm 사용법 자체에 대한 학습이 필요합니다. 기초인적인 지식인데 아직도 기초가 없습니다.

# npm outdated

https://www.youtube.com/shorts/VNS6QTcDFQ0

```sh
npm outdated
```

이런 커맨드를 발견했습니다.

# error log

## iframe 성능저하

### iframe의 로딩 속도

```tsx
<ScrollingCarousel className="flex">
  {list.map((item) => {
    return (
      <div key={item} className="mx-3">
        <iframe
          className="rounded h-48 aspect-video"
          src={item}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    );
  })}
</ScrollingCarousel>
```

성능저하 문제가 상당히 컸습니다.

### 시도

https://velog.io/@zuyonze/%EC%9B%B9%EA%B3%BC-%EB%A9%80%ED%8B%B0%EB%AF%B8%EB%94%94%EC%96%B4

검색하고 이런저런 설정을 발견했습니다.

### 해결책

[iframe의 문제점과 HTML에서의 대안](https://pshdev1030.github.io/2022/04/24/iframe%EC%9D%98-%EB%AC%B8%EC%A0%9C%EC%A0%90%EA%B3%BC-HTML%EC%97%90%EC%84%9C%EC%9D%98-%EB%8C%80%EC%95%88/)

```tsx
<ul className="flex flex-row gap-5 overflow-scroll whitespace-normal">
  {list.map((item) => {
    return (
      <li key={item} className="mx-3">
        <embed
          className="rounded h-48 aspect-video"
          src={item}
          type="video/mp4"
          title="Keyboard Cat"
        />
      </li>
    );
  })}
</ul>
```

iframe 대신에 `embed`를 넣었습니다. 하지만 결국 `img` 태그로 해결했습니다.

### 학습

https://stackoverflow.com/questions/16660559/difference-between-iframe-embed-and-object-elements

유스케이스 별로 태그를 각각 다르게 사용합니다. 정적이면 `iframe`, 동적이면 `embed`, 스크립팅이 필요없으면 `object`를 사용합니다.

## unsafe-inline

### 문제: unsafe-inline

발견한 에러메시지입니다.

> Refused to connect to 'https://phjstmgfirncqkoxkjfv.supabase.co/rest/v1/SurveyData' because it violates the following Content Security Policy directive: "default-src 'self' 'unsafe-inline' htt

데이터베이스는 supabase를 사용하고 있었습니다. 프로젝트는 카카오 맵 API를 활용하고 있었습니다.

### 시도: ???

#### supabase 정책 변경

추측이 api 연결부터 시작했습니다. 키는 모두 올바른 것이었습니다.

검색어: `supabase turnoff unsafe-inline`

#### 구글 검색:

검색어: `unsafe-inline`

보안 확인만 해주고 데이터베이스의 보안 정책 문제는 아니었습니다.

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'; style-src 'self'; "
/>
```

["콘텐츠 보안 정책(CSP)"](https://simjaejin.tistory.com/31) 이 블로그에서 발견했습니다.

이런 메타태그 문제라는 것을 발견했습니다.

더 정확히 기본값은 `self`로 설정되어 있습니다. 여기더 정확히 알아야 하지만 전혀 모르겠습니다.

https://velog.io/@taylorkwon92/%EC%98%A4%EB%8A%98%EC%9D%98-TIL CSP 설정이 더 있다는 것을 발견했습니다.

#### chatGPT 질문

> 질문: how can i fix "Refused to connect to [url] because it violates the following Content Security Policy directive: "default-src 'self' 'unsafe-inline' "

> 답변: This error message is indicating that the website you are trying to connect to has a Content Security Policy (CSP) that is preventing you from connecting to it. The specific policy being applied is "default-src 'self' 'unsafe-inline'", which means that the website is only allowing resources to be loaded from the same origin (i.e. the same domain) and is disallowing the use of inline scripts.\n
> To fix this issue, you will need to ensure that any resources you are trying to load on the website are being loaded from the same origin and that you are not using any inline scripts. If you are trying to connect to a third-party resource, you may need to contact the website administrator and ask them to add the resource's origin to the CSP.

### 해결: html 메타태그에서 unsafe-inline 삭제

해결방법은 html에서 unsafe-inline을 지우면 됩니다.

### 학습: 보안도 열심히 공부해야 할 항목입니다.

프론트엔드를 위한 보안 리포를 따로 만들고 정리할지 기술면접에 정리할지 아니면 일반 보안 리포를 따로 만들지 고민입니다.

## tailwind 스크롤바 제거 그리고 가로 스크롤 사용하기

### tailwind에서 스크롤바가 보였습니다.

https://dev.to/derick1530/how-to-create-scrollable-element-in-tailwind-without-a-scrollbar-4mbd

`a`태그는 `inline-block`으로 설정하는 것도 잊지 말아야 합니다.

```css
//global index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
@layer utilities {
  @variants responsive {
    /* Hide scrollbar for Chrome, Safari and Opera */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .no-scrollbar {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
  }
}
```

```html
<div className="w-full h-42 overflow-y-scroll no-scrollbar">...</div>
```
