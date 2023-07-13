<template>
  <Blob />

  <div id="app" class="scroll">
    <NuxtHeader />

    <main class="container">
      <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
    </main>

    <NuxtFooter />
  </div>
</template>

<script setup lang="ts">
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
        backdrop-filter: blur(150px);
      }
    }
  }
</style>
