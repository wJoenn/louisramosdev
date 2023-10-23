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
  components: [
    {
      path: "~/components",
      pathPrefix: false
    }
  ],
  content: {
    highlight: {
      theme: "dark-plus",
      preload: ["erb", "ruby"]
    }
  },
  devtools: {
    enable: true,
    vscode: {
      reuseExistingServer: true
    }
  },
  image: {
    format: ["webp"],
    quality: 80
  },
  modules: [
    "@nuxt/content",
    "@nuxt/devtools",
    "@nuxt/image"
  ],
  runtimeConfig: {
    public: {
      apiUrl: "https://the-hub.fly.dev",
      password: process.env.NUXT_PASSWORD
    }
  },
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
