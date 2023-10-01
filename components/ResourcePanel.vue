<template>
  <div class="resource-panel">
    <span><fai icon="fa-solid fa-book-open" /> More resources</span>
    <h3>Want to read more ?</h3>

    <nav :class="{ visible: showPanel }">
      <a v-for="[title, url] in resources" :key="title" :href="url" target="_blank">
        {{ title }} <fai icon="fa-solid fa-up-right-from-square" />
      </a>
    </nav>

    <button @click="showPanel = !showPanel">
      <fai icon="fa-solid fa-chevron-down" :class="{ inverted: showPanel }" />
      {{ showPanel ? "Hide" : "Show" }} resources
    </button>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{ resources: string[][] }>()

  const { resources } = toRefs(props)

  const showPanel = ref(false)
  const navMaxHeight = computed(() => `${resources.value.length * 35}px`)
</script>

<style scoped lang="scss">
  @mixin flex-icon {
    align-items: center;
    display: flex;
    gap: 10px;

    svg {
      height: 15px;
    }
  }

  .resource-panel {
    background-color: $secondary-background;
    border: 1px solid $secondary-color;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 50px;
    padding: 30px;

    > span {
      @include flex-icon;

      color: $secondary-color;
      font-size: 0.8rem;
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
        transition: color 0.3s ease;

        &:hover {
          color: $light-nuxt-green;
        }
      }
    }
  }
</style>
