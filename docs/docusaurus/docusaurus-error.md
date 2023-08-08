---
sidebar_position: 6
tags: ['Markdown', 'docusaurus', 'latex', 'error']
---

## latex

latex관련된 경고와 에러들입니다.

### Katex rendering equations multiple times

https://stackoverflow.com/questions/72591734/katex-rendering-equations-multiple-times

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

### LaTeX-incompatible input and strict mode is set to 'warn': Too few columns specified in the {array} column argument. [textEnv]

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

### LaTeX-incompatible input and strict mode is set to 'warn': Unicode text character "한글" used in math mode [unicodeTextInMathMode]

```tex title="문제"
Z_{실험집단} = \frac{\bar{x}_{\text{실험집단}-\mu}}{\frac{\sigma}{\sqrt{n}}}
```

```tex title="해결"
Z_{\text{실험집단}} = \frac{\bar{x}_{\text{실험집단}-\mu}}{\frac{\sigma}{\sqrt{n}}}
```

$$
Z_{\text{실험집단}} = \frac{\bar{x}_{\text{실험집단}-\mu}}{\frac{\sigma}{\sqrt{n}}}
$$

### LaTeX-incompatible input and strict mode is set to 'warn': In LaTeX, \\ or \newline does nothing in display mode [newLineInDisplayMode]

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
