---
sidebar_position: 1
---

# Vue 시작하기

개인적으로 회사에 취업에 성공하고 중심 기술 스택이 vue라서 학습하기로 결정했습니다.

갖고 있는 특징이라고 하면 SPA 중 난이도가 낮다고 합니다. 프론트엔드 개발자로서 그것은 잘 모르겠습니다. 하지만 리액트보다 좋은 점들이 있습니다. 컴포넌트 관심사 설계가 잘 되어 있습니다.

## 학습리소스

[캡틴 판교 Vue.js](https://joshua1988.github.io/vuejs/)

[Cracking Vue.js](https://joshua1988.github.io/vue-camp/textbook.html)

[learnvue 유튜브 채널](https://www.youtube.com/learnvue)

[Vue Mastery](https://www.vuemastery.com/)

[Vue School](https://vueschool.io/)

[Simple Vue](https://simplevue.gitbook.io/intro/)

[Vue Test Utils](https://test-utils.vuejs.org/)

[VueUse](https://vueuse.org/)

## 최신 방법으로 설치하기(Modern install)

```sh
pnpm create vite .
```

작업할 폴더에서 위 명령하기 바랍니다.

1. Select a framework: › Vue

2. Select a variant: › Customize with create-vue ↗

3. Package name: … `알아서 작명`

4. TypeScript? … No / **Yes**
5. JSX Support? … **No** / Yes
6. Vue Router for Single Page Application development? … No / **Yes**
7. Pinia for state management? … No / **Yes**
8. Vitest for Unit Testing? … No / **Yes**
9. an End-to-End Testing Solution? › **Cypress**
10. ESLint for code quality? … No / **Yes**
11. Prettier for code formatting? … No / **Yes**

위처럼 마법사에서 선택하기 바랍니다.

타입스크립트, `Vue Router`, `Pinia`, `Vitest`, `Cypress`를 기술 스택으로 선택하기 바랍니다. 꽤 안정적이라는 느낌이 드는 강력한 조합입니다. 여기에 `Axios`만 추가로 설치해주면 충분할 것입니다. 조금더 통신에 대한 상태관리를 정교하게 하고 싶으면 `VueQuery`를 추가하면 됩니다.

```sh
pnpm i axios
```

```sh
pnpm i vue-query
```

Nuxt를 사용하고 있지 않으면 위 설치는 나름 고려해볼 만할 것입니다.
