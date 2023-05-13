import React, { useEffect, useRef } from "react";
import { useColorMode } from "@docusaurus/theme-common";

const utterancesSelector = "iframe.utterances-frame";

/**
 * @see https://younho9.dev/docusaurus-manage-docs-2
 * @see https://docusaurus.io/docs/next/api/themes/configuration#use-color-mode
 * 위 두 자료를 결합해서 블로그의 다크모드를 구현했습니다.
 */

function Comment() {
  const containerRef = useRef(null);
  const { isDarkTheme } = useColorMode();
  const utterancesTheme = isDarkTheme ? "dark" : "light";

  useEffect(() => {
    const utterancesEl = containerRef.current.querySelector(utterancesSelector);

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
      script.setAttribute("data-theme", utterancesTheme);
      script.setAttribute("data-loading", "lazy");

      script.async = true;
      containerRef.current.appendChild(script);
    };

    const postThemeMessage = () => {
      const message = {
        type: "set-theme",
        theme: utterancesTheme,
      };
      utterancesEl.contentWindow.postMessage(message, "https://utteranc.es");
    };

    utterancesEl ? postThemeMessage() : createUtterancesEl();
  }, [isDarkTheme]);

  return <div ref={containerRef} style={{ marginTop: "3rem" }} />;
}

export default Comment;
