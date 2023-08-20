// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
    css: [
        // "primevue/resources/themes/lara-light-blue/theme.css"
            '@/assets/scss/app.scss',

    ],
  build: {
    transpile: ["primevue"]
  },
  modules: [
    '@nuxtjs/tailwindcss',
  ],

})
