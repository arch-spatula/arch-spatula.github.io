"use strict";(self.webpackChunkarch_spatula_github_io=self.webpackChunkarch_spatula_github_io||[]).push([[67835],{28342:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>o});var t=s(85893),c=s(11151);const i={title:"vitest\ub85c \ud1b5\uc2e0 mocking\ud558\uae30",authors:["arch-spatula"],tags:["vitest","mocking","axios","unhandled rejection"],description:"vitest\ub85c \ud1b5\uc2e0 mocking\ud558\uae30",toc_max_heading_level:6},l="vitest\ub85c \ud1b5\uc2e0 mocking\ud558\uae30",r={permalink:"/blog/2023/11/11/",editUrl:"https://github.com/arch-spatula/arch-spatula.github.io/blob/dev/blog/2023-11-11.md",source:"@site/blog/2023-11-11.md",title:"vitest\ub85c \ud1b5\uc2e0 mocking\ud558\uae30",description:"vitest\ub85c \ud1b5\uc2e0 mocking\ud558\uae30",date:"2023-11-11T00:00:00.000Z",formattedDate:"2023\ub144 11\uc6d4 11\uc77c",tags:[{label:"vitest",permalink:"/blog/tags/vitest"},{label:"mocking",permalink:"/blog/tags/mocking"},{label:"axios",permalink:"/blog/tags/axios"},{label:"unhandled rejection",permalink:"/blog/tags/unhandled-rejection"}],readingTime:15.91,hasTruncateMarker:!0,authors:[{name:"arch-spatula",title:"Cook-Book \ub9ce\uc774 \ub9cc\ub4ed\ub2c8\ub2e4",url:"https://github.com/arch-spatula",imageURL:"https://github.com/arch-spatula.png",key:"arch-spatula"}],frontMatter:{title:"vitest\ub85c \ud1b5\uc2e0 mocking\ud558\uae30",authors:["arch-spatula"],tags:["vitest","mocking","axios","unhandled rejection"],description:"vitest\ub85c \ud1b5\uc2e0 mocking\ud558\uae30",toc_max_heading_level:6},unlisted:!1,prevItem:{title:"\uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8 Task Queue \ube14\ub7ec\ud0b9 \ud480\uae30",permalink:"/blog/2023/12/01/"},nextItem:{title:"go \uc5b8\uc5b4\ub85c TIL-CLI \ub9cc\ub4e4\uae30",permalink:"/blog/2023/10/14/"}},a={authorsImageUrls:[void 0]},o=[{value:"\ub3d9\uc791\ud558\ub294 \ucf54\ub4dc \uc791\uc131",id:"\ub3d9\uc791\ud558\ub294-\ucf54\ub4dc-\uc791\uc131",level:2},{value:"axios \uc124\uce58",id:"axios-\uc124\uce58",level:3},{value:"\ud14c\uc2a4\ud2b8 \ucf54\ub4dc \uc791\uc131",id:"\ud14c\uc2a4\ud2b8-\ucf54\ub4dc-\uc791\uc131",level:2},{value:"vitest \uc124\uce58",id:"vitest-\uc124\uce58",level:3},{value:"\ubcf8\uc778\uc758 \ucf54\ub4dc mocking",id:"\ubcf8\uc778\uc758-\ucf54\ub4dc-mocking",level:2},{value:"\uc678\ubd80 \ud1b5\uc2e0",id:"\uc678\ubd80-\ud1b5\uc2e0",level:3},{value:"\ub77c\uc774\ube0c\ub7ec\ub9ac \ucf54\ub4dc mocking",id:"\ub77c\uc774\ube0c\ub7ec\ub9ac-\ucf54\ub4dc-mocking",level:2},{value:"\uc608\uc678\ucc98\ub9ac",id:"\uc608\uc678\ucc98\ub9ac",level:3},{value:"\uc608\uc678 \ud14c\uc2a4\ud2b8\ucf00\uc774\uc2a4",id:"\uc608\uc678-\ud14c\uc2a4\ud2b8\ucf00\uc774\uc2a4",level:2},{value:"dangerouslyIgnoreUnhandledErrors\uc73c\ub85c catch \uc548\ud558\uae30",id:"dangerouslyignoreunhandlederrors\uc73c\ub85c-catch-\uc548\ud558\uae30",level:3},{value:"\uacb0\ub860",id:"\uacb0\ub860",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",del:"del",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,c.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"\ud14c\uc2a4\ud2b8 \ucf54\ub4dc\ub97c \uc791\uc131\ud558\uba74\uc11c \uc790\uc8fc \ub290\ub080 \uac83\uc774\uc9c0\ub9cc mocking\uc774 \uc5b4\ub835\uc2b5\ub2c8\ub2e4. \ubb3c\ub860 \uac1c\uc778\uc801\uc73c\ub85c jest\ubcf4\ub2e4 vitest\ub97c \ub354 \ub9ce\uc774 \uc0ac\uc6a9\ud574\ubd24\uc2b5\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.del,{children:"\uc800\ub294 \uc624\ub298 \uc81c\uac00 \ube7c\ube7c\ub85c\ub97c \ubc1b\uc744\uc9c0 \ud14c\uc2a4\ud2b8\ud574\ubcf4\uaca0\uc2b5\ub2c8\ub2e4."})}),"\n",(0,t.jsx)(n.admonition,{type:"warning",children:(0,t.jsx)(n.p,{children:"\uc774\uae00\uc740 \ub098\uc911\uc5d0 \ub9c8\uc774\uadf8\ub808\uc774\uc158 \ub300\uc0c1\uc785\ub2c8\ub2e4. \ud0c0\uc785\uc2a4\ud06c\ub9bd\ud2b8, \uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8 \ud0ed\uc73c\ub85c \uc5b8\uc81c \uc774\ub3d9\ud560\uc9c0 \ubaa8\ub985\ub2c8\ub2e4."})}),"\n",(0,t.jsx)(n.p,{children:"\uc774\ubc88\uc5d0\ub3c4 QDD \ubc29\uc2dd\uc73c\ub85c \uc791\uc5c5\uc744 \uc9c4\ud589\ud560 \uac83\uc785\ub2c8\ub2e4. \uc9c8\ubb38\uc744 \ub9cc\ub4e4\uace0 \uc9c8\ubb38\uc5d0 \ub2f5\uc744 \ucc3e\uace0 \uc801\uc6a9\ud558\uace0 \ucee4\ubc0b\ud560 \uac83\uc785\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.p,{children:"\ud558\uc9c0\ub9cc \ud574\ub2f9 \ub808\ud3ec\ub294 \ubcfc \uc218 \uc5c6\uc744 \uac83\uc785\ub2c8\ub2e4. \uc81c\uac00 \uc548 \ud588\uc2b5\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.h2,{id:"\ub3d9\uc791\ud558\ub294-\ucf54\ub4dc-\uc791\uc131",children:"\ub3d9\uc791\ud558\ub294 \ucf54\ub4dc \uc791\uc131"}),"\n",(0,t.jsx)(n.p,{children:"\ud504\ub860\ud2b8\uc5d4\ub4dc\ub294 TDD\uae4c\uc9c0\ub294 \uc548 \ud558\ub294 \uacbd\uc6b0\ub3c4 \ub9ce\uc2b5\ub2c8\ub2e4. \uac1c\ubc1c \ud6c4 \ud14c\uc2a4\ud2b8 \ucf54\ub4dc \uc791\uc131\uc73c\ub85c \ub098\uc911\uc5d0 \uc758\uc874\ud558\ub294 \ubd80\ubd84\uc5d0 \ubcc0\uacbd\uc774 \uc548\uc815\uc801\uc73c\ub85c \uc774\ub8e8\uc5b4\uc84c\ub294\uc9c0 \ud655\uc778\ud558\uae30 \uc720\uc6a9\ud569\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.p,{children:"\uc800\ub294 mocking\ud560 \ub54c \ud604\uc2e4\uc5d0\uc11c \uc790\uc8fc \ubc1c\uc0dd\ud560 \ub9cc\ud55c \ud1b5\uc2e0\uc744 mocking\ud560 \uac83\uc785\ub2c8\ub2e4. \uadf8\ub9ac\uace0 \uadf8\uac83\ub3c4 \uc544\uc8fc \ub2e8\uc21c\ud558\uac8c \ub9cc\ub4e4 \uac83\uc785\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.h3,{id:"axios-\uc124\uce58",children:"axios \uc124\uce58"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"pnpm i axios\n"})}),"\n",(0,t.jsxs)(n.p,{children:["\uc800\ub294 ",(0,t.jsx)(n.code,{children:"pnpm"}),"\uc73c\ub85c \uc124\uce58\ud560 \uac83\uc785\ub2c8\ub2e4. \ud328\ud0a4\uc9c0 \ub9e4\ub2c8\uc800\ub294 \ucde8\ud5a5\uac83 \uc54c\uc544\uc11c \ud558\uc138\uc694."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",metastring:'title="main.js"',children:"import axios from 'axios';\n\nexport async function callJSONPlaceholder() {\n  const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');\n  return res.data;\n}\n\ncallJSONPlaceholder().then((res) => console.log(res));\n"})}),"\n",(0,t.jsx)(n.p,{children:"\uc704\ucc98\ub7fc \ucf54\ub4dc\ub97c \uc791\uc131\ud588\uc2b5\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title="package.json"',children:'{\n  "dependencies": {\n    "axios": "^1.6.1"\n  },\n  "type": "module"\n}\n'})}),"\n",(0,t.jsxs)(n.p,{children:["\uc704\ucc98\ub7fc ",(0,t.jsx)(n.code,{children:"package.json"}),"\ucc98\ub7fc \uc124\uc815\ud574\uc8fc\uc2dc\uae30 \ubc14\ub78d\ub2c8\ub2e4. \uc800\ub294 ",(0,t.jsx)(n.code,{children:"import"})," \ubb38\uc744 \uc120\ud638\ud558\ub294 \ucde8\ud5a5\uc774 \uc788\uc2b5\ub2c8\ub2e4. \uc874\uc911\ud558\uc138\uc694."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"node main.js\n# { userId: 1, id: 1, title: 'delectus aut autem', completed: false }\n"})}),"\n",(0,t.jsx)(n.p,{children:"\uc544\ub9c8 \uc704\ucc98\ub7fc \ucd9c\ub825\ud569\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.p,{children:"TDD\ub85c \ud14c\uc2a4\ud2b8\ub97c \uba3c\uc800 \uc791\uc131\ud558\ub294 \ubc29\uc2dd\uc774 \uc544\ub2d9\ub2c8\ub2e4. \ud558\uc9c0\ub9cc \ucf54\ub4dc\uc790\uccb4\uac00 \ub2e8\uc21c\ud558\uba74 \uc0ac\ud6c4 \ud14c\uc2a4\ud2b8\ub3c4 \uac00\uce58\ub294 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.p,{children:"\ub2e8\uc21c\ud574\uc11c \ud14c\uc2a4\ud2b8 \uac00\uce58\uac00 \uc5c6\ub294 \uac83\uc740 \uc544\ub2d9\ub2c8\ub2e4. \ud558\uc9c0\ub9cc \ud14c\uc2a4\ud2b8\ub97c \uc27d\uac8c \uc791\uc131\ud558\uae30 \uc704\ud574 \ucf54\ub4dc\ub97c \ub2e8\uc21c\ud558\uac8c \uc791\uc131\ud558\ub824\ub294 \uc2b5\uc131\uc774 \uc0dd\uae41\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.p,{children:"\uc9c0\uae08 \uc608\uc2dc\ub294 \ub9e4\ubc88 \uc785\ucd9c\ub825\uc758 \uba71\ub4f1\uc131\uc744 \ubcf4\uc7a5\ubc1b\uc2b5\ub2c8\ub2e4. \ud558\uc9c0\ub9cc \ud604\uc2e4\uc5d0\uc11c\ub294 \ub9e4 \uc694\uccad\ub9c8\ub2e4 \ub2e4\ub978 \uacb0\uacfc\uac00 \ub098\uc62c \uac83\uc785\ub2c8\ub2e4. \uc2e4\uc81c \uc694\uccad\uc758 \uacb0\uacfc\uac00 \ub9e4\ubc88 \ub2e4\ub97c \ub54c \uc5b4\ub5bb\uac8c \ucc98\ub9ac\ud560\uc9c0 \ud14c\uc2a4\ud2b8 \ucf54\ub4dc\uac00 \ud544\uc694\ud569\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.p,{children:"\uc0ac\uc2e4 \ub808\ucf54\ub4dc\uc758 \ud0a4\ub294 \uac19\uc544\ub3c4 \ubc1b\uc544\uc62c \uc5d4\ud2f0\ud2f0\uc758 \uc218\ub7c9\uc740 \uac00\ubcc0\uc801\uc785\ub2c8\ub2e4. \uc774\uac83\uc744 \uc5b4\ub5bb\uac8c \ucc98\ub9ac\ud558\ub294\uc9c0 \ud30c\uc545\ud558\ub294 \uac83\uc774 \uc911\uc694\ud569\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.h2,{id:"\ud14c\uc2a4\ud2b8-\ucf54\ub4dc-\uc791\uc131",children:"\ud14c\uc2a4\ud2b8 \ucf54\ub4dc \uc791\uc131"}),"\n",(0,t.jsx)(n.p,{children:"\ube0c\ub77c\uc6b0\uc800 \ud639\uc740 postman \uac19\uc740 \ud1b5\uc2e0 \ud074\ub77c\uc774\uc5b8\ud2b8\ub85c \uac80\uc99d\ud558\ub294 \ud589\uc704\ub294 \ucc98\uc74c\uc5d0 \uc790\uc8fc \ud569\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.p,{children:"\ud558\uc9c0\ub9cc \uc218\ub3d9\uc73c\ub85c \ud14c\uc2a4\ud2b8\ud558\uace0 \uac80\uc99d\ud560 \ubd80\ubd84\uc774 \ub9ce\uc744 \ub54c \uc9c0\uae08 \uc791\uc5c5\ub4e4\uc774 \ud544\uc694\ud569\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.h3,{id:"vitest-\uc124\uce58",children:"vitest \uc124\uce58"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"pnpm i vitest\n"})}),"\n",(0,t.jsx)(n.p,{children:"\uc124\uce58\ud558\uace0 \ub09c\ub4a4\uc5d0 \uba85\ub839 \uc2a4\ud06c\ub9bd\ud2b8 \uc124\uc815\ud569\uc2dc\ub2e4."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title="package.json"',children:'{\n  "dependencies": {\n    "axios": "^1.6.1",\n    "vitest": "^0.34.6"\n  },\n  "scripts": {\n    "test": "vitest"\n  },\n  "type": "module"\n}\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",metastring:'title="main.test.js"',children:"import { describe, expect, it } from 'vitest';\n\ndescribe('callJSONPlaceholder', () => {\n  it('should work just fine', () => {\n    expect(false).toBe(true);\n  });\n});\n"})}),"\n",(0,t.jsx)(n.p,{children:"\uc2e4\ud328\ud558\ub294 \ud14c\uc2a4\ud2b8 \ucf54\ub4dc\ub97c \uc791\uc131\ud569\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"pnpm test\n"})}),"\n",(0,t.jsx)(n.p,{children:"\uc704\ucf54\ub4dc\ub294 \uc131\uacf5\uc801\uc73c\ub85c \uc2e4\ud328\ud560 \uac83\uc785\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.p,{children:"\uc5ec\uae30\uae4c\uc9c0 \uc791\uc131\ud558\uba74 \ud14c\uc2a4\ud2b8\ub97c \uc124\uc815\ub9cc \ud55c \uac83\uc785\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.p,{children:"\uc6b0\ub9ac\ub294 \ub2e4\uc591\ud55c \ub300\uc0c1\uc744 mocking \ud574\uc57c\ud569\ub2c8\ub2e4. \uc6b0\ub9ac\uac00 \uc9c1\uc811 \uc791\uc131\ud55c \ud568\uc218, \uba54\uc11c\ub4dc\ubd80\ud130 \ub2e4\ub978 \ub77c\uc774\ube0c\ub7ec\ub9ac \ud639\uc740 \ud328\ud0a4\uc9c0\ub3c4 mocking\ud574\uc57c \ud569\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.h2,{id:"\ubcf8\uc778\uc758-\ucf54\ub4dc-mocking",children:"\ubcf8\uc778\uc758 \ucf54\ub4dc mocking"}),"\n",(0,t.jsxs)(n.p,{children:["\uc8fc\uc758\uc0ac\ud56d\uc774 \uc788\uc2b5\ub2c8\ub2e4. \uc2e4\uc81c API \uc694\uccad\uc744 \uc2dc\ub3c4\ud558\ub294 \uacbd\uc6b0\ub3c4 \uc788\uc2b5\ub2c8\ub2e4. MSW\ub97c \uc124\uc815\ud558\uba74 \uc2e4\uc81c \uc694\uccad\uc744 \uc548 \ubcf4\ub0b4\uace0 \ub0b4\ubd80\uc5d0\uc11c \ud14c\uc2a4\ud2b8 \uc11c\ubc84\uac00 \uac00\ub85c\ucc44\uace0 \uc751\ub2f5\ud558\ub294 \ubc29\uc2dd\uc73c\ub85c \ub3d9\uc791\ud574\uc11c \uc0c1\uad00 \uc5c6\uc2b5\ub2c8\ub2e4. MSW\uc758 \ubb38\uc81c\ub294 \ubc31\uc5d4\ub4dc \uc804\uccb4\ub97c mocking\ud569\ub2c8\ub2e4. code gen\uc73c\ub85c \uc790\ub3d9 \ud574\uacb0\ud560 \uc218 \uc788\ub294 \uac83\uc774 \uc544\ub2c8\uba74 ",(0,t.jsx)(n.del,{children:"\uc88b\uc740 \ub77c\uc774\ube0c\ub7ec\ub9ac \uc544\uc774\ub514\uc5b4\uc785\ub2c8\ub2e4."})," \ub098\uc911\uc5d0 \uc801\uc6a9\ud558\ub294 \uac83\uc774 \uc88b\uc744 \uac83 \uac19\uc2b5\ub2c8\ub2e4."]}),"\n",(0,t.jsxs)(n.p,{children:["\uba3c\uc800 \uc2e4\uc81c \ub77c\uc774\ube0c\ub7ec\ub9ac\uc758 \ucf54\ub4dc\ub97c mocking\ud558\uae30 \uc804\uc758 \uc81c\uac00 \uc791\uc131\ud55c \ucf54\ub4dc\ubd80\ud130 mocking\ud558\uaca0\uc2b5\ub2c8\ub2e4. \uc6b0\ub9ac\uc758 mocking \ub300\uc0c1\uc740 ",(0,t.jsx)(n.code,{children:"callJSONPlaceholder"}),"\uc785\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(n.p,{children:"\uadf8\ub798\uc11c \uc800\ub294 \uacf5\uc2dd \ubb38\uc11c\uc758 \uc77c\ubd80\ub97c \ubc1c\ucdcc\ud558\uace0 \ube44\uc2b7\ud55c \uc2dc\ub3c4\ub97c \ud574\ubd24\uc2b5\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",metastring:'title="increment.js"',children:"export function increment(number) {\n  return number + 1;\n}\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",metastring:'title="increment.test.js"',children:"import { beforeEach, test } from 'vitest';\nimport { increment } from './increment.js';\n\n// the module is not mocked, because vi.doMock is not called yet\nincrement(1) === 2;\n\nlet mockedIncrement = 100;\n\nbeforeEach(() => {\n  // you can access variables inside a factory\n  vi.doMock('./increment.js', () => ({ increment: () => ++mockedIncrement }));\n});\n\ntest('importing the next module imports mocked one', async () => {\n  // original import WAS NOT MOCKED, because vi.doMock is evaluated AFTER imports\n  expect(increment(1)).toBe(2);\n  const { increment: mockedIncrement } = await import('./increment.js');\n  // new dynamic import returns mocked module\n  expect(mockedIncrement(1)).toBe(101);\n  expect(mockedIncrement(1)).toBe(102);\n  expect(mockedIncrement(1)).toBe(103);\n});\n"})}),"\n",(0,t.jsxs)(n.p,{children:["\uc704\ub294 ",(0,t.jsx)(n.a,{href:"https://vitest.dev/api/vi#vi-domock",children:"\uacf5\uc2dd \ubb38\uc11c"}),"\uc758 \uc77c\ubd80\uc785\ub2c8\ub2e4. \uac04\ub2e8\ud574\ubcf4\uc5ec\uc11c \uc2dc\ub3c4\ud574\ubd24\uc2b5\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",metastring:'title="main.test.js"',children:"beforeEach(() => {\n  vi.doMock('./main.js', async () => ({\n    userId: 1,\n    id: 1,\n    title: 'delectus aut autem',\n    completed: false,\n  }));\n});\n\ndescribe('callJSONPlaceholder', () => {\n  it('should work just fine', async () => {\n    const { callJSONPlaceholder: mockedCallJSONPlaceholder } = await import(\n      './main.js'\n    );\n\n    const result = await mockedCallJSONPlaceholder();\n\n    expect(result).toBe(null);\n  });\n});\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:' FAIL  main.test.js > callJSONPlaceholder > should work just fine\nError: [vitest] No "callJSONPlaceholder" export is defined on the "./main.js" mock. Did you forget to return it from "vi.mock"?\nIf you need to partially mock a module, you can use "vi.importActual" inside:\n\nvi.mock("./main.js", async () => {\n  const actual = await vi.importActual("./main.js")\n  return {\n    ...actual,\n    // your mocked methods\n  },\n})\n'})}),"\n",(0,t.jsxs)(n.p,{children:["\ub3cc\ub824\uc900 \uc5d0\ub7ec\uc785\ub2c8\ub2e4. \uc5d0\ub7ec\uba54\uc2dc\uc9c0\ub97c \uc790\uc138\ud788 \ubcf4\ub2c8\uae4c \uc0dd\uac01\ubcf4\ub2e4 \uce5c\uc808\ud569\ub2c8\ub2e4. \uc800\ucc98\ub7fc \uc601\uc5b4 \ub3c5\ud574\ub825\uc774 \ubd80\uc871\ud55c \uc0ac\ub78c\ub4e4\uc744 \uc704\ud574 \uc124\uba85\ud574\uc8fc\uc790\uba74 ",(0,t.jsx)(n.code,{children:"importActual"})," \uba54\uc11c\ub4dc\ub97c \ud65c\uc6a9\ud558\ub77c\uace0 \ud569\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",metastring:'title="main.test.js"',children:"import { describe, expect, it, vi } from 'vitest';\nimport { callJSONPlaceholder } from './main.js';\n\nvi.mock('./main.js', async () => {\n  const actual = await vi.importActual('./main.js');\n  return {\n    ...actual,\n    async callJSONPlaceholder() {\n      return {\n        userId: 1,\n        id: 1,\n        title: 'delectus aut autem',\n        completed: false,\n      };\n    },\n  };\n});\n\ndescribe('callJSONPlaceholder', () => {\n  it('should work just fine', async () => {\n    const result = await callJSONPlaceholder();\n\n    expect(result).toEqual({\n      userId: 1,\n      id: 1,\n      title: 'delectus aut autem',\n      completed: false,\n    });\n  });\n});\n"})}),"\n",(0,t.jsxs)(n.p,{children:["\uc704\ucc98\ub7fc \uc791\uc131\ud558\ub2c8\uae4c \ud1b5\uacfc\ud569\ub2c8\ub2e4. \ud14c\uc2a4\ud2b8\ub294 \uc678\ubd80 \uc694\uccad\uc744 \uc548\ud569\ub2c8\ub2e4. ",(0,t.jsx)(n.code,{children:"/todo/2"}),"\uc73c\ub85c \ubcc0\uacbd\ud574\ub3c4 \ud14c\uc2a4\ud2b8\ub294 \ub3c5\ub9bd\uc801\uc73c\ub85c \ub3d9\uc791\ud569\ub2c8\ub2e4. \ud14c\uc2a4\ud2b8\uac00 \uc2e4\uc81c \uc678\ubd80 \uc11c\ubc84\ub97c \uc811\uadfc\ud558\ub294 \ud589\uc704\ub97c \uc548\ud569\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(n.h3,{id:"\uc678\ubd80-\ud1b5\uc2e0",children:"\uc678\ubd80 \ud1b5\uc2e0"}),"\n",(0,t.jsx)(n.p,{children:"\uc800\ub294 \ud14c\uc2a4\ud2b8 \ucf54\ub4dc\uac00 \uc678\ubd80 \ud1b5\uc2e0\uc744 \uc2dc\ub3c4\ud558\ub294 \uacbd\ud5d8\uc744 \ud588\uc2b5\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"import axios from 'axios';\n\nexport async function callJSONPlaceholder() {\n  const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');\n  return res.data;\n}\n\ncallJSONPlaceholder().then((res) => console.log(res));\n"})}),"\n",(0,t.jsx)(n.p,{children:"\uc544\uae4c \uc791\uc131\ud55c \ucf54\ub4dc\uc640 \ub3d9\uc77c\ud569\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",metastring:'title="main.test.js"',children:"import { describe, expect, it, vi } from 'vitest';\nimport { callJSONPlaceholder } from './main.js';\n\nvi.mock('axios', async (importOriginal) => {\n  const mod = await importOriginal();\n\n  return {\n    ...mod,\n    get(str) {\n      return {\n        userId: 1,\n        id: 1,\n        title: 'delectus aut autem',\n        completed: false,\n      };\n    },\n  };\n});\n\ndescribe('callJSONPlaceholder', () => {\n  it('should call axios', async () => {\n    const res2 = await callJSONPlaceholder();\n\n    expect(res2).toEqual({\n      userId: 1,\n      id: 1,\n      title: 'delectus aut autem',\n      completed: false,\n    });\n  });\n});\n"})}),"\n",(0,t.jsx)(n.p,{children:"\uc704\ucc98\ub7fc \uc791\uc131\ud558\uba74 \ud14c\uc2a4\ud2b8\ub97c \ud1b5\uacfc\ud569\ub2c8\ub2e4."}),"\n",(0,t.jsxs)(n.p,{children:["\ud558\uc9c0\ub9cc uri\uc758 \uac12 1\uac1c\ub97c \uc62c\ub9ac(",(0,t.jsx)(n.code,{children:"/todos/2"}),"\ub85c \ubcc0\uacbd\ud558)\uba74 \ud14c\uc2a4\ud2b8\ub294 \uc2e4\ud328\ud569\ub2c8\ub2e4. \uc989 \uc774 \ud14c\uc2a4\ud2b8\ub294 \uc2e0\ub8b0\ud560 \uc218 \uc5c6\ub294 \ud14c\uc2a4\ud2b8 \ucf54\ub4dc\uc785\ub2c8\ub2e4. \uc704 \ud14c\uc2a4\ud2b8 \ucf54\ub4dc\ub97c \uc2e0\ub8b0\ud560 \uc218 \uc788\uac8c \uc62c\ubc14\ub978 mocking\uc744 \ud574\uc57c \ud569\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(n.p,{children:"\ub9cc\uc57d\uc5d0 \ud14c\uc2a4\ud2b8 \ucf54\ub4dc\uc5d0 \uc2dc\uac04(\uc608: 400 ms)\uc774 \ucd9c\ub825\ub418\uba74 \uc2e4\uc81c API\ub97c \uc8fc\uace0 \ubc1b\ub294\ub370 \uac78\ub9b0 \uc2dc\uac04\uc744 \ud45c\uc2dc\ud55c \uac83\uc785\ub2c8\ub2e4. E2E \ud14c\uc2a4\ud2b8\uc5d0\uc11c\ub294 \uc2e4\uc81c\ub85c \ud544\uc694\ud558\uc9c0\ub9cc \uc6b0\ub9ac\uc758 \uc758\ub3c4\ub791 \ub2e4\ub974\uac8c \ub3d9\uc791\ud55c \uacbd\uc6b0\uc785\ub2c8\ub2e4."}),"\n",(0,t.jsxs)(n.p,{children:["\ub2e4\ub978 \uc810\uc740 ",(0,t.jsx)(n.code,{children:"importOriginal"}),"\ub97c \ub9e4\uac1c\ubcc0\uc218\ub97c \ud1b5\ud574\uc11c \uc811\uadfc\ud588\ub2e4\ub294 \uc810\uc785\ub2c8\ub2e4. \uc2e4\uc81c \ucf54\ub4dc\ub97c mocking\ud574\uc11c \uc678\ubd80 \uc694\uccad\uc744 \ucc28\ub2e8\ud558\ub824\uba74 ",(0,t.jsx)(n.code,{children:"vi"}),"\uc758 ",(0,t.jsx)(n.code,{children:"importActual"}),"\ub97c \uc0ac\uc6a9\ud558\uae30 \ubc14\ub78d\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(n.h2,{id:"\ub77c\uc774\ube0c\ub7ec\ub9ac-\ucf54\ub4dc-mocking",children:"\ub77c\uc774\ube0c\ub7ec\ub9ac \ucf54\ub4dc mocking"}),"\n",(0,t.jsxs)(n.p,{children:["\ud14c\uc2a4\ud2b8 \ucf54\ub4dc\ub97c \uc791\uc131\ud558\ub294 \ubc29\uc2dd\uc740 \uc0ac\ub78c\ub9c8\ub2e4 \ub2e4\ub985\ub2c8\ub2e4. ",(0,t.jsx)(n.code,{children:"axios"})," \ub77c\uc774\ube0c\ub7ec\ub9ac\ub97c \uc9c1\uc811 \ud638\ucd9c\ud558\ub294 \uc0ac\ub78c\ub4e4\ub3c4 \uc788\uace0 wrapper \ud568\uc218\uc5d0 ",(0,t.jsx)(n.code,{children:"axios"}),"\ub97c \uac10\uc2f8\ub294 \uc0ac\ub78c\ub3c4 \uc788\uc2b5\ub2c8\ub2e4. \uac00\ub054\uc740 wrapper\ub97c \uc2e4\ud5d8\ud574\uc57c \ud558\ub294 \uacbd\uc6b0\ub3c4 \uc788\uc2b5\ub2c8\ub2e4. \ud638\ucd9c\uc790\uc758 \uad00\uc2ec\uc0ac\uc640 \ubb34\uad00\ud558\uac8c \uc694\uccad\uc744 \ucc28\ub2e8\ud574\uc57c \ud558\ub294 \uacbd\uc6b0\ub3c4 \uc874\uc7ac\ud558\uae30 \ub54c\ubb38\uc785\ub2c8\ub2e4. \uc989 \uc694\uccad \ucc28\ub2e8\uc774 \uc131\uacf5\uc801\uc73c\ub85c \ub3d9\uc791\ud558\ub294\uc9c0 \uc720\ud6a8\uc131 \uac80\uc99d\uc744 \ud655\uc778\ud558\uace0\uc790 \ud14c\uc2a4\ud2b8 \ucf54\ub4dc\ub97c \uc791\uc131\ud558\ub294 \uacbd\uc6b0\ub3c4 \uc874\uc7ac\ud569\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(n.p,{children:"\uc774\ub7f0 \uc0c1\ud669\uc5d0\uc11c\ub294 \uacb0\uad6d \ub77c\uc774\ube0c\ub7ec\ub9ac \ucf54\ub4dc\uc758 \ub3d9\uc791\uc744 mocking\ud574\uc57c \ud569\ub2c8\ub2e4."}),"\n",(0,t.jsxs)(n.p,{children:["\uc6b0\ub9ac\ub294 ",(0,t.jsx)(n.code,{children:"axios"}),"\uc758 ",(0,t.jsx)(n.code,{children:"get"})," \uba54\uc11c\ub4dc\ub97c \ud638\ucd9c\ud558\uace0 \uc5b4\ub5a4 \ubb38\uc790\uc5f4\uc744 \ub300\uc785\ud558\uace0 \ubb34\uc2a8 \ubb38\uc790\uc5f4\uc744 \ub300\uc785\ud558\ub4e0 \ubb34\uad00\ud558\uac8c \ub3d9\uc77c\ud55c \uc751\ub2f5\uc744 \ud558\ub3c4\ub85d \ud560 \uac83\uc785\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"import { describe, expect, it, vi } from 'vitest';\nimport { callJSONPlaceholder } from './main.js';\nimport axios from 'axios';\nimport { beforeEach } from 'vitest';\n\nvi.mock('axios');\n\nbeforeEach(() => {\n  axios.get.mockReset();\n\n  axios.get.mockResolvedValue({\n    data: {\n      userId: 1,\n      id: 1,\n      title: 'delectus aut autem',\n      completed: false,\n    },\n  });\n});\n\ndescribe('callJSONPlaceholder', () => {\n  // ... \uc0dd\ub7b5\n  it('should work with axios', async () => {\n    const result = await axios.get(\n      'https://jsonplaceholder.typicode.com/todos/1'\n    );\n\n    expect(result).toEqual({\n      data: {\n        userId: 1,\n        id: 1,\n        title: 'delectus aut autem',\n        completed: false,\n      },\n    });\n  });\n});\n"})}),"\n",(0,t.jsx)(n.p,{children:"\uc774\ub807\uac8c \uc791\uc131\ud558\uba74 \uc81c\uac00 \uc791\uc131\ud588\ub358 \ud568\uc218\ub97c \ub354\uc774\uc0c1 mocking\ud558\uc9c0 \uc54a\uc744 \uc218 \uc788\uac8c \ub429\ub2c8\ub2e4. \ub610 \uae30\uc874 \ucf54\ub4dc\ub3c4 \uadf8\ub0e5 \ud1b5\uacfc\ud569\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.h3,{id:"\uc608\uc678\ucc98\ub9ac",children:"\uc608\uc678\ucc98\ub9ac"}),"\n",(0,t.jsx)(n.p,{children:"\ud558\uc9c0\ub9cc \ubb38\uc81c\uac00 \uc788\uc2b5\ub2c8\ub2e4. \uc0ac\uc2e4 \uc2ec\uac01\ud55c \ubb38\uc81c\ub294 \uc544\ub2cc\ub370 \uc5d0\ub7ec\ucc98\ub9ac \ub97c \uac15\uc81c\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"Vitest caught 1 unhandled error during the test run.\nThis might cause false positive tests. Resolve unhandled errors to make sure your tests are not affected.\n\nTypeError: Cannot read properties of undefined (reading 'data')\n \u276f callJSONPlaceholder main.js:5:14\n      3| export async function callJSONPlaceholder() {\n      4|   const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');\n      5|   return res.data;\n       |              ^\n      6| }\n      7|\n"})}),"\n",(0,t.jsxs)(n.p,{children:["vitest\ub294 \ud2c0\ub838\ub294\ub370 \ub9de\ub2e4\uace0 \ud558\ub294 1\uc885\uc624\ub958(",(0,t.jsx)(n.a,{href:"https://ko.wikipedia.org/wiki/%EA%B1%B0%EC%A7%93_%EC%96%91%EC%84%B1%EA%B3%BC_%EA%B1%B0%EC%A7%93_%EC%9D%8C%EC%84%B1",children:"false positive"}),")\ub97c \ubc94\ud560 \uc218 \uc788\ub2e4\uace0 \uc124\uba85\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc0dd\uac01\ud574\ubcf4\uba74 \ucc38 \uce5c\uc808\ud569\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(n.p,{children:"\uc800\ubcf4\uace0 \uc9c0\uae08 \uc815\uc758\ud55c \uc800\uc758 \ucf54\ub4dc\uc5d0\uc11c \uc608\uc678\ucc98\ub9ac\ud558\ub77c\uace0 \ud14c\uc2a4\ud2b8\ub7ec\ub108\uac00 \uc54c\ub824\uc90d\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"import axios from 'axios';\n\nexport async function callJSONPlaceholder() {\n  try {\n    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');\n    return res.data;\n  } catch (err) {\n    console.log(err);\n    return null;\n  }\n}\n\ncallJSONPlaceholder().then((res) => console.log(res));\n"})}),"\n",(0,t.jsx)(n.p,{children:"\uc774\ub807\uac8c \uc218\uc815\ud558\ub2c8\uae4c \uc5d0\ub7ec\ub294 \uc0ac\ub77c\uc84c\uc2b5\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.h2,{id:"\uc608\uc678-\ud14c\uc2a4\ud2b8\ucf00\uc774\uc2a4",children:"\uc608\uc678 \ud14c\uc2a4\ud2b8\ucf00\uc774\uc2a4"}),"\n",(0,t.jsx)(n.p,{children:"\uc5d0\ubc88\uc5d0\ub294 throw\ub97c mocking\ud574\ubcf4\uaca0\uc2b5\ub2c8\ub2e4. \uc2e4\ud328\ud558\ub294 \ud568\uc218\ub294 \uc5b4\ub5bb\uac8c \ucc98\ub9ac\ud558\ub294\uc9c0 \ud655\uc778\ud558\uaca0\uc2b5\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",metastring:'title="main.test.js"',children:"vi.mock('axios');\n\nbeforeEach(() => {\n  axios.get.mockReset();\n});\n\ndescribe('callJSONPlaceholder', () => {\n  // ... \uc0dd\ub7b5\n  it('should catch Error and return null', async () => {\n    axios.get.mockRejectedValue(new Error('oh Noo!'));\n\n    const result = await callJSONPlaceholder();\n\n    expect(result).toBeNull();\n  });\n});\n"})}),"\n",(0,t.jsxs)(n.p,{children:["\uc774\ubc88\uc5d0\ub294 \uc704 \ucf54\ub4dc\uac00 \ud14c\uc2a4\ud2b8\ub97c \ud1b5\uacfc\ud560 \uac83\uc785\ub2c8\ub2e4. ",(0,t.jsx)(n.code,{children:"mockRejectedValue"}),"\uc774 \uc5d0\ub7ec\ub97c \ub358\uc9c0\uac8c \ub9cc\ub4ed\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(n.p,{children:"\ud558\uc9c0\ub9cc \ubb38\uc81c\uac00 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"TypeError: Cannot read properties of undefined (reading 'data')\n    at callJSONPlaceholder\nnull\n"})}),"\n",(0,t.jsx)(n.p,{children:"\uc704\uc640 \uac19\uc740 \uc5d0\ub7ec\ub97c \ucd9c\ub825\ud569\ub2c8\ub2e4. \uadf8\ub9ac\uace0 \uc5ec\ub7ec\uac1c\uc758 \ud30c\uc77c \ub514\ub809\ud1a0\ub9ac\ub97c \ud45c\uc2dc\ud569\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.p,{children:"\uc800\uc758 \uc2e4\uc218\uc785\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"import axios from 'axios';\n\nexport async function callJSONPlaceholder() {\n  try {\n    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');\n    return res.data;\n  } catch (err) {\n    return null;\n  }\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["\uc2e4\ud589 \uc548\ud558\uac8c ",(0,t.jsx)(n.code,{children:"console.log"}),"\ub97c \ubaa8\ub450 \uc9c0\uc6b0\uba74 \ub418\ub294 \uac83\uc774\uc5c8\uc2b5\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(n.h3,{id:"dangerouslyignoreunhandlederrors\uc73c\ub85c-catch-\uc548\ud558\uae30",children:"dangerouslyIgnoreUnhandledErrors\uc73c\ub85c catch \uc548\ud558\uae30"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"--dangerouslyIgnoreUnhandledErrors"})," \ud50c\ub798\uae30\ub97c CLI\uc5d0 \uc124\uc815\ud558\uba74 unhandled rejection \uacbd\uace0\ub97c \uc81c\uac70\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. catch\ub97c \uc548 \ud588\ub2e4\uace0 \uc8fc\ub294 \uacbd\uace0\uc778\ub370 \uc124\uc815\uc774 \ub2e4\ud589\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(n.p,{children:"\ud638\ucd9c\uc790\uac00 \uc54c\uc544\uc11c catch \ud558\ub3c4\ub85d \ucf54\ub4dc\ub97c \uc791\uc131\ud558\ub294 \ucf54\ub4dc\ubca0\uc774\uc2a4\ub3c4 \ub9ce\uc2b5\ub2c8\ub2e4. react-query\ub97c \uc0ac\uc6a9\ud558\uace0 \uc788\uc73c\uba74 hook\uc774 catch\ub97c \uc81c\uacf5\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"import axios from 'axios';\n\nexport async function callJSONPlaceholder() {\n  const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');\n  return res.data;\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:"\uc704 \ucc98\ub7fc \uc791\uc131\ud574\ub3c4 \uad1c\ucc2e\uac8c \ub9cc\ub4e4\ub824\uba74 CLI\ub97c \uc218\uc815\ud558\uba74 \ub429\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"vitest --dangerouslyIgnoreUnhandledErrors\n"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"https://vitest.dev/guide/cli.html",children:"\uacf5\uc2dd \ubb38\uc11c"}),"\ub97c \ud65c\uc6a9\ud558\uba74 \uc704\ucc98\ub7fc \uc791\uc131\ud558\uba74 \ub429\ub2c8\ub2e4."]}),"\n",(0,t.jsxs)(n.p,{children:["\ud558\uc9c0\ub9cc \ub354 \uad6c\uccb4\uc801\uc73c\ub85c \ub2e4\uc74c\ucc98\ub7fc ",(0,t.jsx)(n.code,{children:"package.json"}),"\uc5d0 \uc124\uc815\ud558\uba74 \ub429\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title="package.json"',children:'{\n  "dependencies": {\n    "axios": "^1.6.1",\n    "vitest": "^0.34.6"\n  },\n  "scripts": {\n    "test": "vitest --dangerouslyIgnoreUnhandledErrors"\n  },\n  "type": "module"\n}\n'})}),"\n",(0,t.jsxs)(n.p,{children:["\uc704\ucc98\ub7fc \uc124\uc815\ud558\uba74 \ub354\uc774\uc0c1 ",(0,t.jsx)(n.code,{children:"catch"})," \uc548\ud588\ub2e4\uace0 \ud654\ub0b4\uc9c0\ub294 \uc54a\uc2b5\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(n.h2,{id:"\uacb0\ub860",children:"\uacb0\ub860"}),"\n",(0,t.jsx)(n.p,{children:"\ub77c\uc774\ube0c\ub7ec\ub9ac\ub97c mocking\ud560\uc9c0 \ubcf8\uc778 \ucf54\ub4dc\ub97c mocking\ud560\uc9c0 \ucf54\ub4dc\uc758 \uad00\uc2ec\uc0ac \ubb38\uc81c\ub85c \uc0dd\uac01\ub429\ub2c8\ub2e4. give\uc5d0 mock\ub97c \uc124\uc815\ud558\uace0 \uc5b4\ub5bb\uac8c \ucc98\ub9ac\ud558\ub294 \ud14c\uc2a4\ud2b8 \ucf54\ub4dc\ub85c \uc124\uc815\ud558\uba74 \ub420 \uac83\uac19\uc2b5\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.p,{children:"\ub9cc\uc57d\uc5d0 util \ud568\uc218\uac00 \ub2e4\ub978 \ub77c\uc774\ube0c\ub7ec\ub9ac\uc5d0 \uc758\uc874 \ud558\ub294 \uacbd\uc6b0\uc5d0\ub294 \ub77c\uc774\ube0c\ub7ec\ub9ac mock\uc73c\ub85c \uac80\uc99d\ud574\ub294 \uac83\uc774 \uc801\uc808\ud569\ub2c8\ub2e4."})]})}function h(e={}){const{wrapper:n}={...(0,c.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>l});var t=s(67294);const c={},i=t.createContext(c);function l(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:l(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);