"use strict";(self.webpackChunkarch_spatula_github_io=self.webpackChunkarch_spatula_github_io||[]).push([[46103],{39407:(e,t,n)=>{n.d(t,{Z:()=>c});n(67294);var a=n(36905),r=n(93743);const s={tableOfContents:"tableOfContents_bqdL",docItemContainer:"docItemContainer_F8PC"};var o=n(85893);const i="table-of-contents__link toc-highlight",l="table-of-contents__link--active";function c(e){let{className:t,...n}=e;return(0,o.jsx)("div",{className:(0,a.Z)(s.tableOfContents,"thin-scrollbar",t),children:(0,o.jsx)(r.Z,{...n,linkClassName:i,linkActiveClassName:l})})}},93743:(e,t,n)=>{n.d(t,{Z:()=>p});var a=n(67294),r=n(86668);function s(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),n=Array(7).fill(-1);t.forEach(((e,t)=>{const a=n.slice(2,e.level);e.parentIndex=Math.max(...a),n[e.level]=t}));const a=[];return t.forEach((e=>{const{parentIndex:n,...r}=e;n>=0?t[n].children.push(r):a.push(r)})),a}function o(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:a}=e;return t.flatMap((e=>{const t=o({toc:e.children,minHeadingLevel:n,maxHeadingLevel:a});return function(e){return e.level>=n&&e.level<=a}(e)?[{...e,children:t}]:t}))}function i(e){const t=e.getBoundingClientRect();return t.top===t.bottom?i(e.parentNode):t}function l(e,t){let{anchorTopOffset:n}=t;const a=e.find((e=>i(e).top>=n));if(a){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(i(a))?a:e[e.indexOf(a)-1]??null}return e[e.length-1]??null}function c(){const e=(0,a.useRef)(0),{navbar:{hideOnScroll:t}}=(0,r.L)();return(0,a.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function d(e){const t=(0,a.useRef)(void 0),n=c();(0,a.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:a,linkActiveClassName:r,minHeadingLevel:s,maxHeadingLevel:o}=e;function i(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(a),i=function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e;const a=[];for(let r=t;r<=n;r+=1)a.push(`h${r}.anchor`);return Array.from(document.querySelectorAll(a.join()))}({minHeadingLevel:s,maxHeadingLevel:o}),c=l(i,{anchorTopOffset:n.current}),d=e.find((e=>c&&c.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,n){n?(t.current&&t.current!==e&&t.current.classList.remove(r),e.classList.add(r),t.current=e):e.classList.remove(r)}(e,e===d)}))}return document.addEventListener("scroll",i),document.addEventListener("resize",i),i(),()=>{document.removeEventListener("scroll",i),document.removeEventListener("resize",i)}}),[e,n])}var u=n(33692),m=n(85893);function g(e){let{toc:t,className:n,linkClassName:a,isChild:r}=e;return t.length?(0,m.jsx)("ul",{className:r?void 0:n,children:t.map((e=>(0,m.jsxs)("li",{children:[(0,m.jsx)(u.Z,{to:`#${e.id}`,className:a??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,m.jsx)(g,{isChild:!0,toc:e.children,className:n,linkClassName:a})]},e.id)))}):null}const f=a.memo(g);function p(e){let{toc:t,className:n="table-of-contents table-of-contents__left-border",linkClassName:i="table-of-contents__link",linkActiveClassName:l,minHeadingLevel:c,maxHeadingLevel:u,...g}=e;const p=(0,r.L)(),h=c??p.tableOfContents.minHeadingLevel,v=u??p.tableOfContents.maxHeadingLevel,b=function(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:r}=e;return(0,a.useMemo)((()=>o({toc:s(t),minHeadingLevel:n,maxHeadingLevel:r})),[t,n,r])}({toc:t,minHeadingLevel:h,maxHeadingLevel:v});return d((0,a.useMemo)((()=>{if(i&&l)return{linkClassName:i,linkActiveClassName:l,minHeadingLevel:h,maxHeadingLevel:v}}),[i,l,h,v])),(0,m.jsx)(f,{toc:b,className:n,linkClassName:i,...g})}},72957:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(67294),r=n(92949),s=n(85893);const o=function(){const e=(0,a.useRef)(null),{colorMode:t}=(0,r.I)();return(0,a.useEffect)((()=>{const n=e.current.querySelector("iframe.utterances-frame");n?(()=>{const e={type:"set-theme",theme:t};n.contentWindow.postMessage(e,"https://utteranc.es")})():(()=>{const n=document.createElement("script");n.src="https://giscus.app/client.js",n.setAttribute("data-repo","arch-spatula/arch-spatula.github.io"),n.setAttribute("data-repo-id","R_kgDOImK9Dg"),n.setAttribute("data-category","General"),n.setAttribute("data-category-id","DIC_kwDOImK9Ds4CUzIZ"),n.setAttribute("data-mapping","pathname"),n.setAttribute("data-strict","0"),n.setAttribute("data-reactions-enabled","1"),n.setAttribute("data-emit-metadata","0"),n.setAttribute("data-input-position","bottom"),n.setAttribute("data-lang","ko"),n.setAttribute("crossorigin","anonymous"),n.setAttribute("data-theme",t),n.setAttribute("data-loading","lazy"),n.async=!0,e.current.appendChild(n)})()}),[t]),(0,s.jsx)("div",{ref:e,style:{marginTop:"3rem"}})}},7760:(e,t,n)=>{n.r(t),n.d(t,{default:()=>v});n(67294);var a=n(86010),r=n(1944),s=n(35281),o=n(9460),i=n(61460),l=n(30390),c=n(95999),d=n(32244),u=n(85893);function m(e){const{nextItem:t,prevItem:n}=e;return(0,u.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,c.I)({id:"theme.blog.post.paginator.navAriaLabel",message:"Blog post page navigation",description:"The ARIA label for the blog posts pagination"}),children:[n&&(0,u.jsx)(d.Z,{...n,subLabel:(0,u.jsx)(c.Z,{id:"theme.blog.post.paginator.newerPost",description:"The blog post button label to navigate to the newer/previous post",children:"Newer Post"})}),t&&(0,u.jsx)(d.Z,{...t,subLabel:(0,u.jsx)(c.Z,{id:"theme.blog.post.paginator.olderPost",description:"The blog post button label to navigate to the older/next post",children:"Older Post"}),isNext:!0})]})}function g(){const{assets:e,metadata:t}=(0,o.C)(),{title:n,description:a,date:s,tags:i,authors:l,frontMatter:c}=t,{keywords:d}=c,m=e.image??c.image;return(0,u.jsxs)(r.d,{title:n,description:a,keywords:d,image:m,children:[(0,u.jsx)("meta",{property:"og:type",content:"article"}),(0,u.jsx)("meta",{property:"article:published_time",content:s}),l.some((e=>e.url))&&(0,u.jsx)("meta",{property:"article:author",content:l.map((e=>e.url)).filter(Boolean).join(",")}),i.length>0&&(0,u.jsx)("meta",{property:"article:tag",content:i.map((e=>e.label)).join(",")})]})}var f=n(39407),p=n(72957);function h(e){let{sidebar:t,children:n}=e;const{metadata:a,toc:r}=(0,o.C)(),{nextItem:s,prevItem:c,frontMatter:d}=a,{hide_table_of_contents:g,toc_min_heading_level:h,toc_max_heading_level:v}=d;return(0,u.jsxs)(i.Z,{sidebar:t,toc:!g&&r.length>0?(0,u.jsx)(f.Z,{toc:r,minHeadingLevel:h,maxHeadingLevel:v}):void 0,children:[(0,u.jsx)(l.Z,{children:n}),(s||c)&&(0,u.jsx)(m,{nextItem:s,prevItem:c}),(0,u.jsx)(p.Z,{})]})}function v(e){const t=e.content;return(0,u.jsx)(o.n,{content:e.content,isBlogPostPage:!0,children:(0,u.jsxs)(r.FG,{className:(0,a.Z)(s.k.wrapper.blogPages,s.k.page.blogPostPage),children:[(0,u.jsx)(g,{}),(0,u.jsx)(h,{sidebar:e.sidebar,children:(0,u.jsx)(t,{})})]})})}},86010:(e,t,n)=>{function a(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}n.d(t,{Z:()=>r});const r=function(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(r&&(r+=" "),r+=t);return r}}}]);