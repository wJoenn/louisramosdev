<template>
  <div class="blog-card">
    <NuxtImg :alt="`${blog.title} cover image`" height="200" :src="blog.cover_url" width="400" />

    <div class="details">
      <em class="date">{{ dayjs(blog.date * 1000).format("MMMM Do YYYY") }}</em>
      <h3>{{ blog.title }}</h3>
      <p>{{ blog.description }}</p>

      <NuxtLink class="btn" :to="blog._path">Show more</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Blog } from "~/types"

  import dayjs from "dayjs"
  import advancedFormat from "dayjs/plugin/advancedFormat"

  defineProps<{
    blog: Blog
  }>()

  dayjs.extend(advancedFormat)
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
      flex-shrink: 0;
      height: calc(min(1200px, calc(100vw * 0.8)) / 2);
      object-fit: cover;
      object-position: center;
      width: 100%;

      @media screen and (min-width: 560px) {
        height: calc((min(1200px, calc(100vw * 0.8)) - 20px) / 4);
      }

      @media screen and (min-width: 990px) {
        height: calc((min(1200px, calc(100vw * 0.8)) - 40px) / 6);
      }
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

      .date {
        color: $secondary-color;
        font-size: $size-sm;
        margin: -5px 0;
      }
    }
  }
</style>
