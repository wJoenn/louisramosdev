<template>
  <div class="github-release">
    <div class="github-release__header">
      <a :href="release.html_url" target="_blank"><h2>{{ release.name }}</h2></a>

      <div class="github-release__header__context">
        <div class="github-release__header__repository">
          <div @mouseenter="showRepository = true" @mouseleave="showRepository = false">
            <a :href="repository.html_url" target="_blank">{{ repository.full_name }}</a>
            <GithubRepository :repository="repository" :show-repository="showRepository" />
          </div>

          <span>{{ dayjs(release.created_at).fromNow() }}</span>
        </div>

        <div class="github-release__header__user" @mouseenter="showOwner = true" @mouseleave="showOwner = false">
          <a :href="repository.owner.html_url" target="_blank">
            <img :src="owner.avatar_url" :alt="`${owner.login} avatar`" :class="{ round: owner.type === 'User' }">
          </a>

          <GithubUser :user="repository.owner" :show-user="showOwner" />
        </div>
      </div>
    </div>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <div ref="content" class="github-release__content" v-html="parsedBody" />

    <a
      v-if="numbered(maxHeight) > 350"
      :href="release.html_url" target="_blank"
      class="github-release__read-more"
    >
      Read more
    </a>

    <div class="github-release__footer">
      <p>
        released by <a :href="release.author.html_url" targe="_blank">{{ release.author.login }}</a>

        <span @mouseenter="showAuthor = true" @mouseleave="showAuthor = false">
          <a :href="release.author.html_url" target="_blank">
            <img :src="release.author.avatar_url" :alt="`${release.author.login} avatar`" class="round small">
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

  import type { GhRelease } from "../../types/api.ts"

  dayjs.extend(relativeTime)

  const props = defineProps<{
    release: GhRelease
  }>()

  const { release } = toRefs(props)
  const repository = computed(() => release.value.repository)
  const owner = computed(() => repository.value.owner)

  const showAuthor = ref(false)
  const showOwner = ref(false)
  const showRepository = ref(false)

  const content = ref<HTMLDivElement>()

  const maxHeight = ref("0px")

  const parsedBody = release
    .value
    .body
    .replaceAll(/(?<!")https:\/\/github.com(?:\/[^/]+){3}\/(\d+)(?<!")/g, "#$1")
    .replaceAll("<a ", "<a target='_blank' ")

  const numbered = (size: string) => +size.replace("px", "")

  onMounted(() => {
    maxHeight.value = `${content.value?.scrollHeight}px`
  })
</script>

<style lang="scss">
  .github-release {
    background-color: $main-background;
    border: 1px solid $secondary-background;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 30px auto;
    max-width: 100%;
    padding: 20px;
    width: 900px;

    &__content {
      display: -webkit-box;
      -webkit-line-clamp: 10;
      -webkit-box-orient: vertical;
      overflow: hidden;

      a {
        color: $light-nuxt-green;

        code {
          background-color: $secondary-background;
          border: none;
          color: inherit;
        }
      }

      code {
        background-color: black;
        border: 1px solid $secondary-color;
        border-radius: 5px;
        color: rgb(233, 157, 17);
        font-size: 0.8rem;
        padding: 0.25rem 0.5rem;
        word-break: break-word;
      }

      h2 {
        border-bottom: 1px solid $secondary-background;
        font-size: 25px;
        margin: 10px 0 20px;
        padding-bottom: 5px;
      }

      h3 {
        margin-top: 20px;
      }

      h2, h3 {
        a {
          color: $main-color;
        }
      }

      img {
        max-height: 20px !important;
        max-width: 20px !important;
      }

      li, p {
        line-height: 30px;
      }

      ul {
        list-style: disc;
        margin: 10px 20px;
      }
    }

    &__footer {
      align-items: center;
      color: $secondary-color;
      display: flex;
      gap: 50px;

      p {
        align-items: center;
        display: flex;
        font-size: 0.8rem;

        a {
          align-items: center;
          display: flex;
          gap: 10px;
          margin-left: 5px;
        }

        span {
          position: relative;
        }

        svg {
          margin-right: 10px;
          height: 15px;
        }
      }
    }

    &__header {
      align-items: center;
      display: flex;
      justify-content: space-between;

      &__context {
        align-items: center;
        display: flex;
        justify-content: flex-end;
        gap: 10px;

        div {
          text-align: right;

          p {
          font-weight: 500;
          }

          span {
            color: $secondary-color;
            font-size: 0.8rem;
          }
        }
      }

      &__repository,
      &__user {
        position: relative;
      }

      h2 {
        font-size: 30px;
      }
    }

    &__read-more {
      @include btn
    }

    a:hover {
      color: $light-nuxt-green;
    }

    img {
      border-radius: 5px;
      height: 50px;
      width: 50px;

      &.round {
        border-radius: 50%;
      }

      &.small {
        height: 25px;
        width: 25px;
      }
    }
  }
</style>
