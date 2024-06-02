// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: [
    {
      path: "~/components",
      pathPrefix: false
    }
  ],
  content: {
    highlight: {
      preload: ["erb", "ruby", "scss"],
      theme: "dark-plus"
    }
  },
  devtools: {
    enabled: true,
    vscode: {
      reuseExistingServer: true
    }
  },
  experimental: {
    typedPages: true
  },
  image: {
    format: ["webp"],
    quality: 80
  },
  modules: [
    "nuxt-icon",
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
    strict: true,
    tsConfig: {
      compilerOptions: {
        allowImportingTsExtensions: true,
        moduleDetection: "force"
      }
    }
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
