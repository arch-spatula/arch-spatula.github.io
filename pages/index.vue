<script lang="ts" setup>
import type { QueryBuilderParams } from "@nuxt/content";

const search = ref("");
useHead({
  title: "Arch-Spatula의 레시피",
});
//arch-spatula:
// name: arch-spatula
// title: Cook-Book 많이 만듭니다
// url: https://github.com/arch-spatula
// image_url: https://github.com/arch-spatula.png
/**
 * TODO: 쿼리 파라미터 활용하기
 * 쿼리 파라미터를 기준으로 현재 선택한 태그 보여주기
 */
// const contentQuery = ref<ParsedContent[]>([]);
// TODO: 전체 태그를 사전에 모두 가져오기
// 모든 태그는 언급횟수를 갖고 있음
// tag ui에는 왼쪽에는 텍스트 오른쪽에는 숫자가 나옴
const tags = ref<Map<string, number>>(new Map());

await queryContent("blogs")
  .find()
  .then((res) => res.map((elem) => elem?.tags))
  .then((res: string[][]) => {
    res.sort().forEach((elems) => {
      elems.forEach((elem) => {
        if (tags.value.get(elem)) {
          tags.value.set(elem, tags.value.get(elem) + 1);
        } else {
          tags.value.set(elem, 1);
        }
      });
    });
  });

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
  <main :class="$style.main">

    <div :class="$style['input-warrper']">
      <input placeholder="제목, 설명과 일치하는 부분을 남깁니다." :class="$style.input" v-model="search" />
    </div>
    <div :class="$style['filter-warrper']">
      <button
        :class="
          selectedTags.includes(tag[0])
            ? $style['selected-tag']
            : $style['default-tag']
        "
        v-for="tag in tags"
        @click="
          () => {
            const idx = selectedTags.findIndex((val) => val === tag[0]);
            if (idx === -1) {
              selectedTags.push(tag[0]);
            } else {
              selectedTags.splice(idx, 1);
            }
          }
        "
      >
        {{ tag[0] }} {{ tag[1] }}
      </button>
    </div>
    <ContentList :query="query" path="/blogs" v-slot="{ list }">
      <div v-for="blog in list" :key="blog._path">
        <div
          :class="$style['blog-item']"
          v-show="
            (blog.title?.includes(search) ||
              blog.description?.includes(search)) &&
            (!selectedTags.length ||
              selectedTags?.some((elem) => blog?.tags?.includes(elem)))
          "
        >
          <NuxtLink :to="blog._path" :class="$style.link">
            <h2 :class="$style.title">{{ blog.title }}</h2>
            <p :class="$style.description">{{ blog.description }}</p>
          </NuxtLink>
          <div :class="$style['tag-warpper']">
            <button
              v-for="tag in blog.tags"
              :class="
                selectedTags.includes(tag)
                  ? $style['selected-tag']
                  : $style['default-tag']
              "
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
          <p :class="$style.date">
            {{ blog.date.toString().split("T")[0] }}
          </p>
        </div>
      </div>
    </ContentList>
  </main>
</template>
<style module>
.input-warrper {
	width: 730px;
	margin: 40px 80px;
}
.input {
  all: unset;
	width: 100%;
  border: solid 2px #c5d1de;
  border-radius: 8px;
  height: 40px;
  box-sizing: border-box;
  padding: 8px 12px;
  background-color: #22272e;
  line-height: 1.25;
  font-size: 16px;
  color: #c5d1de;
}
.input:hover {
  border: solid 2px #478be6;
}
.input:focus {
  border: solid 2px #478be6;
}

.main {
  margin: 0 auto;
  max-width: 890px;
  position: relative;
  /* background-color: #fff; */
}

.blog-item {
  line-height: 20px;
  padding: 32px 80px 8px 80px;
  position: relative;
  /* background-color: #444c56b3; */
  margin: 20px 0;
  border-radius: 16px;
  border: solid 2px #444c56b3;
}

.blog-item:hover {
  border: solid 2px #c5d1de;
  animation-duration: 0.3s;
  animation-name: hoverin;
}

@keyframes hoverin {
  from {
    border: solid 2px #444c56b3;
  }

  to {
    border: solid 2px #c5d1de;
  }
}

.link {
  color: #c5d1de;
}
.link:hover {
  color: #478be6;
}

.title {
  font-size: 32px;
  line-height: 1.25;
  font-weight: 600;
  margin: 8px 0 4px;
}
.description {
  font-size: 16px;
}
.date {
  color: #6b7280;
  font-size: 14px;
}

.tag-warpper {
  margin: 4px 0 0;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-warrper {
  margin: 4px 0 0;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  padding: 0px 80px 20px;
  /* border-bottom: solid 2px #ffffff; */
  margin: 0 0 40px;
}

.default-tag {
  all: unset;
  cursor: pointer;
  color: #c5d1de;
  border: solid 2px #c5d1de;
  border-radius: 8px;
  height: 36px;
  padding: 8px 12px 4px;
  font-size: 16px;
  line-height: 1.25;
  background-color: none;
  box-sizing: border-box;
  display: flex;
  align-item: center;
  justify-content: center;
}
.default-tag:hover {
  color: #478be6;
  background-color: none;
  border: solid 2px #478be6;
}

.selected-tag {
  all: unset;
  cursor: pointer;
  color: #478be6;
  border: solid 2px #478be6;
  border-radius: 8px;
  height: 36px;
  padding: 8px 12px 4px;
  font-size: 16px;
  line-height: 1.25;
  background-color: none;
  box-sizing: border-box;
  display: flex;
  align-item: center;
  justify-content: center;
}
.selected-tag:hover {
  color: color-mix(in oklab, #478be6 50%, #c5d1de);
  background-color: none;
  border: solid 2px color-mix(in oklab, #478be6 50%, #c5d1de);
}
</style>
