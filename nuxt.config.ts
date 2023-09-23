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
      preload: ["erb", "ruby"]
    }
  },
  image: {
    format: ["webp"],
    quality: 80
  },
  modules: [
    "@nuxt/content",
    "@nuxt/image"
  ],
  typescript: {
    shim: false,
    strict: true
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/stylesheets/config/variables" as *;
            @use "~/assets/stylesheets/config/mixins" as *;
          `
        }
      }
    }
  }
})
