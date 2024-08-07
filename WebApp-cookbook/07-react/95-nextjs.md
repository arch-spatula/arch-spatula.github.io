---
description: '문서에 대해서 개괄적으로 설명합니다.'
tags: ['react', 'intro', 'vercel']
sidebar_position: 95
draft: true
---

## 서버컴포넌트

[새로 등장한 ‘리액트 서버 컴포넌트’ 이해하기](https://yozm.wishket.com/magazine/detail/2271/)

## `ReferenceError: self is not defined`

```ts
import dynamic from 'next/dynamic';

const DynamicHeader = dynamic(() => import('../components/header'), {
  loading: () => 'Loading...',
});

export default function Home() {
  return <DynamicHeader />;
}
```

https://velog.io/@hmds1606/%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9A%8C%EA%B3%A0220713

## 비공개 레포 vercel에 연결하기

<!-- 사실 분류하기 애매해서 여기 추가함 -->

connect private repo to vercel

[Deploying Private Repository using Vercel](https://stackoverflow.com/questions/68780959/deploying-private-repository-using-vercel)

시키는데로 연결하면 됩니다.

주의할 점은 연결시간 은근히 걸립니다.

## server action

저는 개인적으로 Next JS에서 제일 중요한 기능이라고 봅니다. SSR로 동적인 인터랙션을 제공하는 방법이 있습니다. 물론 이런 기능이 php처럼 동작한다고 비판을 많이 하는 기능입니다. 비판하는 사람들은 요점을 모릅니다. 메타프레임워크의 메타한점이 이것이고 또 적절한 시점에 원하면 CSR을 바로 활용할 수 있다는 것이 Next의 엄청난 장점 중 하나입니다. (물론 프레임워크로서 대신 선택해준 것들이 더 큰 장점이지만...)

[Next.js Server Actions... 5 awesome things you can do](https://www.youtube.com/watch?v=O94ESaJtHtM)

[Server Actions: NextJS 13.4's Best New Feature](https://www.youtube.com/watch?v=czvSZqnpTHs)

[Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)

캐러셀, markdown textarea처럼 CSR로 강제되지 않는 경우만 주의하면 됩니다.

## React Server Components

리액트 서버 컴포넌트란 무엇인가? 왜 서버 사이드 랜더링말고 서버 컴포넌트인가?

<!-- https://www.freecodecamp.org/news/how-to-use-react-server-components/ -->

## Next.js 새로고침 문제

```tsx
import useInput from '@/hooks/useInput';
import { BASE_URL } from '@/util';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

type TodoDetailType = {
  todoDetail: todoItemType;
};

export default function TodoDetail({ todoDetail }: TodoDetailType) {
  const { id, todoTitle, todoContent } = todoDetail;
  const [isEditing, setIsEditing] = useState(false);
  const { inputValue: titleValue, handleInput: handleTitle } =
    useInput(todoTitle);
  const { inputValue: contentValue, handleInput: handleContent } =
    useInput(todoContent);

  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    const editTodoItem: todoItemType = {
      id,
      todoTitle: titleValue,
      todoContent: contentValue,
    };
    axios.patch(`${BASE_URL}/${id}`, editTodoItem);
    setIsEditing(false);
    axios.get(BASE_URL);
    location.reload();
  };

  return (
    <div>
      <button onClick={handleGoBack}>뒤로가기</button>
      {isEditing ? (
        <>
          <input
            type="text"
            placeholder={todoTitle}
            value={titleValue}
            onChange={handleTitle}
          />
          <input
            type="text"
            placeholder={todoContent}
            value={contentValue}
            onChange={handleContent}
          />
          <button onClick={handleSave}>저장</button>
          <button onClick={handleCancelEditing}>취소</button>
        </>
      ) : (
        <>
          <h1>{todoTitle}</h1>
          <h3>Todo details</h3>
          <p>{todoContent}</p>
          <button onClick={handleStartEditing}>수정</button>
        </>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const todoDetail = params?.todoId?.[0];
  const { data } = await axios.get(`${BASE_URL}/${todoDetail}`);

  return {
    props: {
      todoDetail: data,
    },
  };
};
```

상세페이지 코드입니다.

서버랑 동기적으로 화면을 보여주기 위해 post 요청을 보내고 새로고침합니다.

```tsx
axios.patch(`${BASE_URL}/${id}`, editTodoItem);
setIsEditing(false);
axios.get(BASE_URL);
location.reload();
```

이렇게 작성할 것이면 그냥 SWR 사용하는게 좋은 것 같습니다.

# Next.js Tutorial - Codevolution

Next.js 입문입니다.

# Next.js Tutorial - 1 - Introduction

https://www.youtube.com/watch?v=9P8mASSREYM

next.js는 프로덕션을 위한 리액트프레임워크라고 정의합니다.

웹앱을 리액트만으로 만들기에는 부족하다는 것을 알 수 있습니다. UI 즉 View를 만드는 책임만 있다는 것을 알고 있습니다. 스타일링, 라우팅, 인증은 다른 라이브러리에 의존해야 합니다.

Next.js는 리액트만으로는 프로덕션 코드를 작성하기에는 부족한 기능을 제공합니다.

하지만 프레임워크인 반제품답게 독선적이기는 합니다. 하지만 오랜 경험으로 만들어진 앱이기 때문에 안심해도 괜찮습니다.

왜 필요할 것인가? 프로덕션 앱을 만들기 위한 과정을 단순화 해줍니다.

1. 파일 기반 라우팅 제공

- 폴더로 단순하게 라우팅할 수 있습니다.

2. 사전 랜더링

- 클라이언트 사이드에서 랜더링하기 전에 서버에서 랜더링하고 클라이언트에게 HTML을 전달할 수 있습니다.

3. API 라우팅을 제공

- 풀스택앱으로 코드를 작성할 수 있습니다.

4. CSS modules를 기본제공합니다. 물론 tailwind를 취향것 사용해도 됩니다.
5. 인증 기본 인증을 제공합니다.
6. Dev and Prod build 시스템을 제공합니다.

이번 강의 시리즈에서는 이런 것들을 배우게 될 것입니다.

- HTML, CSS, JavaScript 기초는 당연히 알아야 합니다.
- 리액트 기초지식은 당연히 잘 알아야 합니다. 함수형컴포넌트, props, state, hooks, jsx는 당연히 알아야 합니다.

입문자에서 초보자로 양성하기 위한 과정입니다.

# Next.js Tutorial - 2 - Hello World

```sh
npx create-next-app 폴더이름
```

이렇게 작성합니다.

실행시키는 방식이 조금 특이합니다.

```sh
yarn dev
```

`next dev`를 선택하면 서버를 동작시킬 수 있습니다.

```jsx
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>hello Next!</main>
    </>
  );
}
```

이렇게 작성하면 화면에 바로 업데이트 된 것을 확인할 수 있습니다.

# Next.js Tutorial - 3 - Project Structure

https://www.youtube.com/watch?v=e-3UPyuOCq0

프로젝트의 폴더 구조를 이해하는 것은 아주 중요합니다.

루트입니다.

```json
{
  "name": "hello-world",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@next/font": "13.1.5",
    "eslint": "8.32.0",
    "eslint-config-next": "13.1.5",
    "next": "13.1.5",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  }
}
```

의존성은 이렇게 있습니다. 강의는 11 버전입니다. 물론 핵심은 동일합니다.

eslint는 코드에 도움을 많이 줄 것입니다. dev는 개발활경에서 실행을 위해서 사용합니다. start는 컴파일된 코드를 실행합니다.

리액트만 사용하는 프로젝트는 컴파일만 하고 start가 없습니다. 하지만 Next는 가능합니다. 하지만 build를 먼저 실행하는게 순서상 맞습니다.

next.config.js입니다. 설정을 돕는 파일입니다.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
```

이렇게 되면 리액트 strict mode랑 동일합니다.

eslint 파일은 시작할 때는 별로 걱정할 필요가 없습니다.

```json
{
  "extends": "next/core-web-vitals"
}
```

next폴더는 빌드하고 실행하는 파일입니다. 개발하는 동안에는 신경쓸 필요없습니다.

styles 폴더는 전역 스타일링을 넣을 수 있습니다. 사실 다른 폴더에도 스타일링을 넣을 수 있습니다.

public 폴더는 리액트의 public 폴더랑 다릅니다. index.html이 없습니다. 모든 html은 Next.js에 생성합니다.

가장 중요한 폴더는 pages 폴더입니다. 이 폴더 하나만이 모든 라우팅 기능을 책임집니다. 라우팅의 동작원리는 나중에 다룹니다. `index.js`는 홈에 해당합니다.

`_app.js`은 레이아웃을 제어할 수 있습니다.

# Next.js Tutorial - 4 - Routing Section Intro

라우팅입니다. 이 튜토리얼은 라우팅에 대한 간단한 소개입니다.

리액트에서 react-router-dom같은 패키지를 설치하고 route.js를 활용해서 라우팅을 만들고 설정하고 페이지를 만들었을 것입니다.

하지만 Next.js는 파일 베이스 라우팅으로 프레임워크로 반제품 답게 이런 결정을 대신해주었습니다.

Page에 추가하면 바로 접근가능한 라우트가 된다는 것이 컨벤션입니다.

- 페이지 라우팅
- 중첩 라우팅
- 동적 라우팅
- Catch-all pages
- 네비게이션 UI
- 프로그래밍적 라우팅

이런 주제들을 배우게 될 것입니다.

# Next.js Tutorial - 5 - Routing with Pages

라우팅을 책임지는 폴더는 pages 폴더입니다.

하지만 `\_app.js`는 필요합니다. `public`과 `styles`는 라우팅과 무관합니다.

```jsx
export default function Home() {
  return <h1>Hello world!</h1>;
}
```

이렇게 작성할 수 있습니다.

`index`는 폴더의 루트 디렉토리 역할을 합니다.

```txt
/pages
  index.js
  profile.js
  about.js
```

라우팅은 파일 이름으로 매핑이 됩니다.

```url
http://localhost:3000/
```

```jsx
// pages/index.js
export default function Home() {
  return <h1>Hello world!</h1>;
}
```

홈으로 이동합니다.

```url
http://localhost:3000/profile
```

```jsx
function Profile() {
  return <h1>Profile Page</h1>;
}

export default Profile;
```

프로필 페이지로 접근할 수 있습니다.

```url
http://localhost:3000/about
```

```jsx
function About() {
  return <h1>About Page</h1>;
}

export default About;
```

about 페이지에 접근할 수 있습니다.

# Next.js Tutorial - 6 - Nested Routes

https://www.youtube.com/watch?v=f-6GAntaum4

중첩된 라우팅을 구현하는 방법을 배웁니다.

```url
http://localhost:3000/blog/frist
```

```url
http://localhost:3000/blog/second
```

이렇게 각각의 라우팅을 접근해야 할 때가 있습니다.

```txt
/pages
  index.js
  blog.js
```

```jsx
// pages/Blog.js
function Blog() {
  return <h1>Blog Page</h1>;
}

export default Blog;
```

이렇게 시작할 수 있습니다.

하지만 중첩 라우팅이기 때문에 이것만으로는 부족합니다.

```txt
/pages
  index.js
  blog.js
  /blog
    first.js
    second.js
```

이렇게 폴더를 생성할 수 있습니다.

```jsx
function FirstBlog() {
  return <h1>First Blog Page</h1>;
}

export default FirstBlog;
```

```jsx
function SecondBlog() {
  return <h1>Second Blog Page</h1>;
}

export default SecondBlog;
```

이렇게 작성하면 라우팅을 지원하는 것을 확인할 수 있습니다.

하지만 문제가 있습니다.

```txt
/pages
  index.js
  blog.js
  /blog
    first.js
    second.js
```

폴더와 루트 디렉토리와 디커플링이 되어 있습니다.

```txt
/pages
  index.js
  /blog
    index.js
    first.js
    second.js
```

하지만 이렇게 하면 해결됩니다. 이렇게 되면 커머스의 카테고리에 해당하는 라우팅을 비슷하게 구현할 수 있습니다.

# Next.js Tutorial - 7 - Dynamic Routes

https://www.youtube.com/watch?v=Ql5kyJaYbls

```txt
/pages
  index.js
  /blog
    index.js
    first.js
    second.js
```

중첩 라우팅 이후입니다. 지금은 라우팅 주소를 하드코딩했습니다. 하지만 운영하는 커머스가 거대하다면 수동으로 입력하기에는 수고가 너무 많습니다.

이럴 때 필요한 것은 동적 라우팅입니다. 제품의 상세페이지를 접근할 때는 id를 접근하게 됩니다.

```jsx
function ProductList() {
  return (
    <>
      <h2>Product 1</h2>
      <h2>Product 2</h2>
      <h2>Product 3</h2>
    </>
  );
}

export default ProductList;
```

제품들이 이렇게 있다고 가정하겠습니다.

```txt
/pages
  index.js
  /product
    index.js
    1.js
    2.js
    3.js
```

마음속에 흥선대원군을 품고 이렇게 작성하는 것도 가능합니다. 하지만 상당히 비효율적입니다. 더 좋은 동적 라우팅을 구현하는 방법이 있습니다.

```txt
/pages
  index.js
  /product
    index.js
    [productId].js
```

그냥 id라고 작성해도 됩니다. 하지만 동적 라우팅이 여러 종류면 접두어로 맥락을 알려주도록 합니다.

```jsx
// product/[productId].js
function ProductDetail() {
  return <h1>Product Detail About Page</h1>;
}

export default ProductDetail;
```

이렇게 하면 상세 페이지를 접근할 수 있습니다.

일반적인 앱에서는 이 id를 접근하고 라우팅에 따라 api요청을 날리도록 할 것입니다.

```jsx
// product/[productId].js
import { useRouter } from 'next/router';

function ProductDetail() {
  const {
    query: { productId },
  } = useRouter();
  return <h1>Product Detail About Page: {productId}</h1>;
}

export default ProductDetail;
```

이렇게 쿼리 파라미더 객체를 접근할 수 있습니다.

이렇게 동적인 id를 접근하고 알수 있습니다. 당연히 id는 해쉬값 어느 문자열이든 가능합니다.

가끔 동적 라우팅 중에 정적으로 고정되어야 하는 부분들이 있습니다.

```txt
/pages
  index.js
  /product
    index.js
    [productId].js
    foo.js
```

정적라우팅 페이지가 동적 라우팅지페이지보다 우선순위가 높습니다.

```jsx
// product/foo.js
function Foo() {
  return <h1>Foo</h1>;
}

export default Foo;
```

이렇게 하고 라우팅을 시험해보면 정적 라우팅 페이지가 더 우선순위가 높다는 것을 알 수 있습니다.

이렇게 list, detail 패턴을 쉽게 구현할 수 있게 해줍니다.

# Next.js Tutorial - 8 - Nested Dynamic Routes

https://www.youtube.com/watch?v=nfAxNTmme64

이번에는 중첩된 동적 라우팅입니다.

동적 라우팅이 1가지 이상이 필요한 상황은 자주 발생합니다.

```url
http://localhost:3000/blog/product/1/review/1
```

이런 라우팅을 지원해야 하는 상황은 자주 발생합니다.

이런 중첩 라우팅을 구현하기 위해서 폴더 구조를 작성하는 방법입니다.

```txt
/pages
  /product
    /[productId]
      index.js
      /review
        [reviewId].js
```

이렇 구조로 작성하면 구현이 가능합니다.

```jsx
import { useRouter } from 'next/router';

function Review() {
  const {
    query: { productId, reviewId },
  } = useRouter();
  return (
    <h1>
      productId: {productId}
      reviewId: {reviewId}
    </h1>
  );
}

export default Review;
```

이렇게 작성하면 화면에 라우트 별 id를 표시할 수 있습니다. 중첩 된 라우팅에 의존성 쿼리를 날리는 것도 가능하게 된 것입니다.

```url
http://localhost:3000/product/11234/review/1324
```

이렇게 작성헤도 무리가 전혀 없습니다.

# Next.js Tutorial - 9 - Catch All Routes

https://www.youtube.com/watch?v=ZHn726VDoIY

이어서 커머스입니다. 품목이 종속관계가 아니라 조합관계인 경우입니다. url을 조합해서 라우팅을 처리해야 합니다.

```txt
http://localhost:3000/detail1/product1/

  ...

http://localhost:3000/detail5/product5/
```

이렇게 25의 파일을 만드는 방법이 있습니다. 하지만 id 2개를 섞어서 1개의 라우트 만으로 처리하게 만들 수 있습니다.

```txt
http://localhost:3000/[detailId]/[productid]/
```

이것이 Catch-all 라우팅입니다.

```txt
/pages
  /docs
    [...params].js
```

```jsx
// pages/docs/[...params].js
function Doc() {
  return <h1>Docs Home Page</h1>;
}

export default Doc;
```

이렇게 작성하면 url을 이렇게 작성할 수 있습니다.

```url
http://localhost:3000/docs/LGTM1234/TLDR5678
```

이렇게 작성하고 각각의 id를 접근하는 패턴입니다.

```jsx
import { useRouter } from 'next/router';

function Doc() {
  const {
    query: { params },
  } = useRouter();
  return (
    <h1>
      Docs Home Page: {params[0]} {params[1]} {params[2]}
    </h1>
  );
}

export default Doc;
```

`params`의 값은 배열이라는 것을 알 수 있습니다.

이제는 에러처리입니다.

```jsx
import { useRouter } from 'next/router';

function Doc() {
  const {
    // 없으면 빈 배열을 할당합니다.
    query: { params = [] },
  } = useRouter();

  if (params.length === 2)
    return (
      <h2>
        {params[0]} {params[1]}
      </h2>
    );

  console.log(params);
}

export default Doc;
```

라우팅에 따라 사용하는 쿼리 파라미터를 접근하고 보이게 될 화면을 정합니다.

라우팅으로 필터링 검색 같은 기능들을 구현할 수 있게 해줍니다.

optional catch-all 라우팅 기능입니다. 간단하게 이름만 대괄호로 한번더 감싸 주면 됩니다.

```txt
/pages
  /docs
    [[...params]].js
```

```jsx
import { useRouter } from 'next/router';

function Doc() {
  const {
    // 없으면 빈 배열을 할당합니다.
    query: { params = [] },
  } = useRouter();

  if (params.length === 2)
    return (
      <h2>
        {params[0]} {params[1]}
      </h2>
    );

  return <h1>not 404</h1>;
}

export default Doc;
```

이렇게 작성해주면 마지막 not 404가 화면에 보이는 것을 확인할 수 있습니다.

# Next.js Tutorial - 10 - Link Component Navigation

https://www.youtube.com/watch?v=sigcnKAPddM

일반적인 사용자는 ui 요소를 클릭하고 라우팅을 할 것입니다.

클라이언트 사이드 라우팅은 `Link`로 처리합니다.

```jsx
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Hello world!</h1>
      <Link href={'blog'}>Blog</Link>
    </div>
  );
}
```

이렇게 하면 blog로 라우팅할 수 있습니다.

홈으로 라우팅은 생각처럼 직관적입니다.

```jsx
import Link from 'next/link';

function Blog() {
  return (
    <div>
      <h1>Blog Page</h1>
      <Link href={'/'}>home</Link>
    </div>
  );
}

export default Blog;
```

동적 라우팅을 위해 id를 활용해 라우팅하는 방법입니다.

```jsx
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Hello world!</h1>
      <Link href={'blog'}>Blog</Link>
      <Link href={`product/1`}>
        <h2>Product 1</h2>
      </Link>
      <Link href={`product/2`}>
        <h2>Product 2</h2>
      </Link>
      <Link href={`product/3`}>
        <h2>Product 3</h2>
      </Link>
    </div>
  );
}
```

템플릿 리터럴을 활용해서 응용하는 것은 쉬울 것입니다.

replace props입니다.

현재 히스토리 stack을 교체하는 방법입니다.

외부 사이트로 나갈 때는 전통적인 a태그를 활용하면 됩니다.

```jsx
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Hello world!</h1>
      <Link href={'blog'}>Blog</Link>
      <Link href={`product/1`}>
        <h2>Product 1</h2>
      </Link>
      <Link href={`product/2`}>
        <h2>Product 2</h2>
      </Link>
      <Link href={`product/3`} replace>
        <h2>Product 3</h2>
      </Link>
    </div>
  );
}
```

이렇게 replace를 넣어 두면 히스토리를 생략합니다.

# Next.js Tutorial - 11 - Navigating Programmatically

https://www.youtube.com/watch?v=8jhLvnm7fmE

대부분의 경우 Link 태그로 해결할 수 있습니다. 하지만 가끔은 프로그래밍적 라우팅을 해줘야 할 때가 있습니다. 예를 들어 주문을 넣으면 from을 제출하게 된 것이고 이럴 때 라우팅하게 만들어야 할 수 있습니다.

```jsx
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    console.log('주문 접수');
    router.push('/product');
  };

  return (
    <div>
      <h1>Hello world!</h1>
      <Link href={'blog'}>Blog</Link>
      <Link href={`product/1`}>
        <h2>Product 1</h2>
      </Link>
      <Link href={`product/2`}>
        <h2>Product 2</h2>
      </Link>
      <button onClick={handleClick}>주문하기</button>
    </div>
  );
}
```

이렇게 라우팅하게 만들 수 있습니다. 정적라우팅, 동적라우팅 등 제약은 없습니다. 또 `replace`로 히스토리도 제어할 수 있습니다.

# Next.js Tutorial - 12 - Custom 404 Page

https://www.youtube.com/watch?v=vpSDQawRpEk

404 페이지 만드는 법입니다. 잘못된 라우트 경로를 접근하면 404 페이지를 제공해야 합니다.

Next.js는 404 페이지를 기본적으로 제공해줍니다. 커스터마이즈 하고 싶으면 `404.js`라고 정의하면 됩니다.

```txt
/pages
  404.js
```

```jsx
function PageNotFound() {
  return <h1>This page could not be found.</h1>;
}

export default PageNotFound;
```

이렇게 하면 라우팅 개념은 끝입니다.

# Next.js Tutorial - 13 - Routing Summary

https://www.youtube.com/watch?v=TaDGyvh2Ud0

라우팅은 파일 이름을 기준으로 구현된다는 것을 배웠습니다. 또 중첩 라우팅과 동적 라우팅을 배웠습니다. 또 catch-all 라우팅도 구현하는 방법도 배웠습니다. 또 페이지 네비게이션을 배웠습니다. 프로그래밍적 라우팅도 배웠습니다. 또 404 커스텀 페이지를 만드는 법도 배웠습니다. 어플리케이션을 만들기 위해 기초적인 라우팅 패턴을 학습했습니다.

# Next.js Tutorial - 14 - Pre-rendering and Data Fetching Section Intro

https://www.youtube.com/watch?v=GOdu5C8JzL8

라우팅 이후 프리랜더링을 학습합니다.

- 프리랜더링이 무엇이고 프로덕션 앱에 필요한 이유를 학습합니다.
- 정적 자원 생성입니다. 데이터가 있고 없고에 따라 다르게 대응하는 법을 배웁니다.
- 점진적 정적 자원 생성하는 법도 배울 것입니다.
- 동적 파라미터에 따라 데이터 fetching하는 법을 배웁니다.
- SSR과 SSG와의 차이를 학습합니다.
- 클라이언트 사이드 data fetching도 학습합니다.

프리랜더링에 대한 자료는 상당히 많지만 핵심 개념이 됩니다.

# Next.js Tutorial - 15 - Pre-rendering

https://www.youtube.com/watch?v=BeXbCgRxifs

프리랜더링은 전통적인 리액트 앱이랑 Next.js 앱이랑 비교하면서 학습하는 것이 효과적입니다.

https://github.com/gopinav/Next-JS-Tutorials/tree/master/next-pre-rendering

Next.js는 랜더링을 하고 클라이언트에 전달합니다. 클라이언트 요청 전에 이미 래더링이 되어 있고 HTML을 받고 보게 되는 것입니다. HTML에 미리 랜더링을 처리하고 자바스크립트를 부분적으로 제공해주는 것입니다.

리액트에서는 클라이언트가 접근하고 자바스크립트가 실행되고 HTML에 마운트가 됩니다. 페이지 속에는 root div 속에 모든 것들을 처리합니다. 이것을 보고 하이드레이션이라고 합니다.

Next.js는 기본적으로 프리랜더링을 제공합니다. 왜 프리랜더링을 기본값으로 제공하는지 알아야 합니다. 하나는 프리랜더링은 서버에서 처리하기 때문에 클라이언트가 처리할 것이 줄어들어 성능상 더 유리합니다. 다른 이유는 SEO에 유리합니다. 블로그, 커머스는 SEO로 경쟁합니다. 검색엔진이 잘 찾을 수 있도록 해야 유리합니다. 당연히 구글은 리액트처럼 동적으로 생성되었을 때 크롤러가 잘 찾도록 업데이트를 했지만 그래도 더 유리합니다.

크롤러 업데이트 전에 크롤러가 리액트 앱을 접근했을 때는 빈화면만 나왔었습니다.

# Next.js Tutorial - 16 - Static Generation

https://www.youtube.com/watch?v=keP1PygtJ8c

SSG와 SSR은 당연히 다릅니다. 하지만 모두 프리랜더링에 속합니다.

SSG는 HTML을 빌드타임에 랜더링하는 기술입니다. HTML 콘텐츠는 앱을 만들 때 이미 만들어져있습니다. 대부분의 경우 권장하는 방식입니다. 이미 한번만 만들었고 캐싱만 하면 되기 때문에 성능상 엄청 유리합니다.

대부분의 경우 블로그, 커머스, 문서화, 마케팅 사이트에 많이 활용하는 기술입니다.

기본적으로 Next.js는 앱의 모든 부분을 프리랜더링 처리해줍니다. HTML의 모든 페이지는 정적으로 생성됩니다. 하지만 dev에서 보고 있는데 빌드처럼 보입니다. 프로덕션은 최적화 빌드를 하고 배포합니다.

프로덕션 빌드는 한번만 빌드를 처리합니다. 하지만 개발자 모드에서는 계속 다시 빌드를 진행합니다. 코드 변화와 요청마다 빌드를 다시 진행합니다. SSG는 개발 중에는 고민하지 않습니다.

중요한 것은 SSG로 색인과 캐싱으로 성능 개선에 집중하도록 합니다.

SSG는 데이터 없이도 진행할 수 있습니다. 하지만 일부 페이지는 외부 데이터를 요청해야 하는 경우들이 발생할 것입니다.

# Next.js Tutorial - 17 - Static Generation with getStaticProps

https://www.youtube.com/watch?v=7UouvxZ6OaM

```txt
/pages
  users.js
```

```jsx
// pages/users.js
const UserList = () => {
  return <h1>Users List</h1>;
};

export default UserList;
```

컴포넌트를 export 할 때는 놀랍게도 비동기 함수도 export도 할 수 있습니다.

빌드타임 시점에 실행해서 fetch 같은 비동기 로직들을 처리할 수 있습니다.

```jsx
const UserList = () => {
  return <h1>Users List</h1>;
};

export default UserList;

export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  console.log(data);
  return data;
}
```

이렇게 작성하면 통신은 성공한다는 것을 알 수 있습니다. 하지만 이렇게 디커플 되어 있는 함수를 커플링하는 방법인 컨벤션입니다.

참고로 이대로 하면 에러를 돌려줍니다.

```jsx
const UserList = ({ users }) => {
  return (
    <>
      <h1>Users List</h1>;
      {users.map((user) => {
        return <div key={user.id}>{user.id}</div>;
      })}
    </>
  );
};

export default UserList;

export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  console.log(data);
  return {
    props: {
      users: data,
    },
  };
}
```

서버 통신과 관련된 함수는 따로 존재하지만 Props로 커플링이 되어 있습니다. Props는 일반적인 리액트와 동일합니다.

# Next.js Tutorial - 18 - Pages vs Components

https://www.youtube.com/watch?v=OYzrF4wuDKs

```jsx
const UserList = ({ users }) => {
  return (
    <>
      <h1>Users List</h1>;
      {users.map((user) => {
        return <div key={user.id}>{user.id}</div>;
      })}
    </>
  );
};

export default UserList;

export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  console.log(data);
  return {
    props: {
      users: data,
    },
  };
}
```

이런식으로 프로덕션 앱을 작성하는 경우는 거의 없습니다. 순회를 하면 묶는 컴포넌트와 개별 항목 컴포넌트를 각각 만들어서 추상화를 하게 될 것입니다.

컴포넌트는 개별 컴포넌트 폴더에 만들어서 정리할 수 있습니다. 폴더이름은 Components가 됩니다. 물론 프레임워크가 강제하는 것이 전혀 아니고 컨벤션의 문제입니다.

특이한 점이 있습니다. 리액트에서는 컴포넌트 명명이 파스칼 케이스였지만 Next.js에서는 케밥케이스로 네이밍을 합니다.

```jsx
import { User } from '../Components';

const UserList = ({ users }) => {
  return (
    <>
      <h1>Users List</h1>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <User user={user} />
          </div>
        );
      })}
    </>
  );
};

export default UserList;

export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();

  return {
    props: {
      users: data,
    },
  };
}
```

튜토리얼은 이렇게 작성했습니다. 하지만 순회한다는 것 자체도 추상화를 시켜 ul 태그용 컴포넌트화 시킬 것입니다. 또 index에 몇가지 컴포넌트만 유출할 것입니다. 컴포넌트는 폴더로 묶어 넣습니다.

페이지에서는 컴포넌트 선언적으로 작성해주도록 합니다.

getStaticProps는 서버사이드로만 동작합니다. console.log를 하면 브라우저는 안 보이지만 터미널에서는 보입니다. 브라우저에 보내지는 번들에는 없습니다.

서버에서 실행하기 때문에 서버에서 처리하는 로직들을 모두 접근할 수 있습니다. 직접 서버를 제어하는 것이 가능합니다. fs 모듈로 파일 시스템 접근, DB 쿼리 로직을 모두 처리할 수 있습니다. 브라우저에 번들링이 안 됩니다.

API를 포함하는 것을 걱정할 필요가 없습니다. 브라우저로 안 보내지기 때문입니다.

getStaticProps는 Page에서만 실행할 수 있고 일반 컴포넌트에서는 실행할 수 없습니다. 컴포넌트 폴더에서는 getStaticProps를 정의할 수 없습니다.

getStaticProps는 반드시 객체를 반환하고 props를 키로 갖고 객체를 값으로 갖어야 합니다. 이것은 프레임워크가 정해 둔 것입니다.

getStaticProps는 빌드에 실행됩니다. Next.js는 개발하면서 계속 요청을 보내게 됩니다.

# Next.js Tutorial - 20 - Inspecting Static Generation Builds

https://www.youtube.com/watch?v=AWbYJgsXHQ4

Next.js를 빌드하는 방법입니다. 그리고 빌드하고 프리랜더링을 처리하는 방법입니다.

프로덕션을 위한 리액트 프레임워크 답게 빌드와 프로덕션 배포를 다룹니다.

스크립트는 `yarn build`입니다.

최적화된 빌드를 만들어줍니다. 하지만 이렇게 만들변 개발 서버랑 다르게 구현이 됩니다.

라우트 즉 페이지마다 다운로드하게 될 용량을 피드백을 줍니다.

```txt
Route (pages)                              Size     First Load JS
┌ ○ /                                      257 B          73.4 kB
├   /_app                                  0 B            73.1 kB
├ ○ /404                                   181 B          73.3 kB
└ ● /users (1910 ms)                       366 B          73.5 kB
+ First Load JS shared by all              73.8 kB
  ├ chunks/framework-2c79e2a64abdb08b.js   45.2 kB
  ├ chunks/main-f11614d8aa7ee555.js        26.8 kB
  ├ chunks/pages/_app-70d58eb909199b8c.js  297 B
  ├ chunks/webpack-8fa1640cc84ba8fe.js     750 B
  └ css/876d048b5dab7c28.css               706 B
```

`_app`은 모든 코드를 몰아 넣는 곳입니다. 총 용량은 73.8kb입니다. 각 라우트마다 처리하는 용량을 모두 표시합니다. 피드백을 컬러로 돌려줍니다. 초록색이 나오면 괜찮은 것입니다.

프리랜더링 타입도 표시해줍니다. ○은 static 랜더링입니다. 하지만 ●은 SSG에 해당합니다. HTML과 JSON만으로 만들어진 페이지에 해당합니다.

서버랑 ISR도 존재합니다.

빌드 아웃 풋입니다. Next.js는 빌드 아웃풋을 `.next`에 만듭니다. 통신을 위해 모두 Json을 활용합니다. 서버 폴더에는 Page 폴더가 존재합니다.

루트 파일이 정적인 html이라는 것을 알 수 있습니다. 404도 정적인 html에 해당합니다.

데이터는 모두 JSON에 몰아 넣습니다. 데이터와 페이지는 커플링이 되어 있습니다.

언더 스코어로 시작하는 파일을 브라우저로 보내지 않습니다. 그저 변환만 도와주는 파일에 불과합니다.

브라우저로 보내지지 않으면 하이드레이션은 어떻게 처리하는가?

chunks는 페이지 하이드레이션과 인터랙션을 위해 자바스크립트를 보냅니다. 일부는 웹팩, 폴리필, 리액트 같은 빌드를 위한 파일도 있습니다.

# Next.js Tutorial - 21 - Running Static Generation Builds

https://www.youtube.com/watch?v=QcUU89xKu70

빌드한 앱을 실행합니다. 빌드한 앱을 빌드 스크립트로 실행했습니다. 이 앱을 실행하려면 start를 하면 됩니다.

```sh
yarn build
```

```sh
yarn start
```

크롬 개발자 도구를 키고 캐시비우기와 강력한 새로고침을 누르면 랜더링이 엄청나게 빠르다는 것을 볼 수 있습니다.

다양한 리소스가 다운로드 됩니다. 서버에서 index.html부터 받게 됩니다.

다른 다운로드 된 소스는 chunk랑 관련된 것들이라는 것들을 알 수 있습니다. 리액트, 웹팩과 같이 구현을 위해 필요한 자바스크립트만 다운받습니다.

하지만 컴포넌트에 해당하는 파일을 다운 받지 않습니다.

Link 태그를 추가하면 보이는 UI에서 보이면 미리 랜더링을 처리합니다. 최초 다운로드 하는 크기가 더 커집니다. 이렇게 하면 처음부터 html을 제공해주고 서버랑 추가 통신을 하지 않습니다. 이미 있는 파일을 접근하는 것이기 때문에 그렇습니다.

Link가 연결되어 있으면 모두 같이 빌드하로 랜더링 처리합니다.

페이지가 빌드타임에 랜더링을 하면 JSON을 갖고 클라이언트 사이드로 Link로 접근할 때 JSON을 요청하고 props로 활용해서 클라이언트 사이드로 페이지를 만듭니다.

SG는 HTML을 빌드타임에 생성하는 방법입니다. 외부데이터 있는 없든 가능합니다. 외부 데이터가 필요하면 JSON을 생성합니다.

이부분이 중요합니다. 직접 페이지로 URL을 작성해서 접근하면 HTML을 받습니다. 하지만 클라이언트 사이드로 Link 태그처럼 라우팅을 하면 이미 fetching 된 데이터와 자바스크립트로 클라이언트 사이드 페이지를 만들게 됩니다. 이렇게 만들어지면 추가 요청이 필요 없어집니다.

# Next.js Tutorial - 22 - SSG with Dynamic Parameters

https://www.youtube.com/watch?v=1XEe-ng57GA

```jsx
import { User } from '../Components';

const UserList = ({ users }) => {
  return (
    <>
      <h1>Users List</h1>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <User user={user} />
          </div>
        );
      })}
    </>
  );
};

export default UserList;

export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();

  return {
    props: {
      users: data,
    },
  };
}
```

위와 같은 코드는 상당히 많이 보게 될 것입니다.

Master-Detail UI Pattern입니다. List-Detail 패턴이라고도 부릅니다. 목록과 상세 페이지 패턴입니다. 블로그 혹은 커머스에 자주 볼 수 있습니다.

/blog가 목록에 해당하고 /blog/blogId이 상세페이지에 해당합니다. 동적 파라미터로 만드는 법입니다.

https://jsonplaceholder.typicode.com/posts

https://jsonplaceholder.typicode.com/posts/1

각각 목록과 상세 페이지로 요청을 보낼 엔드포인트들입니다. 목록 페이지로 전체적으로 데이터를 얻어올 것입니다.

```jsx
function PostList({ posts }) {
  return (
    <>
      <h1>List of Posts</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h2>
              {post.title} {post.id}
            </h2>
            <hr />
          </div>
        );
      })}
    </>
  );
}

export default PostList;

export async function getStaticProps() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);

  const data = await response.json();

  return {
    props: { posts: data.slice(0, 3) },
  };
}
```

이렇게 하면 목록 페이지처럼 통신하는 것을 볼 수 있습니다.

```jsx
import Link from 'next/link';

function PostList({ posts }) {
  return (
    <>
      <h1>List of Posts</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`posts/${post.id}`} passHref>
              <h2>
                {post.title} {post.id}
              </h2>
            </Link>
            <hr />
          </div>
        );
      })}
    </>
  );
}

export default PostList;

export async function getStaticProps() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);

  const data = await response.json();

  return {
    props: { posts: data.slice(0, 3) },
  };
}
```

이렇게 하면 성공적으로 상세페이지가 만들어질 것이라고 생각합니다. 하지만 에러를 돌려줍니다.

> Error: getStaticPaths is required for dynamic SSG pages and is missing for '/posts/[postId]'.
> Read more: https://nextjs.org/docs/messages/invalid-getstaticpaths-value

# Next.js Tutorial - 23 - SSG with getStaticPaths

https://www.youtube.com/watch?v=TOIRxWQPgi0

마스터 디테일 패턴을 구현하는데 에러가 발생했습니다. `getStaticPaths`를 대신활용하라고 피드백을 받았습니다.

정적으로 생성된 HTML에 동적인 파라미터 랜더링해달라고 요구하게 된 것입니다. HTML은 동일하지만 데이터만 가변적입니다. 일일이 HTML을 만드는 것은 비효율적입니다. 그래서 빌드타임에 개발자가 중요하다고 고려하는 id를 지정해달라고 요구하는 에러입니다.

id의 가능성을 정해줘야 하는데 `getStaticPaths`로 구현합니다.

```jsx
import Link from 'next/link';

function PostList({ posts }) {
  return (
    <>
      <h1>List of Posts</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`posts/${post.id}`} passHref>
              <h2>
                {post.title} {post.id}
              </h2>
            </Link>
            <hr />
          </div>
        );
      })}
    </>
  );
}

export default PostList;

export async function getStaticProps() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);

  const data = await response.json();

  return {
    props: { posts: data.slice(0, 3) },
  };
}
```

```jsx
function Post({ post }) {
  return (
    <>
      <h2>
        {post.id}
        {post.title}
      </h2>
      <p>{post.body}</p>
    </>
  );
}

export default Post;

export async function getStaticProps(context) {
  const { params } = context;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );

  const data = await response.json();

  return {
    props: {
      post: data,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { postId: '1' } },
      { params: { postId: '2' } },
      { params: { postId: '3' } },
    ],
    fallback: false,
  };
}
```

`params`를 지정할 할 때 id를 문자열로 지정하는 것을 잊지 말도록 합니다.

목록 페이지에서 3개릴 지정했기 때문에 각각의 파라미터도 3개를 지정합니다.

`getStaticPaths` 에러를 처리한 것입니다.

# Next.js Tutorial - 24 - Inspecting getStaticPaths Builds

https://www.youtube.com/watch?v=Isrmm6XhAdA

`getStaticPaths`으로 각각의 상세페이지를 미리 만들어 둡니다. 각각의 id에 해당하는 페이지를 미리 만드는 것을 볼 수 있습니다.

```txt
/.next
  /pages
    /posts
      1.html
      2.html
      3.html
```

이렇게 각각 페이지가 랜더링됩니다.

```txt
Route (pages)                              Size     First Load JS
┌ ○ /                                      271 B          73.4 kB
├   /_app                                  0 B            73.1 kB
├ ○ /404                                   181 B          73.3 kB
├ ● /posts (589 ms)                        2.31 kB        75.4 kB
├ ● /posts/[postId] (2943 ms)              319 B          73.4 kB
├   ├ /posts/2 (989 ms)
├   ├ /posts/1 (987 ms)
├   └ /posts/3 (967 ms)
└ ● /users (594 ms)                        366 B          73.5 kB
+ First Load JS shared by all              73.8 kB
  ├ chunks/framework-2c79e2a64abdb08b.js   45.2 kB
  ├ chunks/main-f11614d8aa7ee555.js        26.8 kB
  ├ chunks/pages/_app-70d58eb909199b8c.js  297 B
  ├ chunks/webpack-8fa1640cc84ba8fe.js     750 B
  └ css/876d048b5dab7c28.css               706 B
```

이렇게 빌드 리포트를 볼 수 있습니다.

각각 랜더링하면서 시간이 많이 든다는 것을 볼 수 있습니다.

직접 url로 접근했을 때를 대비해서 각각의 html을 만드는 것입니다. 하지만 클라이언트 사이드 라우팅을 정상적으로 했으면 JSON데이터를 활용해서 화면에 보여줍니다.

연결되 리스트 페이지에 접근하게 되면 연결된 페이지의 JSON을 fetch합니다. 필요한 데이터를 요청 전에 준비하는 것입니다. 그래서 상세페이지 라우팅을 하면 추가 통신이 없어집니다.

# Next.js Tutorial - 25 - Fetching Paths for getStaticPaths

https://www.youtube.com/watch?v=NaYs1Gdg4AE

getStaticPaths함수를 이해했습니다. 하지만 한계가 있는 것을 발견했습니다. 바로 목록 컴포넌트를 동적으로 증가할 수 없이 하드코딩했습니다.

```jsx
import Link from 'next/link';

function PostList({ posts }) {
  return (
    <>
      <h1>List of Posts</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`posts/${post.id}`} passHref>
              <h2>
                {post.title} {post.id}
              </h2>
            </Link>
            <hr />
          </div>
        );
      })}
    </>
  );
}

export default PostList;

export async function getStaticProps() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);

  const data = await response.json();

  return {
    props: { posts: data.slice(0, 3) },
  };
}
```

```jsx
function Post({ post }) {
  return (
    <>
      <h2>
        {post.id}
        {post.title}
      </h2>
      <p>{post.body}</p>
    </>
  );
}

export default Post;

export async function getStaticProps(context) {
  const { params } = context;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );

  const data = await response.json();

  return {
    props: {
      post: data,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { postId: '1' } },
      { params: { postId: '2' } },
      { params: { postId: '3' } },
    ],
    fallback: false,
  };
}
```

3개의 목록이 있을 것이라는 것을 알고 3개를 미리 만들어달라고 Next.js에 명령한 것입니다. 당연히 현실의 실용적인 예시가 될 수 없습니다. API가 100개를 요청해야 하는 경우는 흔합니다. 동적으로 fetching하는 법으로 고치는 법을 다룹니다.

```jsx
import Link from 'next/link';

function PostList({ posts }) {
  return (
    <>
      <h1>List of Posts</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`posts/${post.id}`} passHref>
              <h2>
                {post.title} {post.id}
              </h2>
            </Link>
            <hr />
          </div>
        );
      })}
    </>
  );
}

export default PostList;

export async function getStaticProps() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);

  const data = await response.json();

  return {
    props: { posts: data },
  };
}
```

3개로 제한해둔 것을 풀어둡니다.

```jsx
export async function getStaticPaths() {
  return {
    paths: [
      { params: { postId: '1' } },
      { params: { postId: '2' } },
      { params: { postId: '3' } },
    ],
    fallback: false,
  };
}
```

문제는 여기서입니다. 만약에 백엔드 엔지니어가 요청한 목록의 개수를 표시할 수 있게 만들면 일이 간단해집니다. 현실은 당연히 안해줄 것입니다.

pathArray를 만들기 위해 id를 활용하는 방법을 사용하겠습니다.

```jsx
export async function getStaticPaths() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await response.json();

  const paths = data.map((post) => ({
    params: {
      postId: `${post.id}`,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
```

아주 간단하게 이렇게 작성하면 동적으로 로직을 처리할 수 있습니다.

동적으로 사전에 랜더링을 합니다. 100개를 모두 만들어 준 것을 볼 수 있습니다.

물론 의문이 있을 것입니다. `fallback: false`이 무슨 기능을 할지 모릅니다.

# Next.js Tutorial - 26 - getStaticPaths fallback false

https://www.youtube.com/watch?v=ssVYQLGUHiI

먼저 `fallback` 설정은 강제됩니다. 무조건 명시해야 합니다. 3가지 값을 가질 수 있습니다.

false, true, blocking입니다. 성능을 이해하기 위해서는 이 3가지 설정을 모두 이해해야 합니다.

만약에 false 설정이 되어 있으면 getStaticPath는 getStaticProps에 의해 빌드타임에 랜더링 될 것입니다.

또 getStaticPath로 정의되지 않은 경로로 라우팅하면 404페이지를 보여주게 될 것입니다. 즉 없는 id를 라우팅하게 되면 404로 가게 됩니다.

언제 false로 설정하는가? 사전에 랜더링할 것이 별로 없으면 false로 설정하는 것이 좋습니다. 블로그처럼 글이 많지 않으면 괜찮습니다.

fallback이 true로 설정되어 있으면 더 복잡합니다.

# Next.js Tutorial - 27 - getStaticPaths fallback true

https://www.youtube.com/watch?v=j4nAZaPQzwc

만약 true로 설정하면 발생하는 일을 다룹니다.

랜더링 시점은 false랑 동일합니다. 하지만 존재하지 않는 경로는 접근했을 때 fallback 버전을 제공해줄 것입니다. 백그라운드에서 요청된 HTML과 JSON을 생성할 것입니다. 브라우저는 JSON을 받아 자동으로 랜더링할 것입니다. 유저입장에서는 fallback 페이지에서 full 페이지로 바뀐 경험을 하게 될 것입니다.

Next.js는 새롭데 만들어진 페이지를 트레킹합니다. 접진적인 요청이 생성된 페이지를 프리랜더링한 페이지처럼 보이게 됩니다.

```jsx
import { useRouter } from 'next/router';

function Post({ post }) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h2>
        {post.id}
        {post.title}
      </h2>
      <p>{post.body}</p>
    </>
  );
}

export default Post;

export async function getStaticProps(context) {
  const { params } = context;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );

  const data = await response.json();

  return {
    props: {
      post: data,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { postId: '1' } },
      { params: { postId: '2' } },
      { params: { postId: '3' } },
    ],
    fallback: true,
  };
}
```

```jsx
import Link from 'next/link';

function PostList({ posts }) {
  return (
    <>
      <h1>List of Posts</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`posts/${post.id}`} passHref>
              <h2>
                {post.title} {post.id}
              </h2>
            </Link>
            <hr />
          </div>
        );
      })}
    </>
  );
}

export default PostList;

export async function getStaticProps() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await response.json();

  return {
    props: {
      posts: data.slice(0, 3),
    },
  };
}
```

이전처럼 3개만 사전 랜더링하도록 했습니다. 사전에 랜더링하도록 설정하기 때문에 랜더링을 합니다. 하지만 빌드타임에 랜더링하도록 설정하지 않으면 404 페이지를 보여주지 않고 로딩을 잠시 보여주도록 합니다. 하지만 id로 4를 요청하게 되면 추가 요청하게 되면 서버랑 추가 통신을 하게 된 것입니다.

빌드타임에 생성되지 않으면 fallback 페이지를 보여줍니다. 백그라운드에서 요청한 HTML과 JSON을 생성합니다. 백그라운드에서 생성이 완료되면 full 페이지를 보여줍니다.

이런 fallback이 full로 전환할 때 설정을 이렇게 해줘야 합니다.

즉 id가 존재하지만 미리 랜더링을 하지 않는 것으로 설정하게 되는 것입니다.

여기서 문제입니다. id가 존재하지 않는 요청을 날리게 되면 어떻게 될 것인가? 404 페이지를 랜더링하게 설정할 수 있습니다.

```jsx
export async function getStaticProps(context) {
  const { params } = context;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );

  const data = await response.json();

  // 없는 요청시 404
  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: data,
    },
  };
}
```

이렇게 설정하면 간단하게 해결할 수 있습니다.

참고로 Next.js의 특이한 점 중 하나는 마운트 시점에 JSON을 요청하고 받습니다.

fallback을 true로 설정할 때는 조심하도록 합니다. 미리 어떤 요청에 어떻게 대응되는지 파악하고 사용하도록 합니다. true로 사용하는 유스케이스는 품목이 많은 커머스에 적합합니다. 1000개 품목을 쉽게 넘는 커머스에서는 빌드타임이 너무 극단적으로 오래 걸릴 것입니다.

# Next.js Tutorial - 28 - getStaticPaths fallback blocking

https://www.youtube.com/watch?v=5-qPviQG0AQ

fallback: 'blocking' 설정입니다. true 설정과 유사합니다. 새로운 콘텐츠를 서버에서 html이 생성되어도 볼 수 없습니다.

사용자 관점에서 브라우저는 페이지를 요청하고 로딩이 된 것처럼 보일 것입니다. 깜박임이 없습니다.

확인해보면 라우팅 속도가 더 빠르다는 것을 알 수 있습니다. 페이지가 서버에서 랜더링이 완료되고 HTML을 받아 보여줍니다. 여기서 제일 큰 차이는 블로킹 행위입니다. 요청이 완료되고 랜더링이 완료 되기 전까지 화면을 일부러 안 바꿉니다. 즉 로딩화면을 막는 것입니다.

언제 사용하는가? 로딩시간이 괭장히 짧으면 적절합니다. 레이아웃 쉬프트를 막을 수 있습니다. 일부 크롤러는 접근하지 못하는 경우들도 존재합니다. next.js 개발팀은 fallback을 true로 설정할 것을 권장합니다. 하지만 만약을 위해서는 'blocking'도 좋습니다.

# Next.js Tutorial - 29 - Incremental Static Regeneration

https://www.youtube.com/watch?v=d5unMDna5ng

Static Generation도 한계가 있습니다. 서버에서 html을 빌드타임에 랜더링하고 캐싱하고 응답으로 보내고 정적이기 때문에 SEO에 유리한 등 다양한 장점이 있습니다. 프로덕션에 자주 사용할 것 같지만 한계가 있습니다.

이슈입니다. 빌드타임이 앱의 사이즈와 비례합니다. 한번 생성된 페이지는 다시 빌드한 앱에서 오래 될 수 있습니다.

빌드타임과 페이지와 정비례합니다. 페이지 10페이지당 1초면 100개 제품이면 10초 빌드 타임이 걸립니다. 하지만 만약 제품이 10억개면 1억초가 필요합니다. 그리고 중간에 변경사항이 새롭게 생기면 비용문제가 상당히 클 것입니다.

앱을 몇번의 한번만 할 것이라고 착각하기 쉽습니다. 또 몇번만 하면 페이지에서 보이는 데이터는 오래되기 쉽습니다. 커머스의 경우 매일 가격이 변경될 경우 이를 반영하기 위해 매일 다시 빌딩해야 합니다. 작은 변화하나 때문에 다시 빌드해야 합니다.

getStaticPath로 일부 페이지만 랜더링할 수 있다고 생각할 수 있습니다. getStaticPath는 동적인 페이지에만 사용할 수 있기 때문에 문제가 됩니다.

물론 이 문제는 이커머스는 90% 동적인 페이지이기 때문에 대부분 해결할 수 있지만 그래도 한계가 있습니다. 예를 들어, 매일 가격이 변하는 식자재, 혹은 원자재를 커머스로 표시하고 싶은데 서버의 데이터가 변영이 안 될 수 있습니다.

최적화된 next.js 앱을 만들기 위해 필요합니다.

```jsx
// index.js
function ProductList({ products }) {
  return (
    <>
      <h1>List of products</h1>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <h2>
              {product.id} {product.title} {product.price}
            </h2>
            <hr />
          </div>
        );
      })}
    </>
  );
}

export default ProductList;

export async function getStaticProps() {
  console.log('Generating / Regenerating ProductList');
  const response = await fetch('http://localhost:4000/products');
  const data = await response.json();

  return {
    props: {
      products: data,
    },
    revalidate: 30,
  };
}
```

```jsx
// [productId].js
import { useRouter } from 'next/router';

function Product({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>
        {product.id} {product.title} {product.price}
      </h2>
      <p>{product.description}</p>
      <hr />
    </div>
  );
}

export default Product;

export async function getStaticProps(context) {
  const { params } = context;
  const response = await fetch(
    `http://localhost:4000/products/${params.productId}`
  );
  const data = await response.json();
  console.log(`Generating page for /products/${params.productId}`);

  return {
    props: {
      product: data,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { productId: '1' } }],
    fallback: true,
  };
}
```

```json
{
  "products": [
    {
      "id": 1,
      "title": "Product 1",
      "price": 700,
      "description": "Description 1"
    },
    {
      "id": 2,
      "title": "Product 2",
      "price": 1050,
      "description": "Description 2"
    },
    {
      "id": 3,
      "title": "Product 3",
      "price": 2600,
      "description": "Description 3"
    }
  ]
}
```

DB에서 데이터를 바꾸고 재요청을 해도 화면에 반영되지 않습니다. 이럴 때 필요한 것은 ISG입니다.

서버에 데이터 요청을 빌드타임에 실행하기 때문에 생기는 문제입니다. 1은 빌드타임에 요청이 가고 2는 런타임에 요청이 가기 때문에 다른 것입니다. 하지만 페이지를 접근하고 새로 고침을 하면 데이터가 남습니다. 최초 로딩이후 페이지는 캐싱이 됩니다. 그래서 서버와 싱크가 틀어집니다. 다시 빌딩하지 않고 해결하는 방법이 ISG입니다.

ISR로 사이트 전체를 다시 빌딩하지 않고 서버랑 일치하는 데이터를 갖도록 만들 수 있습니다.

`revalidate`을 키로 입력하면 됩니다.

# Next.js Tutorial - 30 - Inspecting ISR Builds

https://www.youtube.com/watch?v=FZTaD32ueE8

ISG 예시입니다. 서버의 데이터를 반영하는 일부 페이지들이 있습니다. ISG는 정적 페이지를 빌드 이후 업데이트하는 방법은 revalidate를 키로 지정하면 간단하게 구현할 수 있습니다.

```jsx
export async function getStaticProps(context) {
  const { params } = context;
  const response = await fetch(
    `http://localhost:4000/products/${params.productId}`
  );
  const data = await response.json();
  console.log(`Generating page for /products/${params.productId}`);

  return {
    props: {
      product: data,
    },
    revalidate: 10,
  };
}
```

이렇게 revalidate를 설정하면 됩니다. 10초를 기준으로 업데이트를 반영합니다.

조금 더 자세히 알아 둘 것이 있습니다.

ISR인지 ISG인지 빌드 리포트에 모두 표시해줍니다.

10초를 기준으로 새로고침할 때마다 `console.log`를 확인할 수 있습니다. 10초 내에 100번을 새로 고침을 하면 재생성은 없습니다. 재 생성은 10초 이후 요청이 발생했을 때만 재생성합니다.

API 데이터가 변경되었을 때 언제 도움될지 알 수 있습니다.

사용자가 페이지를 요청합니다. 사용자는 페이지를 받습니다. 10초 내에 새로고침인 재요청을 하면 다시 캐싱된 페이지를 보여줍니다. 하지만 10초 이후 새로고침하면 재랜더링하고 클라이언트에게 응답합니다. 이런 이유로 10초 전에는 캐싱된 오래된 데이터를 보여주고 10초 이후 브라우저에 반영하고 보여줍니다.

동적일수록 서버의 부하가 커질 것이라는 예측을 해볼 수 있습니다.

ISR은 재랜더링이라는 점이 다른 것입니다.

재생성에 대한 점입니다. 사용자의 요청이 revalidate time 이후에만 현재 서버의 데이터가 반영이 됩니다. 상당히 유용한 도구입니다.

하지만 가끔은 실시간으로 계속 데이터를 반영해줘야 하는 경우가 있습니다. 이것은 SSR입니다.

# Next.js Tutorial - 31 - Server-side Rendering

https://www.youtube.com/watch?v=3eUZeuGXo_U

프리랜더링은 SSG랑 SSR 2가지를 배웠습니다. SSG는 빌드타임에 만들어지고 요청에 따라 캐싱하게 만들 수 있습니다. 동적으로 라우팅의 경우 요청에 랜더링이 발생합니다. ISR은 시간 설정을 하고 초과했을 때 다시 랜더링하게 만듭니다.

SSG는 한계가 있습니다. 요청할 때 데이터를 얻어올 수 없습니다. 뉴스는 매초에 올라올 수 있습니다. 뉴스 사이트는 실시간 반영이 필요합니다.

getStaticPath도 ISR 간격을 짧게 해도 좋지 않습니다. 차라리 컴포넌트에서 get 요청을 날리게 하는 것이 더 효율적일 것입니다.

SSG는 데이터를 요청하고 프리랜더링할 수 없습니다. 또 빌드타임에 요청하기 때문에 특정 유저에게만 보이는 개인화된 콘텐츠를 제공하면 문제가 됩니다. 트위터는 실시간 그 특정 유저에게 반영해줘야 합니다.

SSG는 데이터를 특정 유저에게만 적합한 랜더링하는데 한계가 있습니다.

SSR은 요청 시간에 랜더링합니다. 특정 요청을 서버가 받고 랜더링하고 클라이언트에게 html로 응답합니다.

SSR은 요청마다 데이터를 요청하는 것으로 대응하면서 SEO의 장점도 같이 챙길 수 있습니다.

Next.js는 요청에 데이터를 다시 요청하고 개인화된 화면을 랜더링해줄 수 있습니다.

# Next.js Tutorial - 32 - SSR with getServerSideProps

https://www.youtube.com/watch?v=cPqG8-NoxM0

SSR을 요청에 랜더링을 처리하도록 만들 수 있다는 것을 배웠습니다.

```json
{
  "news": [
    {
      "id": 1,
      "title": "News Article 1",
      "description": "Description 1",
      "category": "sports"
    },
    {
      "id": 2,
      "title": "News Article 2",
      "description": "Description 2",
      "category": "politics"
    },
    {
      "id": 3,
      "title": "News Article 3",
      "description": "Description 3",
      "category": "sports"
    }
  ]
}
```

데이터는 이렇게 생겼습니다.

```jsx
function NewsArticleList() {
  return <h1>List of News Articles</h1>;
}

export default NewsArticleList;
```

이제 여기서 서버사이드 랜더링을 적용해보겠습니다.

getStaticProps랑 유사한 함수를 작성합니다. getServerSideProps입니다.

```jsx
function NewsArticleList({ articles }) {
  return (
    <>
      <h1>List of News Articles</h1>
      {articles.map((article) => {
        return (
          <div key={article.id}>
            <div>{article.title}</div>
          </div>
        );
      })}
    </>
  );
}

export default NewsArticleList;

export async function getServerSideProps() {
  const response = await fetch(`http://localhost:4000/news`);
  const data = await response.json();

  return {
    props: {
      articles: data,
    },
  };
}
```

이렇게 하면 서버사이드 랜더링이 구현됩니다. 서버가 실행되는 동안 요청에 따라 서버가 랜더링을 처리합니다. 당연히 SSG보다 훨씬더 느립니다. 이렇게 느린 이유로 SSR은 꼭 필요한 경우에만 사용하도록 합니다.

getServerSideProps는 번들이 같이 되어 있지 않습니다.

특이한점은 fs모듈, DB 쿼리는 getStaticPath처럼 동일하게 동작합니다. 또 API키는 클라이언트에게 보이지 않습니다.

클라이언트 사이드 데이터 요청이 아닙니다. 클라이언트 사이드로 페이지만 요청하고 서버가 페이지를 랜더링만 해주는 것 뿐입니다.

다음에는 동적 파라미터를 서버사이드 랜더링하는 법을 알아봅니다.

# Next.js Tutorial - 33 - SSR with Dynamic Parameters

https://www.youtube.com/watch?v=UP8s2_8jxIQ

동적 파리미터로 제어하는 법을 적용하고 싶습니다. 여기서 할 것은 뉴스 카테고리에 따라 라우팅하고 보일 뉴스항목을 제어하는 것입니다.

```jsx
// [category].js
function ArticleListByCategory({ articles, category }) {
  return (
    <>
      <h1>{category}</h1>
      {articles.map((article) => {
        return (
          <div key={article.id}>
            <div>{article.title}</div>
            <div>{article.category}</div>
            <div>{article.description}</div>
          </div>
        );
      })}
    </>
  );
}

export default ArticleListByCategory;

export async function getServerSideProps(context) {
  const {
    params: { category },
  } = context;
  const response = await fetch(
    `http://localhost:4000/news?category=${category}`
  );
  const data = await response.json();

  return {
    props: {
      articles: data,
      category,
    },
  };
}
```

```url
http://localhost:3000/news/sports
```

이렇게 작성하면 요청에 따라 동적으로 랜더링이 됩니다.

# Next.js Tutorial - 34 - getServerSideProps context

https://www.youtube.com/watch?v=DgLb5E6omTg

서버사이드 랜더링은 요청에 특정 유저에게만 해당하는 요청을 대응할 수 있습니다.

request, response 데이터를 접근할 수 있습니다.

```jsx
export async function getServerSideProps(context) {
  const {
    params: { category },
    req,
    res,
    query,
  } = context;
  const response = await fetch(
    `http://localhost:4000/news?category=${category}`
  );
  const data = await response.json();

  res.setHeader('Set-Cookie', ['name=Jake']);
  console.log(query);

  return {
    props: {
      articles: data,
      category,
    },
  };
}
```

이렇게 request, response를 접근하고 제어할 수 있습니다. 쿼리를 접근하는 것도 가능합니다. url을 공유하게 만들 수 있습니다. url에 따라 다른 화면을 랜더링하도록 동작하게 만드는 것입니다.

# Next.js Tutorial - 35 - Inspecting SSR Builds

https://www.youtube.com/watch?v=IbA9z9iMEJs

```txt
λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
   (ISR)     incremental static regeneration (uses revalidate in getStaticProps)
```

λ 람다 기호입니다. 람다 기호가 있으면 서버사이드 랜더링을 의미합니다.

서버사이드 랜더링이기 때문에 요청시점에 getServerSideProps가 실행되고 `console.log`가 보이게 됩니다.

# Next.js Tutorial - 36 - Client-side Data Fetching

https://www.youtube.com/watch?v=k9b_tIhnkls

또 서버사이드 랜더링도 유스케이스에 따라 당연히 한계가 있습니다. 모든 경우 프리랜더링해줄 필요는 없습니다.

대시보드 페이지는 SEO는 필요없고 실시간 업데이트가 더 중요할 것입니다. 이런 대시보드는 보통 개인적이고 유저개인화가 강합니다. 그래서 프리랜더링해줄 필요가 없습니다. 이런 이유로 클라이언트 사이드에서 데이터 요청하는 것이 더 좋습니다.

```json
{
  "dashboard": {
    "posts": 5,
    "likes": 100,
    "followers": 20,
    "following": 50
  }
}
```

접근할 리소스입니다.

일반적인 리액트랑 동일하게 데이터 요청이 가능합니다.

```jsx
import { useEffect, useState } from 'react';

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      const response = await fetch('http://localhost:4000/dashboard');
      const data = await response.json();
      setDashboardData(data);
      setIsLoading(false);
    }
    fetchDashboardData();
  }, []);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Dashboard</h2>
      <h2>Posts - {dashboardData.posts}</h2>
      <h2>Likes - {dashboardData.likes}</h2>
      <h2>followers - {dashboardData.followers}</h2>
      <h2>following - {dashboardData.following}</h2>
    </div>
  );
}

export default Dashboard;
```

상당히 전통적으로 보이는 코드입니다.

Next.js는 프리랜더링을 해주지만 초기값만 프리랜더링을 해줍니다. Next.js는 요청 응답을 기다리지 않고 일단 화면에 Loading을 랜더링합니다. 페이지가 컴포넌트로 나누어지고 각각 데이터를 접근해야 하는 상황에 유용합니다. 컴포넌트 단위로 통신해야 할때 사용할 때는 getStaticProps, getServerSideProps가 없기 때문에 이렇게 처리합니다. 하지만 fetch API로 강제 된 것은 아닙니다. axios를 응용해도 됩니다. 또 Next.js 개발팀은 SWR을 같이 사용할 것을 권장합니다.

# Next.js Tutorial - 37 - SWR for Client-side Data Fetching

https://www.youtube.com/watch?v=CQ5yHU1wYOo

https://swr.vercel.app/ko

캐싱, 포커스 등 다양한 기능들이 있습니다.

```sh
yarn add swr
```

이렇게 설치합니다.

```jsx
import useSWR from 'swr';

const fetcher = async () => {
  const response = await fetch('http://localhost:4000/dashboard');
  const data = await response.json();
  return data;
};

function DashboardSWR() {
  const { data, error } = useSWR('dashboard', fetcher);

  if (error) return '에러 발생';
  if (!data) return 'Loading';

  return (
    <div>
      <h2>dashboard</h2>
      <h2>posts - {data.posts}</h2>
      <h2>likes - {data.likes}</h2>
      <h2>followers - {data.followers}</h2>
      <h2>following - {data.following}</h2>
    </div>
  );
}

export default DashboardSWR;
```

훨씬더 간단합니다. 쿼리 클라이언트로 감싸줄 필요가 없습니다.

탭을 바꾸고 화면에 포커스가 되면 서버의 데이터가 바로 반영되어 있습니다.

직접 작성하는 것보다 훨씬더 효율적입니다.

# Next.js Tutorial - 38 - Pre rendering + Client side Data Fetching

https://www.youtube.com/watch?v=yFvLLPBubfw

프리랜더링과 클라이언트 사이드 데이터 요청을 동시에 하는 법을 다룹니다.

프리랜더링으로 SSR을 합니다. 그리고 이벤트가 발생하면 클라이언트 사이드로 추가 요청이 발생하게 만듭니다.

```json
{
  "events": [
    {
      "id": 1,
      "title": "Event 1",
      "description": "Description 1",
      "category": "sports",
      "date": "April 25"
    },
    {
      "id": 2,
      "title": "Event 2",
      "description": "Description 2",
      "category": "technology",
      "date": "May 25"
    },
    {
      "id": 3,
      "title": "Event 3",
      "description": "Description 3",
      "category": "food",
      "date": "October 25"
    },
    {
      "id": 4,
      "title": "Event 4",
      "description": "Description 4",
      "category": "food",
      "date": "April 25"
    },
    {
      "id": 5,
      "title": "Event 5",
      "description": "Description 5",
      "category": "sports",
      "date": "January 15"
    },
    {
      "id": 6,
      "title": "Event 6",
      "description": "Description 6",
      "category": "art",
      "date": "April 25"
    },
    {
      "id": 7,
      "title": "Event 7",
      "description": "Description 7",
      "category": "technology",
      "date": "June 25"
    },
    {
      "id": 8,
      "title": "Event 8",
      "description": "Description 8",
      "category": "sports",
      "date": "February 28"
    },
    {
      "id": 9,
      "title": "Event 9",
      "description": "Description 9",
      "category": "food",
      "date": "April 25"
    },
    {
      "id": 10,
      "title": "Event 10",
      "description": "Description 10",
      "category": "sports",
      "date": "August 5"
    }
  ]
}
```

이런 데이터가 존재합니다.

```jsx
// events.js
function EventList({ eventList }) {
  return (
    <>
      <h1>List of events</h1>
      {eventList.map((event) => {
        return (
          <div key={event.id}>
            <h2>
              {event.id} {event.title} {event.date} | {event.category}
            </h2>
            <p>{event.description}</p>
            <hr />
          </div>
        );
      })}
    </>
  );
}

export default EventList;

export async function getServerSideProps() {
  const response = await fetch(`http://localhost:4000/events`);
  const data = await response.json();

  return {
    props: {
      eventList: data,
    },
  };
}
```

현재 이렇게 작성되어 있습니다. SSR로 보는 일반적인 페이지컴포넌트입니다. 하지만 유저가 카테고리에 따라 쿼리로 필터링하기 바랍니다.

```jsx
import { useState } from 'react';

function EventList({ eventList }) {
  const [events, setEvents] = useState(eventList);

  const fetchSportsEvents = async () => {
    const response = await fetch(
      `http://localhost:4000/events?category=sports`
    );
    const data = await response.json();
    setEvents(data);
  };

  return (
    <>
      <h1>List of events</h1>
      <button onClick={fetchSportsEvents}>Sports Events</button>
      {events.map((event) => {
        return (
          <div key={event.id}>
            <h2>
              {event.id} {event.title} {event.date} | {event.category}
            </h2>
            <p>{event.description}</p>
            <hr />
          </div>
        );
      })}
    </>
  );
}

export default EventList;

export async function getServerSideProps() {
  const response = await fetch(`http://localhost:4000/events`);
  const data = await response.json();

  return {
    props: {
      eventList: data,
    },
  };
}
```

프리랜더링되어 있고 필터되어 있는 화면도 보여집니다. 하지만 한계가 있습니다. 버튼을 클릭하면 url이 그대로 입니다. 이럴 때 할 수 있는 것은 얕은 라우팅입니다.

```jsx
import { useRouter } from 'next/router';
import { useState } from 'react';

function EventList({ eventList }) {
  const [events, setEvents] = useState(eventList);

  // useRouter hook으로 url 데이터를 접근하기 위해 선언합니다.
  const router = useRouter();

  const fetchSportsEvents = async () => {
    const response = await fetch(
      `http://localhost:4000/events?category=sports`
    );
    const data = await response.json();
    setEvents(data);

    // url에 해당하는 쿼리문자열을 보이도록 합니다. 그리고 얕은 라우팅을 설정합니다.
    router.push('/events?category=sports', undefined, { shallow: true });
  };

  return (
    <>
      <h1>List of events</h1>
      <button onClick={fetchSportsEvents}>Sports Events</button>
      {events.map((event) => {
        return (
          <div key={event.id}>
            <h2>
              {event.id} {event.title} {event.date} | {event.category}
            </h2>
            <p>{event.description}</p>
            <hr />
          </div>
        );
      })}
    </>
  );
}

export default EventList;

export async function getServerSideProps(context) {
  const {
    query: { category },
  } = context;

  // 쿼리문자열이 존재하면 해당하는 요청을 보냅니다.
  const queryString = category ? 'category=sports' : '';
  const response = await fetch(`http://localhost:4000/events?${queryString}`);
  const data = await response.json();

  return {
    props: {
      eventList: data,
    },
  };
}
```

이렇게 새로침해도 남아있습니다. 이렇게 되면 url을 공유하면 필터해둔 것들도 공유가 됩니다. 이렇게 되면 SEO에도 유리합니다.

여기서 의문이 생길 것입니다. 모든 데이터를 이미 받아왔는데 받아온 데이터를 클라이언트 사이드로 필터링할 수 있지 않는가? 의문입니다. 모든 데이터를 다 받아왔을 경우에만 해당합니다. 실제는 10000개 넘는 데이터를 받습니다. 그리고 화면에는 100개만 보일 것입니다. 그리고 100개만 필터링하게 되는 것입니다. 전체 10000개를 필터링하는 것이 아닙니다. 이런 이유로 클라이언트 요청으로 필터링합니다.

다음 의문입니다. 쿼리파라미터로 필터를 만드는 이유입니다. 동적으로 분류하는 것도 가능할텐데 말입니다. ?쿼리 대신에 /로 분류하는 것은 가능할 것입니다. 하지만 이런 필터는 종속관계에 가능합니다. 하지만 현실의 많은 분류는 대등관계인 경우가 많습니다. 너무 많은 분류는 비효율적입니다. 이럴 때는 얕은 라우팅으로 처리하는 것이 더 효율적입니다.

더 효율적인 것과 덜 효율적인 것들은 실무해보면서 다시 느낌이 올 것입니다.

# Next.js Tutorial - 39 - Pre-rendering & Data Fetching Summary

https://www.youtube.com/watch?v=cBWzJlVWuR0

요약입니다. 프리랜더링과 데이터 fetch 패턴을 봤습니다. 프리랜더링으로 클라이언트측 성능 개선과 SEO 개선을 다루었습니다.

SSG는 한번 만들어지고 캐싱된다고 했습니다. 기본적으로 가장 권장되는 방식입니다. 마케팅, 블로그에 적합합니다.

동적 페이지는 getStaticPath로 프리랜더링할 페이지를 지정하도록 했습니다. fallback이 어떻게 동작할지도 다루었습니다.

pages는 리빌딩없이는 변경이 없다는 것도 배웠습니다.

SSR을 배웠습니다. 요청시간에 랜더링을 하고 사용자 개인화된 요청을 구현하기 적합합니다. 당연히 성능이 떨어집니다. 뉴스 사이트에 적합니다.

클라이언트 사이드 fetching을 위해 사용할 방식입니다. 얕은 라우팅은 서버사이드 함수를 다시 불러오지 않습니다. 하지만 url 공유가 가능하게 해줍니다.

# Next.js Tutorial - 40 - API Routes Section Intro

https://www.youtube.com/watch?v=5QDrrirlgmI

Next.js의 세번째 기능입니다. 바로 API 라우팅입니다.

- 기능을 이해합니다. 기본적인 API를 만드는 법을 배웁니다.
- get 이외 요청을 보내는 법을 배웁니다.
- 동적인 API 라우팅을 만드는 법을 배웁니다.
- Catch all API 라우팅을 배웁니다.

# Next.js Tutorial - 41 - API Routes

https://www.youtube.com/watch?v=aZkZUduCauo

Next.js는 풀스택 프레임워크입니다. 리액트로 프론트엔드를 작성하고 Next.js로 백엔드를 작성할 수 있습니다.

지금 백엔드는 API로 RESTful API를 작성할 수 있습니다.

리액트에 노드앱을 결합한 형태입니다.

api를 만들 때는 pages 속에 api 폴더를 만들어야 합니다. 그리고 엔드포인트로 취급해야 합니다.

```txt
/pages
  /api
    (API 파일이름).js
```

컨벤션상 핸들러라고 부릅니다. 들어오는 요청을 핸들링하기 때문에 그렇습니다.

지금은 이렇게 폴더를 이렇게 작성하겠습니다.

```txt
/pages
  /api
    index.js
```

```js
export default function handler(req, res) {
  res.status(200).json({ name: 'Home API route' });
}
```

```url
http://localhost:3000/api
```

브라우저를 확인하면 응답을 볼 수 있습니다.

api는 폴더 구조로 자동 맵핑이 됩니다.

index가 아니면

```url
http://localhost:3000/api/dashboard
```

이렇게 작성되어 있어야 합니다.

중접 api를 설계하는 것도 가능합니다.

```url
http://localhost:3000/api/blog/recent
```

이런 요청은

```txt
/pages
  /api
    /blog
      index.js
      recent.js
```

이런 폴더 구조로 만들면 구현할 수 있습니다.

커스텀 서버코드를 작성하지 않을 수 있습니다. 외부 API을 접근하고 마스크하거나 환경변수를 설정해서 외부 서비스랑 차단하게 만들 수 있습니다. 프론트엔드랑 번들링될 일이 없습니다.

같은 폴더에서 API를 만들 수 있게 됩니다.

# Next.js Tutorial - 42 - API GET Request

https://www.youtube.com/watch?v=GgzWFxIiwK4

일반 프로덕션 앱에서는 클릭에 CRUD를 해야 할 것입니다. get 요청을 날리는 방법을 배울 것입니다.

```js
export const comments = [
  {
    id: 1,
    text: 'This is the first comment',
  },
  {
    id: 2,
    text: 'This is the second comment',
  },
  {
    id: 3,
    text: 'This is the third comment',
  },
];
```

현재는 이정도 데이터만 활용합니다.

리소스(Comments, blog)의 index.js api에는 기본 핸들러를 설정하는 것이 좋습니다.

```js
import { comments } from '../../../data/comments';

export default function handler(req, res) {
  res.status(200).json(comments);
}
```

```url
http://localhost:3000/api/comments
```

```jsx
import { useState } from 'react';

function CommentsPage() {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const response = await fetch('/api/comments');
    const data = await response.json();
    setComments(data);
  };

  return (
    <>
      <button onClick={fetchComments}>Load comments</button>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            {comment.id} {comment.text}
          </div>
        );
      })}
    </>
  );
}

export default CommentsPage;
```

이렇게 작성하면 클라이언트 사이드에서 서버로 요청이 오고 화면에 반영해줍니다.

프론트엔드와 백엔드를 동시에 구현하게 된 것입니다.

# Next.js Tutorial - 43 - API POST Request

https://www.youtube.com/watch?v=wqHGLjuXuHo

```jsx
import { useState } from 'react';

function CommentsPage() {
  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState('');

  const fetchComments = async () => {
    const response = await fetch('/api/comments');
    const data = await response.json();
    setComments(data);
  };

  const submitComment = async () => {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={submitComment}>Submit Comment</button>
      <button onClick={fetchComments}>Load comments</button>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            {comment.id} {comment.text}
          </div>
        );
      })}
    </>
  );
}

export default CommentsPage;
```

프론트엔드 코드 입니다.

```js
import { comments } from '../../../data/comments';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(comments);
  } else if (req.method === 'POST') {
    const comment = req.body.comment;
    const newComment = {
      id: Date.now(),
      text: comment,
    };
    comments.push(newComment);
    res.status(201).json(newComment);
  }
}
```

post 기능이 추가된 백엔드입니다.

# Next.js Tutorial - 44 - Dynamic API Routes

https://www.youtube.com/watch?v=tuxk_VbocBk

이번에는 삭제 요청입니다. 삭제하려는 id를 명시해야 가능한 요청입니다. 요청하는 것이 동적인 API가 됩니다.

동적 요청을 id를 붙여서 보내기 때문에 다음처럼 파일을 만들어야 합니다.

```txt
/pages
  /api
    /comments
      [commentId].js
      index.js
```

이렇게 작성해야 `[commentId].js`이 동적인 요청을 처리할 수 있습니다.

```js
// [commentId].js
import { comments } from '../../../data/comments';

export default function handler(req, res) {
  const { commentId } = req.query;
  const comment = comments.find(
    (comment) => comment.id === parseInt(commentId)
  );
  res.status(200).json(comment);
}
```

id를 기준으로 리소스 중 하나의 row를 얻는 방법입니다.

# Next.js Tutorial - 45 - API DELETE Request

https://www.youtube.com/watch?v=je8jPi8KOY4

삭제버튼을 추가합니다.

```jsx
import { useState } from 'react';

function CommentsPage() {
  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState('');

  const fetchComments = async () => {
    const response = await fetch('/api/comments');
    const data = await response.json();
    setComments(data);
  };

  const submitComment = async () => {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const deleteComment = async (commentId) => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
    fetchComments();
  };

  return (
    <>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={submitComment}>Submit Comment</button>
      <button onClick={fetchComments}>Load comments</button>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            {comment.id} {comment.text}
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
          </div>
        );
      })}
    </>
  );
}

export default CommentsPage;
```

전체 코드입니다.

```jsx
const deleteComment = async (commentId) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  console.log(data);
  fetchComments();
};

return (
  <>
    {comments.map((comment) => {
      return (
        <div key={comment.id}>
          {comment.id} {comment.text}
          <button onClick={() => deleteComment(comment.id)}>Delete</button>
        </div>
      );
    })}
  </>
);
```

여기만 보면 됩니다.

여기까지가 프론트엔드 입니다.

```js
import { comments } from '../../../data/comments';

export default function handler(req, res) {
  const { commentId } = req.query;

  if (req.method === 'GET') {
    const comment = comments.find(
      (comment) => comment.id === parseInt(commentId)
    );
    res.status(200).json(comment);
  } else if (req.method === 'DELETE') {
    const deleteComment = comments.find(
      (comment) => comment.id === parseInt(commentId)
    );

    const index = comments.findIndex(
      (comment) => comment.id === parseInt(commentId)
    );

    comments.splice(index, 1);

    res.status(200).json(deleteComment);
  }
}
```

여기가 백엔드입니다.

개별 row에 get요청을 보낼 수 있는지 확인하고 삭제를 구현하면 쉽습니다. 삭제를 처리하는 로직은 취향이지만 어째든 같은 코드베이스에서 구현이 가능합니다.

# Next.js Tutorial - 46 - Catch All API Routes

https://www.youtube.com/watch?v=Y8HJCfWRMTE

API 라우팅으로 다양하게 요청을 처리할 수 있습니다. 가끔은 요청이 선택적일 때도 있습니다.

```url
http://localhost:3000/api/seg1/seg2/seg3
```

위처럼 여러 요청이 포함관계로 만들어 질 수 있습니다. 이때 필요한 것은 Catch All API Routes입니다.

`[...params].js`으로 쿼리 객체를 만들고 핸들링할 수 있습니다.

```js
// [...params].js
export default function handler(req, res) {
  const params = req.query.params;
  console.log(params);
  res.status(200).json(params);
}
```

이렇게 만들고 아래처럼 요청을 보내면

```url
http://localhost:3000/api/one/two/three
```

```json
["one", "two", "three"]
```

이렇게 응답을 받을 수 있습니다.

Optional Catch all routes 구현도 가능합니다.

요구사항에 따라 Option Catch all routes를 구현해야 하면 폴더의 index.js를 삭제하고 `[[...params]].js`로 파일이름을 반경합니다.

# Next.js Tutorial - 47 - APIs and Pre-rendering

https://www.youtube.com/watch?v=lmB340ym6SE

프리랜더링과 API입니다.

```jsx
import { comments } from '../../data/comments';

function Comment({ comment }) {
  return (
    <div>
      {comment.id} {comment.text}
    </div>
  );
}

export default Comment;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { commentId: '1' } },
      { params: { commentId: '2' } },
      { params: { commentId: '3' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const {
    params: { commentId },
  } = context;

  const comment = comments.find(
    (comment) => comment.id === parseInt(commentId)
  );

  /** Don't do this 
  const response = await fetch(`http:localhost:3000/api/comments/${commentId}`)
  const data = await response.json()
  */

  return {
    props: {
      comment,
    },
  };
}
```

동일한 서버에서 요청을 날리는 것 자체가 비효율적입니다. 그렇기 때문에 100ms정도 절약될 것입니다.

리소스를 이미 공유하고 있기 때문에 요청없이 로직을 처리할 수 있습니다.

그래서 외부 api처럼 불필요한 요청을 보내는 것으로 계산할 수 있는 리소스를 낭비하지 않도록 합니다.

# Next.js Tutorial - 48 - API Routes Summary

https://www.youtube.com/watch?v=_v_irwUqBUM

api 라우팅은 페이지별 라우팅과 유사하다는 것을 배웠습니다. 파일 이름에 따라 API 라우트를 구현할 수 있다는 것을 발견했습니다.

RESTfull Api를 구현하는 것이 가능하다는 것을 배웠습니다.

프리랜더링에서 API 요청을 하지 않도록 배웠습니다. 여기까지는 Next.js의 핵심 개념 3가지를 배운 것입니다. 다음은 작지만 중요한 부분들을 다룹니다. 스타일링으로 시작합니다.

# Next.js Tutorial - 49 - Styling Section Intro

https://www.youtube.com/watch?v=V2SJpj2Jrx4

스타일링은 모든 앱을 만들 때 반드시 필요합니다. Global Styles, 컴포넌트 스타일, SCSS 다루기, CSS-in-JS를 다룹니다.

# Next.js Tutorial - 50 - Global Styles

https://www.youtube.com/watch?v=k0UTW9dwfbk

글로벌 스타일은 이미 Next.js를 생성할 때 이미 제공해줍니다.

```jsx
// _app.js
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

글로벌 스타일 적용에서 제일 중요한 것은 이부분입니다.

globals.css를 한번 적용하면 전역으로 적용이 가능합니다.

하지만 가끔은 외부 CSS 라이브러리를 가져와야 할 때가 있을 수 있습니다. 규칙은 동일합니다.

다음에는 컴포넌트로 스코프된 스타일링을 다룹니다.

# Next.js Tutorial - 51 - Component Level Styles

https://www.youtube.com/watch?v=NHr1HduGz08

컴포넌트 단위 스타일링은 CSS 모듈을 지원합니다.

컴포넌트명.module.css로 명명합니다. module이라는 이름을 붙이는 것은 중요합니다. 이런 구분이 있어야 Next.js아 알 수 있습니다.

스타일 객체를 접근하는 방식이 특이합니다.

CSS 모듈의 장점은 로컬로 한정된 고유한 클래스이름을 만들 수 있습니다. 클래스 이름 충돌을 걱정할 필요가 없습니다.

```jsx
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
```

기본 제공하는 index.js를 보면 `className={styles.logo}`이라는 것을 볼 수 있습니다.

컴포넌트단위로 적용하기 때문에 이름 중복문제가 전혀 없습니다. CSS 모듈을 기본적으로 적용하는 장점이 있습니다.

```css
.footer {
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

css에서는 이렇게 작성하면 됩니다.

# Next.js Tutorial - 52 - SASS Support

https://www.youtube.com/watch?v=_14sPRuHcYw

SCSS가 모듈 CSS보다 아마 더 편안할 것입니다.

시작은 설치부터입니다.

```sh
yarn add sass
```

SCSS 확장자로 파일을 만들면 됩니다.

# Next.js Tutorial - 53 - CSS in JS

https://www.youtube.com/watch?v=Tj22PRt2hiU

CSS in JS를 구현하는 가장 첫번째로 접하게 되는 것은 인라인 스타일링입니다.

styled-components가 더 유리할 것입니다.

`_app.js`가 app컴포넌트 역할을 하기 때문에 provider를 감쌀 때는 여기서 처리합니다.

```js
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#355C7D',
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
```

이렇게 작성하면 간단하게 처리할 수 있습니다. 리액트의 일반적인 스타일 컴포넌트처럼 작성하면 됩니다.

# Next.js Tutorial - 54 - Styling Summary

https://www.youtube.com/watch?v=c0RnUgZSIDs

스타일링 요약합니다. 전역 스타일링, 컴포넌트 단위 스타일링, SCSS, CSS-in-JS까지 배웠습니다. 일반적인 리액트랑 크게 다르지 않습니다.

# Next.js Tutorial - 55 - Miscellaneous Section Intro

https://www.youtube.com/watch?v=xm108xB0LT0

알면 좋지만 분류하기 어려운 지식들입니다. 여기는 레이아웃을 만드는 법부터 Head Component활용법, image 컴포넌트 활용법, 절대 imports, 모듈 경로, 정적 HTML export, 타입스크립트 설정, 프리뷰, Next Config 파일, 리다이렉션, 환경 변수 이런 잡다하고 유용한 것들을 다룹니다.

# Next.js Tutorial - 56 - App Layout

https://www.youtube.com/watch?v=9g_3Zsoj17I

보통 고정된 레이아웃을 갖는 경우가 많습니다. 이런 설정은 `_app.js`에서 설정합니다.

```jsx
// _app.js
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
```

이렇게 레이아웃과 관련된 컴포넌트를 정의할 수 있습니다.

```jsx
export default function About() {
  return <div>About</div>;
}
```

이렇게 about 페이지에서 header와 footer가 보입니다.

여기서 만약에 로그인페이지처럼 header, footer가 존재하는 것을 막으려는 상황이 생길 수 있습니다.

해당하는 페이지에서 보여줄 레이아웃 컴포넌트를 갱신합니다.

```jsx
import Footer from '@/components/Footer';

export default function About() {
  return <div>About</div>;
}

About.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
      <Footer />
    </>
  );
};
```

```jsx
// _app.js
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
```

갱신이 가능하게 설정합니다.

# Next.js Tutorial - 57 - Head Component

https://www.youtube.com/watch?v=vWWd5ezQTic

Next.js에서 제공하는 Head 컴포넌트입니다. Next.js는 동적으로 HTML의 head태그를 제어할 수 있게 해줍니다. 검색엔진에 유리해질 수 있게 제어할 수 있습니다.

```jsx
import Footer from '@/components/Footer';
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About ㅇㅇ</title>
        <meta name="description" content="Free tutorials" />
      </Head>
      <div>About</div>
    </>
  );
}

About.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
      <Footer />
    </>
  );
};
```

이렇게 작성하면 간편히 라우팅된 페이지마다 head 태그를 작성할 수 있습니다.

모든페이지에 적용하는 것은 낭비입니다. 그래서 `_app.js`에서 공통으로 적용할 Head를 작성합니다.

당연히 해당하는 페이지의 테그가 전역으로 설정한 태그보다 높은 우선순위를 갖습니다. 또 JSX답게 props의 값을 참조해서 랜더링하게 만들 수 있습니다.

SEO에 도움이 많이 됩니다.

# Next.js Tutorial - 58 - Image Component

https://www.youtube.com/watch?v=ZRZngn_GdXY

인터페이스에 이미지를 포함하는 경우는 많습니다. 상세페에지부터 랜딩페이지까지 모두 이미지에서 중요한 역할을 하고 또 성능에도 큰 영향을 미칩니다.

이미지는 루트 디렉토리에서 public에 넣습니다.

```jsx
import Image from 'next/image';

function PetsPage() {
  return (
    <div>
      {['1', '2', '3', '4', '5'].map((path) => {
        return (
          <div key={path}>
            <Image src={`/${path}.jpg`} alt="pet" width="280" height="420" />
          </div>
        );
      })}
    </div>
  );
}

export default PetsPage;
```

이미지 컴포넌트는 이렇게 만들 수 있습니다. 참고로 Next.js는 img 태그 대신에 이미지 컴포넌트를 사용할 것을 권장합니다.

`src`는 `public`이기 때문에 이렇게 작성해도 됩니다.

Next.js가 알아서 최적화를 해줍니다. 이미지사이즈를 알아서 줄여줍니다.

화면이 안 보이는 동안에 레이지로딩 처리합니다.

이미지에 prop을 지정하는 것으로 효과도 넣을 수 있습니다. 하지만 이렇게 할 때는 이미지의 경로는 정적으로 정의해야 합니다.

블러된 이미지를 먼저 보여주고 완료된 이미지를 보여줍니다. 블러가 된 이미지는 더 용량이 작고 레이아웃 쉬프트가 없어 사용자 경험에 좋습니다.

```jsx
<Image src={img} blurDataURL alt="pet" width="280" height="420" />
```

또 blurDataURL을 속성으로 지정해서 만들 수 있습니다.

이미지 컴포넌트는 분류할 수 없지만 중요한 기본 개념 중 하나입니다.

# Next.js Tutorial - 59 - Absolute Imports & Module Paths

https://www.youtube.com/watch?v=V-ntY44UvhM

파일을 보면 현재 파일을 기준으로 상대경로로 표기 되어있습니다. 절대경로 지정은 Next.js에서 설정하기 쉽습니다.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

jsconfig.json은 절대경로 지정이 가능하게 만들 수 있습니다.

https://nextjs.org/docs/advanced-features/module-path-aliases

이렇게 절대 경로지정이 가능합니다.

# Next.js Tutorial - 60 - Static HTML Export

https://www.youtube.com/watch?v=T2Z6JVzz854

정적인 HTML로 export하는 것입니다. next 빌드는 포로덕션을 위해 빌드한다는 것을 배웠습니다.

next export 명령은 정적 파일을 만들 수 있습니다. 다른 서비스에 서버 없이 호스팅할 수 없습니다. 단점은 ISR, SSR을 사용할 수 없습니다. 다행히 클라이언트 사이드 데이터 요청은 가능합니다. 랜딩페이지, 마케팅, 블로그처럼 빌드타임에 콘텐츠가 결정될 때 적절합니다.

```json
{
  "name": "next-misc",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build && next export",
    "lint": "next lint"
  },
  "dependencies": {
    "@next/font": "13.1.6",
    "eslint": "8.33.0",
    "eslint-config-next": "13.1.6",
    "next": "13.1.6",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  }
}
```

단점은 이미지 최적화가 안됩니다. export할 때는 image 컴포넌트를 제거하고 실행해야 합니다.

export를 위한 빌드를 할 때 또 ISG, SSR 지원할 수 없다고 합니다.

getStaticPaths도 필요하다고 피드백을 또 제공할 것입니다.

fallback이 false가 될 경우에도 사용할 수 없습니다. 라우팅할 때 어느경로가 있는지 사전이 미리다 다 파악해야 합니다.

생각보다 많은 제약이 주어집니다.

# Next.js Tutorial - 61 - TypeScript Support

https://www.youtube.com/watch?v=2SLLvO9OK10

타입스크립트는 기업용으로 많이 사용합니다. Next.js는 타입스크립트 설정이 쉽습니다.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/layout/*": ["components/layout/*"]
    },
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve"
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

`tsconfig.json`를 루트디렉토리에 추가합니다.

```sh
yarn add --dev typescript @type/react
```

이렇게 설치하라고 피드백을 줄 것입니다. 설치 후 서버를 다시 키도록 합니다.

tsconfig.json을 대신 만들어준다고 피드백들 줍니다.

next-env.d.ts도 만들어줍니다.

타입스크립트를 사용하면 jsconfig.json은 우선순위에서 밀려납니다. 그래서 jsconfig를 tsconfig에 적용해줘야 합니다.

`strict` 모드는 `true`로 설정하는 것을 잊지말도록 합니다. 기본적으로 `false`로 설정되어 있습니다.

next.js에서 데이터 요청할 때 타입지정하는 것은 모두 파스칼케이스로 타입을 import하고 지정하면 됩니다.

```tsx
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  // ...
};

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
};

export const getStaticProps: GetStaticProps = async (context) => {
  //...
};
```

이렇게 타입지정하면 됩니다.

또 백엔드도 타입지정이 가능합니다.

```tsx
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' });
}
```

# Next.js Tutorial - 62 - Preview Mode

https://www.youtube.com/watch?v=BYvH0G02uuI

프리뷰모드는 CMS에 의존하는 앱을 위한 도구입니다. CMS는 웹에서 콘텐츠를 개발지식 없이 기술적인 부분을 제어할 수 있게 해줍니다.

이번에는 CMS를 다루지 않습니다. 과거 CMS를 경험해본적이 있으면 효용을 바로 알 것입니다.

빌드하고 배포전에 미리보기를 하는 것이 더 효율적입니다. 배포된 것을 보면 다시 빌드하면서 서버비용이 커집니다.

```jsx
// news/index.js
function News({ data }) {
  return <h1>{data}</h1>;
}

export default News;

export async function getStaticProps() {
  return {
    props: {
      data: 'List of published articles',
    },
  };
}
```

```jsx
// api/preview.js
export default function handler(req, res) {
  res.setPreviewData({});
  res.end('Preview mode enabled');
}
```

이렇게 프리뷰모드를 만들 수 있습니다. 이렇게 접근하면 유저를 리다이렉팅을 해줘야 합니다.

```jsx
export default function handler(req, res) {
  res.setPreviewData({});
  res.redirect(req.query.redirect);
}
```

이렇게 서버에서 리다이렉션을 두면 됩니다.

```url
http://localhost:3000/api/preview?redirect=/news
```

서버는 이런 요청을 받았을 때 대응하게 만든 것입니다.

리다이렉팅을 하면 업데이트하면 됩니다.

```jsx
function News({ data }) {
  return <h1>{data}</h1>;
}

export default News;

export async function getStaticProps(context) {
  return {
    props: {
      data: context.preview ? '기사 초고' : '기사 출판',
    },
  };
}
```

preview 모드인지 정보를 갖고 있으면 초고를 보여주고 아니면 출판 화면을 보여줍니다. 빌드타임 이외에도 요청을 처리하기 때문에 이렇게 보일 수 있습니다.

새로고침을 하면 남도록 만들 수 있습니다. 빌드타임이 아닌 런타임에도 프리뷰모드가 가능하도록 합니다. 변화를 가할 때마다 프리뷰를 볼 수 있게 됩니다.

프리뷰 모드를 깨는 방법입니다.

```js
// api/disable-preview.js
export default function handler(req, res) {
  res.clearPreviewData();
  res.end('Preview mode disabled');
}
```

이렇게 작성하면 프리뷰 모드를 깰 수 있습니다.

```url
http://localhost:3000/api/disable-preview
```

서버에 이렇게 요청을 보내면 프리뷰모드가 종료됩니다. 쿠키데이터로 추적해서 가능합니다.

기자 혹은 마케팅 팀이 이런 것을 사용할 때는 클릭할 UI만 제공해주면 변형을 쉽게 해줄 것입니다.

프리뷰모드는 CMS가 있으면 아주 중요한 기능입니다.

# Next.js Tutorial - 63 - Redirects

https://www.youtube.com/watch?v=NNxkIOlMBDc

리다이렉션을 설정하는 방법입니다. 사이트를 개편하거나 유지보수 할 때 자주 활용하는 기능입니다.

`next.config.js`에서 리다이렉션을 제어합니다.

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [{ source: '/about', destination: '/', permanent: true }];
  },
};

module.exports = nextConfig;
```

```url
http://localhost:3000/about
```

이런 요청을 보내면 홈으로 리다이렉션을 보냅니다. 네트워크탭을 보면 상태코드는 308입니다.

about페이지를 변경하는 동안에 유용할 것입니다.

이것은 SEO도 중요합니다. 리다이렉션은 서버 요청으로 발생하기 때문에 깜박임이 없습니다.

영구혹은 임시 리다이렉션을 만들 수 있습니다. 사용자에게는 상태코드는 별로 안 중요하지만 크롤러에게는 중요합니다.

비동기함수의 반환값으로 설정하기 때문에 여러 리다이렉션을 설정할 수 있고 또 정규표현식도 적용이 가능합니다.

# Next.js Tutorial - 64 - Environment Variables

https://www.youtube.com/watch?v=vS86x_e0zBk

환경변수 설정입니다. 대부분의 프로덕션 앱은 환경변수를 설정해야 합니다. 개발, 테스팅, 배포에 따라 다르게 설정해야 합니다. Next.js는 내장된 환경변수로 노출위험을 줄여줍니다.

루트폴더는 반드시 `.env.local`입니다. 생성하자마자 git이 무시합니다.

```env
DB_USER=JAKETHEDOG
DB_PASSWORD=JAKETHEGOD
```

```jsx
function News({ data }) {
  return <h1>{data}</h1>;
}

export default News;

export async function getStaticProps(context) {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  console.log(user, password);
  return {
    props: {
      data: context.preview ? '기사 초고' : '기사 출판',
    },
  };
}
```

전통적으로는 이렇게 접근했을 것입니다.

`.env.local`은 Node.js 환경에서만 접근할 수 있기 때문에 브라우저에서 모릅니다.

```jsx
function News({ data }) {
  return (
    <h1>
      {data} {process.env.NEXT_PUBLIC_NUMBER}
    </h1>
  );
}

export default News;
```

멍청하게 이렇게 노출해도 Next.js가 알아서 가려줍니다.

하지만 만약에 공개를 해야하는 기능이 필요하면 보이게 만드는 법은 쉽습니다.

```jsx
function News({ data }) {
  return (
    <h1>
      {data} {process.env.NEXT_PUBLIC_NUMBER}
    </h1>
  );
}

export default News;
```

이렇게 하면 보이게 만들수 있습니다. `NEXT_PUBLIC`을 접두어로 붙이면 끝입니다.

구글 애널리틱스처럼 접근해야 하는 경우도 있기 때문에 알아둘 필요가 있습니다.

참고로 process는 객체구조분해 할당이 불가능합니다.

# Next.js Tutorial - 65 - Miscellaneous Summary

https://www.youtube.com/watch?v=BxdXXnL0xLw

기타 등등에 대한 것들을 배웠습니다. 레이아웃, Head 태그 제어, 이미지 최적화, 절대경로 `import`, html export, 타입스크립트, Preview, 리다이렉션, 환경 변수등 다양하게 배웠습니다.

# Next-Auth

# Next.js Tutorial - 66 - Authentication Section Intro

https://www.youtube.com/watch?v=d3cfV2Y0_p0

마지막 장인 인증입니다. Next.js에게 인증이 무엇인지 볼 것입니다. 또 Next-auth 라이브러리를 배웁니다.

다른 제공자와도 같이 사용하는 법을 응용할 수 있습니다.

로그인 로그아웃도 구현합니다.

데이터 베이스랑 연결하는 것도 배웁니다.

# Next.js Tutorial - 67 - Authentication in Next.js

https://www.youtube.com/watch?v=Lfgdc8r8CRE

유저는 2가지가 중요합니다. 하나는 아이덴티티와 접근입니다.

풀스택 프레임워크 답게 사용자 인증이 가능합니다. 사용자 인증이 3가지가 가능합니다. 클라이언트 사이드, 서버사이드, API 라우트 측면에서 보안입니다.

또 기존의 변경된 데이터를 보존해야 하는지 안해도 괜찮은지 판단해야 합니다. 없어도 괜찮으면 외부 로그인으로 처리합니다.

로그인을 직접 처리하면 1년이 걸립니다.

NextAuth처럼 다양한 인증기능을 사용할 수 있습니다. 비밀번호 없는 회원가입도 가능하고 데이터베이스를 활용하는 것도 가능합니다.

Auth는 Next.js에 권장하는 사용자 인증 패키지입니다.

# Next.js Tutorial - 68 - NextAuth Setup

https://www.youtube.com/watch?v=Aiqzfmy9A_4

```sh
yarn add next-auth
```

이렇게 설치합니다.

auth를 설정할 때 컨벤션이 존재합니다.

api에는 auth 폴더를 만듭니다.

```txt
/api
  /auth
    [...nextauth].js
```

이렇게 파일을 만듭니다.

```js
// api/auth/[...nextauth].js
import NextAuth from 'next-auth/next';
import { Provider } from 'next-auth/providers';

export default NextAuth({
  providers: [],
});
```

배열로 복수의 서비스에 연결할 수 있습니다.

```js
// NextAuth package is now updated to version 4, there is some changes when importing the Providers :

import NextAuth from 'next-auth/next';
import GitHubProvider from 'next-auth/providers/github';

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});
```

업데이트로 각각의 서비스 단위로 import를 해야 합니다.

setting을 설정하고 github에서 OAuth APP을 등록하면 됩니다.

Client ID, Secrets는 환경변수(`.env`)로 저장합니다.

```sh
GITHUB_ID=스니펫복붙
GITHUB_SECRET=스니펫복붙
```

ui는 패키지로 제공받습니다. ui를 커스터마이징하는 것도 가능합니다. 로그인을 하면 쿠키가 생성되는 것을 네트워크 탭에서 확인할 수 있습니다.

로그아웃도 비슷하게 처리할 수 있습니다.

제공 업체에 따라 맞게 활용할 수 있습니다.

```url
http://localhost:3000/api/auth/sigin
```

```url
http://localhost:3000/api/auth/signout
```

각각의 url에 로그인과 로그아웃을 해주고 ui도 자동으로 제공해줍니다.

# Next.js Tutorial - 69 - Sign In and Sign Out

https://www.youtube.com/watch?v=K08z-qiySZg

url 요청말고 클릭으로 요청하는 법을 다룹니다.

```js
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

function Navbar() {
  const [session, loading] = useSession();
  return (
    <nav className="header">
      <h1 className="logo">
        <a href="#">NextAuth</a>
      </h1>
      <ul className={`main-nav ${!session && loading ? 'loading' : 'loaded'}`}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </li>

        {!loading && !session && (
          <li>
            <Link
              href="/api/auth/signin"
              onClick={(e) => {
                e.preventDefault();
                signIn('github');
              }}
            >
              Sign In
            </Link>
          </li>
        )}
        {session && (
          <li>
            <Link
              href="/api/auth/signout"
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Sign Out
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
```

이렇게 작성하면 로그인과 로그아웃 그리고 쿠키로 화면상 상태를 구현할 수 있습니다. 또 세션 토큰으로 이미 로그인을 했으면 저장해두고 재방문에 처음부터 로그인 상태가 되도록 합니다.

로그인 상태는 클라이언트 사이드로 브라우저에서 확인이 가능합니다.

# Next.js Tutorial - 70 - Client-side Authentication

https://www.youtube.com/watch?v=B5wyB5QiseU

Nav는 로그인 상태에 따라 보이는 것이 좋습니다. 로그인 상태면 로그아웃을 제공하고 로그아웃이면 로그인을 보이게 하는 것이 일반적입니다. 이 때 `useSession` hook을 사용하면 됩니다.

`useSession` hook은 로그인과 로딩상태 2가지 값을 갖고 있습니다. 또 배열이라 순서도 중요합니다.

```js
{
  !loading && !session && (
    <li>
      <Link
        href="/api/auth/signin"
        onClick={(e) => {
          e.preventDefault();
          signIn('github');
        }}
      >
        Sign In
      </Link>
    </li>
  );
}
{
  session && (
    <li>
      <Link
        href="/api/auth/signout"
        onClick={(e) => {
          e.preventDefault();
          signOut();
        }}
      >
        Sign Out
      </Link>
    </li>
  );
}
```

로그인 상태에 따라 로그인과 로그아웃이 조건에 따라 보입니다.

하지만 약간의 문제가 있습니다. 클릭을 하면 깜박임이 있습니다.

```css
.loading {
  opacity: 0;
  transition: all 0.2s ease-in;
}

.loaded {
  opacity: 1;
  transition: all 0.2s ease-in;
}
```

```jsx
<ul className={`main-nav ${!session && loading ? 'loading' : 'loaded'}`}>
  {/* ... */}
</ul>
```

이렇게 조건부 스타일링으로 걸어두면 간단하게 해결할 수 있습니다.

# Next.js Tutorial - 71 - Securing Pages Client-side

https://www.youtube.com/watch?v=vCpqiRabmDk

대시보드 페이지 보안입니다.

useSession을 활용해도 괜찮지만 getSession이 더 효율적인 해결방법입니다.

```js
// dashboard.js
import { useState, useEffect } from 'react';
import { getSession, signIn } from 'next-auth/client';

function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      console.log({ session });
      if (!session) {
        signIn();
      } else {
        setLoading(false);
      }
    };

    securePage();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return <h1>Dashboard page</h1>;
}

export default Dashboard;
```

위는 고전적인 방식입니다. 지금은 useSession이 잘 업데이트 되었습니다.

```js
import { useSession } from 'next-auth/react';

function Dashboard() {
  const { data: session, status } = useSession();
  return (
    <>
      {status === 'loading' && <h2>Loading...</h2>}
      {!session && <h1>You are not Authorized</h1>}
      {/* or you can sign in with if statement here */}
      {session && status === 'authenticated' && <h1>Dashboard</h1>}
    </>
  );
}

export default Dashboard;
```

useSession이 서버 state처럼 data를 접근할 수 있습니다. 클라이언트 사이드로 이렇게 페이지에 보안처리를 할 수 있습니다.

ui상 지원하지 않는 방법도 있습니다. 하지만 보안에서 상대할 사람은 해커입니다. url 접근도 할 줄 모를 것이라고 생각하면 곤란합니다.

# Next.js Tutorial - 72 - NextAuth Provider

https://www.youtube.com/watch?v=dhLo-GhOPRw

provider 라이브러리를 사용하는 방법도 있습니다.

```js
import styles from '../styles/Home.module.css';
import { useSession } from 'next-auth/client';

export default function Home() {
  const [session, loading] = useSession();
  console.log({ session, loading });
  return <div className={styles.container}></div>;
}
```

일단 이렇게 작성하고 새로고침하면 로딩이 true가 됩니다. 그리고 session값은 undefined가 됩니다. 정적인 페이지이기 때문에 요청이 없습니다.

provider 설정으로 이 문제를 해결할 수 있습니다.

```js
// _app.js
import { Provider } from 'next-auth/client';
import Navbar from '../components/Navbar';
import '../styles/globals.css';
import '../components/Navbar.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
```

이렇게 설정하면 세션의 존재여부를 판단할 수 있습니다. 모든 페이지에서 세션 인스턴스를 공유할 수 있게 해줍니다. 자주 사용하도록 권장합니다. 라우팅마다 페이지 깜박임을 막도록 할 수 있습니다.

네트워크 콜과 깜박임을 완전히 없애는 것은 아닙니다. 그전보다 덜할뿐입니다.

최초 설치 할 때 빠르게 설정하도록 권장합니다.

# Next.js Tutorial - 73 - Server-side Authentication

https://www.youtube.com/watch?v=ae8lxOOhOtY

서버사이드 인증입니다.

서버사이드 클라이언트 사이드처럼 세센에 따라 ui를 랜더링하는 것처럼 클라이언트에 전달해줄 props를 제어합니다.

```js
import { getSession, useSession } from 'next-auth/client';

function Blog({ data }) {
  const [session] = useSession();
  console.log({ session });

  return <h1>Blog page - {data}</h1>;
}

export default Blog;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=http://localhost:3000/blog',
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: 'List of 100 personalized blogs',
      session,
    },
  };
}
```

getSession함수로 접근합니다. 서버사이드로 세션정보를 접근하는 것은 다릅니다. 서버사이드는 context 매개변수를 받을 수 있습니다.

`session`이 존재하면 화면을 보여주고 없으면 조건부로 안보이게 합니다. 그리고 session이 없으면 로그인 화면으로 리다이렉션을 하도록 합니다.

랜더링 전에 세션정보를 사용자에게 보여줄 수 있기는 합니다. 그래서 session 자체를 props로 넘겨주는 전략이 있습니다.

Session의 존재여부를 먼저 판단한 다음에 요청하기 때문에 session을 서버사이드로 알고 보내주도록 합니다.

```js
import { getSession } from 'next-auth/react';

function Blog({ blogsdata }) {
  return <h1>Blog Page - {blogsdata}</h1>;
}

export default Blog;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);
  return {
    props: {
      blogsdata: session
        ? 'List of 100 personalizedblogs'
        : 'List of free blogs',
    },
  };
}
```

최근에는 이런 방식으로 구현하는 것도 가능합니다.

SSR을 사용하고 있으면 session을 념겨주도록 합니다.

# Next.js Tutorial - 74 - Securing Pages Server-side

https://www.youtube.com/watch?v=jbcChDTnPuU

페이지를 서버사이드로 보안을 만드는 방법입니다.

```js
import { getSession, useSession } from 'next-auth/client';

function Blog({ data }) {
  const [session] = useSession();
  console.log({ session });

  return <h1>Blog page - {data}</h1>;
}

export default Blog;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=http://localhost:3000/blog',
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: 'List of 100 personalized blogs',
      session,
    },
  };
}
```

서버사이드로 리다이렉션을 처리할 수 있기 때문에 세션을 확인하고 바로 실행하면 됩니다.

지금은 url을 하드코딩했습니다. 환경변수를 활용하거나 요청없이 리다이렉션을 처리하도록 합니다.

# Next.js Tutorial - 75 - Securing API Routes

https://www.youtube.com/watch?v=ODL0Dlh7ZFE

API 라우트 보안입니다.

```js
// test-session.js
import { getSession } from 'next-auth/client';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: 'Unauthenticated user' });
  } else {
    res.status(200).json({ message: 'Success', session });
  }
};

export default handler;
```

getSession으로 먼저 접근합니다. getSession은 클라이언트의 요청정보를 접근합니다.

그래서 요청정보로 세션이 존재하면 비로그인 유저 로그인 유저로 response 대응을 할 수 있습니다.

Session을 구조분해할 당해서 유저의 인증로직에 따라각각 원하는 응답을 보내도록 구현하는 것도 가능합니다.

# Next.js Tutorial - 76 - Connecting to a Database

https://www.youtube.com/watch?v=H4ptrFimcSM

유저 데이터를 보존해야 할 때가 많습니다. 유저 정보를 보관하고 또 마케팅을 위해 정보활용을 위해서는 DB가 필요합니다.

```sh
yarn add mongodb
```

mongoDB를 활용했습니다. 이것은 DB마다 다릅니다.

JWT로 session을 제어할 수 있습니다.

```js
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  database: process.env.DB_URL,
  session: {
    jwt: true,
  },
  jwt: {
    secret: 'asdcvbtjhm',
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    },
  },
});
```

이렇게 설정하면 됩니다. NextAuth에서 제공하는 JWT를 활용할 수 있습니다.

# Next.js Tutorial - 77 - Callbacks

https://www.youtube.com/watch?v=TcnRPXPM68Q

Callbacks입니다. Session을 확인하면 그 값 자체로 유저를 확인하기는 어렵습니다. 유저 데이터로 CRUD를 처리하고 추가 속성값을 부여해야 할 수 있습니다.

```js
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session(session, token) {
      session.user.id = token.id
      return session
    }
```

객체에서 이부분에 해당합니다.

유저의 고유한 정보를 식별할 수 있게 id를 추가한 것입니다. 해당하는 유저와 관련된 요청을 보낼 수 있게 됩니다.

# Next.js Tutorial - 78 - Authentication Summary

https://www.youtube.com/watch?v=9wjWM0ZpDuU

callback으로 유저 데이터를 고유하게 만드는 법을 배웠습니다.

# Next.js Tutorial - 79 - Deploying Next.js Apps to Vercel

https://www.youtube.com/watch?v=KmxAH7ng8Qw

배포입니다. 배포는 github과 vercel로 간단하게 처리할 수 있습니다.

# 포폴 리팩토링

포트폴리오 코드 퀄리티를 보니까 코드를 고민한 것보다는 새로운 기능과 요구사항 그리고 디버깅 작업을 더 많이했습니다.

저는 남에게 엄격하고 자신에게 너무 관대하지만 이 코드가 남이라고 생각하면 서류 3초컷 할 것입니다.

코드 퀄리티가 엔지니어링이라기 보단 양산형 국비지원 학원다니고 양산형 수준에 머물렀습니다.

코드 퀄리티를 고민하고 리팩토링을 연습하고자 합니다.

## 테스트가 리팩토링에 필요한 이유?

리팩토링을 시작하려면 리팩토링하기 좋은 환경을 만들어야 합니다. 그리고 리팩토링하기 좋은 환경을 만들려면 테스트가 필요합니다.

프론트엔드는 엄청 성숙한 제품이 아니라면 TDD를 반드시 할 필요는 없습니다. 하지만 성숙해지면서 테스트를 추가하는 방향이 정신을 건강하게 만들 수 있습니다(~~이직률도 낮출 수 있습니다~~). 건강한 코드베이스에는 건강한 정신이 깃드는 것처럼 말입니다.

먼저 리팩토링은 기능은 동일한데 이해하기 더 쉬운 코드로 바꾸는 작업입니다.

기능이 동일하다고 검증하고 코드가 안 망가졌다고 피드백받기 좋은 시스템을 갖을 수 있습니다.

개인적으로 제품이 성숙해지고 일부 검증된 기능을 갖은 제품을 개발해고 싶었습니다.

## Next.js

먼저 Next.js에 Jest와 RTL을 설치해야 합니다. 하지만 문제가 많습니다. 생각보다 자료가 많지 않습니다.

~~또 GPT 선생님에게 부탁할 수 없습니다.~~

일단 자료를 참조해야 합니다.

```sh
yarn add jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom --dev
```

위를 권장합니다.

https://nextjs.org/docs/testing

공식문서는 이정도만 권장하지만 실제로 유저 이벤트도 필요하고 테스팅 라이브러리도 타입지정을 상식적으로 당연히 해줘야 하는데 이부분은 본인이 직접 설치합시다.

```sh
yarn add @testing-library/user-event @types/testing-library__jest-dom --dev
```

```json
"devDependencies": {
    "@testing-library/jest-dom": "5.16.4",
    "@testing-library/react": "14.0.0",
    "@testing-library/user-event": "14.4.3",
    "@types/react": "18.0.28",
    "@types/testing-library__jest-dom": "5.14.5",
    "jest": "29.5.0",
    "jest-environment-jsdom": "29.5.0",
    "typescript": "4.9.5"
  }
```

이렇게 설치하면 저의 강박은 해결됩니다.

## Provider

테스트는 Node 런타임에서 실행됩니다. 그래서 window 객체 따위 없습니다.

모든 렌더링이 분리된 환경에서 실행됩니다. Provider를 render마다 감싸줘야 합니다.

절대 경로 설정이 안 되어 있습니다. 그래서 그 보기 싫은 `../`을 Jest에서도 설정해야 합니다.

거기에다가 실수로 그냥 dependencies에 설치를 했습니다. 이번에는 아이러니하게 커밋을 안해서 살았습니다.

검색으로 다른 사람들의 래퍼런스를 보면 Provider를 호출하고 있습니다. 다른 사람들이 이상해 보입니다. 스타일을 위해 Provider를 이렇게 설정해야 한다는 점이 너무 비효율적인 것 같습니다.

## 절대 경로 문제

```tsx
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
```

이거 설정하면 됩니다. 이게 참 힘들겠습니다.

공식문서에서는 컴포넌트만 절대 경로를 설정해두고 있습니다. 저의 예시는 컴포넌트가 호출할 유틸함수에도 사용할 수 있게 만들고자 했습니다.

## 항상 빌드 시도를 합시다.

- `@testing-library/jest-dom`
- `@testing-library/react`
- `@testing-library/user-event`
- `@types/jest`
- `@types/testing-library__jest-dom`
- `babel-loader`
- `babel-plugin-transform-remove-imports`
- `jest`
- `jest-environment-jsdom`

설치할게 참 많습니다. 그리고 커밋하기 전에 빌드해봅시다.

`13.1.6` 버전인데

## 그냥 남기는 코드

```tsx
// jest.config.mjs
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
```

```tsx
import '@testing-library/jest-dom/extend-expect';
```
