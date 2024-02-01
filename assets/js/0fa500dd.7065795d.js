"use strict";(self.webpackChunkarch_spatula_github_io=self.webpackChunkarch_spatula_github_io||[]).push([[24966],{53558:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>s,metadata:()=>c,toc:()=>i});var n=r(85893),o=r(11151);const s={title:"switch case \ub9ac\ud329\ud1a0\ub9c1 \uc804\ub7b5",authors:["arch-spatula"],tags:["refactoring","JavaScript","switch case"],description:"switch case\ub97c \uc0ac\uc6a9\ud560 \uc218 \uc788\ub294 \uc0c1\ud669\uc774\uba74 `map` \ud639\uc740 `object`\ub97c \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",toc_max_heading_level:6},a="switch case \ub9ac\ud329\ud1a0\ub9c1 \uc804\ub7b5",c={permalink:"/blog/2023/06/23/refactor-switch-case",editUrl:"https://github.com/arch-spatula/arch-spatula.github.io/blob/dev/blog/2023-06-23-refactor-switch-case.md",source:"@site/blog/2023-06-23-refactor-switch-case.md",title:"switch case \ub9ac\ud329\ud1a0\ub9c1 \uc804\ub7b5",description:"switch case\ub97c \uc0ac\uc6a9\ud560 \uc218 \uc788\ub294 \uc0c1\ud669\uc774\uba74 `map` \ud639\uc740 `object`\ub97c \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",date:"2023-06-23T00:00:00.000Z",formattedDate:"2023\ub144 6\uc6d4 23\uc77c",tags:[{label:"refactoring",permalink:"/blog/tags/refactoring"},{label:"JavaScript",permalink:"/blog/tags/java-script"},{label:"switch case",permalink:"/blog/tags/switch-case"}],readingTime:1.51,hasTruncateMarker:!0,authors:[{name:"arch-spatula",title:"Cook-Book \ub9ce\uc774 \ub9cc\ub4ed\ub2c8\ub2e4",url:"https://github.com/arch-spatula",imageURL:"https://github.com/arch-spatula.png",key:"arch-spatula"}],frontMatter:{title:"switch case \ub9ac\ud329\ud1a0\ub9c1 \uc804\ub7b5",authors:["arch-spatula"],tags:["refactoring","JavaScript","switch case"],description:"switch case\ub97c \uc0ac\uc6a9\ud560 \uc218 \uc788\ub294 \uc0c1\ud669\uc774\uba74 `map` \ud639\uc740 `object`\ub97c \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",toc_max_heading_level:6},unlisted:!1,prevItem:{title:"Jotai provider",permalink:"/blog/2023/06/24/"},nextItem:{title:"\ub85c\uadf8\uc544\uc6c3 \ud1b5\uc2e0 \uae30\ub9cc...",permalink:"/blog/2023/06/23/"}},l={authorsImageUrls:[void 0]},i=[];function p(e){const t={code:"code",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:["switch case\ub97c \uc0ac\uc6a9\ud560 \uc218 \uc788\ub294 \uc0c1\ud669\uc774\uba74 ",(0,n.jsx)(t.code,{children:"map"})," \ud639\uc740 ",(0,n.jsx)(t.code,{children:"object"}),"\ub97c \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc800\ub294 \uc2e0\uc785 \uc5d4\uc9c0\ub2c8\uc5b4\ub77c\uc11c \ubb34\uc870\uac74 \uc548\ud2f0\ud328\ud134\uc774\uace0 \ucf54\ub4dc \uc2a4\uba5c\uc774\ub77c\uace0 \uac15\ud558\uac8c \uc8fc\uc7a5\ud574\uc57c \ud558\uae30\ub294 \ud558\uc9c0\ub9cc \ubcc4\ub85c \uadf8\ub807\uac8c \ud558\uace0 \uc2f6\uc9c0\ub294 \uc54a\uc2b5\ub2c8\ub2e4. \uc800\ub294 \uac1c\uc778\uc801\uc73c\ub85c \uc0dd\uac01\uc774 \ubcf5\uc7a1\ud560 \ub54c\ub294 \uc0ac\uc6a9\ud574\ub3c4 \uad1c\ucc2e\ub2e4\uace0 \ubd05\ub2c8\ub2e4."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-tsx",children:"export const HelperText = styled.p<{\n  helperTextColor: 'warning' | 'success' | 'information' | 'normal';\n}>`\n  ${(props) => props.theme.fonts.body14Regular}\n  color: ${(props) => {\n    switch (props.helperTextColor) {\n      case 'normal':\n        return props.theme.colors.black;\n      case 'success':\n        return props.theme.colors.green;\n      case 'warning':\n        return props.theme.colors.red;\n      case 'information':\n        return props.theme.colors.blue;\n      default:\n        return props.theme.colors.black;\n    }\n  }};\n  min-height: 1.5rem;\n`;\n"})}),"\n",(0,n.jsx)(t.p,{children:"switch case \ubb38\uc740 \ubcf4\uc218\ud558\uae30 \uc26c\uc6b4 \ud3b8\uc740 \ub9de\uc2b5\ub2c8\ub2e4. \ud558\uc9c0\ub9cc \uc120\ud615 \uc2dc\uac04 \ubcf5\uc7a1\uc131\uc744 \uac16\uc2b5\ub2c8\ub2e4. \uc870\uac74\uc5d0 \ud574\ub2f9\ud560 \ub54c\uae4c\uc9c0 \uacc4\uc18d \ube44\uad50\ud569\ub2c8\ub2e4. \uc5b8\uc5b4 \uc0c1\uc138 \uc2a4\ud399\ub9c8\ub2e4 \ub2e4\ub985\ub2c8\ub2e4."}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-tsx",children:"export const HelperText = styled.p<{\n  helperTextColor: 'warning' | 'success' | 'information' | 'normal';\n}>`\n  ${(props) => props.theme.fonts.body14Regular}\n  color: ${(props) => {\n    const colorMap = {\n      normal: props.theme.colors.black,\n      success: props.theme.colors.green500,\n      warning: props.theme.colors.red500,\n      information: props.theme.colors.blue500,\n    } as const;\n\n    return colorMap[props.helperTextColor];\n  }};\n  min-height: 1.5rem;\n`;\n"})}),"\n",(0,n.jsx)(t.p,{children:"\uc774\ub807\uac8c \ub9ac\ud329\ud1a0\ub9c1\ud588\uc2b5\ub2c8\ub2e4. \uac1d\uccb4\ub97c \uc0dd\uc131\ud558\uace0 \uc0ad\uc81c\ud558\ub294 \ubb38\uc81c\uac00 \uc788\uc9c0\ub9cc \uac1d\uccb4\uc5d0\uc11c \uc0c1\uc218\uc2dc\uac04\uc73c\ub85c \uc77d\uac8c \ub429\ub2c8\ub2e4."})]})}function h(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(p,{...e})}):p(e)}},11151:(e,t,r)=>{r.d(t,{Z:()=>c,a:()=>a});var n=r(67294);const o={},s=n.createContext(o);function a(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);