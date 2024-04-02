<template>
  <GithubTooltip :show="showRepository">
    <div class="github-repository">
      <p class="github-repository__title">
        <ClientOnly>
          <Icon icon="fa-solid fa-book" />
        </ClientOnly>

        <a :href="repository.html_url" target="_blank">{{ repository.full_name }}</a>
      </p>

      <span class="github-repository__description">{{ repository.description }}</span>

      <div class="github-repository__details">
        <div>
          <span :class="`language-${repository.language}`">{{ repository.language }}</span>

          <span>
            <ClientOnly>
              <Icon icon="fa-regular fa-star" />
            </ClientOnly>

            {{ repository.stargazers_count }}
          </span>

          <span>
            <ClientOnly>
              <Icon icon="fa-solid fa-code-fork" />
            </ClientOnly>

            {{ repository.forks_count }}
          </span>
        </div>

        <span>Updated {{ dayjs(repository.pushed_at).fromNow() }}</span>
      </div>
    </div>
  </GithubTooltip>
</template>

<script setup lang="ts">
  import type { GhRepository } from "~/types"

  import dayjs from "dayjs"
  import relativeTime from "dayjs/plugin/relativeTime"

  defineProps<{
    repository: GhRepository
    showRepository: boolean
  }>()

  dayjs.extend(relativeTime)
</script>

<style scoped lang="scss">
  .github-repository {
    .github-repository__description {
      font-size: $size-md;
    }

    .github-repository__details {
      > div {
        @include flex-centered(20);

        margin-bottom: 5px;
      }

      span {
        @include flex-icon-small;
      }
    }

    .github-repository__title {
      @include flex-icon;
    }
  }
</style>
