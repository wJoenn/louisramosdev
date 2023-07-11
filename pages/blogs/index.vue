<template>
  <div>
    <h1>Blogs</h1>

    <nav>
      <NuxtLink v-for="blog in blogs" :key="blog._id" :to="blog._path">{{ blog.title }}</NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
  const { data: blogs } = await useAsyncData("blogs", () => queryContent("/blogs").find())
</script>

<style scoped>
</style>
