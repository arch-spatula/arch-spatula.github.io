// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@nuxt/content", "@nuxt/image"],
	css: ["~/assets/css/main.css"],

	routeRules: {
		"/": { prerender: true },
	},

	content: {
		experimental: {
			search: {
				filterQuery: { _draft: false },
			},
		},
	},

	compatibilityDate: "2024-09-18",
});
