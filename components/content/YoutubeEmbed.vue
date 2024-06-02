<template>
  <div class="youtube-embed" @click.self="emit('close')">
    <button @click="emit('close')">
      <Icon name="fa6-solid:xmark" />
    </button>

    <iframe :src />
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits<{
    (event: "close"): void
  }>()

  defineProps<{
    src: string
  }>()

  const closeEmbed = (event: KeyboardEvent) => {
    if (event.key === "Escape") { emit("close") }
  }

  onBeforeMount(() => {
    const app = document.querySelector<HTMLDivElement>("#app")!
    app.style.overflowY = "hidden"

    window.addEventListener("keyup", closeEmbed)
  })

  onUnmounted(() => {
    window.removeEventListener("keyup", closeEmbed)

    const app = document.querySelector<HTMLDivElement>("#app")!
    app.style.overflowY = "scroll"
  })
</script>

<style scoped lang="scss">
  .youtube-embed {
    align-items: center;
    background-color: rgba(24, 24, 24, 0.9);
    display: flex;
    height: 100vh;
    justify-content: center;
    position: absolute;
    right: 0px;
    top: 0px;
    width: 100%;
    z-index: 20;

    button {
      background-color: transparent;
      border: none;
      color: $secondary-color;
      cursor: pointer;
      position: fixed;
      right: 20px;
      top: 20px;
      transition: color 0.3s ease;
      width: 20px;

      &:hover {
        color: $main-color;
      }
    }

    iframe {
      aspect-ratio: 3/2;
      border: none;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
      width: Min(1080px, 90%);
    }
  }
</style>
