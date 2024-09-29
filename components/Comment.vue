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
