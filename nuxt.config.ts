// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@nuxt/content", "@nuxt/image"],
	css: ["~/assets/css/main.css"],

	routeRules: {
		"/": { prerender: true },
	},

	content: {
		markdown: {
			mdc: true,
			toc: {
				depth: 6,
				searchDepth: 6,
			},
			anchorLinks: {
				depth: 6,
			},
		},
		//remarkPlugins: {
		//// Override remark-emoji options
		//"remark-emoji": {
		//emoticon: true,
		//},
		//// Disable remark-gfm
		//"remark-gfm": false,
		//// Add remark-oembed
		//"remark-oembed": {
		//// Options
		//},
		//},
		highlight: {
			// Theme used in all color schemes.
			theme: "github-dark",
			langs: [
				// .dotfile 레시피
				"c",
				"cpp",
				"java",
				"go",
				"lua",
				"bash",
				"shell",
				// 프론트엔드 용
				"html",
				"css",
				"js",
				"ts",
				"jsx",
				"tsx",
				"vue",
				"json",
			],
		},
		//experimental: {
		//search: {
		//filterQuery: { _draft: false },
		//},
		//},
	},

	compatibilityDate: "2024-09-18",
});
