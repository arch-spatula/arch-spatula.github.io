"use strict";(self.webpackChunkarch_spatula_github_io=self.webpackChunkarch_spatula_github_io||[]).push([[15379],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>f});var a=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var c=a.createContext({}),u=function(e){var t=a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},p=function(e){var t=u(e.components);return a.createElement(c.Provider,{value:t},e.children)},s="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),s=u(r),m=n,f=s["".concat(c,".").concat(m)]||s[m]||g[m]||o;return r?a.createElement(f,l(l({ref:t},p),{},{components:r})):a.createElement(f,l({ref:t},p))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,l=new Array(o);l[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[s]="string"==typeof e?e:n,l[1]=i;for(var u=2;u<o;u++)l[u]=r[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},46033:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>g,frontMatter:()=>o,metadata:()=>i,toc:()=>u});var a=r(87462),n=(r(67294),r(3905));const o={title:"\ub85c\uadf8\uc778, \ud68c\uc6d0\uac00\uc785 \uad00\ub828 \uc720\ud6a8\uc131 \uac80\uc99d",authors:["arch-spatula"],tags:["auth","regex"],description:"\ubc84\ud2bc\uc5d0 \ub85c\ub529 \uc2a4\ud53c\ub108\ub97c \ucd94\uac00\ud558\ub294 \ubc29\ubc95\uc785\ub2c8\ub2e4.",toc_max_heading_level:6},l="\ub85c\uadf8\uc778, \ud68c\uc6d0\uac00\uc785 \uad00\ub828 \uc720\ud6a8\uc131 \uac80\uc99d",i={permalink:"/blog/2023/06/19/auth-regex",editUrl:"https://github.com/arch-spatula/arch-spatula.github.io/blob/dev/blog/2023-06-19-auth-regex.md",source:"@site/blog/2023-06-19-auth-regex.md",title:"\ub85c\uadf8\uc778, \ud68c\uc6d0\uac00\uc785 \uad00\ub828 \uc720\ud6a8\uc131 \uac80\uc99d",description:"\ubc84\ud2bc\uc5d0 \ub85c\ub529 \uc2a4\ud53c\ub108\ub97c \ucd94\uac00\ud558\ub294 \ubc29\ubc95\uc785\ub2c8\ub2e4.",date:"2023-06-19T00:00:00.000Z",formattedDate:"2023\ub144 6\uc6d4 19\uc77c",tags:[{label:"auth",permalink:"/blog/tags/auth"},{label:"regex",permalink:"/blog/tags/regex"}],readingTime:3.205,hasTruncateMarker:!0,authors:[{name:"arch-spatula",title:"Cook-Book \ub9ce\uc774 \ub9cc\ub4ed\ub2c8\ub2e4",url:"https://github.com/arch-spatula",imageURL:"https://github.com/arch-spatula.png",key:"arch-spatula"}],frontMatter:{title:"\ub85c\uadf8\uc778, \ud68c\uc6d0\uac00\uc785 \uad00\ub828 \uc720\ud6a8\uc131 \uac80\uc99d",authors:["arch-spatula"],tags:["auth","regex"],description:"\ubc84\ud2bc\uc5d0 \ub85c\ub529 \uc2a4\ud53c\ub108\ub97c \ucd94\uac00\ud558\ub294 \ubc29\ubc95\uc785\ub2c8\ub2e4.",toc_max_heading_level:6},prevItem:{title:"\ub3cc\uc544\uac00\uae30\ub9cc \ud558\ub294 date formatting",permalink:"/blog/2023/06/20/"},nextItem:{title:"\ubc84\ud2bc\uc5d0 \ub85c\ub529 \uc2a4\ud53c\ub108\ub97c \ucd94\uac00",permalink:"/blog/2023/06/19/button-loading"}},c={authorsImageUrls:[void 0]},u=[],p={toc:u},s="wrapper";function g(e){let{components:t,...r}=e;return(0,n.kt)(s,(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"\uc774\uba54\uc77c\uacfc \ube44\ubc00\ubc88\ud638 \uc720\ud6a8\uc131 \uac80\uc99d\ud558\ub294 \uc815\uaddc\ud45c\ud604\uc2dd\uc744 \ud14c\uc2a4\ud2b8\ucf54\ub4dc\uc640 \ud568\uaed8 \uad6c\ud604\ud55c \uc608\uc2dc\uc785\ub2c8\ub2e4."))}g.isMDXComponent=!0}}]);