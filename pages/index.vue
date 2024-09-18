<script lang="ts" setup>
const search = ref("");

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
/**
 * NOTE: 없으면 전체 선택
 * 클릭하면 로직 실행
 * 없으면 추가하고 있으면 제거하기
 * 0개면 true하고 다음 로직들을 생략
 * 태그가 있으면 블로그 태그 목록 중에 있는 목록만 보여줌
 */
const selectedTags = ref<string[]>([]);
</script>

<template>
  <main>
    <input v-model="search" />
    <ContentList path="/blogs" v-slot="{ list }">
      <div v-for="blog in list" :key="blog._path">
        <div
          v-if="
            (blog.title?.includes(search) ||
              blog.description.includes(search)) &&
            (!selectedTags.length ||
              selectedTags?.some((elem) => blog?.tags?.includes(elem)))
          "
        >
          <NuxtLink :to="blog._path">
            <h2>{{ blog.title }}</h2>
            <p>{{ blog.description }}</p>
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
