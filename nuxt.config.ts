const development = process.env.NODE_ENV === 'production'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@nuxt/content", "@nuxt/image"],
	css: ["~/assets/css/main.css"],

	/**
	 * @see https://velog.io/@devmini1203/Nuxt3-Nuxt3-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%A5%BC-GitHub-Pages%EC%97%90-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0
	 */
	//ssr: false,
	//nitro: {
		//preset: 'github-pages'
	//},
	/**
	 * 환경 변수는 github repo에서 설정함
	 */
	app: {
		//baseURL: development ? '/arch-spatula.github.io/' : undefined
	},

	routeRules: {
		"/": { prerender: true },
	},

	content: {
		navigator: {
			navigator: {
				fields: ["date"],
			},
		},

		markdown: {
			mdc: true,
			toc: {
				depth: 5,
				searchDepth: 5,
			},
			anchorLinks: {
				depth: 5,
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
				"yml",
				"md",
				"astro",
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
