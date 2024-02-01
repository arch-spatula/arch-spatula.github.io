"use strict";(self.webpackChunkarch_spatula_github_io=self.webpackChunkarch_spatula_github_io||[]).push([[92384],{41879:(n,e,r)=>{r.r(e),r.d(e,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>a});var s=r(85893),t=r(11151);const l={sidebar_position:7,description:"\uadf8\ub9ac\ub514",tags:["\uadf8\ub9ac\ub514","\uc54c\uace0\ub9ac\uc998","\ubb38\uc81c \uc720\ud615"]},i="\uadf8\ub9ac\ub514",o={id:"algorithms-and-data-structures/greedy",title:"\uadf8\ub9ac\ub514",description:"\uadf8\ub9ac\ub514",source:"@site/diy-cs/algorithms-and-data-structures/greedy.md",sourceDirName:"algorithms-and-data-structures",slug:"/algorithms-and-data-structures/greedy",permalink:"/diy-cs/algorithms-and-data-structures/greedy",draft:!1,unlisted:!1,tags:[{label:"\uadf8\ub9ac\ub514",permalink:"/diy-cs/tags/\uadf8\ub9ac\ub514"},{label:"\uc54c\uace0\ub9ac\uc998",permalink:"/diy-cs/tags/\uc54c\uace0\ub9ac\uc998"},{label:"\ubb38\uc81c \uc720\ud615",permalink:"/diy-cs/tags/\ubb38\uc81c-\uc720\ud615"}],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7,description:"\uadf8\ub9ac\ub514",tags:["\uadf8\ub9ac\ub514","\uc54c\uace0\ub9ac\uc998","\ubb38\uc81c \uc720\ud615"]},sidebar:"tutorialSidebar",previous:{title:"\uad6c\ud604",permalink:"/diy-cs/algorithms-and-data-structures/implementation"},next:{title:"\ud574\uc2dc",permalink:"/diy-cs/algorithms-and-data-structures/hash"}},c={},a=[{value:"\uc124\uba85",id:"\uc124\uba85",level:2},{value:"\ubc30\ub0ad \ubb38\uc81c",id:"\ubc30\ub0ad-\ubb38\uc81c",level:3},{value:"\ub450 \uac1c \ubf51\uc544\uc11c \ub354\ud558\uae30",id:"\ub450-\uac1c-\ubf51\uc544\uc11c-\ub354\ud558\uae30",level:2},{value:"\uad6c\uba85\ubcf4\ud2b8",id:"\uad6c\uba85\ubcf4\ud2b8",level:2},{value:"\uade4 \uace0\ub974\uae30",id:"\uade4-\uace0\ub974\uae30",level:2},{value:"2. \ud480\uc774 \uc804 \uacc4\ud68d\uacfc \uc0dd\uac01",id:"2-\ud480\uc774-\uc804-\uacc4\ud68d\uacfc-\uc0dd\uac01",level:3},{value:"3. \ud480\uc774",id:"3-\ud480\uc774",level:3},{value:"4. \ud480\uc774\ud558\uba74\uc11c \uace0\ubbfc\ud588\ub358 \uc810",id:"4-\ud480\uc774\ud558\uba74\uc11c-\uace0\ubbfc\ud588\ub358-\uc810",level:3},{value:"5. \ubb38\uc81c\ub97c \ud480\uace0 \uc54c\uac8c\ub41c \uac1c\ub150 \ubc0f \uc18c\uac10",id:"5-\ubb38\uc81c\ub97c-\ud480\uace0-\uc54c\uac8c\ub41c-\uac1c\ub150-\ubc0f-\uc18c\uac10",level:3},{value:"\uacfc\uc77c \uc7a5\uc218",id:"\uacfc\uc77c-\uc7a5\uc218",level:2}];function d(n){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...n.components},{Details:r}=e;return r||function(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h1,{id:"\uadf8\ub9ac\ub514",children:"\uadf8\ub9ac\ub514"}),"\n",(0,s.jsx)(e.p,{children:"\uc790\uc8fc\ubcf4\ub294 \ubb38\uc81c\uc720\ud615\uc774\uace0 \ub3d9\uc2dc\uc5d0 \uc54c\uace0\ub9ac\uc998\uc785\ub2c8\ub2e4."}),"\n",(0,s.jsx)(e.p,{children:"\uadf8\ub9ac\ub514 \uc54c\uace0\ub9ac\uc998\uc744 \ub2e4\ub8e8\ub294 \ubc29\ubc95\uc785\ub2c8\ub2e4."}),"\n",(0,s.jsx)(e.h2,{id:"\uc124\uba85",children:"\uc124\uba85"}),"\n",(0,s.jsxs)(e.p,{children:["\ucc38\uace0. \ubd80\ubd84 \ucd5c\uc801\ud654\ub97c \uc704\ud574\uc11c ",(0,s.jsx)(e.strong,{children:"\uc815\ub82c"}),"\uc744 \ud65c\uc6a9\ud558\ub294 \uacbd\uc6b0\uac00 \ub9ce\ub2e4\ub294 \uac83\uc744 \ubc1c\uacac\ud588\uc2b5\ub2c8\ub2e4."]}),"\n",(0,s.jsx)(e.p,{children:"\uadf8\ub9ac\ub514 \uc54c\uace0\ub9ac\uc998\uc740 \ub9e4 \uc21c\uac04\ub9c8\ub2e4 \ucd5c\uc801\uc758 \uc120\ud0dd\uc744 \ud558\ub294 \uc54c\uace0\ub9ac\uc998\uc73c\ub85c, \ud604\uc7ac \uc0c1\ud669\uc5d0\uc11c \uac00\uc7a5 \uc88b\uc544 \ubcf4\uc774\ub294 \uc120\ud0dd\uc744 \uacc4\uc18d\ud574\uc11c \uc218\ud589\ud558\uc5ec \ucd5c\uc885\uc801\uc73c\ub85c \uc804\uccb4\uc801\uc73c\ub85c \ucd5c\uc801\uc758 \uacb0\uacfc\ub97c \uc5bb\ub294 \uac83\uc744 \ubaa9\ud45c\ub85c \ud569\ub2c8\ub2e4. \uc774 \ub54c\ubb38\uc5d0 \uadf8\ub9ac\ub514 \uc54c\uace0\ub9ac\uc998\uc740 \ud56d\uc0c1 \ucd5c\uc801\ud574\ub97c \ubcf4\uc7a5\ud558\uc9c0\ub294 \uc54a\uc9c0\ub9cc, \ub9ce\uc740 \ubb38\uc81c\uc5d0\uc11c \ud6a8\uacfc\uc801\uc778 \ud574\ubc95\uc744 \uc81c\uacf5\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,s.jsx)(e.p,{children:"\uc77c\ubc18\uc801\uc73c\ub85c \uadf8\ub9ac\ub514 \uc54c\uace0\ub9ac\uc998\uc744 \uc0ac\uc6a9\ud574 \ubb38\uc81c\ub97c \ud478\ub294 \ub2e8\uacc4\ub294 \ub2e4\uc74c\uacfc \uac19\uc2b5\ub2c8\ub2e4:"}),"\n",(0,s.jsxs)(e.ol,{children:["\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.strong,{children:"\ubb38\uc81c \uc774\ud574:"})," \uba3c\uc800 \ubb38\uc81c\ub97c \uc815\ud655\ud788 \uc774\ud574\ud558\uace0 \ud544\uc694\ud55c \uc870\uac74, \uc81c\uc57d, \ubaa9\ud45c \ub4f1\uc744 \ubd84\uc11d\ud569\ub2c8\ub2e4. \ubb38\uc81c\uc758 \uc131\uaca9\uacfc \uc694\uad6c\uc0ac\ud56d\uc744 \ud30c\uc545\ud558\ub294 \uac83\uc774 \uc911\uc694\ud569\ub2c8\ub2e4."]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.strong,{children:"\ud0d0\uc695\uc801 \uc120\ud0dd:"})," \uac01 \ub2e8\uacc4\uc5d0\uc11c \uac00\uc7a5 \uc88b\uc544 \ubcf4\uc774\ub294 \uc120\ud0dd\uc744 \uc218\ud589\ud569\ub2c8\ub2e4. \uc774 \uc120\ud0dd\uc740 \ud604\uc7ac \uc0c1\ud669\uc5d0\uc11c \ucd5c\uc801\uc778 \uac83\ucc98\ub7fc \ubcf4\uc774\ub294 \uc120\ud0dd\uc785\ub2c8\ub2e4."]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.strong,{children:"\uc720\ud6a8\uc131 \uac80\uc0ac:"})," \ud0d0\uc695\uc801 \uc120\ud0dd\uc744 \ud55c \ud6c4\uc5d0\ub294 \ud574\ub2f9 \uc120\ud0dd\uc774 \ubb38\uc81c\uc758 \uc81c\uc57d\uacfc \uc870\uac74\uc744 \ub9cc\uc871\ud558\ub294\uc9c0 \uac80\uc0ac\ud569\ub2c8\ub2e4. \uc120\ud0dd\uc774 \uc720\ud6a8\ud558\uc9c0 \uc54a\ub2e4\uba74 \ub2e4\ub978 \uc120\ud0dd\uc744 \uace0\ub824\ud574\uc57c \ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.strong,{children:"\ud574 \uc120\ud0dd\uc758 \ubc18\ubcf5:"})," 2\uc640 3\ub2e8\uacc4\ub97c \ubc18\ubcf5\ud558\uc5ec \uc804\uccb4 \ubb38\uc81c\ub97c \ud574\uacb0\ud560 \ub54c\uae4c\uc9c0 \uc9c4\ud589\ud569\ub2c8\ub2e4. \uac01 \ub2e8\uacc4\uc5d0\uc11c\ub294 \ucd5c\uc801\uc758 \uc120\ud0dd\uc744 \uacc4\uc18d\ud574 \ub098\uac00\ub294 \uac83\uc774 \ubaa9\ud45c\uc785\ub2c8\ub2e4."]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.strong,{children:"\ud574 \uac80\uc99d:"})," \ubb38\uc81c\ub97c \ud574\uacb0\ud55c \uacb0\uacfc\uac00 \uc815\ub9d0\ub85c \ucd5c\uc801\uc758 \ud574\uc778\uc9c0 \ud655\uc778\ud558\uace0, \ud544\uc694\ud558\ub2e4\uba74 \ucd94\uac00\uc801\uc778 \uac80\uc99d\uc744 \uc218\ud589\ud569\ub2c8\ub2e4."]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.strong,{children:"\uc2dc\uac04 \ubcf5\uc7a1\ub3c4 \ubd84\uc11d:"})," \ubb38\uc81c\uc758 \ud06c\uae30\uc5d0 \ub530\ub978 \uadf8\ub9ac\ub514 \uc54c\uace0\ub9ac\uc998\uc758 \uc2dc\uac04 \ubcf5\uc7a1\ub3c4\ub97c \ubd84\uc11d\ud558\uace0 \ud3c9\uac00\ud569\ub2c8\ub2e4."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.p,{children:"\uadf8\ub9ac\ub514 \uc54c\uace0\ub9ac\uc998\uc740 \uc8fc\ub85c \ucd5c\uc801\ud654 \ubb38\uc81c\uc5d0\uc11c \uc0ac\uc6a9\ub418\uba70, \ud0d0\uc695\uc801 \uc120\ud0dd\uc774 \uc9c0\uc5ed \ucd5c\uc801\ud574(local optimum)\ub97c \uc120\ud0dd\ud558\uc9c0\ub9cc, \uc774\ub4e4\uc758 \uc870\ud569\uc774 \uc804\uc5ed \ucd5c\uc801\ud574(global optimum)\ub97c \uc774\ub8f0 \uc218 \uc788\ub2e4\ub294 \uac00\uc815\ud558\uc5d0 \uc0ac\uc6a9\ub429\ub2c8\ub2e4. \uadf8\ub7ec\ub098 \uadf8\ub9ac\ub514 \uc54c\uace0\ub9ac\uc998\uc774 \ud56d\uc0c1 \ucd5c\uc801\ud574\ub97c \ubcf4\uc7a5\ud558\uc9c0 \uc54a\uae30 \ub54c\ubb38\uc5d0 \ubb38\uc81c\uc758 \uc131\uaca9\uc5d0 \ub530\ub77c \ub2e4\ub978 \uc811\uadfc \ubc29\ubc95\ub3c4 \uace0\ub824\ud574\uc57c \ud569\ub2c8\ub2e4."}),"\n",(0,s.jsx)(e.h3,{id:"\ubc30\ub0ad-\ubb38\uc81c",children:"\ubc30\ub0ad \ubb38\uc81c"}),"\n",(0,s.jsx)(e.p,{children:"\ubc30\ub0ad \ubb38\uc81c(knapsack problem)\ub294 \uadf8\ub9ac\ub514 \ubb38\uc81c\uc758 \ud558\uc704 \ubd84\ub958\uc785\ub2c8\ub2e4. \ucd5c\ub300 \uc801\uc7ac\uc744 \ucd08\uacfc\ud558\uc9c0 \uc54a\uc73c\uba74\uc11c \uc774\ub3d9\ud69f\uc218\ub97c \ucd5c\uc18c\ud654\ud558\ub294 \ubb38\uc81c\uc785\ub2c8\ub2e4. \ud604\uc2e4\uc5d0\uc11c \uc790\uc8fc \ubcfc \uc218 \uc788\ub294 \ubb38\uc81c \uc720\ud615\uc774 \ub429\ub2c8\ub2e4."}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.a,{href:"https://namu.wiki/w/%EB%B0%B0%EB%82%AD%20%EB%AC%B8%EC%A0%9C",children:"\ub098\ubb34\uc704\ud0a4"})}),"\n",(0,s.jsx)(e.h2,{id:"\ub450-\uac1c-\ubf51\uc544\uc11c-\ub354\ud558\uae30",children:"\ub450 \uac1c \ubf51\uc544\uc11c \ub354\ud558\uae30"}),"\n",(0,s.jsx)(e.p,{children:"\uadf8\ub9ac\ub514 \ubcf4\ub2e8 \ub2e8\uc21c \uad6c\ud604\ubb38\uc81c\uc5d0 \uac00\uae5d\uc2b5\ub2c8\ub2e4. \uc131\ub2a5 \ud5c8\uc6a9\uc774 \uc788\uc5b4\uc11c \uc911\ucca9 \uc21c\ud68c\uc5d0 \ud22c\ud3ec\uc778\ud130\ub85c \ud574\uacb0\ud560 \uc218 \uc788\uc5c8\uc2b5\ub2c8\ub2e4."}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.a,{href:"https://school.programmers.co.kr/learn/courses/30/lessons/68644",children:"\ub450 \uac1c \ubf51\uc544\uc11c \ub354\ud558\uae30"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"/**\n * @param {number[]} array,\n * @returns {number[]}\n */\nfunction solution(numbers) {\n  var answer = [];\n  return answer;\n}\n\nexport default solution;\n"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"import solution from './playground';\nimport { test, expect, describe } from 'vitest';\n\n// numbers\t    result\n// [2,1,3,4,1]\t[2,3,4,5,6,7]\n// [5,0,2,7]\t  [2,5,7,9,12]\n\ndescribe('\ub450 \uac1c \ubf51\uc544\uc11c \ub354\ud558\uae30', () => {\n  test('\uc608\uc81c 1', () => {\n    expect(solution([2, 1, 3, 4, 1])).toEqual([2, 3, 4, 5, 6, 7]);\n  });\n  test('\uc608\uc81c 2', () => {\n    expect(solution([5, 0, 2, 7])).toEqual([2, 5, 7, 9, 12]);\n  });\n});\n"})}),"\n",(0,s.jsxs)(r,{children:[(0,s.jsx)("summary",{children:" \uc800\uc758 \uc815\ub2f5"}),(0,s.jsx)("div",{markdown:"1",children:(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"/**\n * @param {number[]} numbers\n * @returns {number[]}\n */\nfunction solution(numbers) {\n  const result = new Set();\n  // \uc815\ub82c\n  numbers.sort((a, b) => a - b);\n\n  while (0 < numbers.length) {\n    // \ud22c\ud3ec\uc778\ud130\n    // \ud558\ub098 \uace0\uc815\n    const fixed = numbers.pop();\n\n    // \ud558\ub098 \uc774\ub3d9\n    for (let i = 0; i < numbers.length; i++) {\n      result.add(fixed + numbers[i]);\n    }\n  }\n\n  return [...result].sort((a, b) => a - b);\n}\n\nexport default solution;\n"})})})]}),"\n",(0,s.jsx)(e.p,{children:"\ubb38\uc81c\uc5d0\uc11c \uc131\ub2a5\ubb38\uc81c \uc81c\ud55c\uc740 \uc5c6\uc5c8\uc2b5\ub2c8\ub2e4."}),"\n",(0,s.jsxs)(r,{children:[(0,s.jsx)("summary",{children:"\ubaa8\ubc94 \uc815\ub2f5\uc785\ub2c8\ub2e4."}),(0,s.jsx)("div",{markdown:"1",children:(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"function solution(numbers) {\n  const temp = [];\n\n  for (let i = 0; i < numbers.length; i++) {\n    for (let j = i + 1; j < numbers.length; j++) {\n      temp.push(numbers[i] + numbers[j]);\n    }\n  }\n\n  const answer = [...new Set(temp)];\n\n  return answer.sort((a, b) => a - b);\n}\n"})})})]}),"\n",(0,s.jsx)(e.p,{children:"\uc800\ubcf4\ub2e4 \ud6a8\uc728\uc774 \ub354 \uc88b\uc2b5\ub2c8\ub2e4. \uc815\ub82c \ud69f\uc218\uac00 1\ud68c\uc774\uae30 \ub54c\ubb38\uc785\ub2c8\ub2e4."}),"\n",(0,s.jsx)(e.h2,{id:"\uad6c\uba85\ubcf4\ud2b8",children:"\uad6c\uba85\ubcf4\ud2b8"}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.a,{href:"https://school.programmers.co.kr/learn/courses/30/lessons/42885",children:"\uad6c\uba85\ubcf4\ud2b8"})}),"\n",(0,s.jsx)(e.p,{children:"\uc774 \ubb38\uc81c\ub294 \ubc30\ub0ad\ubb38\uc81c\uc758 \uc804\ud615\uc785\ub2c8\ub2e4."}),"\n",(0,s.jsx)(e.p,{children:"\uadf8\ub9ac\ub514 \uc54c\uace0\ub9ac\uc998\uc744 \uc801\uc6a9\ud558\ub77c\uace0 \ud569\ub2c8\ub2e4. \ubd80\ubd84 \ucd5c\uc801\ud654\uac00 \uc804\uccb4 \ucd5c\uc801\ud654\ub85c \uc774\uc5b4\uc9c4\ub2e4\ub294 \uac1c\ub150\uc785\ub2c8\ub2e4. \uc774\ub7ec\ud55c \uc120\uc785\uacac\uc744 \uac16\uace0 \ubb38\uc81c\uc5d0 \uc784\ud558\uaca0\uc2b5\ub2c8\ub2e4."}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"/**\n * @param {number[]} people\n * @param {number} limit\n * @returns {number}\n */\nfunction solution(people, limit) {\n  var answer = 0;\n  return answer;\n}\n\nexport default solution;\n"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"import solution from './playground';\nimport { test, expect, describe } from 'vitest';\n\n// people\t          limit\treturn\n// [70, 50, 80, 50]\t100\t  3\n// [70, 80, 50]\t    100\t  3\n\ndescribe('\uad6c\uba85\ubcf4\ud2b8', () => {\n  test('\uc608\uc81c 1', () => {\n    expect(solution([70, 50, 80, 50], 100)).toBe(3);\n  });\n  test('\uc608\uc81c 2', () => {\n    expect(solution([70, 80, 50], 100)).toBe(3);\n  });\n});\n"})}),"\n",(0,s.jsxs)(r,{children:[(0,s.jsx)("summary",{children:"\uc624\ub2f5 1\ucc28 \uc2dc\ub3c4"}),(0,s.jsxs)("div",{markdown:"1",children:[(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"/**\n * @param {number[]} people\n * @param {number} limit\n * @returns {number}\n */\nfunction solution(people, limit) {\n  let count = 0;\n  while (0 < people.length) {\n    const first = people.pop();\n    for (let i = 0; i < people.length; i++) {\n      if (people[i] <= limit - first) people.pop();\n    }\n    count += 1;\n  }\n  return count;\n}\n\nexport default solution;\n"})}),(0,s.jsx)(e.p,{children:"1\ucc28 \uc811\uadfc\ubc95\uc785\ub2c8\ub2e4."})]})]}),"\n",(0,s.jsxs)(r,{children:[(0,s.jsx)("summary",{children:"2\ucc28 \uc2dc\ub3c4"}),(0,s.jsxs)("div",{markdown:"1",children:[(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"/**\n * @param {number[]} people\n * @param {number} limit\n * @returns {number}\n */\nfunction solution(people, limit) {\n  let count = 0;\n  people.sort((a, b) => b - a);\n  while (0 < people.length) {\n    const first = people.pop();\n    if (people.at(-1) <= limit - first) people.pop();\n    count += 1;\n  }\n  return count;\n}\n\nexport default solution;\n"})}),(0,s.jsx)(e.p,{children:"\uc774\uc81c 2\ubc88\uc9f8 \uc811\uadfc\uc785\ub2c8\ub2e4. nlogn \uc2dc\uac04\ubcf5\uc7a1\uc131\uc744 \uac16\uc2b5\ub2c8\ub2e4."}),(0,s.jsx)(e.p,{children:"\ud558\uc9c0\ub9cc \uc120\ud615\uc2dc\uac04\ubcf5\uc7a1\uc131\uc73c\ub85c \ub0ae\ucd9c \uc218 \uc788\uc5b4\uc57c \ud569\ub2c8\ub2e4. 1\ud68c \uc21c\ud68c\ud560 \ub54c \uac00\ub2a5\ud55c \ub192\uc740 \uc801\uc81c\ub7c9\uc744 \ucc3e\uc544\uc57c\ud569\ub2c8\ub2e4."}),(0,s.jsx)(e.p,{children:"\uc120\ud615\ud0d0\uc0c9\uc744 \ud558\uba74\uc11c 1\uac1c\ub97c \ubf51\uc9c0\ub9d0\uace0 \ud55c\uacc4\uc5d0 \uac00\uae4c\uc6b4 2\uac1c\ub97c \ubf51\uc544\uc57c \ud569\ub2c8\ub2e4. \uadf8\ub9ac\uace0 \uc815\ub82c\uc5d0 \uc758\uc874\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4."})]})]}),"\n",(0,s.jsxs)(r,{children:[(0,s.jsx)("summary",{children:"\ubc1c\uacac\ud55c \uc815\ub2f5"}),(0,s.jsxs)("div",{markdown:"1",children:[(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"function solution(people, limit) {\n  const descPeople = people.sort((a, b) => b - a);\n  let boatCount = 0;\n  descPeople.forEach((people) => {\n    if (people + descPeople.at(-1) > limit) {\n      boatCount++;\n    } else {\n      descPeople.pop();\n      boatCount++;\n    }\n  });\n  return boatCount;\n}\n"})}),(0,s.jsx)(e.p,{children:"\uc774\uac83\uc774 \uc815\ub2f5\uc785\ub2c8\ub2e4. \uc77c\ub2e8 \uc2dc\uac04\ucd08\uacfc\ub85c \ubb38\uc81c\ub97c \ud655\uc778\ud588\uc2b5\ub2c8\ub2e4."})]})]}),"\n",(0,s.jsxs)(r,{children:[(0,s.jsx)("summary",{children:"\ubaa8\ubc94\ub2f5\uc548"}),(0,s.jsxs)("div",{markdown:"1",children:[(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"function solution(people, limit) {\n  people.sort((a, b) => a - b);\n  for (var i = 0, j = people.length - 1; i < j; j--) {\n    if (people[i] + people[j] <= limit) i++;\n  }\n  return people.length - i;\n}\n"})}),(0,s.jsx)(e.p,{children:"\uc800\ub294 \uc774\uac83\uc774 \ub354 \uc88b\uc740 \ucd5c\uc801\ud654\uc758 \uc608\uc2dc\ub77c\uace0 \ubd05\ub2c8\ub2e4. \uc591\ub05d\uc5d0 \ud3ec\uc778\ud130 2\uac1c\ub97c \ub450\uace0 \ud558\ub098\uc2dd \uc904\uc5ec\uac00\ub294 \ubc29\uc2dd\uc785\ub2c8\ub2e4."}),(0,s.jsx)(e.p,{children:"\uc774\ub807\uac8c \ub418\uba74 \ub2e8\uc21c \uc120\ud615 \ud0d0\uc0c9\uc73c\ub85c \ud574\uacb0\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4."}),(0,s.jsx)(e.p,{children:"\ud0d0\uc695\uc801 \uc120\ud0dd\uc744 \ud560 \ub54c \uc22b\uc790\uc640 \uad00\ub828\ub418\uba74 \uc815\ub82c\ud558\ub294 \uac83\uc774 \ud0d0\uc695\uc801 \uc120\ud0dd \uc804\uc5d0 \uc804\ucc98\ub9ac\uc785\ub2c8\ub2e4."})]})]}),"\n",(0,s.jsx)(e.hr,{}),"\n",(0,s.jsx)(e.h2,{id:"\uade4-\uace0\ub974\uae30",children:"\uade4 \uace0\ub974\uae30"}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.a,{href:"https://school.programmers.co.kr/learn/courses/30/lessons/138476",children:"\uade4 \uace0\ub974\uae30"})}),"\n",(0,s.jsx)(e.h3,{id:"2-\ud480\uc774-\uc804-\uacc4\ud68d\uacfc-\uc0dd\uac01",children:"2. \ud480\uc774 \uc804 \uacc4\ud68d\uacfc \uc0dd\uac01"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\uc21c\uc5f4\uacfc \uc870\ud569 \ubb38\uc81c\ub77c\uace0 \uc0dd\uac01\ud558\uace0 \uc788\uc5c8\uc2b5\ub2c8\ub2e4."}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"import solution from './playground';\nimport { test, expect, describe } from 'vitest';\n\n// k\ttangerine\t                result\n// 6\t[1, 3, 2, 5, 4, 5, 2, 3]\t3\n// 4\t[1, 3, 2, 5, 4, 5, 2, 3]\t2\n// 2\t[1, 1, 1, 1, 2, 2, 2, 3]\t1\n// \uade4 k\uac1c\ub97c \uace0\ub97c \ub54c \ud06c\uae30\uac00 \uc11c\ub85c \ub2e4\ub978 \uc885\ub958\uc758 \uc218\uc758 \ucd5c\uc19f\uac12\uc744 return\n\ndescribe('\uade4 \uace0\ub974\uae30', () => {\n  test('\uc608\uc81c 1', () => {\n    expect(solution(6, [1, 3, 2, 5, 4, 5, 2, 3])).toBe(3);\n    // [2, 2, 3, 3, 5, 5]\n  });\n  test('\uc608\uc81c 2', () => {\n    expect(solution(4, [1, 3, 2, 5, 4, 5, 2, 3])).toBe(2);\n    // [2, 2, 3, 3] or [3, 3, 5, 5] or [2, 2, 5, 5]\n  });\n  test('\uc608\uc81c 3', () => {\n    expect(solution(2, [1, 1, 1, 1, 2, 2, 2, 3])).toBe(1);\n    // [1, 1] or [2, 2]\n  });\n});\n"})}),"\n",(0,s.jsx)(e.p,{children:"\uc774\ub7f0 \uad00\uc810\uc73c\ub85c \uc0dd\uac01\ud558\uace0 \uc788\uc5c8\uc2b5\ub2c8\ub2e4. \ubb38\uc81c\ub294 \ud640\uc218 \uacbd\uc6b0\uc758 \uc218\uc5d0 \ub300\ud55c \ud14c\uc2a4\ud2b8 \ucf00\uc774\uc2a4\ub97c \uc0dd\uac01\ud558\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4."}),"\n",(0,s.jsx)(e.p,{children:"\uc0c1\uc138 \uc815\ucc45\uc744 \uc774\ud574\ud558\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4. \uc608\uc2dc\uac00 \ub354 \uc788\uc5c8\uc73c\uba74 \uc88b\uc558\uc744 \uac83 \uac19\uc2b5\ub2c8\ub2e4."}),"\n",(0,s.jsx)(e.h3,{id:"3-\ud480\uc774",children:"3. \ud480\uc774"}),"\n",(0,s.jsxs)(r,{children:[(0,s.jsx)("summary",{children:"2023\ub144 09\uc6d4 02\uc77c \ud480\uc774"}),(0,s.jsx)("div",{markdown:"1",children:(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"/**\n * @param {number} k\n * @param {number[]} tangerine\n * @returns {number}\n */\nfunction solution(k, tangerine) {\n  // \uade4 k\uac1c\ub97c \uace0\ub97c \ub54c \ud06c\uae30\uac00 \uc11c\ub85c \ub2e4\ub978 \uc885\ub958\uc758 \uc218\uc758 \ucd5c\uc19f\uac12\uc744 return\n  // \uc911\ubcf5 \uae30\ub85d\n  const memo = new Map();\n  tangerine.forEach((elem) => {\n    if (memo.get(elem) === undefined) memo.set(elem, 1);\n    else memo.set(elem, memo.get(elem) + 1);\n  });\n\n  const box = Array.from(memo.values()).sort((a, b) => b - a);\n\n  let count = 0;\n  for (let i = 0; i < box.length; i++) {\n    if (k <= 0) break;\n    k -= box[i];\n    count += 1;\n  }\n\n  return count;\n}\n\nexport default solution;\n"})})})]}),"\n",(0,s.jsx)(e.h3,{id:"4-\ud480\uc774\ud558\uba74\uc11c-\uace0\ubbfc\ud588\ub358-\uc810",children:"4. \ud480\uc774\ud558\uba74\uc11c \uace0\ubbfc\ud588\ub358 \uc810"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\ud604\uc2e4\uc5d0\uc11c \ube44\uc2b7\ud55c \ubb38\uc81c\uac00 \uc788\uc744 \uac83 \uac19\uc740\ub370 \uc62c\ubc14\ub974\uac8c \ubb38\uc81c\ub97c \ud478\ub294 \uac83 \uac19\ub2e4\ub294 \uc0dd\uac01\uc774 \ub4e4\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4."}),"\n"]}),"\n",(0,s.jsx)(e.h3,{id:"5-\ubb38\uc81c\ub97c-\ud480\uace0-\uc54c\uac8c\ub41c-\uac1c\ub150-\ubc0f-\uc18c\uac10",children:"5. \ubb38\uc81c\ub97c \ud480\uace0 \uc54c\uac8c\ub41c \uac1c\ub150 \ubc0f \uc18c\uac10"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\ud504\ub85c\uadf8\ub798\uba38\uc2a4 \ubb38\uc81c\uac00 \uc774\uc81c \uc5b4\ub824\uc6cc\uc9c0\uae30 \uc2dc\uc791\ud569\ub2c8\ub2e4."}),"\n",(0,s.jsx)(e.li,{children:"\ubc31\uc900\uc73c\ub85c \uc804\ud658\ud558\ub294 \uac83\uc774 \uc88b\uc744 \uac83 \uac19\uc2b5\ub2c8\ub2e4. \ubb38\uc81c\ub97c \ud1b5\ud574 \ud559\uc2b5\ud55c \uc778\uc0ac\uc774\ud2b8\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."}),"\n",(0,s.jsx)(e.li,{children:"\ud30c\uc774\uc36c\uc73c\ub85c \ud480\uc5b4\ubcf4\ub294 \uc5f0\uc2b5\uc774 \ud544\uc694\ud560 \uac83 \uac19\uc2b5\ub2c8\ub2e4."}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"\uacfc\uc77c-\uc7a5\uc218",children:"\uacfc\uc77c \uc7a5\uc218"}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.a,{href:"https://school.programmers.co.kr/learn/courses/30/lessons/135808",children:"\uacfc\uc77c \uc7a5\uc218"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"/**\n * @param {number} s\n * @param {number} m\n * @param {number[]} score\n * @returns {number}\n */\nfunction solution(k, m, score) {\n  let result = 0;\n  return result;\n}\n"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"import solution, { parseTuple, splitNestedTuple } from './playground';\nimport { test, expect, describe } from 'vitest';\n\n// k\tm\tscore\tresult\n// 3\t4\t[1, 2, 3, 1, 2, 3, 1]\t8\n// 4\t3\t[4, 1, 2, 2, 4, 4, 4, 4, 1, 2, 4, 2]\t33\n\ndescribe('\uacfc\uc77c \uc7a5\uc218', () => {\n  test('\uc608\uc81c 1', () => {\n    expect(solution(3, 4, [1, 2, 3, 1, 2, 3, 1])).toEqual(8);\n  });\n\n  test('\uc608\uc81c 2', () => {\n    expect(solution(4, 3, [4, 1, 2, 2, 4, 4, 4, 4, 1, 2, 4, 2])).toEqual(33);\n  });\n});\n"})}),"\n",(0,s.jsxs)(r,{children:[(0,s.jsx)("summary",{children:"2023\ub144 09\uc6d4 25\uc77c \ud480\uc774"}),(0,s.jsx)("div",{markdown:"1",children:(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"/**\n * @param {number} s\n * @param {number} m\n * @param {number[]} score\n * @returns {number}\n */\nfunction solution(k, m, score) {\n  let result = 0;\n  const allBox = [];\n  // \uc815\ub82c\n  score.sort((a, b) => a - b);\n  const scoreLength = score.length;\n  // \ubc15\uc2a4\uc5d0 \ub2f4\uae30\n  let box = [];\n  for (let i = 0; i < scoreLength; i++) {\n    box.push(score.pop());\n    // \ub9c8\uc9c0\ub9c9\uc5d0 \uc0c8\uc0c1\uc790\n    if (box.length === m) {\n      allBox.push(box);\n      box = [];\n    }\n  }\n  // \ubc15\uc2a4 \ubcc4\ub85c \uac00\uce58\uad6c\ud558\uace0 \ud569\uc0b0\ud558\uae30\n  allBox.forEach((box) => {\n    result += Math.min(...box) * box.length;\n  });\n  return result;\n}\n"})})})]})]})}function u(n={}){const{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(d,{...n})}):d(n)}},11151:(n,e,r)=>{r.d(e,{Z:()=>o,a:()=>i});var s=r(67294);const t={},l=s.createContext(t);function i(n){const e=s.useContext(l);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:i(n.components),s.createElement(l.Provider,{value:e},n.children)}}}]);