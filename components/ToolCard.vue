<template>
  <div class="tool-card">
    <div class="title">
      <h3>{{ tool.name }}</h3>
      <img :src="`/images/logos/${tool.image_url}`" :alt="`${tool.name} logo`" height="40">
    </div>

    <p>{{ tool.description }}</p>
    <a :href="tool.url" target="_blank" class="btn" :aria-label="`${tool.name} documentation`">See documentation</a>
  </div>
</template>

<script setup lang="ts">
  import Tool from "../types/Tool.ts"

  defineProps<{ tool: Tool }>()
</script>

<style scoped lang="scss">
  .tool-card {
    background-color: $main-background;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
    padding: 20px;
    transition: scale 0.3s ease;

    &:hover {
      scale: 1.05;
    }

    p {
      flex-grow: 1;
    }

    .title {
      @include flex-centered(0);

      justify-content: space-between;

      h3 {
        font-size: 25px;
      }

      img {
        flex-shrink: 0;
        height: 40px;
      }
    }
  }
</style>
