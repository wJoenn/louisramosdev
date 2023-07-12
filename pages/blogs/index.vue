<template>
  <div>
    <h1>Blogs</h1>

    <ul class="blog-list">
      <li v-for="blog in blogs" :key="blog._id">
        <Blog :blog="blog" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import type Blog from "@/types/Blog"

  const { data: blogs } = await useAsyncData("blogs", () => (
    queryContent("/blogs")
      .only(["title", "description", "cover_url", "_path", "_id"])
      .find() as Promise<Blog[]>
  ))
</script>

<style scoped lang="scss">
</style>
