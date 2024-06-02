<template>
  <div class="github-release">
    <GithubFeedItem :feed-item="item" :title="item.name" :user="repository.owner">
      <template #description>
        <div @mouseenter="showRepository = true" @mouseleave="showRepository = false">
          <a :href="repository.html_url" target="_blank">{{ repository.full_name }}</a>
          <GithubRepository :repository :show-repository />
        </div>
      </template>

      <template #default>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div ref="content" class="github-content" v-html="parsedBody" />

        <a
          v-if="numbered(maxHeight) >= 350"
          class="read-more"
          :href="item.html_url"
          target="_blank"
        >
          Read more
        </a>
      </template>

      <template #footer>
        <p class="author">
          released by <a :href="item.author.html_url" targe="_blank">{{ item.author.login }}</a>
          <GithubUser :size="25" :user="item.author" />
        </p>

        <p class="tag">
          <Icon name="fa6-solid:tag" />
          <a :href="item.html_url" target="_blank">{{ item.tag_name }}</a>
        </p>
      </template>
    </GithubFeedItem>
  </div>
</template>

<script setup lang="ts">
  import type { GhRelease } from "~/types"

  import dayjs from "dayjs"
  import relativeTime from "dayjs/plugin/relativeTime"

  const props = defineProps<{
    item: GhRelease
  }>()

  dayjs.extend(relativeTime)

  const parsedBody = computed(() => (
    props.item.body
      .replaceAll(/(?<!")https:\/\/github.com(?:\/[^/]+){3}\/(?<version>\d+)(?<!")/g, "#$<version>")
      .replaceAll("<a ", "<a target='_blank' ")
  ))

  const repository = computed(() => props.item.repository)

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
