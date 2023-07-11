<template>
  <ContentDoc />
  <p>{{ blog?.foo }}</p>
</template>

<script setup lang="ts">
  const { path } = useRoute()
  const { data: blog } = await useAsyncData(`content-${path}`, () => queryContent(path).only("foo").findOne())
</script>

<style scoped lang="scss">
</style>
