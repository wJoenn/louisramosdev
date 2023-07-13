<template>
  <div class="code-block" @click="copyFromClick" @copy="copyFromSelection" @mouseleave="copied = false">
    <span class="filename">{{ filename }}</span>
    <slot />
    <span class="copy">
      <fai ref="icon" :icon="['fa-solid', copied ? 'fa-check-double' : 'fa-copy']" />
    </span>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    code: { type: String, default: "" },
    language: { type: String, default: null },
    filename: { type: String, default: null },
    highlights: { type: Array as () => number[], default: () => [] },
    meta: { type: String, default: null }
  })

  const { code, filename } = toRefs(props)
  const copied = ref(false)

  const copyFromClick = () => {
    copied.value = true
    navigator.clipboard.writeText(code.value)
  }

  const copyFromSelection = () => {
    const selection = document.getSelection()!
    const selectedRange = selection.getRangeAt(0)
    const container = document.createElement("div")
    container.appendChild(selectedRange.cloneContents())

    const selectedElements = Array.from(container.querySelectorAll("*")) as HTMLElement[]
    const formattedSelection = selectedElements
      .map(element => (element.classList.contains("line") ? "" : element.innerText))
      .join("")

    navigator.clipboard.writeText(formattedSelection)
  }
</script>

<style lang="scss">
  .code-block {
    position: relative;

    &:hover .copy {
      opacity: 1;
      transition: opacity 0.3s ease;
    }

    .copy {
      bottom: 10px;
      opacity: 0;
      position: absolute;
      right: 10px;
      width: 20px;
    }

    .filename {
      color: #58a458;
      font-size: 0.8rem;
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }

  pre {
    background-color: #101010;
    border: 1px solid $secondary-color;
    border-radius: 10px;
    cursor: pointer;
    padding: 25px 20px 20px;
    margin: 10px 0 30px;

    code {
      border: none !important;
      padding: 0 !important;

      .line {
        display: flex;
        flex-wrap: wrap;
        min-height: 1rem;
        span {
          white-space: break-spaces;
        }
      }
    }
  }
</style>