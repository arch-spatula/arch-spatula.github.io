"use strict";(self.webpackChunkarch_spatula_github_io=self.webpackChunkarch_spatula_github_io||[]).push([[36529],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>g});var i=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},l=Object.keys(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=i.createContext({}),s=function(e){var t=i.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=s(e.components);return i.createElement(p.Provider,{value:t},e.children)},c="mdxType",v={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},f=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,p=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=s(n),f=r,g=c["".concat(p,".").concat(f)]||c[f]||v[f]||l;return n?i.createElement(g,a(a({ref:t},u),{},{components:n})):i.createElement(g,a({ref:t},u))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,a=new Array(l);a[0]=f;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[c]="string"==typeof e?e:r,a[1]=o;for(var s=2;s<l;s++)a[s]=n[s];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}f.displayName="MDXCreateElement"},92681:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>v,frontMatter:()=>l,metadata:()=>o,toc:()=>s});var i=n(87462),r=(n(67294),n(3905));const l={sidebar_position:4,description:"vite\uacfc \uad00\ub828\ub41c \uc774\ub7f0\uc800\ub7f0 \uc90d\uc90d",tags:["vite"]},a="vite",o={unversionedId:"vite",id:"vite",title:"vite",description:"vite\uacfc \uad00\ub828\ub41c \uc774\ub7f0\uc800\ub7f0 \uc90d\uc90d",source:"@site/js-ts-cookbook/04-vite.md",sourceDirName:".",slug:"/vite",permalink:"/js-ts-cookbook/vite",draft:!1,tags:[{label:"vite",permalink:"/js-ts-cookbook/tags/vite"}],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,description:"vite\uacfc \uad00\ub828\ub41c \uc774\ub7f0\uc800\ub7f0 \uc90d\uc90d",tags:["vite"]},sidebar:"tutorialSidebar",previous:{title:"\ud0c0\uc785\uc2a4\ud06c\ub9bd\ud2b8 \ud301",permalink:"/js-ts-cookbook/typescript/tip"},next:{title:"\ubd84\ub958\ud558\uae30 \uc560\ub9e4\ud55c \ubbf8\uc138\ud301\ub4e4",permalink:"/js-ts-cookbook/tip"}},p={},s=[{value:"\ubc88\ub4e4\ub7ec vs \ube4c\ub4dc \ud234?",id:"\ubc88\ub4e4\ub7ec-vs-\ube4c\ub4dc-\ud234",level:2},{value:"vite port \uc124\uc815 \ubc29\ubc95",id:"vite-port-\uc124\uc815-\ubc29\ubc95",level:2},{value:"vite alias \uc124\uc815",id:"vite-alias-\uc124\uc815",level:2},{value:"rollup plugin visualizer",id:"rollup-plugin-visualizer",level:2}],u={toc:s},c="wrapper";function v(e){let{components:t,...n}=e;return(0,r.kt)(c,(0,i.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"vite"},"vite"),(0,r.kt)("p",null,"vite\uc740 \ud504\ub791\uc2a4\uc5b4\ub85c \ube60\ub974\ub2e4\ub294 \uc758\ubbf8\ub97c \uac16\uace0 \uc788\uc2b5\ub2c8\ub2e4. \uc131\ub2a5\uc774 \uc88b\ub2e4\ub294 \ub290\ub08c\uc774\ub77c\ub3c4 \ub4ed\ub2c8\ub2e4. \ud558\uc9c0\ub9cc CRA\ub791 \uc124\uce58\uc2dc\uac04\uc744 \ubc34\uce58\ub9c8\ud06c\ud558\uba74 \ucc28\uc774\ub97c \ubcfc \uc218 \uc788\uc2b5\ub2c8\ub2e4."),(0,r.kt)("p",null,"vite\uc740 \uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8 \ube4c\ub4dc\ud234\uc785\ub2c8\ub2e4. \uc77c\ubc18\uc801\uc778 \ubc88\ub4e4\ub7ec\uc640 \ub2e4\ub974\uac8c \ubc88\ub4e4\ub9c1\uc758 \ud655\uc7a5\uc774\ub77c\uace0 \ubcfc \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ub0b4\ubd80\uc801\uc73c\ub85c \ubc88\ub4e4\ub7ec\ub294 rollup\uc744 \uc0ac\uc6a9\ud558\uace0 \uadf8 \uc704\uc5d0 \ub2e4\uc591\ud55c \ud655\uc7a5\uae30\ub2a5\uc744 \uc81c\uacf5\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4. \ud655\uc7a5\uae30\ub2a5\uc774\ub77c\uace0 \ud558\uba74 code splitting \uc124\uc815\uc744 \uc27d\uac8c \ud574\uc8fc\uac70\uac00 \uae30\ubcf8\uc801\uc73c\ub85c \ube4c\ub4dc\uc5d0 \ud544\uc694\ud55c \ucd5c\uc801\ud654\ub97c \ucd94\uc0c1\ud654 \ud574\uc90d\ub2c8\ub2e4. \uc77c\ubc18 \ubc88\ub4e4\ub7ec\ub97c \ud65c\uc6a9\ud558\uba74 \ub77c\uc774\ube0c\ub7ec\ub9ac \ud638\ud658 \ubb38\uc81c, \uc911\ubcf5 \ub77c\uc774\ube0c\ub7ec\ub9ac \uc758\uc874\uc131 \ubb38\uc81c, \ud2b8\ub9ac\uc250\uc774\ud0b9 \ub4f1 \uac19\uc774 \uc218\ub3d9\uc73c\ub85c \uc124\uc815\ud574\uc918\uc57c \ud558\ub294 \ubd80\ubd84\uc774 \ub9ce\uc2b5\ub2c8\ub2e4."),(0,r.kt)("h2",{id:"\ubc88\ub4e4\ub7ec-vs-\ube4c\ub4dc-\ud234"},"\ubc88\ub4e4\ub7ec vs \ube4c\ub4dc \ud234?"),(0,r.kt)("p",null,"\uc870\uc2ec\ud574\uc57c \ud560 \uac83\uc740 \ubc88\ub4e4\ub7ec\ub85c \ub2e8\uc21c\ud558\uac8c \uc0dd\uac01\ud558\uba74 \uc548\ub429\ub2c8\ub2e4. vite\uc740 \ubc88\ub4e4\ub7ec \ubcf4\ub2e4 \ub354 \ub113\uc740 \uc758\ubbf8\ub85c \ube4c\ub4dc\ud234\ub85c \uc774\ud574\ud574\uc57c \ud569\ub2c8\ub2e4."),(0,r.kt)("p",null,"\uba3c\uc800 \ubc88\ub4e4\ub7ec\ub77c\ub294 \uac83\uc740 \uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8\ub97c \uba87\uac1c\uc758 \ud30c\uc77c\ub85c \ubb36\uc5b4\ub0b4\ub294 \ub3c4\uad6c\uc785\ub2c8\ub2e4. \ud504\ub85c\uadf8\ub798\uba38\uac00 \ud30c\uc77c \ud639\uc740 \ubaa8\ub4c8\ub2e8\uc704\ub85c \ud504\ub85c\uadf8\ub7a8\uc744 \ub9ce\uc774 \uc791\uc131\ud558\ub294\ub370 \uc21c\uc218 \uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8 \ub9cc\uc73c\ub85c \uc11c\ub85c \uc5f0\uacb0\ud558\ub294\ub370\ub294 \ud55c\uacc4\uac00 \ub9ce\uc2b5\ub2c8\ub2e4. \uba3c\uc800 \ud504\ub85c\uadf8\ub798\ubc0d \uad00\uc810\uc785\ub2c8\ub2e4. \uc5ec\ub7ec \ubaa8\ub4c8 \uc0ac\uc774 \uac19\uc740 \ubcc0\uc218\uba85\uc744 \uc0ac\uc6a9\ud558\uba74 \ucda9\ub3cc\uc774 \ubc1c\uc0dd\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc0ac\uc6a9\uc790 \uad00\uc810\uc785\ub2c8\ub2e4. \ub77c\uc774\ube0c\ub7ec\uc758 \uc77c\ubd80\ub9cc \uc0ac\uc6a9\ud558\ub294\ub370 \ub77c\uc774\ube0c\ub7ec\ub9ac \uc804\uccb4\uac00 \uc0ac\uc6a9\uc790\uc5d0\uac8c \uc804\ub2ec\ub418\ub294 \ubb38\uc81c\ub3c4 \uc788\uc2b5\ub2c8\ub2e4. \ucc98\uc74c \uc0ac\uc774\ud2b8\ub97c \uc811\uadfc\ud560 \ub54c \ub77c\uc774\ube0c\ub7ec\ub9ac \uc804\uccb4\ub97c \ub2e4\uc6b4 \ubc1b\ub294 \ube44\ud6a8\uc728\ub3c4 \uc788\uc2b5\ub2c8\ub2e4. \ub610 \ub77c\uc6b0\ud305\uc744 \uc548\ud560\uc9c0\ub3c4 \ubaa8\ub974\ub294\ub370 \ub2e4\ub978 \ud398\uc774\uc9c0\uae4c\uc9c0 \ubaa8\ub450 \uc804\ub2ec\ud569\ub2c8\ub2e4."),(0,r.kt)("p",null,"\ubc88\ub4e4\ub7ec\uac00 \ud574\uc8fc\ub294 \uc5ed\ud560 \uc911 \ud558\ub098\ub294 \uc0ac\uc6a9\ud558\uc9c0 \uc54a\ub294 \ub77c\uc774\ube0c\ub7ec\ub9ac\ub97c \uc81c\uac70\ud574\uc90d\ub2c8\ub2e4. \ucf54\ub4dc \uc8fc\uc11d\uacfc \uacf5\ubc31\uc81c\uac70\ub97c \ud558\ub294 \uc18c\uc2a4\ucf54\ub4dc \ucd5c\uc18c\ud654\ub3c4 \ub300\uc2e0 \ucc98\ub9ac\ud574\uc11c \uc6a9\ub7c9\uc744 \uc555\ucd95\ud569\ub2c8\ub2e4. \ubaa8\ub4c8\uacfc \ubaa8\ub4c8\uac04 \uad00\uacc4\ub97c \uc27d\uac8c \uc815\ub9ac\ud558\uace0 \ubcc0\uc218\uba85 \ucda9\ub3cc\ub3c4 \ubc29\uc9c0\ud574\uc90d\ub2c8\ub2e4. \ub9ac\uc18c\uc2a4\ub97c \uc811\uadfc\ud558\uace0\uc790 \ud560 \ub54c \ucf54\ub4dc\ub97c \ucabc\uac1c\uace0 \ud544\uc694\ud55c \uc2dc\uc810\uc5d0 \ub9de\uac8c \uc81c\uacf5\ud560 \uc218 \uc788\uac8c \ud574\uc90d\ub2c8\ub2e4."),(0,r.kt)("p",null,"\ube4c\ub4dc \ud234\uc740 \uc774\uac83\ubcf4\ub2e4 \ub354 \uae30\ub2a5\uc774 \ud655\uc7a5\ub418\uc5b4 \uc788\ub2e4\uace0 \ubcfc \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc18c\uc2a4\ucf54\ub4dc \ucef4\ud30c\uc77c, \uc758\uc874\uc131 \uad00\ub9ac, \ubc88\ub4e4\ub9c1, \ud658\uacbd \uc124\uc815 \ub4f1 out of the box\ub85c \ub300\uc2e0\ud574\uc8fc\ub294 \uae30\ub2a5\uc774 \ucd94\uc0c1\ud654\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4."),(0,r.kt)("p",null,"\ud504\ub808\uc784\uc6cc\ud06c\uc640 \ub77c\uc774\ube0c\ub7ec\ub9ac \uad00\uc810\uc744 \ud65c\uc6a9\ud558\uba74 \ubc88\ub4e4\ub7ec\ub294 \ub77c\uc774\ube0c\ub7ec\ub9ac\uc640 \uc720\uc0ac\ud558\uac8c \uc9c1\uc811 \uc124\uc815\ud574\uc918\uc57c \ud558\ub294 \ubd80\ubd84\uc774 \ub9ce\uace0 \ube4c\ub4dc \ud234\uc740 \ud504\ub808\uc784\uc6cc\ud06c\ucc98\ub7fc \ub300\uc2e0 \ub9ce\uc740 \ubd80\ubd84\uc744 \ucc98\ub9ac\ud574\uc90d\ub2c8\ub2e4."),(0,r.kt)("p",null,"\uc77c\ubc18\uc801\uc778 \uc18c\ud504\ud2b8\uc6e8\uc5b4 \uc5d4\uc9c0\ub2c8\uc5b4\ub9c1 \uad00\uc810\uc5d0\uc11c \ucc28\uc774\ub294 \uc788\uc9c0\ub9cc \ud504\ub860\ud2b8\uc5d4\ub4dc \uc5d4\uc9c0\ub2c8\uc5b4\ub9c1 \ubd84\uc57c\uc5d0\uc11c\ub294 \ucc28\uc774\uac00 \ubaa8\ud638\ud569\ub2c8\ub2e4."),(0,r.kt)("p",null,"\ucc38\uace0. vite\uc744 \ud65c\uc6a9\ud558\uba74 \uac1c\ubc1c\ud558\ub294 \ub3d9\uc548 \ud0c0\uc785\uc2a4\ud06c\ub9bd\ud2b8\ub97c \uadf8\ub300\ub85c \ud65c\uc6a9\ud569\ub2c8\ub2e4. \uac1c\ubc1c \uc911\uc5d0 \uc5d0\ub7ec, \ubc84\uadf8\uac00 \ubc1c\uc0dd\ud574\uc11c \uc6d0\uc778\uc744 \ud30c\uc545\ud574\uc57c \ud560 \ub54c \ud0c0\uc785\uc2a4\ud06c\ub9bd\ud2b8\ub97c \uadf8\ub300\ub85c \ubcfc \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc6d0\ub798 \ud0c0\uc785\uc2a4\ud06c\ub9bd\ud2b8\ub294 \uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8\ub85c \ucef4\ud30c\uc77c\ub418\uc5b4\uc57c \ud558\uc9c0\ub9cc \ucef4\ud30c\uc77c\uc740 \ube4c\ub4dc \uc2dc\uc810\uc5d0 \ucc98\ub9ac\ud569\ub2c8\ub2e4."),(0,r.kt)("h2",{id:"vite-port-\uc124\uc815-\ubc29\ubc95"},"vite port \uc124\uc815 \ubc29\ubc95"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-env",metastring:'title=".env"',title:'".env"'},"VITE_PORT=1234\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="vite.config.ts"',title:'"vite.config.ts"'},"/// <reference types=\"vitest\" />\n/// <reference types=\"vite/client\" />\n\nimport react from '@vitejs/plugin-react-swc';\nimport { defineConfig, loadEnv } from 'vite';\n\n// https://vitejs.dev/config/\nexport default defineConfig(({ mode }) => {\n  const { VITE_PORT } = loadEnv(mode, process.cwd(), '');\n  return {\n    plugins: [react()],\n    server: { port: parseInt(VITE_PORT) },\n  };\n});\n")),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://ko.vitejs.dev/config/#using-environment-variables-in-config"},"\uc124\uc815\uc5d0\uc11c \ud658\uacbd \ubcc0\uc218 \uc0ac\uc6a9\ud558\uae30 - vite")),(0,r.kt)("p",null,"defineConfig\uc5d0\ub294 \uac1d\uccb4 \ud639\uc740 \ud568\uc218\ub97c \ub300\uc785\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ud568\uc218\ub97c \ub300\uc785\ud558\uba74 \uc811\uadfc\ud560 \uc218 \uc788\ub294 \ub9e4\uac1c\ubcc0\uc218\ub85c \uac1c\ubc1c\ud658\uacbd\uc124\uc815\uc744 \uc811\uadfc\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."),(0,r.kt)("h2",{id:"vite-alias-\uc124\uc815"},"vite alias \uc124\uc815"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="vite.config.ts"',title:'"vite.config.ts"'},"/// <reference types=\"vitest\" />\n/// <reference types=\"vite/client\" />\n\nimport react from '@vitejs/plugin-react-swc';\nimport { defineConfig } from 'vite';\nimport path from 'path';\n\n// https://vitejs.dev/config/\nexport default defineConfig(({ mode }) => {\n  return {\n    plugins: [react()],\n    resolve: {\n      alias: {\n        '@': path.resolve(__dirname, './src'),\n      },\n    },\n  };\n});\n")),(0,r.kt)("p",null,"\ub2e4\ub978 \ud3f4\ub354\uc5d0\uc11c ",(0,r.kt)("inlineCode",{parentName:"p"},"import"),"\ud558\uba74 \uc55e\uc5d0 ",(0,r.kt)("inlineCode",{parentName:"p"},"@"),"\uc774 \uc774\uc058\uac8c \ubd99\uc2b5\ub2c8\ub2e4."),(0,r.kt)("h2",{id:"rollup-plugin-visualizer"},"rollup plugin visualizer"),(0,r.kt)("p",null,"vite \ub77c\uc774\ube0c\ub7ec\ub9ac\uac00 \uc544\ub2d9\ub2c8\ub2e4. \ub531\uc798\ub77c \ub2e8\uc21c\ud569\ub2c8\ub2e4."),(0,r.kt)("p",null,"\ud558\uc9c0\ub9cc \uad73\uc774 \ub2e4\ub8e8\ub294 \uc774\uc720\ub294 vite\uc774 rollup \ubc88\ub4e4\ub7ec \uae30\ub9cc\uc73c\ub85c \ub9cc\ub4e4\uc5b4\uc84c\uc2b5\ub2c8\ub2e4."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/btd/rollup-plugin-visualizer"},"rollup plugin visualizer")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"yarn add --dev rollup-plugin-visualizer\n")),(0,r.kt)("p",null,"\uc704 \uba85\ub839\uc73c\ub85c \uc124\uce58\ud558\uba74 \ub429\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { defineConfig, type PluginOption } from 'vite';\nexport default defineConfig({\n  plugins: [visualizer() as PluginOption],\n});\n")),(0,r.kt)("p",null,"\uc77c\ubc18\uc801\uc73c\ub85c \uc704\ucc98\ub7fc \uc124\uc815\ud558\uba74 \ub429\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="vite.config.ts"',title:'"vite.config.ts"'},"/// <reference types=\"vitest\" />\n/// <reference types=\"vite/client\" />\n\nimport react from '@vitejs/plugin-react-swc';\nimport { defineConfig } from 'vite';\nimport { visualizer } from 'rollup-plugin-visualizer';\n\n// https://vitejs.dev/config/\nexport default defineConfig(() => {\n  return {\n    plugins: [react(), visualizer() as PluginOption],\n    // ...\n  };\n});\n")),(0,r.kt)("p",null,"\uc124\uc815\uc774 \ub9ce\uc73c\uba74 \ubc18\ud658 \uac12 \uc18d\uc131\uc5d0 \uc774\ub807\uac8c \uc124\uc815\ud574\uc8fc\uba74 \ub429\ub2c8\ub2e4."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"visualizer() as PluginOption"),"\ub85c \ubc30\uc5f4\uc5d0 \ucd94\uac00\ud558\uba74 \ub429\ub2c8\ub2e4."),(0,r.kt)("p",null,"\ud2b9\ubcc4\ud55c \uc124\uc815\uc744 \uc548 \ud558\uba74 ",(0,r.kt)("inlineCode",{parentName:"p"},"yarn build")," \uba85\ub839\uc5d0 ",(0,r.kt)("inlineCode",{parentName:"p"},"state.html"),"\uc744 \uc0dd\uc131\ud560 \uac83\uc785\ub2c8\ub2e4. \uc54c\uc544\uc11c \ube0c\ub77c\uc6b0\uc800\ub85c \uc5f4\uae30 \ubc14\ub78d\ub2c8\ub2e4."),(0,r.kt)("p",null,"\ub77c\uc774\ube0c\ub7ec\ub9ac\uc640 \uac01 \ubaa8\ub4c8\uc758 \ub300\ub7b5\uc801\uc778 \uc810\uc720\uc728\uc744 \ud655\uc778\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/84452145/266338159-1bca76e9-3e03-44cb-9603-b43705351e70.png",alt:"\ubaa8\ub4c8 \ubc88\ub4e4 \uacc4\uce35\ud615 \ud2b8\ub9ac\ub9f5"})),(0,r.kt)("p",null,"\ucc38\uace0\ub85c \uc704 \ub3c4\ud45c\ub97c \ubcf4\uace0 (\uacc4\uce35\ud615)\ud2b8\ub9ac\ub9f5\uc774\ub77c\uace0 \ud569\ub2c8\ub2e4. \ub370\uc774\ud130 \uc2dc\uac01\ud654\ud560 \ub54c \ube44\uc911\uc744 \ud655\uc778\ud560 \ub54c \uc0ac\uc6a9\ud569\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-txt",metastring:'title=".gitignore"',title:'".gitignore"'},"# \uc544\ub798 stats.html\ub97c \ucd94\uac00\ud574\uc8fc\uc138\uc694\nstats.html\n")),(0,r.kt)("p",null,"\ub9c8\uc9c0\ub9c9\uc73c\ub85c ",(0,r.kt)("inlineCode",{parentName:"p"},".gitignore"),"\uc5d0 \ucd94\uac00\ud574\uc8fc\uc138\uc694. \uac1c\ubc1c\ud558\ub294 \uc911\uac04\uc5d0 \ub204\uac00 \uc0c8\ub85c\uc6b4 \ub77c\uc774\ube0c\ub7ec\ub9ac\ub97c \ucd94\uac00\ud558\uace0 \ubc14\ub014 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ub610 \ub77c\uc774\ube0c\ub7ec\ub9ac\uc5d0\uc11c import\ub97c \ub354 \uac00\uc838\uc640\uc11c \ube44\uc911\uc774 \ubc14\ub014 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ud2b9\ubcc4\ud55c \uacbd\uc6b0\uac00 \uc544\ub2c8\ub77c\uba74 \ub9e4\ubc88 \ubc88\ub4e4 \ube44\uc911\uc758 \ubcc0\uacbd\uc744 \uae30\ub85d\ud558\ub294 \uac83\uc740 \ubd88\ud544\uc694\ud560 \uac83 \uac19\uc2b5\ub2c8\ub2e4."),(0,r.kt)("p",null,"\ucc38\uace0\ub85c \ub2e8\uc810\ub3c4 \uc788\uc2b5\ub2c8\ub2e4. ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/btd/rollup-plugin-visualizer/issues/96"},"\ubd80\uc815\ud655"),"\ud569\ub2c8\ub2e4. \uc2e4\uc81c \ud30c\uc77c\uc0ac\uc774\uc988\uc640 \ud3c9\uac00\ud558\ub294 \ud30c\uc77c\uc0ac\uc774\uc988\uac00 \ub2e4\ub985\ub2c8\ub2e4."))}v.isMDXComponent=!0}}]);