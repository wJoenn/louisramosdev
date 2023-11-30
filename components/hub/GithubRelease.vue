<template>
  <div class="github-release">
    <GithubFeedItem :feed-item="release" :title="release.name" :user="repository.owner">
      <template #description>
        <div @mouseenter="showRepository = true" @mouseleave="showRepository = false">
          <a :href="repository.html_url" target="_blank">{{ repository.full_name }}</a>
          <GithubRepository :repository="repository" :show-repository="showRepository" />
        </div>
      </template>

      <template #default>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div ref="content" class="github-content" v-html="parsedBody" />

        <a
          v-if="numbered(maxHeight) >= 350"
          :href="release.html_url"
          target="_blank"
          class="read-more">
          Read more
        </a>
      </template>

      <template #footer>
        <p class="author">
          released by <a :href="release.author.html_url" targe="_blank">{{ release.author.login }}</a>
          <GithubUser :user="release.author" :size="25" />
        </p>

        <p class="tag">
          <ClientOnly>
            <fai icon="fa-solid fa-tag" />
          </ClientOnly>
          <a :href="release.html_url" target="_blank">{{ release.tag_name }}</a>
        </p>
      </template>
    </GithubFeedItem>
  </div>
</template>

<script setup lang="ts">
  import type { GhRelease } from "~/types"

  import dayjs from "dayjs"
  import relativeTime from "dayjs/plugin/relativeTime"

  dayjs.extend(relativeTime)

  const props = defineProps<{
    item: GhRelease
  }>()

  const { item: release } = toRefs(props)
  const { repository } = release.value

  const parsedBody = release
    .value
    .body
    .replaceAll(/(?<!")https:\/\/github.com(?:\/[^/]+){3}\/(\d+)(?<!")/g, "#$1")
    .replaceAll("<a ", "<a target='_blank' ")

  const content = ref<HTMLDivElement>()
  const showRepository = ref(false)

  const maxHeight = ref("0px")

  const numbered = (size: string) => +size.replace("px", "")

  onMounted(() => {
    maxHeight.value = `${content.value?.scrollHeight}px`
  })
</script>

<style scoped lang="scss">
  .github-release {
    .author {
      @include flex-centered(5);
    }

    .read-more {
      @include btn
    }

    .tag {
      @include flex-icon;

      font-size: $size-sm;
    }
  }
</style>
