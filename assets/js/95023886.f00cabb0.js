"use strict";(self.webpackChunkarch_spatula_github_io=self.webpackChunkarch_spatula_github_io||[]).push([[66732],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>k});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),c=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(i.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(n),d=a,k=p["".concat(i,".").concat(d)]||p[d]||m[d]||o;return n?r.createElement(k,s(s({ref:t},u),{},{components:n})):r.createElement(k,s({ref:t},u))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=d;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[p]="string"==typeof e?e:a,s[1]=l;for(var c=2;c<o;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},39396:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var r=n(87462),a=(n(67294),n(3905));const o={title:"\uc6d0\ud2f0\ub4dc \ud504\ub9ac\uc628\ubcf4\ub529 \uacfc\uc81c - 6\uc77c\ucc28",authors:["arch-spatula"],tags:["blog","wanted","pre-on-boarding","Cannot use import statement outside a module","Jest Mocking","jest","try-catch error type"],description:"\uc6d0\ud2f0\ub4dc \uacfc\uc81c \uc9c4\ud589\uacfc\uc815"},s="\uc6d0\ud2f0\ub4dc \ud504\ub9ac\uc628\ubcf4\ub529 \uacfc\uc81c - 6\uc77c\ucc28",l={permalink:"/blog/2023/04/15/",editUrl:"https://github.com/arch-spatula/arch-spatula.github.io/blob/dev/blog/2023-04-15.md",source:"@site/blog/2023-04-15.md",title:"\uc6d0\ud2f0\ub4dc \ud504\ub9ac\uc628\ubcf4\ub529 \uacfc\uc81c - 6\uc77c\ucc28",description:"\uc6d0\ud2f0\ub4dc \uacfc\uc81c \uc9c4\ud589\uacfc\uc815",date:"2023-04-15T00:00:00.000Z",formattedDate:"2023\ub144 4\uc6d4 15\uc77c",tags:[{label:"blog",permalink:"/blog/tags/blog"},{label:"wanted",permalink:"/blog/tags/wanted"},{label:"pre-on-boarding",permalink:"/blog/tags/pre-on-boarding"},{label:"Cannot use import statement outside a module",permalink:"/blog/tags/cannot-use-import-statement-outside-a-module"},{label:"Jest Mocking",permalink:"/blog/tags/jest-mocking"},{label:"jest",permalink:"/blog/tags/jest"},{label:"try-catch error type",permalink:"/blog/tags/try-catch-error-type"}],readingTime:5.845,hasTruncateMarker:!0,authors:[{name:"arch-spatula",title:"Cook-Book \ub9ce\uc774 \ub9cc\ub4ed\ub2c8\ub2e4",url:"https://github.com/arch-spatula",imageURL:"https://github.com/arch-spatula.png",key:"arch-spatula"}],frontMatter:{title:"\uc6d0\ud2f0\ub4dc \ud504\ub9ac\uc628\ubcf4\ub529 \uacfc\uc81c - 6\uc77c\ucc28",authors:["arch-spatula"],tags:["blog","wanted","pre-on-boarding","Cannot use import statement outside a module","Jest Mocking","jest","try-catch error type"],description:"\uc6d0\ud2f0\ub4dc \uacfc\uc81c \uc9c4\ud589\uacfc\uc815"},prevItem:{title:"\uc6d0\ud2f0\ub4dc \ud504\ub9ac\uc628\ubcf4\ub529 \uacfc\uc81c - 8\uc77c\ucc28",permalink:"/blog/2023/04/16/"},nextItem:{title:"Go \uc5b8\uc5b4 \uc5b4\ub514\uc5d0 \uc368\uc57c \ud560\uae4c? - \ucee8\ud504\ub7f0\uc2a4 \ubc29\ubb38",permalink:"/blog/2023/04/13/golang-conference"}},i={authorsImageUrls:[void 0]},c=[{value:"Jest \ud1b5\uc2e0 \ud14c\uc2a4\ud2b8 \ud658\uacbd \uc124\uc815",id:"jest-\ud1b5\uc2e0-\ud14c\uc2a4\ud2b8-\ud658\uacbd-\uc124\uc815",level:2},{value:"\ubb38\uc81c: syntaxerror: Cannot use import statement outside a module \uc5d0\ub7ec \ubc1c\uc0dd",id:"\ubb38\uc81c-syntaxerror-cannot-use-import-statement-outside-a-module-\uc5d0\ub7ec-\ubc1c\uc0dd",level:3},{value:"\uc2dc\ub3c4: syntaxerror: Cannot use import statement outside a module \uc5d0\ub7ec \ubc1c\uc0dd",id:"\uc2dc\ub3c4-syntaxerror-cannot-use-import-statement-outside-a-module-\uc5d0\ub7ec-\ubc1c\uc0dd",level:3},{value:"\ud574\uacb0",id:"\ud574\uacb0",level:3},{value:"\ud559\uc2b5",id:"\ud559\uc2b5",level:3},{value:"\uc720\uc800\uc758 \ud589\ub3d9\uc744 \ud14c\uc2a4\ud2b8\ud558\ub294 \ubc29\ubc95",id:"\uc720\uc800\uc758-\ud589\ub3d9\uc744-\ud14c\uc2a4\ud2b8\ud558\ub294-\ubc29\ubc95",level:2},{value:"Axios try-catch error \ud0c0\uc785\uc9c0\uc815",id:"axios-try-catch-error-\ud0c0\uc785\uc9c0\uc815",level:2},{value:"\ubb38\uc81c",id:"\ubb38\uc81c",level:3},{value:"\uc2dc\ub3c4",id:"\uc2dc\ub3c4",level:3},{value:"\ud574\uacb0",id:"\ud574\uacb0-1",level:3},{value:"\ud559\uc2b5",id:"\ud559\uc2b5-1",level:3},{value:"Jest: mocking console.error - tests fails",id:"jest-mocking-consoleerror---tests-fails",level:2},{value:"\ubb38\uc81c: \ub108\ubb34 \ub9ce\uc740 \uc5d0\ub7ec \uba54\uc2dc\uc9c0",id:"\ubb38\uc81c-\ub108\ubb34-\ub9ce\uc740-\uc5d0\ub7ec-\uba54\uc2dc\uc9c0",level:3},{value:"\uc2dc\ub3c4",id:"\uc2dc\ub3c4-1",level:3},{value:"\ud574\uacb0",id:"\ud574\uacb0-2",level:3},{value:"\ud559\uc2b5: console \uac1d\uccb4\ub97c \uacf5\ubd80\ud569\uc2dc\ub2e4.",id:"\ud559\uc2b5-console-\uac1d\uccb4\ub97c-\uacf5\ubd80\ud569\uc2dc\ub2e4",level:3}],u={toc:c},p="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"jest-\ud1b5\uc2e0-\ud14c\uc2a4\ud2b8-\ud658\uacbd-\uc124\uc815"},"Jest \ud1b5\uc2e0 \ud14c\uc2a4\ud2b8 \ud658\uacbd \uc124\uc815"),(0,a.kt)("h3",{id:"\ubb38\uc81c-syntaxerror-cannot-use-import-statement-outside-a-module-\uc5d0\ub7ec-\ubc1c\uc0dd"},"\ubb38\uc81c: syntaxerror: Cannot use import statement outside a module \uc5d0\ub7ec \ubc1c\uc0dd"),(0,a.kt)("p",null,"Axios\ub97c \uc124\uce58\ud558\uace0 \ud1b5\uc2e0 \ud14c\uc2a4\ud2b8\ub97c \uc2dc\uc791\ud558\uba74\uc11c \ubb38\uc81c\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. \uc774\ub7f0 \uc5d0\ub7ec\uba54\uc2dc\uc9c0\ub97c \ubc1b\uc558\uc2b5\ub2c8\ub2e4."),(0,a.kt)("h3",{id:"\uc2dc\ub3c4-syntaxerror-cannot-use-import-statement-outside-a-module-\uc5d0\ub7ec-\ubc1c\uc0dd"},"\uc2dc\ub3c4: syntaxerror: Cannot use import statement outside a module \uc5d0\ub7ec \ubc1c\uc0dd"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://stackoverflow.com/questions/73958968/cannot-use-import-statement-outside-a-module-with-axios"},'"Cannot use import statement outside a module" with Axios')),(0,a.kt)("p",null,"\ud574\uacb0\ud558\uae30 \uc804 \uc5ec\uae30\uae4c\uc9c0 \uac80\uc0c9\ud588\uc2b5\ub2c8\ub2e4. \uc0dd\uac01\ubcf4\ub2e4 \ub9ce\uc740 \uc0ac\ub78c\ub4e4\uc774 \ubb38\uc81c\ub85c \uc0dd\uac01\ud558\uace0 \uc788\uc5c8\uc2b5\ub2c8\ub2e4."),(0,a.kt)("h3",{id:"\ud574\uacb0"},"\ud574\uacb0"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://www.inflearn.com/questions/681666/axios-1-1-2-%EB%B2%84%EC%A0%84-issue-syntaxerror-cannot-use-import-statement-outside-a-module"},"axios 1.1.2 \ubc84\uc804 issue ( SyntaxError: Cannot use import statement outside a module) - \uc778\ud504\ub7f0")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "name": "wanted-pre-onboarding-frontend",\n  "version": "0.1.0",\n  "private": true,\n  "dependencies": {\n    // \uc0dd\ub7b5\n  },\n  "scripts": {\n    "start": "react-scripts start",\n    "build": "react-scripts build",\n    "test": "react-scripts test --transformIgnorePatterns \\"node_modules/(?!axios)/\\"",\n    "eject": "react-scripts eject"\n  },\n  "devDependencies": {\n    "msw": "^1.2.1",\n    "prettier": "^2.8.7",\n    "prettier-plugin-tailwindcss": "^0.2.7",\n    "tailwindcss": "^3.3.1"\n  }\n}\n')),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},'"test": "react-scripts test'),"\uc744 ",(0,a.kt)("inlineCode",{parentName:"p"},'"test": "react-scripts test --transformIgnorePatterns \\"node_modules/(?!axios)/\\""'),"\uc73c\ub85c \ubcc0\uacbd\ud558\uba74 \ub429\ub2c8\ub2e4."),(0,a.kt)("h3",{id:"\ud559\uc2b5"},"\ud559\uc2b5"),(0,a.kt)("p",null,"Jest \uac1c\ubc1c\ud658\uacbd\uc740 \uc0dd\uac01\ubcf4\ub2e4 \uc88b\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. \ub610 \ud14c\uc2a4\ud2b8 \uc124\uc815\uc790\uccb4\ub97c \uae4a\uac8c \uacf5\ubd80\ud560 \ud544\uc694\ub3c4 \uc788\uc744 \uac83 \uac19\uc2b5\ub2c8\ub2e4."),(0,a.kt)("h2",{id:"\uc720\uc800\uc758-\ud589\ub3d9\uc744-\ud14c\uc2a4\ud2b8\ud558\ub294-\ubc29\ubc95"},"\uc720\uc800\uc758 \ud589\ub3d9\uc744 \ud14c\uc2a4\ud2b8\ud558\ub294 \ubc29\ubc95"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"describe('CustomButton', () => {\n  it('\ud65c\uc131\ud654\ub418\uc5b4 \uc788\ub294 \ub3d9\uc548\uc5d0 \ud074\ub9ad\ud558\uba74 \uae30\ub2a5\uc744 \uc218\ud589\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.', () => {\n    const mockOnClick = jest.fn();\n    render(\n      <CustomButton text=\"\ud68c\uc6d0\uac00\uc785\" hierarchy=\"primary\" onClick={mockOnClick} />\n    );\n    const button = screen.getByRole('button');\n    userEvent.click(button);\n    expect(mockOnClick).toHaveBeenCalledTimes(1);\n  });\n\n  it('\ube44\ud65c\uc131\ud654\ub418\uc5b4 \uc788\ub294 \ub3d9\uc548\uc5d0 \ud074\ub9ad\ud558\uba74 \uae30\ub2a5\uc744 \uc218\ud589\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.', () => {\n    const mockOnClick = jest.fn();\n    render(\n      <CustomButton\n        text=\"\ud68c\uc6d0\uac00\uc785\"\n        hierarchy=\"primary\"\n        onClick={mockOnClick}\n        disabled={true}\n      />\n    );\n    const button = screen.getByRole('button');\n    userEvent.click(button);\n    expect(mockOnClick).toHaveBeenCalledTimes(0);\n  });\n});\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"disabled")," props\uac00 \uc815\uc0c1\ub3d9\uc791\ud558\ub294\uc9c0 \uac80\uc99d\ud574\uc57c \ud558\ub294 \uc0c1\ud669\uc785\ub2c8\ub2e4. \ube44\ud65c\uc131\ud654\uc5d0\uc11c\ub294 \ud568\uc218\uac00 \ud638\ucd9c\ub418\uc9c0 \uc54a\uace0 \ud65c\uc131\ud654\uc5d0\ub294 \ud568\uc218\uac00 \ud638\ucd9c\ub418\uc5b4\uc57c \ud569\ub2c8\ub2e4."),(0,a.kt)("p",null,"\uc774\ub807\uac8c \uc720\uc800\uc758 \ud589\ub3d9\uc744 \ucf54\ub4dc \uc7ac\ud604\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ubb3c\ub860 \uc544\uc8fc \ub2e8\uc21c\ud55c \ud074\ub9ad\ub9cc \uc7ac\ud604\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4."),(0,a.kt)("h2",{id:"axios-try-catch-error-\ud0c0\uc785\uc9c0\uc815"},"Axios try-catch error \ud0c0\uc785\uc9c0\uc815"),(0,a.kt)("h3",{id:"\ubb38\uc81c"},"\ubb38\uc81c"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"async function signin(email: string, password: string) {\n  try {\n    const res = await client.post(\n      AUTH_PATH + SIGNIN_PATH,\n      { email, password },\n      { headers: { 'Content-Type': 'application/json' } }\n    );\n    if (res.status === 200) return res.data;\n  } catch (error) {\n    if (error.response?.status === 401) return '\ube44\ubc00\ubc88\ud638\uac00 \uc77c\uce58\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.';\n    if (error.response?.status === 404) return '\uac00\uc785\ub418\uc9c0 \uc54a\uc740 \uc774\uba54\uc77c\uc785\ub2c8\ub2e4';\n  }\n}\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\uc5ec\uae30\uc11c ",(0,a.kt)("inlineCode",{parentName:"li"},"error"),"\ub294 ",(0,a.kt)("inlineCode",{parentName:"li"},"Typesafe"),"\ud558\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4.")),(0,a.kt)("h3",{id:"\uc2dc\ub3c4"},"\uc2dc\ub3c4"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"async function signin(email: string, password: string) {\n  try {\n    const res = await client.post(\n      AUTH_PATH + SIGNIN_PATH,\n      { email, password },\n      { headers: { 'Content-Type': 'application/json' } }\n    );\n    if (res.status === 200) return res.data;\n  } catch (error: AxiosError) {\n    // Catch clause variable type annotation must be 'any' or 'unknown' if specified.\n    if (error.response?.status === 401) return '\ube44\ubc00\ubc88\ud638\uac00 \uc77c\uce58\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.';\n    if (error.response?.status === 404) return '\uac00\uc785\ub418\uc9c0 \uc54a\uc740 \uc774\uba54\uc77c\uc785\ub2c8\ub2e4';\n  }\n}\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Catch clause variable type annotation must be 'any' or 'unknown' if specified.")),(0,a.kt)("p",null,"\uc774\ub7f0 \uc5d0\ub7ec\uba54\uc2dc\uc9c0\ub97c \uc90d\ub2c8\ub2e4."),(0,a.kt)("h3",{id:"\ud574\uacb0-1"},"\ud574\uacb0"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://stackoverflow.com/questions/69264472/axios-error-typescript-annotation-must-be-any-or-unknown-if"},"axios Error typescript, annotation must be 'any' or 'unknown' if?")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"async function signin(email: string, password: string) {\n  try {\n    const res = await client.post(\n      AUTH_PATH + SIGNIN_PATH,\n      { email, password },\n      { headers: { 'Content-Type': 'application/json' } }\n    );\n    if (res.status === 200) return res.data;\n  } catch (error) {\n    const err = error as AxiosError;\n    if (err.response?.status === 401) return '\ube44\ubc00\ubc88\ud638\uac00 \uc77c\uce58\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.';\n    if (err.response?.status === 404) return '\uac00\uc785\ub418\uc9c0 \uc54a\uc740 \uc774\uba54\uc77c\uc785\ub2c8\ub2e4';\n  }\n}\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"error as AxiosError"),"\uc73c\ub85c \ud0c0\uc785\uc9c0\uc815\ud558\uace0 ",(0,a.kt)("inlineCode",{parentName:"li"},"err"),"\uc2dd\ubcc4\uc790\ub97c \ub530\ub85c \ub9cc\ub4e4\uace0 \ud65c\uc6a9\ud588\uc2b5\ub2c8\ub2e4. \uc774\ub807\uac8c \ub418\uba74 ",(0,a.kt)("inlineCode",{parentName:"li"},"Typesafe"),"\ud574\uc9d1\ub2c8\ub2e4.")),(0,a.kt)("h3",{id:"\ud559\uc2b5-1"},"\ud559\uc2b5"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"try-catch"),"\uc758 ",(0,a.kt)("inlineCode",{parentName:"p"},"error"),"\ub294 ",(0,a.kt)("inlineCode",{parentName:"p"},"any")," \ud639\uc740 ",(0,a.kt)("inlineCode",{parentName:"p"},"unknown"),"\uc785\ub2c8\ub2e4. \uc774 \ud0c0\uc785\uc73c\ub85c \uace0\uc815\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4."),(0,a.kt)("h2",{id:"jest-mocking-consoleerror---tests-fails"},"Jest: mocking console.error - tests fails"),(0,a.kt)("h3",{id:"\ubb38\uc81c-\ub108\ubb34-\ub9ce\uc740-\uc5d0\ub7ec-\uba54\uc2dc\uc9c0"},"\ubb38\uc81c: \ub108\ubb34 \ub9ce\uc740 \uc5d0\ub7ec \uba54\uc2dc\uc9c0"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\ud1b5\uc2e0\uacfc \uad00\ub828\ud574\uc11c \ud14c\uc2a4\ud2b8\ub97c \uc2dc\uc791\ud560 \ub54c \uc5d0\ub7ec\uba54\uc2dc\uc9c0\uac00 \ub9ce\uc558\uc2b5\ub2c8\ub2e4.")),(0,a.kt)("h3",{id:"\uc2dc\ub3c4-1"},"\uc2dc\ub3c4"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\ud55c\ubc88\uc5d0 \uac80\uc0c9\ud558\uace0 \ud55c\ubc88\uc5d0 \ud574\uacb0\ud588\uc2b5\ub2c8\ub2e4.")),(0,a.kt)("h3",{id:"\ud574\uacb0-2"},"\ud574\uacb0"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"setupTests.ts"),"\ub97c \uc218\uc815\ud558\ub294 \uac83\uc73c\ub85c \ud574\uacb0\ud588\uc2b5\ub2c8\ub2e4."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://stackoverflow.com/questions/44596915/jest-mocking-console-error-tests-fails"},"Jest: mocking console.error - tests fails")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"// jest-dom adds custom jest matchers for asserting on DOM nodes.\n// allows you to do things like:\n// expect(element).toHaveTextContent(/react/i)\n// learn more: https://github.com/testing-library/jest-dom\nimport '@testing-library/jest-dom';\n\nimport { server } from './mocks/server';\n// Establish API mocking before all tests.\nbeforeAll(() => server.listen());\n\nconst original = console.error;\n\n// Reset any request handlers that we may add during the tests,\n// so they don't affect other tests.\nafterEach(() => {\n  // console.error(\"you cant see me\");\n  console.error = original;\n  // console.error(\"now you can\");\n\n  return server.resetHandlers();\n});\n\n// Clean up after the tests are finished.\nafterAll(() => server.close());\n\nbeforeEach(() => {\n  console.error = jest.fn();\n  console.error('you cant see me');\n});\n")),(0,a.kt)("p",null,"\ucd5c\uc885\uc801\uc73c\ub85c\ub294 \uc774\ub807\uac8c \ub418\uc5c8\uc2b5\ub2c8\ub2e4."),(0,a.kt)("h3",{id:"\ud559\uc2b5-console-\uac1d\uccb4\ub97c-\uacf5\ubd80\ud569\uc2dc\ub2e4"},"\ud559\uc2b5: console \uac1d\uccb4\ub97c \uacf5\ubd80\ud569\uc2dc\ub2e4."),(0,a.kt)("p",null,"\uc790\uc8fc \ud558\ub294 \uacb0\uc2ec\ub4e4\uc774 \uc788\uc2b5\ub2c8\ub2e4. \uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8 \uc815\uaddc\ud45c\ud604\uc2dd\uacfc \uc5d0\ub7ec\uac1d\uccb4\uc880 \ud559\uc2b5\ud558\uc790\uace0 \ub298 \uacb0\uc2ec\ub9cc \ud558\uace0 \uc2e4\ucc9c\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. \ub610 \uacb0\uc2ec\ud558\uace0 \uc2e4\ucc9c\uc744 \uc5b8\uc81c\ud574\uc57c \ud560\uc9c0 \ubaa8\ub974\uaca0\uc2b5\ub2c8\ub2e4. \ub098\uc911\uc5d0 \uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8 \uc815\ub9ac\ud558\ub294 \ud504\ub85c\uc81d\ud2b8\uc5d0 \uc815\ub9ac\ud560 \uac83 \uac19\uc2b5\ub2c8\ub2e4. \uc798 \uc4f0\uba74 \uc0c1\ub2f9\ud788 \ud6a8\uc728\uc801\uc778 \uac1d\uccb4\uc778\ub370 \uc798 \ud65c\uc6a9\ud558\uace0 \uc788\uc9c0 \uc54a\uace0 \uc788\uc5c8\uc2b5\ub2c8\ub2e4."))}m.isMDXComponent=!0}}]);