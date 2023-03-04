import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://arch-spatula.github.io",
  markdown: {
    drafts: true,
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: "poimandres",
      wrap: true,
    },
  },
});
