---
sidebar_position: 4
tags: ['Markdown', 'docusaurus', 'tip']
---

# docusaurus tip

가끔 [공식 문서](https://docusaurus.io/docs/markdown-features/admonitions)봐야 하는데 귀찮아서 여기 남겨둡니다.

## Admonitions

```md
:::note

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::tip

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::info

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::warning

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::danger

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::
```

:::note

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::tip

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::info

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::warning

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::danger

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

## Code blocks

```md
// highlight-next-line
```

```md
// highlight-start

// highlight-end
```

코드 블럭으로 강조하는 기능이 있습니다. 당연히 [공식 문서](https://docusaurus.io/docs/markdown-features/code-blocks)에서 가져 온 것입니다. 하지만 저는 저의 블로그에서 바로 접근하고 싶어서 여기 남깁니다.

````md
```js
function HighlightSomeText(highlight) {
  if (highlight) {
    // highlight-next-line
    return 'This text is highlighted!'; // 한줄 강조
  }

  return 'Nothing highlighted';
}

function HighlightMoreText(highlight) {
  // highlight-start
  if (highlight) {
    return 'This range is highlighted!';
  }
  // highlight-end

  return 'Nothing highlighted';
}
```
````

```js
function HighlightSomeText(highlight) {
  if (highlight) {
    // highlight-next-line
    return 'This text is highlighted!'; // 한줄 강조
  }

  return 'Nothing highlighted';
}

function HighlightMoreText(highlight) {
  // highlight-start
  if (highlight) {
    return 'This range is highlighted!'; // 여러 줄 강조
  }
  // highlight-end

  return 'Nothing highlighted';
}
```
