<template>
  <div class="github-release">
    <div class="github-release__header">
      <a :href="release.html_url" target="_blank"><h2>{{ release.name }}</h2></a>

      <div class="header__context">
        <div class="header__repository">
          <div @mouseenter="showRepository = true" @mouseleave="showRepository = false">
            <a :href="repository.html_url" target="_blank">{{ repository.full_name }}</a>
            <GithubRepository :repository="repository" :show-repository="showRepository" />
          </div>

          <span>{{ dayjs(release.released_at).fromNow() }}</span>
        </div>

        <div class="header__user" @mouseenter="showOwner = true" @mouseleave="showOwner = false">
          <a :href="repository.owner.html_url" target="_blank">
            <img
              class="avatar"
              :class="{ 'avatar-rounded': owner.type === 'User' }"
              :src="owner.avatar_url"
              :alt="`${owner.login} avatar`">
          </a>

          <GithubUser :user="repository.owner" :show-user="showOwner" />
        </div>
      </div>
    </div>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <div ref="content" class="github-content" v-html="parsedBody" />

    <a
      v-if="numbered(maxHeight) >= 350"
      :href="release.html_url" target="_blank"
      class="github-release__read-more">
      Read more
    </a>

    <div class="github-release__footer">
      <p class="footer__author">
        released by <a :href="release.author.html_url" targe="_blank">{{ release.author.login }}</a>

        <span @mouseenter="showAuthor = true" @mouseleave="showAuthor = false">
          <a :href="release.author.html_url" target="_blank">
            <img
              class="avatar avatar-rounded avatar-small"
              :src="release.author.avatar_url"
              :alt="`${release.author.login} avatar`">
          </a>

          <GithubUser :user="release.author" :show-user="showAuthor" />
        </span>
      </p>

      <p>
        <fai icon="fa-solid fa-tag" />
        <a :href="release.html_url" target="_blank">{{ release.tag_name }}</a>
      </p>

      <p :class="`language-${repository.language}`">{{ repository.language }}</p>
    </div>

    <GithubReactions :release="release" />
  </div>
</template>

<script setup lang="ts">
  import dayjs from "dayjs"
  import relativeTime from "dayjs/plugin/relativeTime"

  import type { GhRelease } from "../../types/api/Github.ts"

  dayjs.extend(relativeTime)

  const props = defineProps<{
    item: GhRelease
  }>()

  const { item: release } = toRefs(props)
  const repository = computed(() => release.value.repository)
  const owner = computed(() => repository.value.owner)

  const parsedBody = release
    .value
    .body
    .replaceAll(/(?<!")https:\/\/github.com(?:\/[^/]+){3}\/(\d+)(?<!")/g, "#$1")
    .replaceAll("<a ", "<a target='_blank' ")

  const content = ref<HTMLDivElement>()
  const showAuthor = ref(false)
  const showOwner = ref(false)
  const showRepository = ref(false)

  const maxHeight = ref("0px")

  const numbered = (size: string) => +size.replace("px", "")

  onMounted(() => {
    maxHeight.value = `${content.value?.scrollHeight}px`
  })
</script>

<style scoped lang="scss">
  .github-release {
    background-color: $main-background;
    border: $border-dark;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 30px auto;
    max-width: 100%;
    padding: 20px;
    width: 900px;

    .github-release__footer {
      @include flex-centered(50);

      color: $secondary-color;

      p {
        @include flex-icon;

        font-size: $size-sm;

        a {
          display: flex;
        }

        span {
          position: relative;
        }
      }

      .footer__author {
        gap: 5px;
      }
    }

    .github-release__header {
      align-items: center;
      display: flex;
      justify-content: space-between;

      .header__context {
        @include flex-centered(10);

        justify-content: flex-end;

        div {
          text-align: right;

          p {
          font-weight: 500;
          }
        }
      }

      .header__repository,
      .header__user {
        position: relative;
      }

      h2 {
        font-size: 30px;
      }
    }

    .github-release__read-more {
      @include btn
    }
  }
</style>
