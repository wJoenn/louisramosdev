<template>
  <div class="blog-card">
    <NuxtImg :src="blog.cover_url" :alt="`${blog.title} cover image`" height="200" width="400" />

    <div class="details">
      <em class="date">{{ date }}</em>
      <h3>{{ blog.title }}</h3>
      <p>{{ blog.description }}</p>

      <NuxtLink :to="blog._path" class="btn">Show more</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Blog from "../types/Blog.ts"

  const props = defineProps<{ blog: Blog }>()

  const { blog } = toRefs(props)
  const date = computed(() => {
    const rawDate = new Date(blog.value.date * 1000)
    const day = rawDate.getDate()
    const month = rawDate.toLocaleDateString("en-UK", { month: "long" })
    const year = rawDate.getFullYear()

    let daySuffix = "th"
    if (day === 1 || day === 21 || day === 31) { daySuffix = "st" }
    if (day === 2 || day === 22) { daySuffix = "nd" }
    if (day === 3 || day === 23) { daySuffix = "rd" }

    return `${month} ${day}${daySuffix} ${year}`
  })
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

      .date {
        color: $secondary-color;
        font-size: $size-sm;
        margin: -5px 0;
      }
    }
  }
</style>
