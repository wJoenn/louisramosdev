// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: [
      "@fortawesome/vue-fontawesome",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-brands-svg-icons",
      "@fortawesome/free-solid-svg-icons"
    ]
  },
  content: {
    highlight: {
      theme: "dark-plus",
      preload: ["js"]
    }
  },
  devtools: { enabled: true },
  modules: ["@nuxt/content"],
  typescript: {
    shim: false,
    strict: true
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use '~/assets/stylesheets/config/variables' as *;"
        }
      }
    }
  }
})
