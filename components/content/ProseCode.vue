<template>
  <div :class="['code-block', { 'is-bash': language === 'bash' }]" @click="copyFromClick" @copy="copyFromSelection" @mouseleave="copied = false">
    <span v-if="filename" class="filename">{{ filename }}</span>

    <slot />

    <span class="copy">
      <fai ref="icon" :icon="['fa-solid', copied ? 'fa-check-double' : 'fa-copy']" />
    </span>
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(defineProps<{
    code: string,
    language: string,
    filename: string,
    highlights: number[],
    meta: string
  }>(), {
    code: "",
    highlights: () => []
  })

  const { code, filename, language } = toRefs(props)
  const copied = ref(false)

  const copyFromClick = () => {
    copied.value = true
    navigator.clipboard.writeText(code.value)
  }

  const copyFromSelection = () => {
    const selection = document.getSelection()!
    const formattedSelection = formatSelection(selection)

    navigator.clipboard.writeText(formattedSelection)
  }

  const formatSelection = (selection: Selection): string => {
    const selectedRange = selection.getRangeAt(0)
    const container = document.createElement("div")
    container.appendChild(selectedRange.cloneContents())
    const selectedElements = Array.from(container.querySelectorAll("*") as NodeListOf<HTMLElement>)

    return selectedElements.map(element => (element.classList.contains("line") ? "" : element.innerText)).join("")
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
      width: 20px;
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
