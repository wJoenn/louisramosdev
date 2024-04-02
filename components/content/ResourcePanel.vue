<template>
  <div class="resource-panel">
    <span>
      <ClientOnly>
        <Icon icon="fa-solid fa-book-open" />
      </ClientOnly>

      More resources
    </span>
    <h3>Want to read more ?</h3>

    <nav :class="{ visible: showPanel }">
      <a v-for="[title, url] in resources" :key="title" :href="url" target="_blank">
        {{ title }}

        <ClientOnly>
          <Icon icon="fa-solid fa-up-right-from-square" />
        </ClientOnly>
      </a>
    </nav>

    <button @click="showPanel = !showPanel">
      <ClientOnly>
        <Icon :class="{ inverted: showPanel }" icon="fa-solid fa-chevron-down" />
      </ClientOnly>

      {{ showPanel ? "Hide" : "Show" }} resources
    </button>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    resources: string[][]
  }>()

  const showPanel = ref(false)
  const navMaxHeight = computed(() => `${props.resources.length * 35}px`)
</script>

<style scoped lang="scss">
  .resource-panel {
    background-color: $secondary-background;
    border: $border;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 50px;
    padding: 30px;

    > span {
      @include flex-icon;

      margin-bottom: 10px
    }

    button {
      @include flex-icon;

      background-color: transparent;
      border: none;
      color: $light-nuxt-green;
      cursor: pointer;
      width: max-content;

      svg {
        transition: transform 0.3s ease;

        &.inverted {
          transform: rotate(180deg);
        }
      }
    }

    nav {
      height: max-content;
      margin: -5px 0;
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition: all 0.3s ease;

      &.visible {
        margin: 10px 0;
        max-height: v-bind(navMaxHeight);
        opacity: 1;
      }

      a {
        @include flex-icon;

        font-size: 20px;
        line-height: 35px;
      }
    }
  }
</style>
