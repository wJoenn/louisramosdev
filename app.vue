<template>
  <Blob v-if="!isBlog" />

  <div id="app" ref="app" class="scroll" :class="{ isBlog: isBlog }">
    <NuxtLayout :name="layout">
      <NuxtPage :transition="{ name: transitionName, mode: 'out-in', onEnter: enter }" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
  import type { LayoutKey } from "./.nuxt/types/layouts.d.ts"

  useHead({
    htmlAttrs: { lang: "en" },
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }]
  })

  // Route Store
  const route = useRoute()
  const isBlog = computed(() => (route.name as string).includes("blogs"))
  const isHub = computed(() => (route.name as string).includes("hub"))
  const layout = computed<LayoutKey>(() => (isHub ? "hub" : "default"))
  provide("isBlog", isBlog)
  provide("isHub", isHub)

  // Mouse Store
  const mouseCoords = ref<[number, number]>([0, 0])
  provide("mouseCoords", mouseCoords)

  // User Store
  const isLoggedIn = ref(false)
  provide("isLoggedIn", isLoggedIn)

  const app = ref<HTMLDivElement>()
  const transitionName = ref("page")

  const enter = () => {
    app.value?.scrollTo(0, 0)
  }

  const verifyMobileMedia = () => {
    const isMobile = (
      "ontouchstart" in window &&
      window.matchMedia("(pointer: coarse)").matches &&
      window.matchMedia("only screen and (max-width: 570px)").matches &&
      /Android|BlackBerry|IEMobile|iPhone|iPod|Opera Mini|webOS|Windows Phone/i.test(navigator.userAgent)
    )

    if (isMobile) { transitionName.value = "" }
  }

  onBeforeMount(() => {
    verifyMobileMedia()
    isLoggedIn.value = localStorage.isLoggedIn === "true"

    window.addEventListener("pointermove", event => {
      if (event.pointerType !== "touch") {
        mouseCoords.value = [event.clientX, event.clientY]
      }
    })
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
        display: flex;
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
