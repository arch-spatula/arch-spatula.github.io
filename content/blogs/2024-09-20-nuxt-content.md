---
title: "nuxtContent로 블로그 마이그레션"
authors: [arch-spatula]
tags: ["nuxt", "nuxtContent", "blog"]
description: "nuxtContent로 블로그를 다시 만드는 과정"
toc_max_heading_level: 5
_draft: true
date: 2024-09-20
---

<!--
NOTE: 글쓰기 단계 - 탈고
-->

# nuxtContent로 블로그 마이그레션

- tl;dr입니다.
  1. 검색과 코드 스니펫은 직접 구현했습니다. 내장기능과 래퍼런스가 있어서 의외로 쉬웠습니다.
  2. 블로그를 극단적으로 단순화하기로 했습니다. 이유는 긴 글을 쓰고 검색을 잘하는 것이 공개자료관리에 유리하기 때문입니다.

## auto tags 추가하기

- 굉장해 엄청나 이런거는 아닙니다. 그냥 태그를 닫을 때 알아서 자동완성하는 기능을 붙인 것입니다.
  - 짤은 나중에 추가하겠습니다.

https://github.com/windwp/nvim-ts-autotag

- 위 래포가 자동완성을 지원해줍니다.

```lua
	{
		"windwp/nvim-ts-autotag",
		ft = {
			"vue",
			"javascript",
			"typescript",
			"jsx",
			"tsx",
		},
		config = function()
			require("nvim-ts-autotag").setup()
		end,
	},
```

- lazy 패키지 매니저 사용하고 있다면 위 코드 그대로 복붙하시면 됩니다.
- 이런 자동완성 혜택으로 생산성을 높이고 말겠습니다.
- 참고로 위에 있는 ts는 타입스크립트가 아니고 treesitter입니다.

### nuxt LSP 이슈

- auto-ts-tag만이 문제는 아니었습니다. 지금 거의다 작성해가는데 nuxt LSP도 설정하고 싶어졌습니다.
- code 복사 버튼이랑 toc 기능도 LSP 없이 구현하기는 했습니다.
- 이런 내용은 nuxt, vue를 위한 neovim 설정 과정으로 따로 옮기도록 하겠습니다.

## 개발자 블로그 프레임워크 마이그레이션

<!--
NOTE: 글쓰기 단계 - 탈고
-->

- 제가 개발자 블로그를 처음 만들때는 개발자가 되겠다는 결심이 들었을 때부터였습니다.
  - 부트캠프를 다니기 전부터 저는 개발자 블로그를 만들려는 시도를 했습니다.
  - 당시에는 [gatsby](https://www.gatsbyjs.com/), [hugo](https://gohugo.io/)로 개발자 블로그를 만들려고 시도했지만 결국 실패했습니다. 이유는 저는 제가 사용하는 기술을 너무 몰랐기 때문입니다. 약간은 이해를 했으면 이야기가 달랐겠지만 저는 제가 사용하는 기술을 너무 몰라 제가 겪는 문제를 제가 해결할 수 없었습니다. 심지어 이런 프로젝트의 목적은 이런 문제를 최소화하는게 목적임에도 불구하고 어려웠습니다. 또 제가 원하는 부분의 컨트롤로 불가능했습니다. 검색 기능과 태그 기능이 이미 있어도 어떻게 응용해야 하는지 전혀 몰랐습니다.
  - 부트캠프가 시작되고 저는 제 자존심에 스크레치가 나게 velog를 사용했습니다. 물론 velog에 훌륭한 개발자들도 있지만 저는 여러 양산형 개발자들 가운데 껴있는게 싫었습니다. 또 부트캠프에서 개발자 블로그 작성을 강제했었는데 강제하다 보니까 필기자료 메모장이 되었습니다. 개발자 블로그는 문제해결을 정리하기 위해 존재해야 하지 누구의 필기자료 저장소가 되어서는 안됩니다. 또 본인이 겪은 문제를 본인이 풀어내면서 본인의 논리력, 학습력 등... 여러 역량을 키워내는 것이 주된 기능입니다.
    - velog에 글을 올리면서 생기는 여러 문제가 있었습니다.
      1. 가끔 발생하는 장애
      2. 어쩌다가 공식문서의 부분을 발췌한 소스코드가 표절처리되는 문제
      3. 수만은 질떨어지고 단순복붙한 글들 사이 파뭍힌 저의 글
  - 부트캠프를 진행하면서 [astro](https://astro.build/)로 개발자 블로그 만들기를 시도했습니다. 당시에는 개발자 블로그를 만들면서 위키를 만들고자 했습니다. 관심사가 그때도 지금도 깊기 전에 넓은 문제가 있었습니다. 위키 기능을 추가하기 어려웠습니다. 더 정확히 번거로운 부분이 많았습니다.
  - 저는 2023년 5월에 [docusaurus](https://docusaurus.io/)로 만든 개발자 블로그를 저의 생일 선물로 줬습니다.
    - 취업을 할 때까지 그리고 취업을 하고 아주 잠시 글을 이어서 작성했습니다.
    - 하지만 하위호환성을 당당히 무시하는 javascrpit 생태계 답게 ~~I love it~~ ~~사실 제가 공식에서 제공하는 마이그레이션 가이드를 잘 확인 안한 것이지만~~ 블로그 빌드가 github에서 실패했습니다. 간단하게 고칠 문제가 같지 않았습니다.
    - 몇달동안 어느정도 정리한 글을 공개할 수 없었습니다.
    - 그래봤자 위키 업데이트한 글 몇개 말고 없었습니다. 다시 제가 공개하는 글들과 수준이 너무 떨어져서 저는 제 블로그에 대해서 다시 생각해봤습니다.
- 기술면접관이 원하는 것은 문제해결입니다. 앞으로 경력있는 신입으로 어느 회사에 이직할 텐데 면접관이 보고 싶은 것은 위키가 아닙니다. 무엇을 알고 있다는 지식은 별로 유용하지 않습니다. 검색과 시간을 통해 익숙해지면 됩니다. 면접관이 정말로 보고 싶은 것은 지금 갖고 있는 지식을 어떻게 활용하는지 그 지식으로 문제를 풀어내는 지혜가 궁금합니다.
  - 이런 결론으로 저는 위키를 옵시디언으로 마이그레이션 해야겠다는 결론이 나왔습니다.
    - 위키는 저혼자 봐야 하는 것입니다. 저의 결점을 세상에 알리면 안됩니다. 나중에 면접관이 된 상황에서도 수준낮은 지원자들이 저의 수준낮은 자료를 보고 지원해도 괜찮다고 착각할 것입니다.
- 글의 수준을 높이고 몇개의 글만 보이도록 바꿔야 합니다. 수준 낮고 남들이 매일 다루는 테크트렌드는 더이상 다룰 필요가 없습니다. 기술 트렌드말고 기술 깊이를 보여줄 수 있어야 합니다.
- 블로그의 하위호환성을 고려하고 싶어졌습니다. 너무 많은 기능을 너무 빠른 시간에 고치기 번거롭고 싶지 않습니다.
- 궁극적으로는 순수 html, css, js에 md, mdx만 받아 블로그를 만들어보고 싶습니다. 변화에 견고한 블로그를 만들고 싶어졌습니다. 저는 제 커리어 기간을 30 ~ 40년을 목표로 가능하면 길게 이어나가보고 싶습니다. 이런 세월의 인고를 버틸 수 있어야 할 것입니다. 더 심하면 은퇴하고 기고활동을 이어갈 때 github은 망해도 저의 블로그는 안 망할 수 있게 만들고 싶습니다. 이것은 저의 니즈입니다.
  - 이렇게 생각하면 역시 튜닝의 끝판왕은 순정인듯 합니다.
  - 지금 수준에서는 마일 스톤은 잠시 nuxtContent를 사용하는 것입니다. 마이너 버전 업데이트 breaking change가 없었으면 합니다.
- 블로그는 수준을 높고 생각이 깊게 필요한 글만 다루고자 합니다. 그렇지 않으면 숏폼처럼 짧고 가치 없는 글을 양산하는 것을 방지하고자 합니다.
- 위키는 회사 기술과 개인 기술로 구분해서 정리하고자합니다.
- 지금 [nuxtContent](https://content.nuxt.com/)를 결정하기 위해서는 꽤나 많은 고난이 있었습니다. 처음에는 [astro starlight](https://starlight.astro.build/)를 사용할지 고려했습니다. 하지만 단점은 사이드바가 강제된다는 점이었습니다. 물론 기본적으로 제공해주는 부가기능이 많아 꽤 많고 좋은 장점들이 있었습니다. 하지만 저는 홈 역할을 할 루트(`/`)에서 검색과 태그 선택으로 필터링을 하고 블로그 내부로 들어오면 그냥 콘텐츠를 보는 극단적으로 단순한 네비게이션을 원했습니다. 이런 과정에서 사이드바는 너무 많은 공간 낭비같았습니다.
- hugo도 검색을 지원하고 태그도 지원했는데 검색과 태그를 같이보는 기능이 없었습니다. 유저는 무엇을 찾고자 할지 원츠가 상당히 구체적인데 이런 욕구를 달성하기 어렵다는 것이 저에게는 곤란한 것 같았습니다.
- 홈에는 레이아웃이 단순합니다. 그냥 검색, 테그, 블로그 포스트 전체 목록이 있는 것입니다.
  - 나중에 부하 문제가 발생하며 그때가서 페이징할 것입니다. 하지만 그전까지는 페이징 안하고 그대로 둘것입니다.

## nuxtContent 시작하기

- 기존 docusaurus를 yarn으로 설치하던 것들을 모두 삭제해야 합니다. 하지만 블로그를 작성했던 마크다운은 살려야 합니다.

https://content.nuxt.com/get-started/installation

```sh
npx nuxi@latest init . -t content
```

- 현재 디렉토리에서 초기화를 해야 합니다.
- 기존에 있던 댓글 기능을 잘 살려야 합니다.
- 참고로 설치를 그냥 진행하고 디렉토리를 옮겼습니다.
  - 이미 블로그에 글을 많이 작성한 사람은 처럼 `npx nuxi@latest init content-app -t content` 명령을 하고 파일과 폴더를 옮기기 바랍니다.
- 옮기면서 주의할 점이 있습니다. 기본적으로 설치해주는 dotfile들도 챙겨야 합니다. 예를 들면 `.gitignore`, `.npmrc` 등... 이런 것은 바로 안 보일 것입니다.
  - 더 이상적인 것은 content-app 디렉토리에 있는 모든 파일과 폴더를 하나 위 경로로 올려주는 것입니다.
  - 저는 neovim 유저답지 않게 마우스로 드레그해서 옮겼습니다. `mv` 커맨드를 사용하는 것도 방법이지만 굳이 하지 않았습니다.
    - 지금까지 사용해볼일이 없어서 잘 모르는 커맨드입니다. 그냥 옮기는 커맨드를 이번에 처음 알게 된 것입니다.

### 기존 댓글 컴포넌트 보존하기

```ts
import React from 'react';
import { useEffect, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

const utterancesSelector = 'iframe.utterances-frame';

/**
 * @see https://younho9.dev/docusaurus-manage-docs-2
 * @see https://docusaurus.io/docs/next/api/themes/configuration#use-color-mode
 * 위 두 자료를 결합해서 블로그의 다크모드를 구현했습니다.
 */

function Comment() {
  const containerRef = useRef(null);
  const { colorMode: utterancesTheme } = useColorMode();

  useEffect(() => {
    const utterancesEl = containerRef.current.querySelector(utterancesSelector);

    const createUtterancesEl = () => {
      const script = document.createElement('script');
      script.src = 'https://giscus.app/client.js';
      script.setAttribute('data-repo', 'arch-spatula/arch-spatula.github.io');
      script.setAttribute('data-repo-id', 'R_kgDOImK9Dg');
      script.setAttribute('data-category', 'General');
      script.setAttribute('data-category-id', 'DIC_kwDOImK9Ds4CUzIZ');
      script.setAttribute('data-mapping', 'pathname');
      script.setAttribute('data-strict', '0');
      script.setAttribute('data-reactions-enabled', '1');
      script.setAttribute('data-emit-metadata', '0');
      script.setAttribute('data-input-position', 'bottom');
      script.setAttribute('data-lang', 'ko');
      script.setAttribute('crossorigin', 'anonymous');
      script.setAttribute('data-theme', utterancesTheme);
      script.setAttribute('data-loading', 'lazy');

      script.async = true;
      containerRef.current.appendChild(script);
    };

    const postThemeMessage = () => {
      const message = {
        type: 'set-theme',
        theme: utterancesTheme,
      };
      utterancesEl.contentWindow.postMessage(message, 'https://utteranc.es');
    };

    utterancesEl ? postThemeMessage() : createUtterancesEl();
  }, [utterancesTheme]);

  return <div ref={containerRef} style={{ marginTop: '3rem' }} />;
}

export default Comment;
```

- 중간에 가졌던 의문이 있는데 지금 제가 작성하는 것처럼 이렇게 키값이 공개되도 괜찮은지 찾아봤습니다.

https://jojoldu.tistory.com/704

- 향로님은 괜찮다고 하는 것 같습니다. 무지성 무비판적인 접근입니다.
- 저는 nuxt를 사용하고 있기 때문에 mount 라이프 사이클에 추가하면 될 것 같습니다. 자세한 응용은 이따 다시 다루겠습니다.
  - 일단 여러분은 보존한다는 것 자체에 집중하기 바랍니다.

## nav 추가

- 대단한 것 없습니다. 블로그를 읽다가 루트로 이동할 수 있으면 그만입니다.

```vue
<!-- app.vue -->
<template>
  <nav>
    <ul>
      <li>
        <NuxtLink to="/">home</NuxtLink>
      </li>
    </ul>
  </nav>
  <div>
    <NuxtPage />
  </div>
</template>
```

- 블로그에 github 프로필을 붙이든 마음데로 하십시오. 중요한 것은 저 `NuxtLink`입니다.
- 스타일도 본인 취향것 알아서 하기 바랍니다.
- 저는 개인적으로 https://hn.nuxt.space/news/1 여기 레이아웃이 마음에 들었습니다.

```sh
Deprecation [legacy-js-api]: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
```

- 특이한 부분은 제가 scss를 추가하면서 발생했습니다.
- https://stackoverflow.com/questions/67631879/nuxtjs-vuetify-throwing-lots-of-using-for-division-is-deprecated-and-will-be
  - 위에서 다루었습니다. 해결책은 2가지입니다. 임시 방편으로 업데이트를 고정하거나 nuxt 설정을 하거나 2가지 중 하나의 선택지를 골라야 합니다.
  - mvp를 가능하면 빠르게 뽑자는 저의 원칙에 입각해 단순한 해결책을 먼저 고르고 다음에 기능 추가를 하는 방식으로 고치고자 합니다.
  - github에는 따로 이슈가 추가 해야 합니다.

https://github.com/nuxt-modules/style-resources

- 반영해야 하는 라이브버리를 확인해보니까 nuxt3도 지원하고 있습니다.

```json
{
  "sass": "~1.32.6"
}
```

- 현재는 `"sass-embedded": "^1.79.1"`이 설치되어 있습니다.

```sh
pnpm add -D sass-embedded

pnpm add -D nuxtjs/style-resources
```

- 저는 위 커맨드로 스타일 관련 설치를 처리했습니다. 뭔가 정석이 아니라는 생각이 들었습니다.

https://nuxt.com/docs/getting-started/styling

- 조금더 근본적으로 처리할 가이드가 있습니다. 다시 package.json에서 지우고 설치하겠습니다.

```ts
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
});
```

- 위 코드에서 `main.css`에 작성하는 css가 전역으로 관리할 css가 됩니다.

```sh
pnpm install -D sass
```

- 하지만 다시 경고 문구가 터미널에 찍히고 있습니다.
- 이 문제는 나중에 다시 해결하겠습니다.

## favicon 변경이 꽤 난해했습니다.

```ts
useHead({
  link: [{ rel: "icon", type: "image/svg+xml", href: "favicon.svg" }],
});
```

- 보통 SPA 갬성으로 index.html을 변경해서 설정할 것 같은데 저는 위 코드를 활용해서 설정했습니다.

## 프로필 이미자 추가하기

- 프로필 이미지를 추가해야 하는가?
  - 적어도 1곳에는 추가하고 싶습니다. 검색할 메인이든 nav 든 프로필은 넣고 싶습니다.

## 메인 페이지

- 저는 `/pages` 폴더에서 `[...slug].vue`를 활용하는 대신에 `index.vue`를 활용하기로 했습니다. 하위에 공용으로 적용하는 로직을 사용안 할 것입니다. 블로그 글을 읽기 시작할 때부터는 검색을 다시 접근할 이유가 없습니다.

```ts
const search = ref("");

/**
 * NOTE: 없으면 전체 선택
 * 클릭하면 로직 실행
 * 없으면 추가하고 있으면 제거하기
 * 0개면 true하고 다음 로직들을 생략
 * 태그가 있으면 블로그 태그 목록 중에 있는 목록만 보여줌
 */
const selectedTags = ref<string[]>([]);
```

- 핵심은 위 2가지 상태입니다. 지금 시점에 검색 필터 기능을 모두 구현한 것이 아닙니다.
- 주의사항들이 있다면 `content/blogs` 폴더로 기존에 작성했던 글들을 모두 이동해야 합니다. 그래야 쿼리할 때 알아먹을 수 있습니다.

## 필터 로직 추가

- 블로그에서 제가 중요시하는 것은 검색입니다. 검색 기능을 찾아보면서 몇가지 잡지식을 줍줍했습니다.
  - 많이 사용하는 검색 유료서비스는 [algolia](https://www.algolia.com/)입니다. 정확히는 부분유료입니다. 하지만 저는 가입이 필요하면 거부감이 강합니다. ~~역시 개발자의 건강한 피해망상~~
  - 하지만 이메일을 통한 도용 대신에 하드웨어 취약점을 제공하고 가입없이 사용할 수 있는 라이브러리도 있습니다. [fusejs](https://www.fusejs.io/)
  - 저는 위 라이브러리를 발견했지만 저는 그냥 키워드랑 태그로 필터정도 할 수 있으면 충분합니다. 그래서 nuxtContent 내부 기능을 활용하기로 했습니다.

```vue
<template>
  <main>
    <input :class="$style.input" v-model="search" />
    <ContentList path="/blogs" v-slot="{ list }">
      <div v-for="blog in list" :key="blog._path">
        <div
          v-if="
            (blog.title?.includes(search) ||
              blog.description?.includes(search)) &&
            (!selectedTags.length ||
              selectedTags?.some((elem) => blog?.tags?.includes(elem)))
          "
        >
          <NuxtLink :to="blog._path">
            <h2>{{ blog.title }}</h2>
            <p>{{ blog.description }}</p>
          </NuxtLink>
          <div v-for="tag in blog.tags">
            <button
              @click="
                () => {
                  const idx = selectedTags.findIndex((val) => val === tag);
                  if (idx === -1) {
                    selectedTags.push(tag);
                  } else {
                    selectedTags.splice(idx, 1);
                  }
                }
              "
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>
    </ContentList>
  </main>
</template>
```

- `v-if`로 그냥 보여주고 말고 여과하고 있습니다.
  - 다시 생각해보니까 `v-show`를 해도될 것 같습니다. 이미 랜더링하고 가려주기만 하면 될 것 같습니다.
  - 지금 로직은 제목 혹은 설명 문구를 기준으로 일치하는 것만 남기고 있습니다.
  - 다음절에서는 만약에 선택된 태그가 1개라도 있으면 선택된 태그가 있는 모든 글들만 남기도록 하고 있습니다.
  - 지금 당장은 태그가 가시적으로 보이지 않을 것입니다.
- 다음 작업은 순서를 정렬하는 것입니다.
  - 문제가 있습니다. 파일 이름은 날짜를 표시하지만 블로그는 `header`에 메타정보는 `date` 속성을 정의하지 않았습니다.

```c
" just filename
:let @+ = expand("%:t")

let @+ = expand("%:t")
```

- 위 커맨드를 활용하는 방법이 있는 것 같습니다. 나중에는 더 효율적인 자동화 방법을 고민해야 겠습니다.
- 결론은 자동화 스크립트가 필요한 것 같습니다. 파일이름을 탐색하고 date 형식이 아니면 에러를 던지도록 만들어야 할 것 같습니다. 그리고 date가 없으면 자동으로 추가해줘야 할 것같습니다.

```ts
import type { QueryBuilderParams } from "@nuxt/content";

const query: QueryBuilderParams = {
  sort: [{ date: -1 }],
};

<ContentList :query="query" path="/blogs" v-slot="{ list }" ></ContentList>
```

- 위처럼 작성하면 끝나는 것 같습니다. 날짜는 최신순으로 자동 정렬됩니다.

## nuxt css modules

https://nuxt.com/docs/getting-started/styling#css-modules

- 문서를 찾아보다가 발견한 것인데 modules css를 지원합니다. 옛날 react 생각납니다. 지나고 보면 modules css가 그렇게 나쁜 선택이 아니라고 생각이 듭니다. 오히려 스타일 격리에 더 유리했던 것 같습니다.
  - 다니고있는 회사의 CSS의 아쉬운 점은 뒤로 하겠습니다.

## draft 숨기기 기능 미동작

https://stackoverflow.com/questions/77170327/nuxtjs-3-generates-draft-content

https://github.com/nuxt/content/issues/1523

https://github.com/nuxt/content/pull/2738

- `_draft: true`으로 설정해야 가려집니다.
- 궁극적으로는 빌드타임에 키를 확인해보고 제외하는 방식을 선택해야 할 것 같습니다.
- 해당 PR이 merge 되기 전입니다. 하나는 nuxtContent를 준수하고 앞에 `_draft` 접두어를 붙이는 방법이 있습니다.
- 다른 방법은 라이프사이클 hook을 제어하는 방법을 알아내고 적용하는 것입니다.
  - 회사에서 vue 쓴다고 nuxt를 알아내는 것이 이 블로그 만들기의 목적은 아닙니다.
  - 차라리 SSR, SSG를 직접 구현하는 방법을 알아내는 것도 가치가 있었을지 모르겠습니다.
- neovim 기능에 전체 바꾸기 기능을 추가해야 할 것 같습니다.
- 이 기능은 내일 이어서 만들고 문제를 해결해보도록 하겠습니다.

## 개발자 블로그 빌드 실패

- 정적리소스만 호스팅할 수 있는 서비스에 배포가 가능해야 합니다.
  - 이럴 때는 pnpm run generate를 통과 시켜야 합니다.
  - 그리고 preview를 봐야 합니다.

```sh
pnpm run generate
```

- 위 명령으로 로컬에서 빌드 시도하고 있었는데 실패하고 있었습니다.
  - 일부 마크다운 작성 형식에 문제가 있었습니다. 그래서 `content/` 디렉토리에서 일부를 `content/` 밖에 다른 폴더로 이동하니까 빌드에 성공했습니다. 문제는 무엇이 잘못된 형식인지 알아내기 어렵다는 점입니다.
- 정적 빌드부터 문제가 있었습니다.
- 잔여 작업 설정이 필요한 것 같습니다. 먼저 정보처리기사에 집중하고 나중에 다시 블로그 만들기위해 컨텍스트 스위칭을 해야 할 것 같습니다.
- 한가지 다행인점은 제가 `dev`에 합치기 전에 발견했다는 것입니다.

## draft 정말로 숨기기

- 여기서 고민은 스크립트 파일을 작성하고 사용하는 것일지 직접 찾아 변경할지 입니다.
- neomvim의 기능을 다시 활용해야 할 것 같습니다. vscode에서 변경을 한다고 했었다면 어떻게 하는지 알았을 것입니다.

https://www.reddit.com/r/neovim/comments/187kdod/search_and_replace_in_multiple_files/

https://stackoverflow.com/questions/70003193/find-and-replace-all-instances-of-specific-string-in-multiple-files-in-vim

- stackoverflow에서 확인한 커맨드가 유용했습니다. 의외로 띄어쓰기 때문에 문제 생길 것이라고 생각했는데 아니었습니다. 약간 아쉬운 점은 code actions로 처리하고 싶었습니다. 거기에 반영하면서 저장하게 만들고 싶었습니다.

## nuxt content에 syntax highlight

```ts
content: {
		highlight: {
			// Theme used in all color schemes.
			theme: "github-dark",
			langs: ["c", "cpp", "java", "lua"],
			// OR
			//theme: {
			//// Default theme (same as single string)
			//default: "github-light",
			//// Theme used if `html.dark`
			//dark: "github-dark",
			//// Theme used if `html.sepia`
			//sepia: "monokai",
			//},
		},

		experimental: {
			search: {},
		},
	},

```

## 다른 거 쓸까?

- 하고 마음 먹으는 것 같다가도 다시 돌아옵니다.
- 애증의 nuxt인지 모르겠습니다.
- https://github.com/nuxt-modules/mdc로 마크다운을 처리한다는 사실을 알게되었습니다.
- 이런면서 css 초기화를 조금 조심스럽게 다뤄야 할 것 같습니다. 이미 있는 스타일에 제가 초기화로 모두 제거하는 꼴이되고 있었습니다.
- 이런 생각을 갖게 된 이유가 잠시 있었습니다. 지금 제가 모든 것을 일일이 스타일링하기 번거롭고 귀찮습니다. 이미 어느정도 만들어져있으면서 유니크한 것을 원했습니다.
  - 결국 유니크한 방법을 찾았습니다. 조금더 정확히 유니크하게 만들어내는 방법을 알아냈습니다.

## nvchad 참고

- 문제가 여전히 있는 부분이 있습니다. MDC의 컴포넌트들이 적용이 안되고 있던 것입니다. nuxtContent 공식문서에서 보이던 컴포넌트를 가져올 수 없었습니다.
- nvchad 스타일을 상당히 부러워하고 있었습니다. 그래서 내부 소스코드를 읽어보면서 이런저런 것들을 발견했습니다.
  - https://github.com/hyrious/github-markdown-css에서 스타일을 참고하고 있었습니다.
    - 스타일링의 잭팟은 여기였습니다.
  - https://unocss.dev/를 사용하고 있었습니다. 확인해보니까 nuxt랑 호환이 가능해보였습니다.

```vue
<ContentRenderer class="markdown-body" :value="doc" />
```

- 제가 마크다운 스타일을 적용하기 위해 중요한 부분은 위에 해당합니다.
- 정말 필요했던 것은 [unocss](https://unocss.dev/)가 아니었던 것 같습니다.

https://hyrious.me/github-markdown-css/

- 위에서 적용한 예시를 모두 보여줍니다.
  - 저의 취향에 맞는 스타일도 찾았습니다.
  - https://github.com/hyrious/github-markdown-css/blob/main/dist/dark_dimmed.css
  - 원래는 라이트 모드만 허용하도록 만들려고 있습니다. 하지만 지금처럼 별로 튀지 않는 컬러가 좋습니다.
  - 기준 너비도 다시 생각하기로 했습니다. 기존에 마음에 들었던 예시를 사용하려고 했는데 아닙니다.
- 바다속 느낌이 별로 안나는 것은 아쉽지만 CSS 많이 안 건드려도 되는 것은 별로 안 아쉽습니다.

### codeblock 복사 버튼

- 다음 문제는 codeblock 복사 버튼입니다. 의외로 많은 문서 사이트에서 제공하는 기능인데 어떻게 구현하는지 정확하게 파악하고 싶습니다.

https://github.com/NvChad/nvchad.github.io

```js
export default (id) => {
  const docContent = document.getElementById(id);
  const preElements = docContent?.querySelectorAll("pre");

  preElements?.forEach(function (preElement) {
    const childDiv = preElement.querySelector("div");
    if (childDiv) return;

    const button = document.createElement("div");
    button.classList = "copyBtn";
    button.ariaLabel = "copy button";

    button.addEventListener("click", function () {
      button.classList = "clickedCopyBtn";

      const content = preElement.textContent;
      navigator.clipboard.writeText(content);

      // reset to old copyIcon after 1s
      setTimeout(() => (button.classList = "copyBtn"), 2000);
    });

    preElement.appendChild(button);
  });
};
```

- 저는 이런 함수를 발견했습니다.
- `clipboard.js` 이름이라고 하는데 clipbard API를 사용하는 것 같습니다.
- 사용법을 보니까 임의로 DOM 요소를 그냥 추가하는 것이었습니다. 그리고 안에 textContent를 복사하는 기능이었습니다.

```vue
<template>
  <template v-slot="{ doc }">
    <article>
      <!-- <h1>{{ doc.title }}</h1> -->
      {{ doc?.tags ?? [] }}
      {{ doc?.authors ?? [] }}
      <ContentRenderer
        id="DocContent"
        class="markdown-body dark_dimmed"
        :value="doc"
      />
    </article>
  </template>
</template>

<script setup lang="ts">
/**
 * 기능 자체는 동작함
 * TODO: 아이콘이 붙게 만들어야 함.
 */
const addBtn = (id: string) => {
  const docContent = document.getElementById(id);
  const preElements = docContent?.querySelectorAll("pre");

  preElements?.forEach(function (preElement) {
    const childDiv = preElement.querySelector("div");
    if (childDiv) return;

    // const button = document.createElement("div");
    const button = document.createElement("button");
    button.classList.add("copyBtn");
    button.ariaLabel = "copy button";

    button.addEventListener("click", function () {
      button.classList.replace("copyBtn", "clickedCopyBtn");

      const content = preElement.textContent ?? "";
      navigator.clipboard.writeText(content);

      // reset to old copyIcon after 1s
      setTimeout(
        () => button.classList.replace("clickedCopyBtn", "copyBtn"),
        2000,
      );
    });

    preElement.appendChild(button);
  });
};
</script>
```

- 위처럼 작성하면 버튼을 추가할 수 있습니다.
- 개인적으로 만족하는 부분 중 하나는 현재 사용하는 라이브러리가 vue 호환성이 좋다는 느낌이 듭니다.

### css로 아이콘 붙이기

- 버튼을 추가한 다음의 문제는 바로 css로 아이콘 붙이기입니다.
- 개인적으로 아이콘을 SVG로 관리 안하고 CSS로 관리하는 행위를 싫어합니다.
  - 보수 작업할 때 아이콘 찾기 귀찮습니다.
  - UI랑 관련 있으면 template 영역에서 찾는게 직관적인데 해당하는 요소를 선택하고 그 요소가 어떤 CSS의 영향을 받는지 확인해야 하는 번거로움이 있습니다.
  - 하지만 블로그를 다시 만드는 지금 시점 현재 직장에서는 그렇게 작업하고 있습니다.

```css
.copyBtn {
  @apply !bg-slate !hover:bg-green3;
  @apply i-uil:clipboard cursor-pointer;
}

.clickedCopyBtn {
  @apply !bg-green-3;
  @apply i-line-md:confirm-circle;
}

/* copy button */
#DocContent pre button {
  @apply rounded-full w-fit h-fit p-0;
  @apply text-slate-5 bg-transparent;
}

#DocContent pre button :hover {
  @apply text-red;
}
```

- 생김새가 이렇습니다.
- 저는 `unocss`도 사용 안하고 위 스타일을 CSS에 적용할지 찾아야 합니다.

```css
body {
  mask: url(public/clipboard.svg) no-repeat center !important;
}
```

- 이런 스타일링으로 어찌저찌 이미지를 넣었습니다. 이미지를 넣을 망식은 꽤 다양합니다. 하지만 마스크가 제일 합리적인 이유가 있습니다. 바로 컬러 제어때문입니다.

```css
/* copy button */
#DocContent pre {
  position: relative;
}
#DocContent pre div {
  width: 36px;
  height: 36px;
  position: absolute;
  border-radius: 4px;
  top: 0;
  right: 0;
  margin: 8px;
}
.copy-warrper {
  width: 100%;
  aspect-ratio: 1 / 1;
}
.copy-warrper:hover {
  background-color: #22272e;
}
#DocContent pre div button {
  all: unset;
  width: 100%;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center center;
}

.copyBtn {
  background-color: #adbac7 !important;
  mask: url(public/clipboard.svg) no-repeat center !important;
}

.clickedCopyBtn {
  background-color: #10b981 !important;
  mask: url(public/clipboard-check.svg) no-repeat center !important;
}
```

- 제가 원하는 스타일은 위 CSS로 이루어졌습니다.
  - hover 했을 때 감싸주고
  - 클릭하면 아이콘이 바뀌고 컬러도 바뀝니다.
- 아이콘은 근본있는 https://tabler.io/ 에서 가져왔습니다.
- 아직 조금 아쉬운 부분이 있습니다. 하나는 pre를 hover하고 있을 때만 보이게 만들고 싶습니다.
- 기존에는 파일이름이 무엇인 다른 위치에 표시되었지만 지금은 못하고 있습니다.

#### hover하는 동안만 아이콘 보이기

- https://stackoverflow.com/questions/5210033/using-only-css-show-div-on-hover-over-another-element

```css
div {
  display: none;
}

a:hover + div {
  display: block;
}
```

- 아마 위를 응용하면 될 것 같습니다. 그렇데 여기서 + 선택자는 무엇인지 궁금합니다.
  - 코드를 보니까 형제선택자였습니다.
  - 저의 경우 자식 선택자로 응용해야 합니다.

```CSS
#DocContent pre:hover > div {
  display: block;
}

#DocContent pre div {
  width: 36px;
  height: 36px;
  position: absolute;
  border-radius: 4px;
  top: 0;
  right: 0;
  margin: 8px;
  display: none;
}
```

#### 가로스크롤 엣지 케이스 처리

- 처리 자체는 했는데 감싸는 태그를 만드는 방법을 발견해서 공유하고자 합니다.

```ts
/**
 * @see https://stackoverflow.com/questions/6838104/pure-javascript-method-to-wrap-content-in-a-div
 */
function wrap(el: Element, wrapper: Element) {
  if (el.parentNode) el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}
```

- 한번 감싸면서 귀찮게 CSS 조절을 해줘야 합니다.
- 하지만 부모요소를 접근하는 법이 무엇이 있나 했는데 있었습니다.
- 저의 codecopy 기능은 이제 견고합니다. ~~아마도?~~

## 전체 tag 목록과 개수 보여주기

<!--
NOTE: 글쓰기 단계 - 초고
TODO: 스크린샷 추가
-->

- 스크린샷은 귀찮아서 지금은 생략합니다.

```vue
<script lang="ts" setup>
const tags = ref<Map<string, number>>(new Map());

await queryContent("blogs")
  .find()
  .then((res) => res.map((elem) => elem?.tags))
  .then((res: string[][]) => {
    res.forEach((elems) => {
      elems.forEach((elem) => {
        if (tags.value.get(elem)) {
          tags.value.set(elem, tags.value.get(elem) + 1);
        } else {
          tags.value.set(elem, 1);
        }
      });
    });
  });
</script>

<template>
  <div :class="$style['tag-warpper']">
    <button :class="$style['button-tag']" v-for="tag in tags">
      {{ tag[0] }} {{ tag[1] }}
    </button>
  </div>
</template>
```

## 이전글 다음글 이동

<!--
NOTE: 글쓰기 단계 - 초고
TODO: 스크린샷 추가
-->

- 이 기능은 nuxtContent의 hook에 의존해야 합니다.
  - https://content.nuxt.com/document-driven/use-content
- 공식문서에서 디렉토리와 현재 페이지 목록을 알아낼 수 있는 방법을 찾았습니다.
  - 더 우아한 방법은 useContent hook을 사용하는 것입니다. 그렇게 되면 알아서 모두 사용할 수 있었을 것 같습니다.
  - 저는 사용할 수 없어서 다른 방법으로 우회했습니다.
    - https://content.nuxt.com/composables/use-content-helpers

```ts
const route = useRoute();
const { navPageFromPath, navDirFromPath } = useContentHelpers();
const { data: navigation } = await useAsyncData("blogs", () =>
  fetchContentNavigation(),
);

type PageItem = {
  title: string;
  _path: string;
  _draft?: boolean;
};

const prevPage = ref<{ title: string; _path: string } | null>(null);
const nextPage = ref<{ title: string; _path: string } | null>(null);

const page = navPageFromPath(route.path, navigation.value);

for (let idx = 0; idx < navigation.value[0]?.children.length; idx++) {
  const elem = navigation.value[0]?.children[idx] as PageItem;
  let prev: null | PageItem = null;

  if (idx === 0) prev = null;
  else prev = navigation.value[0]?.children[idx - 1] as PageItem;

  let next: null | PageItem = null;
  if (idx === navigation.value[0]?.children.length - 1) next = null;
  else next = navigation.value[0]?.children[idx + 1] as PageItem;

  if (elem?._path === page?._path) {
    if (prev) prevPage.value = { title: prev.title, _path: prev._path };
    else prevPage.value = null;
    if (next) nextPage.value = { title: next.title, _path: next._path };
    else nextPage.value = null;
    break;
  }
}
```

- 위 단순한 선형 순회로 해당하는 페이지 전후로 찾습니다.

```vue
<NuxtLink v-if="prevPage?._path" :to="prevPage?._path">
  <div>{{ prevPage.title }}</div>
</NuxtLink>
<NuxtLink v-if="nextPage?._path" :to="nextPage?._path">
  <div>{{ nextPage.title }}</div>
</NuxtLink>
```

- 위처럼하면 페이지 전후 접근이 가능합니다. 이제 스타일링 남았습니다.

## 기존 댓글 컴포넌트 복구

<!--
NOTE: 글쓰기 단계 - 초고
TODO: 스크린샷 추가
-->

- 위에서 다시 돌아온다고 했습니다. 지금 여기서 다시 댓글 기능을 구현하겠습니다.

```vue
<template>
  <div ref="comment"></div>
</template>

<script setup lang="ts">
const comment = useTemplateRef("comment");

const utterancesSelector = "iframe.utterances-frame";
// ligth, dark, github-light, github-dark, dark_dimmed
const theme = "dark_dimmed";

onMounted(() => {
  const utterancesEl = comment.value.querySelector(utterancesSelector);
  const createUtterancesEl = () => {
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "arch-spatula/arch-spatula.github.io");
    script.setAttribute("data-repo-id", "R_kgDOImK9Dg");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOImK9Ds4CUzIZ");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-lang", "ko");
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-loading", "lazy");

    script.async = true;
    comment.value.appendChild(script);
  };

  const postThemeMessage = () => {
    const message = {
      type: "set-theme",
      theme: theme,
    };
    utterancesEl.contentWindow.postMessage(message, "https://utteranc.es");
  };

  utterancesEl ? postThemeMessage() : createUtterancesEl();
});
</script>
```

- 기존 코드를 vue에 맞게 수정을 했습니다. 그리고 모드 전환을 제공하지 않을 예정이라 그냥 다크모드로 제공하려고 합니다.
- 취미로는 무시해도 되고 직업적으로 무시하기 곤란한 404가 보였습니다. 라이브러리 영역에서 발견한 코드이고 이 코드를 조금 더 우아하게 처리하는 방법이 있을까? 고민이 되었습니다.
- 몇가지 발견한 것이 있습니다. 컴포넌트 레포가 있었습니다.
  - https://github.com/giscus/giscus-component
  - 기존 컴포넌트를 다시 참고 자료를 활용해서 다시 만들고자 합니다.
  - 설치하든 다시 만들든 에러를 우아하게 catch 할 방법을 모르겠습니다.
  - 라이브러리 내부에서 요청을 처리하는 것 같은데 제어할 방법을 모르겠습니다. 나중에 알게되면 추가하겠습니다.

### 여기서 포기하지 않기

- 여기서 포기하려다가 샤워하면서 생각났습니다. 결국 CDN으로 받고 코드를 브라우저로 받으면 원본 소스코드가 있다는 것입니다.
- 핵심 부분만 fork 뜨면 저는 제가 원하는 방식으로 제어가 가능해집니다.
  - 공식 [giscus](https://github.com/giscus/giscus)레포를 보고 요청을 날리는 핵심 부분을 찾으면 됩니다.
  - 또 래포를 로컬에 다운 받고 에디터로 돌아 다녀야 합니다.

## DIY로 만드는 TOC

<!--
NOTE: 글쓰기 단계 - 초고
TODO: 스크린샷 추가
-->

```ts
const route = useRoute();

const { data } = await useAsyncData(
  `${route.path}`,
  queryContent(`${route.path}`).findOne,
);
```

- 시작은 이렇게 하겠습니다. 현재 보고 있는 페이지에서 AST를 접근할 수 있습니다.

```ts
data.value.body.children.forEach(
  (element: { tag: string; props: { id: string } }) => {
    switch (element.tag) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        console.log(element.props.id);
        break;
      default:
        break;
    }
  },
);
```

- 다행인 점은 사실상 배열입니다.
- 아쉬운 부분은 TOC 속성이 있는데 `data.value.body.toc`로 heading을 접근할 수 있습니다. 단점은 h2 만 접근할 수 있습니다. 그 아래 depth까지 접근을 안합니다. `nuxt.config.ts`를 편집해도 결과가 같습니다.

```ts
const toc = ref<{ heading: string; depth: 1 | 2 | 3 | 4 | 5 | 6 }[]>([]);

data.value.body.children.forEach(
  (element: { tag: string; props: { id: string } }) => {
    switch (element.tag) {
      case "h1":
        toc.value.push({ heading: element.props.id, depth: 1 });
        break;
      case "h2":
        toc.value.push({ heading: element.props.id, depth: 2 });
        break;
      case "h3":
        toc.value.push({ heading: element.props.id, depth: 3 });
        break;
      case "h4":
        toc.value.push({ heading: element.props.id, depth: 4 });
        break;
      case "h5":
        toc.value.push({ heading: element.props.id, depth: 5 });
        break;
      case "h6":
        toc.value.push({ heading: element.props.id, depth: 6 });
        break;
      default:
        break;
    }
  },
);
```

- 이렇게 해서 로직을 구현하는 부분은 단순했습니다.
- 안 단순한 부분은 스타일링입니다.

```vue
<template>
  <div :class="$style['toc-warpper']">
    <div v-for="item in toc">
      <NuxtLink
        :class="$style['heading-link']"
        :to="`#${item.heading}`"
        :style="{ padding: `0 0 0 ${(item.depth - 1) * 24}px` }"
        >{{ item.heading }}</NuxtLink
      >
    </div>
  </div>
</template>
<style module>
.toc-warpper {
  position: fixed;
  top: 96px;
  left: calc(50vw + 464px);
  z-index: 0;
}

.heading-link {
  color: #444c56b3;
  text-decoration: underline;
  font-size: 16px;
  line-height: 1.5;

  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
}
.heading-link:hover {
  color: #478be6;
}
</style>
```

- 스크롤하면서 따라와야 합니다.
- 오른쪽에 위치해야 글에 더 집중하기 쉬워집니다.
- 링크 비슷하게 보여야 합니다.

## github actions

<!--
NOTE: 글쓰기 단계 - 아이디어
-->

- 2가지 actions를 수행해야 합니다. 하나는 commit push 마다 빌드 시도를 해야 합니다. 다른 하나는 main에 merge가 되면 빌드한 파일을 배포해야 합니다.
- 마지막 이부분의 작업 방식은 기존 작업이 끝나면 PR을 천천히 올리고 합치는 방식에서 자주 PR을 올리거나 커밋을 바로 하는 방식으로 전환했습니다.

### 공식 문서 확인

- https://nuxt.com/deploy/github-pages 여기 자료를 먼저 활용하기로 했습니다.

```yml
name: Deploy to GitHub Pages
on:
  workflow_dispatch:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: corepack enable
      - uses: actions/setup-node@v3
        with:
          node-version: "20"
      # Pick your own package manager and build script
      - run: npm install
      - run: npx nuxt build --preset github_pages
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./.output/public

  # Deployment job
  deploy:
    # Add a dependency to the build job
    needs: build
    # Grant GITHUB_TOKEN the permissions required to make a Pages deployment
    permissions:
      pages: write # to deploy to Pages
      id-token: write # to verify the deployment originates from an appropriate source
    # Deploy to the github_pages environment
    environment:
      name: github_pages
      url: ${{ steps.deployment.outputs.page_url }}
    # Specify runner + deployment step
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- 위는 공식 문서가 보여준 `yml`입니다. 꽤 긴 코드입니다.
- 모르는 것을 순서대로 확인하고 질문해야 합니다.
  - `on:`은 실행 시점을 제어하는 키워드로 보입니다.  
    - `main` 브랜치에 `push`되면 실행하는 것 같습니다.
    - https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#on
    - github 공식 문서를 확인하면 꽤 다양한 실행 조건을 알아낼 수 있었습니다.
  - `jobs`는 수행할 작업들인 것 같습니다.
    - `build`, `deploy` 2단계로 나누는 것 같습니다.
    - `runs-on: ubuntu-latest`은 실행하는 운영체제 같습니다. 최신은 뭐 보안취약점을 극복할지도 모르고 만들지도 모릅니다.
    - `steps:`가 난해합니다. 수행하는 작업과 사용할 설정들 같습니다. `uses:` 키워드를 사용한다고 하는데 사용이라는 점에서 직관적입니다. 하지만 각각의 `uses:`의 값은 무엇을 설정하고 사용한다는지 모르겠습니다.
    - `actions/checkout@v3`, `actions/setup-node@v3`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`
- 정말 필요한 것은 아마 테스트 레포였던 것 같습니다.
  - https://www.daleseo.com/github-actions-checkout/을 보니까 이렇게 시도를 해볼 생각을 안했습니다.
- https://pnpm.io/continuous-integration 에서 CI 설정을 발견했습니다.

```yml
name: pnpm Example Workflow
on:
  push:

jobs:
  build:
    runs-on: ubuntu-22.04
    strategy:
      matrix:
        node-version: [20]
    steps:
    - uses: actions/checkout@v4
    - name: Install pnpm
      uses: pnpm/action-setup@v4
      with:
        version: 9
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'pnpm'
    - name: Install dependencies
      run: pnpm install
```

- 워 코드를 보고 응용하면 될 것 같습니다.

### actions란 무엇인가?

- 저는 github에서 잘 모르는 부분 중 하나는 github actions입니다.
  - 이런 상황에서는 무엇을 모르는지 정리해야 합니다.
  - `uses: actions/checkout@v3`은 무엇을 의미하는지 모르겠습니다. 무슨 node 버전을 갖고 있는지 무슨 pnpm 버전을 갖고 있는지 어떻게 알 수 있는지 알아내야 합니다. 
  - `actions/setup-node`안에 무엇이 들었는지도 모르겠습니다.

```sh
npx nuxt build --preset github_pages
```

- 이 명령을 로컬에서 시도해봤습니다. 문제가 전혀 없었습니다.
- 저는 이명령을 활용해서 기존 `Test deployment`를 대체하고자 합니다.
  - 응용을 하면 테스트용도로 `jobs`에서 `build`만 남기고 기존 main에 PR에 실행하는 액션만 유지하면 될 것 같습니다.


```yml
name: Test deployment

on:
  pull_request:
    branches:
      - main

jobs:
  test-deploy:
    name: Test deployment
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: yarn

      - name: Install dependencies
        run: yarn install --frozen-lockfile
      - name: Test build website
        run: yarn build
```

```yml
name: Test deployment

on:
  pull_request:
    branches:
      - main

jobs:
  test-deploy:
    name: Test deployment
    runs-on: ubuntu-latest
    steps:
        uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        name: Install pnpm
        with:
          version: 9
          run_install: false

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Test build website
        run: pnpm generate
```

- 위처럼 하면 될 것 같다는 생각이 듭니다.
- 물론 한계가 분명있을 것입니다.

> If you are not using a custom domain, you need to set NUXT_APP_BASE_URL to your repository-slug for your build step. Example: https://<user>.github.io/<repository>/: NUXT_APP_BASE_URL=/<repository>/ npx nuxt build --preset github_pages

- 공식문서에서는 위처럼 설명했습니다. 여기서 NUXT_APP_BASE_URL은 환경변수처럼 생겼는데 배포는 레포에 있는 actions에서 처리하는데 어떻게 공유하는가? 의문이 들었습니다.
- repository-slug라는 키워드에 주의해야 하는데
- https://github.com/arch-spatula/arch-spatula.github.io
  - `arch-spatula/arch-spatula.github.io`이 repository-slug를 지칭하는 말인 것 같습니다.
- https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#on

### 아직 남은 시도

- 2가지 정도 남은 것 같습니다.
  - `baseURL` 값을 `process.env.NUXT_API_BASE`으로 설정하는 것입니다.
    - 내부에서 자동처리한다는데 아닌 것 같습니다.
  - 유튜브에서 generate를 사용해서 배포는데 이것을 활용하는 것입니다.
    - 모든 정적 사이트에서 가능하다고 하니까 시도해보고자 합니다.
- https://www.youtube.com/watch?v=OJq1W4Ti1sk
- 위에서 알려주는 방식을 사용하고자 합니다. 이렇게라도 하면 뭔가 가능할 것이라는 착각이라도 듭니다.
- 위 방법도 안된다면  

https://velog.io/@devmini1203/Nuxt3-Nuxt3-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%A5%BC-GitHub-Pages%EC%97%90-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0

https://stackoverflow.com/questions/76937061/branch-master-is-not-allowed-to-deploy-to-github-pages-due-to-environment-prot

- 나중에 하려던 짓거리를 지금하고자 합니다. 꽤나 장기 프로젝트가 될 것 같습니다.



## 결론

- nuxt로 잠시 버티고 더 단순한 방법을 결국 찾아낼 것입니다. 
  - 가능하면 잠시가 5년은 갔으면 좋겠습니다.
- 아마 https://www.daleseo.com/unified-remark-rehype/에서 말하는 라이브러리를 활용해서 최대한 html, css, js 계층에 가깝게 만들어내고자 합니다.
- 이과정이 꽤 재미있었습니다. 작업을 진행하면서 모르는 자료들을 찾아보고 문제를 해결하는 과정이었습니다.
  - 가끔은 있지도 않은 문제를 허위로 만들어내고 과장하고 성과를 포장해야 하는 프로젝트들이 있는데 이번에 이 프로젝트는 아니었습니다.
  - 저는 개발을 직업으로도 하지만 취미로 하는 개발도 있는 사람입니다. 저를 더 뛰어나게 해주는 것과 무관하다는 것은 당연히 알고 있습니다. 그저 제가 여가를 보내는 한가지 방식입니다.
- 원래 사용하던 블로그 프레임워크에서 벗어나 제가 원하는 방식으로 제어하기 시작했습니다.
  - 숨겨진 위키 페이지들도 이제는 사라지게 됩니다. 물론 소스코드로 접근하는 방법은 알게 되지만 실제 소스코드를 보는 사람들은 극히 일부에 불과합니다.

