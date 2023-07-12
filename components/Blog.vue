<template>
  <div class="blog-card">
    <img :src="blog.cover_url" :alt="`${blog.title} cover image`">

    <div class="details">
      <h2>{{ blog.title }}</h2>
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
    overflow: hidden;

    img {
      object-fit: cover;
      object-position: center;
    }

    .details {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 20px;

      p {
        color: $secondary-color;
        line-height: 20px;
      }

      .btn {
        @include btn;

        align-self: flex-end;
        color: $main-color;
        transition: color 0.3s ease;

        &:hover {
          color: $light-nuxt-green;
        }
      }
    }
  }
</style>
