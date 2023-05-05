import React, { useEffect, useRef } from "react";

function Comment() {
  const containerRef = useRef(null);

  useEffect(() => {
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
      script.setAttribute("data-theme", "preferred_color_scheme");
      script.setAttribute("data-loading", "lazy");

      script.async = true;
      containerRef.current.appendChild(script);
    };

    createUtterancesEl();
  }, []);

  return <div ref={containerRef} style={{ marginTop: "3rem" }} />;
}

export default Comment;
