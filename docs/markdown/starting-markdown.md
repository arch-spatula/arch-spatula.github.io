---
description: 'Markdown을 다루는 법을 소개합니다.'
tags: ['Markdown', 'Cook-book']
sidebar_position: 1
---

# Markdown 시작하기

## Markdown의 위상

Markdown은 별거 다할 수 있습니다.

---

## Markdown-Cook-Book

검색해서 찾아보면 되는데 왜 정리하냐고요? 지난주 검색한 거 또 검색하고 싶나요? 아니면 리포 브라우저로 펴놓고 `cmd` + `f`로 해결하고 싶나요?

물론 가끔 없는 내용도 없을 것입니다. 그때 검색하고 여기에 추가하고 정리하면 검색 빈도가 줄어들지 않을까요?

## 주석을 추가하는 방법

```md
<!-- 마크다운 주석 -->
```

놀랍게도 HTML 주석과 동일합니다. 문서 자체도 설계하고 교정, 피드백에 활용할 수 있습니다.

## Heading

```markdown
# h1 제목

## h2 제목

### h3 제목

#### h4 제목

##### h5 제목

###### h6 제목
```

## Check Box

```md
- [ ] 빈 체크박스
- [x] 채워진 체크박스
```

- [ ] 빈 체크박스
- [x] 채워진 체크박스

## 취소선

```md
~~(내용)~~
```

~~(내용)~~

## 강조

html의 `<strong></strong>`랑 비슷합니다.

```md
**(내용)**
```

**(내용)**

## 구분선

구분선은 `---`으로 간단하게 만들 수 있습니다.

```md
---
```

---

## 디렉토리 표현하기

```txt
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   └── Button.jsx
│   ├── layouts/
│   │   └── PostLayout.astro
│   └── pages/
│   │   ├── posts/
│   │   │   ├── post1.md
│   │   │   ├── post2.md
│   │   │   └── post3.md
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └── social-image.png
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

tree를 설치하면 이런 디렉토리를 표현할 수 있습니다.

```sh
brew install tree
```

brew로 tree를 설치합니다.

```sh
tree -I node_modules
```

tree로 디렉토리 표현 명령을 합니다. `node_modules`은 숨깁니다.

## codepen.io 임베드

github pages에서만 가능한 장점은 `iframe` 임베드가 가능합니다.

```md
<iframe class="codepen" scrolling="no" title="full background에 글자 중앙 정렬" src="https://codepen.io/(프로필)/embed/(아이디)" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/kimsanghyun/pen/zYNyEwo">
  full background에 글자 중앙 정렬</a> by (유저이름) (<a href="https://codepen.io/kimsanghyun">@(프로필)</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
```

<iframe class="codepen" scrolling="no" title="full background에 글자 중앙 정렬" src="https://codepen.io/kimsanghyun/embed/zYNyEwo" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/kimsanghyun/pen/zYNyEwo">
  full background에 글자 중앙 정렬</a> by 김상현 (<a href="https://codepen.io/kimsanghyun">@kimsanghyun</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<!-- TODO: docusaurus 장점으로 분리하기 -->

## Toggle

```md
<details>
<summary>요약</summary>
<div markdown="1">
# 1 제목 내용
</div>
</details>
```

<details>
<summary>접기/펼치기 버튼</summary>
<div markdown="1">

| 제목 | 내용 |
| ---- | ---- |
| 1    | 1    |
| 2    | 10   |

</div>
</details>

## 인용문

> Failing to plan is planning to fail
>
> — Benjamin Franklin

```md
> (인용문)
```

## 코드

블럭으로 작성하는 법입니다. 마크다운으로 설명하기 조금 어럽습니다.

````md
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```
````

이렇게 코드블럭을 시작합니다. ` ```언어`에서 언어를 지정합니다.

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

생각보다 다양한 언어를 지원합니다. 이런 코드블럭을 작성하는 것으로 코드 컨벤션 같은 것을 정리할 수 있습니다.

## 이미지

마크다운에서는 html처럼 `<video />` 태그를 따로 지원해주고 있는 것은 아닙니다.

```md
<p align="center">
<img src="./img/Soyjak_Meme_Javascript.png" width="400px">
</p>
```

이미지는 이런식으로 추가할 수 있습니다.

```
![이미지](../img/img.jpeg)
```

이런식으로도 추가가 가능합니다.

## mermaid

문서에 코드로 차트를 빠르게 그릴 때 유용한 기능입니다.

[mermaid에서 지원하는 공식 문서](https://mermaid-js.github.io/mermaid/#/)

로컬에 저장하고 있으면 따로 드레그앤 드롭 방식으로 이미지를 추가할 수 있습니다.

```
bierner.markdown-mermaid
```

이 extensions을 설치하면 이제 mermaid를 미리볼 수 있습니다.

````md
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
````

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

<!-- TODO; 설치방법 알려주기 https://docusaurus.io/ko/docs/next/markdown-features/diagrams -->

## 표

```md
| 기본값 | 왼쪽 정렬 | 가운데 정렬 | 오른쪽 정렬 |
| ------ | :-------- | :---------: | ----------: |
| 내용 1 | 내용 2    |   내용 3    |      내용 4 |
| 내용 5 | 내용 6    |   내용 7    |      내용 8 |
| 내용 9 | 내용 10   |   내용 11   |     내용 12 |
```

| 기본값 | 왼쪽 정렬 | 가운데 정렬 | 오른쪽 정렬 |
| ------ | :-------- | :---------: | ----------: |
| 내용 1 | 내용 2    |   내용 3    |      내용 4 |
| 내용 5 | 내용 6    |   내용 7    |      내용 8 |
| 내용 9 | 내용 10   |   내용 11   |     내용 12 |

이런식으로 표를 작성할 수 있습니다.[^1]

## 각주

이런식으로 주석을 달 수 있습니다.[^2]

각주는 글의 앞 부분 뒷 부분 작성하는 법 모두 알아야 합니다.

```md
각주내용[^1]
```

이런식으로 글 앞은 이렇게 표시합니다.

```md
[^1]: 미주내용
```

글 뒷부분은 이렇게 표시합니다. 이렇게 작성하면 미주에 알아서 구분선이 추가됩니다.

## 기타 알면 좋은 것

### 이모지

[이모지/목록 - 나무위키](https://namu.wiki/w/%EC%9D%B4%EB%AA%A8%EC%A7%80/%EB%AA%A9%EB%A1%9D)

여태껏 이모지를 검색하고 보안취약점을 유발할 것 같은 사이트에서 구경했는데 또 다른 보안 취약점을 갖고 있는 나무위키에서 볼 수 있게 되었습니다. 그래도 편집에서 클립보드 취약점을 활용하는지 볼 수 있습니다. 다른 사이트들은 클립보다 보안취약점을 직접 편집을 들어가서 확인할 수 있습니다. 훌륭한 해커라면 이런 서비스를 활용해서 당신에게 키로거를 설치하게 만드는 다음에 당신의 금융정보를 도용할 것입니다.

[이모지 키친](https://emojikitchen.dev/)

2개의 이모지를 합성한 이미지를 만들어줍니다. 아주 훌륭하고 이상한 이미지를 잘 만들어줍니다.

[^1]: [[LYNMP 도움말] 마크다운(Markdown) - 표(table) 입력 - LYNMP](https://lynmp.com/ko/article/title/markdown-table-om811c9dc5oi)
[^2]: [How to add footnotes to GitHub-flavoured Markdown?](https://stackoverflow.com/questions/25579868/how-to-add-footnotes-to-github-flavoured-markdown)
