<template>
  <Blob />

  <div id="app" class="scroll">
    <NuxtHeader />

    <main class="container">
      <NuxtPage />
    </main>

    <NuxtFooter />
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
  @import "./assets/stylesheets/application";

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
