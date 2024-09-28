<script setup lang="ts">
useSeoMeta({
  ogImage: "/og-image.png",
});
useHead({
  title: "Arch-Spatula의 레시피",
  link: [{ rel: "icon", type: "image/svg+xml", href: "favicon.svg" }],
});
</script>
<template>
  <header :class="$style.header">
    <nav :class="$style.nav">
      <ul :class="$style['nav-list']">
        <li :class="$style['nav-item']" style="height: 44px">
          <NuxtLink :class="$style.profile" to="/">
            <NuxtImg src="/profile.png" height="44" />
            <p>Arch-Spatula의 레시피</p>
          </NuxtLink>
        </li>
        <li :class="$style['nav-item']">
          <NuxtLink
            :class="$style['github-link']"
            to="https://github.com/arch-spatula/arch-spatula.github.io"
            target="_blank"
          >
            <p :class="$style.github">GitHub</p>
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

<style module>
.header {
  background-color: #22272e;
  height: 64px;
  padding: 0;
  position: sticky;
  top: 0px;
  z-index: 1;
}
.nav {
  /* max-width: 800px; */
  height: 100%;
  box-sizing: border-box;
  /* margin: 0px auto; */
  margin: 0px 12px;
  display: flex;
  place-items: center;
}

.nav-list {
  padding: 0;
  margin: 0;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
}
.nav-item {
  height: fit-content;
  list-style-type: none;
}

.github {
  color: #c5d1de;
  stroke: #c5d1de;
  font-size: 20px;
  margin: 0;
  font-weight: 700;
}
.github:hover {
}
.github-link {
  display: flex;
  align-items: center;
  color: #c5d1de;
}
.github-link:hover {
  filter: invert(54%) sepia(73%) saturate(2838%) hue-rotate(194deg)
    brightness(94%) contrast(91%);
}
.github-link:hover p {
  color: #478be6;
}

.profile {
  display: flex;
  align-items: center;
  color: #c5d1de;
  gap: 16px;
  font-size: 20px;
}
.profile:hover {
  color: #478be6;
}
.profile p {
  margin: 0;
  height: 24px;
  font-weight: 700;
}
</style>
