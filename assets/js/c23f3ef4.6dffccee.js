"use strict";(self.webpackChunkarch_spatula_github_io=self.webpackChunkarch_spatula_github_io||[]).push([[3685],{70570:(s,e,n)=>{n.r(e),n.d(e,{assets:()=>m,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>c,toc:()=>t});var a=n(85893),l=n(11151);const r={sidebar_position:3,tags:["syntactic sugar","python"]},i="\ud30c\uc774\uc36c \ubb38\ubc95 \uc90d\uc90d",c={id:"python-syntax-sugar",title:"\ud30c\uc774\uc36c \ubb38\ubc95 \uc90d\uc90d",description:"\ud30c\uc774\uc36c\uc758 \ubb38\ubc95\uc801 \uc124\ud0d5\uc744 \uc90d\uc90d\ud569\ub2c8\ub2e4. \ucc38\uace0\ub85c \uc6d0\ub798 \ubb38\ubc95\uc774 \ub2ec\ub2ec\ud55c \uc5b8\uc5b4\uc785\ub2c8\ub2e4.",source:"@site/python/python-syntax-sugar.md",sourceDirName:".",slug:"/python-syntax-sugar",permalink:"/python/python-syntax-sugar",draft:!1,unlisted:!1,tags:[{label:"syntactic sugar",permalink:"/python/tags/syntactic-sugar"},{label:"python",permalink:"/python/tags/python"}],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,tags:["syntactic sugar","python"]},sidebar:"tutorialSidebar",previous:{title:"\ud1b5\uacc4\ud559 \uad00\ub828 \uc6a9\uc5b4",permalink:"/python/statistics/terminology"},next:{title:"\ud30c\uc774\uc36c \uae30\ucd08 \uc790\ub8cc\uad6c\uc870\uc640 \uc54c\uace0\ub9ac\uc998",permalink:"/python/python-ds-and-algo"}},m={},t=[{value:"\uc2ac\ub77c\uc774\uc2f1\uc774 \uace7 \ubcf5\uc0ac",id:"\uc2ac\ub77c\uc774\uc2f1\uc774-\uace7-\ubcf5\uc0ac",level:2},{value:"in \uc5f0\uc0b0",id:"in-\uc5f0\uc0b0",level:2},{value:"\uad6c\uc870\ubd84\ud574\ud560\ub2f9 \uc9c0\uc6d0",id:"\uad6c\uc870\ubd84\ud574\ud560\ub2f9-\uc9c0\uc6d0",level:2},{value:"enumerate",id:"enumerate",level:2},{value:"\uc9d1\ud569(set)\uacfc \uc9d1\ud569\uc5f0\uc0b0",id:"\uc9d1\ud569set\uacfc-\uc9d1\ud569\uc5f0\uc0b0",level:2},{value:"\uc608\uc678\ucc98\ub9ac",id:"\uc608\uc678\ucc98\ub9ac",level:2},{value:"\ubb38\ubc95\uc124\ud0d5",id:"\ubb38\ubc95\uc124\ud0d5",level:2},{value:"\uc0bc\ud56d\uc5f0\uc0b0\uc790",id:"\uc0bc\ud56d\uc5f0\uc0b0\uc790",level:3},{value:"list comprehension",id:"list-comprehension",level:3},{value:"map",id:"map",level:3},{value:"\ub78c\ub2e4\ud568\uc218",id:"\ub78c\ub2e4\ud568\uc218",level:3},{value:"filter",id:"filter",level:3},{value:"\ud568\uc218",id:"\ud568\uc218",level:2},{value:"\ud30c\uc774\uc36c\uc758 \ubc18\ubcf5\ubb38",id:"\ud30c\uc774\uc36c\uc758-\ubc18\ubcf5\ubb38",level:2},{value:"For Else",id:"for-else",level:3},{value:"\ubb38\uc790\uc5f4 \ub2e4\ub8e8\uae30",id:"\ubb38\uc790\uc5f4-\ub2e4\ub8e8\uae30",level:2},{value:"\uc815\ub82c",id:"\uc815\ub82c",level:2},{value:"math\uc758 factorial",id:"math\uc758-factorial",level:2},{value:"divmod",id:"divmod",level:2},{value:"combinations",id:"combinations",level:2}];function h(s){const e={a:"a",annotation:"annotation",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",math:"math",mfrac:"mfrac",mi:"mi",mn:"mn",mo:"mo",mrow:"mrow",mstyle:"mstyle",msub:"msub",mtable:"mtable",mtd:"mtd",mtr:"mtr",ol:"ol",p:"p",pre:"pre",section:"section",semantics:"semantics",span:"span",sup:"sup",...(0,l.a)(),...s.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.h1,{id:"\ud30c\uc774\uc36c-\ubb38\ubc95-\uc90d\uc90d",children:"\ud30c\uc774\uc36c \ubb38\ubc95 \uc90d\uc90d"}),"\n",(0,a.jsx)(e.p,{children:"\ud30c\uc774\uc36c\uc758 \ubb38\ubc95\uc801 \uc124\ud0d5\uc744 \uc90d\uc90d\ud569\ub2c8\ub2e4. \ucc38\uace0\ub85c \uc6d0\ub798 \ubb38\ubc95\uc774 \ub2ec\ub2ec\ud55c \uc5b8\uc5b4\uc785\ub2c8\ub2e4."}),"\n",(0,a.jsx)(e.h2,{id:"\uc2ac\ub77c\uc774\uc2f1\uc774-\uace7-\ubcf5\uc0ac",children:"\uc2ac\ub77c\uc774\uc2f1\uc774 \uace7 \ubcf5\uc0ac"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:'f="abcdefghijklmnopqrstuvwxyz"\n\nprint(f[4:15])  # efghijklmno           f[4]\ubd80\ud130 f[15] \uc804\uae4c\uc9c0, \ucd1d 15-4=11\uac1c!\n\nprint(f[:])  # abcdefghijklmnopqrstuvwxyz  \ucc98\uc74c\ubd80\ud130 \ub05d\uae4c\uc9c0\n'})}),"\n",(0,a.jsx)(e.p,{children:"\uc2ac\ub77c\uc774\uc2f1 \ubb38\ubc95\ubd80\ud130 \ub2ec\ub2ec\ud55c\ub370 \uc2ac\ub77c\uc774\uc2f1\uc744 \ud558\uba74\uc11c \ubcf5\uc0ac\ub97c \ud569\ub2c8\ub2e4."}),"\n",(0,a.jsx)(e.h2,{id:"in-\uc5f0\uc0b0",children:"in \uc5f0\uc0b0"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"a = [1, 2, 3, 4, 5]\n\na.append(99)\na.sort(reverse=True)\n\nprint(6 in a)\n"})}),"\n",(0,a.jsxs)(e.p,{children:["\ud30c\uc774\uc36c\uc740 \uc815\ub82c \ub4a4\uc9d1\uae30\uac00 \uc9c1\uad00\uc801\uc785\ub2c8\ub2e4. ",(0,a.jsx)(e.code,{children:"in"}),"\uc73c\ub85c \ud0d0\uc0c9\uc744 \uac04\ub2e8\ud558\uac8c \ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"a = {\n    'name': 'Jake',\n    'age' : 30,\n}\n\na['height'] = 'inf'\n\nprint('height' in a)\nprint('inf' in a)\n"})}),"\n",(0,a.jsxs)(e.p,{children:["\ub515\uc154\ub108\ub9ac \uc790\ub8cc\ud615\uc5d0\uc11c\ub294 \uc548\ud0c0\uae5d\uac8c ",(0,a.jsx)(e.code,{children:"key"}),"\ub9cc \uc870\ud68c\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. ",(0,a.jsx)(e.code,{children:"value"})," \uc870\ud68c\ub294 \ubaa8\ub974\uaca0\uc2b5\ub2c8\ub2e4."]}),"\n",(0,a.jsx)(e.h2,{id:"\uad6c\uc870\ubd84\ud574\ud560\ub2f9-\uc9c0\uc6d0",children:"\uad6c\uc870\ubd84\ud574\ud560\ub2f9 \uc9c0\uc6d0"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"people = [\n    {'name': 'bob', 'age': 20},\n    {'name': 'carry', 'age': 38},\n    {'name': 'john', 'age': 7},\n    {'name': 'smith', 'age': 17},\n    {'name': 'ben', 'age': 27},\n    {'name': 'bobby', 'age': 57},\n    {'name': 'red', 'age': 32},\n    {'name': 'queen', 'age': 25}\n]\n\nfor person in people:\n    [name, age] = [person['name'], person['age']]\n    print(name, age)\n"})}),"\n",(0,a.jsxs)(e.p,{children:[(0,a.jsx)(e.code,{children:"list"}),"\ub97c \ud65c\uc6a9\ud574 \uad6c\uc870\ubd84\ud574\ud560\ub2f9\uc744 \uc9c0\uc6d0\ud55c\ub2e4\ub294 \uac83\uc744 \uc54c \uc218 \uc788\uc5c8\uc2b5\ub2c8\ub2e4. \uc21c\uc11c\uac00 \uc911\uc694\ud558\uba74 \uc774\ub807\uac8c \uc811\uadfc\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."]}),"\n",(0,a.jsx)(e.h2,{id:"enumerate",children:"enumerate"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"people = [\n    {'name': 'bob', 'age': 20},\n    {'name': 'carry', 'age': 38},\n    {'name': 'john', 'age': 7},\n    {'name': 'smith', 'age': 17},\n    {'name': 'ben', 'age': 27},\n    {'name': 'bobby', 'age': 57},\n    {'name': 'red', 'age': 32},\n    {'name': 'queen', 'age': 25}\n]\n\nfor idx, person in enumerate(people):\n    [name, age] = [person['name'], person['age']]\n    print(idx, name, age)\n"})}),"\n",(0,a.jsxs)(e.p,{children:[(0,a.jsx)(e.code,{children:"enumerate"})," \ub0b4\uc7a5\ud568\uc218\ub294 \ubc18\ubcf5\ubb38\uc758 \uc778\ub371\uc2a4\uc5d0 \ud65c\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."]}),"\n",(0,a.jsx)(e.h2,{id:"\uc9d1\ud569set\uacfc-\uc9d1\ud569\uc5f0\uc0b0",children:"\uc9d1\ud569(set)\uacfc \uc9d1\ud569\uc5f0\uc0b0"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"a = set(['\uc0ac\uacfc','\uac10','\uc218\ubc15','\ucc38\uc678','\ub538\uae30'])\nb = set(['\uc0ac\uacfc','\uba5c\ub860','\uccad\ud3ec\ub3c4','\ud1a0\ub9c8\ud1a0','\ucc38\uc678'])\n\nprint(a & b)  # \uad50(and) \uc9d1\ud569\nprint(a | b)  # \ud569(or)  \uc9d1\ud569\nprint(a - b)  # \ucc28(not) \uc9d1\ud569\n"})}),"\n",(0,a.jsx)(e.p,{children:"\uc9d1\ud569 \uc790\ub8cc\ud615\ub9cc \uc788\ub294 \uac83\uc774 \uc544\ub2c8\ub77c \uc218\ud559\ucc98\ub7fc \uacc4\uc0b0\ub3c4 \uac00\ub2a5\ud569\ub2c8\ub2e4."}),"\n",(0,a.jsx)(e.h2,{id:"\uc608\uc678\ucc98\ub9ac",children:"\uc608\uc678\ucc98\ub9ac"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"people = [\n    {'name': 'bob'},\n    {'name': 'carry', 'age': 38},\n    {'name': 'john', 'age': 7},\n    {'name': 'smith', 'age': 17},\n    {'name': 'ben', 'age': 27},\n    {'name': 'bobby', 'age': 57},\n    {'name': 'red', 'age': 32},\n    {'name': 'queen', 'age': 25}\n]\n\nfor person in people:\n    try:\n        [name, age] = [person['name'], person['age']]\n        if age > 20: print(name)\n    except:\n        print(f'{person} \uc790\ub8cc\ub294 \uc5d0\ub7ec\uc785\ub2c8\ub2e4.')\n"})}),"\n",(0,a.jsxs)(e.p,{children:["\ud30c\uc774\uc36c\uc740 ",(0,a.jsx)(e.code,{children:"catch"}),"\uac00 \uc544\ub2c8\ub77c ",(0,a.jsx)(e.code,{children:"except"}),"\uc785\ub2c8\ub2e4."]}),"\n",(0,a.jsx)(e.h2,{id:"\ubb38\ubc95\uc124\ud0d5",children:"\ubb38\ubc95\uc124\ud0d5"}),"\n",(0,a.jsx)(e.p,{children:"\uadf8\uc678 \ub2e4\uc591\ud55c \ubb38\ubc95\uc801 \uc124\ud0d5\ub4e4\uc774 \ub610 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,a.jsx)(e.h3,{id:"\uc0bc\ud56d\uc5f0\uc0b0\uc790",children:"\uc0bc\ud56d\uc5f0\uc0b0\uc790"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"\"\uc9dd\uc218\" if num % 2 == 0 else '\ud640\uc218'\n"})}),"\n",(0,a.jsx)(e.h3,{id:"list-comprehension",children:"list comprehension"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"a_list  = [1, 3, 2, 5, 1, 2]\n\nb_list = [a*2 for a in a_list]\n\nprint(b_list)\n"})}),"\n",(0,a.jsx)(e.p,{children:"\ubc30\uc5f4 \ubcf5\uc0ac\uc785\ub2c8\ub2e4."}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:'fruits = ["apple", "banana", "cherry", "kiwi", "mango"]\n\nnewlist = [x for x in fruits if "a" in x]\n\nprint(newlist)\n'})}),"\n",(0,a.jsxs)(e.p,{children:["\uc774\ub7f0 \uc751\uc6a9\ub3c4 \uac00\ub2a5\ud569\ub2c8\ub2e4.",(0,a.jsx)(e.sup,{children:(0,a.jsx)(e.a,{href:"#user-content-fn-1",id:"user-content-fnref-1","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"1"})})]}),"\n",(0,a.jsxs)(e.p,{children:[(0,a.jsx)(e.a,{href:"https://school.programmers.co.kr/learn/courses/30/lessons/120836",children:"\uc21c\uc11c\uc30d\uc758 \uac1c\uc218"}),"\ubb38\uc81c\uc5d0\uc11c \uc544\ub798\ucc98\ub7fc \uc751\uc6a9\ud558\ub294 \uac83\ub3c4 \uac00\ub2a5\ud569\ub2c8\ub2e4."]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"def solution(n):\n    return len([number for number in range(1, n+1) if n%number == 0])\n"})}),"\n",(0,a.jsx)(e.h3,{id:"map",children:"map"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"people = [\n    {'name': 'bob', 'age': 20},\n    {'name': 'carry', 'age': 38},\n    {'name': 'john', 'age': 7},\n    {'name': 'smith', 'age': 17},\n    {'name': 'ben', 'age': 27},\n    {'name': 'bobby', 'age': 57},\n    {'name': 'red', 'age': 32},\n    {'name': 'queen', 'age': 25}\n]\n\nprint(list(map(lambda person: ('\uc131\uc778' if person['age'] > 20 else '\uc544\ub3d9'), people)))\n"})}),"\n",(0,a.jsxs)(e.p,{children:["\uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8 ",(0,a.jsx)(e.code,{children:"map"}),"\uba54\uc11c\ub4dc\ub791 \ube44\uc2b7\ud569\ub2c8\ub2e4. ",(0,a.jsx)(e.code,{children:"map"})," \ub0b4\uc7a5 \ud568\uc218\ub294 \uc5f0\uc18d\ub41c \uc790\ub8cc\uc758 \uc6d0\uc18c\ub97c \ud568\uc218\uc5d0 \ud558\ub098\uc529 \ub300\uc785\ud569\ub2c8\ub2e4."]}),"\n",(0,a.jsx)(e.h3,{id:"\ub78c\ub2e4\ud568\uc218",children:"\ub78c\ub2e4\ud568\uc218"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"print((lambda x, y : x + y )(2, 3))  # 5 \ub78c\ub2e4\ub97c \ud640\ub85c \uc4f8 \ub54c \ubb38\ubc95\n"})}),"\n",(0,a.jsx)(e.p,{children:"\ub78c\ub2e4\uc758 \uac04\ub2e8\ud55c \uad6c\uc870\ub294 \uc774\ub807\uc2b5\ub2c8\ub2e4."}),"\n",(0,a.jsx)(e.h3,{id:"filter",children:"filter"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"people = [\n    {'name': 'bob', 'age': 20},\n    {'name': 'carry', 'age': 38},\n    {'name': 'john', 'age': 7},\n    {'name': 'smith', 'age': 17},\n    {'name': 'ben', 'age': 27},\n    {'name': 'bobby', 'age': 57},\n    {'name': 'red', 'age': 32},\n    {'name': 'queen', 'age': 25}\n]\n\nresults = filter(lambda x: x['age'] > 20, people)\nprint(list(results))\n"})}),"\n",(0,a.jsxs)(e.p,{children:[(0,a.jsx)(e.code,{children:"filter"}),"\ub0b4\uc7a5\ud568\uc218\ub3c4 \uc9c0\uc6d0\ud569\ub2c8\ub2e4."]}),"\n",(0,a.jsx)(e.h2,{id:"\ud568\uc218",children:"\ud568\uc218"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"def fn(*args):\n    for arg in args:\n        print(f'{arg}\uc774\ub2e4.')\n\n"})}),"\n",(0,a.jsx)(e.p,{children:"\ud568\uc218\uc5d0 \uc5f0\uc18d\ub41c \uc790\ub8cc\ub97c \ub123\uc744 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"def fn(**kwargs):\n    return kwargs\n\nprint(fn(name='Jake', age=30))  # {'name': 'Jake', 'age': 30}\n"})}),"\n",(0,a.jsx)(e.p,{children:"\ub515\uc154\ub108\ub9ac\ub3c4 \uc0dd\uc131\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,a.jsx)(e.h2,{id:"\ud30c\uc774\uc36c\uc758-\ubc18\ubcf5\ubb38",children:"\ud30c\uc774\uc36c\uc758 \ubc18\ubcf5\ubb38"}),"\n",(0,a.jsx)(e.p,{children:"\uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8\ub294 \ubc30\uc5f4 \uc21c\ud68c\ub97c \ud3b8\uc548\ud558\uac8c \ud560 \uc218 \uc788\uc5c8\uc2b5\ub2c8\ub2e4."}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-js",children:"const arr = [...Array(3).keys()].forEach((elem, idx) => {\n  // \ubc30\uc5f4\uc758 \uc6d0\uc18c\ub3c4 \uc778\ub371\uc2a4\ub3c4 \uc27d\uac8c \uc54c\uc544 \ub0bc \uc218 \uc788\uc5c8\uc2b5\ub2c8\ub2e4.\n});\n"})}),"\n",(0,a.jsxs)(e.p,{children:["\ud558\uc9c0\ub9cc \ud30c\uc774\uc36c\uc740 ",(0,a.jsx)(e.code,{children:"range(len(list))"})," \ubc29\uc2dd\uc744 \uc0ac\uc6a9\ud569\ub2c8\ub2e4. \ubb3c\ub860 \uac04\ub2e8\ud558 for\ubb38\uc758 \ubb38\ubc95\uc740 \uac04\uacb0\ud574\uc11c \uc88b\uc2b5\ub2c8\ub2e4."]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"#\ud30c\uc774\uc36c\uc758 for\ubb38\nfor letter in string:\n\tif letter in bin: return letter\n\n# \ud30c\uc774\uc36c\uc758 range in len\uc744 \uc0ac\uc6a9\ud55c for\ubb38\nfor idx in range(len(alphabet_occurrence_array)):\n        if alphabet_occurrence_array[idx] % 2 != 0:\n            bin.append(chr(idx + ord('a')))\n"})}),"\n",(0,a.jsx)(e.p,{children:"\ub300\ubd80\ubd84\uc758 \uacbd\uc6b0 \ucf54\ub4dc\uc758 \uc2ec\ubbf8\uc801\uc778 \ubd80\ubd84\uc740 \ud30c\uc774\uc36c\uc774 \ub354 \uc88b\uc9c0\ub9cc \uc774\ub7f0 \uc21c\ud68c\uc5d0\uc11c\ub294 \uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8\uac00 \ub354 \uc88b\uc2b5\ub2c8\ub2e4."}),"\n",(0,a.jsx)(e.h3,{id:"for-else",children:"For Else"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:'input = "abcba"\n\ndef is_palindrome(string: str):\n    # \ubb38\uc790\uc5f4\uc744 \ud55c\uae00\uc790\uc2dd \uc21c\ud68c\ud569\ub2c8\ub2e4.\n    for index, letter in enumerate(string):\n        # \uc55e\ub4a4\ub97c \ube44\uad50\ud569\ub2c8\ub2e4.\n        if string[index] != string[-index-1]: return False\n            # \ubd88\uc77c\uce58\ud558\uba74 False\ub97c \ubc18\ud658\uac12\uc774\ub2e4.\n    else: return True\n\n\nprint(is_palindrome(input))\n'})}),"\n",(0,a.jsxs)(e.p,{children:["for\ubb38 \ub4a4\uc5d0 ",(0,a.jsx)(e.code,{children:"else"}),"\ub97c \uc4f8 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc0c1\ub2f9\ud788 \ub2ec\ub2ec\ud558\ub124\uc694."]}),"\n",(0,a.jsx)(e.h2,{id:"\ubb38\uc790\uc5f4-\ub2e4\ub8e8\uae30",children:"\ubb38\uc790\uc5f4 \ub2e4\ub8e8\uae30"}),"\n",(0,a.jsxs)(e.p,{children:["\ud30c\uc774\uc36c\uc5d0\ub294 \ub2e4\uc591\ud55c \ub0b4\uc7a5\ud568\uc218\uac00 \uc788\uc2b5\ub2c8\ub2e4. ",(0,a.jsx)(e.code,{children:"chr"}),", ",(0,a.jsx)(e.code,{children:"ord"})," \ub0b4\uc7a5\ud568\uc218\ub294 \ubb38\uc790\uc5f4\uc744 \uc544\uc2a4\ud0a4 \uc778\ub371\uc2a4 \ud639\uc740 \uc544\uc2a4\ud0a4 \uc778\ub371\uc2a4\ub97c \ubb38\uc790\uc5f4\ub85c \ubc14\uafc0 \uc218 \uc788\uac8c \ud574\uc90d\ub2c8\ub2e4."]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"chr()  # \uc544\uc2a4\ud0a4 10\uc9c4\uc218 -> \ubb38\uc790\uc5f4\nord()  # \ubb38\uc790\uc5f4 -> \uc544\uc2a4\ud0a4 10\uc9c4\uc218\n"})}),"\n",(0,a.jsx)(e.p,{children:"\uc5b4\ub290 \uba54\uc11c\ub4dc\uc5d0 \ubd99\uc5b4\uc788\uc9c0 \uc54a\uace0 \uadf8\ub0e5 \uc0ac\uc6a9\ud558\uba74 \ub429\ub2c8\ub2e4."}),"\n",(0,a.jsx)(e.p,{children:"\uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8\ub294 \ud504\ub85c\ud1a0\ud0c0\uc785 \uae30\ubc18 \uc5b8\uc5b4\ub2f5\uac8c \ub0b4\uc7a5\ud568\uc218\ubcf4\ub2e8 \ub0b4\uc7a5\uac1d\uccb4\uc640 \uba54\uc11c\ub4dc\ub85c \ubb38\uc81c\ub97c \ud574\uacb0\ud574\uc57c \ud569\ub2c8\ub2e4."}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-js",children:"console.log(String.fromCharCode(97), 'a'.charCodeAt(0));\n"})}),"\n",(0,a.jsxs)(e.p,{children:[(0,a.jsx)(e.code,{children:"fromCharCode"})," \uc815\uc801 \ub9e4\uc11c\ub4dc\ub791 ",(0,a.jsx)(e.code,{children:"charCodeAt"})," \ub3d9\uc801 \ub9e4\uc11c\ub4dc\ub97c \uc554\uae30\ud558\uace0 \ucf54\ub529\ud14c\uc2a4\ud2b8\ub97c \ud480\ub3c4\ub85d \ud569\uc2dc\ub2e4."]}),"\n",(0,a.jsx)(e.h2,{id:"\uc815\ub82c",children:"\uc815\ub82c"}),"\n",(0,a.jsx)(e.p,{children:"\ubb38\ubc95 \uc124\ud0d5\uc740 \uc544\ub2c8\uc9c0\ub9cc \uc815\ub82c \ub0b4\uc7a5\ud568\uc218\uac00 \uc0c1\ub2f9\ud788 \ub2ec\ub2ec\ud569\ub2c8\ub2e4."}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"arr = [2, 3, 1]\nprint(sorted(arr)) # [1, 2, 3]\nprint(sorted(arr, reverse=True)) # [3, 2, 1]\n"})}),"\n",(0,a.jsxs)(e.p,{children:[(0,a.jsx)(e.code,{children:"sorted"}),"\ub294 \ub2e4\uc591\ud55c \uc790\ub8cc\ud615\uc5d0 \uc0ac\uc6a9\ud560 \uc218 \uc788\ub294 \ub0b4\uc7a5\ud568\uc218\uace0 ",(0,a.jsx)(e.code,{children:"sort"})," \uba54\uc11c\ub4dc\ub3c4 \uac19\uc774 \uc81c\uacf5\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4."]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"arr = [2, 3, 1]\nprint(arr.sort()) # [1, 2, 3]\nprint(arr.sort(reverse=True)) # [3, 2, 1]\n"})}),"\n",(0,a.jsx)(e.h2,{id:"math\uc758-factorial",children:"math\uc758 factorial"}),"\n",(0,a.jsxs)(e.p,{children:["\ud504\ub85c\uadf8\ub798\uba38\uc2a4\uc5d0\uc11c ",(0,a.jsx)(e.a,{href:"https://school.programmers.co.kr/learn/courses/30/lessons/120848",children:"\ud329\ud1a0\ub9ac\uc5bc"})," \ubb38\uc81c\ub97c \ud478\ub294 \ub3c4\uc911\uc5d0 \ubc1c\uacac\ud55c \uc815\ub2f5\uc785\ub2c8\ub2e4."]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"from math import factorial\n\ndef solution(n):\n    k = 10\n    while n < factorial(k):\n        k -= 1\n    return k\n"})}),"\n",(0,a.jsx)(e.p,{children:"\uc774\ub7f0 \ubaa8\ub4c8\uc774 \uc788\uc744 \uac70\ub77c\ub294 \uc0dd\uac01\ub3c4 \ubabb\ud588\uc2b5\ub2c8\ub2e4. \uc5ed\uc2dc \ucf54\ud14c\uc758 \uc5b8\uc5b4\ub2f5\uc2b5\ub2c8\ub2e4."}),"\n",(0,a.jsx)(e.h2,{id:"divmod",children:"divmod"}),"\n",(0,a.jsxs)(e.p,{children:[(0,a.jsx)(e.code,{children:"divmod"}),"\ub294 \ub098\ub208 \uac12\uacfc \ub098\ub208 \uac12\uc758 \ub098\uba38\uc9c0\ub97c \uc5bb\uc744 \uc218 \uc788\uc2b5\ub2c8\ub2e4."]}),"\n",(0,a.jsxs)(e.p,{children:["\uad50\uc721\uacfc\uc815\uc744 \uc218\uac15\ud558\ub358 \uc911\uc5d0\uc11c \ud300\uc6d0\uacfc \uc544\uce68 \ucf54\ud14c\uc744 \uac19\uc774 \ud588\uc5c8\uc2b5\ub2c8\ub2e4. \uc9c0\ubaa9\ud55c \ubb38\uc81c\ub85c ",(0,a.jsx)(e.a,{href:"https://school.programmers.co.kr/learn/courses/30/lessons/120884",children:"\uce58\ud0a8 \ucfe0\ud3f0"}),"\ub97c \ud480\uc5c8\ub294\ub370 \ub3d9\ub8cc\uac00 ",(0,a.jsx)(e.code,{children:"divmod"})," \ub0b4\uc7a5\ud568\uc218\ub97c \uc54c\ub824\uc92c\uc2b5\ub2c8\ub2e4."]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"def solution(chicken: int) -> int:\n    # \uc11c\ube44\uc2a4 \uce58\ud0a8 0\uc5d0\uc11c \uc2dc\uc791\ud569\ub2c8\ub2e4.\n    maximumServiceChicken = 0\n\n    coupon = 0\n    # chicken \uc11c\ube44\uc2a4\ub97c \ubc1b\uc744 \uc218 \uc788\ub294 \ub3d9\uc548\n    while chicken >= 10:\n        # \uce58\ud0a8 10\uac1c\ub2f9\n        chicken, coupon = divmod(chicken, 10)\n        # \uc11c\ube44\uc2a4 \uce58\ud0a8 1\uac1c\ub97c \uba39\uc744 \uc218 \uc788\uc2b5\ub2c8\ub2e4.\n        maximumServiceChicken += chicken\n        # \uc11c\ube44\uc2a4 \uce58\ud0a8 10\uac1c\ub85c \uc11c\ube44\uc2a4 \uce58\ud0a8 1\uac1c\ub97c \uba39\uc744 \uc218 \uc788\uc2b5\ub2c8\ub2e4.\n        chicken += coupon\n    return maximumServiceChicken\n"})}),"\n",(0,a.jsx)(e.h2,{id:"combinations",children:"combinations"}),"\n",(0,a.jsx)(e.span,{className:"katex-display",children:(0,a.jsxs)(e.span,{className:"katex",children:[(0,a.jsx)(e.span,{className:"katex-mathml",children:(0,a.jsx)(e.math,{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block",children:(0,a.jsxs)(e.semantics,{children:[(0,a.jsxs)(e.mtable,{rowspacing:"0.25em",columnalign:"right",columnspacing:"",children:[(0,a.jsxs)(e.mtr,{children:[(0,a.jsx)(e.mtd,{className:"mtr-glue"}),(0,a.jsx)(e.mtd,{children:(0,a.jsx)(e.mstyle,{scriptlevel:"0",displaystyle:"true",children:(0,a.jsxs)(e.mrow,{children:[(0,a.jsx)(e.mi,{children:"n"}),(0,a.jsx)(e.mo,{stretchy:"false",children:"!"}),(0,a.jsx)(e.mo,{children:"="}),(0,a.jsx)(e.mi,{children:"n"}),(0,a.jsx)(e.mo,{children:"\u22c5"}),(0,a.jsx)(e.mo,{stretchy:"false",children:"("}),(0,a.jsx)(e.mi,{children:"n"}),(0,a.jsx)(e.mo,{children:"\u2212"}),(0,a.jsx)(e.mn,{children:"1"}),(0,a.jsx)(e.mo,{stretchy:"false",children:")"}),(0,a.jsx)(e.mo,{children:"\u22c5"}),(0,a.jsx)(e.mo,{stretchy:"false",children:"("}),(0,a.jsx)(e.mi,{children:"n"}),(0,a.jsx)(e.mo,{children:"\u2212"}),(0,a.jsx)(e.mn,{children:"2"}),(0,a.jsx)(e.mo,{stretchy:"false",children:")"}),(0,a.jsx)(e.mi,{mathvariant:"normal",children:"."}),(0,a.jsx)(e.mi,{mathvariant:"normal",children:"."}),(0,a.jsx)(e.mi,{mathvariant:"normal",children:"."}),(0,a.jsx)(e.mn,{children:"1"})]})})}),(0,a.jsx)(e.mtd,{className:"mtr-glue"}),(0,a.jsx)(e.mtd,{className:"mml-eqn-num"})]}),(0,a.jsxs)(e.mtr,{children:[(0,a.jsx)(e.mtd,{className:"mtr-glue"}),(0,a.jsx)(e.mtd,{children:(0,a.jsx)(e.mstyle,{scriptlevel:"0",displaystyle:"true",children:(0,a.jsx)(e.mrow,{})})}),(0,a.jsx)(e.mtd,{className:"mtr-glue"}),(0,a.jsx)(e.mtd,{className:"mml-eqn-num"})]}),(0,a.jsxs)(e.mtr,{children:[(0,a.jsx)(e.mtd,{className:"mtr-glue"}),(0,a.jsx)(e.mtd,{children:(0,a.jsx)(e.mstyle,{scriptlevel:"0",displaystyle:"true",children:(0,a.jsxs)(e.mrow,{children:[(0,a.jsxs)(e.msub,{children:[(0,a.jsx)(e.mrow,{}),(0,a.jsx)(e.mi,{children:"n"})]}),(0,a.jsxs)(e.msub,{children:[(0,a.jsx)(e.mi,{mathvariant:"normal",children:"P"}),(0,a.jsx)(e.mi,{children:"r"})]}),(0,a.jsx)(e.mo,{children:"="}),(0,a.jsxs)(e.mfrac,{children:[(0,a.jsxs)(e.mrow,{children:[(0,a.jsx)(e.mi,{children:"n"}),(0,a.jsx)(e.mo,{stretchy:"false",children:"!"})]}),(0,a.jsxs)(e.mrow,{children:[(0,a.jsx)(e.mo,{stretchy:"false",children:"("}),(0,a.jsx)(e.mi,{children:"n"}),(0,a.jsx)(e.mo,{children:"\u2212"}),(0,a.jsx)(e.mi,{children:"r"}),(0,a.jsx)(e.mo,{stretchy:"false",children:")"}),(0,a.jsx)(e.mo,{stretchy:"false",children:"!"})]})]})]})})}),(0,a.jsx)(e.mtd,{className:"mtr-glue"}),(0,a.jsx)(e.mtd,{className:"mml-eqn-num"})]}),(0,a.jsxs)(e.mtr,{children:[(0,a.jsx)(e.mtd,{className:"mtr-glue"}),(0,a.jsx)(e.mtd,{children:(0,a.jsx)(e.mstyle,{scriptlevel:"0",displaystyle:"true",children:(0,a.jsx)(e.mrow,{})})}),(0,a.jsx)(e.mtd,{className:"mtr-glue"}),(0,a.jsx)(e.mtd,{className:"mml-eqn-num"})]}),(0,a.jsxs)(e.mtr,{children:[(0,a.jsx)(e.mtd,{className:"mtr-glue"}),(0,a.jsx)(e.mtd,{children:(0,a.jsx)(e.mstyle,{scriptlevel:"0",displaystyle:"true",children:(0,a.jsxs)(e.mrow,{children:[(0,a.jsxs)(e.msub,{children:[(0,a.jsx)(e.mrow,{}),(0,a.jsx)(e.mi,{children:"n"})]}),(0,a.jsxs)(e.msub,{children:[(0,a.jsx)(e.mi,{mathvariant:"normal",children:"C"}),(0,a.jsx)(e.mi,{children:"r"})]}),(0,a.jsx)(e.mo,{children:"="}),(0,a.jsxs)(e.mfrac,{children:[(0,a.jsxs)(e.mrow,{children:[(0,a.jsx)(e.mi,{children:"n"}),(0,a.jsx)(e.mo,{stretchy:"false",children:"!"})]}),(0,a.jsxs)(e.mrow,{children:[(0,a.jsx)(e.mo,{stretchy:"false",children:"("}),(0,a.jsx)(e.mi,{children:"n"}),(0,a.jsx)(e.mo,{children:"\u2212"}),(0,a.jsx)(e.mi,{children:"r"}),(0,a.jsx)(e.mo,{stretchy:"false",children:")"}),(0,a.jsx)(e.mo,{stretchy:"false",children:"!"}),(0,a.jsx)(e.mo,{children:"\u22c5"}),(0,a.jsx)(e.mi,{children:"r"}),(0,a.jsx)(e.mo,{stretchy:"false",children:"!"})]})]})]})})}),(0,a.jsx)(e.mtd,{className:"mtr-glue"}),(0,a.jsx)(e.mtd,{className:"mml-eqn-num"})]})]}),(0,a.jsx)(e.annotation,{encoding:"application/x-tex",children:"\\begin{align}\nn! = n \\cdot (n-1) \\cdot (n-2) ... 1\n\\\\\n\\\\\n_{n}\\mathrm{P}_{r} = \\frac{n!}{(n-r)!}\n\\\\\n\\\\\n_{n}\\mathrm{C}_{r} = \\frac{n!}{(n-r)!\\cdot r!}\n\\end{align}"})]})})}),(0,a.jsxs)(e.span,{className:"katex-html","aria-hidden":"true",children:[(0,a.jsxs)(e.span,{className:"base",children:[(0,a.jsx)(e.span,{className:"strut",style:{height:"9.7149em",verticalAlign:"-4.6074em"}}),(0,a.jsx)(e.span,{className:"mtable",children:(0,a.jsx)(e.span,{className:"col-align-r",children:(0,a.jsxs)(e.span,{className:"vlist-t vlist-t2",children:[(0,a.jsxs)(e.span,{className:"vlist-r",children:[(0,a.jsxs)(e.span,{className:"vlist",style:{height:"5.1074em"},children:[(0,a.jsxs)(e.span,{style:{top:"-7.6389em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"3.3714em"}}),(0,a.jsxs)(e.span,{className:"mord",children:[(0,a.jsx)(e.span,{className:"mord mathnormal",children:"n"}),(0,a.jsx)(e.span,{className:"mclose",children:"!"}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,a.jsx)(e.span,{className:"mrel",children:"="}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,a.jsx)(e.span,{className:"mord mathnormal",children:"n"}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,a.jsx)(e.span,{className:"mbin",children:"\u22c5"}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,a.jsx)(e.span,{className:"mopen",children:"("}),(0,a.jsx)(e.span,{className:"mord mathnormal",children:"n"}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,a.jsx)(e.span,{className:"mbin",children:"\u2212"}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,a.jsx)(e.span,{className:"mord",children:"1"}),(0,a.jsx)(e.span,{className:"mclose",children:")"}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,a.jsx)(e.span,{className:"mbin",children:"\u22c5"}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,a.jsx)(e.span,{className:"mopen",children:"("}),(0,a.jsx)(e.span,{className:"mord mathnormal",children:"n"}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,a.jsx)(e.span,{className:"mbin",children:"\u2212"}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,a.jsx)(e.span,{className:"mord",children:"2"}),(0,a.jsx)(e.span,{className:"mclose",children:")"}),(0,a.jsx)(e.span,{className:"mord",children:"...1"})]})]}),(0,a.jsxs)(e.span,{style:{top:"-6.1389em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"3.3714em"}}),(0,a.jsx)(e.span,{className:"mord"})]}),(0,a.jsxs)(e.span,{style:{top:"-4.1074em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"3.3714em"}}),(0,a.jsxs)(e.span,{className:"mord",children:[(0,a.jsxs)(e.span,{className:"mord",children:[(0,a.jsx)(e.span,{}),(0,a.jsx)(e.span,{className:"msupsub",children:(0,a.jsxs)(e.span,{className:"vlist-t vlist-t2",children:[(0,a.jsxs)(e.span,{className:"vlist-r",children:[(0,a.jsx)(e.span,{className:"vlist",style:{height:"0.1514em"},children:(0,a.jsxs)(e.span,{style:{top:"-2.55em",marginRight:"0.05em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"2.7em"}}),(0,a.jsx)(e.span,{className:"sizing reset-size6 size3 mtight",children:(0,a.jsx)(e.span,{className:"mord mtight",children:(0,a.jsx)(e.span,{className:"mord mathnormal mtight",children:"n"})})})]})}),(0,a.jsx)(e.span,{className:"vlist-s",children:"\u200b"})]}),(0,a.jsx)(e.span,{className:"vlist-r",children:(0,a.jsx)(e.span,{className:"vlist",style:{height:"0.15em"},children:(0,a.jsx)(e.span,{})})})]})})]}),(0,a.jsxs)(e.span,{className:"mord",children:[(0,a.jsx)(e.span,{className:"mord mathrm",children:"P"}),(0,a.jsx)(e.span,{className:"msupsub",children:(0,a.jsxs)(e.span,{className:"vlist-t vlist-t2",children:[(0,a.jsxs)(e.span,{className:"vlist-r",children:[(0,a.jsx)(e.span,{className:"vlist",style:{height:"0.1514em"},children:(0,a.jsxs)(e.span,{style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"2.7em"}}),(0,a.jsx)(e.span,{className:"sizing reset-size6 size3 mtight",children:(0,a.jsx)(e.span,{className:"mord mtight",children:(0,a.jsx)(e.span,{className:"mord mathnormal mtight",style:{marginRight:"0.02778em"},children:"r"})})})]})}),(0,a.jsx)(e.span,{className:"vlist-s",children:"\u200b"})]}),(0,a.jsx)(e.span,{className:"vlist-r",children:(0,a.jsx)(e.span,{className:"vlist",style:{height:"0.15em"},children:(0,a.jsx)(e.span,{})})})]})})]}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,a.jsx)(e.span,{className:"mrel",children:"="}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,a.jsxs)(e.span,{className:"mord",children:[(0,a.jsx)(e.span,{className:"mopen nulldelimiter"}),(0,a.jsx)(e.span,{className:"mfrac",children:(0,a.jsxs)(e.span,{className:"vlist-t vlist-t2",children:[(0,a.jsxs)(e.span,{className:"vlist-r",children:[(0,a.jsxs)(e.span,{className:"vlist",style:{height:"1.3714em"},children:[(0,a.jsxs)(e.span,{style:{top:"-2.314em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"3em"}}),(0,a.jsxs)(e.span,{className:"mord",children:[(0,a.jsx)(e.span,{className:"mopen",children:"("}),(0,a.jsx)(e.span,{className:"mord mathnormal",children:"n"}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,a.jsx)(e.span,{className:"mbin",children:"\u2212"}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,a.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.02778em"},children:"r"}),(0,a.jsx)(e.span,{className:"mclose",children:")!"})]})]}),(0,a.jsxs)(e.span,{style:{top:"-3.23em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"3em"}}),(0,a.jsx)(e.span,{className:"frac-line",style:{borderBottomWidth:"0.04em"}})]}),(0,a.jsxs)(e.span,{style:{top:"-3.677em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"3em"}}),(0,a.jsxs)(e.span,{className:"mord",children:[(0,a.jsx)(e.span,{className:"mord mathnormal",children:"n"}),(0,a.jsx)(e.span,{className:"mclose",children:"!"})]})]})]}),(0,a.jsx)(e.span,{className:"vlist-s",children:"\u200b"})]}),(0,a.jsx)(e.span,{className:"vlist-r",children:(0,a.jsx)(e.span,{className:"vlist",style:{height:"0.936em"},children:(0,a.jsx)(e.span,{})})})]})}),(0,a.jsx)(e.span,{className:"mclose nulldelimiter"})]})]})]}),(0,a.jsxs)(e.span,{style:{top:"-2.0314em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"3.3714em"}}),(0,a.jsx)(e.span,{className:"mord"})]}),(0,a.jsxs)(e.span,{style:{top:"0em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"3.3714em"}}),(0,a.jsxs)(e.span,{className:"mord",children:[(0,a.jsxs)(e.span,{className:"mord",children:[(0,a.jsx)(e.span,{}),(0,a.jsx)(e.span,{className:"msupsub",children:(0,a.jsxs)(e.span,{className:"vlist-t vlist-t2",children:[(0,a.jsxs)(e.span,{className:"vlist-r",children:[(0,a.jsx)(e.span,{className:"vlist",style:{height:"0.1514em"},children:(0,a.jsxs)(e.span,{style:{top:"-2.55em",marginRight:"0.05em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"2.7em"}}),(0,a.jsx)(e.span,{className:"sizing reset-size6 size3 mtight",children:(0,a.jsx)(e.span,{className:"mord mtight",children:(0,a.jsx)(e.span,{className:"mord mathnormal mtight",children:"n"})})})]})}),(0,a.jsx)(e.span,{className:"vlist-s",children:"\u200b"})]}),(0,a.jsx)(e.span,{className:"vlist-r",children:(0,a.jsx)(e.span,{className:"vlist",style:{height:"0.15em"},children:(0,a.jsx)(e.span,{})})})]})})]}),(0,a.jsxs)(e.span,{className:"mord",children:[(0,a.jsx)(e.span,{className:"mord mathrm",children:"C"}),(0,a.jsx)(e.span,{className:"msupsub",children:(0,a.jsxs)(e.span,{className:"vlist-t vlist-t2",children:[(0,a.jsxs)(e.span,{className:"vlist-r",children:[(0,a.jsx)(e.span,{className:"vlist",style:{height:"0.1514em"},children:(0,a.jsxs)(e.span,{style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"2.7em"}}),(0,a.jsx)(e.span,{className:"sizing reset-size6 size3 mtight",children:(0,a.jsx)(e.span,{className:"mord mtight",children:(0,a.jsx)(e.span,{className:"mord mathnormal mtight",style:{marginRight:"0.02778em"},children:"r"})})})]})}),(0,a.jsx)(e.span,{className:"vlist-s",children:"\u200b"})]}),(0,a.jsx)(e.span,{className:"vlist-r",children:(0,a.jsx)(e.span,{className:"vlist",style:{height:"0.15em"},children:(0,a.jsx)(e.span,{})})})]})})]}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,a.jsx)(e.span,{className:"mrel",children:"="}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,a.jsxs)(e.span,{className:"mord",children:[(0,a.jsx)(e.span,{className:"mopen nulldelimiter"}),(0,a.jsx)(e.span,{className:"mfrac",children:(0,a.jsxs)(e.span,{className:"vlist-t vlist-t2",children:[(0,a.jsxs)(e.span,{className:"vlist-r",children:[(0,a.jsxs)(e.span,{className:"vlist",style:{height:"1.3714em"},children:[(0,a.jsxs)(e.span,{style:{top:"-2.314em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"3em"}}),(0,a.jsxs)(e.span,{className:"mord",children:[(0,a.jsx)(e.span,{className:"mopen",children:"("}),(0,a.jsx)(e.span,{className:"mord mathnormal",children:"n"}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,a.jsx)(e.span,{className:"mbin",children:"\u2212"}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,a.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.02778em"},children:"r"}),(0,a.jsx)(e.span,{className:"mclose",children:")!"}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,a.jsx)(e.span,{className:"mbin",children:"\u22c5"}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,a.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.02778em"},children:"r"}),(0,a.jsx)(e.span,{className:"mclose",children:"!"})]})]}),(0,a.jsxs)(e.span,{style:{top:"-3.23em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"3em"}}),(0,a.jsx)(e.span,{className:"frac-line",style:{borderBottomWidth:"0.04em"}})]}),(0,a.jsxs)(e.span,{style:{top:"-3.677em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"3em"}}),(0,a.jsxs)(e.span,{className:"mord",children:[(0,a.jsx)(e.span,{className:"mord mathnormal",children:"n"}),(0,a.jsx)(e.span,{className:"mclose",children:"!"})]})]})]}),(0,a.jsx)(e.span,{className:"vlist-s",children:"\u200b"})]}),(0,a.jsx)(e.span,{className:"vlist-r",children:(0,a.jsx)(e.span,{className:"vlist",style:{height:"0.936em"},children:(0,a.jsx)(e.span,{})})})]})}),(0,a.jsx)(e.span,{className:"mclose nulldelimiter"})]})]})]})]}),(0,a.jsx)(e.span,{className:"vlist-s",children:"\u200b"})]}),(0,a.jsx)(e.span,{className:"vlist-r",children:(0,a.jsx)(e.span,{className:"vlist",style:{height:"4.6074em"},children:(0,a.jsx)(e.span,{})})})]})})})]}),(0,a.jsx)(e.span,{className:"tag",children:(0,a.jsxs)(e.span,{className:"vlist-t vlist-t2",children:[(0,a.jsxs)(e.span,{className:"vlist-r",children:[(0,a.jsxs)(e.span,{className:"vlist",style:{height:"5.1074em"},children:[(0,a.jsxs)(e.span,{style:{top:"-7.6389em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"3.3714em"}}),(0,a.jsx)(e.span,{className:"eqn-num"})]}),(0,a.jsxs)(e.span,{style:{top:"-6.1389em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"3.3714em"}}),(0,a.jsx)(e.span,{className:"eqn-num"})]}),(0,a.jsxs)(e.span,{style:{top:"-4.1074em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"3.3714em"}}),(0,a.jsx)(e.span,{className:"eqn-num"})]}),(0,a.jsxs)(e.span,{style:{top:"-2.0314em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"3.3714em"}}),(0,a.jsx)(e.span,{className:"eqn-num"})]}),(0,a.jsxs)(e.span,{style:{top:"0em"},children:[(0,a.jsx)(e.span,{className:"pstrut",style:{height:"3.3714em"}}),(0,a.jsx)(e.span,{className:"eqn-num"})]})]}),(0,a.jsx)(e.span,{className:"vlist-s",children:"\u200b"})]}),(0,a.jsx)(e.span,{className:"vlist-r",children:(0,a.jsx)(e.span,{className:"vlist",style:{height:"4.6074em"},children:(0,a.jsx)(e.span,{})})})]})})]})]})}),"\n",(0,a.jsx)(e.p,{children:"\uc704\ub294 \ud329\ud1a0\ub9ac\uc5bc, \uc21c\uc5f4, \uc870\ud569 \uacf5\uc2dd\ub4e4\uc785\ub2c8\ub2e4."}),"\n",(0,a.jsx)(e.p,{children:"\uc5ec\uae30\uc11c \ud30c\uc774\uc36c\uc5d0\ub294 \uc870\ud569\uc744 \ub2e4\ub8e8\ub294 \ubaa8\ub4c8\ub3c4 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-py",children:"from itertools import combinations\n\n# 3 \u2264 len(number) \u2264 13\n# min(number) = -1000, max(number) = 1000\ndef solution(numbers: list) -> int:\n    '''\n    3\uac1c\uc758 \uc815\uc218\ub97c \ubf51\uc544 \ub354\ud574\uc11c 0\uc774 \ub418\ub294 \uacbd\uc6b0\uc758 \uc218\ub97c \uad6c\uc0ac\uc2dc\uc624.\n    '''\n    result = 0\n    for combo in list(combinations(numbers, 3)):\n        if sum(combo) == 0: result += 1\n\n    return result\n"})}),"\n",(0,a.jsxs)(e.p,{children:[(0,a.jsx)(e.a,{href:"https://school.programmers.co.kr/learn/courses/30/lessons/131705",children:"\uc0bc\ucd1d\uc0ac"}),"\uc5d0 \uc774\ub7f0 \ud480\uc774\uc640 \uc751\uc6a9\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4."]}),"\n",(0,a.jsxs)(e.section,{"data-footnotes":!0,className:"footnotes",children:[(0,a.jsx)(e.h2,{className:"sr-only",id:"footnote-label",children:"Footnotes"}),"\n",(0,a.jsxs)(e.ol,{children:["\n",(0,a.jsxs)(e.li,{id:"user-content-fn-1",children:["\n",(0,a.jsxs)(e.p,{children:[(0,a.jsx)(e.a,{href:"https://www.w3schools.com/python/python_lists_comprehension.asp",children:"Python - List Comprehension"})," ",(0,a.jsx)(e.a,{href:"#user-content-fnref-1","data-footnote-backref":"","aria-label":"Back to reference 1",className:"data-footnote-backref",children:"\u21a9"})]}),"\n"]}),"\n"]}),"\n"]})]})}function d(s={}){const{wrapper:e}={...(0,l.a)(),...s.components};return e?(0,a.jsx)(e,{...s,children:(0,a.jsx)(h,{...s})}):h(s)}},11151:(s,e,n)=>{n.d(e,{Z:()=>c,a:()=>i});var a=n(67294);const l={},r=a.createContext(l);function i(s){const e=a.useContext(r);return a.useMemo((function(){return"function"==typeof s?s(e):{...e,...s}}),[e,s])}function c(s){let e;return e=s.disableParentContext?"function"==typeof s.components?s.components(l):s.components||l:i(s.components),a.createElement(r.Provider,{value:e},s.children)}}}]);