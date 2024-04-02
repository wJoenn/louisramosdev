<template>
  <Transition name="slide-up">
    <div v-if="show" ref="githubTooltipComponent" class="github-tooltip" :style="tooltipCssStyle">
      <slot />
      <div class="github-tooltip__arrow" :style="arrowCssStyle" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
  defineProps<{
    show: boolean
  }>()

  defineSlots<{
    default: unknown
  }>()

  const mouseCoords = inject<Ref<[number, number]>>("mouseCoords")!
  const githubTooltipComponent = ref<HTMLDivElement>()
  const arrowCssStyle = ref({})
  const tooltipCssStyle = ref({})

  const arrowPositionY = computed(() => positionY.value === "bottom" ? "top" : "bottom")
  const positionX = computed(() => mouseCoords.value[0] <= 400 ? "left" : "right")
  const positionY = computed(() => mouseCoords.value[1] >= 350 ? "bottom" : "top")

  watch(githubTooltipComponent, () => {
    if (githubTooltipComponent.value) {
      const { bottom, left, right, top } = githubTooltipComponent.value.getBoundingClientRect()
      let arroxXValue = (positionX.value === "right" ? right - mouseCoords.value[0] : mouseCoords.value[0] - left) - 10
      if (arroxXValue < 15) { arroxXValue = 15 }
      if (arroxXValue > 45) { arroxXValue = 45 }

      tooltipCssStyle.value = { [positionX.value]: "-15px", [positionY.value]: "100%" }
      arrowCssStyle.value = {
        [arrowPositionY.value]: `${bottom - top - 15}px`,
        [positionX.value]: `${arroxXValue}px`,
        [`border-${arrowPositionY.value}`]: "10px solid #303030"
      }
    }
  })
</script>

<style lang="scss">
  .github-tooltip {
    display: flex;
    flex-direction: column;
    padding: 15px 0;
    position: absolute;
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
      height: 0;
      position: absolute;
      width: 0;
    }
  }
</style>
