<template>
  <main :class="$style.main">
    <ContentDoc>
      <template v-slot="{ doc }">
        <article>
          <!-- <h1>{{ doc.title }}</h1> -->
          <div :class="$style['tag-warpper']">
            <div v-for="tag in doc.tags ?? []" :class="$style['default-tag']">
              {{ tag }}
            </div>
          </div>
          <!-- {{ doc?.authors ?? [] }} -->
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

onMounted(() => {
  addBtn("DocContent");
});
</script>

<style module>
.main {
  width: 890px;
  margin: 0 auto;
  padding: 45px;
  /*  
  position: relative;
  background-color: #fff;

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
</style>
