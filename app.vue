<template>
  <div id="app">
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

      main {
        flex-grow: 1;
        margin: 50px auto;
      }
    }
  }
</style>
