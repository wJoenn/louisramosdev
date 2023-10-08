<template>
  <Transition name="slide-up">
    <div v-if="show" ref="githubTooltipComponent" class="github-tooltip">
      <slot />
      <div class="github-tooltip__arrow" :style="arrowCssStyle" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
  defineProps({
    show: { type: Boolean, default: false }
  })

  const mouseCoords = inject<Ref<[number, number]>>("mouseCoords")!
  const githubTooltipComponent = ref<HTMLDivElement>()
  const arrowCssStyle = ref({})

  watch(githubTooltipComponent, () => {
    if (githubTooltipComponent.value) {
      const componentRight = githubTooltipComponent.value.getBoundingClientRect().right
      let right = componentRight - mouseCoords.value[0] - 10
      if (right < 15) { right = 15 }
      if (right > 45) { right = 45 }

      arrowCssStyle.value = { right: `${right}px` }
    }
  })
</script>

<style lang="scss">
  .github-tooltip {
    bottom: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 15px;
    position: absolute;
    right: -15px;
    transition: all 0.3s ease;

    > div:not(.github-tooltip__arrow) {
      background-color: $secondary-background;
      border: $border-dark;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 10px;
      width: 350px;

      * {
        text-align: left;
      }
    }

    .github-tooltip__arrow {
      border-left: 10px solid transparent;
      border-radius: 0 0 10px rgba(0, 0, 0, 0.5);
      border-right: 10px solid transparent;
      border-top: 10px solid $ternary-background;
      height: 0;
      position: absolute;
      top: calc(100% - 15px);
      width: 0;
    }
  }
</style>
