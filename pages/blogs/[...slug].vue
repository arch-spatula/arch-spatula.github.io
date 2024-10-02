<template>
  <main :class="$style.main">
    <ContentDoc>
      <template v-slot="{ doc }">
        <article>
          <div :class="$style['toc-warpper']">
            <div v-for="item in toc">
              <NuxtLink
                :class="$style['heading-link']"
                :to="`#${item.heading}`"
                :style="{ padding: `0 0 0 ${(item.depth - 1) * 24}px` }"
                >{{ item.heading }}</NuxtLink
              >
            </div>
          </div>
          <!-- <h1>{{ doc.title }}</h1> -->
          <div :class="$style['tag-warpper']">
            <div v-for="tag in doc.tags ?? []" :class="$style['default-tag']">
              {{ tag }}
            </div>
          </div>
          <ContentRenderer
            id="DocContent"
            class="markdown-body dark_dimmed"
            :value="doc"
          />
        </article>
      </template>
      <template #not-found>
        <h1>Document not found</h1>
      </template>
    </ContentDoc>
    <div :class="$style['page-nav-wrapper']">
      <NuxtLink
        v-if="prevPage?._path"
        :class="$style['nav-item']"
        :to="prevPage?._path"
      >
        <div :class="$style.title">{{ prevPage.title }}</div>
        <NuxtImg :class="$style.svg" src="/square-arrow-left.svg" height="32" />
      </NuxtLink>
      <NuxtLink
        :to="nextPage?._path"
        v-if="nextPage?._path"
        :class="$style['nav-item']"
      >
        <div :class="$style.title">{{ nextPage.title }}</div>
        <NuxtImg
          :class="$style.svg"
          src="/square-arrow-right.svg"
          height="32"
        />
      </NuxtLink>
    </div>
    <Comment />
  </main>
</template>

<script setup lang="ts">
/**
 * @see https://stackoverflow.com/questions/6838104/pure-javascript-method-to-wrap-content-in-a-div
 */
function wrap(el: Element, wrapper: Element) {
  if (el.parentNode) el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}
/**
 * 기능 자체는 동작함
 * TODO: 아이콘이 붙게 만들어야 함.
 */
const addBtn = (id: string) => {
  const docContent = document.getElementById(id);
  const preElements = docContent?.querySelectorAll("pre");

  preElements?.forEach(function (preElement) {
    const codeblockWrapper = document.createElement("div");
    codeblockWrapper.classList.add("code-block-wraper");

    wrap(preElement, codeblockWrapper);

    const childDiv = preElement.querySelector("div");
    if (childDiv) return;

    const button = document.createElement("button");
    button.classList.add("copyBtn");
    button.classList.add("btn");
    button.ariaLabel = "copy button";

    button.addEventListener("click", function () {
      button.classList.replace("copyBtn", "clickedCopyBtn");

      const content = preElement.textContent ?? "";
      navigator.clipboard.writeText(content);

      // reset to old copyIcon after 1s
      setTimeout(
        () => button.classList.replace("clickedCopyBtn", "copyBtn"),
        2000,
      );
    });

    const warrper = document.createElement("div");
    warrper.classList.add("copy-warrper");

    warrper.appendChild(button);
    codeblockWrapper.appendChild(warrper);
  });
};

const route = useRoute();
const { navPageFromPath } = useContentHelpers();
const { data: navigation } = await useAsyncData("blogs", () =>
  fetchContentNavigation(),
);

type PageItem = {
  title: string;
  _path: string;
  _draft?: boolean;
};

const prevPage = ref<{ title: string; _path: string } | null>(null);
const nextPage = ref<{ title: string; _path: string } | null>(null);

const page = navPageFromPath(route.path, navigation.value);

for (let idx = 0; idx < navigation.value[0]?.children.length; idx++) {
  const elem = navigation.value[0]?.children[idx] as PageItem;
  let prev: null | PageItem = null;

  if (idx === 0) prev = null;
  else prev = navigation.value[0]?.children[idx - 1] as PageItem;

  let next: null | PageItem = null;
  if (idx === navigation.value[0]?.children.length - 1) next = null;
  else next = navigation.value[0]?.children[idx + 1] as PageItem;

  if (elem?._path === page?._path) {
    if (prev) prevPage.value = { title: prev.title, _path: prev._path };
    else prevPage.value = null;
    if (next) nextPage.value = { title: next.title, _path: next._path };
    else nextPage.value = null;
    break;
  }
}

const { data } = await useAsyncData(
  `${route.path}`,
  queryContent(`${route.path}`).findOne,
);
const toc = ref<{ heading: string; depth: 1 | 2 | 3 | 4 | 5 | 6 }[]>([]);

data.value.body.children.forEach(
  (element: { tag: string; props: { id: string } }) => {
    switch (element.tag) {
      case "h1":
        toc.value.push({ heading: element.props.id, depth: 1 });
        break;
      case "h2":
        toc.value.push({ heading: element.props.id, depth: 2 });
        break;
      case "h3":
        toc.value.push({ heading: element.props.id, depth: 3 });
        break;
      case "h4":
        toc.value.push({ heading: element.props.id, depth: 4 });
        break;
      case "h5":
        toc.value.push({ heading: element.props.id, depth: 5 });
        break;
      case "h6":
        toc.value.push({ heading: element.props.id, depth: 6 });
        break;
      default:
        break;
    }
  },
);

onMounted(() => {
  addBtn("DocContent");
});
</script>

<style module>
.main {
  width: 890px;
  margin: 0 auto;
  padding: 45px;
  z-index: 1;
  /*
  position: relative;

  padding: 20px 80px 160px 80px;
	*/
}
.content {
  width: 100%;
}

.tag-warpper {
  margin: 0 0 24px 0;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.default-tag {
  all: unset;
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

.page-nav-wrapper {
  display: flex;
  gap: 16px;
  width: 890px;
  margin: 40px 0 24px;
}
.nav-item {
  /* height: 224px; */
  width: 437px;
  border: solid 2px #444c56b3;
  border-radius: 8px;
  min-height: 114px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.nav-item:hover {
  border: solid 2px #c5d1de;
  animation-duration: 0.3s;
  animation-name: hoverin;
}

.empty-item {
  height: 224px;
  width: 437px;
  border: solid 2px #444c56b3;
  border-radius: 8px;
}

@keyframes hoverin {
  from {
    border: solid 2px #444c56b3;
  }

  to {
    border: solid 2px #c5d1de;
  }
}

.title {
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
  margin: 0 0 12px;
  word-break: keep-all;
  color: #478be6;
}

.svg {
  filter: invert(84%) sepia(23%) saturate(147%) hue-rotate(170deg)
    brightness(102%) contrast(78%);
}

.nav-item:hover > .svg {
  filter: invert(78%) sepia(55%) saturate(7134%) hue-rotate(193deg)
    brightness(95%) contrast(89%);
  animation-duration: 0.3s;
  animation-name: icon;
}

@keyframes icon {
  from {
    filter: invert(84%) sepia(23%) saturate(147%) hue-rotate(170deg)
      brightness(102%) contrast(78%);
  }

  to {
    filter: invert(78%) sepia(55%) saturate(7134%) hue-rotate(193deg)
      brightness(95%) contrast(89%);
  }
}

.toc-warpper {
  position: fixed;
  top: 96px;
  left: calc(50vw + 464px);
  z-index: 0;
}

.heading-link {
  color: #444c56b3;
  text-decoration: underline;
  font-size: 16px;
  line-height: 1.5;

  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
}
.heading-link:hover {
  color: #478be6;
}
</style>
