<template>
  <main :class="$style.main">
    <ContentDoc>
      <template v-slot="{ doc }">
        <article>
          <!-- <h1>{{ doc.title }}</h1> -->
          {{ doc?.tags ?? [] }}
          {{ doc?.authors ?? [] }}
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
 * 기능 자체는 동작함
 * TODO: 아이콘이 붙게 만들어야 함.
 */
const addBtn = (id: string) => {
  const docContent = document.getElementById(id);
  const preElements = docContent?.querySelectorAll("pre");

  preElements?.forEach(function (preElement) {
    const childDiv = preElement.querySelector("div");
    if (childDiv) return;

    const warrper = document.createElement("div");
    warrper.classList.add("copy-warrper");

    const button = document.createElement("button");
    button.classList.add("copyBtn");
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

    warrper.appendChild(button);

    preElement.appendChild(warrper);
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
</style>
