<script setup lang="ts">
useSeoMeta({
  ogImage: "/og-image.png",
});
useHead({
  link: [{ rel: "icon", type: "image/svg+xml", href: "favicon.svg" }],
});
</script>
<template>
  <header class="header">
    <nav class="nav">
      <ul class="nav-list">
        <li class="nav-item" style="height: 44px">
          <NuxtLink class="profile" to="/">
            <NuxtImg src="/profile.png" height="44" />
          </NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink
            to="https://github.com/arch-spatula/arch-spatula.github.io"
            target="_blank"
          >
            <p class="github">GitHub</p>
            <!--
             TODO: 새탭 아이콘 추가하기
				    -->
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
  <div>
    <NuxtPage />
  </div>
</template>

<style lang="scss" scoped>
.header {
  background-color: #020420;
  height: 64px;
  .nav {
    /* max-width: 800px; */
    height: 100%;
    box-sizing: border-box;
    /* margin: 0px auto; */
    margin: 0px 12px;
    display: flex;
    place-items: center;
    .nav-list {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-between;

      .nav-item {
        height: fit-content;

        .github {
          color: #fff;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
