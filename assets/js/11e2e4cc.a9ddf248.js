"use strict";(self.webpackChunkarch_spatula_github_io=self.webpackChunkarch_spatula_github_io||[]).push([[55257],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>f});var o=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var u=o.createContext({}),l=function(e){var t=o.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=l(e.components);return o.createElement(u.Provider,{value:t},e.children)},d="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,u=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=l(r),m=n,f=d["".concat(u,".").concat(m)]||d[m]||s[m]||a;return r?o.createElement(f,c(c({ref:t},p),{},{components:r})):o.createElement(f,c({ref:t},p))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,c=new Array(a);c[0]=m;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i[d]="string"==typeof e?e:n,c[1]=i;for(var l=2;l<a;l++)c[l]=r[l];return o.createElement.apply(null,c)}return o.createElement.apply(null,r)}m.displayName="MDXCreateElement"},8145:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>s,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var o=r(87462),n=(r(67294),r(3905));const a={description:"React Router DOM Tip",tags:["React Router","introduction","React Router DOM"],sidebar_position:1},c="React Router DOM",i={unversionedId:"react-router-dom/index",id:"react-router-dom/index",title:"React Router DOM",description:"React Router DOM Tip",source:"@site/react-cookbook/10-react-router-dom/index.md",sourceDirName:"10-react-router-dom",slug:"/react-router-dom/",permalink:"/react-cookbook/react-router-dom/",draft:!1,tags:[{label:"React Router",permalink:"/react-cookbook/tags/react-router"},{label:"introduction",permalink:"/react-cookbook/tags/introduction"},{label:"React Router DOM",permalink:"/react-cookbook/tags/react-router-dom"}],version:"current",sidebarPosition:1,frontMatter:{description:"React Router DOM Tip",tags:["React Router","introduction","React Router DOM"],sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"React Router DOM",permalink:"/react-cookbook/category/react-router-dom"},next:{title:"React Query",permalink:"/react-cookbook/category/react-query"}},u={},l=[{value:"react-router-dom loader \ud568\uc218 \ub9e4\uac1c\ubcc0\uc218 \ud0c0\uc785\uc9c0\uc815 LoaderFunctionArgs",id:"react-router-dom-loader-\ud568\uc218-\ub9e4\uac1c\ubcc0\uc218-\ud0c0\uc785\uc9c0\uc815-loaderfunctionargs",level:2}],p={toc:l},d="wrapper";function s(e){let{components:t,...r}=e;return(0,n.kt)(d,(0,o.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"react-router-dom"},"React Router DOM"),(0,n.kt)("p",null,"React Router DOM\uc740 \ud074\ub77c\uc774\uc5b8\ud2b8 \uc0ac\uc774\ub4dc \ub77c\uc6b0\ud305\uc744 \ucc98\ub9ac\ud558\ub294 \ub77c\uc774\ube0c\ub7ec\ub9ac\uc785\ub2c8\ub2e4. SPA\ub85c CSR\ub85c \ud504\ub85c\uadf8\ub798\ubc0d \ud558\uba74 page \ub2e8\uc704 \ub77c\uc6b0\ud305\uc758 \ub85c\uc9c1\uc740 \ud074\ub77c\uc774\uc5b8\ud2b8\uc758 \ucc45\uc784\uc774 \ub429\ub2c8\ub2e4."),(0,n.kt)("p",null,"React Router DOM\uc740 \ud604\uc7ac \uc0b0\uc5c5 \ud45c\uc900\uc785\ub2c8\ub2e4."),(0,n.kt)("h2",{id:"react-router-dom-loader-\ud568\uc218-\ub9e4\uac1c\ubcc0\uc218-\ud0c0\uc785\uc9c0\uc815-loaderfunctionargs"},"react-router-dom loader \ud568\uc218 \ub9e4\uac1c\ubcc0\uc218 \ud0c0\uc785\uc9c0\uc815 LoaderFunctionArgs"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-ts"},"import { type LoaderFunctionArgs } from 'react-router-dom';\n\nfunction loader({}: LoaderFunctionArgs) {\n  return null;\n}\n\nconst routes = createBrowserRouter([\n  {\n    path: '/',\n    element: <Component />,\n    loader,\n  },\n]);\n")),(0,n.kt)("p",null,"loader \ub0b4\ubd80\uc5d0 \uc811\uadfc\ud560 \uc218 \uc788\ub294 \ub9e4\uac1c \ubcc0\uc218\ub97c \uc54c\uace0\uc790 \ud0c0\uc785\uc744 \ucc3e\uc544\ubd24\uc2b5\ub2c8\ub2e4. \uc774\uc81c page\uc5d0\uc11c \uc704\ucc98\ub7fc ",(0,n.kt)("inlineCode",{parentName:"p"},"import"),"\ud558\uace0 \uc0ac\uc6a9\ud558\uba74 \ub429\ub2c8\ub2e4."))}s.isMDXComponent=!0}}]);