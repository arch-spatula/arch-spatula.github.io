"use strict";(self.webpackChunkarch_spatula_github_io=self.webpackChunkarch_spatula_github_io||[]).push([[26272],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>g});var a=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var c=a.createContext({}),p=function(e){var t=a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},s=function(e){var t=p(e.components);return a.createElement(c.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},b=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=p(r),b=n,g=u["".concat(c,".").concat(b)]||u[b]||m[b]||o;return r?a.createElement(g,l(l({ref:t},s),{},{components:r})):a.createElement(g,l({ref:t},s))}));function g(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,l=new Array(o);l[0]=b;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[u]="string"==typeof e?e:n,l[1]=i;for(var p=2;p<o;p++)l[p]=r[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}b.displayName="MDXCreateElement"},14864:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var a=r(87462),n=(r(67294),r(3905));const o={title:"\uc0c8 React \ud504\ub85c\uc81d\ud2b8\ub294 vite\ub97c \ud65c\uc6a9\ud574\uc57c \ud558\ub294 \uc774\uc720",authors:["arch-spatula"],tags:["vite","react","vitest","React.dev","Alias \uc124\uc815"],description:"\uc774\uc720\uac00 \uc788\ub2e4\uba74 \ub354 \uac04\uc18c\ud558\uace0 \uc131\ub2a5\uc774 \ub354 \uc88b\uc2b5\ub2c8\ub2e4. HMR \uc9c0\uc6d0\uc774 \uc0c1\ub2f9\ud788 \ube60\ub985\ub2c8\ub2e4.",toc_max_heading_level:6},l="\uc0c8 React \ud504\ub85c\uc81d\ud2b8\ub294 vite\ub97c \ud65c\uc6a9\ud574\uc57c \ud558\ub294 \uc774\uc720",i={permalink:"/blog/2023/06/11/react-vite",editUrl:"https://github.com/arch-spatula/arch-spatula.github.io/blob/dev/blog/2023-06-11-react-vite.md",source:"@site/blog/2023-06-11-react-vite.md",title:"\uc0c8 React \ud504\ub85c\uc81d\ud2b8\ub294 vite\ub97c \ud65c\uc6a9\ud574\uc57c \ud558\ub294 \uc774\uc720",description:"\uc774\uc720\uac00 \uc788\ub2e4\uba74 \ub354 \uac04\uc18c\ud558\uace0 \uc131\ub2a5\uc774 \ub354 \uc88b\uc2b5\ub2c8\ub2e4. HMR \uc9c0\uc6d0\uc774 \uc0c1\ub2f9\ud788 \ube60\ub985\ub2c8\ub2e4.",date:"2023-06-11T00:00:00.000Z",formattedDate:"2023\ub144 6\uc6d4 11\uc77c",tags:[{label:"vite",permalink:"/blog/tags/vite"},{label:"react",permalink:"/blog/tags/react"},{label:"vitest",permalink:"/blog/tags/vitest"},{label:"React.dev",permalink:"/blog/tags/react-dev"},{label:"Alias \uc124\uc815",permalink:"/blog/tags/alias-\uc124\uc815"}],readingTime:7.48,hasTruncateMarker:!0,authors:[{name:"arch-spatula",title:"Cook-Book \ub9ce\uc774 \ub9cc\ub4ed\ub2c8\ub2e4",url:"https://github.com/arch-spatula",imageURL:"https://github.com/arch-spatula.png",key:"arch-spatula"}],frontMatter:{title:"\uc0c8 React \ud504\ub85c\uc81d\ud2b8\ub294 vite\ub97c \ud65c\uc6a9\ud574\uc57c \ud558\ub294 \uc774\uc720",authors:["arch-spatula"],tags:["vite","react","vitest","React.dev","Alias \uc124\uc815"],description:"\uc774\uc720\uac00 \uc788\ub2e4\uba74 \ub354 \uac04\uc18c\ud558\uace0 \uc131\ub2a5\uc774 \ub354 \uc88b\uc2b5\ub2c8\ub2e4. HMR \uc9c0\uc6d0\uc774 \uc0c1\ub2f9\ud788 \ube60\ub985\ub2c8\ub2e4.",toc_max_heading_level:6},prevItem:{title:"\uce74\ub4dc \ub4a4\uc9d1\uae30",permalink:"/blog/2023/06/17/"},nextItem:{title:"cookie\ub294 \ub3c4\uba54\uc778\uc774 \uac19\uc544\uc57c \uc8fc\uace0 \ubc1b\uc744 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",permalink:"/blog/2023/06/10/cookie-domain"}},c={authorsImageUrls:[void 0]},p=[],s={toc:p},u="wrapper";function m(e){let{components:t,...r}=e;return(0,n.kt)(u,(0,a.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"\uc774\uc720\uac00 \uc788\ub2e4\uba74 \ub354 \uac04\uc18c\ud558\uace0 \uc131\ub2a5\uc774 \ub354 \uc88b\uc2b5\ub2c8\ub2e4. HMR \uc9c0\uc6d0\uc774 \uc0c1\ub2f9\ud788 \ube60\ub985\ub2c8\ub2e4. \uadf8\ub9ac\uace0 \uc124\uce58 \ub9c8\ubc95\uc0ac\uac00 \uc9c1\uad00\uc801\uc774\uace0 \uce5c\uc808\ud569\ub2c8\ub2e4. \uc2dc\uc791\ud558\uac70\ub098 \uc2e4\ud5d8 \ud504\ub85c\uc81d\ud2b8\uc5d0 \ud65c\uc6a9\ud558\uae30 \uc801\ud569\ud569\ub2c8\ub2e4."),(0,n.kt)("p",null,"\ubb3c\ub860 \uc608\uc678\ub3c4 \uc788\uc2b5\ub2c8\ub2e4. \ucc98\uc74c \ud14c\uc2a4\ud2b8\ub97c \uacf5\ubd80\ud558\ub294 \uc785\uc7a5\uc5d0\uc11c\ub294 CRA \ud65c\uc6a9\ud558\ub294 \uac83\uc774 \uc88b\uc2b5\ub2c8\ub2e4."))}m.isMDXComponent=!0}}]);