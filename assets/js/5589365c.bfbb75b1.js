"use strict";(self.webpackChunkarch_spatula_github_io=self.webpackChunkarch_spatula_github_io||[]).push([[79523],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>b});var o=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var c=o.createContext({}),p=function(e){var t=o.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},s=function(e){var t=p(e.components);return o.createElement(c.Provider,{value:t},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=p(r),m=n,b=u["".concat(c,".").concat(m)]||u[m]||g[m]||a;return r?o.createElement(b,l(l({ref:t},s),{},{components:r})):o.createElement(b,l({ref:t},s))}));function b(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,l=new Array(a);l[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[u]="string"==typeof e?e:n,l[1]=i;for(var p=2;p<a;p++)l[p]=r[p];return o.createElement.apply(null,l)}return o.createElement.apply(null,r)}m.displayName="MDXCreateElement"},25081:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>g,frontMatter:()=>a,metadata:()=>i,toc:()=>p});var o=r(87462),n=(r(67294),r(3905));const a={title:"\uc5d0\ub7ec\ub85c\uadf8: \uc65c mongoDB\ub294 POST\ub9cc \ud5c8\uc6a9\ud558\ub294\uac00?",authors:["arch-spatula"],tags:["deno","axios","mongoDB","error log"],description:"\uc65c mongoDB\ub294 POST \uc694\uccad\ub9cc \ud5c8\uc6a9\ub418\uc5b4 \uc788\ub294\uac00?",toc_max_heading_level:6},l="\uc5d0\ub7ec\ub85c\uadf8: deno, axios, mongoDB \uc5d0\ub7ec \ubbf8\uc81c\uc0ac\uac74 \uc65c mongoDB\ub294 POST\ub9cc \ud5c8\uc6a9\ud558\ub294\uac00?",i={permalink:"/blog/2023/05/22/",editUrl:"https://github.com/arch-spatula/arch-spatula.github.io/blob/dev/blog/2023-05-22.md",source:"@site/blog/2023-05-22.md",title:"\uc5d0\ub7ec\ub85c\uadf8: \uc65c mongoDB\ub294 POST\ub9cc \ud5c8\uc6a9\ud558\ub294\uac00?",description:"\uc65c mongoDB\ub294 POST \uc694\uccad\ub9cc \ud5c8\uc6a9\ub418\uc5b4 \uc788\ub294\uac00?",date:"2023-05-22T00:00:00.000Z",formattedDate:"2023\ub144 5\uc6d4 22\uc77c",tags:[{label:"deno",permalink:"/blog/tags/deno"},{label:"axios",permalink:"/blog/tags/axios"},{label:"mongoDB",permalink:"/blog/tags/mongo-db"},{label:"error log",permalink:"/blog/tags/error-log"}],readingTime:3.805,hasTruncateMarker:!0,authors:[{name:"arch-spatula",title:"Cook-Book \ub9ce\uc774 \ub9cc\ub4ed\ub2c8\ub2e4",url:"https://github.com/arch-spatula",imageURL:"https://github.com/arch-spatula.png",key:"arch-spatula"}],frontMatter:{title:"\uc5d0\ub7ec\ub85c\uadf8: \uc65c mongoDB\ub294 POST\ub9cc \ud5c8\uc6a9\ud558\ub294\uac00?",authors:["arch-spatula"],tags:["deno","axios","mongoDB","error log"],description:"\uc65c mongoDB\ub294 POST \uc694\uccad\ub9cc \ud5c8\uc6a9\ub418\uc5b4 \uc788\ub294\uac00?",toc_max_heading_level:6},prevItem:{title:"\ud1a0\ud070 \uc2f1\uae00\ud2bc",permalink:"/blog/2023/05/23/token-singleton"},nextItem:{title:"\uc0dd\uc77c \uc120\ubb3c \ubc1b\uc74c",permalink:"/blog/2023/05/16/happy-birthday"}},c={authorsImageUrls:[void 0]},p=[],s={toc:p},u="wrapper";function g(e){let{components:t,...r}=e;return(0,n.kt)(u,(0,o.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"deno \ub7f0\ud0c0\uc784\uc5d0\uc11c axios\ub85c mongoDB\ub791 \ud1b5\uc2e0\ud558\ub294\ub370 \uc5d0\ub7ec\uac00 \uacc4\uc18d\ub429\ub2c8\ub2e4. mongoDB API \ubb38\uc11c\ub97c \uc798 \uc219\uc9c0\ud558\uc9c0 \uc54a\uace0 \uc788\uc5b4\uc11c \ubc1c\uc0dd\ud558\ub294 \ubb38\uc81c \uac19\uc2b5\ub2c8\ub2e4."))}g.isMDXComponent=!0}}]);