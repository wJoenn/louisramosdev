<template>
  <div
    class="code-block"
    :class="{ 'is-bash': language === 'bash' }"
    @click="copyFromClick"
    @copy="copyFromSelection"
    @mouseleave="copied = false"
  >
    <span v-if="filename" class="filename">{{ filename }}</span>
    <slot />
    <Icon class="copy" :name="copied ? 'fa6-solid:check-double' : 'fa6-solid:copy'" />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    code: string
    filename?: string
    language?: string
  }>()

  defineSlots<{
    default: unknown
  }>()

  const copied = ref(false)

  const copyFromClick = async () => {
    copied.value = true
    await navigator.clipboard.writeText(props.code)
  }

  const copyFromSelection = async () => {
    const selection = document.getSelection()!
    const formattedSelection = formatSelection(selection)

    await navigator.clipboard.writeText(formattedSelection)
  }

  const formatSelection = (selection: Selection): string => {
    const selectedRange = selection.getRangeAt(0)
    const container = document.createElement("div")
    container.appendChild(selectedRange.cloneContents())
    const selectedElements = Array.from(container.querySelectorAll<HTMLElement>("*"))

    return selectedElements.map(element => element.classList.contains("line") ? "" : element.innerText).join("")
  }
</script>

<style lang="scss">
  .code-block {
    position: relative;

    &.is-bash:not(:has(.filename)) .line::before {
      content: "$ ";
      color: $light-nuxt-green;
    }

    &:hover .copy {
      opacity: 1;
      transition: opacity 0.3s ease;
    }

    pre {
      @include code-block
    }

    .copy {
      bottom: 10px;
      opacity: 0.1;
      position: absolute;
      right: 10px;
      width: 15px;
    }

    .filename {
      color: $secondary-color;
      font-size: $size-sm;
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
</style>
