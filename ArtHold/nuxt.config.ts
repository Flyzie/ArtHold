// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  pages: true,

  imports: {
    autoImport: true,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    "@nuxt/image",
    "@sidebase/nuxt-auth",
    "@nuxt/icon",
    "nuxt-file-storage",
    "@vueuse/nuxt",
  ],
  auth: {
    globalAppMiddleware: false,
  },

  nitro: {
    publicAssets: [
      {
        baseURL: "/img",
        dir: "public/img",
      },
    ],
  },
});
