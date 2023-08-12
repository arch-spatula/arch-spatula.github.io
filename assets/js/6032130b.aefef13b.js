"use strict";(self.webpackChunkarch_spatula_github_io=self.webpackChunkarch_spatula_github_io||[]).push([[95175],{3905:(e,t,o)=>{o.d(t,{Zo:()=>s,kt:()=>f});var r=o(67294);function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function c(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function l(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var i=r.createContext({}),p=function(e){var t=r.useContext(i),o=t;return e&&(o="function"==typeof e?e(t):c(c({},t),e)),o},s=function(e){var t=p(e.components);return r.createElement(i.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var o=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(o),g=n,f=u["".concat(i,".").concat(g)]||u[g]||m[g]||a;return o?r.createElement(f,c(c({ref:t},s),{},{components:o})):r.createElement(f,c({ref:t},s))}));function f(e,t){var o=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=o.length,c=new Array(a);c[0]=g;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[u]="string"==typeof e?e:n,c[1]=l;for(var p=2;p<a;p++)c[p]=o[p];return r.createElement.apply(null,c)}return r.createElement.apply(null,o)}g.displayName="MDXCreateElement"},82335:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>i,contentTitle:()=>c,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var r=o(87462),n=(o(67294),o(3905));const a={title:"fetch\uc5d0\uc11c mongoose\ub85c \uc804\ud658",authors:["arch-spatula"],tags:["mongoDB","mongoose"],description:"\ube60\ub974\uace0 \ub354\ub7fd\uac8c fetch\ub85c \ub9cc\ub4e4\uc5c8\ub358 API\ub97c mongoose\ub85c \ub9ac\ud329\ud1a0\ub9c1\ud558\ub294 \uacfc\uc815\uc744 \ub2e4\ub8f9\ub2c8\ub2e4.",toc_max_heading_level:6},c="fetch\uc5d0\uc11c mongoose\ub85c \uc804\ud658",l={permalink:"/blog/2023/07/20/mongoose",editUrl:"https://github.com/arch-spatula/arch-spatula.github.io/blob/dev/blog/2023-07-20-mongoose.md",source:"@site/blog/2023-07-20-mongoose.md",title:"fetch\uc5d0\uc11c mongoose\ub85c \uc804\ud658",description:"\ube60\ub974\uace0 \ub354\ub7fd\uac8c fetch\ub85c \ub9cc\ub4e4\uc5c8\ub358 API\ub97c mongoose\ub85c \ub9ac\ud329\ud1a0\ub9c1\ud558\ub294 \uacfc\uc815\uc744 \ub2e4\ub8f9\ub2c8\ub2e4.",date:"2023-07-20T00:00:00.000Z",formattedDate:"2023\ub144 7\uc6d4 20\uc77c",tags:[{label:"mongoDB",permalink:"/blog/tags/mongo-db"},{label:"mongoose",permalink:"/blog/tags/mongoose"}],readingTime:15.05,hasTruncateMarker:!0,authors:[{name:"arch-spatula",title:"Cook-Book \ub9ce\uc774 \ub9cc\ub4ed\ub2c8\ub2e4",url:"https://github.com/arch-spatula",imageURL:"https://github.com/arch-spatula.png",key:"arch-spatula"}],frontMatter:{title:"fetch\uc5d0\uc11c mongoose\ub85c \uc804\ud658",authors:["arch-spatula"],tags:["mongoDB","mongoose"],description:"\ube60\ub974\uace0 \ub354\ub7fd\uac8c fetch\ub85c \ub9cc\ub4e4\uc5c8\ub358 API\ub97c mongoose\ub85c \ub9ac\ud329\ud1a0\ub9c1\ud558\ub294 \uacfc\uc815\uc744 \ub2e4\ub8f9\ub2c8\ub2e4.",toc_max_heading_level:6},prevItem:{title:"Super Oak\ub85c \ud14c\uc2a4\ud2b8 \ucf54\ub4dc \uc791\uc131\ud558\uae30",permalink:"/blog/2023/07/22/superoak"},nextItem:{title:"\ub9ac\uc561\ud2b8 \ucf54\ub529 \ucee8\ubca4\uc158",permalink:"/blog/2023/07/19/coding-convention"}},i={authorsImageUrls:[void 0]},p=[],s={toc:p},u="wrapper";function m(e){let{components:t,...o}=e;return(0,n.kt)(u,(0,r.Z)({},s,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"\ube60\ub974\uace0 \ub354\ub7fd\uac8c fetch\ub85c \ub9cc\ub4e4\uc5c8\ub358 API\ub97c mongoose\ub85c \ub9ac\ud329\ud1a0\ub9c1\ud558\ub294 \uacfc\uc815\uc744 \ub2e4\ub8f9\ub2c8\ub2e4."),(0,n.kt)("p",null,"\ud55c\uac00\uc9c0 \ud568\uc815\uc774 \uc788\uc2b5\ub2c8\ub2e4. \ub610 deno deploy\uc5d0\uc11c \uc0ac\uc6a9\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc55e\uc73c\ub85c \uac1c\ubc1c\ud560 \ub54c\ub294 docker image\ubd80\ud130 \ucc3e\uaca0\uc2b5\ub2c8\ub2e4. \u3142\u3137\u3142\u3137"))}m.isMDXComponent=!0}}]);