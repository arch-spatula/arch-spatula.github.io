---
slug: welcome-docusaurus-v2
title: 생일 선물
authors: [arch-spatula]
tags: [docusaurus, blog, birthday, astro]
date: 2023-05-15
description: 생일 축하합니다.
toc_max_heading_level: 6
---

# 생일 선물

이 블로그는 제 자신에게 주는 생일 선물입니다. 생일 축하합니다.

<!--truncate-->

## 원래 약속

이 블로그를 오늘까지 만들기로 약속했었습니다. 오늘까지 만들기로 한 이유는 너무 오래동안 진행하면 집중력을 잃고 루즈해질 것을 예상했습니다.

[1.0버전 개발자 블로그 만들기](https://github.com/arch-spatula/arch-spatula.github.io/issues/1)

이 이슈를 보면 작년 12월 11일에 만들었습니다. 당시에는 [Astro](https://astro.build/)를 활용해서 개발자 블로그를 만들고 있었습니다. astro의 의도가 SSG, SSR 메타 프레임워크로 문서화 사이트 만들기 좋을 것 같아 선택을 했었습니다. 누구는 gatsby를 추천했지만 버그가 너무 많았던 기억이 있습니다. 또 현재 사용하고 있는 docusaurus의 존재를 몰랐습니다.

### astro의 한계

#### 분야 추가하기

astro는 한계를 갖고 있었습니다. 물론 저에게만 있는 요구사항 문제였습니다. 바로 다양한 분야를 다루기 때문에 간단하게 폴더 하나 만들고 말고 싶었습니다. 하지만 분야 하나를 추가할 때 생각보다 손이 많이 갔습니다.

```astro
---
import "../../styles/global.css";
import BaseLayout from "../../layouts/BaseLayout.astro";
import BlogPost from "../../components/BlogPost.astro";
import Divider from "../../components/Divider.astro";
import IndexHeader from "../../components/IndexHeader.astro";

const pageTitle = "Markdown Cook Book 시리즈";
const allPosts = await Astro.glob("./posts/*.md");
const nonDraftPosts = allPosts.filter((post) => !post.frontmatter.draft);
---

<BaseLayout pageTitle={pageTitle}>
  <!-- 시리즈 해더 컴포넌트 만들기 -->
  <IndexHeader title="Markdown Cook Book" />
  <ul class="blog-posts">
    <!-- 블로그 목록을 순회합니다. -->
    {
      nonDraftPosts.map((post) => {
        return (
          <BlogPost
            url={post.url}
            title={post.frontmatter.title}
            description={post.frontmatter.description}
            tags={post.frontmatter.tags}
            date={post.frontmatter.pubDate}
          />
        );
      })
    }
  </ul>
  <Divider />
</BaseLayout>
```

분야를 하나 추가할 때마다 `index.astro`에 많은 코드를 작성해야 했습니다. 또 템플릿화 방법도 못 찾았습니다.

#### 포스트 추가의 번거로움

다른 문제는 포스트하나 만들 때 손이 너무 많이 갔습니다.

```md
---
layout: ../../../layouts/MarkdownPostLayout.astro
title: "Markdown 시작하기"
pubDate: 2023-03-12
description: "Markdown을 다루는 법을 소개합니다."
author: "Arch Spatula"
tags: ["Markdown", "Cook-book"]
---
```

거기에 없는 기능들도 존재했습니다. 코드 블럭에 코드 스니펫 기능도 없었고 강조도 없었습니다. 일일이 찾아야 했지만 커뮤니티는 작았습니다. 지금은 매일 엄청 성장하고 있습니다. 하지만 굳이 찾고 적용하는데 힘을 빼고 싶지 않았습니다.

#### 피드백 없는 빌드에러

![image](https://user-images.githubusercontent.com/84452145/238255247-03bd3344-92d0-48a7-806c-8f1be03e196f.png)

astro를 사용할 때 빌드 문제도 있었습니다. 물론 제가 이상하게 설정한 부분이었을 텐데 못찾고 있었습니다.

### astro에 대한 결론

astro 자체는 좋은 프레임워크라고 생각합니다. 하지만 일반적인 문서화에 좋고 개발자의 니즈에 부합하는 기능들이 많이 부족했습니다. 개인적으로 다른 프로젝트 활용해볼 생각은 있지만 저의 블로그에는 활용할 생각은 아직은 없습니다. 하지만 [starlight](https://starlight.astro.build/)가 docusaurus보다 더 좋은 경험을 제공할 수 있으면 충분히 전환할 생각은 있습니다.

## 블로그 계획

현재 블로그는 1.0 버전이 된 것 같습니다.

오늘을 기점으로 블로그에 글 작성과 관련된 커밋위주로 개발할 것입니다. 아주 가끔 블로그 기능 추가를 할 예정입니다. 하지만 지금은 필요없을 것 같습니다. 검색 기능이 필요하기는 합니다. 하지만 마이그레이션이 완료된 시점에 검토해볼 것입니다.

학원에서 TIL을 매일 강제로 제출하도록 했었습니다. 무지성 TIL을 어느정도 편집하고 관심사를 분리해서 여기로 옮길 계획입니다. 간접적으로 복습이 되고 좋을 것 같습니다.

나중에 about 페이지를 추가할 것입니다. 개발자 이력서 링크로 활용하고자 합니다. 또 다른 문서화 프로젝트 링크를 제공할 것입니다. 공부한 것을 보여줄만하게 바꾸는 고된 작업이 될 것 같습니다.

개발과 관련된 레시피를 주제별로 묶고 주제 사이즈가 커지면 마이그레이션하는 방식을 유지하고자 합니다.

가능하면 매주 배운 내용 중 특이한 부분을 정리하고자 합니다. 가끔 nvchad를 사용하다가 발견하는 특이한 기능과 단축키도 추가할 것입니다.

마크다운 정리하고 글쓰면서 글쓰기 방법도 추가할 것입니다.

마이그레이션이 완료되면 velog에 표시하고 이력서를 업데이트할 것입니다.

가능한면 특이한 언어도 추가해보고 싶습니다. golang과 rust처럼 미래지향적인 언어도 좋습니다. 하지만 가능하면 elixir, elm처럼 특이한 언어도 공부해보려고 합니다. 또 전공자처럼 c, haskell도 배우기는 해야 하지만 언제 배울지 순서는 안 정했습니다.

개발과 관련은 되어 있는데 분류하기 어려운 내용들 위주로 추가하게 될 것 같습니다.

아마 개발자 밈은 계속 유지될 것 같습니다.

velog에서 github pages로 옮기는 이유는 velog 제약을 풀고 소프트웨어 엔지니어링을 즐겁게 공부하기 위해서입니다.

내년에는 더 풍부해진 레시피들을 보고 돌아보고 싶습니다.
