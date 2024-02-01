"use strict";(self.webpackChunkarch_spatula_github_io=self.webpackChunkarch_spatula_github_io||[]).push([[73208],{27379:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>h,frontMatter:()=>s,metadata:()=>r,toc:()=>l});var o=t(85893),i=t(11151);const s={title:"API \ud1b5\uc2e0\uacfc token mocking",authors:["arch-spatula"],tags:["testing","API","mocking","token"],description:"API \ud1b5\uc2e0\uc5d0 \ub300\ud574\uc11c token \ub85c\uc9c1\uc744 \ud3ec\ud568\ud574 mocking\ud568",toc_max_heading_level:6},c="API \ud1b5\uc2e0\uacfc token mocking",r={permalink:"/blog/2023/09/01/",editUrl:"https://github.com/arch-spatula/arch-spatula.github.io/blob/dev/blog/2023-09-01.md",source:"@site/blog/2023-09-01.md",title:"API \ud1b5\uc2e0\uacfc token mocking",description:"API \ud1b5\uc2e0\uc5d0 \ub300\ud574\uc11c token \ub85c\uc9c1\uc744 \ud3ec\ud568\ud574 mocking\ud568",date:"2023-09-01T00:00:00.000Z",formattedDate:"2023\ub144 9\uc6d4 1\uc77c",tags:[{label:"testing",permalink:"/blog/tags/testing"},{label:"API",permalink:"/blog/tags/api"},{label:"mocking",permalink:"/blog/tags/mocking"},{label:"token",permalink:"/blog/tags/token"}],readingTime:4.78,hasTruncateMarker:!0,authors:[{name:"arch-spatula",title:"Cook-Book \ub9ce\uc774 \ub9cc\ub4ed\ub2c8\ub2e4",url:"https://github.com/arch-spatula",imageURL:"https://github.com/arch-spatula.png",key:"arch-spatula"}],frontMatter:{title:"API \ud1b5\uc2e0\uacfc token mocking",authors:["arch-spatula"],tags:["testing","API","mocking","token"],description:"API \ud1b5\uc2e0\uc5d0 \ub300\ud574\uc11c token \ub85c\uc9c1\uc744 \ud3ec\ud568\ud574 mocking\ud568",toc_max_heading_level:6},unlisted:!1,prevItem:{title:"\uc774\uc81c\ub294 TypeScript \uc2dc\ub300\uc5d0\uc11c JSDoc \uc2dc\ub300\ub85c...",permalink:"/blog/2023/09/10/dhh"},nextItem:{title:"MSW \ubc88\ub4e4 \uc0ac\uc774\uc988 2\ubc30 \uc774\ubca4\ud2b8",permalink:"/blog/2023/07/31/"}},a={authorsImageUrls:[void 0]},l=[{value:"MSW\uc640 axios interceptor",id:"msw\uc640-axios-interceptor",level:2},{value:"\ubb38\uc81c: \ubaa8\uc758\ub85c \ubcf4\ub0b4\ub294 \uc694\uccad\uc744 \ucc28\ub2e8\ud558\uc9c0 \uc54a\uac8c \ubaa8\uc758\ub85c \ub9cc\ub4e4 \ud1a0\ud070\uc774 \ud544\uc694",id:"\ubb38\uc81c-\ubaa8\uc758\ub85c-\ubcf4\ub0b4\ub294-\uc694\uccad\uc744-\ucc28\ub2e8\ud558\uc9c0-\uc54a\uac8c-\ubaa8\uc758\ub85c-\ub9cc\ub4e4-\ud1a0\ud070\uc774-\ud544\uc694",level:3},{value:"\uc2dc\ub3c4: \uac80\uc0c9 - \ub85c\uadf8\uc778 mocking - \ud558\ub4dc \ucf54\ub529",id:"\uc2dc\ub3c4-\uac80\uc0c9---\ub85c\uadf8\uc778-mocking---\ud558\ub4dc-\ucf54\ub529",level:3},{value:"\uac80\uc0c9",id:"\uac80\uc0c9",level:4},{value:"\ub85c\uadf8\uc778 mocking",id:"\ub85c\uadf8\uc778-mocking",level:4},{value:"\ud574\uacb0: \ud14c\uc2a4\ud2b8 \ud658\uacbd\ub3c4 \uadf8\ub0e5 <code>localStorage.setItem</code>",id:"\ud574\uacb0-\ud14c\uc2a4\ud2b8-\ud658\uacbd\ub3c4-\uadf8\ub0e5-localstoragesetitem",level:3},{value:"\ud559\uc2b5: node\uc5d0\uc11c\ub3c4 mocking\ud560 \ub54c\ub294 webStorage\ub97c \uc811\uadfc\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",id:"\ud559\uc2b5-node\uc5d0\uc11c\ub3c4-mocking\ud560-\ub54c\ub294-webstorage\ub97c-\uc811\uadfc\ud560-\uc218-\uc788\uc2b5\ub2c8\ub2e4",level:3},{value:"\ubd80\ub85d: \ubbf8\uc81c \uc0ac\uac74 - nock \ud1b5\uc2e0 \ud14c\uc2a4\ud2b8 \uc2dc\ub3c4",id:"\ubd80\ub85d-\ubbf8\uc81c-\uc0ac\uac74---nock-\ud1b5\uc2e0-\ud14c\uc2a4\ud2b8-\uc2dc\ub3c4",level:2},{value:"\ubb38\uc81c: nock\uc5d0\uc11c MSW\ub85c \uc804\ud658 \uc2dc\ub3c4",id:"\ubb38\uc81c-nock\uc5d0\uc11c-msw\ub85c-\uc804\ud658-\uc2dc\ub3c4",level:3}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"\ud1b5\uc2e0\uc5d0 token\uc774 \uad00\uc5ec\ud560 \ub54c \ucde8\ud560 \uc218 \uc788\ub294 \uc804\ub7b5\uc774 \uc788\uc2b5\ub2c8\ub2e4. interceptor\uac00 token \uac80\uc99d\uc744 \ud560 \ub54c \ucc98\ub9ac\ud574\ubcfc \uc218 \uc788\ub294 \ubb38\uc81c \ud574\uacb0 \ubc29\uc2dd\uc785\ub2c8\ub2e4."}),"\n",(0,o.jsx)(n.p,{children:"\uc694\uc57d\ud558\uba74 node\ud658\uacbd\uc5d0\uc11c\ub3c4 token\uc744 \uc800\uc7a5\ud569\ub2c8\ub2e4."}),"\n",(0,o.jsx)(n.h2,{id:"msw\uc640-axios-interceptor",children:"MSW\uc640 axios interceptor"}),"\n",(0,o.jsx)(n.h3,{id:"\ubb38\uc81c-\ubaa8\uc758\ub85c-\ubcf4\ub0b4\ub294-\uc694\uccad\uc744-\ucc28\ub2e8\ud558\uc9c0-\uc54a\uac8c-\ubaa8\uc758\ub85c-\ub9cc\ub4e4-\ud1a0\ud070\uc774-\ud544\uc694",children:"\ubb38\uc81c: \ubaa8\uc758\ub85c \ubcf4\ub0b4\ub294 \uc694\uccad\uc744 \ucc28\ub2e8\ud558\uc9c0 \uc54a\uac8c \ubaa8\uc758\ub85c \ub9cc\ub4e4 \ud1a0\ud070\uc774 \ud544\uc694"}),"\n",(0,o.jsx)(n.p,{children:"interceptor\uac00 \ud1a0\ud070\uc774 \uc5c6\uc73c\uba74 \uc694\uccad\uc744 \ucc28\ub2e8\ud569\ub2c8\ub2e4. \ud558\uc9c0\ub9cc \ubaa8\uc758\ub85c \ubcf4\ub0b4\ub294 \uc694\uccad\uc744 \ucc28\ub2e8\ud558\uc9c0 \uc54a\uac8c \ubaa8\uc758\ub85c \ub9cc\ub4e4 \ud1a0\ud070\uc774 \ud544\uc694\ud588\uc2b5\ub2c8\ub2e4."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"const authClient: AxiosInstance = axios.create({\n  baseURL: BASE_URL,\n  headers: {\n    'Content-Type': 'application/json',\n  },\n});\n\naxiosClient.interceptors.request.use(\n  (config) => {\n    // highlight-start\n    const token = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);\n\n    const configCopy = { ...config };\n    if (token) configCopy.headers.Authorization = `Bearer ${token}`;\n    else throw new Error('token\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.');\n    // highlight-end\n\n    return configCopy;\n  },\n  (error) => Promise.reject(error)\n);\n"})}),"\n",(0,o.jsx)(n.p,{children:"\ud074\ub77c\uc774\uc5b8\ud2b8 \uc778\uc2a4\ud134\uc2a4\uac00 \uc774\ub807\uac8c \uc0dd\uacbc\uc2b5\ub2c8\ub2e4."}),"\n",(0,o.jsx)(n.p,{children:"\ub098\uc911\uc5d0 \uc0dd\uac01\ub09c \uac83\uc774\uc9c0\ub9cc \ub9cc\uc57d\uc5d0 node \uc11c\ubc84\uc5d0\uc11c storage\uc811\uadfc\uc744 \ucc28\ub2e8\ud588\uc73c\uba74 \uc5ec\uae30\uc11c\ubd80\ud130 \uc5d0\ub7ec\uac00 \ubc1c\uc0dd\ud588\uc5b4\uc57c \ud569\ub2c8\ub2e4."}),"\n",(0,o.jsx)(n.h3,{id:"\uc2dc\ub3c4-\uac80\uc0c9---\ub85c\uadf8\uc778-mocking---\ud558\ub4dc-\ucf54\ub529",children:"\uc2dc\ub3c4: \uac80\uc0c9 - \ub85c\uadf8\uc778 mocking - \ud558\ub4dc \ucf54\ub529"}),"\n",(0,o.jsx)(n.h4,{id:"\uac80\uc0c9",children:"\uac80\uc0c9"}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.a,{href:"https://stackoverflow.com/questions/71970780/how-to-mock-data-response-using-msw-and-axios-create-instance",children:"How to mock data response using msw and axios.create() instance"})}),"\n",(0,o.jsx)(n.p,{children:"\uc800\ub791 \ube44\uc2b7\ud55c \uace0\ubbfc\uc744 \ud558\ub294 \uc0ac\ub78c\uc744 \ubc1c\uacac\ud588\uc2b5\ub2c8\ub2e4."}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.a,{href:"https://github.com/mswjs/msw/discussions/549",children:"Acquiring access token crashes test."})}),"\n",(0,o.jsx)(n.p,{children:"\uc704\uc5d0 MSW\uc5d0 \uc9c8\ubb38\ud55c \uc0ac\ub78c\ub3c4 \uc800\ub791 \ube44\uc2b7\ud55c \uace0\ubbfc\uc744 \ud55c \uac83 \uac19\uc2b5\ub2c8\ub2e4."}),"\n",(0,o.jsx)(n.p,{children:"axios\ub791 \ub9ce\uc774 \uc0ac\uc6a9\ud558\ub294\ub370 \uc608\uc2dc\ub97c \uacf5\uc2dd \ubb38\uc11c\uc5d0 \ucd94\uac00\ud558\ub294 \uac83\ub3c4 \uc88b\uc544 \ubcf4\uc785\ub2c8\ub2e4."}),"\n",(0,o.jsx)(n.h4,{id:"\ub85c\uadf8\uc778-mocking",children:"\ub85c\uadf8\uc778 mocking"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"describe('Card Clint', () => {\n  beforeAll(async () => {\n    await signInAPI({\n      email: 'username@email.com',\n      password: '12345678',\n    });\n  });\n\n  afterAll(() => {\n    localStorage.clear();\n  });\n});\n"})}),"\n",(0,o.jsx)(n.p,{children:"\ub85c\uadf8\uc778 \uc694\uccad\uc744 \ud558\uba74 \uc751\ub2f5\uc744 \ubc1b\uc790\ub9c8\ub2e4 interceptor\uac00 \ud1a0\ud070\uc744 \uc800\uc7a5\ud560 \uac83\uc774\ub77c\ub294 \uc0dd\uac01\uc774 \ub4e4\uc5c8\uc2b5\ub2c8\ub2e4."}),"\n",(0,o.jsx)(n.p,{children:"\ud558\uc9c0\ub9cc \ub354 \uc0dd\uac01\ud574\ubcf4\uba74 \uadf8\ub0e5 \uc9c1\uc811 \uc2ec\uc73c\uba74 \ub418\uaca0\ub2e4\ub294 \uc0dd\uac01\uc774 \ub4e4\uc5c8\uc2b5\ub2c8\ub2e4."}),"\n",(0,o.jsxs)(n.h3,{id:"\ud574\uacb0-\ud14c\uc2a4\ud2b8-\ud658\uacbd\ub3c4-\uadf8\ub0e5-localstoragesetitem",children:["\ud574\uacb0: \ud14c\uc2a4\ud2b8 \ud658\uacbd\ub3c4 \uadf8\ub0e5 ",(0,o.jsx)(n.code,{children:"localStorage.setItem"})]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"describe('Card Clint', () => {\n  // highlight-start\n  beforeAll(() => {\n    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, 'token');\n  });\n\n  afterAll(() => {\n    localStorage.clear();\n  });\n  // highlight-end\n\n  it('should create a card', async () => {\n    const newCard = {\n      question: '',\n      answer: '',\n      submitDate: new Date(),\n      stackCount: 0,\n    };\n\n    const res = await createCardsAPI(newCard);\n\n    expect(res).toBe('1234asdf');\n  });\n});\n"})}),"\n",(0,o.jsx)(n.p,{children:"\ubaa8\uc758\ub85c \ud1a0\ud070\uc744 \uc2ec\uc5c8\uc2b5\ub2c8\ub2e4. \uadf8\ub7ec\uba74 \ud1a0\ud070\uc758 \uc874\uc7ac\ub97c \ud655\uc778\ud558\uace0 \uc694\uccad\uc744 \ucc28\ub2e8\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4."}),"\n",(0,o.jsx)(n.p,{children:"\uc774\ub807\uac8c \uc0dd\uac01\ud574\ubcf4\uba74 \ub610 \ucde8\uc57d\uc810\uc785\ub2c8\ub2e4. \ud14c\uc2a4\ud2b8 \ucf00\uc774\uc2a4\ub85c \ud655\uc7a5\ud574\uc57c \ud558\ub294 \uc694\uad6c\uc0ac\ud56d\uc774 \uc0dd\uac01\ub098\ub2e4\ub2c8..."}),"\n",(0,o.jsx)(n.h3,{id:"\ud559\uc2b5-node\uc5d0\uc11c\ub3c4-mocking\ud560-\ub54c\ub294-webstorage\ub97c-\uc811\uadfc\ud560-\uc218-\uc788\uc2b5\ub2c8\ub2e4",children:"\ud559\uc2b5: node\uc5d0\uc11c\ub3c4 mocking\ud560 \ub54c\ub294 webStorage\ub97c \uc811\uadfc\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,o.jsxs)(n.p,{children:["\uc6d0\ub798 ",(0,o.jsx)(n.code,{children:"beforeAll"}),", ",(0,o.jsx)(n.code,{children:"afterAll"}),"\ub294 node\uc5d0\uc11c \uc2e4\ud589\ud574\uc11c ",(0,o.jsx)(n.code,{children:"localStorage"}),"\ub97c \uc811\uadfc\ud558\uba74 \uc5d0\ub7ec\uac00 \ubc1c\uc0dd\ud560 \uac83\uc774\ub77c\uace0 \uc0dd\uac01\ud588\uc2b5\ub2c8\ub2e4. \ube0c\ub77c\uc6b0\uc800\uc5d0\uc11c \uc81c\uacf5\ud558\ub294 API\ub97c node \uc11c\ubc84\ud658\uacbd\uc5d0\uc11c\ub294 \uc811\uadfc\uc774 \ubd88\uac00\ub2a5\ud558\ub2e4\uace0 \uc0dd\uac01\ud558\uace0 \uc788\uc5c8\uc2b5\ub2c8\ub2e4."]}),"\n",(0,o.jsx)(n.p,{children:"\ud3b8\uacac\uc744 \ub354 \ubc84\ub9b4 \ud544\uc694\uac00 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,o.jsx)(n.p,{children:"\ub610 node \ud658\uacbd\uc744 \ub354 \uacf5\ubd80\ud560 \ud544\uc694\uac00 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,o.jsx)(n.h2,{id:"\ubd80\ub85d-\ubbf8\uc81c-\uc0ac\uac74---nock-\ud1b5\uc2e0-\ud14c\uc2a4\ud2b8-\uc2dc\ub3c4",children:"\ubd80\ub85d: \ubbf8\uc81c \uc0ac\uac74 - nock \ud1b5\uc2e0 \ud14c\uc2a4\ud2b8 \uc2dc\ub3c4"}),"\n",(0,o.jsx)(n.h3,{id:"\ubb38\uc81c-nock\uc5d0\uc11c-msw\ub85c-\uc804\ud658-\uc2dc\ub3c4",children:"\ubb38\uc81c: nock\uc5d0\uc11c MSW\ub85c \uc804\ud658 \uc2dc\ub3c4"}),"\n",(0,o.jsx)(n.p,{children:"\uaddc\ubaa8\uc791\uace0 \ud504\ub85c\ud1a0\ud0c0\uc785 \uc131\uaca9\uc774 \uac15\ud55c \ud504\ub85c\uc81d\ud2b8\ub294 \ub2e8\uc704\ud14c\uc2a4\ud2b8 \ub2e8\uc704\ub85c API mocking\ud558\ub294 \uac83\uc774 \uc801\uc808\ud558\ub2e4\uace0 \ubd24\uc2b5\ub2c8\ub2e4. MSW\ucc98\ub7fc \ubc31\uc5d4\ub4dc \uc804\uccb4\ub97c Mocking\ud558\uba74 \ucf54\ub4dc \ubfd0\ub9cc\uc544\ub2c8\ub77c \ub85c\uc9c1 \uacb0\ud569\ub3c4\uac00 \ub192\uc544\uc9c8 \uac83\uc774\ub77c\ub294 \uc0dd\uac01\uc774 \ub4e4\uc5c8\uc2b5\ub2c8\ub2e4."}),"\n",(0,o.jsx)(n.p,{children:"\ub3c5\ub9bd\uc801\uc778 \ub2e8\uc704\ub85c \ucabc\uac1c\ub450\uba74 \ud14c\uc2a4\ud2b8\ucf54\ub4dc\ub97c \uc791\uc131\ud560 \ub54c\ub3c4 \ub3c5\ub9bd\uc801\uc774\ub77c \uc218\uc6d4\ud560 \uac83\uc774\ub77c\ub294 \uc0dd\uac01\uc774 \ub4e4\uc5c8\uc2b5\ub2c8\ub2e4."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sh",children:"yarn add -D nock\n"})}),"\n",(0,o.jsx)(n.p,{children:"\uc124\uce58\uba85\ub839\uc744 \ud588\uc2b5\ub2c8\ub2e4."}),"\n",(0,o.jsx)(n.p,{children:"vitest\ub97c \ud14c\uc2a4\ud2b8 \ub7ec\ub108\ub85c \ud65c\uc6a9\ud558\uace0 \uc788\uc5c8\uc2b5\ub2c8\ub2e4."}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.a,{href:"https://vitest.dev/guide/mocking.html#requests",children:"request mocking - vitest \uacf5\uc2dd \ubb38\uc11c "})}),"\n",(0,o.jsx)(n.p,{children:"MSW \uc774\uc678\uc5d0\ub294 \ud1b5\uc2e0\uc744 Mocking\ud558\uae30 \uc5b4\ub824\uc6cc \ubcf4\uc785\ub2c8\ub2e4."}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.a,{href:"https://github.com/vitest-dev/vitest/issues/3624",children:"timeout error when testing fetch with nock - vitest github issue"})}),"\n",(0,o.jsx)(n.p,{children:"\ud558\uc9c0\ub9cc \ud14c\uc2a4\ud2b8\uac00 \uc815\uc0c1\uc801\uc73c\ub85c \ub3d9\uc791\ud558\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4."})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>r,a:()=>c});var o=t(67294);const i={},s=o.createContext(i);function c(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);