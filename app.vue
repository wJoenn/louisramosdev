<template>
  <Blob v-if="!isBlog" />

  <div id="app" ref="app" class="scroll" :class="{ isBlog: isBlog }">
    <NuxtHeader />

    <main class="container">
      <NuxtPage :transition="{ name: transitionName, mode: 'out-in', onEnter: enter }" />
    </main>

    <NuxtFooter />
  </div>
</template>

<script setup lang="ts">
  useHead({
    htmlAttrs: { lang: "en" },
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }]
  })

  const route = useRoute()
  const isBlog = computed(() => /\/blogs\/.+/.test(route.path))

  const app = ref<HTMLDivElement>()
  const transitionName = ref("page")

  const enter = () => {
    app.value?.scrollTo(0, 0)
  }

  onMounted(() => {
    const isMobile = (
      "ontouchstart" in window &&
      window.matchMedia("(pointer: coarse)").matches &&
      window.matchMedia("only screen and (max-width: 570px)").matches &&
      /Android|BlackBerry|IEMobile|iPhone|iPod|Opera Mini|webOS|Windows Phone/i.test(navigator.userAgent)
    )

    if (isMobile) { transitionName.value = "" }
  })
</script>

<style lang="scss">
  @import "./assets/stylesheets/application";

  .page-enter-active,
  .page-leave-active {
    transition: all 0.3s ease;
  }

  .page-enter-from {
    opacity: 0;
    translate: 100px 0;
  }

  .page-leave-to {
    opacity: 0;
    translate: -100px 0;
  }

  #__nuxt {
    height: 100%;

    #app {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow-y: scroll;

      main {
        flex-grow: 1;
        margin: 50px auto;
      }

      @media screen and (min-width: 990px) {
        &:not(.isBlog) {
          backdrop-filter: blur(150px);
        }
      }
    }
  }
</style>
