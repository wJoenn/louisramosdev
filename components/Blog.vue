<template>
  <div class="blog-card">
    <img :src="blog.cover_url" :alt="`${blog.title} cover image`">

    <div class="details">
      <h3>{{ blog.title }}</h3>
      <p>{{ blog.description }}</p>

      <NuxtLink :to="blog._path" class="btn">Show more</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type Blog from "@/types/Blog"

  const props = defineProps<{ blog: Blog }>()
  const { blog } = toRefs(props)
</script>

<style scoped lang="scss">
  .blog-card {
    background-color: $main-background;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;

    h3 {
      font-size: 25px;
    }

    img {
      height: 200px;
      flex-shrink: 0;
      object-fit: cover;
      object-position: center;
    }

    .details {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: 10px;
      padding: 20px;

      p {
        color: $secondary-color;
        flex-grow: 1;
        line-height: 20px;
      }
    }
  }
</style>
