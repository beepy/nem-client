// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
    css: [
            '@/assets/scss/app.scss',

    ],
  build: {
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],

})
