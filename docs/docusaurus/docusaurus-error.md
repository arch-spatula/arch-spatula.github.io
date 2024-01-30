---
sidebar_position: 2
tags: ['Markdown', 'docusaurus', 'latex', 'error']
---

# Docusaurus Error

도규사우르스를 사용하면서 마주한 다양한 에러들을 다룹니다.

## latex

latex관련된 경고와 에러들입니다.

### Katex rendering equations multiple times

[Katex rendering equations multiple times 링크](https://stackoverflow.com/questions/72591734/katex-rendering-equations-multiple-times)

```js title="docusaurus.config.js"
/** @type {import('@docusaurus/types').Config} */
const config = {
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
};

module.exports = config;
```

이렇게 설정하니까 수식 2배 이벤트가 끝났습니다.

### 표를 표시할 때는 열을 맞춥시다.

> LaTeX-incompatible input and strict mode is set to 'warn': Too few columns specified in the `{array}` column argument. `textEnv`

```tex title="문제"
\begin{array}{c:c}
X & x_{\footnotesize{1}} & x_{\footnotesize{2}} & x_{\footnotesize{3}} & \cdots & x_{\footnotesize{n}} \\ \hline
P(x) & p_{\footnotesize{1}} & p_{\footnotesize{2}} & p_{\footnotesize{3}} & \cdots & x_{\footnotesize{n}}  \\
\end {array}
```

```tex title="해결"
\begin{array}{c:c|c|c|c|c|c}
X & x_{\footnotesize{1}} & x_{\footnotesize{2}} & x_{\footnotesize{3}} & \cdots & x_{\footnotesize{n}} \\ \hline
P(x) & p_{\footnotesize{1}} & p_{\footnotesize{2}} & p_{\footnotesize{3}} & \cdots & x_{\footnotesize{n}}  \\
\end {array}
```

$$
\begin{array}{c:c|c|c|c|c|c}
X & x_{\footnotesize{1}} & x_{\footnotesize{2}} & x_{\footnotesize{3}} & \cdots & x_{\footnotesize{n}} \\ \hline
P(x) & p_{\footnotesize{1}} & p_{\footnotesize{2}} & p_{\footnotesize{3}} & \cdots & x_{\footnotesize{n}}  \\
\end {array}
$$

### 한글은 `\text`로 넣습시다.

> LaTeX-incompatible input and strict mode is set to 'warn': Unicode text character "한글" used in math mode `unicodeTextInMathMode`

```tex title="문제"
Z_{실험집단} = \frac{\bar{x}_{\text{실험집단}-\mu}}{\frac{\sigma}{\sqrt{n}}}
```

```tex title="해결"
Z_{\text{실험집단}} = \frac{\bar{x}_{\text{실험집단}-\mu}}{\frac{\sigma}{\sqrt{n}}}
```

$$
Z_{\text{실험집단}} = \frac{\bar{x}_{\text{실험집단}-\mu}}{\frac{\sigma}{\sqrt{n}}}
$$

### begin과 end로 감쌉시다.

> LaTeX-incompatible input and strict mode is set to 'warn': In LaTeX, `\` or `\newline` does nothing in display mode `newLineInDisplayMode`

```tex title="문제"
H_{\alpha}: \mu_{1} - \mu_{2} = 0 \\
H_{\alpha}: \mu_{1} - \mu_{2} \neq 0
```

```tex title="해결"
\begin{align}
H_{\alpha}: \mu_{1} - \mu_{2} = 0 \\
H_{\alpha}: \mu_{1} - \mu_{2} \neq 0
\end{align}
```

$$
\begin{align}
H_{\alpha}: \mu_{1} - \mu_{2} = 0 \\
H_{\alpha}: \mu_{1} - \mu_{2} \neq 0
\end{align}
$$

## 주의해야할 빌드에러

```md
[<책이름>](책 링크)
```

```md
[{JSON} Placeholder](https://jsonplaceholder.typicode.com/)
```

위처럼 작성해서 빌드에러를 자주 만들었습니다.

일반적인 텍스트에서는 `<`, `>`, `{`, `}`을 사용하지 마세요.
