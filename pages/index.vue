<script lang="ts" setup>
import type { QueryBuilderParams } from "@nuxt/content";

const search = ref("");

//arch-spatula:
// name: arch-spatula
// title: Cook-Book 많이 만듭니다
// url: https://github.com/arch-spatula
//image_url: https://github.com/arch-spatula.png
/**
 * TODO: 쿼리 파라미터 활용하기
 * 쿼리 파라미터를 기준으로 현재 선택한 태그 보여주기
 */
// const contentQuery = ref<ParsedContent[]>([]);
// TODO: 전체 태그를 사전에 모두 가져오기
// 모든 태그는 언급횟수를 갖고 있음
// tag ui에는 왼쪽에는 텍스트 오른쪽에는 숫자가 나옴
const contentQuery = ref<string[]>([]);

contentQuery.value = await queryContent("blogs")
  .find()
  .then((res) => res.map((elem) => elem?.tags));

const query: QueryBuilderParams = {
  sort: [{ date: -1 }],
};
/**
 * NOTE: 없으면 전체 선택
 * 클릭하면 로직 실행
 * 없으면 추가하고 있으면 제거하기
 * 0개면 true하고 다음 로직들을 생략
 * 태그가 있으면 블로그 태그 목록 중에 있는 목록만 보여줌
 */
const selectedTags = ref<string[]>([]);
/**
 * TODO: 쿼리로 날짜 최신순으로 정렬하기
 */
</script>

<template>
  <main>
    <input :class="$style.input" v-model="search" />
    <ContentList :query="query" path="/blogs" v-slot="{ list }">
      <div v-for="blog in list" :key="blog._path">
        <div
          v-show="
            (blog.title?.includes(search) ||
              blog.description?.includes(search)) &&
            (!selectedTags.length ||
              selectedTags?.some((elem) => blog?.tags?.includes(elem)))
          "
        >
          <NuxtLink :to="blog._path">
            <h2>{{ blog.title }}</h2>
            <p>{{ blog.description }}</p>
            <p>{{ blog.date }}</p>
          </NuxtLink>
          <div v-for="tag in blog.tags">
            <button
              @click="
                () => {
                  const idx = selectedTags.findIndex((val) => val === tag);
                  if (idx === -1) {
                    selectedTags.push(tag);
                  } else {
                    selectedTags.splice(idx, 1);
                  }
                }
              "
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>
    </ContentList>
  </main>
</template>
<style module>
.input {
  border: solid 1px black;
  border-radius: 4px;
  height: 32px;
  box-sizing: border-box;
  padding: 8px 12px;
}
.input:focus {
  border: solid 2px #4f46e5;
}
</style>
